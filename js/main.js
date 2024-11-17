/**
 * Main JavaScript file
 * Handles initialization and global functionality
 */

// Global error handler
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ', msg, '\nURL: ', url, '\nLine: ', lineNo, '\nColumn: ', columnNo, '\nError object: ', error);
    return false;
};

/**
 * Initializes the application
 */
function initializeApp() {
    // Add any global initialization here
    console.log('Space Dashboard initialized');
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
