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
 * Original (Block #03 — Glass API Key) values, used as the `defaults` /
 * `defaultColor` prop on the Style controls so the reset button restores the
 * original look. The attribute values themselves are seeded to the same values
 * in block.json (`styles.default`) so controls load pre-populated and the CSS
 * renders from the start, while the base `style.scss` provides the fallback
 * appearance and `Common/Style.js` layers these as overrides on top.
 */
export const styleDefaults = {
	stage: { background: { type: 'gradient', gradient: 'radial-gradient(60% 80% at 20% 10%, rgba(108,92,231,.5), transparent), radial-gradient(50% 60% at 90% 100%, rgba(0,206,201,.45), transparent), #0a0e1a' } },
	glasskey: { background: { type: 'solid', color: 'rgba(255,255,255,0.07)' } },
	badge: { background: { type: 'solid', color: 'rgba(255,90,90,0.3)' }, color: '#ffffff' },
	name: { color: 'rgba(255,255,255,0.78)' },
	value: { background: { type: 'solid', color: 'rgba(0,0,0,0.28)' }, color: '#eaf0ff' },
	btn: {
		background: { type: 'solid', color: 'rgba(255,255,255,0.1)' },
		color: '#eaf0ff',
		hoverBackground: { type: 'solid', color: 'rgba(255,255,255,0.2)' },
		hoverColor: '#eaf0ff',
		copiedBackground: { type: 'solid', color: 'rgba(0,214,143,0.3)' },
		copiedColor: '#7dffc4'
	}
};
