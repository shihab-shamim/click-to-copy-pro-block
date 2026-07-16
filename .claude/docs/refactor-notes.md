# Refactor Notes & Extension Guide

## Build gotchas learned

1. **bpl-tools import depth.** Block source files under `src/blocks/<block>/…` reach
   the sibling library at `../../../../../../bpl-tools` (depth varies by file). When
   copying a block in from a standalone plugin (`src/…`), its `bpl-tools` imports are
   2 levels too shallow — deepen every `../bpl-tools` by two `../`. `src/admin/**`
   uses `../../../../bpl-tools` (do NOT change those).
2. **Clean stale build artifacts.** A prior single-block build left files at
   `build/` root. Delete `build/` before a fresh `npm run build` so only
   `build/blocks/*` + shared `build/blocks/index.*` + `admin-*` remain.
3. **Shared pro bundle.** Pro blocks use `editorScript: file:../index.js` →
   `src/blocks/index.js` → `build/blocks/index.js`. The flagship + selector keep
   their own `file:./index.js` bundles.
4. **Linter noise.** IDE `PHP0417 "Call to unknown function"` warnings for
   `add_action`/`register_block_type`/etc. are just missing WP stubs — not errors.
5. **Import from `@wordpress/*`, never the `wp.*` global, in block editor JS.**
   wp-scripts only records a dependency for `@wordpress/*` imports. Using
   `wp.blocks`/`wp.blockEditor`/`wp.data` globals yields an asset file with only
   `array('react')`, so WordPress can run the block script before those globals
   exist → it throws and the block never registers (this broke the selector block;
   see prompt 003). Check the built `*/index.asset.php` includes `wp-blocks`,
   `wp-block-editor`, `wp-data` for any editor block.

## How to add a NEW Click To Copy block (scalable path)

1. Create `src/blocks/<new-block>/` following the standard block layout (copy an
   existing pro block as a template). `block.json`: `apiVersion 3`, `name`
   `ctcb/<slug>`, `category "click-to-copy"`, dynamic (`render.php` + `view.js`, no
   `save`); for a **pro** block use `editorScript: file:../index.js` +
   `editorStyle: file:../index.css`.
2. If **pro**, add it to `src/blocks/index.js` `proBlocks` map (keyed by folder name).
   If **free/always-on**, add the folder name to `CTC_Init::$free_blocks`
   (`inc/Init.php`).
3. Add it to `src/admin/utils/blocks.js` (name = folder, title, icon, `isPremium`,
   optional `required`) so it appears in the dashboard block manager.
4. Add an icon to `src/utils/icons.js`, and (to show it in the ShortCode selector)
   an entry in `src/utils/options.js` `ctcTemplates` (className = folder name).
5. `npm run build`. PHP auto-discovers `build/blocks/<new-block>` — no PHP change
   needed for registration (only the free/pro list if it's free).
6. Nothing else: category, enable/disable, CTC_BLOCK_DATA, and (for pro) the shared
   editor bundle all pick it up automatically.

## Key files map

| Concern | File(s) |
|---|---|
| Block registration + category + gating | `inc/Init.php` |
| Editor data bridge (`CTC_BLOCK_DATA`) | `inc/Enqueue.php` |
| Enable/disable AJAX (`ctcGetBlocks`) | `inc/RestAPI.php` |
| Shortcode CPT + `[ctc]` + template | `inc/ShortCode.php` |
| Shared pro editor bundle | `src/blocks/index.js` |
| Shortcode selector block | `src/blocks/parent/` |
| Selector block list | `src/utils/options.js` |
| Shortcode copy widget (pro) | `src/components/ClipBoard.js` |
| Dashboard block manager | `src/admin/Components/App.js` + `utils/blocks.js` + `hooks/useBlocksSettings.js` |
| Dashboard content/data | `src/admin/utils/data.js` |

_Last updated: 2026-07-15_
