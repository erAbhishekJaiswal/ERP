import React, { useState } from 'react';
import "../../CSSfolder/FacultyCSS/faculty.css"
import '../../CSSfolder/CommonCSS/allfile.css'

const LeaveRequest = ({ userId, role }) => {
    const [leaveData, setLeaveData] = useState({
                leaveType: '',
                reason: '',
                startDate: '',
                endDate: ''
            });
    const handleChange = (e) => {
                setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
            };   
            
            const submitLeaveRequest = async () => {
                try {
                    const response = await fetch('/api/leave', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            applicantId: userId,
                            applicantModel: role === 'student' ? 'StudentData' : 'FacultyData',
                            ...leaveData
                        })
                    });
        
                    const data = await response.json();
                    if (response.ok) {
                        alert("Leave request submitted successfully!");
                    } else {
                        alert("Error: " + data.message);
                    }
                } catch (error) {
                    alert("Error: " + error.message);
                }
            };        
    
  return (
    <>
      <div className="allcontainer">
      <div>
            <h2>Request Leave</h2>
            <form onSubmit={(e) => { e.preventDefault(); submitLeaveRequest(); }}>
                <label>Leave Type:</label>
                <select name="leaveType" value={leaveData.leaveType} onChange={handleChange}>
                    <option value="sick">Sick</option>
                    <option value="casual">Casual</option>
                    <option value="emergency">Emergency</option>
                </select>
                <label>Reason:</label>
                <input type="text" name="reason" value={leaveData.reason} onChange={handleChange} />
                <label>Start Date:</label>
                <input type="date" name="startDate" value={leaveData.startDate} onChange={handleChange} />
                <label>End Date:</label>
                <input type="date" name="endDate" value={leaveData.endDate} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
      </div>
    </>
  )
}
export default LeaveRequest;