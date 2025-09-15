import React from 'react';
import '../../CSSfolder/CommonCSS/footer.css';
const Footer = () => {
    const theme = localStorage.getItem('theme');
    return (
        <footer className="footer" style={{ backgroundColor: theme === 'dark' ? '#ffffff' : '#0d0d2b' }}>
            <p style={{color: theme === 'dark' ? '#000000' :'#ffffff'}}>&copy; {new Date().getFullYear()} Acadmigo. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
