type Tuple3<T> = [T, T, T];

// https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
export const hsvToRgb = (h: number, s: number, v: number): Tuple3<number> => {
	h *= 360;
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

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export const rgbToHsv = (r: number, g: number, b: number): Tuple3<number> => {
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const chroma = max - min;

	let h = 0;
	const s = max === 0 ? 0 : chroma / max;
	const v = max / 255;

	if (max === min) {
		h = 0;
	} else if (max === r) {
		h = g - b + chroma * (g < b ? 6 : 0);
		h /= 6 * chroma;
	} else if (max === g) {
		h = b - r + chroma * 2;
		h /= 6 * chroma;
	} else if (max === b) {
		h = r - g + chroma * 4;
		h /= 6 * chroma;
	}

	return [h * 360 || 0, s * 100, v * 100];
};

// https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL
export const hsvToHsl = (h: number, s: number, v: number): Tuple3<number> => {
	s /= 100;
	v /= 100;
	const l = v * (1 - s / 2);

	if (l === 0 || l === 1) {
		return [h, 0, l];
	}

	const saturation = (v - l) / Math.min(l, 1 - l);
	return [h, saturation * 100, l * 100];
};

// https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_HSV
export const hslToHsv = (h: number, s: number, l: number): Tuple3<number> => {
	s /= 100;
	l /= 100;

	const v = l + s * Math.min(l, 1 - l);
	if (v === 0) {
		return [h, 0, 0];
	}
	const saturation = 2 * (1 - l / v);
	return [h, saturation * 100, v * 100];
};

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const hsvToHex = (
	h: number,
	s: number,
	v: number,
	a: number
): string => {
	// transform hsv => rgb => hex
	const rgb = hsvToRgb(h, s, v);
	const hex =
		componentToHex(rgb[0]) +
		componentToHex(rgb[1]) +
		componentToHex(rgb[2]);
	const alpha = Math.round((a / 100) * 255);
	if (alpha < 255) {
		return hex + componentToHex(alpha);
	}

	return hex;
};

const componentToHex = (c: number): string => {
	const hex = c.toString(16);
	return hex.length === 1 ? "0" + hex : hex;
};

export const hexToHsv = (hex: string): Tuple3<number> | null => {
	// transform hex => rgb => hsv

	if (hex.length === 3) {
		// expand it
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}

	const result = /([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/i.exec(hex);

	if (!result) {
		return null;
	}

	return rgbToHsv(
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16)
	);
};
