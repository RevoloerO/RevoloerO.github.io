import React, { useEffect, useState, useRef } from 'react';

const themes = {
    'cyber-matcha': {
        name: 'Cyber Matcha',
        color: '#50FA7B',
        description: 'Vibrant green with organic patterns',
        preview: {
            dark: {
                bg: '#282A36',
                primary: '#50FA7B',
                secondary: '#BD93F9'
            },
            light: {
                bg: '#F5F5DC',
                primary: '#4A694E',
                secondary: '#8A2BE2'
            }
        }
    },
    'blockchain-blue': {
        name: 'Blockchain Blue',
        color: '#3080FF',
        description: 'Tech-inspired blue with grid patterns',
        preview: {
            dark: {
                bg: '#010409',
                primary: '#3080FF',
                secondary: '#A371F7'
            },
            light: {
                bg: '#F9FAFB',
                primary: '#007BFF',
                secondary: '#00F6FF'
            }
        }
    },
    'divine-gold': {
        name: 'Divine Gold',
        color: '#FFD700',
        description: 'Elegant gold with radial patterns',
        preview: {
            dark: {
                bg: '#1A1A1A',
                primary: '#FFD700',
                secondary: '#E6E6FA'
            },
            light: {
                bg: '#FFFAF0',
                primary: '#B8860B',
                secondary: '#483D8B'
            }
        }
    },
    'metal-red': {
        name: 'Metal Red',
        color: '#FF4646',
        description: 'Industrial red with geometric patterns',
        preview: {
            dark: {
                bg: '#1E1E1E',
                primary: '#FF4646',
                secondary: '#00A1D9'
            },
            light: {
                bg: '#FAFAFA',
                primary: '#B01717',
                secondary: '#007399'
            }
        }
    }
};

const switchColorPalette = (themeId, mode) => {
    document.documentElement.setAttribute('data-theme', `${themeId}-${mode}`);
};

const ColorSwitcher = () => {
    const [activeTheme, setActiveTheme] = useState('cyber-matcha');
    const [mode, setMode] = useState('dark');
    const [previewTheme, setPreviewTheme] = useState(null);
    const activeThemeRef = useRef('cyber-matcha');

    const handleThemeChange = (themeId) => {
        setActiveTheme(themeId);
        activeThemeRef.current = themeId;
        switchColorPalette(themeId, mode);
        setPreviewTheme(null);
    };

    const handleModeToggle = () => {
        const newMode = mode === 'dark' ? 'light' : 'dark';
        setMode(newMode);
        switchColorPalette(activeTheme, newMode);
    };

    // Auto-detect system color scheme preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const detectedMode = mediaQuery.matches ? 'dark' : 'light';
        setMode(detectedMode);
        switchColorPalette('cyber-matcha', detectedMode);

        const handler = (e) => {
            const newMode = e.matches ? 'dark' : 'light';
            setMode(newMode);
            switchColorPalette(activeThemeRef.current, newMode);
        };

        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    const handleKeyDown = (e, themeId) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleThemeChange(themeId);
        }
    };

    return (
        <div className="controls-container">
            <div className="color-switcher-wrapper">
                <span className="switcher-label" id="theme-label">THEME</span>
                <div className="color-switcher-container" role="group" aria-labelledby="theme-label">
                    {Object.entries(themes).map(([id, { name, color, description, preview }]) => (
                        <div key={id} className="theme-button-wrapper">
                            <button
                                className={`theme-button ${activeTheme === id ? 'active' : ''}`}
                                onClick={() => handleThemeChange(id)}
                                onMouseEnter={() => setPreviewTheme(id)}
                                onMouseLeave={() => setPreviewTheme(null)}
                                onFocus={() => setPreviewTheme(id)}
                                onBlur={() => setPreviewTheme(null)}
                                onKeyDown={(e) => handleKeyDown(e, id)}
                                aria-label={`Switch to ${name} theme`}
                                aria-pressed={activeTheme === id}
                            >
                                <span className="theme-dot" style={{ backgroundColor: color }} aria-hidden="true"></span>
                            </button>

                            {/* Theme Preview Tooltip */}
                            {previewTheme === id && (
                                <div className="theme-preview-tooltip" role="tooltip">
                                    <div className="theme-preview-header">
                                        <div
                                            className="theme-preview-sample"
                                            style={{
                                                background: `linear-gradient(135deg, ${preview[mode].bg} 0%, ${preview[mode].bg} 40%, ${preview[mode].primary} 100%)`,
                                                border: `2px solid ${preview[mode].primary}`,
                                                boxShadow: `0 0 15px ${preview[mode].primary}40`
                                            }}
                                        >
                                            <div className="theme-preview-accent" style={{ backgroundColor: preview[mode].primary }}></div>
                                            <div className="theme-preview-accent secondary" style={{ backgroundColor: preview[mode].secondary }}></div>
                                        </div>
                                        <div className="theme-preview-info">
                                            <div className="theme-preview-name">{name}</div>
                                            <div className="theme-preview-description">{description}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="mode-switch"
                onClick={handleModeToggle}
                aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
                aria-pressed={mode === 'dark'}
            >
                <div className="switch-track">
                    <div className="switch-thumb">
                        <svg className="switch-icon sun" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        <svg className="switch-icon moon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default ColorSwitcher;
