import { useState } from "react";

export const UnstyledRanges: React.FC = () => {
	const [hue, setHue] = useState<number>(0);
	const [alpha, setAlpha] = useState<number>(1);

	return (
		<div>
			<div>
				<input
					aria-label="Hue"
					type="range"
					min={0}
					max={360}
					value={hue}
					onChange={(e) => {
						setHue(Number(e.target.value));
					}}
				/>
				<div>Hue: {hue}°</div>
			</div>

			<div>
				<input
					aria-label="Alpha"
					type="range"
					min={0}
					max={1}
					step={0.01}
					value={alpha}
					onChange={(e) => {
						setAlpha(Number(e.target.value));
					}}
				/>
				<div>Alpha: {alpha}</div>
			</div>
		</div>
	);
};
