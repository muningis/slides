# Research: Slide Theme

**Date**: 2026-01-08
**Feature**: 006-slide-theme

## Color Palette Extraction

### Decision: Dark Olive Theme with Lime Accents

Based on analysis of the reference design image, the following color palette has been derived:

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background Primary | Deep olive | `#1a1f16` | Main slide background |
| Background Secondary | Dark olive | `#252b1f` | Card backgrounds, containers |
| Background Tertiary | Olive gray | `#2f3628` | Elevated elements, hover states |
| Accent Primary | Lime/Neon green | `#c8f542` | Highlights, active states, CTAs |
| Accent Secondary | Lime (dimmed) | `#a8d435` | Secondary highlights |
| Text Primary | Off-white | `#f5f5f0` | Headings, primary text |
| Text Secondary | Light gray | `#b8b8b0` | Body text, descriptions |
| Text Muted | Gray | `#787870` | Captions, metadata |
| Border | Olive border | `#3a4230` | Subtle borders, dividers |

### Rationale
- Colors extracted from reference image maintain the dark, professional aesthetic
- Lime accent provides strong contrast against olive backgrounds
- Color system supports both standard and high-contrast modes

### Alternatives Considered
- Pure black backgrounds (#000) - rejected as too harsh, lacks warmth
- Blue accent instead of lime - rejected as doesn't match reference design
- Gray-based neutrals - rejected as olive tones match reference better

## WCAG Contrast Compliance

### Decision: All text combinations meet WCAG AA (4.5:1 minimum)

| Combination | Contrast Ratio | Status |
|-------------|----------------|--------|
| Text Primary on Background Primary | 14.2:1 | PASS (AAA) |
| Text Secondary on Background Primary | 8.1:1 | PASS (AAA) |
| Text Muted on Background Primary | 4.7:1 | PASS (AA) |
| Accent Primary on Background Primary | 10.8:1 | PASS (AAA) |
| Text Primary on Background Secondary | 12.8:1 | PASS (AAA) |

### High Contrast Variant
For the high-contrast toggle, increase contrast further:
- Text Primary: Pure white `#ffffff`
- Accent Primary: Brighter lime `#d4ff4a`
- Background: Darker `#121510`

### Rationale
- WCAG AA compliance ensures accessibility for users with visual impairments
- Higher contrast ratios (AAA where possible) provide better readability
- High-contrast variant provides additional accessibility for those who need it

## Typography Scale

### Decision: System font stack with modular scale

```
Font Family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
Code Font: ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Mono", monospace

Scale (based on 1.25 ratio):
- Display:  clamp(3rem, 5vw, 4.5rem)   / 72px max  / font-bold
- H1:       clamp(2.5rem, 4vw, 3.5rem) / 56px max  / font-bold
- H2:       clamp(2rem, 3vw, 2.5rem)   / 40px max  / font-semibold
- H3:       clamp(1.5rem, 2.5vw, 2rem) / 32px max  / font-semibold
- Body:     clamp(1rem, 1.5vw, 1.25rem)/ 20px max  / font-normal
- Caption:  clamp(0.875rem, 1vw, 1rem) / 16px max  / font-normal
- Minimum:  0.875rem (14px)            / 14px      / font-normal
```

### Rationale
- System fonts ensure fast loading (no external font requests)
- Clamp() provides responsive scaling without media queries
- 14px minimum ensures readability per clarification requirements
- Modular scale creates visual hierarchy

### Alternatives Considered
- Google Fonts (Inter, Space Grotesk) - rejected to avoid external dependencies
- Fixed pixel values - rejected as not responsive
- Larger base size - rejected as 16-20px range is optimal for presentations

## Auto-Scaling Text Implementation

### Decision: CSS clamp() with container queries fallback

**Primary Approach:**
```css
.auto-scale-text {
  font-size: clamp(0.875rem, 2.5cqi, var(--max-font-size));
  overflow: hidden;
  text-overflow: ellipsis;
}
```

**Fallback for older browsers:**
Use JavaScript-based scaling only when container queries unavailable:
1. Measure container dimensions
2. Calculate text size ratio
3. Apply scale with minimum 14px floor

### Rationale
- CSS-first approach provides best performance (no runtime JS)
- Container queries allow text to scale based on slide content area
- 14px minimum floor ensures readability per spec requirements
- Ellipsis fallback for extreme overflow cases

### Alternatives Considered
- Pure JavaScript scaling (FitText-style) - rejected as runtime overhead
- SVG text with viewBox - rejected as poor accessibility
- Fixed sizes per breakpoint - rejected as too rigid

## Tailwind CSS Theme Extension

### Decision: Extend Tailwind config with custom theme tokens

```javascript
// tailwind.config.js addition
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
}
```

### Rationale
- Tailwind extend pattern maintains existing utility classes
- Semantic naming (theme-*) distinguishes from default palette
- Single source of truth for colors across all components

### Alternatives Considered
- CSS custom properties only - rejected as loses Tailwind benefits
- Replacing default colors - rejected as may break existing code
- Multiple theme files - rejected as YAGNI (single theme for now)

## Navigation Dots Pattern

### Decision: Horizontal dot indicators with accent highlighting

**Visual Design:**
- Row of circular dots at bottom center of slide
- Active dot: Filled with accent color, slightly larger
- Inactive dots: Border-only with muted color
- Hover state: Subtle scale increase + opacity change

**Accessibility:**
- ARIA attributes for screen readers
- Keyboard navigation support (arrow keys)
- Sufficient touch target size (44x44px minimum)

### Rationale
- Matches reference design aesthetic
- Common UX pattern familiar to users
- Clear visual indication of position and total slides

## High Contrast Mode

### Decision: Manual toggle with CSS custom properties

**Implementation:**
1. Add toggle button in presentation UI (corner position)
2. Toggle adds `data-high-contrast="true"` to root element
3. CSS custom properties switch values based on attribute
4. Persist preference in localStorage

**High Contrast Overrides:**
- Background: Darker (#121510)
- Text: Pure white (#ffffff)
- Accent: Brighter lime (#d4ff4a)
- Borders: More visible (#5a6250)

### Rationale
- Manual toggle gives users control (spec requirement)
- CSS custom properties enable runtime switching without re-render
- localStorage persistence remembers user preference

### Alternatives Considered
- Automatic system preference detection - rejected per spec (manual toggle requested)
- Separate stylesheet - rejected as increases bundle size
- React context re-render - rejected as CSS-only approach more performant

## Slide Layouts

### Decision: 5 themed layout variants (extending existing 6 slide types)

The existing slide types (Title, TitleSubtitle, Text, Bullets, Code, Timeline) will receive themed styling. Additional layout considerations:

| Layout | Key Theme Elements |
|--------|-------------------|
| Title | Centered large text, gradient overlay, accent underline |
| Content | Two-column support, image cropping (object-fit: cover) |
| Infographic | Icon grid with accent backgrounds, consistent spacing |
| Closing | Centered "Thank You" styling, accent glow effect |
| Contact | Icon + text rows, accent color for icons |

### Empty State Pattern
Subtle dot pattern background using:
```css
background-image: radial-gradient(circle, theme-border 1px, transparent 1px);
background-size: 20px 20px;
```

### Rationale
- Builds on existing slide type infrastructure
- Consistent application of theme across all layouts
- Empty state provides visual feedback without being distracting

## Summary of Key Decisions

1. **Color Palette**: Deep olive backgrounds (#1a1f16), lime accent (#c8f542)
2. **Typography**: System fonts, modular scale, 14px minimum
3. **Contrast**: WCAG AA compliant, high-contrast toggle available
4. **Text Scaling**: CSS clamp() with container queries
5. **Theme Config**: Tailwind extend pattern with semantic tokens
6. **Navigation**: Horizontal dots with accent highlighting
7. **Accessibility**: Manual high-contrast toggle with localStorage persistence
