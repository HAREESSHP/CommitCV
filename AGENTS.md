# AGENTS.md — AI Coding Assistant Guidelines for CommitCV

> **For any AI Assistant working on this codebase (Antigravity, Cursor, GitHub Copilot, Gemini CLI, Claude Code, etc.)**:
> You MUST strictly adhere to the following architectural, design, and code quality rules.

---

## 1. Project Philosophy & Core Invariant
- **Product**: CommitCV (GetHire AI)
- **Tagline**: *Your commits are your CV. Every claim comes with proof.*
- **System Invariant**: **NO CLAIM WITHOUT CITATION**. The LLM RAG engine must ground every strength, skill, and resume bullet in actual GitHub code, commit, or manifest files. If evidence is lacking, the output must be `"No evidence found in public repositories."` Never hallucinate skills or metrics.

---

## 2. Minimal File Architecture (Strict MERN Stack)
Keep file count minimal. Avoid unnecessary directories or deep boilerplate hierarchies.

```
CommitCV/
├── server/
│   ├── package.json
│   ├── .env
│   ├── server.js            # Express app, middleware, and API routes
│   ├── db.js                # MongoDB connection & minimal Mongoose schemas
│   ├── github.js            # GitHub API fetcher + in-memory / DB caching
│   └── rag.js               # Embedding retrieval, citation verifier & LLM grounding
│
└── client/
    ├── package.json
    ├── vite.config.js
    ├── index.html           # Google Fonts link for Space Grotesk, Plus Jakarta Sans, JetBrains Mono
    └── src/
        ├── main.jsx
        ├── App.jsx          # Route views: Landing, Student Dashboard, Recruiter Dashboard
        ├── index.css        # CSS variables for :root & [data-theme="dark"], base reset
        └── components.jsx   # Shared UI: Button, Badge, Card, ThemeToggle, ProofCitation
```

---

## 3. Strict Design Rules (Anti-Generic Mandate)
- **NO Default Fonts**: NEVER use Inter, Roboto, Arial, or system-ui defaults.
  - Headings/Display: `'Space Grotesk', sans-serif`
  - Body copy: `'Plus Jakarta Sans', sans-serif`
  - Code/Labels/Citations: `'JetBrains Mono', monospace`
- **NO Cliché Palettes**:
  - NEVER use purple-to-blue gradients, flat Bootstrap colors, or raw Tailwind colors (`bg-blue-600`, etc.).
  - ALWAYS use the defined CSS variables:
    - Background: `var(--bg)`
    - Surface: `var(--surface)`, `var(--surface-raised)`
    - Text: `var(--text)`, `var(--muted)`
    - Hairline borders: `var(--border)`, `var(--border-subtle)`
    - Verification emerald: `var(--accent)`, `var(--proof-verified)`
    - Proof states: `var(--proof-verified)`, `var(--proof-partial)`, `var(--proof-unsupported)`
- **Dual Themes**:
  - Every component must look stunning in both **Light Mode** and **Dark Mode**.
  - A visible Theme Toggle must remain accessible in the header.
  - Never hardcode colors like `#FFFFFF` or `#000000` in component styles.
- **Copy**:
  - Keep text concise, technical, confident. Avoid "Welcome to CommitCV" or "Revolutionize your career".
- **Visuals**:
  - Hairline borders (`1px solid var(--border)`), sharp corners (`radius: 4px` to `6px`).
  - No bloated drop-shadows or murky glassmorphism.

---

## 4. Skills & Proof Badge Standards
Whenever rendering a candidate's skill, enforce this contract:
1. `VERIFIED`: Found in code files, tests, or build manifests (`package.json`, `Dockerfile`, etc.). Displays with green proof token and clickable file citation.
2. `PARTIAL`: Found only in READMEs or commit descriptions. Displays with amber token.
3. `UNSUPPORTED`: No evidence found in public repositories. Displays with neutral token and low-confidence indicator. Do not penalize with harsh arbitrary negative scores.

---

## 5. Team Process & Step-by-Step Delivery
- Do not make massive unstructured commits or generate hundred-file scaffolding.
- Work step by step: verify dependencies -> backend services -> API endpoints -> UI views.
- Keep components modular and reusable within `client/src/components.jsx`.
