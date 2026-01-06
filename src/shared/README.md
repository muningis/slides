# Shared Boundary

Code shared between client and server.

## What Belongs Here

- TypeScript type definitions
- Valibot validation schemas
- Pure utility functions (no side effects)
- Constants and configuration schemas

## Import Rules

**Can Import:**
- Other files within `src/shared/`
- External npm packages

**Cannot Import:**
- Files from `src/client/` (enforced by ESLint)
- Files from `src/server/` (enforced by ESLint)

## Directory Structure

```
src/shared/
├── types/      # TypeScript type definitions
├── schemas/    # Valibot validation schemas
└── lib/        # Pure utility functions
```

## Guidelines

1. **Pure Functions Only**: Code here must work in both browser and Node/Bun
2. **No Side Effects**: Avoid file system, DOM, or network operations
3. **No Environment Dependencies**: Don't use browser-only or server-only APIs

## Examples

```typescript
// Correct: Type definitions
export interface Slide {
  id: string;
  title: string;
  content: string;
}

// Correct: Validation schemas
import * as v from 'valibot';
export const SlideSchema = v.object({
  id: v.string(),
  title: v.string(),
  content: v.string(),
});

// Correct: Pure utilities
export function formatSlideTitle(title: string): string {
  return title.trim().toUpperCase();
}

// WRONG: Browser-specific code
// document.getElementById('root');

// WRONG: Server-specific code
// import fs from 'fs';
```
