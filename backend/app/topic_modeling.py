import re
import json

from sklearn.feature_extraction.text import TfidfVectorizer
from bertopic import BERTopic
from sentence_transformers import SentenceTransformer


# -----------------------------------
# SAMPLE POSTS
# -----------------------------------

sample_posts = [

    "AI dashboard performance improved significantly",

    "The analytics UI looks modern and clean",

    "Users are complaining about loading speed",

    "New sentiment charts are amazing",

    "The application crashes during login",

    "Real-time monitoring is very helpful",

    "Topic detection feature works perfectly",

    "Negative sentiment increased after update",

    "Dashboard animations look beautiful",

    "Performance optimization is needed"

]


# -----------------------------------
# TEXT CLEANING FUNCTION
# -----------------------------------

def clean_text(text):

    text = text.lower()

    text = re.sub(r"[^a-zA-Z\s]", "", text)

    text = text.strip()

    return text


# -----------------------------------
# CLEAN POSTS
# -----------------------------------

cleaned_posts = [clean_text(post) for post in sample_posts]

print("\nCLEANED POSTS:\n")

for post in cleaned_posts:

    print(post)


# -----------------------------------
# TF-IDF VECTORIZATION
# -----------------------------------

vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=100
)

tfidf_matrix = vectorizer.fit_transform(cleaned_posts)

print("\nTF-IDF SHAPE:")

print(tfidf_matrix.shape)


# -----------------------------------
# SENTENCE TRANSFORMER MODEL
# -----------------------------------

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


# -----------------------------------
# BERTopic MODEL
# -----------------------------------

topic_model = BERTopic(
    embedding_model=embedding_model,
    vectorizer_model=vectorizer,
    min_topic_size=2,
    verbose=True
)


# -----------------------------------
# GENERATE TOPICS
# -----------------------------------

topics, probs = topic_model.fit_transform(cleaned_posts)


# -----------------------------------
# SAVE TOPICS TO DATABASE
# -----------------------------------

from database import SessionLocal
from models import Topic

db = SessionLocal()

topic_info = topic_model.get_topic_info()

for _, row in topic_info.iterrows():

    topic_id = row["Topic"]

    if topic_id == -1:
        continue  # ignore noise topic

    words = topic_model.get_topic(topic_id)

    topic_name = " / ".join([w[0].capitalize() for w in words[:3]])

    db_topic = Topic(
        topic_id=int(topic_id),
        topic_name=topic_name
    )

    db.merge(db_topic)  # avoids duplicates

db.commit()
db.close()

print("Topics saved to database successfully")

# -----------------------------------
# TOPIC RESULTS
# -----------------------------------

print("\nTOPIC RESULTS:\n")

for index, topic in enumerate(topics):

    print(f"Post {index + 1}: Topic {topic}")


# -----------------------------------
# TOPIC CONFIDENCE SCORES
# -----------------------------------

print("\nTOPIC CONFIDENCE SCORES:\n")

for index, prob in enumerate(probs):

    if prob is not None:

        confidence = round(float(prob), 2)

    else:

        confidence = 0.0

    print(f"Post {index + 1}: Confidence = {confidence}")
    

# -----------------------------------
# TOPIC INFORMATION
# -----------------------------------

print("\nTOPIC KEYWORDS:\n")

topic_info = topic_model.get_topic_info()

print(topic_info)


# -----------------------------------
# CLEAN TOPIC NAMES
# -----------------------------------

def clean_topic_name(topic_words):

    cleaned = []

    for word, _ in topic_words:

        cleaned.append(word.capitalize())

    return " / ".join(cleaned[:3])


# -----------------------------------
# DISPLAY CLEAN TOPICS
# -----------------------------------

print("\nCLEANED TOPIC NAMES:\n")

unique_topics = set(topics)

for topic in unique_topics:

    if topic != -1:

        words = topic_model.get_topic(topic)

        clean_name = clean_topic_name(words)

        print(f"Topic {topic}: {clean_name}")


# -----------------------------------
# TOPIC SUMMARIES
# -----------------------------------

print("\nTOPIC SUMMARIES:\n")

topic_summaries = []

for topic in unique_topics:

    if topic != -1:

        words = topic_model.get_topic(topic)

        clean_name = clean_topic_name(words)

        topic_data = {

            "topic_id": int(topic),

            "topic_name": clean_name,

            "keywords": [word for word, _ in words[:5]]

        }

        topic_summaries.append(topic_data)

        print(topic_data)


# -----------------------------------
# CHART READY JSON
# -----------------------------------

print("\nCHART READY TOPIC JSON:\n")

chart_data = []

for topic in unique_topics:

    if topic != -1:

        topic_count = topics.count(topic)

        words = topic_model.get_topic(topic)

        clean_name = clean_topic_name(words)

        chart_data.append({

            "topic_id": int(topic),

            "topic_name": clean_name,

            "post_count": topic_count

        })

print(json.dumps(chart_data, indent=4))