import React, { createContext, useContext, useState, useEffect } from "react";
import { estimatedPrepMinutes } from "../data/mockData";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

const ORDERS_STORAGE_KEY = "canteen_orders";

// Generates a short, readable, unique-enough order ID for this mock app.
const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(100 + Math.random() * 900);
  return `ORD${timestamp}${random}`;
};

// Reads and parses orders from localStorage. Wrapped in try/catch so a
// corrupted or manually-edited localStorage value can't crash the app
// on load — it just falls back to an empty order list.
const loadOrdersFromStorage = () => {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("[AppContext] Failed to parse orders from localStorage:", error);
    return [];
  }
};

export const AppProvider = ({ children }) => {
  // ----- Cart state (unchanged — session-only, not persisted) -----
  const [cart, setCart] = useState([]);

  // ----- Orders state, hydrated from localStorage on first render -----
  // Using the lazy-initializer form of useState (passing a function,
  // not a value) means loadOrdersFromStorage() only runs once, on
  // mount — not on every re-render.
  const [orders, setOrders] = useState(loadOrdersFromStorage);

  // Whenever `orders` changes for ANY reason (placeOrder, updatePickupStatus,
  // etc.), persist the latest array to localStorage. This is the single
  // place that writes to storage, so every code path that mutates orders
  // automatically stays in sync — no need to remember to save manually
  // inside placeOrder() or updatePickupStatus().
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error("[AppContext] Failed to save orders to localStorage:", error);
    }
  }, [orders]);

  // ----- Cart functions (unchanged) -----
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);

      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const platformFee = cart.length > 0 ? 5 : 0;
  const grandTotal = subtotal + platformFee;

  /**
   * Snapshots the current cart into a new order, appends it to `orders`
   * (which triggers the useEffect above to persist to localStorage),
   * clears the cart, and returns the created order so the caller
   * (Payment.jsx) can navigate straight to /receipt/:orderId with it.
   *
   * paymentDetails: { method: "upi" | "card" | "netbanking" | "cash" }
   */
  const placeOrder = (paymentDetails) => {
    let studentName = "Guest";
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      studentName = currentUser?.name || currentUser?.userId || "Guest";
    } catch {
      studentName = "Guest";
    }

    const now = new Date();
    const estimatedPickupTime = new Date(
      now.getTime() + estimatedPrepMinutes * 60000
    );

    const paymentStatus = paymentDetails.method === "cash" ? "Pending" : "Paid";

    const newOrder = {
      orderId: generateOrderId(),
      studentName,
      items: cart,
      subtotal,
      platformFee,
      totalAmount: grandTotal,
      paymentMethod: paymentDetails.method,
      paymentStatus,
      pickupStatus: "Pending",
      placedAt: now.toISOString(),
      estimatedPickupTime: estimatedPickupTime.toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    return newOrder;
  };

  // Staff-facing: advance an order's pickup status
  // (Pending -> Ready -> Delivered). Also flips paymentStatus to "Paid"
  // when a Cash-on-Pickup order is finally delivered.
  const updatePickupStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.orderId !== orderId) return order;

        const updated = { ...order, pickupStatus: newStatus };

        if (
          newStatus === "Delivered" &&
          order.paymentMethod === "cash" &&
          order.paymentStatus === "Pending"
        ) {
          updated.paymentStatus = "Paid";
        }

        return updated;
      })
    );
  };

  // Lookup used by Receipt.jsx.
  const getOrderById = (orderId) =>
    orders.find((order) => order.orderId === orderId);

  const value = {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    subtotal,
    platformFee,
    grandTotal,
    orders,
    placeOrder,
    updatePickupStatus,
    getOrderById,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;