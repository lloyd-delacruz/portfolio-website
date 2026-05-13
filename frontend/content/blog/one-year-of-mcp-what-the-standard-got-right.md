---
title: "One Year of MCP: What the Standard Got Right, and What's Next"
excerpt: "A year after the Model Context Protocol stopped being a curiosity and started being a default — what it changed in practice, what it didn't, and the three open questions still ahead of it."
date: "2026-05-08"
author: "Lloyd Dela Cruz"
category: "development"
tags: ["MCP", "AI Integration", "Anthropic", "Tooling", "Protocol"]
readTime: "11 min read"
featured: true
image: "/images/blog/one-year-mcp.jpg"
video: false
interactive: false
gradient: "from-indigo-600 via-blue-600 to-purple-800"
published: true
---

# One Year of MCP: What the Standard Got Right, and What's Next

A year ago this month, MCP went from a thing a few of us were squinting at in repos to a thing my non-engineer colleagues had heard of. The pivot point was almost invisible from the outside — a quiet wave of native integrations across every major editor and assistant — but it changed how I build.

Twelve months in, it's worth saying what the standard actually did, and what it didn't.

<figure>
<svg viewBox="0 0 720 240" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MCP adoption timeline from launch to one year">
  <text x="20" y="24" font-family="ui-sans-serif,system-ui" font-size="13" font-weight="700" fill="#1f1a2e">MCP — milestones I noticed, not benchmarks</text>

  <!-- timeline base -->
  <line x1="40" y1="140" x2="700" y2="140" stroke="rgba(28,22,46,0.14)" stroke-width="2"/>

  <!-- tick + label helper repeated inline -->
  <g font-family="ui-sans-serif,system-ui" font-size="11" fill="#4b4660">
    <circle cx="80"  cy="140" r="6" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>
    <text x="80"  y="170" text-anchor="middle">Nov '24</text>
    <text x="80"  y="115" text-anchor="middle" fill="#1f1a2e" font-weight="700">spec drops</text>

    <circle cx="200" cy="140" r="6" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>
    <text x="200" y="170" text-anchor="middle">Feb '25</text>
    <text x="200" y="115" text-anchor="middle" fill="#1f1a2e" font-weight="700">first wave of servers</text>

    <circle cx="320" cy="140" r="6" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>
    <text x="320" y="170" text-anchor="middle">May '25</text>
    <text x="320" y="115" text-anchor="middle" fill="#1f1a2e" font-weight="700">OpenAI &amp; DeepMind adopt</text>

    <circle cx="440" cy="140" r="6" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>
    <text x="440" y="170" text-anchor="middle">Sep '25</text>
    <text x="440" y="115" text-anchor="middle" fill="#1f1a2e" font-weight="700">IDE-native everywhere</text>

    <circle cx="560" cy="140" r="6" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>
    <text x="560" y="170" text-anchor="middle">Jan '26</text>
    <text x="560" y="115" text-anchor="middle" fill="#1f1a2e" font-weight="700">scoped tokens land</text>

    <circle cx="680" cy="140" r="6" fill="#6d28d9" stroke="#6d28d9" stroke-width="2"/>
    <text x="680" y="170" text-anchor="middle">May '26</text>
    <text x="680" y="115" text-anchor="middle" fill="#6d28d9" font-weight="700">today</text>
  </g>

  <!-- arrow at end -->
  <polygon points="700,134 710,140 700,146" fill="rgba(28,22,46,0.14)"/>

  <!-- footnote -->
  <text x="40" y="210" font-family="ui-sans-serif,system-ui" font-size="11" fill="#8a849b">The interesting milestones aren't release notes; they're the months a thing stopped being a curiosity in my workflow and started being a default.</text>
</svg>
<figcaption><em>The standard's most important release was the one nobody announced — the day the JetBrains plugin gained native MCP and the conversation stopped being about which protocol.</em></figcaption>
</figure>

## What the standard got right

**One contract instead of fifty.** Before MCP, every integration was a bespoke plugin: its own auth flow, its own logging, its own opinions about errors. Each one was forgivable; the sum was a tax. MCP didn't do anything *new*. It just made everyone agree on the shape of the same thing, and that turned out to be most of the value.

