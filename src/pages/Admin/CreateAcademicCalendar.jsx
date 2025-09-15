import axios from 'axios';
import React, { useState } from 'react';
import "../../CSSfolder/AdminCSS/CreateAcademicCalendar.css";
import apiClient from '../../services/axios';

const CreateAcademicCalendar = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedExamDates, setSelectExamdate] = useState('');
    const [examDates, setExamDates] = useState([]);
    const [holidaydates, setholidaydates] = useState('');
    const [holidays, setHolidays] = useState([]);
    const [calendarName, setCalendarName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const AddHolidays = () => {
        if (holidaydates) {
            setHolidays([...holidays, holidaydates]);
            setholidaydates('');
        }
    };

    const AddExamdates = () => {
        if (selectedExamDates) {
            setExamDates([...examDates, selectedExamDates]);
            setSelectExamdate('');
        }
    };

    const removeHoliday = (index) => {
        const updatedHolidays = [...holidays];
        updatedHolidays.splice(index, 1);
        setHolidays(updatedHolidays);
    };

    const removeExamDate = (index) => {
        const updatedExamDates = [...examDates];
        updatedExamDates.splice(index, 1);
        setExamDates(updatedExamDates);
    };

    const handleCreateCalendar = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await apiClient.post('/api/registrar/calendar', {
                name: calendarName,
                startDate,
                endDate,
                examDates,
                holidays,
            });
            console.log(response);
            
            alert('Academic calendar created successfully');
            // Reset form
            setCalendarName('');
            setStartDate('');
            setEndDate('');
            setExamDates([]);
            setHolidays([]);
        } catch (error) {
            console.error('Failed to create academic calendar', error);
            alert('Failed to create calendar. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="calendar-page">
            <div className="calendar-container">
                <div className="calendar-header-container">
                    <h2 className="academic-calendar-header">Create Academic Calendar</h2>
                    <p className="academic-calendar-subheader">Define the academic schedule including holidays and exam dates</p>
                </div>
                
                <form onSubmit={handleCreateCalendar} className="calendar-form">
                    <div className="form-section">
                        <div className="form-group">
                            <label className="acadmic-form-label">Calendar Name</label>
                            <input 
                                type="text" 
                                value={calendarName}
                                onChange={(e) => setCalendarName(e.target.value)}
                                className="form-input"
                                placeholder="e.g., Fall 2023 Semester"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-section date-range-section">
                        <h3 className="section-title">
                            <span className="section-icon">📅</span>
                            Calendar Date Range
                        </h3>
                        <div className="date-range-grid">
                            <div className="dates-form-group">
                                <label className="acadmic-form-label">Start Date</label>
                                <input 
                                    type="date" 
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                            <div className="dates-form-group">
                                <label className="acadmic-form-label">End Date</label>
                                <input 
                                    type="date" 
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section dates-section">
                        <div className="dates-grid">
                            <div className="holidays-section date-subsection">
                                <div className="subsection-header">
                                    <h3 className="section-title">
                                        <span className="section-icon">🏖️</span>
                                        Holidays
                                    </h3>
                                    <div className="date-entry">
                                        <input 
                                            type="date" 
                                            value={holidaydates}
                                            onChange={(e) => setholidaydates(e.target.value)}
                                            className="form-input"
                                        />
                                        <button 
                                            type="button" 
                                            className="acadmic-add-button acadmic-primary-button"
                                            onClick={AddHolidays}
                                            disabled={!holidaydates}
                                        >
                                            + Add Holiday
                                        </button>
                                    </div>
                                </div>
                                <div className="selected-dates">
                                    {holidays.length > 0 ? (
                                        <ul className="dates-list">
                                            {holidays.map((date, index) => (
                                                <li key={index} className="date-item">
                                                    <span className="date-text">{new Date(date).toLocaleDateString('en-US', { 
                                                        year: 'numeric', 
                                                        month: 'short', 
                                                        day: 'numeric',
                                                        weekday: 'short' 
                                                    })}</span>
                                                    <button 
                                                        type="button" 
                                                        className="remove-button danger-button"
                                                        onClick={() => removeHoliday(index)}
                                                        title="Remove holiday"
                                                    >
                                                        ×
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="empty-state">
                                            <p className="no-dates-message">No holidays added yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="exams-section date-subsection">
                                <div className="subsection-header">
                                    <h3 className="section-title">
                                        <span className="section-icon">📝</span>
                                        Exam Dates
                                    </h3>
                                    <div className="date-entry">
                                        <input 
                                            type="date" 
                                            value={selectedExamDates}
                                            onChange={(e) => setSelectExamdate(e.target.value)}
                                            className="form-input"
                                        />
                                        <button 
                                            type="button" 
                                            className="acadmic-add-button acadmic-primary-button"
                                            onClick={AddExamdates}
                                            disabled={!selectedExamDates}
                                        >
                                            + Add Exam
                                        </button>
                                    </div>
                                </div>
                                <div className="selected-dates">
                                    {examDates.length > 0 ? (
                                        <ul className="dates-list">
                                            {examDates.map((date, index) => (
                                                <li key={index} className="date-item">
                                                    <span className="date-text">{new Date(date).toLocaleDateString('en-US', { 
                                                        year: 'numeric', 
                                                        month: 'short', 
                                                        day: 'numeric',
                                                        weekday: 'short' 
                                                    })}</span>
                                                    <button 
                                                        type="button" 
                                                        className="remove-button danger-button"
                                                        onClick={() => removeExamDate(index)}
                                                        title="Remove exam date"
                                                    >
                                                        ×
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="empty-state">
                                            <p className="no-dates-message">No exam dates added yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button 
                            type="submit" 
                            className="submit-button success-button"
                            disabled={isSubmitting || !startDate || !endDate || !calendarName}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner"></span>
                                    Creating Calendar...
                                </>
                            ) : 'Create Academic Calendar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAcademicCalendar;








// import axios from 'axios';
// import React, { useState } from 'react';
// import '../../CSSfolder/CommonCSS/allfile.css'
// import '../../CSSfolder/CommonCSS/calander.css'
// // import api from '../api';

// const CreateAcademicCalendar = () => {
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [selectedExamDates,setSelectExamdate] = useState('')
//     const [examDates, setExamDates] = useState([]);
//     const [holidaydates, setholidaydates] = useState();
//     const [holidays, setHolidays] = useState([]);

//     const AddHolidays = () => {
//         setHolidays([...holidays, holidaydates]);
//         setholidaydates('')
//         // console.log(holidays);
//     }

//     const AddExamdates =()=>{
//         setExamDates([...examDates,selectedExamDates])
//         setSelectExamdate('');
//         // console.log(examDates);
        
//     }

//     const handleCreateCalendar = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/registrar/calendar', {
//                 startDate,
//                 endDate,
//                 examDates,
//                 holidays,
//             });
//             alert('Academic calendar created successfully', response);
//         } catch (error) {
//             console.error('Failed to create academic calendar', error);
//         }
//     };

//     return (
//         <div className='allcontainer'>
//             <div className="calanderbox">
//                 <h2>Create Academic Calendar</h2>
//                 <div className="formsection">
//                     <div className="rangebox">
//                         <p className="range">Calander Range:</p>
//                         <div className="calanderrange">
//                             <div className="labels">
//                                 <label className='lb1'>Start Date:</label>
//                                 <input type="date" className='dateinput' value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
//                             </div>
//                             <div className="labels">
//                                 <label className='lb1'>End Date:</label>
//                                 <input type="date" className='dateinput' value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
//                             </div>
//                         </div>
//                     </div>
//                     {/* Exam dates and holidays input fields can be expanded as required */}
//                     <div className="rangebox">
//                         <p className="range">Holidays Range:</p>
//                         <div className="calanderrange">
//                             <div className="holidayslabels">
//                                 <div className="labels">
//                                     <label className='lb2'>Holidays:</label>
//                                     <input type="date" className='dateinput' value={holidaydates} onChange={(e) => setholidaydates(e.target.value)} placeholder="Holidays" />
//                                     <button className='addbtn' onClick={() => { AddHolidays() }}>Add Holidays</button>
//                                 </div>
//                                 <div className="selecteddates">
//                                     {holidays.length ? (
//                                         <ul>
//                                             {
//                                                 holidays.map((date, index) => {
//                                                     return <li key={index} className="datelist">{date}</li>
//                                                 })
//                                             }
//                                         </ul>

//                                     ) : (
//                                         <p className="nodates">Holidays date are not selected</p>
//                                     )}

//                                 </div>
//                             </div>

//                             <div className="examdatelabeles">
//                                 <div className="labels">
//                                     <label className='lb3'>ExamDates:</label>
//                                     <input type="date" className='dateinput' value={selectedExamDates} onChange={(e) => setSelectExamdate(e.target.value)} placeholder="ExamDates" />
//                                     <button className='addbtn' onClick={()=>{AddExamdates()}}>Add ExamDates</button>
//                                 </div>
//                                 <div className="selecteddates">
//                                     {examDates.length > 0 ?(
//                                         <ul>
//                                             {
//                                                 examDates.map((date,index)=>{
//                                                     return <li key={index} className="datelist">{date}</li>
//                                                 })
//                                             }
//                                         </ul>
//                                     ):(
//                                          <p className="nodates">Exams date are not selected</p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <button className='createbtn' onClick={handleCreateCalendar} >Create Calendar</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateAcademicCalendar;







// // 



// // import React, { useState } from 'react';

// // const CreateAcademicCalendar = () => {
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');
// //   const [examDates, setExamDates] = useState([]);
// //   const [holidays, setHolidays] = useState([]);

// //   // Handle adding an exam date
// //   const handleAddExamDate = () => {
// //     const examDate = prompt('Enter the exam date (YYYY-MM-DD):');
// //     if (examDate) {
// //       setExamDates([...examDates, examDate]);
// //     }
// //   };

// //   // Handle adding a holiday
// //   const handleAddHoliday = () => {
// //     const holiday = prompt('Enter the holiday date (YYYY-MM-DD):');
// //     if (holiday) {
// //       setHolidays([...holidays, holiday]);
// //     }
// //   };

// //   // Form validation
// //   const validateForm = () => {
// //     if (!startDate || !endDate) {
// //       alert('Start and End Dates are required.');
// //       return false;
// //     }
// //     if (new Date(endDate) < new Date(startDate)) {
// //       alert('End Date cannot be earlier than Start Date.');
// //       return false;
// //     }
// //     return true;
// //   };

// //   // Handle form submission
// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (validateForm()) {
// //       const calendarData = {
// //         startDate,
// //         endDate,
// //         examDates,
// //         holidays,
// //       };
// //       console.log('Form Submitted:', calendarData);
// //       // Here you can send the data to your backend
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <h2>Academic Calendar Form</h2>

// //       <form onSubmit={handleSubmit}>
// //         {/* Start Date */}
// //         <div>
// //           <label htmlFor="startDate">Start Date</label>
// //           <input
// //             type="date"
// //             id="startDate"
// //             value={startDate}
// //             onChange={(e) => setStartDate(e.target.value)}
// //             required
// //           />
// //         </div>

// //         {/* End Date */}
// //         <div>
// //           <label htmlFor="endDate">End Date</label>
// //           <input
// //             type="date"
// //             id="endDate"
// //             value={endDate}
// //             onChange={(e) => setEndDate(e.target.value)}
// //             required
// //           />
// //         </div>

// //         {/* Exam Dates */}
// //         <div>
// //           <label>Exam Dates</label>
// //           <button type="button" onClick={handleAddExamDate}>
// //             Add Exam Date
// //           </button>
// //           <div>
// //             {examDates.length > 0 ? (
// //               <ul>
// //                 {examDates.map((date, index) => (
// //                   <li key={index}>{date}</li>
// //                 ))}
// //               </ul>
// //             ) : (
// //               <p>No exam dates added.</p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Holidays */}
// //         <div>
// //           <label>Holidays</label>
// //           <button type="button" onClick={handleAddHoliday}>
// //             Add Holiday
// //           </button>
// //           <div>
// //             {holidays.length > 0 ? (
// //               <ul>
// //                 {holidays.map((date, index) => (
// //                   <li key={index}>{date}</li>
// //                 ))}
// //               </ul>
// //             ) : (
// //               <p>No holidays added.</p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Submit Button */}
// //         <div>
// //           <button type="submit">Submit</button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CreateAcademicCalendar;
