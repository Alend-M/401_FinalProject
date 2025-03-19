from dotenv import load_dotenv
import os 
import yagmail

# Load the environment variables for supabase instance to be used correctly
load_dotenv()
EMAILADDRESS = os.getenv("EMAILADDRESS")
EMAILPASSWORD = os.getenv("EMAILPASSWORD")

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

