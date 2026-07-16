import {
	getBackgroundCSS,
	getBoxCSS,
	getMultiShadowCSS,
	getTypoCSS,
} from '../../../../../../bpl-tools/utils/getCSS';

/**
 * Runtime CSS generator for Terminal Install #1.
 *
 * The base look lives in style.scss; this component only injects OVERRIDES from
 * the per-element `styles` attribute, scoped to this block instance's id. Every
 * style value defaults to empty, so with no customization nothing is emitted and
 * the block renders exactly like the base stylesheet (in both editor + front).
 *
 * Each element's style object may carry: `background` (Background component â†’
 * getBackgroundCSS), `color` (text color string), `typo` (Typography â†’ getTypoCSS),
 * `padding` / `margin` / `radius` (BoxControl â†’ getBoxCSS), `shadow`
 * (ShadowControl â†’ getMultiShadowCSS), and `width` / `height`.
 */

const SELECTORS = {
	stage: '.ctc_ti_terminal-stage',
	terminal: '.ctc_ti_terminal',
	bar: '.ctc_ti_terminal__bar',
	body: '.ctc_ti_terminal__body',
	title: '.ctc_ti_terminal__title',
	prompt: '.ctc_ti_terminal__prompt',
	command: '.ctc_ti_terminal__cmd',
	copy: '.ctc_ti_terminal__copy',
};

// Elements whose "width" control should map to a different CSS property.
const WIDTH_PROP = { terminal: 'max-width' };

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

	// Dots: size + individual colors.
	const dots = styles?.dots;
	if (dots) {
		if (dots.size) {
			css += `${mainSl} .ctc_ti_terminal__dot{ width: ${dots.size}; height: ${dots.size}; }`;
		}
		if (dots.colorR) {
			css += `${mainSl} .ctc_ti_terminal__dot--r{ background: ${dots.colorR}; }`;
		}
		if (dots.colorY) {
			css += `${mainSl} .ctc_ti_terminal__dot--y{ background: ${dots.colorY}; }`;
		}
		if (dots.colorG) {
			css += `${mainSl} .ctc_ti_terminal__dot--g{ background: ${dots.colorG}; }`;
		}
	}

	// Copy button icon size (applies to both the copy glyph and the success check).
	if (styles?.copy?.iconSize) {
		css += `${mainSl} .ctc_ti_terminal__copy-icon{ width: ${styles.copy.iconSize}; height: ${styles.copy.iconSize}; }`;
	}

	// Block alignment â†’ how the terminal sits inside the stage (center = base).
	if (alignment) {
		css += `${mainSl} .ctc_ti_terminal-stage{ justify-items: ${alignMap[alignment] || 'center'}; }`;
	}

	return <style dangerouslySetInnerHTML={{ __html: `${fontImports}\n${css}` }} />;
};
export default Style;
