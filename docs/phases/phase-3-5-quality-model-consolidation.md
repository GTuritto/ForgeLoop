# Phase 3.5: Quality Model Consolidation

## Metadata

- Project: ForgeLoop
- Phase: Phase 3.5 - Quality Model Consolidation
- Branch: `main`
- Date: 2026-08-01
- Owner: Giuseppe
- Status: `Complete`
- Execution mode: `Docs-only`
- Tool mode: `Single-tool`
- Human-control mode: `Final-QA-only`
- Linked Roadmap / Master Plan item: `docs/09-development-plan.md`

## Goal

Consolidate ForgeLoop's quality, testing, human-control, and
smart-verification model without turning the workflow into mandatory ceremony
for every change.

## Source Docs Reviewed

- `FORGELOOP_CORE.md`
- `AGENTS.md`
- `CONTEXT.md`
- `docs/00-index.md`
- Roadmap / Master Plan: `docs/09-development-plan.md`
- Phase 3 plan: `docs/phases/phase-3-installer-integration-tool.md`
- Reference workflow: `AI-Assisted-Development-Workflow.md`
- Templates: `docs/templates/`
- Installer code and tests: `src/`, `bin/`, `test/`

## Scope

### In Scope

- Risk-based quality principles.
- Expanded behavior specification model.
- BDD scenario taxonomy.
- Canonical TDD loop for behavior-changing work.
- Integration failure and recovery guidance.
- Contract, performance, resilience, and chaos guidance.
- Smart test selection.
- Human-control modes.
- Acceptance-to-evidence traceability.
- Template updates and new risk-triggered templates.

### Out Of Scope

- Orchestration harness code.
- Automated smart-test selector implementation.
- Package publishing.
- GitHub PR or remote changes.
- Production test execution or chaos experiments.

## Assumptions

- The attached handoff authorizes local docs, template, and verification work.
- ForgeLoop should stay prose-first until templates and rules stabilize.
- The Core should stay compact; detailed taxonomies belong in the reference
  workflow or templates.
- New templates should be optional and risk-triggered.

## Open Questions

- Question: Should Phase 3.5 block Phase 4 skill extraction?
  - Recommended answer: yes, because skill extraction should use stable quality
    rules.
  - Blocking: `no`

## Sub-Phases

For each sub-phase:

- Name: Canonical quality model
  - Goal: add compact Core rules and full workflow guidance for specification
    depth, BDD, TDD, smart verification, human-control modes, and traceability.
  - Files, modules, or components: `FORGELOOP_CORE.md`,
    `AI-Assisted-Development-Workflow.md`, `CONTEXT.md`.
  - Tests: markdown lint and `git diff --check`.
  - Exit signal: the implementation-first testing contradiction is resolved.

- Name: Roadmap and template expansion
  - Goal: make the roadmap, index, and templates reflect the new quality model.
  - Files, modules, or components: `docs/09-development-plan.md`,
    `docs/00-index.md`, `docs/templates/`.
  - Tests: markdown lint and template link review.
  - Exit signal: templates support risk-triggered quality artifacts without
    duplicating the full workflow.

- Name: Verification and review
  - Goal: run local checks, inspect the diff, and prepare final QA handoff.
  - Files, modules, or components: touched docs and templates.
  - Tests: `npm test`, markdown lint if available, `git diff --check`.
  - Exit signal: checks pass or skipped checks have explicit rationale.

## Module / Component Plan

- Module map location: not required for docs-only work.
- Modules touched or created: documentation and template pack.
- Components touched or created: no runtime components.
- Boundaries affected: installer template inventory only.
- Dependencies affected: none.
- Uncertain boundaries: future harness and skill boundaries remain deferred.
- Human review needed: final manual acceptance.

## QA Plan For This Phase

### Structural Checks

- Markdown lint for touched Markdown files when the tool is available.
- `git diff --check`.

### Unit Test Plan

- Run `npm test` to protect installer behavior and template-copy assumptions.

### Integration Test Plan

