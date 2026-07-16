import { useBlockProps } from '@wordpress/block-editor';
import { createBlock, getBlockType } from '@wordpress/blocks';
import { dispatch, select } from '@wordpress/data';
import { ctcTemplates } from '../../utils/options';


const Edit = (props) => {
	const blockProps = useBlockProps();
	const { clientId } = props;

	const isBlockAvailable = (blockName) => {
		return !!getBlockType(blockName);
	};

	const insertBlock = (blockName) => {
		if (!isBlockAvailable(blockName)) {
			return;
		}

		const blockEditor = dispatch("core/block-editor");
		const currentPostType = select("core/editor")?.getCurrentPostType?.();
		const isShortcodePost = currentPostType === "ctc";

		blockEditor.updateSettings({ templateLock: false });

		const block = createBlock(blockName);

		blockEditor.replaceBlock(clientId, block);

		// Only re-lock the editor in the shortcode custom post type.
		if (isShortcodePost) {
			setTimeout(() => {
				blockEditor.updateSettings({ templateLock: "all" });
			}, 100);
		}
	};

	return (
		<div {...blockProps}>
			<div className="ctcbp-block-editor">
				<h2 className="title">Choose a Click To Copy Block</h2>

				<div className="buttons">
					{ctcTemplates.map((item) => {
						const disabledBlocks = window?.CTC_BLOCK_DATA?.disabledBlocks || [];
						// className matches the folder name for each block.
						if (disabledBlocks.includes(item.className)) {
							return null; // Do not render if explicitly disabled in the dashboard.
						}

						const available = isBlockAvailable(item.block);
						return (
							<button
								key={item.block}
								className={`button ${item.className}${!available ? ' pro-locked' : ''}`}
								onClick={() => insertBlock(item.block)}
							>
								<span className="icon">{item.icon}</span>
								<span className="text" title={item.name}>{item.name}</span>
								{item.description && <span className="desc">{item.description}</span>}
								{!available && <span className="pro-badge">Pro</span>}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Edit;
