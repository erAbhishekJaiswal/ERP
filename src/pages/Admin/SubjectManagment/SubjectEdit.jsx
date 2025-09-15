// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './subjectcss/EditSubject.css';
// import axios from 'axios';

// const EditSubject = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [subject, setSubject] = useState({
//     code: '',
//     name: '',
//     credits: 4,
//     description: '',
//     syllabus: [],
//     schedule: [],
//     classes: [],
//     is_active: true,
//     semester: '',
//     academic_year: ''
//   });
//   const [newSyllabusItem, setNewSyllabusItem] = useState('');
//   const [newScheduleItem, setNewScheduleItem] = useState({
//     day: 'Monday',
//     time: '',
//     room: ''
//   });
//   const [newClassItem, setNewClassItem] = useState('');

//   useEffect(() => {
//     // Fetch the subject data
//     const fetchSubject = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/features/subject/${id}`);
//         console.log(response.data.getsubject);
//         setSubject(response.data.getsubject);
//       } catch (error) {
//         console.error('Error fetching subject:', error);
//       }
//     };
//     fetchSubject();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setSubject({
//       ...subject,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const handleSyllabusAdd = () => {
//     if (newSyllabusItem.trim()) {
//       setSubject({
//         ...subject,
//         syllabus: [...subject.syllabus, newSyllabusItem.trim()]
//       });
//       setNewSyllabusItem('');
//     }
//   };

//   const handleSyllabusRemove = (index) => {
//     const updatedSyllabus = [...subject.syllabus];
//     updatedSyllabus.splice(index, 1);
//     setSubject({ ...subject, syllabus: updatedSyllabus });
//   };

//   const handleScheduleAdd = () => {
//     if (newScheduleItem.day && newScheduleItem.time && newScheduleItem.room) {
//       setSubject({
//         ...subject,
//         schedule: [...subject.schedule, { ...newScheduleItem }]
//       });
//       setNewScheduleItem({
//         day: 'Monday',
//         time: '',
//         room: ''
//       });
//     }
//   };

//   const handleScheduleRemove = (index) => {
//     const updatedSchedule = [...subject.schedule];
//     updatedSchedule.splice(index, 1);
//     setSubject({ ...subject, schedule: updatedSchedule });
//   };

//   const handleClassAdd = () => {
//     if (newClassItem.trim()) {
//       setSubject({
//         ...subject,
//         classes: [...subject.classes, { class: newClassItem.trim() }]
//       });
//       setNewClassItem('');
//     }
//   };

//   const handleClassRemove = (index) => {
//     const updatedClasses = [...subject.classes];
//     updatedClasses.splice(index, 1);
//     setSubject({ ...subject, classes: updatedClasses });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:5000/api/features/wholesubjectedit/${id}`, {subject});
//       console.log(response.data);
//       navigate(`/admin/subjectdetail/${id}`);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="edit-subject-container">
//       <div className="edit-subject-header">
//         <h1>Edit Subject</h1>
//         <button onClick={() => navigate('/subjectslist')} className="back-button">
//           Back to Subjects
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="edit-subject-form">
//         <div className="form-section">
//           <h2>Basic Information</h2>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Subject Code</label>
//               <input
//                 type="text"
//                 name="code"
//                 value={subject?.code}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Subject Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={subject?.name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Credits</label>
//               <input
//                 type="number"
//                 name="credits"
//                 value={subject?.credits}
//                 onChange={handleInputChange}
//                 min="1"
//                 max="10"
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={subject?.description}
//               onChange={handleInputChange}
//               rows="4"
//               required
//             />
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Semester</label>
//               <input
//                 type="text"
//                 name="semester"
//                 value={subject?.semester}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Academic Year</label>
//               <input
//                 type="text"
//                 name="academic_year"
//                 value={subject?.academic_year}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group checkbox-group">
//               <label>
//                 <input
//                   type="checkbox"
//                   name="is_active"
//                   checked={subject?.is_active}
//                   onChange={handleInputChange}
//                 />
//                 Active Subject
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="form-section">
//           <h2>Syllabus</h2>
//           <div className="form-group">
//             <div className="add-item-control">
//               <input
//                 type="text"
//                 value={newSyllabusItem}
//                 onChange={(e) => setNewSyllabusItem(e.target.value)}
//                 placeholder="Add new syllabus item"
//               />
//               <button type="button" onClick={handleSyllabusAdd} className="add-button">
//                 Add
//               </button>
//             </div>
//             <ul className="item-list">
//               {subject?.syllabus?.map((item, index) => (
//                 <li key={index}>
//                   {item}
//                   <button
//                     type="button"
//                     onClick={() => handleSyllabusRemove(index)}
//                     className="remove-button"
//                   >
//                     ×
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="form-section">
//           <h2>Schedule</h2>
//           <div className="form-group">
//             <div className="add-schedule-control">
//               <select
//                 value={newScheduleItem?.day}
//                 onChange={(e) => setNewScheduleItem({ ...newScheduleItem, day: e.target.value })}
//               >
//                 {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
//                   <option key={day} value={day}>
//                     {day}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="text"
//                 value={newScheduleItem?.time}
//                 onChange={(e) => setNewScheduleItem({ ...newScheduleItem, time: e.target.value })}
//                 placeholder="Time (e.g., 10:00 AM - 11:00 AM)"
//               />
//               <input
//                 type="text"
//                 value={newScheduleItem?.room}
//                 onChange={(e) => setNewScheduleItem({ ...newScheduleItem, room: e.target.value })}
//                 placeholder="Room number"
//               />
//               <button type="button" onClick={handleScheduleAdd} className="add-button">
//                 Add
//               </button>
//             </div>
//             <ul className="schedule-list">
//               {subject?.schedule?.map((slot, index) => (
//                 <li key={index}>
//                   <span>
//                     <strong>{slot?.day}</strong>: {slot?.time} in {slot?.room}
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() => handleScheduleRemove(index)}
//                     className="remove-button"
//                   >
//                     ×
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="form-section">
//           <h2>Classes</h2>
//           <div className="form-group">
//             <div className="add-item-control">
//               <input
//                 type="text"
//                 value={newClassItem}
//                 onChange={(e) => setNewClassItem(e.target.value)}
//                 placeholder="Add new class (e.g., CSE-5A)"
//               />
//               <button type="button" onClick={handleClassAdd} className="add-button">
//                 Add
//               </button>
//             </div>
//             <div className="class-tags">
//               {subject?.classes?.map((cls, index) => (
//                 <span key={index} className="class-tag">
//                   {cls?.class}
//                   <button
//                     type="button"
//                     onClick={() => handleClassRemove(index)}
//                     className="tag-remove-button"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="form-actions">
//           <button type="submit" className="save-button">
//             Save Changes
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate('/subjects')}
//             className="cancel-button"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditSubject;
















import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './subjectcss/EditSubject.css';
import apiClient from '../../../services/axios';

