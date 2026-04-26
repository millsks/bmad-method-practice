---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/planning-artifacts/architecture.md
---

# bmad-method-practice - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for bmad-method-practice, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Solo Developer + AI Agent Delivery Constraints

- Development model is one human developer coordinating AI agents; no parallel team capacity should be assumed.
- Each story must be executable as a single focused vertical slice (target: one PR and one agent session, with optional follow-up bugfix session).
- Stories should avoid mixed broad backend + frontend + analytics scope unless the slice is minimal and testable.
- Each story handoff to an AI agent should include: scope boundary, files/modules expected, acceptance criteria to verify, and exact Pixi validation command(s).
- Completion standard for every story: code + tests + lint/typecheck pass for changed areas + brief implementation note in PR description.

## Recommended Solo Execution Order

1. Epic 1 (foundation + language safety)
2. Epic 2 (core logging + comeback loop)
3. Epic 3 (queue guidance + reflection + save confidence)
4. Epic 5 (UX component quality + accessibility + responsive hardening)
5. Epic 4 (instrumentation, summaries, export)
6. Epic 6 (adaptive recommendations post-MVP gate)

This order preserves user value early and keeps high-risk analytics/adaptation work until core behavior is stable.

## Requirements Inventory

### Functional Requirements

FR1: Users can create a habit with full, reduced, and minimum completion tiers.
FR2: Users can edit habit definitions, including tier values and preferred completion windows.
FR3: Users can activate or pause a habit without deleting historical records.
FR4: Users can set and update a default fallback action for each habit.
FR5: Users can configure whether a habit is tracked daily or with a flexible cadence.
FR6: Users can log full completion for a habit.
FR7: Users can log reduced completion for a habit.
FR8: Users can log minimum completion for a habit.
FR9: Users can mark a habit as interrupted for the day.
FR10: Users can complete daily logging actions from a single primary daily view.
FR11: Users can record a planned comeback for a future time window.
FR12: Users can complete a previously planned comeback action.
FR13: The system can present an immediate comeback option after an interruption is logged.
FR14: Users can choose between immediate minimum completion and planned comeback paths after interruption.
FR15: The system can preserve continuity when a valid completion tier is logged after interruption.
FR16: Users can recover from multi-day inactivity without losing access to active habits.
FR17: Users can restart a habit from the current day while preserving historical interruption/completion records.
FR18: The system can prevent dead-end interruption states by always offering a valid next action.
FR19: The system can present a prioritized daily habit queue.
FR20: The system can reprioritize the daily queue after user actions.
FR21: The system can include both at-risk habits and low-effort wins in daily prioritization.
FR22: Users can see their next recommended action for each habit in the daily queue.
FR23: Users can optionally attach a one-tap reflection tag to interruption and recovery events.
FR24: Users can log successful daily outcomes without providing reflection input.
FR25: The system can display non-judgmental status labels for completion and interruption states.
FR26: The system can enforce a prohibited vocabulary policy for punitive status terms in core flows.
FR27: Users can view a weekly recovery-oriented summary of interruption and comeback patterns.
FR28: The system can distinguish and report full, reduced, and minimum completion counts.
FR29: The system can record interruption events with timestamps and reason metadata.
FR30: The system can record comeback-card exposure and selected recovery path metadata.
FR31: The system can record planned comeback creation and completion events.
FR32: The system can provide analyzable event history for cohort-level recovery and continuity evaluation.
FR33: The system can generate adaptive behavior recommendations based on recent usage patterns.
FR34: Users can preview adaptive recommendations before applying them.
FR35: Users can accept or reject each adaptive recommendation.
FR36: Users can reverse previously applied adaptive recommendations.
FR37: Users can complete core daily actions using keyboard-only interaction.
FR38: Users can use core daily flows across supported modern web browsers.
FR39: Users can use core daily flows on both mobile-width and desktop-width layouts.
FR40: Users can receive equivalent status meaning through text semantics independent of visual color cues.

### NonFunctional Requirements

