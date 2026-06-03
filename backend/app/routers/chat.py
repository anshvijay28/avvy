from fastapi import APIRouter, Depends, HTTPException

from app.dependencies.auth import verify_jwt
from app.models.schemas import ChatRequest, ChatResponse

router = APIRouter()


@router.post("", response_model=ChatResponse)
async def chat(
    body: ChatRequest,
    user_id: str = Depends(verify_jwt),
):
    raise HTTPException(status_code=501, detail="Not implemented")
