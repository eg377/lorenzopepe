import { Fragment } from "react";
import Head from "next/head";
import { Socials } from "../Components/Socials";
import AboutMe from "../Components/about-me.mdx";
import { Emoji } from "../Components/Emoji";
import { LinkTo } from "../Components/LinkTo";

const About: React.FC = () => {
	return (
		<Fragment>
			<Head>
				<meta name="description" content="About Me" />
				<meta name="author" content="Lorenzo Pepe" />
				<meta
					name="keywords"
					content="Lorenzo Pepe, frontend developer, italy, freelance, react, Data Visualization, WebGL, creative"
				/>
				<title>About Me</title>
			</Head>
			<div className="about-title">
				<h2>
					Ciao! I'm Lorenzo{" "}
					<Emoji value="👋" description="Waving hand, hello" />
				</h2>
				<Socials />
			</div>
			<AboutMe />
			<footer>
				<p>Feel free to reach out! </p>
				<span>
					<LinkTo href="mailto:info@lorenzopepe.dev">
						info@lorenzopepe.dev
					</LinkTo>
				</span>
			</footer>
		</Fragment>
	);
};

export default About;
