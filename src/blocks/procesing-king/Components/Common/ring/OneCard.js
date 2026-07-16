import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// SVG viewBox radius of the ring centerline (circle r="52" in a 0 0 120 120 box).
const VB = 120;
const VB_R = 52;
// Comfortable gap (px) kept between the label and the inner edge of the ring.
const LABEL_PADDING = 14;

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

const OneCard = ({ attributes = {}, RichTextComponents, setAttributes }) => {
	const {
		title = 'Copy',
		code = '#A1B2C3',
		copyText: codeToCopy = 'ORDER-#A1B2C3',
		showTitle = true,
		showCode = true,
		styles = {},
	} = attributes;

	const ring = styles.ring || {};

	// `RichTextComponents` is only passed in the editor. The label lives inside the
	// copy button, so the copy interaction (which fades the label out) is skipped
	// while editing so the title/code stay editable; on the frontend it runs.
	const isEditor = !!RichTextComponents;

	const [isCopied, setIsCopied] = useState(false);
	const timer = useRef(null);

	// Clear pending timer on unmount.
	useEffect(() => () => clearTimeout(timer.current), []);

	// ---- Auto-size the ring to fit the label ----
	// Measure the label's rendered content and grow the ring so the label's
	// diagonal always fits inside the track with padding. The configured
	// `ring.size` acts as the MINIMUM. The ring stays circular (width == height),
	// and the visible stroke thickness is kept constant by scaling the SVG
	// stroke-width inversely with the final size.
	const labelRef = useRef(null);
	const [dims, setDims] = useState(null); // { size, stroke } in px / viewBox units

	const configuredSize = parseFloat(ring.size) || 130;
	const configuredThickness = parseFloat(ring.thickness) || 8;

	useLayoutEffect(() => {
		const el = labelRef.current;
		if (!el) {
			return undefined;
		}

		const measure = () => {
			const w = el.offsetWidth;
			const h = el.offsetHeight;
			if (!w && !h) {
				return;
			}
			const diagonal = Math.hypot(w, h);
			// Inner-edge radius (px) at size S = (VB_R - thickness/2) * S / VB.
			// Require it ≥ diagonal/2 + padding → solve for S.
			const denom = Math.max(VB_R - configuredThickness / 2, 20);
			const autoSize = ((diagonal / 2) + LABEL_PADDING) * VB / denom;
			const size = Math.max(configuredSize, Math.ceil(autoSize));
			// Keep the visible px thickness the same as at the configured size.
			const stroke = configuredThickness * (configuredSize / size);
			setDims({ size, stroke });
		};

		measure();

		let ro;
		if (typeof ResizeObserver !== 'undefined') {
			ro = new ResizeObserver(measure);
			ro.observe(el);
		}
		return () => ro && ro.disconnect();
	}, [configuredSize, configuredThickness]);

	const ringStyle = dims ? { width: `${dims.size}px`, height: `${dims.size}px` } : undefined;
	const strokeStyle = dims ? { strokeWidth: dims.stroke } : undefined;

	const handleCopy = async () => {
		if (isEditor) {
			return;
		}

		const ok = await copyText(codeToCopy);
		if (!ok) {
			return;
		}

		setIsCopied(true);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setIsCopied(false), 2200);
	};

	return (
		<>
			<div className='ctc_pr_ring-stage ctc_pr_stage--ring'>
				<button
					className={`ctc_pr_ring ctc_pr_js-copy${isCopied ? ' ctc_pr_is-copied' : ''}`}
					data-copy={codeToCopy}
					data-fx='ring'
					aria-label='Copy value'
					onClick={handleCopy}
					style={ringStyle}
				>
					<svg className='ctc_pr_ring__svg' viewBox='0 0 120 120' aria-hidden='true'>
						<circle className='ctc_pr_ring__track' cx='60' cy='60' r='52' style={strokeStyle} />
						<circle className='ctc_pr_ring__bar' cx='60' cy='60' r='52' style={strokeStyle} />
						<path className='ctc_pr_ring__check' d='M40 62l13 13 27-29' style={strokeStyle} />
					</svg>

					<span className='ctc_pr_ring__label'>
						<span className='ctc_pr_ring__label-inner' ref={labelRef}>
						{showTitle && !RichTextComponents && <span className='ctc_pr_ring__title'>{title}</span>}
						{showTitle && RichTextComponents && (
							<RichTextComponents
								tagName='span'
								value={title}
								placeholder='Title'
								onChange={(val) => setAttributes({ title: val })}
								className='ctc_pr_ring__title'
							/>
						)}

						{showTitle && showCode && <br />}

						{showCode && !RichTextComponents && <b className='ctc_pr_ring__code'>{code}</b>}
						{showCode && RichTextComponents && (
							<RichTextComponents
								tagName='b'
								value={code}
								placeholder='Code'
								onChange={(val) => setAttributes({ code: val })}
								className='ctc_pr_ring__code'
							/>
						)}
						</span>
					</span>
				</button>
			</div>
		</>
	);
};
export default OneCard;
