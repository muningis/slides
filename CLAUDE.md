# Slides Development Guidelines

## Architecture

### Boundaries

The codebase is organized into three strict boundaries:

```
src/
├── client/     # Browser-only code (React, DOM, browser APIs)
├── server/     # Server-only code (Bun runtime, file system)
└── shared/     # Shared code (types, schemas, pure utilities)
```

- **`src/client/`** - Browser code: React components, hooks, client utilities, styles
- **`src/server/`** - Server code: HTTP routes, server utilities, Bun-specific APIs
- **`src/shared/`** - Shared code: TypeScript types, Valibot schemas, pure functions

### Import Rules

| From | Can Import From |
|------|-----------------|
| `src/client/` | `src/client/`, `src/shared/`, external packages |
| `src/server/` | `src/server/`, `src/shared/`, external packages |
| `src/shared/` | `src/shared/`, external packages only |

**CRITICAL**: These boundaries are enforced by ESLint. Violations will fail CI.

- `src/client/` **CANNOT** import from `src/server/`
- `src/server/` **CANNOT** import from `src/client/`
- `src/shared/` **CANNOT** import from `src/client/` or `src/server/`

## Forbidden Patterns

### No Barrel Files (index.ts)

**NEVER** create `index.ts` files that re-export from other files.

```typescript
// ❌ FORBIDDEN - Never create files like this:
// src/client/components/index.ts
export * from './Button.tsx';
export * from './Card.tsx';
export { default as Modal } from './Modal.tsx';
```

Why? Barrel files cause:
- Circular dependency issues
- Poor tree-shaking (larger bundles)
- Slower TypeScript compilation
- Ambiguous import sources

### No Directory Imports

```typescript
// ❌ WRONG - Directory import
import { Button } from '../components';

// ✅ CORRECT - Explicit file import
import { Button } from '../components/Button.tsx';
```

### No Extension-less Imports

```typescript
// ❌ WRONG - Missing extension
import { config } from './config';
import { App } from './App';

// ✅ CORRECT - Explicit extension
import { config } from './config.ts';
import { App } from './App.tsx';
```

## File Naming Conventions

- **Components**: PascalCase with `.tsx` extension (`Button.tsx`, `SlideViewer.tsx`)
- **Hooks**: camelCase with `use` prefix (`useSlideNavigation.ts`, `useKeyboard.ts`)
- **Utilities**: camelCase with `.ts` extension (`formatDate.ts`, `validation.ts`)
- **Types**: camelCase with `.ts` extension (`slide.ts`, `config.ts`)
- **Schemas**: camelCase with `.ts` extension, often matching type file (`slide.ts`)
- **Tests**: Match source file with `.test.ts(x)` suffix (`Button.test.tsx`)

## Code Examples

### Correct Import Patterns

```typescript
// In src/client/components/SlideViewer.tsx
import type { ReactElement } from 'react';
import type { Slide } from '../../shared/types/slide.ts';
import { SlideSchema } from '../../shared/schemas/slide.ts';
import { Button } from './Button.tsx';
import { useSlideNavigation } from '../hooks/useSlideNavigation.ts';

export function SlideViewer({ slides }: { slides: Slide[] }): ReactElement {
  const { current, next, prev } = useSlideNavigation(slides);
  // ...
}
```

### Incorrect Import Patterns

```typescript
// ❌ ALL OF THESE ARE WRONG:

// Wrong: Importing server code from client
import { getSlides } from '../../server/routes/slides.ts';

// Wrong: Directory import (requires index.ts barrel)
import { Button, Card } from '../components';

// Wrong: Missing file extension
import { formatDate } from '../lib/date';

// Wrong: Barrel re-export in any file
export * from './utils.ts';
```

## Quick Reference

| If doing this... | Put file in... |
|------------------|----------------|
| Create React component | `src/client/components/ComponentName.tsx` |
| Create React hook | `src/client/hooks/useHookName.ts` |
| Add client utility | `src/client/lib/utilityName.ts` |
| Create API route | `src/server/routes/routeName.ts` |
| Add server utility | `src/server/lib/utilityName.ts` |
| Define TypeScript types | `src/shared/types/typeName.ts` |
| Create Valibot schema | `src/shared/schemas/schemaName.ts` |
| Add pure utility function | `src/shared/lib/utilityName.ts` |

## Commands

```bash
bun run check      # Run all quality checks (typecheck + lint + test)
bun run typecheck  # TypeScript type checking
bun run lint       # ESLint (includes import boundary checks)
bun run test       # Run tests
bun run build      # Production build
bun run dev        # Development server
```

## Technologies

- **Runtime**: Bun
- **Language**: TypeScript (strict mode)
- **Frontend**: React 19, Tailwind CSS, Framer Motion
- **Validation**: Valibot
- **Linting**: ESLint with import boundary rules
- **Testing**: Bun test, Testing Library

## Project Structure

```
src/
├── client/
│   ├── components/    # React components
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Client utilities
│   ├── styles/        # CSS files
│   └── main.tsx       # Entry point
├── server/
│   ├── routes/        # HTTP handlers
│   └── lib/           # Server utilities
└── shared/
    ├── types/         # TypeScript types
    ├── schemas/       # Valibot schemas
    └── lib/           # Pure utilities
tests/
├── unit/              # Unit tests by boundary
│   ├── client/
│   ├── server/
│   └── shared/
└── integration/       # Integration tests
```

## Active Technologies
- TypeScript (strict mode) + Bun runtime (native `Bun.serve()` API - no external HTTP framework needed) (004-server-handler)
- File system (static files from `dist/` directory) (004-server-handler)

## Recent Changes
- 004-server-handler: Added TypeScript (strict mode) + Bun runtime (native `Bun.serve()` API - no external HTTP framework needed)
