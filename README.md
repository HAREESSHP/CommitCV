# CommitCV (GetHire AI)

<p align="center">
  <strong>Your commits are your CV. Every claim comes with proof.</strong><br>
  <em>AI-driven developer career intelligence backed by AST-verified GitHub code, manifest grounding, and zero hallucinations.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22.x-green.svg" alt="Node Version">
  <img src="https://img.shields.io/badge/React-19.x-blue.svg" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-8.x-purple.svg" alt="Vite">
  <img src="https://img.shields.io/badge/Gemini_AI-Flash_Latest-orange.svg" alt="Google Gemini">
  <img src="https://img.shields.io/badge/MongoDB-Atlas_%26_Memory-emerald.svg" alt="MongoDB">
  <img src="https://img.shields.io/badge/Proof_System-AST_Grounded-success.svg" alt="Zero Hallucination">
</p>

---

## 🎯 The Core Invariant: Zero Hallucinations

> **NO CLAIM WITHOUT CITATION.**  
> CommitCV’s RAG engine and LLM pipeline ground every strength, skill badge, and resume claim in actual GitHub source code, commit history, or build manifests (`package.json`, `Dockerfile`, `go.mod`, etc.). If evidence is lacking in public repositories, the system outputs:  
> **`"No evidence found in public repositories."`**

### Three-Tier Proof Badge Contract

| Badge | Verification Criteria | Proof Token & Citation |
| :--- | :--- | :--- |
| **`VERIFIED`** | Found in code files, unit tests, or build manifests (`package.json`, `Dockerfile`, `go.mod`). | 🟢 Emerald proof token + Clickable GitHub file & line citation (e.g. `Dockerfile:L1-L22`). |
| **`PARTIAL`** | Found only in READMEs, descriptions, or commit message summaries. | 🟡 Amber token + Documentation citation (e.g. `README.md:L42`). |
| **`UNSUPPORTED`** | No evidence discovered across public repositories. | ⚪ Neutral token + Honest low-confidence warning (zero arbitrary score penalties). |

---

## ⚡ Key Capabilities

### 1. 🎓 Student & Candidate Intelligence
- **Instant GitHub Telemetry**: Real-time analysis of public repositories, commit cadence, longest streaks, and annual velocity.
- **5-Pillar Scorecard**: Granular breakdown of **Code Quality**, **Project Depth**, **Consistency**, **Collaboration** (PRs, code reviews, issues), and **Documentation**.
- **Tech Stack Radar**: AST-verified framework and language proficiencies paired with exact commit hashes and file references.
- **Dynamic Growth Engine**: Tailored career roadmaps across **Full-Stack**, **Backend / Systems**, and **Specialized Tracks** with next-step portfolio blueprints.
- **Sharable Dossier**: Clean candidate profile view ready for technical recruiters and hiring managers.

### 2. 💼 Recruiter Radar & Job Description (JD) Matching
- **Deep Code-to-JD Comparison**: Paste any Job Description to run an AST-level code audit against candidate repositories.
- **Match Score & Verdict**: Algorithmic fit score (`STRONG FIT`, `VIABLE CANDIDATE`, `FAIR MATCH`) based on verified repository artifacts.
- **Neutral Risk & Gap Audit**: Highlights missing production requirements (e.g. missing unit test suites, lack of automated CI/CD workflows) without penalizing soft scores.
- **Top Relevant Projects**: Highlights the candidate's codebases that most directly prove skills required by the job opening.

### 3. 🤖 Candidate AI Intelligence Assistant (LLM RAG Chatbot)
- **Natural ChatGPT-Style Recruiter Chat**: Recruiters can ask anything about the candidate's code, Docker manifests, testing, or architectural design.
- **Hard Candidate Boundary**: The RAG retrieval pipeline strictly enforces `WHERE candidate_id = :id` in code, guaranteeing zero cross-candidate data leakage.
- **Google Gemini API Integration**: Live synthesis powered by `gemini-flash-latest` (with fallback to `gemini-pro-latest`, OpenAI `gpt-4o-mini`, and grounded AST templates).
- **Rich Markdown Formatting**: Renders formatted bullet cards with glowing accents, JetBrains Mono code badges (`package.json`, `Dockerfile`), and clickable GitHub source chips.
- **Built-in Guardrails**: Prompt injection defense, follow-up query rewriting, and strict PII / personal traits guards (refuses questions on age, gender, race, location).

### 4. 🛡️ Super Admin Control Center
- **Recruiter Account Issuance**: Generate authorized Recruiter IDs and credentials (`REC-XXXX`).
- **HR Access Tokens**: Provision enterprise tokens for corporate hiring partners.
- **Session Management**: Full overview of active recruiter accounts with instant revocation controls.

---

## 🏗️ System Architecture

```
CommitCV/
├── package.json                 # Monorepo runner scripts
├── README.md                    # System documentation
├── AGENTS.md                    # AI Coding Assistant Guidelines & Invariants
├── DESIGN_SYSTEM.md             # Typography & UI color variables
│
├── server/                      # Production Express & RAG Engine
│   ├── .env                     # Secrets (API keys, DB connection, JWT)
│   ├── server.js                # Express REST API & chat endpoints
│   ├── rag.js                   # Gemini LLM caller, AST grounding & RAG store
│   ├── github.js                # GitHub API fetcher with intelligent caching
│   ├── db.js                    # MongoDB Mongoose models + memory fallback
│   └── package.json             # Server dependencies
│
└── client/                      # Vite + React Frontend
    ├── index.html               # Space Grotesk, Plus Jakarta Sans, JetBrains Mono
    ├── vite.config.js           # Vite dev configuration
    ├── package.json             # Frontend dependencies
    └── src/
        ├── App.jsx              # Navigation & application routing
        ├── components.jsx       # Button, Badge, Card, ThemeToggle, ProofCitation
        ├── index.css            # CSS custom properties (Dual Light/Dark theme)
        └── pages/
            ├── StudentDashboardPage.jsx    # Candidate verification dossier
            ├── RecruiterDashboardPage.jsx  # JD match & AI Intelligence Assistant
            ├── RecruiterLoginPage.jsx      # Recruiter authentication
            └── AdminPortalPage.jsx         # Super Admin token management
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.x or later (v22.x recommended)
- **npm**: v9.x or later
- **GitHub Token** *(Recommended)*: Personal access token to bypass public API rate limits (5,000 req/hr).
- **Gemini API Key** *(Optional)*: Enables live AI Chat synthesis via Google Gemini.

---

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/HAREESSHP/CommitCV.git
cd CommitCV

# Install all dependencies (Server + Client)
npm run install:all
```

*(Alternatively, run `npm install` inside both `./server` and `./client`).*

---

### Step 2: Configure Environment Variables

Create or edit `server/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# 1. GitHub API Personal Access Token (PAT)
# Avoids public rate limits (5,000 req/hr)
# Generate at: https://github.com/settings/tokens (select 'repo' and 'read:user')
GITHUB_TOKEN=your_github_token_here

# 2. Database Connection
# MongoDB Atlas URI (falls back automatically to in-memory store if unset)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/commitcv?retryWrites=true&w=majority

# 3. AI / LLM Engine (Google Gemini or OpenAI)
# Powers the Candidate AI Assistant with ChatGPT-style grounded reasoning
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# 4. Super Admin Credentials
ADMIN_USERNAME=commitcv@1
ADMIN_PASSWORD=your_admin_password_here
JWT_SECRET=commitcv_secret_production_key_2026
```

---

### Step 3: Run the Application

You can start both services from the root folder:

#### Run Both in Separate Terminals:

```bash
# Terminal 1: Backend Server (runs on http://localhost:5000)
npm run server:dev

# Terminal 2: Frontend Client (runs on http://localhost:5173)
npm run client
```

#### Or Run Individually:
```bash
# Backend only
cd server && npm run dev

# Frontend only
cd client && npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 🔌 API Reference

### Candidate Analysis
- **`POST /api/analyze`**
  - **Body**: `{ "username": "HAREESSHP" }`
  - **Description**: Fetches public GitHub telemetry, parses build manifests (`package.json`, `Dockerfile`, etc.), runs AST grounding, and returns full scorecard report.

### Recruiter JD Matching
- **`POST /api/recruiter/match-jd`**
  - **Body**: `{ "candidateUsername": "HAREESSHP", "jobDescription": "Full-stack React & Docker engineer..." }`
  - **Description**: Matches demanded skills against candidate code, generates match percentage, evidence strengths, and risk gaps.

### Candidate AI Intelligence Assistant
- **`POST /api/recruiter/chat`**
  - **Body**: `{ "candidateUsername": "HAREESSHP", "question": "Does candidate know Docker?", "jobDescription": "...", "history": [] }`
  - **Description**: Retrieves candidate code chunks (`WHERE candidate_id = :id`), queries Gemini LLM, and returns natural ChatGPT-style answer with clickable proof source citations.

### Admin & Recruiter Authentication
- **`POST /api/admin/login`**: Super administrator authentication.
- **`POST /api/admin/create-recruiter`**: Provisions new Recruiter ID and password.
- **`POST /api/recruiter/login`**: Recruiter login verification.
- **`GET /api/admin/recruiters`**: Lists all active recruiters.
- **`DELETE /api/admin/delete-recruiter/:id`**: Revokes recruiter credentials.

---

## 🎨 Design System Mandate

CommitCV enforces a strict, anti-generic design language:
- **Typography**:
  - Headings & Display: `'Space Grotesk', sans-serif`
  - Body Copy: `'Plus Jakarta Sans', sans-serif`
  - Code & Badges: `'JetBrains Mono', monospace`
- **Color Variables**:
  - Backgrounds: `var(--bg)`, `var(--surface)`, `var(--surface-raised)`
  - Verification Emerald: `var(--accent)`, `var(--proof-verified)`
  - Partial Warning: `var(--proof-partial)`
  - Hairline Borders: `1px solid var(--border)`
- **Dual Themes**: Fully supported and switchable between **Obsidian Dark Mode** and **Clean Light Mode** via the persistent header theme toggle.

---

## 🧪 Testing & Production Build

To validate the production bundle:

```bash
# Build the client bundle with Vite
cd client
npm run build
```
The output files will be compiled into `client/dist/` and can be served directly by the Express production backend.

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  <strong>CommitCV</strong> — Built with passion for transparent, proof-grounded software hiring.
</p>
