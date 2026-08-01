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
- Tool mode:
- Linked Roadmap / Master Plan item:

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

For each sub-phase:

- Name:
- Goal:
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

## Risks And Deferrals

- Risk:
  - Mitigation:
- Deferred work:
  - Reason:

## Approval Gates

- Plan approval required before implementation: `yes`
- Human test handoff required before PR: `yes`
- Commit, push, PR, archive, or merge allowed without explicit approval: `no`
- Hard stops:
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
- Manual test handoff is ready.
- Docs and diagrams are updated.
- Execution report is complete.
- Roadmap / Master Plan status is updated.
