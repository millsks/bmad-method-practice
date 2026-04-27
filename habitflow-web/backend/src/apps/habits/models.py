"""Typed models for tiered habit creation and safe configuration edits."""

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

        if self.cadence not in ("daily", "flexible"):
            raise ValueError("Cadence must be daily or flexible")

        if not self.time_window.strip():
            raise ValueError("Time window is required")

        self.tiers.validate()


@dataclass(frozen=True)
class HabitConfigurationSnapshot:
    """Immutable snapshot of a habit configuration preserved for history views."""

    name: str
    cadence: Cadence
    time_window: str
    tiers: HabitTierTargets
    version: int
    recorded_at: datetime = field(default_factory=lambda: datetime.now(UTC))


@dataclass(frozen=True)
class Habit:
    """Stored habit model used by the daily queue."""

    name: str
    cadence: Cadence
    time_window: str
    tiers: HabitTierTargets
    configuration_version: int = 1
    configuration_history: tuple[HabitConfigurationSnapshot, ...] = field(default_factory=tuple)
    id: str = field(default_factory=lambda: str(uuid4()))
    created_at: datetime = field(default_factory=lambda: datetime.now(UTC))

    def update_configuration(self, request: HabitCreateRequest) -> Habit:
        """Return a new habit with updated active settings and preserved prior configuration."""

        request.validate()

        previous_snapshot = HabitConfigurationSnapshot(
            name=self.name,
            cadence=self.cadence,
            time_window=self.time_window,
            tiers=self.tiers,
            version=self.configuration_version,
        )

        return Habit(
            id=self.id,
            created_at=self.created_at,
            name=request.name.strip(),
            cadence=request.cadence,
            time_window=request.time_window.strip(),
            tiers=request.tiers,
            configuration_version=self.configuration_version + 1,
            configuration_history=(*self.configuration_history, previous_snapshot),
        )
