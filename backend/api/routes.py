from flask import Blueprint, request, jsonify
import numpy as np
import os
from PIL import Image
import io

from utils.model_loader import load_ml_model
from utils.preprocessing import preprocess_image

app = Blueprint("api", __name__)
model = load_ml_model()

# Class Labels
CLASS_NAMES = ["Bacteria", "Fungi", "Healthy", "Pests", "Virus"]

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Pathogen Classification API is running!"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No file provided"}), 400

        file = request.files["image"]
        image = Image.open(io.BytesIO(file.read())).convert("RGB")

        # Preprocess image
        image = preprocess_image(image)

        # Make prediction
        predictions = model.predict(image)
        confidence = predictions[0]

        return jsonify({
            "prediction": CLASS_NAMES,
            "confidence": confidence.tolist()
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
