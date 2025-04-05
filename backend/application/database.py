from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from application.settings import settings

DATABASE_URL = settings.DATABASE_URL

# Create engine
engine = create_engine(DATABASE_URL)

# Ensure the `pgvector` extension exists
with engine.connect() as connection:
    connection.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
    connection.commit()

# Create a session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define base class
Base = declarative_base()

# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
