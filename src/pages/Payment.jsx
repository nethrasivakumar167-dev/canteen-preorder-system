import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMobileAlt,
  FaCreditCard,
  FaUniversity,
  FaMoneyBillWave,
  FaShoppingBag,
  FaUtensils,
} from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { paymentMethods, bankOptions } from "../data/mockData";

const methodIcons = {
  upi: <FaMobileAlt className="payment-method-icon" />,
  card: <FaCreditCard className="payment-method-icon" />,
  netbanking: <FaUniversity className="payment-method-icon" />,
  cash: <FaMoneyBillWave className="payment-method-icon" />,
};

const Payment = () => {
  const { cart, subtotal, platformFee, grandTotal, placeOrder } = useAppContext();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [selectedBank, setSelectedBank] = useState(bankOptions[0]);

  // DEBUG: confirm this page is actually receiving cart data from context
  console.log("[Payment] cart from context:", cart, "grandTotal:", grandTotal);

  if (cart.length === 0) {
    console.warn("[Payment] Cart is empty — rendering empty-cart guard instead of form.");
    return (
      <div className="payment-page">
        <div className="payment-empty-state">
          <FaShoppingBag className="payment-empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Add some items from the menu before heading to payment.</p>
          <button className="btn btn-primary" onClick={() => navigate("/menu")}>
            <FaUtensils /> Browse Menu
          </button>
        </div>
      </div>
    );
  }

  const validate = () => {
    const newErrors = {};

    if (selectedMethod === "upi" && !/^[\w.-]+@[\w.-]+$/.test(upiId)) {
      newErrors.upiId = "Enter a valid UPI ID (e.g. name@bank)";
    }

    if (selectedMethod === "card") {
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Enter a valid 16-digit card number";
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
        newErrors.cardExpiry = "Use MM/YY format";
      }
      if (!/^\d{3}$/.test(cardCvv)) {
        newErrors.cardCvv = "Enter a valid 3-digit CVV";
      }
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log("[Payment] validate() ->", isValid, newErrors);
    return isValid;
  };

  // THIS is the function the whole flow hinges on. Root-cause checklist
  // baked in as comments so it's obvious if you diverge from this:
  const handlePayAndPlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    setTimeout(() => {
      // 1. Call placeOrder EXACTLY ONCE. Calling it twice (e.g. once to
      //    "preview" and again to "confirm") generates two different
      //    orderIds — the one you navigate to will never match the one
      //    actually stored.
      const order = placeOrder({ method: selectedMethod });

      // 2. This log is your ground truth. If order is undefined, or
      //    order.orderId is undefined, the bug is inside placeOrder()
      //    in AppContext.jsx — not in this file.
      console.log("[Payment] Order created:", order);

      setIsProcessing(false);

      if (!order || !order.orderId) {
        console.error("[Payment] placeOrder() did not return a valid order. Aborting navigation.");
        return;
      }

      // 3. MUST use order.orderId (not order.id, not a locally-generated
      //    id) — this has to be the exact same value stored in context,
      //    or Receipt.jsx's lookup will fail.
      console.log(`[Payment] Navigating to /receipt/${order.orderId}`);
      navigate(`/receipt/${order.orderId}`);
    }, 900);
  };

  return (
    <div className="payment-page">
      <div className="payment-header">
        <h1>Payment</h1>
        <p>Review your order and choose how you'd like to pay</p>
      </div>

      <div className="payment-layout">
        <div className="payment-summary-card">
          <h3>Order Summary</h3>

          <div className="payment-summary-items">
            {cart.map((item) => (
              <div className="payment-summary-item-row" key={item.id}>
                <div className="payment-summary-item-info">
                  <span className="payment-summary-item-name">{item.name}</span>
                  <span className="payment-summary-item-qty">
                    Qty: {item.quantity} × ₹{item.price}
                  </span>
                </div>
                <span className="payment-summary-item-total">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="payment-summary-divider" />

          <div className="payment-summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="payment-summary-row">
            <span>Platform Fee</span>
            <span>₹{platformFee}</span>
          </div>

          <div className="payment-summary-divider" />

          <div className="payment-summary-row payment-grand-total-row">
            <span>Grand Total</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>

        <div className="payment-method-card">
          <h3>Choose Payment Method</h3>

          <div className="payment-method-options">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                className={`payment-method-option ${
                  selectedMethod === method.id ? "payment-method-selected" : ""
                }`}
                onClick={() => {
                  console.log("[Payment] Method selected:", method.id);
                  setSelectedMethod(method.id);
                }}
              >
                {methodIcons[method.id]}
                {method.label}
              </button>
            ))}
          </div>

          <form onSubmit={handlePayAndPlaceOrder} noValidate>
            {selectedMethod === "upi" && (
              <div className="form-group">
                <label htmlFor="upiId">UPI ID</label>
                <div className={`input-wrapper ${errors.upiId ? "input-error" : ""}`}>
                  <input
                    id="upiId"
                    type="text"
                    placeholder="yourname@bank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
                {errors.upiId && <span className="field-error">{errors.upiId}</span>}
              </div>
            )}

            {selectedMethod === "card" && (
              <>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <div
                    className={`input-wrapper ${
                      errors.cardNumber ? "input-error" : ""
                    }`}
                  >
                    <input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  {errors.cardNumber && (
                    <span className="field-error">{errors.cardNumber}</span>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardExpiry">Expiry (MM/YY)</label>
                    <div
                      className={`input-wrapper ${
                        errors.cardExpiry ? "input-error" : ""
                      }`}
                    >
                      <input
                        id="cardExpiry"
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    {errors.cardExpiry && (
                      <span className="field-error">{errors.cardExpiry}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardCvv">CVV</label>
                    <div
                      className={`input-wrapper ${
                        errors.cardCvv ? "input-error" : ""
                      }`}
                    >
                      <input
                        id="cardCvv"
                        type="password"
                        placeholder="123"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                    </div>
                    {errors.cardCvv && (
                      <span className="field-error">{errors.cardCvv}</span>
                    )}
                  </div>
                </div>
              </>
            )}

            {selectedMethod === "netbanking" && (
              <div className="form-group">
                <label htmlFor="bank">Select Bank</label>
                <div className="input-wrapper">
                  <select
                    id="bank"
                    className="mm-select"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                  >
                    {bankOptions.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {selectedMethod === "cash" && (
              <p className="payment-cash-note">
                Pay in cash when you pick up your order at the counter.
                Your order will be marked "Paid" once collected.
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary payment-submit-btn full-width"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="btn-spinner" />
              ) : (
                `Pay ₹${grandTotal} & Place Order`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;