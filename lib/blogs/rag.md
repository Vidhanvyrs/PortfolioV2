---
title: "What (Still) Building an Enterprise RAG System Actually Taught Me"
description: "A junior engineer's honest diary of going from 'just use embeddings' to 'zamn, retrieval is genuinely hard'."
date: "2026-05-19"
tags: ["RAG", "SAP BTP", "Vector Search", "LLM"]
---

# What (Still) Building an Enterprise RAG System Actually Taught Me

*A junior engineer's honest diary of going from "just use embeddings" to "zamn, retrieval is genuinely hard"*

I joined this project thinking RAG was solved.

You chunk documents, embed them, do a cosine similarity search, feed results to an LLM. Tutorial done. Ship it.

> Chuck Norris doesn't do vector search. The embeddings come to him. And they're still wrong.

This is not a teardown of any system or team. This is just me documenting what I learned the hard way about building retrieval pipelines that actually work in the real world.

Consider it a letter to myself.

---

## Lesson 1: Vector Search Is Brilliant and Also Kind of Dumb lol

Vector search feels like magic until the day someone searches for a very specific technical ID — the kind with underscores, slashes, and numbers — and your retriever confidently returns something completely unrelated but semantically "close."

Embeddings are great at meaning.
They are genuinely bad at opaque strings.
A long SAP-style identifier gets flattened into a vector that looks like every other identifier. The chunk you need doesn't float up. The user gets a wrong answer.

### What I learned

No single retrieval method is sufficient for enterprise documents.
The vocabulary of business software is ugly, precise, and non-semantic. Your pipeline needs to handle both meaning and exact strings — and those are different problems.

---

## Lesson 2: Keyword Search Is Also Kind of Dumb, Just Differently lol x2

Okay, so you add keyword search.

Great.
Now your retriever finds the exact string perfectly but completely misses the paraphrased version of the same question asked two messages later.
Both retrievers are useful.  
Both retrievers are incomplete.
The real insight is that they fail in opposite directions, which means combining them — hybrid search covers each other's blind spots.

Running both in parallel and fusing the results isn't complicated.
It's just not what the tutorial tells you to do.

### What I learned

Hybrid isn't a fancy optimization.
For enterprise content, it's the baseline.

---

## Lesson 3: Your Tokenizer Will Haunt You

I spent an embarrassing amount of time debugging why certain queries returned bad results before I traced it back to tokenization.

Enterprise systems have IDs that look like:

```txt
THING/SUBTHING_ALIAS
```

And if your tokenizer doesn't know what to do with slashes and underscores, it either:
- treats the whole thing as one unknown token
- or splits it so aggressively that the signal disappears
The fix was conceptually simple:
Split on technical separators *and* keep the original compound.
Now a search covers both the whole ID and its parts.
- Chunks with the full match rank highest
- Partial matches serve as fallback

### What I learned

Your tokenizer is not a background detail.
In domain-specific retrieval, it's a first-class design decision.

---

## Lesson 4: Sometimes You Need a "Just In Case" Safety Net

Even after hybrid search and a good tokenizer, there was a class of failures where a very specific ID existed in the database but simply never made it into the candidate pool.
Why?

Because OR-logic plus result limits would surface generic sub-token matches first.
The fix was a direct substring search on the raw ID, run as a rescue step after the main retrievers.
No scoring.  
No tokenization.
Just:

> "Does this literal string exist anywhere?"

If yes, make sure it's in the pool.
This isn't elegant. It's a rescue net.
But rescue nets exist for a reason.

### What I learned

Build the sophisticated system.
Then add the dumb fallback anyway.
The dumb fallback will save you.

---

## Lesson 5: Ranking Is Where the Real Work Is

Getting relevant chunks into the pool is only half the battle.
Getting the *most relevant* chunk to the top is where users actually feel the difference.
I learned about **Reciprocal Rank Fusion (RRF)** — a deceptively simple formula that merges ranked lists from multiple retrievers in a way that rewards consensus.

A chunk appearing in both the vector results *and* keyword results gets boosted even if it wasn't #1 in either.
That's the signal:
Both retrievers agreeing is more trustworthy than one retriever being very confident.
On top of that, I added explicit boosts for domain-specific terms:
- acronyms
- IDs
- anything signaling the user is asking about something precise
Chunks containing those terms rank higher.  
Chunks with none get a slight demotion.

### What I learned

Ranking is a product decision, not just a math decision.
You're deciding what the user sees first.
Take it seriously.

---

## Lesson 6: The LLM Step Is Almost the Easy Part

After all of the above:

- condensing queries
- detecting scope
- running parallel retrievers
- fusing
- boosting
- optionally reranking

…the actual LLM call to generate the answer is almost anticlimactic.
Feed it good context.
Keep temperature at `0` for determinism.
Ask it to cite what it uses.
Done.

The funny thing about RAG is that everyone worries about the LLM and underestimates retrieval.
I was the same way.
The LLM is not the hard part.
The retrieval pipeline is the hard part.

### What I learned

If your retrieval is bad, your LLM can't save you.
If your retrieval is good, almost any decent LLM works fine.

---

# Honest Reflection: This Is a V1

None of this is perfect.

- The BM25 pool is an approximation
- Scope detection has edge cases
- We haven't run formal recall benchmarks

We're shipping on user feedback and good judgment.
But:

> "v1 that actually works" beats "perfect system in a notebook" every single time.

The goal was to move from a naive pipeline that failed on real queries to something users could trust for daily work.
That goal was met.
The next version will be better.
It always is.

---

# The Part Where I Acknowledge I Didn't Do This Alone

Honestly, Claude and Matt Pocock's content genuinely helped me through a lot of this.
Claude especially helped in that:

> "It's 1 AM, I need to explain this bug to someone, validate my mental model, and figure out whether what I'm thinking can actually be implemented."

kind of way.
There's something underrated about having a tool that can meet you at whatever level of half-formed the idea is.
I'd describe a failure case, and it would help me identify the class of problem I was actually dealing with.
That's useful.
Knowing what to search for is half the battle.
Use your tools.
That's not a shortcut.
That's engineering.