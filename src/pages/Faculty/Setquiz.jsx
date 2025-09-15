// import React, { useState } from 'react';
// import axios from 'axios';
// import "../../CSSfolder/FacultyCSS/Setquiz.css";

// const Setquiz = () => {
//   const token = localStorage.getItem('token');
//   const [formData, setFormData] = useState({
//     subject: '',
//     department: 'Select Department',
//     quizName: '',
//     lastDate: '',
//     lastTime: ''
//   });
  
//   const [questions, setQuestions] = useState([
//     { 
//       questionText: '', 
//       options: [{ text: '', isCorrect: false }], 
//       correctAnswer: '' 
//     }
//   ]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleAddQuestion = () => {
//     setQuestions([...questions, { 
//       questionText: '', 
//       options: [{ text: '', isCorrect: false }], 
//       correctAnswer: '' 
//     }]);
//   };

//   const handleRemoveQuestion = (index) => {
//     if (questions.length > 1) {
//       const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
//       setQuestions(updatedQuestions);
//     } else {
//       alert("You need to have at least one question!");
//     }
//   };

//   const handleQuestionChange = (index, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].questionText = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleOptionChange = (qIndex, oIndex, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].options[oIndex].text = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleAddOption = (qIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].options.push({ text: '', isCorrect: false });
//     setQuestions(updatedQuestions);
//   };

//   const handleRemoveOption = (qIndex, oIndex) => {
//     const updatedQuestions = [...questions];
//     if (updatedQuestions[qIndex].options.length > 1) {
//       updatedQuestions[qIndex].options.splice(oIndex, 1);
//       // If we removed the correct answer, clear it
//       if (updatedQuestions[qIndex].correctAnswer === updatedQuestions[qIndex].options[oIndex]?.text) {
//         updatedQuestions[qIndex].correctAnswer = '';
//       }
//       setQuestions(updatedQuestions);
//     } else {
//       alert("Each question must have at least one option!");
//     }
//   };

//   const handleCorrectAnswerChange = (qIndex, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].correctAnswer = value;
//     setQuestions(updatedQuestions);
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/quiz/createquiz', {
//         ...formData,
//         questions
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       // Reset form
//       setFormData({
//         subject: '',
//         department: 'Select Department',
//         quizName: '',
//         lastDate: '',
//         lastTime: ''
//       });
//       setQuestions([{ 
//         questionText: '', 
//         options: [{ text: '', isCorrect: false }], 
//         correctAnswer: '' 
//       }]);
      
//       console.log(res.data);
//       alert('Quiz created successfully!');
//     } catch (error) {
//       console.error('Error creating quiz:', error);
//       alert('Failed to create quiz. Please try again.');
//     }
//   };

//   return (
//     <div className="set-quiz-container">
//       <div className="quiz-card">
//         <h2 className="quiz-title">Create New Quiz</h2>
        
//         <form onSubmit={handleSubmit} className="quiz-form">
//           {/* Basic Info Section */}
//           <div className="form-section">
//             <h3 className="section-title">Quiz Information</h3>
//             <div className="form-grid">
//               <div className="form-grid-group-container">
//                 <label>Department</label>
//                 <select 
//                   name="department"
//                   value={formData.department}
//                   onChange={handleInputChange}
//                   className="form-select"
//                   required
//                 >
//                   <option value="Select Department">Select Department</option>
//                   <option value="CSE">Computer Science (CSE)</option>
//                   <option value="ECE">Electronics (ECE)</option>
//                   <option value="EEE">Electrical (EEE)</option>
//                   <option value="CE">Civil (CE)</option>
//                 </select>
//               </div>
              
//               <div className="form-grid-group-container">
//                 <label>Subject</label>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleInputChange}
//                   className="form-input"
//                   placeholder="Enter subject name"
//                   required
//                 />
//               </div>
              
//               <div className="form-grid-group-container">
//                 <label>Quiz Name</label>
//                 <input
//                   type="text"
//                   name="quizName"
//                   value={formData.quizName}
//                   onChange={handleInputChange}
//                   className="form-input"
//                   placeholder="Enter quiz title"
//                   required
//                 />
//               </div>
              
