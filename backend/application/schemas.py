from pydantic import BaseModel
from typing import Optional

# User Schema
class UserCreate(BaseModel):
    name: str
    email: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True

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

    class Config:
        from_attributes = True
