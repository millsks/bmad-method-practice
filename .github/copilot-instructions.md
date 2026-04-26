# Copilot Instructions — Python + Pixi + BMAD

These instructions are a reusable baseline for Python application repositories that:
- use **Pixi** for environments and task execution,
- use the **BMAD method** for planning-to-implementation flow,
- and want consistent, reviewable Copilot outputs.

## 1) Execution Profile

- Language/runtime baseline: **Python 3.12+**.
- Package/environment manager: **Pixi**.
- Primary packaging tool: **Hatch**.
- Build backend preference: **python-build (`python -m build`)** through Pixi tasks.
- Implementation style: small, testable increments with explicit acceptance checks.

## 2) BMAD Workflow Behavior (Balanced)

When responding to requests, align work to BMAD phase intent:
- **Analysis**: clarify goals, assumptions, constraints.
- **Planning**: convert requirements into actionable steps and acceptance criteria.
- **Solutioning**: design architecture and interfaces before broad implementation.
- **Implementation**: complete one cohesive change end-to-end (code + tests + validation).

Behavior expectations:
- Prefer finishing a defined unit of work in one pass instead of leaving partial edits.
- Keep user direction authoritative; if the user reprioritizes, adapt immediately.
- Avoid inventing unrelated scope, features, or refactors.
- Keep artifacts and changes traceable to the requested task.

## 3) Canonical Pixi Task Contract

Assume repositories define and use these task names:
- `pixi run test`
- `pixi run lint`
- `pixi run format`
- `pixi run typecheck`
- `pixi run start`
- `pixi run build`
- `pixi run ci`

Task usage rules:
- Always prefer `pixi run <task>` over invoking tools directly.
- If a required task is missing, propose adding it rather than bypassing Pixi.
- Use targeted task execution first (e.g., specific tests), then broader gates.
- Before final handoff, run the smallest relevant validation set and report results.

### Command Execution Guardrails

- Treat **Pixi as the required entry point** for all project-related commands.
- Do **not** run project commands directly from the system path when a Pixi-backed equivalent exists.
- Prefer `pixi run <task>` for named workflows and `pixi exec <command>` for one-off commands that must run inside the project environment.
- If a command is not available through Pixi yet, propose adding a Pixi task instead of falling back to an unmanaged system command.

Required patterns:
- Run app or scripts: `pixi run start` or another defined Pixi task
- Run tests: `pixi run test`
- Run linting: `pixi run lint`
- Run formatting: `pixi run format`
- Run type checking: `pixi run typecheck`
- Run builds: `pixi run build`
- Run CI-style validation: `pixi run ci`
- Run Python modules or one-off Python commands: `pixi exec python ...`

Avoid these unmanaged patterns for project work:
- `python ...`
- `pytest ...`
- `ruff ...`
- `mypy ...`
- `pip install ...`
- `hatch run ...`
- `python -m build`

Allowed exception:
- Non-project system inspection commands such as `ls`, `cat`, `find`, `git status`, or `pwd` do not need to run through Pixi.

## 4) Python Code Standards

- Use explicit type hints for public APIs and non-trivial internals.
- Prefer clear names over terse names; avoid one-letter variables except narrow loops.
- Keep functions focused and side effects explicit.
- Follow project lint/format/type policies; do not hand-format around configured tooling.
- Add or update tests for behavior changes when a test suite exists.

## 5) Packaging and Build Standards

- Prefer **Hatch** project configuration and workflows.
- Do **not** introduce setuptools-based configuration in new work unless explicitly requested.
- Route builds through project tasks (e.g., `pixi run build`) that execute python-build workflows.
- Keep packaging metadata centralized and avoid duplicate configuration across files.

## 6) Repository Hygiene

- Do not commit generated caches, virtual environments, or local tool state.
- Keep `.pixi` and other environment artifacts out of commits except explicitly tracked config files.
- Make minimal, focused edits; do not reformat unrelated files.
- Update docs only when behavior, commands, or developer workflow changes.

## 7) Response and Delivery Expectations

- State assumptions briefly when requirements are ambiguous.
- Prefer concrete file changes over long theoretical explanations.
- Report what changed, how it was validated, and any remaining risks/open questions.
- Offer the most logical next step (e.g., add missing task definitions, run CI, or open PR).

## 8) Recommended Baseline for New Repos

For new Python+Pixi repos, standardize early:
- Define all canonical tasks (`test`, `lint`, `format`, `typecheck`, `start`, `build`, `ci`).
- Ensure Hatch + python-build workflow is wired behind `pixi run build`.
- Add tool configuration for testing, linting, formatting, and type checking.
- Keep BMAD planning and implementation artifacts in explicit, versioned locations.
