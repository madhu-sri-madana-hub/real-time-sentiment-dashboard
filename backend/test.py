from bertopic import BERTopic

docs = [
    "I love AI and machine learning",
    "Python is amazing for NLP",
    "Deep learning is powerful",
    "Transformers changed NLP",
    "ChatGPT is very useful",
    "I enjoy coding in Python",
    "Machine learning is interesting",
    "Artificial intelligence is growing fast",
    "Data science is exciting",
    "Neural networks are complex",

    "I hate slow internet",
    "This movie was terrible",
    "The service was very bad",
    "I am frustrated with this app",
    "The laptop battery drains quickly",
    "Customer support was awful",
    "This phone overheats a lot",
    "The food tasted horrible",
    "Traffic is very annoying",
    "The website crashes frequently"
]

print("Loading BERTopic...")

topic_model = BERTopic()

topics, probs = topic_model.fit_transform(docs)

print("Topics:")
print(topics)