"""Typed models for tiered habit creation."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import UTC, datetime
from typing import Literal
from uuid import uuid4

Cadence = Literal["daily", "flexible"]


@dataclass(frozen=True)
class HabitTierTargets:
    """Distinct tier targets required for recovery-friendly habit completion."""

    full: str
    reduced: str
    minimum: str

    def validate(self) -> None:
        values = [self.full.strip(), self.reduced.strip(), self.minimum.strip()]

        if any(not value for value in values):
            raise ValueError("Tier targets must be non-empty values")

        if len(set(values)) != len(values):
            raise ValueError("Full, reduced, and minimum targets must be distinct")


@dataclass(frozen=True)
class HabitCreateRequest:
    """Input required to create a habit with tiered completion definitions."""

    name: str
    cadence: Cadence
    time_window: str
    tiers: HabitTierTargets

    def validate(self) -> None:
        if not self.name.strip():
            raise ValueError("Habit name is required")

        if not self.time_window.strip():
            raise ValueError("Time window is required")

        self.tiers.validate()


@dataclass(frozen=True)
class Habit:
    """Stored habit model used by the daily queue."""

    name: str
    cadence: Cadence
    time_window: str
    tiers: HabitTierTargets
    id: str = field(default_factory=lambda: str(uuid4()))
    created_at: datetime = field(default_factory=lambda: datetime.now(UTC))
