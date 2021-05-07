import Link from "next/link";
import { Fragment } from "react";
import { useDarkMode } from "../hooks/useDarkMode";
import { Emoji } from "../Components/Emoji";

const MissingPage: React.FC<Record<string, undefined>> = () => {
	useDarkMode();
	return (
		<Fragment>
			<p>
				<Emoji value="🐕" description="dog" /> My dog ate this page, I
				swear...
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
