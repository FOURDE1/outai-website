import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '@/admin/contexts/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="admin-theme min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f1419' }}>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full border-4 border-transparent border-t-[#7AC90E] animate-spin" />
          <p className="text-sm text-[#8b95a5]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
