---
title: "Coding with AI: How Large Language Models Are Reshaping Software Development Workflows"
excerpt: "Exploring the paradigm shift from traditional coding to AI-assisted development, where English becomes the new programming language and 'vibe coding' transforms how we build software."
date: "2025-06-28"
author: "Lloyd Dela Cruz"
category: "ai"
tags: ["AI", "Software Development", "LLMs", "Programming", "Future of Tech", "Andrej Karpathy"]
readTime: "12 min read"
featured: true
image: "/images/blog/coding-with-ai.jpg"
video: false
interactive: false
gradient: "from-cyan-600 via-blue-600 to-indigo-800"
published: true
---

# Coding with AI: How Large Language Models Are Reshaping Software Development Workflows

I've been thinking a lot about how coding is changing—and not just in a technical sense. Something deeper is shifting. After watching Andrej Karpathy's recent talk at YC's AI Startup School, it finally clicked for me: we're not just automating code, we're redefining what it means to develop software in the first place.

Karpathy calls it **"Software 3.0"**, and to be honest, it's not just a buzzword. It's a paradigm shift.

## From Logic to Language: The Rise of Software 3.0

Karpathy's framework stuck with me. He breaks software into three eras:

**Software 1.0**: Developers write logic explicitly—every condition, every loop.

**Software 2.0**: Machine learning enters the picture, and now we're training models instead of writing instructions.

**Software 3.0**: This is the big one—language itself becomes the interface. Instead of writing code, we describe what we want in plain English and the model does the heavy lifting.

It's like we've handed the compiler a brain that understands us. And as Karpathy said, **"English is the new programming language."**

That line stuck with me—not because it's poetic, but because it's becoming real. I'm seeing it in the way junior devs are learning, in how startups ship MVPs in weeks, and in how non-technical teams are suddenly building tools they never could before.

### The Technical Reality

Let me show you what this looks like in practice. Here's how I recently built a data processing pipeline:

```python
# AI-assisted approach (Software 3.0)
# Prompt: "Create a function that validates patient records, 
# normalizes field formats, and enriches with lookup data"
```

The difference isn't just syntactic—it's cognitive. I spent more time thinking about *what* I wanted than *how* to implement it.

## Vibe Coding: Less Syntax, More Flow

If you haven't heard the term **"vibe coding"**, don't worry—it's new. Karpathy introduced it with a smile, but there's depth to it. It's not just about writing code with an AI assistant. It's about co-creating with one.

You prompt, the model responds. You tweak, it adapts. You're not obsessing over semicolons or types—you're trying to get the "vibe" of the function right. It feels more like sculpting than writing.

At first, I didn't know how to feel about that. It felt imprecise. Sloppy, even. But over time, I realized: precision isn't gone—it's just moved. It shows up in how we guide the model, how we review its outputs, how we reason about what it generated.

**You're still coding—just in a new language: intent.**

### A Real Example: Building with Intent

The AI understood not just the technical requirements, but the *context*. It knew that wheelchair tracking would need status indicators, location info, and battery levels. I didn't have to specify every detail—I communicated the intent, and it filled in the reasonable assumptions.

## Is This Really Better?

Honestly? It depends on what you mean by "better."

### 🚀 What's amazing:

**Speed**: I can sketch out an app idea and have a working prototype in hours.

**Exploration**: I ask "what if" questions in real time. The model doesn't get tired or impatient.

**Accessibility**: People who never saw themselves as coders are now building tools that solve real problems.

**Learning**: AI explains concepts as it codes, making complex patterns accessible to everyone.

### ⚠️ But let's be real:

**The model hallucinates**: Sometimes it gives confident, elegant nonsense.

**You still need to know what "good code" looks like**: LLMs will happily write insecure, inefficient, or unscalable solutions if you don't guide them.

**Debugging AI-generated code**: It's a skill in itself. When something breaks, you need to understand both the intended logic and the AI's interpretation.

**Technical debt**: Without proper review, AI can generate code that works but violates best practices.

Karpathy is clear on this: **AI isn't a replacement—it's a collaborator**. You're still responsible. The craft is still yours. The model just accelerates the journey.

## The New Developer Skillset

Here's my personal take: the role of a developer is changing—from writing every line of code to becoming more of a **system designer**, **reviewer**, and **orchestrator**.

Karpathy predicted that future developers will spend less time typing and more time thinking—about architecture, about flow, about the interaction between components (human and AI).

And you know what? That excites me. Because it means we're moving up the value chain. We're focusing more on **what** we build, and less on how many keystrokes it takes to build it.

### Essential Skills for the AI-Assisted Era

