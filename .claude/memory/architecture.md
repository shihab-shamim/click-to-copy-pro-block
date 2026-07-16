# Architecture — Click To Copy (Pro), end-to-end

Mirrors the Info Cards architecture (`../info-cards/.claude/memory/architecture.md`).
Only the parts specific to this plugin are detailed; the patterns are the same.

## 1. PHP bootstrap chain

```
click-to-copy-block.php
  ├─ Freemius init (ctc_fs) — lite vs premium by CTC_HAS_PRO
  ├─ defines CTC_PLUGIN_VERSION / CTC_DIR_URL / CTC_DIR_PATH / CTC_ASSETS_DIR / CTC_HAS_FREE / CTC_HAS_PRO
  ├─ bpctcPremiumChecker()  (premium flag)
  ├─ requires (pro): inc/ShortCode.php, inc/ProAdminMenu.php, inc/LicenseActivation.php
  │           (free): inc/AdminMenu.php
  ├─ requires (always): inc/Init.php, inc/Enqueue.php, inc/RestAPI.php   ← multi-block core
  └─ class CTCBClickToCopy : translations, settings (bpctcUtils),
        default_title/content, ctcSaveUninstallOption, ctcbpipecheck inline
```

Block **registration** is no longer in `CTCBClickToCopy` — it moved to `CTC_Init`.
The old `register_block_type(__DIR__ . '/build')` line was removed.

## 2. Multi-block registration (`inc/Init.php` → `CTC_Init`)

`add_action('init')` → `registerBlocks()`:
1. `scandir(build/blocks/)`, collect subdirectories (skips the shared `index.*`).
2. `$disabled = get_option('ctcBlocks', [])` (array of disabled folder names).
3. `$is_premium = bpctcPremiumChecker()`.
4. If premium, register the shared **`ctc-pro-blocks`** script+style handles from
   `build/blocks/index.js` / `index.css` (deps/version from `build/blocks/index.asset.php`).
5. For each block folder:
   - skip if in `$disabled`;
   - if in `$free_blocks` (`['click-to-copy']`) → `register_block_type($path)` (own bundle);
   - else (pro) → only if premium: `register_block_type($path, ['editor_script'=>'ctc-pro-blocks','editor_style'=>'ctc-pro-blocks'])`.

**Category**: `block_categories_all` filter prepends `{slug:'click-to-copy', title:'Click To Copy'}`
once (dedup-guarded). Every block.json sets `"category":"click-to-copy"`.

## 3. Editor data bridge (`inc/Enqueue.php` → `CTC_Enqueue`)

`enqueue_block_assets` → `wp_localize_script('wp-blocks','CTC_BLOCK_DATA',{ disabledBlocks, isPremium })`.
The shared pro bundle reads `window.CTC_BLOCK_DATA.disabledBlocks` to skip disabled
blocks; block editor code can read `isPremium`.

## 4. Shared pro bundle + lazy skip (`src/blocks/index.js`)

- The 7 pro blocks declare `editorScript: file:../index.js` → wp-scripts dedupes
  them into one entry `build/blocks/index.js`.
- `src/blocks/index.js` `require()`s each pro block's `index.js` **only if** its
  folder name isn't in `CTC_BLOCK_DATA.disabledBlocks`.
- The flagship `click-to-copy` keeps `editorScript: file:./index.js` (own bundle),
  so free users never load pro editor code.
- Net gating (identical to Info Cards): disabled blocks skipped in BOTH PHP and the
  editor bundle; pro blocks gated by premium in PHP.

## 5. Dynamic block + frontend hydration (all blocks)

1. `index.js`: `registerBlockType(metadata, { edit, icon })` — no `save` (dynamic).
2. `render.php`: prints an empty `<div>` with `id` + `data-attributes` (JSON).
3. `view.js`: on `DOMContentLoaded`, per `.wp-block-ctcb-<name>`, parse
   `data-attributes`, `createRoot(el).render(<><Style id=el.id/><OneCard/></>)`,
   remove the data attribute.
4. `Edit.js`: renders the same `Common/Style.js` + `Common/…/OneCard.js` live.

## 6. Dynamic CSS (`Components/Common/Style.js` per block)

Scoped `<style>` keyed to the block id, values via **bpl-tools `getCSS`** helpers
(`getBackgroundCSS/getBorderCSS/getBoxCSS/getColorsCSS/getMultiShadowCSS/getTypoCSS`)
and breakpoints from `bpl-tools/utils/data`. Same in editor and frontend.
See `../info-cards/.claude/docs/bpl-tools-reference.md`.

## 7. Admin dashboard (React)

