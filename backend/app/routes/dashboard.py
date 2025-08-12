from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.member import Member
from app.models.payment import Payment
from datetime import datetime, timedelta
from app.auth.jwt_handler import verify_access_token
from fastapi.security import OAuth2PasswordBearer

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload

@router.get("/")
def get_dashboard_stats(db: Session = Depends(get_db)):
    
    print("in dashboard")
    total_members = db.query(Member).count()

    today = datetime.now().date()
    exp_members = db.query(Member).filter(Member.end_date < today).count()
    active_members = total_members - exp_members

    start_of_month = datetime.now().replace(day=1)
    payments_this_month = db.query(Payment).filter(Payment.date >= start_of_month).all()
    total_payments = sum([p.amount for p in payments_this_month])

    next_week = datetime.now() + timedelta(days=7)
    now = datetime.now()
    upcoming_renewals = db.query(Member).filter((Member.end_date <= next_week) & (Member.end_date >= now)).count()

    return {
        "Total_Members": total_members,
        "Active_Members": active_members,
        "Total_Payments": total_payments,
        "Upcoming_Renewals": upcoming_renewals, 
        "Expired_Membership": exp_members
    }
