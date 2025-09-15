// import React, { useState, useEffect,useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom'
// import '../../CSSfolder/navbar.css';
// // import { FaSearch } from "react-icons/fa";
// // import { ImCancelCircle } from "react-icons/im";
// import { IoHomeOutline } from "react-icons/io5";
// import { FaBars } from "react-icons/fa";
// import { CiLogout } from "react-icons/ci";
// import { CiLogin } from "react-icons/ci";
// import { CgProfile } from "react-icons/cg";
// import { RxCross2 } from "react-icons/rx";
// // import { FaRegUserCircle } from "react-icons/fa";
// const Navbar = ({ endtoapp }) => {

//     // Get the token, role, and username from local storage   { endtoapp }
//     const token = localStorage.getItem('token');
//     // const role = localStorage.getItem('role');
//     const username = localStorage.getItem('username');
//     const studentid = localStorage.getItem('studentid');
//     const theme = localStorage.getItem('theme');

//     // Get the navigate function from the useNavigate hook
//     const navigate = useNavigate();

//     // Use the useEffect hook to perform a side effect when the component mounts
//     useEffect(() => {
//         // If there is no token in local storage, navigate to the login page
//         if (!token) {
//             navigate('/login');
//         }
//     }, [token, navigate]); // The dependency array includes token and navigate

//     // Define a function to handle the logout button click
//     const handleLogout = () => {
//         // Remove the token, role, and username from local storage
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         localStorage.removeItem('username');
//         localStorage.removeItem('studentid');
//         localStorage.removeItem('facultyid');
//         setnavbarlist("none");
//         // Navigate to the login page
//         navigate('/login');
//     }

//     /**********  For Sidebar button  **********/
//     const [navbarlist, setnavbarlist] = useState('none')
//     const navbarhandel = () => {
//         if (navbarlist !== 'none') {
//             setnavbarlist("none");
//         } else {
//             setnavbarlist("block")
//         }

//     }
//     endtoapp(navbarlist)

//     const [prfiledropdown, setprfiledropdown] = useState('none');
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null); // Ref for the dropdown
//   const buttonRef = useRef(null); // Ref for the button

//     const dropdown = () => {
//         if (prfiledropdown !== 'none') {
//             setprfiledropdown("none");
//         } else {
//             setprfiledropdown('block')
//         }
//     }

//     return (
//         <>

//             <nav className="navigation" style={{ backgroundColor: theme === 'dark' ? '#ffffff' : '#0d0d2b' }}>
//                 <div className="logo">
//                     <button className='navbarcontrol'
//                     onClick={navbarhandel}
//                     // onClick={toggleSidebar}
//                     style={{color: theme === 'dark' ? '#000000' :'#ffffff' }}>{navbarlist === "none" ? <FaBars /> : <FaBars style={{ transform: 'rotate(90deg)' }} />} </button>

//                     <Link to="/"><p className='logo-text' style={{color: theme === 'dark' ? '#000000' :'#ffffff'}}>Acadmigo</p></Link>
//                 </div>
//                 <ul className='nav-links'>
//                     {/* <input type="text" className='searchbox' />
//                     <li><FaSearch /></li> */}
//                     <Link to="/"><li style={{color: theme === 'dark' ? '#000000' :'#ffffff'}}><IoHomeOutline /> Home</li></Link>
//                     {token ? <>
//                     {/* <Link onClick={handleLogout}><li><CiLogout />Logout</li></Link> */}
//                      <li> <button className='prfilebtn'  onClick={()=>{dropdown()}} style={{color: theme === 'dark' ? '#000000' :'#ffffff'}}>
//                         {prfiledropdown === "none" ? <CgProfile />: <RxCross2 /> }

//                         </button><span style={{color: theme === 'dark' ? '#000000' :'#ffffff'}}>{username}</span>
//                     {/* {username} */}
//                         <ul className='prfiledropdown' style={{ display: prfiledropdown }}>
//                             <li className='dropdownlist'><Link to={`/student-profile/${studentid}`} style={{color: theme === 'dark' ? '#000000' :'#ffffff'}}>Profile</Link></li>
//                             <li className='dropdownlist'><Link to="/" style={{color: theme === 'dark' ? '#000000' :'#ffffff'}}>Change Password</Link></li>
//                             <li className='dropdownlist'><Link to="/login" onClick={handleLogout} style={{color: theme === 'dark' ? '#000000' :'#ffffff'}}> <CiLogout /> Logout</Link></li>
//                         </ul>
//                     </li> </> :
//                         /* If the user is not logged in, display the register and login links */
//                         <>
//                             {/* <Link to="/register"><li>SignUp</li></Link> */}
//                             <Link to={"/login"}><li style={{color: theme === 'dark' ? '#000000' :'#ffffff'}}><CiLogin /> <span style={{color: theme === 'dark' ? '#000000' :'#ffffff'}}>SignIn</span></li></Link>
//                         </>
//                     }

//                     {/* <FaRegUserCircle /> */}
//                 </ul >
//             </nav >
//         </>
//     );
// };

// export default Navbar;












// import React from "react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { GrUserNew } from "react-icons/gr";
// import { Link } from "react-router-dom";
// import { FaBars } from "react-icons/fa";
// import "../../CSSfolder/navbar.css";
// import { CiLogout } from "react-icons/ci";
// import { CiLogin } from "react-icons/ci";
// import { CgProfile } from "react-icons/cg";
// import { RxCross2 } from "react-icons/rx";
// import axios from "axios";
// // import './Navbar.css';

// function Navbar({ toggleSidebar, isSidebarOpen }) {
//   const [prfiledropdown, setprfiledropdown] = useState('none');
//   const token = localStorage.getItem("token");
//   const theme = localStorage.getItem("theme");
//   const username = localStorage.getItem('username');
//   const studentid = localStorage.getItem('studentid');
//   // const facultyid = localStorage.getItem('facultyid');
//   // const role = localStorage.getItem('role');


//   const navigate = useNavigate();

//       const dropdown = () => {
//         if (prfiledropdown !== 'none') {
//             setprfiledropdown("none");
//         } else {
//             setprfiledropdown('block')
//         }
//     }

//       // Define a function to handle the logout button click
//     // const handleLogout = async () => {
//     //   try{
//     //     const res = await axios.post("http://localhost:5000/api/auth/logout", {withCredentials: true});
//     //   }catch(err){
//     //     console.log(err);        
//     //   }
//     //     // Remove the token, role, and username from local storage
//     //     localStorage.removeItem('token');
//     //     localStorage.removeItem('role');
//     //     localStorage.removeItem('username');
//     //     localStorage.removeItem('userid');
//     //     localStorage.removeItem('email');
//     //     localStorage.removeItem('profileid');
//     //     // localStorage.removeItem('studentid');
//     //     // localStorage.removeItem('facultyid');
//     //     // setnavbarlist("none");
//     //     // Navigate to the login page
//     //     navigate('/login');
//     // }

//     const handleLogout = async () => {
//       try {
//         await axios.get('http://localhost:5000/api/auth/logout', {
//           withCredentials: true
//         });
//         // Clear frontend storage
//         localStorage.clear();
//         navigate('/login');
//       } catch (error) {
//         console.error('Logout error:', error);
//       }
//     };

//         // Use the useEffect hook to perform a side effect when the component mounts
//     useEffect(() => {
//         // If there is no token in local storage, navigate to the login page
//         if (!token) {
//             navigate('/login');
//         }
//     }, [token, navigate]); // The dependency array includes token and navigate


//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <div className="container-of-toggle-logo">
//           <button onClick={toggleSidebar} className="toggle-btn">
//             <FaBars
//               style={{
//                 transform: isSidebarOpen ? "rotate(90deg)" : "rotate(0deg)",
//               }}
//             />
//           </button>
//           <Link to="/">
//             <p className="logo-text">Acadmigo</p>
//           </Link>
//         </div>
//         <div className="containerbox-of-navigation">

//           {token ? (
//             <>
//               {/* <Link onClick={handleLogout}><li><CiLogout />Logout</li></Link> */}
              
//                 {" "}
//                 <button
//                   className="prfilebtn"
//                   onClick={() => {
//                     dropdown();
//                   }}
//                   style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
//                 >
//                   {prfiledropdown === "none" ? <CgProfile /> : <RxCross2 />}
//                 </button>
//                 <span
//                   style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
//                 >
//                   {username}
//                 </span>
//                 {/* {username} */}
//                 <ul
//                   className="prfiledropdown"
//                   style={{ display: prfiledropdown }}
//                 >
//                   <li className="dropdownlist">
//                     <Link
//                       to={`/student-profile/${studentid}`}
//                       style={{
//                         color: theme === "dark" ? "#000000" : "#ffffff",
//                       }}
//                     >
//                       Profile
//                     </Link>
//                   </li>
//                   <li className="dropdownlist">
//                     <Link
//                       to="/"
//                       style={{
//                         color: theme === "dark" ? "#000000" : "#ffffff",
//                       }}
//                     >
//                       Change Password
//                     </Link>
//                   </li>
//                   <li className="dropdownlist">
//                     <Link
//                       to="/login"
//                       onClick={handleLogout}
//                       style={{
//                         color: theme === "dark" ? "#000000" : "#ffffff",
//                       }}
//                     >
//                       {" "}
//                       <CiLogout /> Logout
//                     </Link>
//                   </li>
//                 </ul>
//               {" "}
//             </>
//           ) : (
//             /* If the user is not logged in, display the register and login links */
//             <>
//               {/* <Link to="/register"><li>SignUp</li></Link> */}
//               <Link to={"/login"}>
//                 <li className="loginlink-btn" style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
//                   <CiLogin />{" "}
//                   <span
//                     style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
//                   >
//                     Login
//                   </span>
//                 </li>
//               </Link>
//               <Link to={"/register"}>
//                 <li className="loginlink-btn" style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
//                 <GrUserNew />{" "}
//                   <span
//                     style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
//                   >
//                     Register
//                   </span>
//                 </li>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;











