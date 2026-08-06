# Phase 4.6: Divergence Review And Option-Space Expansion

## Metadata

- Project: ForgeLoop
- Phase: Phase 4.6 - Divergence Review And Option-Space Expansion
- Branch: `main`
- Date: 2026-08-05
- Owner: Giuseppe
- Status: `Draft`
- Execution mode: `Docs-only`
- Tool mode: `Multi-tool`
- Human-control mode: `Approval-gated`
- Linked Roadmap / Master Plan item: `docs/09-development-plan.md`

## Goal

Define a ForgeLoop-native divergence-review pattern before the next analysis
run or any orchestration work. The pattern adapts the ADHD-style isolated
ideation loop into a traceable, risk-adaptive workflow for decisions where the
obvious answer may be expensive to reverse.

The phase defines:

- when to use divergent option expansion,
- how to keep first-pass agents isolated,
- how to create a controller-owned handoff packet for a second pass,
- how to turn divergent output into an option matrix with traps, rejected
  alternatives, and required evidence,
- how to validate the pattern with manual evals before any harness code exists.

## Source Docs To Review

- `FORGELOOP_CORE.md`
- `CONTEXT.md`
- `docs/00-index.md`
- Roadmap / Master Plan: `docs/09-development-plan.md`
- Phase 4 plan:
  `docs/phases/phase-4-skills-and-gauntlet-extraction.md`
- Phase 4.5 draft:
  `docs/phases/phase-4-5-process-state-and-gate-integrity.md`
- `docs/templates/evaluator-calibration-template.md`
- `docs/templates/eval-suite-template.md`
- `docs/templates/harness-assumption-register-template.md`

## Scope

### In Scope

- Add a docs-only divergence-review protocol for high-ambiguity planning,
  architecture, API, naming, product, and fuzzy-debugging decisions.
- Define the two-pass pattern:
  - isolated first-pass divergence,
  - controller synthesis,
  - cross-pollinated second-pass divergence.
- Define the handoff packet used between the controller and second-pass agents.
- Define the option-matrix artifact shape.
- Add trigger and abort rules so the pattern does not become default ceremony.
- Define manual evaluation criteria for deciding whether the pattern improves
  ForgeLoop planning quality.

### Out Of Scope

- Implementing parallel agents.
- Implementing an orchestration harness.
- Adding runtime dependencies.
- Publishing or installing a ForgeLoop skill.
- Requiring divergent review for routine docs, syntax, mechanical refactors, or
  known-root-cause bug fixes.

## Trigger Rules

Use Divergence Review only when all are true:

- The decision is open-ended, with multiple viable paths.
- The cost of choosing the obvious answer is material.
- The work affects architecture, API surface, product direction, phase
  sequencing, evaluator behavior, or a fuzzy failure investigation.
- A normal builder and critic pass is unlikely to expose enough option-space
  diversity.

Abort or skip the pattern when any are true:

- The request is quick, canonical, mechanical, or already constrained.
- The root cause is known and implementation can proceed through the normal
  plan, test, code, verify loop.
- The added cost would exceed the risk of simply choosing the conservative
  answer.
- The project is in a release-critical repair path where divergence would delay
  an approved mitigation.

## Protocol

### Pass 1: Isolated Divergence

- Select three to five frames appropriate to the decision.
- Give each branch only the problem, approved context, and its frame.
- Do not share outputs between branches.
- Ask for short candidate ideas only; no ranking or criticism in this pass.
- Preserve branch identity by frame, not by concrete tool or model.

### Controller Synthesis

- Collect all first-pass outputs.
- Deduplicate by underlying angle, not surface wording.
- Cluster ideas into three to six option families.
- Identify assumptions, traps, missing angles, and dominant patterns.
- Create a handoff packet for the second pass.

### Pass 2: Cross-Pollinated Divergence

Second-pass branches receive the controller handoff packet. They do not merely
refine the first pass. They generate:

- hybrids across clusters,
- contradictions to the dominant cluster,
- missing options,
- negative-space ideas that exploit what first-pass agents assumed,
- smallest-practical and maximalist variants when useful.

### Convergence

The controller turns both passes into a decision artifact:

- shortlist,
- recommended option,
- rejected alternatives,
- traps and why they were rejected,
- evidence needed before implementation,
- first safe next step.

## Controller Handoff Packet

The handoff packet should stay compact enough for a fresh agent to use without
loading full transcripts.

Required fields:

- `problem`: one or two sentences.
- `decision_type`: architecture, API, naming, product, phase, evaluator, or
  fuzzy-debugging.
- `context_boundaries`: must-load, optional, and do-not-load context.
- `first_pass_clusters`: cluster labels with short idea summaries.
- `dominant_assumptions`: assumptions repeated across clusters.
- `missing_angles`: angles not covered by the first pass.
- `known_traps`: attractive ideas with hidden costs.
- `second_pass_instruction`: generate hybrids, contradictions, and missing
  options; do not polish the first pass.

## Option Matrix Artifact

