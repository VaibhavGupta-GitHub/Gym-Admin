# backend/app/models/payment.py

# Import necessary SQLAlchemy column types and relationship tools
from sqlalchemy import Column, Integer, ForeignKey, Numeric, String, DateTime, Text
from sqlalchemy.orm import relationship

# Import datetime for automatic timestamping of payment records
from datetime import datetime

# Import the Base class for model declaration
from app.database import Base


# Define a class that maps to the "payments" table in the database
class Payment(Base):
    # Name of the table in the database
    __tablename__ = "payments"

    # Unique identifier for each payment (Primary Key)
    id = Column(Integer, primary_key=True, index=True)

    # Foreign key that links this payment to a member in the "members" table
    # This creates a relationship between Payment and Member tables
    member_id = Column(Integer, ForeignKey("members.id"), nullable=False)

    # Payment amount, with up to 10 digits total and 2 decimal places
    amount = Column(Numeric(10, 2), nullable=False)

    # Method used for payment (e.g., Cash, UPI, Card)
    method = Column(String, nullable=False)

    # Timestamp of when the payment was made; defaults to the current UTC time
    date = Column(DateTime, default=datetime.utcnow)

    # Optional notes field for any additional details about the payment
    notes = Column(Text, nullable=True)

    # Relationship to the Member model
    # Allows you to access the member who made the payment via `payment.member`
    # And access all related payments from a member via `member.payments`
    member = relationship("Member", backref="payments")
