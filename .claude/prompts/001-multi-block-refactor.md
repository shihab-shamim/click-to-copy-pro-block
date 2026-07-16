# Prompt 001 — Refactor Click To Copy Pro into a multi-block architecture (mirror Info Cards)

**Date:** 2026-07-15
**Type:** Architecture refactor (code changes authorized). Preserve all block UI/behavior.

## Context

Click To Copy Pro already had all 8 blocks physically copied into
`src/blocks/`, but was still wired as a single-block plugin (PHP registered only
one stale root-build block; no dashboard block manager, no category, no
enable/disable, no shared pro bundle). This prompt asked to make the architecture
identical to the Info Cards plugin while preserving every block's design and
functionality.

## Verbatim prompt (abridged headings; full intent preserved)

> Act as a senior WordPress plugin architect… Refactor the **Click To Copy Pro**
> plugin into a **multi-block architecture** identical to the **Info Cards**
> plugin while preserving all existing functionality.
>
> **Objective** — Convert the current single-block implementation into a scalable
> multi-block plugin using the same architecture, organization, and workflow as
> Info Cards (block registration, dashboard management, categories, project
> structure).
>
> **Reference Project** — Use Info Cards as the architectural reference for:
> multi-block architecture, block registration, dashboard, enable/disable blocks,
> block categories, shared utilities, shared components, build process, asset
> loading, PHP integration, folder organization.
>
> **Plugin Structure** — every block lives inside `src/blocks/` (terminal-install,
> secret-api-key, neon-coupon, palette-swatches, code-block, progress-ring, …).
>
> **Multi-Block Registration** — automatically discover and register all blocks;
> remove manual registration; shared registration utilities; scalable for future
> blocks.
>
> **Dashboard** — recreate the Info Cards dashboard: list of blocks, thumbnails/
> icons, title, description, enable/disable toggle, search, category grouping,
> settings page structure matching Info Cards.
>
> **Block Enable/Disable** — store states in WP options; register only enabled
> blocks; prevent disabled blocks from loading assets; same workflow as Info Cards.
>
> **Block Category** — custom Gutenberg category `click-to-copy`; register exactly
> once; place all blocks inside it.
>
> **Shared Components / Dynamic CSS / PHP Architecture / Asset Loading** — follow
> the same shared-component + dynamic-CSS + conditional-asset architecture as Info
> Cards; refactor PHP to match (registration, dashboard, category, enable/disable,
> shared utilities, asset loading).
>
> **Existing Blocks** — Terminal Install, Secret API Key, Neon Coupon, Palette
> Swatches, Code Block, Progress Ring, and any others must keep working with no
> visual or functional change.
>
> **Code Quality / QA** — clean modular scalable structure; verify all blocks
> register, appear under Click To Copy category, dashboard behaves like Info Cards,
> toggles work, disabled blocks not loaded, assets optimized, no JS/PHP errors,
> editor and frontend render identically, production-ready and extensible.
>
> **Project Memory** — update `.claude` with all implementation details and keep
> storing future prompts and architectural decisions.
>
> **Important** — Preserve existing UI/functionality/behavior exactly; refactor
> only the architecture to match Info Cards; do not redesign any block; ensure the
> project is scalable for many more blocks.

## Decisions taken (confirmed with the user)

1. **Free/Pro split**: only the flagship `ctcb/click-to-copy` is FREE + `required`
   (cannot be disabled). The other 7 blocks are PRO — registered only when premium.
   Mirrors Info Cards exactly.
2. **PHP structure**: mirror Info Cards' inc/ classes — new `inc/Init.php`,
   `inc/Enqueue.php`, `inc/RestAPI.php` (CTC_-prefixed classes), integrated with the
   existing `ctc_fs` Freemius bootstrap and `CTC_` constants. Kept existing
   AdminMenu/ProAdminMenu/ShortCode/LicenseActivation.
3. **Build & verify**: ran `npm run build`, fixed errors, cleaned stale build root
   artifacts. (Full WP runtime not available; build verified.)

## What was implemented

See `memory/changelog.md` (2026-07-15) and `memory/architecture.md`. Summary:
- `block.json` × 8: category → `click-to-copy`; 7 pro blocks → shared
  `editorScript/editorStyle` (`file:../index.js` / `../index.css`).
- New `src/blocks/index.js` (shared pro bundle, conditional-require, skip disabled).
- New `src/utils/icons.js` (dashboard/block icons; also fixed the pre-existing
  broken `gridIcon` import in `src/admin/utils/data.js`).
- New `src/admin/utils/blocks.js` + `src/admin/hooks/useBlocksSettings.js`; wired
  the bpl-tools `Blocks` page into `App.js` (`/blocks`) and `Layout.js` nav; added
  `action`/`adminNonce` to `data.js`.
- New PHP `inc/Init.php` (scan+register `build/blocks/*`, category, free/pro +
  disabled gating, shared `ctc-pro-blocks` handle), `inc/Enqueue.php`
  (`CTC_BLOCK_DATA`), `inc/RestAPI.php` (`ctcGetBlocks` AJAX ↔ `ctcBlocks` option).
- Rewired `click-to-copy-block.php` (require the inc classes; removed the single
  `register_block_type(__DIR__.'/build')`); added `action`/`adminNonce` to both
  admin menus' `data-info`.
- **Discovered + fixed** a pre-existing build blocker: all `bpl-tools` relative
  imports inside `src/blocks/**` were 2 levels too shallow (leftover from the
  blocks' standalone-plugin origins). Deepened them by two levels (28 files).

## Standing instructions (apply to future work)

- Preserve each block's UI/behavior; only touch architecture unless asked.
- Keep `.claude` synchronized; archive every future prompt.
- Reuse bpl-tools; keep parity with Info Cards' patterns.
- New blocks: drop a folder in `src/blocks/`, add it to `src/admin/utils/blocks.js`
  and (if pro) `src/blocks/index.js`; PHP auto-discovers it. See
  `docs/refactor-notes.md`.
