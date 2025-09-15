// import React, { useState, useEffect } from 'react';

// const LeaveManagement = () => {
//     const [leaveRequests, setLeaveRequests] = useState([]);

//     useEffect(() => {
//         // Fetch leave requests from the API
//         setLeaveRequests([
//             { id: 1, name: 'John Doe', days: 5, status: 'Approved' },
//             { id: 2, name: 'Jane Smith', days: 3, status: 'Pending' },
//             // More leave requests
//         ]);
//     }, []);

//     return (
//         <div className="hr-page">
//             <h2>Leave Management</h2>
//             <ul>
//                 {leaveRequests.map(request => (
//                     <li key={request.id}>
//                         {request.name} - {request.days} days ({request.status})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default LeaveManagement;





import React, { useState, useEffect } from 'react';
import '../../CSSfolder/CommonCSS/allfile.css'
// import axios from 'axios';
// import './LeaveManagement.css';

const LeaveManagement = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newLeave, setNewLeave] = useState({
        startDate: '',
        endDate: '',
        reason: ''
    });
    const [applying, setApplying] = useState(false);

    // useEffect(() => {
    //     const fetchLeaveRequests = async () => {
    //         try {
    //             const response = await axios.get('/api/leave');
    //             setLeaveRequests(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError('Failed to load leave requests. Please try again.');
    //             setLoading(false);
    //         }
    //     };

    //     fetchLeaveRequests();
    // }, []);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setNewLeave((prevState) => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };

    // const handleApplyLeave = async (e) => {
    //     e.preventDefault();
    //     setApplying(true);
    //     try {
    //         const response = await axios.post('/api/leave', newLeave);
    //         if (response.status === 200) {
    //             setLeaveRequests((prevState) => [...prevState, response.data]);
    //             setNewLeave({
    //                 startDate: '',
    //                 endDate: '',
    //                 reason: ''
    //             });
    //         }
    //         setApplying(false);
    //     } catch (error) {
    //         setError('Failed to apply for leave. Please try again.');
    //         setApplying(false);
    //     }
    // };

    // const handleApproval = async (leaveId, approved) => {
    //     try {
    //         await axios.patch(`/api/leave/${leaveId}`, { approved });
    //         setLeaveRequests((prevState) =>
    //             prevState.map((leave) =>
    //                 leave._id === leaveId ? { ...leave, approved } : leave
    //             )
    //         );
    //     } catch (error) {
    //         setError('Failed to update leave request. Please try again.');
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
            <h1>Leave Management</h1>

            <div className="apply-leave">
                <h2>Apply for Leave</h2>
                <form >
                    {/* onSubmit={handleApplyLeave} */}
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        // value={newLeave.startDate}
                        // onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        // value={newLeave.endDate}
                        // onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="reason">Reason:</label>
                    <textarea
                        id="reason"
                        name="reason"
                        // value={newLeave.reason}
                        // onChange={handleInputChange}
                        required
                    />
                    <button type="submit" disabled={applying}>
                        {applying ? 'Submitting...' : 'Submit Leave Request'}
                    </button>
                </form>
            </div>

            <div className="leave-requests">
                <h2>Leave Requests</h2>
                {/* {leaveRequests.length > 0 ? (
                    <ul>
                        {leaveRequests.map((request) => (
                            <li key={request._id} className="leave-item">
                                <h3>{request.facultyName}</h3>
                                <p><strong>Start Date:</strong> {new Date(request.startDate).toLocaleDateString()}</p>
                                <p><strong>End Date:</strong> {new Date(request.endDate).toLocaleDateString()}</p>
                                <p><strong>Reason:</strong> {request.reason}</p>
                                <p><strong>Status:</strong> {request.approved ? 'Approved' : 'Pending'}</p>
                                {!request.approved && (
                                    <div className="actions">
                                        <button onClick={() => handleApproval(request._id, true)}>
                                            Approve
                                        </button>
                                        <button onClick={() => handleApproval(request._id, false)}>
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No leave requests available.</p>
                )} */}
            </div>
        </div>
    );
};

export default LeaveManagement;
