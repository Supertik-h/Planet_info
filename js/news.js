/**
 * Space News Module
 * Handles fetching and displaying space-related news from the SpaceFlightNews API
 */

const NEWS_API_URL = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=5';

/**
 * Fetches space news from the API
 * @returns {Promise<Array>} Array of news articles
 */
async function fetchSpaceNews() {
    try {
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

/**
 * Formats a news article for display
 * @param {Object} article - The article object from the API
 * @returns {Object} Formatted article object
 */
function formatNewsArticle(article) {
    return {
        title: article.title || 'No Title',
        summary: article.summary || 'No Summary Available',
        imageUrl: article.imageUrl || '',
        publishedDate: new Date(article.publishedAt).toLocaleDateString(),
        url: article.url || '#'
    };
}

/**
 * Creates HTML for a single news article
 * @param {Object} article - The formatted article object
 * @returns {string} HTML string for the article
 */
function createArticleHTML(article) {
    return `
        <article>
            <h3>${article.title}</h3>
            ${article.imageUrl ? `<img src="${article.imageUrl}" alt="${article.title}">` : ''}
            <p>${article.summary}</p>
            <div class="article-footer">
                <span>Published: ${article.publishedDate}</span>
                <a href="${article.url}" target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
        </article>
    `;
}

/**
 * Initializes the news section
 * Fetches and displays news articles
 */
async function initializeNews() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;

    // Show loading state
    newsContainer.innerHTML = '<p>Loading news...</p>';

    try {
        const articles = await fetchSpaceNews();
        if (articles.length === 0) {
            newsContainer.innerHTML = '<p>No news articles available.</p>';
            return;
        }

        const newsHTML = articles
            .map(article => createArticleHTML(formatNewsArticle(article)))
            .join('');
        
        newsContainer.innerHTML = newsHTML;
    } catch (error) {
        console.error('Error initializing news:', error);
        newsContainer.innerHTML = '<p>Error loading news. Please try again later.</p>';
    }
}

// Initialize news when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeNews);
