---
name: Bug report
about: ffs-diff produced wrong output or errored
title: ''
labels: bug
assignees: ''
---

## Command

```
ffs-diff <base> <ours> <theirs> --merge ...
```

## Expected behavior

What should have happened (clean merge / correct structural diff / no error).

## Actual behavior

Paste the output or error. If a merge produced the wrong conflict-free result,
**that is a serious bug** — include full repro.

## Repro

Minimal base/ours/theirs file contents (or file paths if they're small), or a
reduced case:
```text
base:   ...
ours:   ...
theirs: ...
```

## Environment
- ffs-diff version / commit
- Bun or Node version
- OS