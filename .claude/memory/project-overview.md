# Project Overview

## What this is

**Click To Copy (Pro)** is a bPlugins WordPress Gutenberg **multi-block** plugin
(entry `click-to-copy-block.php`, text domain `clipboard`, Freemius product id
`20412`). As of 2026-07-15 it was refactored from a single-block plugin into a
multi-block plugin whose architecture is **identical to the Info Cards plugin**
(`../info-cards/`).

- **Free flagship block**: `ctcb/click-to-copy` (title "Click to Copy") — the
  one-click copy block with 15+ themes/forms (Default + Form1–15, Form5–15 pro-gated).
- **7 Pro blocks** (registered only when premium): Terminal Install, Secret API
  Key, Neon Coupon, Palette Swatches, Code Block, Progress Ring, ChatGPT Prompt.
- **React admin dashboard** (Welcome / Blocks / Demos / Pricing / Feature
  Comparison / Activation / Our Plugins / Settings) built from `bpl-tools/Admin/*`.
- **Enable/Disable** block manager (bpl-tools `Blocks` page) backed by the
  `ctcBlocks` WP option.
- **Custom category** `click-to-copy` groups all blocks in the inserter.
- **Shortcode** `[ctc id="N"]` via the `ctc` custom post type (pro).
- **Freemius** free/pro licensing (lite vs premium SDK) via `ctc_fs()`.

## Free vs Pro model (mirrors Info Cards)

- Free = flagship `click-to-copy` only, and it is `required` (cannot be disabled).
- Pro = the other 7 blocks; registered in PHP only when `bpctcPremiumChecker()`
  is true, and bundled into a single shared editor bundle.
- The flagship's individual pro *forms* (Form5–15) remain gated by the existing
  `ctcbpipecheck` (editor) / `bpctcPremiumChecker()` (frontend) mechanism —
  untouched by the refactor.

## Tech stack

- **PHP 7.4+ / WordPress** — plugin bootstrap, multi-block registration, category,
  enable/disable, shortcode CPT, admin dashboard, Freemius.
- **React 18 / JSX** — editor (`edit`) + frontend (`view.js`) share `Components/Common`
  renderers; dashboard is React (HashRouter).
- **SCSS**, **immer**, **`@wordpress/scripts` ^27.9** (webpack).
- **bpl-tools** — sibling shared library (Admin pages, Inspector controls,
  `getCSS` helpers, hooks). Consumed via relative imports.

## Rendering model

Every block is dynamic (`save` returns null; there is no static save). `render.php`
prints an empty mount `<div>` with `data-attributes`; `view.js` hydrates React on
the frontend, sharing `Common/Style.js` (scoped dynamic CSS) + `Common/…/OneCard.js`
with the editor. Identical to Info Cards.

## Directory layout (source)

```
click-to-copy-pro/
├── click-to-copy-block.php     (entry: Freemius + CTC_ constants + requires inc/*)
├── inc/
│   ├── Init.php                (NEW — scan+register build/blocks/*, category, gating)
│   ├── Enqueue.php             (NEW — localize CTC_BLOCK_DATA)
│   ├── RestAPI.php             (NEW — ctcGetBlocks AJAX)
│   ├── AdminMenu.php           (free dashboard menu — data-info + action/adminNonce)
│   ├── ProAdminMenu.php        (pro dashboard menu — data-info + action/adminNonce)
│   ├── ShortCode.php           (ctc CPT + [ctc] shortcode)
│   └── LicenseActivation.php   (pro)
├── src/
│   ├── admin/                  (React dashboard: dashboard.js, Components, hooks, utils)
│   ├── blocks/
│   │   ├── index.js            (NEW — shared pro-block editor bundle; skips disabled)
│   │   ├── click-to-copy/      (FREE flagship — own bundle)
│   │   └── <7 pro blocks>/     (shared editor bundle via file:../index.js)
│   └── utils/icons.js          (NEW — shared dashboard/block icons)
├── build/                      (compiled — build/blocks/* + shared index.* + admin-*)
├── freemius/ freemius-lite/    (Freemius SDK)
├── languages/  assets/
├── package.json  webpack.config.js
└── .claude/                    (this workspace)
```

## Build

- `npm run build` / `npm run start` → `wp-scripts build --webpack-copy-php`.
- `webpack.config.js` adds `admin-dashboard` + `admin-post` entries (identical to
  Info Cards). Block entries auto-discovered from `src/blocks/**/block.json`.
- Output: `build/blocks/<block>/` per block; `build/blocks/index.*` shared pro
  bundle; `build/admin-dashboard.*`, `build/admin-post.*`.
- `CTC_PLUGIN_VERSION = time()` on localhost (cache-bust), else the version string.

_Last updated: 2026-07-15_
