const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline/promises");
const tty = require("node:tty");
const { stdin: input, stdout: output } = require("node:process");
const { version } = require("../package.json");
const {
  buildGlobalInstallPlan,
  buildInstallPlan,
  defaultGlobalSourceDir,
  executePlan,
  summarizePlan,
} = require("./installer");
const { detectTools, detectedToolNames, formatDetectionSummary } = require("./tool-detector");
const { TOOL_ADAPTERS, listToolNames } = require("./tool-adapters");

const INSTALL_MODE_CHOICES = [
  { value: "copy", label: "copy" },
  { value: "symlink", label: "symlink" },
  { value: "hybrid", label: "hybrid" },
];
const PROJECT_TIER_CHOICES = [
  { value: "throwaway", label: "throwaway" },
  { value: "real", label: "real" },
  { value: "productized", label: "productized" },
];
const WORK_TYPE_CHOICES = [
  { value: "greenfield", label: "greenfield" },
  { value: "brownfield", label: "brownfield" },
  { value: "maintenance", label: "maintenance" },
];

async function runCli(argv) {
  const parsed = parseArgs(argv);

  if (parsed.version) {
    console.log(version);
    return;
  }

  if (parsed.help) {
    printHelp();
    return;
  }

  if (parsed.command === "install-global") {
    const answers = parsed.yes || !process.stdin.isTTY ? parsed : await askGlobalInstallQuestions(parsed);
    const plan = buildGlobalInstallPlan({
      globalSourceDir: answers.globalSourceDir,
    });
    const dryRun = !answers.write || answers.dryRun;
    const results = executePlan(plan, { dryRun });

    if (answers.json) {
      console.log(JSON.stringify({ dryRun, plan: { ...plan, actions: results } }, null, 2));
      return;
    }

    console.log(dryRun ? "ForgeLoop global source dry run\n" : "ForgeLoop global source install\n");
    console.log(summarizePlan(plan, results));
    if (dryRun) {
      console.log("\nNo files were changed. Re-run with --write to install the global source.");
    }
    return;
  }

  if (parsed.command !== "init") {
    printHelp();
    return;
  }

  const answers = parsed.yes || !process.stdin.isTTY ? parsed : await askQuestions(parsed);
  const plan = buildInstallPlan({
    targetDir: answers.targetDir,
    mode: answers.mode,
    globalSourceDir: answers.globalSourceDir,
    tools: answers.tools,
    tier: answers.tier,
    workType: answers.workType,
    otherFiles: answers.otherFiles,
  });

  const dryRun = !answers.write || answers.dryRun;
  const results = executePlan(plan, { dryRun });

  if (answers.json) {
    console.log(JSON.stringify({ dryRun, plan: { ...plan, actions: results } }, null, 2));
    return;
  }

  console.log(dryRun ? "ForgeLoop dry run\n" : "ForgeLoop install\n");
  console.log(summarizePlan(plan, results));
  if (dryRun) {
    console.log("\nNo files were changed. Re-run with --write to apply the plan.");
  }
}

