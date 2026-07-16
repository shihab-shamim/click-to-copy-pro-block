/**
 * blocks.js — Single source of truth for ALL blocks in the Click To Copy plugin.
 * Mirrors info-cards/src/admin/utils/blocks.js.
 *
 * Used by:
 *   - App.js  (admin dashboard toggle UI, via bpl-tools Blocks)
 *   - The PHP registration loop + editor bundle both key off `name` (= the
 *     build/blocks/<name> folder name), so these MUST match the folder names.
 *
 * Fields:
 *   name      {string}  — must match the src/blocks/<name> (and build/blocks/<name>) folder
 *   title     {string}  — human-readable label
 *   icon      {JSX}     — SVG icon for the block
 *   isPremium {boolean} — true = pro block (locked / registered only with license)
 *   required  {boolean} — if true, cannot be toggled off
 */

import {
	clickToCopyIcon,
	terminalInstallIcon,
	secretApiKeyIcon,
	neonCouponIcon,
	paletteSwatchesIcon,
	codeBlockIcon,
	progressRingIcon,
	chatgptPromptIcon,
} from '../../utils/icons';

export default [
	{
		name: 'click-to-copy',
		title: 'Click to Copy',
		icon: clickToCopyIcon,
		isPremium: false,
		required: true,
	},
	{
		name: 'terminal-install',
		title: 'Terminal Install',
		icon: terminalInstallIcon,
		isPremium: true,
	},
	{
		name: 'secrete-api-key',
		title: 'Secret API Key',
		icon: secretApiKeyIcon,
		isPremium: true,
	},
	{
		name: 'neon-coupon',
		title: 'Neon Coupon',
		icon: neonCouponIcon,
		isPremium: true,
	},
	{
		name: 'plette-swatches',
		title: 'Palette Swatches',
		icon: paletteSwatchesIcon,
		isPremium: true,
	},
	{
		name: 'code-block',
		title: 'Code Block',
		icon: codeBlockIcon,
		isPremium: true,
	},
	{
		name: 'procesing-king',
		title: 'Progress Ring',
		icon: progressRingIcon,
		isPremium: true,
	},
	{
		name: 'chatGPT-prompt',
		title: 'ChatGPT Prompt',
		icon: chatgptPromptIcon,
		isPremium: true,
	},
];
