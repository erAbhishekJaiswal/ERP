import React, { useState } from 'react';
import styles from './GradingTool.module.css';

const GradingTool = () => {
  const [activeTab, setActiveTab] = useState('submissions');
  const [selectedAssignment, setSelectedAssignment] = useState('');
  
  // Local state for assignments
  const [assignments] = useState([
    { 
      id: '1', 
      title: 'Final Project', 
      course: 'CS101',
      submissions: 15,
      graded: 5
    }
  ]);

  // Local state for submissions
  const [submissions, setSubmissions] = useState([
    { 
      id: '101', 
      student: 'John Doe', 
      submitted: '2023-11-15',
      status: 'Submitted',
      file: 'project.pdf',
      similarity: '12%',
      grade: null,
      feedback: ''
    },
    { 
      id: '102', 
      student: 'Jane Smith', 
      submitted: '2023-11-16',
      status: 'Late',
      file: 'project.docx',
      similarity: '8%',
      grade: null,
      feedback: ''
    }
  ]);

  // Rubric definition
  const [rubric] = useState([
    { id: '1', criteria: 'Code Quality', maxPoints: 20 },
    { id: '2', criteria: 'Documentation', maxPoints: 15 },
    { id: '3', criteria: 'Functionality', maxPoints: 30 },
    { id: '4', criteria: 'Creativity', maxPoints: 15 },
    { id: '5', criteria: 'Presentation', maxPoints: 20 }
  ]);

  // Current grading state
  const [currentGrading, setCurrentGrading] = useState({
    submissionId: '',
    rubricScores: {},
    feedback: '',
    feedbackType: 'written'
  });

  // Calculate total score from rubric scores
  const calculateTotal = () => {
    return Object.values(currentGrading.rubricScores).reduce(
      (sum, score) => sum + (parseInt(score) || 0), 0
    );
  };

  // Handle rubric score changes
  const handleRubricScore = (criteriaId, score) => {
    setCurrentGrading(prev => ({
      ...prev,
      rubricScores: {
        ...prev.rubricScores,
        [criteriaId]: score
      }
    }));
  };

  // Handle feedback type change
  const handleFeedbackTypeChange = (type) => {
    setCurrentGrading(prev => ({
      ...prev,
      feedbackType: type
    }));
  };

  // Handle feedback text change
  const handleFeedbackChange = (e) => {
    setCurrentGrading(prev => ({
      ...prev,
      feedback: e.target.value
    }));
  };

  // Submit grade for a submission
  const submitGrade = () => {
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === currentGrading.submissionId) {
        return {
          ...sub,
          grade: calculateTotal(),
          feedback: currentGrading.feedback
        };
      }
      return sub;
    });
    
    setSubmissions(updatedSubmissions);
    setCurrentGrading({
      submissionId: '',
      rubricScores: {},
      feedback: '',
      feedbackType: 'written'
    });
    alert('Grade submitted successfully!');
  };

  // Select a submission for grading
  const selectSubmissionForGrading = (submissionId) => {
    const submission = submissions.find(sub => sub.id === submissionId);
    if (submission) {
      setCurrentGrading({
        submissionId: submission.id,
        rubricScores: {},
        feedback: submission.feedback || '',
        feedbackType: 'written'
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Grading & Feedback</h1>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'submissions' ? styles.active : ''}`}
            onClick={() => setActiveTab('submissions')}
          >
            Submissions
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'analytics' ? styles.active : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Grade Analytics
          </button>
        </div>
      </div>

      {activeTab === 'submissions' && (
        <div className={styles.submissionsSection}>
          <div className={styles.assignmentSelector}>
            <select
              value={selectedAssignment}
              onChange={(e) => setSelectedAssignment(e.target.value)}
            >
              <option value="">Select an assignment</option>
              {assignments.map(assignment => (
                <option key={assignment.id} value={assignment.id}>
                  {assignment.title} ({assignment.course}) - {assignment.graded}/{assignment.submissions} graded
                </option>
              ))}
            </select>
          </div>

          {selectedAssignment && (
            <div className={styles.gradingInterface}>
              <div className={styles.submissionsList}>
                <h3>Submissions</h3>
                <table className={styles.submissionsTable}>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Submitted</th>
                      <th>Status</th>
                      <th>Similarity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map(submission => (
                      <tr key={submission.id}>
                        <td>{submission.student}</td>
                        <td>{submission.submitted}</td>
                        <td>
                          <span className={`${styles.status} ${styles[submission.status.toLowerCase()]}`}>
                            {submission.status}
                          </span>
                        </td>
                        <td>
                          <span className={submission.similarity > '10%' ? styles.highSimilarity : styles.lowSimilarity}>
                            {submission.similarity}
                          </span>
                        </td>
                        <td>
                          <button 
                            className={styles.gradeButton}
                            onClick={() => selectSubmissionForGrading(submission.id)}
                          >
                            Grade
                          </button>
                          <a href={`#${submission.file}`} className={styles.downloadLink}>Download</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {currentGrading.submissionId && (
                <div className={styles.gradingPanel}>
                  <h3>Grading: {
                    submissions.find(sub => sub.id === currentGrading.submissionId)?.student
                  }</h3>
                  
                  <div className={styles.rubricGrading}>
                    <h4>Rubric Scoring</h4>
                    {rubric.map(item => (
                      <div key={item.id} className={styles.rubricItem}>
                        <label>{item.criteria} (Max: {item.maxPoints})</label>
                        <input
                          type="number"
                          min="0"
                          max={item.maxPoints}
                          value={currentGrading.rubricScores[item.id] || ''}
                          onChange={(e) => handleRubricScore(item.id, e.target.value)}
                        />
                      </div>
                    ))}
                    <div className={styles.totalScore}>
                      <strong>Total Score:</strong> {calculateTotal()} / {
                        rubric.reduce((sum, item) => sum + item.maxPoints, 0)
                      }
                    </div>
                  </div>

                  <div className={styles.feedbackSection}>
                    <h4>Feedback</h4>
                    <div className={styles.feedbackTypeSelector}>
                      <button
                        className={`${styles.feedbackTypeButton} ${
                          currentGrading.feedbackType === 'written' ? styles.active : ''
                        }`}
                        onClick={() => handleFeedbackTypeChange('written')}
                      >
                        Written
                      </button>
                      <button
                        className={`${styles.feedbackTypeButton} ${
                          currentGrading.feedbackType === 'audio' ? styles.active : ''
                        }`}
                        onClick={() => handleFeedbackTypeChange('audio')}
                      >
                        Audio
                      </button>
                      <button
                        className={`${styles.feedbackTypeButton} ${
                          currentGrading.feedbackType === 'video' ? styles.active : ''
                        }`}
                        onClick={() => handleFeedbackTypeChange('video')}
                      >
                        Video
                      </button>
                    </div>

                    {currentGrading.feedbackType === 'written' && (
                      <textarea
                        value={currentGrading.feedback}
                        onChange={handleFeedbackChange}
                        placeholder="Enter your feedback here..."
                        rows={6}
                      />
                    )}

                    {currentGrading.feedbackType === 'audio' && (
                      <div className={styles.audioFeedback}>
                        <button className={styles.recordButton}>Start Recording</button>
                        <p className={styles.audioNote}>Audio recording functionality would be implemented here</p>
                      </div>
                    )}

                    {currentGrading.feedbackType === 'video' && (
                      <div className={styles.videoFeedback}>
                        <button className={styles.recordButton}>Start Video Recording</button>
                        <p className={styles.videoNote}>Video recording functionality would be implemented here</p>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={submitGrade} 
                    className={styles.submitGradeButton}
                    disabled={!currentGrading.feedback}
                  >
                    Submit Grade & Feedback
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className={styles.analyticsSection}>
          <div className={styles.assignmentSelector}>
            <select>
              <option value="">Select an assignment</option>
              {assignments.map(assignment => (
                <option key={assignment.id} value={assignment.id}>
                  {assignment.title} ({assignment.course})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.analyticsCharts}>
            <div className={styles.chartContainer}>
              <h3>Grade Distribution</h3>
              <div className={styles.chartPlaceholder}>
                <p>Grade distribution chart would appear here</p>
              </div>
            </div>
            <div className={styles.chartContainer}>
              <h3>Submission Status</h3>
              <div className={styles.chartPlaceholder}>
                <p>Submission status chart would appear here</p>
              </div>
            </div>
          </div>

          <div className={styles.gradeStats}>
            <div className={styles.statCard}>
              <h4>Average Grade</h4>
              <p className={styles.statValue}>78.5%</p>
            </div>
            <div className={styles.statCard}>
              <h4>Highest Grade</h4>
              <p className={styles.statValue}>97%</p>
            </div>
            <div className={styles.statCard}>
              <h4>Lowest Grade</h4>
              <p className={styles.statValue}>45%</p>
            </div>
            <div className={styles.statCard}>
              <h4>Median Grade</h4>
              <p className={styles.statValue}>82%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradingTool;