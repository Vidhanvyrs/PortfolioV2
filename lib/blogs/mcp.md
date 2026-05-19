---
title: "How Claude and ChatGPT Use the MCP Tool I Created This Weekend"
description: "An honest breakdown of the handshake, discovery, and execution phases when connecting LLMs to a custom weather MCP server."
date: "2026-05-19"
tags: ["MCP", "LLM", "ChatGPT", "Claude", "ngrok"]
---

## How actually Claude or Chatgpt are using the MCP tool I created this weekend?
LLMs usually follow a very specific "handshake" process

*Here is exactly what is happening*
##### 1. The Discovery Phase
When you first add the URL to ChatGPT or start a session, ChatGPT sends a `POST` request to your `/mcp` endpoint.
- **ChatGPT asks**: "What can you do?"
- **Your Server responds**: "I am a server called `weathervyrs`. I have two tools: `get_alerts` (which needs a `state` code) and `get_forecast` (which needs `latitude` and `longitude`)."
- **Crucial part**: Your server doesn't just send the names; it sends the **Zod schema** you defined. This tells the LLM exactly what types of data (strings, numbers, ranges) it is allowed to send.


##### 2. The Decision Phase
When you type "*What are the active alerts for NY*", the LLM doesn't just search the web. It looks at its available "tools"
- It sees that your `get_alerts` tool takes a `state` string.
- It knows that "New York" matches the state `NY`.
- The LLM **decides** to call your tool.

##### The Execution Phase (The JSON-RPC Request)
The LLM sends another `POST` request to your `/mcp` endpoint. This request is formatted in JSON-RPC. It looks something like this:
```
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "get_alerts",
    "arguments": { "state": "NY" }
  },
  "id": "123"
}
```
Your server receives this, your TypeScript code runs the `makeNWSRequest` function, fetches the real data from the government weather API, and sends it back as text

##### 3.  The Synthesis Phase
The LLM receives the raw text (like _"Active alerts for NY: Winter Storm Warning..."_). It reads that data, summarizes it, and types out a friendly response to you in the chat.

### Hurdles I got 
hard to connect via claude.ai (the tutorial used claude desktop which was not available on linux rn and I also didn't bother to check any alternative) so I decide to use ngrok in order to get a working mcp out for testing on the claude website directly 
Remembering points
- **Stdio**: Is like talking to someone in the same room (local files).
- **HTTP/SSE**: Is like a phone call. ChatGPT's/Claude's servers are in a data center; your code is on your laptop.
- **ngrok**: Acts as the public phone number that routes those data center requests through the internet directly into your local `port 3000`.
