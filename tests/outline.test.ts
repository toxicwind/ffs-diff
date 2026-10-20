import { test, expect } from "bun:test";
import { getMarkdownOutline, buildSignatureMap, diffSignatures } from "../src/outline";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("markdown outline extracts headings, skips code fences", () => {
  const dir = mkdtempSync(join(tmpdir(), "ffsdiff-md-"));
  const p = join(dir, "x.md");
  writeFileSync(p, "# Title\n```\n# not a heading\n```\n## Sub\n");
  const out = getMarkdownOutline(p);
  rmSync(dir, { recursive: true, force: true });
  expect(out.map(h => h.name)).toEqual(["Title", "Sub"]);
});

test("signature map + diff detects added/removed/changed", () => {
  const base = buildSignatureMap([
    { kind: "fn", name: "a", signature: "a()", children: [] },
    { kind: "fn", name: "b", signature: "b()", children: [] },
  ]);
  const next = buildSignatureMap([
    { kind: "fn", name: "a", signature: "a(x)", children: [] }, // changed
    { kind: "fn", name: "c", signature: "c()", children: [] },  // added
  ]);
  const d = diffSignatures(base, next);
  expect(d.added.map(x => x.name)).toEqual(["c"]);
  expect(d.changed.map(x => x.key)).toEqual(["fn:a"]);
  expect(d.removed.map(x => x.name)).toEqual(["b"]);
});