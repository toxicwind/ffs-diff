"use strict";

/**
 * ffs-diff — public programmatic API.
 * Use these when embedding diff/merge in another tool instead of shelling to
 * the CLI. CLI entry is bin/ffs-diff.js.
 */

const { splitLines, lcsOps, simpleDiff } = require("./diff");
const { runFFS, getMarkdownOutline, getOutline, buildSignatureMap, diffSignatures } = require("./outline");
const { mergeThree, fastForward } = require("./merge");

module.exports = {
  splitLines,
  lcsOps,
  simpleDiff,
  runFFS,
  getMarkdownOutline,
  getOutline,
  buildSignatureMap,
  diffSignatures,
  mergeThree,
  fastForward,
};