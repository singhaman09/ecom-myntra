import React from 'react'
import Layout from '../components/shared/Layout';
import { ProtectedRoute, AuthRoute } from './ProtectedRoute';
import { useRoutes } from 'react-router-dom';
import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import Home from '../features/home/pages/Home';
import ForgotPassword from '../features/auth/pages/ForgotPassword';
import Profile from '../features/profile/pages/Profile';
import ProductPage from '../features/product/pages/ProductPage';
import ProductDetails from '../features/product/pages/ProductDetail';
const AppRoutes: React.FC = () => {
    const routes = useRoutes([
        {
          path: '/',
          element: (
            <Layout/>),
          children:[
            {path:'',
            element:<Home/>
            },
                      {
              path:'/:slug',
              element:<ProductPage/>
            },
            {
              path:'/:slug/:id',
              element:<ProductDetails/>
            },
            {
              path: '/profile',
              element: (
                <ProtectedRoute>
                   <Profile />                  
                </ProtectedRoute>
              ),
            },
          ]
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
          path: '*',
          element: <div>404 - Page Not Found</div>,
        },
      ]);
    
      return routes;
}

export default AppRoutes