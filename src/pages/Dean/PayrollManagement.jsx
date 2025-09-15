// import React, { useState, useEffect } from 'react';

// const PayrollManagement = () => {
//     const [payrollData, setPayrollData] = useState([]);

//     useEffect(() => {
//         // Fetch payroll data from the API
//         setPayrollData([
//             { id: 1, name: 'John Doe', salary: 5000 },
//             { id: 2, name: 'Jane Smith', salary: 4500 },
//             // More payroll data
//         ]);
//     }, []);

//     return (
//         <div className="hr-page">
//             <h2>Payroll Management</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Salary</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {payrollData.map(data => (
//                         <tr key={data.id}>
//                             <td>{data.name}</td>
//                             <td>{data.salary}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default PayrollManagement;






import React, { useState, useEffect } from 'react';
import '../../CSSfolder/CommonCSS/allfile.css'
// import axios from 'axios';
// import './PayrollManagement.css';

const PayrollManagement = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPayroll, setSelectedPayroll] = useState(null);
    const [payrollDetails, setPayrollDetails] = useState({
        facultyId: '',
        month: '',
        year: '',
        basicSalary: '',
        allowances: '',
        deductions: '',
        netSalary: ''
    });

    // useEffect(() => {
    //     const fetchPayrolls = async () => {
    //         try {
    //             const response = await axios.get('/api/payrolls');
    //             setPayrolls(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError('Failed to load payrolls. Please try again.');
    //             setLoading(false);
    //         }
    //     };

    //     fetchPayrolls();
    // }, []);

    // const handlePayrollClick = (payroll) => {
    //     setSelectedPayroll(payroll);
    //     setPayrollDetails({
    //         ...payroll,
    //         month: payroll.month || '',
    //         year: payroll.year || '',
    //         basicSalary: payroll.basicSalary || '',
    //         allowances: payroll.allowances || '',
    //         deductions: payroll.deductions || '',
    //         netSalary: payroll.netSalary || ''
    //     });
    // };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setPayrollDetails((prevState) => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };

    // const handleUpdatePayroll = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.put(`/api/payrolls/${selectedPayroll._id}`, payrollDetails);
    //         if (response.status === 200) {
    //             setPayrolls((prevState) =>
    //                 prevState.map((payroll) =>
    //                     payroll._id === selectedPayroll._id ? response.data : payroll
    //                 )
    //             );
    //             setSelectedPayroll(null);
    //             setPayrollDetails({
    //                 facultyId: '',
    //                 month: '',
    //                 year: '',
    //                 basicSalary: '',
    //                 allowances: '',
    //                 deductions: '',
    //                 netSalary: ''
    //             });
    //         }
    //     } catch (error) {
    //         setError('Failed to update payroll details. Please try again.');
    //     }
    // };

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div className="error-message">{error}</div>;
    // }

    return (
        <div className="allcontainer">
            <h1>Payroll Management</h1>

            <div className="payroll-list">
                <h2>Payroll List</h2>
                {/* {payrolls.length > 0 ? (
                    <ul>
                        {payrolls.map((payroll) => (
                            <li key={payroll._id} className="payroll-item" onClick={() => handlePayrollClick(payroll)}>
                                <h3>Faculty ID: {payroll.facultyId}</h3>
                                <p><strong>Month:</strong> {payroll.month}</p>
                                <p><strong>Year:</strong> {payroll.year}</p>
                                <p><strong>Basic Salary:</strong> ${payroll.basicSalary}</p>
                                <p><strong>Net Salary:</strong> ${payroll.netSalary}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No payrolls available.</p>
                )} */}
            </div>

            {selectedPayroll && (
                <div className="payroll-details">
                    <h2>Edit Payroll Details</h2>
                    {/* <form onSubmit={handleUpdatePayroll}> */}
                        <label htmlFor="facultyId">Faculty ID:</label>
                        <input
                            type="text"
                            id="facultyId"
                            name="facultyId"
                            // value={payrollDetails.facultyId}
                            // onChange={handleInputChange}
                            disabled
                        />
                        <label htmlFor="month">Month:</label>
                        <input
                            type="text"
                            id="month"
                            name="month"
                            // value={payrollDetails.month}
                            // onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="year">Year:</label>
                        <input
                            type="text"
                            id="year"
                            name="year"
                            // value={payrollDetails.year}
                            // onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="basicSalary">Basic Salary:</label>
                        <input
                            type="number"
                            id="basicSalary"
                            name="basicSalary"
                            // value={payrollDetails.basicSalary}
                            // onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="allowances">Allowances:</label>
                        <input
                            type="number"
                            id="allowances"
                            name="allowances"
                            // value={payrollDetails.allowances}
                            // onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="deductions">Deductions:</label>
                        <input
                            type="number"
                            id="deductions"
                            name="deductions"
                            // value={payrollDetails.deductions}
                            // onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="netSalary">Net Salary:</label>
                        <input
                            type="number"
                            id="netSalary"
                            name="netSalary"
                            // value={payrollDetails.netSalary}
                            // onChange={handleInputChange}
                            required
                        />
                        <button type="submit">Update Payroll</button>
                    {/* </form> */}
                </div>
            )}
        </div>
    );
};

export default PayrollManagement;

