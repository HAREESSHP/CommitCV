# CommitCV

> **Your commits are your CV. Every claim comes with proof.**  
> Developer career intelligence backed by AST-verified GitHub code, commit citations, and zero hallucinations.

---

## Quick Start Guide

### 1. Install Dependencies
Open your terminal in the root directory and run:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

### 2. Configure Environment Variables (Optional for local demo)
In `server/.env`:
```env
PORT=5000
GITHUB_TOKEN=your_github_token_here     # (Optional) Bypasses GitHub API rate limits
MONGODB_URI=your_mongodb_uri_here       # (Optional) Persists data to MongoDB Atlas
```
*(If left empty, the server automatically runs in zero-config in-memory mode).*

---

### 3. Run the Project

Open two terminal tabs:

#### Terminal 1 — Backend API Server
```bash
cd server
npm start
```
> Server runs on **`http://localhost:5000`**

#### Terminal 2 — Frontend Application
```bash
cd client
npm run dev
```
> Frontend runs on **`http://localhost:5173`**

---

### Or Run from Root with Single Commands:
From the root folder:
- Run backend: `npm run server`
- Run frontend: `npm run client`

---

## Architecture Overview

```
CommitCV/
├── .gitignore               # Protects node_modules, .env secrets, and build files
├── package.json             # Root runner scripts
│
├── server/                  # Production Express API
│   ├── .env                 # Environment secrets (ignored by git)
│   ├── server.js            # Express API endpoints
│   ├── github.js            # GitHub REST API fetcher & cache
│   ├── rag.js               # AST & code-grounding analysis engine
│   └── db.js                # MongoDB connection & fallback
│
└── client/                  # Vite + React (Wonder Makers design system)
    ├── index.html           # Space Grotesk, Plus Jakarta Sans, JetBrains Mono
    └── src/
        ├── App.jsx          # Live Student Analysis, Recruiter Radar, Admin Center
        ├── index.css        # Obsidian dark theme, neon lime tokens, pill controls
        └── components.jsx   # Shared UI components
```
