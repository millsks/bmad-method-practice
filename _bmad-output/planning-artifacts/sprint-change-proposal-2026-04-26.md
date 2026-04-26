---
date: 2026-04-26
workflow: bmad-correct-course
project: bmad-method-practice
change_trigger: implementation readiness gaps discovered before implementation
mode: incremental
status: draft-for-review
inputs:
  - _bmad-output/planning-artifacts/implementation-readiness-report-2026-04-26.md
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/epics.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
---

# Sprint Change Proposal

## 1. Issue Summary

### Problem Statement

The project is close to implementation-ready, but the current planning set contains a sequencing defect, a missing greenfield bootstrap story, and document alignment gaps that will create avoidable blockers during implementation.

### Trigger Context

The issue was discovered during the implementation readiness assessment before coding started. The highest-impact finding is that Epic 2 recovery stories require instrumentation capabilities before the current epic plan introduces the instrumentation schema.

### Evidence

- `Story 2.3`, `Story 2.5`, and `Story 2.6` require event metadata and timezone-safe persistence before `Story 4.1` currently introduces the stable event schema.
- The epic plan begins with feature stories even though the architecture assumes a greenfield `habitflow-web/` scaffold with Pixi-first execution and explicit backend/frontend boundaries.
- The PRD and UX both use the phrase “under 30 seconds,” while the PRD also sets the stricter core-action benchmark of under 10 seconds.
- The UX commits to MUI, theme tokens, and named recovery components, but the architecture does not yet formalize those constraints.
- Epic 6 is presented in the main implementation set even though the PRD positions adaptive recommendations as post-MVP growth work.

## 2. Impact Analysis

### Epic Impact

- **Epic 1** needs two new foundation stories:
  - greenfield bootstrap/setup
  - minimum viable instrumentation primitives
- **Epic 2** can remain functionally intact once the instrumentation dependency is moved earlier.
- **Epic 4** should shift from introducing the first instrumentation primitives to extending and validating the analytics pipeline.
- **Epic 5** needs tighter user-outcome framing and stronger failure/accessibility acceptance criteria.
- **Epic 6** should be explicitly marked post-MVP gated.

### Story Impact

- Affected now: `Story 2.3`, `Story 2.5`, `Story 2.6`, `Story 4.1`, `Story 5.2`, `Story 5.3`, `Story 5.4`.
- New stories proposed: `Story 1.0` and `Story 1.6`.
- No completed implementation work needs rollback because the change is pre-implementation.

### Artifact Conflicts

- **PRD:** wording needs clarification so the 10-second core action target and 30-second full restart-session promise are both explicit and non-conflicting.
- **Epics:** sequencing, bootstrap readiness, story quality, and Epic 6 gating need updates.
- **Architecture:** add a frontend design-system decision covering MUI, token ownership, and recovery component boundaries.
- **UX:** align platform-support wording and timing benchmarks with PRD intent.

### Technical Impact

- Requires backlog reorganization before implementation starts.
- Does not require technology-stack reversal.
- Preserves the Pixi-first execution model and strengthens it by making bootstrap explicit.
- Reduces risk of blocked vertical slices in early development.

## 3. Recommended Approach

### Chosen Path

Direct Adjustment with a limited MVP boundary clarification.

### Why This Path

- The issues are structural but contained within planning artifacts.
- No implementation rollback is required.
- The MVP remains achievable once sequencing and wording are corrected.
- The fix preserves momentum while reducing early delivery risk.

### Option Review

- **Option 1 — Direct Adjustment:** **Viable**. Medium effort, low-to-medium risk. Best fit.
- **Option 2 — Potential Rollback:** **Not viable / not needed**. No completed implementation exists to roll back.
- **Option 3 — PRD MVP Review:** **Partially viable** only as a scope-gating clarification for Epic 6, not as a major MVP reduction.

### Effort, Risk, and Timeline Impact

- **Effort:** Medium
- **Risk:** Low to Medium
- **Timeline Impact:** Small planning delay now, lower implementation risk later

## 4. Detailed Change Proposals

### A. Story and Epic Changes

#### Proposal A1 — Add bootstrap story before feature work

**Artifact:** Epics document, Epic 1

Old state:
Epic 1 begins directly with `Story 1.1: Create Habit With Tiered Completion Definition`.

New state:
Insert a new story before `Story 1.1`.

`Story 1.0: Bootstrap HabitFlow Workspace and Pixi Feature Environments`

As a developer,
I want the `habitflow-web/` workspace scaffolded with Pixi-managed environments, backend/frontend boundaries, and baseline validation tasks,
So that feature stories can be implemented on a stable, reproducible foundation.

**Acceptance Criteria:**

- **Given** a clean implementation root under `habitflow-web/`
- **When** the bootstrap story is completed
- **Then** `backend/src`, `backend/test`, `frontend/src`, and `frontend/test` exist with baseline project skeletons aligned to architecture constraints
- **And** Pixi tasks and/or Pixi environment features exist for backend, frontend, and full-stack validation flows
- **And** the initial validation path for changed areas is documented and executable through Pixi-managed commands only

Rationale:
The project is greenfield and the architecture already assumes a strict implementation scaffold. Making this explicit avoids every later story spending time on hidden setup work.

#### Proposal A2 — Move minimum viable instrumentation earlier

**Artifact:** Epics document, Epic 1 and Epic 4

Old state:
`Story 4.1` introduces the stable event schema and emission helpers after `Story 2.3`, `Story 2.5`, and `Story 2.6` already depend on instrumentation behavior.

New state:
Insert a new Epic 1 foundation story.

