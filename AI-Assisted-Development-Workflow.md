# AI-Assisted Development Workflow

This guide defines Giuseppe's standard workflow for building projects with VS
Code, Codex, Claude Code, GitHub, behavior specs, Knowledge Driven Development,
Behaviour Driven Development, tests, Mermaid diagrams, and local Docker
development. Tools such as [OpenSpec][openspec] and [Kaddo][kaddo] can support
the workflow, but they are not hard requirements.

## Core Rule

Do not start from vibes, loose chat history, or an agent's memory. Start from
the current repository state:

```txt
Idea -> Documents -> Decisions -> Roadmap -> Behavior Spec -> Phase Plan
     -> Branch -> Tests -> Code -> Smoke Test -> PR -> Merge
```

The source of truth is always the repo: docs, behavior specs, ADRs, current
code, tests, and Git state.

## Workflow Spec Versus Harness

This document is the workflow specification. It defines the rules, gates,
artifacts, prompts, and operating model.

A harness is the executable or semi-executable system that enforces this
workflow. A future ForgeLoop harness should:

1. Read the repository state.
2. Accept a task, phase, or User Story.
3. Run pre-flight exploration.
4. Classify task risk.
5. Select an execution mode.
6. Generate or update specs and plans.
7. Stop for human approval when required.
8. Run implementation, verification, review, and docs loops.
9. Collect telemetry.
10. Produce PR notes and handoff artifacts.

Until that exists, treat this repository as a harness specification, not the
harness itself.

## Document Evolution Strategy

Improve this document before extracting templates, skills, or harness code. The
prose is the source material for everything that comes later.

The document should mature through these stages:

1. **Clear workflow prose**: explain the operating model, source-of-truth rules,
   gates, roles, artifacts, testing expectations, and PR discipline.
2. **Stable specification**: remove contradictions, define terms, sharpen
   examples, and make the phase loop usable without extra explanation.
3. **Reusable templates**: extract repeated structures only after the prose is
   stable, such as phase plans, User Stories, manual QA handoffs, integration
   test plans, execution reports, and PR summaries.
4. **Named skills**: turn repeatable judgment steps into skills, such as
   pre-flight exploration, risk classification, Grill Me With Docs, docs
   alignment, QA selection, adversarial review, and telemetry reporting.
5. **Executable harness**: build a small runner that invokes the stable skills
   and templates, records gates, collects telemetry, and prepares handoff
   artifacts.

Do not automate unclear prose. If a rule is hard to explain in the document, it
will be harder to encode safely in a harness.

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
- reading docs and behavior specs side by side,
- running terminals,
- observing Docker logs,
- comparing Codex and Claude Code outputs,
- running manual smoke tests.

VS Code is not the source of truth. Useful notes from editor tabs, terminals,
or chats must be moved into the right artifact: phase plan, behavior spec,
ADR, `CONTEXT.md`, README, or review log.

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

### Tool Availability Modes

ForgeLoop works with one tool or many tools. Tool count changes execution
shape, not quality gates.

- `Single-tool`: one LLM or coding tool handles planning, implementation,
  review, docs, and handoff in separate passes.
- `Multi-tool`: one tool builds and another critiques plans, diffs,
  architecture, and tradeoffs.
- `Human-plus-tool`: one tool builds and the user performs review, manual QA,
  or final judgment that a second tool would otherwise support.

Use single-tool mode when only Codex, only Claude Code, Cursor, Gemini, or one
agent-capable IDE is available.

Single-tool mode requires explicit role separation:

1. Planner pass: read repo evidence and produce or update the plan.
2. Spec pass: update behavior specs, acceptance criteria, and test plan.
3. Implementation pass: make the smallest approved change.
4. Verification pass: run tests, smoke checks, and manual handoff preparation.
5. Reviewer pass: re-read the diff against the plan, specs, docs, tests, and
   risks.
6. Docs pass: update docs, diagrams, ADRs, and execution evidence.

The same chat can perform several passes, but each pass must state its role and
stop at required gates. A single continuous implementation answer does not
replace the review pass.

When a second tool is unavailable, strengthen review by:

- starting a fresh chat or fresh goal for review,
- asking the same tool to review its own diff from a code-review stance,
- running deterministic tests instead of relying on explanation,
- comparing the diff against the approved plan and behavior spec,
- using GitHub PR review as the durable review record when a PR exists,
- asking the user for manual QA on workflows the agent cannot verify.

Do not weaken approval gates, test evidence, or manual handoff because only one
tool is available.

### Knowledge Driven Development

Knowledge Driven Development is a workflow discipline, not a tool requirement.
ForgeLoop uses KDD to keep durable project knowledge in repository artifacts
instead of chat memory.

KDD keeps these artifacts current:

- `CONTEXT.md` for domain language, glossary, and bounded meanings,
- ADRs for hard-to-reverse decisions and tradeoffs,
- behavior specs, using OpenSpec or Markdown,
- phase plans for approved work and exit criteria,
- diagrams for architecture, data, flows, processes, and sequences,
- tests for executable expectations,
- review logs and execution reports for evidence,
- README and status notes for orientation.

Agents must read these artifacts before planning or coding. If repository
knowledge is missing, stale, or contradictory, update the knowledge artifact
before implementation.

### Kaddo

[Kaddo](https://github.com/Kaddo-kdd/kaddo) is an optional KDD support tool.

Use Kaddo for:

- deterministic repository scans,
- context packs,
- work items,
- ownership hints,
- knowledge drift checks,
- agent handoff context.

Kaddo does not replace behavior specs, phase plans, tests, GitHub PRs, or human
review.

### OpenSpec

[OpenSpec](https://github.com/Fission-AI/OpenSpec) is an optional tool for
writing behavior specs, scenarios, contracts, proposals, and task lists.

Use OpenSpec for:

- behavior specs,
- change proposals,
- design notes,
- acceptance criteria,
- scenario and contract files,
- traceability from approved work to implementation.

OpenSpec does not replace product docs, ADRs, phase plans, tests, diagrams, or
human approval. When OpenSpec is unavailable, use Markdown specs with the same
behavior-contract intent.

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
- `docs/18-openspec-kdd-bdd.md`: behavior specs, KDD, BDD, traceability.
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

### Behavior Specs And OpenSpecs

Behavior specs define behavior before implementation. A project may use
OpenSpec for this contract, or plain Markdown specs when OpenSpec is not
available.

Recommended OpenSpec structure:

```txt
openspec/
  README.md
  changes/<change-id>/
    proposal.md
    design.md
    spec.md
    tasks.md
```

Small projects can use phase-scoped Markdown specs:

```txt
openspec/phase-N-short-name/
  spec.md
  scenarios.md
  contracts.md
```

## First-Class Planning Artifacts

ForgeLoop treats planning and review artifacts as executable context for agents.
They are not loose notes and they do not live only in chat history.

Every serious project should make these artifacts explicit before
implementation:

- `Roadmap`: ordered milestones, release intent, sequencing, dependencies, and
  deferrals.
- `Architecture Plan`: system boundaries, module boundaries, data ownership,
  deployment assumptions, integration boundaries, and hard-to-reverse technical
  decisions.
- `QA Plan`: verification strategy, acceptance criteria, regression scope,
  release gates, and risk-based test depth.
- `Manual Test Plan`: human test paths, local commands, test accounts or seed
  data, expected results, cleanup, known limitations, and feedback requested
  from the user.
- `Integration Test Plan`: database, auth, storage, background jobs, external
  adapters, Docker services, contracts, and failure paths that must be tested
  across real boundaries.

These artifacts may be standalone files or clearly labeled sections inside the
startup document pack. The format can vary by project, but the location must be
obvious from `README.md` or `docs/00-index.md`.

Use this placement by default:

```txt
docs/
  03-architecture-decisions.md      # links to ADRs and architecture plan notes
  08-qa-plan.md                     # QA plan and release gates
  09-development-plan.md            # roadmap and phase order
  phases/
    phase-N-short-name.md           # phase-specific scope and test handoff
```

Use separate files when an artifact becomes large enough to need ownership,
review history, or independent updates:

```txt
docs/roadmap.md
docs/architecture-plan.md
docs/qa-plan.md
docs/manual-test-plan.md
docs/integration-test-plan.md
```

Agents must read the relevant artifact before planning or coding. If an
artifact is missing, stale, or contradictory, stop and update the documentation
before implementation.

## User Stories

User Stories are useful execution units inside the phase workflow. They should
not replace product docs, behavior specs, ADRs, phase plans, tests, or code.

Use User Stories when they help:

- slice MVP work,
- order backlog items,
- pick the next executable unit,
- measure progress,
- run one harness cycle per item,
- generate PR summaries,
- track tests and defects per feature,
- compare machine time with human supervision time.

Every executable User Story should include:

- user goal,
- business value,
- acceptance criteria,
- linked roadmap item,
- linked behavior spec or OpenSpec if used,
- affected domain and modules,
- risk level,
- selected execution mode,
- required tests,
- dependencies,
- telemetry fields,
- PR or branch linkage.

Do not let a User Story stand alone as the source of truth. If it conflicts
with behavior specs, ADRs, current code, tests, or the approved phase plan,
stop and resolve the conflict before implementation.

## User Story Delivery Lane

When a phase is implemented through User Stories, use a concrete delivery lane
inside the broader phase workflow.

```txt
Select User Story -> SDD/Behavior Spec -> Human Gate -> Contract Freeze
     -> TDD RED -> Implementation -> QA -> Code Review -> Docs
     -> Human Gate -> Archive/PR Prep
```

This lane is useful when the phase plan contains several independent stories
and the team wants one repeatable execution cycle per story.

### Delivery Steps

1. **Select User Story**: choose the next ready story from the approved roadmap
   or backlog. Check dependencies and risk before work starts.
2. **SDD/Behavior Spec**: create or update the behavior spec, acceptance
   criteria, design notes, and task list. Use OpenSpec when the project uses
   it.
3. **Human Gate After Spec**: stop until the user approves scope, behavior,
   open decisions, and test depth.
4. **Contract Freeze**: if the story touches an API, schema, event, command, or
   provider boundary, freeze the contract before implementation.
5. **TDD RED**: write the failing tests first. Verify they fail for the right
   reason, not because of setup errors.
6. **Implementation**: implement the smallest code path that turns the approved
   tests green. Parallelize backend and frontend only after contracts freeze.
7. **QA**: run the selected test ladder, including integration, smoke, manual,
   and regression checks required by the execution mode.
8. **Code Review**: run an adversarial review against the story, behavior spec,
   architecture, tests, security constraints, and docs.
9. **Docs**: update technical docs, diagrams, behavior specs, ADRs, phase status,
   and execution evidence.
10. **Human Gate Before PR**: stop again for final user approval before archive,
    push, or PR.
11. **Archive/PR Prep**: archive the completed spec/change when the project
    uses that pattern, then prepare the PR notes. Push or open the PR only after
    explicit user approval.

### Story Agent Roles

A User Story lane may use specialized agent roles:

- `harness-orchestrator`: selects the story, checks dependencies, tracks gates,
  and collects the final report.
- `spec-author`: writes the SDD or behavior spec artifacts and task list.
- `contract-engineer`: updates contracts, schemas, SDKs, DTOs, or API specs.
- `tdd-engineer`: writes failing tests before implementation.
- `backend-developer`: implements backend behavior within approved contracts.
- `frontend-developer`: implements frontend behavior within approved contracts.
- `qa-verifier`: runs the selected QA plan and records evidence.
- `code-reviewer`: returns `APTO` or `NO APTO` with blocking findings.
- `docs-keeper`: synchronizes docs, diagrams, specs, and status.

These are roles, not mandatory tools. One agent can perform several roles if
the task is small.

### Story Artifacts

Each story execution should record the artifacts it produces:

- selected User Story and dependency check,
- proposal or behavior spec,
- design notes,
- task list,
- contract or schema changes,
- failing test evidence,
- implementation commits or file list,
- QA report,
- code-review verdict,
- docs and diagram updates,
- final human approval,
- archive or PR notes.

### Hard Gates

Use hard gates for risky story work:

- after SDD/behavior spec, before implementation,
- after contract freeze, before backend/frontend parallel work,
- after QA and code review, before archive or PR.

The code-review gate must produce a clear verdict:

- `APTO`: the story can move to final human approval.
- `NO APTO`: the story returns to implementation or planning.

Do not archive a story, push a branch, or open a PR for a story with a
`NO APTO` verdict.

### Parallel Work

Parallelize only when dependencies are explicit:

- backend and frontend may run in parallel after contract freeze,
- docs and code review may run in parallel after implementation,
- QA must wait for the relevant implementation path and test data to exist.

If parallel work creates conflicting changes, stop and let the orchestrator
resolve the conflict before continuing.

## Brownfield Feature Workflow

ForgeLoop must support existing codebases, not only new projects. Brownfield
work starts from current behavior and existing constraints, then adds the new
feature without damaging what already works.

Use the brownfield workflow when the repo already has meaningful code,
production behavior, customer data, migrations, integrations, or established
tests.

```txt
Codebase Discovery -> Impact Map -> Compatibility Plan -> Behavior Spec
     -> Vertical Slice Plan -> Human Gate -> TDD RED -> Implementation
     -> Regression Evidence -> Code Review -> Docs -> Human Gate -> PR Prep
```

### Brownfield Discovery

Before planning implementation, inspect:

- current code, tests, and Git state,
- runtime entry points,
- existing user workflows,
- domain language in `CONTEXT.md`,
- ADRs and architecture docs,
- API, schema, event, provider, or file contracts,
- migrations and seed data,
- background jobs and queues,
- auth, permissions, and tenant boundaries,
- open issues, recent PRs, and known defects,
- production or release constraints if documented.

The output is a short discovery note that says what exists, what must not
break, and where the new behavior can attach.

### Impact Map

Every brownfield feature must map the affected surface before code changes.

Include:

- modules and ownership boundaries,
- public APIs, routes, commands, events, schemas, and SDKs,
- data model and migration impact,
- UI flows and state transitions,
- external providers and adapters,
- jobs, queues, schedulers, and retries,
- tests that already cover the area,
- docs and diagrams that must change,
- compatibility risks,
- rollback or expand-contract needs.

If the impact map is broad or uncertain, split the work before implementation.

### Compatibility Plan

Brownfield work must protect existing behavior. The plan should state whether
the change is:

- additive,
- behavior-changing,
- migration-backed,
- contract-breaking,
- behind a feature flag,
- expand-contract,
- temporary compatibility shim,
- rollbackable.

Contract-breaking changes require explicit approval and a migration or
deprecation path.

### Vertical Slice Plan

Prefer one thin path through the existing system over horizontal layer work. A
good slice is demoable or testable by itself and touches only the boundaries
needed to prove the behavior.

For wide refactors that cannot fit a vertical slice, use expand-contract:

1. Expand: add the new form beside the old one.
2. Migrate: move callers in reviewed batches while tests stay green.
3. Contract: remove the old form after no callers remain.

Keep the repo green between batches unless the user approves a temporary
integration branch.

### Brownfield QA

Brownfield QA must prove both the new behavior and the old behavior.

Required evidence for non-trivial brownfield work:

- focused tests for the new behavior,
- regression tests for the affected existing behavior,
- integration tests for changed boundaries,
- migration tests when schema or data changes,
- contract tests when APIs, events, SDKs, or provider ports change,
- manual test plan for changed user workflows,
- rollback or recovery notes when production data is involved.

If no regression test exists for the affected behavior, either add one or state
why manual evidence is the only practical option.

## Adaptive Execution Modes

Not every task needs the same ceremony. Classify the work before planning or
implementation and choose the minimum safe execution mode.

- `Docs-only`: docs, prompts, plans, templates. Requires Markdown lint or a
  structural check.
- `Mechanical`: renames, formatting, generated updates. Requires diff review
  plus targeted checks.
- `Low-risk`: small localized behavior changes. Requires focused tests and a
  smoke check.
- `Standard`: normal feature or platform work. Requires unit tests, smoke, and
  docs alignment.
- `Strict`: auth, data, contracts, migrations, permissions. Requires
  integration tests and review.
- `Release-critical`: release, production-sensitive, or broad changes. Requires
  the full phase or regression suite.

Escalate the mode when work touches:

- security,
- authorization,
- data ownership,
- persistence,
- migrations,
- external contracts,
- concurrency,
- payments,
- pricing,
- tenant boundaries,
- production operations.

De-escalate only when repo evidence proves the change is narrow and reversible.
State the selected mode in the phase plan, task notes, or execution report.

## Harness-Native Skills And Supporting Tools

ForgeLoop combines harness-native skills with external or project-specific
tools. Not every item must be installed in every project.

### Harness-Native Skills

These are reusable capabilities the harness should eventually invoke.

- `repo-preflight-exploration`: inspect docs, specs, ADRs, diagrams, tests,
  source, and Git state.
- `brownfield-codebase-discovery`: inspect an existing codebase before feature
  planning and identify current behavior, seams, risks, and regression needs.
- `impact-map-generator`: map the affected modules, contracts, data, UI flows,
  jobs, integrations, docs, and tests before brownfield implementation.
- `task-risk-classifier`: choose Docs-only, Mechanical, Low-risk, Standard,
  Strict, or Release-critical mode.
- `grill-me-with-docs`: challenge plans against repo evidence and ask blocking
  questions.
- `phase-plan-generator`: create phase plans from the template.
- `behavior-spec-author`: create or update behavior specs, scenarios,
  contracts, and acceptance criteria.
- `bdd-scenario-writer`: convert expected behavior into Given/When/Then
  scenarios.
- `user-story-selector`: choose the next ready User Story from the approved
  roadmap or backlog.
- `contract-engineer`: freeze API, schema, SDK, DTO, event, or provider
  contracts before implementation.
- `tdd-engineer`: write failing tests and verify they fail for the right reason
  before implementation.
- `implementation-planner`: break approved work into smallest coherent
  sub-phases.
- `subphase-implementer`: implement one approved sub-phase at a time.
- `story-orchestrator`: track a User Story lane from selection through PR.
- `test-strategy-selector`: select required tests from risk and execution mode.
- `qa-runner`: run verification, report failures, and classify blockers.
- `adversarial-code-reviewer`: review implementation against specs,
  architecture, tests, security, and docs.
- `docs-alignment-reviewer`: check README, docs, behavior specs, ADRs,
  diagrams, and phase plans.
- `diagram-maintainer`: maintain Mermaid architecture, data, flow, process, and
  sequence diagrams.
- `telemetry-reporter`: capture time, tokens, retries, tests, defects,
  artifacts, and verdict.
- `manual-qa-handoff`: produce exact local testing instructions for the user.
- `pr-summary-writer`: generate PR summaries, risks, tests, and deferred work.

### Supporting Tools

- OpenSpec: optional behavior specs and acceptance criteria.
- Kaddo: optional Knowledge Driven Development support and drift checks.
- GitHub CLI: branches, PRs, checks, and review surface.
- Mermaid: living diagrams.
- Docker or Docker Compose: reproducible local runtime.

Project-specific `AGENTS.md`, `CLAUDE.md`, and `docs/` files decide which tools
are mandatory for that repository.

### Recommended External Skills

- [`grill-with-docs`](https://www.aihero.dev/grill-with-docs): use before
  implementation when the plan, vocabulary, or hard decisions are not settled.
  It asks one question at a time, writes resolved terms to `CONTEXT.md`, and
  records rare hard-to-reverse decisions as ADRs.
- [`to-prd`](https://www.aihero.dev/skills-to-prd): use after the conversation,
  domain language, and plan are settled. It turns known context into a PRD with
  problem, solution, user stories, implementation decisions, testing decisions,
  and out-of-scope items.
- [`to-issues`](https://www.aihero.dev/skills-to-issues): use after a PRD,
  behavior spec, or phase plan exists. It splits work into vertical-slice
  issues in dependency order and handles wide refactors with expand-contract
  sequencing.
- [`tdd`](https://www.aihero.dev/skills-tdd): use during implementation when a
  concrete behavior is ready to build. It should run one red-green cycle at a
  time, with tests named for behavior and expected values taken from the spec.
- [`handoff`](https://www.aihero.dev/skills-handoff): use when a session is
  long, context is at risk, or another agent will continue. It should reference
  PRDs, issues, ADRs, plans, and diffs instead of copying settled artifacts.
- [`prototype`](https://www.aihero.dev/skills-prototype): use when one design
  question is hard to settle on paper. Prototype code must be disposable; keep
  the answer, then delete or absorb the code.
- [`improve-codebase-architecture`](https://www.aihero.dev/skills-improve-codebase-architecture):
  use as a brownfield architecture health check. It is most useful when a
  mature codebase feels shallow, scattered, or hard to change safely.
- [`triage`](https://www.aihero.dev/burn-through-your-backlog-with-my-triage-skill):
  use when existing tracker items need verification, categorization, and a
  ready-for-agent brief before implementation.

Install when the project uses AI Hero skills:

```sh
npx skills add mattpocock/skills --skill=grill-with-docs
npx skills add mattpocock/skills --skill=to-prd
npx skills add mattpocock/skills --skill=to-issues
npx skills add mattpocock/skills --skill=tdd
npx skills add mattpocock/skills --skill=handoff
npx skills add mattpocock/skills --skill=prototype
npx skills add mattpocock/skills --skill=improve-codebase-architecture
npx skills add mattpocock/skills --skill=triage
npx skills update grill-with-docs
npx skills update to-prd
npx skills update to-issues
npx skills update tdd
npx skills update handoff
npx skills update prototype
npx skills update improve-codebase-architecture
npx skills update triage
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
7. Create behavior spec root, using OpenSpec only when the project chooses it.
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
- relevant behavior specs,
- diagrams,
- current code,
- current tests,
- `git status`.

If files or commands can answer a question, inspect them before asking.

### 4. Classify Risk And Execution Mode

Before writing the phase plan, classify the phase or task:

- selected execution mode,
- why that mode is sufficient,
- required tests,
- skipped tests and rationale,
- required docs and diagrams,
- human approval gates,
- expected manual QA.

If the selected mode is `Strict` or `Release-critical`, require explicit user
approval before implementation.

### 5. Grill Me With Docs Gate

Before a phase plan is approved, run **Grill Me With Docs**.

Rules:

- challenge the plan against `CONTEXT.md`, ADRs, behavior specs, docs, diagrams,
  current code, and tests,
- ask one question at a time,
- provide a recommended answer for every question,
- answer from repo evidence first when possible,
- update `CONTEXT.md` immediately when domain terms are resolved,
- offer ADRs only for hard-to-reverse, surprising, real tradeoffs.

The phase is not ready for implementation until every blocking question is
answered and the objective is clear.

### 6. Create Phase Plan

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
- User Stories if used,
- selected execution mode,
- greenfield, brownfield, or maintenance classification,
- brownfield discovery note if the codebase already exists,
- impact map for changed behavior,
- compatibility and migration plan when existing behavior may be affected,
- User Story delivery lane if used,
- behavior spec changes,
- Kaddo notes if used,
- KDD notes,
- BDD scenarios,
- unit test plan,
- integration test plan,
- smoke test plan,
- manual test plan,
- regression test plan,
- Docker commands,
- diagram updates,
- manual test handoff,
- test evidence required,
- regression evidence for affected existing behavior,
- story artifacts and gates if using User Stories,
- exit criteria,
- risks and deferred work.

No implementation before user approval.

### 7. Create Or Update Behavior Specs

Behavior specs are the behavior contract. Use OpenSpec when the project uses
it; otherwise use Markdown specs with the same intent.

Define:

- accepted behavior,
- non-goals,
- permission rules,
- state transitions,
- contracts,
- BDD scenarios,
- acceptance criteria.

Use behavior specs for observable behavior changes. Skip only for trivial
docs-only or mechanical changes.

### 8. User Approval Gate

Approval means:

- scope is correct,
- greenfield, brownfield, or maintenance classification is correct,
- sub-phases are acceptable,
- execution mode is acceptable,
- impact map and compatibility plan are sufficient for brownfield work,
- User Story delivery lane is acceptable if used,
- testing plan is sufficient,
- manual test plan is sufficient,
- diagram plan is sufficient,
- manual test handoff is clear,
- out-of-scope list is accepted.

If scope changes, update the plan before coding.

### 9. Implement One Sub-Phase At A Time

For each sub-phase:

1. Set an explicit sub-phase goal for the agent.
2. Re-check `git status`.
3. Gather full context before editing:
   - phase plan,
   - behavior specs,
   - `CONTEXT.md`,
   - ADRs,
   - docs,
   - diagrams,
   - relevant source tree,
   - tests,
   - nearby ownership boundaries.
4. For brownfield work, re-check the impact map, compatibility plan, migration
   plan, and regression target before editing.
5. Resolve all blocking questions before coding.
6. Implement the smallest coherent unit.
7. Add or update tests.
8. Run the sub-phase test suite until green.
9. Update docs, behavior specs, and diagrams if behavior changed.
10. Review the diff.

Do not continue to the next sub-phase while the current one has failing tests,
unresolved blocking questions, or unclear objectives.

### 10. Testing Ladder

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

Every non-trivial phase must define a phase QA plan with:

- unit test plan,
- integration test plan,
- smoke test plan,
- manual test plan,
- regression test plan,
- test evidence required.

### Integration Test Plan

The Integration Test Plan defines which real system boundaries must be verified
together.

It should include:

- database behavior,
- migrations,
- auth or session behavior,
- API boundaries,
- background jobs,
- file or storage boundaries,
- external provider adapters,
- Docker-local service wiring,
- contract or schema validation,
- test data setup and teardown,
- commands required to run the tests,
- expected success signal.

Integration tests should use real local dependencies where practical. Use fakes
when external services would make the test slow, flaky, expensive, or unsafe.

### Manual Test Plan

The Manual Test Plan defines what the human must verify before accepting the
phase.

It should include:

- branch name,
- local startup commands,
- required seed data or test accounts,
- URL or command entry point,
- exact steps,
- expected results,
- negative cases,
- known limitations,
- what feedback is needed,
- screenshots or logs to capture when useful.

Manual testing is not a substitute for automated tests. It validates usability,
workflow coherence, and end-to-end behavior from the human perspective.

### Manual Test Plan Versus Handoff

Manual Test Plan and Manual Test Handoff are related but different:

- Manual Test Plan defines what human testing is required.
- Manual Test Handoff gives the exact instructions to run that testing now.

The plan belongs in the phase plan. The handoff is the current, executable
message to the user before they test the branch.

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

### 11. Phase Documentation Gate

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
- behavior specs alignment,
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
- Are behavior specs, ADRs, phase plans, and diagrams aligned?

Do not close a phase if docs describe an older project state.

### 12. Manual Test Handoff

Before asking the user to test, provide:

- branch name,
- local Docker commands,
- URL or command entry point,
- test account or seed data,
- exact steps,
- expected results,
- known limitations,
- what feedback is needed.

### 13. Process Feedback

Every user comment becomes one of:

- required before phase completion,
- valid but later phase,
- rejected with reason,
- needs more investigation.

Do not start the next phase until current phase exit criteria are met.

### 14. Execution Report

At the end of a sub-phase, phase, or User Story, produce an execution report.
Use exact values when tooling can provide them. Otherwise mark values as
unknown.

```txt
Phase or User Story:
Branch:
Execution mode:
Human time:
Machine time:
Tokens:
Retries:
Tests added:
Tests run:
Tests passing:
Defects found by QA:
Defects found by review:
Agent roles used:
Parallel steps:
Docs updated:
Diagrams updated:
Artifacts changed:
Skipped checks:
Residual risk:
Verdict:
```

This report helps evaluate whether the workflow is slow, expensive, effective,
or over-engineered. Do not optimize for raw machine speed if doing so removes
the gates that prevent rework.

### 15. Pull Request

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
- behavior specs updated,
- Kaddo notes if used,
- execution report,
- risks and deferred work.

If the user explicitly approves an early review branch, use a draft PR. Without
that approval, keep PR notes local until the branch is approved for push.

### 16. Merge And Reset

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

## Optional OpenSpec Workflow

Use OpenSpec as optional support for behavior specs, especially when a change
needs proposals, design notes, scenarios, contracts, and task tracking. The
workflow must remain usable without it.

Recommended first pass:

```sh
npm install -g @fission-ai/openspec@latest
openspec init
```

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

Rules:

- treat behavior specs as the method and OpenSpec as one possible tool,
- use OpenSpec when the project benefits from structured proposals and tasks,
- keep specs aligned with phase plans, ADRs, tests, and implementation,
- do not let OpenSpec-generated files expand scope without user approval,
- when OpenSpec is unavailable, use Markdown specs with the same contract.

Recommended cadence:

- before implementation: create or update the behavior spec,
- before user approval: review proposal, design notes, scenarios, and tasks,
- during implementation: keep tasks and contracts aligned with code,
- before PR: confirm specs match delivered behavior.

## Optional Kaddo Workflow

Use Kaddo as optional KDD support, especially after Phase 0. The workflow must
remain usable without it.

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
- treat KDD as the method and Kaddo as one possible tool,
- inspect generated `.kaddo/` and `knowledge/` artifacts before committing,
- do not let Kaddo overwrite `AGENTS.md` or `CLAUDE.md` without review,
- map approved phase plans to Kaddo Work Items if useful,
- use Kaddo Guard as a drift signal, not as a test replacement,
- keep behavior specs as the behavior source of truth,
- when Kaddo is unavailable, use Markdown docs and manual drift checks.

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

Use this section when both Codex and Claude Code are available. If only one
tool is available, use Single-Tool Phase Flow below.

In multi-tool mode, use VS Code as the shared cockpit, Codex as the builder,
and Claude Code as the critic or design reviewer.

Default loop:

```txt
VS Code opens repo -> Codex inspects and edits -> Docker/tests run
     -> Claude Code reviews plan or diff -> Codex applies accepted changes
     -> GitHub PR records the result
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

1. Use Codex to prepare the phase plan and behavior specs.
2. Review the plan in VS Code.
3. Send the phase plan to Claude Code for adversarial critique.
4. Decide which Claude Code feedback is accepted.
5. Use Codex to update the phase plan and docs.
6. Approve the phase plan.
7. Classify task risk and select the execution mode.
8. Use the User Story delivery lane when the phase is story-driven.
9. Use Codex to gather full context at each sub-phase or story start.
10. Use Codex to implement one sub-phase or story step at a time.
11. Require the relevant test suite to pass green before continuing.
12. Use Claude Code for review after meaningful milestones or before PR.
13. Use Codex to apply accepted fixes and run verification.
14. At phase end, run current phase tests plus previous phase regressions.
15. Update project documentation and diagrams before phase close.
16. Produce the execution report.
17. Use VS Code for manual smoke testing.
18. Use GitHub PR as the final review record only after the user says it is
    ready.

### Recommended Single-Tool Phase Flow

Use this flow when only one LLM or coding tool is available.

1. Start with a planning pass. Read repo evidence, classify the work, and
   produce the phase plan or brownfield feature plan.
2. Stop for user approval when the workflow requires it.
3. Start a separate implementation pass. Re-read the approved plan, specs,
   tests, docs, and relevant code before editing.
4. Implement one sub-phase, story, or vertical slice at a time.
5. Run the required verification until green or report the blocker.
6. Start a separate review pass. Ask the same tool to review its own diff as if
   it did not write the code.
7. Fix accepted review findings and rerun the relevant checks.
8. Start a docs pass. Update behavior specs, diagrams, ADRs, phase status,
   execution evidence, and manual handoff.
9. Stop for final human approval before commit, push, PR, archive, or merge.

Single-tool mode should use stronger prompts:

- "Review this diff only. Lead with bugs, missing tests, security issues, and
  spec mismatches."
- "Assume the implementation may be wrong. Compare it against the approved
  plan and current code."
- "Do not continue implementation during review."
- "List residual risk and skipped verification explicitly."

For `Strict` or `Release-critical` work, prefer a fresh chat or separate review
session before final approval.

### Conflict Rules

- If Codex and Claude Code disagree, repo docs, behavior specs, ADRs, current code,
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

Match test depth to the execution mode. A `Docs-only` change should not require
a full Docker suite unless the docs change operational commands. A `Strict` or
`Release-critical` change should not skip integration, regression, or smoke
checks without an explicit reason.

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
Classify the phase as greenfield, brownfield, or maintenance.
Classify the phase risk and select the execution mode.
Create docs/phases/phase-N-short-name.md from the phase plan template.
If the phase is delivered through User Stories, include the User Story delivery
lane, hard gates, agent roles, parallel steps, and expected story artifacts.
If the phase changes an existing codebase, include a brownfield discovery note,
impact map, compatibility plan, migration or expand-contract plan, and
regression evidence plan.
Create or update behavior specs and Mermaid diagrams for this phase.
Include KDD notes, BDD scenarios, Docker commands, unit tests, smoke test,
integration test plan, manual test plan, regression test plan, manual test
handoff, test evidence, exit criteria, risks, and out-of-scope items.

Run a Grill Me With Docs pass against CONTEXT.md, ADRs, behavior specs, diagrams,
docs, and source code.
Ask one blocking question at a time and provide your recommended answer.

Do not implement until I approve the plan.
```

### Implementation

```txt
Implement Phase N, Sub-Phase X from the approved plan.
Set this as the active goal for the agent.
Before editing, inspect git status, docs, behavior specs, diagrams, tests, nearby
code, and the full source context relevant to this sub-phase.
For brownfield work, also inspect the impact map, existing behavior, compatibility
plan, migrations, contracts, and regression target before editing.
Resolve all blocking questions before implementation.
Confirm the selected execution mode and required verification.
Keep changes scoped.
Add or update tests.
Run the sub-phase Docker-local verification until green.
Update docs, behavior specs, and diagrams if behavior changed.
Report changed files, tests run, smoke-test status, unresolved issues, proposed
solutions, execution telemetry, and residual risk.
Do not push, open a PR, or merge unless I explicitly say we are ready.
```

### Brownfield Feature

```txt
Prepare a brownfield feature plan for the requested change.
Start from the current repo, not from an ideal architecture.

Inspect current code, tests, Git state, docs, behavior specs, ADRs, diagrams,
runtime entry points, data model, contracts, migrations, integrations, auth,
permissions, jobs, and known issues.

Produce:
- brownfield discovery note,
- impact map,
- compatibility plan,
- behavior spec update,
- vertical slice plan,
- migration or expand-contract plan if needed,
- QA plan with regression evidence,
- manual test plan for changed workflows,
- docs and diagram update list,
- open questions and recommended answers.

Do not implement until I approve the plan.
```

### Review

```txt
Review the current branch against the approved phase plan, behavior specs, diagrams,
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
- behavior spec root or OpenSpec root if used,
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

### Kaddo Project

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
docs/templates/execution-report-template.md
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
- behavior spec convention exists,
- starter Mermaid diagrams exist or are explicitly deferred,
- Phase 0 plan is drafted,
- Phase 0 testing plan exists,
- execution modes and report template exist,
- user has approved the Phase 0 plan.

Before user approval, the project is ready to plan, not ready to code.

## Definition Of Done For A Phase

A phase is done when:

- scope is implemented,
- out-of-scope items stayed out,
- docs match behavior,
- README and project status reflect the current phase,
- behavior specs match behavior,
- diagrams match behavior,
- phase plan status is updated,
- KDD notes are updated,
- BDD scenarios are covered or deferred with reason,
- unit tests pass,
- integration tests pass where required,
- smoke test passes,
- manual test handoff was completed,
- execution report is complete,
- user feedback was processed,
- PR is reviewed,
- branch is merged to `main`,
- `main` is clean and up to date.

## Final Operating Rule

Do not optimize for starting code fastest. Optimize for making every phase easy
to understand, build, test, review, resume, and safely hand off across VS Code,
Codex, Claude Code, Kaddo, GitHub, and future agents.

[openspec]: https://github.com/Fission-AI/OpenSpec
[kaddo]: https://github.com/Kaddo-kdd/kaddo
