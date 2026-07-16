# `.claude` — Project Workspace & Memory

Single source of truth for the **Click To Copy (Pro)** WordPress Gutenberg
**multi-block** plugin. Stores the prompts that drive the work, the architecture,
decisions, and reference docs. Updated in the same pass as any code change.

## Structure

```
.claude/
├── README.md                  ← how the workspace works
├── prompts/                   ← verbatim archive of every prompt
│   ├── INDEX.md
│   └── 001-*.md
├── memory/
│   ├── project-overview.md    ← what this is, goals, scope
│   ├── architecture.md        ← end-to-end wiring (mirrors Info Cards)
│   ├── blocks.md              ← per-block inventory (flagship + 7 pro)
│   ├── coding-standards.md    ← naming, prefixes, conventions
│   ├── design-decisions.md    ← why things are built this way
│   ├── tasks.md               ← done / pending
│   └── changelog.md           ← dated log of changes + discoveries
└── docs/
    └── refactor-notes.md      ← build gotchas + how to add a new block
```

## Rules of engagement

1. **Every prompt is archived** verbatim in `prompts/` and indexed.
2. **Memory is kept current** after any change (tasks, changelog, and the
   affected architecture/blocks/decisions files).
3. **Decisions recorded with rationale**, absolute dates everywhere.
4. This plugin's architecture intentionally **mirrors the Info Cards plugin**
   (`../info-cards/.claude/`). When in doubt, consult Info Cards' memory.
5. **bpl-tools is a sibling shared library** — reuse its Admin pages, controls,
   hooks, and `getCSS` helpers; never re-implement. See
   `../info-cards/.claude/docs/bpl-tools-reference.md`.

_Last updated: 2026-07-15_
