from sqlalchemy.orm import Session
from application import models, schemas, auth
from application.face_detection import detect_faces
from application.face_recognition import get_face_embedding
import numpy as np

### USER CRUD OPERATIONS ###
def create_user(db: Session, user: schemas.UserCreate):    
    hashed_password = auth.hash_password(user.password)
    new_user = models.User(username=user.username, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user or not auth.verify_password(password, user.password):
        return None
    return user

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_users(db: Session):
    return db.query(models.User).all()


### MISSING PERSON CRUD OPERATIONS ###
def create_missing_person(db: Session, person: schemas.MissingPersonCreate, image_data: bytes):
    try:
        # Detect faces in the provided image
        faces, image_np = detect_faces(image_data)
        
        if faces is None or len(faces) == 0:
            raise ValueError("No faces detected in the image.")

        # For simplicity, process only the first detected face
        (x, y, w, h) = faces[0]
        face_pixels = image_np[y:y+h, x:x+w]  # Extract the face region

        # Get embedding of the detected face
        embedding = get_face_embedding(face_pixels)
        embedding = embedding.tolist()  # Convert NumPy array to list

        # Create a new MissingPerson record
        new_person = models.MissingPerson(
            name=person.name,
            date_of_disappearance=person.date_of_disappearance,
            age=person.age,
            last_seen_location=person.last_seen_location,
            home_address=person.home_address,
            places_frequently_visited=person.places_frequently_visited,
            physical_description=person.physical_description,
            clothing_when_last_seen=person.clothing_when_last_seen,
            additional_notes=person.additional_notes,
            issuer_mobile_number=person.issuer_mobile_number,
            issuer_email_address=person.issuer_email_address,
            issuer_name=person.issuer_name,
            status=person.status,
            image=image_data,
            embedding=embedding
        )
        
        # Add the new person to the database and commit the transaction
        db.add(new_person)
        db.commit()
        db.refresh(new_person)

        return new_person

    except ValueError as e:
        # Handle specific error (like no faces detected)
        print(f"Error: {str(e)}")
        return None

    except Exception as e:
        # General exception handling (for any other errors)
        print(f"Unexpected error occurred: {str(e)}")
        return None
    
def delete_missing_person(db: Session, person_id: int):
    person = db.query(models.MissingPerson).filter(models.MissingPerson.id == person_id).first()
    if not person:
        return False  # Not found
    db.delete(person)
    db.commit()
    return True  # Successfully deleted

def get_missing_person(db: Session, person_id: int):
    return db.query(models.MissingPerson).filter(models.MissingPerson.id == person_id).first()

def get_missing_persons(db: Session):
    return db.query(models.MissingPerson).all()


### MATCH FACE CRUD OPERATION ###
def match_face(db: Session, embedding_query):
    pass
    # for cosine similarity using pgvector