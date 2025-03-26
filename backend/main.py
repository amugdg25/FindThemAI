from fastapi import FastAPI
from application.database import engine, Base
from application.api import router  # Import the router from api.py
from fastapi.middleware.cors import CORSMiddleware

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # Allow all origins (change this for security)
    allow_credentials=True,     # Allow credentials (cookies, authentication)
    allow_methods=["*"],        # Allow all HTTP methods
    allow_headers=["*"],        # Allow all headers
)

# Include the API router
app.include_router(router)

import uvicorn
import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))  # Set 8080 as default
    uvicorn.run(app, host="0.0.0.0", port=port)
