import React from 'react';
import { useState } from 'react';
import '../../CSSfolder/CommonCSS/setting.css';

const Setting = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const handleThemeChange = (e) => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        localStorage.setItem('theme', theme);
        // document.documentElement.setAttribute('App', e.target.value);
    };

    return (
        <div className="setting-page">
            <h1>Settings</h1>
            <div className="setting-box">
                {/* <label>
                    Theme:
                    <select value={theme} onChange={handleThemeChange}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label> */}
                <h3>Theme:</h3>
                <div className="theme-toggle">
                <p>{theme === 'light' ? 'Light' : 'Dark'}</p>
                <label class="switch">    
                    <input type="checkbox" checked={theme === 'light'} onChange={handleThemeChange} />
                    <span class="slider round"></span>
                </label>
                </div>
            </div>
        </div>
    );
};

export default Setting;
