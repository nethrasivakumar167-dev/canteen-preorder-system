import React, { useState, useMemo } from "react";
import {
  FaClipboardList,
  FaHourglassHalf,
  FaCheckCircle,
  FaBoxOpen,
  FaReceipt,
  FaArrowRight,
  FaUserGraduate,
  FaClock,
} from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

// Filter tab definitions — "All" plus each pickup status.
const FILTERS = ["All", "Pending", "Ready", "Delivered"];

// Maps pickupStatus to the badge class used across the app
// (same classes already used on StudentDashboard/Orders/Receipt).
const pickupBadgeClass = (status) => {
  switch (status) {
    case "Ready":
      return "staff-status-badge staff-badge-ready";
    case "Delivered":
      return "staff-status-badge staff-badge-completed";
    case "Pending":
    default:
      return "staff-status-badge staff-badge-pending";
  }
};

const paymentBadgeClass = (status) =>
  status === "Paid" ? "receipt-status-badge receipt-badge-paid" : "receipt-status-badge receipt-badge-pending";

// Pending -> Ready -> Delivered. Delivered has no further step.
const nextStatus = {
  Pending: "Ready",
  Ready: "Delivered",
};

const formatDateTime = (isoString) => {
  if (!isoString) return "—";
  const d = new Date(isoString);
  return (
    d.toLocaleDateString(undefined, { day: "numeric", month: "short" }) +
    ", " +
    d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
  );
};

const itemsSummary = (items) =>
  items.map((item) => `${item.name} ×${item.quantity}`).join(", ");

/**
 * Staff Order Management Dashboard
 *
 * Reads `orders` straight from AppContext (persisted to localStorage
 * by AppContext itself) — no local order state here, so this view is
 * always in sync with whatever students place via Payment.jsx and
 * whatever any other staff view might change.
 */
const StaffDashboard = () => {
  const { orders, updatePickupStatus } = useAppContext();
  const [activeFilter, setActiveFilter] = useState("All");
  const [advancingId, setAdvancingId] = useState(null);

  // ----- Live stats derived from context orders (never drifts out of
  // sync since there's no separate local copy to forget to update) -----
  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.pickupStatus === "Pending").length,
      ready: orders.filter((o) => o.pickupStatus === "Ready").length,
      delivered: orders.filter((o) => o.pickupStatus === "Delivered").length,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (activeFilter === "All") return orders;
    return orders.filter((o) => o.pickupStatus === activeFilter);
  }, [orders, activeFilter]);

  const handleAdvanceStatus = (order) => {
    const next = nextStatus[order.pickupStatus];
    if (!next) return; // already Delivered — no further action

    setAdvancingId(order.orderId);
    updatePickupStatus(order.orderId, next);

    // Brief visual settle so the button doesn't feel like it silently
    // did nothing on fast re-renders.
    setTimeout(() => setAdvancingId(null), 300);
  };

  return (
    <div className="staff-dashboard">
      <div className="staff-header">
        <h1>Staff Order Management</h1>
        <p>Track incoming orders and move them through pickup</p>
      </div>

      {/* ----- Stats Overview ----- */}
      <div className="staff-stats-grid">
        <div className="staff-stat-card">
          <div className="staff-stat-icon staff-icon-total">
            <FaClipboardList />
          </div>
          <div>
            <div className="staff-stat-value">{stats.total}</div>
            <div className="staff-stat-label">Total Orders</div>
          </div>
        </div>

        <div className="staff-stat-card">
          <div className="staff-stat-icon staff-icon-pending">
            <FaHourglassHalf />
          </div>
          <div>
            <div className="staff-stat-value">{stats.pending}</div>
            <div className="staff-stat-label">Pending</div>
          </div>
        </div>

        <div className="staff-stat-card">
          <div className="staff-stat-icon staff-icon-preparing">
            <FaBoxOpen />
          </div>
          <div>
            <div className="staff-stat-value">{stats.ready}</div>
            <div className="staff-stat-label">Ready for Pickup</div>
          </div>
        </div>

        <div className="staff-stat-card">
          <div className="staff-stat-icon staff-icon-completed">
            <FaCheckCircle />
          </div>
          <div>
            <div className="staff-stat-value">{stats.delivered}</div>
            <div className="staff-stat-label">Delivered</div>
          </div>
        </div>
      </div>

      {/* ----- Filter Tabs ----- */}
      <div className="staff-filter-tabs">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`staff-filter-tab ${
              activeFilter === filter ? "staff-filter-tab-active" : ""
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
            {filter !== "All" && (
              <span className="staff-filter-count">
                {orders.filter((o) => o.pickupStatus === filter).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ----- Orders Table ----- */}
      {filteredOrders.length === 0 ? (
        <div className="staff-orders-empty-state">
          <FaReceipt className="staff-orders-empty-icon" />
          <h3>No {activeFilter !== "All" ? activeFilter.toLowerCase() : ""} orders</h3>
          <p>
            {activeFilter === "All"
              ? "Orders placed by students will show up here."
              : `There are no orders currently marked "${activeFilter}".`}
          </p>
        </div>
      ) : (
        <div className="staff-table-wrapper">
          <table className="staff-orders-table staff-orders-table-wide">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Student</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Pickup Status</th>
                <th>Order Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const next = nextStatus[order.pickupStatus];

                return (
                  <tr key={order.orderId}>
                    <td>
                      <div className="staff-order-id-cell">
                        <FaReceipt className="staff-order-id-icon" />
                        {order.orderId}
                      </div>
                    </td>
                    <td>
                      <div className="staff-student-cell">
                        <FaUserGraduate className="staff-student-icon" />
                        {order.studentName}
                      </div>
                    </td>
                    <td className="staff-items-cell">{itemsSummary(order.items)}</td>
                    <td className="staff-total-cell">₹{order.totalAmount}</td>
                    <td>
                      <span className={paymentBadgeClass(order.paymentStatus)}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <span className={pickupBadgeClass(order.pickupStatus)}>
                        {order.pickupStatus}
                      </span>
                    </td>
                    <td>
                      <div className="staff-order-time-cell">
                        <FaClock className="staff-order-time-icon" />
                        {formatDateTime(order.placedAt)}
                      </div>
                    </td>
                    <td>
                      {next ? (
                        <button
                          className={`staff-advance-btn staff-advance-to-${next.toLowerCase()}`}
                          onClick={() => handleAdvanceStatus(order)}
                          disabled={advancingId === order.orderId}
                        >
                          Mark {next} <FaArrowRight />
                        </button>
                      ) : (
                        <span className="staff-completed-label">
                          <FaCheckCircle /> Completed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;