NFR1: Core daily action flow (open app → log complete/miss/fallback) completes within 10 seconds median user interaction time.
NFR2: UI state updates after a daily action are reflected to the user within 2 seconds under normal network conditions.
NFR3: Weekly summary views load within 3 seconds for a typical user account history.
NFR4: All data in transit is protected using TLS.
NFR5: User habit and reflection data is encrypted at rest.
NFR6: Access to user data is restricted to the owning authenticated user, except explicit maintainer-level analytics access for cohort validation.
NFR7: Reflection and interruption metadata collection is transparent to users, with clear disclosure of what is stored and why.
NFR8: The system supports user-initiated data export and delete operations for account-associated habit data.
NFR9: Core daily logging and recovery flows are fully keyboard-operable.
NFR10: Core screens satisfy WCAG 2.1 AA contrast and semantic labeling expectations.
NFR11: Status and progress meaning is conveyed through text semantics, not color alone.
NFR12: Daily logging actions are durably persisted such that successful submissions are not silently lost.
NFR13: If a logging action fails, the user receives a clear retry path without losing context.
NFR14: Event timestamps are stored with timezone-safe semantics for consistent recovery-window calculations.
NFR15: The system supports at least 10x growth from initial cohort usage without functional degradation of core daily flows.
NFR16: Performance of core daily flows does not degrade by more than 10% under expected growth scenarios.
NFR17: Event data required for validation metrics is exportable in a machine-readable format for cohort analysis.
NFR18: Instrumentation event schema remains stable across MVP iterations, with versioned changes when needed.

### Additional Requirements

- Implement under `habitflow-web/` with strict boundaries: backend code in `backend/`, frontend code in `frontend/`.
- Enforce `src/` + `test/` layout for backend and frontend; avoid flat app structures.
- Use Pixi-first environment and task execution; no ad-hoc Python `venv` workflows.
- Maintain API boundary under `/api/v1/` with grouped domains (`habits`, `recovery`, `logging`, `insights`).
- Keep frontend feature boundaries explicit (`daily-queue`, `comeback-card`, `tiered-completion`, `reflection-chips`, `weekly-summary`).
- Capture event data through a versioned instrumentation pathway with timezone-safe writes.
- Build vertical slices in sequence (logging → recovery → queue reprioritization → insights) to preserve incremental value.
- Validate contracts with backend contract tests to support frontend integration.
- Treat adaptive recommendations as post-MVP gated capabilities with explicit preview-and-apply consent.

### UX Design Requirements

UX-DR1: Implement a calm recovery visual direction (Calm Recovery) with one-primary-action hierarchy in interruption states.
UX-DR2: Build a themeable MUI token system for color, typography, and spacing aligned to recovery-first emotional goals.
UX-DR3: Implement `RecoveryCard` with explicit states (`default`, `saving`, `success`, `error-retry`, `milestone`) and keyboard-first focus behavior.
UX-DR4: Implement `RecoveryQueuePanel` that prioritizes interrupted habits and supports top-3 plus progressive disclosure.
UX-DR5: Implement `SaveStateBanner` with deterministic persistence messaging (`Saving…`, `Saved`, `Retry`) and ARIA live announcements.
UX-DR6: Implement `ContinuityStatusPill` with text + icon semantics so status is never color-only.
UX-DR7: Implement `MilestoneCelebrationLayer` as milestone-only, subtle by default, reduced-motion compliant, and non-blocking.
UX-DR8: Enforce supportive, non-judgmental microcopy and banned-term filtering in recovery-critical UI.
UX-DR9: Keep primary recovery flow in a single screen with no dead-end states and always a valid next action.
UX-DR10: Preserve user input on failures and provide one-click retry in all core logging/recovery flows.
UX-DR11: Guarantee explicit post-action confirmation with updated continuity state and next-best-action guidance.
UX-DR12: Maintain desktop-first information clarity while keeping functional responsive support for tablet/mobile widths.
UX-DR13: Use stable card-first layout placement to reinforce muscle memory across states.
UX-DR14: Ensure keyboard operability and visible focus for primary actions in all critical journeys.
UX-DR15: Meet WCAG 2.1 AA contrast and semantic labeling baselines in core flows.
UX-DR16: Validate responsive behavior at mobile/tablet/desktop breakpoints without changing core action order.
UX-DR17: Add reusable empty/loading/error state patterns that preserve momentum and suggest immediate next actions.
UX-DR18: Keep advanced analytics/settings behind progressive disclosure so they never compete with recovery actions.

### FR Coverage Map

FR1: Epic 1 - Habit Setup & Continuity Foundations
FR2: Epic 1 - Habit Setup & Continuity Foundations
FR3: Epic 1 - Habit Setup & Continuity Foundations
FR4: Epic 1 - Habit Setup & Continuity Foundations
FR5: Epic 1 - Habit Setup & Continuity Foundations
FR6: Epic 2 - Daily Logging & Comeback Actions
FR7: Epic 2 - Daily Logging & Comeback Actions
FR8: Epic 2 - Daily Logging & Comeback Actions
FR9: Epic 2 - Daily Logging & Comeback Actions
FR10: Epic 2 - Daily Logging & Comeback Actions
FR11: Epic 2 - Daily Logging & Comeback Actions
FR12: Epic 2 - Daily Logging & Comeback Actions
FR13: Epic 2 - Daily Logging & Comeback Actions
FR14: Epic 2 - Daily Logging & Comeback Actions
FR15: Epic 2 - Daily Logging & Comeback Actions
FR16: Epic 2 - Daily Logging & Comeback Actions
FR17: Epic 2 - Daily Logging & Comeback Actions
FR18: Epic 2 - Daily Logging & Comeback Actions
FR19: Epic 3 - Recovery-First Queue & Reflection Guidance
FR20: Epic 3 - Recovery-First Queue & Reflection Guidance
FR21: Epic 3 - Recovery-First Queue & Reflection Guidance
FR22: Epic 3 - Recovery-First Queue & Reflection Guidance
FR23: Epic 3 - Recovery-First Queue & Reflection Guidance
FR24: Epic 3 - Recovery-First Queue & Reflection Guidance
FR25: Epic 1 - Habit Setup & Continuity Foundations
FR26: Epic 1 - Habit Setup & Continuity Foundations
FR27: Epic 4 - Weekly Insights & Validation Analytics
FR28: Epic 4 - Weekly Insights & Validation Analytics
FR29: Epic 4 - Weekly Insights & Validation Analytics
FR30: Epic 4 - Weekly Insights & Validation Analytics
FR31: Epic 4 - Weekly Insights & Validation Analytics
FR32: Epic 4 - Weekly Insights & Validation Analytics
FR33: Epic 6 - Adaptive Recommendations With User Control
FR34: Epic 6 - Adaptive Recommendations With User Control
FR35: Epic 6 - Adaptive Recommendations With User Control
FR36: Epic 6 - Adaptive Recommendations With User Control
FR37: Epic 5 - UX Accessibility & Responsive Quality
FR38: Epic 5 - UX Accessibility & Responsive Quality
FR39: Epic 5 - UX Accessibility & Responsive Quality
FR40: Epic 5 - UX Accessibility & Responsive Quality

## Epic List


- Epic 1: Habit Setup & Continuity Foundations  
  Users can create and maintain recovery-ready habits with tiered definitions, flexible cadence, and non-judgmental status language that forms the foundation for all daily use.  
  FRs covered: FR1, FR2, FR3, FR4, FR5, FR25, FR26


- Epic 2: Daily Logging & Comeback Actions  
  Users can log outcomes, handle interruptions, and execute immediate or planned comebacks from a single primary daily view without dead-end states.  
  FRs covered: FR6, FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18


- Epic 3: Recovery-First Queue & Reflection Guidance  
  Users receive prioritized, next-best-action guidance with optional one-tap reflection context while preserving low-friction logging.  
  FRs covered: FR19, FR20, FR21, FR22, FR23, FR24


- Epic 4: Weekly Insights & Validation Analytics  
  Users and maintainers can inspect recovery behavior with reliable event instrumentation, tier distribution, and cohort-analysis-ready exports.  
  FRs covered: FR27, FR28, FR29, FR30, FR31, FR32


- Epic 5: UX Accessibility & Responsive Quality  
  Users experience a calm, trustworthy, and accessible interface across supported devices/browsers with explicit save confidence and resilient interaction states.  
  FRs covered: FR37, FR38, FR39, FR40


- Epic 6: Adaptive Recommendations With User Control  
  Users can receive adaptive suggestions while retaining explicit consent, preview control, and reversibility for every recommendation.  
  FRs covered: FR33, FR34, FR35, FR36

## Epic 1: Habit Setup & Continuity Foundations

Deliver a strong recovery-ready habit foundation where users configure meaningful completion tiers, preserve history, and interact with supportive language from day one.

### Story 1.1: Create Habit With Tiered Completion Definition

Agent Prompt Starter: Implement Story 1.1 in `backend/src/apps/habits`, `frontend/src/features/tiered-completion`, and related tests only; create the minimum API/UI/model changes for tiered habit creation and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want to create a habit with full, reduced, and minimum definitions,
So that I can preserve continuity even on low-capacity days.

**Acceptance Criteria:**

**Given** I open add-habit flow
**When** I provide name, cadence, time window, and full/reduced/minimum values
**Then** the habit is created and available in my daily queue
**And** each tier is stored as distinct actionable targets.

### Story 1.2: Edit Habit Configuration Safely

Agent Prompt Starter: Implement Story 1.2 in `backend/src/apps/habits`, `frontend/src/features/tiered-completion`, and related tests only; limit scope to safe habit edit flows and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want to edit cadence, tier values, and preferred windows,
So that my habit remains realistic as my schedule changes.

**Acceptance Criteria:**

**Given** an existing active habit
**When** I update tier values, cadence, or time window
**Then** new settings apply to future recommendations
**And** historical records remain unchanged and visible.

### Story 1.3: Pause and Reactivate Habits Without Data Loss

Agent Prompt Starter: Implement Story 1.3 in `backend/src/apps/habits`, `frontend/src/features/tiered-completion` or habit management UI, and related tests only; add pause/resume without deleting history and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want to pause and resume habits,
So that temporary breaks do not delete continuity history.

**Acceptance Criteria:**

**Given** an active habit with history
**When** I pause the habit
**Then** it is excluded from active daily prompts
**And** all prior events remain queryable and intact.

### Story 1.4: Configure Default Fallback Action

Agent Prompt Starter: Implement Story 1.4 in `backend/src/apps/habits`, `frontend/src/features/tiered-completion`, and related tests only; add default fallback action configuration and prefill support, then validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want a default fallback action per habit,
So that comeback decisions are fast in interruption moments.

**Acceptance Criteria:**

**Given** a habit setup/edit screen
**When** I select a default fallback action
**Then** the fallback is prefilled in comeback contexts
**And** I can update it later without data migration issues.

### Story 1.5: Enforce Neutral Status Language Policy

Agent Prompt Starter: Implement Story 1.5 in `backend/src/common/language_policy`, relevant frontend status-rendering surfaces, and related tests only; enforce banned terms and approved labels, then validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want status labels to be supportive and non-judgmental,
So that interruptions feel recoverable instead of punitive.

**Acceptance Criteria:**

**Given** any core recovery or logging state
**When** status text is rendered
**Then** prohibited punitive terms are blocked by policy checks
**And** displayed labels use approved neutral language vocabulary.

## Epic 2: Daily Logging & Comeback Actions

Provide the core interruption-to-recovery loop in one primary view so users can restart immediately or plan a comeback and maintain continuity.

### Story 2.1: Single-Screen Daily Logging Surface

Agent Prompt Starter: Implement Story 2.1 in `backend/src/apps/logging`, `frontend/src/features/daily-queue`, shared API wiring, and related tests only; build the minimal single-screen daily logging surface and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want one primary daily view for logging full/reduced/minimum/interrupted states,
So that I can complete daily actions in seconds.

**Acceptance Criteria:**

**Given** I open today’s dashboard
**When** I log any daily outcome
**Then** the action is completed without page navigation
**And** visible state feedback appears within expected response time targets.

### Story 2.2: Log Tiered Completion Outcomes

Agent Prompt Starter: Implement Story 2.2 in `backend/src/apps/logging`, `frontend/src/features/daily-queue`, and related tests only; support full/reduced/minimum logging with continuity-safe persistence and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want to log full, reduced, or minimum completion,
So that my progress reflects real-world effort.

**Acceptance Criteria:**

**Given** an active habit in daily view
**When** I choose full/reduced/minimum completion
**Then** the selected tier is persisted with timestamp
**And** continuity logic treats all valid tiers as legitimate completion.

### Story 2.3: Trigger Immediate Comeback Card on Interruption

Agent Prompt Starter: Implement Story 2.3 in `backend/src/apps/recovery`, `backend/src/common/instrumentation`, `frontend/src/features/comeback-card`, and related tests only; trigger comeback card display on interruption and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want an interruption to immediately reveal comeback options,
So that I never end in a dead-end state.

**Acceptance Criteria:**

**Given** I mark a habit interrupted
**When** interruption is saved
**Then** a comeback card appears immediately with two clear paths
**And** the system records comeback-card exposure metadata.

### Story 2.4: Offer Restart-Now and Plan-Later Paths

Agent Prompt Starter: Implement Story 2.4 in `backend/src/apps/recovery`, `frontend/src/features/comeback-card`, and related tests only; support restart-now and plan-later actions from the comeback card and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want to choose immediate minimum completion or a planned comeback,
So that I can recover according to current capacity.

**Acceptance Criteria:**

**Given** a displayed comeback card
**When** I select restart-now
**Then** minimum completion is logged and continuity is updated
**And** I receive explicit confirmation with next best action.

### Story 2.5: Plan and Complete Scheduled Comebacks

Agent Prompt Starter: Implement Story 2.5 in `backend/src/apps/recovery`, `backend/src/common/time`, `frontend/src/features/comeback-card`, and related tests only; add planned comeback creation with timezone-safe scheduling and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want to schedule a planned comeback,
So that interrupted habits re-enter my routine in a predictable time window.

**Acceptance Criteria:**

**Given** I select planned comeback
**When** I choose a future window and save
**Then** a planned comeback event is created with timezone-safe timestamp
And the planned comeback appears in the next relevant queue context.

### Story 2.6: Complete a Previously Planned Comeback

Agent Prompt Starter: Implement Story 2.6 in `backend/src/apps/recovery`, `backend/src/common/instrumentation`, `frontend/src/features/daily-queue` or `comeback-card`, and related tests only; complete planned comeback execution and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want to complete a planned comeback when its window arrives,
So that recovery progress is accurately reflected.

**Acceptance Criteria:**

Given a habit has a saved planned comeback
When I complete the planned comeback action
Then completion metadata is linked to the original plan
And continuity and queue state update immediately.

### Story 2.7: Recover From Multi-Day Gaps With History Preservation

Agent Prompt Starter: Implement Story 2.7 in `backend/src/apps/recovery`, `backend/src/apps/habits`, affected frontend recovery surfaces, and related tests only; support multi-day restart without history loss and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a returning user,
I want to restart habits after multi-day inactivity without data reset,
So that long interruptions do not erase my behavior history.

**Acceptance Criteria:**

**Given** I have inactive days across one or more habits
**When** I return and restart from current day
**Then** active habits become recoverable immediately
**And** historical interruption and completion records remain preserved.

## Epic 3: Recovery-First Queue & Reflection Guidance

Create a prioritized daily queue that answers “what should I do next?” while keeping reflection optional and low-friction.

### Story 3.1: Prioritized Recovery Queue Generation

Agent Prompt Starter: Implement Story 3.1 in `backend/src/apps/recovery/services.py`, `frontend/src/features/daily-queue`, and related tests only; add prioritized queue generation with next-best-action output and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want my daily habits prioritized by recovery value,
So that I can act on the most meaningful next step first.

**Acceptance Criteria:**

**Given** multiple active habits with mixed states
**When** the daily queue loads
**Then** interrupted and at-risk habits are prioritized with low-effort wins included
**And** each row displays a clear next recommended action.

### Story 3.2: Queue Reprioritization After Actions

Agent Prompt Starter: Implement Story 3.2 in `backend/src/apps/recovery`, `frontend/src/features/daily-queue`, client state/query wiring, and related tests only; refresh queue state after actions without full reload and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want the queue to update immediately after logging,
So that guidance remains current without reload.

**Acceptance Criteria:**

**Given** I complete any logging or comeback action
**When** the action is confirmed
**Then** queue order updates without full page reload
**And** updated recommendations are visible in the same session.

### Story 3.3: Optional One-Tap Reflection Chips

Agent Prompt Starter: Implement Story 3.3 in `backend/src/apps/logging` or `recovery`, `frontend/src/features/reflection-chips`, and related tests only; add optional one-tap reflection tags without blocking the main flow and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want to add quick reflection context only when helpful,
So that insight quality improves without slowing core flow.

**Acceptance Criteria:**

**Given** an interruption or recovery event
**When** I tap an optional reflection chip
**Then** the selected tag is stored with event metadata
**And** skipping reflection never blocks completion.

### Story 3.4: Save-State Confidence and Retry Flow

Agent Prompt Starter: Implement Story 3.4 in `frontend/src/shared/ui`, affected daily/recovery features, and related tests only; add explicit saving/saved/retry UX backed by existing APIs and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want explicit saving/saved/retry states,
So that I trust that my progress is not lost.

**Acceptance Criteria:**

