# backend/app/routes/payment.py

# Import FastAPI tools for routing, dependencies, exceptions, and query parameters
from fastapi import APIRouter, Depends, HTTPException, status, Query

# Import SQLAlchemy session for DB operations
from sqlalchemy.orm import Session

# For typing optional query parameters and list responses
from typing import List, Optional

# To handle date/time query filters
from datetime import datetime

# Import DB session creator
from app.database import get_db

# Import Payment ORM model
from app.models.payment import Payment

# Import Pydantic schemas for Payment creation and output
from app.schemas.payment import PaymentCreate, PaymentOut

# Import JWT verification function
from app.auth.jwt_handler import verify_access_token

# OAuth2 helper to extract token from requests
from fastapi.security import OAuth2PasswordBearer


# Create API router with prefix and tag
router = APIRouter(prefix="/payments", tags=["Payments"])

# OAuth2PasswordBearer instance to extract JWT token from Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


# Dependency to verify JWT token and authenticate user
def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_access_token(token)  # Decode and verify token
    if not payload:
        # Raise 401 if token invalid or expired
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    return payload  # Return token payload if valid


# ----------------- ROUTES -----------------


# GET /payments
# Retrieve list of payments, optionally filtered by member_id and date range
@router.get("/", response_model=List[PaymentOut])
def get_payments(
    member_id: Optional[int] = Query(None),      # Filter by member ID (optional)
    start_date: Optional[datetime] = Query(None),# Filter payments from this date (optional)
    end_date: Optional[datetime] = Query(None),  # Filter payments until this date (optional)
    db: Session = Depends(get_db),                # DB session dependency
    _: dict = Depends(get_current_user)            # Authentication dependency
):
    query = db.query(Payment)  # Start query on Payment table

    # Apply filters if query params are provided
    if member_id:
        query = query.filter(Payment.member_id == member_id)
    if start_date:
        query = query.filter(Payment.date >= start_date)
    if end_date:
        query = query.filter(Payment.date <= end_date)

    # Return results ordered by date descending (most recent first)
    return query.order_by(Payment.date.desc()).all()


# POST /payments
# Create a new payment record
@router.post("/", response_model=PaymentOut, status_code=status.HTTP_201_CREATED)
def create_payment(
    payment: PaymentCreate,        # Payment data from request body
    db: Session = Depends(get_db),  # DB session
    _: dict = Depends(get_current_user)  # Authentication
):
    # Create Payment object from input data
    new_payment = Payment(**payment.dict())

    # Add to DB session and commit transaction
    db.add(new_payment)
    db.commit()

    # Refresh the instance to get any DB-generated fields (like ID)
    db.refresh(new_payment)

    # Return the newly created payment object
    return new_payment
