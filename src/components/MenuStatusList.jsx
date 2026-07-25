import React from "react";

/**
 * Read-only view of menu availability, for dashboards that need to
 * DISPLAY status without editing it (Admin). Staff still uses its own
 * interactive toggle list in StaffDashboard.jsx.
 */
const MenuStatusList = ({ items }) => {
  return (
    <div className="ad-menu-status-list">
      {items.map((item) => (
        <div className="ad-menu-status-row" key={item.id}>
          <span className="ad-menu-status-name">{item.name}</span>
          <span
            className={`ad-menu-status-badge ${
              item.available
                ? "ad-status-available"
                : "ad-status-unavailable"
            }`}
          >
            {item.available ? "Available" : "Unavailable"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MenuStatusList; 