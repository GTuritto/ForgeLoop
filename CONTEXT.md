# ForgeLoop Context

ForgeLoop is a workflow specification for AI-assisted software development. It
is not a coding agent and not yet an executable harness.

## Terms

- `ForgeLoop Core`: the short, loadable spine copied into project instruction
  files such as `AGENTS.md` or `CLAUDE.md`.
- `Full workflow`: the long reference guide in
  `AI-Assisted-Development-Workflow.md`.
- `Canonical concept home`: the file that owns the current definition of a
  repeated workflow concept. Other files should link to it instead of carrying
  competing definitions.
- `Roadmap / Master Plan`: the project-level sequencing document above phase
  plans, User Stories, vertical slices, and tasks.
- `Module / Component Map`: a planning artifact that identifies modules,
  components, responsibilities, dependencies, tests, and uncertain boundaries.
- `Builder agent`: the tool that edits the repository, runs commands, and
  prepares branches, commits, and PR-ready work.
- `Critic agent`: the tool or pass that reviews plans, architecture, diffs,
  risks, and tradeoffs.
- `Single-tool mode`: one tool performs planning, implementation, verification,
  review, and docs in separate passes.
- `Multi-tool mode`: one tool builds and another critiques.
- `Human-plus-tool mode`: one tool builds and the human performs review,
  manual QA, or final judgment.
- `Brownfield`: work inside an existing codebase with current behavior to
  protect.
- `Greenfield`: work that starts from little or no existing implementation.
- `Maintenance`: repair, cleanup, dependency, documentation, or operational
  work that does not create a new product feature.

## Current Canonical Files

- `FORGELOOP_CORE.md`: compact agent-loading layer.
- `README.md`: project entrypoint and usage guide.
- `AGENTS.md`: repo-local agent instructions for working on ForgeLoop itself.
- `AI-Assisted-Development-Workflow.md`: canonical workflow reference.
- `docs/09-development-plan.md`: ForgeLoop Roadmap / Master Plan.
- `docs/templates/`: reusable template pack.
- `docs/00-index.md`: documentation map.
- `docs/adr/0001-builder-and-critic-roles.md`: role-separation decision.
