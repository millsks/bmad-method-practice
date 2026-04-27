---
story_key: 1-0-bootstrap-habitflow-workspace-and-pixi-feature-environments
epic: 1
title: Bootstrap HabitFlow Workspace and Pixi Feature Environments
status: done
created: 2026-04-26
last_updated: 2026-04-26
---

## Story

As a developer,
I want the `habitflow-web/` workspace scaffolded with Pixi-managed environments, backend/frontend boundaries, and baseline validation tasks,
So that feature stories can be implemented on a stable, reproducible foundation.

## Acceptance Criteria

**Given** a clean implementation root under `habitflow-web/`
**When** the bootstrap story is completed
**Then** `backend/src`, `backend/test`, `frontend/src`, and `frontend/test` exist with baseline project skeletons aligned to architecture constraints
**And** Pixi tasks and Pixi environment features exist for backend, frontend, and full-stack validation flows
**And** the initial validation path for changed areas is documented and executable through Pixi-managed commands only (`pixi run test`, `pixi run lint`, etc.).

## Tasks/Subtasks

### Phase 1: Workspace Structure & Configuration

- [x] Create `habitflow-web/` directory structure with backend/frontend/docs separation
  - [x] Create `backend/` with `src/` and `test/` subdirectories
  - [x] Create `frontend/` with `src/` and `test/` subdirectories
  - [x] Create `docs/` for architecture and API documentation
  
- [x] Create baseline `pixi.toml` at `habitflow-web/pixi.toml` with feature separation
  - [x] Define backend feature with Python dependencies
  - [x] Define frontend feature with Node.js dependencies
  - [x] Set up environment channels and dependencies

- [x] Define Pixi tasks for baseline validation
  - [x] `pixi run test` - runs all tests (backend + frontend)
  - [x] `pixi run lint` - runs linting (backend + frontend)
  - [x] `pixi run format` - runs code formatting (backend + frontend)
  - [x] `pixi run typecheck` - type checking (backend + frontend)
  - [x] `pixi run ci` - full CI validation suite

### Phase 2: Backend Scaffold

- [x] Create `backend/pixi.toml` with backend-specific environment and tasks
  - [x] Python 3.12+ base
  - [x] Development dependencies (pytest, ruff, mypy, black)
  - [x] Production-ready structure

- [x] Initialize Python backend project
  - [x] `backend/src/habitflow/` package structure
  - [x] `backend/src/habitflow/__init__.py`
  - [x] `backend/test/` test directory with `conftest.py`
  - [x] `backend/pyproject.toml` with basic metadata

- [x] Create backend baseline validation
  - [x] `backend/test/test_bootstrap.py` - validates package imports
  - [x] Ensure `pixi run test` passes for backend

### Phase 3: Frontend Scaffold

- [x] Create `frontend/package.json` with baseline dependencies
  - [x] React, TypeScript, MUI core
  - [x] Testing (vitest, React Testing Library)
  - [x] Linting (ESLint)
  - [x] Type checking setup

- [x] Initialize frontend project structure
  - [x] `frontend/src/` with `App.tsx` and index entry
  - [x] `frontend/src/features/` feature directory stub
  - [x] `frontend/test/` with baseline test structure

- [x] Create frontend baseline validation
  - [x] `frontend/test/bootstrap.test.tsx` - validates app initialization
  - [x] Ensure `pixi run test` passes for frontend

### Phase 4: Documentation & Validation

- [x] Create `habitflow-web/README.md` with:
  - [x] Development quickstart (Pixi setup, tasks)
  - [x] Project structure overview
  - [x] Validation workflow documentation

- [x] Document validation flow:
  - [x] `pixi run test` - validates changes
  - [x] `pixi run lint` - code quality
  - [x] `pixi run typecheck` - type safety
  - [x] `pixi run ci` - full suite

- [x] Verify all tasks execute successfully
  - [x] `pixi run test` passes
  - [x] `pixi run lint` passes
  - [x] `pixi run typecheck` passes
  - [x] `pixi run ci` passes

## Dev Notes

### Architecture Requirements

From `_bmad-output/planning-artifacts/architecture.md`:

- Backend: Python 3.12+ with structured logging
- Frontend: React + TypeScript with MUI
- API boundary: `/api/v1/` with grouped domains (habits, recovery, logging, insights)
- Workspace isolation: `backend/` and `frontend/` with separate Pixi environments
- No ad-hoc venv workflows; all commands through Pixi

### Key Constraints

- Use Pixi feature environments for backend and frontend isolation
- Backend uses Hatch + python-build through Pixi tasks
- Frontend uses npm/yarn with TypeScript in strict mode
- All validation must be executable through `pixi run <task>`
- Avoid flat app structures; maintain `src/` + `test/` explicitly

### Technical Decisions

- Python backend scaffold uses Hatch project metadata in `pyproject.toml`
- Frontend scaffold uses standard npm tooling with ESLint + TypeScript
- Both environments managed at `habitflow-web/` level via primary `pixi.toml`
- Each environment can have feature-specific tasks (e.g., `pixi run -f backend test`)

## File List

- [x] `habitflow-web/pixi.toml` - Root Pixi configuration
- [x] `habitflow-web/README.md` - Development quickstart
- [x] `habitflow-web/backend/pixi.toml` - Backend environment config
- [x] `habitflow-web/backend/README.md` - Backend package readme for build metadata
- [x] `habitflow-web/backend/src/habitflow/__init__.py`
- [x] `habitflow-web/backend/src/habitflow/py.typed` - PEP 561 marker
- [x] `habitflow-web/backend/pyproject.toml` - Backend project metadata
- [x] `habitflow-web/backend/test/conftest.py` - Pytest configuration
- [x] `habitflow-web/backend/test/test_bootstrap.py` - Bootstrap validation test
- [x] `habitflow-web/frontend/package.json` - Frontend dependencies
- [x] `habitflow-web/frontend/tsconfig.json` - TypeScript configuration
- [x] `habitflow-web/frontend/src/App.tsx` - Root component
- [x] `habitflow-web/frontend/src/main.tsx` - Entry point
- [x] `habitflow-web/frontend/src/index.css` - Base styles
- [x] `habitflow-web/frontend/src/features/.gitkeep` - Feature directory stub
- [x] `habitflow-web/frontend/test/bootstrap.test.tsx` - Bootstrap validation test
- [x] `habitflow-web/docs/screenshots/story-1-0-bootstrap-home.png` - Frontend bootstrap screenshot artifact

## Change Log

- **2026-04-26**: Story created and ready for implementation
- **2026-04-26**: Bootstrap scaffold implemented end-to-end and validated via `pixi run ci`

## Dev Agent Record

### Implementation Plan

1. Create workspace structure with backend/frontend/docs separation
2. Set up Pixi configuration with feature-based environments
3. Define canonical validation tasks (test, lint, format, typecheck, ci)
4. Create baseline Python backend with Hatch scaffolding
5. Create baseline React + TypeScript frontend with MUI
6. Add bootstrap validation tests for both environments
7. Document development workflow and validation paths
8. Run full CI validation and confirm all tasks pass

### Debug Log

- Added root Pixi feature environments and canonical validation tasks.
- Scaffolded backend and frontend baseline structures and tests.
- Installed missing frontend lint plugin and aligned Vitest to non-interactive CI mode.
- Resolved Node/jsdom compatibility by pinning `jsdom` to a Node 18-compatible major.
- Fixed frontend test import path and backend package README requirement for Hatch build.

### Completion Notes

- Story 1.0 acceptance criteria are satisfied.
- `backend/src`, `backend/test`, `frontend/src`, `frontend/test` all exist with baseline project skeletons.
- Pixi feature environments and task flows are implemented at workspace root.
- Validation commands are documented and confirmed passing via `pixi run ci`.
- Frontend bootstrap UI screenshot captured at `habitflow-web/docs/screenshots/story-1-0-bootstrap-home.png`.

