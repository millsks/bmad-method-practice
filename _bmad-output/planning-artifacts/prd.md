---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-bmad-method-practice.md
  - _bmad-output/planning-artifacts/product-brief-bmad-method-practice-distillate.md
  - _bmad-output/brainstorming/brainstorming-session-2026-04-26-115639.md
workflowType: 'prd'
briefCount: 2
researchCount: 0
brainstormingCount: 1
projectDocsCount: 0
classification:
  projectType: web_app
  domain: general (consumer lifestyle/wellness)
  complexity: low
  projectContext: greenfield
releaseMode: phased
---

# Product Requirements Document - bmad-method-practice

**Author:** Kevin
**Date:** 2026-04-26

## Executive Summary

HabitFlow is an open-source, recovery-first web habit tracker. Its core premise is that habit abandonment is not caused by an inability to start — it is caused by the absence of a recovery pathway after the first interruption. Most trackers convert a missed day into a psychological stop state through punitive language, broken streak visuals, and no actionable next step. HabitFlow eliminates that failure mode by treating every interruption as a managed, expected event with an immediate comeback workflow.

The primary user promise: **if you miss a day, HabitFlow helps you log a recovery action in under 10 seconds median and complete a successful restart session in under 30 seconds.**

v1 targets the maintainer (Kevin) and a small cohort of 3–8 friends as a structured validation study, not a market launch. Success is defined as measurable improvement in recovery-within-24-hours rate and post-interruption 7-day continuity relative to a baseline period — not growth, acquisition, or monetization.

The product is intentionally scoped as a thin, high-leverage recovery loop: detect interruption → surface comeback card → preserve continuity via tiered completion → update recovery-first queue → reflect behavioral resilience in summary metrics.

### What Makes This Special

Competitors optimize streak visibility and perfection signaling. HabitFlow's wedge is the **post-miss workflow** — a first-class feature set that no current tracker provides. Three mechanics form the core differentiator:

1. **Instant Comeback Card** — immediately after any missed habit, the user receives two options: minimum completion now, or a planned next attempt with a suggested time window. No dead-end miss state is permitted.
2. **Tiered Completion Model** — each habit has full, reduced, and minimum viable completion tiers, predefined at setup. Minimum completion preserves continuity and is treated as a first-class success state, not an exception.
3. **Recovery-First Daily Queue** — the home view reorders habits by relapse risk and confidence-gain potential, not static order. It answers "what should I do next?" rather than displaying a passive list.

Supporting the mechanics is a **Neutral Status Language System** — a system-wide vocabulary constraint that bans moralized terms ("failed," "broken") in favor of descriptive state labels ("interrupted," "paused"). Language is treated as a direct retention lever.

Eight reverse-derived design principles govern all feature decisions:

1. Every miss transitions into guided recovery — never a dead-end state.
2. Language describes state; it never judges identity.
3. Daily interaction cost must remain near-zero (under 10 seconds for core actions).
4. Recovery events receive equal or greater positive reinforcement than routine completions.
5. Interruptions are coaching inputs, not ignored noise.
6. Flexibility is designed upfront, not treated as exception handling.
7. Insight screens drive action, not passive analysis.
8. Automation must be transparent, reversible, and consent-based.

## Project Classification

| Attribute | Value |
| --- | --- |
| Project Type | Web application (SPA, Django + React) |
| Domain | Consumer lifestyle / wellness |
| Complexity | Low |
| Project Context | Greenfield |
| Scope | Personal OSS; small cohort validation |
| Monetization | Out of scope (v1) |

## Success Criteria

### User Success

- After a missed habit, the user sees a comeback card immediately and can complete a recovery action in a single tap — no dead-end state.
- The primary daily action path (open app → log outcome) is completable in under 10 seconds for complete, miss, and fallback actions.
- Users report the product as "supportive," "non-judgmental," and "easy to restart" in qualitative feedback.
- Users understand tiered completion as *continuity maintained*, not as "cheating" — validated through cohort check-ins.
- No open-ended text input is required for any core daily action.

### Business Success

v1 success is behavioral evidence from the validation cohort, not market metrics:

