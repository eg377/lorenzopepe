// exctracts file path from codeblocks if passed with special characters `@@ @@`
export const extractPathFromCode = (str) => {
	const regex = /`@@(.*?)@@`/;
	const match = regex.exec(str);
	if (match) return match[1];
	return null;
};

export const getSection = (sectionPath) => {
	if (sectionPath === "/") return "portfolio";
	if (sectionPath.includes("/blog/")) {
		return "blog-article";
	}
	if (sectionPath.includes("/blog")) return "blog";
	if (sectionPath.includes("/about")) return "about";
	return "missing";
};
