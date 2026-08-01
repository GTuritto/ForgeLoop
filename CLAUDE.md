# ForgeLoop Claude Instructions

Follow [FORGELOOP_CORE.md](FORGELOOP_CORE.md) first.

ForgeLoop is a workflow specification, template pack, and setup CLI. It is not
an orchestration harness. Keep skills and harness work deferred until installer
behavior and the Phase 3.5 quality model are validated.

Default load order:

1. `FORGELOOP_CORE.md`
2. `CONTEXT.md`
3. `docs/00-index.md`
4. only the Roadmap / Master Plan, template, ADR, or workflow section relevant
   to the task

Use [AI-Assisted-Development-Workflow.md](AI-Assisted-Development-Workflow.md)
only when the Core and task-specific files do not answer the process question.

## Repository Rules

- Treat this repo as a `Real project`.
- Keep ForgeLoop prose-first until the templates stabilize.
- Use Phase 3.5 quality rules: choose human-control mode separately from
  execution mode, use smart test selection, and produce sufficient evidence for
  the change's risk.
- Do not add harness code or extract skills before the Roadmap / Master Plan,
  installer behavior, templates, and Phase 3.5 quality model are validated.
- Prefer small docs-only edits.
- Run markdown lint on touched Markdown files.
- Do not commit, push, open a PR, or merge unless Giuseppe explicitly asks.

## Claude Role

Claude may act as a critic, planner, or builder, depending on the task and tool
availability. When acting as critic, review plans and diffs against repository
evidence, the Core, Phase 3.5 quality rules, templates, tests, and residual
risk. When acting as builder, follow the same gates and verification rules as
any other builder agent.
