"""Minimal API-facing helpers for Story 1.1/1.2 habit management."""

from __future__ import annotations

from typing import Any, cast

from .models import Cadence, Habit, HabitConfigurationSnapshot, HabitCreateRequest, HabitTierTargets
from .repository import HabitRepository
from .service import HabitService

_default_repository = HabitRepository()
_default_service = HabitService(_default_repository)


def _require_non_empty_string(payload: dict[str, Any], keys: tuple[str, ...], label: str) -> str:
    for key in keys:
        value = payload.get(key)
        if isinstance(value, str) and value.strip():
            return value

    raise ValueError(f"{label} is required")


def _extract_tiers(payload: dict[str, Any]) -> HabitTierTargets:
    tiers = payload.get("tiers")

    if isinstance(tiers, dict):
        full = _require_non_empty_string(tiers, ("full",), "Full target")
        reduced = _require_non_empty_string(tiers, ("reduced",), "Reduced target")
        minimum = _require_non_empty_string(tiers, ("minimum",), "Minimum target")
        return HabitTierTargets(full=full, reduced=reduced, minimum=minimum)

    full = _require_non_empty_string(payload, ("full",), "Full target")
    reduced = _require_non_empty_string(payload, ("reduced",), "Reduced target")
    minimum = _require_non_empty_string(payload, ("minimum",), "Minimum target")
    return HabitTierTargets(full=full, reduced=reduced, minimum=minimum)


def create_habit_from_payload(payload: dict[str, Any]) -> Habit:
    """Create a habit from request payload fields used by the frontend flow."""

    cadence_value = payload.get("cadence")
    if not isinstance(cadence_value, str):
        raise ValueError("Cadence is required")
    cadence = cast(Cadence, cadence_value)

    request = HabitCreateRequest(
        name=_require_non_empty_string(payload, ("name",), "Habit name"),
        cadence=cadence,
        time_window=_require_non_empty_string(
            payload,
            ("time_window", "timeWindow"),
            "Time window",
        ),
        tiers=_extract_tiers(payload),
    )
    return _default_service.create_habit(request)


def update_habit_from_payload(payload: dict[str, Any]) -> Habit:
    """Update an existing habit while preserving prior configuration history."""

    habit_id = _require_non_empty_string(payload, ("id",), "Habit id")

    cadence_value = payload.get("cadence")
    if not isinstance(cadence_value, str):
        raise ValueError("Cadence is required")
    cadence = cast(Cadence, cadence_value)

    request = HabitCreateRequest(
        name=_require_non_empty_string(payload, ("name",), "Habit name"),
        cadence=cadence,
        time_window=_require_non_empty_string(
            payload,
            ("time_window", "timeWindow"),
            "Time window",
        ),
        tiers=_extract_tiers(payload),
    )
    return _default_service.update_habit(habit_id, request)


def list_daily_queue() -> list[Habit]:
    """Return created habits in queue order."""

    return _default_service.get_daily_queue()


def list_habit_history(habit_id: str) -> list[HabitConfigurationSnapshot]:
    """Return prior configuration snapshots for a habit."""

    return _default_service.get_habit_history(habit_id)


def reset_habit_store() -> None:
    """Reset in-memory state for tests."""

    _default_repository.clear()
