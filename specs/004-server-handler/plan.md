# Implementation Plan: Basic Server Handler

**Branch**: `004-server-handler` | **Date**: 2026-01-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-server-handler/spec.md`

## Summary

Implement a basic HTTP server using Bun's native `Bun.serve()` API that serves static files from the `dist/` directory and handles two routes: `/` (index) and `/slides/:slug` (presentation route). Both routes return placeholder responses for now, establishing the routing foundation for future features.

## Technical Context

**Language/Version**: TypeScript (strict mode)
**Primary Dependencies**: Bun runtime (native `Bun.serve()` API - no external HTTP framework needed)
**Storage**: File system (static files from `dist/` directory)
**Testing**: `bun test` with integration tests for HTTP endpoints
**Target Platform**: Server (Bun runtime)
**Project Type**: Single project with client/server separation (uses existing `src/server/` boundary)
**Performance Goals**: Static files <100ms, routes <50ms response time
**Constraints**: Path traversal prevention, configurable port
**Scale/Scope**: Single server instance, development and production modes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Test-First Development | PASS | Integration tests will be written for all routes and static file serving |
| II. Type Safety | PASS | TypeScript strict mode, all handlers fully typed |
| III. Simplicity First | PASS | Using Bun's native API, no external framework |
| IV. Performance First | PASS | Bun's native file serving is highly optimized |
| V. Component Reusability | N/A | Server-side feature, no UI components |
| VI. Code Review Required | PASS | PR required before merge |
| VII. Approved Technology Stack | PASS | Bun runtime is approved for server-side routing |

**Forbidden Patterns Check**:
- No `any` types
- No inline styles (server-side)
- No direct DOM manipulation (server-side)
- No synchronous file I/O (Bun.file is async)
- No console.log (will use structured logging)

**Gate Status**: PASS - No violations

## Project Structure

### Documentation (this feature)

```text
specs/004-server-handler/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── client/              # Existing client code (untouched)
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   └── main.tsx
├── server/              # Server code (this feature)
│   ├── routes/          # Route handlers
│   │   ├── index.ts     # Home route (/)
│   │   └── slides.ts    # Slides route (/slides/:slug)
│   ├── lib/             # Server utilities
│   │   ├── static.ts    # Static file serving logic
│   │   └── logger.ts    # Request logging
│   └── main.ts          # Server entry point
└── shared/              # Shared code (untouched)
    └── lib/
        └── config.ts

tests/
├── integration/
│   └── server/          # Server integration tests
│       ├── routes.test.ts
│       └── static.test.ts
└── unit/
    └── server/          # Server unit tests
        └── static.test.ts
```

**Structure Decision**: Uses the existing `src/server/` boundary established in feature 003-architecture-boundaries. Route handlers go in `routes/`, utilities in `lib/`.

## Complexity Tracking

> No violations to justify - all constitution principles satisfied.
