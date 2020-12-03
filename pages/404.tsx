import { Fragment } from "react";
import { useDarkMode } from "../hooks/useDarkMode";
import Link from "next/link";
import { Emoji } from "../Components/Emoji";

const MissingPage: React.FC<Record<string, undefined>> = () => {
	useDarkMode();
	return (
		<Fragment>
			<h1>{"< 404 />"}</h1>
			<p>
				<Emoji value="🐕" description="dog" /> My dog has eaten this
				page, I swear...
			</p>

			<nav role="navigation">
				<ul>
					<li>
						<Link href="/">
							<a href="/">
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
