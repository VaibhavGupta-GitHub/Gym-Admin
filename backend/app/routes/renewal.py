# backend/app/routes/renewal.py

# Import FastAPI tools for routing, dependencies, exceptions, and query parameters
from fastapi import APIRouter, Depends, HTTPException, Query

# Import SQLAlchemy Session for DB access
from sqlalchemy.orm import Session

# Import date/time utilities
from datetime import datetime, timedelta

# Import List typing for response type hinting
from typing import List

# Import function to create DB session
from app.database import get_db

# Import Member model (database table representation)
from app.models.member import Member

# Import Pydantic schema for Member output validation
from app.schemas.member import MemberOut

# Import JWT verification function
from app.auth.jwt_handler import verify_access_token

# OAuth2 helper to extract token from Authorization header
from fastapi.security import OAuth2PasswordBearer


# Create API router with prefix /renewals and tag "Renewals"
router = APIRouter(prefix="/renewals", tags=["Renewals"])

# OAuth2PasswordBearer instance to extract token from requests
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


# Dependency to verify the JWT token and authenticate user
def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_access_token(token)  # Decode and verify the JWT token
    if not payload:
        # Raise 401 Unauthorized if token invalid or expired
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload  # Return token payload if valid


# GET /renewals/7days
# Fetch members whose membership end date is within the next 'days' days (default 7)
@router.get("/7days", response_model=List[MemberOut])
def get_upcoming_renewals(
    days: int = Query(7, ge=1, le=30),           # Query param 'days' with default=7, min=1, max=30
    db: Session = Depends(get_db),                # Inject DB session
    _: dict = Depends(get_current_user)           # Require authenticated user
):
    today = datetime.now().date()               # Get current UTC date (no time)
    upcoming_date = today + timedelta(days=days)   # Calculate date 'days' ahead

    # Query members whose end_date is between today and upcoming_date (inclusive)
    members = db.query(Member).filter(
        Member.end_date <= upcoming_date
    ).all()
    print(f"Found {len(members)} members with upcoming renewals (within {days} days)")

    # Return the list of matching members
    return members

@router.get("/exp", response_model=List[MemberOut])
def exp_membership(
    days: int = Query(7, ge=1, le=30),           # Query param 'days' with default=7, min=1, max=30
    db: Session = Depends(get_db),                # Inject DB session
    _: dict = Depends(get_current_user)           # Require authenticated user
):
    today = datetime.now().date()               # Get current UTC date (no time)

    # Query members whose end_date is between today and upcoming_date (inclusive)
    members = db.query(Member).filter(
        Member.end_date < today
    ).all()
    print(f"Found {len(members)} members with upcoming renewals (within {days} days)")

    # Return the list of matching members
    return members
    
# GET /renewals/today
# Fetch members whose membership end date is exactly today
@router.get("/today", response_model=List[MemberOut])
def get_today_renewals(
    db: Session = Depends(get_db),                # Inject DB session
    _: dict = Depends(get_current_user)           # Require authenticated user
):
    today = datetime.now().date()              # Get current UTC date (no time)

    # Query members whose end_date is exactly today
    members = db.query(Member).filter(
        Member.end_date == today
    ).all()

    # Return the list of matching members
    return members
