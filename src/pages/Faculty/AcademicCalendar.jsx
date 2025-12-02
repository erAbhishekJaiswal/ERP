import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../services/axios';
import "../../CSSfolder/FacultyCSS/AcademicCalendar.css";

const AcademicCalendar = () => {
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('list');
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [filterYear, setFilterYear] = useState('all');
  const [calendarData, setCalendardata] = useState();

  const fetchCalendarData = async () => {
    try {
      const res = await apiClient.get("/api/registrar/calendar");
      setCalendardata(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const allYears = [...new Set(
    calendarData?.data.map(cal => new Date(cal.startDate).getFullYear())
  )].sort();

  const filteredCalendars = calendarData?.data.filter(calendar => {
    if (filterYear === 'all') return true;
    return new Date(calendar.startDate).getFullYear().toString() === filterYear;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const groupEventsByMonth = (calendar) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const eventsByMonth = {};

    calendar?.holidays.forEach(date => {
      const monthIndex = new Date(date).getMonth();
      const monthName = months[monthIndex];
      if (!eventsByMonth[monthName]) eventsByMonth[monthName] = { holidays: [], exams: [] };
      eventsByMonth[monthName].holidays.push(formatDate(date));
    });

    calendar?.examDates.forEach(date => {
      const monthIndex = new Date(date).getMonth();
      const monthName = months[monthIndex];
      if (!eventsByMonth[monthName]) eventsByMonth[monthName] = { holidays: [], exams: [] };
      eventsByMonth[monthName].exams.push(formatDate(date));
    });

    return eventsByMonth;
  };

  return (
    <div className="acv-container">
      <header className="acv-header">
        <h1>Academic Calendar System</h1>
        <div className="acv-controls">
          <div className="acv-tabs">
            <button
              className={`acv-tab ${activeView === 'list' ? 'acv-active' : ''}`}
              onClick={() => setActiveView('list')}
            >
              List View
            </button>
            <button
              className={`acv-tab ${activeView === 'calendar' ? 'acv-active' : ''}`}
              onClick={() => setActiveView('calendar')}
            >
              Calendar View
            </button>
          </div>
          <div className="acv-year-filter">
            <label htmlFor="acv-year-select">Filter by Year:</label>
            <select
              id="acv-year-select"
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

      <main className="acv-main">
        {activeView === 'list' ? (
          <div className="acv-list-view">
            {filteredCalendars?.length > 0 ? (
              <div className="acv-cards">
                {filteredCalendars.map(calendar => (
                  <div
                    key={calendar._id}
                    className={`acv-card ${selectedCalendar?._id === calendar._id ? 'acv-selected' : ''}`}
                    onClick={() => setSelectedCalendar(calendar)}
                  >
                    <div className="acv-card-header">
                      <h3>{new Date(calendar.startDate).getFullYear()} Academic Calendar</h3>
                      <span className="acv-date-range">
                        {formatDate(calendar.startDate)} - {formatDate(calendar.endDate)}
                      </span>
                    </div>
                    <div className="acv-card-stats">
                      <div className="acv-stat-item">
                        <span className="acv-stat-number">{calendar.examDates?.length}</span>
                        <span className="acv-stat-label">Exam Dates</span>
                      </div>
                      <div className="acv-stat-item">
                        <span className="acv-stat-number">{calendar.holidays?.length}</span>
                        <span className="acv-stat-label">Holidays</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="acv-no-results"><p>Loading....</p></div>
            )}

            {selectedCalendar && (
              <div className="acv-details">
                <h2>{new Date(selectedCalendar.startDate).getFullYear()} Academic Calendar Details</h2>

                <div className="acv-section">
                  <h3>Date Range</h3>
                  <p>
                    <strong>From:</strong> {formatDate(selectedCalendar.startDate)}<br />
                    <strong>To:</strong> {formatDate(selectedCalendar.endDate)}
                  </p>
                </div>

                <div className="acv-section">
                  <h3>Exam Dates</h3>
                  {selectedCalendar.examDates?.length > 0 ? (
                    <ul className="acv-event-list">
                      {selectedCalendar.examDates.map((date, index) => (
                        <li key={index} className="acv-exam-date">{formatDate(date)}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="acv-no-events">No exam dates scheduled</p>
                  )}
                </div>

                <div className="acv-section">
                  <h3>Holidays</h3>
                  {selectedCalendar.holidays?.length > 0 ? (
                    <ul className="acv-event-list">
                      {selectedCalendar.holidays.map((date, index) => (
                        <li key={index} className="acv-holiday">{formatDate(date)}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="acv-no-events">No holidays scheduled</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="acv-calendar-view">
            {selectedCalendar ? (
              <div className="acv-monthly">
                <h2>{new Date(selectedCalendar.startDate).getFullYear()} Academic Calendar</h2>

                <div className="acv-nav">
                  <button
                    className="acv-nav-btn"
                    onClick={() => {
                      const prev = calendarData?.data?.find(
                        cal => new Date(cal.startDate).getFullYear() ===
                          new Date(selectedCalendar.startDate).getFullYear() - 1
                      );
                      if (prev) setSelectedCalendar(prev);
                    }}
                  >
                    Previous Year
                  </button>
                  <button className="acv-nav-btn" onClick={() => setSelectedCalendar(null)}>
                    Back to List
                  </button>
                  <button
                    className="acv-nav-btn"
                    onClick={() => {
                      const next = calendarData?.data?.find(
                        cal => new Date(cal.startDate).getFullYear() ===
                          new Date(selectedCalendar.startDate).getFullYear() + 1
                      );
                      if (next) setSelectedCalendar(next);
                    }}
                  >
                    Next Year
                  </button>
                </div>

                <div className="acv-legend">
                  <div className="acv-legend-item">
                    <span className="acv-color acv-exam"></span><span>Exam Date</span>
                  </div>
                  <div className="acv-legend-item">
                    <span className="acv-color acv-holiday"></span><span>Holiday</span>
                  </div>
                </div>

                <div className="acv-months">
                  {Object.entries(groupEventsByMonth(selectedCalendar)).map(([month, events]) => (
                    <div key={month} className="acv-month">
                      <h3 className="acv-month-header">{month}</h3>
                      <div className="acv-month-events">
                        {events.exams.length > 0 && (
                          <div className="acv-event-group">
                            <h4>Exams</h4>
                            <ul>{events.exams.map((d, i) => (
                              <li key={`exam-${i}`} className="acv-exam-event">{d}</li>
                            ))}</ul>
                          </div>
                        )}
                        {events.holidays.length > 0 && (
                          <div className="acv-event-group">
                            <h4>Holidays</h4>
                            <ul>{events.holidays.map((d, i) => (
                              <li key={`holiday-${i}`} className="acv-holiday-event">{d}</li>
                            ))}</ul>
                          </div>
                        )}
                        {events.exams.length === 0 && events.holidays.length === 0 && (
                          <p className="acv-no-events">No events scheduled</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="acv-select">
                <h2>Select a Calendar to View</h2>
                <div className="acv-cards">
                  {filteredCalendars?.map(calendar => (
                    <div key={calendar._id} className="acv-card" onClick={() => setSelectedCalendar(calendar)}>
                      <div className="acv-card-header">
                        <h3>{new Date(calendar.startDate).getFullYear()} Academic Calendar</h3>
                        <span className="acv-date-range">
                          {formatDate(calendar.startDate)} - {formatDate(calendar.endDate)}
                        </span>
                      </div>
                      <div className="acv-card-stats">
                        <div className="acv-stat-item">
                          <span className="acv-stat-number">{calendar.examDates?.length}</span>
                          <span className="acv-stat-label">Exam Dates</span>
                        </div>
                        <div className="acv-stat-item">
                          <span className="acv-stat-number">{calendar.holidays?.length}</span>
                          <span className="acv-stat-label">Holidays</span>
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

export default AcademicCalendar;