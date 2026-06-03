export type Event = {
  title: string;
  start: string;
  end: string;
};

export type FreeSlot = {
  date: string;
  label: string;
};

export type DateRange = {
  start: string;
  end: string;
};

export type CalendarEventsResponse = {
  events: Event[];
  slots: FreeSlot[];
};

export type ChatRequest = {
  message: string;
  current_slots: FreeSlot[];
  date_range: DateRange;
};

export type ChatResponse = {
  slots: FreeSlot[];
  intent?: Record<string, unknown>;
};
