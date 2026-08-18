# Phase Plan Template

Use this template for a single approved phase in the Roadmap / Master Plan.

## Metadata

- Project:
- Phase:
- Branch:
- Date:
- Owner:
- Status: `Draft` | `Approved` | `In Progress` | `Blocked` | `Complete`
- Execution mode:
- Human-control mode:
- Delivery mode: `plan-only` | `implement-only` | `commit-only` |
  `push-approved` | `merge-approved` | `deploy-approved` |
  `tooling-refresh-only`
- Tool mode:
- Linked Roadmap / Master Plan item:

## Phase Status Ledger

- Current phase:
- Current subphase:
- Current step:
- Last completed step:
- Next step:
- Steps remaining:
- Completion indicator:
- Required verification command:
- Branch owner:
- Next merge target:
- Phase transaction log:
- Next approved row:
- Next allowed action:
- Exact authorized action:
- Exact stop condition:
- Actions requiring fresh approval:

## Goal

State the phase goal in one paragraph.

## Source Docs Reviewed

- `FORGELOOP_CORE.md`
- `CONTEXT.md`
- `docs/00-index.md`
- Roadmap / Master Plan:
- Behavior specs:
- ADRs:
- Diagrams:
- Tests:

## Scope

### In Scope

- TBD

### Out Of Scope

- TBD

## Assumptions

- TBD

## Open Questions

For each question:

- Question:
- Recommended answer:
- Classification: `repository-resolvable` | `reversible-assumption` |
  `blocking-human-decision`
- Blocking: `yes` | `no`

## Sub-Phases

### Branch Topology Gate

- Classification: `small-slice` | `medium-subphase` | `large-phase`
- Expected commit count:
- Modules or surfaces crossed:
- QA surfaces crossed:
- Nested branch plan required: `yes` | `no`
- Nested branches:
- Review as stacked branches: `yes` | `no`
- Rewrite allowed before push: `yes` | `no`
- Fix-forward required after push or PR publication: `yes`

### Commit Topology Review

- Required before push or PR: `yes` | `no`
- Commits grouped by coherent step:
- Docs, specs, tests, and code paired cleanly:
- Stacked or nested branch review preferred:
- Published history makes rewrite costly:

For each sub-phase:

- Name:
- Goal:
- Branch owner:
- Nested branch required: `yes` | `no`
- Parent branch:
- Files, modules, or components:
- Tests:
- Exit signal:

## Module / Component Plan

- Module map location:
- Modules touched or created:
- Components touched or created:
- Boundaries affected:
- Dependencies affected:
- Uncertain boundaries:
- Human review needed:

## QA Plan For This Phase

Use `docs/plans/phase-N-qa-testing-plan.md` or copy
`docs/templates/phase-qa-testing-plan-template.md` into the phase plan.

### Unit Test Plan

- TBD

### First Valid Test Layer

- Behavior:
- Selected layer: `unit` | `component` | `contract` | `integration` |
  `end-to-end` | `not-applicable`
- RED evidence required:
- Exception rationale:

### Smart Test Selection

- Changed files:
- Changed symbols:
- Affected modules:
- Affected consumers:
- Contracts or schemas affected:
- Configuration or runtime wiring affected:
- Cyclomatic or cognitive complexity impact:
- Critical invariants:
- Selected test ladder levels:
- Checks deferred to later stage:
- Deferral rationale:

### Integration Test Plan

- TBD

### Contract Test Plan

- Required: `yes` | `no`
- Contracts:
- Consumer-impact analysis:

### Performance Test Plan

- Required: `yes` | `no`
- Trigger:
- Budget or baseline:
- Template link:

### Resilience Or Chaos Plan

- Required: `yes` | `no`
- Trigger:
- Faults:
- Explicit production authorization required: `yes` | `no`
- Template link:

### Smoke Test Plan

- TBD

### Manual Test Plan

- TBD

### Regression Test Plan

- TBD

### Test Evidence Required

- TBD

### QA Plan-To-Implementation Trace

For each QA requirement:

