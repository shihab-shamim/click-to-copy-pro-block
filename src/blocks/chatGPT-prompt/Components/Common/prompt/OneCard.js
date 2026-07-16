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

// Strip RichText markup + decode entities so the clipboard gets clean prompt text.
function plainText(html) {
	const el = document.createElement('div');
	el.innerHTML = String(html || '');
	return el.textContent || '';
}

const COPY_ICON = (
	<svg className='ctc_gpt_prompt__ico' viewBox='0 0 24 24' width='15' height='15' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
		<rect x='9' y='9' width='11' height='11' rx='2' />
		<path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
	</svg>
);

// Success check mark shown after a successful copy (reverts after 2s). Uses
// currentColor so it stays visible on the button's green copied background.
const CHECK_ICON = (
	<svg className='ctc_gpt_prompt__ico ctc_gpt_prompt__ico--check' viewBox='0 0 24 24' width='15' height='15' fill='none' stroke='currentColor' strokeWidth='2.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
		<path d='M20 6L9 17l-5-5' />
	</svg>
);

const OneCard = ({ attributes = {}, RichTextComponents, setAttributes }) => {
	const {
		icon = 'GPT',
		iconType = 'default',
		iconImage = {},
		model = 'ChatGPT',
		promptText = 'Act as a senior software engineer. Review the following code for bugs, readability and performance, then suggest concrete improvements:',
		copyLabel = 'Copy prompt',
		showHead = true,
		showButton = true,
	} = attributes;

	// Use the uploaded image for the avatar when chosen + available; else the
	// default text icon.
	const useImage = iconType === 'image' && !!iconImage?.url;

	// `RichTextComponents` is only passed in the editor. The copy button holds an
	// editable label, so the copy interaction is skipped while editing; on the
	// frontend it runs.
	const isEditor = !!RichTextComponents;

	const [isCopied, setIsCopied] = useState(false);
	const timer = useRef(null);

	// Clear pending timer on unmount.
	useEffect(() => () => clearTimeout(timer.current), []);

	const handleCopy = async () => {
		if (isEditor) {
			return;
		}

		const ok = await copyText(plainText(promptText));
		if (!ok) {
			return;
		}

		setIsCopied(true);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<>
			<div className='ctc_gpt_prompt-stage ctc_gpt_stage--ai'>
				<div className='ctc_gpt_prompt' data-fx='prompt'>
					{showHead && (
						<div className='ctc_gpt_prompt__head'>
							{useImage && (
								<span className='ctc_gpt_prompt__avatar'>
									<img className='ctc_gpt_prompt__avatar-img' src={iconImage.url} alt={iconImage.alt || ''} />
								</span>
							)}
							{!useImage && !RichTextComponents && <span className='ctc_gpt_prompt__avatar'>{icon}</span>}
							{!useImage && RichTextComponents && (
								<RichTextComponents
									tagName='span'
									value={icon}
									placeholder='GPT'
									onChange={(val) => setAttributes({ icon: val })}
									className='ctc_gpt_prompt__avatar'
								/>
							)}

							{!RichTextComponents && <span className='ctc_gpt_prompt__model'>{model}</span>}
							{RichTextComponents && (
								<RichTextComponents
									tagName='span'
									value={model}
									placeholder='Model'
									onChange={(val) => setAttributes({ model: val })}
									className='ctc_gpt_prompt__model'
								/>
							)}
						</div>
					)}

					{!RichTextComponents && <p className='ctc_gpt_prompt__text'>{promptText}</p>}
					{RichTextComponents && (
						<RichTextComponents
							tagName='p'
							value={promptText}
							placeholder='Prompt text…'
							onChange={(val) => setAttributes({ promptText: val })}
							className='ctc_gpt_prompt__text'
						/>
					)}

					{showButton && (
						<button
							className={`ctc_gpt_prompt__btn ctc_gpt_js-copy${isCopied ? ' ctc_gpt_is-copied' : ''}`}
							data-copy={plainText(promptText)}
							aria-label='Copy prompt'
							onClick={handleCopy}
						>
							{isCopied ? CHECK_ICON : COPY_ICON}
							{!RichTextComponents && <span className='ctc_gpt_prompt__btn-txt'>{copyLabel}</span>}
							{RichTextComponents && (
								<RichTextComponents
									tagName='span'
									value={copyLabel}
									placeholder='Copy prompt'
									onChange={(val) => setAttributes({ copyLabel: val })}
									className='ctc_gpt_prompt__btn-txt'
								/>
							)}
						</button>
					)}
				</div>
			</div>
		</>
	);
};
export default OneCard;
