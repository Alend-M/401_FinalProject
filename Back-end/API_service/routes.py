from fastapi import APIRouter
from .database_service import *

router = APIRouter()

@router.get("/past-builds/{user_id}")
def fetch_past_builds(user_id: int):
    return getAllUserPastBuilds(user_id=user_id)


