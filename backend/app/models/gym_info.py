# backend/app/models/gym_info.py

# Import SQLAlchemy column types used to define database fields
from sqlalchemy import Column, Integer, String

# Import the Base class which is used to define models (tables)
from app.database import Base


# Define a class that represents the "gym_info" table in the database
# This inherits from Base, which tells SQLAlchemy this is a model
class GymInfo(Base):
    # Name of the database table
    __tablename__ = "gym_info"

    # 'id' column - a unique identifier for each gym record
    # It is the primary key, and indexed to speed up lookups
    id = Column(Integer, primary_key=True, index=True)
    
    # 'name' column - stores the name of the gym
    # Cannot be null (every gym must have a name)
    name = Column(String, nullable=False)
    
    # 'logo_url' column - stores a URL to the gym's logo image
    # This field is optional (nullable=True)
    logo_url = Column(String, nullable=True)
