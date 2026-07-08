# ADR 0001: Builder And Critic Roles

## Status

Accepted.

## Context

ForgeLoop aims to be tool-agnostic, but early workflow drafts named Codex as the
builder and Claude Code as the critic. That reflected the user's current tool
setup, but it made the workflow look less reusable for projects that only have
one tool or use different agent-capable IDEs.

## Decision

ForgeLoop defines roles before tools:

- the builder agent edits the repo, runs commands, verifies work, and prepares
  commit or PR-ready changes,
- the critic agent reviews plans, architecture, diffs, risk, and tradeoffs.

Codex and Claude Code remain common examples of those roles. They are not hard
requirements.

## Consequences

- Single-tool projects can still follow ForgeLoop by running separate planner,
  implementer, verifier, reviewer, and docs passes.
- Multi-tool projects can assign builder and critic roles to different tools.
- Project-specific `AGENTS.md`, `CLAUDE.md`, or equivalent files decide which
  concrete tools fill the roles.
