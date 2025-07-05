# schemas.py
from pydantic import BaseModel, Field
from datetime import date
from typing import Optional, List
import enum


# ===============================
# ENUM FOR FEE STATUS (same as models)
# ===============================
class FeeStatusEnum(str, enum.Enum):
    paid = "paid"
    pending = "pending"
    due = "due"


# ===============================
# FEE SCHEMAS
# ===============================

# Schema for creating a new fee entry
class FeeCreate(BaseModel):
    member_id: int
    amount: int
    paid_on: Optional[date] = None
    next_due: Optional[date] = None
    status: FeeStatusEnum = FeeStatusEnum.pending


# Schema for showing fee info in responses
class FeeResponse(BaseModel):
    id: int
    member_id: int
    amount: int
    paid_on: Optional[date]
    next_due: Optional[date]
    status: FeeStatusEnum

    model_config = {
        "from_attributes": True
}



# ===============================
# MEMBER SCHEMAS
# ===============================

# Schema for creating a new member
class MemberCreate(BaseModel):
    name: str
    age: Optional[int] = None
    gender: Optional[str] = None
    contact: str
    join_date: Optional[date] = None
    fee_plan: Optional[str] = None


# Schema for showing member info in responses
class MemberResponse(BaseModel):
    id: int
    name: str
    age: Optional[int]
    gender: Optional[str]
    contact: str
    join_date: Optional[date]
    fee_plan: Optional[str]

    model_config = {
        "from_attributes": True
}



# ===============================
# Member + Fees Combined (Optional)
# ===============================
# class MemberWithFees(MemberResponse):
#     fees: List[FeeResponse] = []
