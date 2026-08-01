# Phase 3: Installer / Integration Tool Plan

## Metadata

- Project: ForgeLoop
- Phase: Phase 3 - Installer / Integration Tool
- Branch: `docs/installer-integration-plan`
- Date: 2026-07-10
- Owner: Giuseppe
- Status: `In Progress`
- Execution mode: `Standard`
- Tool mode: `Single-tool`
- Linked Roadmap / Master Plan item: `docs/09-development-plan.md`

## Goal

Define and build the installer or integration tool that applies ForgeLoop to
another project. The tool should make setup repeatable without hiding the
decisions that affect a target repo.

## Source Docs Reviewed

- `FORGELOOP_CORE.md`
- `CONTEXT.md`
- `docs/00-index.md`
- Roadmap / Master Plan: `docs/09-development-plan.md`
- Templates: `docs/templates/`
- Reference workflow: `AI-Assisted-Development-Workflow.md`

## Scope

### In Scope

- Define installation modes.
- Define the tool selector.
- Define target files to create or update.
- Define safety rules for existing projects.
- Define validation checks.
- Implement the smallest safe CLI.
- Add tests for planner and dry-run behavior.

### Out Of Scope

- Building an orchestration harness beyond project setup.
- Publishing the package to npm.
- Installing third-party tools.
- Mutating any external project.
- Replacing project-specific judgment with generated defaults.

## Assumptions

- ForgeLoop should support both new and existing repos.
- The installer should be conservative by default.
- Existing target files must not be overwritten without confirmation.
- A target repo may use one tool or many tools.
- Tool-specific files should adapt ForgeLoop Core, not duplicate the full
  reference workflow.

## Accepted Decisions

Giuseppe approved the recommended answers on 2026-07-10.

- Decision: support per-project copy, global symlink, and hybrid modes.
  - Default: per-project copy.
  - Why: copies are safer for repo history, review, and offline use. Symlinks
    remain useful for personal repos where Giuseppe wants central updates.

- Decision: support dry run.
  - Default: dry run unless the user passes `--write` or confirms writes
    interactively.
  - Why: users should see every file that would be created, changed, skipped,
    or linked before mutations happen.

- Decision: use a multi-tool selector.
  - Default: `Codex`.
  - Supported adapter list: `Codex`, `Claude Code`, `Antigravity`, `Cursor`,
    `GitHub Copilot`, `Gemini CLI`, `OpenCode`, `Cline`, `Roo Code`,
    `Continue`, `Windsurf / Devin Desktop`, `Aider`, `Amazon Q Developer`,
    `JetBrains AI Assistant`, `Replit Agent`, and `Other`.
  - Current implementation: detect locally installed agents and IDEs, show the
    detected set first, and let the user select all detected targets or provide
    a comma-separated subset in a plain terminal prompt.
  - Future UX option: add a richer checkbox-style TUI only if the UX gain
    justifies adding a runtime dependency.

- Decision: create missing project docs from reviewed templates.
  - Constraint: do this only when the target file is missing.

- Decision: preserve existing files.
  - Default: write review patches for existing files instead of overwriting
    them.

## Installer Decisions To Capture

### Installation Scope

The installer must ask:

- `Per-project installation`: copy ForgeLoop Core guidance and selected
  templates into the target repo.
- `Global installation`: keep one ForgeLoop source directory and symlink
  selected templates into target repos.
- `Hybrid installation`: copy project instructions, symlink reusable templates.

Default: `Per-project installation`.

### Installer Executable

The first implementation is a zero-dependency Node CLI with an npm `bin`
entrypoint:

```txt
forgeloop init [target-dir]
forgeloop install-global [global-source-dir]
```

The intended future install shape is:

```txt
npx forgeloop init
```

Until the package is published to npm, the GitHub-backed NPX command is:

```txt
npx github:GTuritto/ForgeLoop init
npx github:GTuritto/ForgeLoop install-global
```

Default global source path:

```txt
~/.forgeloop/source
```

The first version stays JavaScript-only to avoid build tooling before the
installer behavior is validated.

### Tool Selector

