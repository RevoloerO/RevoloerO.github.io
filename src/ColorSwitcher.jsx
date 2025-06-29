import React, { useEffect, useState } from 'react';

const themes = [
    { id: 'cyber-matcha', name: 'Cyber Matcha', color: '#50FA7B' },
    { id: 'blockchain-blue', name: 'Blockchain Blue', color: '#3080FF' },
    { id: 'divine-gold', name: 'Divine Gold', color: '#FFD700' },
    { id: 'metal-red', name: 'Metal Red', color: '#FF4646' }
];

const switchColorPalette = (palette) => {
    document.documentElement.setAttribute('data-theme', palette);
};

const ColorSwitcher = () => {
    const [activeTheme, setActiveTheme] = useState('cyber-matcha');

    const handleThemeChange = (themeId) => {
        setActiveTheme(themeId);
        switchColorPalette(themeId);
    };
    
    // Set default theme on initial load
    useEffect(() => {
        switchColorPalette('cyber-matcha');
    }, []);

    return (
        <div className="color-switcher-wrapper">
            <span className="switcher-label">THEME</span>
            <div className="color-switcher-container">
                {themes.map(theme => (
                    <button 
                        key={theme.id}
                        className={`theme-button ${activeTheme === theme.id ? 'active' : ''}`}
                        onClick={() => handleThemeChange(theme.id)}
                        title={theme.name}
                    >
                        <span className="theme-dot" style={{ backgroundColor: theme.color }}></span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ColorSwitcher;
