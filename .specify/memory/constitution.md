<!--
================================================================================
SYNC IMPACT REPORT
================================================================================
Version change: 0.0.0 → 1.0.0
Bump rationale: Initial constitution creation (MAJOR - first governance document)

Modified principles: N/A (initial creation)

Added sections:
- Core Principles (7 principles defined)
- Technology Constraints (tech stack requirements)
- Development Workflow (quality gates and process)
- Governance (amendment procedures)

Removed sections: N/A (initial creation)

Templates requiring updates:
- .specify/templates/plan-template.md: ✅ No changes required (Constitution Check
  section already present and will be populated dynamically)
- .specify/templates/spec-template.md: ✅ No changes required (requirements and
  testing sections align with principles)
- .specify/templates/tasks-template.md: ✅ No changes required (phase structure
  supports test-first and parallel execution)
- .specify/templates/checklist-template.md: ✅ No changes required (generic template)

Follow-up TODOs: None
================================================================================
-->

# Slides Constitution

## Core Principles

### I. Test-First Development (NON-NEGOTIABLE)

All features MUST follow Test-Driven Development:

- Tests MUST be written before implementation code
- Tests MUST fail before implementation begins (Red-Green-Refactor cycle)
- No feature is considered complete without passing tests
- Integration tests MUST cover user-facing functionality
- Unit tests MUST cover business logic and edge cases

**Rationale**: Test-first development ensures correctness, documents expected behavior,
and prevents regression. Writing tests first clarifies requirements before implementation.

### II. Type Safety

TypeScript strict mode is mandatory across the entire codebase:

- All code MUST be written in TypeScript with `strict: true` compiler option
- `any` type is forbidden except when interfacing with untyped external libraries
- All function parameters and return types MUST be explicitly typed
- Use Valibot for runtime validation of external data (API responses, user input)
- Type assertions (`as`) MUST include a comment justifying their necessity

**Rationale**: Strong typing catches errors at compile time, improves IDE support,
and serves as living documentation. Valibot provides runtime guarantees for data
crossing system boundaries.

### III. Simplicity First

Start with the simplest solution that works:

- YAGNI (You Aren't Gonna Need It): Do not implement features until they are needed
- Avoid premature abstraction: Three concrete implementations before creating an abstraction
- Prefer composition over inheritance
- Each module/component MUST have a single, clear responsibility
- If a solution requires extensive documentation to explain, it is too complex

**Rationale**: Complexity is the primary enemy of maintainability. Simple code is
easier to understand, test, debug, and modify.

### IV. Performance First

Optimize for runtime performance from the start:

- Bundle size MUST be monitored and kept minimal
- Lazy loading MUST be used for non-critical components and routes
- Images and assets MUST be optimized before inclusion
- Animations MUST target 60fps and use GPU-accelerated properties (transform, opacity)
- Server-side rendering SHOULD be used for initial page loads where applicable
- Measure before optimizing: profiling data MUST justify optimization work

**Rationale**: Presentation software must be responsive and smooth. Poor performance
directly impacts user experience during presentations.

### V. Component Reusability

Build composable, reusable UI components:

- Components MUST be self-contained with clearly defined props interfaces
- Presentation components MUST be separated from logic/container components
- Shared components MUST live in a dedicated `components/` directory
- Component APIs MUST be stable; breaking changes require version bumps
- Framer Motion animations SHOULD be encapsulated in reusable animation variants

**Rationale**: Reusable components reduce duplication, ensure UI consistency, and
accelerate development of new features.

### VI. Code Review Required

All code changes MUST be reviewed before merge:

- Every pull request MUST have at least one approval
- Reviews MUST check for: correctness, test coverage, type safety, performance impact
- Self-review is mandatory before requesting external review
- Comments MUST be addressed or explicitly acknowledged before merge
- Trunk-based development: feature branches MUST be short-lived (< 1 week)

**Rationale**: Code review catches defects, shares knowledge across the team, and
ensures consistent code quality and style.

### VII. Approved Technology Stack

The following technologies are mandated and approved:

- **Runtime**: Bun (server-side routing and static file serving)
- **Language**: TypeScript (strict mode)
- **Frontend**: React (client-side rendering)
- **Animation**: Framer Motion (all motion and transitions)
- **Code Highlighting**: CodeHike (syntax highlighting in slides)
- **Validation**: Valibot (schema validation and type inference)

**Constraints**:

- New dependencies MUST be justified and approved before addition
- Dependencies MUST be actively maintained (commits within last 6 months)
- Prefer smaller, focused libraries over large frameworks
- No jQuery, Lodash, or Moment.js (use native APIs or approved alternatives)

**Rationale**: A consistent, approved stack reduces cognitive load, ensures
compatibility, and prevents dependency bloat.

## Technology Constraints

### Required Tools

| Category | Tool | Purpose |
|----------|------|---------|
| Runtime | Bun | Server, bundler, package manager |
| Language | TypeScript | Type-safe development |
| UI Framework | React | Component-based UI |
| Animation | Framer Motion | Declarative animations |
| Code Display | CodeHike | Syntax highlighting |
| Validation | Valibot | Runtime type validation |

### Forbidden Patterns

- `any` type without justification comment
- Inline styles (use CSS modules or styled components)
- Direct DOM manipulation (use React refs when necessary)
- Synchronous file I/O in request handlers
- Console.log in production code (use structured logging)

## Development Workflow

### Trunk-Based Development

- `main` branch is always deployable
- Feature branches branch from and merge to `main`
- Feature branches MUST be short-lived (ideally < 3 days, max 1 week)
- Merge conflicts MUST be resolved by the branch author

### Quality Gates (CI/CD Pipeline)

All pull requests MUST pass:

1. **Type Check**: `tsc --noEmit` with zero errors
2. **Lint**: ESLint with zero errors (warnings acceptable if justified)
3. **Tests**: All tests pass with required coverage thresholds
4. **Build**: Production build completes successfully
5. **Review**: At least one approval from team member

### Commit Standards

- Use conventional commits format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep commits atomic: one logical change per commit
- Write meaningful commit messages explaining "why" not just "what"

## Governance

This constitution supersedes all other development practices and guidelines.

### Amendment Procedure

1. Propose change via pull request to this file
2. Include rationale for the change
3. Obtain approval from project maintainers
4. Update version number according to semantic versioning:
   - **MAJOR**: Principle removal, redefinition, or backward-incompatible change
   - **MINOR**: New principle added or existing principle materially expanded
   - **PATCH**: Clarifications, wording improvements, typo fixes
5. Update `LAST_AMENDED_DATE` to current date
6. Propagate changes to dependent templates if necessary

### Compliance

- All pull requests MUST verify compliance with these principles
- Violations MUST be documented and justified in the Complexity Tracking section
- Regular constitution reviews SHOULD occur quarterly
- Team members SHOULD raise concerns if principles become impractical

### Enforcement

- CI/CD pipeline enforces automated checks (type safety, linting, tests)
- Code review enforces principles not automatable
- Constitution violations without justification block merge

**Version**: 1.0.0 | **Ratified**: 2026-01-06 | **Last Amended**: 2026-01-06
