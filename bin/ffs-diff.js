#!/usr/bin/env node
"use strict";
/**
 * ffs-diff — multi-file structural diff AND three-way merge, ffs-aware.
 * Thin entry point; all logic lives in src/. Install as `ffs-diff`.
 */
const { HELP, parseArgs, runDiff, runMerge } = require("../src/cli");

function main() {
  const { files, help, merge, format } = parseArgs(process.argv.slice(2));
  if (help) { console.log(HELP); process.exit(0); }

  if (merge) {
    if (files.length !== 3) {
      console.error("Usage: ffs-diff <base> <ours> <theirs> --merge [--output <file>]");
      process.exit(1);
    }
    const conflicts = runMerge(files, { format, output: null });
    process.exit(conflicts ? 1 : 0);
  }

  if (files.length < 2) {
    console.error("Usage: ffs-diff <file1> <file2> [file3 ...] [--outline] [--full]");
    process.exit(1);
  }
  runDiff(files);
}

main();