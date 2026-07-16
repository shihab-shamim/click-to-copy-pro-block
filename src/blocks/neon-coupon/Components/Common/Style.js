import {
	getBackgroundCSS,
	getBoxCSS,
	getMultiShadowCSS,
	getTypoCSS,
} from '../../../../../../bpl-tools/utils/getCSS';

/**
 * Runtime CSS generator for Neon Coupon (Block #02).
 *
 * The base look lives in style.scss; this component only injects OVERRIDES from
 * the per-element `styles` attribute, scoped to this block instance's id. Every
 * style value is seeded in block.json to the original design values, so the
 * generated CSS reproduces the base look and any customization layers on top.
 *
 * Each element's style object may carry: `background` (Background component â†’
 * getBackgroundCSS), `color` (text color string), `typo` (Typography â†’ getTypoCSS),
 * `padding` / `margin` / `radius` (BoxControl â†’ getBoxCSS), `shadow`
 * (ShadowControl â†’ getMultiShadowCSS), and `width` / `height`.
 *
 * Two elements are special-cased (like `dots` in Terminal Install):
 *   - `amount` â†’ gradient CLIPPED to the text (background-clip:text), so its
 *     background is emitted with the clip/transparent combo, not as a fill.
 *   - `perf`   â†’ its `color` builds the dashed repeating-gradient divider.
 */

const SELECTORS = {
	stage: '.ctc_nc_coupon-stage',
	coupon: '.ctc_nc_coupon',
	left: '.ctc_nc_coupon__left',
	label: '.ctc_nc_coupon__label',
	amount: '.ctc_nc_coupon__amount',
	terms: '.ctc_nc_coupon__terms',
	right: '.ctc_nc_coupon__right',
	hint: '.ctc_nc_coupon__hint',
	code: '.ctc_nc_coupon__code',
};

// Elements whose "width" control should map to a different CSS property.
const WIDTH_PROP = { coupon: 'max-width' };

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
			// `amount` background is handled separately (clipped to text).
			background && key !== 'amount' ? getBackgroundCSS(background) : '',
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

	// Amount: gradient (or solid) clipped to the text glyphs.
	const amountBg = styles?.amount?.background;
	if (amountBg) {
		css += `${mainSl} .ctc_nc_coupon__amount{ ${getBackgroundCSS(amountBg)} -webkit-background-clip: text; background-clip: text; color: transparent; }`;
	}

	// Perforation divider: the dashed repeating gradient built from a single color.
	const perfColor = styles?.perf?.color;
	if (perfColor) {
		css += `${mainSl} .ctc_nc_coupon__perf{ background: repeating-linear-gradient(${perfColor}, ${perfColor} 6px, transparent 6px, transparent 12px); }`;
	}

	// Perforation circles (top/bottom "punch-outs") always inherit the Coupon
	// Window background so they read as holes cut out of the ticket â€” they have
	// no color setting of their own and update live when the coupon bg changes.
	const couponBg = styles?.coupon?.background;
	if (couponBg) {
		css += `${mainSl} .ctc_nc_coupon__perf::before, ${mainSl} .ctc_nc_coupon__perf::after{ ${getBackgroundCSS(couponBg)} }`;
	}

	// Copy Button hover: background + text/icon color. The `*` rule makes both
	// the button text and any icon (fill/stroke via currentColor) adopt the
	// hover color. Applies only on :hover, in editor + frontend.
	const right = styles?.right;
	if (right) {
		const hoverDecls = [
			right.hoverBackground ? getBackgroundCSS(right.hoverBackground) : '',
			right.hoverColor ? `color: ${right.hoverColor};` : '',
		].filter(Boolean).join(' ');
		if (hoverDecls) {
			css += `${mainSl} .ctc_nc_coupon__right:hover{ ${hoverDecls} }`;
		}
		if (right.hoverColor) {
			css += `${mainSl} .ctc_nc_coupon__right:hover *{ color: ${right.hoverColor}; }`;
		}
	}

	// Block alignment â†’ how the coupon sits inside the stage (center = base).
	if (alignment) {
		css += `${mainSl} .ctc_nc_coupon-stage{ justify-items: ${alignMap[alignment] || 'center'}; }`;
	}

	return <style dangerouslySetInnerHTML={{ __html: `${fontImports}\n${css}` }} />;
};
export default Style;
