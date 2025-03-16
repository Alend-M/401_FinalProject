# all of this is placeholder to wrap my head around routing
from fastapi import Request, FastAPI
from LLM_service.llm_service import *
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-text")
async def generate_text(prompt: Request):
    promptJSON = await prompt.json()
    response = await getPcRecommendation(promptJSON)
    return response
