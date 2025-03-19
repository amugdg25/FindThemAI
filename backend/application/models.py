from sqlalchemy import Column, Integer, String, LargeBinary
from application.database import Base
from pgvector.sqlalchemy import Vector

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)


class MissingPerson(Base):
    __tablename__ = "missing_persons"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)
    last_seen_location = Column(String)
    contact_info = Column(String)
    image = Column(LargeBinary)
    embedding = Column(Vector(128))

# class FoundPerson(Base):
#     __tablename__ = "found_persons"
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True)
#     image = Column(LargeBinary)
#     embedding = Column(Vector(128))