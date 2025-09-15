import axios from 'axios';
import React, { useState } from 'react';
import '../../CSSfolder/CommonCSS/allfile.css'
// import api from '../api';

const GenerateFinancialReport = () => {
    const [reportType, setReportType] = useState('');
    const [report, setReport] = useState(null);

    const handleGenerateReport = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/accountant/financial/reports/${reportType}`);
            setReport(response.data.data);
        } catch (error) {
            console.error('Failed to generate report', error);
        }
    };

    return (
        <div className='allcontainer'>
            <h2>Generate Financial Report</h2>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <option value="">Select Report Type</option>
                <option value="balanceSheet">Balance Sheet</option>
                <option value="incomeStatement">Income Statement</option>
                <option value="cashFlow">Cash Flow</option>
            </select>
            <button onClick={handleGenerateReport}>Generate Report</button>
            {report && <pre>{JSON.stringify(report, null, 2)}</pre>}
        </div>
    );
};

export default GenerateFinancialReport;
