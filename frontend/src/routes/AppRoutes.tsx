import React from 'react'
import Layout from '../components/shared/Layout';
import { ProtectedRoute, AuthRoute } from './ProtectedRoute';
import { useRoutes } from 'react-router-dom';
import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import Home from '../features/home/pages/Home';
import ForgotPassword from '../features/auth/pages/ForgotPassword';
import Profile from '../features/profile/pages/Profile';

const AppRoutes: React.FC = () => {
    const routes = useRoutes([
        {
          path: '/',
          element: (
            <Layout>
                <Home />
            </Layout>
          ),
        },
        {
          path: '/login',
          element: (
            <AuthRoute>
                <Login />
            </AuthRoute>
          ),
        },
        {
          path: '/signup',
          element: (
            <AuthRoute>
                <Register />
            </AuthRoute>
          ),
        },
        {
          path: '/forgot-password',
          element: (
            <AuthRoute>
              <ForgotPassword />
            </AuthRoute>
          ),
        },
        {
          path: '/profile',
          element: (
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          ),
        },
        {
          path: '*',
          element: <div>404 - Page Not Found</div>,
        },
      ]);
    
      return routes;
}

export default AppRoutes