# backend/app/routes/gym_info.py

# Import FastAPI tools for routing and error handling
from fastapi import APIRouter, Depends, HTTPException, status

# Import SQLAlchemy session for database access
from sqlalchemy.orm import Session

# Import session creator
from app.database import get_db

# Import the GymInfo model to interact with the gym_info table
from app.models.gym_info import GymInfo

# Import schemas for reading and updating gym info
from app.schemas.gym_info import GymInfoOut, GymInfoUpdate

# Import token verification function
from app.auth.jwt_handler import verify_access_token

# Import OAuth2 token dependency
from fastapi.security import OAuth2PasswordBearer


# Create a FastAPI router for gym info related endpoints
# All routes will be prefixed with "/gym-info"
router = APIRouter(prefix="/gym-info", tags=["Gym Info"])


# OAuth2PasswordBearer is a dependency that extracts the token from the Authorization header
# This expects the token to be passed as "Bearer <token>"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


# Dependency to verify token and get current user (for protected routes)
def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_access_token(token)  # Decode and verify JWT
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload  # If valid, return the payload (e.g., {"sub": username})


# ----------------- ROUTES -----------------

# GET /gym-info
# Retrieves the current gym's information from the database
# Requires a valid token (authenticated user)
@router.get("/", response_model=GymInfoOut)
def get_gym_info(
    db: Session = Depends(get_db),         # Get DB session
    _: dict = Depends(get_current_user)    # Ensure user is authenticated
):
    # Fetch the first (and only) GymInfo record
    gym_info = db.query(GymInfo).first()

    # If no info exists, return 404
    if not gym_info:
        raise HTTPException(status_code=404, detail="Gym info not found")

    # Return the gym info
    return gym_info

# POST /gym-info
# Creates the initial gym info record
# Only allowed if no gym info exists yet
@router.post("/", response_model=GymInfoOut)
def create_gym_info(
    new_info: GymInfoUpdate,               # Incoming data to create the gym info
    db: Session = Depends(get_db),         # Get DB session
    _: dict = Depends(get_current_user)    # Ensure user is authenticated
):
    # Check if a GymInfo record already exists (only one allowed)
    existing = db.query(GymInfo).first()
    if existing:
        raise HTTPException(status_code=400, detail="Gym info already exists")

    # Create a new GymInfo object from the incoming data
    gym_info = GymInfo(**new_info.dict())

    # Add to DB and commit
    db.add(gym_info)
    db.commit()
    db.refresh(gym_info)

    # Return the newly created gym info
    return gym_info

# PUT /gym-info
# Updates the gym's information (like name or logo)
# Only fields sent in the request will be updated
@router.put("/", response_model=GymInfoOut)
def update_gym_info(
    update: GymInfoUpdate,                 # Incoming update data (name, logo_url, etc.)
    db: Session = Depends(get_db),         # Get DB session
    _: dict = Depends(get_current_user)    # Ensure user is authenticated
):
    # Fetch the existing gym info
    gym_info = db.query(GymInfo).first()

    # If not found, return 404
    if not gym_info:
        raise HTTPException(status_code=404, detail="Gym info not found")

    # Update fields dynamically based on what was sent in the request
    for field, value in update.dict(exclude_unset=True).items():
        setattr(gym_info, field, value)  # Set new value for each field

    # Save the changes to the database
    db.commit()

    # Refresh the object with the new data from the database
    db.refresh(gym_info)

    # Return the updated gym info
    return gym_info
