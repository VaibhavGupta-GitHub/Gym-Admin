# backend/app/main.py

from fastapi import FastAPI  # Import FastAPI framework to create the app
from fastapi.middleware.cors import CORSMiddleware  # Middleware to handle CORS (Cross-Origin Resource Sharing)

# Import route modules where API endpoints are defined
from app.routes import auth, member, payment, plan, renewal, gym_info, dashboard

# Create a FastAPI app instance
app = FastAPI()

# Define which origins (frontends) are allowed to make requests to this API
origins = [
    "http://localhost:5173",  # Example: your frontend development server URL
]

# Add CORS middleware to allow frontend → backend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # Only allow requests from these origins
    allow_credentials=True,       # Allow cookies and credentials in requests
    allow_methods=["*"],          # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],          # Allow all headers in requests
)

# Register routers (collections of API endpoints) with a common prefix "/api"
app.include_router(auth.router, prefix="/api")       # Authentication routes
app.include_router(dashboard.router, prefix="/api")  # Dashboard routes
app.include_router(member.router, prefix="/api")     # Member management routes
app.include_router(payment.router, prefix="/api")    # Payment routes
app.include_router(plan.router, prefix="/api")       # Plan management routes
app.include_router(renewal.router, prefix="/api")    # Membership renewal routes
app.include_router(gym_info.router, prefix="/api")   # Gym info routes

# Define a simple root endpoint to check if the API is running
@app.get("/")
def read_root():
    return {"message": "Gym Management System API is running"}

# ---------------------------------------------------------
# Setup automatic database table creation on startup
# ---------------------------------------------------------
from app.database import Base, engine
from app.models import admin, member, payment, plan, gym_info

# Create all tables if they don't exist
Base.metadata.create_all(bind=engine)

# ---------------------------------------------------------
# Customize Swagger UI to support JWT Bearer authentication
# ---------------------------------------------------------
from fastapi.openapi.utils import get_openapi

# Override default OpenAPI schema to define Bearer token security
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Gym Admin API",
        version="1.0.0",
        description="API docs for Gym Admin",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }
    for path in openapi_schema["paths"].values():
        for operation in path.values():
            operation["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

# Apply the custom OpenAPI override to FastAPI
app.openapi = custom_openapi
