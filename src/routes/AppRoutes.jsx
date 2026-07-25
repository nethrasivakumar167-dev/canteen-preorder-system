import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Receipt from "./pages/Receipt";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import StudentDashboard from "./pages/StudentDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MenuManagement from "./pages/MenuManagement";
import NotFound from "./pages/NotFound";

// Layout / Guards
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

/**
 * AppRoutes — this file must be rendered INSIDE a <BrowserRouter>,
 * which must itself be INSIDE <AppProvider>, at the very top of your
 * app (main.jsx or App.jsx):
 *
 *   <AppProvider>
 *     <BrowserRouter>
 *       <AppRoutes />
 *     </BrowserRouter>
 *   </AppProvider>
 *
 * If AppProvider is instantiated anywhere below this level (e.g.
 * inside a single page), context state will NOT persist between
 * Cart -> Payment -> Receipt, and Receipt will always show
 * "Order not found" even right after a successful order.
 *
 * ROUTE CHECKLIST — verify each of these against your actual file:
 *   - Path is exactly "/receipt/:orderId" (param name must be
 *     "orderId" to match useParams().orderId in Receipt.jsx)
 *   - Path is exactly "/payment" (not "/checkout" or similar) to
 *     match the navigate("/payment") call in Cart.jsx
 *   - Receipt/Payment/Cart/Orders are all inside the same
 *     ProtectedRoute/Layout tree as the rest of the authenticated app
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* ----- Public routes (no Navbar/Footer) ----- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ----- Routes with Navbar/Footer via Layout ----- */}
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<Menu />} />

        {/* Any authenticated role */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["student", "faculty", "staff", "admin"]} />
          }
        >
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Student / Faculty only */}
        <Route element={<ProtectedRoute allowedRoles={["student", "faculty"]} />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/receipt/:orderId" element={<Receipt />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/student" element={<StudentDashboard />} />
        </Route>

        {/* Staff only */}
        <Route element={<ProtectedRoute allowedRoles={["staff"]} />}>
          <Route path="/staff" element={<StaffDashboard />} />
        </Route>

        {/* Admin only */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Staff / Admin */}
        <Route element={<ProtectedRoute allowedRoles={["staff", "admin"]} />}>
          <Route path="/menu-management" element={<MenuManagement />} />
        </Route>
      </Route>

      {/* ----- 404 ----- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;