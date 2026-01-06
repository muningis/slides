# Feature Specification: Architecture & Import Boundaries

**Feature Branch**: `003-architecture-boundaries`
**Created**: 2026-01-06
**Status**: Draft
**Input**: User description: "Define architecture for files and import boundaries with client/server separation and agent rules"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer Adds New Code (Priority: P1)

A developer adds new code to the project. The file structure and import rules are clear, so they know exactly where to place the file and what it can import. There is no ambiguity about whether code belongs in client or server, and import violations are caught immediately.

**Why this priority**: Clear architecture is foundational - all future development depends on understanding where code goes and what it can access.

**Independent Test**: Create a new file and verify the rules clearly indicate its location and allowed imports.

**Acceptance Scenarios**:

1. **Given** a developer needs to add client-side code, **When** they review the architecture rules, **Then** they can identify the correct location within 30 seconds
2. **Given** a developer writes an import statement, **When** the import violates boundaries, **Then** tooling flags the violation before commit
3. **Given** a developer is unsure about code placement, **When** they consult the agent rules file, **Then** they receive clear guidance

---

### User Story 2 - AI Agent Works on Codebase (Priority: P2)

An AI coding agent (Claude Code) works on the codebase. The agent reads a rules file that explains the architecture, forbidden patterns, and conventions. This prevents the agent from making structural mistakes or introducing problematic patterns.

**Why this priority**: AI agents need explicit guidance to maintain architectural consistency across sessions.

**Independent Test**: AI agent reads rules file and correctly places new code without violating boundaries.

**Acceptance Scenarios**:

1. **Given** an AI agent starts working on the codebase, **When** it reads the rules file, **Then** it understands client/server separation
2. **Given** an AI agent is asked to add a feature, **When** it generates code, **Then** it follows the documented conventions (no barrel files, correct import paths)
3. **Given** the rules prohibit certain patterns, **When** an AI agent considers using them, **Then** the rules file explicitly warns against them

---

### User Story 3 - Developer Reviews Import Graph (Priority: P3)

A developer wants to understand the dependency structure. The architecture enforces a clear import hierarchy where dependencies flow in one direction, making the codebase easier to reason about and refactor.

**Why this priority**: Understanding dependency flow is essential for safe refactoring and avoiding circular dependencies.

**Independent Test**: Visualize import graph and confirm no circular dependencies exist between boundaries.

**Acceptance Scenarios**:

1. **Given** the architecture is implemented, **When** a developer traces imports, **Then** dependencies flow in a predictable direction
2. **Given** client code exists, **When** checking its imports, **Then** it never imports from server-specific modules
3. **Given** server code exists, **When** checking its imports, **Then** it only imports from server or shared modules

---

### Edge Cases

- What happens when code legitimately needs to be shared between client and server? (Should live in a designated shared area)
- How does the system handle third-party dependencies that don't follow boundaries? (External deps are exempt from boundary rules)
- What happens when a file needs refactoring to a different boundary? (Migration path should be documented)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Codebase MUST have clear separation between client code (slides engine) and server code (file serving, routes, configuration)
- **FR-002**: Import boundaries MUST be enforceable through tooling (lint rules or similar)
- **FR-003**: A shared code area MUST exist for code used by both client and server
- **FR-004**: Barrel files (index.ts re-exports) MUST be prohibited to prevent circular dependency issues and improve tree-shaking
- **FR-005**: An agent rules file MUST exist that AI coding assistants can read for architectural guidance
- **FR-006**: The agent rules file MUST document all forbidden patterns with explanations
- **FR-007**: Import paths MUST be explicit (direct file imports, no directory imports)
- **FR-008**: The architecture MUST prevent circular dependencies between boundaries
- **FR-009**: Each boundary MUST have a single entry point pattern for external consumption
- **FR-010**: Server code MUST NOT import client-specific modules (browser APIs, React components)
- **FR-011**: Client code MUST NOT import server-specific modules (file system, server routes)

### Key Entities

- **Client Boundary**: Code that runs in the browser - slides engine, UI components, animations
- **Server Boundary**: Code that runs on the server - static file serving, route handling, configuration endpoints
- **Shared Boundary**: Code that can run in both contexts - types, utilities, validation schemas
- **Agent Rules File**: Documentation file that AI assistants read before making code changes

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developers can locate the correct file location for new code within 30 seconds of reading the architecture docs
- **SC-002**: 100% of import boundary violations are caught by automated tooling before code reaches the main branch
- **SC-003**: Zero barrel (index.ts) files exist in the codebase
- **SC-004**: AI agents following the rules file produce code that passes all architectural checks on first attempt 90% of the time
- **SC-005**: The import dependency graph has zero circular dependencies between boundaries
- **SC-006**: New team members can understand the architecture within 10 minutes of reading documentation

## Assumptions

- The project uses a module system that supports import/export (ES modules)
- Lint tooling can be configured to enforce import boundaries
- AI coding agents (like Claude Code) read and follow CLAUDE.md or similar rules files
- The existing src/ structure will be reorganized to support boundaries
- Shared types and utilities are a small subset of the codebase
