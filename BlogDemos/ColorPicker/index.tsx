import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
	TouchEvent,
} from "react";
import {
	hsvToHsl,
	hslToHsv,
	hsvToRgb,
	rgbToHsv,
	hsvToHex,
	hexToHsv,
} from "./utils";

type Tuple4<T> = [T, T, T, T];

interface ColorPickerProps {
	onChange?: (color: string) => void;
}

// might do conversions here and pass them down
export const ColorPicker: React.FC<ColorPickerProps> = ({ onChange }) => {
	const [hsva, setHsva] = useState<Tuple4<number>>([0, 100, 100, 100]);
	useEffect(() => {
		const color = hsvToHex(
			hsva[0] / 360,
			hsva[1] / 100,
			hsva[2] / 100,
			hsva[3]
		);
		onChange && onChange("#" + color);
	}, [hsva, onChange]);

	return (
		<div className="color-picker-wrapper">
			<div>
				<GradientCanvas hsva={hsva} setHsva={setHsva} />
				<HueStrip
					hue={hsva[0]}
					setHue={(h: number) =>
						setHsva([h, hsva[1], hsva[2], hsva[3]])
					}
				/>
				<AlphaStrip
					hsva={hsva}
					setAlpha={(alpha: number) =>
						setHsva([hsva[0], hsva[1], hsva[2], alpha])
					}
				/>
			</div>
			<ColorInfo hsva={hsva} setHsva={setHsva} />
		</div>
	);
};

interface GradientCanvasProps {
	hsva: Tuple4<number>;
	setHsva: Dispatch<SetStateAction<Tuple4<number>>>;
}

const GradientCanvas: React.FC<GradientCanvasProps> = ({ hsva, setHsva }) => {
	const [size, setSize] = useState<DOMRect | null>(null);
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const [h, s, v, a] = hsva;
	// defaults;
	const pickerSize = 20;
	const pointerX = size ? (s / 100) * size.width : 0;
	const pointerY = size ? size.height - (v / 100) * size.height : 0;

	const callbackRef = useCallback((node: HTMLCanvasElement) => {
		if (node !== null) {
			setSize(node.getBoundingClientRect());
			ctxRef.current = node.getContext("2d");

			// add touch listeners
			canvasRef.current = node;
		}
	}, []);

	useEffect(() => {
		if (size && ctxRef.current) {
			const [r, g, b] = hsvToRgb(h / 360, 1, 1);
			fillCanvas(
				ctxRef.current,
				`rgba(${r}, ${g}, ${b}, ${a / 100})`,
				size.width,
				size.height
			);
		}
	}, [size, h, a]);

	// non passive listener for ios that does not support pointer events
	useEffect(() => {
		const touchMove = (e: TouchEvent<HTMLCanvasElement>) => {
			e.preventDefault();
			if (!size) return;
			const [x, y] = getPointerPosition(
				size,
				e.touches[0].clientX,
				e.touches[0].clientY
			);

			setHsva([
				h,
				(x / size.width) * 100,
				100 - (y / size.height) * 100,
				a,
			]);
		};

		canvasRef.current?.addEventListener("touchmove", touchMove as any, {
			passive: false,
		});

		return () => {
			canvasRef.current?.removeEventListener(
				"touchmove",
				touchMove as any
			);
		};
	}, [h, a, size, setHsva]);

	return (
		<div className="gradient-canvas-container">
			<div className="checkered" />
			<canvas
				ref={callbackRef}
				onKeyDown={(e) => {
					if (e.currentTarget === document.activeElement) {
						const [h, s, v, a] = hsva;
						if (e.key === "ArrowUp") {
							setHsva([h, s, Math.min(v + 1, 100), a]);
						} else if (e.key === "ArrowDown") {
							setHsva([h, s, Math.max(v - 1, 0), a]);
						} else if (e.key === "ArrowLeft") {
							setHsva([h, Math.max(s - 1, 0), v, a]);
						} else if (e.key === "ArrowRight") {
							setHsva([h, Math.min(s + 1, 100), v, a]);
						}
					}
				}}
				onTouchStart={(e) => {
					const bbox = e.currentTarget.getBoundingClientRect();

					const [x, y] = getPointerPosition(
						bbox,
						e.touches[0].clientX,
						e.touches[0].clientY
					);

					setHsva([
						h,
						(x / bbox.width) * 100,
						100 - (y / bbox.height) * 100,
						a,
					]);

					setSize(bbox);
				}}
				onPointerDown={(e) => {
					const bbox = e.currentTarget.getBoundingClientRect();
					e.currentTarget.setPointerCapture(e.pointerId);

					const [x, y] = getPointerPosition(
						bbox,
						e.clientX,
						e.clientY
					);

					setHsva([
						h,
						(x / bbox.width) * 100,
						100 - (y / bbox.height) * 100,
						a,
					]);

					setSize(bbox);
				}}
				onPointerMove={(e) => {
					if (!size) return;
					if (e.buttons === 1) {
						const [x, y] = getPointerPosition(
							size,
							e.clientX,
							e.clientY
						);

						setHsva([
							h,
							(x / size.width) * 100,
							100 - (y / size.height) * 100,
							a,
						]);
					}
				}}
				width={size?.width}
				height={size?.height}
				style={{
					touchAction: "none",
				}}
				tabIndex={0}
				aria-valuetext={"#" + hsvToHex(h / 360, s / 100, v / 100, a)}
				aria-label="Color Picker"
			/>
			{/* PICKER */}
			<div
				className="canvas-picker"
				style={{
					width: `${pickerSize}px`,
					height: `${pickerSize}px`,
					transform: `translate(${pointerX - pickerSize / 2}px,${
						pointerY - pickerSize / 2
					}px)`,
					touchAction: "none",
					pointerEvents: "none",
				}}
			>
				<div></div>
			</div>
		</div>
	);
};

interface HueStripProps {
	hue: number;
	setHue: (h: number) => void;
}

const HueStrip: React.FC<HueStripProps> = ({ hue, setHue }) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.style.setProperty(
				"--thumb-color",
				`hsl(${hue}, 100%, 50%)`
			);
		}
	}, [hue]);

	return (
		<input
			aria-label="Hue"
			className="hue-strip"
			type="range"
			min={0}
			max={360}
			ref={inputRef}
			value={hue}
			onChange={(e) => {
				setHue(Number(e.target.value));
			}}
			style={{
				background:
					"linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%)",
			}}
		/>
	);
};

interface AlphaStripProps {
	hsva: Tuple4<number>;
	setAlpha: (opacity: number) => void;
}

const AlphaStrip: React.FC<AlphaStripProps> = ({ hsva, setAlpha }) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [r, g, b] = hsvToRgb(hsva[0] / 360, hsva[1] / 100, hsva[2] / 100);
	return (
		<div
			className="alpha-input-wrapper"
			style={{
				background:
					"linear-gradient(45deg, #acacac 25%, transparent 25%), linear-gradient(-45deg, #acacac 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #acacac 75%), linear-gradient(-45deg, transparent 75%, #acacac 75%)",
				backgroundSize: "10px 10px",
				backgroundPosition: " 0 0, 0 5px, 5px -5px, -5px 0px",
			}}
		>
			<input
				aria-label="Hue"
				className="hue-strip"
				type="range"
				min={0}
				max={100}
				ref={inputRef}
				value={hsva[3]}
				onChange={(e) => {
					setAlpha(Number(e.target.value));
				}}
				style={{
					background: `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgb(${r}, ${g}, ${b}, 1) 100%)`,
				}}
			/>
		</div>
	);
};

