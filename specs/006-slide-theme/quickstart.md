# Quickstart: Slide Theme Implementation

**Date**: 2026-01-08
**Feature**: 006-slide-theme

## Prerequisites

- Bun installed (v1.0+)
- Repository cloned and dependencies installed (`bun install`)
- Familiarity with React, Tailwind CSS, and TypeScript

## Getting Started

### 1. Run the Development Server

```bash
bun run dev
```

Access the application at `http://localhost:3000`

### 2. Key Files to Understand

| File | Purpose |
|------|---------|
| `src/client/App.tsx` | Root component with background styling |
| `src/client/components/Presentation.tsx` | Slide container and navigation |
| `src/client/components/slides/*.tsx` | Individual slide type components |
| `src/shared/types/presentation.ts` | Slide type definitions |
| `tailwind.config.js` | Tailwind configuration (extend for theme) |

### 3. Implementation Order

Follow this sequence for implementation:

1. **Shared Types & Schemas** (`src/shared/`)
   - Define `Theme`, `ThemeColors`, `ThemeTypography` types
   - Create Valibot schemas for validation

2. **Tailwind Configuration** (`tailwind.config.js`)
   - Extend colors with theme tokens
   - Add custom font sizes if needed

3. **Theme Configuration** (`src/client/lib/theme.ts`)
   - Export default theme object
   - Export high-contrast variant

4. **Theme Context** (`src/client/components/theme/`)
   - Create `ThemeProvider.tsx` with React context
   - Create `useTheme.ts` hook for consuming theme

5. **Update Slide Components** (`src/client/components/slides/`)
   - Replace hardcoded Tailwind classes with theme classes
   - Update each slide type component

6. **Navigation Dots** (`src/client/components/theme/NavigationDots.tsx`)
   - Create themed navigation indicator component
   - Integrate with existing navigation logic

7. **High Contrast Toggle** (`src/client/components/theme/HighContrastToggle.tsx`)
   - Create toggle button component
   - Implement localStorage persistence

## Code Examples

### Theme Type Definition

```typescript
// src/shared/types/theme.ts
export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  accent: {
    primary: string;
    secondary: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  highContrast: ThemeColors;
  // ... typography, spacing, effects
}
```

### Theme Provider Pattern

```typescript
// src/client/components/theme/ThemeProvider.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Theme, ThemeMode } from '../../../shared/types/theme.ts';
import { darkOliveTheme } from '../../lib/theme.ts';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  toggleMode: () => void;
  colors: ThemeColors; // Resolved based on mode
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme-mode') as ThemeMode) || 'default';
    }
    return 'default';
  });

  const toggleMode = () => {
    const newMode = mode === 'default' ? 'high-contrast' : 'default';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  const colors = mode === 'high-contrast'
    ? darkOliveTheme.highContrast
    : darkOliveTheme.colors;

  return (
    <ThemeContext.Provider value={{ theme: darkOliveTheme, mode, toggleMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Tailwind Theme Extension

```javascript
// tailwind.config.js
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'theme-bg': {
          DEFAULT: '#1a1f16',
          secondary: '#252b1f',
          tertiary: '#2f3628',
        },
        'theme-accent': {
          DEFAULT: '#c8f542',
          dim: '#a8d435',
        },
        'theme-text': {
          DEFAULT: '#f5f5f0',
          secondary: '#b8b8b0',
          muted: '#787870',
        },
        'theme-border': '#3a4230',
      },
    },
  },
  plugins: [],
};
```

### Themed Slide Component Example

```typescript
// Before (hardcoded)
<div className="bg-slate-900 text-white">

// After (themed)
<div className="bg-theme-bg text-theme-text">
```

### Navigation Dots Component

```typescript
// src/client/components/theme/NavigationDots.tsx
interface NavigationDotsProps {
  total: number;
  current: number;
  onNavigate?: (index: number) => void;
}

export function NavigationDots({ total, current, onNavigate }: NavigationDotsProps) {
  return (
    <div className="flex gap-2 justify-center" role="navigation" aria-label="Slide navigation">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onNavigate?.(i)}
          className={`
            w-3 h-3 rounded-full transition-all
            ${i === current
              ? 'bg-theme-accent scale-125'
              : 'border border-theme-border hover:border-theme-accent'
            }
          `}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === current ? 'true' : undefined}
        />
      ))}
    </div>
  );
}
```

## Testing

### Run Tests

```bash
bun run test              # Run all tests
bun run test --watch      # Watch mode
```

### Test Examples

```typescript
// tests/unit/shared/theme.test.ts
import { describe, test, expect } from 'bun:test';
import { ThemeSchema } from '../../../src/shared/schemas/theme.ts';
import { darkOliveTheme } from '../../../src/client/lib/theme.ts';

describe('Theme Schema', () => {
  test('validates default theme', () => {
    const result = ThemeSchema.safeParse(darkOliveTheme);
    expect(result.success).toBe(true);
  });
});
```

## Verification Checklist

After implementation, verify:

- [ ] All slide types render with theme colors
- [ ] Text contrast meets WCAG AA (4.5:1)
- [ ] Navigation dots show correct position
- [ ] High contrast toggle works and persists
- [ ] Text auto-scales with 14px minimum
- [ ] Empty slides show placeholder pattern
- [ ] Images crop to fit containers
- [ ] All tests pass (`bun run check`)
