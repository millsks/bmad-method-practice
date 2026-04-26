---
title: "Product Brief: bmad-method-practice"
status: "complete"
created: "2026-04-26T16:20:00Z"
updated: "2026-04-26T16:34:00Z"
inputs:
  - "_bmad-output/brainstorming/brainstorming-session-2026-04-26-115639.md"
  - "docs/bmad_copilot_pixi_vscode_novice_to_expert.md"
  - "habitflow-web/pixi.toml"
  - "Web research synthesis (habit tracker competitive and market context)"
---

## HabitFlow (Recovery-First Habit Tracker)

## Executive Summary

HabitFlow is an open-source web habit tracker designed around a simple belief: people do not quit their habits because they miss one day—they quit because most trackers turn misses into shame and friction. Instead of optimizing for perfect streaks, HabitFlow optimizes for fast recovery. The core promise is straightforward: if you miss a day, the product helps you restart in under 30 seconds.

The first version focuses on a small, high-leverage recovery loop: detect an interruption, offer an immediate comeback path, preserve continuity through minimum viable completion, and guide tomorrow’s next step without judgmental language. This keeps daily use light, actionable, and emotionally safe.

This project is intentionally scoped as a fun, open-source build for personal use and a small circle of friends. Success in v1 is not market share or monetization—it is proving that recovery-first mechanics improve consistency after interruptions compared with streak-first patterns.

## The Problem

Most habit trackers are built around perfection metrics. When users miss a day, they lose streak momentum, feel like they failed, and often disengage. The highest-risk moment is not onboarding—it is the first interruption.

Current alternatives commonly create three failure patterns:

- Binary success/failure logging that ignores reduced effort.
- Punitive framing (“failed,” broken streak visuals) that amplifies guilt.
- No immediate recovery workflow, forcing users to decide what to do next while motivation is low.

For users with variable schedules, low-energy periods, or disrupted routines, this leads to avoidable churn: one miss becomes a stop event instead of a recovery event.

## The Solution

HabitFlow provides a recovery-first interaction model in which misses are expected and managed, not punished.

Core v1 experience:

- Recovery-First Daily Queue: one-screen daily actions with fast complete/miss/fallback choices.
- Tiered Completion Model: full, reduced, and minimum completion paths so continuity can survive real-life constraints.
- Instant Comeback Card: immediate post-miss guidance with two options: minimum completion now or plan tomorrow’s next attempt.
- Neutral Status Language: supportive, non-moralized copy (e.g., “interrupted,” not “failed”).
- Reflection Chips: optional one-tap context capture to inform future recommendations without writing burden.

This design keeps the daily path under 10 seconds for core actions and prioritizes “what should I do next?” over deep analytics.

## What Makes This Different

HabitFlow differentiates by changing the success model from perfection to resilience.

- Primary metric framing: resilience and recovery speed, not longest streak.
- Behavioral design: every miss must transition into an immediate comeback option.
- UX philosophy: no mandatory journaling, no heavy dashboards, no dead-end miss states.
- Trust model: no autonomous behavior changes without explicit user confirmation.

Where competitors emphasize streak maintenance, HabitFlow emphasizes continuity recovery.

## Who This Serves

Primary users:

- Individuals who want to build habits but frequently get interrupted by normal life volatility.
- People who abandon habit apps after missing days due to guilt, friction, or perfection pressure.

Initial audience for v1:

- The maintainer (Kevin) and a small group of friends using the product in real conditions.

User “aha” moment:

- After a missed day, the user taps one recovery action and feels progress is still intact instead of lost.

## Success Criteria

v1 success is validated through behavior change evidence in a small cohort, not growth metrics.

Primary metrics:

- Recovery within 24 hours after an interruption.
- 7-day and 30-day consistency after first missed event.
- Daily core action completion time under 10 seconds.

Secondary signals:

- Lower abandonment immediately after misses.
- Increased use of minimum/reduced completion during disruption windows.
- Positive qualitative feedback on tone (“supportive,” “non-judgmental,” “easy to restart”).

Retention challenge hypothesis:

- Category retention is historically difficult, but recovery-first design should outperform streak-first drop-off at the first interruption point. v1 will test this hypothesis directly with friend-cohort behavior logs and qualitative check-ins.

Validation targets for v1:

- Recovery-within-24-hours rate improves by at least 20% from each participant’s first 2 weeks to last 2 weeks.
- Post-interruption 7-day continuity reaches at least 60% in the friend cohort.
- Median daily action time stays under 10 seconds for complete/miss/fallback actions.

## Retention Validation Plan (v1)

To reduce uncertainty about category retention risk, v1 will run as a small but structured validation study.

Study design:

- Cohort: maintainer plus 3–8 friends with varied interruption patterns.
- Duration: 6 weeks (2-week baseline behavior period + 4-week recovery-first usage period).
- Unit of analysis: interruption event and outcome within 24 hours.

Core event instrumentation:

- `habit_interrupted` (habit id, timestamp, selected reason)
- `comeback_card_shown` (timestamp, suggested path)
- `minimum_completion_logged` / `full_completion_logged` / `reduced_completion_logged`
- `planned_comeback_created` and `planned_comeback_completed`

Success and failure gates:

- Go: recovery-within-24-hours and post-miss continuity improve for a majority of users without increase in logging friction.
- Hold: mixed improvement with strong qualitative support; continue one more iteration focused on top friction points.
- Stop/Pivot: no measurable recovery lift after one iteration and qualitative signals indicate fallback mechanics are confusing or demotivating.

Known interpretation limits:

- Results will be directional (small, non-random cohort).
- Novelty effects may inflate early engagement.
- Findings guide product direction, not broad market claims.

## Scope

In scope (v1):

- Instant Comeback Card
- Tiered Completion Model (full/reduced/minimum)
- Recovery-First Daily Queue
- Neutral Status Language System
- Optional Reflection Chips

Out of scope (v1):

- Monetization strategies
- Growth and acquisition systems
- Social/community features (leaderboards, feeds, accountability groups)
- Heavy analytics dashboards
- Fully autonomous adaptation without user approval

## Key Risks

- Fallback overuse may preserve continuity numbers while reducing meaningful habit progress.
- Small-cohort bias may overstate product impact versus broader users.
- Reflection and interruption metadata may feel sensitive if privacy expectations are unclear.

Mitigation stance:

- Keep recovery metrics paired with quality signals (full/reduced/minimum mix).
- Treat v1 results as directional evidence only.
- Include clear participant-facing notes on what is logged and why.

## Vision

If this works, HabitFlow can become a reference open-source framework for recovery-oriented behavior design: a practical alternative to streak-centric habit products.

Over 2–3 years, the project can evolve from a personal utility into a reusable pattern library of resilience mechanics (adaptive reminders, preview-and-apply calibration, coaching tone profiles, and recovery trend insights), with evidence-backed design choices that other builders can adopt.

The long-term vision is not to maximize pressure for perfect execution; it is to normalize sustainable consistency through fast, compassionate recovery.
