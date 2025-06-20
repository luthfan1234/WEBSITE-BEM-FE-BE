'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function AdminSidebar() {
    const { user, logout } = useAuth();
    const [avatarError, setAvatarError] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/sign-in');
        } catch (error) {
            console.error('Error logging out:', error);
            router.push('/sign-in');
        }
    };

    const isActive = (path) => {
        if (path === '/admin/dashboard') {
            return pathname === '/admin/dashboard';
        }
        // For other sections, check if pathname starts with the path
        return pathname.startsWith(path);
    };

    return (
        <div className="col-lg-3">
            <div className="admin-card admin-profile-card">
                <div className="admin-card-body">
                    {avatarError ? (
                        <div className="admin-avatar-fallback">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                    ) : (
                        <div className="admin-avatar">
                            <img 
                                src="/assets/images/avatar/admin-avatar.jpg" 
                                alt="Admin"
                                onError={() => setAvatarError(true)}
                            />
                        </div>
                    )}
                    <h5 className="mb-1">{user?.name || 'Admin BEM SV UNS'}</h5>
                    <p className="mb-1" style={{ color: '#6c757d' }}>Administrator</p>
                    <small style={{ color: '#6c757d' }}>{user?.email || 'admin@bemsvuns.com'}</small>
                </div>
            </div>
            
            <div className="admin-card">
                <div className="admin-card-header">
                    Navigation
                </div>
                <div className="admin-card-body">
                    <ul className="admin-nav-list">
                        <li className="admin-nav-item">
                            <Link 
                                href="/admin/dashboard" 
                                className={`admin-nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
                            >
                                <i className="fas fa-tachometer-alt"></i> Dashboard
                            </Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link 
                                href="/admin/articles" 
                                className={`admin-nav-link ${isActive('/admin/articles') ? 'active' : ''}`}
                            >
                                <i className="fas fa-newspaper"></i> Articles
                            </Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link 
                                href="/admin/departments" 
                                className={`admin-nav-link ${isActive('/admin/departments') ? 'active' : ''}`}
                            >
                                <i className="fas fa-building"></i> Departments
                            </Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link 
                                href="/admin/users" 
                                className={`admin-nav-link ${isActive('/admin/users') ? 'active' : ''}`}
                            >
                                <i className="fas fa-users"></i> Users
                            </Link>
                        </li>
                    </ul>
                    <div className="mt-4">
                        <button 
                            onClick={handleLogout}
                            className="admin-btn admin-btn-secondary w-100"
                        >
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
