import { useState, useEffect } from "react";

export const useDarkMode = () => {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		if (darkMode) {
			document.body.setAttribute("data-theme", "dark");
		} else {
			document.body.setAttribute("data-theme", "light");
		}
	}, [darkMode]);

	return [darkMode, setDarkMode];
};
