# Phase 4.5: Process State And Gate Integrity

## Metadata

- Project: ForgeLoop
- Phase: Phase 4.5 - Process State And Gate Integrity
- Branch: `phase-4-5-process-state-and-gate-integrity`
- Date: 2026-08-05
- Owner: Giuseppe
- Status: `Draft`
- Execution mode: `Docs-only`
- Tool mode: `Single-tool`
- Human-control mode: `Final-QA-only`
- Linked Roadmap / Master Plan item: `docs/09-development-plan.md`

## Goal

Make ForgeLoop's process state durable, typed, and mechanically checkable.
Today an approval blesses a mutable markdown file, handoffs are write-only
prose, verification evidence never expires, and the builder effectively grades
its own verification. This phase adopts the transferable discipline from
SwarmForge's handoff protocol (validated commit references, lifecycle
timestamps, strict validation gates with repair guidance, durable typed
messages) as ForgeLoop spec and template changes only. No daemon, no queue
runtime, no harness code.

## Source Docs Reviewed

- `FORGELOOP_CORE.md`
- `CONTEXT.md`
- `docs/00-index.md`
- Roadmap / Master Plan: `docs/09-development-plan.md`
- Behavior specs: none (docs-only phase)
- ADRs: `docs/adr/0001-builder-and-critic-roles.md`
- Diagrams: none
- Tests: `test/` (installer tests unaffected)
- External study: SwarmForge handoff protocol and README
  (github.com/unclebob/swarm-forge), reviewed 2026-08-05

## Scope

### In Scope

- Gate receipts: an append-only approval artifact pinning a content hash and
  reviewed commit for every human review gate, with freeze and reopen
  semantics.
- Adversarial verification ownership: blast-radius declaration as facts,
  critic-owned test selection committed before implementation, risk tier
  derived from a checklist instead of self-declared, amendment escalation.
- Durable process state: a small machine-parsable `forgeloop:state` block in
  the phase plan and PR description, lifecycle timestamps per sub-phase, and
  lifecycle conventions for handoff files (headers, states, two-type payload
  discipline, retained failure ledger).
- Evidence freshness: measured-at commit and expiry fields for verification
  evidence, wired into the acceptance-evidence matrix and Quality Envelope.
- A written invariant contract for a future `forgeloop doctor` command
  (spec only; implementation deferred).

### Out Of Scope

- `forgeloop doctor` and `forgeloop verify-gates` implementation code.
- Any daemon, queue runtime, watchdog, or tmux integration.
- Multi-agent topology, role prompts, or pack definitions.
- Cryptographic signing (signed tags or countersignatures may be a later
  hardening phase).
- Package publishing, GitHub PR automation, CI wiring.

## Assumptions

- Phases 4 through 4.2 (skill extraction, intake and discovery, roadmap
  progress view) are complete before this phase starts implementation; this
  plan may be drafted and reviewed earlier.
- SwarmForge is used as a design source only; no code or files are copied.
- The state block and receipt formats are cheap enough per phase that they do
  not violate the evidence-over-ceremony principle for `Quick` tier work;
  both apply from `Real project` tier upward unless the plan opts out.

## Open Questions

- Question: Is this phase numbered 4.5 (consolidation before harness work) or
  Phase 5 in the roadmap?
  - Recommended answer: 4.5, matching the 2.5/3.5 convention for docs-only
    consolidation phases that stabilize a model before the next build phase.
  - Classification: `blocking-human-decision`
  - Blocking: yes
- Question: Should the plan hash cover the whole file or a canonicalized form
  that excludes designated living regions (checkboxes, status lines)?
  - Recommended answer: canonicalized form; progress updates must not reopen
    an approval gate, only scope and acceptance criteria edits should.
  - Classification: `reversible-assumption`
  - Blocking: no
- Question: Do `verify-gates` and `doctor` land as one future CLI command or
  two?
  - Recommended answer: one `doctor` command with `--check <transition>`
    covering the gate checks; keep this phase spec-only either way.
  - Classification: `reversible-assumption`
  - Blocking: no
- Question: How does a solo human-plus-one-agent project satisfy critic-owned
  test selection?
  - Recommended answer: temporally, via a fresh-context session that fills the
    critic sections before implementation begins, with the human approving the
    contract commit.
  - Classification: `repository-resolvable`
  - Blocking: no

## Sub-Phases

### Sub-Phase 4.5.1: Gate Receipts And Plan Freeze

- Name: gate receipts and plan freeze.
- Goal: bind every human approval to the exact artifact state approved.
- Files, modules, or components:
  - New `docs/templates/gate-receipt-template.md` (gate type, frozen artifact
    paths, SHA-256 per artifact, short reviewed commit, approver, date,
    supersedes link).
  - `docs/templates/phase-plan-template.md`: new Approval section naming its
    receipt.
  - `docs/templates/pr-description-template.md`: gate-receipts row.
  - `FORGELOOP_CORE.md` and `AI-Assisted-Development-Workflow.md`: freeze and
    reopen semantics (stale receipt closes the gate; superseding receipts are
    appended, never rewritten).
- Tests: markdown lint; a worked example receipt in the template.
- Exit signal: a reviewer can follow the spec to freeze, tamper, detect, and
  re-approve a sample plan entirely by hand.

### Sub-Phase 4.5.2: Adversarial Verification Ownership

- Name: adversarial verification ownership.
- Goal: remove self-grading from smart test selection and risk tiering.
- Files, modules, or components:
  - `docs/templates/verification-contract-template.md`: new Blast-Radius
    Declaration (facts only) and critic-owned Committed Test Selection
    sections; fact-to-tier checklist table; amendment-escalation rule (any
    amendment after the first implementation commit raises the tier one level
    and re-triggers human approval).
  - `docs/templates/phase-plan-template.md`: Smart Test Selection section
    defers to the verification contract when one is required.
  - `docs/templates/acceptance-evidence-matrix-template.md`: two mechanical
    rows (changed files vs declared blast radius; tests run vs committed
    selection).
  - `FORGELOOP_CORE.md`: gate-order rule (contract approved and committed
    before the first implementation commit).
- Tests: markdown lint; worked example contract showing the temporal solo-mode
  path.
- Exit signal: the contract template makes it impossible to record a test
  selection authored after implementation without a visible amendment.

### Sub-Phase 4.5.3: Durable Process State And Handoff Lifecycle

- Name: durable process state and handoff lifecycle.
- Goal: make phase and handoff state survive dead sessions and read
  mechanically.
- Files, modules, or components:
  - `FORGELOOP_CORE.md`: spec for a compact `forgeloop:state` fenced YAML
    block (current sub-phase, last verified commit, next action, per-sub-phase
    `started_at` / `verified_at` / `completed_at`).
  - `docs/templates/phase-plan-template.md` and
    `docs/templates/pr-description-template.md`: carry the state block.
  - `AI-Assisted-Development-Workflow.md`: handoff lifecycle conventions:
    header fields (`created_at`, `picked_up_at`, `completed_at`), states
    (`new` / `in_process` / `completed` / `failed`), two-type payload
    discipline (a validated commit pointer plus one short note line; git is
    the payload, the handoff is an address), staleness rule (a handoff idle
    past a declared main-drift threshold must be re-validated before
    consumption), and a retained failure ledger (rejected plans and failed
    runs are filed under `failed`, never deleted).
- Tests: markdown lint; one worked handoff example converted from the current
  ad-hoc format.
- Exit signal: a fresh agent can reconstruct phase position from the state
  block and handoff files alone, without chat history.

### Sub-Phase 4.5.4: Evidence Freshness And Doctor Contract

- Name: evidence freshness and doctor contract.
- Goal: give evidence a shelf life and specify the future doctor command.
- Files, modules, or components:
  - `docs/templates/acceptance-evidence-matrix-template.md` and
    `docs/templates/quality-envelope-report-template.html`: `measured_at`
    commit and expiry fields per evidence row; expired evidence downgrades the
    envelope until re-measured.
  - New `docs/templates/doctor-invariants-template.md` (or a section in the
    workflow reference): the invariant contract a future `forgeloop doctor`
    must check (checked checkbox requires a newer matching commit;
    `verified_at` requires evidence newer than the code it verifies; no
    sub-phase N+1 activity while N lacks `completed_at`; declared HEAD must be
    an ancestor of actual HEAD; PR draft/ready status matches declared stage),
    with the SwarmForge-style output contract: INVARIANT / DECLARED / ACTUAL /
    REPAIR per mismatch.
- Tests: markdown lint.
- Exit signal: the doctor spec is complete enough that a later phase can
  implement it without new design decisions.

## Module / Component Plan

- Module map location: not applicable (docs-only).
- Modules touched or created: none.
- Components touched or created: templates and workflow prose listed above.
- Boundaries affected: review gates, verification contract, handoff format.
- Dependencies affected: none.
- Uncertain boundaries: where the doctor invariant spec lives (template vs
  workflow reference section).
- Human review needed: yes, at plan approval and before merge.

## QA Plan For This Phase

### Unit Test Plan

- Not applicable (docs-only). Installer tests must remain green: `npm test`.

### First Valid Test Layer

- Behavior: spec and template changes.
- Selected layer: `not-applicable`
- RED evidence required: no.
- Exception rationale: docs-only phase; verification is lint plus manual
  walkthrough.

### Smart Test Selection

- Changed files: `FORGELOOP_CORE.md`, `AI-Assisted-Development-Workflow.md`,
  five existing templates, up to two new templates.
- Changed symbols: not applicable.
- Affected modules: none.
- Affected consumers: future repos installing ForgeLoop templates; the
  installer template inventory in `src/installer.js` if new template files are
  added.