**Given** I submit a core action
**When** persistence is in progress or fails
**Then** I see deterministic `Saving…` then `Saved` or `Retry` feedback
**And** retry preserves prior input and restores forward momentum.

## Epic 4: Weekly Insights & Validation Analytics

Support cohort validation with reliable event capture, tier-level reporting, and exportable recovery metrics.

### Story 4.1: Event Schema and Instrumentation Pipeline

Agent Prompt Starter: Implement Story 4.1 in `backend/src/common/instrumentation`, `backend/src/common/time`, and backend tests only; define the stable event schema and emission helpers needed by recovery flows, then validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a maintainer,
I want a stable, versioned event schema for recovery interactions,
So that analysis remains comparable across MVP iterations.

**Acceptance Criteria:**

**Given** core logging and recovery flows
**When** events are emitted
**Then** required event types and metadata are captured with schema version
**And** timezone-safe timestamps are written consistently.

### Story 4.2: Track Interruption and Comeback Decision Events

Agent Prompt Starter: Implement Story 4.2 in `backend/src/apps/recovery`, `backend/src/common/instrumentation`, and backend tests only; capture interruption and comeback decision events with queryable metadata, then validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a maintainer,
I want interruption and comeback-path metadata captured,
So that I can measure recovery latency and behavior choices.

**Acceptance Criteria:**

**Given** users log interruptions and comeback actions
**When** events are stored
**Then** interruption reason/context and comeback-path selections are recorded
**And** `habit_interrupted`, `comeback_card_shown`, and planned-comeback events are queryable.

### Story 4.3: Weekly Recovery Summary for Users

Agent Prompt Starter: Implement Story 4.3 in `backend/src/apps/insights`, `frontend/src/features/weekly-summary`, and related tests only; add the minimal weekly recovery summary view and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want a weekly summary of recovery patterns and tier usage,
So that I can understand rebound quality without perfection framing.

**Acceptance Criteria:**

**Given** at least one week of events
**When** I open weekly summary
**Then** I see interruption/comeback patterns and tier distribution
**And** the view loads within performance target bounds.

### Story 4.4: Exportable Cohort Analysis Dataset

Agent Prompt Starter: Implement Story 4.4 in `backend/src/apps/insights`, export endpoints/services, and backend tests only; add machine-readable cohort export with proper access checks and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a maintainer,
I want machine-readable event exports,
So that baseline vs treatment cohort analysis is reproducible.

**Acceptance Criteria:**

**Given** authorized maintainer access
**When** I request an export for a date range
**Then** I receive schema-stable machine-readable output
**And** data access rules remain scoped to owner or explicit maintainer analytics access.

## Epic 5: UX Accessibility & Responsive Quality

Implement the UX specification’s recovery-first interaction quality so flows remain clear, accessible, and trustworthy across supported environments.

### Story 5.1: Implement Calm Recovery Theme Tokens

Agent Prompt Starter: Implement Story 5.1 in `frontend/src/shared/ui`, `frontend/src/styles`, and related tests only; define calm recovery theme tokens and wire them into core recovery surfaces, then validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want a calm and consistent interface,
So that recovery tasks feel safe and easy to complete.

**Acceptance Criteria:**

**Given** core recovery screens
**When** theme tokens are applied
**Then** colors, typography, and spacing follow documented recovery-first semantics
**And** status meaning is never conveyed by color alone.

### Story 5.2: Build RecoveryCard and RecoveryQueuePanel Components

Agent Prompt Starter: Implement Story 5.2 in `frontend/src/features/comeback-card`, `frontend/src/shared/ui`, and related tests only; build the `RecoveryCard` component with defined states and keyboard semantics, then validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want a purpose-built recovery card component,
So that comeback actions are clear and fast in high-risk moments.

**Acceptance Criteria:**

Given interruption context exists
When the recovery card renders
**Then** states (`default`, `saving`, `success`, `error-retry`, `milestone`) are supported
And primary and secondary actions are keyboard-focusable and semantically labeled.

### Story 5.3: Build RecoveryQueuePanel Prioritization Component

Agent Prompt Starter: Implement Story 5.3 in `frontend/src/features/daily-queue`, `frontend/src/shared/ui`, and related tests only; build the prioritized `RecoveryQueuePanel` UI with top-3 and show-more behavior, then validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want a dedicated prioritized queue panel,
So that I can see the next best recovery actions quickly.

**Acceptance Criteria:**

