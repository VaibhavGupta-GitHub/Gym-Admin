#model.py
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
from .database import Base
import enum


# ============================
# ENUM FOR FEE STATUS
# ============================
class FeeStatusEnum(str, enum.Enum):
    paid = "paid"
    pending = "pending"
    due = "due"


# ============================
# MEMBER TABLE
# ============================
class Member(Base):
    __tablename__ = "gym_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer)
    gender = Column(String)
    contact = Column(String, nullable=False)
    join_date = Column(Date)
    fee_plan = Column(String)

    # Relationship with fees
    fees = relationship("Fee", back_populates="member", cascade="all, delete-orphan")



# ============================
# FEE TABLE
# ============================
class Fee(Base):
    __tablename__ = "gym_fees"

    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("gym_members.id"), nullable=False)
    amount = Column(Integer, nullable=False)
    paid_on = Column(Date, nullable=True)
    next_due = Column(Date, nullable=True)
    status = Column(Enum(FeeStatusEnum), default=FeeStatusEnum.pending)

    # Relationship back to member
    member = relationship("Member", back_populates="fees")
