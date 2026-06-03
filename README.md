# Avvy

Chrome side-panel extension that reads Google Calendar and generates a copy-pasteable availability table, with natural-language refinement via chat.

## Stack

- **Extension:** React + TypeScript, Vite, `@crxjs/vite-plugin`
- **Backend:** FastAPI + Supabase + Google Calendar API + Gemini

## Repo layout

```
avvy/
├── extension/     # Chrome extension (side panel)
├── backend/       # FastAPI API
├── AGENTS.md      # Agent/subagent index
└── RUNNING.md     # Local dev setup and testing
```

## Getting started

See [RUNNING.md](./RUNNING.md) for setup, running locally, and loading the extension in Chrome.
