import React, { useState } from 'react';
// import api from '../api';
import axios from 'axios';
import '../../CSSfolder/CommonCSS/allfile.css'

const ProcessFeePayment = () => {
    const [studentId, setStudentId] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');

    const handleProcessPayment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/accountant/fees/payment', {
                studentId,
                paymentAmount,
            });
            alert('Payment processed successfully',response);
        } catch (error) {
            console.error('Failed to process fee payment', error);
        }
    };

    return (
        <div className='allcontainer'>
            <h2>Process Fee Payment</h2>
            <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Student ID" />
            <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="Payment Amount" />
            <button onClick={handleProcessPayment}>Process Payment</button>
        </div>
    );
};

export default ProcessFeePayment;
