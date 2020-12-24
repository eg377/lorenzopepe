import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DarkModeToggle } from "./DarkModeToggle";
import { useTrapFocus } from "../hooks/useTrapFocus";

interface NavbarProps {
	contentPath: string;
}

export const Navbar: React.FC<NavbarProps> = ({ contentPath }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const router = useRouter();

	const headerRef = useRef<HTMLElement | null>(null);

	const focusableElements = useMemo(() => {
		if (menuOpen) {
			if (headerRef.current) {
				const focusableElements: HTMLElement[] = Array.from(
					headerRef.current.querySelectorAll("a,button")
				);

				const firstElem = focusableElements.pop();
				firstElem && focusableElements.unshift(firstElem);

				return focusableElements;
			}
		}

		return [];
	}, [menuOpen]);

	useEffect(() => {
		setMenuOpen(false);
	}, [router.pathname]);

	useEffect(() => {
		const resizeFn = () => {
			if (window.innerWidth >= 500) {
				setMenuOpen(false);
			}
		};

		window.addEventListener("resize", resizeFn, { passive: true });

		return () => window.removeEventListener("resize", resizeFn);
	}, []);

	useEffect(() => {
		if (menuOpen) {
			document.body.classList.add("menu-open");
		} else {
			document.body.classList.remove("menu-open");
		}
	}, [menuOpen]);

	useTrapFocus(menuOpen, focusableElements);

	return (
		<header
			className={`nav-wrapper ${menuOpen ? "open" : "closed"}`}
			ref={headerRef}
		>
			<nav className="navbar" role="navigation">
				<ul>
					<li className="logo">
						<Link href="/">
							<a
								className={isCurrent(contentPath, "index")}
								href="/"
							>
								LORENZO PEPE
							</a>
						</Link>
					</li>

					<li className="nav-about">
						<Link href="/about">
							<a
								className={isCurrent(contentPath, "about")}
								href="/about"
							>
								<svg viewBox="0 0 512 512">
									<title>About Me Icon</title>
									<desc>Navigate to about me</desc>
									<path d="M63.28,202a15.29,15.29,0,0,1-7.7-2,14.84,14.84,0,0,1-5.52-20.46C69.34,147.36,128,72.25,256,72.25c55.47,0,104.12,14.57,144.53,43.29,33.26,23.57,51.9,50.25,60.78,63.1a14.79,14.79,0,0,1-4,20.79,15.52,15.52,0,0,1-21.24-4C420,172.32,371,102,256,102c-112.25,0-163,64.71-179.53,92.46A15,15,0,0,1,63.28,202Z" />
									<path d="M320.49,496a15.31,15.31,0,0,1-3.79-.43c-92.85-23-127.52-115.82-128.93-119.68l-.22-.85c-.76-2.68-19.39-66.33,9.21-103.61,13.11-17,33.05-25.72,59.38-25.72,24.48,0,42.14,7.61,54.28,23.36,10,12.86,14,28.72,17.87,44,8.13,31.82,14,48.53,47.79,50.25,14.84.75,24.59-7.93,30.12-15.32,14.95-20.15,17.55-53,6.28-82C398,228.57,346.61,158,256,158c-38.68,0-74.22,12.43-102.72,35.79C129.69,213.14,111,240.46,102,268.54c-16.69,52.28,5.2,134.46,5.41,135.21A14.83,14.83,0,0,1,96.54,422a15.39,15.39,0,0,1-18.74-10.6c-1-3.75-24.38-91.4-5.1-151.82,21-65.47,85.81-131.47,183.33-131.47,45.07,0,87.65,15.32,123.19,44.25,27.52,22.5,50,52.72,61.76,82.93,14.95,38.57,10.94,81.86-10.19,110.14-14.08,18.86-34.13,28.72-56.34,27.65-57.86-2.9-68.26-43.29-75.84-72.75-7.8-30.22-12.79-44.79-42.58-44.79-16.36,0-27.85,4.5-35,13.82-9.75,12.75-10.51,32.68-9.43,47.14a152.44,152.44,0,0,0,5.1,29.79c2.38,6,33.37,82,107.59,100.39a14.88,14.88,0,0,1,11,18.11A15.36,15.36,0,0,1,320.49,496Z" />
									<path d="M201.31,489.14a15.5,15.5,0,0,1-11.16-4.71c-37.16-39-58.18-82.61-66.09-137.14V347c-4.44-36.1,2.06-87.21,33.91-122.35,23.51-25.93,56.56-39.11,98.06-39.11,49.08,0,87.65,22.82,111.7,65.89,17.45,31.29,20.91,62.47,21,63.75a15.07,15.07,0,0,1-13.65,16.4,15.26,15.26,0,0,1-16.79-13.29h0A154,154,0,0,0,340.43,265c-18.64-32.89-47-49.61-84.51-49.61-32.4,0-57.75,9.75-75.19,29-25.14,27.75-30,70.5-26.55,98.78,6.93,48.22,25.46,86.58,58.18,120.86a14.7,14.7,0,0,1-.76,21.11A15.44,15.44,0,0,1,201.31,489.14Z" />
									<path d="M372.5,446.18c-32.5,0-60.13-9-82.24-26.89-44.42-35.79-49.4-94.08-49.62-96.54a15.27,15.27,0,0,1,30.45-2.36c.11.86,4.55,48.54,38.79,76,20.26,16.18,47.34,22.6,80.71,18.85a15.2,15.2,0,0,1,16.91,13.18,14.92,14.92,0,0,1-13.44,16.5A187,187,0,0,1,372.5,446.18Z" />
									<path d="M398.18,48.79C385.5,40.54,340.54,16,256,16c-88.74,0-133.81,27.11-143.78,34a11.59,11.59,0,0,0-1.84,1.4.36.36,0,0,1-.22.1,14.87,14.87,0,0,0-5.09,11.15A15.06,15.06,0,0,0,120.38,77.5a15.56,15.56,0,0,0,8.88-2.79c.43-.32,39.22-28.82,126.77-28.82S382.58,74.29,383,74.5a15.25,15.25,0,0,0,9.21,3A15.06,15.06,0,0,0,407.5,62.61,14.9,14.9,0,0,0,398.18,48.79Z" />
								</svg>
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
					<svg
						className="menu-bg-svg"
						viewBox="0 0 698.97 611.5"
						preserveAspectRatio="none"
					>
						<path
							transform="scale(1.2, 1) translate(-50)"
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
	return undefined;
};

const HamburgerClosed: React.FC = () => (
	<svg viewBox="0 0 24 24">
		<title>Menu Closed Icon</title>
		<desc>Click to open menu</desc>
		<path d="M0 0h24v24H0V0z" fill="none" />
		<path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
	</svg>
);

const HamburgerOpen: React.FC = () => (
	<svg viewBox="0 0 24 24">
		<title>Menu Open Icon</title>
		<desc>Click to close menu</desc>
		<path d="M0,0h24v24H0V0z" fill="none" />
		<path d="M4,18h11c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v0C3,17.55,3.45,18,4,18z M4,13h8c0.55,0,1-0.45,1-1v0 c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v0C3,12.55,3.45,13,4,13z M3,7L3,7c0,0.55,0.45,1,1,1h11c0.55,0,1-0.45,1-1v0 c0-0.55-0.45-1-1-1H4C3.45,6,3,6.45,3,7z M20.3,14.88L17.42,12l2.88-2.88c0.39-0.39,0.39-1.02,0-1.41l0,0 c-0.39-0.39-1.02-0.39-1.41,0l-3.59,3.59c-0.39,0.39-0.39,1.02,0,1.41l3.59,3.59c0.39,0.39,1.02,0.39,1.41,0l0,0 C20.68,15.91,20.69,15.27,20.3,14.88z" />
		<path d="M0,0h24v24H0V0z" fill="none" />
	</svg>
);
