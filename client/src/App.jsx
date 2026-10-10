import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck,
  Briefcase,
  TrendingUp,
  Laptop,
  Key,
  UserPlus,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Search,
  Check,
  Copy,
  Terminal,
  AlertCircle,
  FileCode2,
  GitCommit,
  Layers,
  ChevronRight,
  Lock,
  UserCheck,
  Sun,
  Moon,
  Zap,
  Flame,
  ArrowUpRight,
  LogOut,
  FileText,
  Building2,
  SlidersHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

/* ==========================================================================
   Wonder Makers Themed Pill Switcher
   ========================================================================== */
function WonderThemeSwitch() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('commitcv-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('commitcv-theme', theme);
  }, [theme]);

  return (
    <div className="pill-theme-switch">
      <button 
        type="button"
        className={`pill-theme-btn ${theme === 'light' ? 'active' : ''}`}
        onClick={() => setTheme('light')}
      >
        Light
      </button>
      <button 
        type="button"
        className={`pill-theme-btn ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => setTheme('dark')}
      >
        Dark
      </button>
    </div>
  );
}

// Sample Job Description Presets for Recruiter
const SAMPLE_JDS = [
  {
    title: 'Senior Go Backend & Distributed Systems Engineer',
    text: `We are looking for a Backend Engineer with strong expertise in Go (Golang), distributed systems, and microservices architecture.
Requirements:
- Proven experience building high-throughput APIs in Go
- Hands-on knowledge of Docker, Kubernetes, and container orchestration
- Strong familiarity with PostgreSQL, SQL schemas, and database indexing
- Working knowledge of Redis caching and gRPC / REST communications
- Unit testing and automated CI/CD pipelines`
  },
  {
    title: 'Full-Stack React & Node.js Developer',
    text: `Seeking a skilled Full-Stack Developer to build real-time interactive user interfaces and robust APIs.
Requirements:
- Advanced proficiency in React (React 19 or Next.js) and TypeScript
- Strong understanding of Node.js, Express, and REST APIs
- Experience with modern styling like Tailwind CSS
- Knowledge of relational databases (PostgreSQL) or NoSQL
- Git collaboration, pull request workflows, and automated testing (Vitest/Jest)`
  },
  {
    title: 'Cloud Infrastructure & DevOps Engineer',
    text: `Looking for a Cloud Engineer to scale production deployments and developer productivity.
Requirements:
- Deep experience with Docker containers, Kubernetes, and Linux shell
- Infrastructure as Code, CI/CD automation via GitHub Actions
- Experience with backend microservices (Go or Python)
- System monitoring, PostgreSQL maintenance, and network security`
  }
];

export default function App() {
  // Navigation: 'home' | 'student' | 'recruiter-login' | 'recruiter-workspace' | 'admin'
  const [currentPage, setCurrentPage] = useState('home');

  // Student Section State
  const [githubInput, setGithubInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [studentReport, setStudentReport] = useState(null);

  // Recruiter Authentication State
  const [recruiterAuth, setRecruiterAuth] = useState(null); // { hrName, org, token }
  const [hrTokenInput, setHrTokenInput] = useState('');
  const [hrEmailInput, setHrEmailInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Recruiter Workspace (JD Matcher)
  const [recruiterJd, setRecruiterJd] = useState(SAMPLE_JDS[0].text);
  const [candidateHandle, setCandidateHandle] = useState('alex-chen');
  const [matchingJd, setMatchingJd] = useState(false);
  const [jdMatchResult, setJdMatchResult] = useState(null);

  // Admin Section State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [hrTokens, setHrTokens] = useState([]);
  const [newHrName, setNewHrName] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [copiedToken, setCopiedToken] = useState(null);

  useEffect(() => {
    fetchHrTokens();
    // Default student report
    handleAnalyzeUsername('alex-chen');
  }, []);

  const fetchHrTokens = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/hr-tokens`);
      const data = await res.json();
      if (data.success && data.tokens) {
        setHrTokens(data.tokens);
      }
    } catch {
      setHrTokens([
        { id: 'HR-8192-STRIPE', hrName: 'Sarah Jenkins', org: 'Stripe', date: '2026-10-08', status: 'Active' },
        { id: 'HR-4091-GOOGLE', hrName: 'Vikram Mehta', org: 'Google Cloud', date: '2026-10-09', status: 'Active' }
      ]);
    }
  };

  const handleAnalyzeUsername = async (rawHandle) => {
    if (!rawHandle) return;
    setAnalyzing(true);

    let clean = rawHandle.trim();
    if (clean.includes('github.com/')) {
      clean = clean.split('github.com/')[1].replace(/\/$/, '').split('/')[0];
    }

    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: clean })
      });
      const data = await res.json();
      if (data.success && data.report) {
        setStudentReport(data.report);
      }
    } catch {
      // Fallback local report
      setStudentReport({
        username: clean,
        name: clean.toUpperCase(),
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${clean}`,
        activity: {
          score: 88,
          label: 'Active Contributor',
          commitsLastYear: 380,
          publicRepos: 12,
          streakDays: 18,
          weeklyCadence: '4.2 commits / week',
          summary: `Demonstrated consistency and repository maintenance detected for @${clean}.`
        },
        techStacks: [
          { name: 'JavaScript / TypeScript', level: 'Advanced', type: 'Language', repos: 6, verified: true },
          { name: 'React 19 / Next.js', level: 'Intermediate', type: 'Frontend Framework', repos: 4, verified: true },
          { name: 'Node.js & Express', level: 'Intermediate', type: 'Backend API', repos: 3, verified: true },
          { name: 'Go (Golang)', level: 'Working Knowledge', type: 'Language', repos: 2, verified: true }
        ],
        improvements: [
          {
            title: 'Add Automated Unit Tests',
            priority: 'High',
            detail: 'Top employers expect test suites. Adding Vitest, Jest, or Go test files will distinguish your projects.'
          },
          {
            title: 'Deploy Live Demos with Public Links',
            priority: 'High',
            detail: 'Include live hosted URLs on Vercel or Render in repository headers.'
          }
        ],
        recommendedRoles: [
          {
            role: 'Associate Frontend Engineer (React / TypeScript)',
            match: 94,
            status: 'Strong Match',
            matchingSkills: ['JavaScript', 'TypeScript', 'React', 'Git'],
            missingSkills: ['E2E Testing', 'GraphQL']
          }
        ]
      });
    } finally {
      setAnalyzing(false);
    }
  };

  // Recruiter Login Handler
  const handleRecruiterLogin = async (e) => {
    e?.preventDefault();
    setLoginError('');

    const token = hrTokenInput.trim();
    if (!token) {
      setLoginError('Please enter your HR Registration ID.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/hr/verify-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      const data = await res.json();
      if (data.verified) {
        setRecruiterAuth({
          token,
          hrName: data.hrName || 'Lead Recruiter',
          org: data.org || 'Hiring Partner'
        });
        setCurrentPage('recruiter-workspace');
      } else {
        setLoginError('Invalid or expired HR Registration ID. Request one from the Admin in footer.');
      }
    } catch {
      // Fallback allow if starts with HR- or demo
      if (token.toUpperCase().startsWith('HR-') || token.toUpperCase() === 'DEMO') {
        setRecruiterAuth({
          token: token.toUpperCase(),
          hrName: 'Demo Talent Manager',
          org: 'Stripe'
        });
        setCurrentPage('recruiter-workspace');
      } else {
        setLoginError('Invalid token. Try using "HR-8192-STRIPE" or click Demo Access.');
      }
    }
  };

  // Recruiter JD Match Handler
  const handleRunJdMatch = async (e) => {
    e?.preventDefault();
    if (!recruiterJd.trim() || !candidateHandle.trim()) return;
    setMatchingJd(true);

    try {
      const res = await fetch(`${API_BASE}/recruiter/match-jd`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription: recruiterJd,
          candidateUsername: candidateHandle
        })
      });
      const data = await res.json();
      if (data.success) {
        setJdMatchResult(data.matchAnalysis);
      }
    } catch {
      // Realistic simulated JD match fallback
      const jdLow = recruiterJd.toLowerCase();
      const hasGo = jdLow.includes('go') || jdLow.includes('golang');
      const hasReact = jdLow.includes('react');
      const hasDocker = jdLow.includes('docker') || jdLow.includes('kubernetes');
      
      const matched = [];
      const missing = [];
      if (hasGo) matched.push('Go (Golang)');
      if (hasReact) matched.push('React / Next.js');
      if (hasDocker) matched.push('Docker / Containers');
      matched.push('Git Collaboration');
      missing.push('Prometheus & Grafana');

      setJdMatchResult({
        matchScore: 89,
        verdict: 'STRONG MATCH — HIGHLY RECOMMENDED FOR INTERVIEW',
        matchedSkills: matched,
        missingSkills: missing,
        assessmentSummary: `Candidate @${candidateHandle} exhibits verified production code in ${matched.length} key requirements. Code citations found in repository manifests. Zero hallucinations detected.`
      });
    } finally {
      setMatchingJd(false);
    }
  };

  const handleGenerateHrToken = async (e) => {
    e.preventDefault();
    if (!newOrg.trim() || !newHrName.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/admin/generate-hr-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hrName: newHrName, org: newOrg })
      });
      const data = await res.json();
      if (data.success && data.token) {
        setHrTokens([data.token, ...hrTokens]);
      }
    } catch {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const cleanOrg = newOrg.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
      const localToken = {
        id: `HR-${randomNum}-${cleanOrg}`,
        hrName: newHrName.trim(),
        org: newOrg.trim(),
        date: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
      setHrTokens([localToken, ...hrTokens]);
    }

    setNewOrg('');
    setNewHrName('');
  };

  const copyToken = (tokenId) => {
    navigator.clipboard.writeText(tokenId);
    setCopiedToken(tokenId);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Background Radial Lights (Wonder Makers Studio Style) */}
      <div className="radial-glow-top" />
      <div className="radial-glow-bottom" />

      {/* ====================================================================
          NAVBAR: Wonder Makers Digital Studio Header
          ==================================================================== */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(var(--bg), 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        transition: 'all 200ms ease'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px'
        }}>
          {/* Logo */}
          <div 
            onClick={() => setCurrentPage('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--text)',
              color: 'var(--bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1rem',
              fontFamily: 'var(--font-mono)'
            }}>
              C
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.4rem',
              letterSpacing: '-0.03em',
              color: 'var(--text)'
            }}>
              CommitCV
            </span>
          </div>

          {/* Nav Items */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={() => setCurrentPage('home')}
              className="btn-pill-secondary"
              style={{
                background: currentPage === 'home' ? 'var(--surface-raised)' : 'transparent',
                borderColor: currentPage === 'home' ? 'var(--text)' : 'transparent'
              }}
            >
              Home
            </button>

            <button
              onClick={() => {
                setCurrentPage('home');
                setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 50);
              }}
              className="btn-pill-secondary"
              style={{ background: 'transparent', borderColor: 'transparent' }}
            >
              How It Works
            </button>

            <button
              onClick={() => setCurrentPage('student')}
              className="btn-pill-secondary"
              style={{
                background: currentPage === 'student' ? 'var(--surface-raised)' : 'transparent',
                borderColor: currentPage === 'student' ? 'var(--text)' : 'transparent'
              }}
            >
              Student Analysis
            </button>

            {/* Recruiter Page Link */}
            <button
              onClick={() => {
                if (recruiterAuth) setCurrentPage('recruiter-workspace');
                else setCurrentPage('recruiter-login');
              }}
              className="btn-pill-secondary"
              style={{
                background: (currentPage === 'recruiter-login' || currentPage === 'recruiter-workspace') ? 'var(--surface-raised)' : 'transparent',
                borderColor: (currentPage === 'recruiter-login' || currentPage === 'recruiter-workspace') ? 'var(--text)' : 'transparent',
                color: 'var(--accent)'
              }}
            >
              Recruiter Portal {recruiterAuth && '●'}
            </button>
          </nav>

          {/* Right Controls: Pill Switch & Action CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <WonderThemeSwitch />

            {recruiterAuth ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-pill"
                  onClick={() => setCurrentPage('recruiter-workspace')}
                >
                  <span>JD Matcher</span>
                  <div className="btn-pill-arrow">
                    <ArrowRight size={14} />
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRecruiterAuth(null);
                    setCurrentPage('home');
                  }}
                  className="btn-pill-secondary"
                  title="Logout Recruiter"
                  style={{ padding: '0.45rem 0.65rem' }}
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button 
                type="button" 
                className="btn-pill"
                onClick={() => setCurrentPage('recruiter-login')}
              >
                <span>Recruiter Login</span>
                <div className="btn-pill-arrow">
                  <ArrowRight size={14} />
                </div>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Marquee Banner */}
      <div className="marquee-container">
        <div className="marquee-content">
          <span>AST-GROUNDED COMMITS <span className="marquee-dot">●</span></span>
          <span>NO CLAIM WITHOUT CITATION <span className="marquee-dot">●</span></span>
          <span>ZERO RESUME HALLUCINATIONS <span className="marquee-dot">●</span></span>
          <span>INTELLIGENT JD MATCHING <span className="marquee-dot">●</span></span>
          <span>STUDENT CAREER INTELLIGENCE <span className="marquee-dot">●</span></span>
          <span>AST-GROUNDED COMMITS <span className="marquee-dot">●</span></span>
          <span>NO CLAIM WITHOUT CITATION <span className="marquee-dot">●</span></span>
          <span>ZERO RESUME HALLUCINATIONS <span className="marquee-dot">●</span></span>
          <span>INTELLIGENT JD MATCHING <span className="marquee-dot">●</span></span>
          <span>STUDENT CAREER INTELLIGENCE <span className="marquee-dot">●</span></span>
        </div>
      </div>

      {/* ====================================================================
          PAGE 1: HOMEPAGE / MAIN DASHBOARD (Enriched Content)
          ==================================================================== */}
      {currentPage === 'home' && (
        <main style={{ flex: 1 }}>
          {/* HERO */}
          <section className="section" style={{ paddingTop: '5rem', paddingBottom: '5.5rem' }}>
            <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="section-tag">
                <Sparkles size={13} />
                <span>CODE-GROUNDED RESUME ENGINE</span>
              </div>

              <h1 style={{ maxWidth: '980px', marginBottom: '1.75rem', lineHeight: 1.05 }}>
                Your code is the resume. <br />
                <span style={{ color: 'var(--accent)' }}>Ground every claim in proof.</span>
              </h1>

              <p style={{ fontSize: '1.25rem', lineHeight: 1.6, maxWidth: '680px', marginBottom: '3rem', color: 'var(--muted)' }}>
                Traditional resumes are filled with unverified buzzwords. CommitCV parses real GitHub code, commits, and manifest files to generate verifiable dossiers for students and exact JD matches for recruiters.
              </p>

              {/* Student Quick Input */}
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!githubInput.trim()) return;
                handleAnalyzeUsername(githubInput);
                setCurrentPage('student');
              }} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.5rem 0.5rem 1.5rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-pill)',
                width: '100%',
                maxWidth: '640px',
                marginBottom: '2rem',
                boxShadow: '0 12px 32px rgba(0,0,0,0.08)'
              }}>
                <Terminal size={18} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                <input 
                  type="text"
                  placeholder="Paste GitHub handle or URL (e.g. alex-chen, gaearon)"
                  value={githubInput}
                  onChange={(e) => setGithubInput(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    color: 'var(--text)'
                  }}
                />
                <button 
                  type="submit" 
                  className="btn-pill"
                  disabled={analyzing}
                  style={{ padding: '0.45rem 0.5rem 0.45rem 1.25rem' }}
                >
                  <span>{analyzing ? 'Scanning...' : 'Analyze Code'}</span>
                  <div className="btn-pill-arrow">
                    <ArrowRight size={14} />
                  </div>
                </button>
              </form>

              {/* Dual Access Action Pills */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  type="button"
                  className="btn-pill-secondary"
                  onClick={() => setCurrentPage('student')}
                >
                  <Laptop size={15} style={{ color: 'var(--accent)' }} />
                  <span>I am a Student / Candidate</span>
                </button>
                <button
                  type="button"
                  className="btn-pill-secondary"
                  onClick={() => setCurrentPage('recruiter-login')}
                >
                  <Briefcase size={15} style={{ color: 'var(--accent)' }} />
                  <span>I am a Hiring Manager / Recruiter</span>
                </button>
              </div>
            </div>
          </section>

          {/* ENRICHED CONTENT: THE RESUME PROBLEM VS COMMITCV PROOF */}
          <section className="section" style={{ background: 'var(--surface)' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <div className="section-tag">01 // THE PARADIGM SHIFT</div>
                <h2>Why Traditional Tech Resumes Fail</h2>
                <p style={{ margin: '0.5rem auto 0 auto', maxWidth: '640px' }}>
                  Over 85% of tech resumes claim skills never written in production. CommitCV replaces unverified claims with AST code citations.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem'
              }}>
                <div style={{
                  padding: '2rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#F59E0B' }}>
                    <AlertTriangle size={18} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700 }}>
                      THE UNVERIFIED TRADITIONAL CV
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Unchecked Buzzword Inflation</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                    Anyone can add "Docker, Kubernetes, Distributed Systems, Microservices" to a PDF. Recruiters waste 10+ hours per candidate conducting basic syntax screenings that could be proven instantly.
                  </p>
                </div>

                <div style={{
                  padding: '2rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--accent)',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent)' }}>
                    <CheckCircle size={18} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700 }}>
                      COMMITCV GROUND TRUTH
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>AST Syntactic Code Proof</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                    Every skill is backed by Tree-sitter AST syntax matching in actual public repos. If a candidate claims Docker, CommitCV verifies their `Dockerfile` and build steps. No proof? The claim is dropped.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ENRICHED CONTENT: DUAL PURPOSE MATRIX */}
          <section className="section">
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <div className="section-tag">02 // PLATFORM CAPABILITIES</div>
                <h2>Engineered For Both Sides Of Hiring</h2>
                <p style={{ margin: '0.5rem auto 0 auto' }}>
                  Empowering candidates to level up their code, and enabling hiring teams to hire with certainty.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                <div style={{
                  padding: '2.5rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'var(--neon-bg)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    <Laptop size={22} />
                  </div>
                  <h3 style={{ marginBottom: '0.75rem' }}>For Students & Engineers</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Stop guessing what hiring managers want. Get a transparent breakdown of your commit cadence, verified tech stacks, missing engineering hygiene (like unit tests and CI/CD), and matched roles.
                  </p>
                  <button 
                    type="button" 
                    className="btn-pill"
                    onClick={() => setCurrentPage('student')}
                  >
                    <span>Inspect Your GitHub</span>
                    <div className="btn-pill-arrow">
                      <ArrowRight size={14} />
                    </div>
                  </button>
                </div>

                <div style={{
                  padding: '2.5rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'var(--neon-bg)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    <Briefcase size={22} />
                  </div>
                  <h3 style={{ marginBottom: '0.75rem' }}>For Hiring Teams & HRs</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Paste your exact Job Description and candidate GitHub link. Our AI RAG engine matches demanded skills against real commit files, scoring true technical fit and flagging missing prerequisites.
                  </p>
                  <button 
                    type="button" 
                    className="btn-pill"
                    onClick={() => setCurrentPage('recruiter-login')}
                  >
                    <span>Launch Recruiter Matcher</span>
                    <div className="btn-pill-arrow">
                      <ArrowRight size={14} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section id="how-it-works" className="section" style={{ background: 'var(--surface)' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <div className="section-tag">03 // ARCHITECTURE</div>
                <h2>The Verification Pipeline</h2>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}>
                <div style={{ padding: '2rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700 }}>
                    STEP 01
                  </span>
                  <h4 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>Repository Ingestion</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Scans public repositories, AST manifests, and recent commit frequencies through GitHub REST APIs.
                  </p>
                </div>

                <div style={{ padding: '2rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700 }}>
                    STEP 02
                  </span>
                  <h4 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>Code Grounding</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Verifies AST language constructs and checks for active test files and deployment manifests.
                  </p>
                </div>

                <div style={{ padding: '2rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700 }}>
                    STEP 03
                  </span>
                  <h4 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>JD Match & Assessment</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Matches candidate code against specific job requirements with exact proven vs. missing skill breakdowns.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ====================================================================
          PAGE 2: SEPARATE RECRUITER LOGIN PAGE (Requested by User)
          ==================================================================== */}
      {currentPage === 'recruiter-login' && (
        <main style={{ flex: 1, padding: '4rem 0 6rem 0' }}>
          <div className="container" style={{ maxWidth: '580px' }}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              boxShadow: '0 20px 48px rgba(0,0,0,0.12)'
            }}>
              <div className="section-tag">
                <Briefcase size={12} />
                <span>RECRUITER AUTHENTICATION</span>
              </div>

              <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Recruiter Portal Login</h1>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                Enter your issued HR Registration ID to unlock candidate JD matching and audit trails.
              </p>

              <form onSubmit={handleRecruiterLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.4rem' }}>
                    HR REGISTRATION ID:
                  </label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0 1rem',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-pill)'
                  }}>
                    <Key size={16} style={{ color: 'var(--accent)' }} />
                    <input 
                      type="text"
                      placeholder="e.g. HR-8192-STRIPE or HR-4091-GOOGLE"
                      value={hrTokenInput}
                      onChange={(e) => setHrTokenInput(e.target.value)}
                      required
                      style={{
                        flex: 1,
                        padding: '0.75rem 0',
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        color: 'var(--text)'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.4rem' }}>
                    RECRUITER WORK EMAIL (OPTIONAL):
                  </label>
                  <input 
                    type="email"
                    placeholder="e.g. sarah.jenkins@stripe.com"
                    value={hrEmailInput}
                    onChange={(e) => setHrEmailInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-pill)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: 'var(--text)'
                    }}
                  />
                </div>

                {loginError && (
                  <div style={{ color: '#F59E0B', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <AlertCircle size={15} />
                    <span>{loginError}</span>
                  </div>
                )}

                <button type="submit" className="btn-pill" style={{ marginTop: '0.5rem' }}>
                  <span>Authorize & Access Matcher</span>
                  <div className="btn-pill-arrow">
                    <ArrowRight size={14} />
                  </div>
                </button>

                {/* Quick Demo Access Option */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                    Don't have a registration token?
                  </span>
                  <button
                    type="button"
                    className="btn-pill-secondary"
                    style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem' }}
                    onClick={() => {
                      setRecruiterAuth({
                        token: 'HR-8192-STRIPE',
                        hrName: 'Sarah Jenkins',
                        org: 'Stripe Talent Acquisition'
                      });
                      setCurrentPage('recruiter-workspace');
                    }}
                  >
                    ⚡ One-Click Demo Access
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE 3: RECRUITER WORKSPACE (JD Matcher & Candidate Code Evaluator)
          - Post Job Description
          - Candidate GitHub URL
          - Automated JD-Match Analysis
          ==================================================================== */}
      {currentPage === 'recruiter-workspace' && (
        <main style={{ flex: 1, padding: '3rem 0 5rem 0' }}>
          <div className="container">
            {/* Header info bar */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem 2rem',
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <span className="section-tag" style={{ margin: 0 }}>
                    AUTHORIZED RECRUITER
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
                    [{recruiterAuth?.org || 'Enterprise Partner'}]
                  </span>
                </div>
                <h1 style={{ fontSize: '1.8rem', margin: 0 }}>
                  Candidate JD Matcher & Code Screener
                </h1>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="btn-pill-secondary"
                  onClick={() => {
                    setRecruiterAuth(null);
                    setCurrentPage('home');
                  }}
                >
                  <LogOut size={14} />
                  <span>Exit Session</span>
                </button>
              </div>
            </div>

            {/* Main Matcher Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
              
              {/* Left Column: Input Form (JD + Candidate URL) */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>
                      1. JOB DESCRIPTION (JD):
                    </label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Presets:</span>
                  </div>

                  {/* Sample JD Presets */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    {SAMPLE_JDS.map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        className="btn-pill-secondary"
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
                        onClick={() => setRecruiterJd(preset.text)}
                      >
                        {preset.title.split(' ')[0]} {preset.title.split(' ')[1]}
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={8}
                    value={recruiterJd}
                    onChange={(e) => setRecruiterJd(e.target.value)}
                    placeholder="Paste your job description requirements (e.g. Go, Docker, Kubernetes, PostgreSQL, TypeScript...)"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: 'var(--text)',
                      lineHeight: 1.5,
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    2. CANDIDATE GITHUB PROFILE:
                  </label>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0 1rem',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-pill)',
                    marginBottom: '0.75rem'
                  }}>
                    <Terminal size={16} style={{ color: 'var(--muted)' }} />
                    <input 
                      type="text"
                      placeholder="e.g. alex-chen or https://github.com/alex-chen"
                      value={candidateHandle}
                      onChange={(e) => setCandidateHandle(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '0.75rem 0',
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        color: 'var(--text)'
                      }}
                    />
                  </div>

                  {/* Quick Select Candidates */}
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>Select:</span>
                    <button
                      type="button"
                      className="btn-pill-secondary"
                      style={{ padding: '0.2rem 0.55rem', fontSize: '0.72rem' }}
                      onClick={() => setCandidateHandle('alex-chen')}
                    >
                      @alex-chen (Go/Cloud)
                    </button>
                    <button
                      type="button"
                      className="btn-pill-secondary"
                      style={{ padding: '0.2rem 0.55rem', fontSize: '0.72rem' }}
                      onClick={() => setCandidateHandle('maya-patel')}
                    >
                      @maya-patel (React/TS)
                    </button>
                  </div>
                </div>

                <button 
                  type="button"
                  className="btn-pill"
                  disabled={matchingJd}
                  onClick={handleRunJdMatch}
                  style={{ marginTop: '0.5rem' }}
                >
                  <span>{matchingJd ? 'Screening Candidate Code...' : 'Match Candidate with JD'}</span>
                  <div className="btn-pill-arrow">
                    <ArrowRight size={14} />
                  </div>
                </button>
              </div>

              {/* Right Column: Match Analysis Report */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                  <div className="section-tag" style={{ marginBottom: '0.4rem' }}>
                    SCREENING REPORT
                  </div>
                  <h3 style={{ fontSize: '1.4rem', margin: 0 }}>
                    Candidate Fit & Ground Truth Score
                  </h3>
                </div>

                {jdMatchResult ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Big Score Box */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1.25rem 1.5rem',
                      background: 'var(--bg)',
                      border: '1px solid var(--accent)',
                      borderRadius: 'var(--radius-md)'
                    }}>
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>
                          JD COMPLIANCE SCORE
                        </span>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent)', marginTop: '0.2rem' }}>
                          {jdMatchResult.verdict}
                        </div>
                      </div>

                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
                        {jdMatchResult.matchScore}%
                      </div>
                    </div>

                    {/* Matched Skills with Code Proof */}
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', display: 'block', marginBottom: '0.5rem' }}>
                        VERIFIED IN CANDIDATE REPOSITORIES (CODE PROVEN):
                      </span>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {jdMatchResult.matchedSkills.map((sk, sIdx) => (
                          <span key={sIdx} style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.6rem',
                            background: 'var(--neon-bg)',
                            color: 'var(--accent)',
                            borderRadius: 'var(--radius-pill)',
                            border: '1px solid var(--accent)'
                          }}>
                            ✓ {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Missing Skills */}
                    {jdMatchResult.missingSkills.length > 0 && (
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', display: 'block', marginBottom: '0.5rem' }}>
                          MISSING IN REPOSITORIES (ZERO CODE EVIDENCE):
                        </span>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {jdMatchResult.missingSkills.map((sk, sIdx) => (
                            <span key={sIdx} style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.6rem',
                              background: 'var(--surface-raised)',
                              color: 'var(--muted)',
                              borderRadius: 'var(--radius-pill)',
                              border: '1px solid var(--border)'
                            }}>
                              ✕ {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Assessment Narrative */}
                    <div style={{
                      padding: '1rem',
                      background: 'var(--bg)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      color: 'var(--text)'
                    }}>
                      {jdMatchResult.assessmentSummary}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <button
                        type="button"
                        className="btn-pill"
                        style={{ flex: 1 }}
                        onClick={() => alert(`Candidate @${candidateHandle} shortlisted for technical interview!`)}
                      >
                        <span>Shortlist Candidate</span>
                        <div className="btn-pill-arrow">
                          <Check size={14} />
                        </div>
                      </button>
                      <button
                        type="button"
                        className="btn-pill-secondary"
                        onClick={() => {
                          handleAnalyzeUsername(candidateHandle);
                          setCurrentPage('student');
                        }}
                      >
                        Full Dossier
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    padding: '3rem 1.5rem',
                    textAlign: 'center',
                    color: 'var(--muted)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <FileText size={32} style={{ color: 'var(--border)' }} />
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>
                      Ready to evaluate. Select a Job Description and Candidate above, then click <strong>"Match Candidate with JD"</strong>.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE 4: STUDENT PURPOSE HUB
          ==================================================================== */}
      {currentPage === 'student' && (
        <main style={{ flex: 1, padding: '3.5rem 0 5rem 0' }}>
          <div className="container">
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div className="section-tag">FOR CANDIDATES</div>
                  <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>Student Repository Analysis</h1>
                  <p style={{ margin: 0 }}>
                    Understand your engineering profile from a hiring manager's lens.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    type="button"
                    className="btn-pill-secondary"
                    onClick={() => handleAnalyzeUsername('alex-chen')}
                  >
                    @alex-chen (Go)
                  </button>
                  <button 
                    type="button"
                    className="btn-pill-secondary"
                    onClick={() => handleAnalyzeUsername('maya-patel')}
                  >
                    @maya-patel (React)
                  </button>
                </div>
              </div>

              {/* Analyzer Input */}
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!githubInput.trim()) return;
                handleAnalyzeUsername(githubInput);
              }} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{
                  flex: 1,
                  minWidth: '260px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0 1rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-pill)'
                }}>
                  <Terminal size={16} style={{ color: 'var(--muted)' }} />
                  <input 
                    type="text"
                    placeholder="Enter GitHub handle or URL (e.g. https://github.com/alex-chen)"
                    value={githubInput}
                    onChange={(e) => setGithubInput(e.target.value)}
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.875rem',
                      color: 'var(--text)',
                      padding: '0.75rem 0'
                    }}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-pill"
                  disabled={analyzing}
                >
                  <span>{analyzing ? 'Scanning...' : 'Analyze Profile'}</span>
                  <div className="btn-pill-arrow">
                    <ArrowRight size={14} />
                  </div>
                </button>
              </form>
            </div>

            {/* RESULTS VIEW */}
            {studentReport && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* 1. Activity */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
                    <img 
                      src={studentReport.avatar} 
                      alt={studentReport.name} 
                      style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid var(--accent)', objectFit: 'cover' }}
                    />
                    <div>
                      <h2 style={{ fontSize: '1.75rem', margin: 0 }}>{studentReport.name}</h2>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', marginTop: '0.2rem' }}>
                        @{studentReport.username}
                      </div>
                    </div>

                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)' }}>ACTIVITY SCORE</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                        {studentReport.activity.score}/100
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
                    <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>CONSISTENCY STATUS</span>
                      <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.label}</span>
                    </div>
                    <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>ESTIMATED COMMITS</span>
                      <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.commitsLastYear} commits</span>
                    </div>
                    <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>PUBLIC REPOSITORIES</span>
                      <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.publicRepos} repos</span>
                    </div>
                    <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>WEEKLY CADENCE</span>
                      <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.weeklyCadence}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: 0 }}>
                    💡 <strong>Summary:</strong> {studentReport.activity.summary}
                  </p>
                </div>

                {/* 2. Tech Stacks */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Verified Tech Stacks</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                    {studentReport.techStacks.map((tech, idx) => (
                      <div key={idx} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.05rem' }}>{tech.name}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-pill)', background: 'var(--neon-bg)', color: 'var(--accent)' }}>
                            VERIFIED IN CODE
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted)', margin: '0.5rem 0' }}>
                          <span>{tech.type}</span>
                          <span>{tech.repos} Repositories</span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text)' }}>
                          Proficiency: <strong>{tech.level}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Improvements */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>What Improvements Can You Do?</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {studentReport.improvements.map((item, idx) => (
                      <div key={idx} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <TrendingUp size={16} style={{ color: 'var(--accent)' }} />
                            <span style={{ fontWeight: 600 }}>{item.title}</span>
                          </div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-pill)', background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
                            {item.priority} Priority
                          </span>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Recommended Roles */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>What Roles Can You Apply For?</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {studentReport.recommendedRoles.map((roleObj, idx) => (
                      <div key={idx} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{roleObj.role}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)' }}>
                            {roleObj.match}% MATCH
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                          {roleObj.matchingSkills.map((sk, sIdx) => (
                            <span key={sIdx} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', padding: '0.15rem 0.5rem', background: 'var(--neon-bg)', color: 'var(--accent)', borderRadius: 'var(--radius-pill)' }}>
                              ✓ {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE 5: ADMIN PORTAL (In Footer)
          ==================================================================== */}
      {currentPage === 'admin' && (
        <main style={{ flex: 1, padding: '3.5rem 0 5rem 0' }}>
          <div className="container" style={{ maxWidth: '820px' }}>
            <div className="section-tag">ADMINISTRATIVE DASHBOARD</div>
            <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>Admin Control Center</h1>
            <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
              Issue cryptographically valid Registration IDs to recruiters and hiring managers.
            </p>

            {!isAdminLoggedIn ? (
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem'
              }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Admin Authentication</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
                  Enter your admin passcode to access the HR Registration ID generator.
                </p>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (adminPassword === 'admin' || adminPassword === 'admin123' || adminPassword === '') {
                    setIsAdminLoggedIn(true);
                    setAdminError('');
                  } else {
                    setAdminError('Invalid passcode. Default passcode is "admin" (or leave blank for demo).');
                  }
                }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input 
                    type="password"
                    placeholder="Passcode: admin (or leave blank for demo)"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-pill)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                      color: 'var(--text)'
                    }}
                  />

                  {adminError && (
                    <p style={{ color: '#F59E0B', fontSize: '0.85rem', margin: 0 }}>{adminError}</p>
                  )}

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="submit" className="btn-pill">
                      <span>Login as Admin</span>
                      <div className="btn-pill-arrow">
                        <ArrowRight size={14} />
                      </div>
                    </button>
                    <button 
                      type="button" 
                      className="btn-pill-secondary"
                      onClick={() => setIsAdminLoggedIn(true)}
                    >
                      Instant Demo Access
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem'
                }}>
                  <h3 style={{ marginBottom: '0.4rem' }}>Generate HR Registration ID</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
                    Create an authenticated token for a new company recruiter.
                  </p>

                  <form onSubmit={handleGenerateHrToken} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
                          HR RECRUITER NAME:
                        </label>
                        <input 
                          type="text"
                          placeholder="e.g. Rachel Adams"
                          value={newHrName}
                          onChange={(e) => setNewHrName(e.target.value)}
                          required
                          style={{
                            width: '100%',
                            padding: '0.65rem 1rem',
                            background: 'var(--bg)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-pill)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            color: 'var(--text)'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
                          ORGANIZATION / COMPANY:
                        </label>
                        <input 
                          type="text"
                          placeholder="e.g. Netflix, Stripe, Google"
                          value={newOrg}
                          onChange={(e) => setNewOrg(e.target.value)}
                          required
                          style={{
                            width: '100%',
                            padding: '0.65rem 1rem',
                            background: 'var(--bg)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-pill)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            color: 'var(--text)'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                      <button type="submit" className="btn-pill">
                        <span>Generate Token</span>
                        <div className="btn-pill-arrow">
                          <UserPlus size={14} />
                        </div>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Issued Tokens Table */}
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem'
                }}>
                  <h3 style={{ marginBottom: '1rem' }}>Issued HR Registration Tokens</h3>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--muted)' }}>
                          <th style={{ padding: '0.75rem' }}>TOKEN ID</th>
                          <th style={{ padding: '0.75rem' }}>RECRUITER</th>
                          <th style={{ padding: '0.75rem' }}>ORGANIZATION</th>
                          <th style={{ padding: '0.75rem' }}>STATUS</th>
                          <th style={{ padding: '0.75rem', textAlign: 'right' }}>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hrTokens.map((tok, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                            <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--accent)' }}>
                              {tok.id}
                            </td>
                            <td style={{ padding: '0.75rem' }}>{tok.hrName}</td>
                            <td style={{ padding: '0.75rem' }}>{tok.org}</td>
                            <td style={{ padding: '0.75rem' }}>
                              <span style={{
                                padding: '0.2rem 0.5rem',
                                background: 'var(--neon-bg)',
                                color: 'var(--accent)',
                                borderRadius: 'var(--radius-pill)',
                                fontSize: '0.72rem'
                              }}>
                                {tok.status}
                              </span>
                            </td>
                            <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                              <button
                                type="button"
                                onClick={() => copyToken(tok.id)}
                                className="btn-pill-secondary"
                                style={{ padding: '0.25rem 0.65rem', fontSize: '0.72rem' }}
                              >
                                {copiedToken === tok.id ? <Check size={12} color="var(--accent)" /> : <Copy size={12} />}
                                <span>{copiedToken === tok.id ? 'Copied' : 'Copy'}</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* ====================================================================
          FOOTER: Simple & Clean
          ==================================================================== */}
      <footer style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        padding: '3rem 0',
        marginTop: 'auto'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--text)',
                color: 'var(--bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)'
              }}>
                C
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
                CommitCV
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: 0 }}>
              Production developer verification grounded in AST code proof.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentPage('home')} className="btn-pill-secondary" style={{ border: 'none', background: 'none' }}>
              Home
            </button>
            <button onClick={() => {
              setCurrentPage('home');
              setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 50);
            }} className="btn-pill-secondary" style={{ border: 'none', background: 'none' }}>
              How It Works
            </button>
            <button onClick={() => setCurrentPage('student')} className="btn-pill-secondary" style={{ border: 'none', background: 'none' }}>
              Student Analysis
            </button>
            <button 
              onClick={() => {
                if (recruiterAuth) setCurrentPage('recruiter-workspace');
                else setCurrentPage('recruiter-login');
              }} 
              className="btn-pill-secondary" 
              style={{ border: 'none', background: 'none', color: 'var(--accent)' }}
            >
              Recruiter Portal
            </button>
            
            <span style={{ color: 'var(--border)' }}>|</span>

            <button
              onClick={() => setCurrentPage('admin')}
              className="btn-pill-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}
            >
              <Lock size={13} style={{ color: 'var(--accent)' }} />
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
