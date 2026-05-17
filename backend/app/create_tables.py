from database import engine
from models import Base, Post

print("SCRIPT STARTED")

print(Base.metadata.tables.keys())

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")