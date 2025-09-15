import React from 'react'
import '../../CSSfolder/StudentCSS/quiz.css'
import "../../CSSfolder/StudentCSS/student.css"
import '../../CSSfolder/CommonCSS/allfile.css'
const QuizResults = ({ results }) => {
    return (
        <>
            <div className='allcontainer'>
                <h1>Quiz Result</h1>

                {/* <div>
                    <h1>Quiz Results</h1>
                    <p>Total Score: {results.score}</p>
                    <ul>
                        {results.questions.map((q, index) => (
                            <li key={index}>{q.question}: {q.isCorrect ? "Correct" : "Wrong"}</li>
                        ))}
                    </ul>
                </div> */}
                
            </div>
        </>
    )
}

export default QuizResults
