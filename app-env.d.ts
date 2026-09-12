/// <reference types="vite/client" />

interface Fetcher {
  fetch(request: Request): Promise<Response>;
}

type D1Database = unknown;
