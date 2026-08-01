# Context Map Template

Use this template before long, brownfield, strict, release-critical, or
multi-agent work. The map controls what an agent must load, what it should
discover just in time, and what it must preserve for the next context.

## Metadata

- Project:
- Phase, story, or task:
- Date:
- Owner:
- Status: `Draft` | `Active` | `Superseded`
- Linked roadmap, phase plan, issue, or PR:

## Context Boundary

- Primary goal:
- Current approved scope:
- Explicit non-goals:
- Human approval gates:
- Latest known Git state:
- Latest verified command state:

## Source Priority

List the sources in the order agents should trust them.

1. Current repository state:
2. Approved plan or spec:
3. Tests and verification evidence:
4. ADRs or architecture notes:
5. Product or operational context:
6. Chat history or memory:

## Must Load

- Core instructions:
- Current roadmap or phase plan:
- Relevant templates:
- Relevant source files:
- Relevant tests:
- Relevant ADRs:

## Load Just In Time

- Files to read only when touched:
- Commands to run only when evidence is needed:
- External docs or links:
- Large logs, traces, or generated reports:

## Do Not Load By Default

- Large or stale files:
- Generated artifacts:
- Historical chats:
- Unrelated modules:
- Secrets or private data:

## Persisted Notes

- Decisions made:
- Assumptions accepted:
- Open questions:
- Broken or skipped checks:
- Next safe action:
- Handoff summary location:

## Context Reset Trigger

- Token or time threshold:
- Evidence of confusion or repeated exploration:
- Major design change:
- Failed verification loop:
- Fresh-context review required: `yes` | `no`
