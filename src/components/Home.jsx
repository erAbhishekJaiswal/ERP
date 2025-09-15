import '../CSSfolder/home.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowRight, FiCheckCircle, FiAward, FiUsers, FiBook, FiClock, FiBarChart2 } from 'react-icons/fi';
import attendance from '../assets/images/attendance.png';
import course from '../assets/images/course.png';
import faculty from '../assets/images/university.png';
import grduationhat from '../assets/images/graduationhat.png';
import library from '../assets/images/bookshelf.png';
import exam from '../assets/images/checklist.png';

function Home() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section >
        <div className="hero-section" ></div>
        <div className="home-hero-content">
          <h1 className="hero-title">Transforming Education Through Technology</h1>
          <p className="hero-subtitle">Our Academic ERP System streamlines campus operations and enhances learning experiences</p>
          <div className="hero-buttons">
            <button className="primary-button" onClick={() => navigate('/login')}>
              Get Started <FiArrowRight />
            </button>
            <button className="secondary-button" onClick={() => navigate('/features')}>
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <FiUsers className="stat-icon" />
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Students Empowered</div>
          </div>
          <div className="stat-item">
            <FiBook className="stat-icon" />
            <div className="stat-number">500+</div>
            <div className="stat-label">Courses Offered</div>
          </div>
          <div className="stat-item">
            <FiAward className="stat-icon" />
            <div className="stat-number">95%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat-item">
            <FiClock className="stat-icon" />
            <div className="stat-number">24/7</div>
            <div className="stat-label">System Availability</div>
          </div>
        </div>
      </section>

      {/* About ERP Section */}
      <section className="about-erp-section">
        <div className="section-container">
          <div className="erp-content">
            <h2 className="section-title">About AcademicERP System</h2>
            <div className="section-divider"></div>
            <p className="erp-description">
              AcademicERP is a comprehensive Enterprise Resource Planning system designed specifically for educational institutions. 
              Our platform integrates all academic and administrative functions into a unified system, providing real-time data access, 
              streamlined workflows, and powerful analytics to drive institutional success.
            </p>
            <div className="erp-features">
              <div className="feature-item">
                <FiCheckCircle className="feature-icon" />
                <span>Centralized data management</span>
              </div>
              <div className="feature-item">
                <FiCheckCircle className="feature-icon" />
                <span>Automated administrative processes</span>
              </div>
              <div className="feature-item">
                <FiCheckCircle className="feature-icon" />
                <span>Mobile-friendly interface</span>
              </div>
              <div className="feature-item">
                <FiCheckCircle className="feature-icon" />
                <span>Advanced reporting tools</span>
              </div>
              <div className="feature-item">
                <FiCheckCircle className="feature-icon" />
                <span>Secure cloud-based infrastructure</span>
              </div>
              <div className="feature-item">
                <FiCheckCircle className="feature-icon" />
                <span>Customizable modules</span>
              </div>
            </div>
          </div>
          <div className="erp-image">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="ERP System Dashboard" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title">Comprehensive ERP Modules</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">Tailored solutions for every aspect of academic management</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img src={grduationhat} alt="Student Management" />
              </div>
              <h3 className="feature-title">Student Lifecycle Management</h3>
              <p className="feature-description">
                From admission to alumni relations, track and manage the complete student journey with our comprehensive tools.
              </p>
              <ul className="feature-list">
                <li>Online admissions</li>
                <li>Registration & enrollment</li>
                <li>Academic progress tracking</li>
                <li>Graduation management</li>
              </ul>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <img src={faculty} alt="Faculty Management" />
              </div>
              <h3 className="feature-title">Faculty & HR Management</h3>
              <p className="feature-description">
                Efficient systems for faculty scheduling, performance tracking, and resource allocation.
              </p>
              <ul className="feature-list">
                <li>Workload management</li>
                <li>Performance evaluation</li>
                <li>Payroll integration</li>
                <li>Professional development</li>
              </ul>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <img src={course} alt="Course Management" />
              </div>
              <h3 className="feature-title">Curriculum Management</h3>
              <p className="feature-description">
                Design, deliver, and assess curriculum with our powerful course management tools.
              </p>
              <ul className="feature-list">
                <li>Course catalog management</li>
                <li>Syllabus creation</li>
                <li>Program assessment</li>
                <li>Accreditation support</li>
              </ul>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <img src={attendance} alt="Attendance Tracking" />
              </div>
              <h3 className="feature-title">Attendance & Engagement</h3>
              <p className="feature-description">
                Monitor student participation and identify at-risk students with our engagement tools.
              </p>
              <ul className="feature-list">
                <li>Biometric integration</li>
                <li>Mobile check-in</li>
                <li>Early alert system</li>
                <li>Parent notifications</li>
              </ul>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <img src={exam} alt="Examination Management" />
              </div>
              <h3 className="feature-title">Assessment & Examinations</h3>
              <p className="feature-description">
                Complete exam scheduling, grading, and result processing solutions.
              </p>
              <ul className="feature-list">
                <li>Online exam creation</li>
                <li>Automated grading</li>
                <li>Plagiarism detection</li>
                <li>Analytics dashboard</li>
              </ul>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <img src={library} alt="Library Management" />
              </div>
              <h3 className="feature-title">Learning Resources</h3>
              <p className="feature-description">
                Manage physical and digital resources with our integrated library system.
              </p>
              <ul className="feature-list">
                <li>Digital repository</li>
                <li>Circulation management</li>
                <li>E-resource access</li>
                <li>Research support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-container">
          <h2 className="section-title">Institutional Benefits</h2>
          <div className="section-divider"></div>
          
          <div className="benefits-tabs">
            <div className="benefit-tab active">
              <FiBarChart2 className="tab-icon" />
              <span>Operational Efficiency</span>
            </div>
            <div className="benefit-tab">
              <FiUsers className="tab-icon" />
              <span>Student Success</span>
            </div>
            <div className="benefit-tab">
              <FiAward className="tab-icon" />
              <span>Data-Driven Decisions</span>
            </div>
          </div>
          
          <div className="benefits-content">
            <div className="benefit-item">
              <h3>Streamlined Administrative Processes</h3>
              <p>
                Reduce paperwork and manual processes by up to 70% with our automated workflows and digital forms. 
                Our system integrates all departments into a single platform, eliminating data silos and redundant data entry.
              </p>
            </div>
            <div className="benefit-item">
              <h3>Cost Savings</h3>
              <p>
                Institutions using AcademicERP report an average of 30% reduction in operational costs through 
                optimized resource allocation, reduced printing costs, and improved staff productivity.
              </p>
            </div>
            <div className="benefit-item">
              <h3>Regulatory Compliance</h3>
              <p>
                Stay compliant with education regulations and accreditation requirements with our built-in compliance 
                tracking and automated reporting tools that generate the documentation you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">Trusted by Leading Institutions</h2>
          <div className="section-divider"></div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">
                "AcademicERP transformed how we manage our university. The student portal alone reduced administrative queries by 40%.", 
                "The analytics dashboard gives us real-time insights we never had before. We can now make data-driven decisions about curriculum."
              </div>
              <div className="testimonial-author">
                <img src="https://avatars.githubusercontent.com/u/169516698?v=4" alt="Er. Abhishek Jaiswal" />
                <div className="author-info">
                  <div className="author-name">Er. Abhishek Jaiswal</div>
                  <div className="author-title">Student & Developer, Collage of Engineering</div>
                  <div className="author-org">Ashoka Institute of Technology & Management Varanasi</div>
                </div>
              </div>
            </div>
            
            {/* <div className="testimonial-card">
              <div className="testimonial-quote">
                "The analytics dashboard gives us real-time insights we never had before. We can now make data-driven decisions about curriculum."
              </div>
              <div className="testimonial-author">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Prof. Michael Chen" />
                <div className="author-info">
                  <div className="author-name">Prof. Michael Chen</div>
                  <div className="author-title">Department Chair</div>
                  <div className="author-org">Metropolitan College</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <h2 className="cta-title">Ready to Transform Your Institution?</h2>
          <p className="cta-subtitle">Schedule a demo today and see AcademicERP in action</p>
          <div className="cta-buttons">
            <button className="primary-button">Request Demo</button>
            <button className="secondary-button">Contact Sales</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;