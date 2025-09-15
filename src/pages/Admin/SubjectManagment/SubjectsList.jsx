import React, { useEffect, useState } from 'react';
import './subjectcss/subjectslist.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../services/axios';
// import { useParams } from 'react-router-dom';
// import './SubjectsView.css'; // We'll create this CSS file

const SubjectsView = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  // const [loading, setLoading] = useState(true);
  const fatchSubjectList = async () => {
    try {
      const response = await apiClient.get('/api/features/subjectlist');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      
    }
  };

  useEffect(() => {
    fatchSubjectList();
  }, []);
  const [expandedSubject, setExpandedSubject] = useState(null);

  const toggleExpand = (id) => {
    setExpandedSubject(expandedSubject === id ? null : id);
  };

  return (
    <div className="subjects-container">
      <h1 className="page-title">Subjects</h1>
      <p className="page-subtitle">{data?.message}</p>
      
      <div className="subject-grid">
        {data?.allSubject.map((subject) => (
          <div 
            key={subject._id} 
            className={`subject-card ${expandedSubject === subject._id ? 'expanded' : ''}`}
          >
            <div className="subject-header" onClick={() => toggleExpand(subject._id)}>
              <div className="subjectlist-code">{subject.code}</div>
              <h2 className="subject-name">{subject.name}</h2>
              <div className="subject-credits">{subject.credits} Credits</div>
              <div className="expand-icon">
                {/* {expandedSubject === subject._id ? '−' : '+'} */}
                <button className="subject-view-button" onClick={()=>navigate(`/admin/subjectdetail/${subject._id}`)}>View</button>
              </div>
              {/* <div className="subject-view-btn">
              </div> */}
            </div>
            
            {/* {expandedSubject === subject._id && ( */}
              <div className="subject-details">
                <div className="detail-section">
                  <h3>Description</h3>
                  <p>{subject?.description}</p>
                </div>
                
              
                
                <div className="meta-info">
                  <span>Created: {new Date(subject?.createdAt).toLocaleDateString()}</span>
                  <span>Last updated: {new Date(subject?.updatedAt).toLocaleDateString()}</span>
                  <span className={`status ${subject?.is_active ? 'active' : 'inactive'}`}>
                    {subject.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsView;