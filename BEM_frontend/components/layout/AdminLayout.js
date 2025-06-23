'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLayout({ children }) {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/sign-in');
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  if (isLoading) {
    return (
      <>
        <link rel="stylesheet" href="/assets/css/admin-loading.css" />
        <div className="admin-loading-screen">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </>
    );
  }

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
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f5f5f5;
          }
          .unauthorized-content {
            padding: 30px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            text-align: center;
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
