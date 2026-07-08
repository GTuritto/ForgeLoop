# Brownfield Feature Plan Template

Use this template when adding or changing behavior in an existing codebase.

## Metadata

- Project:
- Feature:
- Branch:
- Date:
- Owner:
- Status: `Draft` | `Approved` | `In Progress` | `Blocked` | `Complete`
- Execution mode:
- Linked Roadmap / Master Plan item:

## Goal

State the feature goal in one paragraph.

## Current Behavior

- Existing user workflow:
- Existing code path:
- Existing data:
- Existing tests:
- Known defects or limitations:

## Impact Map

- Modules:
- Public APIs, routes, commands, or events:
- Data model and migrations:
- UI flows:
- Background jobs:
- External providers:
- Auth, permissions, or tenant boundaries:
- Docs and diagrams:
- Tests:

## Compatibility Plan

- Change type: `additive` | `behavior-changing` | `migration-backed` |
  `contract-breaking` | `feature-flagged` | `expand-contract`
- Compatibility constraints:
- Migration or backfill:
- Rollback plan:
- Explicit approval needed:

## Behavior Spec Update

- Spec location:
- New behavior:
- Non-goals:
- Acceptance criteria:
- BDD scenarios:

## Vertical Slice Plan

For each slice:

- Slice:
- User-visible behavior:
- Files or modules:
- Tests:
- Exit signal:

## QA Plan

- Unit tests:
- Integration tests:
- Contract tests:
- Migration tests:
- Smoke test:
- Manual test:
- Regression evidence:

## Risks

- Risk:
  - Mitigation:

## Approval Gates

- Plan approval before implementation: `yes`
- Final human gate before commit, push, PR, archive, or merge: `yes`
