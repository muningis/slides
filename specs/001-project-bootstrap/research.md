# Research: Project Bootstrap

**Feature**: 001-project-bootstrap
**Date**: 2026-01-06

## Overview

This document captures research findings for bootstrapping the Slides presentation application using the approved technology stack: Bun, TypeScript, React, Tailwind CSS, Framer Motion, and Valibot.

## Research Topics

### 1. Bun + React Project Setup

**Decision**: Use `bun create` with React template, then customize for strict TypeScript and Tailwind.

**Rationale**:
- Bun's built-in bundler eliminates need for Vite, Webpack, or other build tools
- Native TypeScript support without additional transpilation configuration
- Hot module reloading built-in via `bun --hot`
- Package management integrated (no separate npm/yarn)

**Alternatives Considered**:
- Vite + React: More ecosystem support but adds unnecessary dependency
- Create React App: Deprecated and overly opinionated
- Next.js: Overkill for initial bootstrap; adds SSR complexity not yet needed

**Implementation Notes**:
- Use `bun create react` or manual setup with `bun init`
- Configure `bunfig.toml` for development server port and hot reload
- Entry point via `public/index.html` loading `src/main.tsx`

### 2. TypeScript Strict Configuration

**Decision**: Enable all strict flags in `tsconfig.json` from day one.

**Rationale**:
- Constitution mandates strict mode (Principle II)
- Catches errors early before codebase grows
- Enforces explicit typing discipline

**Configuration**:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "skipLibCheck": true
  }
}
```

### 3. Tailwind CSS Integration with Bun

**Decision**: Use Tailwind CSS v3 with PostCSS plugin via Bun's CSS handling.

**Rationale**:
- Constitution mandates Tailwind (Principle VII, v1.1.0 amendment)
- Utility-first approach aligns with simplicity principle
- No runtime CSS-in-JS overhead

**Implementation Notes**:
- Install: `bun add -d tailwindcss postcss autoprefixer`
- Initialize: `bunx tailwindcss init -p`
- Configure content paths in `tailwind.config.ts`
- Import in `globals.css`: `@tailwind base; @tailwind components; @tailwind utilities;`

### 4. Bun Test Runner

**Decision**: Use Bun's built-in test runner with Vitest-compatible API.

**Rationale**:
- Zero additional dependencies for testing
- Jest-like API familiar to developers
- Integrated with Bun's fast execution
- Supports TypeScript natively

**Configuration**:
- Test files: `*.test.ts`, `*.test.tsx` in `tests/` directory
- Run via `bun test`
- Mock support via `bun:test` module

**Implementation Notes**:
- Use `@testing-library/react` for component testing
- Use `happy-dom` for DOM environment (lighter than jsdom)

### 5. ESLint Configuration

**Decision**: Use ESLint with TypeScript and React plugins, flat config format.

**Rationale**:
- Constitution requires linting (Quality Gates)
- Catches common React and TypeScript issues
- Enforces consistent code style

**Dependencies**:
- `eslint`
- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`

**Key Rules**:
- No unused variables (error)
- React hooks rules (error)
- Explicit function return types (warn initially)
- No console statements (error for production)

### 6. Framer Motion Setup

**Decision**: Install Framer Motion but defer animation variants to future features.

**Rationale**:
- Constitution mandates Framer Motion for animations
- Bootstrap only needs the package installed
- Animation patterns will emerge from actual feature needs

**Implementation Notes**:
- Install: `bun add framer-motion`
- Create placeholder animation variants file for future use
- No animations in initial app shell (simplicity first)

### 7. Valibot Setup

**Decision**: Install Valibot, create example schema for configuration validation.

**Rationale**:
- Constitution mandates Valibot for runtime validation
- Useful for validating environment/config even in bootstrap

**Implementation Notes**:
- Install: `bun add valibot`
- Create `src/lib/validation.ts` with common patterns
- Use for any config parsing from environment

## Summary

All technology choices are straightforward applications of the constitution's approved stack. No significant unknowns or risks identified. The Bun ecosystem provides integrated tooling that minimizes configuration complexity.

## Next Steps

Proceed to Phase 1: Design & Contracts (minimal for bootstrap - just project configuration).
