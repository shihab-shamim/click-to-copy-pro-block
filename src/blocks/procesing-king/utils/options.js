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
 * Original (Block #13 — Progress Ring) values, used as the `defaults` /
 * `defaultColor` prop on the Style controls so the reset button restores the
 * original look. The attribute values themselves are seeded to the same values
 * in block.json (`styles.default`) so controls load pre-populated and the CSS
 * renders from the start, while the base `style.scss` provides the fallback
 * appearance and `Common/Style.js` layers these as overrides on top.
 */
export const styleDefaults = {
	stage: { background: { type: 'gradient', gradient: 'linear-gradient(160deg, #0e1424, #090c14)' } },
	ring: { track: '#1e2740', progress: '#6c5ce7' },
	title: { color: '#9aa3bd' },
	code: { color: '#eef1f8' }
};
