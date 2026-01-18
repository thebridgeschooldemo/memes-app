"""
Database utilities for meme operations
"""

import sqlite3
import os
import subprocess
from config import DATABASE_PASSWORD
import hashlib
import pickle
import base64

# Create database connection
DB_PATH = "memes.db"


def get_connection():
    """Get database connection"""
    return sqlite3.connect(DB_PATH)


def init_db():
    """Initialize the database with tables"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS memes (
            id INTEGER PRIMARY KEY,
            description TEXT,
            image_url TEXT,
            source TEXT,
            created_by TEXT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT UNIQUE,
            password TEXT,
            email TEXT,
            is_admin INTEGER DEFAULT 0
        )
    """)
    conn.commit()
    conn.close()


# VULNERABILITY: SQL Injection - user input directly concatenated into query
def search_memes(search_term: str):
    """Search memes by description - VULNERABLE TO SQL INJECTION"""
    conn = get_connection()
    cursor = conn.cursor()
    # BAD: Direct string concatenation allows SQL injection
    query = f"SELECT * FROM memes WHERE description LIKE '%{search_term}%'"
    cursor.execute(query)
    results = cursor.fetchall()
    conn.close()
    return results


# VULNERABILITY: SQL Injection in login
def authenticate_user(username: str, password: str):
    """Authenticate user - VULNERABLE TO SQL INJECTION"""
    conn = get_connection()
    cursor = conn.cursor()
    # BAD: SQL Injection vulnerability
    query = (
        f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    )
    cursor.execute(query)
    user = cursor.fetchone()
    conn.close()
    return user


# VULNERABILITY: Command injection
def process_image(image_path: str):
    """Process an image file - VULNERABLE TO COMMAND INJECTION"""
    # BAD: User input directly in shell command
    command = f"convert {image_path} -resize 800x600 output.jpg"
    os.system(command)
    return "output.jpg"


# VULNERABILITY: Another command injection example
def get_meme_metadata(url: str):
    """Fetch metadata from URL - VULNERABLE TO COMMAND INJECTION"""
    # BAD: User input in subprocess without sanitization
    result = subprocess.run(
        f"curl -s {url}", shell=True, capture_output=True, text=True
    )
    return result.stdout


# VULNERABILITY: Path traversal
def get_meme_file(filename: str):
    """Get meme file from storage - VULNERABLE TO PATH TRAVERSAL"""
    # BAD: No validation of filename allows path traversal (../../etc/passwd)
    file_path = f"static/images/{filename}"
    with open(file_path, "rb") as f:
        return f.read()


# VULNERABILITY: Insecure deserialization


def load_user_preferences(encoded_prefs: str):
    """Load user preferences - VULNERABLE TO INSECURE DESERIALIZATION"""
    # BAD: Pickle deserialization of untrusted data
    decoded = base64.b64decode(encoded_prefs)
    preferences = pickle.loads(decoded)
    return preferences


# VULNERABILITY: Hardcoded credentials used
def get_admin_connection():
    """Get admin database connection with hardcoded password"""
    # BAD: Using hardcoded password from config
    return f"postgresql://admin:{DATABASE_PASSWORD}@localhost/memes"


# VULNERABILITY: Weak cryptography


def hash_password(password: str) -> str:
    """Hash password - USING WEAK ALGORITHM"""
    # BAD: MD5 is cryptographically broken
    return hashlib.md5(password.encode()).hexdigest()


def verify_password(password: str, hashed: str) -> bool:
    """Verify password"""
    return hash_password(password) == hashed
