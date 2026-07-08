# ForgeLoop Roadmap / Master Plan

## Metadata

- Project: ForgeLoop
- Owner: Giuseppe
- Date: 2026-07-08
- Version: v0.1
- Project tier: `Real project`
- Current status: `In Progress`
- Source docs reviewed: `FORGELOOP_CORE.md`, `README.md`,
  `AI-Assisted-Development-Workflow.md`, `CONTEXT.md`, `docs/00-index.md`
- Last updated by: Codex

## Product Intent

ForgeLoop defines a reusable, docs-first workflow for AI-assisted software
development. It helps agents and humans plan, build, verify, review, and resume
work without relying on chat memory.

- Primary user: Giuseppe and future coding agents working across projects.
- Problem: AI-assisted projects drift when process, source of truth, test
  expectations, and approval gates live only in chat.
- Desired outcome: a compact Core, a reference workflow, and templates that can
  be adapted into future repos.
- Non-goals: building an executable harness before the prose and templates are
  stable.
- Success signals: agents can load the Core, choose the right tier, create a
  plan, and produce reviewable docs without reading the full workflow by
  default.

## Current State

- Greenfield, brownfield, or maintenance: maintenance of a docs-first workflow
  repo.
- Existing implementation: no harness code.
- Existing docs: Core, README, workflow reference, context, docs index, ADR 0001.
- Existing tests: markdown lint and `git diff --check`.
- Known constraints: keep token load low and avoid duplicating canonical rules.
- Known risks: over-process, duplicated guidance, and stale template references.

## Planning Hierarchy

```txt
Product Intent
  -> Roadmap / Master Plan
    -> Phase Plan
      -> Template or Workflow Slice
        -> Task
```

Every phase below must link back to this plan.

## Milestones

### M0: Workflow Spine

- Purpose: establish the compact Core, source-of-truth rules, and tool modes.
- Target signal: agents can load `FORGELOOP_CORE.md` without reading the full
  workflow.
- Status: Complete

### M1: Planning Templates

- Purpose: create the first reusable templates that make the workflow
  executable by hand.
- Target signal: Roadmap / Master Plan, phase plan, and execution report
  templates exist and pass markdown lint.
- Status: Complete

### M2: QA And Handoff Templates

- Purpose: add focused templates for manual QA, integration testing, PR notes,
  and brownfield feature planning.
- Target signal: future repos can copy the minimal template set without using
  the full reference guide.
- Status: Complete

### M2.5: Canonical Concept Homes

- Purpose: reduce duplication across Core, README, index, roadmap, and the full
  reference workflow.
- Target signal: README and index point to one canonical home for each repeated
  concept.
- Status: Complete

### M3: Skill Candidates

- Purpose: identify stable repeated actions that should become agent skills.
- Target signal: candidate skills map to stable templates and recurring review
  steps.
- Status: Draft

## Phase Sequence

### Phase 0: Workflow Standard Baseline

- Goal: establish Core, reference workflow, self-KDD files, and role decisions.
- Depends on: none.
- Execution mode: `Docs-only`.
- Status: Complete.
- Phase plan: not yet backfilled.

### Phase 1: Planning Template Pack

- Goal: create Master Plan, phase plan, and execution report templates.
- Depends on: Phase 0.
- Execution mode: `Docs-only`.
- Status: Complete.
- Phase plan: to be created if this grows beyond template edits.

### Phase 2: QA And Brownfield Template Pack

- Goal: add manual test, integration test, PR description, ADR, and brownfield
  feature templates.
- Depends on: Phase 1.
- Execution mode: `Docs-only`.
- Status: Complete.
- Phase plan: TBD.

### Phase 2.5: Documentation Consistency Pass

- Goal: reduce duplicate definitions and assign each repeated concept to a
  canonical file.
- Depends on: Phase 2.
- Execution mode: `Docs-only`.
- Status: Complete.
- Phase plan: inline in this roadmap unless the work expands.

### Phase 3: Skill Extraction

- Goal: identify and define skill candidates from stable templates.
- Depends on: Phase 2.5.
- Execution mode: `Docs-only`.
- Status: Draft.
- Phase plan: TBD.

## Dependency Map

- Phase 1 depends on Phase 0 because templates need stable Core terminology.
- Phase 2 depends on Phase 1 because QA templates should link to phase and
  execution report templates.
- Phase 2.5 depends on Phase 2 because canonicalization should happen after
  the initial template pack exists.
- Phase 3 depends on Phase 2.5 because skills should automate stable,
  de-duplicated docs, not overlapping prose.

## Scope Boundaries

### In Scope

- Workflow prose.
- Compact Core.
- Repo-local context, index, ADRs, and templates.
- Markdown verification.

### Out Of Scope

- Harness runtime code.
- Plugin packaging.
- Automating skills before template structure stabilizes.

### Explicit Deferrals

- Harness code: revisit after templates and skill candidates stabilize.
- Full diagram pack: revisit when architecture becomes more than docs-only.
- OpenSpec or Kaddo setup inside ForgeLoop: revisit if the repo starts using
  those tools directly.

## Risk Register

- Risk: The workflow becomes too large for agents to load.
  - Impact: agents ignore rules or waste tokens.
  - Mitigation: keep `FORGELOOP_CORE.md` as default load and treat the long
    workflow as reference-only.
  - Owner: Giuseppe.
  - Status: Open.
- Risk: Templates encode unstable process.
  - Impact: future skills automate the wrong structure.
  - Mitigation: create templates only after concepts are stable.
  - Owner: Giuseppe.
  - Status: Open.

## Quality Strategy

- Minimum test level: markdown lint for touched docs.
- Required integration boundaries: none until harness code exists.
- Manual QA expectations: review whether a future agent can follow the Core and
  index without loading the full workflow.
- Regression expectations: no dangling references to missing template files.
- Release or demo gates: docs must explain both what changed and why.

## Brownfield Protection

ForgeLoop is a docs-only repo today.

- Existing behavior to protect: Core-first token-loading strategy.
- Compatibility constraints: existing links in README, index, and workflow must
  keep resolving.
- Migration constraints: none.
- Contracts that must not break: `FORGELOOP_CORE.md` remains the default
  loading layer.
- Regression evidence required: markdown lint and `git diff --check`.

## Artifact Map

- Artifact: Core
  - Location: `FORGELOOP_CORE.md`
  - Owner: Giuseppe
  - Status: Active
- Artifact: Reference workflow
  - Location: `AI-Assisted-Development-Workflow.md`
  - Owner: Giuseppe
  - Status: Active
- Artifact: Roadmap / Master Plan
  - Location: `docs/09-development-plan.md`
  - Owner: Giuseppe
  - Status: Active
- Artifact: Templates
  - Location: `docs/templates/`
  - Owner: Giuseppe
  - Status: Active

## Decision Log

- Decision: separate builder and critic roles from concrete tools.
  - Location: `docs/adr/0001-builder-and-critic-roles.md`
  - Status: Accepted

## Change Log

- Date: 2026-07-08
  - Change: created ForgeLoop's own Roadmap / Master Plan.
  - Why: prove the workflow can apply to itself before adding more templates.
- Date: 2026-07-08
  - Change: completed the initial reusable template pack.
  - Why: make ForgeLoop executable by hand before identifying skills.
- Date: 2026-07-08
  - Change: added architecture and QA templates for first-class artifacts.
  - Why: close the remaining template gaps before skill extraction.
- Date: 2026-07-08
  - Change: completed a documentation consistency pass for canonical concept
    homes.
  - Why: reduce drift before extracting skills from the workflow.
