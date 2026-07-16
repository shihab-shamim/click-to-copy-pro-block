# Prompt 002 — Implement the Shortcode functionality to match Info Cards exactly

**Date:** 2026-07-15
**Type:** Feature (shortcode UI + workflow). Do not modify unrelated code/behavior.

## Verbatim prompt (condensed)

> Implement the **Shortcode** functionality to match the **Info Cards** plugin
> exactly. Replicate the shortcode workflow, UI, and behavior while keeping the
> rest of the project unchanged.
>
> **Free Version** — show only the Click To Copy block in the shortcode section;
> panel matches Info Cards; show the generated shortcode at the top; clean UI.
>
> **Pro Version** — show all Click To Copy blocks in the shortcode interface;
> same block-selection layout as Info Cards; each block shows preview/icon, name,
> short description; clicking a block selects it, updates the shortcode at the top,
> and loads the block preview/settings exactly like Info Cards.
>
> **Shortcode Behavior** — generate the shortcode dynamically from the selected
> block; copy works; shortcode always visible at the top; updates instantly when a
> different block is selected.
>
> **UI & UX** — mirror the Info Cards experience (selection layout, card design,
> selection/active state, shortcode display, copy button, responsive layout).
>
> **Compatibility** — works in Free and Pro; existing shortcodes keep working.
>
> **Important** — Only implement the shortcode functionality/UI described; do not
> modify any other code, architecture, functionality, styling, or block behavior.

## Design mapping (Info Cards → Click To Copy)

| Info Cards | Click To Copy |
|---|---|
| `icb` CPT | `ctc` CPT (already existed) |
| `[icb id=N]` | `[ctc id=N]` |
| `parent` block `icb/info-cards-selector` | NEW `parent` block `ctcb/click-to-copy-selector` |
| `src/utils/options.js infoCardsTemplates` | NEW `src/utils/options.js ctcTemplates` |
| `src/components/ClipBoard.js` | NEW shared `src/components/ClipBoard.js` (pro blocks) |
| premium template = selector, free = flagship | same, via `bpctcPremiumChecker()` |

## What was implemented

- **Selector block** `src/blocks/parent/` (block.json `ctcb/click-to-copy-selector`,
  index.js, Edit.js, editor.scss) — grid of block cards (icon + name + description),
  disabled-hide + pro-locked states, click → `replaceBlock` + re-lock on `ctc`.
- **`src/utils/options.js`** `ctcTemplates` for all 8 blocks (className = folder name).
- **Shared `src/components/ClipBoard.js` + `.scss`** (copy of the flagship's) — the
  `[ctc id=N]` copy widget for the pro blocks.
- **7 pro blocks' `Edit.js`** — render `<ClipBoard>` at top when `CPTType==='ctc'`
  (added `withSelect` for `currentPostId` + `getCurrentPostType`). The flagship
  already did this (unchanged).
- **`inc/ShortCode.php`** — CPT template is now premium-aware: premium → selector,
  free → flagship.
- **`inc/Init.php`** — added `parent` to the free-blocks list (always registered).
- **Main plugin file** — `ShortCode.php` now loads for **both free and pro** (moved
  out of the premium-only branch).
- Rebuilt (`npm run build`): 0 errors; `build/blocks/parent` present; shortcode
  styles bundled into the shared pro `index.css`.

## Notes / decisions

- The shortcode `[ctc id=N]` is id-based (constant per post), so "updates when a
  different block is selected" = it stays visible/consistent — matches Info Cards
  (which also renders the copy widget per-block, not as a separate live container).
- Existing shortcodes keep working (`render_block` of the stored block; behavior
  unchanged).
- `src/blocks/index.js` was modified externally to also include `click-to-copy` in
  the shared pro bundle (intentional per the user); left as-is. Note this means the
  flagship can be registered by both its own bundle and the shared bundle when
  premium — a benign "already registered" console notice; out of scope here.
- Did NOT modify any block's design, attributes, frontend, or normal-context
  behavior — the ClipBoard only renders inside the `ctc` CPT editor.
