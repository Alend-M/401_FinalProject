import unittest
from unittest.mock import patch, MagicMock
import json
import httpx
import asyncio
from fastapi import HTTPException

from Gateway_container.Gateway_service.forward_service import saveBuild, DATABASE_SERVICE_URL

class TestSaveBuild(unittest.TestCase):
    
    def setUp(self):
        self.loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self.loop)
    
    def tearDown(self):
        self.loop.close()
    
    def test_successful_save(self):
        async def run_test():
            mock_response_data = {"status": "success", "message": "Build saved successfully"}

            mock_response = MagicMock()
            mock_response.raise_for_status = MagicMock()
            mock_response.json.return_value = mock_response_data

            mock_client = MagicMock()
            mock_client.__aenter__.return_value.post.return_value = mock_response

            user_id = "user123"
            build_data = {
                "name": "Gaming PC",
                "budget": 1500,
                "components": {
                    "cpu": "AMD Ryzen 7 5800X",
                    "gpu": "NVIDIA RTX 3070",
                    "motherboard": "MSI B550 Tomahawk",
                    "ram": "32GB Corsair Vengeance RGB Pro",
                    "storage": "1TB Samsung 970 EVO Plus",
                    "case": "NZXT H510",
                    "psu": "Corsair RM750",
                    "cooling": "Noctua NH-D15"
                },
                "total_price": 1450.75
            }

            with patch('httpx.AsyncClient', return_value=mock_client):
                result = await saveBuild(user_id, build_data)

                mock_client.__aenter__.return_value.post.assert_called_once_with(
                    f"{DATABASE_SERVICE_URL}/save_build/{user_id}",
                    json=build_data
                )

                self.assertEqual(result, mock_response_data)

        self.loop.run_until_complete(run_test())

    def test_http_status_error(self):
        async def run_test():
            mock_response = MagicMock()
            mock_response.status_code = 400
            http_error = httpx.HTTPStatusError(
                "Bad Request", 
                request=MagicMock(), 
                response=mock_response
            )

            mock_client = MagicMock()
            mock_client.__aenter__.return_value.post.side_effect = http_error

            user_id = "user123"
            build_data = {
                "name": "Gaming PC",
                "components": {
                    "cpu": "AMD Ryzen 7 5800X",
                    "gpu": "NVIDIA RTX 3070"
                }
            }
            
            with patch('httpx.AsyncClient', return_value=mock_client):
                with self.assertRaises(HTTPException) as context:
                    await saveBuild(user_id, build_data)

                exception = context.exception
                self.assertEqual(exception.status_code, 400)
                self.assertIn("Bad Request", exception.detail)

        self.loop.run_until_complete(run_test())

    def test_request_error(self):
        async def run_test():
            request_error = httpx.RequestError("Connection timeout", request=MagicMock())

            mock_client = MagicMock()
            mock_client.__aenter__.return_value.post.side_effect = request_error

            user_id = "user123"
            build_data = {
                "name": "Gaming PC",
                "components": {
                    "cpu": "AMD Ryzen 7 5800X",
                    "gpu": "NVIDIA RTX 3070"
                }
            }

            with patch('httpx.AsyncClient', return_value=mock_client):
                with self.assertRaises(HTTPException) as context:
                    await saveBuild(user_id, build_data)

                exception = context.exception
                self.assertEqual(exception.status_code, 500)
                self.assertIn("Request failed: Connection timeout", exception.detail)

        self.loop.run_until_complete(run_test())

    def test_client_initialized_with_timeout(self):
        async def run_test():
            mock_response = MagicMock()
            mock_response.raise_for_status = MagicMock()
            mock_response.json.return_value = {"status": "success"}

            with patch('httpx.AsyncClient', autospec=True) as mock_client_class:

                mock_client_instance = MagicMock()
                mock_client_instance.__aenter__.return_value.post.return_value = mock_response
                mock_client_class.return_value = mock_client_instance

                await saveBuild("user123", {"name": "Test Build"})

                mock_client_class.assert_called_once_with(timeout=30)

        self.loop.run_until_complete(run_test())

if __name__ == '__main__':
    unittest.main()