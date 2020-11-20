import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/useDarkMode";

const pawCoords = [
	{ x: 68.5, y: 75.5, r: 150 },
	{ x: 126.5, y: 141.5, r: 140 },
	{ x: 205.5, y: 203.5, r: 100 },
	{ x: 291.5, y: 225.5, r: 100 },
	{ x: 388.5, y: 243.5, r: 80 },
	{ x: 488.5, y: 243.5, r: 120 },
	{ x: 576.5, y: 268.5, r: 130 },
	{ x: 641.5, y: 291.5, r: 130 },
	{ x: 720.5, y: 360.5, r: 170 },
	{ x: 746.5, y: 435.5, r: 190 },
	{ x: 735.5, y: 545.5, r: 190 },
	{ x: 716.5, y: 635.5, r: 180 },
	{ x: 718.5, y: 720.5, r: 200 },
	{ x: 700.5, y: 830.5, r: 220 },
	{ x: 601.5, y: 901.5, r: 250 },
	{ x: 476.5, y: 891.5, r: 270 },
	{ x: 373.5, y: 833.5, r: 300 },
	{ x: 245.5, y: 846.5, r: 260 },
	{ x: 153.5, y: 891.5, r: 290 },
	{ x: 71.5, y: 818.5, r: 330 },
	{ x: 65.5, y: 701.5, r: 10 },
	{ x: 136.5, y: 588.5, r: 90 },
	{ x: 273.5, y: 606.5, r: 90 },
];

const MissingPage: React.FC<Record<string, undefined>> = () => {
	const [darkMode] = useDarkMode();

	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const canvasBbox = useRef<DOMRect | null>(null);
	const disabled = useRef<boolean>(false);

	useEffect(() => {
		const resize = () => {
			if (canvasRef.current && hasMouse()) {
				canvasBbox.current = canvasRef.current.getBoundingClientRect();
				setCtx(canvasRef.current.getContext("2d"));
			} else {
				setCtx(null);
			}
		};
		// set init coords
		resize();

		window.addEventListener("resize", resize, { passive: true });

		return () => window.removeEventListener("resize", resize);
	}, []);

	useEffect(() => {
		const onMouseMove = (e: globalThis.MouseEvent) => {
			if (ctx && canvasBbox.current) {
				if (disabled.current) {
					ctx.clearRect(
						0,
						0,
						canvasBbox.current.width,
						canvasBbox.current.height
					);
					return;
				}

				canvasBlob(
					e.pageX,
					e.pageY,
					canvasBbox.current,
					ctx,
					darkMode
						? "rgba(109, 82, 243, 0.5)"
						: "rgba(164, 74, 63, 0.5)"
				);
			}
		};
		window.addEventListener("mousemove", onMouseMove, { passive: false });

		return () => window.removeEventListener("mousemove", onMouseMove);
	}, [ctx, darkMode]);

	return (
		<Fragment>
			<canvas ref={canvasRef} width={760} height={937} />
			{ctx && (
				<svg id="paw-svg" viewBox="0 0 829 927">
					<Paw />

					{pawCoords.map(({ x, y, r }, i) => (
						<use
							key={`paw-${i}`}
							xlinkHref="#paw"
							x={x}
							y={y}
							transform={`rotate(${r}, ${x + 35 / 2}, ${
								y + 35 / 2
							})`}
						/>
					))}
				</svg>
			)}

			<h1>{"< 404 />"}</h1>
			<p>My dog has eaten this page, I swear...</p>

			<nav role="navigation">
				<ul>
					<li
						onMouseEnter={() => (disabled.current = true)}
						onMouseLeave={() => (disabled.current = false)}
					>
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

const Paw = () => (
	<symbol id="paw" viewBox="0 0 576.39 526.2" width={35} height={35}>
		<title>Dog's Paw</title>
		<desc>
			Find the culprit{" "}
			<span role="img" aria-label="Dog Emoji">
				🐕
			</span>
		</desc>
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

const hasMouse = () => {
	return (
		window.innerWidth > 768 && window.matchMedia("(pointer:fine)").matches
	);
};

// TODO: add wobbly effect
const canvasBlob = (
	pageX: number,
	pageY: number,
	bbox: DOMRect,
	ctx: CanvasRenderingContext2D,
	fill: string
) => {
	ctx.clearRect(0, 0, bbox.width, bbox.height);

	const x = pageX - bbox.left;
	const y = pageY - bbox.top;
	const bW = bbox.width / 12;
	const bH = bbox.height / 10;
	const boundaries = {
		top: bH,
		right: bbox.width - bW,
		bottom: bbox.height - bH,
		left: bW,
	};

	// initial check for outisde of bounds
	if (x <= 0 || x >= bbox.width || y <= 20 || y >= bbox.height - 20) {
		ctx.clearRect(0, 0, bbox.width, bbox.height);
		return;
	}

	let xR = bW;
	let yR = bH;

	if (x <= boundaries.left) {
		xR = (boundaries.left - x - bW) * -1;
	} else if (x >= boundaries.right) {
		xR = bW - (boundaries.right - x) * -1;
	}

	if (y <= boundaries.top) {
		yR = bH - (boundaries.top - y) - Math.abs(bH - bW);
	} else if (y >= boundaries.bottom) {
		yR = bH - (y - boundaries.bottom) - Math.abs(bH - bW);
	}

	const r = Math.min(xR, yR);

	ctx.fillStyle = fill;
	ctx.beginPath();
	ctx.arc(x, y, r > 0 ? r : 0, 0, 2 * Math.PI, false);
	ctx.closePath();
	ctx.fill();
};
