import unittest
from unittest.mock import patch, MagicMock
import json
import httpx
import asyncio

# Adjust the import according to your project structure
from Gateway_container.Gateway_service.forward_service import getPastBuilds, DATABASE_SERVICE_URL

class TestGetPastBuilds(unittest.TestCase):
    
    def setUp(self):
        # Set up event loop for each test
        self.loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self.loop)
    
    def tearDown(self):
        # Clean up after each test
        self.loop.close()
    
    def test_successful_request(self):
        async def run_test():
            # Mock response data
            mock_builds = [
                {"id": "build1", "name": "Gaming PC", "components": {"cpu": "Intel i7", "gpu": "RTX 3080"}},
                {"id": "build2", "name": "Workstation", "components": {"cpu": "AMD Ryzen 9", "gpu": "RTX 4090"}}
            ]
            
            # Create a mock response
            mock_response = MagicMock()
            mock_response.raise_for_status = MagicMock()
            mock_response.json.return_value = mock_builds
            
            # Mock the httpx.AsyncClient
            mock_client = MagicMock()
            mock_client.__aenter__.return_value.get.return_value = mock_response
            
            # Test user ID
            user_id = "user123"
            
            # Patch the AsyncClient to return our mock client
            with patch('httpx.AsyncClient', return_value=mock_client):
                # Call the function
                result = await getPastBuilds(user_id)
                
                # Verify the request was made correctly
                mock_client.__aenter__.return_value.get.assert_called_once_with(
                    f"{DATABASE_SERVICE_URL}/past_builds/{user_id}",
                    timeout=5.0
                )
                
                # Check that the result is as expected
                self.assertEqual(result, mock_builds)
        
        # Run the async test
        self.loop.run_until_complete(run_test())

    def test_http_status_error(self):
        async def run_test():
            # Create a mock HTTP error
            mock_response = MagicMock()
            mock_response.status_code = 404
            http_error = httpx.HTTPStatusError(
                "Not Found", 
                request=MagicMock(), 
                response=mock_response
            )
            
            # Mock client that raises an HTTPStatusError
            mock_client = MagicMock()
            mock_client.__aenter__.return_value.get.side_effect = http_error
            
            # Test user ID
            user_id = "nonexistent_user"
            
            # Patch the AsyncClient
            with patch('httpx.AsyncClient', return_value=mock_client):
                # Call the function
                result = await getPastBuilds(user_id)
                
                # Verify the error handling
                self.assertIn("[X] error", result)
                self.assertIn("HTTP error: 404", result["[X] error"])
        
        # Run the async test
        self.loop.run_until_complete(run_test())

    def test_request_error(self):
        async def run_test():
            # Create a mock request error
            request_error = httpx.RequestError("Connection timeout", request=MagicMock())
            
            # Mock client that raises a RequestError
            mock_client = MagicMock()
            mock_client.__aenter__.return_value.get.side_effect = request_error
            
            # Test user ID
            user_id = "user123"
            
            # Patch the AsyncClient
            with patch('httpx.AsyncClient', return_value=mock_client):
                # Call the function
                result = await getPastBuilds(user_id)
                
                # Verify the error handling
                self.assertIn("[X] error", result)
                self.assertIn("Request failed: Connection timeout", result["[X] error"])
        
        # Run the async test
        self.loop.run_until_complete(run_test())

if __name__ == '__main__':
    unittest.main()