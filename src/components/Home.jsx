
import '../CSSfolder/home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiAward, 
  FiUsers, 
  FiBook, 
  FiClock, 
  FiBarChart2,
  FiPlay,
  FiStar,
  FiChevronRight,
  FiChevronLeft
} from 'react-icons/fi';
import attendance from '../assets/images/attendance.png';
import course from '../assets/images/course.png';
import faculty from '../assets/images/university.png';
import grduationhat from '../assets/images/graduationhat.png';
import library from '../assets/images/bookshelf.png';
import exam from '../assets/images/checklist.png';

function Home() {
  const navigate = useNavigate();
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      icon: <FiBarChart2 className="benefit-tab__icon" />,
      title: "Operational Efficiency",
      content: [
        "Reduce paperwork and manual processes by up to 70% with our automated workflows and digital forms.",
        "Institutions report 30% reduction in operational costs through optimized resource allocation.",
        "Stay compliant with education regulations and accreditation requirements."
      ]
    },
    {
      icon: <FiUsers className="benefit-tab__icon" />,
      title: "Student Success",
      content: [
        "Comprehensive student lifecycle management from admission to alumni relations.",
        "Early alert systems to identify and support at-risk students.",
        "Mobile-friendly interface for seamless student experience."
      ]
    },
    {
      icon: <FiAward className="benefit-tab__icon" />,
      title: "Data-Driven Decisions",
      content: [
        "Real-time analytics dashboard for institutional insights.",
        "Advanced reporting tools for curriculum assessment.",
        "Predictive analytics for enrollment and retention strategies."
      ]
    }
  ];

  const testimonials = [
    {
      quote: "AcademicERP transformed how we manage our university. The student portal alone reduced administrative queries by 40%. The analytics dashboard gives us real-time insights we never had before.",
      author: "Er. Abhishek Jaiswal",
      title: "Student & Developer",
      org: "Ashoka Institute of Technology & Management Varanasi",
      avatar: "https://avatars.githubusercontent.com/u/169516698?v=4",
      rating: 5
    },
    {
      quote: "The implementation was seamless and the support team was exceptional. Our faculty now spends more time teaching and less time on administrative tasks.",
      author: "Dr. Sarah Johnson",
      title: "Academic Dean",
      org: "Tech University",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 5
    },
    {
      quote: "Since adopting AcademicERP, we've seen a 25% improvement in student retention rates. The data insights helped us identify key areas for improvement.",
      author: "Prof. Michael Chen",
      title: "Department Chair",
      org: "Metropolitan College",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4
    }
  ];

  const features = [
    {
      icon: grduationhat,
      title: "Student Lifecycle Management",
      description: "From admission to alumni relations, track and manage the complete student journey with our comprehensive tools.",
      items: ["Online admissions", "Registration & enrollment", "Academic progress tracking", "Graduation management"]
    },
    {
      icon: faculty,
      title: "Faculty & HR Management",
      description: "Efficient systems for faculty scheduling, performance tracking, and resource allocation.",
      items: ["Workload management", "Performance evaluation", "Payroll integration", "Professional development"]
    },
    {
      icon: course,
      title: "Curriculum Management",
      description: "Design, deliver, and assess curriculum with our powerful course management tools.",
      items: ["Course catalog management", "Syllabus creation", "Program assessment", "Accreditation support"]
    },
    {
      icon: attendance,
      title: "Attendance & Engagement",
      description: "Monitor student participation and identify at-risk students with our engagement tools.",
      items: ["Biometric integration", "Mobile check-in", "Early alert system", "Parent notifications"]
    },
    {
      icon: exam,
      title: "Assessment & Examinations",
      description: "Complete exam scheduling, grading, and result processing solutions.",
      items: ["Online exam creation", "Automated grading", "Plagiarism detection", "Analytics dashboard"]
    },
    {
      icon: library,
      title: "Learning Resources",
      description: "Manage physical and digital resources with our integrated library system.",
      items: ["Digital repository", "Circulation management", "E-resource access", "Research support"]
    }
  ];

  const stats = [
    { icon: <FiUsers className="stats-card__icon" />, number: "100+", label: "Students Empowered" },
    { icon: <FiBook className="stats-card__icon" />, number: "50+", label: "Courses Offered" },
    { icon: <FiAward className="stats-card__icon" />, number: "95%", label: "Satisfaction Rate" },
    { icon: <FiClock className="stats-card__icon" />, number: "24/7", label: "System Availability" }
  ];

  return (
    <div className={`home-page ${isVisible ? 'home-page--visible' : ''}`}>
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero__background">
          <div className="home-hero__overlay"></div>
        </div>
        <div className="home-hero__content">
          <div className="home-hero__text">
            <h1 className="home-hero__title">
              Transforming Education Through 
              <span className="home-hero__title--highlight"> Technology</span>
            </h1>
            <p className="home-hero__subtitle">
              Our Academic ERP System streamlines campus operations and enhances learning experiences for institutions of all sizes
            </p>
            <div className="home-hero__actions">
              <button 
                className="home-hero__button home-hero__button--primary" 
                onClick={() => navigate('/login')}
              >
                Get Started <FiArrowRight className="home-hero__button-icon" />
              </button>
              <button 
                className="home-hero__button home-hero__button--secondary"
                onClick={() => navigate('/features')}
              >
                <FiPlay className="home-hero__button-icon" />
                Watch Demo
              </button>
            </div>
          </div>
          <div className="home-hero__visual">
            <div className="home-hero__dashboard-preview">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="ERP System Dashboard" 
                className="home-hero__dashboard-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="home-stats">
        <div className="home-stats__container">
          {stats.map((stat, index) => (
            <div key={index} className="home-stats__card">
              {stat.icon}
              <div className="home-stats__number">{stat.number}</div>
              <div className="home-stats__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="home-about">
        <div className="home-about__container">
          <div className="home-about__content">
            <h2 className="home-about__title">
              About <span className="home-about__title--accent">AcademicERP</span> System
            </h2>
            <div className="home-about__divider"></div>
            <p className="home-about__description">
              AcademicERP is a comprehensive Enterprise Resource Planning system designed specifically for educational institutions. 
              Our platform integrates all academic and administrative functions into a unified system, providing real-time data access, 
              streamlined workflows, and powerful analytics to drive institutional success.
            </p>
            <div className="home-about__features">
              {[
                "Centralized data management",
                "Automated administrative processes",
                "Mobile-friendly interface",
                "Advanced reporting tools",
                "Secure cloud-based infrastructure",
                "Customizable modules"
              ].map((feature, index) => (
                <div key={index} className="home-about__feature-item">
                  <FiCheckCircle className="home-about__feature-icon" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="home-about__visual">
            <div className="home-about__image-container">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="ERP System Interface" 
                className="home-about__image"
              />
              <div className="home-about__image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="home-features__container">
          <div className="home-features__header">
            <h2 className="home-features__title">Comprehensive ERP Modules</h2>
            <div className="home-features__divider"></div>
            <p className="home-features__subtitle">
              Tailored solutions for every aspect of academic management
            </p>
          </div>
          
          <div className="home-features__grid">
            {features.map((feature, index) => (
              <div key={index} className="home-features__card">
                <div className="home-features__card-icon">
                  <img src={feature.icon} alt={feature.title} />
                </div>
                <h3 className="home-features__card-title">{feature.title}</h3>
                <p className="home-features__card-description">{feature.description}</p>
                <ul className="home-features__card-list">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="home-features__card-item">
                      <FiChevronRight className="home-features__card-bullet" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="home-benefits">
        <div className="home-benefits__container">
          <div className="home-benefits__header">
            <h2 className="home-benefits__title">Institutional Benefits</h2>
            <div className="home-benefits__divider"></div>
          </div>
          
          <div className="home-benefits__tabs">
            {benefits.map((benefit, index) => (
              <button
                key={index}
                className={`home-benefits__tab ${activeBenefit === index ? 'home-benefits__tab--active' : ''}`}
                onClick={() => setActiveBenefit(index)}
              >
                {benefit.icon}
                <span>{benefit.title}</span>
              </button>
            ))}
          </div>
          
          <div className="home-benefits__content">
            <div className="home-benefits__slide">
              <h3 className="home-benefits__slide-title">{benefits[activeBenefit].title}</h3>
              <div className="home-benefits__slide-items">
                {benefits[activeBenefit].content.map((point, pointIndex) => (
                  <div key={pointIndex} className="home-benefits__slide-item">
                    <FiCheckCircle className="home-benefits__slide-icon" />
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="home-testimonials">
        <div className="home-testimonials__container">
          <div className="home-testimonials__header">
            <h2 className="home-testimonials__title">Trusted by Leading Institutions</h2>
            <div className="home-testimonials__divider"></div>
          </div>
          
          <div className="home-testimonials__carousel">
            <button 
              className="home-testimonials__nav home-testimonials__nav--prev"
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            >
              <FiChevronLeft />
            </button>
            
            <div className="home-testimonials__slide">
              <div className="home-testimonials__card">
                <div className="home-testimonials__quote">
                  "{testimonials[currentTestimonial].quote}"
                </div>
                <div className="home-testimonials__rating">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <FiStar key={i} className="home-testimonials__star" />
                  ))}
                </div>
                <div className="home-testimonials__author">
                  <img 
                    src={testimonials[currentTestimonial].avatar} 
                    alt={testimonials[currentTestimonial].author}
                    className="home-testimonials__avatar" 
                  />
                  <div className="home-testimonials__author-info">
                    <div className="home-testimonials__author-name">
                      {testimonials[currentTestimonial].author}
                    </div>
                    <div className="home-testimonials__author-title">
                      {testimonials[currentTestimonial].title}
                    </div>
                    <div className="home-testimonials__author-org">
                      {testimonials[currentTestimonial].org}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              className="home-testimonials__nav home-testimonials__nav--next"
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
            >
              <FiChevronRight />
            </button>
          </div>
          
          <div className="home-testimonials__indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`home-testimonials__indicator ${currentTestimonial === index ? 'home-testimonials__indicator--active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="home-cta__container">
          <div className="home-cta__content">
            <h2 className="home-cta__title">Ready to Transform Your Institution?</h2>
            <p className="home-cta__subtitle">
              Join thousands of educational institutions already using AcademicERP
            </p>
            <div className="home-cta__actions">
              <button className="home-cta__button home-cta__button--primary">
                Request Demo
              </button>
              <button className="home-cta__button home-cta__button--secondary">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;