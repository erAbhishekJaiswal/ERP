import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarCSS/AccountantSidebar.css";
import "../../../CSSfolder/CommonCSS/sidebar.css"
import { FaUserTie, FaAngleRight } from "react-icons/fa";

const AccountantSidebar = () => {
  const [accountantlist, setAccountantlist] = useState("none");
  const theme = localStorage.getItem("theme");

  const accountanttoggleList = () => {
    setAccountantlist(accountantlist === "none" ? "block" : "none");
  };

  return (
    <div className="sidebar-content">
      <h2>Accountant Menu</h2>
      <div className="alist">
        <li className="arrow-list">
          <Link style={{paddingLeft:"10px"}} to="/accountant/accountantdash">
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              <FaUserTie />
              Accountant Dashboard
            </div>
          </Link>

          <button
            onClick={accountanttoggleList}
            className="student-toggle-btn"
            style={{
              transform: accountantlist !== "block" ? "" : "rotate(90deg)",
            }}
          >
            <FaAngleRight />
          </button>
        </li>
      </div>
      <ul className="sidebar-links" style={{ display: accountantlist }}>
        <Link to="/accountant/managefeerecords">
          <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
            ManageFeeRecords
          </li>
        </Link>
        <Link to="/accountant/processfeepayment">
          <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
            ProcessFeePayment
          </li>
        </Link>
        <Link to="/accountant/issuereceipt">
          <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
            IssueReceipt
          </li>
        </Link>
        <Link to="/accountant/processfacultysalary">
          <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
            ProcessFacultySalary
          </li>
        </Link>
        <Link to="/accountant/generatefinancialreport">
          <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
            GenerateFinancialReport
          </li>
        </Link>
        <Link to="/accountant/processvendorpayment">
          <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
            ProcessVendorPayment
          </li>
        </Link>
        <Link to="/accountant/checkfinancialcomplaince">
          <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
            CheckFinancialComplaince
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default AccountantSidebar;
