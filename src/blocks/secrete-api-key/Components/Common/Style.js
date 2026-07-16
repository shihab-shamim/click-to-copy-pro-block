import {
	getBackgroundCSS,
	getBoxCSS,
	getMultiShadowCSS,
	getTypoCSS,
} from '../../../../../../bpl-tools/utils/getCSS';

/**
 * Runtime CSS generator for Secret API Key (Block #03 â€” Glass API Key).
 *
 * The base look lives in style.scss; this component injects the customizable
 * OVERRIDES from the per-element `styles` attribute, scoped to this block
 * instance's id. Every style value is seeded in block.json to the original
 * design values, so the generated CSS reproduces the base look and any
 * customization layers on top.
 *
 * Each element's style object may carry: `background` (Background â†’ getBackgroundCSS),
 * `color` (text/icon color string), `typo` (Typography â†’ getTypoCSS),
 * `padding` / `margin` / `radius` (BoxControl â†’ getBoxCSS), `shadow`
 * (ShadowControl â†’ getMultiShadowCSS), and `width` / `height`.
 *
 * The action `btn` element is extended with: `size` (square width+height),
 * `hoverBackground` / `hoverColor` (:hover), and `copiedBackground` /
 * `copiedColor` (the transient .is-copied state on the copy button).
 */

const SELECTORS = {
	stage: '.ctc_sak_glasskey-stage',
	glasskey: '.ctc_sak_glasskey',
	badge: '.ctc_sak_glasskey__badge',
	name: '.ctc_sak_glasskey__name',
	value: '.ctc_sak_glasskey__value',
	btn: '.ctc_sak_glasskey__btn',
};

// Elements whose "width" control should map to a different CSS property.
const WIDTH_PROP = { glasskey: 'max-width' };

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
			width ? `${WIDTH_PROP[key] || 'width'}: ${width};` : '',
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

	// Action buttons: square size + hover + copied-state overrides.
	const btn = styles?.btn;
	if (btn) {
		if (btn.size) {
			css += `${mainSl} .ctc_sak_glasskey__btn{ width: ${btn.size}; height: ${btn.size}; }`;
		}

		const hoverDecls = [
			btn.hoverBackground ? getBackgroundCSS(btn.hoverBackground) : '',
			btn.hoverColor ? `color: ${btn.hoverColor};` : '',
		].filter(Boolean).join(' ');
		if (hoverDecls) {
			css += `${mainSl} .ctc_sak_glasskey__btn:hover{ ${hoverDecls} }`;
		}
		if (btn.hoverColor) {
			css += `${mainSl} .ctc_sak_glasskey__btn:hover *{ color: ${btn.hoverColor}; }`;
		}

		// Copy button "copied" flash (background + text/icon color).
		const copiedDecls = [
			btn.copiedBackground ? getBackgroundCSS(btn.copiedBackground) : '',
			btn.copiedColor ? `color: ${btn.copiedColor};` : '',
		].filter(Boolean).join(' ');
		if (copiedDecls) {
			css += `${mainSl} .ctc_sak_glasskey__btn--copy.ctc_sak_is-copied{ ${copiedDecls} }`;
		}
		if (btn.copiedColor) {
			css += `${mainSl} .ctc_sak_glasskey__btn--copy.ctc_sak_is-copied *{ color: ${btn.copiedColor}; }`;
		}
	}

	// Block alignment â†’ how the card sits inside the stage (center = base).
	if (alignment) {
		css += `${mainSl} .ctc_sak_glasskey-stage{ justify-items: ${alignMap[alignment] || 'center'}; }`;
	}

	return <style dangerouslySetInnerHTML={{ __html: `${fontImports}\n${css}` }} />;
};
export default Style;
