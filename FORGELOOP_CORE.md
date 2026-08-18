# ForgeLoop Core

Use this file as the default agent-loading layer. Read the full workflow only
when the task needs deeper rules.

## Source Of Truth

Use repository evidence before chat memory:

1. Current code, tests, and Git state.
2. Approved phase plan or brownfield feature plan.
3. Behavior specs, OpenSpecs if used, and BDD scenarios.
4. ADRs and architecture notes.
5. Product, technical, QA, manual test, integration test, and Roadmap / Master
   Plan docs.
6. README and project status.
7. Agent chat history or memory.

## Core Loop

```txt
Idea -> Documents -> Decisions -> Roadmap / Master Plan
     -> Behavior Spec -> Phase Plan -> Branch -> Tests -> Code
     -> Smoke Test -> PR -> Merge
```

## Phase Execution

- Use one long-lived branch per major phase, for example `phase-1`.
- Land ordinary subphases directly on the active phase branch.
- If a subphase expands into a multi-step workstream, create a nested branch
  from the phase branch before implementation begins. Merge it back into the
  phase branch after completion and verification. Do not merge nested subphase
  branches directly into `main`.
- Before implementation starts, classify branch topology: small slice,
  medium subphase, or large phase. If work crosses about five commits,
  multiple modules, or multiple QA surfaces, pause and create a nested branch
  plan.
- Maintain a small phase status ledger with the current phase, current
  subphase, current step, last completed step, next step, steps remaining,
  completion indicator, required verification command, branch owner, and next
  merge target.
- When asked what is next or how many steps remain, answer from the ledger.
- Maintain an append-only phase transaction log in `docs/phase-log.md` or
  `.forgeloop/phase-ledger.jsonl`.
- Work from one approved row at a time:
  `question/decision -> executable spec row -> minimal change -> focused check
  -> full gate -> update counters -> stop`.

## Non-Negotiables

- Classify work as greenfield, brownfield, or maintenance.
- Choose the execution mode: Docs-only, Mechanical, Low-risk, Standard,
  Strict, or Release-critical.
- Choose the human-control mode separately from the execution mode:
  Collaborative, Approval-gated, Autonomous-with-escalation, Final-QA-only, or
  Fully delegated.
- Choose the delivery mode separately: `plan-only`, `implement-only`,
  `commit-only`, `push-approved`, `merge-approved`, `deploy-approved`, or
  `tooling-refresh-only`. Do not escalate delivery mode without explicit user
  approval.
- Record the request boundary before execution: exact authorized action, exact
  stop condition, and actions that require fresh approval.
- Treat scope escalation as an alarm: any new lifecycle-changing action outside
  the request boundary must stop for confirmation before work continues.
- Choose the tool mode: Single-tool, Multi-tool, or Human-plus-tool.
- Confirm the work fits the Roadmap / Master Plan.
- Prepare or update the plan before implementation.
- Every phase QA plan must map requirements to test or spec files, commands,
  evidence, and status. A phase cannot close on QA that was only described.
- For durable or audited workflows, check failure parity: success, refusal,
  failure before side effects, failure after partial side effects, read
  failures, and write failures must all have appropriate evidence.
- Run tooling preflight before graph, handoff, or generated-artifact work:
  verify required runtimes and CLIs, prefer `python3` over `python`, never
  inspect or print secret values, and record environment variable names only.
- Stop for human approval at required gates.
- Implement one sub-phase, story, or vertical slice at a time.
- For behavior-changing work, select the right test layer, write the failing
  test, verify it fails for the expected reason, implement, verify green, run
  affected regressions, inspect the diff, and record evidence.
- Run the smallest sufficient verification set for the change and risk. Use
  change-aware, dependency-aware, and impact-aware selection. Untouched files
  are not automatically unaffected.
- For strict, release-critical, or high-risk work, use a verification contract
  before implementation and a Quality Envelope report when quality,
  performance, load, or operational evidence must be summarized for review.
- Update docs, diagrams, specs, ADRs, and handoff notes when behavior changes.
- Before merging a phase or nested subphase, run focused checks, the full fast
  gate, the phase completion indicator, graph or index refresh when used,
  handoff creation and validation, `git status`, and merge only into the
  declared parent branch.
- Review the diff against the approved plan and current repo evidence.
- Commit, push, open PRs, archive, and merge only after explicit approval.
- After push or PR publication, default to fix-forward. Rewrite published
  history only when the user explicitly authorizes it.
- After completing the requested unit of work, report status and stop unless
  the user explicitly authorizes the next lifecycle action.

## Human Control

Execution rigor and human supervision are independent. A task can be
technically strict while the human chooses Final-QA-only supervision.

The AI normally produces specs, plans, tests, implementation, verification
evidence, reviews, and handoff artifacts. The human owns intent, final manual
acceptance, and authorization for sensitive Git, production, destructive,
security, data-loss, cost, or scope-changing actions.

Even in delegated modes, stop for destructive or irreversible operations,
breaking changes, possible data loss, security-sensitive decisions, material
scope expansion, production chaos, or any proposal to weaken accepted
requirements or important tests.

## Verification Principle

Produce sufficient evidence for the risk introduced by the change.

Do not define healthy testing as running every test on every change. Start with
cheap, high-signal checks, then escalate through focused tests, affected
regressions, subsystem verification, and system or quality-attribute checks
when impact justifies them.

For strict, release-critical, or high-risk changes, escalate to Gauntlet Mode
when the full workflow or phase plan requires it:

```txt
SPEC -> RED -> GREEN -> REFACTOR -> GAUNTLET -> EVIDENCE
```

Use the Quality Envelope to summarize measured levels such as complexity,
coverage, CRAP or another complexity-plus-coverage risk score, mutation
strength, load, performance regression, operational safety, commands, skipped
checks, and residual risk.

## Project Tiers

- `Throwaway/script`: use this Core only. Add tests when risk justifies them.
- `Real project`: add README, `AGENTS.md`, `CONTEXT.md`, Roadmap / Master Plan,
  phase or feature plan, tests, and basic QA notes.
- `Productized/SaaS`: use the full startup pack, behavior specs, ADRs, QA
  plans, manual and integration test plans, diagrams, PR discipline, and
  regression evidence.

## Commit And PR Rule

Commits and PRs must explain both:

- what changed,
- why the change was made.
