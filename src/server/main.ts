/**
 * Server entry point using Bun.serve()
 * Handles routing and static file serving
 */

import { logServerStart } from "./lib/logger.ts";
import { createRouter } from "./lib/router.ts";
import { handleIndex } from "./routes/index.ts";
import { handleSlides } from "./routes/slides.ts";

const DEFAULT_PORT = 3000;

/**
 * Get configured port from environment or use default
 */
function getPort(): number {
  const envPort = process.env.PORT;
  if (envPort) {
    const parsed = parseInt(envPort, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed < 65536) {
      return parsed;
    }
  }
  return DEFAULT_PORT;
}

const port = getPort();

const router = createRouter()
  .get("/", handleIndex)
  .get("/slides/:slideSlug", handleSlides)
  .static("/")
  .notFound(() => new Response("Not Found", { status: 404 }));

Bun.serve({
  port,
  fetch: router.build(),
});

logServerStart(port);
