import { useRef, useEffect } from "react";
import Link from "next/link";
import { Portfolio } from "../assets/Portfolio";
import { useDarkMode } from "../hooks/useDarkMode";

const MissingPage = () => {
	useDarkMode();
	const circleRef = useRef<SVGCircleElement | null>(null);
	const svgBbox = useRef<DOMRect | null>(null);

	useEffect(() => {
		const resize = () => {
			const bbox = document
				.getElementById("missing-svg")
				?.getBoundingClientRect();
			if (bbox) {
				svgBbox.current = bbox;
			}
		};
		// set init coords
		resize();

		window.addEventListener("resize", resize, { passive: true });

		return () => window.removeEventListener("resize", resize);
	}, []);

	return (
		<section
			className="section-missing"
			onMouseMove={(e) => {
				if (circleRef.current && svgBbox.current) {
					// translate coords inside svg bbox;
					const { x, y, r } = getCircle(
						e.pageX,
						e.pageY,
						svgBbox.current
					);

					circleRef.current.setAttribute(
						"transform",
						`translate(${x}, ${y})`
					);
					circleRef.current.setAttribute("r", r.toString());
				}
			}}
		>
			<svg id="missing-svg">
				<Paw />
				<circle ref={circleRef} className="pointer" />

				{/* <use
					xlinkHref="#paw"
					x={100}
					y={120}
					transform="rotate(162, 125, 145)"
				/>

				<use
					xlinkHref="#paw"
					x={155}
					y={165}
					transform="rotate(162, 180, 190)"
				/>

				<use
					xlinkHref="#paw"
					x={100}
					y={195}
					transform="rotate(162, 125, 220)"
				/> */}
			</svg>
			<h1>{"< 404 />"}</h1>
			<p>My dog has eaten this page, I swear.</p>

			<nav className="nav-missing" role="navigation">
				<ul>
					<li>
						<Link href="/">
							<a>
								<Portfolio />
								<span>Home</span>
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</section>
	);
};

export default MissingPage;

const Paw = () => (
	<symbol id="paw" viewBox="0 0 576.39 526.2" width={50} height={50}>
		<title>Paw</title>
		<desc>Find the culprit 🐕</desc>
		<ellipse
			cx="192.71"
			cy="94.62"
			rx="69.75"
			ry="93.8"
			transform="translate(-15.34 41.66) rotate(-11.87)"
		/>
		<ellipse
			cx="378.46"
			cy="96.1"
			rx="97.07"
			ry="71.32"
			transform="translate(205.45 446.15) rotate(-77.95)"
		/>
		<ellipse
			cx="67.89"
			cy="224.15"
			rx="64.22"
			ry="83.51"
			transform="translate(-86.29 47.85) rotate(-24.32)"
		/>
		<ellipse
			cx="505.36"
			cy="224.39"
			rx="85.33"
			ry="65.56"
			transform="translate(58.36 549.85) rotate(-60)"
		/>
		<path d="M283.47,204.07c-27.39-.16-49.68,13.85-62,26-1.64,1.61-5.42,6.41-13,16-16.21,20.52-24.9,32.9-34,45-11.48,15.27-20.09,25.42-35,43-32.59,38.43-45,48.62-53,73a104.06,104.06,0,0,0-5,24c-.7,8.75-2.19,31,11,54,3.62,6.28,15,25.39,38,35,18.27,7.61,34.68,5.43,53,3,15.35-2,31.36-6.52,51-12a192.4,192.4,0,0,1,30-6,134.91,134.91,0,0,1,14-1,124.37,124.37,0,0,1,24,2c18.34,3.21,31.07,7.22,50,12,20.4,5.14,30.6,7.71,38,8,8.45.32,26.43.79,46-9a87.51,87.51,0,0,0,26-20,85.1,85.1,0,0,0,16-26c6.08-16.34,4.91-30.34,4-40a120.66,120.66,0,0,0-14-45c-8.29-15.45-18.19-25.63-38-46-14-14.44-14.77-13.36-23-23-12-14-15.57-22.35-27-40-13.65-21.1-20.48-31.64-30-41C341.28,227,318.13,204.27,283.47,204.07Z" />
	</symbol>
);

// TODO: days => intl
// TODO: parallax ?
// TODO: ripped off piece of papers ?

const getCircle = (pageX: number, pageY: number, bbox: DOMRect) => {
	const x = pageX - bbox.left;
	const y = pageY - bbox.top;
	const bW = bbox.width / 12;
	const bH = bbox.height / 10;
	const boundaries = {
		top: 50 + bH,
		right: bbox.width - bW - 20,
		bottom: bbox.height - bH - 50,
		left: bW + 20,
	};

	let xR =
		x >= 0 && x <= boundaries.left ? (boundaries.left - x - bW) * -1 : bW;

	if (xR === bW) {
		xR =
			x >= boundaries.right && x <= bbox.width ? bbox.width - x - 20 : bW;
	}

	let yR =
		y >= 0 && y <= boundaries.top ? (boundaries.top - y - bH) * -1 : bH;
	if (yR === bH) {
		yR =
			y >= boundaries.bottom && y <= bbox.height
				? bbox.height - y - 50
				: bH;
	}

	const r = Math.min(xR, yR);
	return {
		x,
		y,
		r: r > 0 ? r : 0,
	};
};
