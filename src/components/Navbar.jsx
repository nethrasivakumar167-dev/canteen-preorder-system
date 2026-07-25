import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUtensils,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount } = useAppContext();

  const [currentUser, setCurrentUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      setCurrentUser(user);
    } catch (error) {
      console.error("Error parsing currentUser:", error);
      setCurrentUser(null);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change / resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate("/");
  };

  const closeMobileMenu = () => setMobileOpen(false);

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const renderRoleLinks = () => {
    if (!currentUser) {
      return (
        <>
          <li>
            <NavLink to="/" className={navLinkClass} onClick={closeMobileMenu} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" className={navLinkClass} onClick={closeMobileMenu}>
              Menu
            </NavLink>
          </li>
        </>
      );
    }

    switch (currentUser.role) {
      case "student":
      case "faculty":
        return (
          <>
            <li>
              <NavLink to="/menu" className={navLinkClass} onClick={closeMobileMenu}>
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className={navLinkClass} onClick={closeMobileMenu}>
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" className={navLinkClass} onClick={closeMobileMenu}>
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={navLinkClass} onClick={closeMobileMenu}>
                Profile
              </NavLink>
            </li>
          </>
        );
      case "staff":
        return (
          <li>
            <NavLink to="/staff" className={navLinkClass} onClick={closeMobileMenu}>
              Dashboard
            </NavLink>
          </li>
        );
      case "admin":
        return (
          <li>
            <NavLink to="/admin" className={navLinkClass} onClick={closeMobileMenu}>
              Dashboard
            </NavLink>
          </li>
        );
      default:
        return null;
    }
  };

  return (
    <header className="navbar-container">
      <nav className="navbar" aria-label="Main navigation">
        {/* Brand */}
        <NavLink to="/" className="navbar-brand" aria-label="Smart Canteen Home">
          <FaUtensils className="brand-icon" aria-hidden="true" />
          <span className="brand-name">Smart Canteen</span>
        </NavLink>

        {/* Desktop Nav Links */}
        <ul className="nav-links desktop-only">{renderRoleLinks()}</ul>

        {/* Right side: Auth area (desktop) */}
        <div className="navbar-right desktop-only">
          {!currentUser ? (
            <div className="guest-actions">
              <NavLink to="/login" className="btn btn-outline">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary">
                Register
              </NavLink>
            </div>
          ) : (
            <div className="user-menu" ref={dropdownRef}>
              <button
                className="user-menu-trigger"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-label="Open user menu"
              >
                <FaUserCircle className="avatar-icon" aria-hidden="true" />
                <span className="user-info">
                  <span className="user-name">{currentUser.name || "User"}</span>
                  <span className={`role-badge role-${currentUser.role}`}>
                    {currentUser.role}
                  </span>
                </span>
                <FaChevronDown
                  className={`chevron ${dropdownOpen ? "rotated" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {dropdownOpen && (
                <ul className="dropdown-menu" role="menu">
                  <li role="none">
                    <NavLink
                      to="/profile"
                      className="dropdown-item"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaUser aria-hidden="true" /> Profile
                    </NavLink>
                  </li>
                  <li role="none">
                    <button
                      className="dropdown-item logout-btn"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt aria-hidden="true" /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="hamburger mobile-only"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Slide-down Menu */}
      <div
        ref={mobileMenuRef}
        className={`mobile-menu ${mobileOpen ? "open" : ""}`}
      >
        <ul className="mobile-nav-links">{renderRoleLinks()}</ul>

        <div className="mobile-auth-section">
          {!currentUser ? (
            <div className="guest-actions mobile">
              <NavLink
                to="/login"
                className="btn btn-outline"
                onClick={closeMobileMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-primary"
                onClick={closeMobileMenu}
              >
                Register
              </NavLink>
            </div>
          ) : (
            <div className="mobile-user-info">
              <div className="mobile-user-header">
                <FaUserCircle className="avatar-icon" aria-hidden="true" />
                <div>
                  <span className="user-name">{currentUser.name || "User"}</span>
                  <span className={`role-badge role-${currentUser.role}`}>
                    {currentUser.role}
                  </span>
                </div>
              </div>
              <button className="btn btn-outline full-width" onClick={handleLogout}>
                <FaSignOutAlt aria-hidden="true" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;