| Metric | Target |
| --- | --- |
| Recovery-within-24-hours rate | ≥20% improvement from baseline (weeks 1–2) to treatment (weeks 3–6) |
| Post-interruption 7-day continuity | ≥60% across cohort after first interruption event |
| Median daily action time | <10 seconds for complete/miss/fallback |
| Minimum completion tier mix | Full + reduced completions must not collapse to minimum-only patterns over time |

**Validation gate decisions:**

- **Go:** Majority of users improve on recovery and continuity with stable UX speed.
- **Hold:** Mixed quantitative results with strong qualitative support → one iteration on highest-friction points.
- **Stop/Pivot:** No measurable recovery lift after one focused iteration plus negative qualitative sentiment on fallback/recovery UX.

### Technical Success

- All core daily actions render and respond on a single screen — no page navigation required for complete/miss/fallback.
- Recovery-first queue updates after each action without a full page reload.
- Event instrumentation captures all required validation events: `habit_interrupted`, `comeback_card_shown`, `*_completion_logged`, `planned_comeback_created`, `planned_comeback_completed`.
- No autonomous behavior changes are applied without explicit user preview and confirmation.
- Timezone handling and missed-log edge cases are specified and handled consistently.

### Measurable Outcomes

- Cohort: maintainer + 3–8 friends with varied interruption patterns.
- Study duration: 6 weeks (2-week baseline + 4-week recovery-first period).
- Unit of analysis: interruption event and recovery outcome within 24 hours.
- Recovery clock starts at `habit_interrupted` timestamp; valid recovery = any tiered completion or `planned_comeback_completed` within the defined window.

## Product Scope

### MVP — Minimum Viable Product

1. **Instant Comeback Card** — post-miss modal with minimum-completion-now and plan-tomorrow paths.
2. **Tiered Completion Model** — full, reduced, and minimum tiers predefined at habit setup; all tiers preserve continuity.
3. **Recovery-First Daily Queue** — single-screen home view prioritized by relapse risk and easiest wins.
4. **Neutral Status Language System** — system-wide vocabulary: no punitive terms, descriptive state labels only.
5. **Reflection Chips** — optional one-tap context tags on interruption/recovery; no mandatory text input.
6. **Core event instrumentation** — all 5 validation events tracked with timestamps and metadata.
7. **Basic habit setup** — name, minimum viable completion, preferred time window, fallback tier — completable in ~45 seconds.

### Growth Features (Post-MVP)

1. **Contextual Reminder Scheduler** — single smart reminder window per habit with timing adapted to observed completion patterns.
2. **Resilience Score Engine** — composite metric combining completion consistency, recovery latency, and fallback tier quality.
3. **Weekly Recovery Trend Report** — lightweight summary card highlighting comeback speed, interruption patterns, and rebound quality.
4. **Preview-and-Apply Adaptive Goal Calibration** — weekly suggestions for target adjustments based on recent behavior, with user consent and override control.
5. **Coaching Tone Profiles** — selectable support style (gentle, direct, playful) adapting notification and check-in tone.

### Vision (Future)

- Recovery Heatmap Calendar (GitHub-style visualization of interruption/recovery cycles).
- Dynamic Difficulty Coaching (periodization-inspired deload weeks and gradual return plans).
- Streak Freeze Tokens (protected continuity during known disruption windows).
- Skill-Tree Habit Levels (progression paths unlocked by stable repetition and successful recoveries).
- Two-Week Storyline View (narrative arc showing trigger → interruption → recovery loops).
- Self-Tuning Consistency Loop (co-evolved reminder timing and difficulty calibration).

## User Journeys

### Journey 1 — Marcus: The First-Miss Moment (Primary User — Success Path)

Marcus is a software developer who has built a solid morning run habit over three weeks. Tuesday evening, his daughter gets sick and the morning routine disappears. By Wednesday afternoon, his previous habit tracker has already marked him as "streak broken" and he feels the familiar pull to start fresh next month.

He opens HabitFlow instead. The dashboard does not show a broken streak; it shows one habit marked "interrupted" with a comeback card already surfaced. Two choices: "Complete 5-minute walk now" (his predefined minimum) or "Plan tomorrow at 7:00am." He taps the walk option, marks it done in 20 seconds, and the queue updates: continuity maintained. The positive signal — "back on track" — lands at the exact moment he needs it most.

Capabilities revealed: tiered completion persistence, comeback card trigger on miss, continuity scoring, queue state update, neutral copy system.

