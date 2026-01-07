# Quickstart: Slide Renderer

**Feature**: 005-slide-renderer
**Branch**: `005-slide-renderer`

## Prerequisites

- Bun installed (v1.0+)
- Repository cloned and dependencies installed (`bun install`)

## Quick Test

```bash
# Run all tests
bun test

# Run slide-related tests only
bun test tests/unit/schemas
bun test tests/unit/navigation
bun test tests/integration/slides
```

## Development Workflow

### 1. Start Development Server

```bash
# Start the server (serves slides at /slides/:slug)
bun run dev:server

# In another terminal, watch for client changes
bun run dev
```

### 2. Test with Sample Presentation

Create a test presentation JSON:

```json
{
  "slides": [
    {
      "type": "title",
      "title": "Welcome to My Presentation"
    },
    {
      "type": "title-subtitle",
      "title": "Section 1",
      "subtitle": "Introduction"
    },
    {
      "type": "bullets",
      "title": "Key Points",
      "items": ["First point", "Second point", "Third point"]
    },
    {
      "type": "code",
      "title": "Example Code",
      "language": "typescript",
      "blocks": [
        "const x = 1;",
        "const x = 1;\nconst y = 2;",
        "const x = 1;\nconst y = 2;\nconst sum = x + y;"
      ]
    }
  ]
}
```

### 3. Navigate Presentation

- **Forward**: Right Arrow / Space / Click
- **Backward**: Left Arrow / Backspace

## Key Files

| File | Purpose |
|------|---------|
| `src/shared/schemas/presentation.ts` | Valibot schemas for JSON validation |
| `src/shared/lib/navigation/controller.ts` | Navigation state machine |
| `src/client/components/slides/` | Slide type components |
| `src/client/hooks/usePresentation.ts` | React hook for navigation state |

## Validation

```bash
# Type check
bun run typecheck

# Lint
bun run lint

# All checks
bun run check
```

## Slide Types Reference

| Type | Required Fields | Optional Fields | Steps |
|------|-----------------|-----------------|-------|
| `title` | `title` | - | 1 |
| `title-subtitle` | `title`, `subtitle` | - | 1 |
| `text` | `text` | `title` | 1 |
| `bullets` | `items` | `title` | N (one per item) |
| `code` | `blocks`, `language` | `title` | N (one per block) |
| `timeline` | `events` | `title` | N (one per event) |

## Common Issues

### "Invalid slide type" error
Ensure `type` field matches exactly: `title`, `title-subtitle`, `text`, `bullets`, `code`, `timeline`

### Navigation not responding
Check browser console for errors. Ensure keyboard focus is on the presentation container.

### Code highlighting not working
Verify `language` field is specified in code slide configuration.
