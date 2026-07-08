# QA Plan Template

Use this template for project-level quality strategy and release gates. Phase
plans should add phase-specific test details.

## Metadata

- Project:
- Date:
- Owner:
- Status: `Draft` | `Approved` | `In Progress` | `Superseded`
- Linked Roadmap / Master Plan item:

## Quality Goals

- User-visible behavior to protect:
- Data or contract boundaries to protect:
- Reliability expectations:
- Security expectations:
- Release or demo gates:

## Test Ladder

- Lint or formatting:
- Typecheck:
- Unit tests:
- Integration tests:
- Contract tests:
- Migration tests:
- Smoke tests:
- Manual tests:
- Regression tests:

## Execution Mode Mapping

For each execution mode:

- Mode:
- Required checks:
- Optional checks:
- Checks that need explicit deferral:

## Integration Strategy

- Database:
- Auth or session:
- File or storage:
- Background jobs:
- External providers:
- Docker-local wiring:

## Manual QA Strategy

- Workflows that need human verification:
- Devices or browsers:
- Test accounts or seed data:
- Screenshots or logs to capture:

## Regression Strategy

- Existing behavior to protect:
- Previous phases to retest:
- Known fragile areas:
- Required regression evidence:

## CI And Local Commands

- Local lint:
- Local unit:
- Local integration:
- Local smoke:
- CI command:

## Defect Handling

- Blocking defect criteria:
- Non-blocking defect criteria:
- Required report format:
- Owner for triage:

## Exit Criteria

- Required checks pass.
- Skipped checks have explicit rationale.
- Manual QA handoff is complete when required.
- Regression evidence is recorded.
- Residual risk is documented.
