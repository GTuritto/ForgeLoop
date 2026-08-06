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
- Existing implementation: early installer CLI. No orchestration harness.
- Existing docs: Core, README, workflow reference, context, docs index, ADR 0001.
- Existing tests: Node installer tests, markdown lint, and `git diff --check`.
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

### M3: Installer / Integration Tool

- Purpose: define and build a safe setup tool that applies ForgeLoop to target
  projects.
- Target signal: a user can choose install scope, selected tools, project tier,
  and work type, then run a dry run before any files change.
- Status: Complete

### M3.5: Quality Model Consolidation

- Purpose: consolidate ForgeLoop's quality, testing, human-control, and
  smart-verification model before skill extraction.
- Target signal: the Core, reference workflow, roadmap, index, and templates
  describe risk-adaptive specifications, TDD, smart test selection,
  acceptance-to-evidence traceability, and delegated human control without
  turning every task into a heavyweight process.
- Status: Complete

### M4: Skill Candidates

- Purpose: identify stable repeated actions that should become agent skills.
- Target signal: candidate skills map to stable templates, Gauntlet Mode,
  Quality Envelope reporting, installer behavior, the quality model, and
  recurring verification, evaluator, context, and guardrail review steps.
- Status: In Progress

## Phase Sequence

### Phase 0: Workflow Standard Baseline

- Goal: establish Core, reference workflow, self-KDD files, and role decisions.
- Depends on: none.
- Execution mode: `Docs-only`.
- Status: Complete.
- Phase plan: pre-roadmap consolidation. The accepted artifacts are
  `FORGELOOP_CORE.md`, `AI-Assisted-Development-Workflow.md`, `CONTEXT.md`,
  `docs/00-index.md`, and ADR 0001. Do not backfill a separate plan unless a
  future review finds missing decision evidence.

### Phase 1: Planning Template Pack

- Goal: create Master Plan, phase plan, and execution report templates.
- Depends on: Phase 0.
- Execution mode: `Docs-only`.
- Status: Complete.
- Phase plan: pre-roadmap consolidation. The initial planning templates are the
  execution evidence for this docs-only phase. Backfill a separate plan only if
  planning templates change materially.

### Phase 2: QA And Brownfield Template Pack

- Goal: add manual test, integration test, PR description, ADR, and brownfield
  feature templates.
- Depends on: Phase 1.
- Execution mode: `Docs-only`.
- Status: Complete.
- Phase plan: pre-roadmap consolidation. The merged template pack is the
  execution evidence for this docs-only phase. Backfill a separate plan only if
  templates change materially.

### Phase 2.5: Documentation Consistency Pass

- Goal: reduce duplicate definitions and assign each repeated concept to a
  canonical file.
- Depends on: Phase 2.
- Execution mode: `Docs-only`.
- Status: Complete.
- Phase plan: inline in this roadmap unless the work expands.

### Phase 3: Installer / Integration Tool

- Goal: define and build a safe setup tool that applies ForgeLoop to target
  projects.
- Depends on: Phase 2.5.
- Execution mode: `Standard`.
- Status: Complete.
- Phase plan: `docs/phases/phase-3-installer-integration-tool.md`.

### Phase 3.5: Quality Model Consolidation

- Goal: strengthen ForgeLoop's quality model while preserving evidence over
  ceremony.
- Depends on: Phase 3 template and installer structure.
- Execution mode: `Docs-only`.
- Status: Complete.
- Phase plan: `docs/phases/phase-3-5-quality-model-consolidation.md`.

### Phase 4: Skill Extraction

- Goal: identify and define skill candidates from stable templates, installer
  behavior, Gauntlet Mode, verification contracts, and Quality Envelope
  reporting, plus verification-infrastructure templates for evaluator
  calibration, eval suites, context maps, harness assumptions, and AI
  guardrails.
- Depends on: Phase 3.5.
- Execution mode: `Docs-only`.
- Status: In Progress.
- Phase plan:
  `docs/phases/phase-4-skills-and-gauntlet-extraction.md`.

## Dependency Map

- Phase 1 depends on Phase 0 because templates need stable Core terminology.
- Phase 2 depends on Phase 1 because QA templates should link to phase and
  execution report templates.
- Phase 2.5 depends on Phase 2 because canonicalization should happen after
  the initial template pack exists.
- Phase 3 depends on Phase 2.5 because the installer should apply stable,
  de-duplicated docs, not overlapping prose.
- Phase 3.5 depends on Phase 3 because the quality model should build on the
  existing template and installer structure without expanding the harness.
- Phase 4 depends on Phase 3.5 because skill extraction should build on real
  setup behavior, validated templates, and stable quality rules.

## Scope Boundaries

### In Scope

- Workflow prose.
- Compact Core.
- Repo-local context, index, ADRs, and templates.
- Markdown verification.
- Risk-adaptive quality, testing, human-control, and evidence models.
- Gauntlet Mode, verification contracts, Quality Envelope reports, and
  skill-candidate definitions.
