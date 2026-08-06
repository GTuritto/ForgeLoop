# Phase 4: Skills And Gauntlet Extraction

## Metadata

- Project: ForgeLoop
- Phase: Phase 4 - Skills And Gauntlet Extraction
- Branch: `main`
- Date: 2026-08-01
- Owner: Giuseppe
- Status: `Complete`
- Execution mode: `Docs-only`
- Tool mode: `Single-tool`
- Human-control mode: `Approval-gated`
- Linked Roadmap / Master Plan item: `docs/09-development-plan.md`

## Goal

Prepare ForgeLoop's stable quality workflow for skill extraction without
building an orchestration harness yet.

The phase defines:

- Gauntlet Mode for high-assurance implementation.
- Verification contracts as the pre-code agreement.
- Quality Envelope reports as the post-code evidence artifact, including CRAP
  or another complexity-plus-coverage risk score when available.
- clean-code skill candidates.
- fresh-context review and handoff triggers.
- semantic code-tool guidance.
- verification-infrastructure templates for evaluator calibration, eval suites,
  context maps, harness assumptions, and AI verification guardrails.
- installer expectations for future skill installation.

## Source Docs To Review

- `FORGELOOP_CORE.md`
- `CONTEXT.md`
- `docs/00-index.md`
- Roadmap / Master Plan: `docs/09-development-plan.md`
- Phase 3.5 plan:
  `docs/phases/phase-3-5-quality-model-consolidation.md`
- Reference workflow: `AI-Assisted-Development-Workflow.md`
- Templates: `docs/templates/`
- Installer code and tests: `src/`, `bin/`, `test/`

## Scope

### In Scope

- Define Gauntlet Mode as an optional high-assurance workflow.
- Add a verification contract template.
- Add a self-contained HTML Quality Envelope report template.
- Add a machine-readable Quality Envelope JSON schema template.
- Add CRAP or another complexity-plus-coverage risk score as a derived Quality
  Envelope metric.
- Identify ForgeLoop-native skill candidates.
- Define future installer behavior for skill installation across agents and
  IDEs.
- Document fresh-context review and context-budget handoff rules.
- Document optional semantic code tooling such as Serena.
- Add templates for evaluator calibration, eval suites, context mapping,
  harness assumption review, and AI verification guardrails.
- Extend Quality Envelope reporting with AI guardrail and verification-debt
  evidence.

### Out Of Scope

- Implementing an orchestration harness.
- Publishing ForgeLoop skills.
- Installing third-party skills into user agents.
- Adding runtime dependencies for HTML report generation.
- Enforcing hard CI quality gates before thresholds are validated.

## Research Drivers

Phase 4 incorporates these research-backed ideas without adding harness code:

- Separate the generator from the evaluator when quality judgment matters.
- Define sprint or verification contracts before implementation.
- Calibrate evaluators against concrete rubrics and failure examples.
- Treat eval tasks, trials, graders, transcripts, and outcomes as first-class
  artifacts.
- Keep context small, prioritized, and recoverable through structured notes.
- Record harness assumptions because model capabilities and harness needs
  change over time.
- Treat AI-assisted delivery as a verification and guardrail problem, not only
  a code-generation problem.

## Sub-Phases

For each sub-phase:

- Name: Gauntlet and contract model
  - Goal: define when Gauntlet Mode applies and how a verification contract
    authorizes implementation.
  - Files, modules, or components: reference workflow, Core if needed,
    `docs/templates/verification-contract-template.md`.
  - Tests: markdown lint and `git diff --check`.
  - Exit signal: high-risk work has a clear pre-code contract artifact.

- Name: Quality Envelope reporting
  - Goal: define an HTML-first evidence report with a JSON sidecar for
    comparison and automation.
  - Files, modules, or components:
    `docs/templates/quality-envelope-report-template.html`,
    `docs/templates/quality-envelope-schema-template.json`, README, index.
  - Tests: markdown lint, JSON parsing, and manual HTML template review.
  - Exit signal: a human can review complexity, coverage, CRAP or another
    complexity-plus-coverage risk score, mutation, load, performance,
    operational safety, commands, and residual risk in one portable report.

- Name: Skill candidates and installer expectations
  - Goal: list stable skills and define how the installer should later offer
    agent and IDE skill installation.
  - Files, modules, or components: roadmap, reference workflow, README, Phase 3
    installer plan if needed.
  - Tests: markdown lint and link review.
  - Exit signal: future implementation has a clear docs-first target.

- Name: Verification infrastructure templates
  - Goal: define templates that make evaluator quality, context boundaries,
    eval suites, harness assumptions, and AI verification guardrails explicit.
  - Files, modules, or components:
    `docs/templates/evaluator-calibration-template.md`,
    `docs/templates/eval-suite-template.md`,
    `docs/templates/context-map-template.md`,
    `docs/templates/harness-assumption-register-template.md`,
    `docs/templates/ai-verification-guardrails-template.md`, README, index,
    context, reference workflow.
  - Tests: markdown lint, JSON parsing, template inventory review, and installer
    dry run.
  - Exit signal: future skills can use stable artifacts before any harness code
    exists.

- Name: Review and evidence
  - Goal: verify docs, inspect diff, and prepare a final handoff.
  - Files, modules, or components: touched docs and templates.
  - Tests: `npm test`, markdown lint, JSON parse, `git diff --check`.
  - Exit signal: checks pass or skipped checks are recorded.

## Skill Candidate Set

- `gauntlet-mode-runner`: applies the
  `SPEC -> RED -> GREEN -> REFACTOR -> GAUNTLET -> EVIDENCE` loop when risk
  justifies it.
- `verification-contract-author`: writes the functional, craft, and contextual
  verification contract before implementation.
- `evaluator-calibrator`: tunes evaluator rubrics, examples, and false
  approval checks before repeated critic or QA use.
- `eval-suite-author`: defines agent, skill, tool, or workflow eval suites with
  tasks, trials, graders, transcripts, outcomes, and metrics.
- `divergence-reviewer`: expands high-ambiguity decisions through isolated
  first-pass divergence, controller synthesis, cross-pollinated second-pass
  divergence, and an option matrix with traps and evidence needs.
- `context-map-curator`: defines must-load, just-in-time, do-not-load, and
  persisted-note boundaries for long or high-risk work.
- `harness-assumption-auditor`: records and reviews the assumptions that justify
  harness scaffolding, context resets, extra agents, or evaluator loops.
- `ai-verification-guardrail-reviewer`: checks whether AI-generated or
  AI-shaped changes are understood, observable, reversible, and free of
  obvious verification debt.
- `quality-envelope-reporter`: produces the HTML report and JSON sidecar after
  verification.
- `change-risk-score-reporter`: calculates CRAP or another approved
  complexity-plus-coverage risk score for changed functions.
- `clean-naming-reviewer`: checks names for intent, ambiguity, consistency,
  searchability, and side effects.
- `clean-function-reviewer`: checks function size, argument count, flags,
  abstraction level, and single responsibility.
- `duplication-and-ownership-reviewer`: finds repeated logic and distinguishes
  accidental similarity from shared business knowledge.
- `error-handling-reviewer`: checks boundary behavior, precision, fallback
  behavior, and exception or result conventions.
- `test-quality-reviewer`: checks behavior naming, useful assertions,
  changed-line coverage, mutation strength, and brittle tests.
- `concurrency-reviewer`: checks race, ordering, retry, idempotency, resource,
  and failure recovery risks.
- `semantic-code-tool-advisor`: recommends symbol-aware tools when brownfield
  edits need reliable reference lookup or refactoring support.

## Quality Envelope Levels

Use the same scale for each measured dimension:

- `0 - unknown`: not measured.
- `1 - stated`: expected but not tested.
- `2 - measured`: tool output exists.
- `3 - compared`: checked against a baseline or previous runs.
- `4 - stressed`: pushed to a limit or observed failure mode.
- `5 - gated`: enforced in CI, release, or another repeatable gate.

## Installer Expectations

Future ForgeLoop installer work may add a skill-install flow after the current
instruction-file installer stabilizes.

The installer should:

- detect local agents and IDEs before proposing skill targets,
- show every selected agent, IDE, file, and skill directory before writing,
- offer install-all-detected and explicit subset selection,
- preserve a plain terminal fallback,
- avoid installing third-party skills without explicit source confirmation,
- keep dry run as the default,
- support ForgeLoop-owned skills before recommending community skill packs.

## Risks And Deferrals

- Risk: Quality levels become a vanity score.
  - Mitigation: levels describe evidence maturity, not overall excellence.
- Risk: CRAP is treated as a universal quality score.
  - Mitigation: use it only as a hotspot signal combining complexity and
    coverage, and tune thresholds per project.
- Risk: Gauntlet Mode becomes mandatory ceremony.
  - Mitigation: trigger it only for strict, release-critical, or high-risk
    work.
- Risk: HTML reports become a dashboard project.
  - Mitigation: keep the first artifact static and self-contained.
- Risk: Evaluator scores become performative certainty.
  - Mitigation: require calibration examples, false-approval notes, and human
    authority for ambiguous release decisions.
- Risk: Harness assumptions become invisible legacy.
  - Mitigation: record cost, evidence, review cadence, and pruning experiments.
- Deferred work:
  - report generation scripts,
  - CI quality gates,
  - skill packaging,
  - marketplace or registry publication,
  - orchestration harness code.

## Approval Gates

- Plan approval required before implementation: `yes`.
- Human test handoff required before PR: `yes`.
- Commit, push, PR, archive, or merge allowed without explicit approval: `no`.

## Exit Criteria

- Gauntlet Mode is defined in the reference workflow.
- Verification Contract template exists and is indexed.
- Quality Envelope HTML and JSON templates exist and are indexed.
- Quality Envelope includes CRAP or another complexity-plus-coverage risk
  score.
- Evaluator Calibration, Eval Suite, Context Map, Harness Assumption Register,
  and AI Verification Guardrails templates exist and are indexed.
- Quality Envelope includes AI guardrail and verification-debt evidence.
- Roadmap lists Phase 4 as the next docs-first skill-extraction phase.
- README explains the HTML-first Quality Envelope artifact.
- Future installer expectations cover agent and IDE skill installation.
- Local verification is recorded.

## Closure Evidence

Recorded 2026-08-06 at closure:

- `npm test`: 19 tests, 19 pass, 0 fail.
- `markdownlint-cli2`: 0 errors across all 36 repo markdown files.
- JSON parse: `quality-envelope-schema-template.json` parses cleanly.
- `git diff --check`: clean.
- Exit criteria: all verified against the repo. One gap found and fixed at
  closure: the Quality Envelope HTML template carried AI guardrail evidence
  but did not render verification debt; a `Verification Debt` block backed by
  the schema's `verification_debt` field was added to
  `docs/templates/quality-envelope-report-template.html`.
- Skipped checks: none.
