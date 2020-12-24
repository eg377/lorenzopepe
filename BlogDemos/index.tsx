import dynamic from "next/dynamic";
import { Demo, DemoLoading } from "../Components/Blog/Demo";

// move these into colorpicker folder at index.js and keep other code in named files
const ColorPicker = dynamic(
	() => import("./ColorPicker").then((mod) => mod.ColorPicker as any),
	{
		ssr: false,
		loading: () => <DemoLoading />,
	}
);

export const ColorPickerDemo: React.FC = () => {
	return (
		<Demo height="407px" className="color-picker-demo">
			<ColorPicker />
		</Demo>
	);
};
