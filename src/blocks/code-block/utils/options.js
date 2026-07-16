import { __ } from '@wordpress/i18n';

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'b-blocks') },
	{ name: 'style', title: __('Style', 'b-blocks') }
];

export const alignOptions = [
	{ label: __('Left', 'b-blocks'), value: 'left' },
	{ label: __('Center', 'b-blocks'), value: 'center' },
	{ label: __('Right', 'b-blocks'), value: 'right' }
];

/**
 * Border/divider style options (local copy of the former bpl-tools `borderStyles`
 * — identical values, so the Border Style / Divider Style selectors and the
 * generated CSS are unchanged). Used by Settings/Style/Style.js.
 */
export const borderStyles = [
	{ label: 'Solid', value: 'solid' },
	{ label: 'Dashed', value: 'dashed' },
	{ label: 'Dotted', value: 'dotted' },
	{ label: 'Double', value: 'double' },
	{ label: 'Groove', value: 'groove' },
	{ label: 'Inset', value: 'inset' },
	{ label: 'Outset', value: 'outset' },
	{ label: 'Ridge', value: 'ridge' }
];

/**
 * Original (Block #07 — Code Block) values, used as the `defaults` /
 * `defaultColor` prop on the Style controls so the reset button restores the
 * original look. The attribute values themselves are seeded to the same values
 * in block.json (`styles.default`) so controls load pre-populated and the CSS
 * renders from the start, while the base `style.scss` provides the fallback
 * appearance and `Common/Style.js` layers these as overrides on top.
 */
export const styleDefaults = {
	stage: { background: { type: 'solid', color: '#0b1020' } },
	codeblock: { background: { type: 'solid', color: '#0d1424' }, border: { color: '#1c2740' } },
	top: { background: { type: 'solid', color: '#111a2e' }, divider: { color: '#1c2740' } },
	lang: { color: '#5b6b8c' },
	copy: {
		background: { type: 'solid', color: 'transparent' },
		color: '#9fb0d0',
		hoverBackground: { type: 'solid', color: '#1a2540' },
		hoverColor: '#ffffff',
		border: { color: '#263352' }
	},
	code: { color: '#c9d5ee' },
	banner: { background: { type: 'gradient', gradient: 'linear-gradient(90deg, #00d68f, #00b894)' }, color: '#004411' }
};
