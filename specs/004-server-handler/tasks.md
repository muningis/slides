# Tasks: Basic Server Handler

**Input**: Design documents from `/specs/004-server-handler/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md

**Tests**: Constitution requires Test-First Development. Integration tests will be written for HTTP endpoints.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Source**: `src/server/` (server boundary per architecture)
- **Tests**: `tests/integration/server/`, `tests/unit/server/`
- **Config**: Root-level config files

---

## Phase 1: Setup (Server Infrastructure)

**Purpose**: Create server directory structure and shared utilities

- [ ] T001 Create `src/server/routes/` directory for route handlers
- [ ] T002 [P] Create `src/server/lib/` directory for server utilities
- [ ] T003 [P] Create `tests/integration/server/` directory for server tests
- [ ] T004 [P] Create `tests/unit/server/` directory for server unit tests
- [ ] T005 Add `dev:server` script to `package.json` for server development

---

## Phase 2: Foundational (Core Server & Logging)

**Purpose**: Server entry point and logging infrastructure that ALL routes depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Create request logger utility in `src/server/lib/logger.ts` with JSON structured logging
- [ ] T007 Create server entry point in `src/server/main.ts` using `Bun.serve()` with route dispatcher
- [ ] T008 Add port configuration using environment variable `PORT` (default 3000) in server entry point
- [ ] T009 Run `bun run check` to verify server code compiles and passes lint

**Checkpoint**: Foundation ready - server starts and logs requests, user story implementation can begin

---

## Phase 3: User Story 1 - Static File Serving (Priority: P1)

**Goal**: Serve static files from `dist/` directory with correct MIME types and security

**Independent Test**: Start server, request `/main.js` or `/styles.css`, receive file with correct content-type

### Tests for User Story 1

- [ ] T010 [P] [US1] Write integration test for serving existing static file in `tests/integration/server/static.test.ts`
- [ ] T011 [P] [US1] Write integration test for 404 on non-existent file in `tests/integration/server/static.test.ts`
- [ ] T012 [P] [US1] Write unit test for path traversal detection in `tests/unit/server/static.test.ts`

### Implementation for User Story 1

- [ ] T013 [US1] Create static file serving utility in `src/server/lib/static.ts` with path validation
- [ ] T014 [US1] Add path traversal prevention (reject paths containing `..`) in `src/server/lib/static.ts`
- [ ] T015 [US1] Add MIME type detection based on file extension in `src/server/lib/static.ts`
- [ ] T016 [US1] Integrate static file handler into server router in `src/server/main.ts`
- [ ] T017 [US1] Run `bun test tests/integration/server/static.test.ts` to verify static file serving works

**Checkpoint**: Static files served from `dist/`, 404 for missing files, path traversal blocked

---

## Phase 4: User Story 2 - Home Page Route (Priority: P2)

**Goal**: Handle `/` route with placeholder response

**Independent Test**: Navigate to `http://localhost:3000/`, receive valid HTTP response

### Tests for User Story 2

- [ ] T018 [P] [US2] Write integration test for `/` route returning 200 in `tests/integration/server/routes.test.ts`

### Implementation for User Story 2

- [ ] T019 [US2] Create index route handler in `src/server/routes/index.ts` returning placeholder response
- [ ] T020 [US2] Register `/` route in server router in `src/server/main.ts`
- [ ] T021 [US2] Run `bun test tests/integration/server/routes.test.ts` to verify home route works

**Checkpoint**: `/` route returns placeholder response

---

## Phase 5: User Story 3 - Slides Route (Priority: P3)

**Goal**: Handle `/slides/:slug` route with slug parameter capture

**Independent Test**: Navigate to `http://localhost:3000/slides/my-presentation`, receive response with slug captured

### Tests for User Story 3

- [ ] T022 [P] [US3] Write integration test for `/slides/:slug` route in `tests/integration/server/routes.test.ts`
- [ ] T023 [P] [US3] Write test for `/slides/` without slug returning 404 in `tests/integration/server/routes.test.ts`

### Implementation for User Story 3

- [ ] T024 [US3] Create slides route handler in `src/server/routes/slides.ts` with slug parameter extraction
- [ ] T025 [US3] Add 404 handling for `/slides/` without slug in `src/server/routes/slides.ts`
- [ ] T026 [US3] Handle URL-encoded slugs in `src/server/routes/slides.ts`
- [ ] T027 [US3] Register `/slides/:slug` route in server router in `src/server/main.ts`
- [ ] T028 [US3] Run `bun test tests/integration/server/routes.test.ts` to verify slides route works

**Checkpoint**: `/slides/:slug` route captures slug, 404 for missing slug

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and cleanup

- [ ] T029 Run `bun run check` to verify all quality gates pass (typecheck, lint, test)
- [ ] T030 Run `bun run build` to generate `dist/` directory, then manually test static file serving
- [ ] T031 Test path traversal attempts manually (e.g., `/../package.json`) and verify 404/403
- [ ] T032 Update `specs/004-server-handler/tasks.md` to mark all tasks complete

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 (Static Files) should complete first (other routes may fall through to static handler)
  - US2 and US3 can run in parallel after US1
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - Provides static file fallback for other routes
- **User Story 2 (P2)**: Can start after US1 - Route registered before static fallback
- **User Story 3 (P3)**: Can start after US1 - Route registered before static fallback

### Within Each Phase

- Phase 1: T001 first, then T002-T005 in parallel
- Phase 2: T006 → T007 → T008 → T009 (sequential, building on each other)
- Phase 3: T010-T012 tests first (in parallel), then T013-T015 implementation (sequential), T016-T017
- Phase 4: T018 test first, then T019-T021 implementation
- Phase 5: T022-T023 tests first (in parallel), then T024-T028 implementation

### Parallel Opportunities

- T002, T003, T004 can run in parallel (different directories)
- T010, T011, T012 can run in parallel (different test cases)
- T018, T022, T023 can run in parallel (different test cases, once US1 foundation exists)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (directory structure)
2. Complete Phase 2: Foundational (server entry point, logging)
3. Complete Phase 3: User Story 1 (static file serving)
4. **STOP and VALIDATE**: Build client, start server, verify files served correctly

### Incremental Delivery

1. Setup + Foundational → Server runs, logs requests
2. User Story 1 → Static files served (core functionality)
3. User Story 2 → Home page route working
4. User Story 3 → Slides route ready for future enhancement
5. Polish → All quality gates pass

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Server uses Bun's native `Bun.serve()` API (no external HTTP framework)
- Static files served from `dist/` (client build output)
- Routes are registered in priority order: `/` → `/slides/:slug` → static fallback
- All routes return placeholder responses, ready for future feature implementation
