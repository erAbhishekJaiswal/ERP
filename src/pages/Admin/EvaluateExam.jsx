import React, { useState } from 'react';
import '../../CSSfolder/CommonCSS/allfile.css';
// import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import api from '../api';
import axios from 'axios';
import apiClient from '../../services/axios';

const EvaluateExam = () => {

    // const location = useLocation();
    // const {stddata} = location.state || {};
    // const [examId, setExamId] = useState('');
    // const [studentId, setStudentId] = useState('');
    const [grade, setGrade] = useState('');


     const { studentid, examid } = useParams();
    // console.log({examid, studentid});

    const examId = examid;
    const studentId = studentid;
   
    


    const handleEvaluate = async () => {
        try {
            await apiClient.post('/api/registrar/exam/evaluate', { examId, studentId, grade });
            alert('Exam evaluated successfully');
        } catch (error) {
            console.error('Failed to evaluate exam', error);
        }
    };

    return (
        <div className='allcontainer'>
            <h2>Evaluate Exam</h2>
            {/* <input type="text" value={examId} onChange={(e) => setExamId(e.target.value)} placeholder="Exam ID" /> */}
            {/* <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Student ID" /> */}
            <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade" />
            <button onClick={handleEvaluate}>Submit Grade</button>
        </div>
    );
};

export default EvaluateExam;
