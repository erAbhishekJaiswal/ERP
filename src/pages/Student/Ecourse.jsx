// import React from 'react';
// import "../../CSSfolder/StudentCSS/ecourse.css"
// import "../../CSSfolder/StudentCSS/student.css"
// import '../../CSSfolder/CommonCSS/allfile.css'
// // import Ecourseitem from "./Ecoureseitem.js"
// import { Link } from 'react-router-dom';

// const Ecourse = () => {

//     const courses = [
//         { id: 1, name: "Mathematics", instructor: "John Doe" },
//         { id: 2, name: "Physics", instructor: "Jane Doe" },
//     ];


//     return (
//         <>
//             <div className="allcontainer">
//                 <div className="ecormain">
//                     <div className="coreitem">
//                         <div className="ecoreitem">
//                             <div className="ecorefirst">
//                                 <Link to='/takecourse'><img src="https://cdn.pixabay.com/photo/2015/10/27/14/40/programming-1009134_960_720.jpg" alt="course img" /></Link>
//                                 <div className="corehead">
//                                     <div className='ecoretitle'><Link to='/takecourse' >Title One</Link></div>
//                                     <p>Lesson</p>
//                                 </div>
//                             </div>
//                             <div className="ecoresecond">
//                                 <p>Progress Bar</p>
//                             </div>
//                             <div className="ecorethird">
//                                 <Link to="/takecourse">
//                                     Continue
//                                 </Link>
//                             </div>
//                         </div>

//                         <div className="ecoreitem">
//                             <div className="ecorefirst">
//                                 <Link to='/takecourse'><Link to='/takecourse'><img src="https://cdn.pixabay.com/photo/2015/10/27/14/40/programming-1009134_960_720.jpg" alt="course img" /></Link></Link>
//                                 <div className="corehead">
//                                     <div className='ecoretitle'><Link to='/takecourse' >Title One</Link></div>
//                                     <p>Lesson</p>
//                                 </div>
//                             </div>
//                             <div className="ecoresecond">
//                                 <p>Progress Bar</p>
//                             </div>
//                             <div className="ecorethird">
//                                 <Link to="/takecourse">
//                                     Continue
//                                 </Link>
//                             </div>
//                         </div>
//                         <div className="ecoreitem">
//                             <div className="ecorefirst">
//                                 <Link to='/takecourse'><img src="https://cdn.pixabay.com/photo/2015/10/27/14/40/programming-1009134_960_720.jpg" alt="course img" /></Link>
//                                 <div className="corehead">
//                                     <div className='ecoretitle'><Link to='/takecourse' >Title One</Link></div>
//                                     <p>Lesson</p>
//                                 </div>
//                             </div>
//                             <div className="ecoresecond">
//                                 <p>Progress Bar</p>
//                             </div>
//                             <div className="ecorethird">
//                                 <Link to="/takecourse">
//                                     Continue
//                                 </Link>
//                             </div>
//                         </div>
//                         <div className="ecoreitem">
//                             <div className="ecorefirst">
//                                 <Link to='/takecourse'><img src="https://cdn.pixabay.com/photo/2015/10/27/14/40/programming-1009134_960_720.jpg" alt="course img" /></Link>
//                                 <div className="corehead">
//                                     <div className='ecoretitle'><Link to='/takecourse' >Title One</Link></div>
//                                     <p>Lesson</p>
//                                 </div>
//                             </div>
//                             <div className="ecoresecond">
//                                 <p>Progress Bar</p>
//                             </div>
//                             <div className="ecorethird">
//                                 <Link to="/takecourse">
//                                     Continue
//                                 </Link>
//                             </div>
//                         </div>
//                         <div className="ecoreitem">
//                             <div className="ecorefirst">
//                                 <Link to='/takecourse'><img src="https://cdn.pixabay.com/photo/2015/10/27/14/40/programming-1009134_960_720.jpg" alt="course img" /></Link>
//                                 <div className="corehead">
//                                     <div className='ecoretitle'><Link to='/takecourse' >Title One</Link></div>
//                                     <p>Lesson</p>
//                                 </div>
//                             </div>
//                             <div className="ecoresecond">
//                                 <p>Progress Bar</p>
//                             </div>
//                             <div className="ecorethird">
//                                 <Link to="/takecourse">
//                                     Continue
//                                 </Link>
//                             </div>
//                         </div>

//                         <div className="ecoreitem">
//                             <div className="ecorefirst">
//                                 <Link to='/takecourse'><img src="https://cdn.pixabay.com/photo/2015/10/27/14/40/programming-1009134_960_720.jpg" alt="course img" /></Link>
//                                 <div className="corehead">
//                                     <div className='ecoretitle'><Link to='/takecourse' >Title One</Link></div>
//                                     <p>Lesson</p>
//                                 </div>
//                             </div>
//                             <div className="ecoresecond">
//                                 <p>Progress Bar</p>
//                             </div>
//                             <div className="ecorethird">
//                                 <Link to="/takecourse">
//                                     Continue
//                                 </Link>
//                             </div>
//                         </div>

//                     </div>

//                 </div>
//             </div>
//         </>
//     )
// }

// export default Ecourse










import React from 'react';
import { Link } from 'react-router-dom';
import '../../CSSfolder/StudentCSS/ecourse.css'; // We'll consolidate all CSS here

const Ecourse = () => {
    const courses = [
        { 
            id: 1, 
            name: "Mathematics", 
            instructor: "John Doe",
            progress: 75,
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            lessons: 12
        },
        { 
            id: 2, 
            name: "Physics", 
            instructor: "Jane Doe",
            progress: 40,
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            lessons: 8
        },
        { 
            id: 3, 
            name: "Computer Science", 
            instructor: "Alan Turing",
            progress: 90,
            image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
            lessons: 15
        },
        { 
            id: 4, 
            name: "Literature", 
            instructor: "Emily Bronte",
            progress: 25,
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            lessons: 10
        },
    ];

    return (
        <div className="ecourse-container">
            <div className="ecourse-header">
                <h1>My Courses</h1>
                <p>Continue your learning journey</p>
            </div>
            
            <div className="course-grid">
                {courses.map((course) => (
                    <div className="course-card" key={course.id}>
                        <div className="course-image-container">
                            <Link to={`/student/e-course/${course.id}`}>
                                <img 
                                    src={course.image} 
                                    alt={course.name} 
                                    className="course-image"
                                />
                                <div className="course-overlay"></div>
                            </Link>
                        </div>
                        
                        <div className="course-content">
                            <div className="course-info">
                                <h3 className="course-title">
                                    <Link to={`/student/e-course/${course.id}`}>{course.name}</Link>
                                </h3>
                                <p className="course-instructor">By {course.instructor}</p>
                                <p className="course-lessons">{course.lessons} lessons</p>
                            </div>
                            
                            <div className="progress-container">
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill" 
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                                <span className="progress-text">{course.progress}% Complete</span>
                            </div>
                            
                            <Link to={`/student/e-course/${course.id}`} className="continue-button">
                                {course.progress > 0 ? "Continue" : "Start Learning"}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ecourse;