'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLayout({ children }) {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated or not admin once loading is complete
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/sign-in');
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="admin-loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
        <style jsx>{`
          .admin-loading-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100%;
          }
          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: #21E786;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Show unauthorized message if not admin
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="admin-unauthorized">
        <div className="unauthorized-content">
          <h2>Access Denied</h2>
          <p>You need to be logged in as an administrator to access this page.</p>
          <button 
            onClick={() => router.push('/sign-in')} 
            className="btn-signin"
          >
            Go to Login
          </button>
        </div>
        <style jsx>{`
          .admin-unauthorized {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100%;
            background-color: #f8f9fa;
          }
          .unauthorized-content {
            text-align: center;
            padding: 30px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            max-width: 500px;
          }
          .btn-signin {
            background: #21E786;
            color: #000;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 20px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <link rel="stylesheet" href="/assets/css/admin.css" />
      {children}
    </div>
  );
}
