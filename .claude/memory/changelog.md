# Changelog — `.claude` workspace & implementation

Dated log of changes to the plugin and this workspace. (The plugin's user-facing
changelog lives in `src/admin/utils/data.js` / `readme.txt`.)

## 2026-07-15 — Fix: license key copy in dashboard Activation (prompt 005)

- Symptom: License key couldn't be copied from the dashboard's License Activation
  section.
- Root cause: shared `bpl-tools/Admin/Activation` `copyLicense()` used only
  `navigator.clipboard.writeText()`, which is `undefined` in non-secure contexts
  (http://*.local Local sites) → threw, swallowed, nothing copied.
- Fix: added a temporary-textarea + `document.execCommand('copy')` fallback when
  `navigator.clipboard`/`window.isSecureContext` is unavailable. This page is a
  normal admin page (not an iframe), so the fallback is reliable.
- Scope: edits shared **bpl-tools** (benefits all bPlugins products on their next
  rebuild). Rebuilt click-to-copy-pro → 0 errors.

## 2026-07-15 — Fix: shortcode copy failing on the 7 pro blocks (prompt 004)

- Symptom: the `[ctc id=N]` copy widget copied in the flagship but not the 7 pro
  blocks (widget rendered in all — confirmed in the built bundle).
- Root cause: the shared `src/components/ClipBoard.js` used
  `navigator.clipboard` + a `document.execCommand('copy')` fallback. The editor
  canvas is an iframe but block code runs in the parent realm, so the fallback
  copied against the wrong document/selection and silently failed when
  `navigator.clipboard` was unavailable/blocked.
- Fix: rewrote the shared ClipBoard to use `useCopyToClipboard` from
  `@wordpress/compose` (clipboard.js; iframe-safe), ref attached to the input
  wrapper (input + button both copy). Markup/classes/styles unchanged.
- Verified: build 0 errors; `build/blocks/index.asset.php` now includes
  `wp-compose`. Flagship's own ClipBoard left as-is (worked; out of scope).
- Learning: in-editor copy must use `useCopyToClipboard`, not hand-rolled
  navigator.clipboard/execCommand, because of the editor iframe.

## 2026-07-15 — Fix: Pro selector block not loading (prompt 003)

- Root cause: `src/blocks/parent/{index.js,Edit.js}` used the global `wp.*`
  objects, so wp-scripts recorded only `array('react')` in
  `build/blocks/parent/index.asset.php` (missing `wp-blocks`, `wp-block-editor`,
  `wp-data`). No load-order guarantee → the selector bundle could run before those
  globals existed and throw before `registerBlockType`, so
  `ctcb/click-to-copy-selector` never registered and the CPT template block showed
  as unavailable.
- Fix: converted the selector to `@wordpress/*` imports (registerBlockType,
  useBlockProps, createBlock/getBlockType, dispatch/select). Behavior unchanged.
- Verified: asset deps now `array('react','wp-block-editor','wp-blocks','wp-data')`;
  build 0 errors. Template `[[ 'ctcb/click-to-copy-selector' ]]` now loads.
- Learning: selector/editor-only blocks that use `wp.*` globals get incomplete
  asset deps — always import from `@wordpress/*` so deps + load order are correct.

## 2026-07-15 — Shortcode system (prompt 002)

Implemented the Info Cards-style shortcode experience:
- NEW selector block `src/blocks/parent/` (`ctcb/click-to-copy-selector`) — block
  chooser grid (icon + name + description; disabled-hide + pro-locked states;
  click → replaceBlock + re-lock on the `ctc` CPT).
- NEW `src/utils/options.js` `ctcTemplates` (all 8 blocks; className = folder name).
- NEW shared `src/components/ClipBoard.js` + `.scss` (the `[ctc id=N]` copy widget).
- 7 pro blocks' `Edit.js`: render the ClipBoard at the top when `CPTType === 'ctc'`
  (added `withSelect` for `currentPostId` + post type). Flagship already did this.
- `inc/ShortCode.php`: CPT template now premium-aware (premium → selector, free →
  flagship).
- `inc/Init.php`: `parent` added to the free-blocks list (always registered).
- Main plugin file: `ShortCode.php` loads for **both free and pro**.
- Build: 0 errors; `build/blocks/parent` present; shortcode CSS in shared bundle.
- Existing `[ctc id=N]` shortcodes remain backward compatible.

## 2026-07-15 — Multi-block architecture refactor (prompt 001)

- `block.json` × 8: category → `click-to-copy`; 7 pro blocks → shared
  `editorScript`/`editorStyle` (`file:../index.js` / `../index.css`).
- NEW `src/blocks/index.js` (shared pro bundle; conditional-require; skip disabled).
- NEW `src/utils/icons.js` (dashboard/block icons; fixed the broken `gridIcon`
  import in `src/admin/utils/data.js`).
- NEW `src/admin/utils/blocks.js` + `src/admin/hooks/useBlocksSettings.js`; wired
  bpl-tools `Blocks` into `App.js` (`/blocks`) + `Layout.js` nav; added
  `action`/`adminNonce` to `data.js` and both admin menus' `data-info`.
- NEW PHP `inc/Init.php` (scan+register `build/blocks/*`, category, free/pro +
  disabled gating, shared `ctc-pro-blocks` handle), `inc/Enqueue.php`
  (`CTC_BLOCK_DATA`), `inc/RestAPI.php` (`ctcGetBlocks` AJAX ↔ `ctcBlocks` option).
- Rewired `click-to-copy-block.php` (require the inc classes; removed the single
  `register_block_type(__DIR__.'/build')`).
- **Fixed** a pre-existing build blocker: all `bpl-tools` relative imports under
  `src/blocks/**` were 2 levels too shallow (standalone-plugin origin); deepened
  by two levels (28 files). Build verified: all blocks compile to `build/blocks/*`.

_No block design/attributes/frontend behavior changed in either task._
