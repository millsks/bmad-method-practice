# Deferred Work

## Deferred from: code review of 1-0-bootstrap-habitflow-workspace-and-pixi-feature-environments.md (2026-04-26)

- Structured logging framework not present in backend bootstrap (`backend/pyproject.toml`): architecture requires structured logging, deferred as pre-existing and to be implemented in a follow-on story.

## Deferred from: code review rerun of 1-0-bootstrap-habitflow-workspace-and-pixi-feature-environments.md (2026-04-26)

- npm audit vulnerabilities remain non-blocking for bootstrap acceptance (`habitflow-web/frontend`): CI reports 13 vulnerabilities; track and remediate in dependency-maintenance story.
- TypeScript-eslint compatibility warning persists (`habitflow-web/frontend` toolchain): lint passes with TypeScript 5.9.x warning; align versions in tooling-upgrade story.
