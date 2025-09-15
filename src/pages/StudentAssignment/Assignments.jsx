import { useState } from 'react';
import { FiCalendar, FiFilter, FiChevronDown, FiClock, FiAlertTriangle } from 'react-icons/fi';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import './Assignments.css';

const Assignments = () => {
  const [viewMode, setViewMode] = useState('list');
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [filters, setFilters] = useState({
    course: 'all',
    status: 'all',
    dueDate: 'all'
  });

  const assignments = [
    {
      id: 1,
      title: 'Linear Algebra Homework',
      course: 'Mathematics',
      dueDate: '2023-06-15',
      status: 'pending',
      priority: 'high',
      description: 'Complete chapters 4-6 problems'
    },
    {
      id: 2,
      title: 'React Project',
      course: 'Computer Science',
      dueDate: '2023-06-18',
      status: 'in-progress',
      priority: 'medium',
      description: 'Build a student dashboard with React'
    },
    {
      id: 3,
      title: 'Literature Essay',
      course: 'English',
      dueDate: '2023-06-25',
      status: 'not-started',
      priority: 'low',
      description: 'Write 1500-word essay on modern poetry'
    }
  ];

  const courses = ['Mathematics', 'Computer Science', 'English'];
  const statuses = ['pending', 'in-progress', 'not-started', 'completed'];

  const filteredAssignments = assignments.filter(assignment => {
    return (
      (filters.course === 'all' || assignment.course === filters.course) &&
      (filters.status === 'all' || assignment.status === filters.status) &&
      (filters.dueDate === 'all' || assignment.dueDate === filters.dueDate)
    );
  });

  return (
    <div className="assignments-container">
      <div className="assignments-header">
        <h1>My Assignments</h1>
        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
          <button 
            className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
            onClick={() => setViewMode('calendar')}
          >
            Calendar View
          </button>
        </div>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <FiFilter className="filter-icon" />
          <select 
            value={filters.course}
            onChange={(e) => setFilters({...filters, course: e.target.value})}
          >
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          <FiChevronDown className="chevron-icon" />
        </div>

        <div className="filter-group">
          <select 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
          <FiChevronDown className="chevron-icon" />
        </div>

        <button 
          className="calendar-toggle"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <FiCalendar />
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
        </button>
      </div>

      {showCalendar && (
        <div className="calendar-popup">
          <Calendar 
            onChange={setDate} 
            value={date}
            tileClassName={({ date }) => {
              const dateStr = date.toISOString().split('T')[0];
              const hasAssignment = assignments.some(a => a.dueDate === dateStr);
              return hasAssignment ? 'has-assignment' : '';
            }}
          />
        </div>
      )}

      {viewMode === 'list' ? (
        <div className="assignments-list">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map(assignment => (
              <div key={assignment.id} className={`assignment-card ${assignment.status}`}>
                <div className="card-header">
                  <div className="priority-indicator">
                    {assignment.priority === 'high' && <FiAlertTriangle className="high-priority" />}
                  </div>
                  <h3>{assignment.title}</h3>
                  <span className={`status-badge ${assignment.status}`}>
                    {assignment.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="card-body">
                  <span className="course-tag">{assignment.course}</span>
                  <p className="description">{assignment.description}</p>
                  <div className="due-date">
                    <FiClock />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="card-actions">
                  <button className="outline-btn">View Details</button>
                  <button className="primary-btn">
                    {assignment.status === 'pending' ? 'Start' : 'Continue'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No assignments match your filters</p>
            </div>
          )}
        </div>
      ) : (
        <div className="calendar-view">
          {/* Calendar view implementation */}
          <p>Calendar view would show assignments on their due dates</p>
        </div>
      )}
    </div>
  );
};

export default Assignments;