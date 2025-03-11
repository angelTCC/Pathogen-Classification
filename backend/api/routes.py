from flask import Blueprint, request, jsonify
import numpy as np
import os
from PIL import Image
import io

from models.model_loader import model
from utils.preprocessing import preprocess_image

app = Blueprint("api", __name__)

# Class Labels
CLASS_NAMES = ["Bacteria", "Fungi", "Healthy", "Pests", "Virus"]

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Pathogen Classification API is running!"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file provided"}), 400

        file = request.files["file"]
        image = Image.open(io.BytesIO(file.read())).convert("RGB")

        # Preprocess image
        image = preprocess_image(image)

        # Make prediction
        predictions = model.predict(image)
        predicted_class = CLASS_NAMES[np.argmax(predictions)]
        confidence = float(np.max(predictions))

        return jsonify({
            "prediction": predicted_class,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
