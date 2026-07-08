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

Each phase follows the same gates:

1. Read the repo.
2. Run a Grill Me With Docs pass.
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

## Documentation Map

- [AI-Assisted-Development-Workflow.md](AI-Assisted-Development-Workflow.md):
  canonical workflow, gates, tool roles, testing ladder, KDD guidance,
  optional OpenSpec and Kaddo usage, and definitions of ready and done.
- [README.md](README.md): project entrypoint and summary of how to use the
  workflow.

Future repository versions should add the minimal startup pack listed in the
workflow guide, including `AGENTS.md`, `CONTEXT.md`, `docs/`,
`openspec/README.md`, diagrams, phase plans, and templates.

## Current State

ForgeLoop currently contains the workflow guide and this README. It is ready for
prose refinement and workflow-shape decisions. It is not yet a full project
scaffold for applying the workflow to another repository.

Before adding implementation code, define the missing repo-local artifacts,
especially the roadmap, architecture plan, QA plan, manual test plan, and
integration test plan.
