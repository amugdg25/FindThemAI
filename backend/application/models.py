from sqlalchemy import Column, Integer, String, LargeBinary, Date, Text
from application.database import Base
from pgvector.sqlalchemy import Vector

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

class MissingPerson(Base):
    __tablename__ = "missing_persons"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    date_of_disappearance = Column(Date, nullable=False)
    age = Column(Integer, nullable=False)
    last_seen_location = Column(String(255), nullable=False)
    home_address = Column(String(255))
    places_frequently_visited = Column(Text)
    physical_description = Column(Text)
    clothing_when_last_seen = Column(Text)
    additional_notes = Column(Text)
    issuer_mobile_number = Column(String(20), nullable=False)
    issuer_email_address = Column(String(100), nullable=False)
    issuer_name = Column(String(100), nullable=False)
    status = Column(String(20), nullable=True)
    image = Column(LargeBinary)
    embedding = Column(Vector(512))

# class FoundPerson(Base):
#     __tablename__ = "found_persons"
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True)
#     image = Column(LargeBinary)
#     embedding = Column(Vector(128))