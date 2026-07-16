import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { tokenize, tokensToLines } from '../../../utils/highlight';

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
		language = 'javascript',
		copyLabel = 'Copy code',
		bannerText = 'Copied to clipboard',
		copyText: codeToCopy = '',
		showLanguage = true,
		showCopyButton = true,
		showLineNumbers = true,
	} = attributes;

	// Tokenize the plain code once (memoized on the code only) and split into
	// lines so each renders with its own line number. Theme changes don't
	// re-tokenize — the colors are pure CSS — so switching themes is instant.
	const codeLines = useMemo(() => tokensToLines(tokenize(String(codeToCopy))), [codeToCopy]);

	// `RichTextComponents` is only passed in the editor → in that context the code
	// area becomes an inline editor (a transparent <textarea> overlaid on the
	// highlighted code); on the frontend it is a read-only highlighted view.
	const isEditor = !!RichTextComponents;

	const [isCopied, setIsCopied] = useState(false);
	const timer = useRef(null);
	const codeRef = useRef(null);
	const editorRef = useRef(null);

	// Clear pending timer on unmount.
	useEffect(() => () => clearTimeout(timer.current), []);

	const handleCopy = async () => {
		const ok = await copyText(codeToCopy);
		if (!ok) {
			return;
		}

		setIsCopied(true);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setIsCopied(false), 1800);
	};

	// Keep the highlighted layer scrolled in lock-step with the textarea so the
	// caret always sits on the right glyph when lines are long.
	const syncScroll = () => {
		if (codeRef.current && editorRef.current) {
			codeRef.current.scrollTop = editorRef.current.scrollTop;
			codeRef.current.scrollLeft = editorRef.current.scrollLeft;
		}
	};

	const handleCodeChange = (e) => setAttributes({ copyText: e.target.value });

	// Tab inserts a real tab instead of moving focus, preserving indentation.
	const handleCodeKeyDown = (e) => {
		if (e.key !== 'Tab') {
			return;
		}
		e.preventDefault();
		const ta = e.target;
		const { selectionStart, selectionEnd, value } = ta;
		const next = value.slice(0, selectionStart) + '\t' + value.slice(selectionEnd);
		setAttributes({ copyText: next });
		// Restore the caret just after the inserted tab, once React re-renders.
		requestAnimationFrame(() => {
			if (editorRef.current) {
				editorRef.current.selectionStart = editorRef.current.selectionEnd = selectionStart + 1;
			}
		});
	};

	return (
		<>
			<div className='ctc_cb_codeblock-stage ctc_cb_stage--codeblock'>
				<div
					className={`ctc_cb_codeblock ctc_cb_js-copy-wrap${isCopied ? ' ctc_cb_is-copied' : ''}${showLineNumbers ? '' : ' ctc_cb_hide-ln'}`}
					data-fx='codeblock'
				>
					<div className='ctc_cb_codeblock__top'>
						{showLanguage && !RichTextComponents && <span className='ctc_cb_codeblock__lang'>{language}</span>}
						{showLanguage && RichTextComponents && (
							<RichTextComponents
								tagName='span'
								value={language}
								placeholder='language'
								onChange={(val) => setAttributes({ language: val })}
								className='ctc_cb_codeblock__lang'
							/>
						)}

						{showCopyButton && (
							<button
								className='ctc_cb_codeblock__copy ctc_cb_js-copy'
								data-copy={codeToCopy}
								aria-label='Copy code'
								onClick={handleCopy}
							>
								{!RichTextComponents && <span className='ctc_cb_codeblock__copy-txt'>{copyLabel}</span>}
								{RichTextComponents && (
									<RichTextComponents
										tagName='span'
										value={copyLabel}
										placeholder='Copy code'
										onChange={(val) => setAttributes({ copyLabel: val })}
										className='ctc_cb_codeblock__copy-txt'
									/>
								)}
							</button>
						)}
					</div>

					<pre className={`ctc_cb_codeblock__pre${isEditor ? ' ctc_cb_is-editing' : ''}`}>
						<code ref={codeRef} aria-hidden={isEditor ? 'true' : undefined}>
							{codeLines.map((lineTokens, index) => (
								<span className='ctc_cb_cl' key={index}>
									<span className='ctc_cb_ln'>{index + 1}</span>
									{lineTokens.map((tok, j) => (
										tok.type === 'plain'
											? <Fragment key={j}>{tok.value}</Fragment>
											: <span key={j} className={`ctc_cb_tok-${tok.type}`}>{tok.value}</span>
									))}
								</span>
							))}
						</code>

						{isEditor && (
							<textarea
								ref={editorRef}
								className='ctc_cb_codeblock__editor'
								value={codeToCopy}
								onChange={handleCodeChange}
								onKeyDown={handleCodeKeyDown}
								onScroll={syncScroll}
								spellCheck={false}
								autoComplete='off'
								autoCapitalize='off'
								autoCorrect='off'
								wrap='off'
								aria-label='Edit code'
							/>
						)}
					</pre>

					<div className='ctc_cb_codeblock__banner'>{bannerText}</div>
				</div>
			</div>
		</>
	);
};
export default OneCard;
