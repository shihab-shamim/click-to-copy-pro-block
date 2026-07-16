import {
	getBackgroundCSS,
	getBorderCSS,
	getBoxCSS,
	getMultiShadowCSS,
	getTypoCSS,
} from '../../../../../../bpl-tools/utils/getCSS';

/**
 * Runtime CSS generator for ChatGPT Prompt.
 *
 * The base look lives in style.scss; this component injects the customizable
 * OVERRIDES from the per-element `styles` attribute, scoped to this block
 * instance's id. Every style value is seeded in block.json, so the generated CSS
 * reproduces the base look and any customization layers on top.
 *
 * Generic elements (stage / prompt / avatar / model / text / btn) go through the
 * SELECTORS loop (background, color, typography, box, shadow, widthâ†’max-width for
 * the card). Special-cases: the card `gap`; the card + text `border`
 * (getBorderCSS); the avatar square `size`; the button `:hover` background; and
 * the copied-state background (id-scoped so it beats the base button background).
 */

const SELECTORS = {
	stage: '.ctc_gpt_prompt-stage',
	prompt: '.ctc_gpt_prompt',
	avatar: '.ctc_gpt_prompt__avatar',
	model: '.ctc_gpt_prompt__model',
	text: '.ctc_gpt_prompt__text',
	btn: '.ctc_gpt_prompt__btn',
};

// Elements whose "width" control should map to a different CSS property.
const WIDTH_PROP = { prompt: 'max-width' };

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

	// Card: flex gap + border.
	const prompt = styles?.prompt;
	if (prompt) {
		if (prompt.gap) {
			css += `${mainSl} .ctc_gpt_prompt{ gap: ${prompt.gap}; }`;
		}
		const promptBorder = prompt.border && getBorderCSS({ ...prompt.border, side: 'all' }).trim();
		if (promptBorder) {
			css += `${mainSl} .ctc_gpt_prompt{ ${promptBorder} }`;
		}
	}

	// Prompt text: border.
	const textBorder = styles?.text?.border && getBorderCSS({ ...styles.text.border, side: 'all' }).trim();
	if (textBorder) {
		css += `${mainSl} .ctc_gpt_prompt__text{ ${textBorder} }`;
	}

	// Avatar: square size (width + height).
	if (styles?.avatar?.size) {
		css += `${mainSl} .ctc_gpt_prompt__avatar{ width: ${styles.avatar.size}; height: ${styles.avatar.size}; }`;
	}

	// Copy button: hover background + copied-state background (id-scoped with the
	// extra `.is-copied` class so it outranks the base button background).
	const btn = styles?.btn;
	if (btn) {
		if (btn.hoverBackground) {
			css += `${mainSl} .ctc_gpt_prompt__btn:hover{ ${getBackgroundCSS(btn.hoverBackground)} }`;
		}
		if (btn.copiedBackground) {
			css += `${mainSl} .ctc_gpt_prompt__btn.ctc_gpt_is-copied{ ${getBackgroundCSS(btn.copiedBackground)} }`;
		}
		// Icon size â€” applies to both the copy icon and the success check mark
		// (they share the .ctc_gpt_prompt__ico class).
		if (btn.iconSize) {
			css += `${mainSl} .ctc_gpt_prompt__ico{ width: ${btn.iconSize}; height: ${btn.iconSize}; }`;
		}
	}

	// Block alignment â†’ how the card sits inside the stage (center = base).
	if (alignment) {
		css += `${mainSl} .ctc_gpt_prompt-stage{ justify-items: ${alignMap[alignment] || 'center'}; }`;
	}

	return <style dangerouslySetInnerHTML={{ __html: `${fontImports}\n${css}` }} />;
};
export default Style;
