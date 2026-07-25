import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaReceipt,
  FaPrint,
  FaUtensils,
  FaClipboardList,
  FaClock,
  FaExclamationTriangle,
  FaArrowLeft,
  FaBoxOpen,
} from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const formatDateTime = (isoString) => {
  if (!isoString) return "—";
  const d = new Date(isoString);
  return (
    d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) +
    ", " +
    d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
  );
};

const paymentStatusClass = (status) =>
  status === "Paid" ? "receipt-badge-paid" : "receipt-badge-pending";

const pickupStatusClass = (status) => {
  switch (status) {
    case "Delivered":
      return "receipt-badge-delivered";
    case "Ready":
      return "receipt-badge-ready";
    case "Pending":
    default:
      return "receipt-badge-pending";
  }
};

// Picks the right "back to dashboard" destination based on the
// logged-in user's role, so the same Receipt page works whether a
// student, faculty member, or staff opened it.
const dashboardPathForRole = (role) => {
  switch (role) {
    case "staff":
      return "/staff";
    case "admin":
      return "/admin";
    case "student":
    case "faculty":
    default:
      return "/student";
  }
};

/**
 * Receipt page — /receipt/:orderId
 *
 * `order` is derived fresh on every render from `orders` in
 * AppContext (via getOrderById). Because AppContext is the single
 * source of truth and this component doesn't copy the order into its
 * own local state, any change made elsewhere — e.g. staff clicking
 * "Mark Ready" / "Mark Delivered" on StaffDashboard, which calls
 * updatePickupStatus() — automatically re-renders this page with the
 * latest status the next time React re-renders it. No polling,
 * manual refresh, or useEffect needed for that part.
 */
const Receipt = () => {
  const { orderId } = useParams();
  const { getOrderById } = useAppContext();
  const navigate = useNavigate();

  const order = getOrderById(orderId);

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser")) || {};
    } catch {
      return {};
    }
  })();

  const handlePrint = () => {
    window.print();
  };

  const handleBackToDashboard = () => {
    navigate(dashboardPathForRole(currentUser.role));
  };

  if (!order) {
    return (
      <div className="receipt-page">
        <div className="receipt-not-found">
          <FaExclamationTriangle className="receipt-not-found-icon" />
          <h2>Order not found</h2>
          <p>
            We couldn't find an order with ID <strong>{orderId || "—"}</strong>.
            It may have been cleared, or the link may be incorrect.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/menu")}>
            <FaUtensils /> Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const subtotal =
    order.subtotal ?? order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const platformFee = order.platformFee ?? order.totalAmount - subtotal;
  const isDelivered = order.pickupStatus === "Delivered";

  return (
    <div className="receipt-page">
      <div className="receipt-card receipt-printable" id="receipt-print-area">
        {isDelivered ? (
          <>
            {/* ----- Success indicator shown only once the order has
                actually been picked up, distinct from the generic
                "payment went through" confirmation above ----- */}
            <FaBoxOpen className="receipt-success-icon receipt-delivered-icon" />
            <h2 className="receipt-title">Order Delivered!</h2>
            <p className="receipt-subtitle">
              This order has been picked up. Thanks for ordering with Ctrl+Alt+Eat.
            </p>
          </>
        ) : (
          <>
            <FaCheckCircle className="receipt-success-icon" />
            <h2 className="receipt-title">Order Confirmed!</h2>
            <p className="receipt-subtitle">Thanks for ordering with Ctrl+Alt+Eat</p>
          </>
        )}

        <div className="receipt-id-row">
          <FaReceipt />
          <span>Order ID: {order.orderId}</span>
        </div>

        <div className="receipt-meta-grid">
          <div className="receipt-meta-item">
            <span className="receipt-meta-label">Student</span>
            <span className="receipt-meta-value">{order.studentName}</span>
          </div>
          <div className="receipt-meta-item">
            <span className="receipt-meta-label">Date &amp; Time</span>
            <span className="receipt-meta-value">{formatDateTime(order.placedAt)}</span>
          </div>
        </div>

        <div className="receipt-status-row">
          <span className={`receipt-status-badge ${paymentStatusClass(order.paymentStatus)}`}>
            Payment: {order.paymentStatus}
          </span>
          <span className={`receipt-status-badge ${pickupStatusClass(order.pickupStatus)}`}>
            Pickup: {order.pickupStatus}
          </span>
        </div>

        <div className="receipt-items-list">
          {order.items.map((item) => (
            <div className="receipt-item-row" key={item.id}>
              <span className="receipt-item-name">
                {item.name} <span className="receipt-item-qty">× {item.quantity}</span>
              </span>
              <span className="receipt-item-price">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="receipt-divider" />

        <div className="receipt-summary-row">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="receipt-summary-row">
          <span>Platform Fee</span>
          <span>₹{platformFee}</span>
        </div>

        <div className="receipt-divider" />

        <div className="receipt-summary-row receipt-total-row">
          <span>Total Amount</span>
          <span>₹{order.totalAmount}</span>
        </div>

        {!isDelivered && (
          <div className="receipt-pickup-row">
            <FaClock />
            <span>Estimated Pickup: {formatDateTime(order.estimatedPickupTime)}</span>
          </div>
        )}

        <div className="receipt-payment-method">
          Payment Method: {order.paymentMethod}
        </div>
      </div>

      {/* Hidden on print via @media print in App.css */}
      <div className="receipt-page-actions">
        <button className="btn btn-primary" onClick={handlePrint}>
          <FaPrint /> Print Receipt
        </button>
        <button className="btn btn-outline" onClick={handleBackToDashboard}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <Link to="/orders" className="btn btn-ghost">
          <FaClipboardList /> View All Orders
        </Link>
      </div>
    </div>
  );
};

export default Receipt;