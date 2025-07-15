# backend/app/utils/filters.py

from sqlalchemy.orm import Session  # To work with database sessions
from datetime import datetime, timedelta  # For date calculations
from typing import List  # For specifying return type as a list

from app.models.member import Member  # Import the Member model to query members

def get_members_expiring_within_days(db: Session, days: int) -> List[Member]:
    """
    Retrieve a list of members whose membership will expire within the next `days` days.
    
    Args:
        db (Session): SQLAlchemy database session used to perform queries.
        days (int): Number of upcoming days to check for membership expiration.

    Returns:
        List[Member]: List of Member objects with end_date within the specified range.
    """
    
    # Get today's date in UTC (date only, without time)
    today = datetime.utcnow().date()
    
    # Calculate the end date of the range by adding `days` to today
    end_range = today + timedelta(days=days)

    # Query the Member table where:
    # - membership end_date is greater than or equal to today (not expired yet)
    # - membership end_date is less than or equal to end_range (within the window)
    # Results are ordered by end_date ascending (soonest expiry first)
    return db.query(Member).filter(
        Member.end_date >= today,
        Member.end_date <= end_range
    ).order_by(Member.end_date.asc()).all()
