import React, { useState } from 'react'
import '../../CSSfolder/AdminCSS/admindashboard.css';
import '../../CSSfolder/CommonCSS/allfile.css'

const ViewLeaveRequests = ({ studentDataId }) => {

    const [leaveRequests, setLeaveRequests] = useState([]);

    // useEffect(() => {
    //     const fetchLeaveRequests = async () => {
    //         try {
    //             const response = await fetch(`/api/leave/${studentDataId}`, {
    //                 method: 'GET',
    //                 headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    //             });

    //             const data = await response.json();
    //             if (response.ok) {
    //                 setLeaveRequests(data.leaveRequests);
    //             } else {
    //                 console.log("Error fetching leave requests: " + data.message);
    //             }
    //         } catch (error) {
    //             console.log("Error: " + error.message);
    //         }
    //     };

    //     fetchLeaveRequests();
    // }, [studentDataId]);

  return (
    <>
    <div className="allcontainer">
    <div>
            <h2>Leave Requests</h2>
            {leaveRequests.length > 0 ? (
                leaveRequests.map((leave) => (
                    <div key={leave._id}>
                        <p>Leave Type: {leave.leaveType}</p>
                        <p>Reason: {leave.reason}</p>
                        <p>Status: {leave.status}</p>
                    </div>
                ))
            ) : (
                <p>No leave requests found.</p>
            )}
        </div>
    </div> 
    </>
  )
}

export default ViewLeaveRequests
