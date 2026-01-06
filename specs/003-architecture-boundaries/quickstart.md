# Quickstart: Architecture & Import Boundaries

## Overview

This feature establishes a clear architecture with three boundaries (client, server, shared) and enforces import rules to prevent circular dependencies and maintain clean code organization.

## Directory Structure

```
src/
├── client/              # Browser-only code
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Client utilities
│   └── main.tsx         # Client entry point
│
├── server/              # Server-only code (Bun)
│   ├── routes/          # HTTP route handlers
│   ├── lib/             # Server utilities
│   └── main.ts          # Server entry point
│
└── shared/              # Code for both client and server
    ├── types/           # TypeScript type definitions
    ├── schemas/         # Valibot validation schemas
    └── lib/             # Pure utility functions
```

## Import Rules

| From | Can Import |
|------|------------|
| `src/client/` | `src/client/`, `src/shared/`, external packages |
| `src/server/` | `src/server/`, `src/shared/`, external packages |
| `src/shared/` | `src/shared/`, external packages |

**Forbidden:**
- `src/client/` cannot import from `src/server/`
- `src/server/` cannot import from `src/client/`

## How to Add New Code

### 1. Determine the Boundary

Ask yourself:
- Does it need browser APIs (DOM, window, React)? → `src/client/`
- Does it need server APIs (file system, Bun.serve)? → `src/server/`
- Is it pure logic with no environment dependencies? → `src/shared/`

### 2. Create the File

**Always use explicit file paths:**

```typescript
// ✅ GOOD - explicit path with extension
import { Button } from '../components/Button.tsx';
import { validateSlide } from '../../shared/schemas/slide.ts';

// ❌ BAD - directory import (requires index.ts)
import { Button } from '../components';

// ❌ BAD - missing extension
import { Button } from '../components/Button';
```

### 3. Never Create Barrel Files

```typescript
// ❌ NEVER create index.ts files like this:
// src/client/components/index.ts
export * from './Button.tsx';
export * from './Card.tsx';

// ✅ GOOD - import directly from files
import { Button } from './components/Button.tsx';
import { Card } from './components/Card.tsx';
```

## Verifying Boundaries

Run ESLint to check for boundary violations:

```bash
bun run lint
```

ESLint will error if:
- Client code imports from server
- Server code imports from client
- Any index.ts barrel files exist
- Any directory imports are used

## Common Patterns

### Shared Types

```typescript
// src/shared/types/slide.ts
export interface Slide {
  id: string;
  title: string;
  content: string;
}

// Use in client:
import type { Slide } from '../../shared/types/slide.ts';

// Use in server:
import type { Slide } from '../../shared/types/slide.ts';
```

### Shared Validation

```typescript
// src/shared/schemas/slide.ts
import * as v from 'valibot';

export const SlideSchema = v.object({
  id: v.string(),
  title: v.string(),
  content: v.string(),
});

export type Slide = v.InferOutput<typeof SlideSchema>;
```

## For AI Agents (Claude Code)

Read `CLAUDE.md` at the repository root for:
- Complete architecture rules
- Forbidden patterns with examples
- File naming conventions
- Import path requirements

The rules in `CLAUDE.md` are enforced by ESLint. Following them ensures your code passes CI.
