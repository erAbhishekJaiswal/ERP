import React, { useEffect, useState } from 'react';
import '../../CSSfolder/CommonCSS/allfile.css'
// import api from '../api';
import axios from 'axios';
import apiClient from '../../services/axios';

const ViewCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await apiClient.get('/api/dean/courses');
                setCourses(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            }
        };
        fetchCourses();
    }, []);

    if (loading) return <p>Loading courses...</p>;

    return (
        <div className='allcontainer'>
            <h2>All Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course._id}>{course.courseName} - {course.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewCourses;
