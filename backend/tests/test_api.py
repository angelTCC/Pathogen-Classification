import unittest
import json
import os, sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app  # Import your Flask app

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    def test_predict_endpoint(self):
        """Test /predict endpoint with an image file"""
        image_path = "../../models_data/dataset/train/Bacteria/image_255.jpg"  # Update with an actual image path

        with open(image_path, "rb") as img:
            response = self.client.post("/predict", data={"image": img})
        
        print("Response Status Code:", response.status_code)
        print("Response Data:", response.data.decode())  # Show response details
        
        self.assertEqual(response.status_code, 200)  # Expect 200 if successful

if __name__ == "__main__":
    unittest.main()