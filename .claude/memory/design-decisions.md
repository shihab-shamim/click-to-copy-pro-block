# Design Decisions (with rationale)

Mirrors the Info Cards decisions (`../info-cards/.claude/memory/design-decisions.md`);
only CTC-specific points are noted.

## D1 — Architecture mirrors Info Cards
The whole plugin intentionally copies Info Cards' patterns (dynamic blocks + React
hydration, shared pro editor bundle, scan-based registration, bpl-tools dashboard,
`ctcBlocks` enable/disable option, block category). **Why:** one shared mental model
and shared `bpl-tools` library across all bPlugins products; predictable to extend.

## D2 — Only the flagship is free; the rest are pro
`CTC_Init` free list = `['click-to-copy', 'parent']`. Pro blocks register only when
`bpctcPremiumChecker()`. **Why:** matches the free/pro product split and Info Cards.
`parent` (selector) is free/always-registered because the `ctc` CPT needs it for
premium users.

## D3 — Shortcode via a premium-aware, template-locked `ctc` CPT
`[ctc id=N]` re-renders the stored block via `render_block`. The CPT template is the
**selector** for premium and the **flagship** for free. **Why:** authors design once
in the full block editor, embed anywhere; premium users can pick any block, free
users get the one block they have. Exactly Info Cards' model.

## D4 — Shortcode copy widget rendered per-block, guarded by `CPTType==='ctc'`
Each block's `Edit.js` shows the `[ctc id=N]` ClipBoard only inside the `ctc` CPT.
**Why:** zero impact on normal block usage/frontend; the widget appears "at the top"
for whichever block is currently in the shortcode post — same as Info Cards. The id
is constant per post, so the shortcode stays consistent across selections.

## D5 — Shared vs per-block ClipBoard
Pro blocks import a new shared `src/components/ClipBoard.js`; the flagship keeps its
own identical `Components/Backend/ClipBoard.js`. **Why:** avoid duplicating the
widget across 7 pro blocks while not modifying the already-working flagship.

## D6 — className = folder name (selector + dashboard + disabled list)
`ctcTemplates[].className` and `blocks.js[].name` both equal the `src/blocks/<folder>`
name (including the historical typos `secrete-api-key`, `plette-swatches`,
`procesing-king`, `chatGPT-prompt`). **Why:** the disabled list (`ctcBlocks`), PHP
scan registration, editor bundle map, and selector hide-check must all key off the
same identifier.

## D7 — Fixed bpl-tools import depths (not a redesign)
Moving blocks under `src/blocks/<block>/` left their `bpl-tools` imports 2 levels too
shallow. Deepened uniformly. **Why:** required for the build to resolve; no behavior
change.

## D8 — Editor blocks must import from `@wordpress/*`, not the `wp.*` global
The selector block originally used `wp.blocks`/`wp.blockEditor`/`wp.data` globals
(copying Info Cards). That produced an asset file with only `array('react')` as
deps, so WordPress had no load-order guarantee and the selector could execute
before those globals existed → it threw before registering → the CPT template
block failed to load. **Fix/decision:** always `import` from `@wordpress/*` in
block editor code so wp-scripts records the real deps (`wp-blocks`,
`wp-block-editor`, `wp-data`) and WordPress loads them first. Applies to any new
editor-only/selector block.

## Known caveat
- `src/blocks/index.js` also requires `click-to-copy` (external intentional edit)
  even though the flagship has its own bundle → benign double-registration notice
  when premium. Left as-is; see `tasks.md`.

_Last updated: 2026-07-15_
