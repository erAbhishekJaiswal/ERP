import React, { useEffect, useState } from 'react';
import "../../CSSfolder/AdminCSS/ExamsList.css"
import apiClient from '../../services/axios';

const ExamSystem = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [examData,setExamData] = useState()

  const fatchExamData = async () => {
    try {
      const res = await apiClient.get('/api/registrar/exams');
      setExamData(res.data)
      console.log(res.data);
      
    } catch (error) {
      
    }
  }

  useEffect (() => {
    fatchExamData()
  }, [])

  // Departments for filter
  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'CSE', label: 'Computer Science' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'ECE', label: 'Electronics' },
    { value: 'EEE', label: 'Electrical' },
    { value: 'MECH', label: 'Mechanical' },
    { value: 'CIVIL', label: 'Civil' },
    { value: 'CHEMICAL', label: 'Chemical' }
  ];

  // Years for filter
  const years = [
    { value: 'all', label: 'All Years' },
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' },
    { value: '4', label: '4th Year' }
  ];

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter exams based on search and filters
  const filteredExams = examData?.data.filter(exam => {
    const matchesSearch = exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || exam.department === filterDepartment;
    const matchesYear = filterYear === 'all' || exam.year?.toString() === filterYear;
    const isUpcoming = new Date(exam.examDate) >= new Date();
    
    return matchesSearch && matchesDepartment && matchesYear && 
           (activeTab === 'upcoming' ? isUpcoming : !isUpcoming);
  });

  // Group exams by month
  const groupExamsByMonth = (exams) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const examsByMonth = {};
    
    exams?.forEach(exam => {
      const monthIndex = new Date(exam.examDate).getMonth();
      const monthName = months[monthIndex];
      
      if (!examsByMonth[monthName]) {
        examsByMonth[monthName] = [];
      }
      
      examsByMonth[monthName].push(exam);
    });
    
    return examsByMonth;
  };

  const examsByMonth = groupExamsByMonth(filteredExams);

  return (
    <div className="exam-system">
      <header className="allexam-header">
        <h1>All Exams List</h1>
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <svg viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg> */}
          </div>
          
          <div className="filters">
            <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
              {departments?.map(dept => (
                <option key={dept.value} value={dept.value}>{dept.label}</option>
              ))}
            </select>
            
            <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
              {years?.map(year => (
                <option key={year.value} value={year.value}>{year.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="allexamlist-tabs">
          <button 
            className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Exams
          </button>
          <button 
            className={`tab ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Exams
          </button>
        </div>
      </header>

      <main className="main-content">
        {selectedExam ? (
          <div className="exam-details">
            <button className="back-button" onClick={() => setSelectedExam(null)}>
              <svg viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              Back to Exams
            </button>
            
            <div className="detail-card">
              <div className="card-header">
                <h2>{selectedExam.examName}</h2>
                <span className={`status-badge ${new Date(selectedExam.examDate) >= new Date() ? 'upcoming' : 'past'}`}>
                  {new Date(selectedExam.examDate) >= new Date() ? 'Upcoming' : 'Completed'}
                </span>
              </div>
              
              <div className="card-body">
                <div className="detail-row">
                  <span className="detail-label">Subject:</span>
                  <span className="detail-value">{selectedExam.subject}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{formatDate(selectedExam.examDate)}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">{selectedExam.examTime}</span>
                </div>
                
                {selectedExam.department && (
                  <div className="detail-row">
                    <span className="detail-label">Department:</span>
                    <span className="detail-value">{selectedExam.department}</span>
                  </div>
                )}
                
                {selectedExam.year && (
                  <div className="detail-row">
                    <span className="detail-label">Year:</span>
                    <span className="detail-value">{selectedExam.year}</span>
                  </div>
                )}
                
                {selectedExam.semester && (
                  <div className="detail-row">
                    <span className="detail-label">Semester:</span>
                    <span className="detail-value">{selectedExam.semester}</span>
                  </div>
                )}
                
                {selectedExam.studentIds && (
                  <div className="detail-row">
                    <span className="detail-label">Students:</span>
                    <span className="detail-value">{selectedExam.studentIds.length}</span>
                  </div>
                )}
              </div>
              
              {selectedExam?.grades && selectedExam?.grades.length > 0 && (
                <div className="grades-section">
                  <h3>Grades</h3>
                  <div className="grades-table">
                    <div className="table-header">
                      <span>Student ID</span>
                      <span>Grade</span>
                    </div>
                    {selectedExam?.grades.map((grade, index) => (
                      <div key={index} className="table-row">
                        <span>{grade.studentId}</span>
                        <span className={`grade-value ${grade.grade.toLowerCase()}`}>{grade.grade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="exam-list">
            {Object.keys(examsByMonth).length > 0 ? (
              Object.entries(examsByMonth).map(([month, exams]) => (
                <div key={month} className="month-section">
                  <h2 className="month-header">{month}</h2>
                  <div className="exams-grid">
                    {exams?.map(exam => (
                      <div 
                        key={exam._id} 
                        className="exam-card"
                        onClick={() => setSelectedExam(exam)}
                      >
                        <div className="card-top">
                          <h3>{exam.examName}</h3>
                          <span className={`status-badge ${new Date(exam.examDate) >= new Date() ? 'upcoming' : 'past'}`}>
                            {new Date(exam.examDate) >= new Date() ? 'Upcoming' : 'Completed'}
                          </span>
                        </div>
                        
                        <div className="card-middle">
                          <span className="subject">{exam.subject}</span>
                          {exam.department && <span className="department">{exam.department}</span>}
                        </div>
                        
                        <div className="card-bottom">
                          <div className="date-time">
                            <svg viewBox="0 0 24 24">
                              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                            </svg>
                            <span>{formatDate(exam.examDate)}</span>
                          </div>
                          
                          <div className="date-time">
                            <svg viewBox="0 0 24 24">
                              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                            </svg>
                            <span>{exam.examTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <p>No exams found matching your criteria</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ExamSystem;