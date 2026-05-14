from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

print("SCRIPT STARTED")

DATABASE_URL = "postgresql://postgres:Madhusql%40123@localhost:5432/sentiment_db"

# Engine
engine = create_engine(DATABASE_URL)

# SessionLocal (THIS WAS MISSING)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base (THIS WAS ALSO MISSING — REQUIRED FOR MODELS)
Base = declarative_base()

# Test connection
try:
    connection = engine.connect()
    print("PostgreSQL Database Connected Successfully")
    connection.close()
except Exception as e:
    print("Connection Failed:", e)