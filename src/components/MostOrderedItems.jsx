import React from "react";

/**
 * Displays a ranked list of the most-ordered menu items with a
 * proportional progress bar (relative to the top item's order count).
 * Purely presentational — takes data as a prop so it can be reused
 * anywhere (Admin Dashboard now, Staff/Reports later).
 */
const MostOrderedItems = ({ items }) => {
  const maxOrders = items.length > 0 ? items[0].orders : 1;

  return (
    <div className="ad-most-ordered-card">
      {items.map((item, idx) => (
        <div className="ad-most-ordered-row" key={item.id}>
          <div className="ad-most-ordered-rank">#{idx + 1}</div>

          <div className="ad-most-ordered-info">
            <div className="ad-most-ordered-top">
              <span className="ad-most-ordered-name">{item.name}</span>
              <span className="ad-most-ordered-count">
                {item.orders} orders
              </span>
            </div>

            <div className="ad-progress-track">
              <div
                className="ad-progress-fill"
                style={{ width: `${(item.orders / maxOrders) * 100}%` }}
              />
            </div>
          </div>

          <div className="ad-most-ordered-revenue">₹{item.revenue}</div>
        </div>
      ))}
    </div>
  );
};

export default MostOrderedItems;