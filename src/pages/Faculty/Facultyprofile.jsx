// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../../CSSfolder/FacultyCSS/facultyprofile.css";

// const FacultyProfile = () => {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [activeSubject, setActiveSubject] = useState(null);
//   const [faculty, setfaculty] = useState();

//   const fetchfaculty = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/faculty/${id}`
//       );
//       setfaculty(response.data);
//       setLoading(false);
//       // console.log(response.data);
//     } catch (error) {
//       console.error("Failed to fetch faculty list", error);
//     }
//   };
//   useEffect(() => {
//     fetchfaculty();
//   }, []);

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const calculateAge = (birthDate) => {
//     const today = new Date();
//     const birth = new Date(birthDate);
//     let age = today.getFullYear() - birth.getFullYear();
//     const m = today.getMonth() - birth.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   const calculateExperience = (joinDate) => {
//     const today = new Date();
//     const join = new Date(joinDate);
//     return today.getFullYear() - join.getFullYear();
//   };

//   const toggleSubject = (index) => {
//     setActiveSubject(activeSubject === index ? null : index);
//   };

//   if (!faculty) {
//     return (
//       <div className="faculty-profile-container-loadingbox"> <div>Loading...</div></div>
//    )
//   }

//   return (
//     <div className="faculty-profile-container">
//       {/* Hero Section */}
//       { faculty &&
//         <div className="profile-hero">
//           <div className="hero-overlay"></div>
//           <div className="profile-card">
//             <div className="profile-avatar">
//               <img
//                 src={faculty?.faculty?.employment?.profile_picture_url}
//                 alt="Profile"
//                 className="avatar-image"
//               />
//               <div className="status-dot"></div>
//             </div>
//             <div className="profile-info">
//               <h1>
//                 <span className="name-gradient">
//                   {faculty?.faculty?.personal_details?.first_name}
//                 </span>{" "}
//                 {faculty?.faculty?.personal_details?.last_name}
//               </h1>
//               <div className="profile-title">
//                 <span className="tag blue">Professor</span>
//                 <span className="tag green">
//                   {faculty?.faculty?.employment?.is_active
//                     ? "Active"
//                     : "Inactive"}
//                 </span>
//                 <span className="experience-badge">
//                   {calculateExperience(
//                     faculty?.faculty?.employment?.joining_date
//                   )}
//                   + years experience
//                 </span>
//               </div>
//               <p className="profile-bio">{faculty?.faculty?.employment?.bio}</p>
//               <div className="social-links">
//                 <a href="#" className="social-link">
//                   <i className="icon linkedin"></i>
//                 </a>
//                 <a href="#" className="social-link">
//                   <i className="icon google-scholar"></i>
//                 </a>
//                 <a href="#" className="social-link">
//                   <i className="icon researchgate"></i>
//                 </a>
//                 <a
//                   href={`mailto:${faculty?.faculty?.personal_details?.email}`}
//                   className="social-link"
//                 >
//                   <i className="icon email"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       }

//       {/* Main Content */}
//      { faculty && 
//       <div className="profile-content">
//         {/* Personal Info Section */}
//         <div className="profile-section">
//           <div className="info-card glass-card">
//             <h2 className="section-title">
//               <i className="icon user"></i> Personal Information
//             </h2>
//             <div className="details-grid">
//               <div className="detail-item">
//                 <label>Full Name</label>
//                 <div className="detail-value">
//                   {`${faculty?.faculty?.personal_details?.first_name} ${faculty?.faculty?.personal_details?.last_name}`}
//                 </div>
//               </div>
//               <div className="detail-item">
//                 <label>Date of Birth</label>
//                 <div className="detail-value">
//                   {formatDate(faculty?.faculty?.personal_details?.date_of_birth)}
//                   <span className="detail-note">
//                     (Age:{" "}
//                     {calculateAge(
//                       faculty?.faculty?.personal_details?.date_of_birth
//                     )}
//                     )
//                   </span>
//                 </div>
//               </div>
//               <div className="detail-item">
//                 <label>Gender</label>
//                 <div className="detail-value">
//                   {faculty?.faculty?.personal_details?.gender}
//                 </div>
//               </div>
//               <div className="detail-item">
//                 <label> Email</label>
//                 <div className="detail-value">
//                   <a href={`mailto:${faculty?.faculty?.personal_details?.email}`}>
//                     {faculty?.faculty?.personal_details?.email}
//                   </a>
//                 </div>
//               </div>
//               <div className="detail-item">
//                 <label> Mobile</label>
//                 <div className="detail-value">
//                   <a href={`tel:${faculty?.faculty?.personal_details?.mobile}`}>
//                     {faculty?.faculty?.personal_details?.mobile}
//                   </a>
//                 </div>
//               </div>
//               <div className="detail-item">
//                 <label> Address</label>
//                 <div className="detail-value">
//                   {`${faculty?.faculty?.personal_details?.address?.street}, 
//                   ${faculty?.faculty?.personal_details?.address?.city}, 
//                   ${faculty?.faculty?.personal_details?.address?.state} 
//                   ${faculty?.faculty?.personal_details?.address?.postal_code}, 
//                   ${faculty?.faculty?.personal_details?.address?.country}`}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Professional Info Section */}
//         <div className="profile-section">
//           <div className="info-card glass-card">
//             <h2 className="section-title">
//               <i className="icon briefcase"></i> Professional Information
//             </h2>
//             <div className="details-grid">
//               <div className="detail-item">
//                 <label>Joining Date</label>
//                 <div className="detail-value">
//                   {formatDate(faculty?.faculty?.employment?.joining_date)}
//                   <span className="detail-note">
//                     (Experience:{" "}
//                     {calculateExperience(
//                       faculty?.faculty?.employment?.joining_date
//                     )}{" "}
//                     years)
//                   </span>
//                 </div>
//               </div>
//               <div className="detail-item">
//                 <label>Qualifications</label>
//                 <div className="tags-container">
//                   {faculty?.faculty?.employment?.qualifications?.map(
//                     (qual, index) => (
//                       <span key={index} className="tag geekblue">
//                         <i className="icon book"></i> {qual}
//                       </span>
//                     )
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Departments Section */}
//         <div className="profile-section wide-section">
//           <div className="info-card glass-card">
//             <h2 className="section-title">
//               <i className="icon university"></i> Departments
//             </h2>
//             <div className="departments-list">
//               {faculty?.faculty?.departments?.map((dept, index) => (
//                 <div key={index} className="department-item">
//                   <div className="dept-header">
//                     <h3>{dept?.name}</h3>
//                     <span className="dept-established">
//                       Since {new Date(dept?.establishment_date).getFullYear()}
//                     </span>
//                   </div>
//                   <p className="dept-description">{dept?.description}</p>
//                   <div className="dept-contact">
//                     <span>
//                       <i className="icon email"></i> {dept?.contact_info?.email}
//                     </span>
//                     <span>
//                       <i className="icon phone"></i> {dept?.contact_info?.phone}
//                     </span>
//                     <span>
//                       <i className="icon map-marker"></i>{" "}
//                       {dept?.contact_info?.office_location}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Subjects Section */}
//         <div className="profile-section wide-section">
//           <div className="info-card glass-card">
//             <h2 className="section-title">
//               <i className="icon book-open"></i> Teaching Subjects
//             </h2>
//             <div className="subjects-container">
//               {faculty?.faculty?.subjects?.map((subject, index) => (
//                 <div
//                   key={index}
//                   className={`subject-item ${
//                     activeSubject === index ? "active" : ""
//                   }`}
//                   onClick={() => toggleSubject(index)}
//                 >
//                   <div className="subject-header">
//                     <h3>{subject?.name}</h3>
//                     <div className="subject-meta">
//                       <span className="credits-badge">
//                         {subject?.credits} credits
//                       </span>
//                       <i
//                         className={`icon chevron ${
//                           activeSubject === index ? "up" : "down"
//                         }`}
//                       ></i>
//                     </div>
//                   </div>
//                   <div className="subject-content">
//                     <p className="subject-description">{subject?.description}</p>
//                     <div className="syllabus-section">
//                       <h4>Syllabus</h4>
//                       <ul className="syllabus-list">
//                         {subject?.syllabus?.map((item, idx) => (
//                           <li key={idx}>
//                             <i className="icon check"></i> {item}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Research Interests Section */}
//         <div className="profile-section">
//           <div className="info-card glass-card">
//             <h2 className="section-title">
//               <i className="icon flask"></i> Research Interests
//             </h2>
//             <div className="interests-container">
//               {faculty?.faculty?.research_interests?.map((interest, index) => (
//                 <div key={index} className="interest-bubble">
//                   <div className="bubble-content">
//                     <i className="icon rocket"></i>
//                     <span>{interest}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Publications Section */}
//         <div className="profile-section wide-section">
//           <div className="info-card glass-card">
//             <div className="publications-header">
//               <h2 className="section-title">
//                 <i className="icon file-text"></i> Publications
//               </h2>
//               <span className="publications-count">
//                 {faculty?.faculty?.publications?.length} publications
//               </span>
//             </div>

