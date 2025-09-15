// import React, { useState, useEffect } from 'react'
// import "../../CSSfolder/StudentCSS/quiz.css"
// import "../../CSSfolder/StudentCSS/student.css"
// import '../../CSSfolder/CommonCSS/allfile.css'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Quiz = () => {

//   const { id } = useParams();
//   // console.log(id);

//   const [quiz, setQuiz] = useState();

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/quiz/exactquiz/${id}`);
//         setQuiz(res.data);
//         // console.log(res.data);

//       } catch (error) {
//         console.error('Error fetching quiz:', error);
//       }
//     };

//     fetchQuiz();
//   }, [id]);

//   if (!quiz) {
//     return <p>Loading...</p>;
//   }
//   return (
//     <div className="allcontainer">
//       <div className="quizsection">
//         {quiz.questions.map((q, i) => (
//           <div className='quizquetion' key={q._id}>
//             <h3>Question:- {q.questionText}</h3>
//             <ul className='quizoptions'>
//               Options :-{q.options.map((o, oi) => (
//                 <li className='quizoption' key={oi}>
//                   {o.text}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Quiz






import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import './QuizPage.css';
import "../../CSSfolder/StudentCSS/quizpage.css"
import apiClient from '../../services/axios';

const Quiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await apiClient.get(`/api/quiz/exactquiz/${id}`);
        setQuiz(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleOptionSelect = (questionId, optionIndex) => {
    if (!submitted) {
      setSelectedOptions(prev => ({
        ...prev,
        [questionId]: optionIndex
      }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Here you would typically send the answers to your backend
    console.log("Selected options:", selectedOptions);
  };

  if (loading) {
    return (
      <div className="quiz-loading-container">
        <div className="quiz-loading-spinner"></div>
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-error-container">
        <div className="quiz-error-icon">⚠️</div>
        <h3>Error Loading Quiz</h3>
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

  if (!quiz) {
    return (
      <div className="quiz-empty-container">
        <div className="quiz-empty-icon">📝</div>
        <h3>No Quiz Found</h3>
        <p>The requested quiz could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1 className="quiz-title">{quiz.subject} Quiz</h1>
        <div className="quiz-meta">
          <span className="quiz-total-questions">{quiz.questions.length} Questions</span>
          {quiz.dueDate && (
            <span className="quiz-due-date">
              Due: {new Date(quiz.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="quiz-questions">
        {quiz.questions.map((q, i) => (
          <div className='quiz-question-card' key={q._id}>
            <div className="question-header">
              <span className="question-number">Question {i + 1}</span>
              {q.points && (
                <span className="question-points">{q.points} points</span>
              )}
            </div>
            <h3 className="question-text">{q.questionText}</h3>
            
            <ul className='quiz-options'>
              {q.options.map((o, oi) => (
                <li 
                  className={`quiz-option ${
                    selectedOptions[q._id] === oi ? 'selected' : ''
                  } ${
                    submitted && o.isCorrect ? 'correct' : ''
                  }`}
                  key={oi}
                  onClick={() => handleOptionSelect(q._id, oi)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + oi)}.
                  </span>
                  <span className="option-text">{o.text}</span>
                  {submitted && o.isCorrect && (
                    <span className="correct-indicator">✓</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button 
          className="submit-quiz-button"
          onClick={handleSubmit}
          disabled={Object.keys(selectedOptions).length !== quiz.questions.length}
        >
          Submit Quiz
        </button>
      ) : (
        <div className="quiz-results">
          <h3>Quiz Submitted!</h3>
          <p>Your answers have been recorded.</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;