# Production Rollout Plan Template

Use this template for production-impacting changes. Do not use it for local
docs-only or ordinary non-production changes.

## Metadata

- Project:
- Phase, story, or feature:
- Date:
- Owner:
- Status: `Draft` | `Ready` | `In Progress` | `Complete` | `Blocked`
- Linked behavior spec:
- Linked phase or feature plan:

## Change Summary

- Change:
- User impact:
- Operator impact:
- Data impact:
- Contract impact:
- Compatibility:

## Preconditions

- Required tests:
- Acceptance-evidence matrix:
- Migration rehearsal:
- Backward compatibility:
- Observability:
- Support or runbook updates:
- Explicit approvals:

## Rollout Strategy

- Strategy: `all-at-once` | `canary` | `progressive` | `feature-flagged` |
  `expand-contract`
- Initial scope:
- Expansion steps:
- Timing:
- Owner:
- Communication:

## Monitoring

- Health checks:
- User-visible metrics:
- Operator-visible metrics:
- Error budget:
- Alerts:
- Dashboards:
- Log queries:

## Rollback

- Rollback trigger:
- Rollback command or procedure:
- Data rollback:
- Contract rollback:
- Feature flag rollback:
- Verification after rollback:

## Decision Log

- Proceed decision:
- Pause decision:
- Rollback decision:
- Residual risk accepted:
