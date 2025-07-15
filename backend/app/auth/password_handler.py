# backend/app/auth/password_handler.py

# Import the CryptContext class from passlib to manage password hashing
from passlib.context import CryptContext

# Create a CryptContext object with bcrypt as the hashing algorithm
# bcrypt is a secure and widely-used algorithm for password hashing
# "deprecated='auto'" means older algorithms will be marked deprecated automatically
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Function to hash a plain-text password
# Input: plain text password as a string
# Output: a hashed version of the password (safe to store in a database)
def hash_password(password: str) -> str:
    # Uses the password context to generate a hashed password
    return pwd_context.hash(password)


# Function to verify a user's password
# Compares a plain password with its hashed version
# Returns True if they match, False otherwise
def verify_password(plain_password: str, hashed_password: str) -> bool:
    # The verify method checks whether the plain password matches the hashed one
    return pwd_context.verify(plain_password, hashed_password)
