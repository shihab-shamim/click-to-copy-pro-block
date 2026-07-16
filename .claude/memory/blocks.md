# Block Inventory

11 → actually **8 registered blocks**: 1 free flagship + 7 pro. The **folder name**
(under `src/blocks/` and `build/blocks/`) is the key used by PHP registration, the
disabled list (`ctcBlocks`), the editor bundle map, and `src/admin/utils/blocks.js`.
Several folder names carry historical typos — keep them consistent everywhere.

## Registration matrix

| Folder | block.json `name` | Free/Pro | required | editorScript | textdomain |
|---|---|---|---|---|---|
| `click-to-copy` | `ctcb/click-to-copy` | **Free** | ✅ | `file:./index.js` (own) | `clipboard` |
| `terminal-install` | `ctcb/terminal-install` | Pro | — | `file:../index.js` (shared) | `b-blocks` |
| `secrete-api-key` | `ctcb/secret-api-key` | Pro | — | `file:../index.js` | `b-blocks` |
| `neon-coupon` | `ctcb/neon-coupon` | Pro | — | `file:../index.js` | `b-blocks` |
| `plette-swatches` | `ctcb/palette-swatches` | Pro | — | `file:../index.js` | `b-blocks` |
| `code-block` | `ctcb/code-block` | Pro | — | `file:../index.js` | `b-blocks` |
| `procesing-king` | `ctcb/progress-ring` | Pro | — | `file:../index.js` | `b-blocks` |
| `chatGPT-prompt` | `ctcb/chatgpt-prompt` | Pro | — | `file:../index.js` | `b-blocks` |

All blocks: `category: "click-to-copy"`, dynamic (`save` null), `render.php` mount
node + `view.js` React hydration.

### Folder-name typos (intentional, do not "fix" without a rename pass)
- `secrete-api-key` (block name is correct `secret-api-key`)
- `plette-swatches` (block name `palette-swatches`)
- `procesing-king` (block name `progress-ring`)

These must match between `src/blocks/<folder>`, `build/blocks/<folder>`,
`src/admin/utils/blocks.js` `name`, and `src/blocks/index.js` keys.

## Flagship: `click-to-copy` (`ctcb/click-to-copy`)

- `apiVersion: 2`; own editor bundle (`editorScript: ["file:./index.js","wp-api"]`).
- Themes/forms: Default + Form1–4 (free) and Form5–15 (pro), selected via
  `BlockPreview`; `Components/Common/Forms/*` (free) + `Components/Common/ProForms/*`.
- Pro gating for forms uses `ctcbpipecheck` (editor global, injected via
  `ctcEnqueueBlockEditorAssets`) and `bpctcPremiumChecker()` (frontend, read in
  `render.php`). **Independent of the multi-block system — leave intact.**
- Editor `Edit.js` shows a shortcode ClipBoard when `CPTType === 'ctc'`.

## Pro blocks — common pattern (all 7)

```
<block>/block.json · index.js · render.php · view.js · editor.scss · style.scss
  Components/Backend/Edit.js
  Components/Backend/Settings/{Settings,General/General,Style/Style}.js
  Components/Backend/richtext/RichTextComponents.js   (most)
  Components/Common/Style.js                           (scoped dynamic CSS)
  Components/Common/<x>/OneCard.js [+ index.html]      (renderer, editor+frontend)
  utils/functions.js · icons.js · options.js
```
- `index.js`: `registerBlockType(metadata, { icon: blockIcon, edit: Edit })`.
- Editor bundle: shared `src/blocks/index.js` requires each (skipping disabled).
- `<x>` folder per block: `terminal`, `glasskey`, `coupon`, `palette`, `codeblock`,
  `ring`, `prompt`.
- `code-block` also ships `utils/highlight.js` + `utils/themes.js`.
- `plette-swatches` also ships `Components/AdvColorControl/*` (custom control).

## Selector block (`parent` → `ctcb/click-to-copy-selector`)

Added 2026-07-15 for the ShortCode system (mirrors Info Cards `parent`). Folder
`src/blocks/parent/`; free + always-registered (in `CTC_Init` free list);
`inserter:false`; own editor bundle (`file:./index.js`). Shown as the `ctc` CPT
template for **premium** users; clicking a card replaces it with the chosen block.
Fed by `src/utils/options.js` `ctcTemplates` (name/block/icon/className/description);
`className` = folder name (for the disabled-hide check + per-block colours in
`editor.scss`). NOT listed in the dashboard block manager (like Info Cards parent).

The flagship's own `BlockPreview` still handles theme/form selection within the
Click To Copy block itself — that is separate from this shortcode selector.

## Shortcode copy widget

`src/components/ClipBoard.js` (+ `.scss`) — shared shortcode `[ctc id=N]` copy
widget, rendered at the top of a block's editor only when `CPTType === 'ctc'`.
Used by the 7 pro blocks (added to each `Edit.js` via `withSelect`). The flagship
uses its own identical `Components/Backend/ClipBoard.js` (unchanged).

_Last updated: 2026-07-15_
