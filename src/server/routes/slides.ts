/**
 * Slides route handler (/slides/:slideSlug)
 * Returns HTML page that loads the presentation client
 */

/**
 * Generate HTML page for a presentation
 * @param slug - The presentation slug
 * @returns HTML string with embedded presentation data source
 */
function generatePresentationHtml(slug: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${slug} - Slides</title>
    <link rel="stylesheet" href="/styles.css" />
    <script>
      window.__PRESENTATION_SLUG__ = ${JSON.stringify(slug)};
      window.__PRESENTATION_URL__ = ${JSON.stringify(`/presentations/${slug}.json`)};
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.js"></script>
  </body>
</html>`;
}

/**
 * Handle requests to the slides route
 * @param params - Route parameters containing slideSlug
 */
export function handleSlides(params: Record<string, string>): Response {
  const { slideSlug } = params;

  // Return 404 if no slug provided
  if (!slideSlug) {
    return new Response("Not Found", { status: 404 });
  }

  const html = generatePresentationHtml(slideSlug);

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
