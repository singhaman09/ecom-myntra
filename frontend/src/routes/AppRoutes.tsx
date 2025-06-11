import React from 'react';
import { useRoutes } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import { ProtectedRoute, AuthRoute } from './ProtectedRoute';

import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import Home from '../features/home/pages/Home';
import ForgotPassword from '../features/auth/pages/ForgotPassword';
import Profile from '../features/profile/pages/Profile';
import VerifyEmail from '../features/auth/pages/VerifyEmail';

const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          element: <AuthRoute />,
          children: [
            {
              path: 'login',
              element: <Login />,
            },
            {
              path: 'signup',
              element: <Register />,
            },
            {
              path: 'verify-email',
              element: <VerifyEmail />,
            },
            {
              path: 'forgot-password',
              element: <ForgotPassword />,
            },
          ],
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: 'profile',
              element: <Profile />,
            },
          ],
        },
        {
          path: '*',
          element: <div>404 - Page Not Found</div>,
        },
      ],
    },
  ]);

  return routes;
};

export default AppRoutes;