Use a lightweight matrix rather than a long prose brainstorm.

Required columns:

- `option`
- `cluster`
- `novelty`
- `viability`
- `fit`
- `trap_flag`
- `primary_risk`
- `evidence_needed`
- `first_step`
- `decision`

Allowed decisions:

- `recommend`
- `hold`
- `reject`
- `needs evidence`

## Sub-Phases

### Sub-Phase 4.6.1: Divergence Review Protocol

- Name: divergence-review protocol.
- Goal: define the trigger rules, abort rules, two-pass loop, and convergence
  artifact.
- Files, modules, or components:
  - this phase plan,
  - `AI-Assisted-Development-Workflow.md`,
  - `docs/00-index.md`.
- Tests: markdown lint and `git diff --check`.
- Exit signal: a future agent can apply the protocol manually without
  inventing missing steps.

### Sub-Phase 4.6.2: Handoff Packet And Option Matrix Template

- Name: handoff packet and option matrix template.
- Goal: add reusable templates for controller synthesis and second-pass
  divergence.
- Files, modules, or components:
  - new `docs/templates/divergence-review-template.md`,
  - README and index template inventory if the template is added.
- Tests: markdown lint and installer inventory review.
- Exit signal: the template captures enough context for second-pass agents
  without sharing full first-pass transcripts.

### Sub-Phase 4.6.3: Evaluation Path

- Name: divergence-review evaluation path.
- Goal: validate whether the pattern improves decision quality before skill or
  harness extraction.
- Files, modules, or components:
  - `docs/templates/eval-suite-template.md`,
  - `docs/templates/evaluator-calibration-template.md`,
  - `docs/templates/harness-assumption-register-template.md`.
- Tests: markdown lint and one manual eval-suite sketch.
- Exit signal: ForgeLoop records whether the pattern finds better options,
  catches traps, or becomes expensive ceremony.

### Sub-Phase 4.6.4: Review And Evidence

- Name: review and evidence.
- Goal: verify docs, inspect diff, and prepare a handoff.
- Files, modules, or components: touched docs and templates.
- Tests: `npm test`, markdown lint, template inventory review, and
  `git diff --check`.
- Exit signal: checks pass or skipped checks are recorded with residual risk.

## QA Plan For This Phase

### Unit Test Plan

- Not applicable. This is a docs-only phase.

### First Valid Test Layer

- Behavior: spec and template clarity.
- Selected layer: `not-applicable`.
- RED evidence required: no.
- Exception rationale: no runtime behavior changes are in scope.

### Smart Test Selection

- Changed files: phase plan, roadmap, index, reference workflow, README, and
  optional divergence-review template.
- Changed symbols: not applicable.
- Affected modules: none.
- Affected consumers: future agents applying ForgeLoop to high-ambiguity
  decisions.
- Contracts or schemas affected: none unless a template is added.
- Configuration or runtime wiring affected: none.
- Critical invariants: no dangling links; no language implying harness code
  exists; no mandatory divergent review for routine work.
- Selected test ladder levels: markdown lint, `git diff --check`, `npm test`
  if template inventory or installer packaging is affected.
- Checks deferred to later stage: automated parallel-agent execution and
  structured scoring.
- Deferral rationale: Phase 4.6 is spec-only.

### Manual Smoke Test

Walk one decision through the template by hand:

- Problem: choose between two plausible architecture or phase-plan paths.
- Pass 1: produce isolated candidate sets under three frames.
- Controller synthesis: cluster ideas and write the handoff packet.
- Pass 2: generate hybrids, contradictions, and missing angles.
- Convergence: create the option matrix and mark the recommended path.

Success signal: the second pass produces at least one non-obvious, viable
option or exposes one material trap that a normal builder and critic pass did
not catch.

## Risks And Deferrals

- Risk: divergence review becomes brainstorming theater.
  - Mitigation: require trigger and abort rules, and record whether the output
    changed the decision.
- Risk: second-pass agents converge too strongly on the first pass.
  - Mitigation: instruct second-pass branches to generate negative-space,
    contradiction, and missing-angle ideas.
- Risk: the pattern weakens ForgeLoop's approval gates.
  - Mitigation: treat divergent output as input to planning, not authorization
    to implement.
- Risk: the template becomes too heavy for ordinary work.
  - Mitigation: keep it optional and high-ambiguity only.
- Deferred work:
  - skill packaging,
  - parallel agent implementation,
  - scoring automation,
  - harness integration,
  - CI or command-line support.

## Approval Gates

- Plan approval required before implementation: `yes`.
- Human test handoff required before PR: `yes`.
- Commit, push, PR, archive, or merge allowed without explicit approval: `no`.

## Exit Criteria

- Phase 4.6 is listed in the roadmap and docs index.
- Divergence Review is defined as an optional, risk-adaptive pattern.
- The two-pass protocol is documented.
- The controller handoff packet is documented.
- The option matrix artifact is documented.
- Evaluation criteria exist before any harness or skill implementation.
- Local verification is recorded.
