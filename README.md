# ForgeLoop

ForgeLoop is a reusable workflow standard for AI-assisted software development.
It tells a coding agent what to read, how to plan, when to stop for approval,
how to test, and how to hand work back to a human.

This repo is the reference package for that workflow. It is intentionally
docs-first: the prose, templates, and operating rules come before automation.
It now includes an early safe installer for applying ForgeLoop to a target
repo.

## Why This Exists

AI coding agents are useful, but they drift when the project has no durable
source of truth. Chat history is not enough. A repo needs explicit context,
plans, specs, test expectations, review gates, and handoff artifacts.

ForgeLoop exists to make agent work:

- grounded in repository evidence,
- reusable across future projects,
- understandable after context is lost,
- testable before a phase closes,
- reviewable by humans and other tools,
- adaptable to both greenfield and brownfield work.

The goal is not to add ceremony everywhere. The goal is to choose the smallest
workflow tier that keeps the work safe.

## What This Repo Contains

- [FORGELOOP_CORE.md](FORGELOOP_CORE.md): the compact operating spine to load
  into `AGENTS.md`, `CLAUDE.md`, or another tool instruction file.
- [AI-Assisted-Development-Workflow.md](AI-Assisted-Development-Workflow.md):
  the full reference workflow and decision library.
- [CONTEXT.md](CONTEXT.md): repo-local glossary, status, and working context.
- [docs/00-index.md](docs/00-index.md): navigation map for the workflow pack.
- [docs/09-development-plan.md](docs/09-development-plan.md): ForgeLoop's own
  roadmap and self-application plan.
- [docs/adr/](docs/adr/): architecture decision records for workflow choices.
- [docs/templates/](docs/templates/): reusable templates for plans, specs, QA,
  reports, ADRs, and PRs.
- [AGENTS.md](AGENTS.md): repo-local agent instructions for working on
  ForgeLoop itself.
- [bin/forgeloop.js](bin/forgeloop.js): early installer CLI.

ForgeLoop is not an orchestration harness. It is the standard, template pack,
and early setup CLI that future skills or automation should build on.

## How To Use ForgeLoop

Use the installer first. It plans the minimum ForgeLoop files for a target repo
and defaults to a dry run so you can review the setup before anything changes.

Use the manual path only when you need precise hand control or the installer
does not support the target tool yet. Do not copy the full reference document
into every project.

### Concept Authority

Use one canonical home for each concept:

- Loading order, source-of-truth order, project tiers, execution modes, tool
  modes, and commit/PR rule: [FORGELOOP_CORE.md](FORGELOOP_CORE.md).
- Detailed workflow rules, gates, optional tools, brownfield flow, testing
  ladder, and prompts:
  [AI-Assisted-Development-Workflow.md](AI-Assisted-Development-Workflow.md).
- Repo glossary and current canonical file list: [CONTEXT.md](CONTEXT.md).
- Documentation navigation and template inventory:
  [docs/00-index.md](docs/00-index.md).
- ForgeLoop's own roadmap and phase sequencing:
  [docs/09-development-plan.md](docs/09-development-plan.md).

### Default Agent Load

For most tasks, load only:

1. `FORGELOOP_CORE.md`
2. `CONTEXT.md`
3. `docs/00-index.md`
4. the current roadmap, phase plan, behavior spec, ADR, or test plan relevant
   to the task

Load `AI-Assisted-Development-Workflow.md` only when the compact files do not
answer the process question.

### Install ForgeLoop In A Project

Current status: ForgeLoop is not published to the npm registry yet, but NPX can
run it directly from GitHub.

Prerequisite:

- Node.js 20 or newer

Preview setup for another project:

```sh
npx github:GTuritto/ForgeLoop init /path/to/project --dry-run
```

Dry run is the default. The output lists every file that would be created,
copied, linked, skipped, or written as a review patch.

Apply the planned setup only after reviewing the output:

```sh
npx github:GTuritto/ForgeLoop init /path/to/project --write
```

This is a direct project install. By default it copies the selected ForgeLoop
templates into the target repo.

If you want projects to share templates from one stable local ForgeLoop source,
install that source first:

```sh
npx github:GTuritto/ForgeLoop install-global --dry-run
npx github:GTuritto/ForgeLoop install-global --write
```

The default global source path is:

```txt
~/.forgeloop/source
```

After the global source exists, use `symlink` or `hybrid` mode:

```sh
npx github:GTuritto/ForgeLoop init /path/to/project --dry-run \
  --mode symlink
```

Use `--global-source` when you want a different shared source directory:

```sh
npx github:GTuritto/ForgeLoop init /path/to/project --dry-run \
  --mode hybrid \
  --global-source /path/to/forgeloop-source
```

After ForgeLoop is published to npm, the shorter command will be:

```sh
npx forgeloop init /path/to/project --dry-run
```

Common examples:

```sh
# Brownfield repo using Codex and Claude Code
npx github:GTuritto/ForgeLoop init /path/to/project --write \
  --tools codex,claude-code \
  --work-type brownfield

# Cursor and GitHub Copilot project
npx github:GTuritto/ForgeLoop init /path/to/project --dry-run \
  --tools cursor,github-copilot

# Productized project with central template symlinks
npx github:GTuritto/ForgeLoop init /path/to/project --dry-run \
  --tier productized \
  --mode hybrid

# Custom tool instruction file
npx github:GTuritto/ForgeLoop init /path/to/project --dry-run \
  --other-file docs/agent-instructions.md
```

Installer options:

- `--dry-run`: preview the plan without writing files. Default: yes.
- `--write`: apply safe creates and write review patches. Default: no.
- `--tools`: comma-separated tool adapters. Default: `codex`.
- `--tier`: `throwaway`, `real`, or `productized`. Default: `real`.
- `--work-type`: `greenfield`, `brownfield`, or `maintenance`. Default:
  inferred.
