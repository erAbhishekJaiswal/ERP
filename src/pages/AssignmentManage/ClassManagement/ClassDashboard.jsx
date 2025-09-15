// ClassDashboard.js
import React, { useEffect, useState } from 'react';
import styles from './ClassDashboard.module.css';
import axios from 'axios';
import apiClient from '../../../services/axios';

const ClassDashboard = () => {
    const [activeTab, setActiveTab] = useState('assignments');
    const [courses] = useState([
      { id: 'CS101', name: 'Computer Science 101', students: 45 },
      { id: 'MATH202', name: 'Mathematics 202', students: 32 }
    ]);
  
    // Local state for assignments
    const [assignments, setAssignments] = useState([
      {
        id: 1,
        title: 'Final Project',
        course: 'CS101',
        dueDate: '2023-12-15',
        submissions: 0,
        late: 0,
        missing: 0
      }
    ]);

    const fatchAssignmentsData = async () => {
      try {
        const response = await apiClient.get('/api/assignment/allassignments');
        setAssignments(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    }

    useEffect(() => {
      // Fetch assignments data from the server when the component mounts
      fatchAssignmentsData();
      // Optionally, you can set up a polling mechanism to refresh data periodically
    },[])
  
    // Local state for groups
    const [groups, setGroups] = useState([
      {
        id: 1,
        name: 'Group A',
        assignmentId: 1,
        members: ['Student 1', 'Student 2']
      }
    ]);
  
    const [newGroup, setNewGroup] = useState({
      name: '',
      members: [],
      assignment: ''
    });
  
    // const handleGroupChange = (e) => {
    //   const { name, value } = e.target;
    //   setNewGroup(prev => ({ ...prev, [name]: value }));
    // };
  
    // const createGroup = () => {
    //   const newGroupObj = {
    //     id: Date.now(),
    //     name: newGroup.name,
    //     assignmentId: newGroup.assignment,
    //     members: newGroup.members
    //   };
    //   setGroups([...groups, newGroupObj]);
    //   setNewGroup({ name: '', members: [], assignment: '' });
    // };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>All Assignments and Groups</h1>
        <div className={styles.tabs}>
          {/* <button
            className={`${styles.tabButton} ${activeTab === 'assignments' ? styles.active : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            Assignments
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'groups' ? styles.active : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            Group Management
          </button> */}
        </div>
      </div>

      {activeTab === 'assignments' && (
        <div className={styles.assignmentsSection}>
          <div className={styles.courseSelector}>
            <select>
              <option value="">All Courses</option>
              {courses?.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.assignmentsGrid}>
            {assignments?.map(assignment => (
              <div key={assignment.id} className={styles.assignmentCard}>
                <h3>{assignment.title}</h3>
                <p className={styles.courseName}>{assignment.course}</p>
                <p className={styles.dueDate}>Due: {assignment.dueDate}</p>
                <div className={styles.submissionStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{assignment.submissions}</span>
                    <span className={styles.statLabel}>Submitted</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{assignment.late}</span>
                    <span className={styles.statLabel}>Late</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{assignment.missing}</span>
                    <span className={styles.statLabel}>Missing</span>
                  </div>
                </div>
                <button className={styles.viewButton}>View Details</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* {activeTab === 'groups' && (
        <div className={styles.groupsSection}>
          <div className={styles.createGroupForm}>
            <h3>Create New Group</h3>
            <div className={styles.formGroup}>
              <label>Group Name</label>
              <input
                type="text"
                name="name"
                value={newGroup.name}
                onChange={handleGroupChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Assignment</label>
              <select
                name="assignment"
                value={newGroup.assignment}
                onChange={handleGroupChange}
              >
                <option value="">Select assignment</option>
                {assignments.map(assignment => (
                  <option key={assignment.id} value={assignment.id}>
                    {assignment.title} ({assignment.course})
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Add Members</label>
              <div className={styles.memberSelection}>
                
                <p>Student selection would appear here</p>
              </div>
            </div>
            <button onClick={createGroup} className={styles.createButton}>
              Create Group
            </button>
          </div>

          <div className={styles.existingGroups}>
            <h3>Existing Groups</h3>
            <div className={styles.groupsList}>
              <div className={styles.groupCard}>
                <h4>Group A - Final Project</h4>
                <p>CS101 - 4 members</p>
                <div className={styles.groupActions}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>Delete</button>
                </div>
              </div>
              <div className={styles.groupCard}>
                <h4>Group B - Midterm Exam</h4>
                <p>MATH202 - 3 members</p>
                <div className={styles.groupActions}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ClassDashboard;