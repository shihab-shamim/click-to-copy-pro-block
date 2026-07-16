
const disabledBlocks = window?.CTC_BLOCK_DATA?.disabledBlocks || [];

const proBlocks = {
	'terminal-install': () => require('./terminal-install/index.js'),
	'secrete-api-key': () => require('./secrete-api-key/index.js'),
	'neon-coupon': () => require('./neon-coupon/index.js'),
	'plette-swatches': () => require('./plette-swatches/index.js'),
	'code-block': () => require('./code-block/index.js'),
	'procesing-king': () => require('./procesing-king/index.js'),
	'chatGPT-prompt': () => require('./chatGPT-prompt/index.js'),
	'click-to-copy': () => require('./click-to-copy/index.js'),
};

Object.entries(proBlocks).forEach(([name, load]) => {
	if (!disabledBlocks.includes(name)) {
		load();
	}
});
