const TOOL_ADAPTERS = {
  codex: {
    label: "Codex",
    targets: ["AGENTS.md"],
  },
  "claude-code": {
    label: "Claude Code",
    targets: ["CLAUDE.md"],
  },
  antigravity: {
    label: "Antigravity",
    targets: ["AGENTS.md"],
    note: "Verify Antigravity's current project instruction convention before publishing this adapter.",
  },
  cursor: {
    label: "Cursor",
    targets: [".cursor/rules/forgeloop.mdc"],
  },
  "github-copilot": {
    label: "GitHub Copilot",
    targets: [".github/copilot-instructions.md"],
  },
  "gemini-cli": {
    label: "Gemini CLI",
    targets: ["GEMINI.md"],
  },
  opencode: {
    label: "OpenCode",
    targets: ["AGENTS.md"],
  },
  cline: {
    label: "Cline",
    targets: [".clinerules/forgeloop.md"],
  },
  "roo-code": {
    label: "Roo Code",
    targets: [".roo/rules/forgeloop.md"],
  },
  continue: {
    label: "Continue",
    targets: [".continue/rules/forgeloop.md"],
  },
  "windsurf-devin": {
    label: "Windsurf / Devin Desktop",
    targets: [".windsurfrules"],
    note: "Verify the current Windsurf / Devin Desktop workspace rule convention before publishing this adapter.",
  },
  aider: {
    label: "Aider",
    targets: ["CONVENTIONS.md"],
    note: "Load this file in Aider with /read CONVENTIONS.md or --read CONVENTIONS.md.",
  },
  "amazon-q": {
    label: "Amazon Q Developer",
    targets: [".amazonq/rules/forgeloop.md"],
  },
  jetbrains: {
    label: "JetBrains AI Assistant",
    targets: [".aiassistant/rules/forgeloop.md"],
  },
  replit: {
    label: "Replit Agent",
    targets: ["replit.md"],
  },
};

const TOOL_ALIASES = new Map([
  ["claude", "claude-code"],
  ["claudecode", "claude-code"],
  ["claude_code", "claude-code"],
  ["copilot", "github-copilot"],
  ["githubcopilot", "github-copilot"],
  ["gemini", "gemini-cli"],
  ["roo", "roo-code"],
  ["windsurf", "windsurf-devin"],
  ["devin", "windsurf-devin"],
  ["amazonq", "amazon-q"],
  ["q", "amazon-q"],
  ["jetbrains-ai", "jetbrains"],
  ["replit-agent", "replit"],
]);

function normalizeToolName(input) {
  const key = String(input || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/_/g, "-");

  if (TOOL_ADAPTERS[key]) {
    return key;
  }

  const compact = key.replace(/-/g, "");
  return TOOL_ALIASES.get(key) || TOOL_ALIASES.get(compact) || null;
}

function listToolNames() {
  return Object.keys(TOOL_ADAPTERS);
}

module.exports = {
  TOOL_ADAPTERS,
  listToolNames,
  normalizeToolName,
};
