import * as React from "react";
import style from "./index.module.scss";

export const StyledHueRange: React.FC = () => {
	const [hue, setHue] = React.useState(360);
	const inputRef = React.useRef<HTMLInputElement | null>(null);

	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.style.setProperty(
				"--thumb-color",
				`hsl(${hue}, 100%, 50%)`
			);
		}
	}, [hue]);

	return (
		<div className={style.range_inputs_container}>
			<input
				aria-label="Hue"
				className={style.hue_range_input}
				type="range"
				min={0}
				max={360}
				ref={inputRef}
				value={hue}
				onChange={(e) => {
					setHue(Number(e.target.value));
				}}
			/>
			<div>Hue: {hue}°</div>
		</div>
	);
};

export const StyledAlphaRange: React.FC = () => {
	const [alpha, setAlpha] = React.useState(1);
	const inputRef = React.useRef<HTMLInputElement | null>(null);

	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.style.setProperty(
				"--thumb-color",
				`hsla(360, 100%, 50%, ${alpha})`
			);
		}
	}, [alpha]);

	const [r, g, b] = [255, 0, 0];

	return (
		<div className={style.range_inputs_container}>
			<div className={style.alpha_background_checkered}>
				<input
					aria-label="Hue"
					className={style.alpha_range_input}
					type="range"
					min={0}
					max={1}
					step={0.01}
					ref={inputRef}
					value={alpha}
					onChange={(e) => {
						setAlpha(Number(e.target.value));
					}}
					style={{
						background: `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgb(${r}, ${g}, ${b}, 1) 100%)`,
					}}
				/>
			</div>
			<div>Alpha: {alpha}</div>
		</div>
	);
};
