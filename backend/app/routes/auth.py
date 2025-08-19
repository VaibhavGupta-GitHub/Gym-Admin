# backend/app/routes/auth.py

# Import required tools from FastAPI
from fastapi import APIRouter, Depends, HTTPException, status

# Import SQLAlchemy Session to interact with the database
from sqlalchemy.orm import Session

# Import form data structure for login (though not used here; included by default in OAuth2PasswordRequestForm)
from fastapi.security import OAuth2PasswordRequestForm

# Import local database session creator
from app.database import get_db

# Import the Admin model for querying admin users
from app.models.admin import Admin

# Import request and response schemas for login
from app.schemas.admin import LoginRequest, LoginResponse, AdminCreate, AdminPasswordReset

# Import password verification function
from app.auth.password_handler import verify_password
from app.auth.password_handler import hash_password

# Import function to generate a JWT token
from app.auth.jwt_handler import create_access_token

# Create a router for authentication-related routes
router = APIRouter(tags=["Auth"])


# Login route - handles POST requests to /login
# Expects a JSON body matching LoginRequest schema (username and password)
# Returns a LoginResponse schema with a JWT access token
@router.post("/login", response_model=LoginResponse)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    # Query the database for an admin with the given username
    
    admin = db.query(Admin).filter(Admin.email == login_data.username).first()
    print(admin)
    # If no admin found, raise an unauthorized error
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username"
        )

    # Verify the password provided against the hashed password stored in the database
    if not verify_password(login_data.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password"
        )

    # If credentials are correct, generate a JWT access token
    access_token = create_access_token(data={"sub": admin.username})

    # Return the token wrapped in a response schema
    return LoginResponse(access_token=access_token, message="Login successful")





# Registration route - handles POST requests to /register
# Expects a JSON body matching AdminCreate schema (username, email, password, confirm_password)
# Returns a success message if registration is completed
@router.post("/register")
def register(admin_data: AdminCreate, db: Session = Depends(get_db)):
    # Check that password and confirm_password fields match
    if admin_data.password != admin_data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    # Check if the username or email is already taken in the database
    if db.query(Admin).filter((Admin.username == admin_data.username) | (Admin.email == admin_data.email)).first():
        raise HTTPException(status_code=400, detail="Username or email already exists")

    # Create a new Admin object with hashed password
    new_admin = Admin(
        username=admin_data.username,
        email=admin_data.email,
        hashed_password=hash_password(admin_data.password)
    )

    # Add the new admin to the database and commit the transaction
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)  # Refresh instance with new DB state (e.g., get assigned ID)

    # Return a success message upon successful registration
    return {"message": "Registration successful"}



# Password reset route
@router.post("/reset-password")
def reset_password(data: AdminPasswordReset, db: Session = Depends(get_db)):
    # Find admin by email
    admin = db.query(Admin).filter(Admin.email == data.email).first()

    # If admin doesn't exist, raise error
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Admin account not found"
        )

    # Verify old password
    if not verify_password(data.old_password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect current password"
        )

    # Ensure new passwords match
    if data.new_password != data.confirm_new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New passwords do not match"
        )

    # Hash and update the new password
    admin.hashed_password = hash_password(data.new_password)
    db.commit()

    return {"message": "Password reset successful"}