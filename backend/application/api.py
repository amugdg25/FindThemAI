from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form, File
from sqlalchemy.orm import Session
from fastapi.responses import Response
from typing import List
from application import models, schemas, crud
from application.database import get_db

# Create an API router
router = APIRouter()

### Root endpoint ###
@router.get("/")
def read_root():
    return {"message": " Welcome to AI Missing Person Identification"}

### USER ENDPOINTS ###
@router.post("/users/")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = crud.create_user(db, user)
    if not new_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return {"message": "User created successfully", "id": new_user.id}

@router.get("/users/{user_id}", response_model=schemas.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/users/", response_model=List[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

### MISSING PERSON ENDPOINTS ###
@router.post("/missing-persons/")
async def create_missing_person(
    name: str = Form(...),
    age: int = Form(None),
    last_seen_location: str = Form(None),
    contact_info: str = Form(None),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    image_data = await image.read()
    new_person = schemas.MissingPersonCreate(
        name=name, age=age, last_seen_location=last_seen_location, contact_info=contact_info
    )
    created_person = crud.create_missing_person(db, new_person, image_data)
    return {"message": "Missing person entry created successfully", "id": created_person.id}

@router.get("/missing-persons/{person_id}/", response_model=schemas.MissingPersonResponse)
def get_missing_person_info(person_id: int, db: Session = Depends(get_db)):
    person = crud.get_missing_person(db, person_id)
    if not person:
        raise HTTPException(status_code=404, detail="Person not found")
    return person

@router.get("/missing-persons/{person_id}/image")
def get_missing_person_image(person_id: int, db: Session = Depends(get_db)):
    person = crud.get_missing_person(db, person_id)
    if not person or not person.image:
        raise HTTPException(status_code=404, detail="Image not found")
    return Response(content=person.image, media_type="image/jpeg")

@router.get("/missing-persons/", response_model=List[schemas.MissingPersonResponse])
def get_missing_persons(db: Session = Depends(get_db)):
    return crud.get_missing_persons(db)


### FOUND PERSON ENDPOINTS ###
@router.get("/found-person/")
def get_found_person_info(db: Session = Depends(get_db)):

    # To be implemented

    return {"message": "To be Implemented"}