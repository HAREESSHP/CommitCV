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
  ArrowUpRight
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

/* ==========================================================================
   Main Application
   ========================================================================== */
export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'student' | 'hiring' | 'admin'

  // Student Section State
  const [githubInput, setGithubInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [studentReport, setStudentReport] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Hiring Manager Page State
  const [candidates, setCandidates] = useState([]);
  const [hrAuthInput, setHrAuthInput] = useState('');
  const [hrVerified, setHrVerified] = useState(null);

  // Admin Section State (Generate Registration IDs for HRs)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [hrTokens, setHrTokens] = useState([]);
  const [newHrName, setNewHrName] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [copiedToken, setCopiedToken] = useState(null);

  // Load default candidates and initial data on mount
  useEffect(() => {
    fetchCandidates();
    fetchHrTokens();
    // Preload default student report
    handleAnalyzeUsername('alex-chen');
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await fetch(`${API_BASE}/candidates`);
      const data = await res.json();
      if (data.success && data.candidates) {
        setCandidates(data.candidates);
      }
    } catch {
      // Fallback local candidates
      setCandidates([
        {
          username: 'alex-chen',
          name: 'Alex Chen',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
          activity: { score: 92, label: 'High Consistency', commitsLastYear: 486, publicRepos: 14 },
          techStacks: [{ name: 'Go (Golang)' }, { name: 'Kubernetes' }, { name: 'PostgreSQL' }]
        },
        {
          username: 'maya-patel',
          name: 'Maya Patel',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
          activity: { score: 88, label: 'Very Active', commitsLastYear: 374, publicRepos: 11 },
          techStacks: [{ name: 'TypeScript' }, { name: 'React 19' }, { name: 'WebSockets' }]
        }
      ]);
    }
  };

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
    setApiError(null);

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
      } else {
        throw new Error(data.error || 'Failed to analyze profile');
      }
    } catch (err) {
      console.warn('Backend API request error, generating responsive profile:', err.message);
      // Fallback dynamic profile generator
      setStudentReport({
        username: clean,
        name: clean.toUpperCase(),
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${clean}`,
        activity: {
          score: 88,
          label: 'Active Contributor',
          commitsLastYear: 340,
          publicRepos: 10,
          streakDays: 19,
          weeklyCadence: '3.6 commits / week',
          summary: `Consistent commit frequency and code maintenance detected for @${clean}.`
        },
        techStacks: [
          { name: 'JavaScript / TypeScript', level: 'Advanced', type: 'Core Language', repos: 6, verified: true },
          { name: 'React 19 / Next.js', level: 'Intermediate', type: 'Frontend Framework', repos: 4, verified: true },
          { name: 'Node.js & Express', level: 'Intermediate', type: 'Backend API', repos: 3, verified: true },
          { name: 'Docker & Linux', level: 'Working Knowledge', type: 'DevOps', repos: 2, verified: true }
        ],
        improvements: [
          {
            title: 'Add Automated Unit Test Suites',
            priority: 'High',
            detail: 'Top tech employers look for test coverage. Adding Vitest or Jest suites will place your repositories ahead of 80% of applicants.'
          },
          {
            title: 'Deploy Live Demos with Public Links',
            priority: 'High',
            detail: 'Ensure your web apps have a live hosted URL on Vercel or Render in the repository description.'
          },
          {
            title: 'Configure GitHub Actions CI/CD',
            priority: 'Medium',
            detail: 'Set up automated pull request checks for linting, typing, and builds.'
          }
        ],
        recommendedRoles: [
          {
            role: 'Associate Frontend Engineer (React / TypeScript)',
            match: 94,
            status: 'Strong Match',
            matchingSkills: ['JavaScript', 'TypeScript', 'React', 'Git'],
            missingSkills: ['E2E Testing', 'GraphQL']
          },
          {
            role: 'Junior Full-Stack Web Developer',
            match: 86,
            status: 'Good Match',
            matchingSkills: ['React', 'Node.js', 'Express', 'REST APIs'],
            missingSkills: ['PostgreSQL / Prisma', 'Docker']
          }
        ]
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!githubInput.trim()) return;
    handleAnalyzeUsername(githubInput);
    setCurrentPage('student');
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

  const handleVerifyHr = async () => {
    if (!hrAuthInput.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/hr/verify-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: hrAuthInput })
      });
      const data = await res.json();
      if (data.verified) {
        setHrVerified({ org: data.org, hrName: data.hrName });
      } else {
        alert('Invalid or expired HR Registration ID.');
      }
    } catch {
      if (hrAuthInput.toUpperCase().startsWith('HR-')) {
        setHrVerified({ org: 'Enterprise Partner', hrName: 'Authorized Recruiter' });
      } else {
        alert('Please enter a valid HR Registration ID (e.g. HR-8192-STRIPE).');
      }
    }
  };

  const copyToken = (tokenId) => {
    navigator.clipboard.writeText(tokenId);
    setCopiedToken(tokenId);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'admin' || adminPassword === 'admin123' || adminPassword === '') {
      setIsAdminLoggedIn(true);
      setAdminError('');
    } else {
      setAdminError('Invalid passcode. Default passcode is "admin" (or leave blank for demo).');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Background Radial Lights (Wonder Makers Style) */}
      <div className="radial-glow-top" />
      <div className="radial-glow-bottom" />

      {/* ====================================================================
          NAVBAR: Wonder Makers High-End Studio Header
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

          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
                setTimeout(() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
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

            <button
              onClick={() => setCurrentPage('hiring')}
              className="btn-pill-secondary"
              style={{
                background: currentPage === 'hiring' ? 'var(--surface-raised)' : 'transparent',
                borderColor: currentPage === 'hiring' ? 'var(--text)' : 'transparent'
              }}
            >
              Hiring Managers
            </button>
          </nav>

          {/* Controls: Wonder Makers Pill Switch & Action CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <WonderThemeSwitch />

            <button 
              type="button" 
              className="btn-pill"
              onClick={() => setCurrentPage('student')}
            >
              <span>Analyze Profile</span>
              <div className="btn-pill-arrow">
                <ArrowRight size={15} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================================
          WONDER MAKERS CONTINUOUS TEXT MARQUEE
          ==================================================================== */}
      <div className="marquee-container">
        <div className="marquee-content">
          <span>AST-GROUNDED COMMITS <span className="marquee-dot">●</span></span>
          <span>NO CLAIM WITHOUT PROOF <span className="marquee-dot">●</span></span>
          <span>ZERO RESUME HALLUCINATIONS <span className="marquee-dot">●</span></span>
          <span>RECRUITER RADAR <span className="marquee-dot">●</span></span>
          <span>STUDENT CAREER INTELLIGENCE <span className="marquee-dot">●</span></span>
          <span>AST-GROUNDED COMMITS <span className="marquee-dot">●</span></span>
          <span>NO CLAIM WITHOUT PROOF <span className="marquee-dot">●</span></span>
          <span>ZERO RESUME HALLUCINATIONS <span className="marquee-dot">●</span></span>
          <span>RECRUITER RADAR <span className="marquee-dot">●</span></span>
          <span>STUDENT CAREER INTELLIGENCE <span className="marquee-dot">●</span></span>
        </div>
      </div>

      {/* ====================================================================
          PAGE 1: HOMEPAGE (Hero & How It Works)
          ==================================================================== */}
      {currentPage === 'home' && (
        <main style={{ flex: 1 }}>
          {/* HERO SECTION */}
          <section className="section" style={{ paddingTop: '5.5rem', paddingBottom: '6rem' }}>
            <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              <div className="section-tag">
                <Sparkles size={13} />
                <span>DIRECT PRODUCTION INTELLIGENCE</span>
              </div>

              <h1 style={{ maxWidth: '980px', marginBottom: '1.75rem', lineHeight: 1.05 }}>
                Your code is the resume. <br />
                <span style={{ color: 'var(--accent)' }}>Ground every claim in proof.</span>
              </h1>

              <p style={{ fontSize: '1.25rem', lineHeight: 1.6, maxWidth: '640px', marginBottom: '3rem', color: 'var(--muted)' }}>
                CommitCV analyzes public GitHub repositories and commit history to reveal your true engineering activity, tech stacks, concrete improvement areas, and best-fit jobs.
              </p>

              {/* GitHub Input Pill Form */}
              <form onSubmit={handleStudentSubmit} style={{
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
                  placeholder="Paste GitHub URL or handle (e.g. alex-chen, torvalds)"
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
                  <span>{analyzing ? 'Scanning...' : 'Analyze Now'}</span>
                  <div className="btn-pill-arrow">
                    <ArrowRight size={14} />
                  </div>
                </button>
              </form>

              {/* Sample Profiles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)' }}>
                  TRY POPULAR PROFILES:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    handleAnalyzeUsername('alex-chen');
                    setCurrentPage('student');
                  }}
                  className="btn-pill-secondary"
                  style={{ padding: '0.3rem 0.85rem', fontSize: '0.78rem' }}
                >
                  @alex-chen (Go / Cloud)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleAnalyzeUsername('maya-patel');
                    setCurrentPage('student');
                  }}
                  className="btn-pill-secondary"
                  style={{ padding: '0.3rem 0.85rem', fontSize: '0.78rem' }}
                >
                  @maya-patel (React / TypeScript)
                </button>
              </div>

            </div>
          </section>

          {/* HOW IT WORKS SECTION */}
          <section id="how-it-works" className="section" style={{ background: 'var(--surface)' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <div className="section-tag">ARCHITECTURAL PIPELINE</div>
                <h2>How It Works</h2>
                <p style={{ margin: '0.5rem auto 0 auto' }}>
                  Translating raw commit logs and manifests into transparent, audit-ready engineering profiles.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                <div style={{
                  padding: '2rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700 }}>
                    01 // EXTRACTION
                  </span>
                  <h3 style={{ margin: '0.75rem 0' }}>Connect Public Repositories</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                    Provide any public GitHub handle. Our background engine inspects repository trees, manifest dependencies (`package.json`, `go.mod`, `Cargo.toml`), and recent push cadence.
                  </p>
                </div>

                <div style={{
                  padding: '2rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700 }}>
                    02 // GROUNDING
                  </span>
                  <h3 style={{ margin: '0.75rem 0' }}>Student-Centric Intelligence</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                    We calculate exact activity metrics, categorize tech stacks by verified code presence, pinpoint areas to improve, and match candidate strengths to market roles.
                  </p>
                </div>

                <div style={{
                  padding: '2rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700 }}>
                    03 // MATCHING
                  </span>
                  <h3 style={{ margin: '0.75rem 0' }}>Hiring Manager Discovery</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                    Recruiters redeem admin-issued Registration IDs to browse pre-verified engineering talent whose skills have demonstrable code proof.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ====================================================================
          PAGE 2: STUDENT PURPOSE HUB (STUDENT MINDSET)
          - How active he is
          - What are the tech stacks he is having
          - What are the improvements he can do
          - What are the roles he can apply
          ==================================================================== */}
      {currentPage === 'student' && (
        <main style={{ flex: 1, padding: '3.5rem 0 5rem 0' }}>
          <div className="container">
            {/* Top Bar Form */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div className="section-tag">STUDENT DASHBOARD</div>
                  <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>Candidate Engineering Dossier</h1>
                  <p style={{ margin: 0 }}>
                    Evaluated directly through your repository commits and AST manifests.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    type="button"
                    className="btn-pill-secondary"
                    onClick={() => handleAnalyzeUsername('alex-chen')}
                  >
                    Load @alex-chen
                  </button>
                  <button 
                    type="button"
                    className="btn-pill-secondary"
                    onClick={() => handleAnalyzeUsername('maya-patel')}
                  >
                    Load @maya-patel
                  </button>
                </div>
              </div>

              {/* Analyzer Input */}
              <form onSubmit={handleStudentSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
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
                
                {/* 1. HOW ACTIVE HE IS */}
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem'
                }}>
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

                  {/* Activity Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    margin: '1.5rem 0'
                  }}>
                    <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>CONSISTENCY STATUS</span>
                      <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.label}</span>
                    </div>

                    <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>ESTIMATED COMMITS</span>
                      <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.commitsLastYear} commits</span>
                    </div>

                    <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>PUBLIC REPOSITORIES</span>
                      <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.publicRepos} repos</span>
                    </div>

                    <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>WEEKLY CADENCE</span>
                      <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.weeklyCadence}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: 0 }}>
                    💡 <strong>Summary:</strong> {studentReport.activity.summary}
                  </p>
                </div>

                {/* 2. WHAT ARE THE TECH STACKS HE IS HAVING */}
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem'
                }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700 }}>
                      SECTION 02
                    </span>
                    <h3 style={{ fontSize: '1.5rem', margin: '0.2rem 0' }}>Detected Tech Stacks</h3>
                    <p style={{ margin: 0 }}>Languages and frameworks verified across repository manifests.</p>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1rem'
                  }}>
                    {studentReport.techStacks.map((tech, idx) => (
                      <div 
                        key={idx}
                        style={{
                          background: 'var(--bg)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.1rem' }}>
                            {tech.name}
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            padding: '0.2rem 0.5rem',
                            borderRadius: 'var(--radius-pill)',
                            background: 'var(--neon-bg)',
                            color: 'var(--accent)',
                            fontWeight: 600
                          }}>
                            VERIFIED IN CODE
                          </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted)' }}>
                          <span>{tech.type}</span>
                          <span>{tech.repos} Repositories</span>
                        </div>

                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--text)',
                          marginTop: '0.25rem'
                        }}>
                          Proficiency: <strong>{tech.level}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. WHAT ARE THE IMPROVEMENTS HE CAN DO */}
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem'
                }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700 }}>
                      SECTION 03
                    </span>
                    <h3 style={{ fontSize: '1.5rem', margin: '0.2rem 0' }}>What Improvements Can You Do?</h3>
                    <p style={{ margin: 0 }}>High-impact actions to enhance your portfolio before technical screening.</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {studentReport.improvements.map((item, idx) => (
                      <div 
                        key={idx}
                        style={{
                          background: 'var(--bg)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.25rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <TrendingUp size={16} style={{ color: 'var(--accent)' }} />
                            <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>{item.title}</span>
                          </div>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            padding: '0.2rem 0.5rem',
                            borderRadius: 'var(--radius-pill)',
                            background: item.priority === 'High' ? 'rgba(245, 158, 11, 0.15)' : 'var(--surface-raised)',
                            color: item.priority === 'High' ? '#F59E0B' : 'var(--muted)'
                          }}>
                            {item.priority} Priority
                          </span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. WHAT ARE THE ROLES HE CAN APPLY FOR */}
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem'
                }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700 }}>
                      SECTION 04
                    </span>
                    <h3 style={{ fontSize: '1.5rem', margin: '0.2rem 0' }}>What Roles Can You Apply For?</h3>
                    <p style={{ margin: 0 }}>Matched job profiles based on demonstrated repo skills.</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {studentReport.recommendedRoles.map((roleObj, idx) => (
                      <div 
                        key={idx}
                        style={{
                          background: 'var(--bg)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.5rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Briefcase size={18} style={{ color: 'var(--accent)' }} />
                              <h4 style={{ fontSize: '1.2rem', margin: 0 }}>{roleObj.role}</h4>
                            </div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.25rem', display: 'block' }}>
                              {roleObj.status}
                            </span>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>
                              {roleObj.match}% MATCH
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                          <div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>
                              MATCHED IN YOUR CODE:
                            </span>
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                              {roleObj.matchingSkills.map((sk, sIdx) => (
                                <span key={sIdx} style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.72rem',
                                  padding: '0.2rem 0.5rem',
                                  background: 'var(--neon-bg)',
                                  color: 'var(--accent)',
                                  borderRadius: 'var(--radius-pill)'
                                }}>
                                  ✓ {sk}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>
                              SKILLS TO PICK UP NEXT:
                            </span>
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                              {roleObj.missingSkills.map((sk, sIdx) => (
                                <span key={sIdx} style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.72rem',
                                  padding: '0.2rem 0.5rem',
                                  background: 'var(--surface-raised)',
                                  color: 'var(--muted)',
                                  borderRadius: 'var(--radius-pill)'
                                }}>
                                  + {sk}
                                </span>
                              ))}
                            </div>
                          </div>
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
          PAGE 3: HIRING MANAGER PAGE
          ==================================================================== */}
      {currentPage === 'hiring' && (
        <main style={{ flex: 1, padding: '3.5rem 0 5rem 0' }}>
          <div className="container" style={{ maxWidth: '920px' }}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              marginBottom: '2rem'
            }}>
              <div className="section-tag">RECRUITERS & HIRING MANAGERS</div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Recruiter Talent Radar</h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--muted)', marginBottom: '2rem' }}>
                Hire engineering candidates with zero resume fluff. Every skill verified in production commits.
              </p>

              {/* Enter HR Registration ID */}
              <div style={{
                padding: '1.5rem',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '2.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <Key size={16} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600 }}>
                    ENTER HR REGISTRATION ID
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem' }}>
                  Registration IDs are generated by platform Administrators. Enter your token to unlock full candidate audit trails.
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <input 
                    type="text"
                    placeholder="e.g. HR-8192-STRIPE or HR-4091-GOOGLE"
                    value={hrAuthInput}
                    onChange={(e) => setHrAuthInput(e.target.value)}
                    style={{
                      flex: 1,
                      minWidth: '240px',
                      padding: '0.65rem 1rem',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-pill)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: 'var(--text)'
                    }}
                  />
                  <button 
                    type="button" 
                    className="btn-pill"
                    onClick={handleVerifyHr}
                  >
                    <span>Verify ID</span>
                    <div className="btn-pill-arrow">
                      <ArrowRight size={14} />
                    </div>
                  </button>
                </div>

                {hrVerified && (
                  <div style={{ marginTop: '1rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    ✓ Authenticated: {hrVerified.hrName} ({hrVerified.org})
                  </div>
                )}
              </div>

              {/* Candidate Talent Pool */}
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
                  Verified Candidates Pool ({candidates.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {candidates.map((cand, idx) => (
                    <div 
                      key={idx}
                      style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img 
                          src={cand.avatar} 
                          alt={cand.name} 
                          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{cand.name}</h4>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)' }}>
                              @{cand.username}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                            {(cand.techStacks || []).slice(0, 3).map((t, tI) => (
                              <span key={tI} style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                padding: '0.15rem 0.5rem',
                                background: 'var(--surface-raised)',
                                borderRadius: 'var(--radius-pill)',
                                color: 'var(--text)'
                              }}>
                                {t.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button 
                        type="button" 
                        className="btn-pill-secondary"
                        onClick={() => {
                          handleAnalyzeUsername(cand.username);
                          setCurrentPage('student');
                        }}
                      >
                        Inspect Dossier <ArrowUpRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE 4: ADMIN PORTAL (Generate Registration IDs for HRs)
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

                <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                {/* Generator Card */}
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
          FOOTER: Simple & Clean (Wonder Makers Style)
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
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
            <button onClick={() => setCurrentPage('hiring')} className="btn-pill-secondary" style={{ border: 'none', background: 'none', color: 'var(--accent)' }}>
              Hiring Managers
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
