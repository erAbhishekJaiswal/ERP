import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
// import { Link } from 'react-router-dom';
import "../../CSSfolder/CommonCSS/register.css";
import apiClient from "../../services/axios";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");

  // Check if the user is already authenticated by checking for a token in local storage
  const isAuthenticated = localStorage.getItem("token");

  // Get the navigate function from the useNavigate hook
  const navigate = useNavigate();

  // Use the useEffect hook to perform a side effect when the component mounts
  useEffect(() => {
    // If the user is already authenticated, navigate to the feature-one page
    if (isAuthenticated) {
      return navigate("/");
    }
    // If the user is not authenticated, navigate to the register page
    else {
      return navigate("/register");
    }
  }, [isAuthenticated, navigate]); // The dependency array includes isAuthenticated and navigate

  // Define a function to handle the register form submission
  const StudentRegister = async () => {
    try {
      // console.log(name, email, password, role);

      // Make a POST request to the register endpoint with the username, email, password, and role
      const response = await apiClient.post(
        "/api/auth/studentregister",
        { name, email, password, role }
      );
      // console.log(response.data.user.role);

      // Set a success message
      setMessage(response.data.message);

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      // Set an error message if the registration fails
      setMessage(error.response?.data?.message || "Error registering");
    }
  };

  const FacultyRegister = async () => {
    try {
      // Make a POST request to the register endpoint with the username, email, password, and role
      const response = await apiClient.post(
        "/api/auth/facultyregister",
        { name, email, password, role }
      );
      // console.log(response.data.user.role);
      // console.log(name, email, password, role);

      // Set a success message
      setMessage(response.data.message);

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      // Set an error message if the registration fails
      setMessage(error.response?.data?.message || "Error registering");
    }
  };

  return (
    <>
      <div className="login">
        <div className="loginsection">
          <div className="leftpart">
            <div className="leftpart-inner">
              <div className="leftpart-header">
                <div className="lefthead">Welcome to Acadmigo</div>
              </div>
              <div className="leftpart-content">
                <p className="leftpara">You have an account</p>
              </div>
              <div className="leftpart-button">
                {/* <button className="butn"></button> */}
                <Link to="/login" className="butn">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
          <div className="login-inner">

            <div className="login-form">
              {role === "student" ? (
                <>
                  <div className="register-header">Student Register</div>
                  <input
                    type="text"
                    pattern="[A-Za-z]*"
                    title="Please enter letters only"
                    className="studentlogin-input"
                    placeholder="Student Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    className="studentlogin-input"
                    placeholder="Student Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    className="studentlogin-input"
                    placeholder="Student Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="btn" onClick={StudentRegister}>
                    Student Register
                  </button>
                  <div className="auth-footer">
                <p className="auth-switch-text">Do you want Register as</p>
                
                <button className="switch-button" onClick={() => setRole("faculty")} >Faculty</button>
              </div>
                </>
              ) : (
                <>
                  <div className="register-header">Faculty Register</div>
                  <input
                    type="text"
                    pattern="[A-Za-z]*"
                    title="Please enter letters only"
                    className="studentlogin-input"
                    placeholder="Faculty Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    className="studentlogin-input"
                    placeholder="Faculty Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    className="studentlogin-input"
                    placeholder="Faculty Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="btn" onClick={FacultyRegister}>
                    Faculty Register
                  </button>

                <div className="auth-footer">
                <p className="auth-switch-text">Do you want Register as</p>
                <button className="switch-button"  onClick={() => setRole("student")} >Student</button>
              </div>
                 
                  
                </>
              )}

            </div>
          </div>
        </div>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default Register;
