import React, { useState } from 'react';
// import api from '../api';
import axios from 'axios';
import '../../CSSfolder/CommonCSS/allfile.css'

const IssueReceipt = () => {
    const [studentId, setStudentId] = useState('');
    const [amountPaid, setAmountPaid] = useState('');

    const handleIssueReceipt = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/accountant/fees/receipt', {
                studentId,
                amountPaid,
            });
            alert('Receipt issued successfully',response);
        } catch (error) {
            console.error('Failed to issue receipt', error);
        }
    };

    return (
        <div className='allcontainer'>
            <h2>Issue Receipt</h2>
            <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Student ID" />
            <input type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} placeholder="Amount Paid" />
            <button onClick={handleIssueReceipt}>Issue Receipt</button>
        </div>
    );
};

export default IssueReceipt;