The installer must ask which tools the project uses. In an interactive terminal,
the preferred flow is:

1. Detect supported agents and IDEs from stable local markers.
2. Show the detected tools and their target instruction files.
3. Ask whether to install for all detected tools.
4. If the user says no, ask for a comma-separated subset.
5. Keep `Other` available for custom instruction-file paths.

Non-interactive runs must still support `--tools`, `--other-file`, `--yes`,
and `--json`.

Supported tools:

- `Codex`
- `Claude Code`
- `Antigravity`
- `Cursor`
- `GitHub Copilot`
- `Gemini CLI`
- `OpenCode`
- `Cline`
- `Roo Code`
- `Continue`
- `Windsurf / Devin Desktop`
- `Aider`
- `Amazon Q Developer`
- `JetBrains AI Assistant`
- `Replit Agent`
- `Other`

The selector must support multiple tools. The selected tools decide which
instruction files or guidance blocks are created. `Other` remains available
for tools without a known adapter or for project-specific conventions.

### Agent And IDE Detection

Detection is a convenience, not authority. It must never install into a tool
without showing the planned target and receiving user confirmation unless the
user passes an explicit non-interactive flag such as `--tools` with `--yes`.

The detector should use stable, local markers only:

- known instruction or config directories in the target repo,
- known global config or skills directories in the user's home directory,
- executable availability only when it is cheap and side-effect free,
- explicit command flags, which override detection.

Initial detection targets:

- `Claude Code`: `~/.claude/` or target `CLAUDE.md`
- `Cursor`: `~/.cursor/` or target `.cursor/`
- `Windsurf / Devin Desktop`: `~/.windsurf/` or target Windsurf rules
- `Codex`: `~/.codex/` or target `AGENTS.md`
- `GitHub Copilot`: `~/.github/` or target `.github/copilot-instructions.md`
- `Gemini CLI`: `~/.gemini/` or target `GEMINI.md`
- `Antigravity`: target convention still provisional; verify before writing

Detection output should classify each result:

- `detected`: supported marker found,
- `available`: adapter exists but no marker was found,
- `provisional`: adapter target needs convention verification,
- `custom`: supplied through `Other` or `--other-file`.

### Interactive Installer Shape

The current interactive installer uses zero-dependency plain prompts. A richer
checkbox-style TUI can come later, but CI and simple terminals must keep a
plain-prompt fallback.

Preferred prompts:

```txt
Detected agents and IDEs:
- Claude Code -> CLAUDE.md
- Cursor -> .cursor/rules/forgeloop.mdc
- Codex -> AGENTS.md

Install to all detected agents? Yes/No

If No:
Tools (codex, claude-code, cursor, github-copilot, gemini-cli):
claude-code,cursor
```

The final dry-run summary must list every selected target, every skipped target,
and every provisional adapter that needs review.

### Future Skill Installation

Phase 3 installs ForgeLoop instruction files and templates only. Phase 4 may
define a later skill-install flow after Gauntlet Mode, Quality Envelope
reporting, and skill candidates are validated.

Future skill installation should:

- detect local agents and IDEs before proposing skill targets,
- show every selected agent, IDE, file, and skill directory before writing,
- offer install-all-detected and explicit subset selection,
- keep a plain terminal fallback,
- confirm third-party skill sources explicitly,
- keep dry run as the default,
- install ForgeLoop-owned skills before recommending community skill packs.

### Tool Adapter Targets

The installer should treat each selected tool as an adapter with its own file
targets and safety rules.

- `Codex`: `AGENTS.md`
- `Claude Code`: `CLAUDE.md`
- `Antigravity`: `AGENTS.md` provisionally, with current convention to verify
  before publishing the adapter
- `Cursor`: `.cursor/rules/forgeloop.mdc` or current Cursor rule convention
- `GitHub Copilot`: `.github/copilot-instructions.md`
- `Gemini CLI`: `GEMINI.md`
- `OpenCode`: `AGENTS.md`
- `Cline`: `.clinerules/forgeloop.md`
- `Roo Code`: `.roo/rules/forgeloop.md`
- `Continue`: `.continue/rules/forgeloop.md`
- `Windsurf / Devin Desktop`: current workspace rule convention to verify
  before implementation
