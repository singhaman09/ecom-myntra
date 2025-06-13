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
import ProductPage from "../features/product/pages/ProductPage";
import ProductDetails from "../features/product/pages/ProductDetail";
import WishlistPage from "../features/wishlist/pages/WishlistPage";
import OrdersPage from "../features/order/pages/Orderpage";
import Footer from "../components/shared/Footer";

const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: ":slug",
          element: <ProductPage />,
        },
        {
          path: ":slug/:id",
          element: <ProductDetails />,
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "orders",
          element: (
            <ProtectedRoute>
              <>
                <OrdersPage />
                <Footer />
              </>
            </ProtectedRoute>
          ),
        },
      ],
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
      path: "*",
      element: (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          404 - Page Not Found
        </div>
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
            <Profile />
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
  ]);

  return routes;
};

export default AppRoutes;