import { isAuthorized, getDefaultRoute } from '../../utils/authRoutes';
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { 
  FaBars, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaUserEdit,
  FaKey,
  FaUserPlus,
  FaSignInAlt
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "../../CSSfolder/navbar.css";
import apiClient from '../../services/axios';

function Navbar({ toggleSidebar, isSidebarOpen }) {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("token");
  const theme = localStorage.getItem("theme");
  const username = localStorage.getItem('username');
  const studentid = localStorage.getItem('profileid');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (profileDropdown) {
      closeDropdown();
    } else {
      setProfileDropdown(true);
      setIsClosing(false);
    }
  };

  const closeDropdown = () => {
    setIsClosing(true);
    setTimeout(() => {
      setProfileDropdown(false);
      setIsClosing(false);
    }, 200); // Match this with your CSS transition duration
  };

  const handleLogout = async () => {
    try {
      await apiClient.get('/api/auth/logout', {
        withCredentials: true
      });
      localStorage.clear();
      closeDropdown();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigateAuthorized = (path) => {
    if (isAuthorized(role, path)) {
      navigate(path);
      closeDropdown();
    } else {
      alert("You don't have permission to access this page");
      navigate(getDefaultRoute(role));
    }
  };

  // Render only authorized links
  const renderAuthorizedLink = (path, icon, text) => {
    if (!isAuthorized(role, path)) return null;
    
    return (
      <li className="dropdown-item">
        <button
          className="dropdown-link"
          onClick={() => navigateAuthorized(path)}
        >
          {icon}
          <span>{text}</span>
        </button>
      </li>
    );
  };

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/login');
  //   }
  // }, [token, navigate]);

  return (
    <nav className={`navbar ${theme === "dark" ? "dark-theme" : "light-theme"}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <button 
            onClick={toggleSidebar} 
            className="toggle-btn"
            aria-label="Toggle sidebar"
          >
            <FaBars
              className={`toggle-icon ${isSidebarOpen ? "open" : ""}`}
            />
          </button>
          <Link to="/" className="logo-link">
            <h1 className="logo-text">Acadmigo</h1>
          </Link>
        </div>

        <div className="navbar-right">
          {token ? (
            <div className="profile-container" ref={dropdownRef}>
              <button
                className="profile-btn"
                onClick={toggleDropdown}
                aria-expanded={profileDropdown}
                aria-label="Profile menu"
              >
                <div className="navbar-profile-content">
                  <FaUserCircle className="profile-icon" />
                  <span className="username">{username}</span>
                  {profileDropdown ? (
                    <RxCross2 className="dropdown-toggle-icon" />
                  ) : (
                    <span className="dropdown-caret">▼</span>
                  )}
                </div>
              </button>

              {profileDropdown && (
                <ul className={`dropdown-menu ${isClosing ? "closing" : ""}`}>
                {renderAuthorizedLink(
                  `/student-profile/${studentid}`,
                  <FaUserEdit className="dropdown-icon" />,
                  "Profile"
                )}
                {renderAuthorizedLink(
                  '/change-password',
                  <FaKey className="dropdown-icon" />,
                  "Change Password"
                )}
                <li className="dropdown-item">
                  {/* <button
                  style={{color: theme === 'dark' ? '#000000' :'#ff0057'}}
                    className="dropdown-link logout-btn"
                    onClick={handleLogout}
                  > */}

                  { role === 'student' || role === 'faculty' ?
                    <Link className="dropdown-link logout-btn" to={ role === 'student' ? `/student/profile/${studentid}` : `/faculty/faculty-profile/${studentid}`} style={{color: theme === 'dark' ? '#000000' :'#3498db'}}> 
                  <CgProfile className="dropdown-icon"/>
                    <span>Profile</span>
                  </Link>
                  : <></>
                  }
                   
                  {/* </button> */}
                </li>
                <li className="dropdown-item">
                  <button
                  style={{color: theme === 'dark' ? '#000000' :'#ff0057'}}
                    className="dropdown-link logout-btn"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="dropdown-icon" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/register" className="auth-link register-link">
                <FaUserPlus className="auth-icon" />
                <span>Register</span>
              </Link>
              <Link to="/login" className="auth-link login-link">
                <FaSignInAlt className="auth-icon" />
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;