- `Aider`: `CONVENTIONS.md` plus usage note to load it with `/read` or
  `--read`
- `Amazon Q Developer`: `.amazonq/rules/forgeloop.md`
- `JetBrains AI Assistant`: `.aiassistant/rules/forgeloop.md`
- `Replit Agent`: `replit.md`
- `Other`: custom file path supplied by the user

When two selected tools share a target, such as `Codex` and `OpenCode` both
using `AGENTS.md`, the installer should write one shared section instead of
duplicating rules.

### Target Project Tier

The installer must ask for the project tier:

- `Throwaway/script`
- `Real project`
- `Productized/SaaS`

Default: `Real project`.

### Target Work Type

The installer must ask whether the target repo is:

- `Greenfield`
- `Brownfield`
- `Maintenance`

Brownfield setup should include Module / Component Map guidance by default.

## Expected Installer Behavior

- Detect the target repo root.
- Read target `README.md`, existing instruction files, and docs index if they
  exist.
- Detect locally available agents and IDEs when running interactively.
- Ask installation scope.
- Ask selected tools.
- Ask project tier and work type.
- Create or update only the minimum required files.
- Never overwrite user content without an explicit confirmation.
- Write a summary of created, changed, skipped, and deferred files.
- Refuse `symlink` and `hybrid` modes when the global source is missing.
- Allow overriding the global source path with `--global-source`.
- Allow disabling detection with `--no-detect`.
- Run link and markdown checks when possible.

## Target Files

Depending on answers, the installer may create or update:

- `AGENTS.md`
- `CLAUDE.md`
- `.cursor/rules/forgeloop.mdc`
- `.github/copilot-instructions.md`
- `GEMINI.md`
- `.clinerules/forgeloop.md`
- `.roo/rules/forgeloop.md`
- `.continue/rules/forgeloop.md`
- `CONVENTIONS.md`
- `.amazonq/rules/forgeloop.md`
- `.aiassistant/rules/forgeloop.md`
- `replit.md`
- `CONTEXT.md`
- `docs/00-index.md`
- `docs/09-development-plan.md`
- `docs/module-map.md`
- `docs/templates/`

Tool-specific file names are provisional. The implementation phase must verify
the current conventions for each tool before writing files.

## Safety Rules

- Prefer dry run before writes.
- Show a diff before changing existing files.
- Never overwrite existing project instructions silently.
- Keep generated ForgeLoop sections clearly marked.
- Preserve target repo tone and existing workflow rules.
- Treat symlinks as advanced mode.
- Do not create symlinks to an NPX cache or other temporary package path.
- Do not create secrets, tokens, or environment files.

## Sub-Phases

For each sub-phase:

- Name: Installer product decisions
  - Goal: approve installation scope, tool selector, file targets, and safety
    rules.
  - Files, modules, or components: this phase plan, roadmap, README if needed.
  - Tests: markdown lint and link check.
  - Exit signal: Giuseppe approves the installer behavior.

- Name: Installer design
  - Goal: define CLI or script interface, detection, prompts, dry-run output,
    and file operations.
  - Files, modules, or components: future design doc or ADR.
  - Tests: review against this plan.
  - Exit signal: implementation is ready to start.

- Name: Agent detection and interactive selection
  - Goal: detect supported local agents and IDEs, then let the user select all,
    some, or custom targets through an interactive prompt.
  - Files, modules, or components: CLI argument parser, detector module, tool
    adapter metadata, prompt flow, tests.
  - Tests: detector unit tests with temporary home and repo fixtures, prompt
    fallback tests, dry-run output tests, and no-write safety tests.
  - Exit signal: complete. The installer can recommend targets from local
    evidence while preserving explicit confirmation and non-interactive flags.

- Name: Installer implementation
  - Goal: build the smallest safe installer.
  - Files, modules, or components: `bin/forgeloop.js`, `src/cli.js`,
    `src/installer.js`, `src/tool-detector.js`, and `test/`.
  - Tests: unit tests for file operations, dry-run behavior, and no-overwrite
    safety.
  - Exit signal: installer can configure a fixture repo without destructive
    writes.

## Module / Component Plan

- Module map location: not required yet.
- Modules touched or created: CLI entrypoint, argument parser, installer
  planner, file operations, tool detector, and Node tests.
- Components touched or created:
  - project detector,
  - install-mode selector,
  - agent and IDE detector,
  - tool selector,
  - interactive multi-select prompt,
  - file planner,
  - template copier or symlink manager,
  - dry-run reporter,
  - validation runner.
- Boundaries affected: local filesystem only.
- Dependencies affected: none. The initial CLI uses Node built-ins only.
- Uncertain boundaries: final npm package name and publishing process.
- Human review needed: yes, before publishing or using against important repos.

## QA Plan For This Phase

### Unit Test Plan

- Planner creates expected actions for missing files.
- Planner writes review patches for existing instruction files.
- Planner deduplicates shared targets such as `AGENTS.md`.
- Brownfield setup includes a Module / Component Map.
- Dry run does not write files.
- Detector finds supported agents from repo and home-directory markers without
  writing files.
- Interactive selection can choose all detected tools or a comma-separated
  subset.
- Non-interactive flags override detection.

### Integration Test Plan

- Future integration tests should use fixture repos for copy mode, symlink
  mode, existing-file mode, multi-tool mode, detection mode, and interactive
  selection fallback.

### Smoke Test Plan

- Markdown lint touched docs.
- Run Node installer tests.
- Run installer dry run against a temporary fixture repo.
- Check local links.
- Review that the plan answers the installer decisions.

### Manual Test Plan

- Read the phase plan.
- Confirm the installation scope options are clear.
- Confirm the tool selector includes the default tools, common adapter tools,
  and a custom `Other` option.
- Confirm the installer can show detected agents and IDEs before selection.
- Confirm users can install to all detected tools or choose a subset.
- Confirm safety rules prevent destructive writes.

### Regression Test Plan

- Existing ForgeLoop load order remains unchanged.
- Existing templates remain discoverable from `docs/00-index.md`.
- Installer remains setup-only and does not imply orchestration harness code
  exists.

### Test Evidence Required

- `markdownlint-cli2` passes for touched docs.
- `npm test` passes.
- CLI dry run completes without writing to a fixture repo.
- Local link check passes.
- `git diff --check` passes.

## Docs And Diagram Updates

- Behavior specs: add when installer behavior needs scenario-level acceptance.
- ADRs: add one if install mode, packaging, or publishing becomes hard to
  reverse.
- Diagrams: optional after installer design.
- README or status docs: update when installer behavior or status changes.
- Roadmap / Master Plan: update in this phase.

## Risks And Deferrals

- Risk: Global symlink mode creates surprising changes across projects.
  - Mitigation: make copy mode the default and require explicit confirmation
    for symlinks.
- Risk: Tool conventions change.
  - Mitigation: verify current tool instruction-file conventions during
    implementation.
- Risk: Detection mistakes a marker for consent.
  - Mitigation: treat detection as a recommendation only; require confirmation
    before writes and preserve dry-run as the default.
- Risk: A TUI dependency makes the installer harder to run through NPX.
  - Mitigation: prefer zero-dependency prompts first; add a dependency only
    after the UX gain justifies package complexity.
- Risk: Installer becomes a harness too early.
  - Mitigation: keep first implementation focused on setup, not orchestration.
- Deferred work:
  - npm publishing waits until the CLI behavior is tested in real projects.
  - Full orchestration harness waits until setup behavior is stable.

## Approval Gates

- Plan approval required before implementation: `approved 2026-07-10`
- Human test handoff required before PR: `yes`
- Commit, push, PR, archive, or merge allowed without explicit approval: `no`

## Exit Criteria

- Installer decisions are explicit.
- Scope and safety rules are approved.
- Roadmap points to this phase.
- Required docs checks pass.
- Early CLI implementation exists.
- Existing-file behavior is non-destructive.
