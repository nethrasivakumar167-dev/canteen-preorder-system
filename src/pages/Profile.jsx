import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaIdBadge,
  FaShoppingBag,
  FaHeart,
  FaWallet,
  FaBoxes,
  FaClipboardCheck,
  FaUtensils,
  FaLock,
  FaBell,
  FaMoon,
  FaHistory,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import ProfileStatsCard from "../components/ProfileStatsCard";
import {
  profileMockDataByRole,
  profileStudentStats,
  profileStaffStats,
  profileActivityByRole,
} from "../data/mockData";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profileData, setProfileData] = useState(null);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [toastMsg, setToastMsg] = useState("");

  // Account settings (UI-only toggles)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  /* ---------------- Load user + merge with mock profile data ---------------- */
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (!user) return;

      setCurrentUser(user);

      const roleKey = user.role || "student";
      const mockDetails =
        profileMockDataByRole[roleKey] || profileMockDataByRole.student;

      const mergedProfile = {
        name: user.userId || "User",
        id: mockDetails.id,
        email: mockDetails.email,
        phone: mockDetails.phone,
        avatar: mockDetails.avatar,
        role: roleKey,
      };

      setProfileData(mergedProfile);
      setEditForm({
        name: mergedProfile.name,
        email: mergedProfile.email,
        phone: mergedProfile.phone,
      });
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  }, []);

  if (!profileData) {
    return (
      <div className="profile-page">
        <p className="profile-loading">Loading profile...</p>
      </div>
    );
  }

  const isStudentOrFaculty =
    profileData.role === "student" || profileData.role === "faculty";

  const roleLabel =
    profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1);

  const activityList = isStudentOrFaculty
    ? profileActivityByRole.student
    : profileActivityByRole.staff;

  /* ---------------- Edit Profile Handlers ---------------- */
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateEditForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!editForm.name.trim()) newErrors.name = "Name is required";
    if (!editForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(editForm.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!editForm.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = (message) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(""), 2200);
  };

  const handleSaveChanges = () => {
    if (!validateEditForm()) return;

    setProfileData((prev) => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
    }));

    setIsEditing(false);
    showToast("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      {toastMsg && <div className="profile-toast">{toastMsg}</div>}

      {/* ===== Profile Card ===== */}
      <div className="profile-card">
        <div className="profile-avatar-wrapper">
          {profileData.avatar ? (
            <img
              src={profileData.avatar}
              alt={`${profileData.name}'s avatar`}
              className="profile-avatar-img"
            />
          ) : (
            <FaUserCircle className="profile-avatar-fallback" />
          )}
        </div>

        <div className="profile-card-info">
          <h1 className="profile-name">{profileData.name}</h1>
          <span className={`profile-role-badge profile-role-${profileData.role}`}>
            {roleLabel}
          </span>

          <div className="profile-contact-row">
            <span>
              <FaIdBadge /> {profileData.id}
            </span>
            <span>
              <FaEnvelope /> {profileData.email}
            </span>
            <span>
              <FaPhone /> {profileData.phone}
            </span>
          </div>
        </div>

        {!isEditing && (
          <button
            className="btn btn-primary profile-edit-btn"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit /> Edit Profile
          </button>
        )}
      </div>

      {/* ===== Statistics Section ===== */}
      <section className="profile-section">
        <h2 className="profile-section-title">
          {isStudentOrFaculty ? "Your Activity" : "Management Overview"}
        </h2>

        <div className="profile-stats-grid">
          {isStudentOrFaculty ? (
            <>
              <ProfileStatsCard
                icon={<FaShoppingBag />}
                label="Total Orders"
                value={profileStudentStats.totalOrders}
              />
              <ProfileStatsCard
                icon={<FaHeart />}
                label="Favorite Items"
                value={profileStudentStats.favoriteItems}
              />
              <ProfileStatsCard
                icon={<FaWallet />}
                label="Total Amount Spent"
                value={`₹${profileStudentStats.totalSpent}`}
              />
            </>
          ) : (
            <>
              <ProfileStatsCard
                icon={<FaBoxes />}
                label="Managed Items"
                value={profileStaffStats.managedItems}
              />
              <ProfileStatsCard
                icon={<FaClipboardCheck />}
                label="Orders Processed"
                value={profileStaffStats.ordersProcessed}
              />
              <ProfileStatsCard
                icon={<FaUtensils />}
                label="Active Menu Items"
                value={profileStaffStats.activeMenuItems}
              />
            </>
          )}
        </div>
      </section>

      {/* ===== Personal Information (View / Edit) ===== */}
      <section className="profile-section">
        <h2 className="profile-section-title">Personal Information</h2>

        <div className="profile-info-card">
          {isEditing ? (
            <div className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div
                  className={`input-wrapper ${errors.name ? "input-error" : ""}`}
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                  />
                </div>
                {errors.name && (
                  <span className="field-error">{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div
                  className={`input-wrapper ${errors.email ? "input-error" : ""}`}
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                  />
                </div>
                {errors.email && (
                  <span className="field-error">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <div
                  className={`input-wrapper ${errors.phone ? "input-error" : ""}`}
                >
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditChange}
                  />
                </div>
                {errors.phone && (
                  <span className="field-error">{errors.phone}</span>
                )}
              </div>

              <div className="profile-edit-actions">
                <button
                  className="btn btn-ghost"
                  onClick={handleCancelEdit}
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSaveChanges}
                >
                  <FaSave /> Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-info-view">
              <div className="profile-info-row">
                <span className="profile-info-label">Full Name</span>
                <span className="profile-info-value">{profileData.name}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">User ID</span>
                <span className="profile-info-value">{profileData.id}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Email</span>
                <span className="profile-info-value">{profileData.email}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Phone Number</span>
                <span className="profile-info-value">{profileData.phone}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Role</span>
                <span className="profile-info-value">{roleLabel}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== Account Settings ===== */}
      <section className="profile-section">
        <h2 className="profile-section-title">Account Settings</h2>

        <div className="profile-settings-card">
          <div className="profile-settings-row">
            <div>
              <p className="profile-settings-title">Password</p>
              <p className="profile-settings-desc">
                Change your account password
              </p>
            </div>
            <button
              className="btn btn-outline"
              onClick={() =>
                showToast("Password change is not available in this demo.")
              }
            >
              <FaLock /> Change Password
            </button>
          </div>

          <div className="profile-settings-divider"></div>

          <div className="profile-settings-row">
            <div>
              <p className="profile-settings-title">Notifications</p>
              <p className="profile-settings-desc">
                Receive order and menu update alerts
              </p>
            </div>
            <button
              className={`profile-switch ${
                notificationsEnabled ? "profile-switch-on" : ""
              }`}
              onClick={() => setNotificationsEnabled((prev) => !prev)}
              aria-pressed={notificationsEnabled}
              aria-label="Toggle notifications"
            >
              <FaBell className="profile-switch-icon" />
              <span className="profile-switch-track">
                <span className="profile-switch-thumb"></span>
              </span>
            </button>
          </div>

          <div className="profile-settings-divider"></div>

          <div className="profile-settings-row">
            <div>
              <p className="profile-settings-title">Dark Mode</p>
              <p className="profile-settings-desc">
                Switch to a darker color theme
              </p>
            </div>
            <button
              className={`profile-switch ${
                darkModeEnabled ? "profile-switch-on" : ""
              }`}
              onClick={() => setDarkModeEnabled((prev) => !prev)}
              aria-pressed={darkModeEnabled}
              aria-label="Toggle dark mode"
            >
              <FaMoon className="profile-switch-icon" />
              <span className="profile-switch-track">
                <span className="profile-switch-thumb"></span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ===== Recent Activity ===== */}
      <section className="profile-section">
        <h2 className="profile-section-title">
          <FaHistory className="profile-activity-title-icon" /> Recent
          Activity
        </h2>

        <div className="profile-activity-panel">
          <ul className="profile-timeline">
            {activityList.map((entry, idx) => (
              <li className="profile-timeline-item" key={idx}>
                <span className="profile-timeline-dot"></span>
                <span className="profile-timeline-text">{entry}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Profile;