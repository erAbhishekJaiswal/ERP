import React, { useEffect, useState } from 'react';
import '../../CSSfolder/CommonCSS/allfile.css'
// import api from '../api';
import axios from 'axios';
import apiClient from '../../services/axios';

const AssignFacultyRole = () => {
    const [facultyList, setFacultyList] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await apiClient.get('/api/faculty/facultyslist'); // Adjust endpoint if needed
                setFacultyList(response.data);
                console.log(response.data);
                
            } catch (error) {
                console.error("Failed to fetch faculty list", error);
            }
        };
        fetchFaculty();
    }, []);

    const assignRole = async () => {
        try {
            await apiClient.post('/api/director/faculty/assign-role', { facultyId: selectedFaculty, role });
            alert(`Role ${role} assigned successfully`);
            setSelectedFaculty('');
            setRole('');
        } catch (error) {
            console.error("Failed to assign role", error);
        }
    };


    return (
        <div className='allcontainer'>
            <h2>Assign Role to Faculty</h2>
            <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
            >
                <option value="">Select Faculty</option>
                {
                // facultyList
                facultyList.map(faculty => (
                    <option key={faculty._id} value={faculty._id}>{faculty.username}</option>
                ))
                
                }
            </select>

            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="HOD">HOD</option>
                <option value="Coordinator">Coordinator</option>
            </select>

            <button onClick={assignRole}>Assign Role</button>
        </div>
    );
};

export default AssignFacultyRole;
