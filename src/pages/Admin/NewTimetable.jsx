// import React, { useState } from "react";
// import axios from "axios";
// import "../../CSSfolder/AdminCSS/newtimetable.css";

// const NewTimetable = () => {
//   const [className, setClassName] = useState("");
//   const [session, setSession] = useState("");
//   const [department, setDepartment] = useState("");
//   const [semester, setSemester] = useState("");
//   const [schedule, setSchedule] = useState([
//     {
//       day: "",
//       timeSlots: [{ subject: "", teacher: "", startTime: "", endTime: "" }],
//     },
//   ]);

//   const userid = localStorage.getItem("userid");
//   const createdBy = userid;

//   const handleInputChange = (e, dayIndex, slotIndex, field) => {
//     const updatedSchedule = [...schedule];
//     updatedSchedule[dayIndex].timeSlots[slotIndex][field] = e.target.value;
//     setSchedule(updatedSchedule);
//   };

//   const addTimeSlot = (dayIndex) => {
//     const updatedSchedule = [...schedule];
//     updatedSchedule[dayIndex].timeSlots.push({
//       subject: "",
//       teacher: "",
//       startTime: "",
//       endTime: "",
//     });
//     setSchedule(updatedSchedule);
//   };

//   const removeTimeSlot = (dayIndex, slotIndex) => {
//     const updatedSchedule = [...schedule];
//     updatedSchedule[dayIndex].timeSlots.splice(slotIndex, 1);
    
//     // If no time slots left for the day, remove the entire day
//     if (updatedSchedule[dayIndex].timeSlots.length === 0) {
//       updatedSchedule.splice(dayIndex, 1);
//     }
    
//     setSchedule(updatedSchedule.length > 0 ? updatedSchedule : [
//       {
//         day: "",
//         timeSlots: [{ subject: "", teacher: "", startTime: "", endTime: "" }],
//       },
//     ]);
//   };

//   const addDay = () => {
//     setSchedule([
//       ...schedule,
//       {
//         day: "",
//         timeSlots: [{ subject: "", teacher: "", startTime: "", endTime: "" }],
//       },
//     ]);
//   };

//   const removeDay = (dayIndex) => {
//     const updatedSchedule = [...schedule];
//     updatedSchedule.splice(dayIndex, 1);
    
//     setSchedule(updatedSchedule.length > 0 ? updatedSchedule : [
//       {
//         day: "",
//         timeSlots: [{ subject: "", teacher: "", startTime: "", endTime: "" }],
//       },
//     ]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // const response = await axios.post(
//       //   "http://localhost:5000/api/timetable/time/create",
//       //   { className, schedule, createdBy }
//       // );
//       console.log( {className, schedule, createdBy, department, session, semester})
//       const response = await axios.post(
//         "http://localhost:5000/api/timetable/time/create",
//         { className, session, department, semester, schedule, createdBy }
//       );
      
//       alert(response.data.message);
//       // Clear form after successful creation
//       setSession("");
//       setDepartment("");
//       setSemester("");
//       setClassName("");
//       setSchedule([
//         {
//           day: "",
//           timeSlots: [{ subject: "", teacher: "", startTime: "", endTime: "" }],
//         },
//       ]);
//     } catch (error) {
//       console.error("Error creating timetable:", error);
//       alert("Error creating timetable. Please try again.");
//     }
//   };

//   return (
//     // <div className="allcontainer">
//       <div className="timetable-container-outter-box">
//         <h2 className="timetable-title">Create Timetable</h2>
//         <form className="timetable-form-container" onSubmit={handleSubmit}>
//           <div className="all-div-box">
//             <div className="timetable-form-div">
//               <div className="form-div">Session:</div>
//               <input
//                 className="timetable-form-input"
//                 type="text"
//                 value={session}
//                 onChange={(e) => setSession(e.target.value)}
//                 required
//                 placeholder="e.g., 2023-2024"
//               />
//             </div>
//             <div className="timetable-form-div">
//               <div className="form-div">Department:</div>
//               <input
//                 className="timetable-form-input"
//                 type="text"
//                 value={department}
//                 onChange={(e) => setDepartment(e.target.value)}
//                 required
//                 placeholder="e.g., Computer Science"
//               />
//             </div>
//             <div className="timetable-form-div">
//               <div className="form-div">Semester:</div>
//               <input
//                 className="timetable-form-input"
//                 type="number"
//                 min="1"
//                 max="8"
//                 value={semester}
//                 onChange={(e) => setSemester(e.target.value)}
//                 required
//                 placeholder="e.g., 3"
//               />
//             </div>
//             <div className="timetable-form-div">
//               <div className="form-div">Class Name:</div>
//               <input
//                 className="timetable-form-input"
//                 type="text"
//                 value={className}
//                 onChange={(e) => setClassName(e.target.value)}
//                 required
//                 placeholder="e.g., CS-3A"
//               />
//             </div>
//           </div>

//           {schedule.map((daySchedule, dayIndex) => (
//             <div key={dayIndex} className="daytable-section">
//               <div className="date-table-box">
//                 <div className="day-salection-box">
//                   <div className="form-div">Day:</div>
//                   <select
//                     className="day-salection-select"
//                     value={daySchedule.day}
//                     onChange={(e) => {
//                       const updatedSchedule = [...schedule];
//                       updatedSchedule[dayIndex].day = e.target.value;
//                       setSchedule(updatedSchedule);
//                     }}
//                     required
//                   >
//                     <option value="">Select Day</option>
//                     <option value="Monday">Monday</option>
//                     <option value="Tuesday">Tuesday</option>
//                     <option value="Wednesday">Wednesday</option>
//                     <option value="Thursday">Thursday</option>
//                     <option value="Friday">Friday</option>
//                     <option value="Saturday">Saturday</option>
//                   </select>
//                 </div>
//                 <div className="cancelbtn-box">
//                   <button 
//                     type="button"
//                     className="cancelbtn danger-btn"
//                     onClick={() => removeDay(dayIndex)}
//                     disabled={schedule.length <= 1}
//                   >
//                     Remove Day
//                   </button>
//                 </div>
//               </div>

//               {daySchedule.timeSlots.map((slot, slotIndex) => (
//                 <div key={slotIndex} className="time-slot-section">
//                   <div className="subject-teacher-section-box">
//                     <div className="subject-box">
//                       <div className="form-div">Subject:</div>
//                       <input
//                         className="sub-teacher-input"
//                         type="text"
//                         value={slot.subject}
//                         onChange={(e) =>
//                           handleInputChange(e, dayIndex, slotIndex, "subject")
//                         }
//                         required
//                         placeholder="e.g., Data Structures"
//                       />
//                     </div>
//                     <div className="teacher-box">
//                       <div className="form-div">Teacher:</div>
//                       <input
//                         className="sub-teacher-input"
//                         type="text"
//                         value={slot.teacher}
//                         onChange={(e) =>
//                           handleInputChange(e, dayIndex, slotIndex, "teacher")
//                         }
//                         required
//                         placeholder="e.g., Dr. Smith"
//                       />
//                     </div>
//                     <div className="cancelbtn-box">
//                       <button 
//                         type="button"
//                         className="cancelbtn danger-btn"
//                         onClick={() => removeTimeSlot(dayIndex, slotIndex)}
//                         disabled={daySchedule.timeSlots.length <= 1}
//                       >
//                         Remove Slot
//                       </button>
//                     </div>
//                   </div>
//                   <div className="start-end-time-box">
//                     <div className="start-time-box">
//                       <div className="form-div">Start Time:</div>
//                       <input
//                         className="time-input-box"
//                         type="time"
//                         value={slot.startTime}
//                         onChange={(e) =>
//                           handleInputChange(e, dayIndex, slotIndex, "startTime")
//                         }
//                         required
//                       />
//                     </div>
//                     <div className="end-time-box">
//                       <div className="form-div">End Time:</div>
//                       <input
//                         className="time-input-box"
//                         type="time"
//                         value={slot.endTime}
//                         onChange={(e) =>
//                           handleInputChange(e, dayIndex, slotIndex, "endTime")
//                         }
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 className="newadd-slot-btn"
//                 onClick={() => addTimeSlot(dayIndex)}
//               >
//                 + Add Time Slot
//               </button>
//             </div>
//           ))}
          
//           <div className="form-actions-box">
//             <button 
//               type="button" 
//               className="newadd-day-btn"
//               onClick={addDay}
//             >
//               + Add Day
//             </button>
            
//             <div className="created-by-section">
//               <div className="form-div">Created By (User ID):</div>
//               <input 
//                 type="text" 
//                 className="read-only-input"
//                 value={userid} 
//                 readOnly 
//                 required 
//               />
//             </div>
            
