import axios from 'axios';
import React, { useState } from 'react';
import '../../CSSfolder/CommonCSS/allfile.css'
// import api from '../api';

const ProcessVendorPayment = () => {
    const [vendorId, setVendorId] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [purchaseOrderId, setPurchaseOrderId] = useState('');

    const handleVendorPayment = async () => {
        try {
            await axios.post('http://localhost:5000/api/accountant/vendor/payment', {
                vendorId,
                paymentAmount,
                purchaseOrderId,
            });
            alert('Vendor payment processed successfully');
        } catch (error) {
            console.error('Failed to process vendor payment', error);
        }
    };

    return (
        <div className='allcontainer'>
            <h2>Process Vendor Payment</h2>
            <input type="text" value={vendorId} onChange={(e) => setVendorId(e.target.value)} placeholder="Vendor ID" />
            <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="Payment Amount" />
            <input type="text" value={purchaseOrderId} onChange={(e) => setPurchaseOrderId(e.target.value)} placeholder="Purchase Order ID" />
            <button onClick={handleVendorPayment}>Process Payment</button>
        </div>
    );
};

export default ProcessVendorPayment;
