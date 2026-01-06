# Quickstart: Basic Server Handler

## Overview

This feature adds a basic HTTP server using Bun's native `Bun.serve()` API. It serves static files from the `dist/` directory and provides two routes: `/` (home) and `/slides/:slug` (presentation).

## Starting the Server

```bash
# Development mode (with hot reload)
bun run dev:server

# Production mode
bun run src/server/main.ts
```

The server starts on port 3000 by default (configurable via `PORT` environment variable).

## Routes

### Home Route (`/`)

Returns a placeholder response. Will be extended in future features.

```bash
curl http://localhost:3000/
```

### Slides Route (`/slides/:slug`)

Returns a placeholder response with the captured slug. Will render presentation HTML with injected JSON config in future features.

```bash
curl http://localhost:3000/slides/my-presentation
```

### Static Files

Any request not matching the above routes is treated as a static file request from `dist/`.

```bash
# Serves dist/main.js
curl http://localhost:3000/main.js

# Serves dist/styles.css
curl http://localhost:3000/styles.css
```

## Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `PORT` | 3000 | Server listening port |
| `NODE_ENV` | development | Environment mode |

## Security

- Path traversal attempts (e.g., `/../secret`) are rejected with 404
- Only files within `dist/` directory are accessible
- Requests are logged with timestamp, method, path, status, and duration

## Logging

All requests are logged as JSON to stdout:

```json
{"timestamp":"2026-01-06T12:00:00.000Z","method":"GET","path":"/slides/demo","status":200,"duration":5}
```

## Testing

```bash
# Run server tests
bun test tests/integration/server/
bun test tests/unit/server/
```

## File Structure

```
src/server/
├── main.ts           # Server entry point
├── routes/
│   ├── index.ts      # Home route handler
│   └── slides.ts     # Slides route handler
└── lib/
    ├── static.ts     # Static file serving
    └── logger.ts     # Request logging
```
