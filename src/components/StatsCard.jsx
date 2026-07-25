import React from "react";

const StatsCard = ({ icon, label, value }) => {
  return (
    <div className="sd-stat-card">
      <div className="sd-stat-icon">{icon}</div>
      <div className="sd-stat-text">
        <p className="sd-stat-value">{value}</p>
        <p className="sd-stat-label">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;