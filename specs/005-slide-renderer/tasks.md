# Tasks: Slide Renderer

**Input**: Design documents from `/specs/005-slide-renderer/`
**Prerequisites**: plan.md (required), spec.md (required), research.md

**Tests**: Tests are included per Constitution principle I (Test-First Development).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US7)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependencies

- [ ] T001 Install required dependencies: `bun add codehike framer-motion`
- [ ] T002 [P] Create directory structure: `src/shared/schemas/`, `src/shared/lib/navigation/`
- [ ] T003 [P] Create directory structure: `src/client/components/slides/`, `src/client/components/navigation/`, `src/client/components/presentation/`
- [ ] T004 [P] Create directory structure: `src/client/hooks/`
- [ ] T005 [P] Create directory structure: `tests/unit/schemas/`, `tests/unit/navigation/`, `tests/integration/slides/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types and schemas that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Create TypeScript types for all slide types in `src/shared/types/presentation.ts`
- [ ] T007 Create TypeScript types for NavigationState in `src/shared/types/navigation.ts`
- [ ] T008 [P] Create Valibot schemas for all slide types in `src/shared/schemas/presentation.ts`
- [ ] T009 [P] Create Framer Motion animation variants in `src/client/components/slides/variants.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 7 - Load and Validate Configuration (Priority: P1) 🎯 MVP

**Goal**: System loads and validates JSON configuration before rendering

**Independent Test**: Provide various JSON files and verify validation success/error handling

### Tests for User Story 7

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US7] Unit test for valid presentation schema in `tests/unit/schemas/presentation.test.ts`
- [ ] T011 [P] [US7] Unit test for invalid slide type rejection in `tests/unit/schemas/presentation.test.ts`
- [ ] T012 [P] [US7] Unit test for missing required fields in `tests/unit/schemas/presentation.test.ts`

### Implementation for User Story 7

- [ ] T013 [US7] Implement PresentationSchema with v.variant() for slide types in `src/shared/schemas/presentation.ts`
- [ ] T014 [US7] Implement validatePresentation() function with error formatting in `src/shared/schemas/presentation.ts`
- [ ] T015 [US7] Export inferred TypeScript types from schemas in `src/shared/schemas/presentation.ts`

**Checkpoint**: JSON validation working - can load valid presentations and reject invalid ones

---

## Phase 4: User Story 1 - Navigate Through Presentation (Priority: P1) 🎯 MVP

**Goal**: Forward/backward navigation with step-by-step control

**Independent Test**: Load simple presentation and use keyboard to navigate between slides

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T016 [P] [US1] Unit test for forward() transition in `tests/unit/navigation/controller.test.ts`
- [ ] T017 [P] [US1] Unit test for backward() transition in `tests/unit/navigation/controller.test.ts`
- [ ] T018 [P] [US1] Unit test for step-by-step forward within slide in `tests/unit/navigation/controller.test.ts`
- [ ] T019 [P] [US1] Unit test for boundary conditions (first/last slide) in `tests/unit/navigation/controller.test.ts`

### Implementation for User Story 1

- [ ] T020 [US1] Implement NavigationController class with observer pattern in `src/shared/lib/navigation/controller.ts`
- [ ] T021 [US1] Implement forward() method with step-by-step logic in `src/shared/lib/navigation/controller.ts`
- [ ] T022 [US1] Implement backward() method with whole-slide logic in `src/shared/lib/navigation/controller.ts`
- [ ] T023 [US1] Implement subscribe() for observer pattern in `src/shared/lib/navigation/controller.ts`
- [ ] T024 [US1] Create usePresentation hook wrapping NavigationController in `src/client/hooks/usePresentation.ts`
- [ ] T025 [US1] Create NavigationControls component with keyboard handlers in `src/client/components/navigation/NavigationControls.tsx`
- [ ] T026 [US1] Create Presentation container with AnimatePresence in `src/client/components/presentation/Presentation.tsx`

