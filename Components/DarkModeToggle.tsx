import { useDarkMode } from "../hooks/useDarkMode";
import { Moon } from "../assets/Moon";
import { Sun } from "../assets/Sun";

export const DarkModeToggle = () => {
	const [darkMode, setDarkMode] = useDarkMode();

	return (
		<button
			onClick={() => setDarkMode(!darkMode)}
			role="switch"
			aria-checked={darkMode}
			aria-label={`dark mode is ${!darkMode && "not"} active`}
			className="darkmode-toggle"
		>
			{darkMode ? <Moon /> : <Sun />}
		</button>
	);
};
