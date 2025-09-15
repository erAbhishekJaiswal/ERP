import React, { useState, useEffect } from 'react';
// import api from '../api';
import '../../CSSfolder/CommonCSS/allfile.css'
import axios from 'axios';
import apiClient from '../../services/axios';

const ApprovePromotion = () => {
    const [facultyList, setFacultyList] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [newRank, setNewRank] = useState('');

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await apiClient.get('/api/dean/faculty');
                setFacultyList(response.data.data);
                // console.log(response.data);
                
            } catch (error) {
                console.error("Failed to fetch faculty list", error);
            }
        };
        fetchFaculty();
    }, []);

    const approvePromotion = async () => {
        try {
            await apiClient.post('/api/dean/faculty/approve-promotion', {
                facultyId: selectedFaculty,
                newRank,
            });
            alert("Faculty promotion approved successfully");
        } catch (error) {
            console.error("Failed to approve promotion", error);
        }
    };

    return (
        <div className='allcontainer'>
            <h2>Approve Faculty Promotion</h2>
            <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
            >
                <option value="">Select Faculty</option>
                {facultyList.map(faculty => (
                    <option key={faculty._id} value={faculty._id}>{faculty.username}</option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Enter New Rank"
                value={newRank}
                onChange={(e) => setNewRank(e.target.value)}
            />

            <button onClick={approvePromotion}>Approve Promotion</button>
        </div>
    );
};

export default ApprovePromotion;
