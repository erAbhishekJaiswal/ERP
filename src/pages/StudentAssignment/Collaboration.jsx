import { useState } from 'react';
import { FiUsers, FiMessageSquare, FiCheck, FiX, FiStar } from 'react-icons/fi';
import './Collaboration.css';

const Collaboration = () => {
  const [activeTab, setActiveTab] = useState('peer-review');
  const [expandedReview, setExpandedReview] = useState(null);
  const [newComment, setNewComment] = useState('');

  const peerReviews = [
    {
      id: 1,
      title: 'Literature Essay Draft',
      author: 'John Smith',
      dueDate: '2023-06-20',
      status: 'pending',
      rubric: [
        { criterion: 'Thesis Clarity', maxScore: 20 },
        { criterion: 'Evidence Quality', maxScore: 30 },
        { criterion: 'Organization', maxScore: 25 },
        { criterion: 'Grammar/Mechanics', maxScore: 25 }
      ]
    },
    {
      id: 2,
      title: 'React Project Proposal',
      author: 'Sarah Johnson',
      dueDate: '2023-06-22',
      status: 'in-progress',
      rubric: [
        { criterion: 'Concept Originality', maxScore: 20 },
        { criterion: 'Technical Feasibility', maxScore: 30 },
        { criterion: 'Presentation', maxScore: 25 },
        { criterion: 'Timeline', maxScore: 25 }
      ]
    }
  ];

  const groups = [
    {
      id: 1,
      name: 'CS Project Team',
      members: ['You', 'Alex', 'Jamie', 'Taylor'],
      currentTask: 'Final Project Implementation',
      progress: 65
    },
    {
      id: 2,
      name: 'Literature Discussion',
      members: ['You', 'Morgan', 'Casey'],
      currentTask: 'Novel Analysis',
      progress: 30
    }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Help with Linear Algebra Problem',
      course: 'Mathematics',
      lastPost: '2 hours ago',
      replies: 5,
      unread: true
    },
    {
      id: 2,
      title: 'React State Management Best Practices',
      course: 'Computer Science',
      lastPost: '1 day ago',
      replies: 12,
      unread: false
    }
  ];

  const toggleReview = (id) => {
    setExpandedReview(expandedReview === id ? null : id);
  };

  return (
    <div className="collaboration-container">
      <div className="collaboration-header">
        <h1>Collaboration Tools</h1>
        <div className="collaboration-tabs">
          <button 
            className={`tab-btn ${activeTab === 'peer-review' ? 'active' : ''}`}
            onClick={() => setActiveTab('peer-review')}
          >
            <FiStar /> Peer Review
          </button>
          <button 
            className={`tab-btn ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            <FiUsers /> Group Work
          </button>
          <button 
            className={`tab-btn ${activeTab === 'discussions' ? 'active' : ''}`}
            onClick={() => setActiveTab('discussions')}
          >
            <FiMessageSquare /> Discussions
          </button>
        </div>
      </div>

      <div className="collaboration-content">
        {activeTab === 'peer-review' ? (
          <div className="peer-review-section">
            <h2>Assignments for Peer Review</h2>
            <div className="review-list">
              {peerReviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="card-header">
                    <h3>{review.title}</h3>
                    <div className="review-meta">
                      <span className="author">By: {review.author}</span>
                      <span className="due-date">Due: {new Date(review.dueDate).toLocaleDateString()}</span>
                      <span className={`status ${review.status}`}>
                        {review.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <button 
                      className="toggle-btn"
                      onClick={() => toggleReview(review.id)}
                    >
                      {expandedReview === review.id ? 'Hide Rubric' : 'Show Rubric'}
                    </button>
                    {expandedReview === review.id && (
                      <div className="rubric-section">
                        <h4>Review Rubric</h4>
                        <div className="rubric-items">
                          {review.rubric.map((item, index) => (
                            <div key={index} className="rubric-item">
                              <label>{item.criterion} (Max: {item.maxScore} pts)</label>
                              <input 
                                type="number" 
                                min="0" 
                                max={item.maxScore}
                                placeholder={`0-${item.maxScore}`}
                              />
                              <textarea 
                                placeholder="Add comments..."
                                rows="2"
                              ></textarea>
                            </div>
                          ))}
                        </div>
                        <div className="general-feedback">
                          <h4>General Feedback</h4>
                          <textarea 
                            placeholder="Provide overall feedback here..."
                            rows="4"
                          ></textarea>
                        </div>
                        <div className="review-actions">
                          <button className="save-btn">Save Draft</button>
                          <button className="submit-btn">Submit Review</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'groups' ? (
          <div className="group-work-section">
            <h2>Your Groups</h2>
            <div className="groups-list">
              {groups.map(group => (
                <div key={group.id} className="group-card">
                  <div className="card-header">
                    <h3>{group.name}</h3>
                    <div className="members">
                      {group.members.map((member, index) => (
                        <span key={index} className="member-tag">
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="current-task">
                      <h4>Current Task:</h4>
                      <p>{group.currentTask}</p>
                    </div>
                    <div className="progress-container">
                      <label>Progress: {group.progress}%</label>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${group.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="chat-btn">Group Chat</button>
                    <button className="files-btn">Shared Files</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="create-group-btn">
              + Create New Group
            </button>
          </div>
        ) : (
          <div className="discussions-section">
            <h2>Discussion Forums</h2>
            <div className="discussions-list">
              {discussions.map(discussion => (
                <div key={discussion.id} className={`discussion-card ${discussion.unread ? 'unread' : ''}`}>
                  <div className="card-header">
                    <h3>{discussion.title}</h3>
                    <span className="course-tag">{discussion.course}</span>
                  </div>
                  <div className="card-body">
                    <div className="discussion-meta">
                      <span className="replies">{discussion.replies} replies</span>
                      <span className="last-post">Last post: {discussion.lastPost}</span>
                    </div>
                    {discussion.unread && <span className="unread-badge">New</span>}
                  </div>
                  <div className="card-actions">
                    <button className="view-btn">View Discussion</button>
                    <button className="reply-btn">Reply</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="new-discussion">
              <h3>Start New Discussion</h3>
              <div className="discussion-form">
                <input type="text" placeholder="Discussion Title" />
                <select>
                  <option value="">Select Course</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
                <textarea 
                  placeholder="Write your post here..."
                  rows="5"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <div className="form-actions">
                  <button className="cancel-btn">Cancel</button>
                  <button className="post-btn">Post Discussion</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collaboration;