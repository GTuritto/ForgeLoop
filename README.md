# ForgeLoop

**ForgeLoop** is my personal workflow for doing AI-assisted software development in a safer, more structured, and more repeatable way.

The original goal is simple:

> Use AI coding agents without letting them guess, drift, or silently create unreviewable changes.

I want a workflow where the repository remains the source of truth, where implementation starts only after the plan is clear, where documentation stays aligned with the code, and where AI agents operate inside explicit engineering boundaries.

ForgeLoop is starting as a personal workflow, but the intention is to evolve it into an **AI-agent-agnostic development harness**: a reusable system that can work across tools such as **Cursor**, **Claude Code**, **Codex**, and **Gemini / Antigravity-style agents**.

The long-term goal is not to build another coding agent.

The goal is to define the structure around the agent:

- how work is understood
- how User Stories are created or refined
- how plans are reviewed before implementation
- how loops are bounded
- how tests and documentation are kept aligned
- how changes become reviewable PRs
- how different AI tools can follow the same engineering workflow
