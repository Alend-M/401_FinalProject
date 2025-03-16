from fastapi import Request, FastAPI
from Gateway_service.forward_service import *
import json
from fastapi.middleware.cors import CORSMiddleware

# Creates a instance for FastAPI
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello from the gateway"}

@app.get("/past_builds/{user_id}")
async def forwardPastBuilds(user_id: str):
    response = await getPastBuilds(user_id)
    return response

@app.post("/build")
async def buildPC(query: Request):
    
    for attempt in range(3):
        response = await getLLMResponse(query)
        if response == {"error": "bad response"}:
            print("[X] Bad response from LLM service")
            continue
        else:
            break
    
    return response

@app.post("/build/{user_id}")
async def buildAndSavePC(user_id: str, query: Request):
    
    for attempt in range(3):
        response = await getLLMResponse(query)
        if response == {"error": "bad response"}:
            print("[X] Bad response from LLM service")
            continue
        else:
            save_response = await saveBuild(user_id, response)
            print(save_response)
            break

    return response