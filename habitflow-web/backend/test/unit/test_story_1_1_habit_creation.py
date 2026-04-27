"""Story 1.1 tests for tiered habit creation and queue visibility."""

from apps.habits.api import create_habit_from_payload, reset_habit_store
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


def test_create_habit_rejects_invalid_cadence() -> None:
    repository = HabitRepository()
    service = HabitService(repository)

    request = HabitCreateRequest(
        name="Walk",
        cadence="weekly",  # type: ignore[arg-type]
        time_window="Afternoon",
        tiers=HabitTierTargets(
            full="Walk 30 minutes",
            reduced="Walk 15 minutes",
            minimum="Walk 5 minutes",
        ),
    )

    try:
        service.create_habit(request)
    except ValueError as error:
        assert "Cadence" in str(error)
    else:
        raise AssertionError("Expected ValueError for invalid cadence")


def test_api_create_habit_accepts_nested_frontend_shape() -> None:
    reset_habit_store()

    created = create_habit_from_payload(
        {
            "name": "Hydration",
            "cadence": "daily",
            "timeWindow": "Morning",
            "tiers": {
                "full": "Drink 64oz water",
                "reduced": "Drink 32oz water",
                "minimum": "Drink 8oz water",
            },
        }
    )

    assert created.name == "Hydration"
    assert created.time_window == "Morning"
    assert created.tiers.minimum == "Drink 8oz water"


def test_api_create_habit_accepts_flat_backend_shape() -> None:
    reset_habit_store()

    created = create_habit_from_payload(
        {
            "name": "Read",
            "cadence": "flexible",
            "time_window": "Evening",
            "full": "Read 30 pages",
            "reduced": "Read 10 pages",
            "minimum": "Read 1 page",
        }
    )

    assert created.name == "Read"
    assert created.time_window == "Evening"
    assert created.tiers.full == "Read 30 pages"
