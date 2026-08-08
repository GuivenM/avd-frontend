import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p style={{ padding: 40 }}>Vérification de la session…</p>;
  if (!user) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
}
