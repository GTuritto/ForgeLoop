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
- Performance expectations:
- Observability expectations:
- Release or demo gates:

## Smart Test Selection

- Selection principle:
- Changed-file inputs:
- Changed-symbol inputs:
- Module map inputs:
- Dependency graph inputs:
- Consumer-impact inputs:
- Contract or schema inputs:
- Configuration or runtime inputs:
- Historical failure inputs:
- Business-criticality inputs:

## Test Ladder

- Level 0 structural checks:
- Level 1 focused tests:
- Level 2 affected regressions:
- Level 3 subsystem verification:
- Level 4 system and quality-attribute verification:

## Critical Invariant Suite

- Application startup:
- Primary API or workflow:
- Authentication:
- Authorization or tenant isolation:
- Core transaction:
- Critical calculation:
- Migration coherence:
- Project-specific invariants:

## Execution Mode Mapping

For each execution mode:

- Mode:
- Required checks:
- Optional checks:
- Checks that need explicit deferral:
- Typical fast-path target:

## Integration Strategy

- Database:
- Auth or session:
- File or storage:
- Background jobs:
- External providers:
- Docker-local wiring:
- Boundary implementation:
- Fake or simulator rationale:

## Contract Strategy

- HTTP or REST:
- GraphQL:
- gRPC:
- Events:
- Schemas:
- DTOs or SDKs:
- Provider ports:
- Configuration:
- Rolling-deployment compatibility:

## Performance Strategy

- Triggers:
- Test types:
- Metrics:
- Baseline:
- Regression tolerance:
- Correctness guardrails:

## Resilience Strategy

- Deterministic resilience tests:
- Chaos experiments:
- Faults:
- Guardrails:
- Explicit human authorization needed:

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
- Failure classification: `product defect` | `test defect` |
  `environment defect` | `flaky or nondeterministic` | `unknown`
- Flake quarantine owner and expiry:
- Required report format:
- Owner for triage:

## Exit Criteria

- Required checks pass.
- Skipped checks have explicit rationale.
- Manual QA handoff is complete when required.
- Regression evidence is recorded.
- Residual risk is documented.