- Contracts or schemas affected: verification contract template structure.
- Configuration or runtime wiring affected: none.
- Cyclomatic or cognitive complexity impact: none.
- Critical invariants: no dangling template references; installer inventory
  stays aligned with `docs/templates/` contents.
- Selected test ladder levels: markdown lint, `git diff --check`, `npm test`
  (installer inventory alignment).
- Checks deferred to later stage: doctor and verify-gates behavior (deferred
  with implementation).
- Deferral rationale: implementation is explicitly out of scope.

### Integration Test Plan

- Not applicable (docs-only).

### Contract Test Plan

- Required: `no`
- Contracts: verification contract template is prose, validated by worked
  example.
- Consumer-impact analysis: template field additions are additive; existing
  filled-in contracts in other repos remain readable.

### Performance Test Plan

- Required: `no`

### Resilience Or Chaos Plan

- Required: `no`

### Smoke Test Plan

Walk one fictional mini-phase through the new artifacts by hand:

1. Author a sample phase plan; compute its canonical hash (`shasum -a 256`);
   record a plan-approval gate receipt.
2. Edit an acceptance criterion in the sample plan; rehash; confirm the
   receipt is now stale and the spec says the gate reopens; append a
   superseding receipt.
3. Fill a verification contract with blast-radius facts and a committed test
   selection; confirm the fact-to-tier checklist yields the expected tier;
   simulate a post-code amendment and confirm the escalation rule triggers.
4. Fill the `forgeloop:state` block through two sub-phase transitions;
   confirm each doctor invariant in the spec can be checked by hand against
   the sample repo state.
5. Write one handoff in the new two-type format; move it through
   `new -> in_process -> completed`; confirm timestamps record the lifecycle.

### Manual Test Plan

- Covered by the smoke test above; append it to the cumulative smoke playbook
  if one exists at implementation time.

### Regression Test Plan

- `npm test` green; markdown lint green on all touched files; no dangling
  links from README, index, or workflow reference.

### Test Evidence Required

- Lint output, `npm test` output, and the completed smoke walkthrough notes
  attached to the execution report.

### Verification Contract

- Required: `no` (docs-only, low blast radius); the phase instead produces
  the improved verification-contract template itself.

### Complexity Evidence

- Required: `no`

### Acceptance-Evidence Traceability

- Matrix required: `no`
- Release decision owner: Giuseppe.

### Quality Envelope

- Required: `no`

## Docs And Diagram Updates

- Behavior specs: none.
- ADRs: new ADR candidate: "Approvals bind to content hashes, not files"
  (decide at implementation whether it earns an ADR or stays workflow prose).
- Diagrams: none.
- README or status docs: README mention of gate receipts and the state block
  once merged.
- Roadmap / Master Plan: add Phase 4.5 entry, dependency (Phase 4), scope
  boundary note, and change-log entry.

## Risks And Deferrals

- Risk: state-block bookkeeping is forgotten by agents, so declared state
  drifts and the convention becomes noise.
  - Mitigation: keep the block to one small YAML stanza; put the state-update
    step inline in template task lists; design doctor (later) to repair the
    declared side with one paste.
- Risk: gate receipts are self-attested; the agent that edits a plan can also
  rewrite the receipt.
  - Mitigation: spec records the reviewed commit and recommends out-of-band
    anchors (PR review ID, human-authored approval commit); cryptographic
    anchoring deferred.
- Risk: amendment escalation is either too cheap (self-selection returns) or
  too expensive (silent under-declaration).
  - Mitigation: single explicit escalation rule; revisit after first real use
    and record calibration in the evaluator calibration ledger.
- Risk: ceremony creep for small tiers.
  - Mitigation: receipts and contracts activate by tier and risk, matching the
    existing evidence-over-ceremony rules.
- Deferred work: `forgeloop doctor` / `verify-gates` implementation.
  - Reason: harness deferral rule; spec must be validated by hand first.
- Deferred work: signed tags and critic countersignatures.
  - Reason: hardening on top of a format that must stabilize first.

## Approval Gates

- Plan approval required before implementation: `yes`
- Human test handoff required before PR: `yes`
- Commit, push, PR, archive, or merge allowed without explicit approval: `no`
- Hard stops:
  - destructive or irreversible operation: none expected.
  - breaking change: verification contract template restructure; flag in PR.
  - data loss or corruption risk: none.
  - security-sensitive decision: none.
  - material cost change: none.
  - major scope expansion: adding any executable tooling to this phase.
  - production chaos: not applicable.

## Exit Criteria

- Scope complete or explicitly deferred.
- Required tests pass (lint, `git diff --check`, `npm test`).
- Manual smoke walkthrough completed and recorded.
- Docs and diagrams are updated (roadmap entry, README pointer).
- Execution report is complete.
- Roadmap / Master Plan status is updated.
