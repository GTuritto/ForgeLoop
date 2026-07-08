# ForgeLoop

ForgeLoop is a personal operating system for AI-assisted software development.
It defines the structure around coding agents so projects stay planned,
reviewable, testable, and resumable across tools.

The goal is simple:

> Use AI coding agents without letting them guess, drift, or silently create
> unreviewable changes.

ForgeLoop is not another coding agent. In its current form, it is a workflow
specification for an agent-agnostic harness. The harness should work with tools
such as Codex, Claude Code, Cursor, Gemini, and future AI development agents.

## Evolution Path

ForgeLoop should mature in this order:

1. Improve the prose workflow document until the operating model is clear.
2. Extract stable sections into reusable templates.
3. Convert repeatable activities into named skills.
4. Build a small harness that can run those skills and templates.
5. Expand the harness only after the manual workflow proves useful.

The prose document comes first. It should explain the rules, tradeoffs, gates,
and expected behavior well enough that a human or agent can follow the process
without hidden context. Skills and automation should come later, after the prose
stops changing quickly.

## How To Use ForgeLoop

Use ForgeLoop as a workflow source, then adapt it inside each project. Do not
copy the whole workflow blindly into every repo.

For a new or existing project:

1. Read [AI-Assisted-Development-Workflow.md](AI-Assisted-Development-Workflow.md).
2. Create or update the repo's `AGENTS.md` with project-specific instructions.
3. Add the minimum project context:
   - `README.md`,
   - `CONTEXT.md`,
   - roadmap or phase plan,
   - behavior specs or OpenSpec root,
   - ADRs for hard-to-reverse decisions,
   - QA, manual test, and integration test plans,
   - Mermaid diagrams when architecture or workflows matter.
4. Classify the work as greenfield, brownfield, or maintenance.
5. Choose the execution mode and tool availability mode.
6. Prepare the phase plan or brownfield feature plan.
7. Wait for approval before implementation.

## ForgeLoop Core

ForgeLoop Core is the paste-in spine for `AGENTS.md`, `CLAUDE.md`, or another
project instruction file. The canonical copy lives in
[AI-Assisted-Development-Workflow.md](AI-Assisted-Development-Workflow.md#forgeloop-core).

Use the Core when you need the reusable non-negotiables: source-of-truth order,
phase loop, approval gates, execution modes, tool modes, and the rule that
commits and PRs explain both what changed and why.

Use the full workflow when the project needs deeper rules for brownfield work,
QA, diagrams, OpenSpec, Kaddo, User Stories, single-tool review, or PR
preparation.

## Project Tier Selector

Choose the smallest tier that fits the project.

- `Throwaway/script`: disposable, local, or exploratory work.
  Use ForgeLoop Core only. Add tests only when risk justifies them.
- `Real project`: a repo that should be maintained, resumed, or handed to
  agents later. Use Core plus README, `AGENTS.md`, `CONTEXT.md`, a phase or
  feature plan, tests, and basic QA notes.
- `Productized/SaaS`: projects with users, auth, data, payments,
  integrations, or production risk. Use the full startup pack, phase plans,
  behavior specs, ADRs, QA plans, manual and integration test plans, diagrams,
  PR discipline, and regression evidence.

Do not force the full pack onto small work. Do not use the small-work tier to
avoid controls when data, users, security, or production behavior are at risk.

### Loading The Workflow Into Tools

Use the same workflow with different tools by loading the project instructions
and the relevant ForgeLoop section before work starts.

For Codex, add or update the target repo's `AGENTS.md`:

```md
# Project Workflow

Follow ForgeLoop for docs-first, phase-gated development.
Read the repo's README, CONTEXT.md, phase plans, behavior specs, ADRs,
diagrams, tests, and current Git state before implementation.

Do not implement before the required plan or approval gate.
Do not commit, push, open a PR, merge, or archive unless Giuseppe explicitly
approves.
```

Then start Codex with a prompt like:

```txt
Use ForgeLoop.
Read AGENTS.md, README.md, CONTEXT.md, docs, behavior specs, ADRs, diagrams,
tests, and git status.
Classify this request as greenfield, brownfield, or maintenance.
Select the execution mode and tool availability mode.
Prepare the plan only. Do not implement until I approve.
```

For Claude Code, add or update `CLAUDE.md` with the same project rules and use
Claude primarily for critique, planning, architecture review, or single-tool
execution when Claude Code is the only tool available.

For other tools, paste the same repo-local rules into their project instruction
file or persistent memory. If the tool has no instruction file, paste the
startup prompt at the beginning of the session.

### Minimal Tool Prompts

Use these when the repo has already been prepared.

Planning prompt:

```txt
Use ForgeLoop. Prepare the plan only.
Read repo evidence first.
Classify the work, identify gates, define tests, and list open questions.
Do not implement until I approve.
```

Implementation prompt:

```txt
Use the approved ForgeLoop plan.
Implement only the current sub-phase or vertical slice.
Run the required verification, update docs if behavior changed, and report
residual risk.
Do not commit, push, or open a PR.
```

Review prompt:

```txt
Review this branch against the approved plan, behavior specs, ADRs, tests,
docs, diagrams, and current code.
Lead with bugs, missing tests, security issues, contract drift, and behavior
mismatches.
Do not summarize first.
```

## What ForgeLoop Protects

ForgeLoop keeps every project anchored in repository evidence:

- documented product intent,
- explicit decisions and tradeoffs,
- approved phase plans,
- behavior specs,
- tests and smoke checks,
- current Git state,
- reviewable pull requests.

The workflow blocks implementation until the plan is clear. It also requires
tests, documentation, diagrams, and manual handoff notes before a phase can
close.

## Source Of Truth

Use repo artifacts in this order when an agent, reviewer, or human needs
project context:

1. Current code, tests, and Git state.
2. Approved phase plan.
3. Behavior specs, OpenSpecs if used, and BDD scenarios.
4. ADRs and architecture notes.
5. Product, technical, QA, and roadmap documents.
6. README and project status.
7. Agent chat history or memory.

If chat memory conflicts with repository files, the repository wins. If the
repository is unclear, update the right document before implementation.

## Knowledge Driven Development

ForgeLoop treats Knowledge Driven Development as a workflow discipline, not a
tool requirement.

KDD means durable project knowledge stays in the repository:

- `CONTEXT.md` for domain language,
- ADRs for hard-to-reverse decisions,
- behavior specs, using OpenSpec or Markdown,
- phase plans for approved work,
- diagrams for system shape and flows,
- tests for executable expectations,
- review logs and execution reports for evidence.

Tools such as OpenSpec and Kaddo may help structure, scan, package, or validate
that knowledge. They should remain optional. If a tool is unavailable, use
Markdown equivalents and document the substitution.

## Core Workflow

```txt
Idea -> Documents -> Decisions -> Roadmap -> Behavior Spec -> Phase Plan
     -> Branch -> Tests -> Code -> Smoke Test -> PR -> Merge
```

This flow applies to both new and existing projects, but the entry point
changes.

- Greenfield work starts by creating the product, architecture, workflow, and
  runtime foundation.
- Brownfield work starts by reading the current codebase, mapping the affected
  behavior, identifying existing seams, and proving the change can land without
  breaking current users.

Each phase follows the same gates:

1. Read the repo.
2. Run a grill-with-docs pass.
3. Create or update the phase plan.
4. Create or update behavior specs and BDD scenarios.
5. Wait for user approval.
6. Implement one sub-phase at a time.
7. Run the required verification.
8. Update docs and diagrams.
9. Prepare manual test handoff.
10. Open a PR only after explicit approval.

## Execution Model

ForgeLoop should adapt its rigor to the work instead of treating every change
as release-critical.

Default execution modes:

- `Docs-only`: documentation changes with no runtime behavior.
- `Mechanical`: renames, formatting, generated updates, and safe migrations.
- `Low-risk`: small localized behavior changes.
- `Standard`: normal product or platform work.
- `Strict`: auth, data, contracts, migrations, permissions, payments, or
  concurrency.
- `Release-critical`: final release, broad regression, or production-sensitive
  work.

Every task should record the selected mode, required tests, skipped checks,
human time, machine time, token use when available, retries, defects found, and
artifacts changed.

Tool availability also changes how the workflow runs:

- `Single-tool`: one LLM or coding tool does planning, implementation, review,
  and handoff in separate passes.
- `Multi-tool`: one tool implements and another critiques plans, diffs, and
  architecture.
- `Human-plus-tool`: the human performs review or manual QA that another tool
  would otherwise perform.

The gates do not disappear in single-tool mode. The same agent must change
mode explicitly: first planner, then implementer, then reviewer, then docs
keeper. Do not let one continuous answer replace the review gate.

## First-Class Artifacts

ForgeLoop treats these planning and review documents as first-class artifacts,
not optional notes:

- `Roadmap`: ordered milestones, sequencing, and release intent.
- `Architecture Plan`: system shape, module boundaries, deployment assumptions,
  and hard-to-reverse technical decisions.
- `QA Plan`: test strategy, acceptance rules, regression expectations, and
  release gates.
- `Manual Test Plan`: exact human test paths, expected results, seed data, and
  known limitations.
- `Integration Test Plan`: external boundaries, database behavior, service
  contracts, and Docker-local verification.

These artifacts may live as standalone files or sections inside the startup
document pack. They must be easy to find before implementation starts.

User Stories can be execution units inside the workflow, but they are not the
source of truth by themselves. A User Story should link back to the relevant
roadmap item, behavior spec, acceptance criteria, architecture notes, tests, and
phase plan.

When a phase is delivered through User Stories, ForgeLoop should use a concrete
delivery lane:

```txt
Select User Story -> SDD/Behavior Spec -> Human Gate -> Contract Freeze
     -> TDD RED -> Implementation -> QA -> Code Review -> Docs
     -> Human Gate -> Archive/PR Prep
```

This lane gives each User Story clear roles, artifacts, gates, timing, and test
evidence while preserving the broader phase workflow.

For brownfield feature work, add a discovery pass before the User Story lane:

```txt
Codebase Discovery -> Impact Map -> Compatibility Plan -> Behavior Spec
     -> Vertical Slice -> Regression Evidence -> PR Prep
```

This prevents the workflow from assuming a clean slate. Existing behavior,
contracts, migrations, data, integrations, and user workflows must be protected
before the new feature is built.

## Recommended Skills

ForgeLoop can later expose its own skills, but these external AI Hero skills
are useful references now:

- `grill-with-docs`: align vocabulary, plan, and hard decisions before build.
- `to-prd`: turn settled context into a PRD.
- `to-issues`: split a PRD or spec into vertical-slice issues.
- `tdd`: build one behavior at a time through red-green-refactor.
- `handoff`: preserve live context between long agent sessions.
- `prototype`: answer one design question with disposable code.
- `improve-codebase-architecture`: find brownfield module-depth opportunities.
- `triage`: verify and classify existing backlog items before agents build.

Treat these as optional helpers. The durable workflow still lives in repository
docs, specs, tests, ADRs, diagrams, issues, and reviewed commits.

## Documentation Map

- [AI-Assisted-Development-Workflow.md](AI-Assisted-Development-Workflow.md):
  canonical workflow, gates, tool roles, testing ladder, KDD guidance,
  optional OpenSpec and Kaddo usage, and definitions of ready and done.
- [CONTEXT.md](CONTEXT.md): shared terms for the ForgeLoop repo.
- [docs/00-index.md](docs/00-index.md): documentation map.
- [docs/adr/0001-builder-and-critic-roles.md](docs/adr/0001-builder-and-critic-roles.md):
  role-separation decision.
- [README.md](README.md): project entrypoint and summary of how to use the
  workflow.

Future repository versions should add the minimal startup pack listed in the
workflow guide, including `AGENTS.md`, `openspec/README.md`, diagrams, phase
plans, and templates.

## Current State

ForgeLoop currently contains the workflow guide, README, shared context, a docs
index, and one ADR. It is ready for prose refinement and workflow-shape
decisions. It is not yet a full project scaffold for applying the workflow to
another repository.

Before adding implementation code, define the missing repo-local artifacts,
especially the roadmap, architecture plan, QA plan, manual test plan, and
integration test plan.
