import requests
from datetime import datetime, timedelta

def fetch_space_news():
    """
    Fetches space-related news from the SpaceFlightNews API
    Returns a list of news articles
    """
    try:
        url = "https://api.spaceflightnewsapi.net/v3/articles?_limit=5"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        return []
    except Exception as e:
        print(f"Error fetching news: {e}")
        return []

def format_news(article):
    """
    Formats a news article for display
    """
    return {
        'title': article.get('title', 'No Title'),
        'summary': article.get('summary', 'No Summary Available'),
        'image_url': article.get('imageUrl', ''),
        'published_date': article.get('publishedAt', ''),
        'url': article.get('url', '#')
    }
