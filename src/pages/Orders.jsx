import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaReceipt, FaBoxOpen, FaUtensils, FaCalendarAlt } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const formatDate = (isoString) => {
  if (!isoString) return "—";
  const d = new Date(isoString);
  return (
    d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) +
    " · " +
    d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
  );
};

const paymentBadgeClass = (status) =>
  status === "Paid" ? "receipt-status-badge receipt-badge-paid" : "receipt-status-badge receipt-badge-pending";

/**
 * Order History — /orders
 *
 * Shows only COMPLETED orders (pickupStatus === "Delivered"). This is
 * intentionally different from a general "My Orders" / active-orders
 * view: it's a record of what was actually picked up, not a live
 * tracker for orders still in progress. Reads straight from
 * AppContext, so it reflects whatever staff have marked Delivered on
 * StaffDashboard, persisted via localStorage.
 */
const Orders = () => {
  const { orders } = useAppContext();
  const navigate = useNavigate();

  const deliveredOrders = orders.filter((order) => order.pickupStatus === "Delivered");

  if (deliveredOrders.length === 0) {
    return (
      <div className="oh-empty-page">
        <div className="oh-empty-state">
          <FaBoxOpen className="oh-empty-icon" />
          <h2>No order history yet</h2>
          <p>
            Once an order has been picked up, it'll appear here as part of your
            order history.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/menu")}>
            <FaUtensils /> Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="oh-page">
      <div className="oh-header">
        <h1>Order History</h1>
        <p>
          {deliveredOrders.length} delivered order
          {deliveredOrders.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="oh-grid">
        {deliveredOrders.map((order) => {
          const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);

          return (
            <Link to={`/receipt/${order.orderId}`} className="oh-card" key={order.orderId}>
              <div className="oh-card-top">
                <div className="oh-id-row">
                  <FaReceipt className="oh-id-icon" />
                  <span>{order.orderId}</span>
                </div>
                <span className="oh-status-badge oh-status-delivered">Delivered</span>
              </div>

              <div className="oh-date-row">
                <FaCalendarAlt className="oh-date-icon" />
                <span>{formatDate(order.placedAt)}</span>
              </div>

              <div className="oh-items-list">
                {order.items.map((item) => (
                  <div className="oh-item-row" key={item.id}>
                    <span className="oh-item-name">
                      {item.name} <span className="oh-item-qty">× {item.quantity}</span>
                    </span>
                    <span className="oh-item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="oh-card-footer">
                <span className={paymentBadgeClass(order.paymentStatus)}>
                  Payment: {order.paymentStatus}
                </span>
                <div className="oh-footer-right">
                  <span className="oh-item-count">
                    {itemCount} item{itemCount !== 1 ? "s" : ""}
                  </span>
                  <span className="oh-total">₹{order.totalAmount}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;