**Checkpoint**: Can navigate through slides with keyboard - basic presentation functional

---

## Phase 5: User Story 2 - Display Title Slides (Priority: P2)

**Goal**: Render title and title-subtitle slide types

**Independent Test**: Create presentation with title slides and verify rendering

### Tests for User Story 2

- [ ] T027 [P] [US2] Integration test for TitleSlide rendering in `tests/integration/slides/title.test.tsx`
- [ ] T028 [P] [US2] Integration test for TitleSubtitleSlide rendering in `tests/integration/slides/title.test.tsx`

### Implementation for User Story 2

- [ ] T029 [P] [US2] Create TitleSlide component in `src/client/components/slides/TitleSlide.tsx`
- [ ] T030 [P] [US2] Create TitleSubtitleSlide component in `src/client/components/slides/TitleSubtitleSlide.tsx`
- [ ] T031 [US2] Create SlideRenderer dispatcher component in `src/client/components/slides/SlideRenderer.tsx`

**Checkpoint**: Title slides render correctly

---

## Phase 6: User Story 3 - Display Text Content Slides (Priority: P2)

**Goal**: Render text slides with optional title

**Independent Test**: Create presentation with text slides and verify rendering

### Tests for User Story 3

- [ ] T032 [P] [US3] Integration test for TextSlide with title in `tests/integration/slides/text.test.tsx`
- [ ] T033 [P] [US3] Integration test for TextSlide without title in `tests/integration/slides/text.test.tsx`

### Implementation for User Story 3

- [ ] T034 [US3] Create TextSlide component in `src/client/components/slides/TextSlide.tsx`
- [ ] T035 [US3] Add TextSlide to SlideRenderer dispatcher in `src/client/components/slides/SlideRenderer.tsx`

**Checkpoint**: Text slides render correctly with/without title

---

## Phase 7: User Story 4 - Display Bullet Slides with Step Reveal (Priority: P2)

**Goal**: Render bullet slides that reveal items one at a time

**Independent Test**: Create bullet slide and navigate forward to verify step-by-step reveal

### Tests for User Story 4

- [ ] T036 [P] [US4] Integration test for BulletsSlide initial state in `tests/integration/slides/bullets.test.tsx`
- [ ] T037 [P] [US4] Integration test for BulletsSlide step reveal in `tests/integration/slides/bullets.test.tsx`

### Implementation for User Story 4

- [ ] T038 [US4] Create BulletsSlide component with step-aware rendering in `src/client/components/slides/BulletsSlide.tsx`
- [ ] T039 [US4] Add step count calculation for bullets in `src/shared/lib/navigation/controller.ts`
- [ ] T040 [US4] Add BulletsSlide to SlideRenderer dispatcher in `src/client/components/slides/SlideRenderer.tsx`

**Checkpoint**: Bullet slides reveal items step by step

---

## Phase 8: User Story 5 - Display Code Slides with Morphing (Priority: P3)

**Goal**: Render code with syntax highlighting and smooth morphing between versions

**Independent Test**: Create code slide with multiple blocks and verify morphing animation

### Tests for User Story 5

- [ ] T041 [P] [US5] Integration test for CodeSlide single block in `tests/integration/slides/code.test.tsx`
- [ ] T042 [P] [US5] Integration test for CodeSlide morphing between blocks in `tests/integration/slides/code.test.tsx`

### Implementation for User Story 5

- [ ] T043 [US5] Create CodeSlide component with CodeHike integration in `src/client/components/slides/CodeSlide.tsx`
- [ ] T044 [US5] Implement code highlighting using highlight() function in `src/client/components/slides/CodeSlide.tsx`
- [ ] T045 [US5] Add morphing animation with Framer Motion layoutId in `src/client/components/slides/CodeSlide.tsx`
- [ ] T046 [US5] Add step count calculation for code blocks in `src/shared/lib/navigation/controller.ts`
- [ ] T047 [US5] Add CodeSlide to SlideRenderer dispatcher in `src/client/components/slides/SlideRenderer.tsx`

**Checkpoint**: Code slides display with syntax highlighting and morph between versions

---

## Phase 9: User Story 6 - Display Vertical Timeline Slides (Priority: P3)

**Goal**: Render timeline that reveals events step by step

**Independent Test**: Create timeline slide and navigate to verify step-by-step reveal

### Tests for User Story 6

- [ ] T048 [P] [US6] Integration test for TimelineSlide initial state in `tests/integration/slides/timeline.test.tsx`
- [ ] T049 [P] [US6] Integration test for TimelineSlide step reveal in `tests/integration/slides/timeline.test.tsx`

### Implementation for User Story 6

- [ ] T050 [US6] Create TimelineSlide component with step-aware rendering in `src/client/components/slides/TimelineSlide.tsx`
- [ ] T051 [US6] Add timeline event reveal animation in `src/client/components/slides/TimelineSlide.tsx`
- [ ] T052 [US6] Add step count calculation for timeline events in `src/shared/lib/navigation/controller.ts`
- [ ] T053 [US6] Add TimelineSlide to SlideRenderer dispatcher in `src/client/components/slides/SlideRenderer.tsx`

**Checkpoint**: Timeline slides reveal events step by step with animation

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Edge cases, performance, and integration

- [ ] T054 [P] Handle empty presentation (zero slides) gracefully in `src/client/components/presentation/Presentation.tsx`
- [ ] T055 [P] Handle empty bullet lists in `src/client/components/slides/BulletsSlide.tsx`
- [ ] T056 [P] Handle empty timeline (single event) in `src/client/components/slides/TimelineSlide.tsx`
- [ ] T057 Add debouncing for rapid navigation in `src/client/components/navigation/NavigationControls.tsx`
- [ ] T058 Update server route to render presentation HTML in `src/server/routes/slides.ts`
- [ ] T059 Create sample presentation JSON for testing in `public/presentations/sample.json`
- [ ] T060 Run `bun run check` to verify all quality gates pass
- [ ] T061 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **US7 (Phase 3)**: Depends on Foundational - schema validation first
- **US1 (Phase 4)**: Depends on US7 (needs valid presentation to navigate)
- **US2-US6 (Phases 5-9)**: All depend on US1 (need navigation working)
- **Polish (Phase 10)**: Depends on all user stories

### User Story Dependencies

```
US7 (Validation) ──┐
                   ├── US1 (Navigation) ──┬── US2 (Title)
                   │                      ├── US3 (Text)
                   │                      ├── US4 (Bullets)
                   │                      ├── US5 (Code)
                   │                      └── US6 (Timeline)
```

### Parallel Opportunities

**Within Phase 1 (Setup)**:
```bash
T002, T003, T004, T005 can run in parallel
```

**Within Phase 2 (Foundational)**:
```bash
T008, T009 can run in parallel (after T006, T007)
```

**Within US7 Tests**:
```bash
T010, T011, T012 can run in parallel
```

**Within US1 Tests**:
```bash
T016, T017, T018, T019 can run in parallel
```

**Slide Type Phases (after US1 complete)**:
```bash
US2, US3, US4, US5, US6 can run in parallel with different developers
```

---

## Implementation Strategy

### MVP First (US7 + US1)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: US7 (Validation)
4. Complete Phase 4: US1 (Navigation)
5. **STOP and VALIDATE**: Can load JSON and navigate
6. Deploy/demo basic navigation with placeholder slides

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US7 → Validation working
3. Add US1 → Navigation working → **MVP!**
4. Add US2 → Title slides → Deploy
5. Add US3 → Text slides → Deploy
6. Add US4 → Bullet slides with steps → Deploy
7. Add US5 → Code slides with morphing → Deploy
8. Add US6 → Timeline slides → Deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (Red-Green-Refactor)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
