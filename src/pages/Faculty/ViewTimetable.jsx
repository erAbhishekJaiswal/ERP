import React, { useEffect, useState } from 'react';
import "../../CSSfolder/FacultyCSS/faculty.css"
import apiClient from '../../services/axios';
// import '../../CSSfolder/CommonCSS/allfile.css'

const ViewTimetable = ({ className }) => {
    const [timeTable, setTimeTable] = useState(null);

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const response = await apiClient.get(`/api/timetable/time/${className}`);
                    setTimeTable(response.data.timeTable);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTimetable();
    }, [className]);

    return (
        <div className='allcontainer'>
            <h2>Timetable for {className}</h2>
            {timeTable ? (
                <div className="timetable">
                    {timeTable.schedule.map((day) => (
                        <div key={day.day} className="day-schedule">
                            <h3>{day.day}</h3>
                            {day.timeSlots.map((slot, index) => (
                                <div key={index} className="time-slot">
                                    <p>Subject: {slot.subject}</p>
                                    <p>Teacher: {slot.teacher}</p>
                                    <p>Time: {slot.startTime} - {slot.endTime}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading timetable...</p>
            )}
        </div>
    );
};

export default ViewTimetable;
