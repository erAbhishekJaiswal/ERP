import { useState } from 'react';
import { FiStar, FiBarChart2, FiTrendingUp, FiAward } from 'react-icons/fi';
import './Grades.css';

const Grades = () => {
  const [activeTab, setActiveTab] = useState('grades');
  const [expandedFeedback, setExpandedFeedback] = useState(null);

  const gradedAssignments = [
    {
      id: 1,
      title: 'Linear Algebra Midterm',
      course: 'Mathematics',
      grade: 'A',
      score: 95,
      classAverage: 82,
      feedback: 'Excellent work! You demonstrated a strong understanding of all concepts covered. Your proofs were particularly well-structured.',
      rubric: {
        criteria: [
          { name: 'Conceptual Understanding', score: 25, max: 25 },
          { name: 'Problem Solving', score: 23, max: 25 },
          { name: 'Accuracy', score: 24, max: 25 },
          { name: 'Presentation', score: 23, max: 25 }
        ],
        comments: 'Your presentation was very neat and easy to follow. Keep up the good work!'
      }
    },
    {
      id: 2,
      title: 'React Project',
      course: 'Computer Science',
      grade: 'B+',
      score: 87,
      classAverage: 78,
      feedback: 'Good implementation of core requirements. Would like to see more comments in your code and additional test cases.',
      rubric: {
        criteria: [
          { name: 'Functionality', score: 35, max: 40 },
          { name: 'Code Quality', score: 25, max: 30 },
          { name: 'UI/UX', score: 18, max: 20 },
          { name: 'Documentation', score: 9, max: 10 }
        ],
        comments: 'The UI was clean and intuitive, but some edge cases were not handled.'
      }
    }
  ];

  const gradeHistory = [
    { month: 'Jan', grade: 82 },
    { month: 'Feb', grade: 85 },
    { month: 'Mar', grade: 88 },
    { month: 'Apr', grade: 87 },
    { month: 'May', grade: 91 }
  ];

  const toggleFeedback = (id) => {
    setExpandedFeedback(expandedFeedback === id ? null : id);
  };

  return (
    <div className="grades-container">
      <div className="grades-header">
        <h1>Grades & Feedback</h1>
        <div className="grades-tabs">
          <button 
            className={`tab-btn ${activeTab === 'grades' ? 'active' : ''}`}
            onClick={() => setActiveTab('grades')}
          >
            Graded Assignments
          </button>
          <button 
            className={`tab-btn ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            Grade Progress
          </button>
        </div>
      </div>

      {activeTab === 'grades' ? (
        <div className="grades-content">
          <div className="grades-summary">
            <div className="summary-card">
              <FiStar className="icon" />
              <div className="summary-content">
                <h3>Current GPA</h3>
                <p className="value">3.72</p>
              </div>
            </div>
            <div className="summary-card">
              <FiBarChart2 className="icon" />
              <div className="summary-content">
                <h3>Class Average</h3>
                <p className="value">3.21</p>
              </div>
            </div>
            <div className="summary-card">
              <FiTrendingUp className="icon" />
              <div className="summary-content">
                <h3>Trend</h3>
                <p className="value positive">+8%</p>
              </div>
            </div>
          </div>

          <div className="assignments-list">
            {gradedAssignments.map(assignment => (
              <div key={assignment.id} className="grade-card">
                <div className="card-header">
                  <h3>{assignment.title}</h3>
                  <div className="grade-display">
                    <span className={`grade ${assignment.grade}`}>{assignment.grade}</span>
                    <span className="score">{assignment.score}%</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="course-info">
                    <span className="course">{assignment.course}</span>
                    <div className="comparison">
                      <span>Class Avg: {assignment.classAverage}%</span>
                      <span className={`difference ${assignment.score > assignment.classAverage ? 'positive' : 'negative'}`}>
                        {assignment.score > assignment.classAverage ? '+' : ''}
                        {(assignment.score - assignment.classAverage).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="feedback-section">
                    <h4>Instructor Feedback</h4>
                    <p className={`feedback-text ${expandedFeedback === assignment.id ? 'expanded' : ''}`}>
                      {assignment.feedback}
                    </p>
                    <button 
                      className="toggle-feedback"
                      onClick={() => toggleFeedback(assignment.id)}
                    >
                      {expandedFeedback === assignment.id ? 'Show Less' : 'Read More'}
                    </button>
                  </div>
                  {expandedFeedback === assignment.id && (
                    <div className="rubric-section">
                      <h4>Grading Rubric</h4>
                      <div className="rubric-details">
                        {assignment.rubric.criteria.map((criterion, index) => (
                          <div key={index} className="rubric-item">
                            <span className="criterion-name">{criterion.name}</span>
                            <div className="score-bar">
                              <div 
                                className="score-fill"
                                style={{ width: `${(criterion.score / criterion.max) * 100}%` }}
                              ></div>
                              <span className="score-text">
                                {criterion.score}/{criterion.max}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="rubric-comments">
                        <h5>Additional Comments:</h5>
                        <p>{assignment.rubric.comments}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="progress-content">
          <div className="progress-chart">
            <h3>Grade Trend</h3>
            <div className="chart-container">
              {gradeHistory.map((month, index) => (
                <div key={index} className="chart-bar-container">
                  <div 
                    className="chart-bar"
                    style={{ height: `${month.grade}%` }}
                  >
                    <span className="bar-value">{month.grade}%</span>
                  </div>
                  <span className="bar-label">{month.month}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="progress-stats">
            <div className="stat-card">
              <FiAward className="icon" />
              <h3>Highest Grade</h3>
              <p className="stat-value">A (95%)</p>
            </div>
            <div className="stat-card">
              <FiTrendingUp className="icon" />
              <h3>Improvement</h3>
              <p className="stat-value positive">+9%</p>
            </div>
            <div className="stat-card">
              <FiBarChart2 className="icon" />
              <h3>Consistency</h3>
              <p className="stat-value">85%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grades;