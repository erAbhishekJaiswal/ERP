import { useState } from 'react';
import { FiUpload, FiFileText, FiUsers, FiSave, FiX, FiCheck } from 'react-icons/fi';
import './Submission.css';

const Submission = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [files, setFiles] = useState([]);
  const [textContent, setTextContent] = useState('');
  const [isGroupSubmission, setIsGroupSubmission] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [newMember, setNewMember] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type.split('/')[1] || file.type
    }))]);
  };

  const removeFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const addGroupMember = () => {
    if (newMember.trim() && !groupMembers.includes(newMember.trim())) {
      setGroupMembers([...groupMembers, newMember.trim()]);
      setNewMember('');
    }
  };

  const removeGroupMember = (member) => {
    setGroupMembers(groupMembers.filter(m => m !== member));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="submission-container">
      <div className="submission-header">
        <h1>Assignment Submission</h1>
        <div className="assignment-info">
          <span>React Project</span>
          <span>Due: June 18, 2023 at 11:59 PM</span>
        </div>
      </div>

      <div className="submission-tabs">
        <button 
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          <FiUpload /> File Upload
        </button>
        <button 
          className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          <FiFileText /> Text Submission
        </button>
      </div>

      <div className="submission-content">
        {activeTab === 'upload' ? (
          <div className="file-upload-section">
            <div className="upload-area">
              <input 
                type="file" 
                id="file-upload"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              <label htmlFor="file-upload" className="upload-label">
                <FiUpload className="upload-icon" />
                <h3>Drag & drop files here</h3>
                <p>or click to browse your files</p>
                <span className="file-types">Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG</span>
              </label>
            </div>

            {files.length > 0 && (
              <div className="file-list">
                <h4>Selected Files ({files.length})</h4>
                <ul>
                  {files.map(file => (
                    <li key={file.id}>
                      <div className="file-info">
                        <span className="file-name">{file.name}</span>
                        <span className="file-meta">
                          {file.type.toUpperCase()} • {formatFileSize(file.size)}
                        </span>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFile(file.id)}
                      >
                        <FiX />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="text-submission-section">
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Type your submission here..."
              className="submission-textarea"
            />
            <div className="word-count">
              {textContent.length} characters
            </div>
          </div>
        )}
      </div>

      <div className="submission-options">
        <div className="option-group">
          <input 
            type="checkbox" 
            id="group-submission"
            checked={isGroupSubmission}
            onChange={() => setIsGroupSubmission(!isGroupSubmission)}
          />
          <label htmlFor="group-submission">
            <FiUsers /> This is a group submission
          </label>
        </div>

        {isGroupSubmission && (
          <div className="group-members">
            <div className="member-input">
              <input
                type="email"
                placeholder="Add group member by email"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
              />
              <button 
                className="add-btn"
                onClick={addGroupMember}
              >
                <FiCheck />
              </button>
            </div>
            {groupMembers.length > 0 && (
              <div className="members-list">
                {groupMembers.map((member, index) => (
                  <div key={index} className="member-tag">
                    {member}
                    <button 
                      className="remove-btn"
                      onClick={() => removeGroupMember(member)}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="submission-actions">
        <button className="save-btn">
          <FiSave /> Save Draft
        </button>
        <button className="submit-btn">
          Submit Assignment
        </button>
      </div>
    </div>
  );
};

export default Submission;