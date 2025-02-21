from fastapi import FastAPI
from Gateway_service.forward_service import *

# Creates a instance for FastAPI
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello from the gateway"}

@app.get("/past_builds/{user_id}")
async def forwardPastBuilds(user_id: int):
    response = await getPastBuilds(user_id)
    return response