- Evaluator calibration, eval suites, context maps, harness assumptions, and
  AI verification guardrail templates.

### Out Of Scope

- Orchestration harness runtime code.
- Plugin packaging.
- Automating skills before template structure stabilizes.
- Runtime HTML report generation before the report contract is validated.

### Explicit Deferrals

- Orchestration harness code: revisit after installer behavior and skill
  candidates stabilize.
- Full diagram pack: revisit when architecture becomes more than docs-only.
- OpenSpec or Kaddo setup inside ForgeLoop: revisit if the repo starts using
  those tools directly.
- Full smart-test-selection harness: revisit after the quality model and
  skill candidates stabilize.
- Quality Envelope generator: revisit after the HTML and JSON report contracts
  are validated by hand.
- Executable eval-suite runner: revisit after the eval suite template has been
  used by hand.

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

- Minimum test level: markdown lint for touched docs and Node tests for
  installer behavior.
- Required integration boundaries: installer fixture repos for dry-run,
  no-overwrite, copy, symlink, and multi-tool behavior.
- Manual QA expectations: review whether a future agent can follow the Core and
  index without loading the full workflow.
- Regression expectations: no dangling references to missing template files.
- Release or demo gates: docs must explain both what changed and why.
- Quality-model expectation: tests and artifacts are selected by impact and
  risk, not by a blanket requirement to run every test or fill every template.
- Traceability expectation: strict and release-critical work can trace
  requirements to scenarios, tests, evidence, and residual risk.
- Quality-envelope expectation: strict, release-critical, or performance-risk
  work can state measured levels for complexity, coverage, mutation strength,
  CRAP or another complexity-plus-coverage risk score, load envelope,
  performance regression against prior runs, operational safety, and residual
  risk.

## Brownfield Protection

ForgeLoop is a prose-first repo with an early installer CLI.

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
- Artifact: Quality Envelope templates
  - Location:
    `docs/templates/quality-envelope-report-template.html`,
    `docs/templates/quality-envelope-schema-template.json`
  - Owner: Giuseppe
  - Status: Active
- Artifact: Verification infrastructure templates
  - Location:
    `docs/templates/evaluator-calibration-template.md`,
    `docs/templates/eval-suite-template.md`,
    `docs/templates/context-map-template.md`,
    `docs/templates/harness-assumption-register-template.md`,
    `docs/templates/ai-verification-guardrails-template.md`
  - Owner: Giuseppe
  - Status: Active
- Artifact: Phase 4 skill-extraction plan
  - Location: `docs/phases/phase-4-skills-and-gauntlet-extraction.md`
  - Owner: Giuseppe
  - Status: In Progress
- Artifact: Installer CLI
  - Location: `bin/forgeloop.js`, `src/`
  - Owner: Giuseppe
  - Status: Experimental

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
- Date: 2026-07-08
  - Change: resolved pre-roadmap phase-plan notes and reframed tool-specific
    workflow sections as examples.
  - Why: keep ForgeLoop self-consistent and role-first before skill extraction.
- Date: 2026-07-10
  - Change: added Module / Component Map guidance and template.
  - Why: support brownfield discovery when module boundaries are not obvious
    and improve greenfield phase sizing.
- Date: 2026-07-10
  - Change: added Phase 3 installer / integration tool plan.
  - Why: make ForgeLoop easy to apply to projects while preserving explicit
    setup choices and safe file operations.
- Date: 2026-07-10
  - Change: started Phase 3 installer / integration tool implementation.
  - Why: validate setup automation before publishing or extracting skills.
- Date: 2026-08-01
  - Change: started Phase 3.5 quality model consolidation.
  - Why: incorporate risk-adaptive specifications, smart verification,
    delegated human control, and acceptance-to-evidence traceability before
    extracting skills.
- Date: 2026-08-01
  - Change: added the Phase 4 skills and Gauntlet extraction plan plus
    verification contract and Quality Envelope report templates.
  - Why: prepare skill extraction and HTML-first evidence reports without
    adding harness code.
- Date: 2026-08-01
  - Change: completed Phase 3.5 quality model consolidation.
  - Why: close the quality-model stabilization gate before Phase 4 skill
    extraction.
- Date: 2026-08-01
  - Change: expanded Phase 4 with verification-infrastructure templates and AI
    guardrail evidence.
  - Why: make evaluator quality, eval suites, context boundaries, harness
    assumptions, and verification debt explicit before adding harness code.
- Date: 2026-08-06
  - Change: closed Phase 3 installer / integration tool.
  - Why: exit criteria verified with recorded evidence (19/19 installer tests,
    non-destructive fixture dry run, lint, link check); npm publishing and
    harness work remain explicitly deferred.
- Date: 2026-08-05
  - Change: started Phase 4.6 divergence-review and option-space expansion as a
    docs-only draft.
  - Why: capture optional two-pass divergent review before renewed analysis or
    harness work, while keeping implementation deferred.
