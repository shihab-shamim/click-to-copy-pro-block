/**
 * options.js — block list feeding the ShortCode selector (parent block).
 * Mirrors info-cards/src/utils/options.js (infoCardsTemplates).
 *
 * Each entry:
 *   name        {string} — human-readable label
 *   block       {string} — the block.json `name` to insert
 *   icon        {JSX}    — SVG icon
 *   className    {string} — MUST equal the src/blocks/<folder> name (used for the
 *                          disabled-hide check + block-specific colours in editor.scss)
 *   description {string} — short description shown under the name
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
} from './icons';

export const ctcTemplates = [
	{
		name: 'Click to Copy',
		block: 'ctcb/click-to-copy',
		icon: clickToCopyIcon,
		className: 'click-to-copy',
		description: 'One-click copy for text or code.',
	},
	{
		name: 'Terminal Install',
		block: 'ctcb/terminal-install',
		icon: terminalInstallIcon,
		className: 'terminal-install',
		description: 'Copy-friendly CLI install commands.',
	},
	{
		name: 'Secret API Key',
		block: 'ctcb/secret-api-key',
		icon: secretApiKeyIcon,
		className: 'secrete-api-key',
		description: 'Reveal & copy masked API keys.',
	},
	{
		name: 'Neon Coupon',
		block: 'ctcb/neon-coupon',
		icon: neonCouponIcon,
		className: 'neon-coupon',
		description: 'Copy neon-styled coupon codes.',
	},
	{
		name: 'Palette Swatches',
		block: 'ctcb/palette-swatches',
		icon: paletteSwatchesIcon,
		className: 'plette-swatches',
		description: 'Copy color values from swatches.',
	},
	{
		name: 'Code Block',
		block: 'ctcb/code-block',
		icon: codeBlockIcon,
		className: 'code-block',
		description: 'Copy syntax-highlighted code.',
	},
	{
		name: 'Progress Ring',
		block: 'ctcb/progress-ring',
		icon: progressRingIcon,
		className: 'procesing-king',
		description: 'Copy with a progress-ring confirmation.',
	},
	{
		name: 'ChatGPT Prompt',
		block: 'ctcb/chatgpt-prompt',
		icon: chatgptPromptIcon,
		className: 'chatGPT-prompt',
		description: 'Copy ready-made ChatGPT prompts.',
	},
];
