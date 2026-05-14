import pandas as pd
from database import SessionLocal
from models import Post

print("SCRIPT STARTED")

session = SessionLocal()

# ✅ FIX 1: correct encoding handling
twitter_df = pd.read_csv(
    "datasets/twitter/twitter_data.csv",
    encoding="latin-1",
    on_bad_lines="skip"
)

reddit_df = pd.read_csv(
    "datasets/reddit/reddit_comments.csv",
    encoding="latin-1",
    on_bad_lines="skip"
)

print("DATA LOADED SUCCESSFULLY")

# ✅ FIX 2: insert safely row-by-row
def insert_data(df, source_name):
    for _, row in df.iterrows():
        try:
            text_value = str(row.get("text", ""))

            # skip bad rows like column name repeating
            if text_value.lower() in ["text", "", "nan"]:
                continue

            post = Post(
                text=text_value,
                cleaned_text=str(row.get("cleaned_text", text_value)),
                source=source_name
            )

            session.add(post)

        except Exception as e:
            print(f"Skipped row:", e)

    session.commit()
    print(f"{source_name} inserted successfully")

print("Inserting Twitter data...")
insert_data(twitter_df, "twitter")

print("Inserting Reddit data...")
insert_data(reddit_df, "reddit")

session.close()
print("ALL DATA INSERTED SUCCESSFULLY")