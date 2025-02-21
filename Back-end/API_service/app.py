from fastapi import FastAPI
from API_service.database_service import *

# Creates a instance for FastAPI
app = FastAPI()

@app.get("/past_builds/{user_id}")
async def getPastBuilds(user_id: int):
    response = getAllUserPastBuilds(user_id)
    return response
