import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUtensils,
} from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (successMsg) setSuccessMsg("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userId.trim()) {
      newErrors.userId = "User ID is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getRoleAndPath = (userId) => {
    const id = userId.trim().toLowerCase();

    if (id === "admin") return { role: "admin", path: "/admin" };
    if (id === "staff") return { role: "staff", path: "/staff" };
    return { role: "student", path: "/student" };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate a short auth delay (no backend involved)
    setTimeout(() => {
      const { role, path } = getRoleAndPath(formData.userId);

      const user = {
        id: Date.now(),
        userId: formData.userId.trim(),
        role,
      };

      localStorage.setItem("currentUser", JSON.stringify(user));

      setLoading(false);
      setSuccessMsg(
        `Login successful! Redirecting to your ${role} dashboard...`
      );

      setTimeout(() => {
        navigate(path);
      }, 1000);
    }, 500);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* ===== LEFT SIDE ===== */}
        <div className="auth-visual">
          <div className="auth-visual-overlay">
            <div className="auth-brand">
              <FaUtensils className="auth-brand-icon" />
              <span>Ctrl+Alt+Eat</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80"
              alt="Delicious canteen food spread"
              className="auth-visual-image"
            />
            <h1 className="auth-visual-heading">Welcome Back!</h1>
            <p className="auth-visual-desc">
              Log in to pre-order your favorite meals, skip the queue, and
              collect your food fresh — right on time, every time.
            </p>
          </div>
        </div>

        {/* ===== RIGHT SIDE ===== */}
        <div className="auth-form-side">
          <div className="auth-form-wrapper">
            <h2 className="auth-title">Login to your account</h2>
            <p className="auth-subtitle">
              Enter your credentials to continue
            </p>

            {successMsg && (
              <div className="auth-success-banner">{successMsg}</div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* User ID */}
              <div className="form-group">
                <label htmlFor="userId">User ID</label>
                <div
                  className={`input-wrapper ${errors.userId ? "input-error" : ""}`}
                >
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="userId"
                    name="userId"
                    placeholder="Enter your User ID"
                    value={formData.userId}
                    onChange={handleChange}
                    aria-invalid={!!errors.userId}
                    aria-describedby="userId-error"
                  />
                </div>
                {errors.userId && (
                  <span className="field-error" id="userId-error">
                    {errors.userId}
                  </span>
                )}
                <span className="field-hint">
                  Try "admin", "staff", or any other ID for the student view
                </span>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div
                  className={`input-wrapper ${errors.password ? "input-error" : ""}`}
                >
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className="field-error" id="password-error">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="form-links-row">
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary full-width auth-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-spinner" aria-hidden="true"></span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="auth-switch-text">
              Don't have an account?{" "}
              <Link to="/register" className="auth-switch-link">
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;