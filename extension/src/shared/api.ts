import type { CalendarEventsResponse, ChatRequest, ChatResponse } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchCalendarEvents(
  _accessToken: string,
  _supabaseJwt: string,
  _startDate: string,
  _endDate: string,
): Promise<CalendarEventsResponse> {
  // TODO: GET /calendar/events with Bearer JWT + X-Google-Token
  throw new Error("fetchCalendarEvents not implemented");
}

export async function sendChatMessage(
  _supabaseJwt: string,
  _body: ChatRequest,
): Promise<ChatResponse> {
  // TODO: POST /chat with Bearer JWT
  throw new Error("sendChatMessage not implemented");
}

export { API_URL };
