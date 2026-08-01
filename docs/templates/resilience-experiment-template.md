# Resilience Experiment Template

Use this template for deterministic resilience tests or chaos experiments when
failure and recovery behavior matters.

Production chaos always requires explicit human authorization.

## Metadata

- Project:
- Phase, story, or feature:
- Date:
- Owner:
- Status: `Draft` | `Ready` | `Complete` | `Blocked`
- Experiment type: `deterministic-resilience-test` | `chaos-experiment`
- Linked behavior spec:
- Linked phase or feature plan:

## Steady State

- User-visible behavior:
- Operator-visible behavior:
- Data integrity condition:
- Telemetry:
- Baseline command or dashboard:

## Hypothesis

- If:
- When:
- Then:

## Fault

- Target:
- Fault type:
- Scope:
- Duration:
- Traffic level:
- Environment:

Fault types may include process termination, dependency outage, added latency,
packet loss, connection reset, network partition, CPU or memory pressure,
connection-pool exhaustion, disk pressure, queue backlog, duplicate messages,
delayed messages, out-of-order messages, and zone or region failure.

## Guardrails

- Abort conditions:
- Data-loss prevention:
- Customer-impact limit:
- Cost limit:
- Production authorization:

## Expected Behavior

- User-visible behavior:
- Operator-visible behavior:
- Retry or fallback:
- Recovery objective:
- Graceful degradation:

## Observation

- Commands:
- Logs:
- Metrics:
- Traces:
- Screenshots:
- Data-integrity result:

## Outcome

- Observed result:
- Hypothesis result: `confirmed` | `rejected` | `inconclusive`
- Remediation:
- Residual risk:
- Follow-up:
