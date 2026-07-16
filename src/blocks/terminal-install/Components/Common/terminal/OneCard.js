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

const OneCard = ({ attributes = {}, RichTextComponents,setAttributes }) => {
	const {
		barTitle = 'bash — install',
		promptText = '➜',
		command = 'npm i @bplugins/copykit',
		copyLabel = 'Copy',
		showBar = true,
		showDots = true,
		showTitle = true,
		showPrompt = true,
		showCommand = true,
		showCopyButton = true,
		showCursor = true,
	} = attributes;

	const [isCopied, setIsCopied] = useState(false);
	const [toast, setToast] = useState({ visible: false, msg: 'Copied to clipboard' });

	const copiedTimer = useRef(null);
	const toastTimer = useRef(null);

	// Clear pending timers on unmount.
	useEffect(() => () => {
		clearTimeout(copiedTimer.current);
		clearTimeout(toastTimer.current);
	}, []);

	const showToast = (msg) => {
		setToast({ visible: true, msg });
		clearTimeout(toastTimer.current);
		toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 1900);
	};

	const handleCopy = async () => {
		const ok = await copyText(command);
		if (!ok) {
			showToast('Copy failed — press Ctrl/⌘+C');
			return;
		}

		setIsCopied(true);
		clearTimeout(copiedTimer.current);
		copiedTimer.current = setTimeout(() => setIsCopied(false), 1600);

		showToast('Copied to clipboard');
	};

	return (
		<>

			<div className='ctc_ti_terminal-stage ctc_ti_stage--terminal'>
				<div className='ctc_ti_terminal' data-fx='terminal'>
					{showBar && (
						<div className='ctc_ti_terminal__bar'>
							{showDots && (
								<>
									<span className='ctc_ti_terminal__dot ctc_ti_terminal__dot--r'></span>
									<span className='ctc_ti_terminal__dot ctc_ti_terminal__dot--y'></span>
									<span className='ctc_ti_terminal__dot ctc_ti_terminal__dot--g'></span>
								</>
							)}
							{showTitle && !RichTextComponents && <span className='ctc_ti_terminal__title'>{barTitle}</span>}
							{showTitle && RichTextComponents && 
								<RichTextComponents
									tagName="span"
									value={barTitle}
									placeholder="Title"
									onChange={(val) => setAttributes({ barTitle: val })}
									className='ctc_ti_terminal__title'
								/>
							}
						</div>
					)}
					<div className='ctc_ti_terminal__body'>
						<code className='ctc_ti_terminal__line'>
							{showPrompt && <span className='ctc_ti_terminal__prompt'>{promptText}</span>}
							{showPrompt && showCommand ? ' ' : ''}
							{showCommand && !RichTextComponents && (
								<span className={`ctc_ti_terminal__cmd${showCursor ? '' : ' ctc_ti_hide-cursor'}`}>{command}</span>
							)}
                            {showCommand && RichTextComponents && (
								<RichTextComponents
									tagName="span"
									value={command}
									placeholder="Command"
									onChange={(val) => setAttributes({ command: val })}
									className={`ctc_ti_terminal__cmd${showCursor ? '' : ' ctc_ti_hide-cursor'}`}
								/>
							)}

						</code>
						{showCopyButton && (
							<button
								className={`ctc_ti_terminal__copy ctc_ti_js-copy${isCopied ? ' ctc_ti_is-copied' : ''}`}
								data-copy={command}
								aria-label='Copy install command'
								onClick={handleCopy}
							>
								{isCopied ? (
									// Success: green check mark (reverts to the copy icon after 1600ms).
									<svg className='ctc_ti_terminal__copy-icon' viewBox='0 0 24 24' width='16' height='16' fill='none' stroke='#52e08a' strokeWidth='2.4' aria-hidden='true'>
										<path d='M20 6L9 17l-5-5' />
									</svg>
								) : (
									<svg className='ctc_ti_terminal__copy-icon' viewBox='0 0 24 24' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
										<rect x='9' y='9' width='11' height='11' rx='2' />
										<path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
									</svg>
								)}
								<span className='ctc_ti_terminal__copy-label'>{copyLabel}</span>
							</button>
						)}
					</div>
				</div>
			</div>
			

		</>
	);
};
export default OneCard;
