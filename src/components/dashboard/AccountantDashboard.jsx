import React from 'react';
import '../../CSSfolder/CommonCSS/allfile.css';
import '../../CSSfolder/AccountCSS/accountdash.css'

const AccountantDashboard = () => (
    <div className='allcontainer'>
        <h1>Accountant Dashboard</h1>
        <div className="accountdashboardbox">
            <div className="financebox">
            <h3>Financial Health Overview:</h3>
            <p>Summary of the institution's revenue, expenditures, and profit/loss for the current period (monthly/quarterly/annually).
            Financial KPIs such as total income, expenses, budget allocation, and remaining balance.</p>
            </div>
            <div className="feebox">
            <h3>Fee Collection Status:</h3>
            <p>Overview of fee collection progress, including outstanding student balances, fee payments made, and upcoming deadlines.
            Visual representation of fee collection efficiency (e.g., bar or pie chart).</p>
            </div>
            <div className="salarybox">
            <h3>Salary Disbursement Overview:</h3>
            <p>Monitor faculty and staff salary payments, including pending disbursements, amounts paid, and upcoming salary cycles.
            Quick access to salary processing details, such as pending approvals or discrepancies</p>
            </div>
        </div>
        {/* <ManageFeeRecords />
        <ProcessFeePayment />
        <IssueReceipt />
        <ProcessFacultySalary />
        <GenerateFinancialReport />
        <ProcessVendorPayment />
        <CheckFinancialCompliance /> */}
    </div>
);

export default AccountantDashboard;
