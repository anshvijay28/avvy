def fetch_events(access_token: str, start_date: str, end_date: str) -> list[dict]:
    """Fetch events from Google Calendar API. Not implemented."""
    raise NotImplementedError("fetch_events not implemented")


def strip_events(raw_events: list[dict]) -> list[dict]:
    """Strip raw events to title, start, end. Skip all-day events. Not implemented."""
    raise NotImplementedError("strip_events not implemented")
