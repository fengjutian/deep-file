from fastapi import APIRouter
import httpx
import os
from .schemas import LLMRequest

router = APIRouter(prefix="/llm", tags=["llm"])

DEEPSEEK_API = "https://api.deepseek.com/chat/completions"
API_KEY = os.getenv("DEEPSEEK_API_KEY")
