const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const {
  buildGlobalInstallPlan,
  buildInstallPlan,
  executePlan,
} = require("../src/installer");

const forgeLoopRoot = path.resolve(__dirname, "..");

test("plans a dry-run install for a missing Codex instruction file", () => {
  const targetDir = makeTempRepo();
  const plan = buildInstallPlan({
    forgeLoopRoot,
    targetDir,
    tools: ["codex"],
    tier: "real",
    workType: "greenfield",
  });

  assert.equal(plan.actions.some((action) => action.type === "create" && action.path.endsWith("AGENTS.md")), true);
  assert.equal(plan.actions.some((action) => action.path.endsWith("docs/09-development-plan.md")), true);
});

test("preserves existing instruction files by writing a review patch", () => {
  const targetDir = makeTempRepo();
  fs.writeFileSync(path.join(targetDir, "AGENTS.md"), "# Existing Instructions\n");

  const plan = buildInstallPlan({
    forgeLoopRoot,
    targetDir,
    tools: ["codex"],
    tier: "real",
    workType: "maintenance",
  });

  const patch = plan.actions.find((action) => action.type === "patch" && action.path.endsWith("AGENTS.md"));
  assert.ok(patch);
  assert.equal(patch.reason, "existing file is preserved");
});

test("deduplicates shared tool targets", () => {
  const targetDir = makeTempRepo();
  const plan = buildInstallPlan({
    forgeLoopRoot,
    targetDir,
    tools: ["codex", "opencode"],
    tier: "real",
    workType: "greenfield",
  });

  const agentsActions = plan.actions.filter((action) => action.path.endsWith("AGENTS.md"));
  assert.equal(agentsActions.length, 1);
});

test("brownfield setup includes a module map", () => {
  const targetDir = makeTempRepo();
  const plan = buildInstallPlan({
    forgeLoopRoot,
    targetDir,
    tools: ["codex"],
    tier: "real",
    workType: "brownfield",
  });

  assert.equal(plan.actions.some((action) => action.path.endsWith("docs/module-map.md")), true);
});

test("dry run does not write files", () => {
  const targetDir = makeTempRepo();
  const plan = buildInstallPlan({
    forgeLoopRoot,
    targetDir,
    tools: ["codex"],
    tier: "real",
    workType: "greenfield",
  });

  executePlan(plan, { dryRun: true });
  assert.equal(fs.existsSync(path.join(targetDir, "AGENTS.md")), false);
});

test("symlink mode requires a stable global source", () => {
  const targetDir = makeTempRepo();
  const globalSourceDir = path.join(makeTempRepo(), "missing-global-source");

  assert.throws(
    () =>
      buildInstallPlan({
        forgeLoopRoot,
        targetDir,
        globalSourceDir,
        mode: "symlink",
        tools: ["codex"],
        tier: "real",
        workType: "greenfield",
      }),
    /requires a stable ForgeLoop global source/
  );
});

test("symlink mode uses the stable global source for templates", () => {
  const targetDir = makeTempRepo();
  const globalSourceDir = makeTempRepo();
  createMinimalGlobalSource(globalSourceDir);

  const plan = buildInstallPlan({
    forgeLoopRoot,
    targetDir,
    globalSourceDir,
    mode: "symlink",
    tools: ["codex"],
    tier: "real",
    workType: "greenfield",
  });

  const symlink = plan.actions.find(
    (action) => action.type === "symlink" && action.path.endsWith("docs/templates/master-plan-template.md")
  );
  assert.ok(symlink);
  assert.equal(symlink.source, path.join(globalSourceDir, "docs/templates/master-plan-template.md"));
});

test("global install plan copies ForgeLoop package files into a stable source", () => {
  const globalSourceDir = makeTempRepo();
  const plan = buildGlobalInstallPlan({ forgeLoopRoot, globalSourceDir });

  assert.equal(plan.kind, "global-source");
  assert.equal(
    plan.actions.some((action) => action.type === "copy" && action.path.endsWith("FORGELOOP_CORE.md")),
    true
  );
  assert.equal(
    plan.actions.some((action) => action.type === "copy" && action.path.endsWith("docs/templates/master-plan-template.md")),
    true
  );
});

function makeTempRepo() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "forgeloop-test-"));
}

function createMinimalGlobalSource(globalSourceDir) {
  const templatesDir = path.join(globalSourceDir, "docs/templates");
  fs.mkdirSync(templatesDir, { recursive: true });

  for (const file of fs.readdirSync(path.join(forgeLoopRoot, "docs/templates"))) {
    if (file.endsWith(".md")) {
      fs.copyFileSync(path.join(forgeLoopRoot, "docs/templates", file), path.join(templatesDir, file));
    }
  }
}
