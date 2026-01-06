# Server Boundary

Server-only code running on Bun runtime.

## What Belongs Here

- HTTP route handlers
- Server-side utilities (file system, environment)
- API endpoints
- Server entry point (`main.ts`)

## Import Rules

**Can Import:**
- Other files within `src/server/`
- Files from `src/shared/`
- External npm packages

**Cannot Import:**
- Files from `src/client/` (enforced by ESLint)

## Directory Structure

```
src/server/
├── routes/     # HTTP route handlers
├── lib/        # Server utilities
└── main.ts     # Server entry point
```

## Examples

```typescript
// Correct: Import from shared
import type { Slide } from '../../shared/types/slide.ts';
import { SlideSchema } from '../../shared/schemas/slide.ts';

// Correct: Import from server
import { handleSlideRequest } from '../routes/slides.ts';
import { readSlideFile } from '../lib/filesystem.ts';

// WRONG: Import from client - will fail lint
// import { SlideComponent } from '../../client/components/Slide.tsx';
```
