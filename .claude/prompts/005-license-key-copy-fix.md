# Prompt 005 — License key can't be copied from the License Activation dashboard section

**Date:** 2026-07-15
**Type:** Bug fix (dashboard clipboard).

## Verbatim prompt

> The license key cannot be copied from the License Activation section in the
> dashboard. Please fix this issue as well.

## Diagnosis

The License Activation page is the shared `bpl-tools/Admin/Activation` component
(there is no plugin-level copy of it). Its `copyLicense()` used **only**
`navigator.clipboard.writeText()` inside a try/catch that just `console.error`s on
failure. `navigator.clipboard` is `undefined` in a **non-secure context** — which
is common for Local sites served over `http://<site>.local` (not https / not
`localhost`). So the call throws, is swallowed, and nothing is copied, with no
fallback. (Unlike the block editor case in prompt 004, this page is a normal admin
page — not an iframe — so an execCommand textarea fallback works reliably here.)

## Fix

Edited `bpl-tools/Admin/Activation/index.js` `copyLicense()`:
- Try the async Clipboard API only when `navigator.clipboard && window.isSecureContext`.
- Otherwise fall back to a temporary off-screen `<textarea>` + `document.execCommand('copy')`.
- Success feedback (`setCopied`) fires in both paths.

Self-contained, no new imports, backward compatible.

## Scope note

This is a change to the **shared `bpl-tools` library**, so every bPlugins product
using the Activation page benefits — but only after each plugin rebuilds its
`admin-dashboard` bundle (bpl-tools is compiled per-plugin). Only the copy method
changed; UI/markup unchanged.

## Verification

- Rebuilt `click-to-copy-pro` (`npm run build`) → 0 errors; the fix is compiled
  into `build/admin-dashboard.js`.
