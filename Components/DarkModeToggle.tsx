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
		<img src="/images/sun3D.png" alt="Light Mode" width={64} height={64} />
	);
};

const Moon: React.FC = () => {
	return (
		<img src="/images/moon3D.png" alt="Dark Mode" width={64} height={64} />
	);
};
