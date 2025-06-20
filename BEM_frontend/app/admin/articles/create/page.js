'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/layout/AdminLayout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ImageUpload from '@/components/admin/ImageUpload';
import articlesApi from '@/services/articlesApi';

export default function CreateArticle() {
    const { isAuthenticated, isAdmin, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        author: '',
        date: new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).toUpperCase(),
        status: 'draft',
        excerpt: '',
        content: '',
        image: '',
        tags: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
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
    }, [isLoading, isAuthenticated, isAdmin, router]);

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

    const handleStatusChange = (status) => {
        setFormData(prev => ({
            ...prev,
            status
        }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        
        try {
            // Validate required fields
            if (!formData.title || !formData.category || !formData.excerpt) {
                throw new Error('Please fill in all required fields');
            }

            // Process tags
            const tagsArray = formData.tags 
                ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
                : [];

            const articleData = {
                ...formData,
                tags: tagsArray,
                content: formData.content || formData.excerpt,
                image: formData.image || '/assets/images/blog/default-article.jpg'
            };

            const result = await articlesApi.createArticle(articleData);
            
            if (result.success) {
                alert('Article created successfully!');
                router.push('/admin/articles');
            } else {
                throw new Error('Failed to create article');
            }
        } catch (err) {
            console.error('Error creating article:', err);
            setError(err.message || 'Failed to create article. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="tf-section tf-item-details" style={{ paddingTop: '100px' }}>
                    <div className="tf-container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <h3>Loading...</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="admin-create-article">
                <div className="tf-container">
                    <div className="row">
                        <AdminSidebar />
                        
                        <div className="col-lg-9">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2>Create New Article</h2>
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
                                                        <option value="Kegiatan">Kegiatan</option>
                                                        <option value="Pengumuman">Pengumuman</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="author" className="form-label">Author</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="author"
                                                        name="author"
                                                        value={formData.author}
                                                        onChange={handleChange}
                                                        placeholder="Humas BEM SV UNS"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Image Upload Component */}
                                        <ImageUpload
                                            value={formData.image}
                                            onChange={handleImageChange}
                                            disabled={isSubmitting}
                                        />
                                        
                                        <div className="form-group mb-4">
                                            <label htmlFor="excerpt" className="form-label">Excerpt/Summary *</label>
                                            <textarea
                                                className="form-control"
                                                id="excerpt"
                                                name="excerpt"
                                                rows="3"
                                                value={formData.excerpt}
                                                onChange={handleChange}
                                                required
                                                disabled={isSubmitting}
                                            ></textarea>
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
                                            ></textarea>
                                        </div>
                                        
                                        <div className="form-group mb-4">
                                            <label htmlFor="tags" className="form-label">Tags (comma separated)</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="tags"
                                                name="tags"
                                                value={formData.tags}
                                                onChange={handleChange}
                                                placeholder="tag1, tag2, tag3"
                                                disabled={isSubmitting}
                                            />
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
                                        
                                        <div className="form-group mb-4">
                                            <label className="form-label d-block">Status</label>
                                            <div className="status-toggles">
                                                <button
                                                    type="button"
                                                    className={`status-toggle ${formData.status === 'draft' ? 'active' : ''}`}
                                                    onClick={() => handleStatusChange('draft')}
                                                    disabled={isSubmitting}
                                                >
                                                    <i className="fas fa-save"></i> Draft
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`status-toggle ${formData.status === 'published' ? 'active' : ''}`}
                                                    onClick={() => handleStatusChange('published')}
                                                    disabled={isSubmitting}
                                                >
                                                    <i className="fas fa-globe"></i> Published
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group text-end">
                                            <button
                                                type="button"
                                                className="admin-btn admin-btn-outline-secondary me-2"
                                                onClick={() => router.push('/admin/articles')}
                                                disabled={isSubmitting}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="admin-btn admin-btn-primary"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <i className="fas fa-spinner fa-spin me-2"></i>
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-save me-2"></i>
                                                        Save Article
                                                    </>
                                                )}
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