import {
	getBackgroundCSS,
	getBoxCSS,
	getMultiShadowCSS,
	getTypoCSS,
} from '../../../../../../bpl-tools/utils/getCSS';



const SELECTORS = {
	stage: '.ctc_pr_ring-stage',
	title: '.ctc_pr_ring__title',
	code: '.ctc_pr_ring__code',
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
		const { background, color, typo, padding, margin, radius, shadow } = s;

		const decls = [
			background ? getBackgroundCSS(background) : '',
			color ? `color: ${color};` : '',
			box('padding', padding),
			box('margin', margin),
			box('border-radius', radius),
			shadow?.length ? `box-shadow: ${getMultiShadowCSS(shadow)};` : '',
		].filter(Boolean).join(' ');

		if (decls) {
			css += `${selector}{ ${decls} }`;
		}

		if (typo) {
			fontImports += getTypoCSS('', typo)?.googleFontLink || '';
			css += getTypoCSS(selector, typo)?.styles || '';
		}
	});

	const ring = styles?.ring;
	if (ring) {
		if (ring.size) {
			css += `${mainSl} .ctc_pr_ring{ width: ${ring.size}; height: ${ring.size}; }`;
		}

		css += `${mainSl} .ctc_pr_ring__svg{ transform: rotate(-90deg); }`;

		const trackDecls = [
			ring.track ? `stroke: ${ring.track};` : '',
			ring.thickness ? `stroke-width: ${ring.thickness};` : '',
		].filter(Boolean).join(' ');
		if (trackDecls) {
			css += `${mainSl} .ctc_pr_ring__track{ ${trackDecls} }`;
		}

		const barDecls = [
			ring.progress ? `stroke: ${ring.progress};` : '',
			ring.thickness ? `stroke-width: ${ring.thickness};` : '',
			ring.duration ? `transition: stroke-dashoffset ${ring.duration} var(--ease);` : '',
		].filter(Boolean).join(' ');
		if (barDecls) {
			css += `${mainSl} .ctc_pr_ring__bar{ ${barDecls} }`;
		}

		css += `${mainSl} .ctc_pr_ring__check{ ${ring.thickness ? `stroke-width: ${ring.thickness}; ` : ''}transform: rotate(90deg); transform-origin: center; }`;
	}
	
	css += `${mainSl} .ctc_pr_ring.ctc_pr_is-copied .ctc_pr_ring__bar{ stroke-dashoffset: 0; stroke: #00d68f; }`;
	css += `${mainSl} .ctc_pr_ring.ctc_pr_is-copied .ctc_pr_ring__check{ stroke-dashoffset: 0; opacity: 1; }`;
	css += `${mainSl} .ctc_pr_ring.ctc_pr_is-copied .ctc_pr_ring__label{ opacity: 0; }`;

	if (alignment) {
		css += `${mainSl} .ctc_pr_ring-stage{ justify-items: ${alignMap[alignment] || 'center'}; }`;
	}

	return <style dangerouslySetInnerHTML={{ __html: `${fontImports}\n${css}` }} />;
};
export default Style;
