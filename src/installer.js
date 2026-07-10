const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { TOOL_ADAPTERS, normalizeToolName } = require("./tool-adapters");

const PROJECT_TIERS = new Set(["throwaway", "real", "productized"]);
const WORK_TYPES = new Set(["greenfield", "brownfield", "maintenance"]);
const INSTALL_MODES = new Set(["copy", "symlink", "hybrid"]);
const GLOBAL_SOURCE_ENTRIES = [
  "FORGELOOP_CORE.md",
  "README.md",
  "package.json",
  "bin",
  "src",
  "docs/templates",
];

function defaultGlobalSourceDir() {
  return path.join(os.homedir(), ".forgeloop", "source");
}

function buildInstallPlan(options = {}) {
  const forgeLoopRoot = options.forgeLoopRoot || path.resolve(__dirname, "..");
  const targetDir = path.resolve(options.targetDir || process.cwd());
  const mode = normalizeChoice(options.mode, INSTALL_MODES, "copy");
  const templateSourceRoot = resolveTemplateSourceRoot({
    forgeLoopRoot,
    globalSourceDir: options.globalSourceDir,
    mode,
  });
  const tier = normalizeChoice(options.tier, PROJECT_TIERS, "real");
  const workType = normalizeChoice(options.workType, WORK_TYPES, inferWorkType(targetDir));
  const tools = resolveTools(options.tools || ["codex"]);
  const otherFiles = Array.isArray(options.otherFiles) ? options.otherFiles : [];
  const actions = [];

  const toolTargets = collectToolTargets(tools, otherFiles);
  for (const target of toolTargets) {
    addInstructionAction(actions, {
      targetDir,
      target,
      content: renderInstructionFile({ target, tools, tier, workType }),
    });
  }

  addMissingFile(actions, targetDir, "CONTEXT.md", renderContext({ tier, workType }));
  addMissingFile(actions, targetDir, "docs/00-index.md", renderDocsIndex({ workType }));
  addMissingFile(
    actions,
    targetDir,
    "docs/09-development-plan.md",
    readTemplate(templateSourceRoot, "master-plan-template.md")
  );

  if (workType === "brownfield") {
    addMissingFile(
      actions,
      targetDir,
      "docs/module-map.md",
      readTemplate(templateSourceRoot, "module-map-template.md")
    );
  }

  addTemplateActions(actions, { templateSourceRoot, targetDir, mode });

  return {
    targetDir,
    forgeLoopRoot,
    templateSourceRoot,
    globalSourceDir: options.globalSourceDir ? path.resolve(options.globalSourceDir) : defaultGlobalSourceDir(),
    mode,
    tier,
    workType,
    tools,
    actions,
  };
}

function buildGlobalInstallPlan(options = {}) {
  const forgeLoopRoot = options.forgeLoopRoot || path.resolve(__dirname, "..");
  const globalSourceDir = path.resolve(options.globalSourceDir || defaultGlobalSourceDir());
  const actions = [];

  for (const entry of GLOBAL_SOURCE_ENTRIES) {
    addGlobalSourceActions(actions, {
      source: path.join(forgeLoopRoot, entry),
      target: path.join(globalSourceDir, entry),
    });
  }

  return {
    kind: "global-source",
    sourceDir: forgeLoopRoot,
    targetDir: globalSourceDir,
    actions,
  };
}

function executePlan(plan, options = {}) {
  const dryRun = options.dryRun !== false;
  const results = [];

  for (const action of plan.actions) {
    if (dryRun || action.type === "skip") {
      results.push({ ...action, status: dryRun ? dryRunStatus(action.type) : "skipped" });
      continue;
    }

    if (action.type === "create") {
      writeFileIfMissing(action.path, action.content);
      results.push({ ...action, status: "created" });
      continue;
    }

    if (action.type === "patch") {
      writeFileIfMissing(action.patchPath, action.content);
      results.push({ ...action, status: "patch-written" });
      continue;
    }

    if (action.type === "copy") {
      copyFileIfMissing(action.source, action.path);
      results.push({ ...action, status: "copied" });
      continue;
    }

    if (action.type === "symlink") {
      symlinkIfMissing(action.source, action.path);
      results.push({ ...action, status: "linked" });
      continue;
    }

    throw new Error(`Unknown action type: ${action.type}`);
  }

  return results;
}

function dryRunStatus(actionType) {
  if (actionType === "create") return "would-create";
  if (actionType === "copy") return "would-copy";
  if (actionType === "symlink") return "would-link";
  if (actionType === "patch") return "would-write-patch";
  if (actionType === "skip") return "would-skip";
  return `would-${actionType}`;
}

function summarizePlan(plan, results = plan.actions) {
  const lines = [];

  if (plan.kind === "global-source") {
    lines.push(`Source: ${plan.sourceDir}`);
    lines.push(`Global source: ${plan.targetDir}`);
    lines.push("");

    for (const action of results) {
      const status = action.status || action.type;
      const relative = path.relative(plan.targetDir, action.path || action.patchPath);
      lines.push(`- ${status}: ${relative || "."}${action.reason ? ` (${action.reason})` : ""}`);
    }

    return lines.join("\n");
  }

  lines.push(`Target: ${plan.targetDir}`);
  lines.push(`Mode: ${plan.mode}`);
  if (plan.mode === "symlink" || plan.mode === "hybrid") {
    lines.push(`Template source: ${plan.templateSourceRoot}`);
  }
  lines.push(`Tier: ${plan.tier}`);
  lines.push(`Work type: ${plan.workType}`);
  lines.push(`Tools: ${plan.tools.map((tool) => TOOL_ADAPTERS[tool]?.label || tool).join(", ")}`);
  lines.push("");

  for (const action of results) {
    const status = action.status || action.type;
    const relative = path.relative(plan.targetDir, action.path || action.patchPath);
    lines.push(`- ${status}: ${relative || "."}${action.reason ? ` (${action.reason})` : ""}`);
  }

  return lines.join("\n");
}

function resolveTools(tools) {
  const resolved = [];
  for (const tool of tools) {
    const normalized = normalizeToolName(tool);
    if (!normalized) {
      throw new Error(`Unknown tool "${tool}". Use --other-file for custom tool instruction paths.`);
    }
    if (!resolved.includes(normalized)) {
      resolved.push(normalized);
    }
  }
  return resolved;
}

function collectToolTargets(tools, otherFiles) {
  const targets = new Set();
  for (const tool of tools) {
    for (const target of TOOL_ADAPTERS[tool].targets) {
      targets.add(target);
    }
  }
  for (const file of otherFiles) {
    if (file) {
      targets.add(file);
    }
  }
  return Array.from(targets);
}

function addInstructionAction(actions, { targetDir, target, content }) {
  const targetPath = path.join(targetDir, target);
  if (!fs.existsSync(targetPath)) {
    actions.push({ type: "create", path: targetPath, content });
    return;
  }

  const patchPath = path.join(targetDir, ".forgeloop/review", `${sanitizePath(target)}.md`);
  actions.push({
    type: "patch",
    path: targetPath,
    patchPath,
    content: renderPatch(target, content),
    reason: "existing file is preserved",
  });
}

function addMissingFile(actions, targetDir, relativePath, content) {
  const targetPath = path.join(targetDir, relativePath);
  if (fs.existsSync(targetPath)) {
    actions.push({ type: "skip", path: targetPath, reason: "already exists" });
    return;
  }

  actions.push({ type: "create", path: targetPath, content });
}

function addTemplateActions(actions, { templateSourceRoot, targetDir, mode }) {
  const sourceDir = path.join(templateSourceRoot, "docs/templates");
  const targetDirPath = path.join(targetDir, "docs/templates");
  const templateFiles = fs.readdirSync(sourceDir).filter((file) => file.endsWith(".md")).sort();
  const useSymlink = mode === "symlink" || mode === "hybrid";

  for (const file of templateFiles) {
    const source = path.join(sourceDir, file);
    const target = path.join(targetDirPath, file);
    if (fs.existsSync(target)) {
      actions.push({ type: "skip", path: target, reason: "already exists" });
      continue;
    }

    actions.push({
      type: useSymlink ? "symlink" : "copy",
      source,
      path: target,
    });
  }
}

function addGlobalSourceActions(actions, { source, target }) {
  if (!fs.existsSync(source)) {
    throw new Error(`Cannot install missing ForgeLoop package entry: ${source}`);
  }

  const stats = fs.statSync(source);
  if (stats.isDirectory()) {
    for (const file of listFiles(source)) {
      const relative = path.relative(source, file);
      addCopyAction(actions, file, path.join(target, relative));
    }
    return;
  }

  addCopyAction(actions, source, target);
}

function addCopyAction(actions, source, target) {
  if (fs.existsSync(target)) {
    actions.push({ type: "skip", source, path: target, reason: "already exists" });
    return;
  }

  actions.push({ type: "copy", source, path: target });
}

function listFiles(root) {
  const entries = fs.readdirSync(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function renderInstructionFile({ target, tools, tier, workType }) {
  const labels = tools.map((tool) => TOOL_ADAPTERS[tool].label).join(", ");
  const notes = tools
    .map((tool) => TOOL_ADAPTERS[tool].note)
    .filter(Boolean)
    .map((note) => `- ${note}`)
    .join("\n");

  return `# Project Agent Instructions

<!-- FORGELOOP:START -->
## ForgeLoop

Use ForgeLoop for this project.

Default load order:

1. \`FORGELOOP_CORE.md\` or this ForgeLoop section.
2. \`CONTEXT.md\`
3. \`docs/00-index.md\`
4. the current roadmap, phase plan, ADR, behavior spec, or test plan relevant to the task

Project tier: \`${tier}\`
Work type: \`${workType}\`
Configured tools: ${labels}
Instruction file: \`${target}\`

Rules:

- Treat the repository as the source of truth.
- Prepare or update the plan before implementation.
- For brownfield work, map affected modules and components before changing code.
- Run the relevant tests or document why they were skipped.
- Update docs, diagrams, specs, ADRs, and handoff notes when behavior changes.
- Commits and PRs must explain both what changed and why.

${notes ? `Tool notes:\n\n${notes}\n\n` : ""}<!-- FORGELOOP:END -->
`;
}

function renderContext({ tier, workType }) {
  return `# Project Context

This file captures stable project context for agents and humans.

## ForgeLoop Setup

- Project tier: \`${tier}\`
- Work type: \`${workType}\`
- Source of truth: repository files before chat history

## Current Status

- Add the current product, architecture, and delivery status here.

## Terms

- Add project-specific terms here.
`;
}

function renderDocsIndex({ workType }) {
  const moduleLine =
    workType === "brownfield" ? "- [Module / Component Map](module-map.md)\n" : "";

  return `# Documentation Index

Default agent load order:

1. project instruction file
2. \`CONTEXT.md\`
3. this index
4. current plan, spec, ADR, or test artifact

## Planning

- [Roadmap / Master Plan](09-development-plan.md)
${moduleLine}
## Templates

- [Templates](templates/)
`;
}

function renderPatch(target, content) {
  return `# ForgeLoop Review Patch For ${target}

The target file already exists. Review the section below and apply it manually
where it fits the project.

\`\`\`md
${content.trim()}
\`\`\`
`;
}

function readTemplate(forgeLoopRoot, fileName) {
  return fs.readFileSync(path.join(forgeLoopRoot, "docs/templates", fileName), "utf8");
}

function resolveTemplateSourceRoot({ forgeLoopRoot, globalSourceDir, mode }) {
  if (mode === "copy") {
    return forgeLoopRoot;
  }

  const sourceRoot = path.resolve(globalSourceDir || defaultGlobalSourceDir());
  const templatesDir = path.join(sourceRoot, "docs/templates");
  if (!fs.existsSync(templatesDir)) {
    throw new Error(
      `Mode "${mode}" requires a stable ForgeLoop global source at ${sourceRoot}. ` +
        "Run `forgeloop install-global --write` first, or pass --global-source PATH."
    );
  }

  return sourceRoot;
}

function inferWorkType(targetDir) {
  const markers = ["package.json", "pyproject.toml", "Cargo.toml", "go.mod", "README.md"];
  return markers.some((marker) => fs.existsSync(path.join(targetDir, marker))) ? "brownfield" : "greenfield";
}

function normalizeChoice(input, allowed, fallback) {
  const value = String(input || fallback).trim().toLowerCase();
  if (!allowed.has(value)) {
    throw new Error(`Invalid choice "${input}". Expected one of: ${Array.from(allowed).join(", ")}`);
  }
  return value;
}

function sanitizePath(filePath) {
  return filePath.replace(/[^a-zA-Z0-9._-]/g, "__");
}

function writeFileIfMissing(filePath, content) {
  if (fs.existsSync(filePath)) {
    throw new Error(`Refusing to overwrite existing file: ${filePath}`);
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function copyFileIfMissing(source, target) {
  if (fs.existsSync(target)) {
    throw new Error(`Refusing to overwrite existing file: ${target}`);
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function symlinkIfMissing(source, target) {
  if (fs.existsSync(target)) {
    throw new Error(`Refusing to overwrite existing file: ${target}`);
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.symlinkSync(source, target);
}

module.exports = {
  buildGlobalInstallPlan,
  buildInstallPlan,
  defaultGlobalSourceDir,
  executePlan,
  summarizePlan,
};
