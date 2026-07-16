# Prompt 004 — Shortcode copy works in the flagship but not the other 7 blocks

**Date:** 2026-07-15
**Type:** Bug fix (editor shortcode copy).

## Verbatim prompt

> The shortcode cannot be copied directly from the editor. However, it works
> correctly in the Click to Copy block. The other seven blocks do not support
> copying. Why is this happening?

## Diagnosis

- All 7 pro blocks DO render the shortcode widget (confirmed: `pfbFrontShortCode`
  is present in the built shared bundle `build/blocks/index.js`), and the shared
  `src/components/ClipBoard.js` was logically identical to the flagship's own
  `Components/Backend/ClipBoard.js`. So it was not a missing-widget/wiring issue —
  it was the copy MECHANISM.
- Both used `navigator.clipboard.writeText()` with a `document.execCommand('copy')`
  fallback (after `inputRef.select()`). In the modern WP block editor the canvas
  is an **iframe**, but block edit code runs in the **parent** realm. So the
  fallback's `document`/selection act on the parent document while the input lives
  in the iframe document → the fallback copies nothing. Whenever
  `navigator.clipboard` is unavailable/blocked (not focused / iframe permission),
  the copy silently fails. This hand-rolled approach is fragile and
  context-dependent, which is why it was inconsistent between blocks.

## Fix

Rewrote the shared `src/components/ClipBoard.js` to use WordPress's own
`useCopyToClipboard` hook from `@wordpress/compose` (clipboard.js under the hood),
which is iframe-safe and is what core uses throughout the editor. The ref is
attached to the input wrapper so clicking the input or the copy button both copy.
Markup/classes/styling unchanged (same `pfbFrontShortCode` DOM), so the UI is
identical; only the copy engine changed.

- Did NOT modify the flagship's own `ClipBoard.js` (it works; out of scope).
- Did NOT modify any child block implementation/styling.

## Verification

- `npm run build` → 0 errors.
- `build/blocks/index.asset.php` now includes `wp-compose` (+ wp-element, etc.),
  so `useCopyToClipboard` is available to the shared pro bundle.

## Follow-up (optional, not done)

For consistency the flagship's `Components/Backend/ClipBoard.js` could be switched
to the same `useCopyToClipboard` approach, but it was left as-is per scope.
