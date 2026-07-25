import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash, FaShoppingBag, FaUtensils } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

/**
 * Cart page — the step BEFORE Payment.
 * The only job this page has in the order flow is:
 *   1. Show what's in the cart (from AppContext, not local state)
 *   2. On "Proceed to Payment", navigate("/payment")
 * It does NOT call placeOrder() — that only happens in Payment.jsx.
 */
const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
    platformFee,
    grandTotal,
  } = useAppContext();

  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    console.log("[Cart] Proceeding to payment with cart:", cart);
    if (cart.length === 0) {
      console.warn("[Cart] Cart is empty — should not be able to reach this point.");
      return;
    }
    navigate("/payment");
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="cart-empty-state">
          <FaShoppingBag className="cart-empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet. Browse the menu to get started.</p>
          <button className="btn btn-primary" onClick={() => navigate("/menu")}>
            <FaUtensils /> Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>Review your items before checking out</p>
      </div>

      <div className="cart-layout">
        {/* ----- Cart Table ----- */}
        <div className="cart-table-wrapper">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="cart-item-name-cell">
                      <span className="cart-item-thumb">{item.name.charAt(0)}</span>
                      {item.name}
                    </div>
                  </td>
                  <td>₹{item.price}</td>
                  <td>
                    <div className="cart-qty-controls">
                      <button
                        className="cart-qty-btn"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <FaMinus />
                      </button>
                      <span className="cart-qty-value">{item.quantity}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </td>
                  <td className="cart-total-cell">₹{item.price * item.quantity}</td>
                  <td>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ----- Order Summary ----- */}
        <div className="cart-summary-card">
          <h3>Order Summary</h3>

          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="cart-summary-row">
            <span>Platform Fee</span>
            <span>₹{platformFee}</span>
          </div>

          <div className="cart-summary-divider" />

          <div className="cart-summary-row cart-summary-total">
            <span>Grand Total</span>
            <span>₹{grandTotal}</span>
          </div>

          <button
            className="btn btn-primary cart-checkout-btn full-width"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>

          <button
            className="btn btn-ghost cart-continue-btn full-width"
            onClick={() => navigate("/menu")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;