//               <div className="form-grid-group-container">
//                 <label>Due Date</label>
//                 <input
//                   type="date"
//                   name="lastDate"
//                   value={formData.lastDate}
//                   onChange={handleInputChange}
//                   className="form-input"
//                   required
//                 />
//               </div>
              
//               <div className="form-grid-group-container">
//                 <label>Due Time</label>
//                 <input
//                   type="time"
//                   name="lastTime"
//                   value={formData.lastTime}
//                   onChange={handleInputChange}
//                   className="form-input"
//                   required
//                 />
//               </div>
//             </div>
//           </div>
          
//           {/* Questions Section */}
//           <div className="form-section">
//             <h3 className="section-title">Questions</h3>
            
//             {questions.map((question, qIndex) => (
//               <div key={qIndex} className="question-block">
//                 <div className="question-header">
//                   <label>Question {qIndex + 1}</label>
//                   {questions.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveQuestion(qIndex)}
//                       className="remove-question-btn"
//                       title="Remove question"
//                     >
//                       ×
//                     </button>
//                   )}
//                 </div>
//                 <input
//                   type="text"
//                   value={question.questionText}
//                   onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
//                   className="form-input question-input"
//                   placeholder="Enter your question"
//                   required
//                 />
                
//                 <div className="options-container">
//                   <label>Options</label>
//                   {question.options.map((option, oIndex) => (
//                     <div key={oIndex} className="option-row">
//                       <input
//                         type="text"
//                         value={option.text}
//                         onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
//                         className="form-input option-input"
//                         placeholder={`Option ${oIndex + 1}`}
//                         required
//                       />
//                       <div className="option-actions">
//                         <label className="radio-label">
//                           <input
//                             type="radio"
//                             name={`correctAnswer-${qIndex}`}
//                             value={option.text}
//                             checked={question.correctAnswer === option.text}
//                             onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
//                             className="radio-input"
//                           />
//                           <span className="radio-custom"></span>
//                           Correct
//                         </label>
//                         {question.options.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveOption(qIndex, oIndex)}
//                             className="remove-option-btn"
//                             title="Remove option"
//                           >
//                             ×
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   ))}
                  
//                   <button 
//                     type="button" 
//                     onClick={() => handleAddOption(qIndex)}
//                     className="add-option-btn"
//                   >
//                     + Add Option
//                   </button>
//                 </div>
//               </div>
//             ))}
            
//             <button 
//               type="button" 
//               onClick={handleAddQuestion}
//               className="add-question-btn"
//             >
//               + Add Another Question
//             </button>
//           </div>
          
//           <div className="form-actions">
//             <button type="submit" className="submit-btn">
//               Create Quiz
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Setquiz;













import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../CSSfolder/FacultyCSS/Setquiz.css";
import apiClient from '../../services/axios';

