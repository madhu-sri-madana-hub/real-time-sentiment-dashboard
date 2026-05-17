import nltk
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from logger import logger

# nltk.download('vader_lexicon')  # run once only

analyzer = SentimentIntensityAnalyzer()


# ----------------------------
# MAIN FUNCTION (for backend / API / dashboard)
# ----------------------------
def get_sentiment(text):
    try:
        logger.info(f"Processing text: {text}")

        scores = analyzer.polarity_scores(text)
        compound = scores['compound']

        if compound >= 0.05:
            sentiment = "positive"
        elif compound <= -0.05:
            sentiment = "negative"
        else:
            sentiment = "neutral"

        result = {
            "sentiment": sentiment,
            "confidence": abs(compound),
            "scores": scores
        }

        logger.info(f"Sentiment result: {result}")

        return result

    except Exception as e:
        logger.error(f"Error in get_sentiment: {e}")
        return {
            "sentiment": "neutral",
            "confidence": 0.0,
            "scores": {}
        }


# ----------------------------
# DAY 2 REQUIRED FUNCTION (simple output)
# ----------------------------
def analyze_sentiment(text):
    try:
        scores = analyzer.polarity_scores(text)
        compound = scores['compound']

        if compound >= 0.05:
            sentiment = "Positive"
        elif compound <= -0.05:
            sentiment = "Negative"
        else:
            sentiment = "Neutral"

        confidence = abs(compound)

        return sentiment, confidence

    except Exception as e:
        logger.error(f"Error in analyze_sentiment: {e}")
        return "Neutral", 0.0


# ----------------------------
# TESTING BLOCK
# ----------------------------
if __name__ == "__main__":
    test_text = "I love this dashboard! It works perfectly 😍🔥"

    print("=== get_sentiment (JSON output) ===")
    print(get_sentiment(test_text))

    print("\n=== analyze_sentiment (simple output) ===")
    print(analyze_sentiment(test_text))