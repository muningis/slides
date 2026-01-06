/**
 * Static file serving utilities
 * Handles path validation and security
 */

/**
 * Check if a path is valid for static file serving
 * Prevents path traversal attacks
 *
 * @param path - The path to validate (can include leading slash from URL)
 */
export function isValidStaticPath(path: string): boolean {
  // Remove leading slash for validation (URLs always have leading slash)
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Decode URL-encoded characters to catch encoded traversal attempts
  const decoded = decodeURIComponent(cleanPath);

  // Reject paths containing .. (directory traversal)
  if (decoded.includes("..")) {
    return false;
  }

  // Reject absolute paths (Windows style like C:\)
  if (/^[a-zA-Z]:[/\\]/.test(decoded)) {
    return false;
  }

  // Reject backslash paths (Windows-style traversal)
  if (decoded.includes("\\")) {
    return false;
  }

  return true;
}

/**
 * Get MIME type for a file extension
 * Returns a reasonable default if extension is unknown
 */
export function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";

  const mimeTypes: Record<string, string> = {
    // JavaScript
    js: "application/javascript",
    mjs: "application/javascript",

    // CSS
    css: "text/css",

    // HTML
    html: "text/html",
    htm: "text/html",

    // Images
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    webp: "image/webp",
    ico: "image/x-icon",

    // Fonts
    woff: "font/woff",
    woff2: "font/woff2",
    ttf: "font/ttf",
    otf: "font/otf",

    // Data
    json: "application/json",
    xml: "application/xml",

    // Text
    txt: "text/plain",
    md: "text/markdown",

    // Source maps
    map: "application/json",
  };

  return mimeTypes[ext] ?? "application/octet-stream";
}

/**
 * Serve a static file from the dist directory
 * Returns null if file doesn't exist or path is invalid
 */
export async function serveStaticFile(
  path: string
): Promise<Response | null> {
  // Validate path
  if (!isValidStaticPath(path)) {
    return new Response("Forbidden", { status: 403 });
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  const file = Bun.file(`./dist/${cleanPath}`);

  if (await file.exists()) {
    return new Response(file, {
      headers: {
        "Content-Type": getMimeType(cleanPath),
      },
    });
  }

  return null;
}
