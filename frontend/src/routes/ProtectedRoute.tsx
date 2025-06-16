import type { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../store/store';



// const isAuthenticated: boolean = false;
export const ProtectedRoute = (): JSX.Element => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return true ? <Outlet /> : <Navigate to="/login" replace />;
};

export const AuthRoute = (): JSX.Element => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};
