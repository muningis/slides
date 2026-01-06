/**
 * Server entry point using Bun.serve()
 * Handles routing and static file serving
 */

import { logRequest, logServerStart } from "./lib/logger.ts";
import { serveStaticFile } from "./lib/static.ts";
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

Bun.serve({
  port,
  async fetch(request: Request): Promise<Response> {
    const startTime = Date.now();
    const url = new URL(request.url);
    const path = url.pathname;

    let response: Response;

    // Route: Home page
    if (path === "/") {
      response = handleIndex();
      logRequest(request, response.status, startTime);
      return response;
    }

    // Route: Slides with slug parameter
    if (path.startsWith("/slides/")) {
      const slug = path.slice("/slides/".length);
      response = handleSlides(slug);
      logRequest(request, response.status, startTime);
      return response;
    }

    // Fallback: Static file serving from dist/
    const staticResponse = await serveStaticFile(path);
    if (staticResponse) {
      logRequest(request, staticResponse.status, startTime);
      return staticResponse;
    }

    // 404 for everything else
    response = new Response("Not Found", { status: 404 });
    logRequest(request, response.status, startTime);
    return response;
  },
});

logServerStart(port);
