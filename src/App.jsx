import { useState, useRef, useEffect } from 'react';
import './App.css';
import { SiGmail, SiLinkedin, SiGithub } from "react-icons/si";
import ColorSwitcher from './ColorSwitcher';
import resumePDF from './assets/Resume-VuongQuyenMai-Jan2025-green.pdf';
import Skillset from './Skillset';
import ClickEffect from './ClickEffect';

// --- Re-usable Project Card Component ---
const ProjectCard = ({ project }) => (
  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card">
    <div className="project-card-content">
      <h3 className="project-card-title">{project.title}</h3>
      <p className="project-card-description">{project.description}</p>
      <div className="project-card-tags">
        {project.tech.map(t => (
          <span key={t} className="project-card-tag">{t}</span>
        ))}
      </div>
    </div>
  </a>
);

// --- Animated Welcome Message ---
const WelcomeMessage = () => {
  const greetings = ["Hello!", "Xin Chào!", "Bonjour!", "こんにちは!", "Hola!", "안영하세요!", "Salve!", "Namaste!", "Olá!", "你好!"];
  const [displayGreeting, setDisplayGreeting] = useState('');
  const typingIntervalRef = useRef(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    let greetingInterval;

    const startTyping = (text) => {
      let charIndex = 0;
      setDisplayGreeting('');

      // Clear any existing typing interval
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }

      typingIntervalRef.current = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayGreeting(prev => prev + text[charIndex]);
          charIndex++;
        } else {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
      }, 100);
    };

    // Start typing the first greeting
    startTyping(greetings[0]);

    // Set interval to change greetings
    greetingInterval = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % greetings.length;
      startTyping(greetings[currentIndexRef.current]);
    }, 3000);

    return () => {
      clearInterval(greetingInterval);
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="welcome-message-container">
      <span className="welcome-message">{displayGreeting}</span>
      <span className="welcome-cursor">_</span>
    </div>
  );
};

// --- Header Component ---
const Header = ({ onSkillsetToggle, isMuted, onMuteToggle }) => (
  <header className="portfolio-header">
    <div className="header-logo">
      <span>VQM</span>
    </div>
    <div className="header-controls">
      <ColorSwitcher />
      <button
        onClick={onMuteToggle}
        className="control-button mute-button"
        aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
        aria-pressed={isMuted}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        )}
      </button>
      <button
        onClick={onSkillsetToggle}
        className="skillset-button-header"
        aria-label="Open skillset panel"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
        <span>Skillset</span>
      </button>
    </div>
  </header>
);

// --- Digital Coin Footer ---
const DigitalCoinFooter = () => {
    const [isFlipping, setIsFlipping] = useState(false);

    const handleFlip = () => {
        if (isFlipping) return;
        setIsFlipping(true);
        setTimeout(() => setIsFlipping(false), 600);
    };

    return (
        <footer className="portfolio-footer">
            <div className="coin-container" onClick={handleFlip}>
                <div className={`digital-coin ${isFlipping ? 'flipping' : ''}`}>
                    <div className="coin-face coin-front">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                    </div>
                    <div className="coin-face coin-back">
                        <span>VQM</span>
                    </div>
                </div>
            </div>
            <p>Coded by Vuong Quyen Mai © {new Date().getFullYear()}</p>
        </footer>
    );
};


