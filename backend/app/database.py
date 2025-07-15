# backend/app/database.py

from sqlalchemy import create_engine  # For creating the database connection engine
from sqlalchemy.ext.declarative import declarative_base  # Base class for model definitions
from sqlalchemy.orm import sessionmaker  # For creating database sessions
from dotenv import load_dotenv  # To load environment variables from a .env file
import os  # For accessing environment variables

# Load environment variables from the .env file into the system environment
load_dotenv()

# Read the database URL (connection string) from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# Create the SQLAlchemy engine to connect to the database using the URL
engine = create_engine(DATABASE_URL)

# Create a configured "SessionLocal" class
# autocommit=False means transactions must be explicitly committed
# autoflush=False means changes are not automatically flushed to the database before queries
# bind=engine links the session to the database engine created above
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a Base class that our ORM models will inherit from
# This keeps track of tables and mappings
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
