# backend/app/models/member.py

# Import column types from SQLAlchemy to define the schema (structure) of the table
from sqlalchemy import Column, Integer, String, Date, Text

# Import the Base class used for defining models
from app.database import Base


# Define a class that maps to the "members" table in the database
# This class inherits from Base, making it a SQLAlchemy model
class Member(Base):
    # Set the name of the database table to be created/used
    __tablename__ = "members"

    # 'id' column - unique identifier for each member (Primary Key)
    # Indexed to allow faster search/filtering by ID
    id = Column(Integer, primary_key=True, index=True)
    
    # 'name' column - stores the member's full name (required)
    name = Column(String, nullable=False)
    
    # 'phone' column - stores the member's phone number (required)
    phone = Column(String, nullable=False)
    
    # 'email' column - stores the member's email address (optional)
    email = Column(String, nullable=True)
    
    # 'plan_type' column - indicates the membership plan (e.g., Monthly, Quarterly) (required)
    plan_type = Column(String, nullable=False)
    
    # 'start_date' column - date when the member's plan starts (required)
    start_date = Column(Date, nullable=False)
    
    # 'end_date' column - date when the member's plan ends (required)
    end_date = Column(Date, nullable=False)
    
    # 'notes' column - optional field to store additional notes about the member (e.g., health info, preferences)
    notes = Column(Text, nullable=True)
