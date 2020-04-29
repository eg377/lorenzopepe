import { Fragment } from "react";
import Head from "next/head";
import { WorkStatus } from "../Components/WorkStatus.jsx";
import { Socials } from "../Components/Socials.jsx";
import AboutMe from "../drafts/about-me.mdx";

const About = () => {
	return (
		<Fragment>
			<Head>
				<meta name="description" content="About Me" />
				<meta name="author" content="Lorenzo Pepe" />
				<meta
					name="keywords"
					content="Lorenzo Pepe, fullstack developer, italy, freelance"
				/>
				<title>About Me</title>
			</Head>
			<div className="about-title">
				<h2>Ciao! I'm Lorenzo 👋</h2>
				<Socials />
			</div>
			<AboutMe />
			<WorkStatus searching={true} />
		</Fragment>
	);
};

export default About;
