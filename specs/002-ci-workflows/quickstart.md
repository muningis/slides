# Quickstart: CI Workflows

## Overview

This feature adds GitHub Actions workflows to automatically verify code quality on pull requests and validate production builds on the main branch.

## What Gets Automated

### On Pull Requests (targeting main)

The CI workflow runs these checks:
1. **Type Check** - `bun run typecheck` - Ensures no TypeScript errors
2. **Lint** - `bun run lint` - Ensures code style compliance
3. **Test** - `bun test` - Runs all test suites

### On Push to Main

The build workflow runs:
1. **Production Build** - `bun run build` - Verifies the app builds successfully

## Workflow Files

After implementation, these files will exist:

```
.github/
└── workflows/
    ├── ci.yml      # PR quality checks
    └── build.yml   # Main branch builds
```

## How It Works

### Pull Request Flow

1. Developer opens PR against `main`
2. GitHub triggers `ci.yml` workflow
3. Workflow installs Bun and dependencies (cached for speed)
4. Runs typecheck, lint, and test sequentially
5. Reports pass/fail status on PR

### Main Branch Flow

1. PR merged (or direct push) to `main`
2. GitHub triggers `build.yml` workflow
3. Workflow installs Bun and dependencies
4. Runs production build
5. Reports pass/fail status on commit

## Viewing Results

- **PR Page**: Check status appears as green checkmark or red X
- **Actions Tab**: Full logs available for debugging failures
- **Commit Status**: Badge on commit shows workflow results

## Local Equivalent

Run these commands locally to replicate CI checks:

```bash
# Same as PR checks
bun run check   # runs typecheck && lint && test

# Same as main branch build
bun run build
```

## Caching

Dependencies are cached using `bun.lock` hash. First run on a new lockfile may be slower; subsequent runs reuse cached `node_modules`.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Checks pass locally but fail in CI | Ensure `bun.lock` is committed; check for OS-specific issues |
| Slow workflow runs | Verify cache is being restored (check "Restore cache" step logs) |
| Build fails only in CI | Compare Bun versions: local vs workflow |