function parseArgs(argv) {
  const parsed = {
    command: argv[0] || "init",
    targetDir: process.cwd(),
    targetDirProvided: false,
    globalSourceDir: defaultGlobalSourceDir(),
    mode: "copy",
    tools: ["codex"],
    toolsProvided: false,
    detect: true,
    tier: "real",
    workType: undefined,
    otherFiles: [],
    write: false,
    writeProvided: false,
    dryRun: false,
    dryRunProvided: false,
    yes: false,
    json: false,
    help: false,
    version: false,
  };

  let index = parsed.command === "init" || parsed.command === "install-global" ? 1 : 0;
  if (argv[index] && !argv[index].startsWith("-")) {
    if (parsed.command === "install-global") {
      parsed.globalSourceDir = path.resolve(argv[index]);
    } else {
      parsed.targetDir = path.resolve(argv[index]);
      parsed.targetDirProvided = true;
    }
    index += 1;
  }

  while (index < argv.length) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--version" || arg === "-v") {
      parsed.version = true;
    } else if (arg === "--write") {
      parsed.write = true;
      parsed.writeProvided = true;
      parsed.dryRun = false;
      parsed.dryRunProvided = false;
    } else if (arg === "--dry-run") {
      parsed.dryRun = true;
      parsed.dryRunProvided = true;
      parsed.write = false;
      parsed.writeProvided = false;
    } else if (arg === "--yes" || arg === "-y") {
      parsed.yes = true;
    } else if (arg === "--json") {
      parsed.json = true;
    } else if (arg === "--mode") {
      parsed.mode = requireValue(arg, next);
      index += 1;
    } else if (arg === "--global-source") {
      parsed.globalSourceDir = path.resolve(requireValue(arg, next));
      index += 1;
    } else if (arg === "--tools") {
      parsed.tools = splitList(requireValue(arg, next));
      parsed.toolsProvided = true;
      index += 1;
    } else if (arg === "--no-detect") {
      parsed.detect = false;
    } else if (arg === "--tier") {
      parsed.tier = requireValue(arg, next);
      index += 1;
    } else if (arg === "--work-type") {
      parsed.workType = requireValue(arg, next);
      index += 1;
    } else if (arg === "--other-file") {
      parsed.otherFiles.push(requireValue(arg, next));
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }

    index += 1;
  }

  return parsed;
}

async function askQuestions(parsed) {
  printIntroBanner();
  const rl = createPromptInterface();
  try {
    return askInitQuestions(rl, parsed);
  } finally {
    rl.close();
  }
}

async function askInitQuestions(rl, parsed) {
  const targetDir = parsed.targetDirProvided ? parsed.targetDir : await ask(rl, "Target directory", parsed.targetDir);
  const tools = await askToolSelection(rl, { ...parsed, targetDir });
  const mode = await askSingleSelection(rl, "Install mode", INSTALL_MODE_CHOICES, parsed.mode);
  const globalSourceDir =
    mode === "symlink" || mode === "hybrid"
      ? await ask(rl, "Global source directory for symlink or hybrid mode", parsed.globalSourceDir)
      : parsed.globalSourceDir;

  return {
    ...parsed,
    targetDir,
    mode,
    globalSourceDir,
    tools,
    tier: await askSingleSelection(rl, "Project tier", PROJECT_TIER_CHOICES, parsed.tier),
    workType: await askSingleSelection(rl, "Work type", WORK_TYPE_CHOICES, parsed.workType || "brownfield"),
    write:
      parsed.writeProvided || parsed.dryRunProvided
        ? parsed.write
        : /^y/i.test(await ask(rl, "Write files now? Dry run is safer first: y/N", "N")),
  };
}

async function askToolSelection(rl, parsed) {
  if (parsed.toolsProvided || parsed.detect === false) {
    return askMultiSelection(rl, "Tools", toolChoices(), parsed.tools);
  }

  const detect = parsed.detectTools || detectTools;
  const log = parsed.log || console.log;
  const detection = detect({ targetDir: parsed.targetDir });
  const detectedTools = detectedToolNames(detection);

  log(formatDetectionSummary(detection));

  if (detectedTools.length === 0) {
    return askMultiSelection(rl, "Tools", toolChoices(), parsed.tools);
  }

  return askMultiSelection(rl, "Tools", toolChoices(), detectedTools);
}

async function askGlobalInstallQuestions(parsed) {
  const rl = createPromptInterface();
  try {
    return {
      ...parsed,
      globalSourceDir: await ask(rl, "Global source directory", parsed.globalSourceDir),
      write: /^y/i.test(await ask(rl, "Install global source now? Dry run is safer first: y/N", "N")),
    };
  } finally {
    rl.close();
  }
}

function createPromptInterface() {
  if (process.stdin.isTTY) {
    try {
      fs.accessSync("/dev/tty", fs.constants.R_OK);
      return {
        async question(prompt) {
          output.write(prompt);
          return readLineFromTty();
        },
        close() {},
      };
    } catch {
      // Fall back to stdin below when /dev/tty is unavailable.
    }
  }

  return readline.createInterface({ input, output });
}

