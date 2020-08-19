// exctracts file path from codeblocks if passed with special characters `@@ @@`
export const extractPathFromCode = (str: string) => {
	const regex = /`@@(.*?)@@`/;
	const match = regex.exec(str);
	if (match) return match[1];
	return null;
};

export const getSection = (sectionPath: string) => {
	if (sectionPath === "/") return "index";
	if (sectionPath === "/about") return "about";

	if (sectionPath.includes("/blog/")) {
		return "article";
	}

	return "missing";
};
