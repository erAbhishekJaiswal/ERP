import React, { useState } from 'react';
// import api from '../api';
import axios from 'axios';
import '../../CSSfolder/CommonCSS/allfile.css'

const ManageFeeRecords = () => {
    const [studentId, setStudentId] = useState('');
    const [feeAmount, setFeeAmount] = useState('');
    const [status, setStatus] = useState('');

    const handleUpdateFee = async () => {
        try {
            await axios.post('http://localhost:5000/api/accountant/fees/manage', {
                studentId,
                feeAmount,
                status,
            });
            alert('Fee record updated successfully');
        } catch (error) {
            console.error('Failed to update fee record', error);
        }
    };

    return (
        <div className='allcontainer'>
            <h2>Manage Fee Records</h2>
            <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Student ID" />
            <input type="number" value={feeAmount} onChange={(e) => setFeeAmount(e.target.value)} placeholder="Fee Amount" />
            <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status (e.g., Paid, Unpaid)" />
            <button onClick={handleUpdateFee}>Update Fee Record</button>
        </div>
    );
};

export default ManageFeeRecords;
