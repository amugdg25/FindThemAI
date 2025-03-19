import cv2
import numpy as np

def detect_faces(image_bytes):
    # Convert the binary image to numpy array
    np_arr = np.frombuffer(image_bytes, np.uint8)
    image_np = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    if image_np is None:
        raise ValueError("Invalid image format")

    # Initialize the face detector (Haar cascade)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    # Convert the image to grayscale
    gray = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4)

    if len(faces) == 0:
        return None  # No faces detected

    # Return the detected faces and the original image
    return faces, image_np
