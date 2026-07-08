# ForgeLoop Core

Use this file as the default agent-loading layer. Read the full workflow only
when the task needs deeper rules.

## Source Of Truth

Use repository evidence before chat memory:

1. Current code, tests, and Git state.
2. Approved phase plan or brownfield feature plan.
3. Behavior specs, OpenSpecs if used, and BDD scenarios.
4. ADRs and architecture notes.
5. Product, technical, QA, manual test, integration test, and Roadmap / Master
   Plan docs.
6. README and project status.
7. Agent chat history or memory.

## Core Loop

```txt
Idea -> Documents -> Decisions -> Roadmap / Master Plan
     -> Behavior Spec -> Phase Plan -> Branch -> Tests -> Code
     -> Smoke Test -> PR -> Merge
```

## Non-Negotiables

- Classify work as greenfield, brownfield, or maintenance.
- Choose the execution mode: Docs-only, Mechanical, Low-risk, Standard,
  Strict, or Release-critical.
- Choose the tool mode: Single-tool, Multi-tool, or Human-plus-tool.
- Confirm the work fits the Roadmap / Master Plan.
- Prepare or update the plan before implementation.
- Stop for human approval at required gates.
- Implement one sub-phase, story, or vertical slice at a time.
- Run required verification before continuing.
- Update docs, diagrams, specs, ADRs, and handoff notes when behavior changes.
- Review the diff against the approved plan and current repo evidence.
- Commit, push, open PRs, archive, and merge only after explicit approval.

## Project Tiers

- `Throwaway/script`: use this Core only. Add tests when risk justifies them.
- `Real project`: add README, `AGENTS.md`, `CONTEXT.md`, Roadmap / Master Plan,
  phase or feature plan, tests, and basic QA notes.
- `Productized/SaaS`: use the full startup pack, behavior specs, ADRs, QA
  plans, manual and integration test plans, diagrams, PR discipline, and
  regression evidence.

## Commit And PR Rule

Commits and PRs must explain both:

- what changed,
- why the change was made.
