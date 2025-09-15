// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "../../CSSfolder/FacultyCSS/facultytimetable.css";
// import '../../CSSfolder/CommonCSS/allfile.css'
// import { Link } from 'react-router-dom';
// const ViewallTimetable = () => {
//     const [timeTables, setTimeTables] = useState([]);

//     // Fetch all timetables from the server
//     const fetchTimeTables = async () => {
//         try {
//             const res = await axios.get('/api/timetable/alltimetable');
//             setTimeTables(res.data);
//         } catch (error) {
//             console.error('Error fetching timetables:', error);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`/api/timetable/deletetimetable/${id}`);
//             fetchTimeTables(); // Refresh the list after deletion
//         } catch (error) {
//             console.error('Error deleting timetable:', error);
//         }
//     };

//     useEffect(() => {
//         fetchTimeTables();
//     }, []);

//     if (!timeTables) {
//         return <div>Loading...</div>;
//     }else{
//     return (
//         <>
//         <div className="allcontainer">
//             <div className="timetable-container">
//                 <h2>All Timetables</h2>
//                 <div className="timetable-list">
//                     {timeTables.map((timeTable) => (
//                         <div key={timeTable._id} className="alltimetable-card">
//                             <h3>Class: {timeTable.className}</h3>
//                             {/* {timeTable.schedule.map((day, index) => (
//                             <div key={index}>
//                                 <h4>{day.day}</h4>
//                                 {day.timeSlots.map((slot, slotIndex) => (
//                                     <p key={slotIndex}>
//                                         {slot.subject} ({slot.startTime} - {slot.endTime}) - {slot.teacher}
//                                     </p>
//                                 ))}
//                             </div>
//                         ))} */}
//                             {/* <button
//                         // onClick={() => onEdit(timeTable)}
//                          className="edit-btn">
//                             <Link to={`/edittimetable/${timeTable._id}`} >Edit</Link>
//                                 </button> */}
//                             <div className="buttondiv">
//                                 <button className="edit-btn">  <Link to={`/viewonetimetable/${timeTable._id}`} >View</Link></button>
//                                 <button onClick={() => handleDelete(timeTable._id)} className="delete-btn">Delete</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//         </>
//     );}
// }

// export default ViewallTimetable

import React, { useState,useEffect } from "react";
import "../../CSSfolder/AdminCSS/TimetableSystem.css";
import axios from "axios";
import { useNavigate } from  "react-router-dom";
import apiClient from "../../services/axios";

