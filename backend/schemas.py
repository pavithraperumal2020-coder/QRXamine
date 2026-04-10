from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: str
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class ScanCreate(BaseModel):
    url_content: str
    location: Optional[str] = None

class ScanHistoryOut(BaseModel):
    id: int
    url_content: str
    timestamp: datetime
    threat_level: str
    trust_score: float
    location: Optional[str] = None

    class Config:
        from_attributes = True

class ScanResult(BaseModel):
    url: str
    score: float
    threat_level: str # Safe, Suspicious, Malicious
    action: str # redirect, sandbox, helpline
