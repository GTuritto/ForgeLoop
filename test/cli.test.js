const assert = require("node:assert/strict");
const test = require("node:test");
const {
  askInitQuestions,
  askSingleSelection,
  askToolSelection,
  parseArgs,
  parseMultiChoice,
  parseRawKeys,
  toggleChecklistSelection,
} = require("../src/cli");

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
  assert.equal(parsed.targetDirProvided, true);
  assert.equal(parsed.toolsProvided, true);
  assert.equal(parsed.dryRunProvided, true);
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
  assert.equal(parsed.writeProvided, true);
});

test("uses all detected tools when interactive user accepts", async () => {
  const answers = [""];
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
  const answers = ["2"];
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

test("parses multi-select answers by number or tool name", () => {
  const selected = parseMultiChoice(
    "1, claude-code",
    [
      { value: "codex", label: "Codex" },
      { value: "claude-code", label: "Claude Code" },
    ]
  );

  assert.deepEqual(selected, ["codex", "claude-code"]);
});

test("single selector accepts default radio choice", async () => {
  const selected = await askSingleSelection(
    fakeReadline([""]),
    "Install mode",
    [
      { value: "copy", label: "copy" },
      { value: "symlink", label: "symlink" },
    ],
    "copy"
  );

  assert.equal(selected, "copy");
});

test("checklist all-tools row selects and clears every tool", () => {
  const choices = [
    { value: "codex", label: "Codex" },
    { value: "claude-code", label: "Claude Code" },
  ];
  const selected = new Set(["codex"]);

  toggleChecklistSelection(selected, choices, 0);
  assert.deepEqual(Array.from(selected), ["codex", "claude-code"]);

  toggleChecklistSelection(selected, choices, 0);
  assert.deepEqual(Array.from(selected), []);
});

test("checklist tool rows toggle one choice", () => {
  const choices = [
    { value: "codex", label: "Codex" },
    { value: "claude-code", label: "Claude Code" },
  ];
  const selected = new Set(["codex"]);

  toggleChecklistSelection(selected, choices, 1);
  assert.deepEqual(Array.from(selected), []);

  toggleChecklistSelection(selected, choices, 2);
  assert.deepEqual(Array.from(selected), ["claude-code"]);
});

test("raw key parser preserves batched arrow, space, digit, and enter input", () => {
  assert.deepEqual(parseRawKeys([27, 91, 66, 27, 91, 66, 32, 50, 13]), [
    "down",
    "down",
    "space",
    "digit:2",
    "enter",
  ]);
});

test("init prompts skip global source for copy mode", async () => {
  const rl = fakeReadline(["", "", "1", "2", "1", "n"]);
  const answers = await askInitQuestions(rl, {
    targetDir: "/tmp/example",
    mode: "copy",
    globalSourceDir: "/tmp/forgeloop-source",
    tools: ["codex", "claude-code"],
    toolsProvided: true,
    detect: false,
    tier: "real",
    workType: "greenfield",
  });

  assert.equal(answers.mode, "copy");
  assert.equal(answers.globalSourceDir, "/tmp/forgeloop-source");
  assert.equal(rl.questions.some((question) => question.includes("Global source directory")), false);
  assert.equal(answers.tier, "real");
  assert.equal(answers.workType, "greenfield");
});

test("init prompts skip target directory when positional target was provided", async () => {
  const rl = fakeReadline(["", "1", "2", "1"]);
  const answers = await askInitQuestions(rl, {
    targetDir: "/tmp/example",
    targetDirProvided: true,
    mode: "copy",
    globalSourceDir: "/tmp/forgeloop-source",
    tools: ["codex", "claude-code"],
    toolsProvided: true,
    detect: false,
    tier: "real",
    workType: "greenfield",
    write: false,
    dryRun: true,
    dryRunProvided: true,
  });

  assert.equal(answers.targetDir, "/tmp/example");
  assert.equal(rl.questions.some((question) => question.includes("Target directory")), false);
  assert.equal(rl.questions[0].startsWith("Tools\n"), true);
});

test("init prompts honor explicit dry-run without asking write question", async () => {
  const rl = fakeReadline(["", "", "1", "2", "1"]);
  const answers = await askInitQuestions(rl, {
    targetDir: "/tmp/example",
    mode: "copy",
    globalSourceDir: "/tmp/forgeloop-source",
    tools: ["codex", "claude-code"],
    toolsProvided: true,
    detect: false,
    tier: "real",
    workType: "greenfield",
    write: false,
    dryRun: true,
    dryRunProvided: true,
  });

  assert.equal(answers.write, false);
  assert.equal(answers.dryRun, true);
  assert.equal(rl.questions.some((question) => question.includes("Write files now")), false);
});

test("init prompts honor explicit write without asking write question", async () => {
  const rl = fakeReadline(["", "", "1", "2", "1"]);
  const answers = await askInitQuestions(rl, {
    targetDir: "/tmp/example",
    mode: "copy",
    globalSourceDir: "/tmp/forgeloop-source",
    tools: ["codex", "claude-code"],
    toolsProvided: true,
    detect: false,
    tier: "real",
    workType: "greenfield",
    write: true,
    dryRun: false,
    writeProvided: true,
  });

  assert.equal(answers.write, true);
  assert.equal(answers.dryRun, false);
  assert.equal(rl.questions.some((question) => question.includes("Write files now")), false);
});

test("init prompts ask global source for symlink mode", async () => {
  const rl = fakeReadline(["", "", "2", "/tmp/shared-source", "2", "1", "n"]);
  const answers = await askInitQuestions(rl, {
    targetDir: "/tmp/example",
    mode: "copy",
    globalSourceDir: "/tmp/forgeloop-source",
    tools: ["codex", "claude-code"],
    toolsProvided: true,
    detect: false,
    tier: "real",
    workType: "greenfield",
  });

  assert.equal(answers.mode, "symlink");
  assert.equal(answers.globalSourceDir, "/tmp/shared-source");
  assert.equal(rl.questions.some((question) => question.includes("Global source directory")), true);
});

function fakeReadline(answers) {
  return {
    questions: [],
    async question() {
      this.questions.push(arguments[0]);
      return answers.shift() || "";
    },
  };
}
