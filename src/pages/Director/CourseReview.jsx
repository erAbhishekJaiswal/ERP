import React, { useEffect, useState } from 'react';
// import api from '../api';
import '../../CSSfolder/CommonCSS/allfile.css'
import axios from 'axios';
import apiClient from '../../services/axios';

const CourseReview = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await apiClient.get('/api/director/courses/pending'); // Adjust endpoint if needed
                setCourses(response.data.data); // assuming response format is { data: { data: [] } }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            }
        };
        fetchCourses();
    }, []);

    const approveCourse = async (courseId) => {
        try {
            await apiClient.put(`/api/director/courses/approve/${courseId}`);
            setCourses(courses.filter(course => course._id !== courseId)); // Update UI after approval
            alert('Course approved successfully');
        } catch (error) {
            console.error("Failed to approve course", error);
        }
    };

    if (loading) return <p>Loading courses...</p>;

    return (
        <div className='allcontainer'>
            <h2>Pending Courses for Review</h2>
            <ul>
                {courses.map(course => (
                    <li key={course._id}>
                        <p>Course Name: {course.name}</p>
                        <p>Description: {course.description}</p>
                        <button onClick={() => approveCourse(course._id)}>Approve Course</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseReview;
