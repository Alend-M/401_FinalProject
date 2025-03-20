import unittest
from unittest.mock import patch, MagicMock
import asyncio

class TestDatabaseFunctions(unittest.TestCase):
    @patch("API_container.API_service.database_service.init_supabase")
    def test_delete_build_success(self, mock_init_supabase):
        mock_client = MagicMock()
        mock_init_supabase.return_value = mock_client

        mock_response = MagicMock()
        mock_response.data = [{"buildid": 1}]
        mock_client.table.return_value.delete.return_value.eq.return_value.execute.return_value = mock_response
        
        from API_container.API_service.database_service import deleteBuild

        build_id = 1
        result = asyncio.run(deleteBuild(build_id))
        
        self.assertEqual(result, [{"buildid": 1}])

    @patch("API_container.API_service.database_service.init_supabase")
    def test_delete_build_failure(self, mock_init_supabase):
        mock_client = MagicMock()
        mock_init_supabase.return_value = mock_client

        mock_response = MagicMock()
        mock_response.data = []
        mock_client.table.return_value.delete.return_value.eq.return_value.execute.return_value = mock_response
        
        from API_container.API_service.database_service import deleteBuild

        build_id = 2
        result = asyncio.run(deleteBuild(build_id))
        
        self.assertEqual(result, [])

    @patch("API_container.API_service.database_service.init_supabase")
    def test_delete_build_exception(self, mock_init_supabase):
        mock_client = MagicMock()
        mock_init_supabase.return_value = mock_client
        mock_client.table.return_value.delete.return_value.eq.return_value.execute.side_effect = Exception("Database error")
        
        from API_container.API_service.database_service import deleteBuild

        build_id = 3
        result = asyncio.run(deleteBuild(build_id))
        
        self.assertIsNone(result)

if __name__ == "__main__":
    unittest.main()