// --- Main App Component ---
const App = () => {
  const [isSkillsetOpen, setSkillsetOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [clickEffects, setClickEffects] = useState([]);
  const containerRef = useRef(null);
  const toneSynths = useRef({});

  const toggleMute = () => {
      setIsMuted(prev => !prev);
  };

  // Effect for loading Tone.js with error handling
  useEffect(() => {
    let script = null;

    const loadTone = async () => {
      try {
        if (window.Tone) {
          initializeSynths();
          return;
        }

        script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js";
        script.async = true;

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });

        initializeSynths();
      } catch (error) {
        console.warn('Tone.js failed to load:', error);
      }
    };

    const initializeSynths = () => {
      toneSynths.current = {
        // Metal Red: Deep metallic ping (sonar-like)
        metalPing: new window.Tone.MetalSynth({
          frequency: 200,
          envelope: {
            attack: 0.001,
            decay: 0.4,
            release: 0.8
          },
          harmonicity: 3.1,
          modulationIndex: 16,
          resonance: 4000,
          octaves: 1.5,
          volume: -18
        }).toDestination(),

        // Cyber Matcha: Soft organic swoosh
        matcha: new window.Tone.NoiseSynth({
          noise: { type: 'pink' },
          envelope: {
            attack: 0.05,
            decay: 0.2,
            sustain: 0
          },
          volume: -22
        }).toDestination(),

        // Divine Gold: Bright bell-like chime
        divine: new window.Tone.Synth({
          oscillator: { type: 'sine' },
          envelope: {
            attack: 0.005,
            decay: 0.3,
            sustain: 0.2,
            release: 0.8
          },
          volume: -20
        }).toDestination(),

        // Blockchain Blue: Deep digital pulse
        blockchain: new window.Tone.MembraneSynth({
          pitchDecay: 0.05,
          octaves: 4,
          oscillator: { type: 'sine' },
          envelope: {
            attack: 0.001,
            decay: 0.4,
            sustain: 0.01,
            release: 0.6,
            attackCurve: 'exponential'
          },
          volume: -16
        }).toDestination()
      };
    };

    loadTone();

    return () => {
      if (script?.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Dispose of synths
      Object.values(toneSynths.current).forEach(synth => synth?.dispose());
    };
  }, []);

  // Effect for interactive background and click handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      container.style.setProperty('--mouse-x', `${clientX}px`);
      container.style.setProperty('--mouse-y', `${clientY}px`);
    };

    const handleClick = (e) => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (!currentTheme) return;

      const id = Date.now();

      // Trigger sound effects based on theme (only if not muted)
      if (!isMuted) {
        if (currentTheme.includes('metal-red')) {
          // Deep metallic ping
          toneSynths.current.metalPing?.triggerAttackRelease("16n");
        } else if (currentTheme.includes('cyber-matcha')) {
          // Soft organic swoosh
          toneSynths.current.matcha?.triggerAttackRelease("8n");
        } else if (currentTheme.includes('divine-gold')) {
          // Bright bell-like chime (high C)
          toneSynths.current.divine?.triggerAttackRelease("C5", "8n");
        } else if (currentTheme.includes('blockchain-blue')) {
          // Deep digital pulse (low C)
          toneSynths.current.blockchain?.triggerAttackRelease("C2", "8n");
        }
      }

      // Add visual effect using React state (always show, regardless of mute)
      setClickEffects(prev => [...prev, {
        id,
        x: e.clientX,
        y: e.clientY,
        type: currentTheme
      }]);

      // Remove effect after animation duration
      setTimeout(() => {
        setClickEffects(prev => prev.filter(effect => effect.id !== id));
      }, 700);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [isMuted]);

  const projects = [
    { title: "Waste Wise App", description: "A web app to reduce food waste by connecting donors and recipients, using geolocation, AI, and blockchain for transparency.", link: "https://revoloero.github.io/csu-ist621-waste-wise/", tech: ["React", "Google Maps API", "Ethers.js", "Chart.js", "AI"] },
    { title: "Genealogy App", description: "An interactive, multi-language family tree application for the Mai family, featuring a responsive design and smooth animations.", link: "https://revoloero.github.io/vqm-mai-genealogy/", tech: ["React", "React Router", "Vite", "CSS", "JSON"] },
    { title: "TradeWarX", description: "A web-based simulation of the U.S.–China trade war using game theory, with interactive matrices and economic modeling.", link: "https://revoloero.github.io/vqm-TradeWarX/", tech: ["Game Theory", "Economic Modeling", "JavaScript"] },
    { title: "VQM Mini Games", description: "A collection of interactive browser-based mini-games, experimenting with game logic, physics, and modern UI.", link: "https://revoloero.github.io/vqm-mini-games", tech: ["React", "Vite", "CSS Modules", "Lucide React"] },
    { title: "Country Info App", description: "Explore detailed information about countries worldwide with a clean and simple interface.", link: "https://revoloero.github.io/vqm-countries-info/", tech: ["React", "API", "CSS"] },
    {
      title: "LUMA: A JavaScript Learning Platform",
      description: "LUMA is an interactive web platform for learning JavaScript. It features a structured curriculum from foundational to advanced topics, using unique visual aids like mind maps to simplify complex concepts.",
      link: "https://revoloero.github.io/vqm-luma-javascript/",
      tech: ["React", "React Router", "Custom CSS", "Font Awesome"]
    },
    { title: "Resume - 2025", description: "My latest resume, detailing my skills, experience, and professional journey in the tech industry.", link: resumePDF, tech: ["PDF", "Professional Experience"] }
  ];
  
  const oldPortfolios = [
      { name: "Portfolio v2", url: "https://revoloero.github.io/vqm-porfolio-v2" },
      { name: "Portfolio v3", url: "https://revoloero.github.io/vqm-porfolio-v3" },
      { name: "Portfolio v4", url: "https://revoloero.github.io/vqm-porfolio-v4" },
      { name: "Portfolio v5", url: "https://revoloero.github.io/vqm-porfolio-v5" }
  ];

  return (
    <div className="portfolio-container" ref={containerRef}>
      <div className="background-overlay"></div>

      {/* Render click effects */}
      {clickEffects.map(effect => (
        <ClickEffect key={effect.id} {...effect} />
      ))}

      <Header
        onSkillsetToggle={() => setSkillsetOpen(true)}
        isMuted={isMuted}
        onMuteToggle={toggleMute}
      />
      
      <main className="portfolio-main">
        <section className="hero-section">
          <WelcomeMessage />
          <h1 className="hero-name">Vuong Quyen Mai</h1>
          <p className="hero-title">Blockchain & Full-stack Web Developer</p>
        </section>

        <section className="about-contact-grid">
            <div className="info-card about-card">
                <h2 className="section-title">About Me</h2>
                <p>With a strong background in MERN full-stack development, I build dynamic web applications. I am now transitioning into blockchain development, focusing on Ethereum, Solidity, and Web3.js to bridge traditional web solutions with decentralized technologies, creating secure and transparent dApps that drive innovation.</p>
            </div>
            <div className="info-card contact-card">
                <h2 className="section-title">Contact</h2>
                <a href="mailto:vuongquyenmai@gmail.com" className="contact-link">
                    <SiGmail /> <span>vuongquyenmai@gmail.com</span>
                </a>
                <a href="https://www.linkedin.com/in/vuong-quyen-mai/" target="_blank" rel="noopener noreferrer" className="contact-link">
                    <SiLinkedin /> <span>/in/vuong-quyen-mai</span>
                </a>
                <a href="https://github.com/RevoloerO" target="_blank" rel="noopener noreferrer" className="contact-link">
                    <SiGithub /> <span>/RevoloerO</span>
                </a>
            </div>
        </section>

        <section className="projects-section">
          <h2 className="section-title-center">Projects</h2>
          <div className="projects-grid">
            {projects.map(p => <ProjectCard key={p.title} project={p} />)}
          </div>
        </section>
        
        <section className="archive-section">
          <h2 className="section-title-center">Portfolio Archive</h2>
          <div className="archive-grid">
            {oldPortfolios.map(p => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="archive-link">
                    {p.name}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            ))}
          </div>
        </section>
      </main>

      <DigitalCoinFooter />
      <Skillset isOpen={isSkillsetOpen} onClose={() => setSkillsetOpen(false)} />
    </div>
  );
};

export default App;
