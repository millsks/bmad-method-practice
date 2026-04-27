"""Habit application service for tiered habit creation."""

from __future__ import annotations

from .models import Habit, HabitCreateRequest
from .repository import HabitRepository


class HabitService:
    """Coordinates validation and persistence for habit creation."""

    def __init__(self, repository: HabitRepository) -> None:
        self._repository = repository

    def create_habit(self, request: HabitCreateRequest) -> Habit:
        request.validate()
        habit = Habit(
            name=request.name.strip(),
            cadence=request.cadence,
            time_window=request.time_window.strip(),
            tiers=request.tiers,
        )
        return self._repository.add(habit)

    def get_daily_queue(self) -> list[Habit]:
        return self._repository.list_daily_queue()
