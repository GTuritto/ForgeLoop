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
```

The intended future install shape is:

```txt
npx forgeloop init
```

Until the package is published to npm, the GitHub-backed NPX command is:

```txt
npx github:GTuritto/ForgeLoop init
```

The first version stays JavaScript-only to avoid build tooling before the
installer behavior is validated.

### Tool Selector

The installer must ask which tools the project uses:

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
- Ask installation scope.
- Ask selected tools.
- Ask project tier and work type.
- Create or update only the minimum required files.
- Never overwrite user content without an explicit confirmation.
- Write a summary of created, changed, skipped, and deferred files.
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
  - Goal: define CLI or script interface, prompts, dry-run output, and file
    operations.
  - Files, modules, or components: future design doc or ADR.
  - Tests: review against this plan.
  - Exit signal: implementation is ready to start.

- Name: Installer implementation
  - Goal: build the smallest safe installer.
  - Files, modules, or components: implementation files TBD after design.
  - Tests: unit tests for file operations, dry-run behavior, and no-overwrite
    safety.
  - Exit signal: installer can configure a fixture repo without destructive
    writes.

## Module / Component Plan

- Module map location: not required yet.
- Modules touched or created: future installer module.
- Components touched or created:
  - project detector,
  - install-mode selector,
  - tool selector,
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

### Integration Test Plan

- Future integration tests should use fixture repos for copy mode, symlink
  mode, existing-file mode, and multi-tool mode.

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

- Behavior specs: not needed yet.
- ADRs: add one before implementation if install mode or packaging becomes
  hard to reverse.
- Diagrams: optional after installer design.
- README or status docs: update when implementation starts.
- Roadmap / Master Plan: update in this phase.

## Risks And Deferrals

- Risk: Global symlink mode creates surprising changes across projects.
  - Mitigation: make copy mode the default and require explicit confirmation
    for symlinks.
- Risk: Tool conventions change.
  - Mitigation: verify current tool instruction-file conventions during
    implementation.
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
