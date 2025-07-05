# crud.py
from sqlalchemy.orm import Session
from . import models, schemas
from typing import List, Optional
from datetime import date


# ==========================
# MEMBER OPERATIONS
# ==========================

# Create a new member
def create_member(db: Session, member: schemas.MemberCreate) -> models.Member:
    new_member = models.Member(**member.dict())
    db.add(new_member)
    db.commit()
    db.refresh(new_member)
    return new_member


# Get all members
def get_all_members(db: Session) -> List[models.Member]:
    return db.query(models.Member).all()


# Get member by ID
def get_member_by_id(db: Session, member_id: int) -> Optional[models.Member]:
    return db.query(models.Member).filter(models.Member.id == member_id).first()


# ==========================
# FEE OPERATIONS
# ==========================

# Create a new fee entry
def create_fee(db: Session, fee: schemas.FeeCreate) -> models.Fee:
    new_fee = models.Fee(**fee.dict())
    db.add(new_fee)
    db.commit()
    db.refresh(new_fee)
    return new_fee


# Get all fees
def get_all_fees(db: Session) -> List[models.Fee]:
    return db.query(models.Fee).all()


# Get latest fee status for each member
def get_fee_status_summary(db: Session):
    today = date.today()

    paid = []
    pending = []
    due = []

    members = db.query(models.Member).all()
    for member in members:
        latest_fee = (
            db.query(models.Fee)
            .filter(models.Fee.member_id == member.id)
            .order_by(models.Fee.next_due.desc())
            .first()
        )

        if latest_fee:
            # Check if fee is paid but next_due is today or earlier -> due
            if latest_fee.status == "paid" and latest_fee.next_due and latest_fee.next_due <= today:
                # Status is 'due'
                due.append({
                    "member_id": member.id,
                    "name": member.name,
                    "amount": latest_fee.amount,
                    "due_date": latest_fee.next_due.isoformat() if latest_fee.next_due else None
                })
            elif latest_fee.status == "paid":
                paid.append({
                    "member_id": member.id,
                    "name": member.name,
                    "amount": latest_fee.amount,
                    "due_date": latest_fee.next_due.isoformat() if latest_fee.next_due else None
                })
            else:
                # Other statuses (e.g., unpaid, overdue) treated as pending
                pending.append({
                    "member_id": member.id,
                    "name": member.name,
                    "amount": latest_fee.amount,
                    "due_date": latest_fee.next_due.isoformat() if latest_fee.next_due else None
                })
        else:
            # No fee record means pending
            pending.append({
                "member_id": member.id,
                "name": member.name,
                "amount": None,
                "due_date": None
            })

    return {
        "paid": paid,
        "pending": pending,
        "due": due
    }

