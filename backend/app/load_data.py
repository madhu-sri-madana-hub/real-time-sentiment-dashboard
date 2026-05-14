import pandas as pd

print("SCRIPT STARTED...\n")

twitter_path = "datasets/twitter/twitter_data.csv"
reddit_path = "datasets/reddit/reddit_comments.csv"

# FIX: encoding added
twitter_df = pd.read_csv(twitter_path, encoding="latin1")
reddit_df = pd.read_csv(reddit_path, encoding="latin1")

print("TWITTER SHAPE:", twitter_df.shape)
print("REDDIT SHAPE:", reddit_df.shape)

print("\nTWITTER PREVIEW:")
print(twitter_df.head())

print("\nREDDIT PREVIEW:")
print(reddit_df.head())

print("\nSCRIPT COMPLETED SUCCESSFULLY ✔")