```
AdminMenu/ProAdminMenu render <div id="CTCBClickToCopy" data-info='<json>'>
  data-info = { version, isPremium, hasPro, licenseActiveNonce, nonce (ctcCreatePage),
                action:'ctcGetBlocks', adminNonce (ctc_admin_nonce), adminUrl,
                deleteDataOnUninstall, uninstallNonce }
src/admin/dashboard.js → createRoot(#CTCBClickToCopy).render(<App {...dashboardInfo(info)}/>)
App.js → HashRouter + Layout:
   /welcome, /blocks (bpl-tools Blocks + useBlocksSettings + utils/blocks.js),
   /demos, /pricing & /feature-comparison (free only), /activation (hasPro),
   /our-plugins, /settings (ajaxAction 'ctcSaveUninstallOption')
Layout.js → bpl-tools Header + nav (Welcome, Blocks, Demos, Pricing, Feature Comparison, License Activation, Settings)
```

## 8. Enable/Disable workflow

1. Source of truth: `src/admin/utils/blocks.js` — `{name(=folder), title, icon, isPremium, required}`.
   `click-to-copy` is `required:true`; the 7 pro blocks `isPremium:true`.
2. `/blocks` page = bpl-tools `Blocks`, fed by `useBlocksSettings('ctcGetBlocks', adminNonce)`
   (wraps `useWPAjax`). Toggling calls `saveToBackend(disabledArray)`.
3. Persistence: `CTC_RestAPI::ctcGetBlocks_callback()` verifies `ctc_admin_nonce` +
   `manage_options`, then `update_option('ctcBlocks', $data)`; echoes it back.
4. Effect: PHP `CTC_Init` skips disabled folders; the editor bundle skips their
   `require()`; disabled blocks are neither registered nor asset-loaded.

## 9. AJAX / settings surface

| Action | Nonce | Purpose |
|---|---|---|
| `wp_ajax_ctcGetBlocks` | `ctc_admin_nonce` | get/set `ctcBlocks` (disabled list) |
| `wp_ajax_ctcSaveUninstallOption` | `ctc_save_uninstall_option` | set `ctcDeleteDataOnUninstall` |
| setting `bpctcUtils` | — | stores a `wp_ajax` nonce for the editor |

## 10. Shortcode (`inc/ShortCode.php`, free + pro) — mirrors Info Cards

Loaded for **both free and pro** (required in the main plugin file outside the
premium branch). Registers the `ctc` CPT (private, `show_in_menu` under the
dashboard, block editor forced on, `template_lock: 'all'`).

- **CPT template is premium-aware** (like Info Cards):
  - Premium → `[['ctcb/click-to-copy-selector']]` (the block chooser).
  - Free → `[['ctcb/click-to-copy']]` (the flagship directly).
- `[ctc id="N"]` → `displayContent()` → `render_block(parse_blocks($post->post_content)[0])`
  — re-renders the stored block through the normal dynamic pipeline. Backward
  compatible with existing shortcodes.
- Admin list adds a copy-to-clipboard "ShortCode" column; `admin-post.*`
  enqueued on the `ctc` screens.

### Selector block (`src/blocks/parent`, `ctcb/click-to-copy-selector`)
- Free + always-registered (`parent` is in `CTC_Init`'s free list); `inserter:false`.
- Editor (`Edit.js`) renders a grid of cards from `src/utils/options.js`
  `ctcTemplates` (icon + name + short description). Hides any block whose folder
  name is in `CTC_BLOCK_DATA.disabledBlocks`; marks unavailable (`!getBlockType`)
  blocks as `pro-locked` with a Pro badge.
- Clicking a card `replaceBlock`s the selector with the chosen block (unlocks
  `templateLock` momentarily, re-locks on the `ctc` CPT after 100ms) — the chosen
  block then renders its own preview/settings.

### Shortcode display (the `[ctc id=N]` copy widget)
- Rendered at the top of a block's editor **only when `CPTType === 'ctc'`**.
- The flagship uses its own `Components/Backend/ClipBoard.js`; the 7 pro blocks
  use the shared `src/components/ClipBoard.js` (identical UI/behavior). Both wired
  via `withSelect` reading `currentPostId` + `getCurrentPostType`.
- The id-based shortcode (`[ctc id=N]`) is constant per post, so it stays visible
  and consistent regardless of which block is selected.

## 11. Asset loading / performance

- **Per-block `view.js`/`view.css`** auto-enqueued only where a block is present
  (block.json `viewScript`/`style`).
- **Shared pro editor bundle** (`ctc-pro-blocks`) registered/enqueued only when
  premium; disabled blocks skipped inside it.
- **Free users** never load pro editor code (flagship has its own bundle).
- **No frontend HTML in DB** (dynamic render → tiny `post_content`).

## 12. Relationships

Dashboard `/blocks` → `ctcBlocks` option → `CTC_Init` (register/skip) + editor
bundle (skip). Blocks → category `click-to-copy`. Blocks → dynamic CSS (bpl-tools
getCSS). Blocks → `render.php` mount + `view.js` hydration. Premium
(`bpctcPremiumChecker`/`CTC_BLOCK_DATA.isPremium`) gates pro block registration and
the flagship's pro forms.

_Last updated: 2026-07-15_
