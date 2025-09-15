// import React, { useState } from 'react';
// import './AdminLogin.css';

// const AdminLogin = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     if (!isLogin) {
//       if (!formData.name) newErrors.name = 'Name is required';
//       if (formData.password !== formData.confirmPassword)
//         newErrors.confirmPassword = 'Passwords do not match';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       console.log('Form submitted:', formData);
//       // Here you would typically call your authentication API
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className={`auth-card ${isLogin ? '' : 'flipped'}`}>
//         <div className="auth-card-inner">
//           {/* Login Form */}
//           <div className={`auth-form login-form ${isLogin ? 'active' : ''}`}>
//             <h2 className="auth-title">Welcome Back</h2>
//             <p className="auth-subtitle">Login to your account</p>

//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email"
//                   className={`form-input ${errors.email ? 'error' : ''}`}
//                 />
//                 {errors.email && <span className="error-message">{errors.email}</span>}
//               </div>

//               <div className="form-group">
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Password"
//                   className={`form-input ${errors.password ? 'error' : ''}`}
//                 />
//                 {errors.password && <span className="error-message">{errors.password}</span>}
//               </div>

//               <button type="submit" className="auth-button">Login</button>
//             </form>

//             <p className="auth-switch">
//               Don't have an account?
//               <button onClick={() => setIsLogin(false)} className="switch-button">Sign Up</button>
//             </p>
//           </div>

//           {/* Register Form */}
//           <div className={`auth-form register-form ${!isLogin ? 'active' : ''}`}>
//             <h2 className="auth-title">Create Account</h2>
//             <p className="auth-subtitle">Join us today</p>

//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Full Name"
//                   className={`form-input ${errors.name ? 'error' : ''}`}
//                 />
//                 {errors.name && <span className="error-message">{errors.name}</span>}
//               </div>

//               <div className="form-group">
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email"
//                   className={`form-input ${errors.email ? 'error' : ''}`}
//                 />
//                 {errors.email && <span className="error-message">{errors.email}</span>}
//               </div>

//               <div className="form-group">
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Password"
//                   className={`form-input ${errors.password ? 'error' : ''}`}
//                 />
//                 {errors.password && <span className="error-message">{errors.password}</span>}
//               </div>

//               <div className="form-group">
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Confirm Password"
//                   className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
//                 />
//                 {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
//               </div>

//               <button type="submit" className="auth-button">Register</button>
//             </form>

//             <p className="auth-switch">
//               Already have an account?
//               <button onClick={() => setIsLogin(true)} className="switch-button">Login</button>
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="auth-decoration">
//         <div className="decoration-circle circle-1"></div>
//         <div className="decoration-circle circle-2"></div>
//         <div className="decoration-circle circle-3"></div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState } from "react";
import {Link} from 'react-router-dom';
// import './App.css';
import "./AdminLogin.css";

const AdminLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
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

    if (!isLogin) {
      if (!formData.name) newErrors.name = "Name is required";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);
      setIsSubmitting(false);

      // Reset form after successful registration
      if (!isLogin) {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setIsLogin(true);
      }
    }
  };

  return (
    <div className="authcontainer-login-admin">
      <div className="auth-container">
        <div className={`auth-card ${isLogin ? "" : "flipped"}`}>
          <div className="auth-card-inner">
            {/* Login Form */}
            <div className={`auth-form login-form ${isLogin ? "active" : ""}`}>
              <div className="auth-header">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Login to continue your journey</p>
              </div>

              <form
                className="admin-form-container-box"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="login-email" className="admin-form-label">
                    Email Address
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{width: "100%"}}
                    className={`form-input ${errors.email ? "error" : ""}`}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="login-password" className="admin-form-label">
                    Password
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? "error" : ""}`}
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
                  <Link to="/admin/forgot-password" className="forgot-password">
                    Forgot password?
                  </Link>
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
                <p className="auth-switch-text">Don't have an account?</p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="switch-button"
                  disabled={isSubmitting}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Register Form */}
            <div
              className={`auth-form register-form ${!isLogin ? "active" : ""}`}
            >
              <div className="auth-header">
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join our community today</p>
              </div>

              <form
                className="admin-form-container-box"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="register-name" className="admin-form-label">
                    Full Name
                  </label>
                  <input
                    id="register-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? "error" : ""}`}
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="register-email" className="admin-form-label">
                    Email Address
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? "error" : ""}`}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label
                    htmlFor="register-password"
                    className="admin-form-label"
                  >
                    Password
                  </label>
                  <input
                    id="register-password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? "error" : ""}`}
                  />
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label
                    htmlFor="register-confirm-password"
                    className="admin-form-label"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="register-confirm-password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.confirmPassword ? "error" : ""
                    }`}
                  />
                  {errors.confirmPassword && (
                    <span className="error-message">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="auth-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="spinner"></span>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>

              <div className="auth-footer">
                <p className="auth-switch-text">Already have an account?</p>
                <button
                  onClick={() => setIsLogin(true)}
                  className="switch-button"
                  disabled={isSubmitting}
                >
                  Login
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
            <h2>{isLogin ? "Welcome Back!" : "Join Us!"}</h2>
            <p>
              {isLogin
                ? "We missed you. Login to access your account."
                : "Create an account to get started."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
