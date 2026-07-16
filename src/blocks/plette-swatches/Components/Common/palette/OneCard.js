import { useEffect, useRef, useState } from 'react';
import { parseColor, formatColor } from '../../AdvColorControl/colorFormats';

async function copyText(text) {
	try {
		if (navigator.clipboard && window.isSecureContext) {
			await navigator.clipboard.writeText(text);
			return true;
		}
	} catch (_) { /* fall through to legacy path */ }

	// Legacy fallback (file:// or non-secure contexts)
	try {
		const ta = document.createElement('textarea');
		ta.value = text;
		ta.setAttribute('readonly', '');
		ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
		document.body.appendChild(ta);
		ta.select();
		const ok = document.execCommand('copy');
		document.body.removeChild(ta);
		return ok;
	} catch (_) {
		return false;
	}
}

const OneCard = ({ attributes = {} }) => {
	const { swatches = [] } = attributes;

	// Which swatch is currently flashing "Copied ✓" (only one at a time).
	const [copiedIndex, setCopiedIndex] = useState(null);
	const timer = useRef(null);

	// Clear pending timer on unmount.
	useEffect(() => () => clearTimeout(timer.current), []);

	const handleCopy = async (index, color) => {
		const ok = await copyText(color);
		if (!ok) {
			return;
		}

		setCopiedIndex(index);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setCopiedIndex(null), 1400);
	};

	return (
		<>
			<div className='ctc_ps_palette-stage ctc_ps_stage--paper'>
				<div className='ctc_ps_palette'>
					{swatches.map((item, index) => {
						const color = item?.color || '#000000';
						// Per-swatch display format (HEX/HEX Alpha/RGB/RGBA/HSL/HSLA)
						// controls how the value is shown. When unset, keep the
						// original behavior: uppercase only HEX; other formats verbatim.
						let shownColor;
						const parsedForDisplay = item?.displayFormat && parseColor(color);
						if (parsedForDisplay) {
							shownColor = formatColor(parsedForDisplay, item.displayFormat);
						} else {
							shownColor = color.trim().startsWith('#') ? color.toUpperCase() : color;
						}
						return (
							<button
								key={index}
								className={`ctc_ps_swatch ctc_ps_js-copy${copiedIndex === index ? ' ctc_ps_is-copied' : ''}`}
								style={{ '--c': color }}
								data-copy={color}
								data-fx='swatch'
								aria-label={`Copy ${color}`}
								onClick={() => handleCopy(index, color)}
							>
								<span className='ctc_ps_swatch__hex'>{shownColor}</span>
							</button>
						);
					})}
				</div>
			</div>
		</>
	);
};
export default OneCard;
