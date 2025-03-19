from pydantic import BaseModel
from typing import Optional

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
    age: Optional[int] = None
    last_seen_location: Optional[str] = None
    contact_info: Optional[str] = None

class MissingPersonResponse(BaseModel):
    id: int
    name: str
    age: Optional[int] = None
    last_seen_location: Optional[str] = None
    contact_info: Optional[str] = None
    image: Optional[str] = None  # This will hold the base64-encoded image

    class Config:
        from_attributes = True

# Missing Person Schema
class FoundPersonResponse(BaseModel):
    message: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    age: Optional[int] = None
    last_seen_location: Optional[str] = None
    contact_info: Optional[str] = None
    similarity_score: Optional[float] = None
    image: Optional[str] = None  # This will hold the base64-encoded image

    class Config:
        from_attributes = True