# RIA Release Guide

**Release availability:** June 21, 2026

RIA is currently private while the full build, packaging, and security review are completed. Public download access should open after the release gate is cleared.

## What RIA Is

RIA is a local-first cognitive AI workspace for reasoning, memory, teaching, web research, creative generation, goals, tools, and system awareness.

It is a full-stack system:

- React + Vite frontend for the Orbit UI.
- Node.js + Express backend for memory, reasoning, tools, routes, and system engines.
- Electron runtime for desktop-style launch and tray/floating interfaces.
- Local memory stores for core memory, interpreted memory, raw memory, conflicts, decisions, reflections, and generated media.
- Optional Ollama integration for local LLM inference.
- Optional Automatic1111, Forge, or ComfyUI integration for local GPU image generation.

RIA is an engineered cognitive architecture. It is not a literal living being or uncontrolled AGI.

## Recommended Requirements

- Windows 10 or Windows 11.
- Node.js 18 or newer.
- npm.
- Git.
- 16 GB RAM minimum for comfortable local development.
- NVIDIA GPU recommended for local image generation.
- Ollama optional, but recommended for local LLM responses.
- Automatic1111, Forge, or ComfyUI optional for image generation.

## Release Install Path

When access opens, the expected install path is:

```powershell
git clone https://github.com/YOUR_USERNAME/RIA.git
cd RIA
npm install
npm --prefix backend install
npm --prefix frontend install
```

Create the backend environment file:

```powershell
Copy-Item backend\.env.example backend\.env
```

Recommended local settings:

```env
PORT=3001
OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=llama3.1:8b
DB_PATH=./data/ria.sqlite
RIA_API_KEY=change-this-local-key
RIA_STORAGE_DIR=./runtime-data
RIA_ACTION_ALLOWED_DIRS=C:\ria
```

## One-Click Launch

From Windows Explorer, double-click:

```text
Start-RIA-OneClick.bat
```

To stop RIA, double-click:

```text
Stop-RIA-OneClick.bat
```

The launcher starts:

- Backend at `http://127.0.0.1:3001`.
- Frontend at `http://127.0.0.1:5173`.
- Stable Diffusion WebUI at `http://127.0.0.1:7860` when configured.
- ComfyUI at `http://127.0.0.1:8188` if already running.

## Safety Notes

- Keep `.env`, wallet secrets, API keys, runtime logs, and local databases out of Git.
- Crypto and wallet commands must be configured backend-side.
- Risky actions should remain routed through controlled confirmation and review systems.
- Evolution proposals should be validated before code changes.
- Local memory should remain visible, exportable, restorable, and under user control.

## Current Status

RIA is in private build/security hardening until the June 21, 2026 release gate.
