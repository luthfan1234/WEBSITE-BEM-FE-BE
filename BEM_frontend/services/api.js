/**
 * API service for connecting to the backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Fetches data from the API
 * @param {string} endpoint - The API endpoint to fetch from
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - The API response
 */
async function fetchAPI(endpoint, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, mergedOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}

/**
 * API methods for different endpoints
 */
const api = {
  // Departments
  getDepartments: () => fetchAPI('/departments'),
  
  // Articles
  getArticles: () => fetchAPI('/articles'),
  getArticle: (id) => fetchAPI(`/articles/${id}`),
  
  // Contact form
  submitContact: (formData) => fetchAPI('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  }),
};

export default api;
