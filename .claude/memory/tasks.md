# Tasks

## Completed

- **2026-07-15** — Multi-block architecture refactor (prompt 001): auto-discovery
  registration, category `click-to-copy`, enable/disable manager, shared pro
  bundle, PHP inc classes, fixed bpl-tools import depths. Build verified.
- **2026-07-15** — Shortcode system (prompt 002): selector block, premium-aware
  `ctc` CPT template, `[ctc id=N]` copy widget on all blocks, ShortCode loads for
  free + pro. Build verified.

## In progress

- _None._

## Pending / backlog (discovered — need explicit go-ahead)

1. `src/blocks/index.js` includes `click-to-copy` in the shared pro bundle while
   the flagship also has its own bundle → benign "block already registered" console
   notice when premium. Decide whether to remove it from the shared bundle. (Left
   as-is per user's intentional edit.)
2. Verify the whole flow in a live WP install: premium selector → pick each block →
   `[ctc id=N]` copies → frontend renders. (Only the build has been verified here.)
3. Optional: give the selector cards real per-block preview thumbnails instead of
   icons (task said "Preview/Icon").
4. Consider a shared `src/components` for other duplicated block helpers.

_Last updated: 2026-07-15_
