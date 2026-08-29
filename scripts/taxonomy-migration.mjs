#!/usr/bin/env node
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function usage() {
  console.log(`Usage:
  npm run taxonomy:migrate -- --mapping docs/taxonomy-migration.example.json [--apply]

Mapping format:
{
  "categoryMap": { "old-category": "new-category" },
  "entryOverrides": { "entry-slug": "new-category" }
}

For a simple category-only migration, the top-level object may also be:
{ "old-category": "new-category" }`);
}

function parseArgs(argv) {
  const args = { apply: false, mapping: "" };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--apply") args.apply = true;
    else if (arg === "--mapping") {
      args.mapping = argv[index + 1] ?? "";
      index += 1;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    }
  }
  return args;
}

async function listMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listMarkdownFiles(full);
    return entry.isFile() && entry.name.endsWith(".md") ? [full] : [];
  }));
  return files.flat();
}

function parseFrontMatter(markdown, file) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) throw new Error(`${file} is missing front matter`);
  return {
    block: match[1],
    bodyStart: match[0].length,
  };
}

function readScalar(block, key) {
  const match = block.match(new RegExp(`^${key}:\\s*(.*)$`, "m"));
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : "";
}

function normalizeMapping(raw) {
  const hasStructuredShape = raw.categoryMap || raw.entryOverrides;
  return {
    categoryMap: hasStructuredShape ? raw.categoryMap ?? {} : raw,
    entryOverrides: hasStructuredShape ? raw.entryOverrides ?? {} : {},
  };
}

function replaceCategory(markdown, nextCategory) {
  if (!/^category:\s*.*$/m.test(markdown)) {
    throw new Error("cannot apply migration to an entry without category metadata");
  }
  return markdown.replace(/^category:\s*.*$/m, `category: ${nextCategory}`);
}

const args = parseArgs(process.argv.slice(2));
if (args.help || !args.mapping) {
  usage();
  process.exit(args.help ? 0 : 1);
}

const mappingPath = path.resolve(root, args.mapping);
const mapping = normalizeMapping(JSON.parse(await readFile(mappingPath, "utf8")));
const files = await listMarkdownFiles(path.join(root, "content"));
const proposal = [];

for (const file of files) {
  const markdown = await readFile(file, "utf8");
  const { block } = parseFrontMatter(markdown, file);
  const slug = readScalar(block, "slug");
  const title = readScalar(block, "title");
  const currentCategory = readScalar(block, "category");
  const proposedCategory = mapping.entryOverrides[slug] ?? mapping.categoryMap[currentCategory];

  if (!proposedCategory || proposedCategory === currentCategory) continue;

  proposal.push({
    file: path.relative(root, file),
    title,
    slug,
    currentCategory,
    proposedCategory,
    note: mapping.entryOverrides[slug] ? "entry override" : "category map",
  });
}

console.log(JSON.stringify({ apply: args.apply, count: proposal.length, proposal }, null, 2));

if (args.apply) {
  for (const item of proposal) {
    const file = path.join(root, item.file);
    const markdown = await readFile(file, "utf8");
    await writeFile(file, replaceCategory(markdown, item.proposedCategory));
  }
}
