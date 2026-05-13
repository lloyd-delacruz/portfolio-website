---
title: "The Agent Stack: How I Wire Claude, Cursor, and MCP Into a Daily Workflow"
excerpt: "A practical look at the toolchain I lean on every day — what each layer actually does, where the seams are, and why the boring glue matters more than the model."
date: "2025-12-18"
author: "Lloyd Dela Cruz"
category: "development"
tags: ["AI", "Claude Code", "Cursor", "MCP", "Workflow"]
readTime: "9 min read"
featured: true
image: "/images/blog/agent-stack.jpg"
video: false
interactive: false
gradient: "from-indigo-600 via-blue-600 to-purple-800"
published: true
---

# The Agent Stack: How I Wire Claude, Cursor, and MCP Into a Daily Workflow

Every few months someone asks what my "AI setup" looks like. The honest answer used to be embarrassing: a tab of ChatGPT, a tab of Claude, and a lot of copy-paste. That stopped scaling around the time MCP landed.

What I run now is less a stack and more a thin chain of agents talking to a handful of tools. Each layer does one thing. When something breaks, I know which layer to blame.

<figure>
<svg viewBox="0 0 720 280" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Layered diagram showing Editor, Agent, MCP, and Tools">
  <defs>
    <linearGradient id="layer1" x1="0" x2="1"><stop offset="0" stop-color="#ede9fe"/><stop offset="1" stop-color="#f6f4f1"/></linearGradient>
    <linearGradient id="layer2" x1="0" x2="1"><stop offset="0" stop-color="#dbeafe"/><stop offset="1" stop-color="#f6f4f1"/></linearGradient>
    <linearGradient id="layer3" x1="0" x2="1"><stop offset="0" stop-color="#d1fae5"/><stop offset="1" stop-color="#f6f4f1"/></linearGradient>
    <linearGradient id="layer4" x1="0" x2="1"><stop offset="0" stop-color="#fee2e2"/><stop offset="1" stop-color="#f6f4f1"/></linearGradient>
  </defs>
  <rect x="20"  y="20"  width="680" height="48" rx="10" fill="url(#layer1)" stroke="rgba(28,22,46,0.09)"/>
  <rect x="20"  y="80"  width="680" height="48" rx="10" fill="url(#layer2)" stroke="rgba(28,22,46,0.09)"/>
  <rect x="20"  y="140" width="680" height="48" rx="10" fill="url(#layer3)" stroke="rgba(28,22,46,0.09)"/>
  <rect x="20"  y="200" width="680" height="48" rx="10" fill="url(#layer4)" stroke="rgba(28,22,46,0.09)"/>
  <text x="40"  y="50"  font-family="ui-sans-serif,system-ui" font-size="14" font-weight="700" fill="#1f1a2e">Editor</text>
  <text x="120" y="50"  font-family="ui-sans-serif,system-ui" font-size="13" fill="#4b4660">Cursor / VS Code — where I read &amp; commit code</text>
  <text x="40"  y="110" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="700" fill="#1f1a2e">Agent</text>
  <text x="120" y="110" font-family="ui-sans-serif,system-ui" font-size="13" fill="#4b4660">Claude Code — plans, edits, runs tools, asks me to confirm</text>
  <text x="40"  y="170" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="700" fill="#1f1a2e">MCP</text>
  <text x="120" y="170" font-family="ui-sans-serif,system-ui" font-size="13" fill="#4b4660">Model Context Protocol — the thin contract between agent and tools</text>
  <text x="40"  y="230" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="700" fill="#1f1a2e">Tools</text>
  <text x="120" y="230" font-family="ui-sans-serif,system-ui" font-size="13" fill="#4b4660">Filesystem · Git · Postgres · Linear · Figma · custom servers</text>
</svg>
<figcaption><em>Four layers, one direction of dependency. Nothing in the bottom row knows the layer above exists.</em></figcaption>
</figure>

## What each layer is actually for

**Editor.** Cursor is my read-and-commit surface. I still scroll, scrub diffs, and pick branches like a human. The agent never owns the editor; it borrows it.

**Agent.** Claude Code is the planner-and-doer. It's the thing that decides which file to open, which test to run, whether to ask me a question. It carries the conversation; the editor doesn't.

**MCP.** This is the boring layer that made the rest of it click. Before MCP, every integration was a bespoke plugin with its own auth, its own logging, its own opinions. Now my agent speaks one language to every tool — and I can swap models without rewriting the toolbelt.

**Tools.** Filesystem and git are table stakes. The non-obvious ones — a Postgres server scoped to read-only views, a Linear server that can only file tickets in one project, a Figma server I trust just enough to read — are where most of the leverage actually lives.

## The rule I follow when adding anything new

> A tool earns a place in the stack only if I can describe, in one sentence, what it is allowed to do.

It sounds obvious. It is not how most people add MCP servers. The temptation is to install everything in the directory and let the agent figure out which one fits. That works for a week. Then you start getting tickets filed against the wrong repo, queries that should have been read-only writing to staging, and the agent confidently doing things you didn't notice it could.

Scope first. Power second.

## A typical day in the chain

Here is the actual shape of a feature I shipped last week — adding a "saved filters" view to an internal dashboard.

```text
me        → "Saved filters. Per-user. Backed by Postgres."
agent     → opens repo, reads schema, drafts migration
me        → "Migration looks fine. Run it on dev."
agent     → applies migration via mcp-postgres (read-write, dev only)
agent     → writes the endpoint, writes the test, runs the test
agent     → "Test fails on null user_id. Patch?"
me        → "Patch."
agent     → patches, reruns, files a Linear ticket linking the PR
me        → reviews diff in editor, commits, opens PR
```

Three things made that flow tolerable:

1. **The agent asked before each side-effect.** No silent migrations.
2. **The MCP servers were scoped.** The Postgres server literally cannot touch production from this project.
3. **I stayed in the editor for the things editors are good at** — reading the diff, naming the commit, deciding what to merge.

## The seams that bite

The cracks in this stack are not in the model. They are in the contracts between layers.

- **Tool ambiguity.** Two MCP servers offering similar capabilities (say, two ways to read files) and the agent picks the wrong one. Fix: install fewer servers, or rename them so the descriptions don't overlap.
- **Permission fatigue.** Every tool call asking "are you sure?" trains you to click yes without reading. Fix: a small allowlist for genuinely safe calls, and never expand it to anything that writes.
- **Stale context.** The agent thinks the schema looks one way; the migration two days ago changed it. Fix: have the agent re-read before it edits, not just at session start.

None of these are model problems. They are plumbing problems. The model is the easiest part to swap.

## What I'd tell someone starting today

Pick one editor. Pick one agent. Add MCP servers one at a time, and only after you've used the agent without them long enough to know what you're missing. The single biggest jump in usefulness for me wasn't a model upgrade — it was the day I deleted four MCP servers I never used and renamed the ones I kept so the agent stopped confusing them.

A small, sharp stack beats a large, fuzzy one. Every time.

---

*Up next: a piece on the prompting patterns I lean on inside this chain. The stack matters, but the way you talk to the agent matters more.*
