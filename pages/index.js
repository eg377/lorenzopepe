import { Fragment } from "react";
import Head from "next/head";
import { PortfolioProject } from "../Components/PortfolioProject";

const Portfolio = () => {
	return (
		<Fragment>
			<Head>
				<meta name="description" content="Lorenzo Pepe Portfolio" />
				<title>Portfolio</title>
			</Head>
			<PortfolioProject
				imgAlt="A screen of my portfolio about section"
				smSrc="images/lorenzopepe-sm_1x.webp 1x, images/lorenzopepe-sm_2x.webp 2x"
				mdSrc="images/lorenzopepe-md_1x.webp 1x, images/lorenzopepe-md_2x.webp 2x"
				fallback="images/lorenzopepe-sm_1x.png, images/lorenzopepe-sm_2x.png,"
				repo="https://github.com/lorenzored98/lorenzopepe"
				href=""
				tags={["react", "next.js", "sass"]}
				title="lorenzopepe.dev"
			>
				Next.js static website to showcase my projects and my blog
				posts.
			</PortfolioProject>
			{/* <PortfolioProject
				imgAlt="Discord Logo"
				smSrc="images/DISC_LOGO-sm_1x.webp 1x, images/DISC_LOGO-sm_2x.webp 2x"
				mdSrc="images/DISC_LOGO-md_1x.webp 1x, images/DISC_LOGO-md_2x.webp 2x"
				fallback="images/DISC_LOGO-sm_1x.png, images/DISC_LOGO-sm_2x.png,"
				repo="https://github.com/lorenzored98/DiscordBot"
				href=""
				tags={["node.js", "api"]}
				title="Discord Bot"
			>
				Using the Discord API to build a bot.
			</PortfolioProject>*/}

			<PortfolioProject
				imgAlt="A screen of a SaaS landing page"
				smSrc="images/data-saas-sm_2x.webp 1x, images/data-saas-sm_2x.webp 2x"
				mdSrc="images/data-saas-md_1x.webp 1x, images/data-saas-md_2x.webp 2x"
				fallback="images/data-saas-sm_1x.png, images/data-saas-sm_2x.png,"
				repo="https://github.com/lorenzored98/landing-page-saas/tree/master"
				href="https://lorenzored98.github.io/landing-page-saas/"
				tags={["HTML", "Css", "Svg"]}
				title="Saas Landing Page"
			>
				My take on a data management SaaS landing page.
			</PortfolioProject>
		</Fragment>
	);
};

export default Portfolio;
