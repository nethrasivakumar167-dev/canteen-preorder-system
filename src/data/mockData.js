/* =========================================================
   STUDENT DASHBOARD DATA
========================================================= */
export const studentStats = {
  totalOrders: 5,
  favoriteItem: "Masala Dosa",
  walletBalance: 250,
};

export const recentOrders = [
  { orderId: 101, item: "Masala Dosa", status: "Ready" },
  { orderId: 102, item: "Coffee", status: "Completed" },
  { orderId: 103, item: "Veg Fried Rice", status: "Preparing" },
];

export const todaysSpecials = [
  {
    id: 1,
    name: "Masala Dosa",
    description: "Crispy dosa served with chutney and sambar",
    category: "Breakfast",
    price: 40,
    available: true,
  },
  {
    id: 2,
    name: "Veg Fried Rice",
    description: "Freshly prepared fried rice with mixed vegetables",
    category: "Lunch",
    price: 60,
    available: true,
  },
  {
    id: 3,
    name: "Coffee",
    description: "Hot filter coffee brewed fresh",
    category: "Beverages",
    price: 20,
    available: true,
  },
];

/* =========================================================
   MENU DATA
========================================================= */
export const categories = ["All", "Breakfast", "Lunch", "Snacks", "Beverages"];

export const menuItems = [
  {
    id: 1,
    name: "Masala Dosa",
    description: "Crispy dosa served with chutney and sambar",
    category: "Breakfast",
    price: 40,
    available: true,
  },
  {
    id: 2,
    name: "Veg Fried Rice",
    description: "Freshly prepared fried rice with mixed vegetables",
    category: "Lunch",
    price: 60,
    available: true,
  },
  {
    id: 3,
    name: "Coffee",
    description: "Hot filter coffee brewed fresh",
    category: "Beverages",
    price: 20,
    available: false,
  },
  {
    id: 4,
    name: "Idli Sambar",
    description: "Steamed rice cakes served with sambar and chutney",
    category: "Breakfast",
    price: 30,
    available: true,
  },
  {
    id: 5,
    name: "Paneer Butter Masala",
    description: "Rich and creamy paneer curry with butter naan",
    category: "Lunch",
    price: 90,
    available: true,
  },
  {
    id: 6,
    name: "Veg Sandwich",
    description: "Grilled sandwich loaded with fresh vegetables",
    category: "Snacks",
    price: 45,
    available: true,
  },
  {
    id: 7,
    name: "French Fries",
    description: "Crispy golden fries served with ketchup",
    category: "Snacks",
    price: 50,
    available: true,
  },
  {
    id: 8,
    name: "Cold Coffee",
    description: "Chilled coffee blended with ice cream",
    category: "Beverages",
    price: 35,
    available: true,
  },
  {
    id: 9,
    name: "Chicken Roll",
    description: "Spicy chicken wrapped in a soft paratha",
    category: "Lunch",
    price: 80,
    available: false,
  },
  {
    id: 10,
    name: "Tea",
    description: "Classic Indian masala chai",
    category: "Beverages",
    price: 15,
    available: true,
  },
  {
    id: 11,
    name: "Poha",
    description: "Light and flavorful flattened rice breakfast",
    category: "Breakfast",
    price: 25,
    available: true,
  },
  {
    id: 12,
    name: "Samosa",
    description: "Crispy pastry filled with spiced potatoes",
    category: "Snacks",
    price: 20,
    available: true,
  },
];

/* =========================================================
   STAFF DASHBOARD DATA
========================================================= */
export const staffStats = {
  totalOrders: 24,
  pendingOrders: 8,
  preparingOrders: 5,
  completedOrders: 11,
};

export const staffOrders = [
  { id: 101, student: "Nethra", item: "Masala Dosa", quantity: 2, status: "Pending" },
  { id: 102, student: "Rahul", item: "Coffee", quantity: 1, status: "Preparing" },
  { id: 103, student: "Priya", item: "Veg Fried Rice", quantity: 1, status: "Ready" },
  { id: 104, student: "Arjun", item: "Idli Sambar", quantity: 3, status: "Pending" },
  { id: 105, student: "Sneha", item: "Paneer Butter Masala", quantity: 1, status: "Completed" },
  { id: 106, student: "Kiran", item: "Veg Sandwich", quantity: 2, status: "Preparing" },
  { id: 107, student: "Divya", item: "Cold Coffee", quantity: 1, status: "Pending" },
  { id: 108, student: "Vikram", item: "Samosa", quantity: 4, status: "Ready" },
];

export const foodAvailabilityList = [
  { id: 1, name: "Masala Dosa", available: true },
  { id: 2, name: "Veg Fried Rice", available: true },
  { id: 3, name: "Coffee", available: false },
  { id: 4, name: "Idli Sambar", available: true },
  { id: 5, name: "Paneer Butter Masala", available: true },
  { id: 6, name: "Veg Sandwich", available: true },
  { id: 7, name: "French Fries", available: true },
  { id: 8, name: "Cold Coffee", available: true },
  { id: 9, name: "Chicken Roll", available: false },
  { id: 10, name: "Tea", available: true },
  { id: 11, name: "Poha", available: true },
  { id: 12, name: "Samosa", available: true },
];

/* =========================================================
   ADMIN DASHBOARD DATA
========================================================= */

// High-level admin stats. availableFoodItems / unavailableFoodItems
// are intentionally NOT hardcoded here — AdminDashboard derives them
// live from `foodAvailabilityList` so the numbers can never drift out
// of sync with the actual menu data.
export const adminStats = {
  totalOrders: 342,
  totalRevenue: 48650, // in ₹
};

// Ranked by number of orders (descending)
export const mostOrderedItems = [
  { id: 1, name: "Masala Dosa", orders: 128, revenue: 5120 },
  { id: 2, name: "Veg Fried Rice", orders: 96, revenue: 5760 },
  { id: 3, name: "Coffee", orders: 84, revenue: 1680 },
  { id: 4, name: "Samosa", orders: 71, revenue: 1420 },
  { id: 5, name: "Paneer Butter Masala", orders: 58, revenue: 5220 },
];

// Reuses the same shape as the existing RecentOrders component
// ({ orderId, item, status }) so it can be rendered with zero changes.
export const adminRecentOrders = [
  { orderId: 201, item: "Masala Dosa", status: "Completed" },
  { orderId: 202, item: "Cold Coffee", status: "Ready" },
  { orderId: 203, item: "Veg Fried Rice", status: "Preparing" },
  { orderId: 204, item: "Samosa", status: "Completed" },
  { orderId: 205, item: "Paneer Butter Masala", status: "Pending" },
];
/* =========================================================
   PROFILE PAGE DATA
========================================================= */

// Fallback/demo profile data, keyed by role. Profile.jsx merges this
// with the actual `currentUser` from localStorage (name/role/userId),
// so the page always has realistic contact details to display even
// though Login only captures a userId + password.
export const profileMockDataByRole = {
  student: {
    id: "STU001",
    email: "nethra@example.com",
    phone: "+1 234 567 8900",
    avatar: "https://via.placeholder.com/150",
  },
  faculty: {
    id: "FAC001",
    email: "faculty@example.com",
    phone: "+1 234 567 8901",
    avatar: "https://via.placeholder.com/150",
  },
  staff: {
    id: "STF001",
    email: "staff@example.com",
    phone: "+1 234 567 8902",
    avatar: "https://via.placeholder.com/150",
  },
  admin: {
    id: "ADM001",
    email: "admin@example.com",
    phone: "+1 234 567 8903",
    avatar: "https://via.placeholder.com/150",
  },
};

// Stats shown for student/faculty roles
export const profileStudentStats = {
  totalOrders: 5,
  favoriteItems: 3,
  totalSpent: 620,
};

// Stats shown for staff/admin roles
export const profileStaffStats = {
  managedItems: 12,
  ordersProcessed: 87,
  activeMenuItems: 10,
};

// Recent activity feeds, keyed by role group
export const profileActivityByRole = {
  student: [
    "Ordered Masala Dosa",
    "Added Coffee to Favorites",
    "Completed Payment for Order #103",
    "Ordered Veg Fried Rice",
    "Added Samosa to Favorites",
  ],
  staff: [
    "Added New Menu Item: Cold Coffee",
    "Updated Food Availability: Coffee marked Unavailable",
    "Processed Order #1005",
    "Updated Food Availability: Samosa marked Available",
    "Processed Order #1002",
  ],
};
/* =========================================================
   PAYMENT PAGE DATA
========================================================= */

// Payment method definitions — drives both the selection UI and
// which input fields render for each method.
export const paymentMethods = [
  { id: "upi", label: "UPI" },
  { id: "card", label: "Credit/Debit Card" },
  { id: "netbanking", label: "Net Banking" },
  { id: "cash", label: "Cash on Pickup" },
];

// Bank list for the Net Banking dropdown
export const bankOptions = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
];

// Average prep time (minutes) used to calculate an estimated pickup
// time on the success screen. Kept simple/mocked — no real kitchen
// queue logic.
export const estimatedPrepMinutes = 15;
/* =========================================================
   MOCK ORDER HISTORY DATA — updated shape
   Replace the existing `mockOrders` export in mockData.js with
   this block. Shape now matches what AppContext.placeOrder()
   generates, and what Receipt.jsx / Orders.jsx expect:
   { orderId, studentName, items, subtotal, platformFee,
     totalAmount, paymentMethod, paymentStatus, pickupStatus,
     placedAt, estimatedPickupTime }
========================================================= */
export const mockOrders = [
  {
    orderId: "ORD482913",
    studentName: "Nethra",
    items: [
      { id: 1, name: "Masala Dosa", price: 40, quantity: 1 },
      { id: 3, name: "Coffee", price: 20, quantity: 1 },
    ],
    subtotal: 60,
    platformFee: 5,
    totalAmount: 65,
    paymentMethod: "upi",
    paymentStatus: "Paid",
    pickupStatus: "Delivered",
    placedAt: "2026-07-25T09:14:00.000Z",
    estimatedPickupTime: "2026-07-25T09:29:00.000Z",
  },
  {
    orderId: "ORD482744",
    studentName: "Rahul",
    items: [{ id: 6, name: "Veg Sandwich", price: 45, quantity: 1 }],
    subtotal: 45,
    platformFee: 5,
    totalAmount: 50,
    paymentMethod: "card",
    paymentStatus: "Paid",
    pickupStatus: "Preparing",
    placedAt: "2026-07-24T13:02:00.000Z",
    estimatedPickupTime: "2026-07-24T13:17:00.000Z",
  },
  {
    orderId: "ORD482601",
    studentName: "Priya",
    items: [
      { id: 5, name: "Paneer Butter Masala", price: 90, quantity: 1 },
      { id: 10, name: "Tea", price: 15, quantity: 2 },
      { id: 7, name: "French Fries", price: 50, quantity: 1 },
    ],
    subtotal: 170,
    platformFee: 5,
    totalAmount: 175,
    paymentMethod: "cash",
    paymentStatus: "Pending",
    pickupStatus: "Cancelled",
    placedAt: "2026-07-23T11:40:00.000Z",
    estimatedPickupTime: "2026-07-23T11:55:00.000Z",
  },
  {
    orderId: "ORD482399",
    studentName: "Arjun",
    items: [{ id: 4, name: "Idli Sambar", price: 30, quantity: 3 }],
    subtotal: 90,
    platformFee: 5,
    totalAmount: 95,
    paymentMethod: "netbanking",
    paymentStatus: "Paid",
    pickupStatus: "Delivered",
    placedAt: "2026-07-22T08:20:00.000Z",
    estimatedPickupTime: "2026-07-22T08:35:00.000Z",
  },
];