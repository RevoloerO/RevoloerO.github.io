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
        // Improved: more vibrant, modern blue palette
        root.style.setProperty('--color-background', '#101C3A');   // deep blue background
        root.style.setProperty('--color-primary', '#1E3A8A');      // strong blue primary
        root.style.setProperty('--color-secondary', '#60A5FA');    // light blue secondary
        root.style.setProperty('--color-accent', '#00FFD0');       // neon cyan accent
        root.style.setProperty('--color-text', '#F3F6FA');         // near-white text
        root.style.setProperty('--color-border', '#2563EB');       // vivid blue border
    } else if (palette === 'divine-gold') {
        // Refined: softer, easy-on-eyes yet divine gold palette with highlighted border
        root.style.setProperty('--color-background', '#F8F5EC');   // soft, warm ivory
        root.style.setProperty('--color-primary', '#F6E27A');      // gentle gold
        root.style.setProperty('--color-secondary', '#F9EBC7');    // light gold cream
        root.style.setProperty('--color-accent', '#E7C873');       // muted golden accent
        root.style.setProperty('--color-text', '#6B4F1D');         // deep gold-brown for contrast
        root.style.setProperty('--color-border', '#FFD700');       // vivid gold highlight border
    } else if (palette === 'vintage-green') {
        // Improved: softer, elegant vintage green palette
        root.style.setProperty('--color-background', '#F4F7F2');   // soft, light sage
        root.style.setProperty('--color-primary', '#7A9D54');      // muted olive green
        root.style.setProperty('--color-secondary', '#B5C99A');    // pale moss green
        root.style.setProperty('--color-accent', '#557153');       // deep vintage green
        root.style.setProperty('--color-text', '#2C3639');         // dark, easy-to-read
        root.style.setProperty('--color-border', '#A3BC8B');       // subtle green border
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
        // Improved Harmony Randomness palette logic for better harmony
        // 1. Generate random HSL for primary, but keep S and L in harmonious range
        const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

        // Pick a random hue, but keep saturation and lightness in visually pleasing ranges
        const P = rand(0, 359); // Hue
        const S = rand(55, 75); // Saturation: moderate for harmony
        const L = rand(45, 65); // Lightness: not too dark or light

        // --color-primary: main color
        const colorPrimary = `hsl(${P}, ${S}%, ${L}%)`;

        // --color-background: very light, low saturation version of primary
        const bgS = clamp(Math.round(S * 0.18), 8, 18);
        const bgL = clamp(Math.round(L * 1.35), 92, 98);
        const colorBackground = `hsl(${P}, ${bgS}%, ${bgL}%)`;

        // --color-secondary: analogous color, slightly lighter or darker
        const secH = (P + 32) % 360;
        const secS = clamp(S - 10, 40, 80);
        const secL = clamp(L + rand(-8, 8), 38, 75);
        const colorSecondary = `hsl(${secH}, ${secS}%, ${secL}%)`;

        // --color-accent: complementary color, more saturated and a bit lighter
        const accH = (P + 180) % 360;
        const accS = clamp(S + 18, 60, 95);
        const accL = clamp(L + rand(-5, 10), 50, 80);
        const colorAccent = `hsl(${accH}, ${accS}%, ${accL}%)`;

        // --color-text: dark if background is light, light if background is dark
        const colorText = bgL > 80 ? 'hsl(0, 0%, 12%)' : 'hsl(0, 0%, 98%)';

        // --color-border: muted version of primary
        const borderS = clamp(Math.round(S * 0.32), 10, 30);
        const borderL = clamp(Math.round(L * 0.82), 30, 70);
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