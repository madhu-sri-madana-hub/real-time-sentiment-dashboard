import nltk
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from logger import logger   # ✅ ADD THIS

# nltk.download('vader_lexicon')  # run once only

analyzer = SentimentIntensityAnalyzer()


# ----------------------------
# SENTIMENT ANALYSIS FUNCTION
# ----------------------------
def get_sentiment(text):

    logger.info(f"Processing text: {text}")  # ✅ LOG 1

    scores = analyzer.polarity_scores(text)
    compound = scores['compound']

    # classify sentiment
    if compound >= 0.05:
        sentiment = "positive"
    elif compound <= -0.05:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    result = {
        "sentiment": sentiment,
        "confidence": compound,
        "scores": scores
    }

    logger.info(f"Sentiment result: {result}")  # ✅ LOG 2

    return result


# ----------------------------
# TEST BLOCK
# ----------------------------
if __name__ == "__main__":
    test_text = "I love this dashboard! It works perfectly 😍🔥"

    result = get_sentiment(test_text)

    print("Input Text:", test_text)
    print("Result:", result)