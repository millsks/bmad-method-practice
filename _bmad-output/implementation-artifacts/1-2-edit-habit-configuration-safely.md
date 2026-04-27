---
story_key: 1-2-edit-habit-configuration-safely
epic: 1
title: Edit Habit Configuration Safely
status: review
created: 2026-04-27
last_updated: 2026-04-27
---

## Story

As a user,
I want to edit cadence, tier values, and preferred windows,
So that my habit remains realistic as my schedule changes.

## Acceptance Criteria

**Given** an existing active habit
**When** I update tier values, cadence, or time window
**Then** new settings apply to future recommendations
**And** historical records remain unchanged and visible.

## Tasks/Subtasks

### Phase 1: Backend Safe Habit Edit Slice

- [x] Extend backend habit domain for safe configuration edits
  - [x] Add immutable configuration snapshot/history models for previous habit settings
  - [x] Add repository/service update operation that changes current settings while preserving prior records
  - [x] Add API-facing helper for updating a habit from request payloads

- [x] Add backend tests for Story 1.2 acceptance criteria
  - [x] Validate updated cadence, time window, and tier values replace current settings for future use
  - [x] Validate previous configuration records remain unchanged and visible after edit

### Phase 2: Frontend Edit Flow + Visible History

- [x] Extend the tiered completion frontend module with habit editing
  - [x] Add typed frontend model/service contract for editing habit configuration and reading configuration history
  - [x] Add edit UI with prefilled current values, cancel path, and explicit save confirmation
  - [x] Render visible prior configuration history alongside the updated habit state

- [x] Add frontend tests for Story 1.2 acceptance criteria
  - [x] Validate full user flow edits an existing habit from the queue
  - [x] Validate prior configuration remains visible after saving updated values

### Phase 3: Validation and Story Updates

- [x] Run Story 1.2 validation via Pixi
  - [x] `pixi run test`
  - [x] `pixi run lint`
  - [x] `pixi run typecheck`

- [x] Update story implementation records
  - [x] Update File List with changed files
  - [x] Update Change Log and Dev Agent Record with implementation details

## Dev Notes

### Scope and Boundaries

- Story scope is limited to: `backend/src/apps/habits`, `frontend/src/features/tiered-completion`, and related tests.
- Keep implementation minimal and directly mapped to Story 1.2 acceptance criteria.
- Use Pixi-managed validation only.

### Architecture Alignment

From `_bmad-output/planning-artifacts/architecture.md` and `_bmad-output/planning-artifacts/epics.md`:

- Habit and plan management belongs in `backend/src/apps/habits` and `frontend/src/features/tiered-completion`.
- API boundary remains conceptually under `/api/v1/habits/*`.
- Frontend feature module owns UI composition for this slice.
- Safe edit flows must preserve prior records while making new settings the active configuration.

### Prior Story Learnings Applied

From Story 1.1:

- Keep all commands and validation through Pixi tasks.
- Keep edits focused and avoid unrelated architecture expansion.
- Preserve baseline create-flow behavior while layering edit support.
- Prefer explicit save-state feedback and retain visible history for trust.

## File List

- [x] `habitflow-web/backend/src/apps/habits/models.py`
- [x] `habitflow-web/backend/src/apps/habits/repository.py`
- [x] `habitflow-web/backend/src/apps/habits/service.py`
- [x] `habitflow-web/backend/src/apps/habits/api.py`
- [x] `habitflow-web/backend/test/unit/test_story_1_1_habit_creation.py`
- [x] `habitflow-web/frontend/src/features/tiered-completion/types.ts`
- [x] `habitflow-web/frontend/src/features/tiered-completion/habitsApi.ts`
- [x] `habitflow-web/frontend/src/features/tiered-completion/TieredHabitCreatePanel.tsx`
- [x] `habitflow-web/frontend/test/tiered-completion.test.tsx`
- [x] `_bmad-output/implementation-artifacts/1-2-edit-habit-configuration-safely.md`
- [x] `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- **2026-04-27**: Story created and set to in-progress for implementation.
- **2026-04-27**: Implemented safe habit configuration edits with preserved backend/frontend history and visible edit/save feedback.
- **2026-04-27**: Validated Story 1.2 with `pixi run test`, `pixi run lint`, and `pixi run typecheck`.

## Dev Agent Record

### Implementation Plan

1. Add backend configuration history support and update operations for habits.
2. Add backend tests covering safe edits and preserved history.
3. Extend the frontend queue with edit actions, save-state feedback, and visible history.
4. Add frontend tests for edit flow and preserved prior configuration display.
5. Run Pixi test/lint/typecheck and finalize story records.

### Debug Log

- Started Story 1.2 implementation workflow.
- Added backend configuration snapshots, update operations, and update/list-history API helpers.
- Extended frontend in-memory habit store and UI to support editing, saved-state messaging, cancel edit flow, and visible prior configuration history.
- Validated backend and frontend behavior through Pixi-managed test, lint, and typecheck tasks.

### Completion Notes

- Acceptance criteria satisfied:
  - Existing habits can update cadence, time window, and tier targets through the edit flow.
  - Updated settings become the active configuration used by the current queue state.
  - Previous configuration snapshots remain visible in backend history and frontend queue UI.
- Added backend tests for update behavior, preserved history, and update payload handling.
- Added frontend tests for editing an existing habit and showing prior configuration history after save.
- Pixi validation completed successfully: `pixi run test`, `pixi run lint`, `pixi run typecheck`.

## Status

**Current Status:** review
**Ready for Review:** Yes
