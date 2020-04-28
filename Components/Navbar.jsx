import Link from "next/link";
import { DarkModeToggle } from "./DarkModeToggle";
import { HamburgerClosed, HamburgerOpen } from "../assets/Hamburger";
import { useState } from "react";

export const Navbar = ({ section }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	return (
		<div className={`nav-wrapper ${menuOpen ? "open" : "closed"}`}>
			<nav className="navbar" role="navigation">
				<ul>
					<li>
						<Link href="/">
							<a
								onClick={() => menuOpen && setMenuOpen(false)}
								className={isCurrent(section, "portfolio")}
							>
								Portfolio
							</a>
						</Link>
					</li>

					<li>
						<Link href="/blog">
							<a
								onClick={() => menuOpen && setMenuOpen(false)}
								className={isCurrent(section, "blog")}
							>
								Blog
							</a>
						</Link>
					</li>

					<li>
						<Link href="/about">
							<a
								onClick={() => menuOpen && setMenuOpen(false)}
								className={isCurrent(section, "about")}
							>
								About Me
							</a>
						</Link>
					</li>
				</ul>
			</nav>
			<DarkModeToggle />
			<button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
				{menuOpen ? <HamburgerOpen /> : <HamburgerClosed />}
			</button>
		</div>
	);
};

const isCurrent = (section, target) => {
	if (section === target) {
		return "current";
	}

	if (section === "blog-article" && target === "blog") {
		return "current";
	}

	return undefined;
};
