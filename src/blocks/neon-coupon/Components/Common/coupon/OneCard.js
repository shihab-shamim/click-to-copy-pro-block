import { useEffect, useRef, useState } from 'react';

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
		label = 'Limited offer',
		amount = '40% OFF',
		terms = 'Valid until 2026-12-31',
		hint = 'Tap to copy',
		code = 'NEON40',
		showLabel = true,
		showAmount = true,
		showTerms = true,
		showPerf = true,
		showHint = true,
	} = attributes;

	// `RichTextComponents` is only passed from the editor — use it to detect the
	// editing context and skip the copy interaction so text stays editable.
	const isEditor = !!RichTextComponents;

	const [isCopied, setIsCopied] = useState(false);
	const copiedTimer = useRef(null);

	// Clear pending timer on unmount.
	useEffect(() => () => clearTimeout(copiedTimer.current), []);

	const handleCopy = async () => {
		if (isEditor) {
			return;
		}

		const ok = await copyText(code);
		if (!ok) {
			return;
		}

		setIsCopied(true);
		clearTimeout(copiedTimer.current);
		copiedTimer.current = setTimeout(() => setIsCopied(false), 1800);
	};

	return (
		<>
			<div className='ctc_nc_coupon-stage ctc_nc_stage--neon'>
				<div className='ctc_nc_coupon' data-fx='coupon'>
					<div className='ctc_nc_coupon__left'>
						{showLabel && !RichTextComponents && <p className='ctc_nc_coupon__label'>{label}</p>}
						{showLabel && RichTextComponents && (
							<RichTextComponents
								tagName='p'
								value={label}
								placeholder='Limited offer'
								onChange={(val) => setAttributes({ label: val })}
								className='ctc_nc_coupon__label'
							/>
						)}

						{showAmount && !RichTextComponents && <p className='ctc_nc_coupon__amount'>{amount}</p>}
						{showAmount && RichTextComponents && (
							<RichTextComponents
								tagName='p'
								value={amount}
								placeholder='40% OFF'
								onChange={(val) => setAttributes({ amount: val })}
								className='ctc_nc_coupon__amount'
							/>
						)}

						{showTerms && !RichTextComponents && <p className='ctc_nc_coupon__terms'>{terms}</p>}
						{showTerms && RichTextComponents && (
							<RichTextComponents
								tagName='p'
								value={terms}
								placeholder='Valid until…'
								onChange={(val) => setAttributes({ terms: val })}
								className='ctc_nc_coupon__terms'
							/>
						)}
					</div>

					{showPerf && <div className='ctc_nc_coupon__perf' aria-hidden='true'></div>}

					<button
						className={`ctc_nc_coupon__right ctc_nc_js-copy${isCopied ? ' ctc_nc_is-copied' : ''}`}
						data-copy={code}
						aria-label={`Copy coupon code ${code}`}
						onClick={handleCopy}
					>
						{showHint && !RichTextComponents && <span className='ctc_nc_coupon__hint'>{hint}</span>}
						{showHint && RichTextComponents && (
							<RichTextComponents
								tagName='span'
								value={hint}
								placeholder='Tap to copy'
								onChange={(val) => setAttributes({ hint: val })}
								className='ctc_nc_coupon__hint'
							/>
						)}

						{!RichTextComponents && <span className='ctc_nc_coupon__code'>{code}</span>}
						{RichTextComponents && (
							<RichTextComponents
								tagName='span'
								value={code}
								placeholder='CODE'
								onChange={(val) => setAttributes({ code: val })}
								className='ctc_nc_coupon__code'
							/>
						)}
					</button>
				</div>
			</div>
		</>
	);
};
export default OneCard;
