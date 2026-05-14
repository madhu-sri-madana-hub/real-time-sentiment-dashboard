from datasets import load_dataset
import pandas as pd
import os

# create folder
os.makedirs("datasets/reddit", exist_ok=True)

# WORKING dataset (no reddit-tifu, no mteb)
dataset = load_dataset("go_emotions", split="train")

df = pd.DataFrame(dataset)

# convert text column safely
df = df[["text"]]

# save file
df.to_csv("datasets/reddit/reddit_comments.csv", index=False)

print("Reddit dataset saved successfully")