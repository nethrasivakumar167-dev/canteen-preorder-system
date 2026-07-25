import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

/**
 * Reusable modal form for both "Add Item" and "Edit Item" flows.
 * If `initialData` is provided, the form pre-fills for editing;
 * otherwise it renders blank for adding a new item.
 */
const MenuItemFormModal = ({ initialData, categoryOptions, onSave, onClose }) => {
  const isEditMode = Boolean(initialData);

  const [formData, setFormData] = useState({
    name: "",
    category: categoryOptions[0] || "Breakfast",
    price: "",
    available: true,
  });

  const [errors, setErrors] = useState({});

  // Pre-fill form when editing an existing item
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        category: initialData.category,
        price: initialData.price,
        available: initialData.available,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Food name is required";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid price greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSave({
      ...formData,
      price: Number(formData.price),
    });
  };

  return (
    <div className="mm-modal-overlay" onClick={onClose}>
      <div
        className="mm-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mm-modal-title"
      >
        <div className="mm-modal-header">
          <h3 id="mm-modal-title">
            {isEditMode ? "Edit Menu Item" : "Add New Menu Item"}
          </h3>
          <button
            className="mm-modal-close"
            onClick={onClose}
            aria-label="Close form"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Food Name */}
          <div className="form-group">
            <label htmlFor="name">Food Name</label>
            <div className={`input-wrapper ${errors.name ? "input-error" : ""}`}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Masala Dosa"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
              />
            </div>
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <div className="input-wrapper">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mm-select"
              >
                {categoryOptions
                  .filter((cat) => cat !== "All")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="form-group">
            <label htmlFor="price">Price (₹)</label>
            <div className={`input-wrapper ${errors.price ? "input-error" : ""}`}>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="e.g. 40"
                min="1"
                value={formData.price}
                onChange={handleChange}
                aria-invalid={!!errors.price}
              />
            </div>
            {errors.price && <span className="field-error">{errors.price}</span>}
          </div>

          {/* Availability */}
          <div className="form-group">
            <label>Availability</label>
            <div className="mm-availability-toggle-group">
              <button
                type="button"
                className={`mm-availability-option ${
                  formData.available ? "mm-availability-selected-available" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, available: true }))
                }
              >
                Available
              </button>
              <button
                type="button"
                className={`mm-availability-option ${
                  !formData.available
                    ? "mm-availability-selected-unavailable"
                    : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, available: false }))
                }
              >
                Unavailable
              </button>
            </div>
          </div>

          <div className="mm-modal-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditMode ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemFormModal;