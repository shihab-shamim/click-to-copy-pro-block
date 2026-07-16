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
 * Border style options (project-local copy — no bpl-tools dependency). Used by
 * the Style panel's Border / Border Style selectors.
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
 * Original (showcase "ChatGPT Prompt" template) values, used as the `defaults` /
 * `defaultColor` prop on the Style controls so the reset button restores the
 * original look. The attribute values themselves are seeded to the same values
 * in block.json (`styles.default`) so controls load pre-populated and the CSS
 * renders from the start, while the base `style.scss` provides the fallback
 * appearance and `Common/Style.js` layers these as overrides on top.
 */
export const styleDefaults = {
	prompt: { background: { type: 'solid', color: '#171b28' }, border: { color: '#262c40' } },
	avatar: { background: { type: 'gradient', gradient: 'linear-gradient(135deg, #22d3ee, #a855f7)' }, color: '#ffffff' },
	model: { color: '#eef1f8' },
	text: { background: { type: 'solid', color: '#12151f' }, color: '#eef1f8', border: { color: '#262c40' } },
	btn: {
		background: { type: 'gradient', gradient: 'linear-gradient(135deg, #22d3ee, #a855f7)' },
		color: '#ffffff',
		hoverBackground: { type: 'gradient', gradient: 'linear-gradient(135deg, #22d3ee, #a855f7)' },
		copiedBackground: { type: 'gradient', gradient: 'linear-gradient(135deg, #00b894, #00cec9)' }
	}
};
