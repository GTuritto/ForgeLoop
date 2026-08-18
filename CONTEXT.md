# ForgeLoop Context

ForgeLoop is a workflow specification for AI-assisted software development. It
now includes an early installer CLI for applying the workflow to target
projects, but it is not a coding agent or orchestration harness.

## Terms

- `ForgeLoop Core`: the short, loadable spine copied into project instruction
  files such as `AGENTS.md` or `CLAUDE.md`.
- `Full workflow`: the long reference guide in
  `AI-Assisted-Development-Workflow.md`.
- `Canonical concept home`: the file that owns the current definition of a
  repeated workflow concept. Other files should link to it instead of carrying
  competing definitions.
- `Roadmap / Master Plan`: the project-level sequencing document above phase
  plans, User Stories, vertical slices, and tasks.
- `Delivery mode`: the explicit lifecycle authorization for the current task,
  such as `plan-only`, `implement-only`, `commit-only`, `push-approved`,
  `merge-approved`, `deploy-approved`, or `tooling-refresh-only`.
- `Phase status ledger`: the small state record that names the current phase,
  subphase, step, last completed step, next step, remaining steps, completion
  indicator, required verification command, branch owner, and next merge
  target.
- `Phase transaction log`: the append-only project record in
  `docs/phase-log.md` or `.forgeloop/phase-ledger.jsonl` that captures the
  phase, slice or step id, approval, files changed, focused check, full gate,
  result, residual risk, and next allowed action.
- `Next approved row`: the single executable row an agent may implement next.
  The row should connect a user decision to one minimal change, focused check,
  full gate, counter update, and stop condition.
- `Phase completion indicator`: the phase-specific command and passing signal
  that prove the planned behavior set is complete, such as a todo-spec command
  reaching zero pending rows.
- `QA trace table`: the phase QA mapping from each QA requirement to the
  implemented test or spec file, command, evidence, and status.
- `Module / Component Map`: a planning artifact that identifies modules,
  components, responsibilities, dependencies, tests, and uncertain boundaries.
- `Generated artifact`: an output from graph, index, report, handoff, or similar
  tooling. Generated artifacts are local by default unless a phase plan,
  repository policy, or explicit approval makes them durable project artifacts.
- `Tooling drift`: execution-report evidence for tool versions, warnings,
  stale metadata, experimental runtime warnings, skipped checks, and whether
  each warning blocks the phase.
- `Installer CLI`: the `forgeloop init` command that plans or applies
  ForgeLoop files to a target project.
- `Builder agent`: the tool that edits the repository, runs commands, and
  prepares branches, commits, and PR-ready work.
- `Critic agent`: the tool or pass that reviews plans, architecture, diffs,
  risks, and tradeoffs.
- `Single-tool mode`: one tool performs planning, implementation, verification,
  review, and docs in separate passes.
- `Multi-tool mode`: one tool builds and another critiques.
- `Human-plus-tool mode`: one tool builds and the human performs review,
  manual QA, or final judgment.
- `Human-control mode`: how closely the human participates during execution.
  It is separate from engineering rigor. Common modes are Collaborative,
  Approval-gated, Autonomous-with-escalation, Final-QA-only, and Fully
  delegated.
- `Smart test selection`: risk-based verification that runs the smallest
  sufficient set of checks for the changed behavior and affected existing
  behavior.
- `Acceptance-evidence matrix`: a traceability artifact that links requirements
  to scenarios, tests, evidence, results, and residual risk.
- `Brownfield`: work inside an existing codebase with current behavior to
  protect.
- `Greenfield`: work that starts from little or no existing implementation.
- `Maintenance`: repair, cleanup, dependency, documentation, or operational
  work that does not create a new product feature.

## Current Canonical Files

- `FORGELOOP_CORE.md`: compact agent-loading layer.
- `README.md`: project entrypoint and usage guide.
- `AGENTS.md`: repo-local agent instructions for working on ForgeLoop itself.
- `CLAUDE.md`: Claude-specific repo instructions for working on ForgeLoop
  itself.
- `AI-Assisted-Development-Workflow.md`: canonical workflow reference.
- `docs/09-development-plan.md`: ForgeLoop Roadmap / Master Plan.
- `docs/phases/phase-3-installer-integration-tool.md`: in-progress installer
  plan for applying ForgeLoop to target projects.
- `docs/phases/phase-3-5-quality-model-consolidation.md`: completed quality
  model plan for risk-adaptive verification and human-control rules.
- `docs/phases/phase-4-skills-and-gauntlet-extraction.md`: in-progress plan for
  Gauntlet Mode, Quality Envelope reporting, and skill extraction.
- `docs/phases/phase-4-5-process-state-and-gate-integrity.md`: draft plan for
  durable process state, gate receipts, evidence freshness, and future doctor
  invariants.
- `docs/phases/phase-4-6-divergence-review-and-option-space.md`: draft plan for
  optional two-pass divergent option expansion before renewed analysis or
  harness work.
- `docs/templates/`: reusable template pack.
- `docs/templates/phase-transaction-log-template.md`: append-only phase
  approval, evidence, residual-risk, and next-action log.
- `docs/templates/phase-qa-testing-plan-template.md`: per-phase QA command,
  manual debug, negative-path, adversarial-check, traceability, drift, and
  warning template.
- `docs/templates/acceptance-evidence-matrix-template.md`: traceability
  template for strict and release-critical work.
- `docs/templates/verification-contract-template.md`: pre-code agreement that
  defines functional, craft, and contextual verification.
- `docs/templates/evaluator-calibration-template.md`: rubric and example set
  for tuning skeptical evaluator or critic behavior.
- `docs/templates/eval-suite-template.md`: repeatable agent, skill, tool, or
  workflow evaluation suite with tasks, trials, graders, transcripts, outcomes,
  and metrics.
- `docs/templates/context-map-template.md`: context boundary artifact for
  long, brownfield, strict, release-critical, or multi-agent work.
- `docs/templates/harness-assumption-register-template.md`: review artifact for
  assumptions that justify harness scaffolding, context resets, extra agents,
  or evaluator loops.
- `docs/templates/ai-verification-guardrails-template.md`: guardrail checklist
  for AI-generated or AI-shaped changes where production confidence depends on
  understanding, observability, reversibility, and verification-debt review.
- `docs/templates/quality-envelope-report-template.html`: static HTML report
  for complexity, coverage, CRAP or another complexity-plus-coverage risk
  score, mutation, load, performance, operational safety, evidence commands,
  AI guardrails, evidence commands, and residual risk.
- `docs/templates/quality-envelope-schema-template.json`: machine-readable
  sidecar for Quality Envelope reports.
- `docs/templates/performance-test-plan-template.md`: risk-triggered
  performance test planning template.
- `docs/templates/resilience-experiment-template.md`: risk-triggered
  resilience and chaos experiment template.
- `docs/templates/production-rollout-plan-template.md`: risk-triggered rollout
  and rollback planning template.
- `docs/00-index.md`: documentation map.
- `docs/adr/0001-builder-and-critic-roles.md`: role-separation decision.
- `bin/forgeloop.js` and `src/`: early installer CLI.
