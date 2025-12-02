import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBook,
  FiCheckCircle,
  FiClipboard,
  FiAward,
  FiClock,
  FiUser,
  FiChevronRight,
  FiBell,
  FiSearch,
} from "react-icons/fi";
import { BsGraphUp, BsCalendarCheck } from "react-icons/bs";
import { RiFilePaper2Line, RiQuillPenLine } from "react-icons/ri";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../CSSfolder/StudentCSS/studentdashboard.css";
import apiClient from '../../services/axios';

const StudentDashboard = () => {
  const [data, setData] = useState({
    studentdashboard: {
      student: {
        fullname: "",
        email: "",
        mobile: "",
        enrollment_number: "",
        current_semester: "",
        department_name: "",
      },
      assignments: [
        {
          assignment_id: "",
          assignment_name: "",
          upcoming: false
        }
      ],
      upcommingassignments: null,
      subjects: [
        {
          subject_id: "",
          subject_code: "",
          subject_name: ""
        }
      ],
      quiz: [
        {
          quiz_id: "",
          quiz_name: ""
        }
      ],
      totalpercentage: "00",
      exam: [
        {
          name: ""
        }
      ]
    },
  });

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const id = localStorage.getItem("profileid");

  useEffect(() => {
    const studentdata = async (id) => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `/api/student/studentdashboard/${id}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    studentdata(id);
  }, [id]);

  // Destructure the API response data
  const {
    fullname,
    email,
    mobile,
    enrollment_number,
    current_semester,
    department_name,
  } = data?.studentdashboard?.student || {};

  const {
    assignments,
    upcommingassignments,
    subjects,
    quiz,
    totalpercentage,
    exam,
  } = data.studentdashboard;

  // Filter subjects based on search
  const filteredSubjects = subjects.filter(subject =>
    subject.subject_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.subject_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Prepare recent activities from the data
  const recentActivities = [
    ...assignments.filter(a => !a.upcoming).map(a => ({
      icon: <RiFilePaper2Line />,
      title: `Submitted ${a.assignment_name}`,
      time: "2 hours ago",
      type: "assignment"
    })),
    ...quiz.map(q => ({
      icon: <RiQuillPenLine />,
      title: `Completed ${q.quiz_name}`,
      time: "1 day ago",
      type: "quiz"
    }))
  ].slice(0, 4);

  if (loading) {
    return (
      <div className="student-dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="student-dashboard-modern">
      {/* Header Section */}
      <header className="dashboard-modern-header">
        <div className="header-modern-content">
          <div className="student-profile-modern">
            {/* <div className="avatar-modern">
              <FiUser />
            </div> */}
            <div className="student-info-modern">
              <h1 className="welcome-title">Welcome back, <span className="student-name-highlight">{fullname}</span></h1>
              <p className="student-meta-modern">
                <span className="meta-badge">{enrollment_number}</span>
                <span className="meta-badge">{department_name}</span>
                <span className="meta-badge">Semester {current_semester}</span>
              </p>
            </div>
          </div>
          {/* <div className="header-actions-modern">
            <div className="search-bar-modern">
              <FiSearch className="search-icon-modern" />
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-modern"
              />
            </div>
            <button className="notification-btn-modern">
              <FiBell />
              <span className="notification-badge">3</span>
            </button>
          </div> */}
        </div>
      </header>

      {/* Quick Stats */}
      <div className="quick-stats-modern-container">
        <div className="quick-stats-modern">
          <div className="dashboard-stat-card-modern">
            <div className="stat-icon-modern assignment-modern">
              <FiClipboard />
            </div>
            <div className="stat-content-modern">
              <h3 className="stat-number">{upcommingassignments}</h3>
              <p className="stat-label">Upcoming Assignments</p>
            </div>
            <div className="stat-trend positive">+2</div>
          </div>

          <div className="dashboard-stat-card-modern">
            <div className="stat-icon-modern quiz-modern">
              <RiQuillPenLine />
            </div>
            <div className="stat-content-modern">
              <h3 className="stat-number">{quiz.length}</h3>
              <p className="stat-label">Pending Quizzes</p>
            </div>
            <div className="stat-trend warning">Due soon</div>
          </div>

          <div className="dashboard-stat-card-modern">
            <div className="stat-icon-modern attendance-modern">
              <BsCalendarCheck />
            </div>
            <div className="stat-content-modern">
              <h3 className="stat-number">{totalpercentage}%</h3>
              <p className="stat-label">Attendance</p>
            </div>
            <div className="progress-ring-small">
              <CircularProgressbar
                value={parseFloat(totalpercentage)}
                styles={buildStyles({
                  pathColor: `#4CAF50`,
                  trailColor: '#e0e0e0',
                })}
              />
            </div>
          </div>

          <div className="dashboard-stat-card-modern">
            <div className="stat-icon-modern course-modern">
              <FiBook />
            </div>
            <div className="stat-content-modern">
              <h3 className="stat-number">{subjects.length}</h3>
              <p className="stat-label">Ongoing Courses</p>
            </div>
            <div className="stat-trend neutral">Active</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-modern-content">
        {/* Left Column */}
        <div className="content-left-modern">
          {/* Quick Access Section */}
          <section className="modules-section-modern">
            <div className="section-header-modern">
              <h2 className="studentdashboard-section-title">Quick Access</h2>
              <Link to="/student/all-modules" className="view-all-modern">
                View All <FiChevronRight />
              </Link>
            </div>
            <div className="modules-grid-modern">
              <Link to="/student/assignment-page" className="module-card-modern assignment-modern-card">
                <div className="module-icon-modern">
                  <FiClipboard />
                </div>
                <div className="module-content-modern">
                  <h3>Assignments</h3>
                  <p>View and submit your assignments</p>
                  <span className="module-status">{upcommingassignments} pending</span>
                </div>
                <div className="module-arrow">
                  <FiChevronRight />
                </div>
              </Link>

              <Link to="/student/attendence" className="module-card-modern attendance-modern-card">
                <div className="module-icon-modern">
                  <FiCheckCircle />
                </div>
                <div className="module-content-modern">
                  <h3>Attendance</h3>
                  <p>Check your attendance records</p>
                  <span className="module-status">{totalpercentage}% overall</span>
                </div>
                <div className="progress-circle-modern">
                  <CircularProgressbar
                    value={parseFloat(totalpercentage)}
                    styles={buildStyles({
                      pathColor: `#4CAF50`,
                      textColor: '#4CAF50',
                      trailColor: '#e8f5e8',
                    })}
                  />
                </div>
              </Link>

              <Link to="/student/e-course" className="module-card-modern ecourse-modern-card">
                <div className="module-icon-modern">
                  <FiBook />
                </div>
                <div className="module-content-modern">
                  <h3>E-Courses</h3>
                  <p>Access your online courses</p>
                  <span className="module-status">{subjects.length} active courses</span>
                </div>
                <div className="module-arrow">
                  <FiChevronRight />
                </div>
              </Link>

              <Link to="/student/studentsquiz" className="module-card-modern quiz-modern-card">
                <div className="module-icon-modern">
                  <RiQuillPenLine />
                </div>
                <div className="module-content-modern">
                  <h3>Quizzes</h3>
                  <p>Take your scheduled quizzes</p>
                  <span className="module-status">{quiz.length} upcoming</span>
                </div>
                <div className="module-arrow">
                  <FiChevronRight />
                </div>
              </Link>
            </div>
          </section>

          {/* Subjects Section */}
          <section className="courses-section-modern">
            <div className="section-header-modern">
              <h2 className="section-title">Your Subjects</h2>
              <div className="subjects-search-modern">
                <FiSearch className="search-icon-small" />
                <input
                  type="text"
                  placeholder="Search subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input-small"
                />
              </div>
            </div>
            <div className="courses-list-modern">
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject, index) => (
                  <div className="course-item-modern" key={index}>
                    <div className="course-color-indicator" style={{ backgroundColor: `hsl(${index * 60}, 70%, 60%)` }}></div>
                    <div className="course-info-modern">
                      <h3 className="course-code">{subject.subject_code}</h3>
                      <p className="course-name">{subject.subject_name}</p>
                    </div>
                    <div className="course-actions">
                      <button className="course-action-btn materials">Materials</button>
                      <button className="course-action-btn assignments">Assignments</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-subjects-modern">
                  <FiBook className="no-data-icon" />
                  <p>No subjects found matching your search</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="content-right-modern">
          {/* Recent Activity Section */}
          <section className="activity-section-modern">
            <div className="section-header-modern">
              <h2 className="section-title">Recent Activity</h2>
              <Link to="/student/activity" className="view-all-modern">
                View All <FiChevronRight />
              </Link>
            </div>
            <div className="activity-list-modern">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div className={`activity-item-modern ${activity.type}-activity`} key={index}>
                    <div className="activity-icon-modern">{activity.icon}</div>
                    <div className="activity-content-modern">
                      <p className="activity-title">{activity.title}</p>
                      <div className="activity-meta-modern">
                        <FiClock className="time-icon-modern" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                    <div className="activity-badge"></div>
                  </div>
                ))
              ) : (
                <div className="no-activities-modern">
                  <RiFilePaper2Line className="no-data-icon" />
                  <p>No recent activities found</p>
                </div>
              )}
            </div>
          </section>

          {/* Upcoming Exams Section */}
          <section className="exams-section-modern">
            <div className="section-header-modern">
              <h2 className="section-title">Upcoming Exams</h2>
              <span className="exams-count">{exam.length} scheduled</span>
            </div>
            <div className="exams-list-modern">
              {exam.length > 0 ? (
                exam.map((examItem, index) => (
                  <div className="exam-item-modern" key={index}>
                    <div className="exam-icon-modern">
                      <FiAward />
                    </div>
                    <div className="exam-content-modern">
                      <h3 className="exam-name">{examItem.name}</h3>
                      <p className="exam-date">December 15, 2024 • 10:00 AM</p>
                      <div className="exam-actions">
                        <button className="exam-btn primary">Study Plan</button>
                        <button className="exam-btn secondary">Materials</button>
                      </div>
                    </div>
                    <div className="exam-status upcoming">Upcoming</div>
                  </div>
                ))
              ) : (
                <div className="no-exams-modern">
                  <FiAward className="no-data-icon" />
                  <p>No upcoming exams scheduled</p>
                  <button className="cta-btn-modern">View Exam Schedule</button>
                </div>
              )}
            </div>
          </section>

          {/* Performance Summary */}
          <section className="performance-summary-modern">
            <div className="section-header-modern">
              <h2 className="section-title">Performance Summary</h2>
            </div>
            <div className="performance-cards-modern">
              <div className="performance-card-modern">
                <div className="performance-icon overall">
                  <BsGraphUp />
                </div>
                <div className="performance-content">
                  <h3>Overall Grade</h3>
                  <p className="performance-value">A-</p>
                  <p className="performance-change positive">+5% from last sem</p>
                </div>
              </div>
              <div className="performance-card-modern">
                <div className="performance-icon assignments">
                  <FiClipboard />
                </div>
                <div className="performance-content">
                  <h3>Assignments</h3>
                  <p className="performance-value">92%</p>
                  <p className="performance-change positive">On track</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;