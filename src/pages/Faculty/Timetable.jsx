// import React from 'react';
import "../../CSSfolder/FacultyCSS/faculty.css"

// const Timetable = () => {
//   return (
//     <>
//      <div className="facultydashcontainer">
//     <h1>Timetable</h1>    
//     </div> 
//     </>
//   )
// }

// export default Timetable










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../CSSfolder/FacultyCSS/facultytimetable.css"
import {Link} from 'react-router-dom';
import '../../CSSfolder/CommonCSS/allfile.css'
import apiClient from "../../services/axios";
// import './Timetable.css'; // Importing CSS file for styling

const Timetable = () => {
    const [className, setClassName] = useState('');
    const [session, setSession] = useState('');
    const [department, setDepartment] = useState('');
    const [semester,setSemester] = useState('');
    const [schedule, setSchedule] = useState([{ day: '', timeSlots: [{ subject: '', teacher: '', startTime: '', endTime: '' }] }]);
    const [createdBy, setCreatedBy] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [timeTables, setTimeTables] = useState([]);
    const [selectedTimeTable, setSelectedTimeTable] = useState(null);
    const [timetableId, setTimetableId] = useState(null);

    // Function to handle input change in the form
    const handleInputChange = (e, dayIndex, slotIndex, field) => {
        const updatedSchedule = [...schedule];
        updatedSchedule[dayIndex].timeSlots[slotIndex][field] = e.target.value;
        setSchedule(updatedSchedule);
    };

    // Handle adding new time slots for a day
    const addTimeSlot = (dayIndex) => {
        const updatedSchedule = [...schedule];
        updatedSchedule[dayIndex].timeSlots.push({ subject: '', teacher: '', startTime: '', endTime: '' });
        setSchedule(updatedSchedule);
    };

    // Add a new day to the schedule
    const addDay = () => {
        setSchedule([...schedule, { day: '', timeSlots: [{ subject: '', teacher: '', startTime: '', endTime: '' }] }]);
    };

    // Handle form submission for creating/editing timetable
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await apiClient.put(`/api/timetable/edit/${timetableId}`, { className, schedule, createdBy });
            } else {
                await apiClient.post('/api/timetable/time/create', { className, schedule, createdBy, department, semester,session });
            }
            // Fetch updated timetable data after creation or edit
            fetchTimeTables();
        } catch (error) {
            console.error('Error creating/editing timetable:', error);
        }
    };

    // Fetch timetables from the server
    const fetchTimeTables = async () => {
        try {
            const res = await apiClient.get('/api/timetable/alltimetable');
            setTimeTables(res.data);
        } catch (error) {
            console.error('Error fetching timetables:', error);
        }
    };

    // Handle editing an existing timetable
    const handleEdit = (timeTable) => {
        setClassName(timeTable.className);
        setSchedule(timeTable.schedule);
        setCreatedBy(timeTable.createdBy);
        setSelectedTimeTable(timeTable);
        setTimetableId(timeTable._id);
        setEditMode(true);
    };

    // Handle resetting form after editing
    const handleCancelEdit = () => {
        setEditMode(false);
        setClassName('');
        setSchedule([{ day: '', timeSlots: [{ subject: '', teacher: '', startTime: '', endTime: '' }] }]);
        setCreatedBy('');
    };

    // Handle deleting a timetable
    const handleDelete = async (id) => {
        try {
            await apiClient.delete(`/api/timetable/deletetimetable/${id}`);
            fetchTimeTables(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting timetable:', error);
        }
    };

    // Fetch timetables on component mount
    useEffect(() => {
        fetchTimeTables();
    }, []);

    return (
        <div className="allcontainer">
        <div className="timetable-container">
            <h2>{editMode ? 'Edit Timetable' : 'Create Timetable'}</h2>
            <form onSubmit={handleSubmit} className="timetable-form">
                <label>
                    Class Name:
                    <input id="classinputbox" type="text" value={className} onChange={(e) => setClassName(e.target.value)} required />
                </label>

                {schedule.map((daySchedule, dayIndex) => (
                    <div key={dayIndex} className="day-section">
                        <label>
                            Day:


                            {/* <input
                                type="text"
                                id="daytimebox"
                                value={daySchedule.day}
                                onChange={(e) => {
                                    const updatedSchedule = [...schedule];
                                    updatedSchedule[dayIndex].day = e.target.value;
                                    setSchedule(updatedSchedule);
                                }}
                                required
                            /> */}


                            <select name="Day" id="daytimebox" value={daySchedule.day}
                                onChange={(e) => {
                                    const updatedSchedule = [...schedule];
                                    updatedSchedule[dayIndex].day = e.target.value;
                                    setSchedule(updatedSchedule);
                                }}
                                required>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                {/* <option value="Sunday">Sunday</option> */}
                            </select>
                        </label>

                        {daySchedule.timeSlots.map((slot, slotIndex) => (
                            <div key={slotIndex} className="slot-section">
                                <label>
                                    Subject:
                                    <input
                                        id="tableinputbox"
                                        type="text"
                                        value={slot.subject}
                                        onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'subject')}
                                        required
                                    />
                                </label>
                                <label>
                                    Teacher:
                                    <input
                                        id="tableinputbox"
                                        type="text"
                                        value={slot.teacher}
                                        onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'teacher')}
                                        required
                                    />
                                </label>
                                <label>
                                    Start Time:
                                    <input
                                        type="text"
                                        id="tableinputbox"
                                        value={slot.startTime}
                                        onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'startTime')}
                                        required
                                    />
                                </label>
                                <label>
                                    End Time:
                                    <input
                                        type="text"
                                        id="tableinputbox"
                                        value={slot.endTime}
                                        onChange={(e) => handleInputChange(e, dayIndex, slotIndex, 'endTime')}
                                        required
                                    />
                                </label>
                            </div>
                        ))}
                        <button type="button" className="add-slot-btn" onClick={() => addTimeSlot(dayIndex)}>
                            Add Time Slot
                        </button>
                    </div>
                ))}
                <button type="button" className="add-day-btn" onClick={addDay}>
                    Add Day
                </button>

                <label>
                    Created By (User ID):
                    <input type="text" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} required />
                </label>

                <button type="submit" className="submit-btn">
                    {editMode ? 'Update Timetable' : 'Create Timetable'}
                </button>

                {editMode && <button type="button" onClick={handleCancelEdit} className="cancel-edit-btn">Cancel Edit</button>}
            </form>

            <h2>View Timetables</h2>
            <div className="timetable-list">
                {timeTables.map((timeTable) => (
                    <div key={timeTable._id} className="timetable-card">
                        <h3>Class: {timeTable.className}</h3>
                        {timeTable.schedule.map((day, index) => (
                            <div key={index}>
                                <h4>{day.day}</h4>
                                {day.timeSlots.map((slot, slotIndex) => (
                                    <p key={slotIndex}>
                                        {slot.subject} ({slot.startTime} - {slot.endTime}) - {slot.teacher}
                                    </p>
                                ))}
                            </div>
                        ))}
                        <button onClick={() => handleEdit(timeTable)} className="edit-btn"><Link to={`/timetable/${timeTable._id}`}>Edit</Link></button>
                        <button onClick={() => handleDelete(timeTable._id)} className="delete-btn">Delete</button>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default Timetable;

