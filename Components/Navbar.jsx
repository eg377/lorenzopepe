import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DarkModeToggle } from "./DarkModeToggle";
import { HamburgerClosed, HamburgerOpen } from "../assets/Hamburger";
import { Portfolio } from "../assets/Portfolio";
import { Blog } from "../assets/Blog";
import { About } from "../assets/About";

export const Navbar = ({ section }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setMenuOpen(false);
	}, [router.pathname]);

	return (
		<div className={`nav-wrapper ${menuOpen ? "open" : "closed"}`}>
			<nav className="navbar" role="navigation">
				<ul>
					<li>
						<Link href="/">
							<a className={isCurrent(section, "portfolio")}>
								<Portfolio />
								<span>Portfolio</span>
							</a>
						</Link>
					</li>

					<li>
						<Link href="/blog">
							<a className={isCurrent(section, "blog")}>
								<Blog />
								<span>Blog</span>
							</a>
						</Link>
					</li>

					<li>
						<Link href="/about">
							<a className={isCurrent(section, "about")}>
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
