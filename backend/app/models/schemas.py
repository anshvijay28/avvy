from pydantic import BaseModel


class Event(BaseModel):
    title: str
    start: str
    end: str


class FreeSlot(BaseModel):
    date: str
    label: str


class DateRange(BaseModel):
    start: str
    end: str


class CalendarEventsResponse(BaseModel):
    events: list[Event]
    slots: list[FreeSlot]


class ChatRequest(BaseModel):
    message: str
    current_slots: list[FreeSlot]
    date_range: DateRange


class ChatResponse(BaseModel):
    slots: list[FreeSlot]
    intent: dict | None = None
