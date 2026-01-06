# Research: CI Workflows

**Feature**: 002-ci-workflows
**Date**: 2026-01-06

## Research Topics

### 1. GitHub Actions with Bun Runtime

**Decision**: Use `oven-sh/setup-bun` action for Bun installation on GitHub runners

**Rationale**:
- Official Bun setup action maintained by Oven (Bun creators)
- Handles caching of Bun installation automatically
- Supports version pinning for reproducible builds
- Well-documented and widely adopted

**Alternatives Considered**:
- Manual Bun installation via curl: More complex, no caching, harder to maintain
- Container-based approach (Docker): Adds overhead, slower startup, unnecessary for simple workflows

### 2. Dependency Caching Strategy

**Decision**: Use GitHub Actions built-in cache with `actions/cache` and Bun's lockfile

**Rationale**:
- Bun uses `bun.lock` for deterministic installs
- GitHub Actions cache persists across workflow runs
- Cache key based on lockfile hash ensures cache invalidation on dependency changes
- Significant speed improvement for subsequent runs (typically 10-30x faster installs)

**Alternatives Considered**:
- No caching: Slower builds, unnecessary network traffic
- Custom caching solution: Over-engineered for this use case

### 3. Workflow Trigger Configuration

**Decision**:
- PR workflow: `pull_request` event targeting `main` branch
- Build workflow: `push` event on `main` branch

**Rationale**:
- `pull_request` runs on PR open, synchronize (new commits), and reopen
- Targeting main branch prevents running on feature-to-feature PRs
- `push` to main captures both direct pushes and merged PRs
- Clean separation between quality checks (PR) and deployment readiness (main)

**Alternatives Considered**:
- Single workflow for both: Less clear, harder to configure different behaviors
- `workflow_dispatch`: Adds manual trigger complexity not needed initially

### 4. Job Structure

**Decision**: Single job with sequential steps for PR checks; single job for build verification

**Rationale**:
- Sequential steps share checkout and cached dependencies
- Simpler than parallel jobs for small project
- Faster total time due to no job startup overhead
- Easy to understand and debug

**Alternatives Considered**:
- Parallel jobs (typecheck, lint, test in separate jobs): Adds complexity, slower due to multiple checkouts and cache restores, overkill for ~3 second checks
- Matrix builds: Not needed, single OS/runtime target

### 5. Error Reporting

**Decision**: Rely on GitHub Actions native error annotations and step summaries

**Rationale**:
- GitHub automatically parses common error formats (TypeScript, ESLint)
- Errors appear inline in PR diff view
- No additional tooling or configuration required
- Built-in workflow summary for quick overview

**Alternatives Considered**:
- Custom error formatters: Unnecessary complexity
- Third-party reporting tools: Adds dependencies, potential security/privacy concerns

## Technical Decisions Summary

| Decision | Choice | Key Benefit |
|----------|--------|-------------|
| Bun Setup | `oven-sh/setup-bun@v2` | Official, cached, reliable |
| Caching | `actions/cache` with `bun.lock` | Fast subsequent runs |
| PR Trigger | `pull_request` → `main` | Quality gate before merge |
| Build Trigger | `push` → `main` | Verify deployability |
| Job Structure | Single job, sequential steps | Simple, fast |
| Error Reporting | Native GitHub annotations | Zero config, good UX |
