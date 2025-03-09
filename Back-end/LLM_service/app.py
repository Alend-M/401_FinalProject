# all of this is placeholder to wrap my head around routing
from fastapi import FastAPI
from LLM_service.llm_formats import LLM_Query

app = FastAPI()

@app.post("/generate-text")
async def generate_text(prompt: LLM_Query):
    # print(prompt)
    return {"response": f"Generated text for: {prompt}"}