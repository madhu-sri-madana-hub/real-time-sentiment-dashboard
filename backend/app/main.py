from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.topics import router as topics_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# INCLUDE TOPICS ROUTER
app.include_router(topics_router)

@app.get("/")
def home():
    return {"message": "Backend Running"}