//             <button type="submit" className="submit-btn success-btn">
//               Create Timetable
//             </button>
//           </div>
//         </form>
//       </div>
//     // </div>
//   );
// };

// export default NewTimetable;














import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../CSSfolder/AdminCSS/newtimetable.css";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/axios";

const NewTimetable = () => {
  const navigate = useNavigate();
  const [className, setClassName] = useState("");
  const [session, setSession] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [schedule, setSchedule] = useState([
    {
      day: "",
      timeSlots: [{ subject: "", teacher: "", startTime: "", endTime: "" }],
    },
  ]);

  // Options data states
  const [departments, setDepartments] = useState([]);
  // const [sessions, setSessions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const userid = localStorage.getItem("userid");
  const createdBy = userid;

  // Fetch options data on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch departments
        const deptResponse = await apiClient.get("/api/features/getdepartmentname");
        setDepartments(deptResponse.data);
        // console.log(deptResponse.data);
        
        
        // Fetch sessions (you might need to create an endpoint for this)
        // const sessionResponse = await axios.get("http://localhost:5000/api/sessions");
        // setSessions(sessionResponse.data);
        
        // Fetch teachers
        const teachersResponse = await apiClient.get("/api/faculty/allfacultyname");
        setTeachers(teachersResponse.data);
        console.log(teachersResponse.data);
        
        
        // Fetch subjects (you might need to create an endpoint for this)
        const subjectsResponse = await apiClient.get("/api/features/subjectcodenamelist");
        setSubjects(subjectsResponse.data.subjectNames);
        // console.log(subjectsResponse.data.subjectNames);
        
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    
    fetchOptions();
  }, []);

  const handleInputChange = (e, dayIndex, slotIndex, field) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].timeSlots[slotIndex][field] = e.target.value;
    setSchedule(updatedSchedule);
  };

  const addTimeSlot = (dayIndex) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].timeSlots.push({
      subject: "",
      teacher: "",
      startTime: "",
      endTime: "",
    });
    setSchedule(updatedSchedule);
  };

  const removeTimeSlot = (dayIndex, slotIndex) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].timeSlots.splice(slotIndex, 1);
    
    // If no time slots left for the day, remove the entire day
    if (updatedSchedule[dayIndex].timeSlots.length === 0) {
      updatedSchedule.splice(dayIndex, 1);
    }
    
    setSchedule(updatedSchedule.length > 0 ? updatedSchedule : [
      {
        day: "",
        timeSlots: [{ subject: "", teacher: "", startTime: "", endTime: "" }],
      },
    ]);
  };

  const addDay = () => {
    setSchedule([
      ...schedule,
      {
        day: "",
        timeSlots: [{ subject: "", teacher: "", startTime: "", endTime: "" }],
      },
    ]);
  };

  const removeDay = (dayIndex) => {
    const updatedSchedule = [...schedule];
    updatedSchedule.splice(dayIndex, 1);
    
    setSchedule(updatedSchedule.length > 0 ? updatedSchedule : [
      {
        day: "",
        timeSlots: [{ subject: "", teacher: "", startTime: "", endTime: "" }],
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({className, schedule, createdBy, department, session, semester})
      const response = await apiClient.post(
        "/api/timetable/time/create",
        { className, session, department, semester, schedule, createdBy }
      );
      
      alert(response.data.message);

      navigate("/admin/viewalltimetables");
      // Clear form after successful creation
      // setSession("");
      // setDepartment("");
      // setSemester("");
      // setClassName("");
      // setSchedule([
      //   {
      //     day: "",
      //     timeSlots: [{ subject: "", teacher: "", startTime: "", endTime: "" }],
      //   },
      // ]);
    } catch (error) {
      console.error("Error creating timetable:", error);
      alert("Error creating timetable. Please try again.");
    }
  };

  return (
    <div className="timetable-container-outter-box">
      <h2 className="timetable-title">Create Timetable</h2>
      <form className="timetable-form-container" onSubmit={handleSubmit}>
        <div className="all-div-box">
          <div className="timetable-form-div">
            <div className="form-div">Session:</div>
            <select
              className="timetable-select-input"
              value={session}
              onChange={(e) => setSession(e.target.value)}
              required
            >
              <option value="">Select Session</option>
              <option value="2020-2021">2020-2021</option>
              <option value="2021-2022">2021-2022</option>
              <option value="2022-2023">2022-2023</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2026-2027">2026-2027</option>
              <option value="2027-2028">2027-2028</option>
              <option value="2028-2029">2028-2029</option>
              <option value="2029-2030">2029-2030</option>
              <option value="2030-2031">2030-2031</option>
            </select>
          </div>
          <div className="timetable-form-div">
            <div className="form-div">Department:</div>
            <select
              className="timetable-select-input"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div className="timetable-form-div">
            <div className="form-div">Semester:</div>
            <select
              className="timetable-select-input"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            >
              <option value="">Select Semester</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option>
            </select>
          </div>
          <div className="timetable-form-div">
            <div className="form-div">Class Name:</div>
            <input
              className="timetable-form-input"
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
              placeholder="e.g., CS-3A"
            />
          </div>
        </div>

        {schedule.map((daySchedule, dayIndex) => (
          <div key={dayIndex} className="daytable-section">
            <div className="date-table-box">
              <div className="day-salection-box">
                <div className="form-div">Day:</div>
                <select
                  className="day-salection-select"
                  value={daySchedule.day}
                  onChange={(e) => {
                    const updatedSchedule = [...schedule];
                    updatedSchedule[dayIndex].day = e.target.value;
                    setSchedule(updatedSchedule);
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
              <div className="cancelbtn-box">
                <button 
                  type="button"
                  className="cancelbtn danger-btn"
                  onClick={() => removeDay(dayIndex)}
                  disabled={schedule.length <= 1}
                >
                  Remove Day
                </button>
              </div>
            </div>

            {daySchedule.timeSlots.map((slot, slotIndex) => (
              <div key={slotIndex} className="time-slot-section">
                <div className="subject-teacher-section-box">
                  <div className="subject-box">
                    <div className="form-div">Subject:</div>
                    <select
                      className="sub-teacher-select"
                      value={slot.subject}
                      onChange={(e) =>
                        handleInputChange(e, dayIndex, slotIndex, "subject")
                      }
                      required
                    >
                      <option value="">Select Subject</option>
                      {subjects
                        // .filter(subject => subject.department === department && subject.semester === semester)
                        .map((subject) => (
                          <option key={subject._id} value={subject.name}>
                            {subject.name} ({subject.code})
                          </option>
                      ))}
                    </select>
                  </div>
                  <div className="teacher-box">
                    <div className="form-div">Teacher:</div>
                    <select
                      className="sub-teacher-select"
                      value={slot.teacher}
                      onChange={(e) =>
                        handleInputChange(e, dayIndex, slotIndex, "teacher")
                      }
                      required
                    >
                      <option value="">Select Teacher</option>
                      {teachers
                        // .filter(teacher => teacher.department === department)
                        .map((teacher) => (
                          // ({const teacherName = teacher.personal_details.first_name && teacher.personal_details.last_name}),
                          <option key={teacher._id} value={teacher.personal_details.first_name +" "+ teacher.personal_details.last_name}>
                            {teacher.personal_details.first_name} {teacher.personal_details.last_name}
                          </option>
                      ))}
                    </select>
                  </div>
                  <div className="cancelbtn-box">
                    <button 
                      type="button"
                      className="cancelbtn danger-btn"
                      onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                      disabled={daySchedule.timeSlots.length <= 1}
                    >
                      Remove Slot
                    </button>
                  </div>
                </div>
                <div className="start-end-time-box">
                  <div className="start-time-box">
                    <div className="form-div">Start Time:</div>
                    <input
                      className="time-input-box"
                      type="time"
                      value={slot.startTime}
                      onChange={(e) =>
                        handleInputChange(e, dayIndex, slotIndex, "startTime")
                      }
                      required
                    />
                  </div>
                  <div className="end-time-box">
                    <div className="form-div">End Time:</div>
                    <input
                      className="time-input-box"
                      type="time"
                      value={slot.endTime}
                      onChange={(e) =>
                        handleInputChange(e, dayIndex, slotIndex, "endTime")
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="newadd-slot-btn"
              onClick={() => addTimeSlot(dayIndex)}
            >
              + Add Time Slot
            </button>
          </div>
        ))}
        
        <div className="form-actions-box">
          <button 
            type="button" 
            className="newadd-day-btn"
            onClick={addDay}
          >
            + Add Day
          </button>
          
          <div className="created-by-section">
            <div className="form-div">Created By (User ID):</div>
            <input 
              type="text" 
              className="read-only-input"
              value={userid} 
              readOnly 
              required 
            />
          </div>
          
          <button type="submit" className="submit-btn success-btn">
            Create Timetable
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTimetable;