# Research: Architecture & Import Boundaries

**Feature**: 003-architecture-boundaries
**Date**: 2026-01-06

## Research Topics

### 1. ESLint Import Boundary Enforcement

**Decision**: Use `eslint-plugin-import` with custom boundary rules in flat config

**Rationale**:
- ESLint is already in the project (approved tooling)
- `eslint-plugin-import` provides `no-restricted-paths` rule for boundary enforcement
- Flat config (eslint.config.js) is the modern ESLint approach
- Rules can be configured per-directory to enforce boundaries

**Alternatives Considered**:
- `eslint-plugin-boundaries`: More powerful but adds a new dependency
- TypeScript project references: Complex setup, harder to understand
- Manual code review only: Not enforceable, prone to human error

**Implementation**:
```javascript
// In eslint.config.js, use no-restricted-paths:
{
  rules: {
    'import/no-restricted-paths': ['error', {
      zones: [
        { target: './src/client', from: './src/server' },
        { target: './src/server', from: './src/client' },
      ]
    }]
  }
}
```

### 2. Barrel File Prevention

**Decision**: Use ESLint rule to forbid `index.ts` files and directory imports

**Rationale**:
- Barrel files cause:
  - Circular dependency issues (most common problem)
  - Poor tree-shaking (bundler imports entire barrel)
  - Slower TypeScript compilation
  - Confusing import paths
- Explicit imports are clearer and more maintainable

**Alternatives Considered**:
- Allow barrels with careful management: Adds cognitive load, easy to break
- Use barrels only at boundary roots: Still has tree-shaking issues
- No enforcement: Relies on discipline, will degrade over time

**Implementation**:
```javascript
// ESLint rule to prevent index.ts files
{
  rules: {
    'no-restricted-syntax': ['error', {
      selector: 'ExportAllDeclaration',
      message: 'Barrel exports (export *) are forbidden. Use explicit exports.'
    }]
  }
}
```

Also add to CLAUDE.md:
```markdown
## Forbidden Patterns

### No Barrel Files (index.ts)
NEVER create index.ts files that re-export from other files.

❌ BAD:
// src/client/components/index.ts
export * from './Button.tsx';
export * from './Card.tsx';

✅ GOOD:
// Import directly from the file
import { Button } from './components/Button.tsx';
import { Card } from './components/Card.tsx';
```

### 3. Directory Import Prevention

**Decision**: Require explicit file extensions in imports

**Rationale**:
- Directory imports (import from `./lib/`) rely on index.ts
- Explicit paths (import from `./lib/utils.ts`) are unambiguous
- Bun supports explicit extensions natively
- TypeScript with `moduleResolution: bundler` supports this

**Alternatives Considered**:
- Allow extensionless imports: Ambiguous, requires resolution logic
- Use path aliases: Adds complexity, harder to refactor

**Implementation**:
```javascript
// ESLint rule
{
  rules: {
    'import/extensions': ['error', 'always', { ignorePackages: true }]
  }
}
```

### 4. Agent Rules File Structure

**Decision**: Expand CLAUDE.md with architecture section and forbidden patterns

**Rationale**:
- CLAUDE.md already exists and is read by Claude Code
- Single source of truth for AI agents
- Human-readable format serves as documentation too
- Can include examples of correct vs incorrect patterns

**Alternatives Considered**:
- Separate .ai-rules file: Adds another file to maintain
- JSON/YAML config: Less readable, harder to include examples
- Inline comments only: Not discoverable by agents

**Structure**:
```markdown
# CLAUDE.md

## Architecture

### Boundaries
- src/client/ - Browser code only
- src/server/ - Server code only
- src/shared/ - Shared code (types, schemas, pure utils)

### Import Rules
[Explicit rules about what can import what]

## Forbidden Patterns
[List with examples of what NOT to do]

## File Naming
[Conventions for file naming]
```

### 5. Migration Strategy

**Decision**: Reorganize existing src/ structure to new boundaries

**Rationale**:
- Current structure: `src/components/`, `src/lib/`, `src/main.tsx`
- All current code is client-side (slides engine)
- Server code doesn't exist yet (will be added later)
- Migration is straightforward: move existing code to `src/client/`

**Migration Steps**:
1. Create new directory structure
2. Move existing files to `src/client/`
3. Update imports throughout codebase
4. Add ESLint rules
5. Update CLAUDE.md
6. Verify all tests pass

## Technical Decisions Summary

| Decision | Choice | Key Benefit |
|----------|--------|-------------|
| Boundary Enforcement | `eslint-plugin-import` no-restricted-paths | Built-in ESLint, no new deps |
| Barrel Prevention | ESLint no-restricted-syntax | Catches re-exports at lint time |
| Explicit Imports | import/extensions rule | Unambiguous, no index.ts needed |
| Agent Rules | Expanded CLAUDE.md | Single source, human+AI readable |
| Migration | Move to src/client/ | Simple, non-breaking |
