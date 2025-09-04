# backend/app/schemas/payment.py

# Import BaseModel for schema definitions
from pydantic import BaseModel
from typing import Optional  # For optional fields (nullable)
from datetime import datetime  # For date and time fields
from decimal import Decimal    # For precise decimal values (e.g., money amounts)

# Schema used when creating a new payment record (input)
class PaymentCreate(BaseModel):
    member_id: int               # ID of the member who made the payment (required)
    plan_type: str              # Plan type with string fetched from plans table (required)
    amount: Decimal              # Payment amount with decimal precision (required)
    method: str                  # Payment method, e.g., Cash, UPI, Card (required)
    notes: Optional[str] = None  # Optional notes about the payment (e.g., reference, remarks)

# Schema used when returning payment data to client (output)
class PaymentOut(BaseModel):
    id: int                     # Unique ID of the payment record in the database
    member_id: int              # ID of the member related to this payment
    plan_type: str
    amount: Decimal             # Payment amount
    method: str                 # Payment method used
    date: datetime              # Date and time when the payment was recorded
    notes: Optional[str]        # Optional notes associated with the payment

    class Config:
        orm_mode = True         # Allows direct conversion from ORM model instances (e.g., SQLAlchemy)
