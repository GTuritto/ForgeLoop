# Behavior Spec Template

Use this template when a change needs behavior agreed before implementation.

## Metadata

- Project:
- Change:
- Date:
- Owner:
- Status: `Draft` | `Approved` | `Implemented` | `Archived`
- Linked Roadmap / Master Plan item:
- Linked phase plan:

## Behavior Summary

Describe the expected behavior in plain language.

## Current Behavior

- Existing behavior:
- Existing evidence:
- Known limitations:

## Required Behavior

- Problem:
- Intended outcome:
- Required behavior:
- Non-goals:

## Actors

- Primary actor:
- Supporting actors:
- System boundaries:

## Invariants And Rules

- Business invariants:
- Permissions:
- State transitions:
- Validation:
- Error handling:
- Data persistence:
- External calls:

## Scenario Taxonomy

Use only the scenario types relevant to the risk.

- Positive scenarios:
- Negative scenarios:
- Boundary scenarios:
- Permission scenarios:
- Dependency failure scenarios:
- Partial failure scenarios:
- Retry scenarios:
- Duplicate operation scenarios:
- Idempotency scenarios:
- Ordering scenarios:
- Concurrency scenarios:
- Recovery scenarios:
- Graceful degradation scenarios:
- Observable user status:
- Observable operator status:
- Consequences that must not occur:

## Reliability And Quality Attributes

- Compatibility:
- Security expectations:
- Performance budgets:
- Reliability expectations:
- Observability requirements:
- Rollout considerations:
- Rollback considerations:

## Scenarios

Use Given/When/Then for externally observable behavior.

```txt
Given
When
Then
```

## Contracts

- API:
- Events:
- Schemas:
- DTOs or SDKs:
- Provider ports:
- Configuration:
- Files:

## Acceptance Criteria

- TBD

## Test Mapping

- First valid test layer:
- Unit tests:
- Component tests:
- Contract tests:
- Integration tests:
- Performance tests:
- Resilience tests:
- Smoke tests:
- Manual tests:
- Regression tests:

## Acceptance-Evidence Mapping

Use a separate acceptance-evidence matrix for strict or release-critical work.

- Requirement:
- Scenario:
- Test layer:
- Command or test identifier:
- Evidence location:
- Result:
- Residual risk:

## Assumptions

For each assumption:

- Assumption:
- Evidence:
- Reversibility:
- Impact if wrong:

## Open Questions

- Question:
  - Recommended answer:
  - Blocking: `yes` | `no`
