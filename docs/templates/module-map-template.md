# Module / Component Map Template

Use this template to map a system into modules and components. In greenfield
work, use it to plan build order and scope. In brownfield work, use it to
discover the current shape before impact mapping.

## Metadata

- Project:
- Scope:
- Branch:
- Date:
- Owner:
- Status: `Draft` | `Reviewed` | `Approved` | `Stale`
- Source docs reviewed:
- Source code reviewed:

## Purpose

State why this map exists and what decisions it should support.

## Discovery Method

- Directories inspected:
- Runtime entry points inspected:
- Tests inspected:
- Schemas or migrations inspected:
- Docs, ADRs, or diagrams inspected:
- Recent PRs or issues inspected:
- Known blind spots:

## Module Summary

For each module:

- Module:
- Status: `confirmed` | `inferred` | `uncertain` | `missing`
- Responsibility:
- Owns:
- Must not own:
- Main components:
- Data owned or touched:
- Public interfaces:
- Depends on:
- Used by:
- Tests that protect it:
- Risks when changed:
- Notes:

## Component Detail

For each component:

- Component:
- Parent module:
- Responsibility:
- Files or directories:
- Entry points:
- State or data touched:
- External dependencies:
- Tests:
- Known issues:

## Dependency Map

- Upstream dependencies:
- Downstream dependencies:
- Shared utilities:
- Cycles or unclear dependencies:
- Boundaries that should not be crossed:

## Brownfield Uncertainty

Use this section when modules were discovered from an existing codebase.

- Confirmed boundaries:
- Inferred boundaries:
- Uncertain boundaries:
- Missing owners:
- Questions for human review:
- Evidence needed before implementation:

## Greenfield Build Plan

Use this section when planning new modules.

- Modules required this phase:
- Components required this phase:
- Build order:
- Integration points:
- Deferred modules or components:
- First usable vertical slice:

## Impact Guidance

- Likely modules touched by the next phase or feature:
- Components that need focused tests:
- Integration boundaries that need tests:
- Manual workflows affected:
- Docs or diagrams to update:

## Review Notes

- Reviewer:
- Findings:
- Approved assumptions:
- Assumptions to revisit:
