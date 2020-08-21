import { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import { useRouter } from "next/router";
import { Navbar } from "../Components/Navbar";
import { CodeBlock } from "../Components/Code/CodeBlock";
import { getSection } from "../utils/paths";

import "../styles/main.scss";

const components = {
	code: (props: any) => <CodeBlock {...props} />,
	// blockquote: (props) => console.log(props),
};

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	const section = getSection(router.pathname);

	// console.log(pageProps);
	return (
		<MDXProvider components={components}>
			{section !== "missing" && <Navbar section={section} />}
			<section className={`section-${section}`}>
				<Component {...pageProps} />
			</section>
		</MDXProvider>
	);
};

export default App;
