from pydantic import BaseModel
from typing import Optional
from datetime import date

# User Schema
class UserCreate(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Missing Person Schema
class MissingPersonCreate(BaseModel):
    name: str
    date_of_disappearance: date
    age: int
    last_seen_location: str
    home_address: Optional[str] = None
    places_frequently_visited: Optional[str] = None
    physical_description: Optional[str] = None
    clothing_when_last_seen: Optional[str] = None
    additional_notes: Optional[str] = None
    issuer_mobile_number: str
    issuer_email_address: str
    issuer_name: str
    status: Optional[str] = None
    
class MissingPersonResponse(BaseModel):
    id: int
    name: str
    date_of_disappearance: date
    age: int
    last_seen_location: str
    home_address: Optional[str] = None
    places_frequently_visited: Optional[str] = None
    physical_description: Optional[str] = None
    clothing_when_last_seen: Optional[str] = None
    additional_notes: Optional[str] = None
    issuer_mobile_number: str
    issuer_email_address: str
    issuer_name: str
    status: Optional[str] = None
    image: Optional[str] = None  # Base64-encoded image

    class Config:
        from_attributes = True

# Missing Person Schema
class FoundPersonResponse(BaseModel):
    message: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    age: Optional[int] = None
    last_seen_location: Optional[str] = None
    issuer_name: str
    issuer_mobile_number: str
    issuer_email_address: str
    contact_info: Optional[str] = None
    similarity_score: Optional[float] = None
    image: Optional[str] = None  # This will hold the base64-encoded image

    class Config:
        from_attributes = True