# backend/app/models/plan.py

# Import column types used to define the table structure
from sqlalchemy import Column, Integer, String, Numeric

# Import the shared Base class used to define SQLAlchemy models
from app.database import Base


# Define a class that maps to the "plans" table in the database
class Plan(Base):
    # Set the name of the database table
    __tablename__ = "plans"

    # 'id' column - unique identifier for each plan (Primary Key)
    # Indexed to improve search speed by ID
    id = Column(Integer, primary_key=True, index=True)

    # 'name' column - stores the name of the plan (e.g., Monthly, Quarterly)
    # Must be unique (no duplicates allowed) and cannot be null
    name = Column(String, nullable=False, unique=True)

    # 'price' column - stores the price of the plan as a decimal
    # Uses Numeric for accurate monetary values, e.g., 999.00
    price = Column(Numeric(10, 2), nullable=False)

    # 'duration' column - how long the plan lasts, stored in days
    # For example, 30 for a monthly plan or 90 for a quarterly plan
    duration = Column(Integer, nullable=False)

    # 'description' column - optional field to provide more details about the plan
    description = Column(String, nullable=True)
