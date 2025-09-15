// import React, { useState } from 'react';
// import FormInput from '../../components/common/FormInput';
// import Button from '../../components/common/Button';

// const FeePayment = () => {
//     const [amount, setAmount] = useState('');

//     const handlePayment = (e) => {
//         e.preventDefault();
//         // Implement payment logic here
//     };

//     return (
//         <div className="finance-page">
//             <h2>Fee Payment</h2>
//             <form onSubmit={handlePayment}>
//                 <FormInput label="Amount" type="number" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
//                 <Button type="submit" text="Pay Now" />
//             </form>
//         </div>
//     );
// };

// export default FeePayment;







import React, { useState, useEffect } from 'react';
import '../../CSSfolder/CommonCSS/allfile.css'
// import axios from 'axios';
// import './FeePayment.css';

const FeePayment = () => {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [amountToPay, setAmountToPay] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);

    // useEffect(() => {
    //     const fetchFees = async () => {
    //         try {
    //             const response = await axios.get('/api/fees');
    //             setFees(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError('Failed to load fee details. Please try again.');
    //             setLoading(false);
    //         }
    //     };

    //     fetchFees();
    // }, []);

    // const handleAmountChange = (e) => {
    //     setAmountToPay(e.target.value);
    // };

    // const handlePayment = async (e) => {
    //     e.preventDefault();
    //     setProcessing(true);
    //     try {
    //         const response = await axios.post('/api/payments', { amount: amountToPay });
    //         if (response.status === 200) {
    //             setPaymentSuccess(true);
    //         }
    //         setProcessing(false);
    //     } catch (error) {
    //         setError('Failed to process payment. Please try again.');
    //         setProcessing(false);
    //     }
    // };

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div className="error-message">{error}</div>;
    // }

    return (
        <div className="allcontainer">
            <h1>Fee Payment</h1>
            <div className="fee-details">
                <h2>Current Fees</h2>
              {/*  {fees.length > 0 ? (
                    <ul>
                         {fees.map((fee) => (
                            <li key={fee._id}>
                                <strong>{fee.description}:</strong> ${fee.amount}
                            </li>
                        ))} 
                    </ul>
                ) : (
                    <p>No fee details available.</p>
                )}*/}
            </div>
            <div className="payment-form">
                <h2>Pay Fees</h2>
                <form >
                    {/* onSubmit={handlePayment} */}
                    <label htmlFor="amountToPay">Amount to Pay:</label>
                    <input
                        type="number"
                        id="amountToPay"
                        // value={amountToPay}
                        // onChange={handleAmountChange}
                        min="0"
                        required
                    />
                    <button type="submit" disabled={processing}>
                        {processing ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
            </div>
            {/* {paymentSuccess && (
                <div className="success-message">
                    <h2>Payment Successful!</h2>
                    <p>Your payment of ${amountToPay} has been processed successfully.</p>
                </div>
            )} */}
        </div>
    );
};

export default FeePayment;
