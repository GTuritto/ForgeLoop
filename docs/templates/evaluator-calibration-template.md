# Evaluator Calibration Template

Use this template when a critic, reviewer, QA agent, or evaluator must grade
agent output consistently. Calibration belongs before repeated evaluator use,
not after the evaluator has already approved work.

## Metadata

- Project:
- Evaluator name or role:
- Date:
- Owner:
- Status: `Draft` | `Calibrated` | `Needs Tuning` | `Retired`
- Linked workflow, phase plan, or eval suite:
- Model or tool under evaluation:

## Purpose

- Output being evaluated:
- Decision the evaluator can make:
- Decision the evaluator cannot make:
- Human authority retained:

## Rubric

For each criterion:

- Criterion:
- Weight:
- Passing threshold:
- `1` unacceptable:
- `2` weak:
- `3` acceptable:
- `4` strong:
- `5` exceptional:
- Automatic evidence:
- Manual evidence:

## Calibration Examples

Use examples that reveal judgment, not only obvious pass/fail cases.

- Example ID:
- Input or artifact:
- Expected score:
- Expected verdict:
- Reasoning the evaluator should apply:
- Common false approval:
- Common false rejection:

## Failure Modes To Penalize

- Superficial testing:
- Approving because tests pass while behavior is incomplete:
- Ignoring unclear requirements:
- Ignoring production or operational context:
- Accepting placeholder, partial, or demo-only implementation:
- Overfitting to one valid solution path:
- Treating style preference as a release blocker:

## Evaluation Procedure

- Required context:
- Required tools:
- Required commands:
- Required live interaction or manual inspection:
- Maximum retry or revision loop:
- Escalation condition:

## Calibration Results

- Trial count:
- Agreement with human reviewer:
- False approvals:
- False rejections:
- Ambiguous cases:
- Changes made to rubric:
- Remaining evaluator risk:

## Approval

- Calibrated for use: `yes` | `no`
- Approval owner:
- Approval evidence:
