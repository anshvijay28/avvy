from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import calendar, chat

load_dotenv()

app = FastAPI(title="Avvy API", version="0.1.0")

# TODO: replace with your unpacked extension ID during local dev
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "chrome-extension://YOUR_EXTENSION_ID",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(calendar.router, prefix="/calendar", tags=["calendar"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])


@app.get("/health")
def health():
    return {"status": "ok"}
