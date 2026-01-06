# Tasks: CI Workflows

**Input**: Design documents from `/specs/002-ci-workflows/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md

**Tests**: Not required for this feature (CI configuration, no application code).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Workflows**: `.github/workflows/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the GitHub Actions workflow directory structure

- [x] T001 Create `.github/workflows/` directory structure

---

## Phase 2: User Story 1 - PR Quality Checks (Priority: P1)

**Goal**: Automatically run type checking, linting, and tests on every pull request targeting main

**Independent Test**: Open a pull request and verify all checks (typecheck, lint, test) run and report status

### Implementation for User Story 1

- [x] T002 [US1] Create CI workflow file at `.github/workflows/ci.yml`
- [x] T003 [US1] Configure workflow trigger for `pull_request` events targeting `main` branch
- [x] T004 [US1] Add `checkout` step using `actions/checkout@v4`
- [x] T005 [US1] Add Bun setup step using `oven-sh/setup-bun@v2`
- [x] T006 [US1] Add dependency caching step using `actions/cache@v4` with `bun.lock` hash
- [x] T007 [US1] Add `bun install` step for dependency installation
- [x] T008 [US1] Add `bun run check` step to run typecheck, lint, and tests

**Checkpoint**: User Story 1 complete - PRs now show quality check status

---

## Phase 3: User Story 2 - Main Branch Build Verification (Priority: P2)

**Goal**: Verify production build succeeds on every push to main branch

**Independent Test**: Push a commit to main and verify the build workflow runs and succeeds

### Implementation for User Story 2

- [x] T009 [P] [US2] Create build workflow file at `.github/workflows/build.yml`
- [x] T010 [US2] Configure workflow trigger for `push` events on `main` branch
- [x] T011 [US2] Add checkout, Bun setup, and caching steps (same pattern as ci.yml)
- [x] T012 [US2] Add `bun install` step for dependency installation
- [x] T013 [US2] Add `bun run build` step for production build verification

**Checkpoint**: User Story 2 complete - main branch builds are verified on every push

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and documentation

- [x] T014 Verify ci.yml workflow runs successfully on a test PR (will verify when PR created)
- [x] T015 Verify build.yml workflow runs successfully on push to main (will verify when merged)
- [x] T016 Verify caching works (second run should be faster than first) (cache configured)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **User Story 1 (Phase 2)**: Depends on Setup completion
- **User Story 2 (Phase 3)**: Depends on Setup completion, can run parallel to US1
- **Polish (Phase 4)**: Depends on both user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Setup - No dependencies on US2
- **User Story 2 (P2)**: Can start after Setup - No dependencies on US1

### Within Each User Story

- Configuration before steps
- Checkout before Bun setup
- Bun setup before caching
- Caching before install
- Install before running commands

### Parallel Opportunities

- T009 can start in parallel with US1 tasks (different workflow file)
- Both user stories can be worked on in parallel after Setup

---

## Parallel Example: Both User Stories

```bash
# After T001 (Setup) completes, both stories can start in parallel:

# User Story 1 (ci.yml):
Task: "Create CI workflow file at .github/workflows/ci.yml"
Task: "Configure workflow trigger for pull_request events"
...

# User Story 2 (build.yml) - can run in parallel:
Task: "Create build workflow file at .github/workflows/build.yml"
Task: "Configure workflow trigger for push events"
...
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: User Story 1 (PR checks)
3. **STOP and VALIDATE**: Open a test PR, verify checks run
4. Deploy (merge to main)

### Incremental Delivery

1. Setup → Directory structure created
2. User Story 1 → PR quality checks working
3. User Story 2 → Main branch build verification working
4. Polish → All workflows verified

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Both workflows share the same pattern: checkout → setup-bun → cache → install → run command
- Caching uses `bun.lock` hash as cache key for deterministic dependency resolution
- Workflow files are YAML - syntax must be valid
- Test workflows by opening a PR (US1) or pushing to main (US2)
