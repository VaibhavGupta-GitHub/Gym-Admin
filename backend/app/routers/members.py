# members.py routes
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas, crud
from ..database import get_db

router = APIRouter(
    prefix="/members",
    tags=["Members"]
)


# ===============================
# Create a new member
# ===============================
@router.post("/", response_model=schemas.MemberResponse)
def create_member(member: schemas.MemberCreate, db: Session = Depends(get_db)):
    return crud.create_member(db, member)


# ===============================
# Get all members
# ===============================
@router.get("/", response_model=List[schemas.MemberResponse])
def get_members(db: Session = Depends(get_db)):
    return crud.get_all_members(db)


# ===============================
# Get member by ID
# ===============================
@router.get("/{member_id}", response_model=schemas.MemberResponse)
def get_member(member_id: int, db: Session = Depends(get_db)):
    member = crud.get_member_by_id(db, member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    return member
