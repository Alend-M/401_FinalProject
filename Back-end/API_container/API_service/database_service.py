# This file is used to create methods to fetch data from the database in supabase
import supabase 
from dotenv import load_dotenv
import os 
import json

# Load the environment variables for supabase instance to be used correctly
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

DummyLLMResponse = """
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

supabaseClient = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)
def getAllUserPastBuilds(user_id: int) -> list:
    """
    Retrieves all past PC builds based on the user ID

    Parameters
    ----------
    user_id : int
        The user ID whose past builds are being fetched.

    Returns
    -------
    list: JSON
        A list of JSON objects containing the user's past PC builds
        >>>

    Examples
    --------
    >>> getAllUserPastBuilds(1)
    [
        {
            "build_id": 1,
            "cpu": "Intel Core i7-9700K",
            "gpu": "Nvidia RTX 3070",
            ...
        },
        {
            "build_id": 2,
            "cpu": "AMD Ryzen 5 5600X",
            "gpu": "Nvidia RTX 3060",
            ...
        }
    ]
    """
    try:
        response = supabaseClient.table("BuildHistory").select("buildjson").eq("userid", user_id).execute()
        data = response.data
        
        if not data:
            print("No builds found for user: ", user_id)
            return []
        
        return data
    #     return [
    #     {
    #         "build_id": 1,
    #         "cpu": "Intel Core i7-9700K",
    #         "gpu": "Nvidia RTX 3070"
    #     },
    #     {
    #         "build_id": 2,
    #         "cpu": "AMD Ryzen 5 5600X",
    #         "gpu": "Nvidia RTX 3060"
    #     }
    # ]
        
    except Exception as e:
        print(f"Error fetching builds: {e}")
        return []
    
    
async def saveLLMResponse(user_id: int, LLMResponse: dict) -> int:
    
    try:
        #Remember to change DummyLLMResponse to LLMResponse when the LLMResponse is ready
        response = supabaseClient.table("BuildHistory").insert({"userid": user_id, "buildjson": LLMResponse}).execute() 
        data = response.data

        if data:
            print("Succesfully saved build for user: ", user_id)
            return data[0]['buildid']
        else:
            print(f"Failed to save LLM response for user: {user_id}")
            return -1
    except Exception as e:
        print(f"Error saving build: {e}")
        return [] 

# makes it so you need to import it to run the code
if __name__ == "__main__":
    user_id = 12
    # saveLLMResponse(user_id, DummyLLMResponse)
    
    
    
    builds = getAllUserPastBuilds(user_id)
    
    # If builds is a list, you can also check the type of the first item
    #if builds and len(builds) > 0:
        #print(f"Type of first build: {type(builds[0])}")
        
        # If you want to check the type of the buildjson field specifically
        #if 'buildjson' in builds[0]:
            #print(f"Type of buildjson: {type(builds[0]['buildjson'])}")
           # print(f"Output:\n{builds[0]['buildjson']}")
    
    # Still print the actual data too
    #print(f"new:\n\n{builds}")
    
    #TODO 









