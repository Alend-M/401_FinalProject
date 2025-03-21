import unittest
from unittest.mock import patch, MagicMock
import asyncio

class TestSaveLLMResponse(unittest.TestCase):
    @patch("API_container.API_service.database_service.init_supabase")
    def test_save_llm_response_success(self, mock_init_supabase):
        mock_client = MagicMock()
        mock_init_supabase.return_value = mock_client

        mock_response = MagicMock()
        mock_response.data = [{"buildid": 1}]
        mock_client.table.return_value.insert.return_value.execute.return_value = mock_response

        user_id = "1234"
        LLMResponse = {"cpu": "Intel Core i9", "gpu": "Nvidia RTX 4090"}
        
        from API_container.API_service.database_service import saveLLMResponse
        
        result = asyncio.run(saveLLMResponse(user_id, LLMResponse))
        
        self.assertEqual(result, 1)
        mock_client.table.assert_called_with("BuildHistory")
        mock_client.table.return_value.insert.assert_called_with({"userid": user_id, "buildjson": LLMResponse})

    @patch("API_container.API_service.database_service.init_supabase")
    def test_save_llm_response_failure(self, mock_init_supabase):
        mock_client = MagicMock()
        mock_init_supabase.return_value = mock_client

        mock_response = MagicMock()
        mock_response.data = []
        mock_client.table.return_value.insert.return_value.execute.return_value = mock_response

        user_id = "5678"
        LLMResponse = {"cpu": "AMD Ryzen 9", "gpu": "AMD Radeon 7900 XTX"}
        
        from API_container.API_service.database_service import saveLLMResponse
        
        result = asyncio.run(saveLLMResponse(user_id, LLMResponse))
        
        self.assertEqual(result, -1)

    @patch("API_container.API_service.database_service.init_supabase")
    def test_save_llm_response_exception(self, mock_init_supabase):
        mock_client = MagicMock()
        mock_init_supabase.return_value = mock_client
        mock_client.table.return_value.insert.return_value.execute.side_effect = Exception("Database error")

        user_id = "91011"
        LLMResponse = {"cpu": "Intel Xeon", "gpu": "Quadro RTX 8000"}
        
        from API_container.API_service.database_service import saveLLMResponse
        
        result = asyncio.run(saveLLMResponse(user_id, LLMResponse))
        
        self.assertIsNone(result)

if __name__ == "__main__":
    unittest.main()
