import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../features/auth/hooks/useAuth';

interface Props {
  children: JSX.Element;
}
const isAuthenticated: boolean = true;

export const ProtectedRoute = ({ children }: Props) => {
  // const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  // const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};
