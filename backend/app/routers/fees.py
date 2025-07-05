# fees.py route
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas, crud
from ..database import get_db

router = APIRouter(
    prefix="/fees",
    tags=["Fees"]
)


# ===============================
# Create a new fee entry
# ===============================
@router.post("/", response_model=schemas.FeeResponse)
def create_fee(fee: schemas.FeeCreate, db: Session = Depends(get_db)):
    return crud.create_fee(db, fee)


# ===============================
# Get all fee records
# ===============================
@router.get("/", response_model=List[schemas.FeeResponse])
def get_fees(db: Session = Depends(get_db)):
    return crud.get_all_fees(db)


# ===============================
# Get fee status summary
# (paid, pending, due for each member)
# ===============================
@router.get("/status/")
def fee_status_summary(db: Session = Depends(get_db)):
    return crud.get_fee_status_summary(db)


