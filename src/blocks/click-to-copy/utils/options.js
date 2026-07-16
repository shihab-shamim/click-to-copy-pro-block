import { __ } from '@wordpress/i18n';

import icons from './icons';

const options = {

	forms: [
		{ label: __('Default', 'mail-collections'), value: 'default' },
		{ label: __('Theme-1', 'mail-collections'), value: 'form1' },
		{ label: __('Theme-2', 'mail-collections'), value: 'form2' },
		{ label: __('Theme-3', 'mail-collections'), value: 'form3' },
		{ label: __('Theme-4', 'mail-collections'), value: 'form4' },
		{ label: __('Theme-5', 'mail-collections'), value: 'form5' }
		,
		{ label: __('Theme-6', 'mail-collections'), value: 'form6' },
		{ label: __('Theme-7', 'mail-collections'), value: 'form7' },
		{ label: __('Theme-8', 'mail-collections'), value: 'form8' },
		{ label: __('Theme-9', 'mail-collections'), value: 'form9' },
		{ label: __('Theme-10', 'mail-collections'), value: 'form10' },
		{ label: __('Theme-11', 'mail-collections'), value: 'form11' },
		{ label: __('Theme-12', 'mail-collections'), value: 'form12' },
		{ label: __('Theme-13', 'mail-collections'), value: 'form13' },
		{ label: __('Theme-14', 'mail-collections'), value: 'form14' },
		{ label: __('Theme-15', 'mail-collections'), value: 'form15' },
		
	],

	layouts: [
		{ label: __('Vertical', 'block-directory'), value: 'vertical', icon: icons.verticalLine },
		{ label: __('Horizontal', 'block-directory'), value: 'horizontal', icon: icons.horizontalLine }
	],

	generalStyleTabs: [
		{ name: 'general', title: __('General', 'block-directory') },
		{ name: 'style', title: __('Style', 'block-directory') }
	],

	pxUnit: (def = 0) => ({ value: 'px', label: 'px', default: def }),
	perUnit: (def = 0) => ({ value: '%', label: '%', default: def }),
	emUnit: (def = 0) => ({ value: 'em', label: 'em', default: def }),
	remUnit: (def = 0) => ({ value: 'rem', label: 'rem', default: def }),
	vwUnit: (def = 0) => ({ value: 'vw', label: 'vw', default: def }),
	vhUnit: (def = 0) => ({ value: 'vh', label: 'vh', default: def })
}
export default options;