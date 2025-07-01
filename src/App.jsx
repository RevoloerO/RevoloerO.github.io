import { useState, useRef, useEffect } from 'react';
import './App.css';
import { SiGmail, SiLinkedin, SiGithub } from "react-icons/si";
import ColorSwitcher from './ColorSwitcher';
import resumePDF from './assets/Resume-VuongQuyenMai-Jan2025-green.pdf';
import Skillset from './Skillset';

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
  const [currentGreeting, setCurrentGreeting] = useState(greetings[0]);
  const [displayGreeting, setDisplayGreeting] = useState('');

  useEffect(() => {
    const greetingInterval = setInterval(() => {
      setCurrentGreeting(g => {
        const currentIndex = greetings.indexOf(g);
        return greetings[(currentIndex + 1) % greetings.length];
      });
    }, 3000); // Change greeting every 3 seconds

    return () => clearInterval(greetingInterval);
  }, []);

  useEffect(() => {
    let charIndex = 0;
    setDisplayGreeting(''); // Clear previous greeting
    const typingInterval = setInterval(() => {
      if (charIndex < currentGreeting.length) {
        setDisplayGreeting(prev => prev + currentGreeting[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Typing speed

    return () => clearInterval(typingInterval);
  }, [currentGreeting]);


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
       <button onClick={onMuteToggle} className="control-button mute-button" title={isMuted ? "Unmute" : "Mute"}>
        {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        )}
      </button>
      <button onClick={onSkillsetToggle} className="skillset-button-header">
         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
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
  const containerRef = useRef(null);
  const toneSynths = useRef({});

  const toggleMute = () => {
      setIsMuted(prev => !prev);
  };

  // Effect for interactive background and sound
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Load Tone.js
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js";
    script.async = true;
    script.onload = () => {
        // Initialize all synths after Tone.js is loaded
        toneSynths.current = {
            sonar: new window.Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 } }).toDestination(),
            wind: new window.Tone.NoiseSynth({ noise: { type: 'pink' }, envelope: { attack: 0.2, decay: 0.3, sustain: 0 } }).toDestination(),
            sparkle: new window.Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.2 }, volume: -15 }).toDestination(),
            void: new window.Tone.MembraneSynth({ pitchDecay: 0.008, octaves: 2, oscillator: { type: 'sine' }, envelope: { attack: 0.001, decay: 0.5, sustain: 0.01, release: 0.4, attackCurve: 'exponential' } }).toDestination()
        };
    };
    document.body.appendChild(script);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      container.style.setProperty('--mouse-x', `${clientX}px`);
      container.style.setProperty('--mouse-y', `${clientY}px`);
    };

    const handleClick = (e) => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (!currentTheme || !toneSynths.current || isMuted) return;

        // Trigger sound and visual effects based on theme
        if (currentTheme.includes('metal-red')) {
            toneSynths.current.sonar?.triggerAttackRelease("C2", "8n");
            const sonar = document.createElement('div');
            sonar.className = 'sonar-ping';
            sonar.style.left = `${e.clientX}px`;
            sonar.style.top = `${e.clientY}px`;
            document.body.appendChild(sonar);
            sonar.addEventListener('animationend', () => sonar.remove());
        } else if (currentTheme.includes('cyber-matcha')) {
            toneSynths.current.wind?.triggerAttackRelease("2n");
            for (let i = 0; i < 5; i++) {
                const streak = document.createElement('div');
                streak.className = 'wind-streak';
                streak.style.left = `${e.clientX}px`;
                streak.style.top = `${e.clientY}px`;
                streak.style.setProperty('--random-angle', `${Math.random() * 360}deg`);
                streak.style.setProperty('--random-delay', `${Math.random() * 0.2}s`);
                document.body.appendChild(streak);
                streak.addEventListener('animationend', () => streak.remove());
            }
        } else if (currentTheme.includes('divine-gold')) {
            toneSynths.current.sparkle?.triggerAttackRelease("C6", "16n");
            for (let i = 0; i < 10; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = `${e.clientX}px`;
                sparkle.style.top = `${e.clientY}px`;
                sparkle.style.setProperty('--random-x', `${(Math.random() - 0.5) * 100}px`);
                sparkle.style.setProperty('--random-y', `${(Math.random() - 0.5) * 100}px`);
                sparkle.style.setProperty('--random-delay', `${Math.random() * 0.3}s`);
                sparkle.style.setProperty('--random-duration', `${0.5 + Math.random() * 0.5}s`);
                document.body.appendChild(sparkle);
                sparkle.addEventListener('animationend', () => sparkle.remove());
            }
        } else if (currentTheme.includes('blockchain-blue')) {
             toneSynths.current.void?.triggerAttackRelease("C1", "4n");
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      document.body.removeChild(script);
    };
  }, [isMuted]);

  const projects = [
    { title: "Waste Wise App", description: "A web app to reduce food waste by connecting donors and recipients, using geolocation, AI, and blockchain for transparency.", link: "https://revoloero.github.io/csu-ist621-waste-wise/", tech: ["React", "Google Maps API", "Ethers.js", "Chart.js", "AI"] },
    { title: "Genealogy App", description: "An interactive, multi-language family tree application for the Mai family, featuring a responsive design and smooth animations.", link: "https://revoloero.github.io/vqm-mai-genealogy/", tech: ["React", "React Router", "Vite", "CSS", "JSON"] },
    { title: "TradeWarX", description: "A web-based simulation of the U.S.–China trade war using game theory, with interactive matrices and economic modeling.", link: "https://revoloero.github.io/vqm-TradeWarX/", tech: ["Game Theory", "Economic Modeling", "JavaScript"] },
    { title: "VQM Mini Games", description: "A collection of interactive browser-based mini-games, experimenting with game logic, physics, and modern UI.", link: "https://revoloero.github.io/vqm-mini-games", tech: ["React", "Vite", "CSS Modules", "Lucide React"] },
    { title: "Country Info App", description: "Explore detailed information about countries worldwide with a clean and simple interface.", link: "https://revoloero.github.io/vqm-countries-info/", tech: ["React", "API", "CSS"] },
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
