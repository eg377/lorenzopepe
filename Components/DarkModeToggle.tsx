import { useEffect } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

export const DarkModeToggle: React.FC = () => {
	const [darkMode, setDarkMode] = useDarkMode();

	// remove hidden if using js
	useEffect(() => {
		const btn = document.getElementById("darkmode-toggle");
		if (btn) {
			btn.removeAttribute("aria-hidden");
			btn.removeAttribute("tabindex");
			btn.classList.remove("no-js-hidden");
		}
	}, []);

	return (
		<button
			onClick={() => setDarkMode(!darkMode)}
			role="switch"
			aria-checked={darkMode}
			aria-label={`dark mode is ${darkMode ? "active" : "not active"}`}
			className="darkmode-toggle no-js-hidden"
			aria-hidden="true"
			id="darkmode-toggle"
			tabIndex={-100}
		>
			{darkMode ? <Moon /> : <Sun />}
		</button>
	);
};

const Sun: React.FC = () => {
	return (
		<svg viewBox="0 0 512 512" className="icon sun">
			<title>Icon light mode</title>
			<desc>Light mode is active </desc>
			<path d="M256,118a22,22,0,0,1-22-22V48a22,22,0,0,1,44,0V96A22,22,0,0,1,256,118Z" />
			<path d="M256,486a22,22,0,0,1-22-22V416a22,22,0,0,1,44,0v48A22,22,0,0,1,256,486Z" />
			<path d="M369.14,164.86a22,22,0,0,1-15.56-37.55l33.94-33.94a22,22,0,0,1,31.11,31.11l-33.94,33.94A21.93,21.93,0,0,1,369.14,164.86Z" />
			<path d="M108.92,425.08a22,22,0,0,1-15.55-37.56l33.94-33.94a22,22,0,1,1,31.11,31.11l-33.94,33.94A21.94,21.94,0,0,1,108.92,425.08Z" />
			<path d="M464,278H416a22,22,0,0,1,0-44h48a22,22,0,0,1,0,44Z" />
			<path d="M96,278H48a22,22,0,0,1,0-44H96a22,22,0,0,1,0,44Z" />
			<path d="M403.08,425.08a21.94,21.94,0,0,1-15.56-6.45l-33.94-33.94a22,22,0,0,1,31.11-31.11l33.94,33.94a22,22,0,0,1-15.55,37.56Z" />
			<path d="M142.86,164.86a21.89,21.89,0,0,1-15.55-6.44L93.37,124.48a22,22,0,0,1,31.11-31.11l33.94,33.94a22,22,0,0,1-15.56,37.55Z" />
			<path d="M256,358A102,102,0,1,1,358,256,102.12,102.12,0,0,1,256,358Z" />
		</svg>
	);
};

const Moon: React.FC = () => {
	return (
		<svg viewBox="0 0 512 512" className="icon moon">
			<title>Icon dark mode</title>
			<desc>Dark mode is active</desc>
			<path d="M264,480A232,232,0,0,1,32,248C32,154,86,69.72,169.61,33.33a16,16,0,0,1,21.06,21.06C181.07,76.43,176,104.66,176,136c0,110.28,89.72,200,200,200,31.34,0,59.57-5.07,81.61-14.67a16,16,0,0,1,21.06,21.06C442.28,426,358,480,264,480Z" />
		</svg>
	);
};
