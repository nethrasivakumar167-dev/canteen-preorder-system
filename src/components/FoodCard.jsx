import React from "react";

const FoodCard = ({ food, onPreOrder }) => {
  const { name, price, available } = food;

  return (
    <div className={`sd-food-card ${!available ? "sd-food-card-disabled" : ""}`}>
      <div className="sd-food-card-header">
        <h4 className="sd-food-name">{name}</h4>
        <span
          className={`sd-availability-badge ${
            available ? "sd-badge-available" : "sd-badge-unavailable"
          }`}
        >
          {available ? "Available" : "Unavailable"}
        </span>
      </div>

      <p className="sd-food-price">₹{price}</p>

      <button
        className="btn btn-primary full-width"
        disabled={!available}
        onClick={() => onPreOrder(food)}
      >
        {available ? "Pre-Order" : "Unavailable"}
      </button>
    </div>
  );
};

export default FoodCard;