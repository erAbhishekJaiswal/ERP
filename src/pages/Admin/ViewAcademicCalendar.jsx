// import React, { useEffect, useState } from 'react';
// // import api from '../api';
// import axios from 'axios';
// import '../../CSSfolder/CommonCSS/allfile.css'

// const ViewAcademicCalendar = () => {
//     const [calendar, setCalendar] = useState([]);

//     useEffect(() => {
//         const fetchCalendar = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/registrar/calendar');
//                 setCalendar(response.data.data);
//                 console.log(response.data.data);
                
//             } catch (error) {
//                 console.error('Failed to retrieve academic calendar', error);
//             }
//         };
//         fetchCalendar();
//     }, []);

//     if (!calendar) return <p>Loading...</p>;

//     return (
//         <div className='allcontainer'>
//             <h2>Academic Calendar</h2>

//             {calendar.map(cdate=>{
//                 return(
//                     <div className='clanderslist' key={cdate._id}>
//                         <div className="datesbox">
//                         <p className='startdate'>Start Date: {cdate.startDate}</p>
//                         <p className='enddate'>End Date: {cdate.endDate}</p>
//                         </div>
//                         <div className="examholybox">
//                         <p className='examdate'>Exam Dates: {cdate.examDates}</p>
//                         <p className='holidays'>Holidays: {cdate.holidays}</p>
//                         </div>
//                     </div>
//                 )
//             })}

//             {/* Map calendar data as needed */}
//             {/* calendar.map( {
//                 <div key={cdate._id}>
//                     <p>Start Date: {cdate.startDate}</p>
//                     <p>End Date: {cdate.endDate}</p>

//                 </div>
//             }) */}
//         </div>
//     );
// };

// export default ViewAcademicCalendar;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../CSSfolder/AdminCSS/AcademicCalendarViewer.css';
import apiClient from '../../services/axios';

