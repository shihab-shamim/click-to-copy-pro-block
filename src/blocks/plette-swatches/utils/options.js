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
 * A fresh swatch appended by the ItemsPanel "Add New Swatch" button.
 */
export const newSwatch = { color: '#6C5CE7' };

/**
 * Original (Block #04 — Color Palette) values, used as the `defaults` /
 * `defaultColor` prop on the Style controls so the reset button restores the
 * original look. The attribute values themselves are seeded to the same values
 * in block.json (`styles.default`) so controls load pre-populated and the CSS
 * renders from the start, while the base `style.scss` provides the fallback
 * appearance and `Common/Style.js` layers these as overrides on top.
 */
export const styleDefaults = {
	stage: { background: { type: 'gradient', gradient: 'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(38,44,64,0.4) 12px, rgba(38,44,64,0.4) 13px), linear-gradient(180deg, #171b28, #12151f)' } },
	hex: { color: '#ffffff', background: { type: 'gradient', gradient: 'linear-gradient(transparent, rgba(0,0,0,0.5))' } },
	overlay: { background: { type: 'solid', color: 'transparent' } },
	copied: { background: { type: 'solid', color: 'rgba(0,0,0,0.55)' } }
};
