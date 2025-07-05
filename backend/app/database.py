# database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# =======================
# LOAD ENV VARIABLES
# =======================
# Looks for a .env file in the project directory and loads it
load_dotenv()

# =======================
# GET DATABASE URL
# =======================
# We safely load the DB connection string from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# Raise an error if the variable is missing
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in the .env file")

# =======================
# CREATE DB ENGINE
# =======================
# This engine is used by SQLAlchemy to interact with PostgreSQL
engine = create_engine(DATABASE_URL)

# =======================
# CREATE SESSION FACTORY
# =======================
# Each API request will use this to interact with the DB
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# =======================
# BASE CLASS FOR MODELS
# =======================
# All ORM models will inherit from this Base
Base = declarative_base()

# =======================
# FASTAPI DB DEPENDENCY
# =======================
# This function provides a database session to FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
