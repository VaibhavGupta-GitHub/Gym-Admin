# backend/app/routes/member.py

# Import FastAPI utilities for routing, dependency injection, and exceptions
from fastapi import APIRouter, Depends, HTTPException, status

# Import Session for database interactions
from sqlalchemy.orm import Session

# Import List typing for response models that return lists
from typing import List

# Import the session factory for database connection
from app.database import get_db

# Import the Member ORM model
from app.models.member import Member

# Import Pydantic schemas for member creation, update, and output
from app.schemas.member import MemberCreate, MemberUpdate, MemberOut

# Import function to verify JWT tokens
from app.auth.jwt_handler import verify_access_token

# Import OAuth2 password bearer to extract tokens from requests
from fastapi.security import OAuth2PasswordBearer


# Create an APIRouter instance with prefix and tags
router = APIRouter(prefix="/members", tags=["Members"])


# OAuth2 scheme to extract the token from Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")


# Dependency to verify the JWT token and authenticate the user
def get_current_user(token: str = Depends(oauth2_scheme)):
    print("TOKEN RECEIVED:", token)
    payload = verify_access_token(token)  # Decode and verify token
    if not payload:
        # Raise 401 Unauthorized if token is invalid or expired
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    return payload  # Return the decoded token payload if valid


# ----------------- ROUTES -----------------


# GET /members
# Return a list of all members in the database
# Requires user authentication (valid JWT token)
@router.get("/", response_model=List[MemberOut])
def get_members(db: Session = Depends(get_db), _: dict = Depends(get_current_user)):
    return db.query(Member).all()  # Return all member records


# POST /members
# Create a new member using data sent in the request body
# Return the created member with a 201 status code
@router.post("/", response_model=MemberOut, status_code=status.HTTP_201_CREATED)
def create_member(
    member: MemberCreate,           # Pydantic schema for new member data
    db: Session = Depends(get_db),  # Database session
    _: dict = Depends(get_current_user)  # Authentication dependency
):
    new_member = Member(**member.dict())  # Create Member object from request data
    db.add(new_member)                    # Add new member to the session
    db.commit()                          # Commit to save in DB
    db.refresh(new_member)               # Refresh instance to get DB-generated fields (e.g., id)
    return new_member                    # Return the newly created member


# PUT /members/{id}
# Update an existing member identified by id
# Only fields provided in the request will be updated (partial update)
@router.put("/{id}", response_model=MemberOut)
def update_member(
    id: int,                          # ID of the member to update (from URL path)
    member_data: MemberUpdate,        # Data to update (Pydantic schema)
    db: Session = Depends(get_db),    # DB session
    _: dict = Depends(get_current_user)  # Authentication
):
    member = db.query(Member).filter(Member.id == id).first()  # Find member by id
    if not member:
        # If not found, raise 404 Not Found error
        raise HTTPException(status_code=404, detail="Member not found")

    # Update only the fields sent in the request
    for field, value in member_data.dict(exclude_unset=True).items():
        setattr(member, field, value)

    db.commit()        # Save changes to DB
    db.refresh(member)  # Refresh to get updated data
    return member      # Return updated member


# DELETE /members/{id}
# Delete a member identified by id
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_member(
    id: int,                       # ID of the member to delete
    db: Session = Depends(get_db),  # DB session
    _: dict = Depends(get_current_user)  # Authentication
):
    member = db.query(Member).filter(Member.id == id).first()  # Find member by id
    if not member:
        # Raise 404 if member not found
        raise HTTPException(status_code=404, detail="Member not found")

    db.delete(member)  # Delete the member record
    db.commit()        # Commit the transaction to finalize deletion
    return             # Return 204 No Content (empty response)