function readLineFromTty() {
  const fd = fs.openSync("/dev/tty", "r");
  try {
    const chunks = [];
    const buffer = Buffer.alloc(1);

    for (;;) {
      const bytesRead = fs.readSync(fd, buffer, 0, 1, null);
      if (bytesRead === 0) {
        break;
      }

      const char = buffer.toString("utf8", 0, bytesRead);
      if (char === "\n" || char === "\r") {
        break;
      }
      chunks.push(char);
    }

    return chunks.join("");
  } finally {
    fs.closeSync(fd);
  }
}

async function ask(rl, question, defaultValue) {
  const suffix = defaultValue ? ` [${defaultValue}]` : "";
  const answer = await rl.question(`${question}${suffix}: `);
  return answer.trim() || defaultValue;
}

async function askSingleSelection(rl, label, choices, defaultValue) {
  if (process.stdin.isTTY) {
    return askRadioSelection(label, choices, defaultValue);
  }

  const fallback = choices.some((choice) => choice.value === defaultValue) ? defaultValue : choices[0].value;

  for (;;) {
    const defaultIndex = choices.findIndex((choice) => choice.value === fallback) + 1;
    const lines = choices.map((choice, index) => {
      const marker = choice.value === fallback ? "(*)" : "( )";
      return `  ${marker} ${index + 1}. ${choice.label}`;
    });
    const answer = await ask(rl, `${label}\n${lines.join("\n")}\nChoose one`, String(defaultIndex));
    const selected = parseSingleChoice(answer, choices);
    if (selected) {
      return selected;
    }
    console.log(`Choose one of: ${choices.map((choice) => choice.value).join(", ")}`);
  }
}

async function askRadioSelection(label, choices, defaultValue) {
  let cursor = choices.findIndex((choice) => choice.value === defaultValue);
  if (cursor < 0) {
    cursor = 0;
  }
  let previousLineCount = 0;

  const terminal = openRawTerminal();
  const render = () => {
    const rows = [
      label,
      "Use up/down arrows, Space or Enter to choose.",
      ...choices.map((choice, index) => {
        const active = cursor === index ? ">" : " ";
        const marker = cursor === index ? "(*)" : "( )";
        return `${active} ${marker} ${index + 1}. ${choice.label}`;
      }),
      "",
    ];

    if (previousLineCount > 0) {
      clearPreviousLines(previousLineCount);
    }

    output.write(`${rows.join("\n")}\n`);
    previousLineCount = rows.length;
  };

  try {
    output.write("\x1b[?25l");
    render();

    for (;;) {
      const key = await readRawKey(terminal.input);
      if (key === "ctrl-c") {
        output.write("\n");
        process.exit(130);
      }
      if (key === "up") {
        cursor = cursor === 0 ? choices.length - 1 : cursor - 1;
      } else if (key === "down") {
        cursor = cursor === choices.length - 1 ? 0 : cursor + 1;
      } else if (key === "enter" || key === "space") {
        output.write("\n");
        return choices[cursor].value;
      } else if (key.startsWith("digit:")) {
        const index = Number.parseInt(key.slice("digit:".length), 10) - 1;
        if (index >= 0 && index < choices.length) {
          cursor = index;
          output.write("\n");
          return choices[cursor].value;
        }
      }

      render();
    }
  } finally {
    terminal.close();
    output.write("\x1b[?25h");
  }
}

async function askMultiSelection(rl, label, choices, defaultValues) {
  if (process.stdin.isTTY) {
    return askChecklistSelection(label, choices, defaultValues);
  }

  const selectedDefaults = Array.isArray(defaultValues) ? defaultValues : [];
  const defaults = new Set(selectedDefaults.filter((value) => choices.some((choice) => choice.value === value)));

  for (;;) {
    const defaultIndexes = choices
      .map((choice, index) => (defaults.has(choice.value) ? String(index + 1) : null))
      .filter(Boolean)
      .join(",");
    const lines = choices.map((choice, index) => {
      const marker = defaults.has(choice.value) ? "[x]" : "[ ]";
      return `  ${marker} ${index + 1}. ${choice.label} (${choice.value})`;
    });
    const answer = await ask(
      rl,
      `${label}\n${lines.join("\n")}\nChoose one or more by number or name`,
      defaultIndexes
    );
    const selected = parseMultiChoice(answer, choices);
    if (selected.length > 0) {
      return selected;
    }
    console.log(`Choose at least one of: ${choices.map((choice) => choice.value).join(", ")}`);
  }
}

