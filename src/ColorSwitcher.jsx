import React, { useRef, useState } from 'react';

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
    } else if (palette === 'random-chaos') {
        // Generate random hex color
        const randomHex = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
        root.style.setProperty('--color-background', randomHex());
        root.style.setProperty('--color-primary', randomHex());
        root.style.setProperty('--color-secondary', randomHex());
        root.style.setProperty('--color-accent', randomHex());
        root.style.setProperty('--color-text', randomHex());
        root.style.setProperty('--color-border', randomHex());
    } else if (palette === 'harmony-randomness') {
        // Harmony Randomness palette logic
        // 1. Generate random HSL for primary
        const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

        const P = rand(0, 359); // Hue
        const S = rand(40, 80); // Saturation %
        const L = rand(30, 70); // Lightness %

        // --color-primary
        const colorPrimary = `hsl(${P}, ${S}%, ${L}%)`;

        // --color-background: hsl(P, S * 0.2%, max(L * 1.2, 95%))
        const bgS = Math.round(S * 0.2);
        const bgL = Math.min(Math.round(L * 1.2), 95);
        const colorBackground = `hsl(${P}, ${bgS}%, ${bgL}%)`;

        // --color-secondary: hsl((P + 30) % 360, S%, clamp(L ± 5%, 10%, 90%))
        const secH = (P + 30) % 360;
        const secL = clamp(L + (Math.random() > 0.5 ? 5 : -5), 10, 90);
        const colorSecondary = `hsl(${secH}, ${S}%, ${secL}%)`;

        // --color-accent: hsl((P + 180) % 360, clamp(S + 20%, 100%), L)
        const accH = (P + 180) % 360;
        const accS = clamp(S + 20, 0, 100);
        const colorAccent = `hsl(${accH}, ${accS}%, ${L}%)`;

        // --color-text: If L > 60: dark, else light
        const colorText = L > 60 ? 'hsl(0, 0%, 10%)' : 'hsl(0, 0%, 95%)';

        // --color-border: hsl(P, S * 0.3%, L * 0.8)
        const borderS = Math.round(S * 0.3);
        const borderL = Math.round(L * 0.8);
        const colorBorder = `hsl(${P}, ${borderS}%, ${borderL}%)`;

        root.style.setProperty('--color-background', colorBackground);
        root.style.setProperty('--color-primary', colorPrimary);
        root.style.setProperty('--color-secondary', colorSecondary);
        root.style.setProperty('--color-accent', colorAccent);
        root.style.setProperty('--color-text', colorText);
        root.style.setProperty('--color-border', colorBorder);
    }
};

const ColorSwitcher = () => {
    const selectRef = useRef();
    const [showChaosBtn, setShowChaosBtn] = useState(false);
    const [showHarmonyBtn, setShowHarmonyBtn] = useState(false);

    const handleRandomChaos = () => {
        if (selectRef.current && selectRef.current.value === 'random-chaos') {
            switchColorPalette('random-chaos');
        }
    };

    const handleHarmonyRandomness = () => {
        if (selectRef.current && selectRef.current.value === 'harmony-randomness') {
            switchColorPalette('harmony-randomness');
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setShowChaosBtn(value === 'random-chaos');
        setShowHarmonyBtn(value === 'harmony-randomness');
        switchColorPalette(value);
    };

    return (
        <div className="color-switcher">
            <label htmlFor="color-palette">Theme: </label>
            <select ref={selectRef} onChange={handleChange}>
                <option value="default">Matcha</option> {/* Softer Matcha as default */}
                <option value="blockchain-blue">Blockchain Blue</option>
                <option value="divine-gold">Divine Gold</option>
                <option value="vintage-green">Vintage Green</option>
                <option value="metal-red">Metal Red</option> {/* Metal Red option */}
                <option value="cream-coffee">Cream Coffee</option> {/* Cream Coffee option */}
                <option value="random-chaos">Random Chaos</option>
                <option value="harmony-randomness">Harmony Randomness</option>
            </select>
            {showChaosBtn && (
                <button
                    type="button"
                    style={{
                        marginLeft: '4px',
                        padding: '2px 6px',
                        fontSize: '0.9em',
                        lineHeight: 1,
                        height: '22px',
                        verticalAlign: 'middle',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={handleRandomChaos}
                    title="Generate new random chaos colors"
                >
                    <span style={{ fontSize: '1em', display: 'inline-block', lineHeight: 1 }}>
                        &#x25A0;&#x25A1;
                    </span>
                </button>
            )}
            {showHarmonyBtn && (
                <button
                    type="button"
                    style={{
                        marginLeft: '4px',
                        padding: '2px 6px',
                        fontSize: '0.9em',
                        lineHeight: 1,
                        height: '22px',
                        verticalAlign: 'middle',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={handleHarmonyRandomness}
                    title="Generate new harmony randomness colors"
                >
                    <span style={{ fontSize: '1em', display: 'inline-block', lineHeight: 1 }}>
                        &#x25A3;&#x25A9;
                    </span>
                </button>
            )}
        </div>
    );
};

export default ColorSwitcher;