import unittest
from unittest.mock import patch, MagicMock, AsyncMock
import json
import httpx
import asyncio
from fastapi import HTTPException, Request

from Gateway_container.Gateway_service.forward_service import getLLMResponse, LLM_SERVICE_URL

class TestGetLLMResponse(unittest.TestCase):
    """Test cases for getLLMResponse function"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self.loop)

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
    
    def tearDown(self):
        """Clean up after each test"""
        self.loop.close()
    
    def test_get_llm_response_success(self):
        """Test for successful LLM response"""
        async def run_test():

            expected_response = {"build": "Sample PC Build"}
            

            mock_response = MagicMock()
            mock_response.raise_for_status = MagicMock()
            mock_response.json.return_value = expected_response

            mock_client = MagicMock()
            mock_client.__aenter__.return_value.post.return_value = mock_response
            
            with patch('httpx.AsyncClient', return_value=mock_client):
                response = await getLLMResponse(self.mock_request)

                mock_client.__aenter__.return_value.post.assert_called_once_with(
                    f"{LLM_SERVICE_URL}/generate-text",
                    json=self.sample_query_data
                )
                
                self.assertEqual(response, expected_response)
        
        # Run the async test
        self.loop.run_until_complete(run_test())

    def test_get_llm_response_http_error(self):
        """Test for HTTP error handling"""
        async def run_test():

            mock_response = MagicMock()
            mock_response.status_code = 404
            http_error = httpx.HTTPStatusError(
                "Error message", 
                request=MagicMock(), 
                response=mock_response
            )

            mock_client = MagicMock()
            mock_client.__aenter__.return_value.post.return_value = mock_response

            mock_response.raise_for_status.side_effect = http_error

            with patch('httpx.AsyncClient', return_value=mock_client):
                with self.assertRaises(HTTPException):
                    await getLLMResponse(self.mock_request)

        self.loop.run_until_complete(run_test())

    def test_get_llm_response_request_error(self):
        """Test for request error handling"""
        async def run_test():
            request_error = httpx.RequestError("Connection error", request=MagicMock())
            
            mock_client = MagicMock()
            mock_client.__aenter__.return_value.post.side_effect = request_error

            with patch('httpx.AsyncClient', return_value=mock_client):
                with self.assertRaises(HTTPException):
                    await getLLMResponse(self.mock_request)

        self.loop.run_until_complete(run_test())

if __name__ == '__main__':
    unittest.main()