# backend/app/schemas/member.py

# Import BaseModel for defining schemas, EmailStr for validating email format
from pydantic import BaseModel, EmailStr
from typing import Optional  # For optional fields that may be None
from datetime import date    # For date fields (start_date, end_date)

# Schema used when creating a new member (input data)
class MemberCreate(BaseModel):
    name: str                      # Member's full name (required)
    phone: str                     # Member's phone number (required)
    email: Optional[EmailStr] = None  # Member's email address, optional and validated as email if provided
    plan_type: str                 # Membership plan type (e.g., Monthly, Quarterly), required
    start_date: date               # Membership start date, required
    end_date: date                 # Membership end date, required
    notes: Optional[str] = None    # Optional notes about the member, can be None

# Schema used when updating an existing member (partial update allowed)
class MemberUpdate(BaseModel):
    name: Optional[str] = None     # Name can be updated or left unchanged
    phone: Optional[str] = None    # Phone can be updated or left unchanged
    email: Optional[EmailStr] = None  # Email can be updated or left unchanged
    plan_type: Optional[str] = None    # Plan type can be updated or left unchanged
    start_date: Optional[date] = None  # Start date can be updated or left unchanged
    end_date: Optional[date] = None    # End date can be updated or left unchanged
    notes: Optional[str] = None         # Notes can be updated or left unchanged

# Schema used when sending member data back to client (output)
class MemberOut(BaseModel):
    id: int                        # Unique ID of the member in database
    name: str                      # Member's name
    phone: str                     # Member's phone number
    email: Optional[str]           # Email address, optional (nullable)
    plan_type: str                 # Membership plan type
    start_date: date               # Membership start date
    end_date: date                 # Membership end date
    notes: Optional[str]           # Optional notes about the member

    class Config:
        orm_mode = True            # Enables compatibility with ORM models like SQLAlchemy
