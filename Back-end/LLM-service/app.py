# all of this is placeholder to wrap my head around routing
from fastapi import FastAPI

app = FastAPI()

@app.post("/generate-text")
async def generate_text(prompt: str):
    return {"response": f"Generated text for: {prompt}"}