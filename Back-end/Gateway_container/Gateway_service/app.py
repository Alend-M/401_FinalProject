from fastapi import Request, FastAPI
from Gateway_service.forward_service import *
import json
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

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

headers = {
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }

@app.get("/")
async def root():
    return {"message": "Hello from the gateway"}

@app.get("/past_builds/{user_id}")
async def forwardPastBuilds(user_id: str):
    response = await getPastBuilds(user_id)  
    return JSONResponse(content=response, headers=headers)

@app.post("/build")
async def buildPC(query: Request):
    
    for attempt in range(3):
        response = await getLLMResponse(query)
        if response == {"error": "bad response"}:
            print("[X] Bad response from LLM service")
            continue
        else:
            break
    
    return JSONResponse(content=response, headers=headers)

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

    return JSONResponse(content=response, headers=headers)

@app.post("/save_build/{user_id}")
async def saveBuildEndpoint(user_id: str, build: Request):
    buildJson = await build.json()
    save_response = await saveBuild(user_id, buildJson)
    print(save_response)
    return JSONResponse(content=save_response, headers=headers)

# Handle OPTIONS preflight requests to prevent CORS errors
@app.options("/{full_path:path}")
async def preflight_request(full_path: str):
    return JSONResponse(headers=headers)