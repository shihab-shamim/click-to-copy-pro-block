import { __ } from '@wordpress/i18n';

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'textdomain') },
	{ name: 'style', title: __('Style', 'textdomain') }
];

export const alignOptions = [
	{ label: __('Left', 'b-blocks'), value: 'left' },
	{ label: __('Center', 'b-blocks'), value: 'center' },
	{ label: __('Right', 'b-blocks'), value: 'right' }
];

/**
 * Original (design #01) values, used as the `defaults` / `defaultColor` prop on
 * the Style controls so the reset button restores the original look. Attribute
 * values themselves default to empty — the base `style.scss` provides the default
 * appearance and these controls inject overrides on top of it (see D-10).
 */
export const styleDefaults = {
	stage: { background: { type: 'gradient', gradient: 'radial-gradient(circle at 30% 20%, #12233a, #0a0f18)' } },
	terminal: { background: { type: 'solid', color: '#0d1117' } },
	bar: { background: { type: 'gradient', gradient: 'linear-gradient(#171e2b, #10151f)' } },
	dots: { colorR: '#ff5f56', colorY: '#ffbd2e', colorG: '#27c93f' },
	title: { color: '#5b6577' },
	prompt: { color: '#27c93f' },
	command: { color: '#7fd1ff' },
	copy: { color: '#9fb0c9', background: { type: 'solid', color: '#1a2130' } }
};
