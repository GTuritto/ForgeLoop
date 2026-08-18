# Execution Report Template

Use this template at the end of a sub-phase, phase, or User Story.

## Metadata

- Project:
- Phase or story:
- Branch:
- Commit:
- Date:
- Execution mode:
- Human-control mode:
- Delivery mode:
- Tool mode:
- Agent roles used:

## Phase Status Ledger

- Current phase:
- Current subphase:
- Current step:
- Last completed step:
- Next step:
- Steps remaining:
- Completion indicator:
- Required verification command:
- Branch owner:
- Next merge target:
- Phase transaction log:
- Row completed:
- Next allowed action:
- Exact authorized action:
- Exact stop condition:
- Actions requiring fresh approval:
- Blocked escalation attempts:

## Summary

Explain what changed and why.

## Work Completed

- TBD

## Files Changed

- TBD

## Verification

- Smart test selection:
- First valid test layer:
- RED evidence:
- Markdown lint:
- Complexity checks:
- Unit tests:
- Component tests:
- Contract tests:
- Integration tests:
- Performance tests:
- Resilience tests:
- Quality Envelope HTML:
- Quality Envelope JSON:
- Smoke test:
- Manual test:
- Regression checks:
- Phase completion indicator:
- Skipped checks and reason:

## QA Trace

For each QA requirement:

- QA requirement:
- Test or spec file:
- Command:
- Evidence:
- Status: `passed` | `failed` | `deferred` | `blocked`

## QA Drift Gate

- Promised QA items implemented:
- Deferred QA items:
- Late tests added because the plan missed them:
- New QA categories revealed:
- Closeout blocker: `yes` | `no`

## Evidence

Add command outputs, screenshots, logs, or links when useful.

- TBD

## Acceptance-Evidence Matrix

- Matrix required: `yes` | `no`
- Matrix location:
- Criteria covered:
- Criteria not covered:
- Release decision:

## Defects Found

- Found by QA:
- Found by review:
- Fixed:
- Deferred:
- Failure classifications:

## Failure-Parity Checklist

- Success evidence:
- Refusal evidence:
- Failure before side effects evidence:
- Failure after partial side effects evidence:
- Read-failure audit:
- Write-failure audit:
- Gaps:

## Docs Updated

- Roadmap / Master Plan:
- Phase plan:
- Behavior specs:
- ADRs:
- Diagrams:
- README or status docs:

## Generated Artifacts

- Tooling preflight:
- Graph or index refresh:
- Artifact paths:
- Source commit or range:
- Regeneration command:
- Generation timestamp:
- Freshness state: `current` | `stale` | `unknown`
- Local-only or ignored artifacts:
- Artifacts committed:
- Artifacts skipped and reason:
- Metadata compared to `HEAD`:
- Closeout decision: `local-only` | `committed` | `discarded`
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

## Tooling Drift

- Tool versions:
- Warnings:
- Stale metadata:
- Experimental runtime warnings:
- Skipped checks:
- Blocking warnings:

## Handoff

- Location:
- Validation command:
- Validation result:
- Template or heading contract:

## Closeout Checklist

- Focused checks:
- Full fast gate:
- Phase completion indicator:
- Graph or index refresh:
- Handoff created or updated:
- Handoff validated:
- Git status reviewed:
- Correct parent branch:
- Branch and remote state confirmed:
- Target branch current:
- Topology witness captured:
- Generated-artifact provenance current or waived:
- Project status/context docs updated:
- Next phase marked planning-only until approved:
- Scope escalation alarm honored:
- Stop condition honored:

## Manual Test Handoff

- Startup command:
- URL or entry point:
- Steps:
- Expected result:
- Known limitations:

## Residual Risk

- TBD

## Verdict

- `Complete`
- `Blocked`
- `Needs Review`

## Follow-Up

- TBD
