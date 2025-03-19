from sqlalchemy.orm import Session
from application import models, schemas

### USER CRUD OPERATIONS ###
def create_user(db: Session, user: schemas.UserCreate):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        return None  # Email already exists
    new_user = models.User(name=user.name, email=user.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_users(db: Session):
    return db.query(models.User).all()

### MISSING PERSON CRUD OPERATIONS ###
def create_missing_person(db: Session, person: schemas.MissingPersonCreate, image_data: bytes):
    new_person = models.MissingPerson(
        name=person.name,
        age=person.age,
        last_seen_location=person.last_seen_location,
        contact_info=person.contact_info,
        image=image_data,
    )
    db.add(new_person)
    db.commit()
    db.refresh(new_person)
    return new_person

def get_missing_person(db: Session, person_id: int):
    return db.query(models.MissingPerson).filter(models.MissingPerson.id == person_id).first()

def get_missing_persons(db: Session):
    return db.query(models.MissingPerson).all()
