# Implementation Plan: Architecture & Import Boundaries

**Branch**: `003-architecture-boundaries` | **Date**: 2026-01-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-architecture-boundaries/spec.md`

## Summary

Define and enforce a clear architecture with client/server/shared boundaries, explicit import rules, no barrel files, and an agent rules file for AI coding assistants. This establishes the foundation for maintainable, scalable code organization.

## Technical Context

**Language/Version**: TypeScript (strict mode)
**Primary Dependencies**: ESLint with import boundary plugin, Bun runtime
**Storage**: N/A (architecture/configuration only)
**Testing**: `bun test` (existing test suite), ESLint for boundary enforcement
**Target Platform**: Browser (client), Bun server (server)
**Project Type**: Single project with client/server separation within src/
**Performance Goals**: N/A (architectural constraints, not runtime performance)
**Constraints**: No barrel files (index.ts), explicit imports only, unidirectional dependencies
**Scale/Scope**: Single repository with three boundaries (client, server, shared)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Test-First Development | N/A | Architecture feature - lint rules are the "tests" |
| II. Type Safety | PASS | TypeScript strict mode enforced across all boundaries |
| III. Simplicity First | PASS | Three clear boundaries, simple import rules |
| IV. Performance First | PASS | No barrel files improves tree-shaking |
| V. Component Reusability | PASS | Client boundary contains reusable components |
| VI. Code Review Required | PASS | Architectural changes require review |
| VII. Approved Technology Stack | PASS | ESLint is standard tooling |

**Forbidden Patterns (Constitution)**: This feature ADDS new forbidden patterns:
- Barrel files (index.ts re-exports)
- Directory imports (must use explicit file paths)
- Cross-boundary imports (client→server, server→client)

**Gate Status**: PASS - No violations

## Project Structure

### Documentation (this feature)

```text
specs/003-architecture-boundaries/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── client/              # Browser-only code (slides engine, UI, animations)
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Client utilities (no server deps)
│   └── main.tsx         # Client entry point
│
├── server/              # Server-only code (Bun runtime)
│   ├── routes/          # HTTP route handlers
│   ├── lib/             # Server utilities (file system, etc.)
│   └── main.ts          # Server entry point
│
└── shared/              # Code shared between client and server
    ├── types/           # TypeScript type definitions
    ├── schemas/         # Valibot validation schemas
    └── lib/             # Pure utility functions (no side effects)

tests/
├── unit/                # Unit tests (per boundary)
│   ├── client/
│   ├── server/
│   └── shared/
└── integration/         # Integration tests

CLAUDE.md                # Agent rules file (AI coding assistant guidance)
```

**Structure Decision**: Single `src/` directory with explicit `client/`, `server/`, `shared/` subdirectories. This maintains a flat structure while enforcing clear boundaries. No `index.ts` files anywhere.

**Import Rules**:
- `shared/` → can be imported by both `client/` and `server/`
- `client/` → can only import from `client/` and `shared/`
- `server/` → can only import from `server/` and `shared/`
- External dependencies → exempt from boundary rules
- All imports must use explicit file paths (e.g., `./lib/utils.ts` not `./lib/`)

## Complexity Tracking

> No violations to justify - all constitution principles satisfied.
