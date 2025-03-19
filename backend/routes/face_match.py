from flask import Blueprint, request, jsonify
import os
from models.face_recognition import preprocess_image, match_face, load_known_faces

face_match_bp = Blueprint("face_match", __name__)

# Load all stored faces at startup
KNOWN_FACES_DIR = "static/known_faces/"
stored_faces = load_known_faces(KNOWN_FACES_DIR)

@face_match_bp.route('/face_match', methods=['POST'])
def face_match():
    """Handles image upload and matches against database."""
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    file_path = os.path.join("static/uploads", file.filename)
    file.save(file_path)
    
    uploaded_embedding = preprocess_image(file_path)
    
    if uploaded_embedding is None:
        return jsonify({"error": "No face detected"}), 400
    
    match_result = match_face(uploaded_embedding, stored_faces)
    
    return jsonify({"match": match_result})
