// exctracts file path from codeblocks if passed with special characters `@@ @@`
export const extractPathFromCode = (str: string): string | null => {
	const regex = /`@@(.*?)@@`/;
	const match = regex.exec(str);
	if (match) return match[1];
	return null;
};

type Section = "index" | "about" | "article" | "missing";

export const getContentPath = (contentPath: string): Section => {
	if (contentPath === "/") return "index";
	if (contentPath === "/about") return "about";

	if (contentPath.includes("/blog/")) {
		return "article";
	}

	return "missing";
};