const AcademicCalendarViewer = () => {
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('list');
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [filterYear, setFilterYear] = useState('all');
  const [calendarData,setCalendardata] = useState();

  const fatchCalenderData = async () => {
    try {
      const res = await apiClient.get("/api/registrar/calendar");
      setCalendardata(res.data);
      setLoading(false);
      console.log(res.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fatchCalenderData()
  },[]);

  // Extract unique years for filtering
  const allYears = [...new Set(
    calendarData?.data.map(cal => new Date(cal.startDate).getFullYear())
  )].sort();

  // Filter calendars based on selected year
  const filteredCalendars = calendarData?.data.filter(calendar => {
    if (filterYear === 'all') return true;
    return new Date(calendar.startDate).getFullYear().toString() === filterYear;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Group events by month for calendar view
  const groupEventsByMonth = (calendar) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const eventsByMonth = {};
    
    // Process holidays
    calendar?.holidays.forEach(date => {
      const monthIndex = new Date(date).getMonth();
      const monthName = months[monthIndex];
      
      if (!eventsByMonth[monthName]) {
        eventsByMonth[monthName] = { holidays: [], exams: [] };
      }
      
      eventsByMonth[monthName].holidays.push(formatDate(date));
    });
    
    // Process exam dates
    calendar?.examDates.forEach(date => {
      const monthIndex = new Date(date).getMonth();
      const monthName = months[monthIndex];
      
      if (!eventsByMonth[monthName]) {
        eventsByMonth[monthName] = { holidays: [], exams: [] };
      }
      
      eventsByMonth[monthName].exams.push(formatDate(date));
    });
    
    return eventsByMonth;
  };

  return (
    <div className="calendar-viewer">
      <header className="viewer-header">
        <h1>Academic Calendar System</h1>
        <div className="view-controls">
          <div className="view-tabs">
            <button
              className={`view-tab ${activeView === 'list' ? 'active' : ''}`}
              onClick={() => setActiveView('list')}
            >
              List View
            </button>
            <button
              className={`view-tab ${activeView === 'calendar' ? 'active' : ''}`}
              onClick={() => setActiveView('calendar')}
            >
              Calendar View
            </button>
          </div>
          <div className="year-filter">
            <label htmlFor="year-select">Filter by Year:</label>
            <select
              id="year-select"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="all">All Years</option>
              {allYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="viewer-main">
        {activeView === 'list' ? (
          <div className="list-view">
            {filteredCalendars?.length > 0 ? (
              <div className="calendar-cards">
                {filteredCalendars?.map(calendar => (
                  <div
                    key={calendar._id}
                    className={`calendar-card ${selectedCalendar?._id === calendar._id ? 'selected' : ''}`}
                    onClick={() => setSelectedCalendar(calendar)}
                  >
                    <div className="card-header">
                      <h3>
                        {new Date(calendar?.startDate).getFullYear()} Academic Calendar
                      </h3>
                      <span className="date-range">
                        {formatDate(calendar?.startDate)} - {formatDate(calendar?.endDate)}
                      </span>
                    </div>
                    <div className="card-stats">
                      <div className="stat-item">
                        <span className="stat-number">{calendar?.examDates?.length}</span>
                        <span className="view-stat-label">Exam Dates</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">{calendar?.holidays?.length}</span>
                        <span className="view-stat-label">Holidays</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>Loading....</p>
              </div>
            )}

            {selectedCalendar && (
              <div className="calendar-details">
                <h2>
                  {new Date(selectedCalendar?.startDate).getFullYear()} Academic Calendar Details
                </h2>
                <div className="detail-section">
                  <h3>Date Range</h3>
                  <p>
                    <strong>From:</strong> {formatDate(selectedCalendar?.startDate)}<br />
                    <strong>To:</strong> {formatDate(selectedCalendar?.endDate)}
                  </p>
                </div>

                <div className="detail-section">
                  <h3>Exam Dates</h3>
                  {selectedCalendar?.examDates?.length > 0 ? (
                    <ul className="event-list">
                      {selectedCalendar?.examDates?.map((date, index) => (
                        <li key={index} className="exam-date">
                          {formatDate(date)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-events">No exam dates scheduled</p>
                  )}
                </div>

                <div className="detail-section">
                  <h3>Holidays</h3>
                  {selectedCalendar?.holidays?.length > 0 ? (
                    <ul className="event-list">
                      {selectedCalendar?.holidays?.map((date, index) => (
                        <li key={index} className="holiday">
                          {formatDate(date)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-events">No holidays scheduled</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="calendar-view">
            {selectedCalendar ? (
              <div className="monthly-calendar">
                <h2>
                  {new Date(selectedCalendar?.startDate).getFullYear()} Academic Calendar
                </h2>
                <div className="calendar-nav">
                  <button
                    className="nav-button"
                    onClick={() => {
                      const prevCalendar = calendarData?.data?.find(
                        cal => new Date(cal?.startDate).getFullYear() === 
                              new Date(selectedCalendar?.startDate).getFullYear() - 1
                      );
                      if (prevCalendar) setSelectedCalendar(prevCalendar);
                    }}
                  >
                    Previous Year
                  </button>
                  <button
                    className="nav-button"
                    onClick={() => setSelectedCalendar(null)}
                  >
                    Back to List
                  </button>
                  <button
                    className="nav-button"
                    onClick={() => {
                      const nextCalendar = calendarData?.data?.find(
                        cal => new Date(cal?.startDate).getFullYear() === 
                              new Date(selectedCalendar?.startDate).getFullYear() + 1
                      );
                      if (nextCalendar) setSelectedCalendar(nextCalendar);
                    }}
                  >
                    Next Year
                  </button>
                </div>

                <div className="legend">
                  <div className="legend-item">
                    <span className="legend-color exam"></span>
                    <span>Exam Date</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color holiday"></span>
                    <span>Holiday</span>
                  </div>
                </div>

                <div className="months-grid">
                  {Object?.entries(groupEventsByMonth(selectedCalendar))?.map(([month, events]) => (
                    <div key={month} className="month-card">
                      <h3 className="month-header">{month}</h3>
                      <div className="month-events">
                        {events?.exams?.length > 0 && (
                          <div className="event-group">
                            <h4>Exams</h4>
                            <ul>
                              {events?.exams?.map((date, index) => (
                                <li key={`exam-${index}`} className="exam-event">
                                  {date}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {events?.holidays?.length > 0 && (
                          <div className="event-group">
                            <h4>Holidays</h4>
                            <ul>
                              {events?.holidays?.map((date, index) => (
                                <li key={`holiday-${index}`} className="holiday-event">
                                  {date}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {events?.exams?.length === 0 && events?.holidays?.length === 0 && (
                          <p className="no-events">No events scheduled</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="calendar-selection">
                <h2>Select a Calendar to View</h2>
                <div className="calendar-cards">
                  {filteredCalendars?.map(calendar => (
                    <div
                      key={calendar._id}
                      className="calendar-card"
                      onClick={() => setSelectedCalendar(calendar)}
                    >
                      <div className="card-header">
                        <h3>
                          {new Date(calendar?.startDate).getFullYear()} Academic Calendar
                        </h3>
                        <span className="date-range">
                          {formatDate(calendar?.startDate)} - {formatDate(calendar?.endDate)}
                        </span>
                      </div>
                      <div className="card-stats">
                        <div className="stat-item">
                          <span className="stat-number">{calendar?.examDates?.length}</span>
                          <span className="view-stat-label">Exam Dates</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">{calendar?.holidays?.length}</span>
                          <span className="view-stat-label">Holidays</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AcademicCalendarViewer;