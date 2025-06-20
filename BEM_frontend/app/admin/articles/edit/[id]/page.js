'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/layout/AdminLayout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ImageUpload from '@/components/admin/ImageUpload';
import articlesApi from '@/services/articlesApi';
import { MINISTRY_TAGS, MINISTRY_DISPLAY_NAMES } from '@/utils/ministryTagsMapping';

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

    // Ministry tags mapping is now imported from a central file.

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
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 style={{ margin: 0, color: '#333' }}>Edit Article #{id}</h2>
                                <Link href="/admin/articles" className="admin-btn admin-btn-outline-primary">
                                    <i className="fas fa-arrow-left"></i> Back to Articles
                                </Link>
                            </div>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <div className="admin-card">
                                <div className="admin-card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group mb-4">
                                            <label htmlFor="title" className="form-label">Title *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="title"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="category" className="form-label">Category *</label>
                                                    <select
                                                        className="form-control"
                                                        id="category"
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
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="status" className="form-label">Status</label>
                                                    <select
                                                        className="form-control"
                                                        id="status"
                                                        name="status"
                                                        value={formData.status}
                                                        onChange={handleChange}
                                                        disabled={isSubmitting}
                                                    >
                                                        <option value="draft">Draft</option>
                                                        <option value="published">Published</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <ImageUpload
                                            value={formData.image}
                                            onChange={handleImageChange}
                                            disabled={isSubmitting}
                                        />

                                        <div className="form-group mb-4">
                                            <label htmlFor="excerpt" className="form-label">Excerpt *</label>
                                            <textarea
                                                className="form-control"
                                                id="excerpt"
                                                name="excerpt"
                                                rows="3"
                                                value={formData.excerpt}
                                                onChange={handleChange}
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div className="form-group mb-4">
                                            <label htmlFor="content" className="form-label">Content</label>
                                            <textarea
                                                className="form-control"
                                                id="content"
                                                name="content"
                                                rows="8"
                                                value={formData.content}
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                            />
                                            <small className="form-text text-muted">If left empty, excerpt will be used as content.</small>
                                        </div>

                                        <div className="form-group mb-4">
                                            <label htmlFor="tags" className="form-label">Tags</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="tags"
                                                name="tags"
                                                value={formData.tags}
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                            />
                                            <small className="form-text text-muted">Separate tags with commas</small>
                                            
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
                                                                    <i className="fas fa-plus"></i> {MINISTRY_DISPLAY_NAMES[ministry]}
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

                                        <div className="form-group text-end mt-4">
                                            <Link 
                                                href={`/artikel-detail?id=${id}`} 
                                                className="admin-btn admin-btn-outline-secondary me-2"
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