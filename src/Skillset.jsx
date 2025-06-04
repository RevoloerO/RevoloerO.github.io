import React, { useState } from "react";
import "./skillset.css"; // Import the CSS file

const skillsetData = [
	{
		category: "💻 Web Development",
		skills: [
			{
				title: "Frontend",
				items: [
					"React (Hooks, Context API)",
					"HTML5 / CSS3 / SCSS / TailwindCSS",
					"Responsive Design & UI Layout Systems",
					"Vite / Webpack bundling",
				],
			},
			{
				title: "Backend",
				items: ["Node.js", "Express.js", "RESTful API design"],
			},
			{
				title: "Database",
				items: ["MongoDB (Mongoose)", "SQL / ER Modeling"],
			},
			{
				title: "Tooling & DevOps",
				items: [
					"Git / GitHub",
					"Wordpress/ GitHub Pages",
					"Postman (API testing)",
				],
			},
		],
	},
	{
		category: "🔗 Blockchain Development",
		skills: [
			{
				title: "Smart Contracts",
				items: ["Solidity (Beginner–Intermediate)", "Remix IDE / Hardhat"],
			},
			{
				title: "dApp Integration",
				items: [
					"Web3.js",
					"Ethereum wallet integration (MetaMask)",
				],
			},
			{
				title: "Security Focus",
				items: ["Reentrancy prevention"],
			},
		],
	},
];

export default function Skillset() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				className={`skillset-toggle-btn${open ? " open" : ""}`}
				onClick={() => setOpen((v) => !v)}
				aria-label="Show skillset"
				onMouseOver={e => {
					e.currentTarget.classList.add("hovered");
				}}
				onMouseOut={e => {
					e.currentTarget.classList.remove("hovered");
				}}
				onMouseDown={e => {
					e.currentTarget.classList.add("pressed");
				}}
				onMouseUp={e => {
					e.currentTarget.classList.remove("pressed");
				}}
				style={{
					right: open ? (window.innerWidth > 900 ? "calc(50vw + 24px)" : "24px") : "24px",
					width: "auto", // Let width fit content
					minWidth: "72px", // Keep a minimum width for icon-only state
					padding: "0 18px",
				}}
			>
				{open ? (
					<>
						<svg width="26" height="26" viewBox="0 0 20 20" fill="none">
							<line x1="5" y1="5" x2="15" y2="15" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
							<line x1="15" y1="5" x2="5" y2="15" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
						</svg>
						<span className="skillset-btn-label">Close</span>
					</>
				) : (
					<>
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none">
							<rect x="3" y="7" width="18" height="10" rx="3" fill="#fff" fillOpacity="0.18" stroke="#fff" strokeWidth="1.5"/>
							<rect x="7" y="3" width="10" height="4" rx="2" fill="#fff" fillOpacity="0.18" stroke="#fff" strokeWidth="1.5"/>
							<rect x="8.5" y="11" width="7" height="2" rx="1" fill="#fff" stroke="#fff" strokeWidth="1"/>
						</svg>
						<span className="skillset-btn-label">Skillset</span>
					</>
				)}
			</button>
			<aside
				className={`skillset-panel${open ? " open" : ""}`}
				style={{
					display: open ? "block" : "none"
				}}
			>
				<div className="skillset-panel-inner">
					<div className="skillset-panel-header">
						<h2 className="skillset-panel-title">Skillset</h2>
						<button
							onClick={() => setOpen(false)}
							aria-label="Close skillset"
							className="skillset-panel-close"
						>
							×
						</button>
					</div>
					{skillsetData.map((section) => (
						<div key={section.category} className="skillset-section">
							<div className="skillset-section-category">
								{section.category}
							</div>
							{section.skills.map((group) => (
								<div key={group.title} className="skillset-group">
									<div className="skillset-group-title">
										{group.title}
									</div>
									<ul className="skillset-group-list">
										{group.items.map((item) => (
											<li key={item} className="skillset-group-item">
												{item}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					))}
				</div>
			</aside>
		</>
	);
}
