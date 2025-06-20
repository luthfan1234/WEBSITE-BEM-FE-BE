/**
 * API service for articles management with Laravel 11 backend integration
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const articlesApi = {
    // Test Laravel 11 backend connection
    testConnection: async () => {
        try {
            console.log('Testing connection to:', `${API_URL}/health`);
            const response = await fetch(`${API_URL}/health`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                mode: 'cors',
                cache: 'no-cache',
            });
            
            console.log('Health check response status:', response.status);
            
            if (response.ok) {
                const data = await response.json();
                console.log('Backend health check successful:', data);
                return true;
            }
            
            console.log('Health check failed with status:', response.status);
            return false;
        } catch (error) {
            console.error('Backend connection test failed:', error);
            return false;
        }
    },

    // Get all articles from Laravel 11 backend
    getArticles: async () => {
        try {
            console.log('Fetching articles from:', `${API_URL}/articles`);
            
            try {
                // Try direct API connection first
                const response = await fetch(`${API_URL}/articles`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    mode: 'cors',
                    cache: 'no-cache',
                });

                console.log('Direct API response status:', response.status);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('Direct API response:', data);
                    
                    if (data.success && Array.isArray(data.articles)) {
                        return data.articles;
                    }
                    
                    if (Array.isArray(data)) {
                        return data;
                    }
                }
                
                throw new Error('Direct API call failed or returned invalid data');
            } catch (directError) {
                console.warn('Direct API call failed, trying proxy:', directError);
                
                // Fall back to Next.js API proxy
                const proxyResponse = await fetch(`/api/proxy/articles`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                console.log('Proxy API response status:', proxyResponse.status);
                
                if (!proxyResponse.ok) {
                    throw new Error(`Proxy API error! Status: ${proxyResponse.status}`);
                }
                
                const proxyData = await proxyResponse.json();
                console.log('Proxy API response:', proxyData);
                
                if (proxyData.success && Array.isArray(proxyData.articles)) {
                    return proxyData.articles;
                }
                
                if (Array.isArray(proxyData)) {
                    return proxyData;
                }
                
                throw new Error('Proxy API returned invalid data');
            }
        } catch (error) {
            console.error('All API methods failed:', error);
            
            // Final fallback to localStorage
            return getStoredArticlesFallback();
        }
    },
    
    // Get single article by ID from Laravel 11 backend
    getArticle: async (id) => {
        try {
            console.log(`Fetching article ${id} from Laravel backend...`);
            
            try {
                // Try direct API connection first
                const response = await fetch(`${API_URL}/articles/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    mode: 'cors',
                    cache: 'no-cache',
                });

                console.log(`Article ${id} API response status:`, response.status);
                
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Article not found');
                    }
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(`Article ${id} response from Laravel:`, data);
                
                if (data.success && data.article) {
                    return data.article;
                }
                
                throw new Error('Invalid response format from Laravel backend');
            } catch (directError) {
                console.warn(`Direct API call for article ${id} failed, trying proxy:`, directError);
                
                // Try Next.js API proxy as fallback
                try {
                    const proxyResponse = await fetch(`/api/proxy/articles/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    
                    if (!proxyResponse.ok) {
                        throw new Error(`Proxy API error! Status: ${proxyResponse.status}`);
                    }
                    
                    const proxyData = await proxyResponse.json();
                    
                    if (proxyData.success && proxyData.article) {
                        return proxyData.article;
                    }
                    
                    throw new Error('Proxy API returned invalid data');
                } catch (proxyError) {
                    console.error(`Proxy API call for article ${id} failed:`, proxyError);
                    throw directError; // Re-throw the original error
                }
            }
        } catch (error) {
            console.error(`Error fetching article ${id} from Laravel backend:`, error);
            
            // Fallback to localStorage
            return getArticleFallback(id);
        }
    },
    
    // Create new article in Laravel 11 backend
    createArticle: async (articleData) => {
        try {
            console.log('Creating new article:', articleData);
            
            // Try direct API connection first
            try {
                const response = await fetch(`${API_URL}/articles`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(articleData),
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Article created response:', data);
                
                if (data.success) {
                    return { success: true, article: data.article };
                }
                
                throw new Error('Invalid response format from backend');
            } catch (directError) {
                console.warn('Direct API call failed, using localStorage fallback:', directError);
                
                // Fallback to localStorage
                return createArticleFallback(articleData);
            }
        } catch (error) {
            console.error('Error creating article:', error);
            throw error;
        }
    },
    
    // Update article in Laravel 11 backend
    updateArticle: async (id, articleData) => {
        try {
            console.log(`Updating article ${id}:`, articleData);
            
            // Try direct API connection first
            try {
                const response = await fetch(`${API_URL}/articles/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(articleData),
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Article updated response:', data);
                
                if (data.success) {
                    return { success: true, article: data.article };
                }
                
                throw new Error('Invalid response format from backend');
            } catch (directError) {
                console.warn(`Direct API call for updating article ${id} failed, using localStorage fallback:`, directError);
                
                // Fallback to localStorage
                return updateArticleFallback(id, articleData);
            }
        } catch (error) {
            console.error(`Error updating article ${id}:`, error);
            throw error;
        }
    },
    
    // Delete article from Laravel 11 backend
    deleteArticle: async (id) => {
        try {
            console.log(`Deleting article ${id}`);
            
            // Try direct API connection first
            try {
                const response = await fetch(`${API_URL}/articles/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Article deleted response:', data);
                
                if (data.success) {
                    return { success: true };
                }
                
                throw new Error('Invalid response format from backend');
            } catch (directError) {
                console.warn(`Direct API call for deleting article ${id} failed, using localStorage fallback:`, directError);
                
                // Fallback to localStorage
                return deleteArticleFallback(id);
            }
        } catch (error) {
            console.error(`Error deleting article ${id}:`, error);
            throw error;
        }
    },

    // Get dashboard stats from Laravel 11 backend
    getDashboardStats: async () => {
        try {
            console.log('Fetching dashboard stats from backend...');
            
            try {
                // Try direct API connection first
                const response = await fetch(`${API_URL}/dashboard/stats`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    mode: 'cors',
                    cache: 'no-cache',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Dashboard stats from backend:', data);
                
                if (data.success) {
                    return data;
                }
                
                throw new Error('Invalid response format from backend');
            } catch (directError) {
                console.warn('Direct API call for dashboard stats failed, trying proxy:', directError);
                
                // Try Next.js API proxy as fallback
                try {
                    const proxyResponse = await fetch(`/api/proxy/dashboard/stats`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    
                    if (!proxyResponse.ok) {
                        throw new Error(`Proxy API error! Status: ${proxyResponse.status}`);
                    }
                    
                    const proxyData = await proxyResponse.json();
                    console.log('Dashboard stats from proxy:', proxyData);
                    
                    if (proxyData.success) {
                        return proxyData;
                    }
                    
                    throw new Error('Proxy API returned invalid data');
                } catch (proxyError) {
                    console.error('Proxy API call for dashboard stats failed:', proxyError);
                    throw directError; // Re-throw the original error
                }
            }
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            
            // Calculate stats from localStorage as fallback
            return getDashboardStatsFallback();
        }
    },
};

// Helper function to get article fallback from localStorage
const getArticleFallback = async (id) => {
    console.log(`Using fallback for article ${id}`);
    
    if (typeof window === 'undefined') {
        throw new Error('Article not found');
    }
    
    // Get articles from localStorage
    const stored = localStorage.getItem('bemsvuns_articles');
    let articles = [];
    
    if (stored) {
        try {
            articles = JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing stored articles:', e);
        }
    }
    
    // If no stored articles, generate default ones
    if (!articles || articles.length === 0) {
        articles = [
            {
                id: 1,
                title: 'Pelatihan Kepemimpinan Mahasiswa Tingkat Dasar 2024',
                category: 'Kaderisasi',
                author: 'Humas BEM SV UNS',
                date: '15 MAR 2024',
                status: 'published',
                excerpt: 'BEM SV UNS mengadakan pelatihan kepemimpinan untuk mahasiswa baru angkatan 2024',
                image: 'https://via.placeholder.com/400x250/21E786/ffffff?text=PKMD+2024',
                content: 'Badan Eksekutif Mahasiswa Sekolah Vokasi UNS (BEM SV UNS) telah sukses menyelenggarakan kegiatan Pelatihan Kepemimpinan Mahasiswa Tingkat Dasar (PKMD) 2024. Kegiatan ini bertujuan untuk membekali mahasiswa baru dengan pengetahuan dan keterampilan kepemimpinan yang akan berguna dalam kehidupan berorganisasi maupun di masyarakat.',
                tags: ['Kaderisasi', 'Kepemimpinan', 'Mahasiswa']
            },
            {
                id: 2,
                title: 'Bakti Sosial di Panti Asuhan Harapan Mulia',
                category: 'Sosial',
                author: 'Humas BEM SV UNS',
                date: '20 FEB 2024',
                status: 'published',
                excerpt: 'Kegiatan bakti sosial sebagai wujud kepedulian mahasiswa terhadap masyarakat sekitar',
                image: 'https://via.placeholder.com/400x250/28a745/ffffff?text=Bakti+Sosial',
                content: 'BEM SV UNS mengadakan kegiatan bakti sosial di Panti Asuhan Harapan Mulia sebagai wujud kepedulian mahasiswa terhadap masyarakat sekitar. Kegiatan ini memberikan bantuan berupa sembako, buku pelajaran, dan alat tulis untuk anak-anak panti asuhan.',
                tags: ['Sosial', 'Bakti Sosial']
            }
        ];
        
        // Store the default articles for future use
        localStorage.setItem('bemsvuns_articles', JSON.stringify(articles));
    }
    
    // Find the requested article
    const article = articles.find(a => a.id == id);
    
    if (!article) {
        throw new Error('Article not found');
    }
    
    // Add navigation articles
    const currentIndex = articles.findIndex(a => a.id == id);
    const publishedArticles = articles.filter(a => a.status === 'published');
    const currentPublishedIndex = publishedArticles.findIndex(a => a.id == id);
    
    const result = {
        ...article,
        prevArticle: currentPublishedIndex > 0 ? {
            id: publishedArticles[currentPublishedIndex - 1].id,
            title: publishedArticles[currentPublishedIndex - 1].title,
            image: publishedArticles[currentPublishedIndex - 1].image
        } : null,
        nextArticle: currentPublishedIndex < publishedArticles.length - 1 ? {
            id: publishedArticles[currentPublishedIndex + 1].id,
            title: publishedArticles[currentPublishedIndex + 1].title,
            image: publishedArticles[currentPublishedIndex + 1].image
        } : null
    };
    
    return result;
};

// Helper function to get stored articles fallback
const getStoredArticlesFallback = () => {
    console.log('Fetching articles from localStorage fallback...');
    
    if (typeof window === 'undefined') {
        return [];
    }
    
    const stored = localStorage.getItem('bemsvuns_articles');
    
    if (stored) {
        try {
            const articles = JSON.parse(stored);
            
            if (Array.isArray(articles)) {
                console.log('Articles fetched from localStorage:', articles);
                return articles;
            }
        } catch (e) {
            console.error('Error parsing stored articles:', e);
        }
    }
    
    // Default fallback articles
    const defaultArticles = [
        {
            id: 1,
            title: 'Pelatihan Kepemimpinan Mahasiswa Tingkat Dasar 2024',
            category: 'Kaderisasi',
            author: 'Humas BEM SV UNS',
            date: '15 MAR 2024',
            status: 'published',
            excerpt: 'BEM SV UNS mengadakan pelatihan kepemimpinan untuk mahasiswa baru angkatan 2024',
            image: 'https://via.placeholder.com/400x250/21E786/ffffff?text=PKMD+2024',
            content: 'Badan Eksekutif Mahasiswa Sekolah Vokasi UNS (BEM SV UNS) telah sukses menyelenggarakan kegiatan Pelatihan Kepemimpinan Mahasiswa Tingkat Dasar (PKMD) 2024.',
            tags: ['Kaderisasi', 'Kepemimpinan', 'Mahasiswa']
        },
        {
            id: 2,
            title: 'Bakti Sosial di Panti Asuhan Harapan Mulia',
            category: 'Sosial',
            author: 'Humas BEM SV UNS',
            date: '20 FEB 2024',
            status: 'published',
            excerpt: 'Kegiatan bakti sosial sebagai wujud kepedulian mahasiswa terhadap masyarakat sekitar',
            image: 'https://via.placeholder.com/400x250/28a745/ffffff?text=Bakti+Sosial',
            content: 'BEM SV UNS mengadakan kegiatan bakti sosial di Panti Asuhan Harapan Mulia.',
            tags: ['Sosial', 'Bakti Sosial']
        }
    ];
    
    localStorage.setItem('bemsvuns_articles', JSON.stringify(defaultArticles));
    return defaultArticles;
};

// Helper functions for localStorage fallback
const createArticleFallback = (articleData) => {
  if (typeof window === 'undefined') {
    throw new Error('Cannot use localStorage in server environment');
  }
  
  const stored = localStorage.getItem('bemsvuns_articles');
  let articles = [];
  
  if (stored) {
    try {
      articles = JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored articles:', e);
    }
  }
  
  // Generate new ID
  const newId = articles.length > 0 
    ? Math.max(...articles.map(a => Number(a.id))) + 1 
    : 1;
  
  // Create new article
  const newArticle = {
    ...articleData,
    id: newId,
    date: articleData.date || new Date().toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).toUpperCase(),
    author: articleData.author || 'Admin BEM SV UNS',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  // Add to articles array
  articles.unshift(newArticle);
  
  // Save to localStorage
  localStorage.setItem('bemsvuns_articles', JSON.stringify(articles));
  
  return { success: true, article: newArticle };
};

const updateArticleFallback = (id, articleData) => {
  if (typeof window === 'undefined') {
    throw new Error('Cannot use localStorage in server environment');
  }
  
  const stored = localStorage.getItem('bemsvuns_articles');
  let articles = [];
  
  if (stored) {
    try {
      articles = JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored articles:', e);
    }
  }
  
  // Find article index
  const index = articles.findIndex(a => a.id == id);
  
  if (index === -1) {
    throw new Error(`Article with ID ${id} not found`);
  }
  
  // Update article
  const updatedArticle = {
    ...articles[index],
    ...articleData,
    updated_at: new Date().toISOString()
  };
  
  articles[index] = updatedArticle;
  
  // Save to localStorage
  localStorage.setItem('bemsvuns_articles', JSON.stringify(articles));
  
  return { success: true, article: updatedArticle };
};

const deleteArticleFallback = (id) => {
  if (typeof window === 'undefined') {
    throw new Error('Cannot use localStorage in server environment');
  }
  
  const stored = localStorage.getItem('bemsvuns_articles');
  let articles = [];
  
  if (stored) {
    try {
      articles = JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored articles:', e);
    }
  }
  
  // Find article index
  const index = articles.findIndex(a => a.id == id);
  
  if (index === -1) {
    throw new Error(`Article with ID ${id} not found`);
  }
  
  // Remove article
  articles.splice(index, 1);
  
  // Save to localStorage
  localStorage.setItem('bemsvuns_articles', JSON.stringify(articles));
  
  return { success: true };
};

const getDashboardStatsFallback = async () => {
    console.log('Using dashboard stats fallback');
    
    if (typeof window === 'undefined') {
        return {
            success: false,
            totalArticles: 0,
            publishedArticles: 0,
            draftArticles: 0,
            totalDepartments: 0,
            totalUsers: 0,
            recentActivity: []
        };
    }
    
    // Get articles from localStorage
    const stored = localStorage.getItem('bemsvuns_articles');
    let articles = [];
    
    if (stored) {
        try {
            articles = JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing stored articles:', e);
        }
    }
    
    // If no stored articles, use defaults
    if (!articles || articles.length === 0) {
        articles = [
            {
                id: 1,
                title: 'Pelatihan Kepemimpinan Mahasiswa Tingkat Dasar 2024',
                category: 'Kaderisasi',
                status: 'published',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 2,
                title: 'Bakti Sosial di Panti Asuhan Harapan Mulia',
                category: 'Sosial',
                status: 'published',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ];
    }
    
    // Calculate stats
    const publishedArticles = articles.filter(a => a.status === 'published');
    const draftArticles = articles.filter(a => a.status === 'draft');
    
    // Generate fallback activity
    const recentActivity = [
        {
            type: 'system',
            message: 'Using localStorage fallback mode',
            time: 'Just now',
            icon: 'fas fa-database',
            color: 'text-warning'
        },
        {
            type: 'alert',
            message: 'Backend connection unavailable',
            time: 'Just now',
            icon: 'fas fa-exclamation-triangle',
            color: 'text-danger'
        }
    ];
    
    return {
        success: true,
        totalArticles: articles.length,
        publishedArticles: publishedArticles.length,
        draftArticles: draftArticles.length,
        totalDepartments: 8,
        totalUsers: 5,
        recentActivity: recentActivity
    };
};

export default articlesApi;