## Review Findings

### Decision Needed

- [x] **Decision** — Vite `strictPort: false` breaks hardcoded localhost:3000 screenshot task. **RESOLVED:** Pin `strictPort: true` to guarantee port 3000 binding.

### Patches

- [x] **Patch** — Shell command error handling lacks strict exit semantics [pixi.toml:25-58]. Composite tasks use `cd` chains with `&&`, but no `set -e` enforces strict failure exit. If any step fails mid-chain, subsequent commands may still execute in the wrong directory.
- [x] **Patch** — Build command now runs through Pixi-managed task flow [pixi.toml, build-backend task]. Backend build executes via `pixi run build-backend` inside the Pixi environment as part of `pixi run build` / `pixi run ci`.
- [x] **Patch** — Frontend dependencies not enforced before composite tasks [pixi.toml:26]. Tasks assume `node_modules` exists, but `install-frontend-deps` is manual and separate. Running `pixi run test` without first running `install-frontend-deps` will fail with module resolution errors.
- [x] **Patch** — Hatch package configuration validated for compatibility [backend/pyproject.toml:16]. Kept supported Hatch syntax `packages = ["src/habitflow"]` after confirming wheel and sdist builds pass.
- [x] **Patch** — Backend bootstrap test assumes habitflow in PYTHONPATH [backend/test/test_bootstrap.py]. Test imports `habitflow` without ensuring it's in `sys.path` or installed editable. Should add `sys.path.insert(0, str(Path(__file__).parent.parent / "src"))` guard.
- [x] **Patch** — pytest-cov dependency declared but not configured [backend/pyproject.toml:15]. `pytest-cov>=4.1` is in dependencies but never used. Either configure coverage in `pyproject.toml` or remove the dependency.
- [x] **Patch** — Backend runtime dependencies empty despite package structure [backend/pyproject.toml:10]. `dependencies = []` but the package scaffold suggests it may need transitive dependencies. Verify and declare explicitly or remove the entry.
- [x] **Patch** — Complex 600+ character CI task vulnerable to metacharacter injection [pixi.toml:47]. Long single-line `ci` task with 8 `cd ../` sequences is hard to maintain and vulnerable to shell injection. Should split into smaller, composable tasks.
- [x] **Patch** — No directory existence validation before cd/test execution [pixi.toml, all tasks]. Commands assume `backend/test`, `frontend/` directories exist. Should add guards like `[[ -d backend/test ]] || exit 1` before task execution.
- [x] **Patch** — jsdom and MUI/Emotion dependency versions have loose semantic ranges [frontend/package.json:22, 15-17]. `jsdom ^22.1.0` and `@emotion/react ^11.11.0` use loose ranges. Tighten to tested ranges (e.g., `~22.1.0`) to prevent unexpected incompatibilities with Node 18.
- [x] **Patch** — Missing .gitignore entries for build/cache artifacts [root, backend, frontend]. No .gitignore entries for `node_modules/`, `dist/`, `.pytest_cache/`, `.ruff_cache/`. Should add these to avoid accidental commits and improve reproducibility.
- [x] **Patch** — README lacks architecture constraint documentation [habitflow-web/README.md]. README documents available tasks but not key architecture constraints (structured logging, recovery UI ownership, API boundary `/api/v1/`, workspace isolation principles). Should add a Design Principles section or link to `architecture.md`.

### Deferred

- [x] **Defer** — Structured logging framework not present [backend/pyproject.toml]. Architecture specifies "Python 3.12+ with structured logging" but no logging framework is included. Noted in story as pre-existing; deferred to future story that requires logging.
- [x] **Dismiss** — Bootstrap test does not verify Pixi tasks are executable. Acceptance criteria require tasks to be "executable through Pixi-managed commands only", but test validates structure, not task executability. All tasks manually verified; this is a false positive.

## Status

**Current Status:** done
**Ready for Review:** Review actions complete