async function askChecklistSelection(label, choices, defaultValues) {
  const selectedDefaults = Array.isArray(defaultValues) ? defaultValues : [];
  const selected = new Set(selectedDefaults.filter((value) => choices.some((choice) => choice.value === value)));
  let cursor = 0;
  let message = "";
  let previousLineCount = 0;

  const terminal = openRawTerminal();
  const render = () => {
    const allSelected = selected.size === choices.length;
    const rows = [
      label,
      "Use up/down arrows, Space to toggle, Enter to continue. Press a for all tools.",
      `${cursor === 0 ? ">" : " "} ${allSelected ? "[x]" : "[ ]"} 0. All tools`,
      ...choices.map((choice, index) => {
        const active = cursor === index + 1 ? ">" : " ";
        const marker = selected.has(choice.value) ? "[x]" : "[ ]";
        return `${active} ${marker} ${index + 1}. ${choice.label} (${choice.value})`;
      }),
      message,
    ];

    if (previousLineCount > 0) {
      clearPreviousLines(previousLineCount);
    }

    output.write(`${rows.join("\n")}\n`);
    previousLineCount = rows.length;
  };

  try {
    output.write("\x1b[?25l");
    render();

    for (;;) {
      const key = await readRawKey(terminal.input);
      message = "";

      if (key === "ctrl-c") {
        output.write("\n");
        process.exit(130);
      }
      if (key === "up") {
        cursor = cursor === 0 ? choices.length : cursor - 1;
      } else if (key === "down") {
        cursor = cursor === choices.length ? 0 : cursor + 1;
      } else if (key === "space") {
        toggleChecklistSelection(selected, choices, cursor);
      } else if (key === "all") {
        selectAllChoices(selected, choices);
      } else if (key === "enter") {
        if (selected.size > 0) {
          output.write("\n");
          return choices.map((choice) => choice.value).filter((value) => selected.has(value));
        }
        message = "Select at least one tool before continuing.";
      }

      render();
    }
  } finally {
    terminal.close();
    output.write("\x1b[?25h");
  }
}

function clearPreviousLines(lineCount) {
  output.write(`\x1b[${lineCount}A`);
  for (let index = 0; index < lineCount; index += 1) {
    output.write("\x1b[2K\r");
    if (index < lineCount - 1) {
      output.write("\x1b[1B");
    }
  }
  output.write(`\x1b[${lineCount - 1}A`);
}

function toggleChecklistSelection(selected, choices, cursor) {
  if (cursor === 0) {
    if (selected.size === choices.length) {
      selected.clear();
      return;
    }
    selectAllChoices(selected, choices);
    return;
  }

  const value = choices[cursor - 1]?.value;
  if (!value) {
    return;
  }
  if (selected.has(value)) {
    selected.delete(value);
    return;
  }
  selected.add(value);
}

function selectAllChoices(selected, choices) {
  selected.clear();
  for (const choice of choices) {
    selected.add(choice.value);
  }
}

function openRawTerminal() {
  const fd = fs.openSync("/dev/tty", "r");
  const inputStream = new tty.ReadStream(fd);
  inputStream.setRawMode(true);
  inputStream.resume();

  return {
    input: inputStream,
    close() {
      inputStream.setRawMode(false);
      inputStream.pause();
      inputStream.destroy();
    },
  };
}

function readRawKey(inputStream) {
  inputStream.forgeLoopKeyQueue ||= [];
  if (inputStream.forgeLoopKeyQueue.length > 0) {
    return Promise.resolve(inputStream.forgeLoopKeyQueue.shift());
  }

  return new Promise((resolve) => {
    inputStream.once("data", (chunk) => {
      inputStream.forgeLoopKeyQueue.push(...parseRawKeys([...chunk]));
      resolve(inputStream.forgeLoopKeyQueue.shift() || "unknown");
    });
  });
}

