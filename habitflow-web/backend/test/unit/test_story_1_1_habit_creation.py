"""Story 1.1 and 1.2 tests for tiered habit creation, editing, and queue visibility."""

from apps.habits.api import create_habit_from_payload, reset_habit_store, update_habit_from_payload
from apps.habits.models import HabitCreateRequest, HabitTierTargets
from apps.habits.repository import HabitRepository
from apps.habits.service import HabitService


def _make_habit(service: HabitService) -> str:
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
    return created.id


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


def test_update_habit_changes_current_configuration_for_future_use() -> None:
    repository = HabitRepository()
    service = HabitService(repository)
    created_id = _make_habit(service)

    updated = service.update_habit(
        created_id,
        HabitCreateRequest(
            name="Hydration",
            cadence="flexible",
            time_window="Lunch",
            tiers=HabitTierTargets(
                full="Drink 80oz water",
                reduced="Drink 40oz water",
                minimum="Drink 12oz water",
            ),
        ),
    )

    queue = service.get_daily_queue()

    assert updated.id == created_id
    assert updated.cadence == "flexible"
    assert updated.time_window == "Lunch"
    assert updated.tiers.minimum == "Drink 12oz water"
    assert queue[0].cadence == "flexible"


def test_update_habit_preserves_previous_configuration_history() -> None:
    repository = HabitRepository()
    service = HabitService(repository)
    created_id = _make_habit(service)

    updated = service.update_habit(
        created_id,
        HabitCreateRequest(
            name="Hydration",
            cadence="flexible",
            time_window="Evening",
            tiers=HabitTierTargets(
                full="Drink 72oz water",
                reduced="Drink 36oz water",
                minimum="Drink 12oz water",
            ),
        ),
    )

    history = service.get_habit_history(created_id)

    assert len(history) == 1
    assert history[0].cadence == "daily"
    assert history[0].time_window == "Morning"
    assert history[0].tiers.full == "Drink 64oz water"
    assert updated.configuration_version == 2


def test_api_update_habit_accepts_nested_frontend_shape() -> None:
    reset_habit_store()
    created = create_habit_from_payload(
        {
            "name": "Read",
            "cadence": "daily",
            "timeWindow": "Morning",
            "tiers": {
                "full": "Read 20 pages",
                "reduced": "Read 10 pages",
                "minimum": "Read 2 pages",
            },
        }
    )

    updated = update_habit_from_payload(
        {
            "id": created.id,
            "name": "Read",
            "cadence": "flexible",
            "timeWindow": "Evening",
            "tiers": {
                "full": "Read 30 pages",
                "reduced": "Read 15 pages",
                "minimum": "Read 5 pages",
            },
        }
    )

    assert updated.id == created.id
    assert updated.cadence == "flexible"
