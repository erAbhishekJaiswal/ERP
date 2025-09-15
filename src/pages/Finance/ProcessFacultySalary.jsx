import React, { useState } from 'react';
// import api from '../api';
import axios from 'axios';
import '../../CSSfolder/CommonCSS/allfile.css'

const ProcessFacultySalary = () => {
    const [facultyId, setFacultyId] = useState('');
    const [salaryAmount, setSalaryAmount] = useState('');

    const handleProcessSalary = async () => {
        try {
            await axios.post('http://localhost:5000/api/accountant/faculty/salary', {
                facultyId,
                salaryAmount,
            });
            alert('Salary processed successfully');
        } catch (error) {
            console.error('Failed to process salary', error);
        }
    };

    return (
        <div className='allcontainer'>
            <h2>Process Faculty Salary</h2>
            <input type="text" value={facultyId} onChange={(e) => setFacultyId(e.target.value)} placeholder="Faculty ID" />
            <input type="number" value={salaryAmount} onChange={(e) => setSalaryAmount(e.target.value)} placeholder="Salary Amount" />
            <button onClick={handleProcessSalary}>Process Salary</button>
        </div>
    );
};

export default ProcessFacultySalary;
