"""Minimal API-facing helpers for Story 1.1 habit creation."""

from __future__ import annotations

from typing import Any

from .models import Habit, HabitCreateRequest, HabitTierTargets
from .repository import HabitRepository
from .service import HabitService

_default_repository = HabitRepository()
_default_service = HabitService(_default_repository)


def create_habit_from_payload(payload: dict[str, Any]) -> Habit:
    """Create a habit from request payload fields used by the frontend flow."""

    request = HabitCreateRequest(
        name=str(payload["name"]),
        cadence=payload["cadence"],
        time_window=str(payload["time_window"]),
        tiers=HabitTierTargets(
            full=str(payload["full"]),
            reduced=str(payload["reduced"]),
            minimum=str(payload["minimum"]),
        ),
    )
    return _default_service.create_habit(request)


def list_daily_queue() -> list[Habit]:
    """Return created habits in queue order."""

    return _default_service.get_daily_queue()


def reset_habit_store() -> None:
    """Reset in-memory state for tests."""

    _default_repository.clear()