`Story 1.6: Establish Instrumentation Primitives Before Recovery Flows`

As a developer,
I want a minimum viable recovery-event schema and emission helpers available before recovery stories begin,
So that early recovery slices can satisfy their own acceptance criteria without forward dependencies.

**Acceptance Criteria:**

- **Given** the baseline backend scaffold exists
- **When** instrumentation primitives are implemented
- **Then** the minimum schema version, event names, and metadata contract for interruption and comeback flows are defined
- **And** timezone-safe timestamps are written consistently at the shared event boundary
- **And** Epic 2 stories can emit required recovery events without depending on future analytics work

Rewrite `Story 4.1` to focus on extending, stabilizing, and validating the analytics/event pipeline rather than introducing the first usable primitives.

Rationale:
This removes the most important execution blocker in the current plan.

#### Proposal A3 — Tighten Epic 5 story framing and acceptance criteria

**Artifact:** Epics document, Epic 5

Old state:
`Story 5.2`, `Story 5.3`, and `Story 5.4` are framed primarily as component-delivery tasks and under-specify failure handling and accessibility outcomes.

New state:
Rewrite these stories so the user outcome leads and component names become implementation details.

Add explicit checks for:

- failure and retry behavior
- persistence feedback
- keyboard focus and ARIA/live-region behavior
- status semantics beyond color-only UI

Rationale:
This keeps Epic 5 tied to user value and reduces the risk of shipping isolated components without validating the intended recovery experience.

#### Proposal A4 — Mark Epic 6 as post-MVP gated

**Artifact:** Epics document

Old state:
Epic 6 appears in the main implementation plan without a hard execution gate.

New state:
Mark Epic 6 as **Post-MVP Gated** and exclude it from MVP implementation-readiness sign-off. Keep the epic in the roadmap, but make the gate explicit in the overview and execution order.

Rationale:
This aligns the epics with the PRD’s phased scope and protects MVP focus.

### B. PRD Changes

#### Proposal B1 — Clarify the two time benchmarks

**Artifact:** PRD

Old state:
The PRD uses both:

- a primary promise of “restart in under 30 seconds”
- and a stricter NFR/UX target of under 10 seconds for core daily actions

New state:
Clarify the distinction:

- **Core daily action benchmark:** open app → log outcome in under 10 seconds median
- **Full interruption-to-recovery benchmark:** successful restart session completed in under 30 seconds

Suggested replacement wording for the primary promise:

**OLD:** “If you miss a day, HabitFlow helps you restart in under 30 seconds.”

**NEW:** “If you miss a day, HabitFlow helps you log a recovery action in under 10 seconds median and complete a successful restart session in under 30 seconds.”

Rationale:
This preserves the recovery-first message while making the measurable benchmarks unambiguous.

### C. UX Changes

#### Proposal C1 — Align platform-support and timing language

**Artifact:** UX Design Specification

Old state:

- v1 is described as desktop-first with mobile web optimization deferred.
- Multiple sections anchor the defining interaction to “under 30 seconds” without distinguishing the faster core-action target.

New state:
Update UX wording to state:

- v1 is **desktop-first in presentation and optimization**
- MVP still requires **functional support across mobile-width, tablet-width, and desktop-width layouts**
- the **core action path** targets under 10 seconds median
- the **full restart flow** targets under 30 seconds for successful sessions

Rationale:
This removes ambiguity without requiring a broader MVP.

### D. Architecture Changes

#### Proposal D1 — Add frontend design-system ownership decision

**Artifact:** Architecture

Old state:
The architecture captures Pixi-first setup and feature boundaries, but does not formally record the MUI design system, token ownership, or recovery component ownership.

New state:
Add a new architecture decision, for example:

`ADR-005: Frontend Design System and Recovery UI Ownership`

- MUI is the required frontend component foundation for MVP
- theme tokens are owned in `frontend/src/styles`
- shared recovery UI primitives are owned in `frontend/src/shared/ui`
- named recovery components (`RecoveryCard`, `RecoveryQueuePanel`, `SaveStateBanner`, `ContinuityStatusPill`) are architecture-level boundaries, not ad-hoc implementation details

Rationale:
This keeps design, architecture, and implementation aligned.

## 5. Implementation Handoff

### Scope Classification

Moderate

### Handoff Recipients

- **Product Owner / Planning role:** update PRD wording, epic sequencing, story quality, and Epic 6 gating
- **Developer role:** implement approved document edits and preserve Pixi-only execution assumptions
- **Architecture role:** add the frontend design-system ADR and confirm ownership boundaries
- **UX role:** update timing and responsive-support wording to match the approved benchmark split

### Success Criteria for Handoff

- No Epic 2 story depends on a future epic to satisfy its own acceptance criteria
- The greenfield scaffold is explicitly planned before feature implementation
- PRD, UX, and Architecture use consistent timing and platform-support language
- Epic 6 is clearly outside MVP implementation-readiness scope
- Epic 5 stories validate user outcomes, not just component construction

## High-Level Action Plan

1. Update the epics document with `Story 1.0`, `Story 1.6`, revised `Story 4.1`, revised Epic 5 story framing, and explicit Epic 6 gating.
2. Update the PRD to distinguish 10-second core actions from 30-second full restart sessions.
3. Update the UX specification to state desktop-first optimization with required functional support across supported widths.
4. Update the architecture document with an MUI/theme-token/shared-component ADR.
5. If sprint tracking is formalized later, reflect the approved story additions and epic gate in sprint-status tracking artifacts.

## Recommended Next Step

Approve this proposal, then apply the document edits in one planning-only change set before starting implementation in `habitflow-web/`.
