# Phase QA Testing Plan Template

Copy this to `docs/plans/phase-N-qa-testing-plan.md` or embed it in the phase
plan when the phase is small.

## Metadata

- Project:
- Phase:
- Owner:
- Status: `Draft` | `Approved` | `In Progress` | `Complete`
- Linked phase plan:

## Commands

- Focused test command:
- Full verification command:
- Smoke test command:
- Manual debug entry command:

## Manual Debug Steps

Start with the smallest command that proves the changed slice, then escalate to
the full gate.

1. Command:
   Expected result:
   Likely failures:
2. Command:
   Expected result:
   Likely failures:

## Negative-Path Tests

- Scenario:
- Command:
- Expected evidence:
- Status:

## Mutation Or Adversarial Checks

- Required: `yes` | `no`
- Trigger:
- Command or method:
- Expected evidence:
- Status:

## Known Acceptable Warnings

- Warning:
- Source:
- Why acceptable:
- Blocks phase: `yes` | `no`

## QA Plan-To-Implementation Trace

| QA requirement | Test/spec file | Command | Evidence | Status |
| --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | `planned` |

## QA Drift Gate

- Every QA item promised in the phase plan was implemented:
- Anything deferred was explicitly marked:
- Tests added late because the plan missed them:
- New QA categories revealed by implementation:
- Closeout blocker: `yes` | `no`

## Failure-Parity Checklist

- Success writes evidence:
- Refusal writes evidence:
- Failure before side effects writes evidence:
- Failure after partial side effects writes evidence:
- Read failures audited as well as write failures:

## Exit Criteria

- Focused test passes or failure is documented.
- Full verification passes or deferral is approved.
- Smoke test passes or limitation is documented.
- Negative paths are covered or explicitly deferred.
- QA trace has no silent gaps.
- Known warnings are classified as blocking or non-blocking.