**1. Prompt Engineering** (yes, it's real)
```
// Instead of this generic prompt:
"Write a function to process data"

// Write this specific prompt:
"Create a TypeScript function that validates healthcare data records, 
handles missing fields gracefully, logs validation errors for compliance, 
and returns both valid records and error summaries"
```

**2. Critical Evaluation of AI Output**
- Does this code handle edge cases?
- Are there security vulnerabilities?
- Is this maintainable and testable?
- Does it follow our team's conventions?

**3. Architecture Thinking**
- How do these AI-generated components fit together?
- What are the system boundaries and interfaces?
- How do we ensure consistency across AI-assisted development?

**4. Curiosity and Playfulness**
These tools reward creativity more than rigidity. The developers thriving in this era are the ones willing to experiment, iterate, and explore.

## Real-World Applications in My Work

### Healthcare Data Processing

In my work with Vancouver Coastal Health, AI assistance has transformed how I approach data problems:

```python
# AI suggested this approach for temporal analysis
daily_usage = group_by_time_period(usage_data, 'daily')
maintenance_impact = correlate_maintenance_with_usage(
    daily_usage, maintenance_records
)

# AI helped optimize this prediction algorithm
demand_forecast = predict_future_demand(
    historical_patterns=daily_usage,
    seasonal_adjustments=get_seasonal_factors(),
    maintenance_windows=maintenance_impact
)

return {
    'utilization_trends': daily_usage,
    'maintenance_optimization': maintenance_impact,
    'demand_predictions': demand_forecast
}
```

The AI didn't just write code—it helped me think through the problem space more systematically.

### Rapid Prototyping

For side projects, AI acceleration means I can test ideas faster:

## The Broader Implications

### For Individual Developers

**Junior developers** can now contribute meaningfully to complex projects from day one. They're not held back by syntax or framework knowledge—they can focus on understanding business logic and user needs.

**Senior developers** become force multipliers. Instead of writing every line, they're architecting systems, reviewing AI-generated code, and solving higher-order problems.

**Career changers** (like myself) can leverage domain expertise more effectively. My healthcare background becomes more valuable when I can quickly translate requirements into working software.

### For Organizations

**Faster iteration cycles**: Ideas become prototypes in hours, not weeks.

**Democratized development**: Non-technical team members can contribute to product development.

**Reduced maintenance burden**: AI can help refactor legacy code and improve documentation.

**New quality assurance challenges**: We need better processes for reviewing AI-generated code.

## What This Means for the Future

When Karpathy said **"Software is changing—again,"** he wasn't exaggerating. And this time, the change feels more human than ever.

We're not just automating code. We're redefining how we express ideas, how we build systems, and who gets to be a builder.

### The Evolution Continues

I predict we'll see:

**Better AI-human collaboration tools**: IDEs that understand context across files, projects, and even teams.

**Domain-specific AI assistants**: Models trained on healthcare, finance, or other specialized domains.

**AI-generated tests and documentation**: Complete development workflows, not just code generation.

**New debugging paradigms**: Tools specifically designed for understanding and fixing AI-generated code.

## Practical Advice for Developers

So here's my advice to anyone feeling overwhelmed: **don't panic—play**. Ask questions. Test ideas. Talk to the AI like a curious partner. You'll be surprised what you can build together.

### Getting Started

1. **Choose your tools**: Claude, ChatGPT, GitHub Copilot, or Cursor—find what works for your workflow.

2. **Start small**: Use AI for code reviews, documentation, or simple functions before tackling complex systems.

3. **Develop your prompting skills**: Be specific, provide context, and iterate on your requests.

4. **Always review**: Treat AI output as a smart first draft, not the final answer.

5. **Embrace the learning**: Use AI explanations to understand new concepts and patterns.

### A Personal Example

Here's how I use AI in my daily workflow:

```javascript
// I discuss each task with AI first:
// "What are potential causes of GPS inaccuracy in indoor tracking?"
// "How would you structure tests for real-time data updates?"
// "What's the best way to document WebSocket APIs?"

// Then I code collaboratively, with AI as my pair programming partner
```

This approach has made me more productive and—surprisingly—a better developer. I ask better questions and think more systematically about problems.

## Final Thoughts

We're not writing code anymore.
**We're shaping possibility—with words.**

The transition to AI-assisted development isn't just about new tools—it's about a fundamental shift in how we think about building software. We're moving from syntax to semantics, from implementation to intention.

And honestly? I'm excited about where this leads. Because when the barriers to building software get lower, more problems get solved. More ideas become reality. More people become builders.

The future of development isn't about replacing human creativity—it's about amplifying it.

---

## References

- Karpathy, A. (2025, June 17). Software is changing (again) [Talk]. YC AI Startup School. https://www.donnamagi.com/articles/karpathy-yc-talk

- Akhoroz, M., & Yildirim, C. (2025). Conversational AI as a coding assistant: Understanding programmers' interactions with and expectations from large language models. arXiv. https://arxiv.org/abs/2503.16508

- Haque, A., et al. (2025). SOK: Exploring hallucinations and security risks in AI‑assisted software development. arXiv. https://arxiv.org/abs/2502.18468

- Tabarsi, B., Reichert, H., Limke, A., Kuttal, S., & Barnes, T. (2025). LLMs' reshaping of people, processes, products, and society in software development. arXiv. https://arxiv.org/abs/2503.05012

*What's your experience with AI-assisted development? I'd love to hear how these tools are changing your workflow and what challenges you're facing. The conversation is just getting started.*