import { registerBlockType } from '@wordpress/blocks';

import './editor.scss';
import metadata from './block.json';
import icons from './utils/icons';
import Edit from './Components/Backend/Edit';

registerBlockType(metadata, {
	icon: icons.copy,
	edit: Edit
});