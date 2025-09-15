import React, { useState, useEffect } from 'react';
// import api from '../api';
import axios from 'axios';
import '../../CSSfolder/CommonCSS/allfile.css'
import apiClient from '../../services/axios';

const AssignFacultyToCourse = () => {
    const [facultyList, setFacultyList] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const facultyResponse = await apiClient.get('/api/dean/faculty');
            const courseResponse = await apiClient.get('/api/dean/courses');
            setFacultyList(facultyResponse.data.data);
            setCourses(courseResponse.data.data);
        };
        fetchData();
    }, []);

    const handleAssign = async () => {
        try {
            await apiClient.post('/api/dean/faculty/assign-course', {
                facultyId: selectedFaculty,
                courseId: selectedCourse,
            });
            alert("Faculty assigned to course successfully");
        } catch (error) {
            console.error("Failed to assign faculty to course", error);
        }
    };

    return (
        <div className='allcontainer'>
            <h2>Assign Faculty to Course</h2>
            <select value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)}>
                <option value="">Select Faculty</option>
                {facultyList.map(faculty => (
                    <option key={faculty._id} value={faculty._id}>{faculty.username}</option>
                ))}
            </select>

            <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="">Select Course</option>
                {courses.map(course => (
                    <option key={course._id} value={course._id}>{course.courseName}</option>
                ))}
            </select>

            <button onClick={handleAssign}>Assign Faculty</button>
        </div>
    );
};

export default AssignFacultyToCourse;
