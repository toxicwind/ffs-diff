# Changelog

All notable changes to `ffs-diff` are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [1.0.0] - 2026-10-20

### Added
- Structural diff mode (diff two files by `ffs` outline shape, then body with
  `--full`).
- Three-way merge mode (`--merge base ours theirs`), backed by git `merge-file`
  diff3, with `--output` and `--json` (conflict-region index).
- Programmatic API via `require("ffs-diff")`: `mergeThree`, `getOutline`,
  `buildSignatureMap`, `diffSignatures`, `lcsOps`, `simpleDiff`.
- Modular layout (`src/diff.js`, `src/outline.js`, `src/merge.js`, `src/cli.js`).
- Test suite (diff, outline, merge), Bun 1.4.4+.

[Unreleased]: https://github.com/toxicwind/ffs-diff/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/toxicwind/ffs-diff/releases/tag/v1.0.0