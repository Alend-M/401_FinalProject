# Guide for running backend-services #

Since we have chosen a microservice architecture, each service <b>MUST</b> run separately from eachother in containers.<br>
This means that <b>ALL</b> communication between containers will be done via APIs.

## Dependencies ##
- pip install fastapi (api service for each container)
- pip install httpx   (handles forwarded requests from the controller class)
- pip install uvicorn (hosts each fastapi instance)
- ... add missing dependencies ...


## EXAMPLE RUN COMMAND USING UVICORN ##

from backend directory:

    uvicorn ./LLM_container/LLM_service.app:app --port 8002 <br>
    uvicorn ./API_container/API_service.app:app --port 8001 <br>
    uvicorn ./Gateway_container/Gateway_service.app:app --port 8000 <br>

* This runs two micro-services separately with their own ports.

## TO RUN AS CONTAINER STACK ##

From backend directory:

    docker compose up

