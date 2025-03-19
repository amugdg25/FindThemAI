from flask import Blueprint, request, jsonify
from config.database import db
from models.missing_person import MissingPerson
import base64

missing_person_bp = Blueprint('missing_person_bp', __name__)

# ✅ Add a new missing person with image upload
@missing_person_bp.route('/missing-persons', methods=['POST'])
def add_missing_person():
    try:
        name = request.form.get("name")
        date_of_disappearance = request.form.get("date_of_disappearance")
        age = request.form.get("age")
        last_seen_location = request.form.get("last_seen_location")
        home_address = request.form.get("home_address")
        places_frequently_visited = request.form.get("places_frequently_visited")
        physical_description = request.form.get("physical_description")
        clothing_when_last_seen = request.form.get("clothing_when_last_seen")
        additional_notes = request.form.get("additional_notes")
        issuer_mobile_number = request.form.get("issuer_mobile_number")
        issuer_email_address = request.form.get("issuer_email_address")
        issuer_name = request.form.get("issuer_name")
        status = request.form.get("status")

        image_file = request.files.get("image")
        image_data = image_file.read() if image_file else None

        new_person = MissingPerson(
            name=name,
            date_of_disappearance=date_of_disappearance,
            age=age,
            last_seen_location=last_seen_location,
            home_address=home_address,
            places_frequently_visited=places_frequently_visited,
            physical_description=physical_description,
            clothing_when_last_seen=clothing_when_last_seen,
            additional_notes=additional_notes,
            issuer_mobile_number=issuer_mobile_number,
            issuer_email_address=issuer_email_address,
            issuer_name=issuer_name,
            status=status,
            images=image_data
        )

        db.session.add(new_person)
        db.session.commit()

        return jsonify({"message": "Missing person added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# ✅ Get all missing persons (without images)
@missing_person_bp.route('/missing-persons', methods=['GET'])
def get_all_missing_persons():
    try:
        persons = MissingPerson.query.all()
        person_list = []

        for person in persons:
            person_data = person.to_dict()
            
            # Convert image to Base64 if it exists
            if person.images:
                person_data["image"] = base64.b64encode(person.images).decode("utf-8")
            else:
                person_data["image"] = None

            person_list.append(person_data)
        return jsonify(person_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Get missing person by ID (returning image as base64)
@missing_person_bp.route('/missing-persons/<int:id>', methods=['GET'])
def get_missing_person(id):
    try:
        person = MissingPerson.query.get(id)
        if not person:
            return jsonify({"message": "Missing person not found"}), 404

        person_data = person.to_dict()

        # Convert image to base64 for easier frontend handling
        if person.images:
            person_data["image"] = base64.b64encode(person.images).decode("utf-8")

        return jsonify(person_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500