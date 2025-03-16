import json
import google.generativeai as genai
import os 
from dotenv import load_dotenv

# Load the environment variables for the API key to be used correctly
load_dotenv()
api_key = os.getenv("API_KEY")

model = None
template = """
    {
    "CPUs": 
        {
          "name": "Intel Core i9-14900K",
          "price_CAD": "$433"
        },
    "GPUs": 
        {
          "name": "NVIDIA GeForce RTX 4090",
          "price_CAD": "$1,500"
        },
    "RAM": 
        {
          "name": "Corsair Vengeance RGB Pro 32GB",
          "price_CAD": "$180"
        },
    "Motherboards": 
        {
          "name": "ASUS ROG Strix Z690-E",
          "price_CAD": "$400"
        },
    "Storage": 
        {
          "name": "Samsung 980 Pro 1TB",
          "price_CAD": "$200"
        },
    "Power_Supply": 
        {
          "name": "Corsair RM850x",
          "price_CAD": "$150"
        },
    "Case": 
        {
          "name": "NZXT H510",
          "price_CAD": "$70"
        },
    "Cooling": 
        {
          "name": "NZXT Kraken X63",
          "price_CAD": "$150"
        },
    }
    """

def initAI():
    """
    Initializes the AI model for the service using singleton pattern

    Parameters
    ----------
    None

    Returns
    -------
    None
    """

    global model

    if model != None:
        return
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.0-flash')

async def getPcRecommendation(pc_requirements: json) -> dict:
    """
    Parameters
    ----------
    pc_requirements : JSON
        A JSON object containing the user's PC requirements
    >>> pc_requirements:
        {
            budget: 1000,
            minFps: 56,
            gamesList: ["Marvel Rivals", "Fortnite"],
            displayResolution: "1080p",
            graphicalQuality: "Ray-tracing",
            preOwnedHardware: [
                { type: CPU, name: "Intel Core-i7" },
                { type: GPU, name: "RTX 3070" }
            ]
        }

    Returns
    -------
    JSON : dict
        Returns a JSON using the python dictionary format containing the recommended PC build and the games used in the prompt.
        >>> getPCRecommednation(jsonExp):
    {
    "CPUs": 
        {
          "name": "Intel Core i9-14900K",
          "price_CAD": "$433",
        },
    "GPUs": 
        {
          "name": "NVIDIA GeForce RTX 4090",
          "price_CAD": "$1,500",
        },
    "RAM": 
        {
          "name": "Corsair Vengeance RGB Pro 32GB",
          "price_CAD": "$180",
        },
    """

    initAI()
    
    game_inputs = pc_requirements["gamesList"]

    prompt = f"""Respond in the following JSON format:{template}. Your response must only contain the given format no other text.
Based on the following requirements for a PC Build:{pc_requirements}. Fill in the provided template for the best PC Build recommendation following.
All prices provided must be in Canadian Dollars. If the requirements parts names are given, you MUST use them in your provided build. 
If the budget is not enough to meet the requirements, please provide the best build possible with the given budget.
"""
    response = model.generate_content(prompt).text # Sends the request to AI and extracts the response

    # Post Processing of the response from the ai to remove MarkDown structure that the AI loves responding with
    response = response.replace("```json", "")
    response = response.replace("```", "")

    # Loads turns the text based reponse into a python dictionary for return (does this because apparently really similar to json for python)
    try:
      response = json.loads(response)
      response["games"] = game_inputs
    except Exception as e:
      print(e)
      response = {"error": "bad response"}
    return response

if __name__ == "__main__":
    # This file is meant to be imported only    
    pc_requirements ="""
    {
        "budget": 2000,
        "minFps": 120,
        "gamesList": ["GTAV", "Fortnite"],
        "displayResolution": "1080p",
        "graphicalQuality": "Ray-tracing",
        "preOwnedHardware": [
            { "type": "CPU", "name": "Intel Core-i7" },
            { "type": "GPU", "name": "RTX 3070" }
        ]
    }
    """
    print(getPcRecommendation(pc_requirements))