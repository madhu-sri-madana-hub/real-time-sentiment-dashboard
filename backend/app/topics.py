from fastapi import APIRouter
from app.database import SessionLocal
from app.models import Topic

router = APIRouter()

@router.get("/topics")
def get_topics():

    db = SessionLocal()
    topics = db.query(Topic).all()

    result = []

    for t in topics:
        result.append({
            "topic_id": t.topic_id,
            "topic_name": t.topic_name
        })

    db.close()
    return result