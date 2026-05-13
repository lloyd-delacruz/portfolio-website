---
title: "Prompting Like an Engineer: Ten Patterns I Lean On Every Day"
excerpt: "The ten habits that did more for my output than any model upgrade — phrased as patterns, with the exact shapes I reach for and the situations where each one earns its keep."
date: "2026-02-19"
author: "Lloyd Dela Cruz"
category: "ai"
tags: ["AI", "Prompting", "LLMs", "Workflow", "Claude"]
readTime: "10 min read"
featured: true
image: "/images/blog/prompting-patterns.jpg"
video: false
interactive: false
gradient: "from-indigo-600 via-blue-600 to-purple-800"
published: true
---

# Prompting Like an Engineer: Ten Patterns I Lean On Every Day

The fastest way to get worse output from a strong model is to type the way you'd type into a search bar. The fastest way to get *consistently* good output is to think of prompts as small, named patterns — the way you'd think of design patterns in code.

These are the ten I reach for daily. None of them are clever. All of them survive model upgrades, which is what makes them worth writing down.

<figure>
<svg viewBox="0 0 720 320" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Grid of ten prompting pattern names">
  <style>
    .card{fill:#fbfaf8;stroke:rgba(28,22,46,0.09)}
    .tag{font:600 11px ui-sans-serif,system-ui;fill:#6d28d9;letter-spacing:0.06em}
    .name{font:700 13px ui-sans-serif,system-ui;fill:#1f1a2e}
    .num{font:800 22px ui-sans-serif,system-ui;fill:#ede9fe}
  </style>
  <g>
    <rect class="card" x="20"  y="20"  width="135" height="72" rx="10"/><text class="num" x="130" y="44">01</text><text class="tag" x="32" y="44">SCOPE</text><text class="name" x="32" y="68">Anchor the goal</text>
    <rect class="card" x="165" y="20"  width="135" height="72" rx="10"/><text class="num" x="275" y="44">02</text><text class="tag" x="177" y="44">SHAPE</text><text class="name" x="177" y="68">Show the output</text>
    <rect class="card" x="310" y="20"  width="135" height="72" rx="10"/><text class="num" x="420" y="44">03</text><text class="tag" x="322" y="44">ROLE</text><text class="name" x="322" y="68">Pick a stance</text>
    <rect class="card" x="455" y="20"  width="135" height="72" rx="10"/><text class="num" x="565" y="44">04</text><text class="tag" x="467" y="44">CONTEXT</text><text class="name" x="467" y="68">Paste, don't recite</text>
    <rect class="card" x="600" y="20"  width="100" height="72" rx="10"/><text class="num" x="675" y="44">05</text><text class="tag" x="612" y="44">CONSTRAIN</text><text class="name" x="612" y="68">Name what's off</text>

    <rect class="card" x="20"  y="104" width="135" height="72" rx="10"/><text class="num" x="130" y="128">06</text><text class="tag" x="32" y="128">RUBRIC</text><text class="name" x="32" y="152">Grade before you ask</text>
    <rect class="card" x="165" y="104" width="135" height="72" rx="10"/><text class="num" x="275" y="128">07</text><text class="tag" x="177" y="128">DRAFT</text><text class="name" x="177" y="152">Ask for a stub</text>
    <rect class="card" x="310" y="104" width="135" height="72" rx="10"/><text class="num" x="420" y="128">08</text><text class="tag" x="322" y="128">COUNTER</text><text class="name" x="322" y="152">Steelman, then choose</text>
    <rect class="card" x="455" y="104" width="135" height="72" rx="10"/><text class="num" x="565" y="128">09</text><text class="tag" x="467" y="128">CHECK</text><text class="name" x="467" y="152">Verify before claim</text>
    <rect class="card" x="600" y="104" width="100" height="72" rx="10"/><text class="num" x="675" y="128">10</text><text class="tag" x="612" y="128">SHRINK</text><text class="name" x="612" y="152">Cut the prelude</text>
  </g>
  <text x="20" y="220" font-family="ui-sans-serif,system-ui" font-size="12" fill="#4b4660">Read left-to-right, top-to-bottom. The first row is what you say <em>before</em> the model answers; the second is what you do <em>after</em>.</text>
</svg>
</figure>

## 1 · Anchor the goal

Start with one sentence that names the outcome, not the task. "Help me write tests" is a task. "Help me catch the off-by-one that's breaking pagination on page 7" is a goal. The model treats the second one like a contract.

## 2 · Show the output

If you know what the result should look like — a code block, a table, a three-bullet summary — say so up front. Models can match almost any shape if you describe it once. They can't read your mind about whether you want prose or a list.

```text
Reply with a markdown table: column A is the field name,
column B is the type, column C is one example value.
```

That's not formality. That's saving yourself a round-trip.

## 3 · Pick a stance

"You are a senior reviewer" works less because of the word "senior" and more because it pins a perspective. The wrong stance is "be a helpful assistant" — that's the default and it dilutes everything else. A specific stance ("you are the person who has to maintain this in a year") changes the answer in useful ways.

## 4 · Paste, don't recite

If you're asking about a file, paste the file. If you're asking about a schema, paste the schema. Models are excellent at reading exact context and bad at guessing it. The most common reason a prompt produces a wrong answer is that the prompt described the situation instead of showing it.

## 5 · Name what's off the table

Constraints sharpen output more than instructions do.

```text
- Don't add new dependencies.
- Don't change the public function signature.
- Don't write tests yet — I want to read the change first.
```

Three negative bullets save five minutes of "no, not like that."

## 6 · Grade before you ask

Write the rubric for a good answer *before* you ask the question. Even one line is enough:

> A good answer is one I can paste into the PR description without editing.

You'll catch yourself asking the wrong question half the time.

## 7 · Ask for a stub

For anything non-trivial, ask for the smallest scaffold first — function signatures, the outline of the doc, the table headers. Read it, react, then ask for the body. The model is faster than you, but you are better at deciding what to build than at fixing what's already built.

## 8 · Steelman, then choose

When the question has more than one defensible answer, ask for the two strongest cases *before* asking for a recommendation. You get a better recommendation, and — more importantly — you learn what the tradeoff actually is.

```text
Give me the strongest case for Postgres and the strongest case for SQLite
for this app. Two paragraphs each. Then your recommendation.
```

## 9 · Verify before you claim

Models hallucinate confidently. Treat any factual claim ("this function does X," "this library supports Y") as a hypothesis and check it. In code, that means running the test, not just reading the diff. In writing, it means clicking the link.

This is the pattern with the highest ratio of "boring" to "saves your career."

## 10 · Shrink the prelude

Most prompts are 70% setup and 30% question. Reverse it. The model already knows it's an assistant. It doesn't need to be told to think carefully. Spend that token budget on the actual context.

> Old: "Hi, I hope you're well. I'm working on a project where… I'd love it if you could…"
> New: "Schema below. Add a unique index on (user_id, slug). Show the migration."

## A composite, for shape

Here's what these patterns look like stacked, in a real prompt I used last week:

```text
GOAL: Find the bug that's making /api/saved-filters 500 when user has no filters.

CONTEXT:
- handler: (pasted)
- migration: (pasted)
- failing test: (pasted)

CONSTRAINTS:
- Don't change the schema. The migration just ran.
- Keep the response shape identical.

OUTPUT:
- The single-line fix, then a 2-sentence explanation.
- Then the test that would have caught this.

RUBRIC:
- Good if I can ship it without further edits.
```

That prompt has six of the ten patterns in it. The model returned a one-line fix that was correct on the first try.

---

The patterns aren't tricks. They are what happens when you stop treating the model like a search box and start treating it like a junior engineer who has read everything but cannot read your monitor. Show your work to it the way you'd want a colleague to show their work to you.

Almost everything else is downstream of that.