function parseRawKeys(bytes) {
  const keys = [];

  for (let index = 0; index < bytes.length; index += 1) {
    const byte = bytes[index];
    const next = bytes[index + 1];
    const third = bytes[index + 2];

    if (byte === 27 && next === 91 && third === 65) {
      keys.push("up");
      index += 2;
    } else if (byte === 27 && next === 91 && third === 66) {
      keys.push("down");
      index += 2;
    } else if (byte === 3) {
      keys.push("ctrl-c");
    } else if (byte === 13 || byte === 10) {
      keys.push("enter");
    } else if (byte === 32) {
      keys.push("space");
    } else if (byte === 97 || byte === 65) {
      keys.push("all");
    } else if (byte >= 48 && byte <= 57) {
      keys.push(`digit:${byte - 48}`);
    } else {
      keys.push("unknown");
    }
  }

  return keys;
}

function parseSingleChoice(answer, choices) {
  const value = String(answer || "").trim();
  const index = Number.parseInt(value, 10);
  if (Number.isInteger(index) && index >= 1 && index <= choices.length) {
    return choices[index - 1].value;
  }
  return choices.find((choice) => choice.value === value || choice.label.toLowerCase() === value.toLowerCase())?.value;
}

function parseMultiChoice(answer, choices) {
  const selected = [];
  for (const item of splitList(answer)) {
    const value = parseSingleChoice(item, choices);
    if (value && !selected.includes(value)) {
      selected.push(value);
    }
  }
  return selected;
}

function toolChoices() {
  return listToolNames().map((tool) => ({
    value: tool,
    label: TOOL_ADAPTERS[tool]?.label || tool,
  }));
}

function printIntroBanner() {
  console.log(`\
 ______                   _                    _
|  ____|                 | |                  | |
| |__ ___  _ __ __ _  ___| |     ___   ___  _ __
|  __/ _ \\| '__/ _\` |/ _ \\ |    / _ \\ / _ \\| '_ \\
| | | (_) | | | (_| |  __/ |___| (_) | (_) | |_) |
|_|  \\___/|_|  \\__, |\\___|______\\___/ \\___/| .__/
                __/ |                       | |
               |___/                        |_|

ForgeLoop installs a docs-first workflow for AI-assisted software delivery.
It adds agent instructions, planning docs, and verification templates so work
stays reviewable, recoverable, and gated by evidence instead of chat memory.
`);
}

function requireValue(flag, value) {
  if (!value || value.startsWith("-")) {
    throw new Error(`Missing value for ${flag}`);
  }
  return value;
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function printHelp() {
  console.log(`ForgeLoop installer

Usage:
  forgeloop init [target-dir] [options]
  forgeloop install-global [global-source-dir] [options]

Options:
  --dry-run                 Plan changes only. This is the default.
  --write                   Apply safe creates and write review patches.
  --yes, -y                 Use defaults without prompts.
  --mode copy|symlink|hybrid
  --global-source PATH      Stable ForgeLoop source for symlink or hybrid mode.
  --tools codex,claude-code
  --no-detect               Disable local agent and IDE detection in prompts.
  --tier throwaway|real|productized
  --work-type greenfield|brownfield|maintenance
  --other-file PATH         Add a custom tool instruction file.
  --json                    Print machine-readable output.
  --version, -v             Print the ForgeLoop version.
  --help, -h

Examples:
  npx github:GTuritto/ForgeLoop install-global --write
  npx github:GTuritto/ForgeLoop init . --dry-run
  npx forgeloop init . --mode hybrid --tools codex,claude-code --work-type brownfield
`);
}

module.exports = {
  askInitQuestions,
  askQuestions,
  askSingleSelection,
  askToolSelection,
  parseArgs,
  parseMultiChoice,
  parseRawKeys,
  parseSingleChoice,
  runCli,
  toggleChecklistSelection,
};
