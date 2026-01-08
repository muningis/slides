# Implementation Plan: Slide Theme

**Branch**: `006-slide-theme` | **Date**: 2026-01-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-slide-theme/spec.md`

## Summary

Create a cohesive dark theme with lime/neon green accents for the slides application, based on the reference design image. The theme includes a color palette (deep olive/dark green backgrounds, lime accents), consistent typography scale, 5+ slide layouts, themed navigation indicators, and accessibility features including auto-scaling text and high-contrast mode toggle.

## Technical Context

**Language/Version**: TypeScript (strict mode) with Bun runtime
**Primary Dependencies**: React 19, Framer Motion, Tailwind CSS, Valibot
**Storage**: N/A (theme configuration in code)
**Testing**: Bun test, Testing Library
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Web application (client/server/shared boundaries)
**Performance Goals**: Theme loads within 1 second, 60fps animations
**Constraints**: WCAG AA contrast (4.5:1 minimum), minimum 14px font size
**Scale/Scope**: 6 existing slide types + navigation styling + high-contrast variant

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Test-First Development | PASS | Tests will be written before implementation |
| II. Type Safety | PASS | Theme config will be fully typed with Valibot schemas |
| III. Simplicity First | PASS | Extend existing patterns, no new abstractions |
| IV. Performance First | PASS | CSS-based theming, no runtime overhead |
| V. Component Reusability | PASS | Theme components will be composable |
| VI. Code Review Required | PASS | PR workflow applies |
| VII. Approved Technology Stack | PASS | Using Tailwind CSS, React, Framer Motion |

**Forbidden Patterns Check:**
- No `any` types
- Using Tailwind CSS utility classes (approved)
- No direct DOM manipulation
- No inline styles (Tailwind classes instead)

## Project Structure

### Documentation (this feature)

```text
specs/006-slide-theme/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - no API contracts)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── client/
│   ├── components/
│   │   ├── slides/           # Existing slide components
│   │   │   ├── TitleSlide.tsx
│   │   │   ├── TextSlide.tsx
│   │   │   ├── BulletsSlide.tsx
│   │   │   ├── CodeSlide.tsx
│   │   │   ├── TimelineSlide.tsx
│   │   │   └── variants.ts
│   │   ├── theme/            # NEW: Theme components
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── NavigationDots.tsx
│   │   │   └── HighContrastToggle.tsx
│   │   └── Presentation.tsx
│   ├── hooks/
│   │   └── useTheme.ts       # NEW: Theme hook
│   ├── lib/
│   │   └── theme.ts          # NEW: Theme configuration
│   └── styles/
│       └── index.css         # Tailwind entry
├── server/
│   └── (no changes expected)
└── shared/
    ├── types/
    │   └── theme.ts          # NEW: Theme types
    └── schemas/
        └── theme.ts          # NEW: Theme validation

tests/
├── unit/
│   ├── client/
│   │   └── theme/            # NEW: Theme unit tests
│   └── shared/
│       └── theme.ts          # NEW: Schema tests
└── integration/
    └── theme.test.tsx        # NEW: Theme integration tests
```

**Structure Decision**: Following existing client/server/shared boundaries. Theme configuration lives in client (presentation-only), with shared types/schemas for validation.

## Complexity Tracking

No constitution violations to justify.
