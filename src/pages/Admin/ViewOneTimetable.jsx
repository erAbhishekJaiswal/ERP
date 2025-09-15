// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "../../CSSfolder/FacultyCSS/facultytimetable.css";
// import '../../CSSfolder/CommonCSS/allfile.css'

// const ViewOneTimetable = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [timeTable, setTimeTable] = useState();

//   useEffect(() => {
//     const fetchTimeTable = async (id) => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/timetable/time/${id}`);
//         setTimeTable(res.data);
//         console.log(res.data);

//       } catch (error) {
//         console.error('Error fetching timetables:', error);
//       }
//     };
//     fetchTimeTable(id);
//   }, [id]);

//   const handleEdit = () => {
//     // Navigate to Page 2 and send dataset
//     navigate(`/edittimetable/${id}`, { state: { timeTable } });
//   };

//   if (!timeTable) {
//     return <div>Loading...</div>;
//   } else {

//     return (
//       <div className="allcontainer">
//       <div className="timetable-container">
//         <h3>Class: {timeTable.className}</h3>
//         <div className="timetable-card">
//           <div className="collagename">Ashoka Instiute of Technology and Management Varansi</div>
//           {timeTable.dipartment ? <div className="dipartment">Dipartment: {timeTable.dipartment}</div> : <div className="dipartment">Dipartment: Computer Science</div>}
//           {timeTable.session ? <div className="dipartment">Session: {timeTable.session}</div> : <div className="dipartment">Session: 2024-2025</div>}
//           {timeTable.semester ? <div className="dipartment">Semester: {timeTable.semester}th </div> : <div className="dipartment">Semester: 7th</div>}
//           <h2>Class: {timeTable.className}</h2>
//           {timeTable.schedule.map((day) => (
//             <div key={day._id} className="allday-schedule">
//               <h4>{day.day}</h4>
//               {day.timeSlots.map((slot) => (
//                 <div key={slot._id} className="alltime-slot">
//                   <p>Subject: {slot.subject}</p>
//                   <p>Teacher: {slot.teacher}</p>
//                   <p>Time: {slot.startTime} - {slot.endTime}</p>
//                 </div>
//               ))}
//             </div>
//           ))}
//           <p>Created At: {timeTable.createdAt}</p>
//           <p>Updated At: {timeTable.updatedAt}</p>
//         </div>

//         <button className="editbtn" onClick={handleEdit}>Edit</button>
//       </div>
//       </div>
//       );
//   }
// };

// export default ViewOneTimetable;















import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../CSSfolder/AdminCSS/ViewTimetable.css"
// import "../../CSSfolder/FacultyCSS/facultytimetable.css";
// import '../../CSSfolder/CommonCSS/allfile.css';
import apiClient from '../../services/axios';

const ViewOneTimetable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeTable, setTimeTable] = useState();
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchTimeTable = async (id) => {
      try {
        const res = await apiClient.get(`/api/timetable/time/${id}`);
        setTimeTable(res.data);
        console.log(res.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching timetables:', error);
        setLoading(false);
      }
    };
    fetchTimeTable(id);
  }, [id]);

  const handleEdit = () => {
    navigate(`/admin/edittimetable/${timeTable._id}`)
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading timetable...</p>
      </div>
    );
  }

  if (!timeTable) {
    return (
      <div className="error-container">
        <p>No timetable data available.</p>
      </div>
    );
  }

  return (
    <div className="timetable-view-container">
      <div className="timetable-header">
        <h1 className="institute-name">Ashoka Institute of Technology and Management Varanasi</h1>
        <div className="timetable-meta">
          <div className="timetable-meta-item">
            <span className="timetable-meta-label">Department: </span>
            <span className="timetable-meta-value meta-value"> { timeTable.department || "Computer Science"}</span>
          </div>
          <div className="timetable-meta-item">
            <span className="timetable-meta-label">Session: </span>
            <span className="timetable-meta-value meta-value">{ timeTable.session || "2024-2025"}</span>
          </div>
          <div className="timetable-meta-item">
            <span className="timetable-meta-label">Semester: </span>
            <span className="timetable-meta-value meta-value">{ timeTable.semester ? `${timeTable.semester}th` : "7th"}</span>
          </div>
          <div className="timetable-meta-item">
            <span className="timetable-meta-label">Class: </span>
            <span className="timetable-meta-value meta-value">{ timeTable.className}</span>
          </div>
        </div>
      </div>

      <div className="timetable-grid">
        {timeTable.schedule.map((day) => (
          <div key={day._id} className="day-column">
            <div className="day-header">{day.day}</div>
            <div className="time-slots">
              {day.timeSlots.map((slot) => (
                <div key={slot._id} className="time-slot">
                  <div className="slot-subject">{slot.subject}</div>
                  <div className="slot-teacher">{slot.teacher}</div>
                  <div className="slot-time">{slot.startTime} - {slot.endTime}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="timetable-footer">
        <div className="timestamp">
          <span>Created: {new Date(timeTable.createdAt).toLocaleString()}</span>
          <span>Updated: {new Date(timeTable.updatedAt).toLocaleString()}</span>
        </div>
        {role === 'Registrar' ? <>
        <button className="edit-button" onClick={handleEdit}>
          <i className="fas fa-edit"></i> Edit Timetable
        </button>
        </> : <></>}
        
      </div>
    </div>
  );
};

export default ViewOneTimetable;