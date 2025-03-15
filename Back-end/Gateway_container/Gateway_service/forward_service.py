import httpx

import json
from fastapi import HTTPException, Request

# addresses for micro-services
DATABASE_SERVICE_URL = "http://api:8001"
LLM_SERVICE_URL = "http://llm:8002"

async def getPastBuilds(user_id: int):
    """
    Forwards request to retreive all past PC builds based on the user ID.

    Parameters
    ----------
    user_id : int
        The user ID whose past builds are being fetched.
        Included in forward request.

    Returns
    -------
    list: JSON
        A list of JSON objects containing the user's past PC builds
    
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                DATABASE_SERVICE_URL + "/past_builds/" + str(user_id),
                timeout=5.0
            )
            response.raise_for_status()
            print("[O] Successfully forwarded request to database service")
            return response.json()
    except httpx.HTTPStatusError as e:
        return {"[X] error": f"HTTP error: {e.response.status_code}"}
    except httpx.RequestError as e:
        return {"[X] error": f"Request failed: {str(e)}"}
    
async def getLLMResponse(query: Request):
    """
    Forwards request to build a PC to the LLM service

    Parameters
    ----------
    query: json
        The query in the json format dictated by the LLM_Query class in LLM_service/llm_query.py
        Included in forward request.

    Returns
    -------
    response: json
        A JSON object containing strings with the build returned by the LLM
    """
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            query_data = await query.json()

            response = await client.post(
                LLM_SERVICE_URL + "/generate-text",
                json = query_data
            )
            response.raise_for_status()
            print("[O] Successfully forwarded request to LLM service")
            return response.json()
    except httpx.HTTPStatusError as e:
        # return {"[X] error": f"HTTP error {e.response.status_code}: {e}"}
        raise HTTPException(status_code=e.response.status_code, detail=str(e))
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail="Request failed: " + str(e))

        # return {"[X] error": f"Request failed: {e}"}


if __name__ == "__main__":
    pass