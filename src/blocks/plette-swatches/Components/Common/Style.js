import {
	getBackgroundCSS,
	getBoxCSS,
	getMultiShadowCSS,
	getTypoCSS,
} from '../../../../../../bpl-tools/utils/getCSS';

/**
 * Runtime CSS generator for Palette Swatches (Block #04 â€” Color Palette).
 *
 * The base look lives in style.scss; this component injects the customizable
 * OVERRIDES from the per-element `styles` attribute, scoped to this block
 * instance's id. Every style value is seeded in block.json, so the generated CSS
 * reproduces the base look and any customization layers on top.
 *
 * Per-swatch colors are NOT generated here â€” each chip carries its color as an
 * inline `--c` custom property (set in OneCard), and style.scss consumes it via
 * `background: var(--c)`. This block-level generator handles the shared styling:
 * stage, the palette grid (columns / gap / max-width), the swatch chrome
 * (radius / optional shadow) and the hex label.
 */

const SELECTORS = {
	stage: '.ctc_ps_palette-stage',
	swatch: '.ctc_ps_swatch',
	hex: '.ctc_ps_swatch__hex',
};

const alignMap = { left: 'start', center: 'center', right: 'end' };

const Style = ({ attributes, id }) => {
	const { styles = {}, alignment } = attributes;
	const mainSl = `#${id}`;

	let fontImports = '';
	let css = '';

	const box = (prop, value) => {
		const out = value && getBoxCSS(value);
		return out ? `${prop}: ${out};` : '';
	};

	Object.entries(SELECTORS).forEach(([key, sl]) => {
		const s = styles?.[key];
		if (!s) {
			return;
		}

		const selector = `${mainSl} ${sl}`;
		const { background, color, typo, padding, margin, radius, shadow, width, height } = s;

		const decls = [
			background ? getBackgroundCSS(background) : '',
			color ? `color: ${color};` : '',
			box('padding', padding),
			box('margin', margin),
			box('border-radius', radius),
			shadow?.length ? `box-shadow: ${getMultiShadowCSS(shadow)};` : '',
			width ? `width: ${width};` : '',
			height ? `height: ${height};` : '',
		].filter(Boolean).join(' ');

		if (decls) {
			css += `${selector}{ ${decls} }`;
		}

		// Typography â€” same getTypoCSS pattern for every typography field.
		if (typo) {
			fontImports += getTypoCSS('', typo)?.googleFontLink || '';
			css += getTypoCSS(selector, typo)?.styles || '';
		}
	});

	// Palette grid: column count + gap + max-width.
	const palette = styles?.palette;
	if (palette) {
		const gridDecls = [
			palette.columns ? `grid-template-columns: repeat(${palette.columns}, 1fr);` : '',
			palette.gap ? `gap: ${palette.gap};` : '',
			palette.width ? `max-width: ${palette.width};` : '',
		].filter(Boolean).join(' ');
		if (gridDecls) {
			css += `${mainSl} .ctc_ps_palette{ ${gridDecls} }`;
		}
	}

	// Overlay (normal state): background on the swatch ::before layer.
	const overlay = styles?.overlay;
	if (overlay?.background) {
		css += `${mainSl} .ctc_ps_swatch::before{ ${getBackgroundCSS(overlay.background)} }`;
	}

	// Copied state: overlay ::after background + swatch box-shadow. These apply
	// only while `.ctc_ps_is-copied` is present, so the swatch returns to its
	// normal overlay/shadow automatically when the copied state ends.
	const copied = styles?.copied;
	if (copied) {
		if (copied.background) {
			css += `${mainSl} .ctc_ps_swatch.ctc_ps_is-copied::after{ ${getBackgroundCSS(copied.background)} }`;
		}
		if (copied.shadow?.length) {
			css += `${mainSl} .ctc_ps_swatch.ctc_ps_is-copied{ box-shadow: ${getMultiShadowCSS(copied.shadow)}; }`;
		}
	}

	// Block alignment â†’ how the palette grid sits inside the stage (center = base).
	if (alignment) {
		css += `${mainSl} .ctc_ps_palette-stage{ justify-items: ${alignMap[alignment] || 'center'}; }`;
	}

	return <style dangerouslySetInnerHTML={{ __html: `${fontImports}\n${css}` }} />;
};
export default Style;
