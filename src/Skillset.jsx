import React from "react";
import "./skillset.css";

// --- SVG Icon Components ---
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const ServerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>;
const DatabaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>;
const PuzzleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 7V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4v-1a2 2 0 0 1-2-2V7Z"></path><path d="M14 12v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5a2 2 0 0 1-2-2v-1"></path><path d="M20 16v.01"></path><path d="M12 19v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h2"></path></svg>;
const WrenchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>;


const skillsetData = [
	{ category: "Frontend Development", icon: <CodeIcon />, skills: ["React (Hooks, Context)", "HTML5 & CSS3", "Tailwind CSS", "Responsive UI", "Vite & Webpack"] },
    { category: "Backend Development", icon: <ServerIcon />, skills: ["Node.js", "Express.js", "RESTful APIs"] },
    { category: "Database Management", icon: <DatabaseIcon />, skills: ["MongoDB (Mongoose)", "SQL", "ER Modeling"] },
    { category: "Blockchain Development", icon: <PuzzleIcon />, skills: ["Solidity", "Hardhat & Remix", "Web3.js & Ethers.js", "dApp Integration", "Metamask"] },
    { category: "Tooling & DevOps", icon: <WrenchIcon />, skills: ["Git & GitHub", "GitHub Pages", "Postman", "Wordpress"] }
];

export default function Skillset({ isOpen, onClose }) {
	if (!isOpen) return null;

	return (
		<div className="skillset-overlay" onClick={onClose}>
			<div 
                className="skillset-panel"
                onClick={(e) => e.stopPropagation()}
            >
				<div className="skillset-panel-header">
					<h2 className="skillset-panel-title">Skillset</h2>
					<button onClick={onClose} className="skillset-panel-close">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
					</button>
				</div>
                <div className="skillset-panel-content">
                    {skillsetData.map((section) => (
                        <div key={section.category} className="skillset-section">
                            <h3 className="skillset-category-title">
                                <span className="skillset-category-icon">{section.icon}</span>
                                {section.category}
                            </h3>
                            <div className="skillset-tags">
                                {section.skills.map((skill) => (
                                    <span key={skill} className="skillset-tag">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
			</div>
		</div>
	);
}
