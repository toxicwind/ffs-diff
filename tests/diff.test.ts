import { test, expect } from "bun:test";
import { lcsOps, splitLines, simpleDiff } from "../src/diff";

test("splitLines trims one trailing newline", () => {
  expect(splitLines("a\nb\n")).toEqual(["a", "b"]);
});

test("lcsOps returns eq for identical", () => {
  const ops = lcsOps(["a", "b"], ["a", "b"]);
  expect(ops).toEqual([{ type: "eq", line: "a" }, { type: "eq", line: "b" }]);
});

test("lcsOps returns a rep for a single-line change", () => {
  const ops = lcsOps(["base", "A", "end"], ["base", "A-new", "end"]);
  expect(ops[0]).toEqual({ type: "eq", line: "base" });
  expect(ops.find(o => o.type === "rep").lines).toContain("A-new");
});

test("simpleDiff flags the changed line", () => {
  const d = simpleDiff("A\nB\n", "A\nB-new\n");
  expect(d.some(x => x.kind === "remove" && x.text === "B-new")).toBe(true);
});