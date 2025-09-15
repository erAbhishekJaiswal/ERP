import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../CSSfolder/StudentCSS/QuizAttempt.css';
import apiClient from '../../services/axios';

const QuizAttempt = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await apiClient.get(`/api/quiz/${id}`);
                setQuiz(response.data);
                
                // Calculate time left in seconds
                const endTime = new Date(response.data.lastDate);
                if (response.data.lastTime) {
                    const [hours, minutes] = response.data.lastTime.split(':');
                    endTime.setHours(parseInt(hours), parseInt(minutes));
                }
                const timeDiff = Math.max(0, Math.floor((endTime - new Date()) / 1000));
                setTimeLeft(timeDiff);
                
                setLoading(false);
            } catch (err) {
                setError('Failed to load quiz');
                setLoading(false);
                console.error(err);
            }
        };

        fetchQuiz();
    }, [id]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(); // Auto-submit when time runs out
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleOptionSelect = (optionText) => {
        setSelectedOptions(prev => ({
            ...prev,
            [currentQuestionIndex]: optionText
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            // Calculate score
            let correctAnswers = 0;
            quiz.questions.forEach((question, index) => {
                if (selectedOptions[index] === question.correctAnswer) {
                    correctAnswers++;
                }
            });
            
            const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
            setScore(finalScore);
            
            // Submit to backend
            await apiClient.post('/api/quiz/submit', {
                id,
                answers: selectedOptions,
                score: finalScore,
                studentId : localStorage.getItem('profileid')
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            
            setIsSubmitted(true);
        } catch (err) {
            setError(err.response.data.message || 'Failed to submit quiz');
            console.error(err.response.data.message);
        }
    };

    if (loading) return <div className="quiz-loading">Loading quiz...</div>;
    if (error) return <div className="quiz-error">{error}</div>;
    if (!quiz) return <div className="quiz-error">Quiz not found</div>;
    if (new Date(quiz.lastDate) < new Date()) return <div className="quiz-error">This quiz has expired</div>;

    if (isSubmitted) {
        return (
            <div className="quiz-result-container">
                <h2>Quiz Submitted Successfully!</h2>
                <div className="score-display">
                    Your Score: <span className="score-value">{score}%</span>
                </div>
                <div className="quiz-summary">
                    <p>Correct Answers: {Object.keys(selectedOptions).filter(
                        idx => selectedOptions[idx] === quiz.questions[idx].correctAnswer
                    ).length} / {quiz.questions.length}</p>
                </div>
                <button 
                    className="back-to-quizzes"
                    onClick={() => navigate('/student/studentsquiz')}
                >
                    Back to Quizzes
                </button>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
    const isOptionSelected = selectedOptions[currentQuestionIndex] !== undefined;

    return (
        <div className="quiz-attempt-container">
            <div className="attempt-quiz-header">
                <div className="attemptquiz-name-time">
                    <h2>{quiz.quizName}</h2> 
                    <div className="time-remaining">
                    Time Remaining: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </div>
                </div>
                
                <div className="quiz-meta">
                    <span>Subject: {quiz.subject?.name}</span>
                    <span>Department: {quiz.department?.name}</span>
                </div>
               
            </div>

            <div className="progress-indicator">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </div>

            <div className="question-container">
                <h3 className="question-text">{currentQuestion.questionText}</h3>
                <div className="options-container">
                    {currentQuestion.options.map((option, idx) => (
                        <div 
                            key={idx}
                            className={`option ${selectedOptions[currentQuestionIndex] === option.text ? 'selected' : ''}`}
                            onClick={() => handleOptionSelect(option.text)}
                        >
                            <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                            <span className="option-text">{option.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="navigation-buttons">
                <button 
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                >
                    Previous
                </button>
                
                {!isLastQuestion ? (
                    <button 
                        onClick={handleNextQuestion}
                        disabled={!isOptionSelected}
                    >
                        Next
                    </button>
                ) : (
                    <button 
                        onClick={handleSubmit}
                        disabled={!isOptionSelected}
                        className="submit-btn"
                    >
                        Submit Quiz
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizAttempt;