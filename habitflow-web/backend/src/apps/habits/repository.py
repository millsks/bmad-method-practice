"""In-memory repository for Story 1.1 habit creation slice."""

from __future__ import annotations

from .models import Habit


class HabitRepository:
    """Stores habits and returns daily queue ordering for active habits."""

    def __init__(self) -> None:
        self._habits: list[Habit] = []

    def add(self, habit: Habit) -> Habit:
        self._habits.append(habit)
        return habit

    def list_daily_queue(self) -> list[Habit]:
        return list(self._habits)

    def clear(self) -> None:
        self._habits.clear()
