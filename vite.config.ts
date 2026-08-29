import vinext from "vinext";
import { defineConfig, loadEnv } from "vite";
import hostingConfig from "./.openai/hosting.json";
import { sites } from "./build/sites-vite-plugin";

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  "00000000-0000-4000-8000-000000000000";

const { d1, r2 } = hostingConfig;

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

function localBindingConfig(env: Record<string, string>) {
  return {
    main: "./worker/index.ts",
    compatibility_flags: ["nodejs_compat"],
    vars: {
      NEXT_PUBLIC_SUPABASE_URL: env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
      MEMORYENGINE_URL: env.MEMORYENGINE_URL ?? "",
      MEMORYENGINE_SERVICE_TOKEN: env.MEMORYENGINE_SERVICE_TOKEN ?? "",
      MISCELLANY_OWNER_USER_ID: env.MISCELLANY_OWNER_USER_ID ?? "",
      OPENAI_API_KEY: env.OPENAI_API_KEY ?? "",
      OPENAI_GRADING_MODEL: env.OPENAI_GRADING_MODEL ?? "",
    },
    d1_databases: d1
      ? [
          {
            binding: d1,
            database_name: "site-creator-d1",
            database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
          },
        ]
      : [],
    r2_buckets: r2
      ? [
          {
            binding: r2,
            bucket_name: "site-creator-r2",
          },
        ]
      : [],
  };
}

export default defineConfig(async () => {
  const env = loadEnv("", process.cwd(), "");
  const isVercelNitroBuild =
    process.env.VERCEL === "1" || process.env.NITRO_PRESET === "vercel";

  if (isVercelNitroBuild) {
    const { nitro } = await import("nitro/vite");

    return {
      resolve: {
        alias: {
          tailwindcss: "tailwindcss/index.css",
        },
      },
      plugins: [vinext(), nitro()],
    };
  }

  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig(env),
      }),
    ],
  };
});
