---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: 'architecture'
project_name: 'bmad-method-practice'
user_name: 'Kevin'
lastStep: 8
status: 'complete'
completedAt: '2026-04-26'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-bmad-method-practice.md
  - _bmad-output/planning-artifacts/implementation-readiness-report-2026-04-26.md
  - docs/bmad_copilot_pixi_vscode_novice_to_expert.md
  - _bmad-output/brainstorming/brainstorming-session-2026-04-26-115639.md
---

# Architecture Decision Document

## Architecture Context Summary

HabitFlow is a recovery-first web application (Django + React/TypeScript) optimized for low-friction daily actions and interruption recovery. The architecture is intentionally split into backend and frontend codebases under `habitflow-web/`, with strict ownership boundaries and a shared API contract.

Critical constraints captured from the PRD and user guidance:

- Project root for implementation is `habitflow-web/`.
- All Django files must live under `habitflow-web/backend/`.
- All React/TypeScript files must live under `habitflow-web/frontend/`.
- Both backend and frontend use `src/` + `test/` layout (no flat app layout).
- Pixi is the primary environment/dependency/task entry point, including environment features instead of Python `venv`.

## Architectural Decisions

### ADR-001: Monorepo with Two Explicit App Boundaries

**Decision:** Keep a single repository with one implementation root (`habitflow-web/`) and two top-level app boundaries (`backend/`, `frontend/`).

**Why:**

- Matches requested folder ownership and reduces ambiguity for AI agents.
- Allows independent development/testing while preserving single-project traceability.
- Simplifies local full-stack orchestration via Pixi tasks.

### ADR-002: Django Backend with `src/test` Layout

**Decision:** Use `backend/src/` for Django project/apps and `backend/test/` for tests.

**Why:**

- Enforces clean separation between product code and tests.
- Aligns with requirement to avoid flat structure.
- Supports straightforward pytest discovery and incremental test layering.

### ADR-003: React + TypeScript Frontend with `src/test` Layout

**Decision:** Use `frontend/src/` for app code and `frontend/test/` for unit/integration/e2e tests.

**Why:**

- Aligns with requirement for `src/test` layout.
- Keeps test intent explicit and scalable as flows expand.
- Supports robust typed UI development around the recovery workflows.

### ADR-004: Pixi-First Environments with Features (No `venv`)

**Decision:** Use Pixi environments + features to manage all Python and Node dependencies/tasks where possible.

**Why:**

- Provides reproducible environments without ad-hoc virtualenv setup.
- Enables backend-only, frontend-only, and full-stack execution modes.
- Enforces a single command contract for local dev and CI.

### ADR-005: Frontend Design System and Recovery UI Ownership

**Decision:** MUI (Material-UI) is the required frontend component foundation for MVP. Theme tokens are owned in `frontend/src/styles`. Shared recovery UI primitives are owned in `frontend/src/shared/ui` with named recovery components (`RecoveryCard`, `RecoveryQueuePanel`, `SaveStateBanner`, `ContinuityStatusPill`) as architecture-level boundaries, not ad-hoc implementation details.

**Why:**

- Keeps design, architecture, and implementation aligned from the start.
- MUI provides WCAG-compliant primitives and responsive utilities reducing accessibility work.
- Named recovery components enforce consistent recovery-first interaction semantics across features.
- Clear ownership boundaries reduce ad-hoc refactoring later.

**Implementation Notes:**

- Token ownership: `frontend/src/styles/tokens.ts` defines calm recovery semantics (neutral colors, accessible contrast, supportive typography).
- Shared primitives: `frontend/src/shared/ui/*` components inherit tokens automatically and expose recovery-specific APIs.
- Feature modules rely solely on shared UI; no feature-to-feature UI imports.
- Recovery components used across daily-queue, comeback-card, reflection-chips, and weekly-summary features.

## Recommended Project Structure

```text
habitflow-web/
├── README.md
├── pixi.toml
├── .env.example
├── .gitignore
├── backend/
│   ├── pyproject.toml
│   ├── src/
│   │   ├── manage.py
│   │   ├── config/
│   │   │   ├── __init__.py
│   │   │   ├── settings/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── base.py
│   │   │   │   ├── local.py
│   │   │   │   └── production.py
│   │   │   ├── urls.py
│   │   │   ├── asgi.py
│   │   │   └── wsgi.py
│   │   ├── apps/
│   │   │   ├── habits/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── apps.py
│   │   │   │   ├── models.py
│   │   │   │   ├── services.py
│   │   │   │   ├── selectors.py
│   │   │   │   ├── api/
│   │   │   │   │   ├── serializers.py
│   │   │   │   │   ├── views.py
│   │   │   │   │   └── urls.py
│   │   │   │   └── migrations/
│   │   │   ├── recovery/
│   │   │   ├── logging/
│   │   │   ├── insights/
│   │   │   └── users/
│   │   ├── common/
│   │   │   ├── auth/
│   │   │   ├── instrumentation/
│   │   │   ├── language_policy/
│   │   │   └── time/
│   │   └── templates/
│   └── test/
│       ├── unit/
│       ├── integration/
│       ├── contract/
│       └── fixtures/
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── app/
│   │   │   ├── router.tsx
│   │   │   ├── providers.tsx
│   │   │   └── store.ts
│   │   ├── features/
│   │   │   ├── daily-queue/
│   │   │   ├── comeback-card/
│   │   │   ├── tiered-completion/
│   │   │   ├── reflection-chips/
│   │   │   └── weekly-summary/
│   │   ├── entities/
│   │   │   ├── habit/
│   │   │   ├── recovery/
│   │   │   └── event/
│   │   ├── shared/
│   │   │   ├── api/
│   │   │   ├── ui/
│   │   │   ├── config/
│   │   │   └── utils/
│   │   └── styles/
│   └── test/
│       ├── unit/
│       ├── integration/
│       ├── e2e/
│       └── fixtures/
└── ops/
    ├── scripts/
    └── ci/
```

