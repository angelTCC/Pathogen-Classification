import tensorflow as tf
import os

# Load model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "best_model_trained.h5")
model = tf.keras.models.load_model(MODEL_PATH)
