import React, { useEffect, useState } from 'react';
// import api from '../api';
import axios from 'axios';
import '../../CSSfolder/CommonCSS/allfile.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/axios';

const ViewExamDetails = () => {
    // const [examId, setExamId] = useState('');
    const [examDetails, setExamDetails] = useState(null);
    const[grades, setGrades] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect( () => {
        const fatchData = async() => {
            const res = await apiClient.get(`/api/registrar/exam/${id}`);
            setExamDetails(res.data.data);
            // setGrades(res.data.data.grades);
            console.log(res.data.data);
            
        };
        fatchData();
    }, []);

    // const handleFetchExamDetails = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:5000/api/registrar/exam/${id}`);
    //         setExamDetails(response.data.data);
    //     } catch (error) {
    //         console.error('Failed to retrieve exam details', error);
    //     }
    // };

    const examid = id;
    // const studentId = grades.studentId;

    return (
        <div className='allcontainer'>
            <h2>View Exam Details</h2>
            {/* <input type="text" value={examId} onChange={(e) => setExamId(e.target.value)} placeholder="Exam ID" />
            <button onClick={handleFetchExamDetails}>Get Exam Details</button> */}
            {examDetails && (
                <div className='viewexamdetails'>
                    <div className='viewdatas'>Exam Name: {examDetails.examName}</div>
                    <div className='viewdatas'>Exam Date: {examDetails.examDate}</div>
                    <div className='viewdatas'>Subject: {examDetails.subject}</div>
                    <div className='viewdatas'>Exam Time: {examDetails.examTime}</div>
                    <div className='viewdatas'>Department: {examDetails.department}</div>
                    <div className='viewdatas'>Year: {examDetails.year}</div>
                    <div className='viewdatas'>Semester: {examDetails.semester}</div>
                    {/* {grades.map(grades => 
                     (
                        <>
                        <div>Grade : {grades.grade}</div>
                        <div>Student Id : {grades.studentId}</div>
                        <button onClick={() => { navigate(`/evaluateexam/${examid}/${grades.studentId}`)}} className='evaluatebtn'>Evaluate</button>
                        </>
                    ))} */}
                </div>
            )}
        </div>
    );
};

export default ViewExamDetails;
