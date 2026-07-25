import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingBag,
  FaHeart,
  FaWallet,
  FaUtensils,
  FaClipboardList,
  FaStar,
} from "react-icons/fa";

import StatsCard from "../components/StatsCard";
import FoodCard from "../components/FoodCard";
import RecentOrders from "../components/RecentOrders";
import { studentStats, todaysSpecials, recentOrders } from "../data/mockData";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("Student");
  const [orderMsg, setOrderMsg] = useState("");

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser?.userId) {
        setStudentName(currentUser.userId);
      }
    } catch (error) {
      console.error("Error reading currentUser:", error);
    }
  }, []);

  const handlePreOrder = (food) => {
    setOrderMsg(`"${food.name}" pre-ordered successfully!`);
    setTimeout(() => setOrderMsg(""), 2500);
  };

  const quickActions = [
    {
      label: "View Menu",
      icon: <FaUtensils />,
      onClick: () => navigate("/menu"),
    },
    {
      label: "My Orders",
      icon: <FaClipboardList />,
      onClick: () => navigate("/orders"),
    },
    {
      label: "Favorites",
      icon: <FaStar />,
      onClick: () => navigate("/profile"),
    },
  ];

  return (
    <div className="sd-dashboard">
      {/* ===== Welcome Header ===== */}
      <div className="sd-welcome-header">
        <div>
          <h1>Welcome Back, {studentName} 👋</h1>
          <p>Pre-order your meals and skip the queue.</p>
        </div>
      </div>

      {orderMsg && <div className="sd-order-toast">{orderMsg}</div>}

      {/* ===== Statistics Cards ===== */}
      <div className="sd-stats-grid">
        <StatsCard
          icon={<FaShoppingBag />}
          label="Total Orders"
          value={studentStats.totalOrders}
        />
        <StatsCard
          icon={<FaHeart />}
          label="Favorite Item"
          value={studentStats.favoriteItem}
        />
        <StatsCard
          icon={<FaWallet />}
          label="Wallet Balance"
          value={`₹${studentStats.walletBalance}`}
        />
      </div>

      {/* ===== Today's Specials ===== */}
      <section className="sd-section">
        <h2 className="sd-section-title">Today's Specials</h2>
        <div className="sd-food-grid">
          {todaysSpecials.map((food) => (
            <FoodCard key={food.id} food={food} onPreOrder={handlePreOrder} />
          ))}
        </div>
      </section>

      {/* ===== Recent Orders ===== */}
      <section className="sd-section">
        <h2 className="sd-section-title">Recent Orders</h2>
        <RecentOrders orders={recentOrders} />
      </section>

      {/* ===== Quick Actions ===== */}
      <section className="sd-section">
        <h2 className="sd-section-title">Quick Actions</h2>
        <div className="sd-quick-actions">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              className="sd-quick-action-btn"
              onClick={action.onClick}
            >
              <span className="sd-quick-action-icon">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;