const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const {
  detectTools,
  detectedToolNames,
  formatDetectionSummary,
} = require("../src/tool-detector");

test("detects supported tools from home and repo markers", () => {
  const homeDir = makeTempDir();
  const targetDir = makeTempDir();
  fs.mkdirSync(path.join(homeDir, ".claude"));
  fs.mkdirSync(path.join(targetDir, ".cursor"), { recursive: true });

  const results = detectTools({ homeDir, targetDir });
  const detected = detectedToolNames(results);

  assert.equal(detected.includes("claude-code"), true);
  assert.equal(detected.includes("cursor"), true);
});

test("classifies provisional adapters separately from detected tools", () => {
  const homeDir = makeTempDir();
  const targetDir = makeTempDir();
  fs.mkdirSync(path.join(homeDir, ".gemini/antigravity"), { recursive: true });

  const results = detectTools({ homeDir, targetDir });
  const antigravity = results.find((result) => result.tool === "antigravity");

  assert.equal(antigravity.status, "provisional");
  assert.equal(detectedToolNames(results).includes("antigravity"), false);
});

test("formats detected tools with target files", () => {
  const homeDir = makeTempDir();
  const targetDir = makeTempDir();
  fs.mkdirSync(path.join(homeDir, ".codex"));

  const summary = formatDetectionSummary(detectTools({ homeDir, targetDir }));

  assert.match(summary, /Detected agents and IDEs:/);
  assert.match(summary, /Codex -> AGENTS\.md/);
});

test("formats provisional tools for review", () => {
  const homeDir = makeTempDir();
  const targetDir = makeTempDir();
  fs.mkdirSync(path.join(homeDir, ".gemini/antigravity"), { recursive: true });

  const summary = formatDetectionSummary(detectTools({ homeDir, targetDir }));

  assert.match(summary, /Antigravity -> AGENTS\.md \(provisional target, review first\)/);
});

function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "forgeloop-detect-"));
}
