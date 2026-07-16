# Coding Standards & Conventions

Follows the Info Cards conventions (`../info-cards/.claude/memory/coding-standards.md`).
CTC-specific values below.

## Prefixes & namespaces

| Context | Pattern | Examples |
|---|---|---|
| PHP constants | `CTC_` | `CTC_PLUGIN_VERSION`, `CTC_DIR_URL`, `CTC_DIR_PATH`, `CTC_HAS_PRO`, `CTC_HAS_FREE` |
| PHP classes | `CTC*` (no namespace) | `CTC_Init`, `CTC_Enqueue`, `CTC_RestAPI`, `CTC_Shortcode`, `CTCadminMenu`, `CTCproAdminMenu`, `CTCBClickToCopy` |
| PHP global fns | `bpctc*` / `ctc_*` | `bpctcPremiumChecker()`, `ctc_fs()` |
| WP options | `ctc*` | `ctcBlocks` (disabled list), `ctcDeleteDataOnUninstall` |
| AJAX actions | `ctc*` | `ctcGetBlocks`, `ctcSaveUninstallOption` |
| Nonces | descriptive | `ctc_admin_nonce`, `ctc_save_uninstall_option`, `ctcCreatePage`, `bplLicenseActive` |
| Localized JS global | `CTC_BLOCK_DATA` | `{ disabledBlocks, isPremium }` |
| Block namespace | `ctcb/` | `ctcb/click-to-copy`, `ctcb/click-to-copy-selector`, `ctcb/terminal-install`, … |
| Editor premium flag (flagship) | `ctcbpipecheck` | injected via `wp_add_inline_script` |
| Shortcode | `[ctc id="N"]` | CPT slug `ctc` |
| Category | `click-to-copy` | all blocks |

## Folder / naming conventions

- Blocks live in `src/blocks/<folder>/`; **folder name is the canonical id** used by
  PHP scan registration, `ctcBlocks`, the shared bundle map, `admin/utils/blocks.js`
  `name`, and `utils/options.js` `className`. Keep the historical typos consistent
  (`secrete-api-key`, `plette-swatches`, `procesing-king`, `chatGPT-prompt`).
- Standard block layout (matches Info Cards): `block.json`, `index.js`, `render.php`,
  `view.js`, `editor.scss`, `style.scss`, `Components/Backend/{Edit,Settings/*}`,
  `Components/Common/{Style.js, <x>/OneCard.js}`, `utils/*`.
- PascalCase components (`Edit.js`, `OneCard.js`, `ClipBoard.js`); camelCase utils.
- Pro blocks: `editorScript`/`editorStyle` → shared `file:../index.js` / `../index.css`;
  flagship + selector keep their own `file:./index.js`.
- Text domain: `clipboard` (flagship, selector, PHP). Pro blocks currently use
  `b-blocks` in their `block.json` (pre-existing; not normalized).

## Editor conventions

- Dynamic blocks: `registerBlockType(metadata, { edit, icon })`, no `save`.
- Read post context via `withSelect(select => ({ currentPostId: …getCurrentPostId(), CPTType: …getCurrentPostType() }))`.
- Dynamic CSS via bpl-tools `getCSS` helpers scoped to `block-${clientId}` (editor) /
  `wp_unique_id` (frontend). See `../info-cards/.claude/docs/bpl-tools-reference.md`.
- Reuse `bpl-tools` controls/hooks; never re-implement.

_Last updated: 2026-07-15_
