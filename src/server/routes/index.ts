/**
 * Home route handler (/)
 * Returns a placeholder response for the landing page
 */

/**
 * Handle requests to the home route
 */
export function handleIndex(): Response {
  return new Response("Slides - Coming Soon", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}
