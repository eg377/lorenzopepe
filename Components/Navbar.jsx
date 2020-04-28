import Link from "next/link";
import { DarkModeToggle } from "./DarkModeToggle";
import { HamburgerClosed, HamburgerOpen } from "../assets/Hamburger";
import { useState } from "react";
import { Portfolio } from "../assets/Portfolio";
import { Blog } from "../assets/Blog";
import { About } from "../assets/About";

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
								<Portfolio />
								<span>Portfolio</span>
							</a>
						</Link>
					</li>

					<li>
						<Link href="/blog">
							<a
								onClick={() => menuOpen && setMenuOpen(false)}
								className={isCurrent(section, "blog")}
							>
								<Blog />
								<span>Blog</span>
							</a>
						</Link>
					</li>

					<li>
						<Link href="/about">
							<a
								onClick={() => menuOpen && setMenuOpen(false)}
								className={isCurrent(section, "about")}
							>
								<About />
								<span>About Me</span>
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
