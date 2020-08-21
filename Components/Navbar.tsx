import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DarkModeToggle } from "./DarkModeToggle";
import { HamburgerClosed, HamburgerOpen } from "../assets/Hamburger";
import { About } from "../assets/About";
import { Rocky } from "../assets/Rocky";

interface NavbarProps {
	section: string;
}

export const Navbar: React.FC<NavbarProps> = ({ section }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const router = useRouter();
	useEffect(() => {
		setMenuOpen(false);
	}, [router.pathname]);

	useEffect(() => {
		if (menuOpen) {
			document.body.classList.add("menu-open");
		} else {
			document.body.classList.remove("menu-open");
		}
	}, [menuOpen]);

	return (
		<header className={`nav-wrapper ${menuOpen ? "open" : "closed"}`}>
			<nav className="navbar" role="navigation">
				<ul>
					<li className="logo">
						<Link href="/">
							<a className={isCurrent(section, "index")}>
								<Rocky />
								<span>
									LORENZO
									<br />
									PEPE
								</span>
							</a>
						</Link>
					</li>

					<li className="nav-about">
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

			{menuOpen ? (
				<div className="menu-bg-svg-wrapper">
					<svg className="menu-bg-svg" viewBox="0 0 698.97 611.5">
						<path
							transform="scale(1.3) translate(-100, -60)"
							strokeMiterlimit="10"
							d="M30.7 301.86c-29.19 21.81-50 90.7 0 309.14h647.83c30.2-456.79 22.72-606.36 0-610.42C648.28-4.81 602.24 249.79 522.66 249c-54.85-.53-72.92-121.87-130.54-121.41-65.44.53-72.24 157.26-170.48 194.48-82.8 31.4-144.95-54.57-190.94-20.21z"
						/>
					</svg>
				</div>
			) : null}
		</header>
	);
};

const isCurrent = (section: string, target: string) => {
	if (section === target) {
		return "current";
	}

	if (section === "article" && target === "index") {
		return "current";
	}

	return undefined;
};
