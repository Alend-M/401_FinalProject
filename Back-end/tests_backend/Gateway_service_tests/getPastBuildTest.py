import unittest
from unittest.mock import patch, MagicMock
import json
import httpx
import asyncio

from Gateway_container.Gateway_service.forward_service import getPastBuilds, DATABASE_SERVICE_URL

class TestGetPastBuilds(unittest.TestCase):
    
    def setUp(self):
        self.loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self.loop)
    
    def tearDown(self):
        self.loop.close()
    
    def test_successful_request(self):
        async def run_test():
            mock_builds = [
                {"id": "build1", "name": "Gaming PC", "components": {"cpu": "Intel i7", "gpu": "RTX 3080"}},
                {"id": "build2", "name": "Workstation", "components": {"cpu": "AMD Ryzen 9", "gpu": "RTX 4090"}}
            ]

            mock_response = MagicMock()
            mock_response.raise_for_status = MagicMock()
            mock_response.json.return_value = mock_builds

            mock_client = MagicMock()
            mock_client.__aenter__.return_value.get.return_value = mock_response

            user_id = "user123"

            with patch('httpx.AsyncClient', return_value=mock_client):
                result = await getPastBuilds(user_id)

                mock_client.__aenter__.return_value.get.assert_called_once_with(
                    f"{DATABASE_SERVICE_URL}/past_builds/{user_id}",
                    timeout=5.0
                )

                self.assertEqual(result, mock_builds)

        self.loop.run_until_complete(run_test())

    def test_http_status_error(self):
        async def run_test():
            mock_response = MagicMock()
            mock_response.status_code = 404
            http_error = httpx.HTTPStatusError(
                "Not Found", 
                request=MagicMock(), 
                response=mock_response
            )

            mock_client = MagicMock()
            mock_client.__aenter__.return_value.get.side_effect = http_error

            user_id = "nonexistent_user"

            with patch('httpx.AsyncClient', return_value=mock_client):
                result = await getPastBuilds(user_id)

                self.assertIn("[X] error", result)
                self.assertIn("HTTP error: 404", result["[X] error"])

        self.loop.run_until_complete(run_test())

    def test_request_error(self):
        async def run_test():
            request_error = httpx.RequestError("Connection timeout", request=MagicMock())

            mock_client = MagicMock()
            mock_client.__aenter__.return_value.get.side_effect = request_error

            user_id = "user123"

            with patch('httpx.AsyncClient', return_value=mock_client):
                result = await getPastBuilds(user_id)

                self.assertIn("[X] error", result)
                self.assertIn("Request failed: Connection timeout", result["[X] error"])

        self.loop.run_until_complete(run_test())

if __name__ == '__main__':
    unittest.main()