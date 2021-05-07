import { Color } from "./index";

/* 
	HSVa color will follow this schema
	hue: 0-360
	saturation: 0-100
	value: 0-100
	alpha: 0-100
*/

// For the sake of the blog post
export const validateStartColor = (c?: string): Color => {
	return { hue: 0, saturation: 100, value: 100, alpha: 1 };
};

// https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
export const hsvToRgb = (
	h: number,
	s: number,
	v: number
): { r: number; g: number; b: number } => {
	s /= 100;
	v /= 100;

	const chroma = v * s;
	const hPrime = h / 60;
	const x = chroma * (1 - Math.abs((hPrime % 2) - 1));
	const m = v - chroma;

	let r = m;
	let g = m;
	let b = m;

	switch (Math.floor(hPrime) % 6) {
		case 0:
			r += chroma;
			g += x;
			break;
		case 1:
			r += x;
			g += chroma;
			break;
		case 2:
			g += chroma;
			b += x;
			break;
		case 3:
			g += x;
			b += chroma;
			break;
		case 4:
			r += x;
			b += chroma;
			break;
		case 5:
			r += chroma;
			b += x;
			break;
		default:
			break;
	}

	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255),
	};
};

export const rgbToHsv = (
	r: number,
	g: number,
	b: number,
	a?: number
): { hue: number; saturation: number; value: number; alpha: number } => {
	if (!a && a !== 0) {
		a = 1;
	}
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const chroma = max - min;

	let hue = 0;
	const saturation = max === 0 ? 0 : (chroma / max) * 100;
	const value = (max / 255) * 100;

	if (max === min) {
		hue = 0;
	} else if (max === r) {
		hue = g - b + chroma * (g < b ? 6 : 0);
		hue /= 6 * chroma;
	} else if (max === g) {
		hue = b - r + chroma * 2;
		hue /= 6 * chroma;
	} else if (max === b) {
		hue = r - g + chroma * 4;
		hue /= 6 * chroma;
	}

	hue *= 360;

	return {
		hue,
		saturation,
		value,
		alpha: a,
	};
};

// https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL
export const hsvToHsl = (
	h: number,
	s: number,
	v: number
): { hue: number; saturation: number; lightness: number } => {
	s /= 100;
	v /= 100;

	let lightness = v * (1 - s / 2);

	if (lightness === 0 || lightness === 1) {
		return {
			hue: h,
			saturation: 0,
			lightness,
		};
	}

	const saturation =
		((v - lightness) / Math.min(lightness, 1 - lightness)) * 100;

	lightness *= 100;

	return {
		hue: h,
		saturation,
		lightness,
	};
};

// https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_HSV
export const hslToHsv = (
	h: number,
	s: number,
	l: number
): { hue: number; saturation: number; value: number } => {
	s /= 100;
	l /= 100;

	let value = l + s * Math.min(l, 1 - l);
	if (value === 0) {
		return {
			hue: h,
			value,
			saturation: 0,
		};
	}
	const saturation = 2 * (1 - l / value) * 100;

	value *= 100;

	return {
		hue: h,
		saturation,
		value,
	};
};

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const hsvToHex = (
	h: number,
	s: number,
	v: number,
	a: number
): string => {
	// transform hsv => rgb => hex
	const { r, g, b } = hsvToRgb(h, s, v);
	const hex = componentToHex(r) + componentToHex(g) + componentToHex(b);
	const alpha = Math.round(a * 255);
	if (alpha < 255) {
		return hex + componentToHex(alpha);
	}

	return hex;
};

const componentToHex = (c: number): string => {
	const hex = c.toString(16);
	return hex.length === 1 ? "0" + hex : hex;
};

export const hexToHsv = (
	hex: string
): { hue: number; saturation: number; value: number; alpha: number } | null => {
	// transform hex => rgb => hsv

	if (hex.length === 3) {
		// expand it
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}

	// decided to not expand the alpha value in case there are 4 letters but at 7
	if (hex.length === 7) {
		hex += "0";
	}

	const result = /([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})?$/i.exec(
		hex
	);

	if (!result) {
		return null;
	}

	return rgbToHsv(
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16),
		result[4] ? parseInt(result[4], 16) / 255 : undefined
	);
};

export const fillCanvas = (
	ctx: CanvasRenderingContext2D,
	rgbaColor: string,
	width: number,
	height: number
): void => {
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = rgbaColor;
	ctx.fillRect(0, 0, width, height);

	const whiteGradient = ctx.createLinearGradient(0, 0, width, 0);
	whiteGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
	whiteGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
	ctx.fillStyle = whiteGradient;
	ctx.fillRect(0, 0, width, height);

	const blackGradient = ctx.createLinearGradient(0, 0, 0, height);
	blackGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
	blackGradient.addColorStop(1, "rgba(0, 0, 0, 1)");
	ctx.fillStyle = blackGradient;
	ctx.fillRect(0, 0, width, height);
};

export const getPointerPosition = (
	bbox: DOMRect,
	x: number,
	y: number
): [number, number] => {
	let pointerX = x - bbox.left;
	let pointerY = y - bbox.top;

	if (pointerX < 0) {
		pointerX = 0;
	} else if (pointerX > bbox.width) {
		pointerX = bbox.width;
	}

	if (pointerY < 0) {
		pointerY = 0;
	} else if (pointerY > bbox.height) {
		pointerY = bbox.height;
	}

	return [pointerX, pointerY];
};

export const toColorInput = (value: number): number => {
	if (value !== 0) {
		return Math.round(Number(value.toString().replace(/^0+/, "")));
	}

	return 0;
};
