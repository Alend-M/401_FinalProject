import unittest
from unittest.mock import patch, MagicMock
import os
from dotenv import load_dotenv

# Import the function to test
from API_container.API_service.email_service import sendEmailToDevelopers

class TestSendEmailToDevelopers(unittest.TestCase):
    
    @patch('API_container.API_service.email_service.EMAILADDRESS', 'test@example.com')
    @patch('API_container.API_service.email_service.EMAILPASSWORD', 'testpassword')
    @patch('yagmail.SMTP')
    def test_successful_email_sending(self, mock_smtp):
        mock_yag_instance = MagicMock()
        mock_smtp.return_value = mock_yag_instance
        
        test_data = {
            "name": "John",
            "surname": "Doe",
            "email": "john.doe@example.com",
            "message": "This is a test message"
        }
        
        result = sendEmailToDevelopers(test_data)
        
        self.assertEqual(result, {"success": "Message sent successfully!"})
        
        mock_smtp.assert_called_once_with('test@example.com', 'testpassword')
        
        mock_yag_instance.send.assert_called_once()
        call_args = mock_yag_instance.send.call_args[1]
        self.assertEqual(call_args["to"], 'test@example.com')
        self.assertEqual(call_args["subject"], "New Message from John Doe")
        self.assertIn("From: John Doe", call_args["contents"])
        self.assertIn("Email: john.doe@example.com", call_args["contents"])
        self.assertIn("Message:\nThis is a test message", call_args["contents"])

    @patch('API_container.API_service.email_service.EMAILADDRESS', 'test@example.com')
    @patch('API_container.API_service.email_service.EMAILPASSWORD', 'testpassword')
    @patch('yagmail.SMTP')
    def test_email_with_missing_fields(self, mock_smtp):
        mock_yag_instance = MagicMock()
        mock_smtp.return_value = mock_yag_instance
        
        test_data = {
            "message": "Just a message without personal details"
        }
        
        result = sendEmailToDevelopers(test_data)
        
        self.assertEqual(result, {"success": "Message sent successfully!"})
        mock_smtp.assert_called_once()
        
        call_args = mock_yag_instance.send.call_args[1]
        self.assertIn("From: Unknown ", call_args["contents"])
        self.assertIn("Email: Unknown", call_args["contents"])
        self.assertIn("Message:\nJust a message without personal details", call_args["contents"])

    @patch('API_container.API_service.email_service.EMAILADDRESS', 'test@example.com')
    @patch('API_container.API_service.email_service.EMAILPASSWORD', 'testpassword')
    @patch('yagmail.SMTP')
    def test_exception_handling(self, mock_smtp):
        mock_smtp.side_effect = Exception("Connection error")
        
        test_data = {
            "name": "Jane",
            "email": "jane@example.com",
            "message": "This should fail"
        }
        
        result = sendEmailToDevelopers(test_data)
        
        self.assertIn("error", result)
        self.assertEqual(result["error"], "Connection error")

if __name__ == '__main__':
    unittest.main()