# Architecture Plan Template

Use this template for system shape, boundaries, deployment assumptions, and
hard-to-reverse technical decisions.

## Metadata

- Project:
- Date:
- Owner:
- Status: `Draft` | `Approved` | `In Progress` | `Superseded`
- Linked Roadmap / Master Plan item:
- Related ADRs:

## Architecture Summary

Describe the architecture in one paragraph.

## System Boundaries

- In-system:
- Out-of-system:
- External services:
- Trust boundaries:

## Module Boundaries

For each module:

- Module:
- Components:
- Responsibility:
- Owns:
- Must not own:
- Depends on:
- Status: `planned` | `confirmed` | `inferred` | `uncertain`
- Module map:

## Data Ownership

- Core entities:
- Ownership boundaries:
- Tenant or workspace boundaries:
- Persistence:
- Retention or deletion rules:

## API And Contract Boundaries

- Public APIs:
- Internal APIs:
- Events:
- Provider ports:
- File or storage contracts:

## Runtime And Deployment

- Local runtime:
- Hosted runtime:
- Background jobs:
- Scheduled jobs:
- Docker services:
- Observability:

## Security And Permissions

- Auth:
- Authorization:
- Secret handling:
- Data access:
- Audit or logging:

## Decisions Needed

For each decision:

- Decision:
- Options:
- Recommendation:
- ADR required: `yes` | `no`

## Diagrams Required

- Architecture:
- Data structure:
- Data flow:
- Process flow:
- Sequence:

## Risks

- Risk:
  - Impact:
  - Mitigation:
