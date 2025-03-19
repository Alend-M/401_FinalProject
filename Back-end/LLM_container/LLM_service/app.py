# all of this is placeholder to wrap my head around routing
from fastapi import Request, FastAPI
from LLM_service.llm_service import *
import json
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

headers = {
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }

# Handles Sending a request to the LLM service to generate a PC build based on requirements JSON
@app.post("/generate-text")
async def generate_text(prompt: Request):
    promptJSON = await prompt.json()
    response = await getPcRecommendation(promptJSON)
    return JSONResponse(content=response, headers=headers)
