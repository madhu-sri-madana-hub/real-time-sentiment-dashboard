from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime, UTC

Base = declarative_base()

# -----------------------------------
# POSTS TABLE
# -----------------------------------

class Post(Base):

    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, autoincrement=True)

    text = Column(String)
    cleaned_text = Column(String)

    source = Column(String)

    sentiment = Column(String)
    confidence_score = Column(Float)

    platform = Column(String)

    topic_id = Column(Integer)

    processed_at = Column(
        DateTime,
        default=lambda: datetime.now(UTC)
    )

# -----------------------------------
# TOPICS TABLE
# -----------------------------------

class Topic(Base):

    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, autoincrement=True)

    topic_id = Column(Integer, unique=True)
    topic_name = Column(String)