import os
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'  # Disable GPU

from tensorflow.keras.models import load_model
import os

# Load model
MODEL_PATH = "./backend/models/best_model_trained.h5"

def load_ml_model():
    """Load and return the ML model (ensure it's loaded only once)."""
    global model
    if "model" not in globals():
        model = load_model(MODEL_PATH)
    return model

