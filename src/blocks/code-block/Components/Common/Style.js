import {
	getBackgroundCSS,
	getBorderCSS,
	getBoxCSS,
	getMultiShadowCSS,
	getTypoCSS,
} from '../../../../../../bpl-tools/utils/getCSS';
import { themeColors } from '../../utils/themes';

/**
 * Runtime CSS generator for Code Block (Block #07).
 *
 * The base look lives in style.scss; this component injects the customizable
 * OVERRIDES from the per-element `styles` attribute, scoped to this block
 * instance's id. Every style value is seeded in block.json, so the generated CSS
 * reproduces the base look and any customization layers on top.
 *
 * Each element's style object may carry: `background` (Background â†’ getBackgroundCSS),
 * `color` (text color string), `typo` (Typography â†’ getTypoCSS),
 * `padding` / `margin` / `radius` (BoxControl â†’ getBoxCSS), `shadow`
 * (ShadowControl â†’ getMultiShadowCSS), and `width` / `height`.
 *
 * Two things are special-cased:
 *   - `copy` gains `hoverBackground` / `hoverColor` (:hover).
 *   - `code` sets the base code text color via the `--ctc_cb-code` CSS variable
 *     (NOT a direct `color` on <code>), so the per-token syntax-highlight colors
 *     â€” which live in style.scss as plain classes â€” are never overridden by the
 *     higher-specificity id-scoped rule.
 */

const SELECTORS = {
	stage: '.ctc_cb_codeblock-stage',
	codeblock: '.ctc_cb_codeblock',
	top: '.ctc_cb_codeblock__top',
	lang: '.ctc_cb_codeblock__lang',
	copy: '.ctc_cb_codeblock__copy',
	pre: '.ctc_cb_codeblock__pre',
	banner: '.ctc_cb_codeblock__banner',
};

// Elements whose "width" control should map to a different CSS property.
const WIDTH_PROP = { codeblock: 'max-width' };

const alignMap = { left: 'start', center: 'center', right: 'end' };

const Style = ({ attributes, id }) => {
	const { styles = {}, alignment, theme, showLineNumbers = true } = attributes;
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

	// Base code text color via CSS variable (keeps token colors intact).
	if (styles?.code?.color) {
		css += `${mainSl} .ctc_cb_codeblock{ --ctc_cb-code: ${styles.code.color}; }`;
	}

	// Copy button hover (background + text color).
	const copy = styles?.copy;
	if (copy) {
		const hoverDecls = [
			copy.hoverBackground ? getBackgroundCSS(copy.hoverBackground) : '',
			copy.hoverColor ? `color: ${copy.hoverColor};` : '',
		].filter(Boolean).join(' ');
		if (hoverDecls) {
			css += `${mainSl} .ctc_cb_codeblock__copy:hover{ ${hoverDecls} }`;
		}
	}

	// Code theme. Token colors are emitted for EVERY theme (incl. default) so the
	// code is syntax-highlighted out of the box. The surface colors (card + top-
	// bar background, base text via --ctc_cb-code, line numbers) are emitted ONLY
	// for non-default themes, so at "default" the per-element Style controls stay
	// in charge and the current design is unchanged. Switching themes only swaps
	// these colors â€” the code is not re-tokenized â€” so it is instantaneous.
	const palette = themeColors[theme] || themeColors.default;
	if (palette?.tokens) {
		Object.entries(palette.tokens).forEach(([tokType, color]) => {
			if (color) {
				css += `${mainSl} .ctc_cb_tok-${tokType}{ color: ${color}; }`;
			}
		});
	}
	if (theme && theme !== 'default' && palette) {
		css += `${mainSl} .ctc_cb_codeblock{ background: ${palette.cardBg}; --ctc_cb-code: ${palette.text}; }`;
		css += `${mainSl} .ctc_cb_codeblock__top{ background: ${palette.topBg}; }`;
		css += `${mainSl} .ctc_cb_codeblock__pre .ctc_cb_ln{ color: ${palette.ln}; }`;
	}

	// Borders â€” Code Card + Copy Button (all sides) and the header/code Divider
	// (bottom border of the top bar). Generated via getBorderCSS so they fully
	// replace the former static borders (width 0 â‡’ no border). Defaults match the
	// original static borders, so the look is unchanged until customized.
	const cardBorder = styles?.codeblock?.border && getBorderCSS({ ...styles.codeblock.border, side: 'all' }).trim();
	if (cardBorder) {
		css += `${mainSl} .ctc_cb_codeblock{ ${cardBorder} }`;
	}
	const copyBorder = styles?.copy?.border && getBorderCSS({ ...styles.copy.border, side: 'all' }).trim();
	if (copyBorder) {
		css += `${mainSl} .ctc_cb_codeblock__copy{ ${copyBorder} }`;
	}
	const divider = styles?.top?.divider && getBorderCSS({ ...styles.top.divider, side: 'bottom' }).trim();
	if (divider) {
		css += `${mainSl} .ctc_cb_codeblock__top{ ${divider} }`;
	}

	// Inline editor (editor only): the transparent <textarea> must sit exactly
	// over the highlighted code. It fills the pre's padding box (inset:0), so its
	// own padding has to mirror the pre's padding, plus the line-number gutter
	// (1.6em, matching .ctc_cb_ln) on the left when line numbers are shown. This
	// rule is harmless on the frontend (no textarea exists there).
	const prePad = styles?.pre?.padding || {};
	const pt = prePad.top || '0px';
	const pr = prePad.right || '0px';
	const pb = prePad.bottom || '0px';
	const pl = prePad.left || '0px';
	const leftPad = showLineNumbers === false ? pl : `calc(${pl} + 1.6em)`;
	css += `${mainSl} .ctc_cb_codeblock__editor{ padding: ${pt} ${pr} ${pb} ${leftPad}; }`;

	// Block alignment â†’ how the code card sits inside the stage (center = base).
	if (alignment) {
		css += `${mainSl} .ctc_cb_codeblock-stage{ justify-items: ${alignMap[alignment] || 'center'}; }`;
	}

	return <style dangerouslySetInnerHTML={{ __html: `${fontImports}\n${css}` }} />;
};
export default Style;