## Domain-to-Component Mapping (PRD-Aligned)

- Habit & plan management (FR1–FR5) → `backend/src/apps/habits`, `frontend/src/features/tiered-completion`
- Daily logging/completion (FR6–FR12) → `backend/src/apps/logging`, `frontend/src/features/daily-queue`
- Recovery workflow (FR13–FR18) → `backend/src/apps/recovery`, `frontend/src/features/comeback-card`
- Queue/guidance (FR19–FR22) → `backend/src/apps/recovery/services.py`, `frontend/src/features/daily-queue`
- Reflection/language (FR23–FR26) → `backend/src/common/language_policy`, `frontend/src/features/reflection-chips`
- Insights/analytics (FR27–FR32) → `backend/src/apps/insights`, `backend/src/common/instrumentation`, `frontend/src/features/weekly-summary`
- Adaptive controls (FR33–FR36, post-MVP gated) → `backend/src/apps/recovery`, `frontend/src/features/weekly-summary`
- Accessibility and cross-platform (FR37–FR40) → `frontend/src/shared/ui`, `frontend/test/integration`

## API & Integration Boundaries

### Backend API Boundary

- Public API prefix: `/api/v1/`
- Auth boundary: token/session auth enforced in `backend/src/common/auth`
- Feature endpoints grouped by app:
  - `/api/v1/habits/*`
  - `/api/v1/recovery/*`
  - `/api/v1/logging/*`
  - `/api/v1/insights/*`

### Frontend Boundary

- Feature modules own UI composition and request orchestration.
- Shared API client in `frontend/src/shared/api` is the only transport layer.
- No direct component-to-component API calls across features; communication flows through app state/query cache.

### Data Boundary

- Django ORM access isolated to app services/selectors.
- Event capture routed through `backend/src/common/instrumentation` with versioned event schema.
- Timezone-safe timestamps normalized at write boundaries.

## Pixi Environment & Feature Strategy

### Pixi Contract

- No Python `venv` setup; Pixi environments are the sole environment manager.
- Use Pixi tasks for local dev and CI entry points.
- Use Pixi features to segment dependency sets by responsibility.

### Recommended `pixi.toml` Shape

```toml
[workspace]
name = "habitflow-web"
channels = ["conda-forge"]
platforms = ["osx-arm64", "linux-64", "win-64"]

[dependencies]
python = ">=3.12,<3.13"
nodejs = ">=20,<21"

[feature.backend.pypi-dependencies]
django = "*"
djangorestframework = "*"
pytest = "*"
pytest-django = "*"
ruff = "*"
mypy = "*"

[feature.frontend.dependencies]
# Node runtime already in base deps; frontend JS deps remain in frontend/package.json

[feature.dev.pypi-dependencies]
build = "*"
hatch = "*"

[environments]
default = ["backend", "frontend", "dev"]
backend = ["backend"]
frontend = ["frontend"]
fullstack = ["backend", "frontend", "dev"]

[tasks]
backend-dev = "pixi exec --environment backend python backend/src/manage.py runserver"
backend-test = "pixi exec --environment backend pytest backend/test -q"
backend-lint = "pixi exec --environment backend ruff check backend/src backend/test"
backend-typecheck = "pixi exec --environment backend mypy backend/src"
frontend-dev = "npm --prefix frontend run dev"
frontend-test = "npm --prefix frontend run test"
frontend-lint = "npm --prefix frontend run lint"
frontend-typecheck = "npm --prefix frontend run typecheck"
start = "pixi run backend-dev"
ci = "pixi run backend-lint && pixi run backend-typecheck && pixi run backend-test && pixi run frontend-lint && pixi run frontend-typecheck && pixi run frontend-test"
build = "pixi exec --environment backend python -m build backend"
```

## Testing Architecture (`src/test` Enforcement)

### Backend

- `backend/test/unit`: pure domain/service tests.
- `backend/test/integration`: DB and API integration tests.
- `backend/test/contract`: API contract and schema tests used by frontend coordination.

### Frontend

- `frontend/test/unit`: component and utility tests.
- `frontend/test/integration`: flow tests (daily queue, comeback card, fallback logging).
- `frontend/test/e2e`: user-journey tests for key PRD paths.

## Security, Reliability, and NFR Alignment

- TLS-only deployment boundary; secure cookie/session defaults.
- At-rest encryption delegated to managed DB/storage configuration.
- Retry-safe logging APIs and explicit error states for failed submissions.
- Event schema versioning to preserve cohort comparability across MVP iterations.
- Accessibility baseline (keyboard operability + semantic states) validated in frontend integration tests.

## Implementation Guidance

1. Scaffold the directory tree exactly as defined under `habitflow-web/`.
2. Refactor `habitflow-web/pixi.toml` to the feature/environment model above (remove assumptions of local `venv`).
3. Implement vertical slices in order: logging → recovery → queue reprioritization → insights.
4. Lock API contracts early with backend contract tests before scaling frontend feature breadth.

## Architecture Completion Summary

Architecture is complete and implementation-ready for the HabitFlow web application with:

- strict backend/frontend ownership,
- required `src/test` layout on both sides,
- and Pixi-first environment/features strategy replacing Python virtual environments.
