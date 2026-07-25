import React, { useState, useMemo } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUtensils,
  FaBoxOpen,
  FaBoxes,
} from "react-icons/fa";

import MenuItemFormModal from "../components/MenuItemFormModal";
import { menuItems as initialMenuItems, categories } from "../data/mockData";

const MenuManagement = () => {
  // Local state seeded from mock data — all CRUD operations happen
  // in-memory only, per the "no backend integration" requirement.
  const [items, setItems] = useState(initialMenuItems);

  // Modal state: null = closed, {} = "add" mode, {...item} = "edit" mode
  const [modalItem, setModalItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Delete confirmation state
  const [itemToDelete, setItemToDelete] = useState(null);

  // Toast feedback for CRUD actions
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (message) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(""), 2200);
  };

  /* ---------------- Derived Summary ---------------- */
  const availableCount = useMemo(
    () => items.filter((i) => i.available).length,
    [items]
  );
  const unavailableCount = items.length - availableCount;

  /* ---------------- CRUD Handlers ---------------- */

  // Generates a new unique id (mock-data-friendly, no backend needed)
  const generateId = () =>
    items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;

  const handleAddItem = (newItemData) => {
    const newItem = {
      id: generateId(),
      description: "", // kept for shape-compatibility with Menu.jsx cards
      ...newItemData,
    };
    setItems((prev) => [...prev, newItem]);
    setIsAdding(false);
    showToast(`"${newItem.name}" added to the menu.`);
  };

  const handleEditItem = (updatedData) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === modalItem.id ? { ...item, ...updatedData } : item
      )
    );
    showToast(`"${updatedData.name}" updated successfully.`);
    setModalItem(null);
  };

  const handleToggleAvailability = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, available: !item.available };
        showToast(
          `${updated.name} marked as ${
            updated.available ? "Available" : "Unavailable"
          }.`
        );
        return updated;
      })
    );
  };

  const confirmDelete = () => {
    setItems((prev) => prev.filter((item) => item.id !== itemToDelete.id));
    showToast(`"${itemToDelete.name}" removed from the menu.`);
    setItemToDelete(null);
  };

  return (
    <div className="mm-page">
      {/* ===== Header ===== */}
      <div className="mm-header">
        <div>
          <h1>Menu Management</h1>
          <p>Add, edit, and manage canteen menu items in real time.</p>
        </div>
        <button
          className="btn btn-primary mm-add-btn"
          onClick={() => setIsAdding(true)}
        >
          <FaPlus /> Add New Item
        </button>
      </div>

      {toastMsg && <div className="mm-toast">{toastMsg}</div>}

      {/* ===== Summary Cards ===== */}
      <div className="mm-summary-grid">
        <div className="mm-summary-card">
          <div className="mm-summary-icon mm-icon-total">
            <FaUtensils />
          </div>
          <div>
            <p className="mm-summary-value">{items.length}</p>
            <p className="mm-summary-label">Total Menu Items</p>
          </div>
        </div>

        <div className="mm-summary-card">
          <div className="mm-summary-icon mm-icon-available">
            <FaBoxOpen />
          </div>
          <div>
            <p className="mm-summary-value">{availableCount}</p>
            <p className="mm-summary-label">Available Items</p>
          </div>
        </div>

        <div className="mm-summary-card">
          <div className="mm-summary-icon mm-icon-unavailable">
            <FaBoxes />
          </div>
          <div>
            <p className="mm-summary-value">{unavailableCount}</p>
            <p className="mm-summary-label">Unavailable Items</p>
          </div>
        </div>
      </div>

      {/* ===== Menu Table ===== */}
      <div className="mm-table-wrapper">
        <table className="mm-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Availability</th>
              <th className="mm-actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="mm-name-cell">{item.name}</td>
                  <td>
                    <span className="mm-category-tag">{item.category}</span>
                  </td>
                  <td className="mm-price-cell">₹{item.price}</td>
                  <td>
                    <button
                      className={`mm-toggle-btn ${
                        item.available
                          ? "mm-toggle-available"
                          : "mm-toggle-unavailable"
                      }`}
                      onClick={() => handleToggleAvailability(item.id)}
                      aria-pressed={item.available}
                    >
                      <span className="mm-toggle-track">
                        <span className="mm-toggle-thumb"></span>
                      </span>
                      {item.available ? "Available" : "Unavailable"}
                    </button>
                  </td>
                  <td>
                    <div className="mm-action-buttons">
                      <button
                        className="mm-icon-btn mm-edit-btn"
                        onClick={() => setModalItem(item)}
                        aria-label={`Edit ${item.name}`}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="mm-icon-btn mm-delete-btn"
                        onClick={() => setItemToDelete(item)}
                        aria-label={`Delete ${item.name}`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="mm-empty-row">
                  No menu items yet. Click "Add New Item" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Add Item Modal ===== */}
      {isAdding && (
        <MenuItemFormModal
          categoryOptions={categories}
          onSave={handleAddItem}
          onClose={() => setIsAdding(false)}
        />
      )}

      {/* ===== Edit Item Modal ===== */}
      {modalItem && (
        <MenuItemFormModal
          initialData={modalItem}
          categoryOptions={categories}
          onSave={handleEditItem}
          onClose={() => setModalItem(null)}
        />
      )}

      {/* ===== Delete Confirmation Modal ===== */}
      {itemToDelete && (
        <div
          className="mm-modal-overlay"
          onClick={() => setItemToDelete(null)}
        >
          <div
            className="mm-modal-card mm-confirm-card"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
          >
            <h3>Remove Menu Item?</h3>
            <p>
              Are you sure you want to remove{" "}
              <strong>"{itemToDelete.name}"</strong> from the menu? This
              action cannot be undone.
            </p>
            <div className="mm-modal-actions">
              <button
                className="btn btn-ghost"
                onClick={() => setItemToDelete(null)}
              >
                Cancel
              </button>
              <button className="mm-delete-confirm-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;