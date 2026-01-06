#!/bin/bash
# Create GitHub issues for Project Bootstrap tasks
# Repository: muningis/slides
# Feature: 001-project-bootstrap

set -e

REPO="muningis/slides"

echo "Creating GitHub issues for Project Bootstrap..."
echo "Repository: $REPO"
echo ""

# Create labels first (ignore errors if they already exist)
echo "Creating labels..."
gh label create "phase:setup" --color "c5def5" --description "Phase 1: Setup tasks" --repo "$REPO" 2>/dev/null || true
gh label create "phase:foundational" --color "bfd4f2" --description "Phase 2: Foundational tasks" --repo "$REPO" 2>/dev/null || true
gh label create "phase:polish" --color "d4c5f9" --description "Phase 6: Polish tasks" --repo "$REPO" 2>/dev/null || true
gh label create "user-story:US1" --color "0e8a16" --description "User Story 1: Developer Starts New Project" --repo "$REPO" 2>/dev/null || true
gh label create "user-story:US2" --color "1d76db" --description "User Story 2: Developer Runs Quality Checks" --repo "$REPO" 2>/dev/null || true
gh label create "user-story:US3" --color "5319e7" --description "User Story 3: Developer Builds for Production" --repo "$REPO" 2>/dev/null || true
gh label create "priority:P1" --color "b60205" --description "Priority 1 - MVP" --repo "$REPO" 2>/dev/null || true
gh label create "priority:P2" --color "d93f0b" --description "Priority 2" --repo "$REPO" 2>/dev/null || true
gh label create "priority:P3" --color "fbca04" --description "Priority 3" --repo "$REPO" 2>/dev/null || true
gh label create "parallelizable" --color "c2e0c6" --description "Can run in parallel with other tasks" --repo "$REPO" 2>/dev/null || true
gh label create "bootstrap" --color "f9d0c4" --description "Project bootstrap feature" --repo "$REPO" 2>/dev/null || true
echo "Labels created."
echo ""

# Phase 1: Setup
echo "Creating Phase 1: Setup issues..."

gh issue create --repo "$REPO" \
  --title "T001: Initialize Bun project with bun init" \
  --label "bootstrap,phase:setup" \
  --body "$(cat <<'EOF'
## Task
Initialize Bun project with `bun init` in repository root

## Phase
Phase 1: Setup (Shared Infrastructure)

## Acceptance Criteria
- [ ] `bun init` executed successfully
- [ ] Basic project files created

## References
- Feature: 001-project-bootstrap
- Spec: specs/001-project-bootstrap/spec.md
EOF
)"

gh issue create --repo "$REPO" \
  --title "T002: Create directory structure" \
  --label "bootstrap,phase:setup" \
  --body "$(cat <<'EOF'
## Task
Create directory structure: `src/`, `src/components/`, `src/styles/`, `src/lib/`, `tests/`, `tests/unit/`, `tests/integration/`, `public/`

## Phase
Phase 1: Setup (Shared Infrastructure)

## Acceptance Criteria
- [ ] All directories created
- [ ] Structure matches plan.md

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T003: Create package.json with scripts" \
  --label "bootstrap,phase:setup,parallelizable" \
  --body "$(cat <<'EOF'
## Task
Create package.json with scripts: `dev`, `build`, `preview`, `typecheck`, `lint`, `lint:fix`, `test`, `check`

## Phase
Phase 1: Setup (Shared Infrastructure)

## Parallelizable
Yes - can run in parallel with T004, T005

## Acceptance Criteria
- [ ] package.json created with all required scripts
- [ ] Scripts are properly configured

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T004: Create tsconfig.json with strict TypeScript" \
  --label "bootstrap,phase:setup,parallelizable" \
  --body "$(cat <<'EOF'
## Task
Create tsconfig.json with strict TypeScript configuration per research.md

## Phase
Phase 1: Setup (Shared Infrastructure)

## Parallelizable
Yes - can run in parallel with T003, T005

## Configuration
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

## References
- Feature: 001-project-bootstrap
- Research: specs/001-project-bootstrap/research.md
EOF
)"

gh issue create --repo "$REPO" \
  --title "T005: Create bunfig.toml for dev server" \
  --label "bootstrap,phase:setup,parallelizable" \
  --body "$(cat <<'EOF'
## Task
Create bunfig.toml for development server configuration

## Phase
Phase 1: Setup (Shared Infrastructure)

## Parallelizable
Yes - can run in parallel with T003, T004

## Acceptance Criteria
- [ ] bunfig.toml created
- [ ] Development server port configured
- [ ] Hot reload enabled

## References
- Feature: 001-project-bootstrap
EOF
)"

echo "Phase 1 issues created."
echo ""

# Phase 2: Foundational
echo "Creating Phase 2: Foundational issues..."

gh issue create --repo "$REPO" \
  --title "T006: Install core dependencies" \
  --label "bootstrap,phase:foundational" \
  --body "$(cat <<'EOF'
## Task
Install core dependencies: `react`, `react-dom`, `framer-motion`, `valibot`

## Phase
Phase 2: Foundational (Blocking Prerequisites)

## Command
```bash
bun add react react-dom framer-motion valibot
```

## Acceptance Criteria
- [ ] All core dependencies installed
- [ ] No version conflicts

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T007: Install dev dependencies" \
  --label "bootstrap,phase:foundational" \
  --body "$(cat <<'EOF'
## Task
Install dev dependencies: `typescript`, `@types/react`, `@types/react-dom`

## Phase
Phase 2: Foundational (Blocking Prerequisites)

## Command
```bash
bun add -d typescript @types/react @types/react-dom
```

## Acceptance Criteria
- [ ] TypeScript and type definitions installed

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T008: Install Tailwind dependencies" \
  --label "bootstrap,phase:foundational,parallelizable" \
  --body "$(cat <<'EOF'
## Task
Install Tailwind dependencies: `tailwindcss`, `postcss`, `autoprefixer`

## Phase
Phase 2: Foundational (Blocking Prerequisites)

## Parallelizable
Yes - can run in parallel with T009, T010

## Command
```bash
bun add -d tailwindcss postcss autoprefixer
```

## Acceptance Criteria
- [ ] Tailwind CSS and PostCSS dependencies installed

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T009: Install ESLint dependencies" \
  --label "bootstrap,phase:foundational,parallelizable" \
  --body "$(cat <<'EOF'
## Task
Install ESLint dependencies: `eslint`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `eslint-plugin-react`, `eslint-plugin-react-hooks`

## Phase
Phase 2: Foundational (Blocking Prerequisites)

## Parallelizable
Yes - can run in parallel with T008, T010

## Command
```bash
bun add -d eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks
```

## Acceptance Criteria
- [ ] ESLint and all plugins installed

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T010: Install testing dependencies" \
  --label "bootstrap,phase:foundational,parallelizable" \
  --body "$(cat <<'EOF'
## Task
Install testing dependencies: `@testing-library/react`, `happy-dom`

## Phase
Phase 2: Foundational (Blocking Prerequisites)

## Parallelizable
Yes - can run in parallel with T008, T009

## Command
```bash
bun add -d @testing-library/react happy-dom
```

## Acceptance Criteria
- [ ] Testing library and DOM environment installed

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T011: Create tailwind.config.ts" \
  --label "bootstrap,phase:foundational" \
  --body "$(cat <<'EOF'
## Task
Create tailwind.config.ts with content paths for `src/**/*.{ts,tsx}`

## Phase
Phase 2: Foundational (Blocking Prerequisites)

## Acceptance Criteria
- [ ] tailwind.config.ts created
- [ ] Content paths configured correctly

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T012: Create postcss.config.js" \
  --label "bootstrap,phase:foundational,parallelizable" \
  --body "$(cat <<'EOF'
## Task
Create postcss.config.js with Tailwind and Autoprefixer plugins

## Phase
Phase 2: Foundational (Blocking Prerequisites)

## Parallelizable
Yes - can run in parallel with T011, T013, T014

## Acceptance Criteria
- [ ] postcss.config.js created
- [ ] Tailwind and Autoprefixer plugins configured

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T013: Create .eslintrc.cjs" \
  --label "bootstrap,phase:foundational" \
  --body "$(cat <<'EOF'
## Task
Create .eslintrc.cjs with TypeScript, React, and React Hooks rules per research.md

## Phase
Phase 2: Foundational (Blocking Prerequisites)

## Key Rules
- No unused variables (error)
- React hooks rules (error)
- Explicit function return types (warn initially)
- No console statements (error for production)

## Acceptance Criteria
- [ ] .eslintrc.cjs created
- [ ] All rules configured per research.md

## References
- Feature: 001-project-bootstrap
- Research: specs/001-project-bootstrap/research.md
EOF
)"

gh issue create --repo "$REPO" \
  --title "T014: Create globals.css with Tailwind directives" \
  --label "bootstrap,phase:foundational" \
  --body "$(cat <<'EOF'
## Task
Create src/styles/globals.css with Tailwind directives: `@tailwind base; @tailwind components; @tailwind utilities;`

## Phase
Phase 2: Foundational (Blocking Prerequisites)

## Content
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Acceptance Criteria
- [ ] globals.css created at src/styles/globals.css
- [ ] Tailwind directives included

## References
- Feature: 001-project-bootstrap
EOF
)"

echo "Phase 2 issues created."
echo ""

# Phase 3: User Story 1
echo "Creating Phase 3: User Story 1 issues..."

gh issue create --repo "$REPO" \
  --title "T015: [US1] Create integration test for app rendering" \
  --label "bootstrap,user-story:US1,priority:P1,parallelizable" \
  --body "$(cat <<'EOF'
## Task
Create integration test for app rendering in tests/integration/app.test.tsx

## User Story
**US1: Developer Starts New Project** (Priority: P1)

## Phase
Phase 3: User Story 1 - Developer Starts New Project

## Parallelizable
Yes - can run in parallel with T016, T017

## TDD Note
Write this test FIRST, ensure it FAILS before implementation

## Acceptance Criteria
- [ ] Test file created at tests/integration/app.test.tsx
- [ ] Test verifies app renders correctly
- [ ] Test fails before implementation (TDD)

## References
- Feature: 001-project-bootstrap
- Spec: specs/001-project-bootstrap/spec.md
EOF
)"

gh issue create --repo "$REPO" \
  --title "T016: [US1] Create public/index.html" \
  --label "bootstrap,user-story:US1,priority:P1,parallelizable" \
  --body "$(cat <<'EOF'
## Task
Create public/index.html with root div and script tag for src/main.tsx

## User Story
**US1: Developer Starts New Project** (Priority: P1)

## Phase
Phase 3: User Story 1 - Developer Starts New Project

## Parallelizable
Yes - can run in parallel with T015, T017

## Acceptance Criteria
- [ ] index.html created at public/index.html
- [ ] Contains root div element
- [ ] Contains script tag pointing to src/main.tsx

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T017: [US1] Create src/lib/config.ts with Valibot schema" \
  --label "bootstrap,user-story:US1,priority:P1,parallelizable" \
  --body "$(cat <<'EOF'
## Task
Create src/lib/config.ts with AppConfigSchema using Valibot per data-model.md

## User Story
**US1: Developer Starts New Project** (Priority: P1)

## Phase
Phase 3: User Story 1 - Developer Starts New Project

## Parallelizable
Yes - can run in parallel with T015, T016

## Schema
```typescript
import * as v from 'valibot';

export const AppConfigSchema = v.object({
  environment: v.picklist(['development', 'production', 'test']),
  port: v.optional(v.pipe(v.number(), v.minValue(1024), v.maxValue(65535)), 3000),
  debug: v.optional(v.boolean(), false),
});

export type AppConfig = v.InferOutput<typeof AppConfigSchema>;
```

## References
- Feature: 001-project-bootstrap
- Data Model: specs/001-project-bootstrap/data-model.md
EOF
)"

gh issue create --repo "$REPO" \
  --title "T018: [US1] Create src/main.tsx entry point" \
  --label "bootstrap,user-story:US1,priority:P1" \
  --body "$(cat <<'EOF'
## Task
Create src/main.tsx as React entry point with ReactDOM.createRoot

## User Story
**US1: Developer Starts New Project** (Priority: P1)

## Phase
Phase 3: User Story 1 - Developer Starts New Project

## Dependencies
- T016 (index.html must exist)

## Acceptance Criteria
- [ ] main.tsx created at src/main.tsx
- [ ] Uses ReactDOM.createRoot
- [ ] Renders App component

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T019: [US1] Create src/components/App.tsx" \
  --label "bootstrap,user-story:US1,priority:P1" \
  --body "$(cat <<'EOF'
## Task
Create src/components/App.tsx with basic welcome/placeholder content using Tailwind classes

## User Story
**US1: Developer Starts New Project** (Priority: P1)

## Phase
Phase 3: User Story 1 - Developer Starts New Project

## Acceptance Criteria
- [ ] App.tsx created at src/components/App.tsx
- [ ] Contains welcome/placeholder content
- [ ] Uses Tailwind CSS classes for styling
- [ ] Displays correctly in browser

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T020: [US1] Import globals.css and verify Tailwind" \
  --label "bootstrap,user-story:US1,priority:P1" \
  --body "$(cat <<'EOF'
## Task
Import globals.css in main.tsx and verify Tailwind styles apply

## User Story
**US1: Developer Starts New Project** (Priority: P1)

## Phase
Phase 3: User Story 1 - Developer Starts New Project

## Checkpoint
After this task, User Story 1 is complete: `bun dev` shows working app in browser

## Acceptance Criteria
- [ ] globals.css imported in main.tsx
- [ ] Tailwind styles apply correctly
- [ ] App displays with styling in browser

## References
- Feature: 001-project-bootstrap
EOF
)"

echo "Phase 3 issues created."
echo ""

# Phase 4: User Story 2
echo "Creating Phase 4: User Story 2 issues..."

gh issue create --repo "$REPO" \
  --title "T021: [US2] Create unit test placeholder" \
  --label "bootstrap,user-story:US2,priority:P2,parallelizable" \
  --body "$(cat <<'EOF'
## Task
Create unit test placeholder in tests/unit/config.test.ts to verify test runner works

## User Story
**US2: Developer Runs Quality Checks** (Priority: P2)

## Phase
Phase 4: User Story 2 - Developer Runs Quality Checks

## TDD Note
Write this test FIRST, ensure it FAILS before implementation

## Acceptance Criteria
- [ ] Test file created at tests/unit/config.test.ts
- [ ] Test verifies test runner works
- [ ] Test initially fails (TDD)

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T022: [US2] Verify typecheck command" \
  --label "bootstrap,user-story:US2,priority:P2" \
  --body "$(cat <<'EOF'
## Task
Verify `bun run typecheck` (tsc --noEmit) executes with zero errors

## User Story
**US2: Developer Runs Quality Checks** (Priority: P2)

## Phase
Phase 4: User Story 2 - Developer Runs Quality Checks

## Command
```bash
bun run typecheck
```

## Acceptance Criteria
- [ ] typecheck script works
- [ ] Zero type errors on initial codebase
- [ ] SC-005: 100% of codebase passes strict type checking

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T023: [US2] Verify lint command" \
  --label "bootstrap,user-story:US2,priority:P2" \
  --body "$(cat <<'EOF'
## Task
Verify `bun run lint` executes and passes on initial codebase

## User Story
**US2: Developer Runs Quality Checks** (Priority: P2)

## Phase
Phase 4: User Story 2 - Developer Runs Quality Checks

## Command
```bash
bun run lint
```

## Acceptance Criteria
- [ ] lint script works
- [ ] Zero lint errors on initial codebase
- [ ] SC-006: 100% of codebase passes linting

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T024: [US2] Verify test command" \
  --label "bootstrap,user-story:US2,priority:P2" \
  --body "$(cat <<'EOF'
## Task
Verify `bun test` discovers and runs test files from tests/ directory

## User Story
**US2: Developer Runs Quality Checks** (Priority: P2)

## Phase
Phase 4: User Story 2 - Developer Runs Quality Checks

## Command
```bash
bun test
```

## Acceptance Criteria
- [ ] Test runner discovers test files
- [ ] Tests execute successfully

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T025: [US2] Create check script" \
  --label "bootstrap,user-story:US2,priority:P2" \
  --body "$(cat <<'EOF'
## Task
Create `bun run check` script that runs typecheck && lint && test sequentially

## User Story
**US2: Developer Runs Quality Checks** (Priority: P2)

## Phase
Phase 4: User Story 2 - Developer Runs Quality Checks

## Checkpoint
After this task, User Story 2 is complete: all quality gates pass

## Script
```json
"check": "bun run typecheck && bun run lint && bun test"
```

## Acceptance Criteria
- [ ] check script added to package.json
- [ ] Runs all quality checks in sequence
- [ ] SC-002: All checks execute under 30 seconds

## References
- Feature: 001-project-bootstrap
EOF
)"

echo "Phase 4 issues created."
echo ""

# Phase 5: User Story 3
echo "Creating Phase 5: User Story 3 issues..."

gh issue create --repo "$REPO" \
  --title "T026: [US3] Configure build command" \
  --label "bootstrap,user-story:US3,priority:P3" \
  --body "$(cat <<'EOF'
## Task
Configure `bun run build` to output production bundle to dist/

## User Story
**US3: Developer Builds for Production** (Priority: P3)

## Phase
Phase 5: User Story 3 - Developer Builds for Production

## Command
```bash
bun run build
```

## Acceptance Criteria
- [ ] build script configured
- [ ] Production output goes to dist/

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T027: [US3] Configure preview command" \
  --label "bootstrap,user-story:US3,priority:P3" \
  --body "$(cat <<'EOF'
## Task
Configure `bun run preview` to serve dist/ directory locally

## User Story
**US3: Developer Builds for Production** (Priority: P3)

## Phase
Phase 5: User Story 3 - Developer Builds for Production

## Command
```bash
bun run preview
```

## Acceptance Criteria
- [ ] preview script configured
- [ ] Serves dist/ directory locally
- [ ] App loads correctly from production build

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T028: [US3] Verify production build output" \
  --label "bootstrap,user-story:US3,priority:P3" \
  --body "$(cat <<'EOF'
## Task
Verify production build includes minified JS and CSS

## User Story
**US3: Developer Builds for Production** (Priority: P3)

## Phase
Phase 5: User Story 3 - Developer Builds for Production

## Acceptance Criteria
- [ ] JS is minified
- [ ] CSS is minified
- [ ] Build output is optimized

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T029: [US3] Verify production build size" \
  --label "bootstrap,user-story:US3,priority:P3" \
  --body "$(cat <<'EOF'
## Task
Verify production build size is under 100KB initial bundle (per performance goal)

## User Story
**US3: Developer Builds for Production** (Priority: P3)

## Phase
Phase 5: User Story 3 - Developer Builds for Production

## Checkpoint
After this task, User Story 3 is complete: production build pipeline functional

## Acceptance Criteria
- [ ] Initial bundle size < 100KB
- [ ] Performance goal met

## References
- Feature: 001-project-bootstrap
- Plan: specs/001-project-bootstrap/plan.md (Performance Goals)
EOF
)"

echo "Phase 5 issues created."
echo ""

# Phase 6: Polish
echo "Creating Phase 6: Polish issues..."

gh issue create --repo "$REPO" \
  --title "T030: Verify all acceptance scenarios" \
  --label "bootstrap,phase:polish" \
  --body "$(cat <<'EOF'
## Task
Verify all acceptance scenarios from spec.md pass manually

## Phase
Phase 6: Polish & Cross-Cutting Concerns

## Acceptance Scenarios to Verify
### User Story 1
- [ ] Fresh clone + install command → dependencies installed without errors
- [ ] Start command → app accessible in browser
- [ ] App displays welcome/placeholder page

### User Story 2
- [ ] Lint command executes and reports results
- [ ] Type check executes with no errors
- [ ] Test command runs successfully

### User Story 3
- [ ] Build command creates production build
- [ ] Production build serves correctly

## References
- Feature: 001-project-bootstrap
- Spec: specs/001-project-bootstrap/spec.md
EOF
)"

gh issue create --repo "$REPO" \
  --title "T031: Run quickstart.md validation" \
  --label "bootstrap,phase:polish" \
  --body "$(cat <<'EOF'
## Task
Run quickstart.md validation: fresh clone → install → dev → verify in browser

## Phase
Phase 6: Polish & Cross-Cutting Concerns

## Validation Steps
1. Clone repository fresh
2. Run `bun install`
3. Run `bun dev`
4. Open http://localhost:3000
5. Verify app displays

## Acceptance Criteria
- [ ] All quickstart steps work as documented
- [ ] No errors or warnings

## References
- Feature: 001-project-bootstrap
- Quickstart: specs/001-project-bootstrap/quickstart.md
EOF
)"

gh issue create --repo "$REPO" \
  --title "T032: Add .gitignore entries" \
  --label "bootstrap,phase:polish,parallelizable" \
  --body "$(cat <<'EOF'
## Task
Add .gitignore entries for: `node_modules/`, `dist/`, `.env`, `*.log`

## Phase
Phase 6: Polish & Cross-Cutting Concerns

## Parallelizable
Yes

## Entries
```
node_modules/
dist/
.env
*.log
```

## Acceptance Criteria
- [ ] .gitignore updated with all entries
- [ ] Build artifacts not tracked

## References
- Feature: 001-project-bootstrap
EOF
)"

gh issue create --repo "$REPO" \
  --title "T033: Verify SC-001: Clone to running app timing" \
  --label "bootstrap,phase:polish" \
  --body "$(cat <<'EOF'
## Task
Verify SC-001: Clone to running app under 2 minutes

## Phase
Phase 6: Polish & Cross-Cutting Concerns

## Success Criteria
SC-001: Developer can go from fresh clone to running application in under 2 minutes

## Acceptance Criteria
- [ ] Timed test completed
- [ ] Total time < 2 minutes

## References
- Feature: 001-project-bootstrap
- Spec: specs/001-project-bootstrap/spec.md
EOF
)"

gh issue create --repo "$REPO" \
  --title "T034: Verify SC-002: Quality checks timing" \
  --label "bootstrap,phase:polish" \
  --body "$(cat <<'EOF'
## Task
Verify SC-002: Quality checks execute under 30 seconds

## Phase
Phase 6: Polish & Cross-Cutting Concerns

## Success Criteria
SC-002: All quality check commands (lint, type check, test) execute in under 30 seconds on initial codebase

## Command
```bash
time bun run check
```

## Acceptance Criteria
- [ ] Timed test completed
- [ ] Total time < 30 seconds

## References
- Feature: 001-project-bootstrap
- Spec: specs/001-project-bootstrap/spec.md
EOF
)"

gh issue create --repo "$REPO" \
  --title "T035: Verify SC-003: Production build timing" \
  --label "bootstrap,phase:polish" \
  --body "$(cat <<'EOF'
## Task
Verify SC-003: Production build completes under 60 seconds

## Phase
Phase 6: Polish & Cross-Cutting Concerns

## Success Criteria
SC-003: Production build completes in under 60 seconds

## Command
```bash
time bun run build
```

## Acceptance Criteria
- [ ] Timed test completed
- [ ] Total time < 60 seconds

## References
- Feature: 001-project-bootstrap
- Spec: specs/001-project-bootstrap/spec.md
EOF
)"

echo "Phase 6 issues created."
echo ""

echo "============================================"
echo "All 35 issues created successfully!"
echo "============================================"
echo ""
echo "Summary:"
echo "  - Phase 1 (Setup): 5 issues"
echo "  - Phase 2 (Foundational): 9 issues"
echo "  - Phase 3 (US1): 6 issues"
echo "  - Phase 4 (US2): 5 issues"
echo "  - Phase 5 (US3): 4 issues"
echo "  - Phase 6 (Polish): 6 issues"
echo ""
echo "View issues: gh issue list --repo $REPO --label bootstrap"
