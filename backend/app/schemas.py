from pydantic import BaseModel
from typing import Any

class WorkflowCreate(BaseModel):
    name: str
    graph: Any


class WorkflowUpdate(BaseModel):
    graph: Any


class LLMRequest(BaseModel):
    prompt: str
    content: str