- `--mode`: `copy`, `symlink`, or `hybrid`. Default: `copy`.
- `--global-source`: stable source for `symlink` or `hybrid` mode. Default:
  `~/.forgeloop/source`.
- `--other-file`: add a custom instruction file path. Default: none.

Supported tool adapters:

- `codex`
- `claude-code`
- `antigravity`
- `cursor`
- `github-copilot`
- `gemini-cli`
- `opencode`
- `cline`
- `roo-code`
- `continue`
- `windsurf-devin`
- `aider`
- `amazon-q`
- `jetbrains`
- `replit`

The installer is conservative:

- dry run is the default,
- existing instruction files are preserved,
- review patches are written for existing files,
- copy mode is the default,
- symlink and hybrid modes are explicit choices,
- symlink and hybrid modes require a stable global source.

### What The Installer Adds

Depending on the selected tools, tier, and work type, the installer can add:

- tool instruction files such as `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`,
  `.cursor/rules/forgeloop.mdc`, or `.github/copilot-instructions.md`,
- `CONTEXT.md`,
- `docs/00-index.md`,
- `docs/09-development-plan.md`,
- `docs/module-map.md` for brownfield setup,
- `docs/templates/`.

Existing files are not overwritten silently. If an instruction file already
exists, the installer writes a review patch under `.forgeloop/review/`.

### Install Modes

- `copy`: copies templates into the target project. This is the best default
  for reviewable repo history.
- `symlink`: links templates from the global ForgeLoop source into the target
  project.
- `hybrid`: creates project instruction files locally and links reusable
  templates from the global source.

`symlink` and `hybrid` mode intentionally refuse to run unless the global
source exists. This avoids durable project links pointing into an NPX cache.

### Manual Install Fallback

Use this path when you need to adapt ForgeLoop by hand.

1. Copy or adapt `FORGELOOP_CORE.md` into the target repo's `AGENTS.md`,
   `CLAUDE.md`, or equivalent tool instruction file.
2. Create the minimum repo context:
   - `CONTEXT.md`
   - `docs/00-index.md`
   - roadmap or master plan
   - ADRs for hard-to-reverse decisions
   - behavior specs for user-visible behavior
   - QA, integration, smoke, manual, and regression test plans as needed
3. Choose the project tier and execution mode from
   [FORGELOOP_CORE.md](FORGELOOP_CORE.md).
4. Prepare the plan before implementation.
5. Stop for approval at the required gate.
6. Implement in small slices.
7. Record evidence in an execution report or PR description.

### Use The Installer Locally While Developing It

From this repo checkout, run the installer against a temporary target:

```sh
tmpdir="$(mktemp -d /tmp/forgeloop-demo-XXXXXX)"
npm run forgeloop -- init "$tmpdir" --dry-run
```

Run the test suite:

```sh
npm test
```

### Use With One Tool Or Many

ForgeLoop works when you only have one coding tool, such as Codex or Claude
Code. Use separate passes for planning, implementation, review, and handoff.

When multiple tools are available, keep roles separate:

- one tool can build,
- another can critique,
- the human approves gates and manual QA.

The role matters more than the vendor. The repo remains the source of truth.

## Example: Starting A New Product Repo

Prompt the agent:

```txt
Use ForgeLoop.
Read FORGELOOP_CORE.md, CONTEXT.md, docs/00-index.md, and git status.
Prepare the repo workflow only. Do not implement application code.

Create or update:
- AGENTS.md
- CONTEXT.md
- docs/00-index.md
- docs/09-development-plan.md from the master plan template
- the first phase plan from the phase plan template

Classify the project tier and execution mode.
List open questions and stop for approval.
```

Expected result:

- the repo has a local operating guide,
- the roadmap is explicit,
- the first phase has a testable plan,
- implementation has not started,
- the human can approve, reject, or revise the plan.

## Example: Adding A Feature To An Existing Codebase

Prompt the agent:

```txt
Use ForgeLoop for brownfield work.
Read the Core, project context, current roadmap, relevant ADRs, affected source
files, and tests.

Prepare a brownfield feature plan only.
Identify existing behavior, affected boundaries, migration risk, required
tests, manual checks, and rollback notes.
Do not implement until I approve.
```

For a feature that touches data, auth, contracts, or production workflows, use
the stricter templates:

- [docs/templates/brownfield-feature-plan-template.md](docs/templates/brownfield-feature-plan-template.md)
- [docs/templates/integration-test-plan-template.md](docs/templates/integration-test-plan-template.md)
- [docs/templates/manual-test-plan-template.md](docs/templates/manual-test-plan-template.md)
- [docs/templates/execution-report-template.md](docs/templates/execution-report-template.md)
- [docs/templates/pr-description-template.md](docs/templates/pr-description-template.md)

## Template Pack

Use the templates as starting points, not as paperwork to fill blindly. The
canonical template inventory lives in [docs/00-index.md](docs/00-index.md).

## Commit And PR Standard

Follow the commit and PR rule in [FORGELOOP_CORE.md](FORGELOOP_CORE.md). The
short version: explain both what changed and why, because future agents will
read the repo instead of the chat.

## Current Project Status

ForgeLoop is in prose, template, and setup-tool evolution. The current work is
focused on:

- making the workflow easier to load with fewer tokens,
- applying ForgeLoop to its own repo,
- adding reusable templates before creating skills,
- reducing duplicate definitions across entrypoint docs,
- keeping optional tools such as OpenSpec and Kaddo supportive, not mandatory,
- supporting brownfield projects as first-class cases,
- validating the installer before publishing or extracting skills.

The next expected evolution after the installer is to identify the repeatable
workflow activities that should become skills or automation.