const EditSubject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState({
    code: '',
    name: '',
    department: {
      department_id: '',
      department_name: ''
    },
    faculty: {
      facultyId: ''
    },
    classes: [],
    credits: 4,
    description: '',
    syllabus: [],
    schedule: [],
    semester: '',
    academic_year: '',
    is_active: true
  });
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [newSyllabusItem, setNewSyllabusItem] = useState('');
  const [newScheduleItem, setNewScheduleItem] = useState({
    day: 'Monday',
    time: '',
    room: ''
  });
  const [newClassItem, setNewClassItem] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch subject data
        const subjectResponse = await apiClient.get(`/api/features/subject/${id}`);
        setSubject(subjectResponse.data.getsubject);

        // Fetch departments
        const deptResponse = await axios.get('/api/features/getDepartmentlist');
        setDepartments(deptResponse.data.departments);

        // Fetch faculties
        const facultyResponse = await axios.get('/api/faculty/allfacultyname');
        setFaculties(facultyResponse.data);
        console.log(facultyResponse.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSubject({
      ...subject,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleDepartmentChange = (e) => {
    const selectedDept = departments.find(dept => dept._id === e.target.value);
    setSubject({
      ...subject,
      department: {
        department_id: selectedDept._id,
        department_name: selectedDept.name
      }
    });
  };

  const handleFacultyChange = (e) => {
    setSubject({
      ...subject,
      faculty: {
        facultyId: e.target.value
      }
    });
  };

  const handleSyllabusAdd = () => {
    if (newSyllabusItem.trim()) {
      setSubject({
        ...subject,
        syllabus: [...subject.syllabus, newSyllabusItem.trim()]
      });
      setNewSyllabusItem('');
    }
  };

  const handleSyllabusRemove = (index) => {
    const updatedSyllabus = [...subject.syllabus];
    updatedSyllabus.splice(index, 1);
    setSubject({ ...subject, syllabus: updatedSyllabus });
  };

  const handleScheduleAdd = () => {
    if (newScheduleItem.day && newScheduleItem.time && newScheduleItem.room) {
      setSubject({
        ...subject,
        schedule: [...subject.schedule, { ...newScheduleItem }]
      });
      setNewScheduleItem({
        day: 'Monday',
        time: '',
        room: ''
      });
    }
  };

  const handleScheduleRemove = (index) => {
    const updatedSchedule = [...subject.schedule];
    updatedSchedule.splice(index, 1);
    setSubject({ ...subject, schedule: updatedSchedule });
  };

  const handleClassAdd = () => {
    if (newClassItem.trim()) {
      setSubject({
        ...subject,
        classes: [...subject.classes, { class: newClassItem.trim() }]
      });
      setNewClassItem('');
    }
  };

  const handleClassRemove = (index) => {
    const updatedClasses = [...subject.classes];
    updatedClasses.splice(index, 1);
    setSubject({ ...subject, classes: updatedClasses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(subject);
      const response = await apiClient.put(`/api/features/wholesubjectedit/${id}`, subject);
      console.log('Subject updated successfully', response.data);
      // navigate(`/admin/subjectdetail/${id}`);
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  return (
    <div className="edit-subject-container">
      <div className="edit-subject-header">
        <h1>Edit Subject</h1>
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="edit-subject-form">
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Subject Code*</label>
              <input
                type="text"
                name="code"
                value={subject.code}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Subject Name*</label>
              <input
                type="text"
                name="name"
                value={subject.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Credits*</label>
              <input
                type="number"
                name="credits"
                value={subject.credits}
                onChange={handleInputChange}
                min="1"
                max="10"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Department*</label>
              <select
                value={subject.department?.department_id || ''}
                onChange={handleDepartmentChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Faculty</label>
              <select
                value={subject?.faculty?.facultyId || ''}
                onChange={handleFacultyChange}
              >
                <option value="">Select Faculty</option>
                {faculties?.map(faculty => (
                  <option key={faculty._id} value={faculty._id}>
                    {faculty.personal_details?.first_name} {faculty.personal_details?.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="is_active"
                  checked={subject.is_active}
                  onChange={handleInputChange}
                />
                Active Subject
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Semester</label>
              <input
                type="text"
                name="semester"
                value={subject.semester}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Academic Year</label>
              <input
                type="text"
                name="academic_year"
                value={subject.academic_year}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description*</label>
            <textarea
              name="description"
              value={subject.description}
              onChange={handleInputChange}
              rows="4"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Syllabus</h2>
          <div className="form-group">
            <div className="add-item-control">
              <input
                type="text"
                value={newSyllabusItem}
                onChange={(e) => setNewSyllabusItem(e.target.value)}
                placeholder="Add new syllabus item"
              />
              <button type="button" onClick={handleSyllabusAdd} className="add-button">
                Add
              </button>
            </div>
            <ul className="item-list">
              {subject.syllabus?.map((item, index) => (
                <li key={index}>
                  {item}
                  <button
                    type="button"
                    onClick={() => handleSyllabusRemove(index)}
                    className="remove-button"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="form-section">
          <h2>Schedule</h2>
          <div className="form-group">
            <div className="add-schedule-control">
              <select
                value={newScheduleItem.day}
                onChange={(e) => setNewScheduleItem({ ...newScheduleItem, day: e.target.value })}
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={newScheduleItem.time}
                onChange={(e) => setNewScheduleItem({ ...newScheduleItem, time: e.target.value })}
                placeholder="Time (e.g., 10:00 AM - 11:00 AM)"
              />
              <input
                type="text"
                value={newScheduleItem.room}
                onChange={(e) => setNewScheduleItem({ ...newScheduleItem, room: e.target.value })}
                placeholder="Room number"
              />
              <button type="button" onClick={handleScheduleAdd} className="add-button">
                Add
              </button>
            </div>
            <ul className="schedule-list">
              {subject.schedule?.map((slot, index) => (
                <li key={index}>
                  <span>
                    <strong>{slot.day}</strong>: {slot.time} in {slot.room}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleScheduleRemove(index)}
                    className="remove-button"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="form-section">
          <h2>Classes</h2>
          <div className="form-group">
            <div className="add-item-control">
              <input
                type="text"
                value={newClassItem}
                onChange={(e) => setNewClassItem(e.target.value)}
                placeholder="Add new class (e.g., CSE-5A)"
              />
              <button type="button" onClick={handleClassAdd} className="add-button">
                Add
              </button>
            </div>
            <div className="class-tags">
              {subject.classes?.map((cls, index) => (
                <span key={index} className="class-tag">
                  {cls.class}
                  <button
                    type="button"
                    onClick={() => handleClassRemove(index)}
                    className="tag-remove-button"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSubject;