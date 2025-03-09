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
          "price_CAD": "$433",
          "buy_links": [
            {
              "retailer": "Best Buy",
              "url": "https://www.bestbuy.com/site/computer-cards-components/computer-pc-processors/abcat0507010.c?id=abcat0507010"
            },
            {
              "retailer": "Amazon",
              "url": "https://www.amazon.com/s?k=intel+core+i9-14900k"
            }
            ]
        },
    "GPUs": 
        {
          "name": "NVIDIA GeForce RTX 4090",
          "price_CAD": "$1,500",
          "buy_links": [
            {
              "retailer": "Newegg",
              "url": "https://www.newegg.com/p/pl?d=nvidia+geforce+rtx+4090"
            },
            {
              "retailer": "Best Buy",
              "url": "https://www.bestbuy.com/site/computer-cards-components/computer-graphics-cards/abcat0507002.c?id=abcat0507002"
            },
            {
              "retailer": "Amazon",
              "url": "https://www.amazon.com/s?k=nvidia+geforce+rtx+4090"
            }
            ]
        },
    "RAM": 
        {
          "name": "Corsair Vengeance RGB Pro 32GB",
          "price_CAD": "$180",
          "buy_links": [
            {
              "retailer": "Amazon",
              "url": "https://www.amazon.com/s?k=corsair+vengeance+rgb+pro+32gb"
            }
            ]
        },
    "Motherboards": 
        {
          "name": "ASUS ROG Strix Z690-E",
          "price_CAD": "$400",
          "buy_links": [
            {
              "retailer": "Newegg",
              "url": "https://www.newegg.com/p/pl?d=asus+rog+strix+z690-e"
            },
            {
              "retailer": "Amazon",
              "url": "https://www.amazon.com/s?k=asus+rog+strix+z690-e"
            }
            ]
        },
    "Storage": 
        {
          "name": "Samsung 980 Pro 1TB",
          "price_CAD": "$200",
          "buy_links": [
            {
              "retailer": "Best Buy",
              "url": "https://www.bestbuy.com/site/computer-cards-components/computer-hard-drives/abcat0504000.c?id=abcat0504000"
            },
            {
              "retailer": "Amazon",
              "url": "https://www.amazon.com/s?k=samsung+980+pro+1tb"
            }
            ]
        },
    "Power_Supply": 
        {
          "name": "Corsair RM850x",
          "price_CAD": "$150",
          "buy_links": [
            {
              "retailer": "Amazon",
              "url": "https://www.amazon.com/s?k=corsair+rm850x"
            },
            {
              "retailer": "Best Buy",
              "url": "https://www.bestbuy.com/site/computer-cards-components/computer-power-supplies/abcat0507001.c?id=abcat0507001"
            },
            {
              "retailer": "Newegg",
              "url": "https://www.newegg.com/p/pl?d=corsair+rm850x"
            }
            ]
        },
    "Case": 
        {
          "name": "NZXT H510",
          "price_CAD": "$70",
          "buy_links": [    
            {
              "retailer": "Newegg",
              "url": "https://www.newegg.com/p/pl?d=nzxt+h510"
            }
            ]
        },
    "Cooling": 
        {
          "name": "NZXT Kraken X63",
          "price_CAD": "$150",
          "buy_links": [
            {
              "retailer": "Best Buy",
              "url": "https://www.bestbuy.com/site/computer-cards-components/computer-fans-cooling/abcat0507000.c?id=abcat0507000"
            }
            ]
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

def getPcRecommendation(pc_requirements: json) -> dict:
    """
    Parameters
    ----------
    pc_requirements : JSON
        A JSON object containing the user's PC requirements
    >>> pc_requirements:
        {
            "Games": 
                {
                    "name": "Cyberpunk 2077",
                    "fps": "60",
                    "quality": "High"
                },
            "CPU":
                {
                    "name": "Intel Core i9-14900K",
                },
            "GPU":
                {
                    "name": "N/A",
                },
            "RAM":
                {
                    "size": "N/A",
                },
            "Motherboard":
                {
                    "name": "N/A",
                },
            "Storage":
                {
                    "size": "1TB",
                },
            "Power_Supply":
                {
                    "name": "N/A",
                },
            "Case":
                {
                    "name": "N/A",
                },
            "Cooling":
                {
                    "name": "N/A",
                }
        }

    Returns
    -------
    JSON : dict
        Returns a JSON using the python dictionary format containing the recommended PC build
        >>> getPCRecommednation(jsonExp):
    {
    "CPUs": 
        {
          "name": "Intel Core i9-14900K",
          "price_CAD": "$433",
          "buy_links": [
            {
              "retailer": "Best Buy",
              "url": "https://www.bestbuy.com/site/computer-cards-components/computer-pc-processors/abcat0507010.c?id=abcat0507010"
            },
            {
              "retailer": "Amazon",
              "url": "https://www.amazon.com/s?k=intel+core+i9-14900k"
            }
            ]
        },
    "GPUs": 
        {
          "name": "NVIDIA GeForce RTX 4090",
          "price_CAD": "$1,500",
          "buy_links": [
            {
              "retailer": "Newegg",
              "url": "https://www.newegg.com/p/pl?d=nvidia+geforce+rtx+4090"
            },
            {
              "retailer": "Best Buy",
              "url": "https://www.bestbuy.com/site/computer-cards-components/computer-graphics-cards/abcat0507002.c?id=abcat0507002"
            },
            {
              "retailer": "Amazon",
              "url": "https://www.amazon.com/s?k=nvidia+geforce+rtx+4090"
            }
            ]
        },
    "RAM": 
        {
          "name": "Corsair Vengeance RGB Pro 32GB",
          "price_CAD": "$180",
          "buy_links": [
            {
              "retailer": "Amazon",
              "url": "https://www.amazon.com/s?k=corsair+vengeance+rgb+pro+32gb"
            }
            ]
        },
    """

    initAI()

    prompt = f"""Respond in the following JSON format:{template}. Your response must only contain the given format no other text.
Based on the following requirements for a PC Build:{pc_requirements}. Fill in the provided template for the best PC Build recommendation following. You MUST provide a live working link for a product you cannot give dead links and the links must all be Canadian.
All prices provided must be in Canadian Dollars. If the requirements parts names are given, you MUST use them in your provided build.
"""
    response = model.generate_content(prompt).text
    response = response.replace("```json", "")
    response = response.replace("```", "")
    response = json.loads(response)
    return response

if __name__ == "__main__":
    # This file is meant to be imported only
    pc_requirements ="""
    {
        "Games": 
            {
                "name": "Cyberpunk 2077",
                "fps": "60",
                "quality": "High"
            },
        "CPU":
            {
                "name": "Intel Core i9-14900K",
            },
        "GPU":
            {
                "name": "N/A",
            },
        "RAM":
            {
                "size": "N/A",
            },
        "Motherboard":
            {
                "name": "N/A",
            },
        "Storage":
            {
                "size": "1TB",
            },
        "Power_Supply":
            {
                "name": "N/A",
            },
        "Case":
            {
                "name": "N/A",
            },
        "Cooling":
            {
                "name": "N/A",
            }
    }
    """
    print(getPcRecommendation(pc_requirements))