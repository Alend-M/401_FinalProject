from fastapi import FastAPI
from supabase import create_client, Client
from dotenv import load_dotenv
import os 

from ..API_service.database_service import *

# Creates a instance for FastAPI
app = FastAPI()

# Load the environment variables for supabase instance to be used correctly
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Checks if the environment variables are loaded correctly
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Please set the SUPABASE_URL and SUPABASE_KEY in the environment variables file .env")

# Creates a client instance for supabase
supabase_client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.get("/past_builds/{user_id}")
async def getPastBuilds(user_id: int):
    return getAllUserPastBuilds(user_id)