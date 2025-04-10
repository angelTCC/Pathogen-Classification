import numpy as np

def preprocess_image(image):
    image = image.resize((256, 256))  # Resize image
    image = np.array(image) / 255.0   # Normalize
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image