const ViewallTimetable = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("view");
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [timetableData, setTimetableData] = useState();
  const [loading, setLoading] =useState(true);
  const role = localStorage.getItem("role");

  // Your provided dataset
  // const timetableData = [
  //   {
  //     _id: "6714f7470069dedb67f6632b",
  //     className: "Class 1",
  //     schedule: [
  //       {
  //         day: "Monday",
  //         timeSlots: [
  //           {
  //             subject: "Mathematics",
  //             teacher: "John Doe",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "67140d8f836eeaba1a2f71ef",
  //           },
  //           {
  //             subject: "Science",
  //             teacher: "Jane Smith",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "67140d8f836eeaba1a2f71f0",
  //           },
  //           {
  //             subject: "English",
  //             teacher: "Emily Brown",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "67140d8f836eeaba1a2f71f1",
  //           },
  //           {
  //             subject: "Computer",
  //             teacher: "Tenali Rama",
  //             startTime: "01:00",
  //             endTime: "01:30",
  //             _id: "6714fc73ea87243a9570e746",
  //           },
  //         ],
  //         _id: "67140d8f836eeaba1a2f71ee",
  //       },
  //       {
  //         day: "Tuesday",
  //         timeSlots: [
  //           {
  //             subject: "History",
  //             teacher: "Michael Green",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "67140d8f836eeaba1a2f71f3",
  //           },
  //           {
  //             subject: "Mathematics",
  //             teacher: "John Doe",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "67140d8f836eeaba1a2f71f4",
  //           },
  //           {
  //             subject: "Physical Education",
  //             teacher: "James White",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "67140d8f836eeaba1a2f71f5",
  //           },
  //         ],
  //         _id: "67140d8f836eeaba1a2f71f2",
  //       },
  //       {
  //         day: "Wednesday",
  //         timeSlots: [
  //           {
  //             subject: "Science",
  //             teacher: "Jane Smith",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "67140d8f836eeaba1a2f71f7",
  //           },
  //           {
  //             subject: "Geography",
  //             teacher: "Linda Johnson",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "67140d8f836eeaba1a2f71f8",
  //           },
  //           {
  //             subject: "English",
  //             teacher: "Emily Brown",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "67140d8f836eeaba1a2f71f9",
  //           },
  //         ],
  //         _id: "67140d8f836eeaba1a2f71f6",
  //       },
  //       {
  //         day: "Thursday",
  //         timeSlots: [
  //           {
  //             subject: "Mathematics",
  //             teacher: "John Doe",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "67140d8f836eeaba1a2f71fb",
  //           },
  //           {
  //             subject: "Science",
  //             teacher: "Jane Smith",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "67140d8f836eeaba1a2f71fc",
  //           },
  //           {
  //             subject: "English",
  //             teacher: "Emily Brown",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "67140d8f836eeaba1a2f71fd",
  //           },
  //         ],
  //         _id: "67140d8f836eeaba1a2f71fa",
  //       },
  //       {
  //         day: "Friday",
  //         timeSlots: [
  //           {
  //             subject: "History",
  //             teacher: "Michael Green",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "67140d8f836eeaba1a2f71ff",
  //           },
  //           {
  //             subject: "Mathematics",
  //             teacher: "John Doe",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "67140d8f836eeaba1a2f7200",
  //           },
  //           {
  //             subject: "Physical Education",
  //             teacher: "James White",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "67140d8f836eeaba1a2f7201",
  //           },
  //         ],
  //         _id: "67140d8f836eeaba1a2f71fe",
  //       },
  //     ],
  //     createdBy: "651b24d8b8f7610012345678",
  //     createdAt: "2024-10-19T19:50:39.942Z",
  //     updatedAt: "2024-11-17T13:53:10.325Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "671543cfac126b3dc874c85f",
  //     className: "CSE4year",
  //     schedule: [
  //       {
  //         day: "Monday",
  //         timeSlots: [
  //           {
  //             subject: "Mathematics",
  //             teacher: "John Doe",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "671543cfac126b3dc874c861",
  //           },
  //           {
  //             subject: "Science",
  //             teacher: "Jane Smith",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "671543cfac126b3dc874c862",
  //           },
  //           {
  //             subject: "English",
  //             teacher: "Emily Brown",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "671543cfac126b3dc874c863",
  //           },
  //         ],
  //         _id: "671543cfac126b3dc874c860",
  //       },
  //       {
  //         day: "Tuesday",
  //         timeSlots: [
  //           {
  //             subject: "History",
  //             teacher: "Michael Green",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "671543cfac126b3dc874c865",
  //           },
  //           {
  //             subject: "Mathematics",
  //             teacher: "John Doe",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "671543cfac126b3dc874c866",
  //           },
  //           {
  //             subject: "Physical Education",
  //             teacher: "James White",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "671543cfac126b3dc874c867",
  //           },
  //         ],
  //         _id: "671543cfac126b3dc874c864",
  //       },
  //       {
  //         day: "Wednesday",
  //         timeSlots: [
  //           {
  //             subject: "Science",
  //             teacher: "Jane Smith",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "671543cfac126b3dc874c869",
  //           },
  //           {
  //             subject: "Geography",
  //             teacher: "Linda Johnson",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "671543cfac126b3dc874c86a",
  //           },
  //           {
  //             subject: "English",
  //             teacher: "Emily Brown",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "671543cfac126b3dc874c86b",
  //           },
  //         ],
  //         _id: "671543cfac126b3dc874c868",
  //       },
  //       {
  //         day: "Thursday",
  //         timeSlots: [
  //           {
  //             subject: "Mathematics",
  //             teacher: "John Doe",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "671543cfac126b3dc874c86d",
  //           },
  //           {
  //             subject: "Science",
  //             teacher: "Jane Smith",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "671543cfac126b3dc874c86e",
  //           },
  //           {
  //             subject: "English",
  //             teacher: "Emily Brown",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "671543cfac126b3dc874c86f",
  //           },
  //         ],
  //         _id: "671543cfac126b3dc874c86c",
  //       },
  //       {
  //         day: "Friday",
  //         timeSlots: [
  //           {
  //             subject: "History",
  //             teacher: "Michael Green",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "671543cfac126b3dc874c871",
  //           },
  //           {
  //             subject: "Mathematics",
  //             teacher: "John Doe",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "671543cfac126b3dc874c872",
  //           },
  //           {
  //             subject: "Physical Education",
  //             teacher: "James White",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "671543cfac126b3dc874c873",
  //           },
  //         ],
  //         _id: "671543cfac126b3dc874c870",
  //       },
  //     ],
  //     createdBy: "651b24d8b8f7610012345678",
  //     createdAt: "2024-10-20T17:54:23.394Z",
  //     updatedAt: "2024-10-20T17:54:23.394Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "6715441dac126b3dc874c875",
  //     className: "CSE3year",
  //     schedule: [
  //       {
  //         day: "Monday",
  //         timeSlots: [
  //           {
  //             subject: "math",
  //             teacher: "modi",
  //             startTime: "01:00",
  //             endTime: "01:30",
  //             _id: "6715441dac126b3dc874c877",
  //           },
  //           {
  //             subject: "physics",
  //             teacher: "yogi",
  //             startTime: "02:00",
  //             endTime: "02:30",
  //             _id: "6715441dac126b3dc874c878",
  //           },
  //         ],
  //         _id: "6715441dac126b3dc874c876",
  //       },
  //       {
  //         day: "Tuesday",
  //         timeSlots: [
  //           {
  //             subject: "math",
  //             teacher: "modi",
  //             startTime: "01:00",
  //             endTime: "01:30",
  //             _id: "6715441dac126b3dc874c87a",
  //           },
  //         ],
  //         _id: "6715441dac126b3dc874c879",
  //       },
  //     ],
  //     createdBy: "6914f7470069dedb67f6632b",
  //     createdAt: "2024-10-20T17:55:41.465Z",
  //     updatedAt: "2024-10-20T17:55:41.465Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "6739b23dcff5a74d5cc25f0b",
  //     className: "CSE4year",
  //     schedule: [
  //       {
  //         day: "Monday",
  //         timeSlots: [
  //           {
  //             subject: "Mathematics",
  //             teacher: "John Doe",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "6739b23dcff5a74d5cc25f0d",
  //           },
  //           {
  //             subject: "Science",
  //             teacher: "Jane Smith",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "6739b23dcff5a74d5cc25f0e",
  //           },
  //           {
  //             subject: "English",
  //             teacher: "Emily Brown",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "6739b23dcff5a74d5cc25f0f",
  //           },
  //         ],
  //         _id: "6739b23dcff5a74d5cc25f0c",
  //       },
  //       {
  //         day: "Tuesday",
  //         timeSlots: [
  //           {
  //             subject: "History",
  //             teacher: "Michael Green",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "6739b23dcff5a74d5cc25f11",
  //           },
  //           {
  //             subject: "Mathematics",
  //             teacher: "John Doe",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "6739b23dcff5a74d5cc25f12",
  //           },
  //           {
  //             subject: "Physical Education",
  //             teacher: "James White",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "6739b23dcff5a74d5cc25f13",
  //           },
  //         ],
  //         _id: "6739b23dcff5a74d5cc25f10",
  //       },
  //       {
  //         day: "Wednesday",
  //         timeSlots: [
  //           {
  //             subject: "Science",
  //             teacher: "Jane Smith",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "6739b23dcff5a74d5cc25f15",
  //           },
  //           {
  //             subject: "Geography",
  //             teacher: "Linda Johnson",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "6739b23dcff5a74d5cc25f16",
  //           },
  //           {
  //             subject: "English",
  //             teacher: "Emily Brown",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "6739b23dcff5a74d5cc25f17",
  //           },
  //         ],
  //         _id: "6739b23dcff5a74d5cc25f14",
  //       },
  //       {
  //         day: "Thursday",
  //         timeSlots: [
  //           {
  //             subject: "Mathematics",
  //             teacher: "John Doe",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "6739b23dcff5a74d5cc25f19",
  //           },
  //           {
  //             subject: "Science",
  //             teacher: "Jane Smith",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "6739b23dcff5a74d5cc25f1a",
  //           },
  //           {
  //             subject: "English",
  //             teacher: "Emily Brown",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "6739b23dcff5a74d5cc25f1b",
  //           },
  //         ],
  //         _id: "6739b23dcff5a74d5cc25f18",
  //       },
  //       {
  //         day: "Friday",
  //         timeSlots: [
  //           {
  //             subject: "History",
  //             teacher: "Michael Green",
  //             startTime: "09:00 AM",
  //             endTime: "10:00 AM",
  //             _id: "6739b23dcff5a74d5cc25f1d",
  //           },
  //           {
  //             subject: "Mathematics",
  //             teacher: "John Doe",
  //             startTime: "10:15 AM",
  //             endTime: "11:15 AM",
  //             _id: "6739b23dcff5a74d5cc25f1e",
  //           },
  //           {
  //             subject: "Physical Education",
  //             teacher: "James White",
  //             startTime: "11:30 AM",
  //             endTime: "12:30 PM",
  //             _id: "6739b23dcff5a74d5cc25f1f",
  //           },
  //         ],
  //         _id: "6739b23dcff5a74d5cc25f1c",
  //       },
  //     ],
  //     createdBy: "6702987f646ad93b235f9b4a",
  //     createdAt: "2024-11-17T09:07:09.589Z",
  //     updatedAt: "2024-11-17T09:07:09.589Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "6739b88fcff5a74d5cc25f39",
  //     className: "CS4",
  //     schedule: [
  //       {
  //         day: "Monday",
  //         timeSlots: [
  //           {
  //             subject: "M1",
  //             teacher: "V1",
  //             startTime: "15:02",
  //             endTime: "16:02",
  //             _id: "6739b88fcff5a74d5cc25f3b",
  //           },
  //           {
  //             subject: "M2",
  //             teacher: "V2",
  //             startTime: "17:02",
  //             endTime: "18:02",
  //             _id: "6739b88fcff5a74d5cc25f3c",
  //           },
  //         ],
  //         _id: "6739b88fcff5a74d5cc25f3a",
  //       },
  //       {
  //         day: "Tuesday",
  //         timeSlots: [
  //           {
  //             subject: "M1",
  //             teacher: "V1",
  //             startTime: "15:02",
  //             endTime: "16:03",
  //             _id: "6739b88fcff5a74d5cc25f3e",
  //           },
  //           {
  //             subject: "V2",
  //             teacher: "Boli",
  //             startTime: "17:03",
  //             endTime: "18:03",
  //             _id: "6739b88fcff5a74d5cc25f3f",
  //           },
  //         ],
  //         _id: "6739b88fcff5a74d5cc25f3d",
  //       },
  //     ],
  //     createdBy: "6702987f646ad93b235f9b4a",
  //     createdAt: "2024-11-17T09:34:07.752Z",
  //     updatedAt: "2024-11-17T09:34:07.752Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "6739ba0bcff5a74d5cc25f41",
  //     className: "CS4",
  //     schedule: [
  //       {
  //         day: "Monday",
  //         timeSlots: [
  //           {
  //             subject: "M1",
  //             teacher: "V1",
  //             startTime: "15:02",
  //             endTime: "16:02",
  //             _id: "6739ba0bcff5a74d5cc25f43",
  //           },
  //           {
  //             subject: "M2",
  //             teacher: "V2",
  //             startTime: "17:02",
  //             endTime: "18:02",
  //             _id: "6739ba0bcff5a74d5cc25f44",
  //           },
  //         ],
  //         _id: "6739ba0bcff5a74d5cc25f42",
  //       },
  //       {
  //         day: "Tuesday",
  //         timeSlots: [
  //           {
  //             subject: "Mathematics",
  //             teacher: "V1",
  //             startTime: "15:02",
  //             endTime: "16:03",
  //             _id: "6739ba0bcff5a74d5cc25f46",
  //           },
  //           {
  //             subject: "V2",
  //             teacher: "Boli",
  //             startTime: "17:03",
  //             endTime: "18:03",
  //             _id: "6739ba0bcff5a74d5cc25f47",
  //           },
  //         ],
  //         _id: "6739ba0bcff5a74d5cc25f45",
  //       },
  //     ],
  //     createdBy: "6702987f646ad93b235f9b4a",
  //     createdAt: "2024-11-17T09:40:27.743Z",
  //     updatedAt: "2024-11-17T13:54:51.034Z",
  //     __v: 0,
  //   },
  //   // ... (your entire dataset here)
  // ];





  const fatchtimetableData = async () =>{
    try {
      const res = await apiClient.get("/api/timetable/alltimetable");
      setTimetableData(res.data);
      setLoading(false)
      // console.log(res.data);
    } catch (error) {
      console.error("Error fetching timetable data:", error);
    }
  }

  useEffect(() => {
    fatchtimetableData();
  }, []);



  // Group timetables by class name
  const classGroups = timetableData?.reduce((acc, timetable) => {
    if (!acc[timetable.className]) {
      acc[timetable.className] = [];
    }
    acc[timetable.className].push(timetable);
    return acc;
  }, {});

  console.log(classGroups);
  
  

  const handleClassSelect = (className) => {
    setSelectedClass(className);
    setSelectedDay(null);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`http://localhost:5000/api/timetable/deletetimetable/${id}`);
      fatchtimetableData();
    } catch (error) {
      console.error("Error deleting timetable:", error);
    }
  };

  return (
    <div className="timetable-system">
      <header className="header">
        <div className="time-table-heading"> Timetables</div>
        <div className="timetable-tabs">
          <div className="time-table-tabs">
            <button
              className={`tab ${activeTab === "view" ? "active" : ""}`}
              onClick={() => setActiveTab("view")}
            >
              View Timetables
            </button>
            <button
              className={`tab ${activeTab === "manage" ? "active" : ""}`}
              onClick={() => setActiveTab("manage")}
            >
              Manage Timetables
            </button>
          </div>
        </div>
      </header>

      {loading && <div className="timetable-loading-box"><h2>Loading...</h2></div>}

      {classGroups && <main className="main-content-box">
        {activeTab === "view" ? (
          <div className="view-mode">
            <div className="class-selector">
              <h2>Select Class</h2>
              <div className="class-buttons">
                {Object.keys(classGroups).map((className) => (
                  <button
                    key={className}
                    className={`class-btn ${
                      selectedClass === className ? "selected" : ""
                    }`}
                    onClick={() => handleClassSelect(className)}
                  >
                    {className}
                  </button>
                ))}
              </div>
            </div>

            {selectedClass && (
              <div className="timetable-display">
                <div className="day-selector">
                  {classGroups[selectedClass][0].schedule.map((daySchedule) => (
                    <button
                      key={daySchedule.day}
                      className={`day-btn ${
                        selectedDay === daySchedule.day ? "selected" : ""
                      }`}
                      onClick={() => handleDaySelect(daySchedule.day)}
                    >
                      {daySchedule.day}
                    </button>
                  ))}
                </div>

                {selectedDay ? (
                  <div className="day-schedule">
                    <h2>
                      {selectedDay}'s Schedule for {selectedClass}
                    </h2>
                    <div className="time-slots">
                      {classGroups[selectedClass][0].schedule
                        .find((day) => day.day === selectedDay)
                        .timeSlots.map((slot, index) => (
                          <div key={index} className="time-slot-card">
                            <div className="time-range">
                              <span className="start-time">
                                {slot.startTime}
                              </span>
                              <span className="time-separator">-</span>
                              <span className="end-time">{slot.endTime}</span>
                            </div>
                            <div className="slot-details">
                              <h3 className="subject">{slot.subject}</h3>
                              <p className="teacher">Teacher: {slot.teacher}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="weekly-view">
                    <h2>Weekly Schedule for {selectedClass}</h2>
                    <div className="weekly-grid">
                      {classGroups[selectedClass][0].schedule.map(
                        (daySchedule) => (
                          <div key={daySchedule.day} className="day-column">
                            <h3 className="day-header">{daySchedule.day}</h3>
                            <div className="day-slots">
                              {daySchedule.timeSlots.map((slot, index) => (
                                <div key={index} className="weekly-slot">
                                  <div className="weekly-time">
                                    {slot.startTime} - {slot.endTime}
                                  </div>
                                  <div className="weekly-subject">
                                    {slot.subject}
                                  </div>
                                  <div className="weekly-teacher">
                                    {slot.teacher}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="manage-mode">
            <h2>Manage Timetables</h2>
            <div className="timetable-list">
              {timetableData?.map((timetable) => (
                <div key={timetable._id} className="timetable-card">
                  <div className="card-header">
                    <h3>{timetable.className}</h3>
                    <span className="last-updated">
                      Last updated:{" "}
                      {new Date(timetable.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="days-summary">
                      {timetable.schedule.map((day) => (
                        <div key={day._id} className="day-summary">
                          <span className="day-name">{day.day}</span>
                          <span className="slot-count">
                            {day.timeSlots.length} classes
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => navigate(`/admin/edittimetable/${timetable._id}`) } className="edit-btn">Edit</button>
                    <button onClick={() =>{handleDelete(timetable._id)}} className="delete-btn">Delete</button>
                    <button onClick={() => navigate(`/${role==="Registrar"? "admin" : role }/viewonetimetable/${timetable._id}`) } className="view-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>}
    </div>
  );
};

export default ViewallTimetable;
