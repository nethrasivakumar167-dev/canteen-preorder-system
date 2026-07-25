import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClock,
  FaBolt,
  FaMapMarkerAlt,
  FaWallet,
  FaSearch,
  FaShoppingCart,
  FaUtensils,
  FaArrowRight,
  FaStar,
  FaPlus,
} from "react-icons/fa";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    try {
      return !!JSON.parse(localStorage.getItem("currentUser"));
    } catch {
      return false;
    }
  };

  const handleOrderNow = () => {
    navigate(isLoggedIn() ? "/menu" : "/login");
  };

  /* ---------------- Static Data ---------------- */
  const features = [
    {
      icon: <FaClock />,
      title: "Pre-Order Food",
      desc: "Order your meal in advance and skip the rush during break hours.",
    },
    {
      icon: <FaBolt />,
      title: "Fast Collection",
      desc: "Your food is ready by the time you arrive — no waiting in line.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Live Order Tracking",
      desc: "Track your order status in real time from kitchen to counter.",
    },
    {
      icon: <FaWallet />,
      title: "Cashless Payments",
      desc: "Pay securely online with wallet, card, or UPI — no cash needed.",
    },
  ];

  const steps = [
    {
      icon: <FaSearch />,
      title: "Browse Menu",
      desc: "Explore breakfast, lunch, snacks, and drinks available today.",
    },
    {
      icon: <FaShoppingCart />,
      title: "Place Order",
      desc: "Add items to cart, choose a time slot, and pay online.",
    },
    {
      icon: <FaUtensils />,
      title: "Collect Food",
      desc: "Walk in at your slot and pick up your freshly prepared order.",
    },
  ];

  const popularFoods = [
    {
      name: "Veg Sandwich",
      price: 60,
      category: "Snacks",
      img: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&q=80",
    },
    {
      name: "Paneer Roll",
      price: 90,
      category: "Lunch",
      img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80",
    },
    {
      name: "Burger",
      price: 120,
      category: "Snacks",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    },
    {
      name: "Tea",
      price: 15,
      category: "Beverages",
      img: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&q=80",
    },
    {
      name: "Coffee",
      price: 25,
      category: "Beverages",
      img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
    },
    {
      name: "French Fries",
      price: 70,
      category: "Snacks",
      img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80",
    },
  ];

  const stats = [
    { label: "Students", value: "500+" },
    { label: "Menu Items", value: "50+" },
    { label: "Orders Served", value: "1000+" },
  ];

  const testimonials = [
    {
      name: "Ananya Sharma",
      role: "3rd Year, CSE",
      quote:
        "I used to lose 20 minutes every break just standing in line. Now I order ahead and just walk in and collect.",
      rating: 5,
    },
    {
      name: "Rohan Mehta",
      role: "Faculty, Physics Dept.",
      quote:
        "Cashless payments and live tracking make this so convenient between back-to-back lectures.",
      rating: 5,
    },
    {
      name: "Priya Nair",
      role: "2nd Year, ECE",
      quote:
        "Ctrl+Alt+Eat is genuinely a lifesaver during the lunch rush. The interface is super simple too.",
      rating: 4,
    },
  ];

  /* ---------------- Render ---------------- */
  return (
    <div className="landing-page">
      {/* ================= HERO ================= */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">🍽️ Ctrl+Alt+Eat</span>
          <h1 className="hero-heading">
            Skip the Queue, <span className="highlight">Order Ahead</span>
          </h1>
          <p className="hero-desc">
            Pre-order your favorite meals from the college canteen and avoid
            long waiting lines during break hours. Order in seconds, collect
            in minutes.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleOrderNow}>
              Order Now <FaArrowRight />
            </button>
            <button className="btn btn-outline" onClick={() => navigate("/menu")}>
              Browse Menu
            </button>
            <button className="btn btn-ghost" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80"
            alt="Students ordering food at a canteen counter"
            className="hero-image"
          />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features-section">
        <h2 className="section-heading">Why Choose Us</h2>
        <p className="section-subheading">
          Everything you need for a faster, smoother canteen experience.
        </p>

        <div className="features-grid">
          {features.map((feature, idx) => (
            <div className="feature-card" key={idx}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="how-it-works-section">
        <h2 className="section-heading">How It Works</h2>
        <p className="section-subheading">Order in three simple steps</p>

        <div className="steps-container">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="step-card">
                <div className="step-number">{idx + 1}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="step-arrow" aria-hidden="true">
                  <FaArrowRight />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ================= POPULAR FOODS ================= */}
      <section className="popular-foods-section">
        <h2 className="section-heading">Popular Foods</h2>
        <p className="section-subheading">
          Handpicked favorites from our canteen menu
        </p>

        <div className="food-grid">
          {popularFoods.map((food, idx) => (
            <div className="food-card" key={idx}>
              <div className="food-image-wrapper">
                <img src={food.img} alt={food.name} className="food-image" />
                <span className="food-category-tag">{food.category}</span>
              </div>
              <div className="food-card-body">
                <h4 className="food-name">{food.name}</h4>
                <div className="food-card-footer">
                  <span className="food-price">Rs. {food.price}</span>
                  <button
                    className="btn-add-cart"
                    aria-label={`Add ${food.name} to cart`}
                    onClick={() => navigate("/menu")}
                  >
                    <FaPlus /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-wrapper">
          <button className="btn btn-outline" onClick={() => navigate("/menu")}>
            View Full Menu
          </button>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div className="stat-card" key={idx}>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials-section">
        <h2 className="section-heading">What Students Say</h2>
        <p className="section-subheading">
          Real feedback from our campus community
        </p>

        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div className="testimonial-card" key={idx}>
              <div className="testimonial-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < t.rating ? "star filled" : "star"}
                  />
                ))}
              </div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.name.charAt(0)}</div>
                <div>
                  <p className="author-name">{t.name}</p>
                  <p className="author-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section">
        <h2 className="cta-heading">Ready to Skip the Queue?</h2>
        <p className="cta-desc">
          Join hundreds of students already saving time every day.
        </p>
        <div className="cta-buttons">
          <button className="btn btn-white" onClick={() => navigate("/register")}>
            Register
          </button>
          <button className="btn btn-outline-white" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;