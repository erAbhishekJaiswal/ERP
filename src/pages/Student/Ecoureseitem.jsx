// import React from 'react'
// import "../../CSSfolder/StudentCSS/ecoureseitem.css"
// import "../../CSSfolder/StudentCSS/student.css"
// import Video from "../../assets/videos/Ecourse.mp4"
// import '../../CSSfolder/CommonCSS/allfile.css'
// import { Link } from 'react-router-dom'

// const Ecoureseitem = () => {
//     return (
//         <>
//             <div className='allcontainer'>
//                 <div className="itemmain">
//                     <div className="itembox1">
//                         <div className="itembox1one">
//                             <div className="ithead">
//                                 The MVC architectural pattern
//                             </div>
//                         </div>
//                         <div className="itembox1two">
//                             <video className="coreVideo" controls>
//                                 <source src={Video} type="video/mp4" />
//                             </video>

//                         </div>
//                         <div className="itembox1three">
//                             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam, dolorum. Dignissimos beatae tenetur esse incidunt minima alias quod provident excepturi odio. Saepe quae repellendus numquam distinctio maxime debitis ex ratione.
//                             Nulla quisquam velit mollitia. Id, corrupti dicta harum quae optio ipsa, qui praesentium natus voluptas ratione officiis quam eligendi ducimus eaque nulla enim, velit earum aliquid vitae? Hic, praesentium autem.
//                             Quos consectetur hic sit dolores perspiciatis nostrum nesciunt recusandae animi quam magnam deleniti, laudantium sunt deserunt necessitatibus, tenetur a. Dolor possimus delectus aut ducimus atque, distinctio sed deserunt ex itaque!
//                         </div>
//                         <div className="itembox1four">
//                             <ul className="videopart1">
//                                 <Link to={'/intro'}><li className='corecontent'>Introduction</li></Link>
//                                 <Link to={'/Install'}><li className='corecontent'>Installation</li></Link>
//                                 <Link to={'/mvc'}><li className='corecontent'>The MVC architectural pattern</li></Link>
//                                 <Link to={'/databasemodels'}><li className='corecontent'>Database Models</li></Link>
//                                 <Link to={'/takeQuiz'}><li className='corecontent'>Take Quiz</li></Link>
//                             </ul>
//                             <div className="videopart1">

//                             </div>
//                         </div>
//                     </div>
//                     <div className="itembox2">
//                         <div className="itembox2one">
//                             <button className="downloditem">
//                                 Download File
//                             </button>
//                         </div>
//                         <div className="itembox2two">
//                             <div className="itemprofile">
//                                 <img src="" alt="teacher" />
//                                 <div className='teachname'>Name of Teacher</div>
//                             </div>
//                             <div className="itemdiscription">
//                                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro aliquam rerum repellendus ipsam accusamus libero praesentium sapiente, ea ut. Fuga voluptas excepturi numquam. Itaque, voluptatem!
//                             </div>
//                             <div className="itemcontact">
//                                 <div className="contitem1">X</div>
//                                 <div className="contitem1">F</div>
//                                 <div className="contitem1">I</div>
//                             </div>
//                         </div>
//                         <div className="itembox2three">
//                             <div className='itemduration'>
//                                 2 hrs   26 min
//                             </div>
//                             <div className="itemlavel">
//                                 Beginner
//                             </div>
//                         </div>
//                         <div className="itembox2four">
//                             <div className="rating">
//                                 Rating
//                             </div>
//                             <div className="itemstar">

//                             </div>
//                         </div>
//                         <div className="itembox2five">
//                             <button className='helpitem'>
//                                 ? Get Help
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* <div>
//                     <h2>{course.name}</h2>
//                     <p>Instructor: {course.instructor}</p>
//                     <button>View Course</button>
//                 </div> */}
//             </div>
//         </>
//     )
// }

// export default Ecoureseitem







import React from 'react';
import { Link } from 'react-router-dom';
import Video from "../../assets/videos/Ecourse.mp4";
import "../../CSSfolder/StudentCSS/ecoureseitem.css"
// import './EcourseItem.css';

