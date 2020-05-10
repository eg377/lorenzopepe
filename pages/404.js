import * as React from "react";
import Link from "next/link";
import { Portfolio } from "../assets/Portfolio";
import { Blog } from "../assets/Blog";
import { About } from "../assets/About";
import { useDarkMode } from "../hooks/useDarkMode";

const MissingPage = () => {
	useDarkMode();
	return (
		<React.Fragment>
			<h1>{"< 404 />"}</h1>
			<p>
				This page does not exist or I may have not written about it yet.
			</p>

			<nav className="nav-missing" role="navigation">
				<ul>
					<li>
						<Link href="/">
							<a>
								<Portfolio />
								<span>Portfolio</span>
							</a>
						</Link>
					</li>

					<li>
						<Link href="/blog">
							<a>
								<Blog />
								<span>Blog</span>
							</a>
						</Link>
					</li>

					<li>
						<Link href="/about">
							<a>
								<About />
								<span>About Me</span>
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</React.Fragment>
	);
};

export default MissingPage;
