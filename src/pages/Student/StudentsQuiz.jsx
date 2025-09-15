// import React, { useEffect, useState } from "react";
// import "../../CSSfolder/StudentCSS/quiz.css";
// // import "../../CSSfolder/StudentCSS/student.css";
// // import "../../CSSfolder/CommonCSS/allfile.css";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const StudentsQuiz = () => {
//   const [allquizs, setAllquizs] = useState([]);
//   // const [loading, setLoading] = useState(true)
//   // const [error, setError] = useState(false)
//   // const [message, setMessage] = useState('')
//   const token = localStorage.getItem("token");
//   const department = localStorage.getItem("department");
//   // console.log(department);
//   // console.log(token);

//   useEffect(() => {
//     const allquiz = async () => {
//       // try {
//       //    const response = await axios.get(`/api/quiz/studentquizslist`, {department:department}, {
//       //   // Include the Authorization header with the token in the request
//       //   headers: { Authorization: `Bearer ${token}` }
//       // });
//       // setAllquizs(response.data);
//       // // setLoading(false);
//       // console.log(response.data);
//       // } catch (error) {
//       //   console.log(error);
//       //   // setMessage(error.response.data.message)
//       //   // setLoading(false)
//       //   // setError(true)
//       // }

//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/quiz/studentquizs`
//         );
//         setAllquizs(res.data);
//         console.log(res);
//       } catch (error) {
//         console.log(error);
//       }

//       // console.log({department,token});
//     };
//     allquiz();
//   }, [token, department]);

//   // useEffect(() => {
//   //   async function allquiz() {

//   //     try {
//   //       const response = await axios.get(`/api/quiz/studentquizslist`, {departmentName}, {
//   //         // Include the Authorization header with the token in the request
//   //         headers: { Authorization: `Bearer ${token}` }
//   //     })
//   //       setAllquizs(response.data);
//   //       setLoading(false);
//   //       // console.log(response.data);
//   //     } catch (error) {
//   //       console.log(error);
//   //       setMessage(error.response.data.message)
//   //       setLoading(false)
//   //       setError(true)
//   //     }
//   //   }
//   //   allquiz();
//   // }, [token,departmentName])

//   return (
//     <>
//       <div className="allcontainer">
//         <div className="allquiz-heading">All Quiz </div>
//         <>
//           {!allquizs ? (
//             <h1>Loading...</h1>
//           ) : (
//             <>
//               {" "}
//               <div className="allquizeslists">
//                 {allquizs.map((qiz, qizindex) => (
//                   <div className="quizitem" key={qiz._id}>
//                     <Link to={`/student/quiz/${qiz._id}`}>
//                       <div className="quiztittle">
//                         {qiz.subject} Quiz <span> {qiz.department}</span>{" "}
//                       </div>{" "}
//                     </Link>
//                     <p>
//                       Created on: {new Date(qiz.createdAt).toLocaleDateString()}
//                     </p>
//                     <div className="quizthreedot">...</div>
//                   </div>
//                 ))}
//               </div>{" "}
//             </>
//           )}
//         </>

//         {/* {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error {message}</h1>) :
//           <>
//             <div className="allquizeslists">
//               {allquizs.map((qiz, qizindex) => (
//                 <div className="quizitem" key={qiz._id}>
//                   <Link to={`/quiz/${qiz._id}`}><div className="quiztittle">{qiz.subject} Quiz </div> </Link>
//                   <p>Created on: {new Date(qiz.createdAt).toLocaleDateString()}</p>
//                 </div>
//               ))}
//             </div>
//           </>} */}
//       </div>
//     </>
//   );
// };

// export default StudentsQuiz;








import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../CSSfolder/StudentCSS/quiz.css";
import apiClient from "../../services/axios";
// import "./QuizList.css";

const StudentsQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const department = localStorage.getItem("department");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await apiClient.get(`/api/quiz/studentquizs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuizzes(res.data);
        console.log("Fetched quizzes:", res.data);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching quizzes:", err);
      }
    };

    fetchQuizzes();
  }, [token, department]);

  if (loading) {
    return (
      <div className="quiz-loading-container">
        <div className="quiz-loading-spinner"></div>
        <p>Loading quizzes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-error-container">
        <div className="quiz-error-icon">⚠️</div>
        <h3>Error Loading Quizzes</h3>
        <p>{error}</p>
        <button 
          className="quiz-retry-button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="quiz-empty-container">
        <div className="quiz-empty-icon">📝</div>
        <h3>No Quizzes Available</h3>
        <p>There are currently no quizzes assigned to your department.</p>
      </div>
    );
  }

  return (
    <div className="quiz-list-container">
      <div className="quiz-list-header">
        <h1>Your Quizzes</h1>
        <p>Assigned quizzes for {department}</p>
      </div>

      <div className="quiz-grid">
        {quizzes.map((quiz) => (
          <div className="quizlist-card" key={quiz._id}>
            <Link to={`/student/quiz/${quiz._id}`} className="quizlist-card-link">
              <div className="quizlist-card-header">
                <h3 className="quiz-subject">{quiz.quizName}</h3>
                <div className="quiz-department-subject">
                  <span className="quiz-subject-detail">{quiz.subject.code || "Unknown Code"}</span>
                  <span className="quiz-subject-detail">{quiz.subject.name || "Unknown Name"}</span>
                  <span className="quiz-department">{quiz.department.name || "Unknown Department"}</span>
                  </div>
                
              </div>
              
              <div className="quiz-meta">
                <div className="quiz-meta-item">
                  <span className="quiz-meta-label">Created:</span>
                  <span className="quiz-meta-value">
                    {new Date(quiz.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="quiz-meta-item">
                  <span className="quiz-meta-label">Due:</span>
                  <span className="quiz-meta-value">
                    {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : "No due date"}
                  </span>
                </div>
              </div>

              <div className="quiz-status">
                <span className={`quiz-status-badge ${quiz.status || 'pending'}`}>
                  {quiz.status || 'Pending'}
                </span>
              </div>

              <div className="quiz-progress">
                <div className="quiz-progress-bar">
                  <div 
                    className="quiz-progress-fill" 
                    style={{ width: `${quiz.completion || 0}%` }}
                  ></div>
                </div>
                <span className="quiz-progress-text">
                  {quiz.completion || 0}% Complete
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsQuiz;