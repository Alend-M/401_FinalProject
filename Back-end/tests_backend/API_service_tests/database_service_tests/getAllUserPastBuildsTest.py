import unittest
from unittest.mock import patch, MagicMock

class TestGetAllUserPastBuilds(unittest.TestCase):
    @patch("API_container.API_service.database_service.init_supabase")
    def test_get_all_user_past_builds(self, mock_init_supabase):
        mock_client = MagicMock()
        mock_init_supabase.return_value = mock_client

        mock_response = MagicMock()
        mock_response.data = [
            {"build_id": 1, "cpu": "Intel Core i7-9700K", "gpu": "Nvidia RTX 3070"},
            {"build_id": 2, "cpu": "AMD Ryzen 5 5600X", "gpu": "Nvidia RTX 3060"}
        ]
        
        mock_client.table.return_value.select.return_value.eq.return_value.execute.return_value = mock_response
        
        from API_container.API_service.database_service import getAllUserPastBuilds

        user_id = "1234"
        result = getAllUserPastBuilds(user_id)

        self.assertEqual(len(result), 2)
        self.assertEqual(result[0]['cpu'], "Intel Core i7-9700K")
        self.assertEqual(result[1]['gpu'], "Nvidia RTX 3060")
        
        mock_client.table.assert_called_with("BuildHistory")
        mock_client.table.return_value.select.assert_called_with("*")
        mock_client.table.return_value.select.return_value.eq.assert_called_with("userid", user_id)
        
    @patch("API_container.API_service.database_service.init_supabase")
    def test_get_all_user_past_builds_empty(self, mock_init_supabase):
        mock_client = MagicMock()
        mock_init_supabase.return_value = mock_client

        mock_response = MagicMock()
        mock_response.data = []
        mock_client.table.return_value.select.return_value.eq.return_value.execute.return_value = mock_response
        
        from API_container.API_service.database_service import getAllUserPastBuilds

        user_id = "9999"
        result = getAllUserPastBuilds(user_id)
        
        self.assertEqual(result, [])

if __name__ == "__main__":
    unittest.main()
