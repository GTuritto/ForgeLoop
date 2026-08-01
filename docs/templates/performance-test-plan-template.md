# Performance Test Plan Template

Use this template when a change affects performance-sensitive behavior. Do not
use it for ordinary changes with no performance risk.

## Metadata

- Project:
- Phase, story, or feature:
- Date:
- Owner:
- Status: `Draft` | `Ready` | `Complete` | `Blocked`
- Linked behavior spec:
- Linked phase or feature plan:

## Trigger

- Hot path:
- Algorithm:
- Database query:
- Serialization:
- Cache:
- Concurrency:
- Batching:
- External-call count:
- Message throughput:
- Memory allocation:
- Runtime or framework upgrade:
- Infrastructure configuration:

## Test Type

- Microbenchmark:
- Component benchmark:
- Query benchmark:
- Performance regression test:
- Load test:
- Stress test:
- Spike test:
- Soak test:
- Capacity test:
- Scalability test:
- Volume test:
- Cost-performance validation:

## Workload

- User or system behavior:
- Representative data:
- Data volume:
- Concurrency:
- Arrival pattern:
- Duration:
- Cold or warm state:
- Test environment:

## Metrics

- Baseline:
- p50:
- p95:
- p99:
- Throughput:
- Error rate:
- CPU:
- Memory:
- Storage:
- Network:
- External-call count:
- Infrastructure cost:

## Correctness Guardrails

- Invariants:
- Data integrity:
- Functional checks:
- Allowed error budget:

## Regression Decision

- Tolerance:
- Result:
- Release impact:
- Follow-up:
