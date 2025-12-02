import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
import "../../CSSfolder/CommonCSS/login.css";
import "./AdminLogin.css";
import apiClient from "../../services/axios"; // Adjust the import based on your project structure

function Login() {
  const [isAdminlogin, setIsAdminlogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");


   useEffect(() => {
    // Redirect authenticated users to their dashboards
    if (token) {
      if (role === "student") {
        navigate("/student/studentdash");
      } else if (role === "faculty") {
        navigate("/faculty/facultydash");
      } else if (role === "Registrar") {
        navigate("/admin/registrardash");
      } else if (role === "Accountant") {
        navigate("/accountant/accountantdash");
      } else if (role === "Dean") {
        navigate("/dean/deandashboard");
      } else if (role === "Director") {
        navigate("/director/diractordash");
      }
    } 
    // Unauthenticated users can stay on login page or go to home
  }, [token, role, navigate]);

  const handleLogin = async () => {
    try {
      const response = await apiClient.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data);

      // Store user data in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.data.user.role);
      localStorage.setItem("username", response.data.data.user.username);
      localStorage.setItem("userid", response.data.data.user.id);
      localStorage.setItem("email", response.data.data.user.email);
      localStorage.setItem("profileid", response.data.data.profile._id);

      setMessage("Logged in successfully");

      // Redirect based on role
      if (response.data.data.user.role === "student") {
        navigate("/student/studentdash");
      } else if (response.data.data.user.role === "admin") {
        navigate("/admin/registrardash");
      } else if (response.data.data.user.role === "faculty") {
        navigate("/faculty/facultydash");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error logging in");
    }
  };

  // Admin Login Form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const res = await apiClient.post("/api/admin/login", formData, {
          withCredentials: true
        });
        console.log(res.data);
        
        if (res.data) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.admin.role);
          localStorage.setItem("username", res.data.admin.name);
          localStorage.setItem("userid", res.data.admin.id);

          // Redirect admin to their dashboard
          if (res.data.admin.role === "Registrar") {
            navigate("/admin/registrardash");
          } else if (res.data.admin.role === "Accountant") {
            navigate("/accountant/accountantdash");
          } else if (res.data.admin.role === "Dean") {
            navigate("/dean/deandashboard");
          } else if (res.data.admin.role === "Director") {
            navigate("/director/diractordash");
          }
        }
      } catch (error) {
        setMessage(error.response?.data?.message || "Error logging in");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="whole-login-container">
      {/* Home link for unauthenticated users */}

      {!isAdminlogin ? (
        <div className="login">
          <div className="loginsection">
            <div className="leftpart">
              <div className="leftpart-inner">
                <div className="leftpart-header">
                  <div className="lefthead">Welcome to Acadmigo</div>
                </div>
                <div className="leftpart-content">
                  <p className="leftpara">Don't have an account</p>
                </div>
                <div className="leftpart-button">
                  <Link to="/register" className="butn">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
            <div className="login-inner">
              <div className="login-header">Login as Student or Faculty</div>
              <div className="login-form">
                <input
                  type="text"
                  className="studentlogin-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="studentlogin-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button className="btn" onClick={handleLogin}>
                  Login
                </button>
              </div>
              <div className="auth-footer">
                <p className="auth-switch-text">Login as Admin</p>
                <button
                  className="switch-button"
                  onClick={() => setIsAdminlogin(true)}
                >
                  Admin Login
                </button>
              </div>
            </div>
          </div>
          {message && <p className="message">{message}</p>}
        </div>
      ) : (
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-card-inner">
              <div className="auth-form login-form active">
                <div className="auth-header">
                  <h2 className="auth-title">Login as Admin</h2>
                  <p className="auth-subtitle">
                    Login to continue your journey
                  </p>
                </div>

                <form className="admin-form-container-box" onSubmit={handleSubmit}>
                  <div className="adminlogin-form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="Email Address"
                      onChange={handleChange}
                      className={`adminlogin-form-input ${errors.email ? "error" : ""}`}
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>

                  <div className="adminlogin-form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`adminlogin-form-input ${errors.password ? "error" : ""}`}
                    />
                    {errors.password && (
                      <span className="error-message">{errors.password}</span>
                    )}
                  </div>

                  <div className="form-options">
                    <label className="remember-me">
                      <input type="checkbox" />
                      <span>Remember me</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="auth-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <span className="spinner"></span> : "Login"}
                  </button>
                </form>

                <div className="auth-footer">
                  <p className="auth-switch-text">
                    Login as Student or Faculty
                  </p>
                  <button
                    className="switch-button"
                    onClick={() => setIsAdminlogin(false)}
                  >
                    Student or Faculty Login
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
            <div className="welcome-message">
              <h2>Admin Welcome Back on Acadmigo</h2>
              <p>We missed you. Login to access your account.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;