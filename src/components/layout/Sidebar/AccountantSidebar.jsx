import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaUserTie, 
  FaAngleRight,
  FaMoneyBillWave,
  FaReceipt,
  FaFileInvoiceDollar,
  FaChartLine,
  FaBalanceScale,
  FaCreditCard,
  FaShieldAlt,
  FaCalculator,
  FaFileAlt,
  FaUniversity,
  FaUsers
} from "react-icons/fa";
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiBarChart2,
  FiCheckCircle,
  FiUsers
} from "react-icons/fi";
import "./SidebarCSS/AccountantSidebar.css";
import "../../../CSSfolder/CommonCSS/sidebar.css"

const AccountantSidebar = ({ expandedItems, toggleExpand, handleNavigation, currentPath }) => {
  const theme = localStorage.getItem("theme");
  const username = localStorage.getItem("username");

  // Menu items data structure
  const menuSections = [
    {
      id: 'dashboard',
      label: 'Accountant Dashboard',
      icon: <FaUserTie className="accountant-sidebar__section-icon" />,
      path: '/accountant/accountantdash'
    },
    {
      id: 'fee-management',
      label: 'Fee Management',
      icon: <FaMoneyBillWave className="accountant-sidebar__section-icon" />,
      items: [
        { 
          label: 'Manage Fee Records', 
          path: '/accountant/managefeerecords', 
          icon: <FaFileInvoiceDollar />,
          description: 'Student fee records management'
        },
        { 
          label: 'Process Fee Payment', 
          path: '/accountant/processfeepayment', 
          icon: <FaCreditCard />,
          description: 'Process student payments'
        },
        { 
          label: 'Issue Receipts', 
          path: '/accountant/issuereceipt', 
          icon: <FaReceipt />,
          description: 'Generate payment receipts'
        },
        { 
          label: 'Fee Analytics', 
          path: '/accountant/fee-analytics', 
          icon: <FiTrendingUp />,
          description: 'Fee collection insights'
        }
      ]
    },
    {
      id: 'payroll-management',
      label: 'Payroll Management',
      icon: <FiUsers className="accountant-sidebar__section-icon" />,
      items: [
        { 
          label: 'Process Faculty Salary', 
          path: '/accountant/processfacultysalary', 
          icon: <FaCalculator />,
          description: 'Faculty payroll processing'
        },
        { 
          label: 'Staff Payments', 
          path: '/accountant/staff-payments', 
          icon: <FiDollarSign />,
          description: 'Administrative staff payroll'
        },
        { 
          label: 'Payroll Reports', 
          path: '/accountant/payroll-reports', 
          icon: <FaFileAlt />,
          description: 'Payroll documentation'
        }
      ]
    },
    {
      id: 'vendor-payments',
      label: 'Vendor Payments',
      icon: <FaUniversity className="accountant-sidebar__section-icon" />,
      items: [
        { 
          label: 'Process Vendor Payment', 
          path: '/accountant/processvendorpayment', 
          icon: <FiDollarSign />,
          description: 'Supplier and vendor payments'
        },
        { 
          label: 'Vendor Management', 
          path: '/accountant/vendor-management', 
          icon: <FaUsers />,
          description: 'Vendor database management'
        },
        { 
          label: 'Payment Tracking', 
          path: '/accountant/payment-tracking', 
          icon: <FaChartLine />,
          description: 'Monitor payment status'
        }
      ]
    },
    {
      id: 'financial-reporting',
      label: 'Financial Reporting',
      icon: <FiBarChart2 className="accountant-sidebar__section-icon" />,
      items: [
        { 
          label: 'Generate Financial Report', 
          path: '/accountant/generatefinancialreport', 
          icon: <FaFileAlt />,
          description: 'Create financial statements'
        },
        { 
          label: 'Budget Analysis', 
          path: '/accountant/budget-analysis', 
          icon: <FaChartLine />,
          description: 'Budget performance review'
        },
        { 
          label: 'Revenue Reports', 
          path: '/accountant/revenue-reports', 
          icon: <FiTrendingUp />,
          description: 'Income and revenue analysis'
        }
      ]
    },
    {
      id: 'compliance-audit',
      label: 'Compliance & Audit',
      icon: <FaShieldAlt className="accountant-sidebar__section-icon" />,
      items: [
        { 
          label: 'Check Financial Compliance', 
          path: '/accountant/checkfinancialcomplaince', 
          icon: <FaBalanceScale />,
          description: 'Regulatory compliance check'
        },
        { 
          label: 'Internal Audit', 
          path: '/accountant/internal-audit', 
          icon: <FaShieldAlt />,
          description: 'Internal financial audit'
        },
        { 
          label: 'Tax Compliance', 
          path: '/accountant/tax-compliance', 
          icon: <FiCheckCircle />,
          description: 'Tax filing and compliance'
        }
      ]
    },
    {
      id: 'financial-tools',
      label: 'Financial Tools',
      icon: <FaCalculator className="accountant-sidebar__section-icon" />,
      path: '/accountant/financial-tools'
    }
  ];

  const isSectionActive = (section) => {
    if (section.path && currentPath === section.path) return true;
    if (section.items) {
      return section.items.some(item => currentPath.startsWith(item.path));
    }
    return false;
  };

  const isItemActive = (itemPath) => {
    return currentPath.startsWith(itemPath);
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'A';
  };

  // Mock financial data
  const financialStats = {
    totalRevenue: 1250000,
    pendingPayments: 45000,
    processedThisMonth: 245,
    complianceScore: 96
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="accountant-sidebar">
      {/* Accountant Profile Header */}
      <div className="accountant-sidebar__profile">
        <div className="accountant-sidebar__avatar">
          <div className="accountant-sidebar__avatar-initials">
            {getInitials(username)}
          </div>
          <div className="accountant-sidebar__status-indicator"></div>
        </div>
        <div className="accountant-sidebar__user-info">
          <div className="accountant-sidebar__username">{username || 'Accountant'}</div>
          <div className="accountant-sidebar__user-role">Accountant</div>
          <div className="accountant-sidebar__department">Finance Department</div>
        </div>
      </div>

      <div className="accountant-sidebar__header">
        <FaUserTie className="accountant-sidebar__header-icon" />
        <span className="accountant-sidebar__header-title">Finance Portal</span>
      </div>

      <nav className="accountant-sidebar__nav">
        <ul className="accountant-sidebar__menu">
          {menuSections.map((section) => (
            <li key={section.id} className="accountant-sidebar__menu-item">
              {section.items ? (
                // Expandable section with submenu
                <>
                  <button
                    className={`accountant-sidebar__section-btn ${
                      isSectionActive(section) ? 'accountant-sidebar__section-btn--active' : ''
                    } ${expandedItems[section.id] ? 'accountant-sidebar__section-btn--expanded' : ''}`}
                    onClick={() => toggleExpand(section.id)}
                  >
                    <div className="accountant-sidebar__section-content">
                      {section.icon}
                      <span className="accountant-sidebar__section-label">{section.label}</span>
                    </div>
                    <FaAngleRight className={`accountant-sidebar__expand-icon ${
                      expandedItems[section.id] ? 'accountant-sidebar__expand-icon--expanded' : ''
                    }`} />
                  </button>

                  {expandedItems[section.id] && (
                    <ul className="accountant-sidebar__submenu">
                      {section.items.map((item, index) => (
                        <li key={index} className="accountant-sidebar__submenu-item">
                          <Link
                            to={item.path}
                            className={`accountant-sidebar__submenu-link ${
                              isItemActive(item.path) ? 'accountant-sidebar__submenu-link--active' : ''
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation(item.path);
                            }}
                          >
                            <div className="accountant-sidebar__submenu-content">
                              <span className="accountant-sidebar__submenu-icon">{item.icon}</span>
                              <div className="accountant-sidebar__submenu-text">
                                <span className="accountant-sidebar__submenu-label">{item.label}</span>
                                <span className="accountant-sidebar__submenu-description">
                                  {item.description}
                                </span>
                              </div>
                            </div>
                            {isItemActive(item.path) && (
                              <div className="accountant-sidebar__active-indicator"></div>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Single navigation item
                <Link
                  to={section.path}
                  className={`accountant-sidebar__single-link ${
                    isSectionActive(section) ? 'accountant-sidebar__single-link--active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(section.path);
                  }}
                >
                  <div className="accountant-sidebar__single-content">
                    {section.icon}
                    <span className="accountant-sidebar__single-label">{section.label}</span>
                  </div>
                  {isSectionActive(section) && (
                    <div className="accountant-sidebar__active-indicator"></div>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Financial Overview */}
      <div className="accountant-sidebar__overview">
        <h4 className="accountant-sidebar__overview-title">Financial Snapshot</h4>
        <div className="accountant-sidebar__stats-grid">
          <div className="accountant-sidebar__stat-item">
            <div className="accountant-sidebar__stat-icon accountant-sidebar__stat-icon--revenue">
              <FiTrendingUp />
            </div>
            <div className="accountant-sidebar__stat-info">
              <div className="accountant-sidebar__stat-value">
                {formatCurrency(financialStats.totalRevenue)}
              </div>
              <div className="accountant-sidebar__stat-label">Total Revenue</div>
            </div>
          </div>
          <div className="accountant-sidebar__stat-item">
            <div className="accountant-sidebar__stat-icon accountant-sidebar__stat-icon--pending">
              <FiDollarSign />
            </div>
            <div className="accountant-sidebar__stat-info">
              <div className="accountant-sidebar__stat-value">
                {formatCurrency(financialStats.pendingPayments)}
              </div>
              <div className="accountant-sidebar__stat-label">Pending</div>
            </div>
          </div>
          <div className="accountant-sidebar__stat-item">
            <div className="accountant-sidebar__stat-icon accountant-sidebar__stat-icon--processed">
              <FaFileInvoiceDollar />
            </div>
            <div className="accountant-sidebar__stat-info">
              <div className="accountant-sidebar__stat-value">
                {financialStats.processedThisMonth}
              </div>
              <div className="accountant-sidebar__stat-label">Processed</div>
            </div>
          </div>
          <div className="accountant-sidebar__stat-item">
            <div className="accountant-sidebar__stat-icon accountant-sidebar__stat-icon--compliance">
              <FaShieldAlt />
            </div>
            <div className="accountant-sidebar__stat-info">
              <div className="accountant-sidebar__stat-value">
                {financialStats.complianceScore}%
              </div>
              <div className="accountant-sidebar__stat-label">Compliance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="accountant-sidebar__quick-actions">
        <h4 className="accountant-sidebar__actions-title">Quick Actions</h4>
        <div className="accountant-sidebar__actions-grid">
          <button 
            className="accountant-sidebar__action-btn"
            onClick={() => handleNavigation('/accountant/processfeepayment')}
          >
            <FaCreditCard />
            <span>Process Payment</span>
          </button>
          <button 
            className="accountant-sidebar__action-btn"
            onClick={() => handleNavigation('/accountant/issuereceipt')}
          >
            <FaReceipt />
            <span>Issue Receipt</span>
          </button>
          <button 
            className="accountant-sidebar__action-btn"
            onClick={() => handleNavigation('/accountant/generatefinancialreport')}
          >
            <FaFileAlt />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="accountant-sidebar__footer">
        <div className="accountant-sidebar__financial-health">
          <div className="accountant-sidebar__health-label">
            Financial Health
          </div>
          <div className="accountant-sidebar__health-bar">
            <div 
              className="accountant-sidebar__health-fill"
              style={{ width: '88%' }}
            ></div>
          </div>
          <div className="accountant-sidebar__health-metrics">
            <span className="accountant-sidebar__health-value">88%</span>
            <span className="accountant-sidebar__health-text">Excellent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountantSidebar;