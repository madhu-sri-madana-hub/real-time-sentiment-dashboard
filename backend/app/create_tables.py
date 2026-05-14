from database import engine
from models import Base

print("SCRIPT STARTED")

Base.metadata.create_all(engine)

print("Tables created successfully!")