---
title: "What matters in Production RAG - Short Notes"
description: "An reference to Arpit Bhayani's blog on what actually matters in production for a RAG system at an organizational level."
date: "2026-05-19"
tags: ["RAG", "LLM", "Production", "System"]
---

### ==**RAG** **BASICS**==
A Rag system has two pipelines - Ingestion(indexing) and Retrieval(querying)
In Ingestion pipeline we ingest raw documents, split them, chunk them, create dense vector embedding's of them and then store them in a vector DB (runs offline)
In Retrieval pipeline we take the user question embed it, perform a similarity search of it on the document vectors, retrieve the nearest chunks and provide it as a context to the LLM with the question prompt (runs online)
Math Underlying it - cosine similarity = dot product of vectors / dot product of magnitude
$similarity(q,d)=∥q∥⋅∥d∥q⋅d​$

### ==**CHUNKING**==
chunks should be small enough to retrieve specific and relevant texts but large to contain complete thoughts 
Naive approach is
- Fixed Size Chunking at some character or token count say 512 tokens with a 128-token overlap
Production approaches are
- Recursive Splitting which splits paragraph first then sentences then characters as fallback preserving the semantic structure
- Semantic Chunking is what we used in tensAI this basically embed consecutive sentences and insert chunk boundaries where cosine similarity between adjacent sentences drops below a threshold identifying genuine topic shift
- Structure aware Splitting for eg. code aware splitting, splitting the code based on function classes using AST parsing, For legal docs split at clause boundaries etc etc
Always store metadata with the chunks it is really important

### ==**Embedding Models and the Model Lock Problem**==
The choice of your embedding model during indexing is always a long commitment switching models, every vector are now in commensurable with the new query embeddings hence must re embed the whole corpus
### ==**RAG Indexing Pipelines**==
your knowledge base is not static, documents are updated, retracted, superseded, deleted hence our indexing pipeline should handle this operations correctly else our RAG application will go stale
#### Chunk Identity
A document update requires this following steps to be followed instead of simply updating a row as you would in a rdb
1. Identify all 15 chunk IDs that belong to the old version of the document
2. Delete them from the vector store
3. Re-chunk the updated document (which may now produce 17 chunks)
4. Re-embed and insert the 17 new chunks'
Now this requires a mapping layer that vector db do not provide, the standard approach is a document registry, a simply relational table that maps each doc_id to the list of chunk vector IDs currently in the index
```
CREATE TABLE doc_chunk_registry (
    doc_id          TEXT NOT NULL,
    chunk_vector_id TEXT NOT NULL,
    content_hash    TEXT NOT NULL,
    version         INTEGER NOT NULL DEFAULT 1,
    indexed_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status          TEXT NOT NULL DEFAULT 'active',  -- 'active' | 'deleted' | 'superseded'
    PRIMARY KEY (doc_id, chunk_vector_id)
);
```
The flow when a document update arrives goes like this 
```
def reindex_document(doc_id: str, new_content: str, vector_store, registry_db):
    # 1. Find existing chunk IDs
    old_chunk_ids = registry_db.query(
        """SELECT chunk_vector_id
			FROM doc_chunk_registry
			WHERE doc_id = %s AND status = 'active'""",
        (doc_id,)
    )

    # 2. Delete old vectors
    vector_store.delete(ids=[row["chunk_vector_id"] for row in old_chunk_ids])
    registry_db.execute(
        """UPDATE doc_chunk_registry
		    SET status = 'superseded'
		    WHERE doc_id = %s AND status = 'active'""",
        (doc_id,)
    )

    # 3. Re-chunk and re-embed
    new_chunks = splitter.split_text(new_content)
    new_embeddings = embed(new_chunks)
    new_ids = vector_store.upsert(new_embeddings, metadata=[...])

    # 4. Register new chunks
    for chunk_id in new_ids:
        registry_db.execute(
            """INSERT INTO doc_chunk_registry
			        (doc_id, chunk_vector_id, content_hash, version)
		            VALUES (%s, %s, %s, %s)""",
            (doc_id, chunk_id, content_hash, next_version)
        )
```

