import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './Edit';
import './editor.scss';

registerBlockType(metadata, {
	icon: 'clipboard',
	edit: Edit,
});
