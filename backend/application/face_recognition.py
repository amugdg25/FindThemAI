import tensorflow as tf
import numpy as np
import cv2
from application.settings import settings

# Load the FaceNet model
MODEL_PATH = settings.MODEL_PATH

def load_model():
    """
    Loads the FaceNet model from a pre-trained `.pb` file.
    
    :return: TensorFlow computation graph.
    """
    print("Loading FaceNet model...")
    with tf.io.gfile.GFile(MODEL_PATH, "rb") as f:
        graph_def = tf.compat.v1.GraphDef()
        graph_def.ParseFromString(f.read())

    with tf.compat.v1.Graph().as_default() as graph:
        tf.import_graph_def(graph_def, name="")
    return graph

# Load the model once and reuse it
graph = load_model()

# Create a TensorFlow session
sess = tf.compat.v1.Session(graph=graph)

# Extract input and output tensors
input_tensor = graph.get_tensor_by_name("input:0")
embedding_tensor = graph.get_tensor_by_name("embeddings:0")
phase_train_tensor = graph.get_tensor_by_name("phase_train:0")

def preprocess_face(face_pixels):
    """
    Preprocess the face image for FaceNet: 
    - Resize to 160x160
    - Convert to float32
    - Normalize pixel values to (-1, 1)
    
    :param face_pixels: Extracted face image.
    :return: Preprocessed image as a NumPy array.
    """
    face_pixels = cv2.resize(face_pixels, (160, 160))
    face_pixels = face_pixels.astype(np.float32)
    face_pixels = (face_pixels - 127.5) / 127.5  # Normalize to (-1, 1)
    return np.expand_dims(face_pixels, axis=0)  # Add batch dimension

def get_face_embedding(face_pixels):
    """
    Extract 512D face embedding using FaceNet.
    
    :param face_pixels: Preprocessed face image.
    :return: 512-dimensional face embedding.
    """
    preprocessed_face = preprocess_face(face_pixels)

    # Run the model to get the embedding
    embedding = sess.run(embedding_tensor, feed_dict={
        input_tensor: preprocessed_face,
        phase_train_tensor: False
    })

    return embedding[0]  # Return the first (and only) embedding
