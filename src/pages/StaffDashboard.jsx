import React, { useState, useMemo } from "react";
import {
  FaClipboardList,
  FaHourglassHalf,
  FaFire,
  FaCheckCircle,
  FaBoxOpen,
  FaBoxes,
  FaHistory,
} from "react-icons/fa";
import { staffOrders, foodAvailabilityList } from "../data/mockData";

const STATUS_OPTIONS = ["Pending", "Preparing", "Ready", "Completed"];

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Pending":
      return "staff-badge-pending";
    case "Preparing":
      return "staff-badge-preparing";
    case "Ready":
      return "staff-badge-ready";
    case "Completed":
      return "staff-badge-completed";
    default:
      return "";
  }
};

const StaffDashboard = () => {
  const [orders, setOrders] = useState(staffOrders);
  const [foodItems, setFoodItems] = useState(foodAvailabilityList);
  const [activityLog, setActivityLog] = useState([
    "Dashboard initialized for today's shift",
  ]);

  /* ---------------- Derived Stats ---------------- */
  const stats = useMemo(() => {
    return {
      totalOrders: orders.length,
      pendingOrders: orders.filter((o) => o.status === "Pending").length,
      preparingOrders: orders.filter((o) => o.status === "Preparing").length,
      completedOrders: orders.filter((o) => o.status === "Completed").length,
    };
  }, [orders]);

  const availableCount = useMemo(
    () => foodItems.filter((f) => f.available).length,
    [foodItems]
  );
  const unavailableCount = foodItems.length - availableCount;

  /* ---------------- Activity Logging ---------------- */
  const logActivity = (message) => {
    setActivityLog((prev) => [message, ...prev].slice(0, 5));
  };

  /* ---------------- Handlers ---------------- */
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    logActivity(`Order #${orderId} marked as ${newStatus}`);
  };

  const handleToggleAvailability = (foodId) => {
    setFoodItems((prev) =>
      prev.map((food) => {
        if (food.id !== foodId) return food;

        const updated = { ...food, available: !food.available };
        logActivity(
          `${updated.name} marked as ${
            updated.available ? "Available" : "Unavailable"
          }`
        );
        return updated;
      })
    );
  };

  return (
    <div className="staff-dashboard">
      {/* ===== Header ===== */}
      <div className="staff-header">
        <h1>Staff Dashboard</h1>
        <p>Manage orders and food availability in real time.</p>
      </div>

      {/* ===== Statistics Overview ===== */}
      <div className="staff-stats-grid">
        <div className="staff-stat-card">
          <div className="staff-stat-icon staff-icon-total">
            <FaClipboardList />
          </div>
          <div>
            <p className="staff-stat-value">{stats.totalOrders}</p>
            <p className="staff-stat-label">Total Orders Today</p>
          </div>
        </div>

        <div className="staff-stat-card">
          <div className="staff-stat-icon staff-icon-pending">
            <FaHourglassHalf />
          </div>
          <div>
            <p className="staff-stat-value">{stats.pendingOrders}</p>
            <p className="staff-stat-label">Pending Orders</p>
          </div>
        </div>

        <div className="staff-stat-card">
          <div className="staff-stat-icon staff-icon-preparing">
            <FaFire />
          </div>
          <div>
            <p className="staff-stat-value">{stats.preparingOrders}</p>
            <p className="staff-stat-label">Preparing Orders</p>
          </div>
        </div>

        <div className="staff-stat-card">
          <div className="staff-stat-icon staff-icon-completed">
            <FaCheckCircle />
          </div>
          <div>
            <p className="staff-stat-value">{stats.completedOrders}</p>
            <p className="staff-stat-label">Completed Orders</p>
          </div>
        </div>
      </div>

      <div className="staff-main-layout">
        <div className="staff-main-col">
          {/* ===== Order Management ===== */}
          <section className="staff-section">
            <h2 className="staff-section-title">Order Management</h2>

            <div className="staff-table-wrapper">
              <table className="staff-orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Student</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.student}</td>
                      <td>{order.item}</td>
                      <td>{order.quantity}</td>
                      <td>
                        <div className="staff-status-cell">
                          <span
                            className={`staff-status-badge ${getStatusBadgeClass(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                          <select
                            className="staff-status-select"
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            aria-label={`Update status for order ${order.id}`}
                          >
                            {STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ===== Food Availability ===== */}
          <section className="staff-section">
            <h2 className="staff-section-title">Food Availability</h2>

            <div className="staff-food-list">
              {foodItems.map((food) => (
                <div key={food.id} className="staff-food-row">
                  <span className="staff-food-name">{food.name}</span>

                  <button
                    className={`staff-toggle-btn ${
                      food.available
                        ? "staff-toggle-available"
                        : "staff-toggle-unavailable"
                    }`}
                    onClick={() => handleToggleAvailability(food.id)}
                    aria-pressed={food.available}
                  >
                    <span className="staff-toggle-track">
                      <span className="staff-toggle-thumb"></span>
                    </span>
                    {food.available ? "Available" : "Unavailable"}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="staff-side-col">
          {/* ===== Inventory Summary ===== */}
          <section className="staff-section">
            <h2 className="staff-section-title">Inventory Summary</h2>

            <div className="staff-inventory-card">
              <div className="staff-inventory-row">
                <div className="staff-inventory-icon staff-icon-available">
                  <FaBoxOpen />
                </div>
                <div>
                  <p className="staff-inventory-value">{availableCount}</p>
                  <p className="staff-inventory-label">Available Items</p>
                </div>
              </div>

              <div className="staff-inventory-divider"></div>

              <div className="staff-inventory-row">
                <div className="staff-inventory-icon staff-icon-unavailable">
                  <FaBoxes />
                </div>
                <div>
                  <p className="staff-inventory-value">{unavailableCount}</p>
                  <p className="staff-inventory-label">Unavailable Items</p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== Recent Activity ===== */}
          <section className="staff-section">
            <h2 className="staff-section-title">
              <FaHistory className="staff-activity-title-icon" /> Recent
              Activity
            </h2>

            <div className="staff-activity-panel">
              {activityLog.length > 0 ? (
                <ul className="staff-activity-list">
                  {activityLog.map((entry, idx) => (
                    <li key={idx} className="staff-activity-item">
                      {entry}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="staff-activity-empty">No recent activity yet.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;