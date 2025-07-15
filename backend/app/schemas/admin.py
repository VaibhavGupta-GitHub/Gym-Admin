# backend/app/schemas/admin.py

# Import BaseModel from Pydantic for data validation and serialization
from pydantic import BaseModel, EmailStr

# Import datetime for timestamp fields
from datetime import datetime

# ----------------------------------------
# Schema for login request data (input from client)
# ----------------------------------------
class LoginRequest(BaseModel):
    username: str  # User's username for login
    password: str  # User's password for login

# ----------------------------------------
# Schema for login response data (output to client)
# ----------------------------------------
class LoginResponse(BaseModel):
    access_token: str         # JWT token string returned after successful login
    token_type: str = "bearer"  # Token type, default set to "bearer"
    message: str = "Login successful"  # Success message to return

# ----------------------------------------
# Schema for returning admin user info
# Used when sending admin details in a response
# ----------------------------------------
class AdminOut(BaseModel):
    id: int                  # Unique ID of the admin user
    username: str            # Username of the admin
    created_at: datetime     # Timestamp when admin was created

    # Pydantic configuration to allow returning ORM model instances directly
    class Config:
        orm_mode = True      # Enables ORM mode to work with SQLAlchemy models


# ----------------------------------------
# Schema for admin registration input
# Used when a new admin is being created
# ----------------------------------------
class AdminCreate(BaseModel):
    username: str                  # Username chosen by the admin
    email: EmailStr                # Valid email address for the admin
    password: str                  # Password for account login
    confirm_password: str          # Password confirmation for validation


