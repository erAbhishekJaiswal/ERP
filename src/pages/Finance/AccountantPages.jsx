import { Routes, Route } from "react-router-dom";
import CheckFinancialCompliance from "./CheckFinancialCompliance";
import FeePayment from "./FeePayment";
import FinancialAid from "./FinancialAid";
import GenerateFinancialReport from "./GenerateFinancialReport";
import IssueReceipt from "./IssueReceipt";
import ManageFeeRecords from "./ManageFeeRecords";
import ProcessFacultySalary from "./ProcessFacultySalary";
import ProcessFeePayment from "./ProcessFeePayment";
import ProcessVendorPayment from "./ProcessVendorPayment";
import Reports from "./Reports";

// Faculty
import AllFacultylist from "../Admin/AllFacultylist";
import FacultyProfile from "../Faculty/Facultyprofile";

// Student Management
import AllStudentlist from "../Admin/AllStudentlist";
import StudentProfile from "../Student/StudentProfile";

// import CheckFinancialCompliance from './CheckFinancialCompliance';
const AccountantPages = () => {
  return (
    <Routes>
      {/* ************** Faculty routes ************** */}
      <Route path="facultylist" exact Component={AllFacultylist} />
      <Route path="faculty-profile/:id" exact Component={FacultyProfile} />

      {/* ********************************* Student control ***************************** */}
      <Route path="allstudentlist" exact Component={AllStudentlist} />
      <Route path="student-profile/:id" exact Component={StudentProfile} />
      <Route path="student/:id" exact Component={Studentdetail} />

      {/* Accountant specific routes */}
      <Route
        path="check-financial-compliance"
        element={<CheckFinancialCompliance />}
      />
      <Route path="fee-payment" element={<FeePayment />} />
      <Route path="financial-aid" element={<FinancialAid />} />
      <Route
        path="generate-financial-report"
        element={<GenerateFinancialReport />}
      />
      <Route path="issue-receipt" element={<IssueReceipt />} />
      <Route path="manage-fee-records" element={<ManageFeeRecords />} />
      <Route path="process-faculty-salary" element={<ProcessFacultySalary />} />
      <Route path="process-fee-payment" element={<ProcessFeePayment />} />
      <Route path="process-vendor-payment" element={<ProcessVendorPayment />} />
      <Route path="finance-reports" element={<Reports />} />
    </Routes>
  );
};

export default AccountantPages;
