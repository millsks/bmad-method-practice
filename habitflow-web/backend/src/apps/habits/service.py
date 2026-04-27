"""Habit application service for tiered habit creation and editing."""

from __future__ import annotations

from .models import Habit, HabitConfigurationSnapshot, HabitCreateRequest
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

    def update_habit(self, habit_id: str, request: HabitCreateRequest) -> Habit:
        current_habit = self._repository.get(habit_id)
        updated_habit = current_habit.update_configuration(request)
        return self._repository.update(updated_habit)

    def get_daily_queue(self) -> list[Habit]:
        return self._repository.list_daily_queue()

    def get_habit_history(self, habit_id: str) -> list[HabitConfigurationSnapshot]:
        habit = self._repository.get(habit_id)
        return list(habit.configuration_history)
