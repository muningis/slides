# Research: Slide Renderer

**Feature**: 005-slide-renderer
**Date**: 2026-01-06

## Technology Decisions

### 1. Animation Library: Framer Motion

**Decision**: Use Framer Motion with animation variants and AnimatePresence

**Rationale**:
- Already in approved technology stack (v12.24.7 installed)
- Built-in GPU acceleration for transform/opacity properties
- AnimatePresence handles enter/exit animations for slide transitions
- Variants system enables reusable, consistent animations

**Key Patterns**:
```typescript
// Slide transition variants
const slideVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

// AnimatePresence for slide changes
<AnimatePresence mode="wait">
  <motion.div key={currentSlide} variants={slideVariants} />
</AnimatePresence>

// GPU-friendly properties only: x, y, scale, rotate, opacity
// Avoid: width, height, top, left (trigger layout recalc)
```

**Alternatives Considered**:
- CSS animations: Less control, no exit animations
- React Spring: Similar capabilities but Framer Motion already approved
- GSAP: Overkill for our needs, larger bundle

---

### 2. Code Highlighting: CodeHike

**Decision**: Use CodeHike with server-side highlighting via `highlight()` function

**Rationale**:
- Already in approved technology stack
- 211 supported languages
- CSS-based themes (github-from-css) adapt to light/dark modes
- Server-side rendering reduces client bundle impact

**Key Patterns**:
```typescript
import { highlight } from "codehike/code"

// Server-side highlighting
const highlighted = await highlight({ code, lang }, "github-dark")

// Morphing between code versions:
// - Use shared layoutId with Framer Motion
// - Highlight both versions server-side
// - AnimatePresence handles transition
```

**Code Morphing Strategy**:
- Pre-highlight all code versions at load time
- Use Framer Motion layoutId for smooth morphing
- Animate opacity/transform between versions

**Alternatives Considered**:
- Shiki: Good but CodeHike already approved
- Prism: Client-side only, larger bundle
- Bright: Could complement CodeHike for simpler blocks

---

### 3. State Management: State Machine + Observer + Command Patterns

**Decision**: Implement custom lightweight patterns in shared/ layer (no external library)

**Rationale**:
- Navigation is inherently state-driven (FSM fits perfectly)
- Pure TypeScript = testable without React
- Observer pattern integrates cleanly with React hooks
- Command pattern encapsulates forward/backward actions
- Avoids Context API (re-render performance issues)
- Zero dependencies, keeps bundle minimal

**State Machine Design**:
```typescript
// Navigation state
interface NavigationState {
  currentSlide: number;
  currentStep: number;
  totalSlides: number;
  isAtStart: boolean;
  isAtEnd: boolean;
}

// Pure transition functions
function forward(state: NavigationState, slides: Slide[]): NavigationState
function backward(state: NavigationState, slides: Slide[]): NavigationState
```

**Architecture**:
```
src/shared/lib/navigation/
├── types.ts              # NavigationState, NavigationAction
├── machine.ts            # Pure FSM transition functions
├── controller.ts         # Observer pattern + public API
└── commands/
    ├── forward.ts        # ForwardCommand
    └── backward.ts       # BackwardCommand

src/client/hooks/
└── usePresentation.ts    # React integration (thin wrapper)
```

**Alternatives Considered**:
- XState: Excellent but overkill for ~5 states
- Zustand: Good option if complexity grows
- Redux: Too heavy for single-user presentation
- Context API: Re-render cascades hurt performance

---

### 4. Schema Validation: Valibot

**Decision**: Use Valibot for JSON configuration validation

**Rationale**:
- Already in approved technology stack
- Type inference from schemas
- Smaller bundle than Zod
- Clear error messages for invalid configurations

**Schema Structure**:
```typescript
import * as v from 'valibot';

const TitleSlideSchema = v.object({
  type: v.literal('title'),
  title: v.string(),
});

const BulletsSlideSchema = v.object({
  type: v.literal('bullets'),
  title: v.optional(v.string()),
  items: v.array(v.string()),
});

const SlideSchema = v.variant('type', [
  TitleSlideSchema,
  TitleSubtitleSlideSchema,
  TextSlideSchema,
  BulletsSlideSchema,
  CodeSlideSchema,
  TimelineSlideSchema,
]);

const PresentationSchema = v.object({
  slides: v.array(SlideSchema),
});
```

---

### 5. Component Architecture

**Decision**: Headless presentation components with Tailwind utility classes

**Rationale**:
- Spec requires "headless/unstyled components"
- Tailwind already in approved stack
- Separation of presentation logic from styling
- Each slide type = separate component

**Component Structure**:
```
src/client/components/
├── slides/
│   ├── SlideRenderer.tsx      # Dispatches to correct slide type
│   ├── TitleSlide.tsx
│   ├── TitleSubtitleSlide.tsx
│   ├── TextSlide.tsx
│   ├── BulletsSlide.tsx
│   ├── CodeSlide.tsx
│   └── TimelineSlide.tsx
├── navigation/
│   └── NavigationControls.tsx
└── presentation/
    └── Presentation.tsx       # Main container
```

---

## Implementation Priorities

1. **P1 - Foundation**: Valibot schemas, navigation state machine, basic slide rendering
2. **P2 - Core Slides**: Title, title-subtitle, text, bullets slide types
3. **P3 - Advanced Slides**: Code (with morphing), timeline slide types
4. **P3 - Polish**: Animation refinement, edge case handling

## Performance Targets

| Metric | Target | Approach |
|--------|--------|----------|
| Navigation response | <100ms | Pure function state transitions |
| Animation framerate | 60fps | GPU-accelerated properties only |
| Code highlighting | No client JS | Server-side via highlight() |
| Bundle impact | Minimal | No heavy state libraries |

## Sources

- [Framer Motion Animation](https://motion.dev/docs/react-animation)
- [Framer Motion Layout Animations](https://www.framer.com/motion/layout-animations/)
- [CodeHike Documentation](https://codehike.org/docs)
- [CodeHike Code Blocks](https://codehike.org/docs/concepts/code)
- [State Machines in React](https://medium.com/@ignatovich.dm/state-machines-in-react-advanced-state-management-beyond-redux-33ea20e59b62)
- [Observer Pattern in React](https://plainenglish.io/blog/react-hooks-and-the-observer-pattern-1e4274f0e5f5)
