// PlagiarismReports.js
import React, { useState } from 'react';
import styles from './PlagiarismReports.module.css';

const PlagiarismReports = () => {
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  const assignments = [
    { id: '1', title: 'Final Project', course: 'CS101', submissions: 15, checked: 10 },
    { id: '2', title: 'Research Paper', course: 'ENG105', submissions: 25, checked: 15 }
  ];

  const reports = [
    {
      id: '101',
      student: 'John Doe',
      similarity: '18%',
      flagged: true,
      details: [
        { source: 'Source A', similarity: '12%', url: '#' },
        { source: 'Source B', similarity: '6%', url: '#' }
      ]
    },
    {
      id: '102',
      student: 'Jane Smith',
      similarity: '7%',
      flagged: false,
      details: [
        { source: 'Source C', similarity: '7%', url: '#' }
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Plagiarism Checking</h1>
      
      <div className={styles.assignmentSelector}>
        <select
          value={selectedAssignment}
          onChange={(e) => setSelectedAssignment(e.target.value)}
        >
          <option value="">Select an assignment</option>
          {assignments.map(assignment => (
            <option key={assignment.id} value={assignment.id}>
              {assignment.title} ({assignment.course}) - {assignment.checked}/{assignment.submissions} checked
            </option>
          ))}
        </select>
        <button className={styles.checkAllButton}>Check All Submissions</button>
      </div>

      {selectedAssignment && (
        <div className={styles.reportsContainer}>
          <div className={styles.reportsList}>
            <h3>Plagiarism Reports</h3>
            <table className={styles.reportsTable}>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Similarity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map(report => (
                  <tr 
                    key={report.id} 
                    className={`${styles.reportRow} ${selectedReport?.id === report.id ? styles.selected : ''}`}
                    onClick={() => setSelectedReport(report)}
                  >
                    <td>{report.student}</td>
                    <td>
                      <span className={`${styles.similarity} ${report.flagged ? styles.flagged : ''}`}>
                        {report.similarity}
                      </span>
                    </td>
                    <td>
                      {report.flagged ? (
                        <span className={styles.flaggedStatus}>Flagged</span>
                      ) : (
                        <span className={styles.clearStatus}>Clear</span>
                      )}
                    </td>
                    <td>
                      <button className={styles.viewButton}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedReport && (
            <div className={styles.reportDetails}>
              <h3>Report Details: {selectedReport.student}</h3>
              
              <div className={styles.similaritySummary}>
                <div className={styles.similarityScore}>
                  <h4>Overall Similarity</h4>
                  <div className={`${styles.scoreValue} ${selectedReport.flagged ? styles.flagged : ''}`}>
                    {selectedReport.similarity}
                  </div>
                </div>
                <div className={styles.similarityBreakdown}>
                  <h4>Sources</h4>
                  <ul>
                    {selectedReport.details.map((detail, index) => (
                      <li key={index} className={styles.sourceItem}>
                        <a href={detail.url} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                          {detail.source} ({detail.similarity})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.sideBySideView}>
                <div className={styles.original}>
                  <h4>Student Submission</h4>
                  <div className={styles.contentPlaceholder}>
                    <p>Original submission content would appear here with highlighted matches</p>
                  </div>
                </div>
                <div className={styles.matched}>
                  <h4>Matched Sources</h4>
                  <div className={styles.contentPlaceholder}>
                    <p>Matched source content would appear here with highlighted matches</p>
                  </div>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.flagButton}>
                  {selectedReport.flagged ? 'Unflag Submission' : 'Flag Submission'}
                </button>
                <button className={styles.downloadButton}>Download Full Report</button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className={styles.integrationSection}>
        <h3>Plagiarism Check Integration</h3>
        <div className={styles.integrationOptions}>
          <div className={styles.integrationCard}>
            <h4>Turnitin</h4>
            <p>Connect to your Turnitin account for advanced plagiarism detection</p>
            <button className={styles.connectButton}>Connect</button>
          </div>
          <div className={styles.integrationCard}>
            <h4>Unicheck</h4>
            <p>Integrate with Unicheck for real-time plagiarism checking</p>
            <button className={styles.connectButton}>Connect</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlagiarismReports;