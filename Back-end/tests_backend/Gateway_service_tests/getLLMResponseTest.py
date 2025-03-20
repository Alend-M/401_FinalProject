import unittest
import json
import httpx
from unittest.mock import AsyncMock, patch, MagicMock
from fastapi import HTTPException, Request
import asyncio

from Gateway_container.Gateway_service.forward_service import getLLMResponse, LLM_SERVICE_URL

class TestGetLLMResponse(unittest.TestCase):
    """Test cases for getLLMResponse function"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.sample_query_data = {
            "budget": 1000,
            "minFps": 56,
            "gamesList": ["Marvel Rivals", "Fortnite"],
            "displayResolution": "1080p",
            "graphicalQuality": "Ray-tracing",
            "preOwnedHardware": [
                {"type": "CPU", "name": "Intel Core-i7"},
                {"type": "GPU", "name": "RTX 3070"}
            ]
        }
        
        self.mock_request = MagicMock(spec=Request)
        self.mock_request.json = AsyncMock(return_value=self.sample_query_data)

    @patch('httpx.AsyncClient')
    async def async_test_get_llm_response_success(self, mock_async_client_class):
        """Async test for successful LLM response"""
        expected_response = {"build": "Sample PC Build"}
        
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = expected_response

        mock_response.raise_for_status = lambda: None
        

        mock_client_instance = AsyncMock()
        mock_client_instance.__aenter__.return_value = mock_client_instance
        mock_client_instance.__aexit__.return_value = None
        mock_client_instance.post.return_value = mock_response
        

        mock_async_client_class.return_value = mock_client_instance

        response = await getLLMResponse(self.mock_request)

        mock_client_instance.post.assert_called_once_with(
            f"{LLM_SERVICE_URL}/generate-text", 
            json=self.sample_query_data
        )
        
        self.assertEqual(response, expected_response)

    def test_get_llm_response_success(self):
        """Test wrapper for successful LLM response"""
        asyncio.run(self.async_test_get_llm_response_success())

    @patch('httpx.AsyncClient')
    async def async_test_get_llm_response_http_error(self, mock_async_client_class):
        """Async test for HTTP error handling"""

        mock_response = MagicMock()
        
        def raise_http_status_error():
            mock_error_response = MagicMock()
            mock_error_response.status_code = 404
            raise httpx.HTTPStatusError(
                "Error message", 
                request=MagicMock(), 
                response=mock_error_response
            )
        
        mock_response.raise_for_status = raise_http_status_error
        
        mock_client_instance = AsyncMock()
        mock_client_instance.__aenter__.return_value = mock_client_instance
        mock_client_instance.__aexit__.return_value = None
        mock_client_instance.post.return_value = mock_response
        
        mock_async_client_class.return_value = mock_client_instance
        
        with self.assertRaises(HTTPException) as context:
            await getLLMResponse(self.mock_request)
        
if __name__ == '__main__':
    unittest.main()