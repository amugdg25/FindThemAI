from fastapi import FastAPI
from application.database import engine, Base
from application.api import router  # Import the router from api.py

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

# Include the API router
app.include_router(router)
