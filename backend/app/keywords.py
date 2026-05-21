import re
import json
from collections import Counter

import nltk
from nltk.corpus import stopwords

from sklearn.feature_extraction.text import TfidfVectorizer


# -----------------------------------
# DOWNLOAD STOPWORDS
# -----------------------------------

nltk.download("stopwords")

stop_words = set(stopwords.words("english"))


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
# TEXT CLEANING
# -----------------------------------

def clean_text(text):

    text = text.lower()

    text = re.sub(r"[^a-zA-Z\s]", "", text)

    text = text.strip()

    return text


# -----------------------------------
# REMOVE STOPWORDS
# -----------------------------------

def remove_stopwords(text):

    words = text.split()

    filtered_words = [

        word for word in words
        if word not in stop_words

    ]

    return " ".join(filtered_words)


# -----------------------------------
# CLEAN POSTS
# -----------------------------------

cleaned_posts = []

for post in sample_posts:

    cleaned = clean_text(post)

    filtered = remove_stopwords(cleaned)

    cleaned_posts.append(filtered)


# -----------------------------------
# DISPLAY CLEANED POSTS
# -----------------------------------

print("\nCLEANED POSTS:\n")

for post in cleaned_posts:

    print(post)


# -----------------------------------
# COUNTER KEYWORD FREQUENCY
# -----------------------------------

all_words = " ".join(cleaned_posts).split()

word_counts = Counter(all_words)

print("\nMOST COMMON WORDS:\n")

for word, count in word_counts.most_common(10):

    print(f"{word}: {count}")


# -----------------------------------
# TF-IDF VECTORIZATION
# -----------------------------------

vectorizer = TfidfVectorizer()

tfidf_matrix = vectorizer.fit_transform(cleaned_posts)

feature_names = vectorizer.get_feature_names_out()


# -----------------------------------
# TF-IDF SCORES
# -----------------------------------

tfidf_scores = tfidf_matrix.sum(axis=0)

keyword_scores = []

for index, word in enumerate(feature_names):

    score = tfidf_scores[0, index]

    keyword_scores.append((word, score))


# -----------------------------------
# SORT KEYWORDS
# -----------------------------------

sorted_keywords = sorted(
    keyword_scores,
    key=lambda x: x[1],
    reverse=True
)


print("\nTRENDING KEYWORDS:\n")

for word, score in sorted_keywords[:10]:

    print(f"{word}: {score:.2f}")


# -----------------------------------
# CHART-READY JSON
# -----------------------------------

chart_data = []

for word, score in sorted_keywords[:10]:

    chart_data.append({

        "keyword": word,
        "score": round(float(score), 2)

    })


# -----------------------------------
# DISPLAY JSON
# -----------------------------------

print("\nCHART READY JSON:\n")

print(json.dumps(chart_data, indent=4))