from fastapi import FastAPI
from Gateway_service.forward_service import *
from LLM_service.llm_formats import LLM_Query

# Creates a instance for FastAPI
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello from the gateway"}

@app.get("/past_builds/{user_id}")
async def forwardPastBuilds(user_id: int):
    response = await getPastBuilds(user_id)
    return response

@app.post("/build/{user_id}")
async def buildPC(user_id: int, query: LLM_Query):
    response = await getLLMResponse(query)
    return response