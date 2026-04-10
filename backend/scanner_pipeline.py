import random
import time

def analyze_url(url: str) -> dict:
    """
    Mock URL Analysis Pipeline.
    Combines mocked VirusTotal API, LightGBM Model, and Heuristics.
    """
    time.sleep(1.5) # Simulate API latency

    # 1. Heuristics & Blacklist checking
    malicious_keywords = ["phishing", "free-money", "login-update", "scam", "verify-account", "malware", "evil", "hack", "exploit", "attack", "crypto-doubler", "virus", "trojan"]
    suspicious_keywords = ["offer", "cheap", "win", "promo", "bit.ly", "tinyurl", "free", "gift", "prize", "jackpot"]
    suspicious_tlds = [".xyz", ".tk", ".ml", ".ga", ".cf", ".gq"]
    
    score = 90.0 # Default safe score

    url_lower = url.lower()
    
    # Simple mocked ML inference
    if any(keyword in url_lower for keyword in malicious_keywords):
        score -= random.uniform(50.0, 70.0)
        
    if any(keyword in url_lower for keyword in suspicious_keywords) or any(url_lower.endswith(tld) or (tld + "/") in url_lower for tld in suspicious_tlds):
        score -= random.uniform(20.0, 40.0)

    # Random jitter to simulate ML variations
    score = score + random.uniform(-5.0, 5.0)

    # Hard boundary checks
    if score > 100: score = 100.0
    if score < 0: score = 1.0

    # Decision Logic
    if score >= 70:
        status = "Safe"
        action = "redirect"
    elif score >= 40:
        status = "Suspicious"
        action = "sandbox"
    else:
        status = "Malicious"
        action = "helpline"

    return {
        "url": url,
        "score": round(score, 1),
        "threat_level": status,
        "action": action
    }
