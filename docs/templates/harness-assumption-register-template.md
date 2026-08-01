# Harness Assumption Register Template

Use this template before adding or retaining agent harness behavior. A harness
assumption describes what the workflow believes an agent cannot yet do reliably
without scaffolding.

## Metadata

- Project:
- Harness, workflow, or skill:
- Date:
- Owner:
- Status: `Draft` | `Active` | `Retired`
- Review cadence:

## Assumption Inventory

For each assumption:

- Assumption ID:
- Statement:
- Harness behavior it justifies:
- Evidence that made it necessary:
- Cost in time, tokens, money, or complexity:
- Failure if removed:
- Signal that it has gone stale:
- Cheapest experiment to test it:
- Owner:
- Review date:
- Decision: `keep` | `simplify` | `remove` | `defer`

## Current Harness Modes

- Solo:
- Builder plus critic:
- Planner, builder, and evaluator:
- Human-plus-tool:
- Fully delegated with final QA:

## Pruning Review

- Component reviewed:
- Evidence collected:
- Result with component:
- Result without component:
- Quality delta:
- Cost delta:
- Decision:
- Follow-up:

## Risks

- Overfitting the harness to one model:
- Keeping obsolete context-reset behavior:
- Adding ceremony without measurable lift:
- Treating evaluator scores as objective truth:
- Hiding human judgment behind automation:
