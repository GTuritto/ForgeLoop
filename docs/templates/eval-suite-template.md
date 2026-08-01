# Eval Suite Template

Use this template for repeatable agent, skill, tool, or workflow evaluations.
An eval suite should measure whether a process works across realistic tasks,
not whether one lucky run succeeded.

## Metadata

- Project:
- Suite name:
- Date:
- Owner:
- Status: `Draft` | `Active` | `Retired`
- Capability or behavior under test:
- Linked phase plan, skill, tool, or workflow:

## Purpose

- Decision this suite supports:
- Regression it should catch:
- Capability it should measure:
- Out of scope:

## Evaluation Terms

- Task: one scenario with inputs and success criteria.
- Trial: one attempt at a task.
- Grader: code, model, or human logic that scores the trial.
- Transcript: record of outputs, tool calls, commands, and state changes.
- Outcome: final state that proves success or failure.

## Suite Design

- Task count:
- Trial count per task:
- Required tools:
- Required environment:
- Required seed data:
- Allowed agent autonomy:
- Disallowed shortcuts:
- Pass metric: `pass@k` | `pass^k` | `per-task threshold` | `manual verdict`
- Minimum acceptable result:

## Task Inventory

For each task:

- Task ID:
- User-facing prompt or issue:
- Required context:
- Success criteria:
- Reference solution or expected final state:
- Negative cases:
- Expected tool use, if any:
- Graders:
- Transcript location:
- Outcome evidence:

## Graders

For each grader:

- Grader ID:
- Type: `code` | `model` | `human`
- Assertion:
- Input:
- Passing threshold:
- Failure evidence:
- Known limitations:

## Metrics

- Pass rate:
- `pass@k`:
- `pass^k`:
- Median runtime:
- Token usage:
- Tool-call count:
- Tool errors:
- Retry count:
- Human intervention count:
- Cost:

## Review

- Failures that became tasks:
- Ambiguous tasks to rewrite:
- Broken graders:
- Overfit behavior observed:
- Next suite update:
