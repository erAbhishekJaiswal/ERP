import React, { useState } from 'react';
import '../../CSSfolder/CommonCSS/allfile.css'
// import api from '../api';
import axios from 'axios';
import apiClient from '../../services/axios';

const ViewDepartmentBudget = () => {
    const [departmentId, setDepartmentId] = useState('');
    const [budget, setBudget] = useState(null);

    const fetchBudget = async () => {
        try {
            const response = await apiClient.get(`/api/dean/department/${departmentId}/budget`);
            setBudget(response.data.data);
        } catch (error) {
            console.error("Failed to fetch department budget", error);
        }
    };

    return (
        <div className='allcontainer'>
            <h2>View Department Budget</h2>
            <input
                type="text"
                placeholder="Enter Department ID"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
            />
            <button onClick={fetchBudget}>Get Budget</button>
            {budget !== null && <p>Department Budget: ${budget}</p>}
        </div>
    );
};

export default ViewDepartmentBudget;
