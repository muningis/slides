# Tasks: Slide Theme

**Input**: Design documents from `/specs/006-slide-theme/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: Included per constitution principle (Test-First Development)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Following existing project structure:
- **Client code**: `src/client/`
- **Server code**: `src/server/`
- **Shared types/schemas**: `src/shared/`
- **Tests**: `tests/unit/`, `tests/integration/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and theme foundation setup

- [x] T001 Extend Tailwind configuration with theme color tokens in tailwind.config.ts
- [x] T002 [P] Create theme type definitions in src/shared/types/theme.ts
- [x] T003 [P] Create theme Valibot schemas in src/shared/schemas/theme.ts
- [x] T004 Create default theme configuration (darkOliveTheme) in src/client/lib/theme.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core theme infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Create ThemeProvider context component in src/client/components/theme/ThemeProvider.tsx
- [x] T006 Create useTheme hook in src/client/hooks/useTheme.ts
- [x] T007 Wrap App component with ThemeProvider in src/client/App.tsx

**Checkpoint**: Theme infrastructure ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Apply Theme to Presentation (Priority: P1) 🎯 MVP

**Goal**: All slides automatically render with consistent dark olive theme and lime accents

**Independent Test**: Create presentation with all slide types, verify theme colors and typography applied consistently

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T008 [P] [US1] Unit test for theme schema validation in tests/unit/shared/theme.test.ts
- [ ] T009 [P] [US1] Unit test for ThemeProvider context in tests/unit/client/theme/ThemeProvider.test.tsx
- [ ] T010 [P] [US1] Integration test for themed slide rendering in tests/integration/theme.test.tsx

### Implementation for User Story 1

- [x] T011 [US1] Update App.tsx background to use theme gradient in src/client/App.tsx
- [x] T012 [US1] Update Presentation.tsx to consume theme context in src/client/components/presentation/Presentation.tsx
- [x] T013 [P] [US1] Apply theme colors to TitleSlide in src/client/components/slides/TitleSlide.tsx
- [x] T014 [P] [US1] Apply theme colors to TitleSubtitleSlide in src/client/components/slides/TitleSubtitleSlide.tsx
- [x] T015 [P] [US1] Apply theme colors to TextSlide in src/client/components/slides/TextSlide.tsx
- [x] T016 [P] [US1] Apply theme colors to BulletsSlide in src/client/components/slides/BulletsSlide.tsx
- [x] T017 [P] [US1] Apply theme colors to CodeSlide in src/client/components/slides/CodeSlide.tsx
- [x] T018 [P] [US1] Apply theme colors to TimelineSlide in src/client/components/slides/TimelineSlide.tsx
- [x] T019 [US1] Implement auto-scaling text with 14px minimum in tailwind.config.ts (using clamp())
- [x] T020 [US1] Implement empty state placeholder pattern in src/client/components/slides/ and Presentation.tsx

**Checkpoint**: All slides render with theme colors, typography, and effects. MVP complete.

---

## Phase 4: User Story 2 - Navigate Between Themed Slides (Priority: P2)

**Goal**: Navigation indicators show current position with themed styling

**Independent Test**: Navigate through multi-slide presentation, verify dots display correct position with accent highlighting

### Tests for User Story 2

- [ ] T021 [P] [US2] Unit test for NavigationDots component in tests/unit/client/theme/NavigationDots.test.tsx

### Implementation for User Story 2

- [x] T022 [US2] Create NavigationDots component in src/client/components/theme/NavigationDots.tsx
- [x] T023 [US2] Integrate NavigationDots with Presentation in src/client/components/navigation/NavigationControls.tsx
- [x] T024 [US2] Add keyboard navigation accessibility (arrow key support) in src/client/components/navigation/NavigationControls.tsx
- [x] T025 [US2] Add ARIA attributes for screen reader support in src/client/components/theme/NavigationDots.tsx

**Checkpoint**: Navigation indicators functional with theme styling and accessibility

---

## Phase 5: User Story 3 - Create Various Slide Layouts (Priority: P3)

**Goal**: Multiple pre-designed slide layouts available with consistent theme styling

**Independent Test**: Create slides of each layout type, verify correct rendering within theme

### Tests for User Story 3

- [ ] T026 [P] [US3] Integration test for layout-specific rendering in tests/integration/layouts.test.tsx

### Implementation for User Story 3

- [x] T027 [P] [US3] Enhance TitleSlide with centered layout and accent underline in src/client/components/slides/TitleSlide.tsx
- [x] T028 [P] [US3] Create InfoSlide layout for infographic content in src/client/components/slides/InfoSlide.tsx
- [x] T029 [P] [US3] Create ClosingSlide (Thank You) layout in src/client/components/slides/ClosingSlide.tsx
- [x] T030 [P] [US3] Create ContactSlide layout with icon styling in src/client/components/slides/ContactSlide.tsx
- [x] T031 [US3] Update SlideRenderer to handle new slide types in src/client/components/slides/SlideRenderer.tsx
- [x] T032 [US3] Add new slide types to presentation schema in src/shared/schemas/presentation.ts
- [x] T033 [US3] Add new slide types to presentation types in src/shared/types/presentation.ts
- [ ] T034 [US3] Implement image cropping (object-fit: cover) for content slides in src/client/components/slides/

**Checkpoint**: All 5+ slide layouts available and rendering correctly with theme

---

## Phase 6: High Contrast Mode (FR-012)

**Goal**: Manual toggle to switch to high-contrast variant for accessibility

**Independent Test**: Toggle high-contrast mode, verify color changes persist across navigation

### Tests for High Contrast Mode

- [ ] T035 [P] Unit test for HighContrastToggle component in tests/unit/client/theme/HighContrastToggle.test.tsx
- [ ] T036 [P] Unit test for localStorage persistence in tests/unit/client/theme/persistence.test.ts

### Implementation for High Contrast Mode

- [x] T037 Create HighContrastToggle component in src/client/components/theme/HighContrastToggle.tsx
- [x] T038 Add high-contrast mode state to ThemeProvider in src/client/components/theme/ThemeProvider.tsx
- [x] T039 Implement localStorage persistence for theme mode in src/client/components/theme/ThemeProvider.tsx
- [x] T040 Integrate HighContrastToggle into Presentation UI in src/client/components/navigation/NavigationControls.tsx

**Checkpoint**: High-contrast toggle functional with persistence

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [x] T041 Verify WCAG AA contrast ratios for all color combinations (colors designed for 4.5:1+ contrast)
- [ ] T042 [P] Run full test suite and fix any failures
- [x] T043 [P] Run typecheck and lint, fix any errors
- [ ] T044 Verify theme loads within 1 second (SC-004)
- [ ] T045 Run quickstart.md validation checklist
- [x] T046 Update existing slide components to remove hardcoded colors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
- **High Contrast (Phase 6)**: Depends on Phase 3 (needs theme infrastructure)
- **Polish (Phase 7)**: Depends on all phases being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of US1/US2 (but benefits from US1 styling)

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD)
- Type definitions before implementation
- Component implementation before integration
- Core implementation before polish

### Parallel Opportunities

**Phase 1 (Setup)**:
```
T002 [P] + T003 [P] can run in parallel
```

**Phase 3 (US1 - after tests pass)**:
```
T013 [P] + T014 [P] + T015 [P] + T016 [P] + T017 [P] + T018 [P]
(All slide component updates can run in parallel - different files)
```

**Phase 5 (US3 - after tests pass)**:
```
T027 [P] + T028 [P] + T029 [P] + T030 [P]
(New slide layouts can be created in parallel - different files)
```

---

## Parallel Example: User Story 1 Slide Updates

```bash
# After T010-T012 complete, launch all slide updates together:
Task: "Apply theme colors to TitleSlide in src/client/components/slides/TitleSlide.tsx"
Task: "Apply theme colors to TitleSubtitleSlide in src/client/components/slides/TitleSubtitleSlide.tsx"
Task: "Apply theme colors to TextSlide in src/client/components/slides/TextSlide.tsx"
Task: "Apply theme colors to BulletsSlide in src/client/components/slides/BulletsSlide.tsx"
Task: "Apply theme colors to CodeSlide in src/client/components/slides/CodeSlide.tsx"
Task: "Apply theme colors to TimelineSlide in src/client/components/slides/TimelineSlide.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T007)
3. Complete Phase 3: User Story 1 (T008-T020)
4. **STOP and VALIDATE**: All slides render with theme
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Theme infrastructure ready
2. Add User Story 1 → All slides themed (MVP!)
3. Add User Story 2 → Navigation dots styled
4. Add User Story 3 → Additional slide layouts
5. Add High Contrast → Accessibility complete
6. Polish → Production ready

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (slide theming)
   - Developer B: User Story 2 (navigation dots)
   - Developer C: User Story 3 (new layouts)
3. All developers: High Contrast + Polish

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- TDD required: Write tests first, verify they fail, then implement
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Use Tailwind theme classes (theme-bg, theme-accent, theme-text) consistently
