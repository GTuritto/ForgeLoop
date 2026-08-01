# Integration Test Plan Template

Use this template to define real boundaries that must be verified together.

## Metadata

- Project:
- Phase, story, or feature:
- Date:
- Owner:
- Status: `Draft` | `Ready` | `Complete` | `Blocked`

## Boundaries Under Test

- Database:
- Migrations:
- Auth or session behavior:
- API boundaries:
- File or storage:
- Background jobs or queues:
- External provider adapters:
- Docker-local service wiring:
- Contracts or schemas:

## Boundary Implementation

For each boundary:

- Boundary:
- Implementation: `real-local-dependency` | `containerized-dependency` |
  `sandbox-provider` | `protocol-faithful-simulator` | `fake-or-stub`
- Why this is sufficient:
- When this is not sufficient:

## Test Data

- Required seed data:
- Test accounts:
- Fixtures:
- Setup command:
- Teardown command:

## Test Cases

For each integration test:

- Test name:
- Boundary:
- Behavior type: `success` | `rejection` | `unavailable` | `timeout` |
  `partial-completion` | `rollback` | `retry` | `idempotency` |
  `duplicate-delivery` | `out-of-order` | `concurrency` | `recovery`
- Setup:
- Action:
- Expected result:
- Observability expected:
- Cleanup:

## Failure And Recovery Matrix

- Dependency rejection:
- Dependency unavailability:
- Latency or timeout:
- Partial completion:
- Transaction rollback:
- Retry:
- Bounded backoff:
- Idempotency:
- Duplicate delivery:
- Out-of-order events:
- Concurrency:
- Connection recovery:
- Resource cleanup:
- Eventual recovery:
- Failure and recovery observability:

## Commands

- Run integration tests:
- Reset test database:
- Run migrations:
- Start services:

## Safety Rules

- No production services are called.
- Test data resets between runs.
- External services use local fakes or sandbox providers unless explicitly
  approved.

## Success Signal

- Required commands pass.
- Migrations run from an empty database.
- Test database resets between runs.
- No external production services are called.
