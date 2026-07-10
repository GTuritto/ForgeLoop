const assert = require("node:assert/strict");
const test = require("node:test");
const { parseArgs } = require("../src/cli");

test("parses top-level version flag", () => {
  const parsed = parseArgs(["--version"]);

  assert.equal(parsed.version, true);
});

test("parses init options for NPX usage", () => {
  const parsed = parseArgs([
    "init",
    "/tmp/example",
    "--dry-run",
    "--tools",
    "codex,claude-code",
    "--work-type",
    "brownfield",
  ]);

  assert.equal(parsed.dryRun, true);
  assert.deepEqual(parsed.tools, ["codex", "claude-code"]);
  assert.equal(parsed.workType, "brownfield");
  assert.equal(parsed.targetDir, "/tmp/example");
});
