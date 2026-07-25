import React from "react";

/**
 * Small stat tile used inside the Profile page's statistics grid.
 * Deliberately separate from the dashboard `StatsCard` component —
 * this one is visually simpler (no hover-lift) to sit calmly inside
 * a profile layout rather than a dashboard.
 */
const ProfileStatsCard = ({ icon, label, value }) => {
  return (
    <div className="profile-stat-card">
      <div className="profile-stat-icon">{icon}</div>
      <div>
        <p className="profile-stat-value">{value}</p>
        <p className="profile-stat-label">{label}</p>
      </div>
    </div>
  );
};

export default ProfileStatsCard;