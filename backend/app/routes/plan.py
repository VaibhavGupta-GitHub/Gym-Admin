# backend/app/routes/plan.py

# Import FastAPI tools for creating routes, handling dependencies, exceptions, and HTTP status codes
from fastapi import APIRouter, Depends, HTTPException, status

# Import Session for DB operations using SQLAlchemy ORM
from sqlalchemy.orm import Session

# Import typing List to declare response types
from typing import List

# Import function to get DB session
from app.database import get_db

# Import Plan ORM model
from app.models.plan import Plan

# Import Pydantic schemas for Plan creation, update, and output validation
from app.schemas.plan import PlanCreate, PlanUpdate, PlanOut

# Import JWT verification function for authentication
from app.auth.jwt_handler import verify_access_token

# Import OAuth2PasswordBearer to extract JWT token from requests
from fastapi.security import OAuth2PasswordBearer


# Create API router with prefix /plans and tag "Plans"
router = APIRouter(prefix="/plans", tags=["Plans"])

# OAuth2PasswordBearer instance to handle token extraction from Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


# Dependency function to verify JWT token and authenticate the user
def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_access_token(token)  # Decode token to get payload
    if not payload:
        # Raise 401 Unauthorized if token is invalid or expired
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload  # Return decoded token payload if valid


# ----------------- ROUTES -----------------


# GET /plans
# Returns a list of all plans in the database
@router.get("/", response_model=List[PlanOut])
def get_plans(
    db: Session = Depends(get_db),           # Inject DB session
    _: dict = Depends(get_current_user)      # Require authentication (token)
):
    # Query all Plan records and return as list
    return db.query(Plan).all()


# POST /plans
# Create a new plan with unique name
@router.post("/", response_model=PlanOut, status_code=status.HTTP_201_CREATED)
def create_plan(
    plan: PlanCreate,                         # Validate incoming plan data
    db: Session = Depends(get_db),            # DB session
    _: dict = Depends(get_current_user)       # Authenticated user required
):
    # Check if plan with the same name already exists
    existing = db.query(Plan).filter(Plan.name == plan.name).first()
    if existing:
        # If exists, respond with 400 Bad Request
        raise HTTPException(status_code=400, detail="Plan with this name already exists")

    # Create new Plan object from validated data
    new_plan = Plan(**plan.dict())
    db.add(new_plan)   # Add new plan to DB session
    db.commit()        # Commit transaction to save to DB
    db.refresh(new_plan)  # Refresh instance to get DB-generated fields (like ID)

    # Return the newly created plan object
    return new_plan


# PUT /plans/{id}
# Update an existing plan by ID
@router.put("/{id}", response_model=PlanOut)
def update_plan(
    id: int,                                  # ID of plan to update (from URL path)
    plan_data: PlanUpdate,                     # Partial or full plan data to update
    db: Session = Depends(get_db),             # DB session
    _: dict = Depends(get_current_user)        # Authenticated user required
):
    # Query the plan by ID
    plan = db.query(Plan).filter(Plan.id == id).first()
    if not plan:
        # If plan not found, respond with 404 Not Found
        raise HTTPException(status_code=404, detail="Plan not found")

    # Update only fields that are set in the request
    for field, value in plan_data.dict(exclude_unset=True).items():
        setattr(plan, field, value)  # Update field on Plan instance

    db.commit()       # Commit changes to DB
    db.refresh(plan)  # Refresh to get updated data from DB

    # Return updated plan
    return plan


# DELETE /plans/{id}
# Delete a plan by ID
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_plan(
    id: int,                                   # ID of plan to delete (from URL path)
    db: Session = Depends(get_db),              # DB session
    _: dict = Depends(get_current_user)         # Authenticated user required
):
    # Query plan by ID
    plan = db.query(Plan).filter(Plan.id == id).first()
    if not plan:
        # If not found, respond with 404 Not Found
        raise HTTPException(status_code=404, detail="Plan not found")

    db.delete(plan)  # Delete plan record from DB session
    db.commit()      # Commit transaction to save changes

    # No return needed; 204 No Content means success with no body
    return
