import pandas as pd

from database import SessionLocal
from models import Post

print("SCRIPT STARTED")

# Database session
session = SessionLocal()

# ----------------------------
# STEP 1: LOAD PROCESSED DATA
# ----------------------------
df = pd.read_csv(
    "datasets/processed_sentiment.csv",
    encoding="latin1",
    low_memory=False
)

print("DATA LOADED:", df.shape)

# ----------------------------
# STEP 2: HANDLE MISSING VALUES
# ----------------------------
df["content"] = df["content"].fillna("No Text")

df["sentiment"] = df["sentiment"].fillna("Neutral")

df["confidence_score"] = df["confidence_score"].fillna(0)

# ----------------------------
# STEP 3: REMOVE DUPLICATES
# ----------------------------
before_duplicates = len(df)

df = df.drop_duplicates(subset=["content"])

after_duplicates = len(df)

print(
    "DUPLICATES REMOVED:",
    before_duplicates - after_duplicates
)

# ----------------------------
# STEP 4: INSERT FUNCTION
# ----------------------------
def insert_data(dataframe):

    posts = []

    for _, row in dataframe.iterrows():

        try:
            post = Post(

                text=str(row["content"]),

                cleaned_text=None,

                source=str(
                    row.get("source", "dataset")
                ),

                sentiment=str(row["sentiment"]),

                confidence_score=float(
                    row["confidence_score"]
                )
            )

            posts.append(post)

        except Exception as e:
            print("Skipped row:", e)

    # ----------------------------
    # BULK INSERTION
    # ----------------------------
    session.bulk_save_objects(posts)

    session.commit()

    print("DATA INSERTED SUCCESSFULLY")


# ----------------------------
# STEP 5: RUN INSERTION
# ----------------------------
insert_data(df)

session.close()

print("ALL DATA INSERTED SUCCESSFULLY ✔")