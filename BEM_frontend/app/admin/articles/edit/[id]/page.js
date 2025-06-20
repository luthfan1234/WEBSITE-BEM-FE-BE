'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/layout/AdminLayout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ImageUpload from '@/components/admin/ImageUpload';
import articlesApi from '@/services/articlesApi';

export default function EditArticle() {
    const { isAuthenticated, isAdmin, isLoading } = useAuth();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        excerpt: '',
        content: '',
        status: 'draft',
        tags: '',
        image: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingArticle, setIsLoadingArticle] = useState(true);
    const [error, setError] = useState('');
    const [showTagSuggestions, setShowTagSuggestions] = useState(false);
    const router = useRouter();

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

    useEffect(() => {
        if (!isLoading && (!isAuthenticated || !isAdmin)) {
            router.push('/sign-in');
        }

        if (isAuthenticated && isAdmin && id) {
            fetchArticle();
        }
    }, [isLoading, isAuthenticated, isAdmin, router, id]);

    const fetchArticle = async () => {
        try {
            setIsLoadingArticle(true);
            const article = await articlesApi.getArticle(id);

            setFormData({
                title: article.title || '',
                category: article.category || '',
                excerpt: article.excerpt || '',
                content: article.content ? (Array.isArray(article.content) ? article.content.join('\n\n') : article.content) : '',
                status: article.status || 'draft',
                tags: article.tags ? article.tags.join(', ') : '',
                image: article.image || ''
            });

            setError('');
        } catch (err) {
            console.error('Error fetching article:', err);
            setError('Failed to load article. Please try again.');
        } finally {
            setIsLoadingArticle(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (imageUrl) => {
        setFormData(prev => ({
            ...prev,
            image: imageUrl
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            if (!formData.title || !formData.category || !formData.excerpt) {
                throw new Error('Please fill in all required fields');
            }

            const tagsArray = formData.tags
                ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
                : [];

            const articleData = {
                ...formData,
                tags: tagsArray,
                content: formData.content || formData.excerpt,
                image: formData.image || '/assets/images/blog/default-article.jpg'
            };

            const result = await articlesApi.updateArticle(id, articleData);

            if (result.success) {
                alert('Article updated successfully!');
                router.push('/admin/articles');
            } else {
                throw new Error('Failed to update article');
            }
        } catch (err) {
            console.error('Error updating article:', err);
            setError(err.message || 'Failed to update article. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddMinistryTags = (ministryKey) => {
        const tags = MINISTRY_TAGS[ministryKey];
        const currentTags = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];
        const newTags = tags.filter(tag => !currentTags.includes(tag));
        
        if (newTags.length > 0) {
            const updatedTags = [...currentTags, ...newTags].join(', ');
            setFormData(prev => ({
                ...prev,
                tags: updatedTags
            }));
        }
    };

    if (isLoading || isLoadingArticle) {
        return (
            <AdminLayout>
                <div className="admin-dashboard">
                    <div className="tf-container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <div className="admin-loading">
                                    <div className="admin-spinner"></div>
                                </div>
                                <h3>Loading article...</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="admin-dashboard">
                <div className="tf-container">
                    <div className="row">
                        <AdminSidebar />

                        <div className="col-lg-9">
                            <div className="admin-card">
                                <div className="admin-card-header">
                                    Edit Article #{id}
                                </div>
                                <div className="admin-card-body">
                                    {error && (
                                        <div style={{ background: '#f8d7da', borderColor: '#f5c6cb', color: '#721c24', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <label>Title *</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <label>Category *</label>
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={isSubmitting}
                                                >
                                                    <option value="">Select Category</option>
                                                    <option value="Kaderisasi">Kaderisasi</option>
                                                    <option value="Sosial">Sosial</option>
                                                    <option value="Akademik">Akademik</option>
                                                    <option value="Lingkungan">Lingkungan</option>
                                                    <option value="Seni">Seni & Budaya</option>
                                                    <option value="Olahraga">Olahraga</option>
                                                    <option value="Kewirausahaan">Kewirausahaan</option>
                                                </select>
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <label>Status</label>
                                                <select
                                                    name="status"
                                                    value={formData.status}
                                                    onChange={handleChange}
                                                    disabled={isSubmitting}
                                                >
                                                    <option value="draft">Draft</option>
                                                    <option value="published">Published</option>
                                                </select>
                                            </div>

                                            <div className="col-md-12">
                                                <ImageUpload
                                                    value={formData.image}
                                                    onChange={handleImageChange}
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            <div className="col-md-12 mb-4">
                                                <label>Excerpt *</label>
                                                <textarea
                                                    name="excerpt"
                                                    rows="3"
                                                    value={formData.excerpt}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            <div className="col-md-12 mb-4">
                                                <label>Content</label>
                                                <textarea
                                                    name="content"
                                                    rows="8"
                                                    value={formData.content}
                                                    onChange={handleChange}
                                                    disabled={isSubmitting}
                                                />
                                                <small>If left empty, excerpt will be used as content.</small>
                                            </div>

                                            <div className="col-md-12 mb-4">
                                                <label>Tags</label>
                                                <input
                                                    type="text"
                                                    name="tags"
                                                    value={formData.tags}
                                                    onChange={handleChange}
                                                    disabled={isSubmitting}
                                                />
                                                <small>Separate tags with commas</small>
                                                
                                                <div className="mt-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-info"
                                                        onClick={() => setShowTagSuggestions(!showTagSuggestions)}
                                                    >
                                                        <i className="fas fa-lightbulb"></i> Tag Suggestions
                                                    </button>
                                                </div>
                                                
                                                {showTagSuggestions && (
                                                    <div className="tag-suggestions mt-3">
                                                        <small className="text-muted d-block mb-2">Click on a ministry to add its related tags:</small>
                                                        <div className="ministry-tag-groups">
                                                            {Object.entries(MINISTRY_TAGS).map(([ministry, tags]) => (
                                                                <div key={ministry} className="ministry-tag-group mb-2">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-outline-primary me-2 mb-1"
                                                                        onClick={() => handleAddMinistryTags(ministry)}
                                                                        disabled={isSubmitting}
                                                                    >
                                                                        <i className="fas fa-plus"></i> {ministry.replace('_', ' ').toUpperCase()}
                                                                    </button>
                                                                    <small className="text-muted">
                                                                        ({tags.join(', ')})
                                                                    </small>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                                            <Link href="/admin/articles" className="admin-btn admin-btn-secondary">
                                                <i className="fas fa-arrow-left"></i> Back to Articles
                                            </Link>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <Link 
                                                    href={`/artikel-detail?id=${id}`} 
                                                    className="admin-btn admin-btn-outline-primary"
                                                    target="_blank"
                                                >
                                                    <i className="fas fa-eye"></i> Preview
                                                </Link>
                                                <button 
                                                    type="submit" 
                                                    className="admin-btn admin-btn-primary"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? 'Updating...' : 'Update Article'}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
