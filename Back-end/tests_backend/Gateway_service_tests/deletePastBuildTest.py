import unittest
import json
from unittest.mock import patch, AsyncMock
from fastapi import HTTPException
import httpx

from Gateway_container.Gateway_service.forward_service import deletePastBuild, DATABASE_SERVICE_URL

class TestDeletePastBuild(unittest.TestCase):
    @patch('build_service.httpx.AsyncClient')
    async def test_successful_delete(self, mock_client):
        build_id = 123
        expected_response = {"status": "success", "message": "Build deleted successfully"}

        mock_client_instance = AsyncMock()
        mock_client.return_value.__aenter__.return_value = mock_client_instance
        
        mock_response = AsyncMock()
        mock_response.json.return_value = expected_response
        mock_response.raise_for_status = AsyncMock()
        
        mock_client_instance.delete.return_value = mock_response
        
        result = await deletePastBuild(build_id)

        mock_client_instance.delete.assert_called_once_with(
            f"{DATABASE_SERVICE_URL}/delete_build/{build_id}",
            timeout=20.0
        )
        self.assertEqual(result, expected_response)
    
    @patch('build_service.httpx.AsyncClient')
    async def test_http_status_error(self, mock_client):

        build_id = 123

        mock_client_instance = AsyncMock()
        mock_client.return_value.__aenter__.return_value = mock_client_instance
        
        mock_response = AsyncMock()
        mock_response.raise_for_status.side_effect = httpx.HTTPStatusError(
            "404 Not Found", 
            request=AsyncMock(), 
            response=AsyncMock(status_code=404)
        )
        
        mock_client_instance.delete.return_value = mock_response

        with self.assertRaises(HTTPException) as context:
            await deletePastBuild(build_id)
        
        self.assertEqual(context.exception.status_code, 404)
    
    @patch('build_service.httpx.AsyncClient')
    async def test_request_error(self, mock_client):

        build_id = 123
        
        mock_client_instance = AsyncMock()
        mock_client.return_value.__aenter__.return_value = mock_client_instance
        
        mock_client_instance.delete.side_effect = httpx.RequestError("Connection timeout", request=AsyncMock())
        
        with self.assertRaises(HTTPException) as context:
            await deletePastBuild(build_id)
        
        self.assertEqual(context.exception.status_code, 500)
        self.assertIn("Connection timeout", str(context.exception.detail))

if __name__ == '__main__':
    unittest.main()