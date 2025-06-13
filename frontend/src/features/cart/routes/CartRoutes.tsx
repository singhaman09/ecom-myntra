import { Route, Routes } from "react-router-dom";
import CartPage from "../pages/CartPage";

const CartRoutes = () => {
  return (
    <Routes>
      {/* Single route handles everything using URLSearchParams */}
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default CartRoutes;