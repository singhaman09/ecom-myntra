import React from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../components/shared/Layout";
import { ProtectedRoute, AuthRoute } from "./ProtectedRoute";
import Home from "../features/home/pages/Home";
import Login from "../features/auth/pages/Login";

import Register from "../features/auth/pages/Register";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import Profile from "../features/profile/pages/Profile";
import ProductPage from "../features/product/pages/ProductPage";
import ProductDetails from "../features/product/pages/ProductDetail";
import WishlistPage from "../features/wishlist/pages/WishlistPage";
import OrdersPage from "../features/order/pages/Orderpage";
import VerifyEmail from "../features/auth/pages/VerifyEmail";
import VerifyOtpForgotPass from "../features/auth/pages/VerifyOtpForgotPass";
import ResetPassword from "../features/auth/pages/ResetPassword";
import CartPage from "../features/cart/pages/CartPage";
import CheckoutAddress from "../features/cart/pages/CheckoutAddress";
import Payment from "../features/cart/pages/Payment";
import OrderPlaced from "../features/cart/pages/OrderPlaced";
import OrderDetailPage from "../features/order/pages/OrderDetailPage";

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
          element: <AuthRoute />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "signup",
              element: <Register />,
            },
            {
              path: "verify-email",
              element: <VerifyEmail />,
            },
            {
              path: "forgot-password",
              // element: <ForgotPassword />,
              children: [
                {
                  path: "",
                  element: <ForgotPassword />,
                },
                {
                  path: "verify-otp",
                  element: <VerifyOtpForgotPass />,
                },
                {
                  path: "reset-password",
                  element: <ResetPassword />,
                },
              ],
            },
          ],
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "wishlist",
              element: <WishlistPage />,
            },
            {
              path: "orders",
              element: <OrdersPage />,
            },
            {
              path: "orders/:orderId", // Corrected route
              element: <OrderDetailPage />,
            },
            {
              path: "cart",
              element: <CartPage />,
            },

            {
              path: "checkout/address",
              element: <CheckoutAddress />,
            },

            {
              path: "checkout/payment",
              element: <Payment />,
            },

            {
              path: "ordersuccess",
              element: <OrderPlaced />,
            },
          ],
        },

        {
          path: "*",
          element: <div>404 - Page Not Found</div>,
        },
      ],
    },
  ]);

  return routes;
};

export default AppRoutes;