//             {faculty?.faculty?.publications?.length > 0 ? (
//               <div className="publications-list">
//                 {faculty?.faculty?.publications?.map((pub, index) => (
//                   <div key={index} className="publication-item">
//                     <div className="pub-date">
//                       {new Date(pub.date).getFullYear()}
//                     </div>
//                     <div className="pub-content">
//                       <h3>{pub?.title}</h3>
//                       <p className="pub-journal">{pub?.journal}</p>
//                       <a href={pub?.link} className="pub-link">
//                         View Publication <i className="icon external-link"></i>
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="empty-state">
//                 <i className="icon book"></i>
//                 <p>No publications available</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>}
//     </div>
//   );
// };

// export default FacultyProfile;

















import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../CSSfolder/FacultyCSS/Facultyprofile.css";
// import "../../CSSfolder/FacultyCSS/facultyprofile.css"
import apiClient from "../../services/axios.js";

const FacultyProfile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeSubject, setActiveSubject] = useState(null);
  const [faculty, setFaculty] = useState(null);

  const fetchFaculty = async () => {
    try {
      const response = await apiClient.get(`/api/faculty/${id}`);
      setFaculty(response.data.faculty);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch faculty data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return "N/A";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const calculateExperience = (joinDate) => {
    if (!joinDate) return 0;
    const today = new Date();
    const join = new Date(joinDate);
    return today.getFullYear() - join.getFullYear();
  };

  const toggleSubject = (index) => {
    setActiveSubject(activeSubject === index ? null : index);
  };

  if (loading) {
    return (
      <div className="faculty-profile-container-loadingbox">
        <div>Loading...</div>
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="faculty-profile-container-loadingbox">
        <div>Failed to load faculty data</div>
      </div>
    );
  }

  return (
    <div className="faculty-profile-container">
      {/* Hero Section */}
      <div className="profile-hero">
        <div className="hero-overlay"></div>
        <div className="faculty-profile-card">
          <div className="profile-avatar">
            <img
              src={faculty.employment?.profile_picture_url || 'https://cdn.pixabay.com/photo/2024/02/02/04/20/ai-generated-8547231_1280.png'}
              alt="Profile"
              className="avatar-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
            <div className={`status-dot ${faculty.employment?.is_active ? 'active' : 'inactive'}`}></div>
          </div>
          <div className="profile-info">
            <h1>
              <span className="name-gradient">
                {faculty.personal_details?.first_name}
              </span>{" "}
              {faculty.personal_details?.last_name}
            </h1>
            <div className="profile-title">
              <span className="tag blue">{faculty.designation?.title || 'Faculty'}</span>
              <span className="tag green">
                {faculty.employment?.is_active ? "Active" : "Inactive"}
              </span>
              <span className="experience-badge">
                {calculateExperience(faculty.employment?.joining_date)}+ years experience
              </span>
            </div>
            <p className="profile-bio">{faculty.employment?.bio || 'No bio available'}</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="icon linkedin"></i>
              </a>
              <a href="#" className="social-link">
                <i className="icon google-scholar"></i>
              </a>
              <a href="#" className="social-link">
                <i className="icon researchgate"></i>
              </a>
              <a
                href={`mailto:${faculty.personal_details?.email}`}
                className="social-link"
              >
                <i className="icon email"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Personal Info Section */}
        <div className="profile-section">
          <div className="info-card glass-card">
            <h2 className="section-title">
              <i className="icon user"></i> Personal Information
            </h2>
            <div className="details-grid">
              <div className="detail-item">
                <label>Full Name</label>
                <div className="detail-value">
                  {`${faculty.personal_details?.first_name || ''} ${faculty.personal_details?.last_name || ''}`.trim() || 'N/A'}
                </div>
              </div>
              <div className="detail-item">
                <label>Date of Birth</label>
                <div className="detail-value">
                  {formatDate(faculty.personal_details?.date_of_birth)}
                  {faculty.personal_details?.date_of_birth && (
                    <span className="detail-note">
                      (Age: {calculateAge(faculty.personal_details?.date_of_birth)})
                    </span>
                  )}
                </div>
              </div>
              <div className="detail-item">
                <label>Gender</label>
                <div className="detail-value">
                  {faculty.personal_details?.gender || 'N/A'}
                </div>
              </div>
              <div className="detail-item">
                <label>Email</label>
                <div className="detail-value">
                  <a href={`mailto:${faculty.personal_details?.email}`}>
                    {faculty.personal_details?.email || 'N/A'}
                  </a>
                </div>
              </div>
              <div className="detail-item">
                <label>Mobile</label>
                <div className="detail-value">
                  <a href={`tel:${faculty.personal_details?.mobile}`}>
                    {faculty.personal_details?.mobile || 'N/A'}
                  </a>
                </div>
              </div>
              <div className="detail-item">
                <label>Address</label>
                <div className="detail-value">
                  {faculty.personal_details?.address ? (
                    `${faculty.personal_details.address.street || ''}, 
                    ${faculty.personal_details.address.city || ''}, 
                    ${faculty.personal_details.address.state || ''} 
                    ${faculty.personal_details.address.postal_code || ''}, 
                    ${faculty.personal_details.address.country || ''}`
                  ) : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Info Section */}
        <div className="profile-section">
          <div className="info-card glass-card">
            <h2 className="section-title">
              <i className="icon briefcase"></i> Professional Information
            </h2>
            <div className="details-grid">
              <div className="detail-item">
                <label>Joining Date</label>
                <div className="detail-value">
                  {formatDate(faculty.employment?.joining_date)}
                  {faculty.employment?.joining_date && (
                    <span className="detail-note">
                      (Experience: {calculateExperience(faculty.employment?.joining_date)} years)
                    </span>
                  )}
                </div>
              </div>
              <div className="detail-item">
                <label>Designation</label>
                <div className="detail-value">
                  {faculty.designation?.title || 'N/A'}
                  {faculty.designation?.pay_scale && (
                    <span className="detail-note">
                      {faculty.designation.pay_scale}
                    </span>
                  )}
                </div>
              </div>
              <div className="detail-item">
                <label>Qualifications</label>
                <div className="tags-container">
                  {faculty.employment?.qualifications?.length > 0 ? (
                    faculty.employment.qualifications.map((qual, index) => (
                      <span key={index} className="tag geekblue">
                        <i className="icon book"></i> {qual}
                      </span>
                    ))
                  ) : (
                    <span className="tag">No qualifications listed</span>
                  )}
                </div>
              </div>
              {faculty.designation?.responsibilities && (
                <div className="detail-item full-width">
                  <label>Responsibilities</label>
                  <ul className="responsibilities-list">
                    {faculty.designation.responsibilities.map((resp, index) => (
                      <li key={index}>
                        <i className="icon check"></i> {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Departments Section */}
        {faculty.departments?.length > 0 && (
          <div className="profile-section wide-section">
            <div className="info-card glass-card">
              <h2 className="section-title">
                <i className="icon university"></i> Departments
              </h2>
              <div className="departments-list">
                {faculty.departments.map((dept, index) => (
                  <div key={index} className="department-item">
                    <div className="dept-header">
                      <h3>{dept.name}</h3>
                      {dept.establishment_date && (
                        <span className="dept-established">
                          Since {new Date(dept.establishment_date).getFullYear()}
                        </span>
                      )}
                    </div>
                    <p className="dept-description">{dept.description || 'No description available'}</p>
                    {dept.contact_info && (
                      <div className="dept-contact">
                        {dept.contact_info.email && (
                          <span>
                            <i className="icon email"></i> {dept.contact_info.email}
                          </span>
                        )}
                        {dept.contact_info.phone && (
                          <span>
                            <i className="icon phone"></i> {dept.contact_info.phone}
                          </span>
                        )}
                        {dept.contact_info.office_location && (
                          <span>
                            <i className="icon map-marker"></i> {dept.contact_info.office_location}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Subjects Section */}
        {faculty.subjects?.length > 0 && (
          <div className="profile-section wide-section">
            <div className="info-card glass-card">
              <h2 className="section-title">
                <i className="icon book-open"></i> Teaching Subjects
              </h2>
              <div className="subjects-container">
                {faculty.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className={`subject-item ${
                      activeSubject === index ? "active" : ""
                    }`}
                    onClick={() => toggleSubject(index)}
                  >
                    <div className="subject-header">
                      <h3>{subject.name} ({subject.code})</h3>
                      <div className="subject-meta">
                        <span className="credits-badge">
                          {subject.credits} credits
                        </span>
                        {subject.department?.department_name && (
                          <span className="department-badge">
                            {subject.department.department_name}
                          </span>
                        )}
                        <i
                          className={`icon chevron ${
                            activeSubject === index ? "up" : "down"
                          }`}
                        ></i>
                      </div>
                    </div>
                    <div className="subject-content">
                      <p className="subject-description">{subject.description}</p>
                      {subject.syllabus?.length > 0 && (
                        <div className="syllabus-section">
                          <h4>Syllabus</h4>
                          <ul className="syllabus-list">
                            {subject.syllabus.map((item, idx) => (
                              <li key={idx}>
                                <i className="icon check"></i> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Research Interests Section */}
        {faculty.research_interests?.length > 0 && (
          <div className="profile-section">
            <div className="info-card glass-card">
              <h2 className="section-title">
                <i className="icon flask"></i> Research Interests
              </h2>
              <div className="interests-container">
                {faculty.research_interests.map((interest, index) => (
                  <div key={index} className="interest-bubble">
                    <div className="bubble-content">
                      <i className="icon rocket"></i>
                      <span>{interest}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Publications Section */}
        <div className="profile-section wide-section">
          <div className="info-card glass-card">
            <div className="publications-header">
              <h2 className="section-title">
                <i className="icon file-text"></i> Publications
              </h2>
              <span className="publications-count">
                {faculty.publications?.length || 0} publications
              </span>
            </div>

            {faculty.publications?.length > 0 ? (
              <div className="publications-list">
                {faculty.publications.map((pub, index) => (
                  <div key={index} className="publication-item">
                    {pub.date && (
                      <div className="pub-date">
                        {new Date(pub.date).getFullYear()}
                      </div>
                    )}
                    <div className="pub-content">
                      <h3>{pub.title || 'Untitled Publication'}</h3>
                      {pub.journal && <p className="pub-journal">{pub.journal}</p>}
                      {pub.link && (
                        <a href={pub.link} className="pub-link" target="_blank" rel="noopener noreferrer">
                          View Publication <i className="icon external-link"></i>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="icon book"></i>
                <p>No publications available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;