interface ColorInfoProps {
	hsva: Tuple4<number>;
	setHsva: Dispatch<SetStateAction<Tuple4<number>>>;
}
// info with colors, RGB, HSL, ecc..
const ColorInfo: React.FC<ColorInfoProps> = ({ hsva, setHsva }) => {
	// had trouble when using a string
	// using this to prevent react not rerendering component
	const [hexInput, setHexInput] = useState<{ value: string }>({ value: "" });
	const hexInputFocus = useRef<boolean>(false);

	const [h, s, v, a] = hsva;
	const [r, g, b] = hsvToRgb(h / 360, s / 100, v / 100);
	const hsl = hsvToHsl(h, s, v);
	const hex = hsvToHex(h / 360, s / 100, v / 100, a);

	return (
		<div className="color-info">
			<div
				className="color-preview"
				style={{
					backgroundColor: `rgba(${r},${g},${b}, ${a / 100})`,
				}}
			/>
			<div className="input-group">
				<fieldset>
					<legend>HSV</legend>
					<input
						aria-label="Hsv hue"
						type="number"
						min={0}
						max={360}
						value={Math.round(h)}
						onChange={(e) => {
							const val = Number(e.target.value) || 0;
							setHsva([val <= 360 ? val : 360, s, v, a]);
						}}
					/>
					<input
						aria-label="Hsv saturation"
						type="number"
						min={0}
						max={100}
						value={Math.round(s)}
						onChange={(e) => {
							const val = Number(e.target.value) || 0;
							setHsva([h, val <= 100 ? val : 100, v, a]);
						}}
					/>
					<input
						aria-label="Hsv value"
						type="number"
						min={0}
						max={100}
						value={Math.round(v)}
						onChange={(e) => {
							const val = Number(e.target.value) || 0;
							setHsva([h, s, val <= 100 ? val : 100, a]);
						}}
					/>
					<AlphaInput
						alpha={a}
						setAlpha={(a: number) => setHsva([h, s, v, a])}
					/>
				</fieldset>

				<fieldset>
					<legend>RGB</legend>
					<input
						aria-label="Rgb red"
						type="number"
						min={0}
						max={255}
						value={r}
						onChange={(e) => {
							let val = Number(e.target.value) || 0;
							if (val > 255) val = 255;
							const newHsv = rgbToHsv(val, g, b);
							setHsva([...newHsv, a]);
						}}
					/>
					<input
						aria-label="Rgb blue"
						type="number"
						min={0}
						max={255}
						value={g}
						onChange={(e) => {
							let val = Number(e.target.value) || 0;
							if (val > 255) val = 255;
							const newHsv = rgbToHsv(r, val, b);
							setHsva([...newHsv, a]);
						}}
					/>
					<input
						aria-label="Rgb green"
						type="number"
						min={0}
						max={255}
						value={b}
						onChange={(e) => {
							let val = Number(e.target.value) || 0;
							if (val > 255) val = 255;
							const newHsv = rgbToHsv(r, g, val);
							setHsva([...newHsv, a]);
						}}
					/>
					<AlphaInput
						alpha={a}
						setAlpha={(a: number) => setHsva([h, s, v, a])}
					/>
				</fieldset>

				<label htmlFor="hex-input">HEX</label>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-start",
						alignItems: "center",
						marginBottom: "1rem",
					}}
				>
					<span>#</span>
					<input
						id="hex-input"
						aria-label="Hex color"
						onFocus={() => (hexInputFocus.current = true)}
						onBlur={() => {
							// check that hex is valid
							if (
								!hexInput.value.trim() ||
								hexInput.value !== hex
							) {
								setHsva([h, s, v, a]);
							}

							hexInputFocus.current = false;
						}}
						type="string"
						value={hexInputFocus.current ? hexInput.value : hex}
						onChange={(e) => {
							setHexInput({ value: e.target.value });
							const newHsv = hexToHsv(e.target.value);
							if (newHsv) {
								setHsva([...newHsv, a]);
							}
						}}
					/>
				</div>

				<fieldset>
					<legend>HSL</legend>
					<input
						aria-label="Hsl hue"
						type="number"
						min={0}
						max={360}
						value={Math.round(h)}
						onChange={(e) => {
							const val = Number(e.target.value) || 0;
							setHsva([val <= 360 ? val : 360, s, v, a]);
						}}
					/>
					<input
						aria-label="Hsl saturation"
						type="number"
						min={0}
						max={100}
						value={Math.round(hsl[1])}
						onChange={(e) => {
							const val = Number(e.target.value) || 0;
							const newHsv = hslToHsv(
								h,
								val <= 100 ? val : 100,
								hsl[2]
							);

							setHsva([...newHsv, a]);
						}}
					/>
					<input
						aria-label="Hsl lightness"
						type="number"
						min={0}
						max={100}
						value={Math.round(hsl[2])}
						onChange={(e) => {
							const val = Number(e.target.value) || 0;
							const newHsv = hslToHsv(
								h,
								hsl[1],
								val <= 100 ? val : 100
							);
							setHsva([...newHsv, a]);
						}}
					/>
					<AlphaInput
						alpha={a}
						setAlpha={(a: number) => setHsva([h, s, v, a])}
					/>
				</fieldset>
			</div>
		</div>
	);
};

interface AlphaInputProps {
	alpha: number;
	setAlpha: (alpha: number) => void;
}

const AlphaInput: React.FC<AlphaInputProps> = ({ alpha, setAlpha }) => {
	return (
		<input
			aria-label="Alpha value"
			type="number"
			step={0.01}
			min={0}
			max={1}
			value={Math.round(alpha) / 100}
			onChange={(e) => {
				const val = Number(e.target.value) * 100 || 0;
				setAlpha(val <= 100 ? val : 100);
			}}
		/>
	);
};

const fillCanvas = (
	ctx: CanvasRenderingContext2D,
	color: string,
	width: number,
	height: number
): void => {
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, width, height);

	// create white horizontal and black vertical gradient
	const whiteGradient = ctx.createLinearGradient(0, 0, width, 0);
	whiteGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
	whiteGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
	ctx.fillStyle = whiteGradient;
	ctx.fillRect(0, 0, width, height);

	// black vertical
	const blackGradient = ctx.createLinearGradient(0, 0, 0, height);
	blackGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
	blackGradient.addColorStop(1, "rgba(0, 0, 0, 1)");
	ctx.fillStyle = blackGradient;
	ctx.fillRect(0, 0, width, height);
};

const getPointerPosition = (
	bbox: DOMRect,
	x: number,
	y: number
): [number, number] => {
	let pointerX = x - bbox.left;
	let pointerY = y - bbox.top;

	if (pointerX < 0) pointerX = 0;
	if (pointerY < 0) pointerY = 0;

	return [
		pointerX > bbox.width ? bbox.width : pointerX,
		pointerY > bbox.height ? bbox.height : pointerY,
	];
};
