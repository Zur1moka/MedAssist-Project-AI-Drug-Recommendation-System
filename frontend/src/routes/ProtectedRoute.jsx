import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  // Chưa đăng nhập → về login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Yêu cầu role nhưng user không có quyền → về dashboard
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;