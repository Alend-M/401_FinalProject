from fastapi import Request, FastAPI
from API_service.database_service import *
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

@app.get("/past_builds/{user_id}")
async def getPastBuilds(user_id: str):
    response = getAllUserPastBuilds(user_id)
    print(type(response))
    print(type(response[0]['buildjson']))
    return JSONResponse(content=response, headers=headers)

@app.post("/save_build/{user_id}")
async def saveBuild(user_id: str, prompt: Request):
    promptJSON = await prompt.json()
    response = await saveLLMResponse(user_id, promptJSON)
    return JSONResponse(content=response, headers=headers)
