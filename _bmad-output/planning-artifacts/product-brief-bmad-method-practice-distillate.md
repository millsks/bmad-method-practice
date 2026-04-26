---
title: "Product Brief Distillate: bmad-method-practice"
type: llm-distillate
source: "product-brief-bmad-method-practice.md"
created: "2026-04-26T16:34:00Z"
purpose: "Token-efficient context for downstream PRD creation"
---

## Core Product Intent

- Product concept: open-source web habit tracker built around recovery-first behavior design; optimize for restart speed after interruption, not perfect streak continuity.
- Core user promise: if a user misses a day, the app should help restart in under 30 seconds.
- Project context: personal/fun OSS project; initial users are maintainer + a few friends; monetization and broad acquisition are explicitly out of current scope.
- Primary behavioral thesis: abandonment is driven more by post-miss shame/friction than by inability to start habits.

## Problem Definition and Insight

- Habit tracker failure mode: first interruption is the highest churn event; many products convert a miss into a psychological stop state.
- Common market pain patterns observed: binary success/fail logging, punitive language/visuals, and no immediate comeback action.
- Strategic insight: design should treat interruptions as expected states that produce actionable recovery prompts.
- Key principle set: recovery over perfection, small wins count, reflection without guilt, fast paths before deep analytics.

## MVP Scope Signals (In / Out / Maybe)

- In v1: Instant Comeback Card, Tiered Completion (full/reduced/minimum), Recovery-First Daily Queue, Neutral Status Language, optional Reflection Chips.
- In v1 validation additions: explicit retention testing plan, event instrumentation, stop/go criteria, and risk monitoring.
- Out of v1: monetization, growth mechanics, social/community features, heavy analytics dashboards, autonomous behavior changes without user approval.
- Maybe later (post-v1): contextual reminders, resilience score dashboards, adaptive goal calibration, coaching tone profiles.

## Requirements Hints for PRD

- Daily core path must remain one-screen first (complete/miss/fallback actions before secondary navigation).
- Daily core actions target median completion time <10 seconds.
- Every miss must produce an immediate comeback option; no dead-end miss state allowed.
- Tiered completion must preserve continuity and be visible in history/reporting.
- Reflection input must be optional, low-friction, and not required for successful daily logging.
- Any adaptive behavior recommendation must use preview-and-apply (explicit user consent) and be reversible.
- Language system must ban moralized status terms (e.g., “failed”) in favor of neutral state labels (e.g., “interrupted”).

## Validation and Experiment Design (Retention Uncertainty)

- Validation cohort: maintainer + 3–8 friends with varied interruption patterns.
- Validation duration: 6 weeks total (2-week baseline + 4-week recovery-first usage period).
- Unit of analysis: interruption event and recovery outcome within 24 hours.
- Target metric 1: recovery-within-24-hours rate improves by >=20% from baseline period to latter period.
- Target metric 2: post-interruption 7-day continuity reaches >=60% across cohort.
- Target metric 3: median daily action time remains <10 seconds.
- Go criterion: majority of users improve on recovery and continuity with stable UX speed.
- Hold criterion: mixed quantitative results with strong qualitative support; iterate once on highest-friction points.
- Stop/Pivot criterion: no measurable recovery lift after one focused iteration plus negative qualitative sentiment on fallback/recovery UX.
- Interpretation limits: small non-random cohort and novelty effects; findings are directional evidence, not market-generalizable proof.

## Event Instrumentation Hints

- Core events to track:
  - `habit_interrupted` with timestamp + selected reason tag.
  - `comeback_card_shown` with suggested path metadata.
  - Completion events split by tier: `full_completion_logged`, `reduced_completion_logged`, `minimum_completion_logged`.
  - Planning flow events: `planned_comeback_created`, `planned_comeback_completed`.
- Recovery definitions for PRD:
  - Start clock at interruption event timestamp.
  - Valid recovery can be minimum/reduced/full completion or successful planned comeback completion (define strict windows in PRD).
  - PRD should specify timezone handling and missed-log edge cases.

## UX Flow Details Worth Preserving

- V1 flow shape: Dashboard (today habits + quick actions) -> Miss reason (one tap) -> Recovery card (minimum now or plan tomorrow) -> Optional reflection chips -> Weekly recovery summary.
- Recovery interaction emphasis: continuity framing (“continuity maintained”) instead of damage framing.
- Queue ordering intent: prioritize at-risk habits and easiest wins to rebuild confidence while still surfacing important commitments.
- Insight philosophy: summary views should answer “what should I do next?” not maximize chart density.

## Competitive Intelligence (For Positioning Section in PRD)

- Category incumbents frequently optimize streak visibility and perfection signaling.
- Consistent gap across competitors: weak/no post-miss recovery workflow and higher shame/friction after interruption.
- Positioning wedge: “recovery-first, not streak-first” and “emotionally safe behavior design.”
- Timing rationale: mental wellness and anti-perfection sentiment trends support shame-free tool positioning.

## Rejected and Deferred Ideas (Avoid Re-proposal in PRD)

- Rejected for v1:
  - Social/community layers (leaderboards, feeds, accountability groups).
  - Heavy analytics dashboards.
  - Mandatory journaling/open-ended reflection.
  - Perfection-centric KPI as headline metric.
  - Autonomous adaptation without explicit user consent.
  - Multi-page daily logging flows.
- Deferred/open ideas (candidate for later roadmap, not MVP scope):
  - Streak freeze tokens.
  - Skill-tree progression for habits.
  - Dynamic difficulty/deload logic.
  - Recovery heatmap calendars and richer storyline timelines.
  - Personalized tone adaptation beyond baseline selectable profiles.

## Risks and Mitigation Signals

- Risk: fallback overuse inflates continuity while reducing meaningful behavior change.
  - Mitigation signal: track tier mix and ensure full/reduced progression doesn’t collapse into minimum-only patterns.
- Risk: small friend cohort bias overstates product effect.
  - Mitigation signal: treat outcomes as directional and frame next step as broader pilot before strong claims.
- Risk: sensitive reflection/interruption data may suppress honest input.
  - Mitigation signal: transparent participant-facing logging notes and minimal required personal data.
- Risk: metric gaming (optimize score, not habits).
  - Mitigation signal: pair resilience signals with habit quality/progression indicators.

## Open Questions for PRD Discovery

- What exact threshold should define “meaningful continuity” beyond raw completion counts?
- How should fallback tier progression rules work to prevent long-term minimum-only behavior?
- Which interruption reason taxonomy best balances usefulness with one-tap simplicity?
- What minimum privacy/export/delete controls are required even for a small OSS pilot?
- What is the simplest baseline comparator design that avoids over-engineering while still yielding credible retention insight?

## Architecture/Implementation Context Hints

- Current project stack context indicates Django backend + React frontend with Pixi-managed workflows.
- Canonical project command posture: run project tasks via Pixi (`pixi run ...` / `pixi exec ...`) rather than unmanaged system-path tooling.
- PRD should preserve thin vertical slice strategy first: miss event -> comeback choice -> continuity update -> queue refresh -> metric update.
