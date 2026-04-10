from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    scans = relationship("ScanHistory", back_populates="owner")


class ScanHistory(Base):
    __tablename__ = "scan_history"

    id = Column(Integer, primary_key=True, index=True)
    url_content = Column(String, index=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    threat_level = Column(String) # Safe, Suspicious, Malicious
    trust_score = Column(Float)
    location = Column(String, nullable=True) # e.g. Coordinates or City Name

    user_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="scans")
