# ForgeLoop Documentation Index

This file maps the current ForgeLoop documentation.

Default agent load order:

1. `FORGELOOP_CORE.md`
2. `CONTEXT.md`
3. this index
4. the current Roadmap / Master Plan, phase plan, spec, ADR, or test plan

## Canonical Documents

- [FORGELOOP_CORE.md](../FORGELOOP_CORE.md): compact workflow spine to load
  into agents by default.
- [README.md](../README.md): project entrypoint, how to use ForgeLoop, and how
  to load the workflow into tools.
- [AI-Assisted-Development-Workflow.md](../AI-Assisted-Development-Workflow.md):
  canonical workflow reference, ForgeLoop Core, gates, artifacts, tiers, and
  optional tool guidance.
- [CONTEXT.md](../CONTEXT.md): shared terms for the ForgeLoop repo.
- [AGENTS.md](../AGENTS.md): repo-local agent instructions for working on
  ForgeLoop itself.
- [CLAUDE.md](../CLAUDE.md): Claude-specific repo instructions for working on
  ForgeLoop itself.
- [package.json](../package.json): npm package and CLI entrypoint metadata.

## Planning

- [ForgeLoop Roadmap / Master Plan](09-development-plan.md): ForgeLoop's own
  roadmap and self-application plan.
- [Phase 3: Installer / Integration Tool Plan](phases/phase-3-installer-integration-tool.md):
  plan for applying ForgeLoop to target projects.
- [Phase 3.5: Quality Model Consolidation](phases/phase-3-5-quality-model-consolidation.md):
  plan for consolidating risk-adaptive quality, human-control, and smart
  verification rules.
- [Phase 4: Skills And Gauntlet Extraction](phases/phase-4-skills-and-gauntlet-extraction.md):
  plan for extracting stable quality workflows into future skills and evidence
  artifacts.
- [Phase 4.5: Process State And Gate Integrity](phases/phase-4-5-process-state-and-gate-integrity.md):
  draft plan for durable process state, gate receipts, evidence freshness, and
  future doctor invariants.
- [Phase 4.6: Divergence Review And Option-Space Expansion](phases/phase-4-6-divergence-review-and-option-space.md):
  draft plan for optional two-pass divergent option expansion before renewed
  analysis or harness work.
- Installer CLI: `bin/forgeloop.js` with implementation under `src/`.

## Canonical Concept Homes

- Usage entrypoint, examples, and repo package overview:
  [README.md](../README.md)
- Default load order, source-of-truth order, core loop, tiers, execution modes,
  tool modes, and commit/PR rule: [FORGELOOP_CORE.md](../FORGELOOP_CORE.md)
- Detailed workflow rules, gates, optional tools, brownfield flow, quality
  model, human-control model, smart test selection, testing ladder, and
  prompts:
  [AI-Assisted-Development-Workflow.md](../AI-Assisted-Development-Workflow.md)
- Glossary and current canonical file list: [CONTEXT.md](../CONTEXT.md)
- Roadmap, milestones, phase sequencing, and change log:
  [docs/09-development-plan.md](09-development-plan.md)
- Installer behavior and accepted setup decisions:
  [Phase 3 plan](phases/phase-3-installer-integration-tool.md)
- Durable process state and gate-integrity draft:
  [Phase 4.5 plan](phases/phase-4-5-process-state-and-gate-integrity.md)
- Divergence-review and option-space expansion draft:
  [Phase 4.6 plan](phases/phase-4-6-divergence-review-and-option-space.md)
- Template inventory: this index, under [Templates](#templates)
- Builder/critic role decision:
  [ADR 0001](adr/0001-builder-and-critic-roles.md)

## Templates

- [Roadmap / Master Plan Template](templates/master-plan-template.md)
- [Phase Plan Template](templates/phase-plan-template.md)
- [Architecture Plan Template](templates/architecture-plan-template.md)
- [Module / Component Map Template](templates/module-map-template.md)
- [QA Plan Template](templates/qa-plan-template.md)
- [Brownfield Feature Plan Template](templates/brownfield-feature-plan-template.md)
- [Behavior Spec Template](templates/behavior-spec-template.md)
- [Manual Test Plan Template](templates/manual-test-plan-template.md)
- [Integration Test Plan Template](templates/integration-test-plan-template.md)
- [Acceptance-Evidence Matrix Template](templates/acceptance-evidence-matrix-template.md)
- [Verification Contract Template](templates/verification-contract-template.md)
- [Evaluator Calibration Template](templates/evaluator-calibration-template.md)
- [Eval Suite Template](templates/eval-suite-template.md)
- [Context Map Template](templates/context-map-template.md)
- [Harness Assumption Register Template](templates/harness-assumption-register-template.md)
- [AI Verification Guardrails Template](templates/ai-verification-guardrails-template.md)
- [Performance Test Plan Template](templates/performance-test-plan-template.md)
- [Resilience Experiment Template](templates/resilience-experiment-template.md)
- [Production Rollout Plan Template](templates/production-rollout-plan-template.md)
- [Quality Envelope HTML Report Template](templates/quality-envelope-report-template.html)
- [Quality Envelope JSON Schema Template](templates/quality-envelope-schema-template.json)
- [Execution Report Template](templates/execution-report-template.md)
- [Pull Request Description Template](templates/pr-description-template.md)
- [ADR Template](templates/adr-template.md)

## Decisions

- [ADR 0001: Builder And Critic Roles](adr/0001-builder-and-critic-roles.md)

## Status

ForgeLoop is prose-first with a reusable template pack and an early safe
installer CLI. Phase 4 verification-infrastructure templates, Phase 4.5
gate-integrity rules, and Phase 4.6 divergence-review rules are being validated
before skill packaging or orchestration harness code.
