---
title: "The Four Workflow Operations You Really Shouldn't Forget"
description: "Loop engineering, harness engineering, context engineering... the hype is loud. But if you're building an agent in your 5-to-9, there are four humble little workflow operations that do most of the heavy lifting. Here they are, in Mastra and LangGraph."
tags: ["ai-agents", "workflows", "mastra", "langgraph", "typescript", "python"]
date: 2026-07-11
---

# The Four Workflow Operations You Really Shouldn't Forget

We're all chasing the same thing right now: how do you squeeze the absolute most out of an agent? Loop engineering, harness engineering, context engineering. Every week there's a shiny new technique going viral, and honestly it's a lot to keep up with.

But here's the thing. Most of that discourse is about frontier agents built by teams with a research lab attached. What about *your* agent? The scrappy little side project you're building after work, in your 5-to-9. The one nobody has seen yet, that might never even make it to deploy. How do you make *that* thing strong enough to actually, you know, work?

Turns out one of your biggest levers is also one of the least glamorous: workflows. And inside workflows live four small operations that quietly do most of the heavy lifting. They're easy to skip past when you're excited about the fancy stuff. Please don't. This post is a friendly nudge to keep them front of mind.

I got properly introduced to all this while reading Sam Bhagwat's *Principles of Building AI Agents* (Sam runs Mastra, and the book is free, so go grab it). What follows is my take on those four operations, with copy-paste-ready code in both **Mastra** (TypeScript) and **LangGraph** (the graph layer in the LangChain world).

## Okay, so what's a workflow?

You already know how a plain agent behaves. At every step it can call any tool it fancies. That freedom is the whole magic of an agent, and also, sometimes, the whole headache. Hand a model total freedom over a 10-step task and it'll cheerfully wander off, skip something important, or call the wrong tool with total confidence and zero shame.

A graph-based workflow is the gentle guardrail. Instead of "here are 40 tools, best of luck," it lays out the sequence of actions, the branches, and the conditions your agent follows to reach a goal. It's the shape of the task, written down.

And the moment your logic becomes a graph, you get a pile of nice things almost for free: parallel execution, checkpoints you can pause and resume from, tracing across every step, and a visual graph you can stare at when something inevitably breaks at 1am.

Now, the four operations. This is the part to remember.

### Quick heads-up on naming

Tiny thing, but it saves you a confused half hour later. What people (and the book) call *branching* means "fire multiple LLM calls off the same input." In Mastra, the method that does that is actually `.parallel()`. Mastra keeps `.branch()` for the *conditions* operation further down. So hold this little map in your head:

| Operation | Mastra | LangGraph |
|---|---|---|
| Branching (fan out) | `.parallel([...])` | many edges from one node |
| Chaining | `.then(...)` | `add_edge(a, b)` |
| Merging (fan in) | `.map(...)` after parallel | aggregator node plus reducer |
| Conditions | `.branch([...])` | `add_conditional_edges(...)` |

Right, let's play.

## 1. Branching: fan out, same input

**What it's for:** firing off several LLM calls on the *same* input.

Picture yourself as an F1 engineer. You just got handed telemetry with 10 different suspected car issues, and someone wants a report on all of them, like, now.

You *could* make one big LLM call: "here are all 10 issues, sort it out." But that's a lot to load onto a single call. It'll rush, smush the issues together, and quietly miss things. Way more trustworthy to fan out: 10 parallel calls, each one obsessing over exactly one issue. Same input, split across many little workers. More accurate, and faster too. Everybody wins.

**Mastra**

```ts
import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";

const checkBrakes = createStep({
  id: "check-brakes",
  inputSchema: z.object({ telemetry: z.string() }),
  outputSchema: z.object({ report: z.string() }),
  execute: async ({ inputData }) => {
    // one focused LLM call, only about the brakes
    const report = await analyzeIssue("brakes", inputData.telemetry);
    return { report };
  },
});

// checkEngine and checkTyres look exactly the same,
// each with its own single-issue prompt.

export const raceReport = createWorkflow({
  id: "race-report",
  inputSchema: z.object({ telemetry: z.string() }),
  outputSchema: z.object({
    "check-brakes": z.object({ report: z.string() }),
    "check-engine": z.object({ report: z.string() }),
    "check-tyres": z.object({ report: z.string() }),
  }),
})
  .parallel([checkBrakes, checkEngine, checkTyres]) // fan out
  .commit();
```

**LangGraph**

Here you fan out by drawing several edges *out of the same node*. When multiple edges leave one node into independent nodes, the runtime happily runs them in parallel. One gotcha worth tattooing on your hand: any state key that several branches write to needs a **reducer**, otherwise the last write silently clobbers the rest and you lose data without a single error message.

```python
from operator import add
from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
    telemetry: str
    # the `add` reducer appends instead of overwriting, which parallel writes need
    reports: Annotated[list[str], add]

def check_brakes(state: State) -> dict:
    return {"reports": [analyze_issue("brakes", state["telemetry"])]}

# check_engine and check_tyres have the same shape.

builder = StateGraph(State)
builder.add_node("brakes", check_brakes)
builder.add_node("engine", check_engine)
builder.add_node("tyres", check_tyres)

# three edges leaving START, so all three run in parallel
builder.add_edge(START, "brakes")
builder.add_edge(START, "engine")
builder.add_edge(START, "tyres")
```

## 2. Chaining: output feeds the next

**What it's for:** passing the output of one LLM call straight into the next one.

This is the comfy, everyday one. Fetch some data, summarize it, then polish the summary into something you'd actually publish. Each step leans on the one before it, so you want a firm little assembly line, not a free-for-all.

**Mastra** chains with `.then()`:

```ts
export const draftFlow = createWorkflow({
  id: "draft-flow",
  inputSchema: z.object({ url: z.string() }),
  outputSchema: z.object({ final: z.string() }),
})
  .then(fetchData)   // gives { raw }
  .then(summarize)   // takes { raw }, gives { summary }
  .then(polish)      // takes { summary }, gives { final }
  .commit();
```

Each step's `outputSchema` needs to line up with the next step's `inputSchema`. When they don't quite match, `.map()` (which we'll meet in Merging) is how you reshape the data in between.

**LangGraph** chains with plain sequential edges:

```python
builder.add_edge(START, "fetch")
builder.add_edge("fetch", "summarize")
builder.add_edge("summarize", "polish")
builder.add_edge("polish", END)
```

Same idea, just drawn as a straight line through the graph.

## 3. Merging: bring the branches home

**What it's for:** pulling branches back together after they've diverged. Once you fan out, you nearly always need to gather the pieces into one result.

Back to the F1 report. You fanned out into brakes, engine, and tyres. Now you need all three findings combined into a single report the team can actually read over their coffee.

**Mastra:** after `.parallel()`, use `.map()` to reshape the combined output, then chain into a final step:

```ts
export const raceReport = createWorkflow({
  id: "race-report",
  inputSchema: z.object({ telemetry: z.string() }),
  outputSchema: z.object({ report: z.string() }),
})
  .parallel([checkBrakes, checkEngine, checkTyres])
  .map(async ({ inputData }) => {
    // inputData holds each step's output, keyed by step id
    return {
      findings: [
        inputData["check-brakes"].report,
        inputData["check-engine"].report,
        inputData["check-tyres"].report,
      ].join("\n\n"),
    };
  })
  .then(writeFinalReport) // one call to tie it all together
  .commit();
```

**LangGraph:** merging is honestly just a node. Point every parallel branch at one downstream "aggregator." The scheduler waits for all the branches to finish before it runs, and your reducer has already tidily collected their outputs:

```python
def write_report(state: State) -> dict:
    combined = "\n\n".join(state["reports"])
    return {"final": llm(f"Write a race report from these findings:\n{combined}")}

builder.add_node("report", write_report)

# fan in: all three branches converge on `report`
builder.add_edge("brakes", "report")
builder.add_edge("engine", "report")
builder.add_edge("tyres", "report")  # runs only once all three are done
builder.add_edge("report", END)
```

## 4. Conditions: route by decision

**What it's for:** letting the agent make a call and head down different paths depending on the answer.

A support triage flow classifies an incoming ticket. If it's critical, escalate to a human. If it's not, try to auto-resolve it. One little decision, two very different lives for that ticket.

**Mastra** uses `.branch()`, a list of `[condition, step]` pairs. Only the first branch whose condition is true gets to run:

```ts
export const triageFlow = createWorkflow({
  id: "triage-flow",
  inputSchema: z.object({ ticket: z.string() }),
  outputSchema: z.object({ result: z.string() }),
})
  .then(classify) // gives { severity: "critical" | "normal", ... }
  .branch([
    [async ({ inputData }) => inputData.severity === "critical", escalate],
    [async ({ inputData }) => inputData.severity !== "critical", autoResolve],
  ])
  .commit();
```

> Yep, this is the `.branch()` I flagged right at the top. In Mastra it's the *conditions* operation, not the fan-out one. Told you it'd save you a headache.

**LangGraph** uses `add_conditional_edges`. A little routing function returns a key, and the mapping decides where that key sends you:

```python
def route(state: State) -> str:
    return "escalate" if state["severity"] == "critical" else "auto_resolve"

builder.add_conditional_edges(
    "classify",   # run route() right after this node
    route,
    {
        "escalate": "escalate",
        "auto_resolve": "auto_resolve",
    },
)
```

## So, don't forget these

That's the whole toolkit:

- **Branching:** one input, many parallel calls, for accuracy and speed.
- **Chaining:** a tidy pipeline where each step feeds the next.
- **Merging:** gather the diverged branches back into one result.
- **Conditions:** send the flow down different paths based on a decision.

Here's the fun part. Almost every "real" workflow you'll ever build is just these four, stacked and layered. That F1 report alone uses three of them: branch out per issue, merge the findings, chain into the final write-up. Nothing exotic. Just four humble operations doing an honest day's work.

So the next time a new agent technique goes viral and you feel that urge to chase it, take a beat and check: are you actually using these four well first? Get comfortable with them and your after-hours agent stops being a demo that works once on a good day, and starts being something you'd genuinely put in front of a real person.

*Reference: Sam Bhagwat, Principles of Building AI Agents (free at mastra.ai/book). Code checked against the current Mastra and LangGraph APIs.*