const Setquiz = () => {
  const token = localStorage.getItem('token');
  const [departments, setDepartments] = useState();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    subject: '',
    department: '',
    quizName: '',
    lastDate: '',
    lastTime: '',
    duration: 30 // Default duration
  });
  
  const [questions, setQuestions] = useState([
    { 
      questionText: '', 
      options: [{ text: '', isCorrect: false }], 
      correctAnswer: '' 
    }
  ]);

  // Fetch departments and subjects on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptResponse = await apiClient.get('/api/features/getdepartmentname');
        setDepartments(deptResponse.data);
        
        
        const subjResponse = await apiClient.get('/api/features/subjectcodenamelist');  
        setSubjects(subjResponse.data.subjectNames);
        console.log(subjResponse.data.subjectNames);
        

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { 
      questionText: '', 
      options: [{ text: '', isCorrect: false }], 
      correctAnswer: '' 
    }]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
      setQuestions(updatedQuestions);
    } else {
      alert("You need to have at least one question!");
    }
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex].text = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push({ text: '', isCorrect: false });
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[qIndex].options.length > 1) {
      updatedQuestions[qIndex].options.splice(oIndex, 1);
      // If we removed the correct answer, clear it
      if (updatedQuestions[qIndex].correctAnswer === updatedQuestions[qIndex].options[oIndex]?.text) {
        updatedQuestions[qIndex].correctAnswer = '';
      }
      setQuestions(updatedQuestions);
    } else {
      alert("Each question must have at least one option!");
    }
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = value;
    // Also update the isCorrect flag for options
    updatedQuestions[qIndex].options.forEach(option => {
      option.isCorrect = option.text === value;
    });
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get faculty info from local storage or token
      const facultyInfo = JSON.parse(localStorage.getItem('facultyInfo'));

      const facultyid = localStorage.getItem('profileid');
      const username = localStorage.getItem('username');
      const quizData = {
        ...formData,
        questions,
        createdBy: facultyid,
        facultyName: username || 'Unknown Faculty'
      };
      console.log(quizData);
      
      const res = await apiClient.post('/api/quiz/createquiz', quizData);
      
      // Reset form
      setFormData({
        subject: '',
        department: '',
        quizName: '',
        lastDate: '',
        lastTime: '',
        duration: 30
      });
      setQuestions([{ 
        questionText: '', 
        options: [{ text: '', isCorrect: false }], 
        correctAnswer: '' 
      }]);
      
      console.log(res.data);
      alert('Quiz created successfully!');
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert(error.response?.data?.message || 'Failed to create quiz. Please try again.');
    }
  };

  // Filter subjects based on selected department
  // const filteredSubjects = formData.department
  //   ? subjects.filter(subject => subject.department?._id === formData.department)
  //   : [];

  const filteredSubjects = formData.department
    ? subjects
    : [];

  if (loading) {
    return (
      <div className="set-quiz-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="set-quiz-container">
      <div className="quiz-card">
        <h2 className="quiz-title">Create New Quiz</h2>
        
        <form onSubmit={handleSubmit} className="quiz-form">
          {/* Basic Info Section */}
          <div className="form-section">
            <h3 className="section-title">Quiz Information</h3>
            <div className="form-grid">
              <div className="form-grid-group-container">
                <label>Department</label>
                <select 
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-grid-group-container">
                <label>Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                  disabled={!formData.department}
                >
                  <option value="">Select Subject</option>
                  {filteredSubjects.map(subj => (
                    <option key={subj._id} value={subj._id}>{subj.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-grid-group-container">
                <label>Quiz Name</label>
                <input
                  type="text"
                  name="quizName"
                  value={formData.quizName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter quiz title"
                  required
                />
              </div>
              
              <div className="form-grid-group-container">
                <label>Due Date</label>
                <input
                  type="date"
                  name="lastDate"
                  value={formData.lastDate}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="form-grid-group-container">
                <label>Due Time</label>
                <input
                  type="time"
                  name="lastTime"
                  value={formData.lastTime}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-grid-group-container">
                <label>Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="form-input"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Questions Section */}
          <div className="form-section">
            <h3 className="section-title">Questions</h3>
            
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="question-block">
                <div className="question-header">
                  <label>Question {qIndex + 1}</label>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qIndex)}
                      className="remove-question-btn"
                      title="Remove question"
                    >
                      ×
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  className="form-input question-input"
                  placeholder="Enter your question"
                  required
                />
                
                <div className="options-container">
                  <label>Options</label>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="option-row">
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        className="form-input option-input"
                        placeholder={`Option ${oIndex + 1}`}
                        required
                      />
                      <div className="option-actions">
                        <label className="radio-label">
                          <input
                            type="radio"
                            name={`correctAnswer-${qIndex}`}
                            value={option.text}
                            checked={question.correctAnswer === option.text}
                            onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                            className="radio-input"
                          />
                          <span className="radio-custom"></span>
                          Correct
                        </label>
                        {question.options.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(qIndex, oIndex)}
                            className="remove-option-btn"
                            title="Remove option"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button" 
                    onClick={() => handleAddOption(qIndex)}
                    className="add-option-btn"
                  >
                    + Add Option
                  </button>
                </div>
              </div>
            ))}
            
            <button 
              type="button" 
              onClick={handleAddQuestion}
              className="add-question-btn"
            >
              + Add Another Question
            </button>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setquiz;