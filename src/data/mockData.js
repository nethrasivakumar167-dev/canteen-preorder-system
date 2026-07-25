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