from fastapi import APIRouter, Depends, Header, HTTPException

from app.dependencies.auth import verify_jwt
from app.models.schemas import CalendarEventsResponse

router = APIRouter()


@router.get("/events", response_model=CalendarEventsResponse)
async def get_events(
    start_date: str,
    end_date: str,
    user_id: str = Depends(verify_jwt),
    x_google_token: str = Header(..., alias="X-Google-Token"),
):
    raise HTTPException(status_code=501, detail="Not implemented")
