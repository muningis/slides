# Client Boundary

Browser-only code for the Slides presentation application.

## What Belongs Here

- React components (UI elements, layouts, pages)
- Custom React hooks (state management, effects)
- Client-side utilities (DOM manipulation, browser APIs)
- Styles (CSS, Tailwind configurations)
- Entry point (`main.tsx`)

## Import Rules

**Can Import:**
- Other files within `src/client/`
- Files from `src/shared/`
- External npm packages

**Cannot Import:**
- Files from `src/server/` (enforced by ESLint)

## Directory Structure

```
src/client/
├── components/     # React components
├── hooks/          # Custom React hooks
├── lib/            # Client utilities
├── styles/         # CSS and styling
└── main.tsx        # Application entry point
```

## Examples

```typescript
// Correct: Import from shared
import type { Slide } from '../../shared/types/slide.ts';
import { SlideSchema } from '../../shared/schemas/slide.ts';

// Correct: Import from client
import { Button } from '../components/Button.tsx';
import { useSlideNavigation } from '../hooks/useSlideNavigation.ts';

// WRONG: Import from server - will fail lint
// import { getSlides } from '../../server/routes/slides.ts';
```
