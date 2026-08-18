# Phase Transaction Log Template

Use this as `docs/phase-log.md` for human-readable projects, or translate each
row to `.forgeloop/phase-ledger.jsonl` for machine-readable projects. The log
is append-only. Correct mistakes by appending a superseding row.

## Row Template

Append one block per approved row.

### Row YYYY-MM-DD-N

- Phase:
- Slice/step id:
- User decision or approval:
- Exact authorized action:
- Exact stop condition:
- Actions requiring fresh approval:
- Scope escalation alarm:
- Files changed:
- Focused check:
- Full gate:
- Result: `passed` | `failed` | `blocked` | `deferred`
- Residual risk:
- Next allowed action:
- Blocked escalation attempts:
- Boundary acknowledged at:

## Generated Artifact Provenance

For each generated graph, report, handoff, dashboard, index, or similar
artifact:

- Artifact path:
- Source commit or range:
- Regeneration command:
- Generation timestamp:
- Freshness state: `current` | `stale` | `unknown`
- Durability decision: `local-only` | `committed` | `discarded`
- Stale-artifact handling:

## Topology Witness

- Branch:
- Upstream tracking state:
- Merge base:
- HEAD:
- Target branch:
- Ahead/behind:
- Published-history state:
- Commit ancestry reviewed:
- Dirty worktree residue:
- Replay evidence sufficient without chat history: `yes` | `no`

## Commit Topology Review

- Required before push or PR: `yes` | `no`
- Commits grouped by coherent step:
- Docs, specs, tests, and code paired cleanly:
- Stacked or nested branch review preferred:
- Published history makes rewrite costly:

## JSONL Shape

```json
{
  "phase": "phase-N",
  "step_id": "N.N",
  "decision": "approved row or decision",
  "authorized_action": "commit-only",
  "stop_condition": "stop after local commit hash is reported",
  "fresh_approval_required_for": ["push", "merge", "next-phase"],
  "files_changed": ["path"],
  "focused_check": "command",
  "full_gate": "command",
  "result": "passed|failed|blocked|deferred",
  "residual_risk": "summary",
  "next_allowed_action": "plan-only|implement-only|commit-only|push-approved|merge-approved|deploy-approved|tooling-refresh-only|stop"
}
```
