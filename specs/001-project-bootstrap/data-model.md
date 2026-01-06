# Data Model: Project Bootstrap

**Feature**: 001-project-bootstrap
**Date**: 2026-01-06

## Overview

The project bootstrap feature has minimal data modeling requirements. This document captures the configuration structures and type definitions needed for the initial project setup.

## Entities

### 1. Application Configuration

The runtime configuration for the application.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| environment | `"development" \| "production" \| "test"` | Yes | Current runtime environment |
| port | `number` | No | Development server port (default: 3000) |
| debug | `boolean` | No | Enable debug logging (default: false in production) |

**Validation Rules**:
- `port` must be between 1024 and 65535 (non-privileged ports)
- `environment` must be one of the allowed values

**Valibot Schema**:
```typescript
import * as v from 'valibot';

export const AppConfigSchema = v.object({
  environment: v.picklist(['development', 'production', 'test']),
  port: v.optional(v.pipe(v.number(), v.minValue(1024), v.maxValue(65535)), 3000),
  debug: v.optional(v.boolean(), false),
});

export type AppConfig = v.InferOutput<typeof AppConfigSchema>;
```

### 2. Build Metadata

Information about the current build (populated at build time).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| version | `string` | Yes | Application version from package.json |
| buildTime | `string` | Yes | ISO timestamp of build |
| commitHash | `string` | No | Git commit hash if available |

**Usage**: Displayed in app shell footer/debug info, useful for troubleshooting.

## Relationships

No relationships between entities in bootstrap phase. Future features will introduce:
- Slides and Presentations (core domain)
- User preferences and settings
- Export configurations

## State Transitions

N/A for bootstrap - no stateful entities yet.

## Data Flow

```
Environment Variables
        ↓
  AppConfigSchema (validation)
        ↓
  AppConfig (typed config object)
        ↓
  React Context / Module scope
```

## Notes

- All configuration is read-only at runtime
- No persistence layer in bootstrap phase
- Configuration loaded once at application startup
- Invalid configuration should fail fast with clear error messages