**Servers, not endpoints.** Treating a tool as a server you connect to, rather than an endpoint you call, was the right abstraction. It moved auth, lifecycle, and capability discovery to one place. It also turned out to be the natural shape for security policy, which matters more than anyone wanted it to.

**Capability discovery as a first-class concept.** The single biggest day-to-day improvement is that the agent doesn't have to be told what a tool can do. It asks. That sounds small. It is the difference between writing a config file every time you add a new tool and not.

**Boring, on purpose.** The most underrated thing the spec did was refuse to be exciting. There is no LLM-specific magic in MCP. It is JSON, request/response, capabilities, errors. A junior engineer can read the whole spec in an afternoon and understand the entire surface. That is why it travelled.

## What it didn't fix

**Capability ambiguity.** Install three MCP servers that all expose `read_file` and the agent has to guess. The spec is silent on conflicts; in practice you end up with naming conventions and team norms doing the work the spec didn't. This will get standardised eventually. It hasn't yet.

**Trust at scale.** Local servers, fine. Remote servers run by other people? You are pasting capabilities into your agent's context that you did not write. The first generation of MCP marketplaces are a security incident waiting for a quiet Tuesday. Scoped tokens, which landed in January, are necessary but not sufficient.

**The "where does the state live" problem.** Tools that are stateful (a query session, a long-running build) sit awkwardly inside a protocol designed around capability calls. The current pattern is for servers to keep their own state and expose handles — which works, but no two servers do it the same way.

## What changed in my workflow

The honest answer is that I stopped writing integration code. Not less of it. None.

I used to write a thin client every time I wanted my agent to talk to Postgres, or Linear, or our internal staging API. That code wasn't hard, but it wasn't free, and it was duplicated across every project. Now there's an MCP server for each — usually one I didn't write — and I just declare which ones a project uses.

The leverage isn't in the protocol. It's in the libraries the protocol made worth writing.

```yaml
# .mcp.yaml — what a project looks like now
servers:
  - name: filesystem
    scope: ./
  - name: postgres-dev
    url: stdio:./scripts/pg-dev-server
    permissions: [read, migrate]
  - name: linear
    project: portfolio-website
    permissions: [search, comment, create]
```

That file is the entire integration story for a project that, two years ago, would have been five hundred lines of glue.

## The three questions still ahead

**1 · How do you describe a tool well enough that the agent picks it confidently?**
The current descriptions are good. They are not good enough at distinguishing two tools that overlap by 80%. The next generation of servers will need richer capability hints — preconditions, side effects, cost estimates — and a way for agents to reason about which to use without trial-and-error. This is the hardest open problem and probably the most valuable.

**2 · What does "least privilege" mean for an MCP server you didn't write?**
Scoped tokens are a start. The deeper question is whether the agent itself can audit a server's behaviour at runtime — "this server says it only reads, but I see it writing on this code path." That's a verification problem dressed up as a protocol problem.

**3 · How does MCP play with multi-agent setups where one agent's tools are another agent's environment?**
The protocol is fine at agent-to-tool. It is silent on agent-to-agent. The community will work this out, and the first standard pattern that ships will probably define the shape of multi-agent work for a decade.

## What I'd tell a team adopting it today

- **Don't write your own MCP server until you've used three.** You will be tempted on day one. Wait. The community has shipped most of what you need.
- **Scope everything.** Every server. Every project. Permissions in writing, not in folklore.
- **Read the spec.** It is genuinely short. The teams who treat MCP as a black box make different mistakes than the teams who read the spec.
- **Invest in the audit log, not the connection log.** Knowing *that* a tool was called matters less than knowing *what it did*. Build for the audit before you have an audit problem.

## One year in

The thing I underestimated a year ago was how much of the value would be social, not technical. MCP made it cheap for people who don't know each other to ship tools that talk to each other. Standards do that when they're boring and right. This one is boring and right.

The next year will be quieter, I think. The fights will be about capability description and trust, not about the protocol itself. The protocol is settled.

Which is — and I mean this as a compliment — the best thing that could have happened to it.

---

*If you missed the original explainer, my [first piece on MCP](/blog/understanding-model-context-protocol-future-ai-integration) holds up surprisingly well — the shape of the standard hasn't changed, only the world around it.*
