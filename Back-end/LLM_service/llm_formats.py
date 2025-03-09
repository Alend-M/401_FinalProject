from pydantic import BaseModel

class LLM_Query(BaseModel):
    message: str

class LLM_Response(BaseModel):
    response: str