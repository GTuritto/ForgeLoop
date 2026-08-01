# ForgeLoop Agent Instructions

Follow [FORGELOOP_CORE.md](FORGELOOP_CORE.md) first.

ForgeLoop is a workflow specification, template pack, and setup CLI. It is not
an orchestration harness. Keep skills and harness work deferred until installer
behavior and the Phase 4 skill-extraction plan are validated.

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
- Use Phase 3.5 and Phase 4 quality rules: choose human-control mode
  separately from execution mode, use smart test selection, and produce
  sufficient evidence for the change's risk. For strict, release-critical, or
  high-risk work, apply the verification contract, Gauntlet Mode, and Quality
  Envelope guidance when the relevant plan requires them.
- Do not add harness code or extract skills before the Roadmap / Master Plan,
  installer behavior, templates, and Phase 4 skill-extraction plan are
  validated.
- Prefer small docs-only edits.
- Run markdown lint on touched Markdown files.
- Do not commit, push, open a PR, or merge unless Giuseppe explicitly asks.
