# backend/app/schemas/plan.py

from pydantic import BaseModel
from typing import Optional  # For fields that can be omitted or null
from decimal import Decimal  # For precise decimal values, e.g., price amounts

# Schema for creating a new plan (input data)
class PlanCreate(BaseModel):
    name: str                     # Name of the plan, e.g., "Monthly", "Quarterly"
    price: Decimal                # Price of the plan with decimal precision, e.g., 999.00
    duration: int                 # Duration of the plan in days (e.g., 30 for monthly)
    description: Optional[str] = None  # Optional description or notes about the plan

# Schema for updating an existing plan (partial update allowed)
class PlanUpdate(BaseModel):
    name: Optional[str] = None        # Optional new name for the plan
    price: Optional[Decimal] = None   # Optional new price
    duration: Optional[int] = None    # Optional new duration in days
    description: Optional[str] = None # Optional new description

# Schema for returning plan data (output)
class PlanOut(BaseModel):
    id: int                      # Unique ID of the plan in the database
    name: str                    # Name of the plan
    price: Decimal               # Price of the plan
    duration: int                # Duration of the plan in days
    description: Optional[str]   # Optional description

    class Config:
        orm_mode = True          # Enables conversion from ORM model instances (e.g., SQLAlchemy) directly to this schema
