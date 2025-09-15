import React, { useState } from 'react';
// import api from '../api';
import axios from 'axios';
import '../../CSSfolder/CommonCSS/allfile.css'

const CheckFinancialCompliance = () => {
    const [complianceStatus, setComplianceStatus] = useState('');

    const handleCheckCompliance = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/accountant/financial/compliance');
            setComplianceStatus(response.data.message);
        } catch (error) {
            console.error('Failed to check financial compliance', error);
        }
    };

    return (
        <div className='allcontainer'>
            <h2>Check Financial Compliance</h2>
            <button onClick={handleCheckCompliance}>Check Compliance</button>
            {complianceStatus && <p>{complianceStatus}</p>}
        </div>
    );
};

export default CheckFinancialCompliance;
