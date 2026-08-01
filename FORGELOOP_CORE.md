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

## Non-Negotiables

- Classify work as greenfield, brownfield, or maintenance.
- Choose the execution mode: Docs-only, Mechanical, Low-risk, Standard,
  Strict, or Release-critical.
- Choose the human-control mode separately from the execution mode:
  Collaborative, Approval-gated, Autonomous-with-escalation, Final-QA-only, or
  Fully delegated.
- Choose the tool mode: Single-tool, Multi-tool, or Human-plus-tool.
- Confirm the work fits the Roadmap / Master Plan.
- Prepare or update the plan before implementation.
- Stop for human approval at required gates.
- Implement one sub-phase, story, or vertical slice at a time.
- For behavior-changing work, select the right test layer, write the failing
  test, verify it fails for the expected reason, implement, verify green, run
  affected regressions, inspect the diff, and record evidence.
- Run the smallest sufficient verification set for the change and risk. Use
  change-aware, dependency-aware, and impact-aware selection. Untouched files
  are not automatically unaffected.
- Update docs, diagrams, specs, ADRs, and handoff notes when behavior changes.
- Review the diff against the approved plan and current repo evidence.
- Commit, push, open PRs, archive, and merge only after explicit approval.

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
