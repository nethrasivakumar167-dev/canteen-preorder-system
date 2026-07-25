import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash, FaShoppingBasket } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    platformFee,
    grandTotal,
  } = useAppContext();

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    clearCart();
    navigate("/student");
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="cart-empty-state">
          <FaShoppingBasket className="cart-empty-icon" />
          <h2>Your cart is empty.</h2>
          <p>Browse the menu and add some delicious food.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/menu")}
          >
            Go to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>Review your items before checking out.</p>
      </div>

      <div className="cart-layout">
        {/* ===== Cart Table ===== */}
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
                  <td className="cart-item-name-cell">
                    <div className="cart-item-thumb">
                      {item.name.charAt(0)}
                    </div>
                    <span>{item.name}</span>
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
                  <td className="cart-total-cell">
                    ₹{item.price * item.quantity}
                  </td>
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

        {/* ===== Order Summary ===== */}
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

          <div className="cart-summary-divider"></div>

          <div className="cart-summary-row cart-summary-total">
            <span>Grand Total</span>
            <span>₹{grandTotal}</span>
          </div>

          <button
            className="btn btn-primary full-width cart-checkout-btn"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>

          <button
            className="btn btn-ghost full-width cart-continue-btn"
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