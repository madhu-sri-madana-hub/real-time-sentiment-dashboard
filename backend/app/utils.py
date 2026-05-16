from logger import logger
import re

# ---------------------------
# 1. Remove URLs
# ---------------------------
def remove_urls(text):
    return re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)


# ---------------------------
# 2. Remove emojis
# ---------------------------
def remove_emojis(text):
    emoji_pattern = re.compile(
        "["
        "\U0001F600-\U0001F64F"  # emoticons
        "\U0001F300-\U0001F5FF"  # symbols & pictographs
        "\U0001F680-\U0001F6FF"  # transport & map symbols
        "\U0001F1E0-\U0001F1FF"  # flags
        "]+",
        flags=re.UNICODE
    )
    return emoji_pattern.sub(r'', text)


# ---------------------------
# 3. Remove hashtags (keep word)
# Example: #happy → happy
# ---------------------------
def clean_hashtags(text):
    return re.sub(r'#', '', text)


# ---------------------------
# 4. Remove mentions (@user)
# ---------------------------
def remove_mentions(text):
    return re.sub(r'@\w+', '', text)


# ---------------------------
# 5. Convert to lowercase
# ---------------------------
def to_lowercase(text):
    return text.lower()


# ---------------------------
# 6. Remove extra spaces
# ---------------------------
def remove_extra_spaces(text):
    return re.sub(r'\s+', ' ', text).strip()


# ---------------------------
# 7. MASTER CLEANING FUNCTION
# This is what you'll use in your pipeline
# ---------------------------
def clean_text(text):
    try:
        logger.info(f"Cleaning text: {text}")

        text = remove_urls(text)
        text = remove_emojis(text)
        text = clean_hashtags(text)
        text = remove_mentions(text)
        text = to_lowercase(text)
        text = remove_extra_spaces(text)

        logger.info(f"Cleaned text: {text}")

        return text

    except Exception as e:
        logger.error(f"Error in text cleaning: {str(e)}")
        return text