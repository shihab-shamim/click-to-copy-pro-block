/**
 * Code highlighting themes for the Code Block.
 *
 * `codeThemes` → SelectControl options (General tab).
 * `themeColors[theme]` → the palette applied by Components/Common/Style.js:
 *   - `tokens` : per-token-type colors (keyword, function, variable, string,
 *     number, boolean, comment, operator, punctuation, bracket, tag, attribute,
 *     attrValue, property, symbol). Emitted for EVERY theme (incl. `default`) so
 *     the code is colorized out of the box.
 *   - `cardBg` / `topBg` / `text` / `ln` : the code surface colors. Emitted ONLY
 *     for non-`default` themes, so at `default` the per-element Style controls
 *     keep full control and the current design is unchanged.
 *
 * Switching themes only swaps this palette (CSS) — the code content and the
 * tokenization are untouched, so it is instantaneous.
 */

export const codeThemes = [
	{ label: 'Default', value: 'default' },
	{ label: 'GitHub', value: 'github' },
	{ label: 'VS Code Dark', value: 'vscode-dark' },
	{ label: 'Monokai', value: 'monokai' },
	{ label: 'Dracula', value: 'dracula' },
	{ label: 'One Dark', value: 'one-dark' },
	{ label: 'Night Owl', value: 'night-owl' },
	{ label: 'Nord', value: 'nord' },
	{ label: 'Solarized Light', value: 'solarized-light' },
	{ label: 'Solarized Dark', value: 'solarized-dark' },
];

export const themeColors = {
	default: {
		cardBg: '#0d1424', topBg: '#111a2e', text: '#c9d5ee', ln: '#3d4b6b',
		tokens: {
			keyword: '#ff7edb', function: '#6ee7ff', variable: '#ffd479', string: '#a5f59b',
			number: '#f78c6c', boolean: '#ff7edb', comment: '#5b6b8c', operator: '#89ddff',
			punctuation: '#c9d5ee', bracket: '#c9d5ee', tag: '#ff7edb', attribute: '#ffd479',
			attrValue: '#a5f59b', property: '#c792ea', symbol: '#c9d5ee',
		},
	},
	github: {
		cardBg: '#ffffff', topBg: '#f6f8fa', text: '#24292e', ln: '#babec4',
		tokens: {
			keyword: '#d73a49', function: '#6f42c1', variable: '#24292e', string: '#032f62',
			number: '#005cc5', boolean: '#005cc5', comment: '#6a737d', operator: '#d73a49',
			punctuation: '#24292e', bracket: '#24292e', tag: '#22863a', attribute: '#6f42c1',
			attrValue: '#032f62', property: '#005cc5', symbol: '#24292e',
		},
	},
	'vscode-dark': {
		cardBg: '#1e1e1e', topBg: '#252526', text: '#d4d4d4', ln: '#858585',
		tokens: {
			keyword: '#569cd6', function: '#dcdcaa', variable: '#9cdcfe', string: '#ce9178',
			number: '#b5cea8', boolean: '#569cd6', comment: '#6a9955', operator: '#d4d4d4',
			punctuation: '#d4d4d4', bracket: '#ffd700', tag: '#569cd6', attribute: '#9cdcfe',
			attrValue: '#ce9178', property: '#9cdcfe', symbol: '#d4d4d4',
		},
	},
	monokai: {
		cardBg: '#272822', topBg: '#1d1e19', text: '#f8f8f2', ln: '#90908a',
		tokens: {
			keyword: '#f92672', function: '#a6e22e', variable: '#f8f8f2', string: '#e6db74',
			number: '#ae81ff', boolean: '#ae81ff', comment: '#75715e', operator: '#f92672',
			punctuation: '#f8f8f2', bracket: '#f8f8f2', tag: '#f92672', attribute: '#a6e22e',
			attrValue: '#e6db74', property: '#66d9ef', symbol: '#f8f8f2',
		},
	},
	dracula: {
		cardBg: '#282a36', topBg: '#21222c', text: '#f8f8f2', ln: '#6272a4',
		tokens: {
			keyword: '#ff79c6', function: '#50fa7b', variable: '#f8f8f2', string: '#f1fa8c',
			number: '#bd93f9', boolean: '#bd93f9', comment: '#6272a4', operator: '#ff79c6',
			punctuation: '#f8f8f2', bracket: '#f8f8f2', tag: '#ff79c6', attribute: '#50fa7b',
			attrValue: '#f1fa8c', property: '#8be9fd', symbol: '#f8f8f2',
		},
	},
	'one-dark': {
		cardBg: '#282c34', topBg: '#21252b', text: '#abb2bf', ln: '#5c6370',
		tokens: {
			keyword: '#c678dd', function: '#61afef', variable: '#e06c75', string: '#98c379',
			number: '#d19a66', boolean: '#d19a66', comment: '#5c6370', operator: '#56b6c2',
			punctuation: '#abb2bf', bracket: '#abb2bf', tag: '#e06c75', attribute: '#d19a66',
			attrValue: '#98c379', property: '#56b6c2', symbol: '#abb2bf',
		},
	},
	'night-owl': {
		cardBg: '#011627', topBg: '#010e1a', text: '#d6deeb', ln: '#4b6479',
		tokens: {
			keyword: '#c792ea', function: '#82aaff', variable: '#d6deeb', string: '#ecc48d',
			number: '#f78c6c', boolean: '#ff5874', comment: '#637777', operator: '#7fdbca',
			punctuation: '#d6deeb', bracket: '#d6deeb', tag: '#caece6', attribute: '#addb67',
			attrValue: '#ecc48d', property: '#80cbc4', symbol: '#d6deeb',
		},
	},
	nord: {
		cardBg: '#2e3440', topBg: '#272c36', text: '#d8dee9', ln: '#4c566a',
		tokens: {
			keyword: '#81a1c1', function: '#88c0d0', variable: '#d8dee9', string: '#a3be8c',
			number: '#b48ead', boolean: '#81a1c1', comment: '#616e88', operator: '#81a1c1',
			punctuation: '#eceff4', bracket: '#eceff4', tag: '#81a1c1', attribute: '#8fbcbb',
			attrValue: '#a3be8c', property: '#8fbcbb', symbol: '#eceff4',
		},
	},
	'solarized-light': {
		cardBg: '#fdf6e3', topBg: '#eee8d5', text: '#657b83', ln: '#93a1a1',
		tokens: {
			keyword: '#859900', function: '#268bd2', variable: '#657b83', string: '#2aa198',
			number: '#d33682', boolean: '#d33682', comment: '#93a1a1', operator: '#859900',
			punctuation: '#657b83', bracket: '#657b83', tag: '#268bd2', attribute: '#b58900',
			attrValue: '#2aa198', property: '#268bd2', symbol: '#657b83',
		},
	},
	'solarized-dark': {
		cardBg: '#002b36', topBg: '#073642', text: '#839496', ln: '#586e75',
		tokens: {
			keyword: '#859900', function: '#268bd2', variable: '#839496', string: '#2aa198',
			number: '#d33682', boolean: '#d33682', comment: '#586e75', operator: '#859900',
			punctuation: '#839496', bracket: '#839496', tag: '#268bd2', attribute: '#b58900',
			attrValue: '#2aa198', property: '#268bd2', symbol: '#839496',
		},
	},
};
