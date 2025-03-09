import httpx
from LLM_service.llm_formats import LLM_Query

# addresses for micro-services
DATABASE_SERVICE_URL = "http://localhost:8001"
LLM_SERVICE_URL = "http://localhost:8002"

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
    
async def getLLMResponse(query: LLM_Query):
    """
    Forwards request to build a PC to the LLM service

    Parameters
    ----------
    query: LLM_Query
        The query in the json format dictated by the LLM_Query class in LLM_service/llm_query.py
        Included in forward request.

    Returns
    -------
    response: JSON
        A JSON object containing strings with the build returned by the LLM
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                LLM_SERVICE_URL + "/generate-text",
                timeout=5.0,
                data=query.json()
            )
            response.raise_for_status()
            print("[O] Successfully forwarded request to LLM service")
            return response.json()
    except httpx.HTTPStatusError as e:
        return {"[X] error": f"HTTP error: {e.response.status_code}"}
    except httpx.RequestError as e:
        return {"[X] error": f"Request failed: {str(e)}"}


if __name__ == "__main__":
    pass