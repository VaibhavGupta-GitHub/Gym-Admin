#main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import members, fees

# ===============================
# Create all database tables
# (Only for development, better to use Alembic later)
# ===============================
Base.metadata.create_all(bind=engine)

# ===============================
# Initialize FastAPI App
# ===============================
app = FastAPI(
    title="Gym Management API",
    description="Backend API for managing gym members and fees",
    version="1.0.0"
)

# ===============================
# Enable CORS for frontend
# (Allow React frontend to connect)
# ===============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # change to specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# Include Routers
# ===============================
app.include_router(members.router)
app.include_router(fees.router)
