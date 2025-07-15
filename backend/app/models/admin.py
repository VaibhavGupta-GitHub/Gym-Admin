# backend/app/models/admin.py

# Import SQLAlchemy column types used to define the database schema
from sqlalchemy import Column, Integer, String, DateTime

# Import datetime to automatically set the creation timestamp
from datetime import datetime

# Import the Base class from your database setup
# This Base is typically created using declarative_base() and is used to define models
from app.database import Base


# Define a class that represents the "admins" table in the database
# This class inherits from Base so SQLAlchemy knows it's a database model
class Admin(Base):
    # Define the name of the table in the database
    __tablename__ = "admins"

    # Define columns for the table:
    
    # Primary key column 'id' which uniquely identifies each admin
    id = Column(Integer, primary_key=True, index=True)
    
    # 'username' column - must be unique and cannot be null
    username = Column(String, unique=True, nullable=False)

    # 'email' column - must be unique and cannot be null
    email = Column(String, unique=True, nullable=False)
    
    # 'hashed_password' column - stores the hashed version of the admin's password
    hashed_password = Column(String, nullable=False)
    
    # 'created_at' column - stores the date and time when the admin account was created
    # It defaults to the current UTC time
    created_at = Column(DateTime, default=datetime.utcnow)

    