### Journey 2 — Priya: The Returning User (Primary User — Edge Case: Multi-Day Gap)

Priya has been using HabitFlow for a month, then travels for a conference and goes dark for five days. She expects guilt and friction when reopening the app.

When she opens it, there is no damage report, no shame copy, and no punitive "you missed 5 days" framing. The queue shows her active habits in an "interrupted" state, each with a comeback card. The cards ask: "Log a minimum completion now" or "Start fresh from today." She restarts one habit immediately and resets two to today. Within two minutes she is re-engaged and moving.

Capabilities revealed: multi-day interruption handling, per-habit restart choices, absence detection logic, queue re-entry without punishment framing.

### Journey 3 — Kevin: Setting Up a New Habit (Primary User — Onboarding/Setup Path)

Kevin adds a new habit: "Read for 20 minutes." Setup asks for full, reduced, and minimum versions (20, 10, and 5 minutes) plus a preferred time window. He finishes setup in under 45 seconds.

Over two weeks, he uses minimum completion twice on low-energy evenings and tags both events with reflection chips. The app records this context without judgment. In his weekly summary he sees continuity and rebound metrics rather than perfection messaging.

Capabilities revealed: habit creation with tier configuration, tiered completion logging, reflection chip capture, weekly summary with recovery framing, quick setup target.

### Journey 4 — Kevin as Cohort Reviewer (Maintainer/Ops Path)

As project maintainer running a six-week validation cohort, Kevin needs to evaluate whether recovery-first mechanics improve behavior. He is not a separate admin persona in-product, but he must review event data and compute go/hold/stop outcomes.

He queries the event stream across baseline and treatment windows, measuring interruption-to-recovery timing and continuity after misses. He checks for meaningful improvement and verifies that continuity is not inflated by minimum-only behavior.

Capabilities revealed: complete instrumentation (`habit_interrupted`, `comeback_card_shown`, completion tier events, `planned_comeback_created`, `planned_comeback_completed`), timestamp integrity, timezone consistency, and analyzable event export/query paths.

### Journey Requirements Summary

| Capability Area | Revealed By |
| --- | --- |
| Tiered completion with continuity logic | Journeys 1, 3 |
| Instant comeback card trigger and action paths | Journeys 1, 2 |
| Neutral status language and copy system | Journeys 1, 2 |
| Recovery-first queue ordering and state update | Journeys 1, 2 |
| Multi-day absence handling and per-habit restart | Journey 2 |
| Quick habit setup with fallback tier config | Journey 3 |
| Reflection chip capture linked to interruption events | Journey 3 |
| Weekly recovery summary card | Journey 3 |
| Complete event instrumentation and timezone-safe timestamps | Journey 4 |
| Queryable/exportable event stream for validation study | Journey 4 |

## Innovation & Novel Patterns

### Detected Innovation Areas

- Recovery-first interaction architecture reframes interruption from failure-state to guided recovery-state, with an explicit rule that no miss can end in a dead-end.
- Tiered completion (full/reduced/minimum) treats fallback as first-class continuity rather than degraded failure.
- Success metrics prioritize rebound speed and resilience, not streak purity; recovery events can receive stronger reinforcement than routine completions.
- Neutral status vocabulary functions as a behavior-retention mechanism in core flows, not just product copy.
- Weekly summaries prioritize “what next?” decisions over dashboard density.

### Market Context & Competitive Landscape

- Most incumbents optimize for streak maintenance, binary completion states, and static reminders.
- The largest competitive gap is weak post-miss workflow design.
- HabitFlow’s wedge is a recovery protocol productized into UX primitives: comeback card, tiered completion, and recovery-first queue.
- Positioning: recovery-first, not streak-first, with emotionally safe behavior design.

### Validation Approach

- Treat innovation as a behavioral hypothesis and test it against a baseline in the same cohort.
- Run a 6-week design: 2-week baseline + 4-week recovery-first period.
- Validate against defined thresholds:
  - Recovery within 24 hours improves by ≥20%.
  - Post-interruption 7-day continuity reaches ≥60%.
  - Median daily action path remains <10 seconds.
- Instrument interruption-to-recovery events end-to-end to confirm mechanism-level impact.

### Risk Mitigation

- Risk: continuity inflation via minimum-only logging. Mitigation: track tier distribution and require healthy full/reduced mix.
- Risk: small-cohort novelty effects. Mitigation: treat findings as directional and gate broader pilot before strong external claims.
- Risk: recovery language interpreted as disguised failure framing. Mitigation: enforce banned-term checks and collect sentiment feedback.
- Risk: complexity creep from premature adaptive features. Mitigation: keep adaptive calibration post-MVP and require preview-and-apply consent.

## Web App Specific Requirements

### Project-Type Overview

HabitFlow is a recovery-first web application with a one-screen daily interaction model. The architecture context is React frontend + Django backend, optimized for fast, low-friction logging and interruption recovery workflows.

### Technical Architecture Considerations

- App model: SPA-first experience for rapid in-session state transitions (miss → comeback card → completion → queue update) without page reload.
- Browser support: modern evergreen browsers (Chrome, Safari, Firefox, Edge) with responsive layouts for desktop and mobile web.
- SEO strategy: minimal SEO scope for MVP (utility-led product); prioritize authenticated app performance over search surface.
- Real-time needs: no hard real-time transport requirement in MVP; near-immediate updates can be handled with standard API request/response patterns.
- Accessibility level: WCAG-aligned baseline for core flows (keyboard reachability, semantic status text, contrast-safe states).

### Browser Matrix

- Target support: latest two stable versions of major evergreen browsers.
- Graceful degradation for older browsers with clear unsupported-state messaging.

### Responsive Design

- Primary optimized surfaces: mobile-width and laptop-width usage.
- Daily core actions remain one-screen at common breakpoints.

### Performance Targets

- Core daily action path (open app → log outcome) supports <10 second median completion.
- Queue and status transitions feel immediate after action submission.

### SEO Strategy

- MVP prioritizes product function over indexed content strategy.
- Public marketing/docs pages can be added later without affecting core app UX constraints.

### Accessibility Level

- Core logging and recovery flows are keyboard-operable.
- Status language remains descriptive/non-judgmental and screen-reader friendly.
- Visual states avoid punitive color-only signaling.

### Implementation Considerations

- Keep state modeling centered on interruption and recovery event transitions.
- Ensure timezone-safe timestamps for all validation events and summaries.
- Preserve consent-first controls for adaptive recommendations (preview-and-apply only).

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-solving + validated-learning MVP focused on post-miss recovery behavior.
**Resource Requirements:** 1 full-stack maintainer plus optional part-time design/review support from a small friend cohort.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**

- First-miss recovery journey
- Returning-user multi-day gap recovery journey
- Fast habit setup with fallback tier definition
- Maintainer validation and cohort analysis workflow

**Must-Have Capabilities:**

- Instant Comeback Card
- Tiered Completion Model (full/reduced/minimum)
- Recovery-First Daily Queue
- Neutral Status Language System
- Optional Reflection Chips
- Core event instrumentation for defined recovery metrics
- WCAG-aligned accessibility baseline for core flows
- Evergreen-browser responsive support

### Post-MVP Features

**Phase 2 (Post-MVP):**

- Contextual Reminder Scheduler
- Resilience Score Engine
- Weekly Recovery Trend Report
- Improved cohort analysis UX without heavy dashboards

**Phase 3 (Expansion):**

- Preview-and-Apply Adaptive Goal Calibration
- Coaching Tone Profiles
- Optional advanced visualizations (recovery heatmaps, storyline views)
- Deeper personalization loops with explicit consent and reversibility

### Risk Mitigation Strategy

**Technical Risks:** Recovery-transition state complexity; mitigate using thin vertical slices and strict event contracts.
**Market Risks:** Small-cohort bias and novelty effects; mitigate using baseline-vs-treatment study design and explicit go/hold/stop gates.
**Resource Risks:** Solo-build bandwidth constraints; mitigate with strict phase boundaries and deferred adaptive complexity.

## Functional Requirements

### Habit & Plan Management

- FR1: Users can create a habit with full, reduced, and minimum completion tiers.
- FR2: Users can edit habit definitions, including tier values and preferred completion windows.
- FR3: Users can activate or pause a habit without deleting historical records.
- FR4: Users can set and update a default fallback action for each habit.
- FR5: Users can configure whether a habit is tracked daily or with a flexible cadence.

### Daily Logging & Completion

- FR6: Users can log full completion for a habit.
- FR7: Users can log reduced completion for a habit.
- FR8: Users can log minimum completion for a habit.
- FR9: Users can mark a habit as interrupted for the day.
- FR10: Users can complete daily logging actions from a single primary daily view.
- FR11: Users can record a planned comeback for a future time window.
- FR12: Users can complete a previously planned comeback action.

### Recovery Workflow

- FR13: The system can present an immediate comeback option after an interruption is logged.
- FR14: Users can choose between immediate minimum completion and planned comeback paths after interruption.
- FR15: The system can preserve continuity when a valid completion tier is logged after interruption.
- FR16: Users can recover from multi-day inactivity without losing access to active habits.
- FR17: Users can restart a habit from the current day while preserving historical interruption/completion records.
- FR18: The system can prevent dead-end interruption states by always offering a valid next action.

### Daily Queue & Guidance

- FR19: The system can present a prioritized daily habit queue.
- FR20: The system can reprioritize the daily queue after user actions.
- FR21: The system can include both at-risk habits and low-effort wins in daily prioritization.
- FR22: Users can see their next recommended action for each habit in the daily queue.

### Reflection & Status Language

- FR23: Users can optionally attach a one-tap reflection tag to interruption and recovery events.
- FR24: Users can log successful daily outcomes without providing reflection input.
- FR25: The system can display non-judgmental status labels for completion and interruption states.
- FR26: The system can enforce a prohibited vocabulary policy for punitive status terms in core flows.

### Insights & Validation Analytics

- FR27: Users can view a weekly recovery-oriented summary of interruption and comeback patterns.
- FR28: The system can distinguish and report full, reduced, and minimum completion counts.
- FR29: The system can record interruption events with timestamps and reason metadata.
- FR30: The system can record comeback-card exposure and selected recovery path metadata.
- FR31: The system can record planned comeback creation and completion events.
- FR32: The system can provide analyzable event history for cohort-level recovery and continuity evaluation.

### Adaptation & User Control

- FR33: The system can generate adaptive behavior recommendations based on recent usage patterns.
- FR34: Users can preview adaptive recommendations before applying them.
- FR35: Users can accept or reject each adaptive recommendation.
- FR36: Users can reverse previously applied adaptive recommendations.

### Accessibility & Cross-Platform Use

- FR37: Users can complete core daily actions using keyboard-only interaction.
- FR38: Users can use core daily flows across supported modern web browsers.
- FR39: Users can use core daily flows on both mobile-width and desktop-width layouts.
- FR40: Users can receive equivalent status meaning through text semantics independent of visual color cues.

## Non-Functional Requirements

### Performance

- NFR1: Core daily action flow (open app → log complete/miss/fallback) completes within 10 seconds median user interaction time.
- NFR2: UI state updates after a daily action are reflected to the user within 2 seconds under normal network conditions.
- NFR3: Weekly summary views load within 3 seconds for a typical user account history.

### Security & Privacy

- NFR4: All data in transit is protected using TLS.
- NFR5: User habit and reflection data is encrypted at rest.
- NFR6: Access to user data is restricted to the owning authenticated user, except explicit maintainer-level analytics access for cohort validation.
- NFR7: Reflection and interruption metadata collection is transparent to users, with clear disclosure of what is stored and why.
- NFR8: The system supports user-initiated data export and delete operations for account-associated habit data.

### Accessibility

- NFR9: Core daily logging and recovery flows are fully keyboard-operable.
- NFR10: Core screens satisfy WCAG 2.1 AA contrast and semantic labeling expectations.
- NFR11: Status and progress meaning is conveyed through text semantics, not color alone.

### Reliability

- NFR12: Daily logging actions are durably persisted such that successful submissions are not silently lost.
- NFR13: If a logging action fails, the user receives a clear retry path without losing context.
- NFR14: Event timestamps are stored with timezone-safe semantics for consistent recovery-window calculations.

### Scalability (Right-Sized)

- NFR15: The system supports at least 10x growth from initial cohort usage without functional degradation of core daily flows.
- NFR16: Performance of core daily flows does not degrade by more than 10% under expected growth scenarios.

### Integration (Current Scope)

- NFR17: Event data required for validation metrics is exportable in a machine-readable format for cohort analysis.
- NFR18: Instrumentation event schema remains stable across MVP iterations, with versioned changes when needed.
