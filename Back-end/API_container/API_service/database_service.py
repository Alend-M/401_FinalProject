# This file is used to create methods to fetch data from the database in supabase
import supabase 
from dotenv import load_dotenv
import os 
import json
import yagmail

# Load the environment variables for supabase instance to be used correctly
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
EMAILADDRESS = os.getenv("EMAILADDRESS")
EMAILPASSWORD = os.getenv("EMAILPASSWORD")

globalSupabaseClient = None 

def init_supabase() -> supabase.Client:
    """
    Initializes the Supabase client with the environment variables using singleton pattern
    
    Returns
    -------
    supabase.Client
        The Supabase client instance
    """
    global globalSupabaseClient

    if globalSupabaseClient is None:
        globalSupabaseClient = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)
    
    return globalSupabaseClient


def getAllUserPastBuilds(user_id: str) -> list:
    """
    Retrieves all past PC builds based on the user ID

    Parameters
    ----------
    user_id : str
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
    supabaseClient = init_supabase()
    try:
        response = supabaseClient.table("BuildHistory").select("buildjson").eq("userid", user_id).execute()
        data = response.data
        
        if not data:
            print("No builds found for user: ", user_id)
            return []
        
        return data
        
    except Exception as e:
        print(f"Error fetching builds: {e}")
        return []
    
    
async def saveLLMResponse(user_id: str, LLMResponse: dict) -> int:
    """
    Saves the LLM response to the database for the user"
    
    Parameters
    ----------
    user_id : str
        The user ID whose build is being saved.
    LLMResponse : dict
        The LLM response to be saved.
    
    Returns
    -------
    int
        The build ID of the saved build or -1 if the build was not saved.
        >>> 1
    """
    
    supabaseClient = init_supabase()
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
        return None

async def deleteBuild(build_id: int) -> int:
    """
    Removes the build specified in by build_id from the database
    
    Parameters
    ----------
    build_id: int
        build id for build to be deleted
    
    Returns
    -------
    int
        The build ID of the deleted build or -1 if the build was not deleted.
        >>> 1
    """
    supabaseClient = init_supabase()

    try:
        response = supabaseClient.table("BuildHistory").delete().eq("buildid", build_id).execute()
        print(response)
        return response.data

    except Exception as e:
        print(f"Error deleting build: {e}")
        return None




def sendEmailToDevelopers(promptJSON: dict) -> dict:
    """
    Sends an email to the developers with the user's message.

    Parameters
    ----------
    promptJSON : dict
        The JSON object containing the user's message and contact details.

    Returns
    -------
    dict
        A dictionary containing the status of the email sending process.
        >>> {"message": "Email sent"}
    """

    sender_email = EMAILADDRESS
    app_password = EMAILPASSWORD
    recipient_email = EMAILADDRESS

    body = f"""
From: {promptJSON.get("name", "Unknown")} {promptJSON.get("surname", "")}
Email: {promptJSON.get("email", "Unknown")}

Message:
{promptJSON.get("message", "No message provided")}
"""

    try:
        yag = yagmail.SMTP(sender_email, app_password)
        yag.send(to=recipient_email, subject=f"New Message from {promptJSON.get('name', 'Unknown')} {promptJSON.get('surname','')}", contents=body)
        return {"success":"Message sent successfully!"}
    except Exception as e:
        return {"error": str(e)}


    
# makes it so you need to import it to run the code
if __name__ == "__main__":
  pass









