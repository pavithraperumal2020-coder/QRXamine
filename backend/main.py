from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
import auth
from database import engine, get_db
from scanner_pipeline import analyze_url

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="ORXamine API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, set to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ORXamine API is running successfully!"}

@app.post("/api/users/signup", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Mock OTP verification
    print(f"MOCK OTP: Verification email sent to {user.email}. Assuming verified for demo.")
    
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(
        name=user.name,
        email=user.email,
        phone=user.phone,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/api/users/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Standard OAuth2 behavior asks for username, we map it to email
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = auth.timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/users/me", response_model=schemas.UserOut)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@app.post("/api/scan/analyze", response_model=schemas.ScanResult)
def analyze_qr_url(scan_input: schemas.ScanCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    # 1. Run Pipeline
    result = analyze_url(scan_input.url_content)
    
    # 2. Save isolated history for current user
    new_scan = models.ScanHistory(
        url_content=scan_input.url_content,
        threat_level=result['threat_level'],
        trust_score=result['score'],
        location=scan_input.location,
        user_id=current_user.id
    )
    db.add(new_scan)
    db.commit()
    db.refresh(new_scan)
    
    return result

@app.get("/api/scan/history", response_model=List[schemas.ScanHistoryOut])
def get_user_scan_history(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    # Returns only the history associated with the current user ID
    history = db.query(models.ScanHistory).filter(models.ScanHistory.user_id == current_user.id).order_by(models.ScanHistory.timestamp.desc()).all()
    return history
