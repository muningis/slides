# Architecture

This document describes the architecture boundaries and import rules for the Slides project.

## Directory Structure

```
src/
├── client/     # Browser-only code (React, DOM, browser APIs)
├── server/     # Server-only code (Bun runtime, file system)
└── shared/     # Shared code (types, schemas, pure utilities)
```

## Import Rules

The project enforces strict import boundaries to maintain clean separation between client and server code.

```
┌─────────────────────────────────────────────────────────────┐
│                        src/shared/                          │
│  Types, Schemas, Pure Utilities                             │
│  (can only import from shared or external packages)         │
└─────────────────────────────────────────────────────────────┘
                    ▲                    ▲
                    │                    │
         ┌─────────┴────────┐ ┌────────┴─────────┐
         │                  │ │                  │
         │   src/client/    │ │   src/server/    │
         │   Browser Code   │ │   Server Code    │
         │                  │ │                  │
         └──────────────────┘ └──────────────────┘
                    │                    │
                    └────────╳───────────┘
                         FORBIDDEN
```

### Summary Table

| From | Can Import |
|------|------------|
| `src/client/` | `src/client/`, `src/shared/`, external packages |
| `src/server/` | `src/server/`, `src/shared/`, external packages |
| `src/shared/` | `src/shared/`, external packages |

### Forbidden Imports

- `src/client/` **cannot** import from `src/server/`
- `src/server/` **cannot** import from `src/client/`
- `src/shared/` **cannot** import from `src/client/` or `src/server/`

## No Barrel Files

This project prohibits barrel files (`index.ts` that re-export from other files).

### Why?

1. **Circular dependencies**: Barrel files are the #1 cause of circular import issues
2. **Poor tree-shaking**: Bundlers often import the entire barrel, increasing bundle size
3. **Slower TypeScript**: More files to analyze during type checking
4. **Ambiguous imports**: Unclear where exports actually come from

### Correct vs Incorrect

```typescript
// ❌ INCORRECT: Directory import (requires index.ts)
import { Button } from '../components';
import { formatDate } from '../lib';

// ❌ INCORRECT: Missing file extension
import { Button } from '../components/Button';

// ✅ CORRECT: Explicit file path with extension
import { Button } from '../components/Button.tsx';
import { formatDate } from '../lib/date.ts';
```

### Never Create These Files

```typescript
// ❌ NEVER create src/client/components/index.ts like this:
export * from './Button.tsx';
export * from './Card.tsx';
export { default as Modal } from './Modal.tsx';
```

## File Extensions

All imports must include explicit file extensions (`.ts`, `.tsx`).

```typescript
// ✅ Correct
import { config } from './config.ts';
import { App } from './App.tsx';

// ❌ Incorrect
import { config } from './config';
import { App } from './App';
```

## Enforcement

These rules are enforced by ESLint:

- `import/no-restricted-paths`: Blocks cross-boundary imports
- `import/extensions`: Requires explicit file extensions
- `no-restricted-syntax`: Blocks barrel exports (`export *`)

Run `bun run lint` to check for violations.

## Quick Reference

| If you need to... | Put it in... |
|-------------------|--------------|
| Create a React component | `src/client/components/` |
| Create a React hook | `src/client/hooks/` |
| Add client-side utility | `src/client/lib/` |
| Create an API route | `src/server/routes/` |
| Add server utility | `src/server/lib/` |
| Define TypeScript types | `src/shared/types/` |
| Create validation schema | `src/shared/schemas/` |
| Add pure utility function | `src/shared/lib/` |
