/**
 * colorFormats — pure helpers for the AdvColorControl.
 *
 * The block stores a color as a plain CSS string in whatever format the user
 * picked (HEX / HEX-Alpha / RGB / RGBA / HSL / HSLA). These helpers parse any of
 * those into a canonical { r, g, b, a } object and format that object back into
 * a chosen format — WITHOUT ever auto-converting on their own. The component
 * only converts when the user changes the format selector.
 */

export const FORMAT_OPTIONS = [
	{ label: 'HEX', value: 'hex' },
	{ label: 'HEX Alpha', value: 'hexa' },
	{ label: 'RGB', value: 'rgb' },
	{ label: 'RGBA', value: 'rgba' },
	{ label: 'HSL', value: 'hsl' },
	{ label: 'HSLA', value: 'hsla' },
];

export const formatHasAlpha = (fmt) => fmt === 'hexa' || fmt === 'rgba' || fmt === 'hsla';

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const round = (n, p = 2) => {
	const f = Math.pow(10, p);
	return Math.round(n * f) / f;
};
const toHex2 = (n) => ('0' + clamp(Math.round(n), 0, 255).toString(16)).slice(-2);

export function rgbToHex(r, g, b) {
	return ('#' + toHex2(r) + toHex2(g) + toHex2(b)).toUpperCase();
}

export function rgbToHsl(r, g, b) {
	r /= 255; g /= 255; b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			default: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}

	return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToRgb(h, s, l) {
	h = (((h % 360) + 360) % 360) / 360;
	s = clamp(s, 0, 1);
	l = clamp(l, 0, 1);

	let r; let g; let b;
	if (s === 0) {
		r = g = b = l;
	} else {
		const hue2rgb = (p, q, t) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

/**
 * Parse any supported CSS color string → { r, g, b, a } (r/g/b 0-255, a 0-1).
 * Returns null for anything it can't recognise (used for validation).
 */
export function parseColor(input) {
	if (!input || typeof input !== 'string') return null;
	const str = input.trim();

	// HEX / HEX Alpha (#rgb, #rgba, #rrggbb, #rrggbbaa)
	let m = str.match(/^#([0-9a-fA-F]{3,8})$/);
	if (m) {
		let h = m[1];
		if (h.length === 5 || h.length === 7) return null; // invalid hex lengths
		if (h.length === 3) h = h.split('').map((c) => c + c).join('');
		if (h.length === 4) h = h.split('').map((c) => c + c).join('');
		const r = parseInt(h.slice(0, 2), 16);
		const g = parseInt(h.slice(2, 4), 16);
		const b = parseInt(h.slice(4, 6), 16);
		const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
		return { r, g, b, a: round(a, 3) };
	}

	// rgb() / rgba()
	m = str.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+%?)\s*)?\)$/i);
	if (m) {
		const r = clamp(parseFloat(m[1]), 0, 255);
		const g = clamp(parseFloat(m[2]), 0, 255);
		const b = clamp(parseFloat(m[3]), 0, 255);
		let a = 1;
		if (m[4] !== undefined) a = m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
		return { r: Math.round(r), g: Math.round(g), b: Math.round(b), a: clamp(round(a, 3), 0, 1) };
	}

	// hsl() / hsla()
	m = str.match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+%?)\s*)?\)$/i);
	if (m) {
		const h = parseFloat(m[1]);
		const s = parseFloat(m[2]) / 100;
		const l = parseFloat(m[3]) / 100;
		let a = 1;
		if (m[4] !== undefined) a = m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
		const rgb = hslToRgb(h, s, l);
		return { r: rgb.r, g: rgb.g, b: rgb.b, a: clamp(round(a, 3), 0, 1) };
	}

	return null;
}

/**
 * Detect the format of a stored color string (so the selector + display stay in
 * sync on reload). Falls back to 'hex'.
 */
export function detectFormat(input) {
	const str = (input || '').trim();
	if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(str)) return 'hex';
	if (/^#([0-9a-fA-F]{4}|[0-9a-fA-F]{8})$/.test(str)) return 'hexa';
	if (/^rgba\(/i.test(str)) return 'rgba';
	if (/^rgb\(/i.test(str)) return 'rgb';
	if (/^hsla\(/i.test(str)) return 'hsla';
	if (/^hsl\(/i.test(str)) return 'hsl';
	return 'hex';
}

/**
 * Format a canonical { r, g, b, a } object into the requested format. Alpha is
 * only included for the alpha-capable formats (so HEX/RGB/HSL never carry it).
 */
export function formatColor({ r, g, b, a = 1 }, format) {
	switch (format) {
		case 'hexa':
			return rgbToHex(r, g, b) + toHex2(a * 255).toUpperCase();
		case 'rgb':
			return `rgb(${r}, ${g}, ${b})`;
		case 'rgba':
			return `rgba(${r}, ${g}, ${b}, ${round(a, 2)})`;
		case 'hsl': {
			const { h, s, l } = rgbToHsl(r, g, b);
			return `hsl(${h}, ${s}%, ${l}%)`;
		}
		case 'hsla': {
			const { h, s, l } = rgbToHsl(r, g, b);
			return `hsla(${h}, ${s}%, ${l}%, ${round(a, 2)})`;
		}
		case 'hex':
		default:
			return rgbToHex(r, g, b);
	}
}

/** A CSS string the WP ColorPicker always understands, regardless of stored format. */
export function toPickerColor({ r, g, b, a = 1 }) {
	return `rgba(${r}, ${g}, ${b}, ${round(a, 3)})`;
}
