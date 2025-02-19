from fastapi import APIRouter
from API_service.routes import router as api_router

router = APIRouter()

# Include API Service routes
router.include_router(api_router, prefix="/api")

@router.get("/")
async def root():
    return {"message": "Welcome to the Gateway Service"}
