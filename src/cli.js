const path = require("node:path");
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const { version } = require("../package.json");
const {
  buildGlobalInstallPlan,
  buildInstallPlan,
  defaultGlobalSourceDir,
  executePlan,
  summarizePlan,
} = require("./installer");
const { listToolNames } = require("./tool-adapters");

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
    globalSourceDir: defaultGlobalSourceDir(),
    mode: "copy",
    tools: ["codex"],
    tier: "real",
    workType: undefined,
    otherFiles: [],
    write: false,
    dryRun: false,
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
      parsed.dryRun = false;
    } else if (arg === "--dry-run") {
      parsed.dryRun = true;
      parsed.write = false;
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
      index += 1;
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
  const rl = readline.createInterface({ input, output });
  try {
    return {
      ...parsed,
      targetDir: await ask(rl, "Target directory", parsed.targetDir),
      mode: await ask(rl, "Install mode: copy, symlink, or hybrid", parsed.mode),
      globalSourceDir: await ask(rl, "Global source directory for symlink or hybrid mode", parsed.globalSourceDir),
      tools: splitList(await ask(rl, `Tools (${listToolNames().join(", ")})`, parsed.tools.join(","))),
      tier: await ask(rl, "Project tier: throwaway, real, or productized", parsed.tier),
      workType: await ask(rl, "Work type: greenfield, brownfield, or maintenance", parsed.workType || "brownfield"),
      write: /^y/i.test(await ask(rl, "Write files now? Dry run is safer first: y/N", "N")),
    };
  } finally {
    rl.close();
  }
}

async function askGlobalInstallQuestions(parsed) {
  const rl = readline.createInterface({ input, output });
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

async function ask(rl, question, defaultValue) {
  const suffix = defaultValue ? ` [${defaultValue}]` : "";
  const answer = await rl.question(`${question}${suffix}: `);
  return answer.trim() || defaultValue;
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
  parseArgs,
  runCli,
};
