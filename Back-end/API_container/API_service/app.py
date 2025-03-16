from fastapi import Request, FastAPI
from API_service.database_service import *
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

@app.get("/past_builds/{user_id}")
async def getPastBuilds(user_id: str):
    response = getAllUserPastBuilds(user_id)
    print(type(response))
    print(type(response[0]['buildjson']))
    return response

@app.post("/save_build/{user_id}")
async def saveBuild(user_id: str, prompt: Request):
    promptJSON = await prompt.json()
    response = await saveLLMResponse(user_id, promptJSON)
    return response
