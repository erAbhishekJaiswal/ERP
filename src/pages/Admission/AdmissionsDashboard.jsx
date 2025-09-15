import React from 'react';
import "../../CSSfolder/AdminCSS/admissiondashboard.css";
import '../../CSSfolder/CommonCSS/allfile.css'

const AdmissionsDashboard = () => {
    // const [stats, setStats] = useState({
    //     totalApplications: 0,
    //     acceptedApplications: 0,
    //     rejectedApplications: 0,
    //     pendingApplications: 0,
    // });
    // const [recentApplications, setRecentApplications] = useState([]);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchDashboardData = async () => {
    //         try {
    //             const statsResponse = await axios.get('/api/admissions/stats');
    //             const recentAppsResponse = await axios.get('/api/admissions/recent');
                
    //             setStats(statsResponse.data);
    //             setRecentApplications(recentAppsResponse.data);
    //         } catch (error) {
    //             setError('Failed to load dashboard data. Please try again.');
    //         }
    //     };

    //     fetchDashboardData();
    // }, []);

    return (
        <div className="allcontainer">
            <h1>Admissions Dashboard</h1>

            {/* {error && <div className="error-message">{error}</div>} */}

            <div className="stats">
                <div className="stat-item">
                    <h2>Total Applications</h2>
                    {/* <p>{stats.totalApplications}</p> */}
                </div>
                <div className="stat-item">
                    <h2>Accepted Applications</h2>
                    {/* <p>{stats.acceptedApplications}</p> */}
                </div>
                <div className="stat-item">
                    <h2>Rejected Applications</h2>
                    {/* <p>{stats.rejectedApplications}</p> */}
                </div>
                <div className="stat-item">
                    <h2>Pending Applications</h2>
                    {/* <p>{stats.pendingApplications}</p> */}
                </div>
            </div>

            <div className="recent-applications">
                <h2>Recent Applications</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Application ID</th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Status</th>
                            <th>Date Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {recentApplications.length > 0 ? (
                            recentApplications.map((application) => (
                                <tr key={application.id}>
                                    <td>{application.id}</td>
                                    <td>{application.name}</td>
                                    <td>{application.course}</td>
                                    <td>{application.status}</td>
                                    <td>{new Date(application.submittedDate).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No recent applications</td>
                            </tr>
                        )} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdmissionsDashboard;