const EcourseItem = () => {
    return (
        <div className="ecourse-item-container">
            {/* Main Content Section */}
            <div className="ecourse-main-content">
                {/* Course Header */}
                <div className="course-header">
                    <h1>The MVC Architectural Pattern</h1>
                    <div className="course-meta">
                        <span className="duration">2h 26m</span>
                        <span className="level">Beginner</span>
                        <div className="rating">
                            <span className="stars">★★★★☆</span>
                            <span className="rating-text">4.2 (128 reviews)</span>
                        </div>
                    </div>
                </div>

                {/* Video Player Section */}
                <div className="video-container">
                    <video className="course-video" controls poster="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80">
                        <source src={Video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Course Description */}
                <div className="course-description">
                    <h2>About This Lesson</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, dolorum. Dignissimos beatae tenetur esse incidunt minima alias quod provident excepturi odio. Saepe quae repellendus numquam distinctio maxime debitis ex ratione.
                        Nulla quisquam velit mollitia. Id, corrupti dicta harum quae optio ipsa, qui praesentium natus voluptas ratione officiis quam eligendi ducimus eaque nulla enim, velit earum aliquid vitae? Hic, praesentium autem.
                    </p>
                </div>

                {/* Course Curriculum */}
                <div className="course-curriculum">
                    <h2>Course Curriculum</h2>
                    <ul className="lesson-list">
                        <li className="lesson-item">
                            <Link to={`/student/e-course/:id`} className="lesson-link">
                                <span className="lesson-icon">▶</span>
                                <span className="lesson-title">Introduction</span>
                                <span className="lesson-duration">15 min</span>
                            </Link>
                        </li>
                        <li className="lesson-item">
                            <Link to={`/student/e-course/:id`} className="lesson-link">
                                <span className="lesson-icon">▶</span>
                                <span className="lesson-title">Installation</span>
                                <span className="lesson-duration">22 min</span>
                            </Link>
                        </li>
                        <li className="lesson-item active">
                            <Link to={`/student/e-course/:id`} className="lesson-link">
                                <span className="lesson-icon">▶</span>
                                <span className="lesson-title">The MVC Architectural Pattern</span>
                                <span className="lesson-duration">45 min</span>
                            </Link>
                        </li>
                        <li className="lesson-item">
                            <Link to={`/student/e-course/:id`} className="lesson-link">
                                <span className="lesson-icon">▶</span>
                                <span className="lesson-title">Database Models</span>
                                <span className="lesson-duration">38 min</span>
                            </Link>
                        </li>
                        <li className="lesson-item quiz">
                            <Link to={`/student/e-course/:id`} className="lesson-link">
                                <span className="lesson-icon">?</span>
                                <span className="lesson-title">Take Quiz</span>
                                <span className="lesson-duration">20 min</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Sidebar Section */}
            <div className="ecourse-sidebar">
                {/* Download Section */}
                <div className="sidebar-section download-section">
                    <button className="download-button">
                        <span className="download-icon">↓</span>
                        Download Course Materials
                    </button>
                </div>

                {/* Instructor Section */}
                <div className="sidebar-section instructor-section">
                    <div className="instructor-header">
                        <h3>About the Instructor</h3>
                    </div>
                    <div className="instructor-profile">
                        <img 
                            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                            alt="Instructor" 
                            className="instructor-image"
                        />
                        <div className="instructor-info">
                            <h4 className="instructor-name">Dr. Sarah Johnson</h4>
                            <p className="instructor-title">Senior Software Architect</p>
                        </div>
                    </div>
                    <div className="instructor-bio">
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro aliquam rerum repellendus ipsam accusamus libero praesentium sapiente, ea ut. Fuga voluptas excepturi numquam. Itaque, voluptatem!
                        </p>
                    </div>
                    <div className="instructor-social">
                        <a href="#" className="social-link twitter">Twitter</a>
                        <a href="#" className="social-link facebook">Facebook</a>
                        <a href="#" className="social-link linkedin">LinkedIn</a>
                    </div>
                </div>

                {/* Help Section */}
                <div className="sidebar-section help-section">
                    <button className="help-button">
                        <span className="help-icon">?</span>
                        Get Help with This Course
                    </button>
                </div>

                {/* Progress Section */}
                <div className="sidebar-section progress-section">
                    <h3>Your Progress</h3>
                    <div className="progress-container">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '65%' }}></div>
                        </div>
                        <div className="progress-text">65% Complete</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EcourseItem;