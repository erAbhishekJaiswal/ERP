// import React, { useState, useEffect } from 'react';

// const FinancialAid = () => {
//     const [aidData, setAidData] = useState([]);

//     useEffect(() => {
//         // Fetch financial aid data from the API
//         setAidData([
//             { id: 1, name: 'John Doe', amount: 1000, status: 'Approved' },
//             { id: 2, name: 'Jane Smith', amount: 1500, status: 'Pending' },
//             // More aid data
//         ]);
//     }, []);

//     return (
//         <div className="finance-page">
//             <h2>Financial Aid</h2>
//             <ul>
//                 {aidData.map(aid => (
//                     <li key={aid.id}>
//                         {aid.name} - ${aid.amount} ({aid.status})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default FinancialAid;





import React, { useState, useEffect } from 'react';
import '../../CSSfolder/CommonCSS/allfile.css'
// import axios from 'axios';
// import './FinancialAid.css';

const FinancialAid = () => {
    const [aidOptions, setAidOptions] = useState([]);
    const [applicationStatus, setApplicationStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [applying, setApplying] = useState(false);

    // useEffect(() => {
    //     const fetchAidOptions = async () => {
    //         try {
    //             const response = await axios.get('/api/financial-aid/options');
    //             setAidOptions(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError('Failed to load financial aid options. Please try again.');
    //             setLoading(false);
    //         }
    //     };

        // const fetchApplicationStatus = async () => {
        //     try {
        //         const response = await axios.get('/api/financial-aid/status');
        //         setApplicationStatus(response.data);
        //         setLoading(false);
        //     } catch (error) {
        //         setError('Failed to load application status. Please try again.');
        //         setLoading(false);
        //     }
        // };

    //     fetchAidOptions();
    //     fetchApplicationStatus();
    // }, []);

    // const handleApply = async (optionId) => {
    //     setApplying(true);
    //     try {
    //         const response = await axios.post('/api/financial-aid/apply', { optionId });
    //         if (response.status === 200) {
    //             setApplicationStatus(response.data);
    //         }
    //         setApplying(false);
    //     } catch (error) {
    //         setError('Failed to apply for financial aid. Please try again.');
    //         setApplying(false);
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
            <h1>Financial Aid</h1>
            <div className="aid-options">
                <h2>Available Aid Options</h2>
                {aidOptions.length > 0 ? (
                    <ul>
                        {aidOptions.map((option) => (
                            <li key={option._id}>
                                <h3>{option.name}</h3>
                                <p>{option.description}</p>
                                <p><strong>Amount:</strong> ${option.amount}</p>
                                <button
                                    // onClick={() => handleApply(option._id)}
                                    // disabled={applying}
                                >
                                    {applying ? 'Applying...' : 'Apply Now'}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No financial aid options available at the moment.</p>
                )}
            </div>
            {applicationStatus && (
                <div className="application-status">
                    <h2>Application Status</h2>
                    <p><strong>Status:</strong> {applicationStatus.status}</p>
                    <p><strong>Message:</strong> {applicationStatus.message}</p>
                </div>
            )}
        </div>
    );
};

export default FinancialAid;
