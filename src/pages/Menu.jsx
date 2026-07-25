import React, { useState, useMemo } from "react";
import { FaSearch, FaShoppingCart, FaPlus } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { categories, menuItems } from "../data/mockData";

const Menu = () => {
  const { addToCart } = useAppContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [toastMsg, setToastMsg] = useState("");

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setToastMsg(`${item.name} added to cart!`);
    setTimeout(() => setToastMsg(""), 2000);
  };

  return (
    <div className="menu-page">
      {/* ===== Header ===== */}
      <div className="menu-header">
        <h1>Explore Our Menu</h1>
        <p>Fresh food, made to order — pick your favorites and skip the line.</p>
      </div>

      {toastMsg && (
        <div className="menu-toast">
          <FaShoppingCart /> {toastMsg}
        </div>
      )}

      {/* ===== Search Bar ===== */}
      <div className="menu-search-wrapper">
        <FaSearch className="menu-search-icon" />
        <input
          type="text"
          placeholder="Search for dosa, coffee, rice..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="menu-search-input"
          aria-label="Search menu items"
        />
      </div>

      {/* ===== Category Filters ===== */}
      <div className="menu-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`menu-category-btn ${
              activeCategory === cat ? "menu-category-active" : ""
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ===== Food Grid ===== */}
      {filteredItems.length > 0 ? (
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`menu-food-card ${
                !item.available ? "menu-food-card-disabled" : ""
              }`}
            >
              <div className="menu-food-image-placeholder">
                <span>{item.name.charAt(0)}</span>
              </div>

              <div className="menu-food-body">
                <div className="menu-food-top-row">
                  <h3 className="menu-food-name">{item.name}</h3>
                  <span className="menu-food-category-tag">
                    {item.category}
                  </span>
                </div>

                <p className="menu-food-desc">{item.description}</p>

                <div className="menu-food-bottom-row">
                  <span className="menu-food-price">₹{item.price}</span>
                  <span
                    className={`menu-availability-badge ${
                      item.available
                        ? "menu-badge-available"
                        : "menu-badge-unavailable"
                    }`}
                  >
                    {item.available ? "Available" : "Out of Stock"}
                  </span>
                </div>

                <button
                  className="btn btn-primary full-width menu-add-btn"
                  disabled={!item.available}
                  onClick={() => handleAddToCart(item)}
                >
                  <FaPlus /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="menu-empty-state">
          <p>No items match your search.</p>
        </div>
      )}
    </div>
  );
};

export default Menu;