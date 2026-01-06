# Tasks: Architecture & Import Boundaries

**Input**: Design documents from `/specs/003-architecture-boundaries/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md

**Tests**: Not required for this feature (architecture/configuration - ESLint rules are the enforcement mechanism).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Source**: `src/client/`, `src/server/`, `src/shared/`
- **Tests**: `tests/unit/`, `tests/integration/`
- **Config**: Root-level config files

---

## Phase 1: Setup (Directory Structure)

**Purpose**: Create the new directory structure for client/server/shared boundaries

- [x] T001 Create `src/client/` directory with subdirectories: `components/`, `hooks/`, `lib/`
- [x] T002 [P] Create `src/server/` directory with subdirectories: `routes/`, `lib/`
- [x] T003 [P] Create `src/shared/` directory with subdirectories: `types/`, `schemas/`, `lib/`
- [x] T004 [P] Create `tests/unit/client/`, `tests/unit/server/`, `tests/unit/shared/` directories

---

## Phase 2: Foundational (Migration & ESLint Configuration)

**Purpose**: Migrate existing code and configure ESLint boundary enforcement

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Move existing `src/components/App.tsx` to `src/client/components/App.tsx`
- [x] T006 Move existing `src/main.tsx` to `src/client/main.tsx`
- [x] T007 [P] Move existing `src/lib/config.ts` to `src/shared/lib/config.ts`
- [x] T008 [P] Move existing `src/styles/globals.css` to `src/client/styles/globals.css`
- [x] T009 Update all import paths in moved files to use new locations with explicit `.ts`/`.tsx` extensions
- [x] T010 Update `package.json` build script to use `src/client/main.tsx` as entry point
- [x] T011 Update `tsconfig.json` to include all new source paths
- [x] T012 Install `eslint-plugin-import` dependency via `bun add -d eslint-plugin-import`
- [x] T013 Add import boundary rules to `eslint.config.js` using `import/no-restricted-paths`
- [x] T014 Add barrel file prevention rule to `eslint.config.js` using `no-restricted-syntax`
- [x] T015 Add explicit extension rule to `eslint.config.js` using `import/extensions`
- [x] T016 Run `bun run lint` to verify ESLint rules are working
- [x] T017 Run `bun run check` to verify all existing tests still pass

**Checkpoint**: Foundation ready - directory structure created, code migrated, ESLint enforcing boundaries

---

## Phase 3: User Story 1 - Developer Adds New Code (Priority: P1)

**Goal**: Clear architecture documentation so developers know where to place code and what it can import

**Independent Test**: Developer can read architecture rules and identify correct file location within 30 seconds

### Implementation for User Story 1

- [x] T018 [US1] Create `src/client/README.md` documenting client boundary: what belongs here, what it can import
- [x] T019 [P] [US1] Create `src/server/README.md` documenting server boundary: what belongs here, what it can import
- [x] T020 [P] [US1] Create `src/shared/README.md` documenting shared boundary: what belongs here, import rules
- [x] T021 [US1] Create root `ARCHITECTURE.md` with overview of all boundaries and import rules diagram
- [x] T022 [US1] Add explicit examples of correct vs incorrect imports to `ARCHITECTURE.md`

**Checkpoint**: User Story 1 complete - developers have clear documentation for code placement

---

## Phase 4: User Story 2 - AI Agent Works on Codebase (Priority: P2)

**Goal**: Comprehensive agent rules file so AI assistants maintain architectural consistency

**Independent Test**: AI agent reads CLAUDE.md and correctly places new code without boundary violations

### Implementation for User Story 2

- [x] T023 [US2] Add Architecture section to `CLAUDE.md` with boundary definitions (client/server/shared)
- [x] T024 [US2] Add Import Rules section to `CLAUDE.md` with explicit rules for each boundary
- [x] T025 [US2] Add Forbidden Patterns section to `CLAUDE.md` with barrel file prohibition and examples
- [x] T026 [US2] Add File Naming Conventions section to `CLAUDE.md`
- [x] T027 [US2] Add Code Examples section to `CLAUDE.md` showing correct vs incorrect patterns
- [x] T028 [US2] Add Quick Reference table to `CLAUDE.md` summarizing "If doing X, put in Y directory"

**Checkpoint**: User Story 2 complete - AI agents have comprehensive guidance for architectural consistency

---

## Phase 5: User Story 3 - Developer Reviews Import Graph (Priority: P3)

**Goal**: Verify unidirectional dependency flow and no circular dependencies between boundaries

**Independent Test**: Run lint and verify no boundary violations; trace imports and confirm predictable flow

### Implementation for User Story 3

- [x] T029 [US3] Create test file `src/client/lib/test-boundary.ts` that correctly imports from shared only
- [x] T030 [P] [US3] Create test file `src/server/lib/test-boundary.ts` that correctly imports from shared only
- [x] T031 [US3] Verify ESLint catches violation: temporarily add `src/client` import to `src/server/lib/test-boundary.ts`, run lint, confirm error, revert
- [x] T032 [US3] Verify ESLint catches barrel exports: temporarily add `export *` statement, run lint, confirm error, remove
- [x] T033 [US3] Remove test boundary files after verification (or keep as examples)

**Checkpoint**: User Story 3 complete - import boundaries are enforced, dependency flow is unidirectional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and cleanup

- [x] T034 Run `bun run check` to verify all quality gates pass (typecheck, lint, test)
- [x] T035 Run `bun run build` to verify production build still works with new structure
- [x] T036 Verify no `index.ts` files exist in the codebase using `find src -name "index.ts"`
- [x] T037 Update `specs/003-architecture-boundaries/tasks.md` to mark all tasks complete

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 and US2 can run in parallel (documentation tasks)
  - US3 depends on ESLint rules being configured (Phase 2)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational - No dependencies on other stories
- **User Story 3 (P3)**: Can start after Foundational - Needs ESLint rules active to verify

### Within Each Phase

- Phase 1: T001 first, then T002-T004 in parallel
- Phase 2: T005-T008 migration tasks, then T009-T011 updates, then T012-T016 ESLint setup, finally T017 verification
- Phase 3: T018 first, then T019-T020 in parallel, then T021-T022
- Phase 4: All tasks sequential (building up CLAUDE.md)
- Phase 5: T029-T030 in parallel, then T031-T033 sequential verification

### Parallel Opportunities

- T002, T003, T004 can run in parallel (different directories)
- T007, T008 can run in parallel (different files)
- T019, T020 can run in parallel (different README files)
- T029, T030 can run in parallel (different test files)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (directory structure)
2. Complete Phase 2: Foundational (migration + ESLint)
3. Complete Phase 3: User Story 1 (developer documentation)
4. **STOP and VALIDATE**: Developer can find correct file location

### Incremental Delivery

1. Setup + Foundational → Architecture enforced by tooling
2. User Story 1 → Developers have documentation
3. User Story 2 → AI agents have guidance
4. User Story 3 → Verification that boundaries work
5. Polish → Final validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- ESLint rules ARE the enforcement mechanism - if lint passes, boundaries are respected
- No barrel files means explicit imports everywhere
- Migration moves existing client code to `src/client/`, keeping shared code in `src/shared/`
- Server directory is created but will be empty until server features are implemented
