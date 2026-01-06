# Quickstart: Slides Application

**Feature**: 001-project-bootstrap
**Date**: 2026-01-06

## Prerequisites

- **Bun**: Version 1.0 or later ([install instructions](https://bun.sh/docs/installation))
- **Node.js**: Not required (Bun handles everything)
- **Git**: For version control

### Verify Bun Installation

```bash
bun --version
# Should output 1.x.x or later
```

## Getting Started

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd slides

# Install dependencies
bun install
```

**Expected time**: < 30 seconds

### 2. Start Development Server

```bash
bun dev
```

**Expected output**:
```
Started development server at http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the Slides application shell.

### 3. Run Quality Checks

```bash
# Type checking
bun run typecheck

# Linting
bun run lint

# Run tests
bun test

# Run all checks
bun run check
```

### 4. Build for Production

```bash
bun run build
```

**Output**: Production files in `dist/` directory.

To preview the production build:

```bash
bun run preview
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server with hot reload |
| `bun run build` | Create production build |
| `bun run preview` | Preview production build locally |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run lint` | Run ESLint |
| `bun run lint:fix` | Run ESLint with auto-fix |
| `bun test` | Run test suite |
| `bun run check` | Run all quality checks (typecheck + lint + test) |

## Project Structure

```
slides/
├── src/
│   ├── components/      # React components
│   │   └── App.tsx      # Root application component
│   ├── styles/
│   │   └── globals.css  # Tailwind CSS imports
│   └── main.tsx         # Application entry point
├── tests/
│   ├── integration/     # Integration tests
│   └── unit/            # Unit tests
├── public/
│   └── index.html       # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── .eslintrc.cjs        # ESLint configuration
```

## Environment Configuration

Create a `.env` file for local configuration (optional):

```env
# Development server port (default: 3000)
PORT=3000

# Enable debug mode
DEBUG=false
```

## Troubleshooting

### Port Already in Use

If port 3000 is busy, either:
1. Set a different port: `PORT=3001 bun dev`
2. Kill the process using port 3000

### TypeScript Errors

Run `bun run typecheck` to see detailed type errors. All code must pass strict type checking.

### Bun Version Issues

Ensure you have Bun 1.0+:
```bash
bun upgrade
```

## Next Steps

After setup is complete:
1. Verify all quality checks pass: `bun run check`
2. Explore the app shell at http://localhost:3000
3. Review the project structure
4. Check the [spec.md](./spec.md) for feature requirements