- QA requirement:
- Test or spec file:
- Command:
- Evidence:
- Status: `planned` | `implemented` | `deferred` | `blocked`

### QA Drift Gate

- Every promised QA item implemented: `yes` | `no`
- Deferred QA items explicitly marked: `yes` | `no`
- Late tests added because plan missed them:
- New QA categories revealed by implementation:
- Plan updated before closeout: `yes` | `no`

### Failure-Parity Checklist

- Success writes evidence:
- Refusal writes evidence:
- Failure before side effects writes evidence:
- Failure after partial side effects writes evidence:
- Read failures audited:
- Write failures audited:

### Phase Completion Indicator

- Command:
- Expected passing signal:
- Current result:
- Remaining rows or checks:

### Verification Contract

- Required: `yes` | `no`
- Location:
- Approval evidence:
- Functional criteria covered:
- Craft criteria covered:
- Contextual criteria covered:

### Complexity Evidence

- Required: `yes` | `no`
- Tool or source:
- Cyclomatic complexity result:
- Cognitive complexity result:
- CRAP or complexity-plus-coverage result:
- Hotspots and rationale:
- Refactor required before close: `yes` | `no`

### Acceptance-Evidence Traceability

- Matrix required: `yes` | `no`
- Matrix location:
- Release decision owner:

### Quality Envelope

- Required: `yes` | `no`
- HTML report:
- JSON sidecar:
- Complexity level:
- Coverage level:
- CRAP or change-risk level:
- Mutation level:
- Load level:
- Performance regression level:
- Operational safety level:

## Docs And Diagram Updates

- Behavior specs:
- ADRs:
- Diagrams:
- README or status docs:
- Roadmap / Master Plan:

## Generated Artifacts

- Graph or index tools used: `yes` | `no`
- Tooling preflight required: `yes` | `no`
- Required runtimes and CLIs:
- Generated artifact paths:
- Source commit or range:
- Regeneration command:
- Generation timestamp:
- Freshness state: `current` | `stale` | `unknown`
- Ignored or local-only artifacts:
- Durable artifacts approved for commit:
- Metadata compared to `HEAD`:
- Artifact closeout decision: `local-only` | `committed` | `discarded`
- Stale-artifact handling:
- Refresh required before closeout: `yes` | `no`
- Skip rationale:

## Handoff

- Required: `yes` | `no`
- Location:
- Validation command:
- Required template or heading contract:
- Last validation result:

## Risks And Deferrals

- Risk:
  - Mitigation:
- Deferred work:
  - Reason:

## Approval Gates

- Plan approval required before implementation: `yes`
- Human test handoff required before PR: `yes`
- Commit, push, PR, archive, or merge allowed without explicit approval: `no`
- Stop after requested action: `yes`
- Delivery mode escalation requires explicit approval: `yes`
- Boundary approval evidence:
- Blocked escalation attempts:
- Scope escalation alarm:
- Hard stops:
  - creating branches:
  - committing:
  - pushing:
  - opening PRs:
  - merging:
  - deploying:
  - starting next phase:
  - refreshing durable generated artifacts:
  - rewriting history:
  - destructive or irreversible operation:
  - breaking change:
  - data loss or corruption risk:
  - security-sensitive decision:
  - material cost change:
  - major scope expansion:
  - production chaos:

## Exit Criteria

- Scope complete or explicitly deferred.
- Required tests pass.
- QA plan-to-implementation trace is complete.
- QA drift gate is complete.
- Failure-parity checklist is complete when durable or audited workflows are
  touched.
- Phase completion indicator passes.
- Manual test handoff is ready.
- Handoff exists and validates when required.
- Generated graph or index artifacts are refreshed or explicitly skipped when
  used.
- Docs and diagrams are updated.
- Execution report is complete.
- Roadmap / Master Plan status is updated.
- Nested subphase branch has merged into the phase branch when applicable.
- Phase branch merges only into its declared parent branch after phase closeout.
- Topology witness evidence captures branch base, merge target, commit
  ancestry, publication state, and dirty residue.
- Requested delivery mode is complete, and no unapproved next action was
  started.
