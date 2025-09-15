// import React, { useState } from 'react';
// import axios from 'axios';
// import "../../CSSfolder/FacultyCSS/facultytimetable.css";
// import '../../CSSfolder/CommonCSS/allfile.css'
// import { useLocation } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// const EditTimetable = () => {

//     const location = useLocation();
//     const { timeTable } = location.state || {};  // Access the dataset from state

//     const { id } = useParams();
    
//     const [className, setClassName] = useState(timeTable.className);
//     const [schedule, setSchedule] = useState(timeTable.schedule);
//     const [createdBy, setCreatedBy] = useState(timeTable.createdBy);
//     const createdAt = timeTable.createdAt;
//     const updatedAt = timeTable.updatedAt;
//     const _v = 0;
//     const handleInputChange = (e, dayIndex, slotIndex, field) => {
//         const updatedSchedule = [...schedule];
//         updatedSchedule[dayIndex].timeSlots[slotIndex][field] = e.target.value;
//         setSchedule(updatedSchedule);
//     };

//     const addTimeSlot = (dayIndex) => {
//         const updatedSchedule = [...schedule];
//         updatedSchedule[dayIndex].timeSlots.push({ subject: '', teacher: '', startTime: '', endTime: '' });
//         setSchedule(updatedSchedule);
//     };

//     const addDay = () => {
//         setSchedule([...schedule, { day: '', timeSlots: [{ subject: '', teacher: '', startTime: '', endTime: '' }] }]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:5000/api/timetable/edit/${id}`, { className, schedule, createdBy, createdAt, updatedAt, _v });
//             alert('Timetable updated successfully');
//             // console.log({id, className, schedule, createdBy, createdAt, updatedAt, _v });
            
//             // onUpdate(); // Notify parent to refresh the list
//         } catch (error) {
//             console.error('Error updating timetable:', error);
//         }
//     };

//     return (
//         <div className="allcontainer">
//         <div className="timetable-container">
//             <h2>Edit Timetable</h2>
//             <form onSubmit={handleSubmit} className="timetable-form">
//                 <label>
//                     Class Name:
//                     <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} required />
//                 </label>

//                 {schedule.map((daySchedule, dayIndex) => (
//                     <div key={dayIndex} className="day-section">
//                         <label>
//                             Day:
//                             <input
//                                 type="text"
//                                 value={daySchedule.day}
//                                 onChange={(e) => {
//                                     const updatedSchedule = [...schedule];
//                                     updatedSchedule[dayIndex].day = e.target.value;
//                                     setSchedule(updatedSchedule);
//                                 }}
//                                 required
//                             />
//                         </label>

//                         {daySchedule.timeSlots.map((slot, slotIndex) => (
//                             <div key={slotIndex} className="slot-section">
//                                 <label>
//                                     Subject:
//                                     <input
//                                         type="text"
//                                         value={slot.subject}
//                                         onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'subject')}
//                                         required
//                                     />
//                                 </label>
//                                 <label>
//                                     Teacher:
//                                     <input
//                                         type="text"
//                                         value={slot.teacher}
//                                         onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'teacher')}
//                                         required
//                                     />
//                                 </label>
//                                 <label>
//                                     Start Time:
//                                     <input
//                                         type="text"
//                                         value={slot.startTime}
//                                         onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'startTime')}
//                                         required
//                                     />
//                                 </label>
//                                 <label>
//                                     End Time:
//                                     <input
//                                         type="text"
//                                         value={slot.endTime}
//                                         onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'endTime')}
//                                         required
//                                     />
//                                 </label>
//                             </div>
//                         ))}
//                         <button type="button" className="add-slot-btn" onClick={() => addTimeSlot(dayIndex)}>
//                             Add Time Slot
//                         </button>
//                     </div>
//                 ))}
//                 <button type="button" className="add-day-btn" onClick={addDay}>
//                     Add Day
//                 </button>

//                 <label>
//                     Created By (User ID):
//                     <input type="text" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} required />
//                 </label>

//                 <button type="submit" className="submit-btn">Update Timetable</button>
//             </form>
//         </div>
//         </div>
//     );
// };

// export default EditTimetable;













import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../../CSSfolder/FacultyCSS/facultytimetable.css";
// import '../../CSSfolder/CommonCSS/allfile.css';
import "../../CSSfolder/AdminCSS/EditTimetable.css";
import apiClient from '../../services/axios';

const EditTimetable = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [timetable, setTimetable] = useState({
        session: '',
        department: '',
        semester: '',
        className: '',
        schedule: [],
        createdBy: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [departments, setDepartments] = useState([]);

    // Fetch timetable data on component mount
    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const response = await apiClient.get(`/api/timetable/time/${id}`);
                setTimetable(response.data);
                // const deptResponse = await axios.get("http://localhost:5000/api/features/getdepartmentname");
                // setDepartments(deptResponse.data);
                // setTimetable({ ...timetable, department: deptResponse.data.find(dept => dept._id === response.data.department) });

                // const dept = await axios.get(`http://localhost:5000/api/departments/${response.data.department}`);
                // setTimetable({ ...timetable, department: dept.data.departmentName });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchTimetable();
    }, [id]);

    const handleInputChange = (e, dayIndex, slotIndex, field) => {
        const updatedSchedule = [...timetable.schedule];
        updatedSchedule[dayIndex].timeSlots[slotIndex][field] = e.target.value;
        setTimetable({ ...timetable, schedule: updatedSchedule });
    };

    const addTimeSlot = (dayIndex) => {
        const updatedSchedule = [...timetable.schedule];
        updatedSchedule[dayIndex].timeSlots.push({
            subject: '',
            teacher: '',
            startTime: '',
            endTime: ''
        });
        setTimetable({ ...timetable, schedule: updatedSchedule });
    };

    const removeTimeSlot = (dayIndex, slotIndex) => {
        const updatedSchedule = [...timetable.schedule];
        updatedSchedule[dayIndex].timeSlots.splice(slotIndex, 1);
        setTimetable({ ...timetable, schedule: updatedSchedule });
    };

    const addDay = () => {
        setTimetable({
            ...timetable,
            schedule: [
                ...timetable.schedule,
                { day: '', timeSlots: [{ subject: '', teacher: '', startTime: '', endTime: '' }] }
            ]
        });
    };

    const removeDay = (dayIndex) => {
        const updatedSchedule = [...timetable.schedule];
        updatedSchedule.splice(dayIndex, 1);
        setTimetable({ ...timetable, schedule: updatedSchedule });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.put(`/api/timetable/edit/${id}`, timetable);
            alert('Timetable updated successfully');
            navigate(-1); // Go back to previous page
            console.log(timetable);
            
        } catch (error) {
            console.error('Error updating timetable:', error);
            alert('Failed to update timetable');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="edit-timtable-container">
            <div className="timetable-container">
                <h2>Edit Timetable</h2>
                <form onSubmit={handleSubmit} className="timetable-form">
                    <div className="form-group">
                        <label>Session:</label>
                        <input 
                            type="text" 
                            value={timetable.session} 
                            onChange={(e) => setTimetable({...timetable, session: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Department ID:</label>
                        <input 
                            type="text" 
                            value={timetable.department} 
                            onChange={(e) => setTimetable({...timetable, department: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Semester:</label>
                        <input 
                            type="text" 
                            value={timetable.semester} 
                            onChange={(e) => setTimetable({...timetable, semester: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Class Name:</label>
                        <input 
                            type="text" 
                            value={timetable.className} 
                            onChange={(e) => setTimetable({...timetable, className: e.target.value})} 
                            required 
                        />
                    </div>

                    {timetable.schedule.map((daySchedule, dayIndex) => (
                        <div key={dayIndex} className="day-section">
                            <div className="day-header">
                                <div className="form-group">
                                    <label>Day:</label>
                                    <select
                                        value={daySchedule.day}
                                        onChange={(e) => {
                                            const updatedSchedule = [...timetable.schedule];
                                            updatedSchedule[dayIndex].day = e.target.value;
                                            setTimetable({...timetable, schedule: updatedSchedule});
                                        }}
                                        required
                                    >
                                        <option value="">Select Day</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                    </select>
                                </div>
                                <button 
                                    type="button" 
                                    className="remove-btn"
                                    onClick={() => removeDay(dayIndex)}
                                    disabled={timetable.schedule.length <= 1}
                                >
                                    Remove Day
                                </button>
                            </div>

                            {daySchedule.timeSlots.map((slot, slotIndex) => (
                                <div key={slotIndex} className="slot-section">
                                    <div className="form-group">
                                        <label>Subject:</label>
                                        <input
                                            type="text"
                                            value={slot.subject}
                                            onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'subject')}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Teacher:</label>
                                        <input
                                            type="text"
                                            value={slot.teacher}
                                            onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'teacher')}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Start Time:</label>
                                        <input
                                            type="time"
                                            value={slot.startTime}
                                            onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'startTime')}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>End Time:</label>
                                        <input
                                            type="time"
                                            value={slot.endTime}
                                            onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'endTime')}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                                        disabled={daySchedule.timeSlots.length <= 1}
                                    >
                                        Remove Slot
                                    </button>
                                </div>
                            ))}
                            <button 
                                type="button" 
                                className="add-btn"
                                onClick={() => addTimeSlot(dayIndex)}
                            >
                                Add Time Slot
                            </button>
                        </div>
                    ))}

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="add-btn"
                            onClick={addDay}
                        >
                            Add Day
                        </button>
                        <button type="submit" className="submit-btn">Update Timetable</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTimetable;





















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import "../../CSSfolder/FacultyCSS/facultytimetable.css";
// // import '../../CSSfolder/CommonCSS/allfile.css';
// import "../../CSSfolder/AdminCSS/EditTimetable.css";

// const EditTimetable = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [timetable, setTimetable] = useState({
//         session: '',
//         department: '',
//         semester: '',
//         className: '',
//         schedule: [],
//         createdBy: ''
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchTimetable = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/timetable/${id}`);
//                 setTimetable(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };
//         fetchTimetable();
//     }, [id]);

//     const handleInputChange = (e, dayIndex, slotIndex, field) => {
//         const updatedSchedule = [...timetable.schedule];
//         updatedSchedule[dayIndex].timeSlots[slotIndex][field] = e.target.value;
//         setTimetable({ ...timetable, schedule: updatedSchedule });
//     };

//     const addTimeSlot = (dayIndex) => {
//         const updatedSchedule = [...timetable.schedule];
//         updatedSchedule[dayIndex].timeSlots.push({
//             subject: '',
//             teacher: '',
//             startTime: '',
//             endTime: ''
//         });
//         setTimetable({ ...timetable, schedule: updatedSchedule });
//     };

//     const removeTimeSlot = (dayIndex, slotIndex) => {
//         const updatedSchedule = [...timetable.schedule];
//         updatedSchedule[dayIndex].timeSlots.splice(slotIndex, 1);
//         setTimetable({ ...timetable, schedule: updatedSchedule });
//     };

//     const addDay = () => {
//         setTimetable({
//             ...timetable,
//             schedule: [
//                 ...timetable.schedule,
//                 { day: '', timeSlots: [{ subject: '', teacher: '', startTime: '', endTime: '' }] }
//             ]
//         });
//     };

//     const removeDay = (dayIndex) => {
//         const updatedSchedule = [...timetable.schedule];
//         updatedSchedule.splice(dayIndex, 1);
//         setTimetable({ ...timetable, schedule: updatedSchedule });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:5000/api/timetable/edit/${id}`, timetable);
//             alert('Timetable updated successfully');
//             navigate(-1);
//         } catch (error) {
//             console.error('Error updating timetable:', error);
//             alert('Failed to update timetable');
//         }
//     };

//     if (loading) return <div className="loading-spinner"></div>;
//     if (error) return <div className="error-message">Error: {error}</div>;

//     return (
//         <div className="edit-timetable-container">
//             <div className="edit-timetable-card">
//                 <h2 className="edit-timetable-title">Edit Timetable</h2>
                
//                 <form onSubmit={handleSubmit} className="edit-timetable-form">
//                     <div className="form-grid">
//                         <div className="form-group">
//                             <label className="form-label">Session</label>
//                             <input 
//                                 type="text" 
//                                 value={timetable.session} 
//                                 onChange={(e) => setTimetable({...timetable, session: e.target.value})} 
//                                 className="form-input"
//                                 required 
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label className="form-label">Department ID</label>
//                             <input 
//                                 type="text" 
//                                 value={timetable.department} 
//                                 onChange={(e) => setTimetable({...timetable, department: e.target.value})} 
//                                 className="form-input"
//                                 required 
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label className="form-label">Semester</label>
//                             <input 
//                                 type="text" 
//                                 value={timetable.semester} 
//                                 onChange={(e) => setTimetable({...timetable, semester: e.target.value})} 
//                                 className="form-input"
//                                 required 
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label className="form-label">Class Name</label>
//                             <input 
//                                 type="text" 
//                                 value={timetable.className} 
//                                 onChange={(e) => setTimetable({...timetable, className: e.target.value})} 
//                                 className="form-input"
//                                 required 
//                             />
//                         </div>
//                     </div>

//                     <div className="schedule-container">
//                         {timetable.schedule.map((daySchedule, dayIndex) => (
//                             <div key={dayIndex} className="day-card">
//                                 <div className="day-header">
//                                     <div className="form-group">
//                                         <label className="form-label">Day</label>
//                                         <select
//                                             value={daySchedule.day}
//                                             onChange={(e) => {
//                                                 const updatedSchedule = [...timetable.schedule];
//                                                 updatedSchedule[dayIndex].day = e.target.value;
//                                                 setTimetable({...timetable, schedule: updatedSchedule});
//                                             }}
//                                             className="form-select"
//                                             required
//                                         >
//                                             <option value="">Select Day</option>
//                                             <option value="Monday">Monday</option>
//                                             <option value="Tuesday">Tuesday</option>
//                                             <option value="Wednesday">Wednesday</option>
//                                             <option value="Thursday">Thursday</option>
//                                             <option value="Friday">Friday</option>
//                                             <option value="Saturday">Saturday</option>
//                                         </select>
//                                     </div>
//                                     <button 
//                                         type="button" 
//                                         className="btn btn-danger btn-sm"
//                                         onClick={() => removeDay(dayIndex)}
//                                         disabled={timetable.schedule.length <= 1}
//                                     >
//                                         × Remove Day
//                                     </button>
//                                 </div>

//                                 <div className="time-slots-container">
//                                     {daySchedule.timeSlots.map((slot, slotIndex) => (
//                                         <div key={slotIndex} className="time-slot-card">
//                                             <div className="slot-grid">
//                                                 <div className="form-group">
//                                                     <label className="form-label">Subject</label>
//                                                     <input
//                                                         type="text"
//                                                         value={slot.subject}
//                                                         onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'subject')}
//                                                         className="form-input"
//                                                         required
//                                                     />
//                                                 </div>
//                                                 <div className="form-group">
//                                                     <label className="form-label">Teacher</label>
//                                                     <input
//                                                         type="text"
//                                                         value={slot.teacher}
//                                                         onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'teacher')}
//                                                         className="form-input"
//                                                         required
//                                                     />
//                                                 </div>
//                                                 <div className="form-group">
//                                                     <label className="form-label">Start Time</label>
//                                                     <input
//                                                         type="time"
//                                                         value={slot.startTime}
//                                                         onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'startTime')}
//                                                         className="form-input"
//                                                         required
//                                                     />
//                                                 </div>
//                                                 <div className="form-group">
//                                                     <label className="form-label">End Time</label>
//                                                     <input
//                                                         type="time"
//                                                         value={slot.endTime}
//                                                         onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'endTime')}
//                                                         className="form-input"
//                                                         required
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <button
//                                                 type="button"
//                                                 className="btn btn-danger btn-sm slot-remove-btn"
//                                                 onClick={() => removeTimeSlot(dayIndex, slotIndex)}
//                                                 disabled={daySchedule.timeSlots.length <= 1}
//                                             >
//                                                 × Remove Slot
//                                             </button>
//                                         </div>
//                                     ))}
//                                     <button 
//                                         type="button" 
//                                         className="btn btn-secondary btn-sm"
//                                         onClick={() => addTimeSlot(dayIndex)}
//                                     >
//                                         + Add Time Slot
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}

//                         <div className="form-actions">
//                             <button 
//                                 type="button" 
//                                 className="btn btn-primary"
//                                 onClick={addDay}
//                             >
//                                 + Add New Day
//                             </button>
//                             <button type="submit" className="btn btn-success">Update Timetable</button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EditTimetable;