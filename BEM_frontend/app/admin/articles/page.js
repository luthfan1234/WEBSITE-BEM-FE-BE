'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import articlesApi from '@/services/articlesApi';

export default function AdminArticles() {
    const searchParams = useSearchParams();
    const statusFilter = searchParams.get('status') || 'all';
    const tagFilter = searchParams.get('tag') || '';
    
    // Ministry tags mapping
    const MINISTRY_TAGS = {
        'kemahasiswaan': ['kemahasiswaan', 'advokasi', 'kesejahteraan', 'kreasi', 'potensi'],
        'sosma': ['sosma', 'sosial', 'masyarakat', 'pengabdian', 'community'],
        'kominfo': ['kominfo', 'komunikasi', 'informasi', 'media', 'publikasi', 'humas'],
        'dalam_negeri': ['dalam_negeri', 'internal', 'organisasi', 'kaderisasi'],
        'luar_negeri': ['luar_negeri', 'eksternal', 'kerjasama', 'partnership'],
        'perekonomian': ['perekonomian', 'ekonomi', 'kewirausahaan', 'bisnis', 'umkm'],
        'kesehatan': ['kesehatan', 'medis', 'hidup_sehat', 'olahraga', 'wellness'],
        'pendidikan': ['pendidikan', 'akademik', 'pembelajaran', 'beasiswa', 'edukasi']
    };

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [backendStatus, setBackendStatus] = useState('checking');

    useEffect(() => {
        fetchArticles();
    }, [statusFilter]);

    const fetchArticles = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Check backend connection
            const isConnected = await articlesApi.testConnection();
            setBackendStatus(isConnected ? 'connected' : 'disconnected');
            
            const allArticles = await articlesApi.getArticles();
            
            // Filter articles based on status and tag
            let filteredArticles = allArticles;
            if (statusFilter !== 'all') {
                filteredArticles = filteredArticles.filter(article => article.status === statusFilter);
            }
            
            if (tagFilter) {
                filteredArticles = filteredArticles.filter(article => 
                    article.tags?.some(tag => tag.toLowerCase().includes(tagFilter.toLowerCase()))
                );
            }
            
            // Sort articles by newest first (based on id for simplicity)
            filteredArticles.sort((a, b) => b.id - a.id);
            
            setArticles(filteredArticles);
        } catch (error) {
            console.error('Error fetching articles:', error);
            setError('Failed to fetch articles. ' + error.message);
            setArticles([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
            return;
        }

        setDeleteId(id);
        setIsDeleting(true);
        
        try {
            const result = await articlesApi.deleteArticle(id);
            
            if (result.success) {
                // Immediately remove from local state for instant UI update
                setArticles(prevArticles => prevArticles.filter(article => article.id !== id));
                
                // Show success message
                alert('Article deleted successfully!');
                
                // Refresh data from backend to ensure consistency
                setTimeout(() => {
                    fetchArticles();
                }, 500);
            } else {
                throw new Error('Delete operation failed');
            }
        } catch (error) {
            console.error('Error deleting article:', error);
            alert('Failed to delete article. Please try again.');
            
            // Refresh data to show current state
            fetchArticles();
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'published':
                return <span className="badge bg-success">Published</span>;
            case 'draft':
                return <span className="badge bg-warning">Draft</span>;
            default:
                return <span className="badge bg-secondary">{status}</span>;
        }
    };

    return (
        <AdminLayout>
            <div className="admin-dashboard">
                <div className="tf-container">
                    <div className="row">
                        <AdminSidebar />
                        
                        <div className="col-lg-9">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 style={{ margin: 0, color: '#333' }}>Manage Articles</h2>
                                <div className="d-flex align-items-center">
                                    {backendStatus !== 'checking' && (
                                        <div style={{ 
                                            padding: '0.25rem 0.5rem', 
                                            borderRadius: '4px', 
                                            fontSize: '0.8rem',
                                            marginRight: '0.75rem',
                                            background: backendStatus === 'connected' ? '#d4edda' : '#fff3cd',
                                            color: backendStatus === 'connected' ? '#155724' : '#856404'
                                        }}>
                                            {backendStatus === 'connected' ? '🟢 Backend Connected' : '🟡 Using Fallback'}
                                        </div>
                                    )}
                                    <Link href="/admin/articles/create" className="admin-btn admin-btn-primary">
                                        <i className="fas fa-plus"></i> New Article
                                    </Link>
                                </div>
                            </div>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            
                            <div className="admin-card">
                                <div className="admin-card-header">
                                    <ul className="nav nav-tabs admin-card-tabs">
                                        <li className="nav-item">
                                            <Link 
                                                href="/admin/articles" 
                                                className={`nav-link ${statusFilter === 'all' && !tagFilter ? 'active' : ''}`}
                                            >
                                                All
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link 
                                                href="/admin/articles?status=published" 
                                                className={`nav-link ${statusFilter === 'published' ? 'active' : ''}`}
                                            >
                                                Published
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link 
                                                href="/admin/articles?status=draft" 
                                                className={`nav-link ${statusFilter === 'draft' ? 'active' : ''}`}
                                            >
                                                Drafts
                                            </Link>
                                        </li>
                                    </ul>
                                    
                                    {/* Ministry Filter Dropdown */}
                                    <div className="mt-3">
                                        <div className="row align-items-center">
                                            <div className="col-md-6">
                                                <select 
                                                    className="form-select form-select-sm"
                                                    value={tagFilter}
                                                    onChange={(e) => {
                                                        const newTag = e.target.value;
                                                        const url = new URL(window.location);
                                                        if (newTag) {
                                                            url.searchParams.set('tag', newTag);
                                                        } else {
                                                            url.searchParams.delete('tag');
                                                        }
                                                        window.location.href = url.toString();
                                                    }}
                                                >
                                                    <option value="">Filter by Ministry...</option>
                                                    {Object.keys(MINISTRY_TAGS).map(ministry => (
                                                        <option key={ministry} value={ministry}>
                                                            {ministry.replace('_', ' ').toUpperCase()}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {tagFilter && (
                                                <div className="col-md-6">
                                                    <small className="text-muted">
                                                        Filtering by: <strong>{tagFilter.replace('_', ' ').toUpperCase()}</strong>
                                                        <Link href="/admin/articles" className="ms-2 text-danger">
                                                            <i className="fas fa-times"></i> Clear
                                                        </Link>
                                                    </small>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="admin-card-body">
                                    {isLoading ? (
                                        <div className="text-center p-5">
                                            <div className="admin-spinner"></div>
                                            <p className="mt-3">Loading articles...</p>
                                        </div>
                                    ) : articles.length === 0 ? (
                                        <div className="text-center p-5">
                                            <p>No articles found.</p>
                                            <Link href="/admin/articles/create" className="admin-btn admin-btn-primary mt-3">
                                                Create Your First Article
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table admin-table">
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Category</th>
                                                        <th>Status</th>
                                                        <th>Date</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {articles.map((article) => (
                                                        <tr key={article.id}>
                                                            <td>
                                                                <div className="article-title-cell">
                                                                    {article.image && (
                                                                        <div className="article-thumbnail" style={{
                                                                            width: '50px',
                                                                            height: '28px', /* 16:9 ratio */
                                                                            overflow: 'hidden',
                                                                            borderRadius: '4px',
                                                                            marginRight: '10px'
                                                                        }}>
                                                                            <img 
                                                                                src={article.image} 
                                                                                alt={article.title}
                                                                                onError={(e) => {
                                                                                    e.target.src = 'https://via.placeholder.com/50x28/f0f0f0/666666?text=No+Image'
                                                                                }}
                                                                                style={{
                                                                                    width: '100%',
                                                                                    height: '100%',
                                                                                    objectFit: 'cover',
                                                                                    objectPosition: 'center'
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    <div className="article-title">
                                                                        <Link 
                                                                            href={`/admin/articles/edit/${article.id}`}
                                                                            className="article-title-link"
                                                                        >
                                                                            {article.title.length > 50 
                                                                                ? `${article.title.substring(0, 50)}...` 
                                                                                : article.title
                                                                            }
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>{article.category}</td>
                                                            <td>{getStatusBadge(article.status)}</td>
                                                            <td>{article.date}</td>
                                                            <td>
                                                                <div className="actions">
                                                                    <Link 
                                                                        href={`/admin/articles/edit/${article.id}`} 
                                                                        className="action-btn edit-btn"
                                                                        title="Edit"
                                                                    >
                                                                        <i className="fas fa-edit"></i>
                                                                    </Link>
                                                                    <Link 
                                                                        href={`/artikel-detail?id=${article.id}`} 
                                                                        className="action-btn view-btn"
                                                                        title="View"
                                                                        target="_blank"
                                                                    >
                                                                        <i className="fas fa-eye"></i>
                                                                    </Link>
                                                                    <button 
                                                                        className="action-btn delete-btn"
                                                                        title="Delete"
                                                                        onClick={() => handleDelete(article.id)}
                                                                        disabled={isDeleting && deleteId === article.id}
                                                                    >
                                                                        {isDeleting && deleteId === article.id ? (
                                                                            <i className="fas fa-spinner fa-spin"></i>
                                                                        ) : (
                                                                            <i className="fas fa-trash-alt"></i>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
