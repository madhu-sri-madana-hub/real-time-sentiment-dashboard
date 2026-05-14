import pandas as pd
import re
import os

# -------------------------------
# CLEANING FUNCTION (COMMON)
# -------------------------------
def clean_text(text):
    text = str(text)

    text = re.sub(r'http\S+|www\S+', '', text)
    text = re.sub(r'@\w+', '', text)
    text = re.sub(r'#\w+', '', text)
    text = re.sub(r'[^A-Za-z0-9\s]', '', text)
    text = text.lower()
    text = re.sub(r'\s+', ' ', text).strip()

    return text

# -------------------------------
# OUTPUT FOLDER
# -------------------------------
os.makedirs("cleaned_data", exist_ok=True)

# ======================================================
# 1. TWITTER DATA
# ======================================================
twitter_path = "datasets/twitter/twitter_data.csv"

twitter_columns = [
    "sentiment", "id", "date", "query", "user", "text"
]

twitter_df = pd.read_csv(twitter_path, encoding="latin-1", names=twitter_columns)

twitter_df["cleaned_text"] = twitter_df["text"].apply(clean_text)
twitter_df.drop_duplicates(inplace=True)

twitter_df.to_csv("cleaned_data/twitter_cleaned.csv", index=False)

print("Twitter dataset cleaned")

# ======================================================
# 2. REDDIT DATA
# ======================================================
reddit_path = "datasets/reddit/reddit_comments.csv"

reddit_df = pd.read_csv(reddit_path)

# detect text column automatically
possible_cols = ["comment", "body", "text", "Content", "content"]

text_col = None
for col in possible_cols:
    if col in reddit_df.columns:
        text_col = col
        break

if text_col is None:
    raise Exception(f"No text column found in Reddit dataset: {reddit_df.columns}")

reddit_df["cleaned_text"] = reddit_df[text_col].apply(clean_text)
reddit_df.drop_duplicates(inplace=True)

reddit_df.to_csv("cleaned_data/reddit_cleaned.csv", index=False)

print("Reddit dataset cleaned")

print("All datasets processed successfully!")