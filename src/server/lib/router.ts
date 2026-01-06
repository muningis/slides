/**
 * Simple router builder for Bun.serve()
 * Supports path parameters (e.g., /slides/:slideSlug) and automatic request logging
 */

import { logRequest } from "./logger.ts";
import { serveStaticFile } from "./static.ts";

type RouteParams = Record<string, string>;
type RouteHandler = (
  params: RouteParams,
  request: Request
) => Response | Promise<Response>;

interface Route {
  pattern: string;
  regex: RegExp;
  paramNames: string[];
  handler: RouteHandler;
}

interface RouterConfig {
  routes: Route[];
  staticPath: string | null;
  notFoundHandler: RouteHandler | null;
}

/**
 * Parse a route pattern into a regex and extract param names
 * e.g., "/slides/:slideSlug" -> { regex: /^\/slides\/([^/]+)$/, paramNames: ["slideSlug"] }
 */
function parsePattern(pattern: string): { regex: RegExp; paramNames: string[] } {
  const paramNames: string[] = [];
  const regexPattern = pattern.replace(
    /:([a-zA-Z_][a-zA-Z0-9_]*)/g,
    (_match: string, name: string) => {
      paramNames.push(name);
      return "([^/]+)";
    }
  );
  return {
    regex: new RegExp(`^${regexPattern}$`),
    paramNames,
  };
}

/**
 * Match a path against a route and extract params
 */
function matchRoute(
  path: string,
  route: Route
): RouteParams | null {
  const match = path.match(route.regex);
  if (!match) return null;

  const params: RouteParams = {};
  route.paramNames.forEach((name, index) => {
    const value = match[index + 1];
    if (value !== undefined) {
      params[name] = decodeURIComponent(value);
    }
  });
  return params;
}

interface RouterBuilder {
  get: (pattern: string, handler: RouteHandler) => RouterBuilder;
  static: (basePath: string) => RouterBuilder;
  notFound: (handler: RouteHandler) => RouterBuilder;
  build: () => (request: Request) => Promise<Response>;
}

/**
 * Router builder for creating Bun.serve() fetch handlers
 */
export function createRouter(): RouterBuilder {
  const config: RouterConfig = {
    routes: [],
    staticPath: null,
    notFoundHandler: null,
  };

  const builder: RouterBuilder = {
    /**
     * Register a GET route with optional path parameters
     * @param pattern - Route pattern (e.g., "/slides/:slideSlug")
     * @param handler - Route handler function
     */
    get(pattern: string, handler: RouteHandler): RouterBuilder {
      const { regex, paramNames } = parsePattern(pattern);
      config.routes.push({ pattern, regex, paramNames, handler });
      return builder;
    },

    /**
     * Enable static file serving from a directory
     * @param basePath - URL base path for static files
     */
    static(basePath: string): RouterBuilder {
      config.staticPath = basePath;
      return builder;
    },

    /**
     * Set the 404 not found handler
     * @param handler - Handler for unmatched routes
     */
    notFound(handler: RouteHandler): RouterBuilder {
      config.notFoundHandler = handler;
      return builder;
    },

    /**
     * Build the fetch handler for Bun.serve()
     * Automatically wraps all responses with request logging
     */
    build(): (request: Request) => Promise<Response> {
      return async (request: Request): Promise<Response> => {
        const startTime = Date.now();
        const url = new URL(request.url);
        const path = url.pathname;

        let response: Response;

        // Try matching registered routes
        for (const route of config.routes) {
          const params = matchRoute(path, route);
          if (params !== null) {
            response = await route.handler(params, request);
            logRequest(request, response.status, startTime);
            return response;
          }
        }

        // Try static file serving
        if (config.staticPath !== null) {
          const staticResponse = await serveStaticFile(path);
          if (staticResponse) {
            logRequest(request, staticResponse.status, startTime);
            return staticResponse;
          }
        }

        // Use notFound handler or default 404
        if (config.notFoundHandler) {
          response = await config.notFoundHandler({}, request);
        } else {
          response = new Response("Not Found", { status: 404 });
        }
        logRequest(request, response.status, startTime);
        return response;
      };
    },
  };

  return builder;
}
