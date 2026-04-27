"""Story 1.1 tests for tiered habit creation and queue visibility."""

from apps.habits.models import HabitCreateRequest, HabitTierTargets
from apps.habits.repository import HabitRepository
from apps.habits.service import HabitService


def test_create_habit_stores_distinct_tier_targets() -> None:
    repository = HabitRepository()
    service = HabitService(repository)

    created = service.create_habit(
        HabitCreateRequest(
            name="Hydration",
            cadence="daily",
            time_window="Morning",
            tiers=HabitTierTargets(
                full="Drink 64oz water",
                reduced="Drink 32oz water",
                minimum="Drink 8oz water",
            ),
        )
    )

    assert created.name == "Hydration"
    assert created.cadence == "daily"
    assert created.time_window == "Morning"
    assert created.tiers.full == "Drink 64oz water"
    assert created.tiers.reduced == "Drink 32oz water"
    assert created.tiers.minimum == "Drink 8oz water"


def test_create_habit_adds_habit_to_daily_queue() -> None:
    repository = HabitRepository()
    service = HabitService(repository)

    created = service.create_habit(
        HabitCreateRequest(
            name="Read",
            cadence="flexible",
            time_window="Evening",
            tiers=HabitTierTargets(
                full="Read 30 pages",
                reduced="Read 10 pages",
                minimum="Read 1 page",
            ),
        )
    )

    queue = service.get_daily_queue()

    assert len(queue) == 1
    assert queue[0].id == created.id


def test_create_habit_rejects_non_distinct_tiers() -> None:
    repository = HabitRepository()
    service = HabitService(repository)

    request = HabitCreateRequest(
        name="Walk",
        cadence="daily",
        time_window="Afternoon",
        tiers=HabitTierTargets(
            full="Walk 30 minutes",
            reduced="Walk 15 minutes",
            minimum="Walk 15 minutes",
        ),
    )

    try:
        service.create_habit(request)
    except ValueError as error:
        assert "distinct" in str(error)
    else:
        raise AssertionError("Expected ValueError for duplicated tier targets")
