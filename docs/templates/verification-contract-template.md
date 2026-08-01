# Verification Contract Template

Use this template before strict, release-critical, or high-risk implementation
work. The contract defines what "done" means before an agent writes code.

## Metadata

- Project:
- Phase, story, or feature:
- Date:
- Owner:
- Status: `Draft` | `Approved` | `Complete` | `Blocked`
- Execution mode:
- Human-control mode:
- Linked roadmap, phase plan, or issue:
- Linked behavior spec:

## Scope

- In scope:
- Out of scope:
- Existing behavior to preserve:
- Systems, services, or modules touched:
- Data, auth, money, concurrency, production, or public API impact:

## Functional Verification

Does the change do what it must do?

- Acceptance criteria:
- Given/When/Then scenarios:
- Boundary cases:
- Error cases:
- Negative cases:
- Required test layer:
- Required commands:
- Auto checks:
- Manual checks:

## Craft Verification

Is the implementation maintainable?

- Naming expectations:
- Function or module size expectations:
- Cyclomatic or cognitive complexity thresholds:
- CRAP or complexity-plus-coverage threshold:
- Duplication checks:
- Abstraction and ownership boundaries:
- Error handling expectations:
- Test quality expectations:
- Required static-analysis commands:
- Auto checks:
- Manual checks:
- Manual rubric:

## Contextual Verification

Does the change fit the real system?

- Known incidents or historical failures:
- Business rules that must remain centralized:
- Architecture or ADR constraints:
- External dependencies and failure modes:
- Observability required for future debugging:
- Rollback or recovery expectations:
- Manual judgment required:
- Auto checks:
- Manual checks:
- Manual rubric:

## Evaluator Agreement

- Evaluator or critic role:
- Linked evaluator calibration:
- Criteria that must be graded skeptically:
- False approvals to avoid:
- Human override policy:

## Gauntlet Plan

- RED evidence required: `yes` | `no`
- Full test suite required: `yes` | `no`
- Types required: `yes` | `no`
- Lint and format required: `yes` | `no`
- Changed-line coverage required: `yes` | `no`
- Mutation testing required: `yes` | `no`
- Property-based testing required: `yes` | `no`
- Complexity budget required: `yes` | `no`
- CRAP or complexity-plus-coverage score required: `yes` | `no`
- Real execution required: `yes` | `no`
- Supply-chain or secret scan required: `yes` | `no`
- Load, stress, or performance comparison required: `yes` | `no`
- Resilience or recovery test required: `yes` | `no`

## Human Review

- Human must approve this contract before implementation: `yes` | `no`
- Fresh-context review required: `yes` | `no`
- Second human review required: `yes` | `no`
- Approval owner:
- Approval evidence:

## Evidence Outputs

- Execution report:
- Acceptance-evidence matrix:
- Quality Envelope HTML report:
- Quality Envelope JSON report:
- PR description:

## Residual Risk Policy

- Allowed residual risk:
- Risk that blocks release:
- Risk owner:
- Follow-up required:
