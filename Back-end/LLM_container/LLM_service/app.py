# all of this is placeholder to wrap my head around routing
from fastapi import Request, FastAPI
from LLM_service.llm_service import *
import json


app = FastAPI()

@app.post("/generate-text")
async def generate_text(prompt: Request):

    
    promptJSON = await prompt.json()
    response = await getPcRecommendation(promptJSON)
    return response
