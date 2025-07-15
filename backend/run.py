# run.py

import uvicorn  # Uvicorn is the ASGI server used to run the FastAPI app

# Import Base and engine to auto-create tables
from app.database import Base, engine
from app.models import admin, member, payment, plan, gym_info  # Import all models

# Import the FastAPI app instance from main.py
from app.main import app


if __name__ == "__main__":
    # Automatically create database tables if they don't exist
    Base.metadata.create_all(bind=engine)

    # Start the FastAPI server with live-reload enabled
    uvicorn.run("run:app", host="127.0.0.1", port=8000, reload=True)
