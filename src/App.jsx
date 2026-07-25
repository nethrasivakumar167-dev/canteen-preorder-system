import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";

import { AppProvider } from "./context/AppContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import Receipt from "./pages/Receipt";
import StaffDashboard from "./pages/StaffDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import MenuManagement from "./pages/MenuManagement";

/* ---------------------------------------------------
   Helper: read logged-in user from localStorage
--------------------------------------------------- */
const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing currentUser from localStorage:", error);
    return null;
  }
};

/* ---------------------------------------------------
   Layout: wraps pages that need Navbar + Footer
--------------------------------------------------- */
const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

/* ---------------------------------------------------
   ProtectedRoute: checks auth + optional role access
--------------------------------------------------- */
const ProtectedRoute = ({ allowedRoles = [] }) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

/* ---------------------------------------------------
   404 Page
--------------------------------------------------- */
const NotFound = () => (
  <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
    <h1>404</h1>
    <p>Page not found.</p>
  </div>
);

function App() {
  return (
    <AppProvider>
      <Routes>
        {/* Routes WITHOUT Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes WITH Navbar/Footer */}
        <Route element={<Layout />}>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<Menu />} />

          {/* Protected: All authenticated roles — Profile */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["student", "faculty", "staff", "admin"]}
              />
            }
          >
            <Route path="/profile" element={<Profile />} />
            <Route path="/receipt/:orderId" element={<Receipt />} />
          </Route>

          {/* Protected: Student & Faculty */}
          <Route
            element={<ProtectedRoute allowedRoles={["student", "faculty"]} />}
          >
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/student" element={<StudentDashboard />} />
          </Route>

          {/* Protected: Staff only */}
          <Route element={<ProtectedRoute allowedRoles={["staff"]} />}>
            <Route path="/staff" element={<StaffDashboard />} />
          </Route>

          {/* Protected: Admin only */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Protected: Staff & Admin — Menu Management */}
          <Route
            element={<ProtectedRoute allowedRoles={["staff", "admin"]} />}
          >
            <Route path="/menu-management" element={<MenuManagement />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;