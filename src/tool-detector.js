const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { TOOL_ADAPTERS } = require("./tool-adapters");

const DETECTION_RULES = {
  codex: {
    home: [".codex"],
    repo: ["AGENTS.md"],
  },
  "claude-code": {
    home: [".claude"],
    repo: ["CLAUDE.md"],
  },
  cursor: {
    home: [".cursor"],
    repo: [".cursor"],
  },
  "windsurf-devin": {
    home: [".windsurf"],
    repo: [".windsurfrules"],
  },
  "github-copilot": {
    home: [".github"],
    repo: [".github/copilot-instructions.md"],
  },
  "gemini-cli": {
    home: [".gemini"],
    repo: ["GEMINI.md"],
  },
  antigravity: {
    home: [".gemini/antigravity"],
    repo: ["AGENTS.md"],
    provisional: true,
  },
};

function detectTools(options = {}) {
  const homeDir = path.resolve(options.homeDir || os.homedir());
  const targetDir = path.resolve(options.targetDir || process.cwd());

  return Object.keys(TOOL_ADAPTERS).map((tool) => detectTool(tool, { homeDir, targetDir }));
}

function detectedToolNames(results) {
  return results.filter((result) => result.status === "detected").map((result) => result.tool);
}

function formatDetectionSummary(results) {
  const detected = results.filter((result) => result.status === "detected");
  const provisional = results.filter((result) => result.status === "provisional");
  if (detected.length === 0 && provisional.length === 0) {
    return "No supported agents or IDEs were detected.";
  }

  const lines = ["Detected agents and IDEs:"];
  lines.push(...detected.map(formatDetectedTool));
  lines.push(...provisional.map((result) => `${formatDetectedTool(result)} (provisional target, review first)`));
  return lines.join("\n");
}

function formatDetectedTool(result) {
  const targets = result.targets.join(", ");
  return `- ${result.label} -> ${targets}`;
}

function detectTool(tool, { homeDir, targetDir }) {
  const adapter = TOOL_ADAPTERS[tool];
  const rule = DETECTION_RULES[tool];
  const markers = rule ? findMarkers(rule, { homeDir, targetDir }) : [];
  const status = classifyDetection({ rule, markers });

  return {
    tool,
    label: adapter.label,
    targets: adapter.targets,
    status,
    markers,
    note: adapter.note,
  };
}

function classifyDetection({ rule, markers }) {
  if (rule?.provisional && markers.length > 0) {
    return "provisional";
  }

  if (markers.length > 0) {
    return "detected";
  }

  return "available";
}

function findMarkers(rule, { homeDir, targetDir }) {
  const markers = [];

  for (const marker of rule.home || []) {
    const fullPath = path.join(homeDir, marker);
    if (fs.existsSync(fullPath)) {
      markers.push({ scope: "home", path: fullPath });
    }
  }

  for (const marker of rule.repo || []) {
    const fullPath = path.join(targetDir, marker);
    if (fs.existsSync(fullPath)) {
      markers.push({ scope: "repo", path: fullPath });
    }
  }

  return markers;
}

module.exports = {
  detectTools,
  detectedToolNames,
  formatDetectionSummary,
};
