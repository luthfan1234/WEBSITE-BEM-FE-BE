'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/layout/AdminLayout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import articlesApi from '@/services/articlesApi';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalArticles: 0,
        publishedArticles: 0,
        draftArticles: 0,
        totalDepartments: 0,
        totalUsers: 0,
        recentActivity: []
    });
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [backendStatus, setBackendStatus] = useState('checking');
    const [error, setError] = useState(null);

    // Ministry tags mapping for reference
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
        checkBackendConnection();
        fetchDashboardStats();
    }, []);

    const checkBackendConnection = async () => {
        try {
            const isConnected = await articlesApi.testConnection();
            setBackendStatus(isConnected ? 'connected' : 'disconnected');
            return isConnected;
        } catch (error) {
            console.error('Error checking backend connection:', error);
            setBackendStatus('disconnected');
            return false;
        }
    };

    const fetchDashboardStats = async () => {
        try {
            setIsLoadingStats(true);
            setError(null);
            
            const isConnected = await checkBackendConnection();
            if (!isConnected) {
                setError('Backend server is not available. Using localStorage fallback.');
            }
            
            const data = await articlesApi.getDashboardStats();
            setStats(data);
            
            if (!data.success) {
                throw new Error('Failed to fetch dashboard stats');
            }
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            setError(error.message || 'An error occurred while fetching dashboard stats');
            
            // Use fallback data if API call fails
            setStats({
                totalArticles: 0,
                publishedArticles: 0,
                draftArticles: 0,
                totalDepartments: 8,
                totalUsers: 5,
                recentActivity: [
                    {
                        type: 'error',
                        message: error.message || 'Failed to fetch dashboard stats',
                        time: 'Just now',
                        icon: 'fas fa-exclamation-circle',
                        color: 'text-danger'
                    }
                ]
            });
        } finally {
            setIsLoadingStats(false);
        }
    };

    return (
        <AdminLayout>
            <div className="admin-dashboard">
                <div className="tf-container">
                    <div className="row">
                        {/* Use the reusable sidebar component */}
                        <AdminSidebar />
                        
                        {/* Main Content */}
                        <div className="col-lg-9">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h2 style={{ margin: 0, color: '#333' }}>Dashboard</h2>
                                <div className="d-flex align-items-center">
                                    {/* Backend Status Indicator */}
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
                                    
                                    <button 
                                        onClick={fetchDashboardStats}
                                        className="admin-btn admin-btn-outline-primary admin-btn-sm"
                                        disabled={isLoadingStats}
                                    >
                                        <i className="fas fa-sync-alt"></i>
                                        {isLoadingStats ? ' Refreshing...' : ' Refresh'}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Error Message */}
                            {error && (
                                <div className="alert alert-warning" style={{ marginBottom: '1.5rem' }}>
                                    <i className="fas fa-exclamation-triangle mr-2"></i> {error}
                                </div>
                            )}
                            
                            {/* Stats Cards */}
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="admin-stats-card">
                                        <div className="stats-icon">
                                            <i className="fas fa-newspaper"></i>
                                        </div>
                                        <h6>Total Articles</h6>
                                        <h2 className="stats-number">
                                            {isLoadingStats ? (
                                                <div className="admin-spinner" style={{ width: '24px', height: '24px' }}></div>
                                            ) : (
                                                stats.totalArticles
                                            )}
                                        </h2>
                                        <div className="card-footer">
                                            <Link href="/admin/articles">
                                                View all articles →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="admin-stats-card success">
                                        <div className="stats-icon">
                                            <i className="fas fa-check-circle"></i>
                                        </div>
                                        <h6>Published</h6>
                                        <h2 className="stats-number">
                                            {isLoadingStats ? (
                                                <div className="admin-spinner" style={{ width: '24px', height: '24px' }}></div>
                                            ) : (
                                                stats.publishedArticles
                                            )}
                                        </h2>
                                        <div className="card-footer">
                                            <Link href="/admin/articles?status=published">
                                                View published →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="admin-stats-card warning">
                                        <div className="stats-icon">
                                            <i className="fas fa-edit"></i>
                                        </div>
                                        <h6>Drafts</h6>
                                        <h2 className="stats-number">
                                            {isLoadingStats ? (
                                                <div className="admin-spinner" style={{ width: '24px', height: '24px' }}></div>
                                            ) : (
                                                stats.draftArticles
                                            )}
                                        </h2>
                                        <div className="card-footer">
                                            <Link href="/admin/articles?status=draft">
                                                View drafts →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Quick Actions */}
                            <div className="admin-card">
                                <div className="admin-card-header">
                                    Quick Actions
                                </div>
                                <div className="admin-card-body">
                                    <div className="quick-actions">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Link href="/admin/articles/create" className="quick-action-btn">
                                                    <i className="fas fa-plus-circle"></i>
                                                    Create New Article
                                                </Link>
                                            </div>
                                            <div className="col-md-6">
                                                <Link href="/admin/departments/create" className="quick-action-btn">
                                                    <i className="fas fa-users-cog"></i>
                                                    Add Department
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Recent Activity */}
                            <div className="admin-card">
                                <div className="admin-card-header">
                                    Recent Activity
                                </div>
                                {isLoadingStats ? (
                                    <div className="admin-loading">
                                        <div className="admin-spinner"></div>
                                    </div>
                                ) : (
                                    <div className="admin-card-body" style={{ padding: 0 }}>
                                        <ul className="activity-list">
                                            {stats.recentActivity && stats.recentActivity.length > 0 ? (
                                                stats.recentActivity.map((activity, index) => (
                                                    <li key={index} className="activity-item">
                                                        <div className={`activity-icon ${activity.color}`}>
                                                            <i className={activity.icon}></i>
                                                        </div>
                                                        <div className="activity-content">
                                                            <p>{activity.message}</p>
                                                        </div>
                                                        <div className="activity-time">{activity.time}</div>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="activity-item">
                                                    <div className="text-center w-100" style={{ color: '#6c757d' }}>
                                                        No recent activity
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Ministry Tags Reference */}
                            <div className="admin-card">
                                <div className="admin-card-header">
                                    Ministry Tags Reference
                                </div>
                                <div className="admin-card-body">
                                    <small className="text-muted d-block mb-3">
                                        Use these tags when creating articles to associate them with specific ministries:
                                    </small>
                                    <div className="row">
                                        {Object.entries(MINISTRY_TAGS).map(([ministry, tags]) => (
                                            <div key={ministry} className="col-md-6 mb-3">
                                                <div className="ministry-tags-info">
                                                    <h6 className="mb-2 text-primary">
                                                        {ministry.replace('_', ' ').toUpperCase()}
                                                    </h6>
                                                    <div className="tags-list">
                                                        {tags.map((tag, index) => (
                                                            <span key={index} className="badge bg-light text-dark me-1 mb-1">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}