# Tasks: Project Bootstrap

**Input**: Design documents from `/specs/001-project-bootstrap/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Tests are included per constitution principle I (Test-First Development).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths follow structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Bun project with `bun init` in repository root
- [ ] T002 Create directory structure: `src/`, `src/components/`, `src/styles/`, `src/lib/`, `tests/`, `tests/unit/`, `tests/integration/`, `public/`
- [ ] T003 [P] Create package.json with scripts: `dev`, `build`, `preview`, `typecheck`, `lint`, `lint:fix`, `test`, `check`
- [ ] T004 [P] Create tsconfig.json with strict TypeScript configuration per research.md
- [ ] T005 [P] Create bunfig.toml for development server configuration

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Install core dependencies: `react`, `react-dom`, `framer-motion`, `valibot`
- [ ] T007 Install dev dependencies: `typescript`, `@types/react`, `@types/react-dom`
- [ ] T008 [P] Install Tailwind dependencies: `tailwindcss`, `postcss`, `autoprefixer`
- [ ] T009 [P] Install ESLint dependencies: `eslint`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `eslint-plugin-react`, `eslint-plugin-react-hooks`
- [ ] T010 [P] Install testing dependencies: `@testing-library/react`, `happy-dom`
- [ ] T011 Create tailwind.config.ts with content paths for `src/**/*.{ts,tsx}`
- [ ] T012 [P] Create postcss.config.js with Tailwind and Autoprefixer plugins
- [ ] T013 Create .eslintrc.cjs with TypeScript, React, and React Hooks rules per research.md
- [ ] T014 Create src/styles/globals.css with Tailwind directives: `@tailwind base; @tailwind components; @tailwind utilities;`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Developer Starts New Project (Priority: P1)

**Goal**: Working development environment with app shell that displays in browser

**Independent Test**: Run `bun install && bun dev`, open http://localhost:3000, see welcome page

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T015 [P] [US1] Create integration test for app rendering in tests/integration/app.test.tsx

### Implementation for User Story 1

- [ ] T016 [P] [US1] Create public/index.html with root div and script tag for src/main.tsx
- [ ] T017 [P] [US1] Create src/lib/config.ts with AppConfigSchema using Valibot per data-model.md
- [ ] T018 [US1] Create src/main.tsx as React entry point with ReactDOM.createRoot
- [ ] T019 [US1] Create src/components/App.tsx with basic welcome/placeholder content using Tailwind classes
- [ ] T020 [US1] Import globals.css in main.tsx and verify Tailwind styles apply

**Checkpoint**: User Story 1 complete - `bun dev` shows working app in browser

---

## Phase 4: User Story 2 - Developer Runs Quality Checks (Priority: P2)

**Goal**: Lint, type check, and test commands work correctly

**Independent Test**: Run `bun run check` (runs typecheck + lint + test) with zero errors

### Tests for User Story 2

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T021 [P] [US2] Create unit test placeholder in tests/unit/config.test.ts to verify test runner works

### Implementation for User Story 2

- [ ] T022 [US2] Verify `bun run typecheck` (tsc --noEmit) executes with zero errors
- [ ] T023 [US2] Verify `bun run lint` executes and passes on initial codebase
- [ ] T024 [US2] Verify `bun test` discovers and runs test files from tests/ directory
- [ ] T025 [US2] Create `bun run check` script that runs typecheck && lint && test sequentially

**Checkpoint**: User Story 2 complete - all quality gates pass

---

## Phase 5: User Story 3 - Developer Builds for Production (Priority: P3)

**Goal**: Production build command creates optimized output

**Independent Test**: Run `bun run build`, verify dist/ contains optimized files, run `bun run preview` to serve

### Implementation for User Story 3

- [ ] T026 [US3] Configure `bun run build` to output production bundle to dist/
- [ ] T027 [US3] Configure `bun run preview` to serve dist/ directory locally
- [ ] T028 [US3] Verify production build includes minified JS and CSS
- [ ] T029 [US3] Verify production build size is under 100KB initial bundle (per performance goal)

**Checkpoint**: User Story 3 complete - production build pipeline functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and documentation

- [ ] T030 Verify all acceptance scenarios from spec.md pass manually
- [ ] T031 Run quickstart.md validation: fresh clone → install → dev → verify in browser
- [ ] T032 [P] Add .gitignore entries for: `node_modules/`, `dist/`, `.env`, `*.log`
- [ ] T033 Verify SC-001: Clone to running app under 2 minutes
- [ ] T034 Verify SC-002: Quality checks execute under 30 seconds
- [ ] T035 Verify SC-003: Production build completes under 60 seconds

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 must complete before US2 (quality checks need code to check)
  - US2 must complete before US3 (build needs passing checks)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Depends on US1 completion (needs code to lint/test)
- **User Story 3 (P3)**: Depends on US2 completion (needs passing quality checks)

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD)
- Configuration before code
- Entry point before components
- Verify each checkpoint before proceeding

### Parallel Opportunities

- T003, T004, T005 can run in parallel (separate config files)
- T008, T009, T010 can run in parallel (separate dependency groups)
- T011, T012, T013, T014 can run in parallel (separate config files)
- T015, T016, T017 can run in parallel (separate files)

---

## Parallel Example: Phase 2 Foundation

```bash
# Install all dependency groups in parallel:
Task: "Install Tailwind dependencies"
Task: "Install ESLint dependencies"
Task: "Install testing dependencies"

# Create all config files in parallel:
Task: "Create tailwind.config.ts"
Task: "Create postcss.config.js"
Task: "Create .eslintrc.cjs"
Task: "Create globals.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: App runs in browser with welcome page
5. Developer can now start building features

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. User Story 1 → Dev server works → Can develop features
3. User Story 2 → Quality gates work → Can enforce standards
4. User Story 3 → Build works → Can deploy
5. Polish → All success criteria verified

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- This bootstrap is sequential by design (US2 needs US1 code, US3 needs US2 checks)
- Commit after each phase completion
- Verify checkpoints before proceeding to next phase
- All tasks reference specific file paths from plan.md structure
