/**
 * Lightweight, dependency-free syntax tokenizer for the Code Block.
 *
 * It scans plain code once and returns an array of { type, value } tokens,
 * preserving EVERY character (whitespace/newlines included as `plain` tokens) so
 * indentation, spacing and line breaks render exactly as entered. It is a
 * pragmatic multi-language lexer (tuned for JS, workable for HTML/CSS) — enough
 * to give each token category its own color; the actual colors come from the
 * selected theme palette (see utils/themes.js) applied via Common/Style.js.
 *
 * Token types (→ `.ctc_cb_tok-<type>` classes): keyword, function, variable,
 * string, number, boolean, comment, operator, punctuation, bracket, tag,
 * attribute, attrValue, property, symbol. `plain` = uncolored (base text).
 */

const KEYWORDS = new Set([
	'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
	'do', 'new', 'class', 'extends', 'super', 'import', 'export', 'from', 'as',
	'default', 'await', 'async', 'try', 'catch', 'finally', 'throw', 'switch',
	'case', 'break', 'continue', 'typeof', 'instanceof', 'in', 'of', 'this',
	'yield', 'delete', 'void', 'static', 'get', 'set',
]);

const BOOLEANS = new Set(['true', 'false', 'null', 'undefined', 'NaN']);

const RULES = [
	{ type: 'plain', re: /^\s+/ },
	{ type: 'comment', re: /^\/\*[\s\S]*?\*\// },
	{ type: 'comment', re: /^<!--[\s\S]*?-->/ },
	{ type: 'comment', re: /^\/\/[^\n]*/ },
	{ type: 'string', re: /^"(?:\\.|[^"\\])*"?/ },
	{ type: 'string', re: /^'(?:\\.|[^'\\])*'?/ },
	{ type: 'string', re: /^`(?:\\.|[^`\\])*`?/ },
	{ type: 'tag-open', re: /^<\/?[a-zA-Z][\w-]*/ },
	{ type: 'tag-close', re: /^\/?>/ },
	{ type: 'number', re: /^#[0-9a-fA-F]{3,8}\b/ },
	{ type: 'number', re: /^(?:0x[0-9a-fA-F]+|\d*\.?\d+(?:e[+-]?\d+)?)[a-z%]*/i },
	{ type: 'word', re: /^[A-Za-z_$][\w$-]*/ },
	{ type: 'operator', re: /^(?:=>|===|!==|==|!=|<=|>=|&&|\|\||\+\+|--|[-+*/%=<>!&|^~?])/ },
	{ type: 'bracket', re: /^[()[\]{}]/ },
	{ type: 'punctuation', re: /^[.,;:]/ },
];

/**
 * @param {string} code
 * @returns {{type:string,value:string}[]}
 */
export function tokenize(code) {
	const src = typeof code === 'string' ? code : '';
	const out = [];
	let i = 0;
	let inTag = false;

	while (i < src.length) {
		const rest = src.slice(i);
		let matched = false;

		for (const { type, re } of RULES) {
			const m = re.exec(rest);
			if (!m || m[0].length === 0) {
				continue;
			}
			const value = m[0];

			if (type === 'tag-open') {
				out.push({ type: 'tag', value });
				inTag = true;
			} else if (type === 'tag-close') {
				out.push({ type: 'tag', value });
				inTag = false;
			} else if (type === 'string') {
				out.push({ type: inTag ? 'attrValue' : 'string', value });
			} else if (type === 'word') {
				const after = src.slice(i + value.length);
				let wordType;
				if (inTag) {
					wordType = 'attribute';
				} else if (KEYWORDS.has(value)) {
					wordType = 'keyword';
				} else if (BOOLEANS.has(value)) {
					wordType = 'boolean';
				} else if (/^\s*\(/.test(after)) {
					wordType = 'function';
				} else if (/^\s*:/.test(after)) {
					wordType = 'property';
				} else {
					wordType = 'variable';
				}
				out.push({ type: wordType, value });
			} else {
				out.push({ type, value });
			}

			i += value.length;
			matched = true;
			break;
		}

		if (!matched) {
			// Anything unrecognised (a stray symbol) → its own token, 1 char.
			out.push({ type: 'symbol', value: src[i] });
			i += 1;
		}
	}

	return out;
}

/**
 * Split a token stream into lines (each a token array), so each code line can
 * render with its own line number. Tokens spanning newlines (block comments,
 * whitespace runs) are split across lines; the exact text is preserved.
 *
 * @param {{type:string,value:string}[]} tokens
 * @returns {{type:string,value:string}[][]}
 */
export function tokensToLines(tokens) {
	const lines = [[]];
	tokens.forEach(({ type, value }) => {
		const parts = value.split('\n');
		parts.forEach((part, idx) => {
			if (idx > 0) {
				lines.push([]);
			}
			if (part.length) {
				lines[lines.length - 1].push({ type, value: part });
			}
		});
	});
	return lines;
}