Given multiple habits with mixed interruption risk
When the queue panel renders
Then top-3 prioritized actions are visible first
And progressive disclosure reveals additional actions without changing primary action order.

### Story 5.4: Add SaveStateBanner and ContinuityStatusPill

Agent Prompt Starter: Implement Story 5.4 in `frontend/src/shared/ui`, affected recovery/logging features, and related tests only; add `SaveStateBanner` and `ContinuityStatusPill` components with text-plus-icon semantics, then validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want explicit save and continuity indicators,
So that I trust the system state after every action.

**Acceptance Criteria:**

Given a core recovery or logging action is submitted
When persistence transitions across pending, success, or failure
Then `Saving…`, `Saved`, and `Retry` states are presented clearly
And status meaning is conveyed by text plus icon semantics (not color-only).

### Story 5.5: Accessibility Baseline for Core Flows

Agent Prompt Starter: Implement Story 5.5 in `frontend/src/shared/ui`, core feature modules, and `frontend/test/integration` only; close keyboard, focus, ARIA, and contrast gaps in core flows, then validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a keyboard and assistive-tech user,
I want complete operability and clear semantic announcements,
So that recovery workflows are usable without a mouse or color cues.

**Acceptance Criteria:**

**Given** all critical logging and recovery interactions
**When** tested with keyboard and screen reader checks
**Then** focus order, visible focus, and ARIA live announcements pass baseline criteria
**And** contrast/semantic labeling meets WCAG 2.1 AA requirements.

### Story 5.6: Responsive and Browser Compatibility Hardening

Agent Prompt Starter: Implement Story 5.6 in `frontend/src/features/*`, `frontend/src/shared/ui`, and responsive/integration tests only; harden supported breakpoints and evergreen browser behavior without changing core interaction order, then validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user on different devices,
I want reliable behavior on supported browsers and widths,
So that I can recover habits consistently wherever I log.

**Acceptance Criteria:**

**Given** mobile, tablet, and desktop breakpoints on evergreen browsers
**When** core journeys are exercised
**Then** interaction order remains consistent and functional
**And** layout changes preserve primary-action prominence and performance targets.

## Epic 6: Adaptive Recommendations With User Control

Deliver adaptive suggestions safely through explicit preview, opt-in application, and reversible changes.

### Story 6.1: Generate Adaptive Recommendation Candidates

Agent Prompt Starter: Implement Story 6.1 in `backend/src/apps/recovery` or recommendation services, `backend/src/apps/insights` if needed, and backend tests only; generate recommendation candidates with rationale but no auto-apply behavior, then validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want data-informed suggestions,
So that my habit plan evolves with my recent behavior.

**Acceptance Criteria:**

**Given** sufficient recent interaction history
**When** recommendation logic runs
**Then** candidate suggestions are generated with explainable rationale
**And** no recommendation is auto-applied.

### Story 6.2: Preview Recommendations Before Apply

Agent Prompt Starter: Implement Story 6.2 in `frontend/src/features/weekly-summary` or recommendation UI, supporting API wiring, and related tests only; build preview-before-apply UX for recommendations and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want to preview recommendation impact,
So that I understand changes before committing.

**Acceptance Criteria:**

**Given** available recommendation candidates
**When** I open preview
**Then** current vs proposed settings are shown clearly
**And** each suggestion has independent accept/reject controls.

### Story 6.3: Accept or Reject Recommendations Individually

Agent Prompt Starter: Implement Story 6.3 in `backend/src/apps/recovery`, recommendation decision endpoints, relevant frontend UI, and related tests only; support per-item accept/reject decisions with event capture and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want granular acceptance decisions,
So that I keep control over my plan.

**Acceptance Criteria:**

**Given** one or more proposed changes
**When** I accept or reject an item
**Then** only that item’s decision is applied
**And** an event record captures decision, timestamp, and resulting state.

### Story 6.4: Reverse Applied Recommendations

Agent Prompt Starter: Implement Story 6.4 in `backend/src/apps/recovery`, relevant recommendation UI, and related tests only; add reversal of applied recommendations with audit history and validate with `pixi run test && pixi run lint && pixi run typecheck`.

As a user,
I want to undo applied recommendations,
So that experimentation remains safe and reversible.

**Acceptance Criteria:**

**Given** a previously applied adaptive change
**When** I select reverse action
**Then** prior configuration is restored
**And** reversal is recorded for audit and future recommendation quality.
