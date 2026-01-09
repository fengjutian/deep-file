from fastapi import FastAPI
from .workflow_api import router as workflow_router
from .llm_api import router as llm_router

app = FastAPI()

app.include_router(workflow_router)
app.include_router(llm_router)
