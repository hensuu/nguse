# CLAUDE.md

This file provides context for Claude Code when working with this repository.

## Project Overview

**nguse** is an Angular composables library inspired by VueUse. It provides reusable, reactive utility functions built on Angular Signals.

## Tech Stack

- **Angular 20** with zoneless change detection
- **TypeScript 5.9** (strict mode)
- **Tailwind CSS 4** for styling
- **pnpm** as package manager
- **ng-packagr** for library builds
- **Zard UI** for UI components

## Project Structure

```
apps/site/       # Demo/documentation Angular app
libs/core/       # @nguse/core library (composables)
```

## Commands

```bash
pnpm start       # Dev server for docs app
pnpm build       # Build app and library
pnpm test        # Run Karma tests
pnpm lint        # ESLint
```

## Code Conventions

- Composables use `use*` naming (e.g., `useToggle`)
- Standalone components only (no NgModules)
- Public API exports via `public-api.ts` in each library
- Path alias: `@nguse/core` maps to `./dist/core`

## Key Patterns

- Use Angular Signals for reactive state
- Return readonly signals from composables, mutate via methods
- Write comprehensive tests using TestBed with injection context

## External References

- [docs/zard-ui-llms.txt](docs/zard-ui-llms.txt) - Zard UI component library reference (Angular + Tailwind v4 + CVA)
