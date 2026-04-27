"""In-memory repository for Story 1.1/1.2 habit management slices."""

from __future__ import annotations

from .models import Habit


class HabitRepository:
    """Stores habits and returns daily queue ordering for active habits."""

    def __init__(self) -> None:
        self._habits: list[Habit] = []

    def add(self, habit: Habit) -> Habit:
        self._habits.append(habit)
        return habit

    def get(self, habit_id: str) -> Habit:
        for habit in self._habits:
            if habit.id == habit_id:
                return habit

        raise ValueError("Habit not found")

    def update(self, updated_habit: Habit) -> Habit:
        for index, habit in enumerate(self._habits):
            if habit.id == updated_habit.id:
                self._habits[index] = updated_habit
                return updated_habit

        raise ValueError("Habit not found")

    def list_daily_queue(self) -> list[Habit]:
        return list(self._habits)

    def clear(self) -> None:
        self._habits.clear()
