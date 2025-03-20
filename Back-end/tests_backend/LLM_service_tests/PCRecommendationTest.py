import json
import os
import unittest
from unittest.mock import patch, MagicMock
from LLM_container.LLM_service.llm_service import initAI, getPcRecommendation

class TestPcRecommendation(unittest.IsolatedAsyncioTestCase):
    
    @patch("LLM_container.LLM_service.llm_service.genai.configure")
    @patch("LLM_container.LLM_service.llm_service.genai.GenerativeModel")
    def test_initAI(self, mock_GenerativeModel, mock_configure):
        """Test that initAI initializes the AI model correctly."""
        initAI()
        mock_configure.assert_called_once_with(api_key=os.getenv("API_KEY"))
        mock_GenerativeModel.assert_called_once_with("gemini-2.0-flash")

    @patch("LLM_container.LLM_service.llm_service.initAI")
    @patch("LLM_container.LLM_service.llm_service.model")
    async def test_getPcRecommendation(self, mock_model, mock_initAI):
        """Test getPcRecommendation with a mock AI response."""
        mock_model.generate_content.return_value.text = json.dumps({
            "CPUs": {
                "name": "Intel Core i9-14900K",
                "price_CAD": "$433",
                "Justification": "Best CPU for gaming."
            }
        })
        
        pc_requirements = {
            "budget": 1000,
            "minFps": 56,
            "gamesList": ["Marvel Rivals", "Fortnite"],
            "displayResolution": "1080p",
            "graphicalQuality": "Ray-tracing",
            "preOwnedHardware": [
                { "type": "CPU", "name": "Intel Core-i7" },
                { "type": "GPU", "name": "RTX 3070" }
            ]
        }
        
        result = await getPcRecommendation(pc_requirements)
        self.assertIn("CPUs", result)
        self.assertEqual(result["CPUs"]["name"], "Intel Core i9-14900K")
        self.assertEqual(result["CPUs"]["price_CAD"], "$433")
        self.assertEqual(result["CPUs"]["Justification"], "Best CPU for gaming.")
        self.assertIn("input", result)
        self.assertEqual(result["input"], pc_requirements)

    @patch("LLM_container.LLM_service.llm_service.model")
    async def test_getPcRecommendation_bad_response(self, mock_model):
        """Test getPcRecommendation handles a bad AI response."""
        mock_model.generate_content.return_value.text = "Invalid JSON response"
        
        result = await getPcRecommendation({"budget": 1000})
        self.assertIn("error", result)
        self.assertEqual(result["error"], "bad response")

if __name__ == "__main__":
    unittest.main()
