import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaIdCard,
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUtensils,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaCheckCircle,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    department: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const roles = [
    { value: "student", label: "Student", icon: <FaGraduationCap /> },
    { value: "faculty", label: "Faculty", icon: <FaChalkboardTeacher /> },
  ];

  // Redirect to login shortly after showing success message
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll Number / Faculty ID is required";
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Prevent duplicate emails
        const emailExists = users.some(
          (u) => u.email.toLowerCase() === formData.email.toLowerCase()
        );

        if (emailExists) {
          setErrors((prev) => ({
            ...prev,
            email: "An account with this email already exists",
          }));
          setLoading(false);
          return;
        }

        const newUser = {
          id: Date.now(),
          name: formData.name.trim(),
          rollNumber: formData.rollNumber.trim(),
          department: formData.department.trim(),
          email: formData.email.trim(),
          password: formData.password,
          role: formData.role,
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        setLoading(false);
        setShowSuccess(true);
      } catch (error) {
        console.error("Registration error:", error);
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="auth-page">
      <div className="register-container">
        {showSuccess ? (
          <div className="success-state">
            <FaCheckCircle className="success-icon" />
            <h2>Registration Successful!</h2>
            <p>Redirecting you to login...</p>
          </div>
        ) : (
          <>
            <div className="register-header">
              <div className="register-avatar">
                <FaUser />
              </div>
              <div className="auth-brand register-brand">
                <FaUtensils className="auth-brand-icon" />
                <span>Ctrl+Alt+Eat</span>
              </div>
              <h2 className="auth-title">Create your account</h2>
              <p className="auth-subtitle">
                Join your campus canteen and skip the queue
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* ===== Personal Information ===== */}
              <p className="form-section-label">Personal Information</p>

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className={`input-wrapper ${errors.name ? "input-error" : ""}`}>
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                  />
                </div>
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rollNumber">Roll Number / Faculty ID</label>
                  <div
                    className={`input-wrapper ${
                      errors.rollNumber ? "input-error" : ""
                    }`}
                  >
                    <FaIdCard className="input-icon" />
                    <input
                      type="text"
                      id="rollNumber"
                      name="rollNumber"
                      placeholder="e.g. CS21B045"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      aria-invalid={!!errors.rollNumber}
                    />
                  </div>
                  {errors.rollNumber && (
                    <span className="field-error">{errors.rollNumber}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <div
                    className={`input-wrapper ${
                      errors.department ? "input-error" : ""
                    }`}
                  >
                    <FaBuilding className="input-icon" />
                    <input
                      type="text"
                      id="department"
                      name="department"
                      placeholder="e.g. Computer Science"
                      value={formData.department}
                      onChange={handleChange}
                      aria-invalid={!!errors.department}
                    />
                  </div>
                  {errors.department && (
                    <span className="field-error">{errors.department}</span>
                  )}
                </div>
              </div>

              {/* ===== Account Information ===== */}
              <p className="form-section-label">Account Information</p>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className={`input-wrapper ${errors.email ? "input-error" : ""}`}>
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@college.edu"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                  />
                </div>
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-row">
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
                      placeholder="Min. 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      aria-invalid={!!errors.password}
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
                    <span className="field-error">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div
                    className={`input-wrapper ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                  >
                    <FaLock className="input-icon" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      aria-invalid={!!errors.confirmPassword}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="field-error">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>

              {/* ===== Role Selection ===== */}
              <div className="form-group">
                <label>I am a</label>
                <div className="role-grid role-grid-2">
                  {roles.map((r) => (
                    <button
                      type="button"
                      key={r.value}
                      className={`role-option ${
                        formData.role === r.value ? "role-selected" : ""
                      }`}
                      onClick={() => handleRoleSelect(r.value)}
                      aria-pressed={formData.role === r.value}
                    >
                      <span className="role-icon">{r.icon}</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary full-width auth-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-spinner" aria-hidden="true"></span>
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <p className="auth-switch-text">
              Already have an account?{" "}
              <Link to="/login" className="auth-switch-link">
                Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;