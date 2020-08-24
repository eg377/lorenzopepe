import { Fragment } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/useDarkMode";

const MissingPage = () => {
	useDarkMode();

	return (
		<Fragment>
			<h1>{"< 404 />"}</h1>
			<p>My dog has eaten this page, I swear...</p>

			<nav role="navigation">
				<ul>
					<li>
						<Link href="/">
							<a>
								<span>Go Back</span>
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</Fragment>
	);
};

export default MissingPage;
