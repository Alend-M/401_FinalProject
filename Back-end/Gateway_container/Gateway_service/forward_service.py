import httpx

import json
from fastapi import HTTPException, Request

# addresses for micro-services
DATABASE_SERVICE_URL = "http://smartspec-backend.service.local:8001"
LLM_SERVICE_URL = "http://smartspec-backend.service.local:8002"

async def getPastBuilds(user_id: str) -> json:
    """
    Forwards request to retreive all past PC builds based on the user ID.

    Parameters
    ----------
    user_id : str
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
                DATABASE_SERVICE_URL + "/past_builds/" + user_id,
                timeout=5.0
            )
            response.raise_for_status()
            print("[O] Successfully forwarded request to database service")
            return response.json()
    except httpx.HTTPStatusError as e:
        return {"[X] error": f"HTTP error: {e.response.status_code}"}
    except httpx.RequestError as e:
        return {"[X] error": f"Request failed: {str(e)}"}
    
async def saveBuild(user_id: str, build: json) -> json:
    """
    Forwards a already built build to the database for saving.

    Parameters
    -----------
    user_id: str
        The user_id for the one who is building
    build: json
        The build in json format in the format specified in the LLM_service/llm_service.py

    Returns
    --------
    response: json
        A response containing the http response code
    """
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            # build_data = await build.json()

            response = await client.post(
                DATABASE_SERVICE_URL + "/save_build/" + user_id,
                json = build
            )
            response.raise_for_status()
            print("[O] Successfully forwarded request to API service")
            return response.json()
    except httpx.HTTPStatusError as e:
        # return {"[X] error": f"HTTP error {e.response.status_code}: {e}"}
        raise HTTPException(status_code=e.response.status_code, detail=str(e))
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail="Request failed: " + str(e))

async def getLLMResponse(query: Request) -> json:
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

async def deletePastBuild(build_id: int) -> json:
    """
    Forwards request to retreive all past PC builds based on the user ID.

    Parameters
    ----------
    build_id : str
        The build id to be deleted.
        Included in forward request.

    Returns
    -------
    None

    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.delete(
                DATABASE_SERVICE_URL + "/delete_build/" + str(build_id),
                timeout=20.0
            )
            response.raise_for_status()
            print("[O] Successfully forwarded request to database service")
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=str(e))
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail="Request failed: " + str(e))

async def sendEmail(query: Request) -> json:
    """
    Forwards request to send an email to the dev team

    Parameters
    ----------
    query : json
        The query in the json format dictated by the Email class in LLM_service/email.py
        Included in forward request.

    Returns
    -------
    response: json
        A JSON object containing strings with the response from the email service
    """
    try:
        async with httpx.AsyncClient() as client:
            query_data = await query.json()

            response = await client.post(
                DATABASE_SERVICE_URL + "/send-email",
                json = query_data
            )
            response.raise_for_status()
            print("[O] Successfully forwarded request to email service")
            return response.json()
    except httpx.HTTPStatusError as e:
        # return {"[X] error": f"HTTP error {e.response.status_code}: {e}"}
        raise HTTPException(status_code=e.response.status_code, detail=str(e))
    except httpx.RequestError as e:
        print("HERE")
        raise HTTPException(status_code=500, detail="Request failed: " + str(e))
    
if __name__ == "__main__":
    pass