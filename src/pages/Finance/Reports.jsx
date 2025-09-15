// import React, { useState, useEffect } from 'react';

// const Reports = () => {
//     const [reports, setReports] = useState([]);

//     useEffect(() => {
//         // Fetch financial reports from the API
//         setReports([
//             { id: 1, title: 'Q1 2024', amount: 50000 },
//             { id: 2, title: 'Q2 2024', amount: 75000 },
//             // More reports
//         ]);
//     }, []);

//     return (
//         <div className="finance-page">
//             <h2>Financial Reports</h2>
//             <ul>
//                 {reports.map(report => (
//                     <li key={report.id}>
//                         {report.title} - ${report.amount}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Reports;





import React, { useState, useEffect } from 'react';
import '../../CSSfolder/CommonCSS/allfile.css'
// import axios from 'axios';
// import './Reports.css';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // useEffect(() => {
    //     const fetchReports = async () => {
    //         try {
    //             const response = await axios.get('/api/reports');
    //             setReports(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError('Failed to load reports. Please try again.');
    //             setLoading(false);
    //         }
    //     };

    //     fetchReports();
    // }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div className="error-message">{error}</div>;
    // }

    return (
        <div className="allcontainer">
            <h1>Financial Reports</h1>
            {reports.length > 0 ? (
                <ul>
                    {reports.map((report) => (
                        <li key={report._id} className="report-item">
                            <h2>{report.title}</h2>
                            <p><strong>Description:</strong> {report.description}</p>
                            <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
                            <a href={report.fileUrl} download className="download-link">
                                Download Report
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reports available at the moment.</p>
            )}
        </div>
    );
};

export default Reports;

