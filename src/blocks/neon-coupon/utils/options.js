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
 * Original (Block #02 — Neon Coupon) values, used as the `defaults` /
 * `defaultColor` prop on the Style controls so the reset button restores the
 * original look. The attribute values themselves are seeded to the same values
 * in block.json (`styles.default`) so the controls load pre-populated and the
 * CSS renders from the start, while the base `style.scss` provides the fallback
 * appearance and `Common/Style.js` layers these as overrides on top.
 */
export const styleDefaults = {
	stage: { background: { type: 'gradient', gradient: 'radial-gradient(circle at 50% 120%, #2a0f3a, #0a0812)' } },
	coupon: { background: { type: 'solid', color: '#14101f' } },
	label: { color: '#ff5ea8' },
	amount: { background: { type: 'gradient', gradient: 'linear-gradient(90deg, #ff2d95, #ff9d4d)' } },
	terms: { color: '#8a86a5' },
	perf: { color: '#33245a' },
	right: {
		background: { type: 'gradient', gradient: 'linear-gradient(135deg, #ff2d95, #7b2dff)' },
		color: '#ffffff',
		hoverBackground: { type: 'gradient', gradient: 'linear-gradient(135deg, #ff2d95, #7b2dff)' },
		hoverColor: '#ffffff'
	}
};
