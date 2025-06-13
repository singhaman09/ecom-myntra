import React from "react";
import Layout from "../components/shared/Layout";
import { ProtectedRoute, AuthRoute } from "./ProtectedRoute";
import { useRoutes } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Home from "../features/home/pages/Home";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import Profile from "../features/profile/pages/Profile";
import CartPage from "../features/cart/pages/CartPage";
import CheckoutAddress from "../features/cart/pages/CheckoutAddress";
import Payment from "../features/cart/pages/Payment";
import OrderPlaced from "../features/cart/pages/OrderPlaced";

const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: (
        <AuthRoute>
          <Login />
        </AuthRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <AuthRoute>
          <Register />
        </AuthRoute>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <AuthRoute>
          <ForgotPassword />
        </AuthRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/cart",
      element: (
        <ProtectedRoute>
          <CartPage />
        </ProtectedRoute>
      ),
    },

    {
      path: "/checkout/address",
      element: (
        <ProtectedRoute>
          <CheckoutAddress />
        </ProtectedRoute>
      ),
    },

    {
      path: "/checkout/payment",
      element: (
        <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      ),
    },

    {
      path: "/ordersuccess",
      element: (
        <ProtectedRoute>
          <OrderPlaced />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <div>404 - Page Not Found</div>,
    },
  ]);

  return routes;
};

export default AppRoutes;
