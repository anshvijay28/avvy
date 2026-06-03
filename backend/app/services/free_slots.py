def compute_free_slots(
    events: list[dict],
    start_date: str,
    end_date: str,
    *,
    work_hours_start: str = "09:00",
    work_hours_end: str = "18:00",
    min_slot_minutes: int = 30,
    intent: dict | None = None,
) -> list[dict]:
    """Compute free availability slots for a date range. Not implemented."""
    raise NotImplementedError("compute_free_slots not implemented")