#### Avoid  Unnecessary Re-Embedding
Re-embedding is expensive so only re-embed what actually changed instead of everything 
Now for this in order to recognize what actually changed Content hashing is the first gate When a doc arrives compute a hash of its content if hash matches what's in the registry, skip it entirely Most updates are metadata changes which do not affect the actual text content therefore do not require re-embedding
```
def should_reindex(doc_id: str, new_content: str, registry_db) -> bool:
    row = registry_db.query_one(
        """SELECT content_hash
		        FROM doc_chunk_registry
		        WHERE doc_id = %s
			        AND status = 'active' LIMIT 1""",
        (doc_id,)
    )
    if row is None:
        return True  # New document
    new_hash = hashlib.sha256(new_content.encode()).hexdigest()
    return new_hash != row["content_hash"]
```
For large documents you can go further and hash at chunk level and reembed only the chunks whose content changed
#### Index Versioning and No Downtime Updates
##### The Problem
Suppose your RAG system has 10,000 documents stored as embeddings.
You start rebuilding the vector index with newer embeddings or updated documents.
Example:
- Documents `1 → 6000` updated successfully
- System crashes before `6001 → 10000`
Now your database is inconsistent:

|Document|Version|
|---|---|
|1-6000|New Version|
|6001-10000|Old Version|

This is dangerous because:
- Retrieval becomes unpredictable
- Search results may mix old and new data
- Users can receive inconsistent answers
- Debugging becomes extremely hard
This is called a **partial update problem**.
he safe pattern is alias-based deployment, borrowed directly from Elasticsearch operations:

```
rag_index_2026_05_14  (built overnight, fully validated)
rag_index_current     (alias pointing to above)
```

You build the new index completely, validate it against a benchmark query set, then atomically swap the alias. The old index stays around for a configurable retention period in case rollback is needed. No query ever sees a partial index.
What is an Alias? It is just a pointer

#### Embedding Model Upgrades
When an embedding model upgrade is realeased our vectors in our index are now wrong as they are in some sense produced by a different model
this means that embedding model upgrades require full corpus re-rembedding, the migration strategy should be like this --
1. Build a shadow index with the new model running in parallel
2. Route a small percentage of queries to the shadow index and compare results
3. Gradually shift traffic using the alias pattern above 
4. Keep the old index warm until you are confident in the new one 

This is why embedding model choice is really important treat it like database schema migration painful to undo so choose carefully

### ==Observability and Retrieval Tracing==
RAG system fails mostly because of retrieval problems not because the LLM hallucinated and we really need to have a way to distinguish between them 
##### The Span Architecture
A complete RAG request should produce a trace with these spans, nested in a single root span:
```
rag_request (root)
  ├── embedding.query          (latency, model, input tokens)
  ├── retrieval.vector_search  (latency, num_results, top_k, filter applied)
  ├── retrieval.rerank         (latency, num_input, num_output, model)
  ├── prompt.assembly          (latency, total_tokens, num_chunks_used)
  └── llm.generate             (latency, model, input_tokens, output_tokens, stop_reason)
```
##### Logging the "Why"
A common question in production is not just what was retreived? but why did the system think this was relevant
similarity score might sometimes be false positive
***To address this, we can add a lightweight rationale step:***
After reranking, send the top-5 chunks and the query to the LLM with a short system prompt asking it to explain the relevance of each chunk before generating the final answer. The rationale is logged as a structured field on the trace. This is expensive if done per-request, but extremely valuable when run on a sampled basis (say, 1% of production traffic plus 100% of user-flagged responses).

##### Retrieval Quality vs Answer Quality
For many applications, you can compute answer quality automatically using a lightweight LLM-as-judge approach: after the main LLM generates an answer, send the answer, the retrieved context, and the original question to a smaller, cheaper model with a rubric asking it to score faithfulness (did the answer stay within what the context says?) and relevance (did the answer address the question?). Log these scores alongside the trace ID.

This gives you a queryable dataset: “show me all requests where faithfulness score was below 0.7 in the last 7 days.” Drilling into those traces, you will typically find one of three patterns:

- Retrieved chunks are from the wrong document (index corruption or model drift)
- Retrieved chunks are from the right document but the wrong section (chunking boundary problem)
- Retrieved chunks are correct but the LLM ignored them (a generation problem, not a retrieval problem)

