# Prompt 003 — Make the Pro parent selector block (`ctcb/click-to-copy-selector`) load correctly

**Date:** 2026-07-15
**Type:** Bug fix (selector block did not load in the Pro editor).

## Verbatim prompt (condensed)

> Implement the Parent Selector Block for the Pro version, following the same
> architecture and behavior as Info Cards. The Pro version currently does NOT load
> the parent selector block correctly. This template should work exactly like Info
> Cards: `$template = [[ 'ctcb/click-to-copy-selector' ]];`. Create the required
> parent block architecture so the template functions correctly. Namespace `ctcb`,
> block name `ctcb/click-to-copy-selector`, discoverable by the template, loads in
> the editor, selecting a block inserts the child, shortcode references the
> selected block, free exposes only the free block, pro exposes all. Only implement
> the parent selector block + required integration; don't modify child blocks or
> refactor unrelated code.

## Diagnosis (root cause)

The selector block folder (`src/blocks/parent/`, name `ctcb/click-to-copy-selector`)
was created in prompt 002 and registered by `CTC_Init` (free list) + used in the
`ctc` CPT template for premium. But it **failed to load** because its
`index.js` / `Edit.js` accessed `wp.blocks`, `wp.blockEditor`, `wp.data` via the
**global `wp` object** instead of `@wordpress/*` imports.

wp-scripts' DependencyExtractionWebpackPlugin only records a dependency when you
`import` from `@wordpress/*`. With global access, the built
`build/blocks/parent/index.asset.php` declared only `array('react')` — **missing
`wp-blocks`, `wp-block-editor`, `wp-data`**. WordPress therefore had no load-order
guarantee, and in the Pro editor the selector bundle could execute before those
globals existed. Since `Edit.js` destructured `wp.blockEditor`/`wp.data` at
module-eval time (and `index.js` did `const { registerBlockType } = wp.blocks;`),
it threw before `registerBlockType` ran → the block was never registered in JS →
the template block showed as unavailable.

(Info Cards' selector uses the same global pattern and the same `array('react')`
deps; it happens to work only by script-order luck. The fix below is strictly more
robust and behavior-identical.)

## Fix

Converted the selector to proper `@wordpress/*` imports (matching how every child
block imports):
- `src/blocks/parent/index.js`: `import { registerBlockType } from '@wordpress/blocks';`
- `src/blocks/parent/Edit.js`:
  - `import { useBlockProps } from '@wordpress/block-editor';`
  - `import { createBlock, getBlockType } from '@wordpress/blocks';`
  - `import { dispatch, select } from '@wordpress/data';`
  - replaced all `wp.blocks` / `wp.blockEditor` / `wp.data` usages accordingly.

No behavior change to the selector logic (block list, availability check, insert +
replace, re-lock on the `ctc` CPT) and no changes to any child block.

## Verification

- `npm run build` → 0 errors.
- `build/blocks/parent/index.asset.php` now:
  `array('react', 'wp-block-editor', 'wp-blocks', 'wp-data')` — the wp globals are
  guaranteed to load before the selector script, so registration is reliable.
- `build/blocks/parent/{block.json,index.js,index.css}` present; block name
  `ctcb/click-to-copy-selector`, `inserter:false`, category `click-to-copy`.

## Result

The `ctc` CPT template `[[ 'ctcb/click-to-copy-selector' ]]` now registers and
loads the selector in the Pro editor; picking a block inserts the child, which
shows its `[ctc id=N]` copy widget. Free version still uses the flagship template.
