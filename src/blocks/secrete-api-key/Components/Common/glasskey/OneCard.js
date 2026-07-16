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
		badgeText = 'SECRET',
		keyName = 'Production key',
		keyValue = 'demo_stripe_key',
		maskedText = '•••• •••• •••• •••• ••••',
		showBadge = true,
		showName = true,
		showRevealButton = true,
		showCopyButton = true,
	} = attributes;

	// `revealed` swaps the masked placeholder for the real key; `isCopied` drives
	// the transient green "copied" state on the copy button.
	const [revealed, setRevealed] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const copiedTimer = useRef(null);

	// Clear pending timer on unmount.
	useEffect(() => () => clearTimeout(copiedTimer.current), []);

	const handleCopy = async () => {
		const ok = await copyText(keyValue);
		if (!ok) {
			return;
		}

		setIsCopied(true);
		clearTimeout(copiedTimer.current);
		copiedTimer.current = setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<>
			<div className='ctc_sak_glasskey-stage ctc_sak_stage--aurora'>
				<div className='ctc_sak_glasskey' data-fx='glass'>
					{(showBadge || showName) && (
						<div className='ctc_sak_glasskey__head'>
							{showBadge && !RichTextComponents && <span className='ctc_sak_glasskey__badge'>{badgeText}</span>}
							{showBadge && RichTextComponents && (
								<RichTextComponents
									tagName='span'
									value={badgeText}
									placeholder='SECRET'
									onChange={(val) => setAttributes({ badgeText: val })}
									className='ctc_sak_glasskey__badge'
								/>
							)}

							{showName && !RichTextComponents && <span className='ctc_sak_glasskey__name'>{keyName}</span>}
							{showName && RichTextComponents && (
								<RichTextComponents
									tagName='span'
									value={keyName}
									placeholder='Production key'
									onChange={(val) => setAttributes({ keyName: val })}
									className='ctc_sak_glasskey__name'
								/>
							)}
						</div>
					)}

					<div className='ctc_sak_glasskey__row'>
						<code className='ctc_sak_glasskey__value'>{revealed ? keyValue : maskedText}</code>

						<div className='ctc_sak_glasskey__actions'>
							{showRevealButton && (
								<button
									className='ctc_sak_glasskey__btn ctc_sak_js-reveal'
									aria-label={revealed ? 'Hide key' : 'Reveal key'}
									aria-pressed={revealed}
									onClick={() => setRevealed((v) => !v)}
								>
									<svg className='ctc_sak_glasskey__icon' viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
										<path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
										<circle cx='12' cy='12' r='3' />
									</svg>
								</button>
							)}

							{showCopyButton && (
								<button
									className={`ctc_sak_glasskey__btn ctc_sak_glasskey__btn--copy ctc_sak_js-copy${isCopied ? ' ctc_sak_is-copied' : ''}`}
									data-copy={keyValue}
									aria-label='Copy API key'
									onClick={handleCopy}
								>
									{isCopied ? (
										// Success: green check mark (inherits the copied icon color);
										// reverts to the copy icon after 2000ms.
										<svg key='check' className='ctc_sak_glasskey__icon' viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' strokeWidth='2.4' aria-hidden='true'>
											<path d='M20 6L9 17l-5-5' />
										</svg>
									) : (
										<svg key='copy' className='ctc_sak_glasskey__icon' viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
											<rect x='9' y='9' width='11' height='11' rx='2' />
											<path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
										</svg>
									)}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default OneCard;
