# backend/app/schemas/gym_info.py

# Import BaseModel for data validation and typing utilities
from pydantic import BaseModel
from typing import Optional  # For optional (nullable) fields

# Schema for creating new gym info data (input)
class GymInfoCreate(BaseModel):
    name: str                      # Gym name, required field
    logo_url: Optional[str] = None # Optional URL to gym logo, default None if not provided

# Schema for updating gym info data (input)
class GymInfoUpdate(BaseModel):
    name: Optional[str] = None     # Optional gym name (can update or omit)
    logo_url: Optional[str] = None # Optional logo URL (can update or omit)

# Schema for outputting gym info data (response to client)
class GymInfoOut(BaseModel):
    id: int                       # Gym record ID (from database)
    name: str                     # Gym name (required)
    logo_url: Optional[str]       # Logo URL, optional (nullable)

    class Config:
        orm_mode = True           # Enable ORM compatibility to work with SQLAlchemy models
