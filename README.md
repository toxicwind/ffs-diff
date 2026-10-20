# ffs-diff

Multi-file **structural diff** and **three-way merge** helper for the estate,
aware of `ffs` tree-sitter outlines. A small, dependency-light Node CLI.

## What it does

**Diff mode** — compare two (or more) files by structure first, then body:

```
ffs-diff <file1> <file2> [file3 ...] [--format json|text] [--outline] [--full]
```

- Lists **added / removed / changed** symbols (from `ffs outline`)
- Shows per-file outline counts
- `--full` adds a unified line-diff preview
- Markdown files are outlined by their heading tree

**Merge mode** — proper three-way merge against a common base:

```
ffs-diff <base> <ours> <theirs> --merge [--output <file>] [--json]
```

- Backed by git's battle-tested `merge-file` (diff3 with base anchoring)
- Regions changed on only one side are applied automatically
- Regions changed differently on both sides become conflict markers
  (`<<<<<<< ours / ======= / >>>>>>> theirs`)
- Never silently drops either side's edit
- Exit `0` clean, `1` conflicts; `--json` prints the conflict-region index

## Modules

```
bin/ffs-diff.js    CLI entry (arg parsing + dispatch only)
src/diff.js        line primitives: splitLines, lcsOps, simpleDiff
src/outline.js     ffs tree-sitter outlines, markdown headings, signature diff
src/merge.js       three-way merge (git merge-file) + fast-forward detection
src/cli.js         argument parsing, help, diff/merge printing
src/index.js       programmatic API for embedding
```

Consumers `require("ffs-diff")` for `mergeThree`, `getOutline`, `diffSignatures`,
`lcsOps`, etc. — no need to shell to the CLI.

## Install

`ffs-diff` runs on node. Link it onto PATH:

```
ln -sf "$(pwd)/bin/ffs-diff.js" ~/.local/bin/ffs-diff
```

or `npm link`. It shells to `git merge-file` for merge mode and to the estate's
`ffs` binary for structural outlines (both expected on the estate host).

## Why

`ffs-diff` exists so dual-worktree reconciliation (e.g. two checkouts of the
same repo diverged) can be done with a single, outline-aware command instead of
hand-porting files. See `docs/DESIGN.md` for the rationale.