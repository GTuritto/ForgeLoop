# AI Verification Guardrails Template

Use this template when a change was generated or substantially shaped by an AI
agent and production confidence depends on more than tests passing.

## Metadata

- Project:
- Phase, story, PR, or release:
- Date:
- Owner:
- Status: `Draft` | `Ready` | `Blocked` | `Accepted With Risk`
- Linked verification contract:
- Linked Quality Envelope:

## Generation Context

- AI tools used:
- Human role:
- Files or modules mostly agent-generated:
- Reviewer familiarity with the changed area:
- Parts the reviewer cannot explain yet:

## Guardrails

For each guardrail:

- Guardrail:
- Required evidence:
- Result: `passed` | `failed` | `blocked` | `not applicable`
- Evidence location:
- Risk if skipped:

Recommended guardrails:

- Reviewer can explain the control flow and failure modes.
- Tests cover changed behavior and at least one negative case.
- Logs and metrics are sufficient for future debugging.
- Rollback, feature flag, canary, or disable path exists when risk requires it.
- External dependencies and rate limits are named.
- Security, privacy, and secrets boundaries are checked.
- No placeholder, demo-only, or speculative code remains.
- Duplicate or unnecessary code is justified or removed.

## Verification Debt

- Missing evidence:
- Manual checks deferred:
- Automation not yet available:
- Owner:
- Due date:
- Release decision impact:

## Verdict

- Ready to ship: `yes` | `no`
- Accepted with risk: `yes` | `no`
- Decision owner:
- Required follow-up:
