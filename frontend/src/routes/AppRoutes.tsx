import React from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../components/shared/Layout";
import { ProtectedRoute, AuthRoute } from "./ProtectedRoute";
import Home from "../features/home/pages/Home";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ProductPage from "../features/product/pages/ProductPage/ProductPage";
import ProductDetails from "../features/product/pages/ProductDetail/ProductDetail";
import WishlistPage from "../features/wishlist/pages/WishlistPage";
import OrdersPage from "../features/order/pages/Orderpage";
import VerifyEmail from "../features/auth/pages/VerifyEmail";
import VerifyOtpForgotPass from "../features/auth/pages/VerifyOtpForgotPass";
import ResetPassword from "../features/auth/pages/ResetPassword";
import CartPage from "../features/cart/pages/CartPage";
// import CheckoutAddress from "../features/cart/pages/CheckoutAddress";
import Payment from "../features/cart/pages/Payment";
import OrderPlaced from "../features/cart/pages/OrderPlaced";
import MainProfile from "../features/profile/pages/Profile/MainProfile";
import OrderDetailPage from "../features/order/pages/OrderDetailPage";
import Addresses from "../features/profile/pages/Addresses/Addresses";
import ChangePassword from "../features/profile/pages/ChangePassword/ChangePassword";
import DeleteAccount from "../features/profile/pages/DeleteAccount/DeleteAccount";
import TermsOfUse from "../features/profile/pages/Legal/TermsOfUse";
import PrivacyPolicy from "../features/profile/pages/Legal/PrivacyPolicy";
import Profile from "../features/profile/pages/Profile/Profile";
import Notifications from "../features/profile/pages/Notifications/Notifications";
import CongratulationsPage from "../features/auth/pages/RegistrationComplete";
import HelpSupport from "../features/help&support/pages/HelpSupport";
import { PRODUCT_ROUTES } from "../features/product/Constants/Routes";
import StoreLocator from "../features/locateStore/pages/StoreLocator/StoreLocator";

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
          path: PRODUCT_ROUTES.list,
          element: <ProductPage />,
        },
        {
          path: "helpsupport",
          element: <HelpSupport />,
        },
        {
          path:PRODUCT_ROUTES.Specific_list,
          element: <ProductPage />,
        },
        {
          path: PRODUCT_ROUTES.details,
          element: <ProductDetails />,
        },
      
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "profile",
              element: <MainProfile/>,
              children:[
                {
                  path: "notifications",
                  element: <Notifications/>,
                },
                {
                  path: "",
                  element: <Profile/>,
                },
                {
                  path: "addresses",
                  element: <Addresses/>,
                },
                {
                  path: "change-password",
                  element: <ChangePassword/>,
                },
                {
                  path: "delete-account",
                  element: <DeleteAccount/>,
                },
                {
                  path:'orders',
                  element:<OrdersPage/>
                },
                {
                  path: "terms",
                  element: <TermsOfUse/>,
                },
                {
                  path: "privacy",
                  element: <PrivacyPolicy/>,
                }
                

              ]
            },
             
            {
              path: "wishlist",
              element: <WishlistPage />,
            },
            {
              path: "orders",
              element: (
                <OrdersPage />
              ),
            },
            {
              path: "orders/:orderId",
              element: (
                <OrderDetailPage />
              ),
            },
            {
              path:'/storeLocator',
              element:<StoreLocator/>
            }
          ],
          
        },
        {
          path: "*",
          element: <div>404 - Page Not Found</div>,
        },
      ],
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
          path: "reg-success",
          element: <CongratulationsPage />
        },
        {
          path: "verify-email",
          element: <VerifyEmail />,
        },
        {
          path: "forgot-password",
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
      element:<ProtectedRoute/>,
      children:[
        {
          path: "/cart",
          element: (
              <CartPage />
          ),
        },

        {
          path: "/checkout/payment",
          element: (
              <Payment />
          ),
        },

        {
          path: "/ordersuccess",
          element: (
              <OrderPlaced />
          ),
        }
      ]
    }
  ]);

  return routes;
};

export default AppRoutes;