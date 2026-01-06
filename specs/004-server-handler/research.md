# Research: Basic Server Handler

**Feature**: 004-server-handler
**Date**: 2026-01-06

## Research Topics

### 1. Bun.serve() API for HTTP Server

**Decision**: Use Bun's native `Bun.serve()` API

**Rationale**:
- Bun is already the approved runtime in the constitution
- `Bun.serve()` provides a high-performance HTTP server out of the box
- No external dependencies needed (Hono, Express, etc.)
- Native TypeScript support
- Built-in static file serving via `Bun.file()`

**Alternatives Considered**:
- Hono: Lightweight, but adds a dependency when Bun.serve() suffices
- Express: Not compatible with Bun's native APIs, requires polyfills
- Elysia: Feature-rich but overkill for simple routing needs

**Implementation**:
```typescript
Bun.serve({
  port: config.port,
  fetch(request) {
    // Route handling logic
    return new Response("Hello");
  },
});
```

### 2. Static File Serving Strategy

**Decision**: Serve files from `dist/` directory using `Bun.file()`

**Rationale**:
- `dist/` contains built client assets (from `bun run build`)
- `Bun.file()` provides efficient file streaming
- Automatically handles Content-Type based on file extension
- Supports range requests for large files

**Alternatives Considered**:
- Serve from `src/`: Would serve unbuilt source files
- Use CDN: Unnecessary for development, can be added later for production

**Implementation**:
```typescript
const file = Bun.file(`./dist/${path}`);
if (await file.exists()) {
  return new Response(file);
}
return new Response("Not Found", { status: 404 });
```

### 3. Route Matching Pattern

**Decision**: Simple string matching with manual parameter extraction

**Rationale**:
- Only two routes needed: `/` and `/slides/:slug`
- No complex routing patterns required
- Keeps the codebase simple per constitution principle III
- Can upgrade to a router library later if needed

**Alternatives Considered**:
- URLPattern API: More powerful but adds complexity
- Hono/router library: Overkill for two routes
- Regex-based routing: Error-prone, harder to maintain

**Implementation**:
```typescript
const url = new URL(request.url);
const path = url.pathname;

if (path === "/") {
  return handleIndex(request);
}

if (path.startsWith("/slides/")) {
  const slug = path.slice("/slides/".length);
  return handleSlides(request, slug);
}
```

### 4. Path Traversal Prevention

**Decision**: Normalize and validate paths before serving files

**Rationale**:
- Security requirement from spec (FR-006)
- Prevent accessing files outside `dist/` directory
- Simple string validation is sufficient for this use case

**Alternatives Considered**:
- Sandbox/chroot: Too complex for the use case
- Whitelist approach: Would require maintaining file list

**Implementation**:
```typescript
function isValidStaticPath(path: string): boolean {
  // Reject paths containing ..
  if (path.includes("..")) return false;
  // Normalize and ensure it stays within dist/
  const normalized = path.replace(/\\/g, "/");
  return !normalized.includes("..");
}
```

### 5. Request Logging

**Decision**: Structured JSON logging to stdout

**Rationale**:
- Constitution forbids console.log in production
- JSON format enables log aggregation and parsing
- Stdout allows piping to log collectors

**Alternatives Considered**:
- Pino/Winston: External dependency, overkill for basic logging
- No logging: Violates FR-008, hinders debugging

**Implementation**:
```typescript
function logRequest(req: Request, status: number, duration: number): void {
  const log = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: new URL(req.url).pathname,
    status,
    duration,
  };
  process.stdout.write(JSON.stringify(log) + "\n");
}
```

## Technical Decisions Summary

| Decision | Choice | Key Benefit |
|----------|--------|-------------|
| HTTP Server | Bun.serve() | No dependencies, high performance |
| Static Files | Bun.file() from dist/ | Native streaming, auto content-type |
| Routing | Manual string matching | Simple, no dependencies |
| Security | Path validation | Prevents traversal attacks |
| Logging | Structured JSON to stdout | Production-ready, parseable |
