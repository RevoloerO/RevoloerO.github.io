import React from 'react';

const switchColorPalette = (palette) => {
    const root = document.documentElement;
    if (palette === 'default') { // Softer Matcha palette as default
        root.style.setProperty('--color-background', '#f0f0d8');
        root.style.setProperty('--color-primary', '#e4f8ba');
        root.style.setProperty('--color-secondary', '#c0d860');
        root.style.setProperty('--color-accent', '#607848');
        root.style.setProperty('--color-text', '#604848');
        root.style.setProperty('--color-border', '#789048');
    } else if (palette === 'blockchain-blue') {
        root.style.setProperty('--color-background', '#0A0F24');
        root.style.setProperty('--color-primary', '#1A2A48');
        root.style.setProperty('--color-secondary', '#2A3A68');
        root.style.setProperty('--color-accent', '#00FFAB');
        root.style.setProperty('--color-text', '#E0E0E0');
        root.style.setProperty('--color-border', '#A0A0A0');
    } else if (palette === 'divine-gold') {
        root.style.setProperty('--color-background', '#1C1C1C');
        root.style.setProperty('--color-primary', '#2E2E2E');
        root.style.setProperty('--color-secondary', '#5A4500');
        root.style.setProperty('--color-accent', '#FFC107');
        root.style.setProperty('--color-text', '#FFF8DC');
        root.style.setProperty('--color-border', '#B8860B');
    } else if (palette === 'vintage-green') {
        root.style.setProperty('--color-background', '#1B2B2B');
        root.style.setProperty('--color-primary', '#2F4F4F');
        root.style.setProperty('--color-secondary', '#556B2F');
        root.style.setProperty('--color-accent', '#8FBC8F');
        root.style.setProperty('--color-text', '#F5FFFA');
        root.style.setProperty('--color-border', '#2E8B57');
    } else if (palette === 'metal-red') { // Metal Red palette
        root.style.setProperty('--color-background', '#0d0c0b');
        root.style.setProperty('--color-primary', '#131618');
        root.style.setProperty('--color-secondary', '#4b0000');
        root.style.setProperty('--color-accent', '#FF073A');
        root.style.setProperty('--color-text', '#FBFCF6');
        root.style.setProperty('--color-border', '#67635B');
    } else if (palette === 'cream-coffee') { // Cream Coffee palette
        root.style.setProperty('--color-background', '#ece0d1');
        root.style.setProperty('--color-primary', '#dbc1ac');
        root.style.setProperty('--color-secondary', '#967259');
        root.style.setProperty('--color-accent', '#634832');
        root.style.setProperty('--color-text', '#38220f');
        root.style.setProperty('--color-border', '#967259');
    }
};

const ColorSwitcher = () => {
    return (
        <div className="color-switcher">
            <label htmlFor="color-palette">Theme: </label>
            <select onChange={(e) => switchColorPalette(e.target.value)}>
                <option value="default">Matcha</option> {/* Softer Matcha as default */}
                <option value="blockchain-blue">Blockchain Blue</option>
                <option value="divine-gold">Divine Gold</option>
                <option value="vintage-green">Vintage Green</option>
                <option value="metal-red">Metal Red</option> {/* Metal Red option */}
                <option value="cream-coffee">Cream Coffee</option> {/* Cream Coffee option */}

            </select>
        </div>
    );
};

export default ColorSwitcher;