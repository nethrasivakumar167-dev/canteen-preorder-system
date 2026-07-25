import React, { useMemo } from "react";
import {
  FaClipboardList,
  FaRupeeSign,
  FaBoxOpen,
  FaBoxes,
  FaTrophy,
  FaHistory,
  FaUtensils,
} from "react-icons/fa";

// Reused across dashboards
import StatsCard from "../components/StatsCard";
import RecentOrders from "../components/RecentOrders";

// New, admin-specific reusable components
import MostOrderedItems from "../components/MostOrderedItems";
import MenuStatusList from "../components/MenuStatusList";

import {
  adminStats,
  mostOrderedItems,
  adminRecentOrders,
  foodAvailabilityList,
} from "../data/mockData";

const AdminDashboard = () => {
  // Derive availability counts live from the shared food list, rather
  // than hardcoding numbers that could drift out of sync with the
  // actual menu data (e.g. after Staff toggles an item).
  const { availableCount, unavailableCount } = useMemo(() => {
    const available = foodAvailabilityList.filter((f) => f.available).length;
    return {
      availableCount: available,
      unavailableCount: foodAvailabilityList.length - available,
    };
  }, []);

  return (
    <div className="admin-dashboard">
      {/* ===== Header ===== */}
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>A complete overview of canteen orders, revenue, and menu health.</p>
      </div>

      {/* ===== Statistics Cards ===== */}
      <div className="admin-stats-grid">
        <StatsCard
          icon={<FaClipboardList />}
          label="Total Orders"
          value={adminStats.totalOrders}
        />
        <StatsCard
          icon={<FaRupeeSign />}
          label="Total Revenue"
          value={`₹${adminStats.totalRevenue.toLocaleString("en-IN")}`}
        />
        <StatsCard
          icon={<FaBoxOpen />}
          label="Available Food Items"
          value={availableCount}
        />
        <StatsCard
          icon={<FaBoxes />}
          label="Unavailable Food Items"
          value={unavailableCount}
        />
      </div>

      <div className="admin-main-layout">
        <div className="admin-main-col">
          {/* ===== Most Ordered Items ===== */}
          <section className="admin-section">
            <h2 className="admin-section-title">
              <FaTrophy className="admin-section-icon" /> Most Ordered Items
            </h2>
            <MostOrderedItems items={mostOrderedItems} />
          </section>

          {/* ===== Recent Orders (reused component) ===== */}
          <section className="admin-section">
            <h2 className="admin-section-title">
              <FaHistory className="admin-section-icon" /> Recent Orders
            </h2>
            <RecentOrders orders={adminRecentOrders} />
          </section>
        </div>

        <div className="admin-side-col">
          {/* ===== Menu Availability Status ===== */}
          <section className="admin-section">
            <h2 className="admin-section-title">
              <FaUtensils className="admin-section-icon" /> Menu Availability
            </h2>
            <MenuStatusList items={foodAvailabilityList} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;