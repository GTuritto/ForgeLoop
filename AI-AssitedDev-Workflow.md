# AI-Assisted Development Workflow

This guide defines Giuseppe's standard workflow for building projects with VS
Code, Codex, Claude Code, GitHub, [OpenSpec](https://github.com/Fission-AI/OpenSpec), Knowledge Driven Development,
Behaviour Driven Development, [Kaddo](https://github.com/Kaddo-kdd/kaddo),
tests, Mermaid diagrams, and local Docker
development.

## Core Rule

Do not start from vibes, loose chat history, or an agent's memory. Start from
the current repository state:

```txt
Idea -> Documents -> Decisions -> OpenSpec -> Phase Plan -> Branch -> Tests -> Code -> Smoke Test -> PR -> Merge
```

The source of truth is always the repo: docs, OpenSpecs, ADRs, current code,
tests, and Git state.

## Tool Roles

### User

The user owns:

- product direction,
- approval gates,
- priority tradeoffs,
- manual testing feedback,
- final merge approval,
- decisions that change scope, architecture, security, cost, or business model.

### VS Code

VS Code is the project control room.

Use it for:

- keeping the active repo visible,
- reviewing diffs,
- reading docs and OpenSpecs side by side,
- running terminals,
- observing Docker logs,
- comparing Codex and Claude Code outputs,
- running manual smoke tests.

VS Code is not the source of truth. Useful notes from editor tabs, terminals,
or chats must be moved into the right artifact: phase plan, OpenSpec, ADR,
`CONTEXT.md`, README, or review log.

### Codex

Codex is the execution agent.

Use Codex for:

- repository inspection,
- docs-first planning,
- implementation,
- test creation,
- local command execution,
- Docker verification,
- GitHub setup,
- branch, commit, and PR preparation,
- code review and diff audits.

Codex should produce the actual branch, files, tests, verification output, and
PR-ready state.

Codex must not push, open a PR, merge, or push to `main` unless the user
explicitly says the work is ready for that action.

### Claude Code

Claude Code is the critic, design reviewer, and long-context reasoning partner.

Use Claude Code for:

- architecture critique,
- phase-plan review,
- adversarial review of implementation,
- alternative designs,
- broad refactor analysis,
- product and strategy stress-testing.

Claude Code should produce review notes, questions, alternatives, or proposed
plans. Codex applies accepted changes to the repo.

Claude Code should not proceed from unclear objectives. If review raises
blocking questions, answer them and update the phase plan before Codex
implements.

### Kaddo

[Kaddo](https://github.com/Kaddo-kdd/kaddo) is a Knowledge Driven Development
support layer.

Use Kaddo for:

- deterministic repository scans,
- context packs,
- work items,
- ownership hints,
- knowledge drift checks,
- agent handoff context.

Kaddo does not replace OpenSpecs, phase plans, tests, GitHub PRs, or human
review.

## Required Startup Documents

Every serious project should start with these files.

### Root Files

- `README.md`: project summary, current state, setup, documentation map, first
  milestone.
- `AGENTS.md`: Codex-facing repo instructions. Keep this repo-specific.
- `CLAUDE.md` or `CODEX.md`: optional tool-specific guidance when needed.
- `CONTEXT.md`: domain glossary only. No implementation plan or scratch notes.
- `.gitignore`: ignores secrets, machine files, build output, local assistant
  history, generated caches, and env files.
- `.env.example`: safe environment template. Never commit real secrets.

### Product And Build Documents

- `docs/01-prd.md`: product requirements, users, scope, non-goals, metrics.
- `docs/02-product-positioning.md`: category, buyer, wedge, competitors,
  messaging.
- `docs/03-architecture-decisions.md`: high-level decisions and tradeoffs.
- `docs/04-user-journey.md`: first-run flow, core loop, failure states.
- `docs/05-functional-requirements.md`: user-visible requirements.
- `docs/06-technical-requirements.md`: persistence, integrations, security,
  cost, observability.
- `docs/07-product-specification.md`: objects, screens, workflows, permission
  rules.
- `docs/08-qa-plan.md`: unit, integration, smoke, acceptance, AI evals,
  security tests, release gates.
- `docs/09-development-plan.md`: ordered phases, deliverables, exit criteria.
- `docs/10-go-to-market.md`: market, launch offer, channels, pricing
  hypothesis.
- `docs/11-red-team-review.md`: product, architecture, security, and GTM
  criticism.
- `docs/12-codex-build-guide.md`: Codex execution workflow.
- `docs/13-saas-readiness-checklist.md`: operational and launch gates when
  relevant.
- `docs/14-document-review-log.md`: critique and revision history.
- `docs/15-sales-narrative-and-demo.md`: buyer story and demo script.
- `docs/16-project-knowledge-brief.md`: condensed orientation for agents.
- `docs/17-development-workflow.md`: branch, phase, testing, manual QA, PR
  process.
- `docs/18-openspec-kdd-bdd.md`: OpenSpecs, KDD, BDD, traceability.
- `docs/19-local-docker-development.md`: Docker-local development contract.
- `docs/templates/phase-plan-template.md`: phase-plan template.
- `docs/phases/README.md`: approved phase plans.

### Diagrams

Every serious project should include Mermaid diagrams under:

```txt
docs/diagrams/
  architecture.md
  data-structure.md
  data-flow.md
  process-flows.md
  sequences.md
```

Required diagram types:

- architecture diagrams,
- data structure diagrams,
- data flow diagrams,
- process flow diagrams,
- sequence diagrams.

Diagrams must evolve as the project advances. Future-state diagrams must be
labeled as future-state.

### ADRs

ADRs live under:

```txt
docs/adr/
```

Create an ADR only when a decision is:

- hard to reverse,
- surprising without context,
- the result of a real tradeoff.

### OpenSpecs

OpenSpecs define behavior before implementation.

Recommended structure:

```txt
openspec/
  README.md
  changes/<change-id>/
    proposal.md
    design.md
    spec.md
    tasks.md
```

Small projects can use phase-scoped OpenSpecs:

```txt
openspec/phase-N-short-name/
  spec.md
  scenarios.md
  contracts.md
```

## Architecture Defaults

Default project architecture:

- use a monorepo unless there is a clear reason not to,
- separate frontend and backend as distinct apps or deployable boundaries,
- prefer a distributed or modular monolith over microservices,
- keep module boundaries strong even when deployment is simple,
- route frontend access through backend APIs or application services,
- do not let frontend code, plugins, scripts, or agents bypass backend
  boundaries to reach operational data directly,
- use event/outbox or background-job seams before adding brokers or distributed
  service choreography.

Microservices require an ADR explaining:

- why a modular or distributed monolith is insufficient,
- ownership and deployment boundaries,
- data ownership,
- failure modes,
- operational cost,
- testing strategy,
- local Docker impact.

## Project Startup Checklist

1. Create private GitHub repo when the work is proprietary.
2. Initialize local git repo.
3. Add `.gitignore`.
4. Create the startup document pack.
5. Define canonical terms in `CONTEXT.md`.
6. Add initial ADRs for hard-to-reverse decisions.
7. Create OpenSpec root.
8. Create diagram folder and starter diagrams.
9. Create development workflow docs.
10. Create phase-plan template.
11. Create local Docker development contract.
12. Commit the foundation.
13. Push `main` only when user explicitly approves.
14. Create branch for Phase 0.
15. Prepare Phase 0 plan.
16. Wait for user approval before code.

## Canonical Phase Workflow

Every phase follows this loop.

### 1. Start From Main

```sh
git switch main
git pull --ff-only
git status --short
```

The worktree must be clean except ignored local files.

### 2. Create Branch

```sh
git switch -c codex/phase-N-short-name
```

Recommended pattern:

```txt
codex/phase-0-product-repo-foundation
codex/phase-1-saas-foundation
codex/phase-2-sources
```

### 3. Analyze Phase

Codex reads:

- `README.md`,
- `AGENTS.md`,
- `CONTEXT.md`,
- relevant docs,
- relevant ADRs,
- relevant OpenSpecs,
- diagrams,
- current code,
- current tests,
- `git status`.

If files or commands can answer a question, inspect them before asking.

### 4. Grill Me With Docs Gate

Before a phase plan is approved, run **Grill Me With Docs**.

Rules:

- challenge the plan against `CONTEXT.md`, ADRs, OpenSpecs, docs, diagrams,
  current code, and tests,
- ask one question at a time,
- provide a recommended answer for every question,
- answer from repo evidence first when possible,
- update `CONTEXT.md` immediately when domain terms are resolved,
- offer ADRs only for hard-to-reverse, surprising, real tradeoffs.

The phase is not ready for implementation until every blocking question is
answered and the objective is clear.

### 5. Create Phase Plan

Create:

```txt
docs/phases/phase-N-short-name.md
```

The plan must include:

- goal,
- source docs reviewed,
- scope,
- out-of-scope items,
- assumptions,
- open questions,
- sub-phases,
- tasks per sub-phase,
- OpenSpec changes,
- Kaddo notes if used,
- KDD notes,
- BDD scenarios,
- unit test plan,
- smoke test plan,
- integration test plan,
- Docker commands,
- diagram updates,
- manual test handoff,
- exit criteria,
- risks and deferred work.

No implementation before user approval.

### 6. Create Or Update OpenSpecs

OpenSpecs are the behavior contract.

Define:

- accepted behavior,
- non-goals,
- permission rules,
- state transitions,
- contracts,
- BDD scenarios,
- acceptance criteria.

Use OpenSpecs for observable behavior changes. Skip only for trivial docs-only
or mechanical changes.

### 7. User Approval Gate

Approval means:

- scope is correct,
- sub-phases are acceptable,
- testing plan is sufficient,
- diagram plan is sufficient,
- manual test handoff is clear,
- out-of-scope list is accepted.

If scope changes, update the plan before coding.

### 8. Implement One Sub-Phase At A Time

For each sub-phase:

1. Set an explicit sub-phase goal for the agent.
2. Re-check `git status`.
3. Gather full context before editing:
   - phase plan,
   - OpenSpecs,
   - `CONTEXT.md`,
   - ADRs,
   - docs,
   - diagrams,
   - relevant source tree,
   - tests,
   - nearby ownership boundaries.
4. Resolve all blocking questions before coding.
5. Implement the smallest coherent unit.
6. Add or update tests.
7. Run the sub-phase test suite until green.
8. Update docs, OpenSpecs, and diagrams if behavior changed.
9. Review the diff.

Do not continue to the next sub-phase while the current one has failing tests,
unresolved blocking questions, or unclear objectives.

### 9. Testing Ladder

Always:

- lint or formatting check,
- unit tests for new behavior,
- smoke test for phase handoff.

Add when relevant:

- integration tests for database, auth, storage, background jobs, external
  adapters, Docker service wiring,
- behavior/API tests for user-visible workflows,
- contract tests for OpenAPI or provider ports,
- migration tests for schema changes,
- AI eval fixtures for LLM behavior,
- security tests for tenant boundaries and secret handling.

At the end of each sub-phase:

- the sub-phase test suite must pass green,
- failures must be reported with likely causes and recommended fixes,
- unresolved issues must be classified as blocking, deferred, or rejected.

At the end of the phase:

- run all tests required for the current phase,
- run regression tests from previous completed phases,
- run the phase smoke test,
- report every failure,
- offer concrete solution options before proceeding.

### 10. Phase Documentation Gate

Before a phase can close, update project documentation so a future human or
agent can understand the current state.

Required updates:

- project status,
- completed phase status,
- current phase result,
- testing status,
- smoke test result,
- what changed,
- what is new,
- what was deferred,
- known issues,
- README alignment,
- OpenSpecs alignment,
- Mermaid diagrams aligned with current architecture and behavior,
- ADRs for new hard-to-reverse decisions,
- `CONTEXT.md` if domain language changed,
- phase plan status.

The docs must answer:

- What phase was completed?
- What behavior exists now?
- What tests passed?
- What manual testing was done?
- What changed from the previous state?
- What remains incomplete or deferred?
- Is the README accurate?
- Are OpenSpecs, ADRs, phase plans, and diagrams aligned?

Do not close a phase if docs describe an older project state.

### 11. Manual Test Handoff

Before asking the user to test, provide:

- branch name,
- local Docker commands,
- URL or command entry point,
- test account or seed data,
- exact steps,
- expected results,
- known limitations,
- what feedback is needed.

### 12. Process Feedback

Every user comment becomes one of:

- required before phase completion,
- valid but later phase,
- rejected with reason,
- needs more investigation.

Do not start the next phase until current phase exit criteria are met.

### 13. Pull Request

Open a GitHub Pull Request only after the user says the branch is ready for PR.

PR must include:

- phase summary,
- sub-phases completed,
- tests run,
- Docker commands run,
- smoke test result,
- documentation updated,
- project status updated,
- diagram updates,
- manual test notes,
- OpenSpecs updated,
- Kaddo notes if used,
- risks and deferred work.

If the user explicitly approves an early review branch, use a draft PR. Without
that approval, keep PR notes local until the branch is approved for push.

### 14. Merge And Reset

Never push a branch, open a PR, merge, or push to `main` until the user
explicitly says the work is ready for that action.

After approval and merge:

```sh
git switch main
git pull --ff-only
git status --short
```

Then prepare the next phase.

## Diagram Requirements

Maintain Mermaid diagrams under `docs/diagrams/`.

Required files:

- `architecture.md`
- `data-structure.md`
- `data-flow.md`
- `process-flows.md`
- `sequences.md`

Architecture diagrams show:

- system boundaries,
- deployables,
- modules,
- external services,
- trust boundaries,
- local vs hosted services.

Data structure diagrams show:

- core entities,
- ownership,
- cardinality,
- important identifiers,
- tenant or workspace boundaries,
- lifecycle states.

Data flow diagrams show:

- how data enters,
- where it is transformed,
- where it is persisted,
- how it is retrieved,
- where external APIs or model calls happen.

Process flow diagrams show:

- user workflows,
- phase workflows,
- approval gates,
- background jobs,
- retry and failure paths.

Sequence diagrams show:

- request/response behavior,
- API calls,
- background job handoff,
- agent/tool interactions,
- external integration interactions.

At phase end, verify:

- every required diagram type exists or is explicitly deferred with reason,
- diagrams reflect current implementation,
- diagrams do not describe future behavior as current behavior,
- new systems appear in architecture and data-flow diagrams,
- new persisted data appears in data-structure diagrams,
- new workflows appear in process-flow diagrams,
- non-trivial interactions appear in sequence diagrams.

## Kaddo Workflow

Use Kaddo as optional KDD support, especially after Phase 0.

Recommended first pass:

```sh
npx @kaddo/cli --help
npx @kaddo/cli init
npx @kaddo/cli scan
npx @kaddo/cli context
npx @kaddo/cli understand
```

Rules:

- do not globally install Kaddo by default,
- inspect generated `.kaddo/` and `knowledge/` artifacts before committing,
- do not let Kaddo overwrite `AGENTS.md` or `CLAUDE.md` without review,
- map approved phase plans to Kaddo Work Items if useful,
- use Kaddo Guard as a drift signal, not as a test replacement,
- keep OpenSpecs as the behavior source of truth.

Recommended cadence:

- once per repo setup: `kaddo init`,
- after docs or scaffold changes: `kaddo scan`,
- before asking an agent to understand the repo: `kaddo context` and
  `kaddo understand`,
- when turning roadmap or phase work into tracked work:
  `kaddo create --from roadmap`,
- after meaningful code changes: `kaddo scan`,
- before commit or PR: `kaddo guard`,
- when unsure what is stale: `kaddo explain` or `kaddo understand`.

## Codex And Claude Code Collaboration

Use VS Code as the shared cockpit, Codex as the builder, and Claude Code as the
critic or design reviewer.

Default loop:

```txt
VS Code opens repo -> Codex inspects and edits -> Docker/tests run -> Claude Code reviews plan or diff -> Codex applies accepted changes -> GitHub PR records the result
```

Do not ask both agents to implement the same change in parallel.

### Agent Goals

Every phase and sub-phase starts with an explicit agent objective.

For Codex, use a Goal when work is multi-step or needs persistence.

For Claude Code, use the closest equivalent: a clear session objective, stopping
conditions, approval gates, and expected output.

The objective should include:

- phase or sub-phase name,
- source documents to read,
- files or modules in scope,
- tests that must pass,
- questions that must be answered before coding,
- what counts as done,
- whether the agent may commit, push, or open a PR.

### Recommended Multi-Agent Phase Flow

1. Use Codex to prepare the phase plan and OpenSpecs.
2. Review the plan in VS Code.
3. Send the phase plan to Claude Code for adversarial critique.
4. Decide which Claude Code feedback is accepted.
5. Use Codex to update the phase plan and docs.
6. Approve the phase plan.
7. Use Codex to gather full context at each sub-phase start.
8. Use Codex to implement one sub-phase at a time.
9. Require the sub-phase test suite to pass green before continuing.
10. Use Claude Code for review after meaningful milestones or before PR.
11. Use Codex to apply accepted fixes and run verification.
12. At phase end, run current phase tests plus previous phase regressions.
13. Update project documentation and diagrams before phase close.
14. Use VS Code for manual smoke testing.
15. Use GitHub PR as the final review record only after the user says it is
    ready.

### Conflict Rules

- If Codex and Claude Code disagree, repo docs, OpenSpecs, ADRs, current code,
  and tests win over chat memory.
- If docs are unclear, update docs before implementation.
- If both agents propose different architectures, capture the tradeoff in the
  phase plan or ADR before coding.
- If Claude Code suggests broad refactors outside the phase, defer them unless
  needed for phase exit criteria.
- If Codex finds code contradicts the plan, stop and revise the plan.
- If tests fail, report the failure, likely cause, and solution options.

## GitHub Rules

- Use private repos for proprietary product work.
- Branch from latest `main`.
- Do not implement on `main`.
- Use PRs as the review surface.
- Require status checks once CI exists.
- Merge only after phase exit criteria pass.
- Never push, open a PR, or merge until the user explicitly says the work is
  ready.
- Keep ignored local files out of commits.
- Do not commit secrets, `.env`, assistant raw history, or local machine files.

## Docker Rules

- Every serious project should run locally through Docker or Docker Compose.
- Phase 0 should create the Docker-local foundation.
- Commands should be documented.
- Manual tests should not require hidden local services.
- External services should use fakes until a phase explicitly needs sandbox
  integration.

Expected command contract:

```txt
dev
test
test:unit
test:integration
smoke
lint
typecheck
db:migrate
db:reset
```

The exact tool can be `make`, package scripts, `just`, taskfiles, or project
native commands. The important part is reproducibility.

## Testing Standards

Unit tests cover:

- domain logic,
- value objects,
- authorization rules,
- parsers,
- state transitions,
- schema validation,
- adapters with fakes.

Behaviour tests use Given/When/Then for user-visible workflows.

Example:

```gherkin
Scenario: Workspace owner creates an initiative
  Given a signed-in workspace owner
  When they create an initiative with a name and rough idea
  Then the initiative belongs to the active workspace
  And it becomes the active context boundary
```

Integration tests cover real boundaries:

- database,
- migrations,
- auth,
- file storage,
- background jobs,
- vector search,
- external provider adapter,
- Docker service.

Every phase must have a smoke test with:

- command to start locally,
- URL or entry point,
- step-by-step scenario,
- expected result,
- cleanup.

## Required Agent Prompts

### New Phase

```txt
Read README.md, AGENTS.md, CONTEXT.md, docs/09-development-plan.md,
docs/17-development-workflow.md, docs/18-openspec-kdd-bdd.md, diagrams, and
relevant ADRs.

Prepare Phase N only.
Create docs/phases/phase-N-short-name.md from the phase plan template.
Create or update OpenSpecs and Mermaid diagrams for this phase.
Include KDD notes, BDD scenarios, Docker commands, unit tests, smoke test,
integration tests if needed, manual test handoff, exit criteria, risks, and
out-of-scope items.

Run a Grill Me With Docs pass against CONTEXT.md, ADRs, OpenSpecs, diagrams,
docs, and source code.
Ask one blocking question at a time and provide your recommended answer.

Do not implement until I approve the plan.
```

### Implementation

```txt
Implement Phase N, Sub-Phase X from the approved plan.
Set this as the active goal for the agent.
Before editing, inspect git status, docs, OpenSpecs, diagrams, tests, nearby
code, and the full source context relevant to this sub-phase.
Resolve all blocking questions before implementation.
Keep changes scoped.
Add or update tests.
Run the sub-phase Docker-local verification until green.
Update docs, OpenSpecs, and diagrams if behavior changed.
Report changed files, tests run, smoke-test status, unresolved issues, proposed
solutions, and residual risk.
Do not push, open a PR, or merge unless I explicitly say we are ready.
```

### Review

```txt
Review the current branch against the approved phase plan, OpenSpecs, diagrams,
ADRs, technical requirements, and tests.
Lead with bugs, missing tests, architecture drift, security issues, and behavior
that does not match the spec.
Do not summarize first.
```

## Phase 0 Standard

Phase 0 should usually deliver:

- private GitHub baseline,
- `.gitignore`,
- `.env.example`,
- app scaffold,
- package manager setup,
- Docker Compose foundation,
- database container if needed,
- basic migration path if needed,
- formatting and linting,
- unit test harness,
- smoke test,
- CI skeleton,
- OpenSpec root,
- starter diagrams,
- phase plan,
- docs linked from README.

Phase 0 should not deliver product depth. It proves the project can be built,
tested, run, and reviewed safely.

## Lessons From Existing Projects

### Compendium

Best lesson: treat each phase as a contract with acceptance criteria, PR
history, and smoke evidence.

### Ubongo

Best lesson: use PR discipline as the review surface, but create the PR only
after the user explicitly approves pushing the branch.

### Kaddo

Best lesson: keep project knowledge close to the code and let agents work from
structured context instead of repeated exploration.

### Luxides

Best lesson: a project can be implementation-ready before code exists if docs,
specs, phase gates, and local runtime contracts are precise.

### ContextForge

Best lesson: the cleanest current workflow is docs-first, phase-gated,
Docker-local, diagram-aware, PR-based, Kaddo-compatible, and agent-readable from
day one.

## Minimal Startup Pack

If time is tight, create this minimum before code:

```txt
README.md
AGENTS.md
CONTEXT.md
docs/01-prd.md
docs/03-architecture-decisions.md
docs/06-technical-requirements.md
docs/08-qa-plan.md
docs/09-development-plan.md
docs/12-codex-build-guide.md
docs/17-development-workflow.md
docs/18-openspec-kdd-bdd.md
docs/19-local-docker-development.md
docs/templates/phase-plan-template.md
docs/diagrams/
docs/adr/
openspec/README.md
.gitignore
.env.example
```

For productized SaaS work, use the full pack.

## Definition Of Ready To Build

A project is ready to start implementation when:

- GitHub repo exists and is private if needed,
- `main` has an initial foundation commit,
- canonical docs exist and are linked from README,
- `CONTEXT.md` defines key terms,
- hard decisions have ADRs,
- development workflow is documented,
- Docker-local rule is documented,
- OpenSpecs convention exists,
- starter Mermaid diagrams exist or are explicitly deferred,
- Phase 0 plan is drafted,
- Phase 0 testing plan exists,
- user has approved the Phase 0 plan.

Before user approval, the project is ready to plan, not ready to code.

## Definition Of Done For A Phase

A phase is done when:

- scope is implemented,
- out-of-scope items stayed out,
- docs match behavior,
- README and project status reflect the current phase,
- OpenSpecs match behavior,
- diagrams match behavior,
- phase plan status is updated,
- KDD notes are updated,
- BDD scenarios are covered or deferred with reason,
- unit tests pass,
- integration tests pass where required,
- smoke test passes,
- manual test handoff was completed,
- user feedback was processed,
- PR is reviewed,
- branch is merged to `main`,
- `main` is clean and up to date.

## Final Operating Rule

Do not optimize for starting code fastest. Optimize for making every phase easy
to understand, build, test, review, resume, and safely hand off across VS Code,
Codex, Claude Code, Kaddo, GitHub, and future agents.