- External integration tests are not required. This phase changes workflow docs,
  templates, and installer template inventory only.

### Smoke Test Plan

- Confirm the documentation index links to new templates.
- Confirm the roadmap places Phase 3.5 after the installer and before skill
  extraction.
- Confirm the Core remains compact and does not duplicate the reference
  workflow.

### Manual Test Plan

- Read the Core, quality-model workflow sections, and updated templates.
- Confirm the model supports Final-QA-only delegation while preserving hard
  stops.
- Confirm smart verification does not imply running every test on every change.

### Regression Test Plan

- Existing load order remains unchanged.
- Existing installer dry-run and no-write behavior remains unchanged.
- Installer template inventory includes the new evidence templates.
- Existing templates remain discoverable from `docs/00-index.md`.

### Test Evidence Required

- `npm test`.
- Markdown lint command or documented tool absence.
- Installer dry run against a temporary repo.
- Local link, template inventory, and JSON parse checks.
- `git diff --check`.

## Docs And Diagram Updates

- Behavior specs: not required for docs-only workflow changes.
- ADRs: not required; this is an elaboration of existing accepted role and
  workflow decisions.
- Diagrams: not required.
- README or status docs: update only if navigation or status would otherwise
  drift.
- Roadmap / Master Plan: update in this phase.

## Risks And Deferrals

- Risk: the quality model becomes too heavy.
  - Mitigation: keep templates optional and risk-triggered.
- Risk: Core token load grows too much.
  - Mitigation: keep taxonomies in the full workflow and templates.
- Deferred work:
  - Smart-test-selector implementation waits for future harness or skills.
  - Skill extraction follows
    `docs/phases/phase-4-skills-and-gauntlet-extraction.md` after Phase 3.5
    is reviewed.

## Approval Gates

- Plan approval required before implementation: delegated by the handoff.
- Human test handoff required before PR: `yes`.
- Commit, push, PR, archive, or merge allowed without explicit approval: `no`.

## Closeout Evidence

- Markdown lint:
  passed with `0 error(s)` using:

  ```sh
  npx --yes markdownlint-cli2@0.18.1 \
    AGENTS.md CLAUDE.md FORGELOOP_CORE.md CONTEXT.md README.md \
    AI-Assisted-Development-Workflow.md docs/00-index.md \
    docs/09-development-plan.md \
    docs/phases/phase-3-installer-integration-tool.md \
    docs/phases/phase-3-5-quality-model-consolidation.md \
    docs/phases/phase-4-skills-and-gauntlet-extraction.md \
    docs/templates/verification-contract-template.md \
    docs/templates/execution-report-template.md \
    docs/templates/phase-plan-template.md \
    docs/templates/pr-description-template.md
  ```

- Unit tests: `npm test` passed with `19` tests.
- Diff hygiene: `git diff --check` passed.
- Link and inventory check: local Markdown links resolve, indexed Phase 3,
  Phase 3.5, Phase 4, Verification Contract, and Quality Envelope templates
  exist, and `quality-envelope-schema-template.json` parses.
- Installer smoke test:
  `npm run forgeloop -- init "$tmpdir" --dry-run` completed without writing
  files and included `quality-envelope-report-template.html`,
  `quality-envelope-schema-template.json`, and
  `verification-contract-template.md`.
- Agent instruction audit: `AGENTS.md` and `CLAUDE.md` share the same load
  order, repository rules, quality gates, and Git restrictions. `CLAUDE.md`
  keeps only its Claude-specific role section.

## Final QA Handoff

- Phase 3.5 is ready for Giuseppe's review.
- No harness code, publishing, PR, merge, or skill packaging was performed.
- Phase 4 remains a draft plan and should not start until explicitly approved.
- Any commit or push for this closeout still requires explicit approval.

## Exit Criteria

- Core includes compact quality and human-control rules.
- Full workflow owns detailed quality guidance.
- Roadmap includes Phase 3.5 before skill extraction.
- Templates support risk-triggered quality artifacts.
- Local verification is recorded.
- Final QA handoff is ready.
