import unittest
import json
from unittest.mock import patch, AsyncMock
import httpx
from fastapi import HTTPException

from Gateway_container.Gateway_service.forward_service import sendEmail, DATABASE_SERVICE_URL

class TestSendEmail(unittest.TestCase):
    @patch('email_service.httpx.AsyncClient')
    async def test_successful_email_send(self, mock_client):

        mock_query = AsyncMock()
        query_data = {
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "Test Message"
        }
        mock_query.json.return_value = query_data
        
        expected_response = {"status": "success", "message": "Email sent successfully"}

        mock_client_instance = AsyncMock()
        mock_client.return_value.__aenter__.return_value = mock_client_instance
        
        mock_response = AsyncMock()
        mock_response.json.return_value = expected_response
        mock_response.raise_for_status = AsyncMock()
        
        mock_client_instance.post.return_value = mock_response

        result = await sendEmail(mock_query)
        
        mock_client_instance.post.assert_called_once_with(
            f"{DATABASE_SERVICE_URL}/send-email",
            json=query_data
        )
        self.assertEqual(result, expected_response)
    
    @patch('email_service.httpx.AsyncClient')
    async def test_http_status_error(self, mock_client):

        mock_query = AsyncMock()
        query_data = {
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "Test Message"
        }
        mock_query.json.return_value = query_data

        mock_client_instance = AsyncMock()
        mock_client.return_value.__aenter__.return_value = mock_client_instance
        
        mock_response = AsyncMock()
        mock_response.raise_for_status.side_effect = httpx.HTTPStatusError(
            "400 Bad Request", 
            request=AsyncMock(), 
            response=AsyncMock(status_code=400)
        )
        
        mock_client_instance.post.return_value = mock_response

        with self.assertRaises(HTTPException) as context:
            await sendEmail(mock_query)
        
        self.assertEqual(context.exception.status_code, 400)
    
    @patch('email_service.httpx.AsyncClient')
    async def test_request_error(self, mock_client):

        mock_query = AsyncMock()
        query_data = {
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "Test Message"
        }
        mock_query.json.return_value = query_data

        mock_client_instance = AsyncMock()
        mock_client.return_value.__aenter__.return_value = mock_client_instance
        
        mock_client_instance.post.side_effect = httpx.RequestError("Connection timeout", request=AsyncMock())

        with self.assertRaises(HTTPException) as context:
            await sendEmail(mock_query)
        
        self.assertEqual(context.exception.status_code, 500)
        self.assertIn("Connection timeout", str(context.exception.detail))

if __name__ == '__main__':
    unittest.main()