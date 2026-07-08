# Roadmap / Master Plan Template

Use this template for the project-level sequencing document. It sits above
phase plans and prevents agents from treating isolated tasks as the whole
project.

Recommended location:

```txt
docs/09-development-plan.md
```

Split to `docs/roadmap.md` or `docs/master-plan.md` only when the plan becomes
large enough to need independent ownership or review history.

## Metadata

- Project:
- Owner:
- Date:
- Version:
- Project tier: `Throwaway/script` | `Real project` | `Productized/SaaS`
- Current status: `Draft` | `Approved` | `In Progress` | `Blocked` |
  `Complete`
- Source docs reviewed:
- Last updated by:

## Product Intent

State the project goal in plain language.

- Primary user:
- Problem:
- Desired outcome:
- Non-goals:
- Success signals:

## Current State

Describe the current repo and product state.

- Greenfield, brownfield, or maintenance:
- Existing implementation:
- Existing docs:
- Existing tests:
- Known constraints:
- Known risks:

## Planning Hierarchy

```txt
Product Intent
  -> Roadmap / Master Plan
    -> Phase Plan
      -> User Story or Vertical Slice
        -> Task or Sub-phase
```

Every phase below must link back to this plan.

## Milestones

For each milestone:

- Milestone:
- Purpose:
- Target signal:
- Status:

## Phase Sequence

For each phase:

- Phase:
- Goal:
- Depends on:
- Execution mode:
- Status:
- Phase plan:

Status values:

- `Draft`
- `Approved`
- `In Progress`
- `Blocked`
- `Complete`
- `Deferred`

## Dependency Map

List sequencing constraints that agents must respect.

- Phase or milestone:
  - Depends on:
  - Reason:
  - Blocking decision:

## Scope Boundaries

### In Scope

- TBD

### Out Of Scope

- TBD

### Explicit Deferrals

For each deferred item:

- Deferred item:
- Reason:
- Revisit trigger:

## Risk Register

For each risk:

- Risk:
- Impact:
- Mitigation:
- Owner:
- Status:

## Quality Strategy

Define the project-level quality expectations. Phase plans will provide the
phase-specific test detail.

- Minimum test level:
- Required integration boundaries:
- Manual QA expectations:
- Regression expectations:
- Release or demo gates:

## Brownfield Protection

Use this section when the project already has meaningful implementation or
users.

- Existing behavior to protect:
- Compatibility constraints:
- Migration constraints:
- Contracts that must not break:
- Regression evidence required:

## Artifact Map

For each artifact:

- Artifact:
- Location:
- Owner:
- Status:

## Decision Log

Link to ADRs or decision notes.

For each decision:

- Decision:
- Location:
- Status:

## Change Log

For each change:

- Date:
- Change:
- Why:
