const assert = require("node:assert/strict");
const test = require("node:test");
const { askToolSelection, parseArgs } = require("../src/cli");

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
  assert.equal(parsed.toolsProvided, true);
});

test("parses no-detect option", () => {
  const parsed = parseArgs(["init", "/tmp/example", "--no-detect"]);

  assert.equal(parsed.detect, false);
});

test("parses global source options", () => {
  const parsed = parseArgs([
    "init",
    "/tmp/example",
    "--mode",
    "hybrid",
    "--global-source",
    "/tmp/forgeloop-source",
  ]);

  assert.equal(parsed.mode, "hybrid");
  assert.equal(parsed.globalSourceDir, "/tmp/forgeloop-source");
});

test("parses install-global command target", () => {
  const parsed = parseArgs(["install-global", "/tmp/forgeloop-source", "--write"]);

  assert.equal(parsed.command, "install-global");
  assert.equal(parsed.globalSourceDir, "/tmp/forgeloop-source");
  assert.equal(parsed.write, true);
});

test("uses all detected tools when interactive user accepts", async () => {
  const answers = ["Y"];
  const selected = await askToolSelection(fakeReadline(answers), {
    targetDir: "/tmp/example",
    tools: ["codex"],
    detect: true,
    toolsProvided: false,
    log: () => {},
    detectTools: () => [
      {
        tool: "codex",
        label: "Codex",
        targets: ["AGENTS.md"],
        status: "detected",
        markers: [],
      },
      {
        tool: "claude-code",
        label: "Claude Code",
        targets: ["CLAUDE.md"],
        status: "detected",
        markers: [],
      },
    ],
  });

  assert.deepEqual(selected, ["codex", "claude-code"]);
});

test("lets interactive user choose a detected subset", async () => {
  const answers = ["n", "claude-code"];
  const selected = await askToolSelection(fakeReadline(answers), {
    targetDir: "/tmp/example",
    tools: ["codex"],
    detect: true,
    toolsProvided: false,
    log: () => {},
    detectTools: () => [
      {
        tool: "codex",
        label: "Codex",
        targets: ["AGENTS.md"],
        status: "detected",
        markers: [],
      },
      {
        tool: "claude-code",
        label: "Claude Code",
        targets: ["CLAUDE.md"],
        status: "detected",
        markers: [],
      },
    ],
  });

  assert.deepEqual(selected, ["claude-code"]);
});

function fakeReadline(answers) {
  return {
    async question() {
      return answers.shift() || "";
    },
  };
}
