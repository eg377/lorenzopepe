import {
	Terminal,
	Javascript,
	Jsx,
	Mdx,
	Html,
	Css,
	Typescript,
	Sass,
	Json,
} from "../../assets/Tech";

interface LanguageToIconProps {
	language: string;
}

export const LanguageToIcon: React.FC<LanguageToIconProps> = ({ language }) => {
	switch (language) {
		case "jsx":
			return <Jsx />;
		case "tsx":
			return <Jsx />;
		case "javascript":
			return <Javascript />;
		case "typescript":
			return <Typescript />;
		case "mdx":
			return <Mdx />;
		case "md":
			return <Mdx />;
		case "shell":
			return <Terminal />;
		case "html":
			return <Html />;
		case "css":
			return <Css />;
		case "scss":
			return <Sass />;
		case "json":
			return <Json />;
		default:
			return null;
	}
};
