import React, { useEffect, useState } from 'react';

const themes = {
    'cyber-matcha': { name: 'Cyber Matcha', color: '#50FA7B' },
    'blockchain-blue': { name: 'Blockchain Blue', color: '#3080FF' },
    'divine-gold': { name: 'Divine Gold', color: '#FFD700' },
    'metal-red': { name: 'Metal Red', color: '#FF4646' }
};

const switchColorPalette = (themeId, mode) => {
    document.documentElement.setAttribute('data-theme', `${themeId}-${mode}`);
};

const ColorSwitcher = () => {
    const [activeTheme, setActiveTheme] = useState('cyber-matcha');
    const [mode, setMode] = useState('dark');

    const handleThemeChange = (themeId) => {
        setActiveTheme(themeId);
        switchColorPalette(themeId, mode);
    };

    const handleModeToggle = () => {
        const newMode = mode === 'dark' ? 'light' : 'dark';
        setMode(newMode);
        switchColorPalette(activeTheme, newMode);
    };
    
    useEffect(() => {
        switchColorPalette('cyber-matcha', 'dark');
    }, []);

    return (
        <div className="controls-container">
            <div className="color-switcher-wrapper">
                <span className="switcher-label">THEME</span>
                <div className="color-switcher-container">
                    {Object.entries(themes).map(([id, { name, color }]) => (
                        <button 
                            key={id}
                            className={`theme-button ${activeTheme === id ? 'active' : ''}`}
                            onClick={() => handleThemeChange(id)}
                            title={name}
                        >
                            <span className="theme-dot" style={{ backgroundColor: color }}></span>
                        </button>
                    ))}
                </div>
            </div>
            <button className="mode-switch" onClick={handleModeToggle} title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}>
                <div className="switch-track">
                    <div className="switch-thumb">
                        <svg className="switch-icon sun" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        <svg className="switch-icon moon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default ColorSwitcher;
