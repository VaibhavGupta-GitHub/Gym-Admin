# backend/app/auth/jwt_handler.py

# Import necessary modules
from jose import JWTError, jwt  # 'jose' is a library used for creating and verifying JWT tokens
from datetime import datetime, timedelta  # Used to handle date and time operations
from dotenv import load_dotenv  # Used to load environment variables from a .env file
import os  # Provides access to environment variables and operating system functions

# Load environment variables from a .env file into the system environment
load_dotenv()

# Get the secret key from the environment file
# This key is used to sign and verify JWT tokens
SECRET_KEY = os.getenv("SECRET_KEY")

# Get the algorithm used for encoding/decoding the JWT (e.g., HS256)
ALGORITHM = os.getenv("ALGORITHM")

# Get the token expiration time in minutes from the environment file
# If not set, defaults to 60 minutes
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))


# Function to create a JWT access token
# Takes a dictionary (`data`) which usually contains user identification (e.g., user ID)
def create_access_token(data: dict):
    # Make a copy of the data to avoid modifying the original input
    to_encode = data.copy()
    
    # Calculate the token's expiration time (current time + N minutes)
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Add the expiration time to the payload (JWT requires an "exp" claim)
    to_encode.update({"exp": expire})
    
    # Encode the data dictionary (including expiration) into a JWT token
    # using the secret key and chosen algorithm
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    # Return the JWT as a string
    return encoded_jwt


# Function to verify and decode a JWT token
# Takes the JWT token string as input
def verify_access_token(token: str):
    try:
        # Try to decode the token using the secret key and algorithm
        # If successful, it returns the payload (i.e., the original data)
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # The decoded data; may contain fields like "sub" (subject or user ID)
    
    # If decoding fails (e.g., due to invalid signature, expired token, etc.), return None
    except JWTError:
        return None
