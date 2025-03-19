import cv2
import numpy as np
import tensorflow as tf
from keras_facenet import FaceNet
import os

# Load FaceNet model
embedder = FaceNet()

print("FaceNet model loaded successfully!")

def preprocess_image(image_path):
    """Loads an image, detects faces, and extracts embeddings."""
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Detect and extract face embeddings
    embeddings = embedder.embeddings([img])
    
    return embeddings[0] if embeddings is not None else None

def match_face(uploaded_embedding, stored_embeddings, threshold=0.5):
    """
    Compares the uploaded face embedding with stored embeddings.
    Returns best match if below the threshold.
    """
    best_match = None
    min_distance = float("inf")

    for stored_name, stored_embedding in stored_embeddings.items():
        distance = np.linalg.norm(uploaded_embedding - stored_embedding)
        if distance < min_distance and distance < threshold:
            min_distance = distance
            best_match = stored_name

    return best_match if best_match else "No match found"

def load_known_faces(directory):
    """Load and process all images from the given directory"""
    stored_faces = {}
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            filepath = os.path.join(directory, filename)
            embedding = preprocess_image(filepath)
            if embedding is not None:
                stored_faces[filename] = embedding
    return stored_faces