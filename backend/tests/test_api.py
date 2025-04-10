import os

class TestPredictEndpoint:
    image_path = "./backend/tests/test_img.jpg"

    def test_valid_image(self, client):
        assert os.path.exists(self.image_path), "Test image not found"

        with open(self.image_path, "rb") as img:
            response = client.post("/predict", data={"image": img})

        assert response.status_code == 200
        assert b"prediction" in response.data.lower() or b"result" in response.data.lower()

    def test_missing_file(self, client):
        response = client.post("/predict", data={})
        assert response.status_code in (400, 422)
        assert b"error" in response.data.lower()