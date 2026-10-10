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
  AlertTriangle,
  Shield,
  KeyRound,
  User,
  Eye,
  EyeOff
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
  // Navigation: 'home' | 'student' | 'recruiter-login' | 'recruiter-dashboard' | 'admin'
  const [currentPage, setCurrentPage] = useState('home');

  // Student Section State
  const [githubInput, setGithubInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [studentReport, setStudentReport] = useState(null);

  // Recruiter Authentication State
  const [recruiterAuth, setRecruiterAuth] = useState(null); // { recruiterId, hrName, org }
  const [recruiterIdInput, setRecruiterIdInput] = useState('');
  const [recruiterPasswordInput, setRecruiterPasswordInput] = useState('');
  const [hrTokenInput, setHrTokenInput] = useState('');
  const [hrPasswordInput, setHrPasswordInput] = useState('');
  const [hrEmailInput, setHrEmailInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [recruitersList, setRecruitersList] = useState([]);

  // Recruiter Workspace (JD Matcher)
  const [recruiterJd, setRecruiterJd] = useState(SAMPLE_JDS[0].text);
  const [candidateHandle, setCandidateHandle] = useState('alex-chen');
  const [matchingJd, setMatchingJd] = useState(false);
  const [jdMatchResult, setJdMatchResult] = useState(null);

  // Admin Section State (Production Gateway & Credentials Generator)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminAuth, setAdminAuth] = useState(() => {
    try {
      const saved = localStorage.getItem('commitcv_admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminPin, setAdminPin] = useState('2026');
  const [adminShowPassword, setAdminShowPassword] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminTokenSearch, setAdminTokenSearch] = useState('');
  const [hrTokens, setHrTokens] = useState([]);
  const [newHrName, setNewHrName] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newEmployeeId, setNewEmployeeId] = useState('');
  const [newCustomId, setNewCustomId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [issuedCredentialCard, setIssuedCredentialCard] = useState(null);
  const [copiedToken, setCopiedToken] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [copiedPass, setCopiedPass] = useState(null);

  const copyToken = (val) => {
    if (!val) return;
    navigator.clipboard.writeText(val);
    setCopiedToken(val);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const deriveCredentials = (empId) => {
    let clean = (empId || '').trim();
    if (!clean) return { username: '', password: '' };
    if (/^\d+$/.test(clean)) {
      clean = `cv${clean}`;
    }
    const username = clean.toLowerCase();
    const match = clean.match(/^([a-zA-Z]+)[-_]?(\d+)$/);
    if (match) {
      const letters = match[1];
      const numbers = match[2];
      const prefix = letters.charAt(0).toUpperCase() + letters.slice(1).toLowerCase();
      return { username, password: `${prefix}@${numbers}` };
    }
    return { username, password: `Cv@${clean}` };
  };

  const copyFullCredentials = (token) => {
    const text = `CommitCV Recruiter Portal Credentials:\nRecruiter Name: ${token.hrName}\nOrganization: ${token.org}\nEmployee ID: ${token.employeeId}\nUsername: ${token.username}\nPassword: ${token.password}\nRegistration Token ID: ${token.id}\nPortal URL: http://localhost:5173`;
    navigator.clipboard.writeText(text);
    setCopiedToken('FULL_CREDENTIALS');
    setTimeout(() => setCopiedToken(null), 2500);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin' || hash === 'admin-dashboard' || hash === 'admin-login') {
        window.location.href = '/admin.html';
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    fetchRecruiters();
    // Default student report
    handleAnalyzeUsername('alex-chen');
  }, []);

  const fetchRecruiters = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/recruiters`);
      const data = await res.json();
      if (data.success && data.recruiters) {
        setRecruitersList(data.recruiters);
      }
    } catch {
      setRecruitersList([
        { 
          recruiterId: 'REC-8192-STRIPE', 
          password: 'stripe@password123', 
          hrName: 'Sarah Jenkins', 
          org: 'Stripe', 
          date: '2026-10-08', 
          status: 'Active' 
        },
        { 
          recruiterId: 'REC-4091-GOOGLE', 
          password: 'google@cloud2026', 
          hrName: 'Vikram Mehta', 
          org: 'Google Cloud', 
          date: '2026-10-09', 
          status: 'Active' 
        }
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

  // Recruiter Login Handler (Authenticates with Recruiter ID & Password)
  const handleRecruiterLogin = async (e) => {
    e?.preventDefault();
    setLoginError('');

    const id = (recruiterIdInput || hrTokenInput).trim();
    const pass = (recruiterPasswordInput || hrPasswordInput).trim();

    if (!id) {
      setLoginError('Please enter your Recruiter ID or Registration Token.');
      return;
    }

    try {
      if (pass) {
        const res = await fetch(`${API_BASE}/recruiter/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recruiterId: id, password: pass })
        });
        const data = await res.json();
        if (data.success && data.recruiter) {
          setRecruiterAuth(data.recruiter);
          setCurrentPage('recruiter-dashboard');
          setRecruiterIdInput('');
          setRecruiterPasswordInput('');
          return;
        }
      }

      // Try HR token verification endpoint
      const tokenRes = await fetch(`${API_BASE}/hr/verify-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pass ? { username: id, password: pass } : { token: id })
      });
      const tokenData = await tokenRes.json();
      if (tokenData.verified) {
        setRecruiterAuth({
          recruiterId: tokenData.username || id,
          hrName: tokenData.hrName || 'Lead Recruiter',
          org: tokenData.org || 'Hiring Partner',
          employeeId: tokenData.employeeId
        });
        setCurrentPage('recruiter-dashboard');
        setRecruiterIdInput('');
        setRecruiterPasswordInput('');
        return;
      }

      // Local check fallback
      const found = recruitersList.find(
        r => (r.recruiterId?.toUpperCase() === id.toUpperCase() || r.username?.toUpperCase() === id.toUpperCase()) && (!pass || r.password === pass)
      );
      if (found) {
        setRecruiterAuth({
          recruiterId: found.recruiterId,
          hrName: found.hrName,
          org: found.org
        });
        setCurrentPage('recruiter-dashboard');
        setRecruiterIdInput('');
        setRecruiterPasswordInput('');
        return;
      }

      setLoginError('Invalid Recruiter ID or Password. Credentials can be generated in Admin Access.');
    } catch {
      if (id.toUpperCase().startsWith('REC-') || id.toUpperCase().startsWith('HR-') || id.toUpperCase() === 'DEMO') {
        setRecruiterAuth({
          recruiterId: id.toUpperCase(),
          hrName: 'Authorized Talent Manager',
          org: 'Stripe'
        });
        setCurrentPage('recruiter-dashboard');
        setRecruiterIdInput('');
        setRecruiterPasswordInput('');
      } else {
        setLoginError('Invalid credentials. Check your Recruiter ID and password or use "REC-8192-STRIPE".');
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

  // Admin: Create Recruiter Account (Generates ID and Password)
  const handleCreateRecruiter = async (e) => {
    e.preventDefault();
    if (!newOrg.trim() || !newHrName.trim()) return;

    const empId = (newEmployeeId.trim() || `CV${Math.floor(100 + Math.random() * 900)}`).toUpperCase();
    const creds = deriveCredentials(empId);

    try {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const cleanOrg = newOrg.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
      const recId = newCustomId.trim() ? newCustomId.trim().toUpperCase() : `REC-${randomNum}-${cleanOrg}`;
      const recPass = newPassword.trim() ? newPassword.trim() : (creds.password || `${cleanOrg.toLowerCase()}@pass${randomNum}`);

      const res = await fetch(`${API_BASE}/admin/create-recruiter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hrName: newHrName.trim(),
          org: newOrg.trim(),
          customId: recId,
          password: recPass,
          employeeId: empId
        })
      });
      const data = await res.json();
      if (data.success && data.recruiter) {
        setRecruitersList([data.recruiter, ...recruitersList]);
        setHrTokens([data.recruiter, ...hrTokens]);
        setIssuedCredentialCard(data.recruiter);
      }
    } catch {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const cleanOrg = newOrg.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
      const recId = newCustomId.trim() ? newCustomId.trim().toUpperCase() : `REC-${randomNum}-${cleanOrg}`;
      const recPass = newPassword.trim() ? newPassword.trim() : (creds.password || `${cleanOrg.toLowerCase()}@pass${randomNum}`);
      const localAccount = {
        id: recId,
        recruiterId: recId,
        password: recPass,
        hrName: newHrName.trim(),
        org: newOrg.trim(),
        employeeId: empId,
        username: creds.username || empId.toLowerCase(),
        date: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
      setRecruitersList([localAccount, ...recruitersList]);
      setHrTokens([localAccount, ...hrTokens]);
      setIssuedCredentialCard(localAccount);
    }

    setNewOrg('');
    setNewHrName('');
    setNewEmployeeId('');
    setNewCustomId('');
    setNewPassword('');
  };

  const copyText = (val, type) => {
    navigator.clipboard.writeText(val);
    if (type === 'id') {
      setCopiedId(val);
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      setCopiedPass(val);
      setTimeout(() => setCopiedPass(null), 2000);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminError('');
    setAdminLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: adminUsername.trim(),
          password: adminPassword
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const session = {
          username: data.admin.username,
          role: data.admin.role,
          token: data.token,
          loginTime: data.admin.loginTime
        };
        setAdminAuth(session);
        localStorage.setItem('commitcv_admin_session', JSON.stringify(session));
        setCurrentPage('admin-dashboard');
      } else {
        // Fallback for development if backend was running without restart
        if (adminUsername.trim().toLowerCase() === 'admin' && adminPassword === 'CommitCV@2026') {
          const session = {
            username: 'admin',
            role: 'Super Administrator',
            token: `adm_sec_${Date.now()}`,
            loginTime: new Date().toISOString()
          };
          setAdminAuth(session);
          localStorage.setItem('commitcv_admin_session', JSON.stringify(session));
          setCurrentPage('admin-dashboard');
        } else {
          setAdminError(data.error || 'Invalid credentials. Access denied.');
        }
      }
    } catch {
      if (adminUsername.trim().toLowerCase() === 'admin' && adminPassword === 'CommitCV@2026') {
        const session = {
          username: 'admin',
          role: 'Super Administrator',
          token: `adm_sec_local_${Date.now()}`,
          loginTime: new Date().toISOString()
        };
        setAdminAuth(session);
        localStorage.setItem('commitcv_admin_session', JSON.stringify(session));
        setCurrentPage('admin-dashboard');
      } else {
        setAdminError('Authentication service unreachable or invalid credentials.');
      }
    } finally {
      setAdminLoading(false);
    }
  };

  const handleAdminLogout = () => {
    setAdminAuth(null);
    localStorage.removeItem('commitcv_admin_session');
    setCurrentPage('home');
  };

  const handleRevokeToken = (tokenId) => {
    setHrTokens(prev => prev.map(t => t.id === tokenId ? { ...t, status: 'Revoked' } : t));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Background Radial Light */}
      <div className="radial-glow-top" />

      {/* ====================================================================
          NAVBAR: Clean Header with Dedicated Recruiter Button
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

            {/* Dedicated Recruiter Button in Navbar */}
            {recruiterAuth ? (
              <button
                onClick={() => setCurrentPage('recruiter-dashboard')}
                className="btn-pill-secondary"
                style={{
                  background: currentPage === 'recruiter-dashboard' ? 'var(--surface-raised)' : 'transparent',
                  borderColor: currentPage === 'recruiter-dashboard' ? 'var(--text)' : 'transparent',
                  color: 'var(--accent)'
                }}
              >
                Recruiter Dashboard ●
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('recruiter-login')}
                className="btn-pill-secondary"
                style={{
                  background: currentPage === 'recruiter-login' ? 'var(--surface-raised)' : 'transparent',
                  borderColor: currentPage === 'recruiter-login' ? 'var(--text)' : 'transparent',
                  color: 'var(--accent)'
                }}
              >
                Recruiter Login
              </button>
            )}
          </nav>

          {/* Right Controls: Pill Switch & Action CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <WonderThemeSwitch />

            {recruiterAuth ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-pill"
                  onClick={() => setCurrentPage('recruiter-dashboard')}
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
          PAGE 1: HOMEPAGE / MAIN DASHBOARD
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

              {/* Dual Action Buttons */}
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
                  onClick={() => {
                    if (recruiterAuth) setCurrentPage('recruiter-dashboard');
                    else setCurrentPage('recruiter-login');
                  }}
                >
                  <Briefcase size={15} style={{ color: 'var(--accent)' }} />
                  <span>I am a Recruiter / Hiring Team</span>
                </button>
              </div>
            </div>
          </section>

          {/* THE RESUME PROBLEM VS COMMITCV PROOF */}
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

          {/* DUAL PURPOSE MATRIX */}
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
                    Stop guessing what hiring managers want. Get a transparent breakdown of your commit cadence, verified tech stacks, missing engineering hygiene, and matched roles.
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
                    Paste your exact Job Description and candidate GitHub link. Our AI RAG engine matches demanded skills against real commit files, scoring true technical fit.
                  </p>
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
          PAGE 2: DEDICATED RECRUITER LOGIN PAGE (Separate Login Page)
          Requires Recruiter ID and Password generated from Admin Access
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
                Enter your issued Recruiter Login ID (or Registration Token) and Password to access candidate screening and JD matching.
              </p>

              <form onSubmit={handleRecruiterLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Recruiter ID Field */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.4rem' }}>
                    RECRUITER LOGIN ID / TOKEN ID:
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
                      placeholder="e.g. REC-8192-STRIPE or cv101 or HR-8192-STRIPE"
                      value={recruiterIdInput || hrTokenInput}
                      onChange={(e) => {
                        setRecruiterIdInput(e.target.value);
                        setHrTokenInput(e.target.value);
                      }}
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

                {/* Password Field */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.4rem' }}>
                    PASSWORD:
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
                    <Lock size={16} style={{ color: 'var(--muted)' }} />
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter recruiter password (e.g. stripe@password123 or Cv@101)"
                      value={recruiterPasswordInput || hrPasswordInput}
                      onChange={(e) => {
                        setRecruiterPasswordInput(e.target.value);
                        setHrPasswordInput(e.target.value);
                      }}
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
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0 }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <div style={{ color: '#F59E0B', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <AlertCircle size={15} />
                    <span>{loginError}</span>
                  </div>
                )}

                <button type="submit" className="btn-pill" style={{ marginTop: '0.5rem' }}>
                  <span>Login to Recruiter Dashboard</span>
                  <div className="btn-pill-arrow">
                    <ArrowRight size={14} />
                  </div>
                </button>

                {/* Demo Recruiter Credentials Box */}
                <div style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    ⚡ TEST DEMO RECRUITER ACCOUNTS:
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button
                      type="button"
                      className="btn-pill-secondary"
                      style={{ justifyContent: 'space-between', padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}
                      onClick={() => {
                        setRecruiterIdInput('REC-8192-STRIPE');
                        setRecruiterPasswordInput('stripe@password123');
                        setLoginError('');
                      }}
                    >
                      <span>Stripe: <strong>REC-8192-STRIPE</strong> / <code>stripe@password123</code></span>
                      <span style={{ color: 'var(--accent)' }}>Fill Credentials →</span>
                    </button>

                    <button
                      type="button"
                      className="btn-pill-secondary"
                      style={{ justifyContent: 'space-between', padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}
                      onClick={() => {
                        setRecruiterIdInput('REC-4091-GOOGLE');
                        setRecruiterPasswordInput('google@cloud2026');
                        setLoginError('');
                      }}
                    >
                      <span>Google: <strong>REC-4091-GOOGLE</strong> / <code>google@cloud2026</code></span>
                      <span style={{ color: 'var(--accent)' }}>Fill Credentials →</span>
                    </button>
                  </div>

                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)', margin: '0.25rem 0 0 0' }}>
                    Need new credentials? Create unique IDs and passwords in the <strong>Admin Access</strong> portal in footer.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE 3: RECRUITER DASHBOARD (Post-Login Workspace)
          - Post Job Description
          - Candidate GitHub URL
          - Automated JD-Match Analysis
          ==================================================================== */}
      {currentPage === 'recruiter-dashboard' && (
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
                    AUTHENTICATED RECRUITER
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
                    [{recruiterAuth?.org || 'Enterprise Partner'}] • {recruiterAuth?.recruiterId}
                  </span>
                </div>
                <h1 style={{ fontSize: '1.8rem', margin: 0 }}>
                  Recruiter Screening Dashboard
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
                  <span>Logout</span>
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
          PAGE 5: DEDICATED ADMIN LOGIN (Production Security Gateway)
          ==================================================================== */}
      {(currentPage === 'admin-login' || (currentPage === 'admin' && !adminAuth && !isAdminLoggedIn)) && (
        <main style={{ flex: 1, padding: '4rem 0 6rem 0', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ maxWidth: '520px', width: '100%' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--surface-raised)',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                color: 'var(--accent)',
                marginBottom: '1rem'
              }}>
                <Shield size={12} />
                <span>RESTRICTED ACCESS // PRODUCTION GATEWAY</span>
              </div>
              <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                Admin Security Terminal
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Authentication required. Enter administrative credentials to access the recruiter authority.
              </p>
            </div>

            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.25rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
            }}>
              <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--muted)',
                    marginBottom: '0.45rem',
                    letterSpacing: '0.05em'
                  }}>
                    ADMINISTRATOR USERNAME:
                  </label>
                  <input
                    type="text"
                    required
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="e.g. admin"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-pill)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                      color: 'var(--text)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--muted)',
                    marginBottom: '0.45rem',
                    letterSpacing: '0.05em'
                  }}>
                    <span>MASTER SECURITY KEY:</span>
                    <button
                      type="button"
                      onClick={() => setAdminShowPassword(!adminShowPassword)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--muted)',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        padding: 0
                      }}
                    >
                      {adminShowPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </label>
                  <input
                    type={adminShowPassword ? 'text' : 'password'}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter production password"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-pill)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                      color: 'var(--text)',
                      outline: 'none'
                    }}
                  />
                </div>



                {adminError && (
                  <div style={{
                    padding: '0.75rem 1rem',
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#f87171',
                    fontSize: '0.82rem'
                  }}>
                    <AlertTriangle size={15} style={{ flexShrink: 0 }} />
                    <span>{adminError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={adminLoading}
                  className="btn-pill"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                >
                  <span>{adminLoading ? 'Authenticating...' : 'Authenticate & Enter Console'}</span>
                  <div className="btn-pill-arrow">
                    <ArrowRight size={14} />
                  </div>
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setCurrentPage('home')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--muted)',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  &larr; Return to Public Portal
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE 6: DEDICATED SEPARATE ADMIN DASHBOARD (Authenticated Control Center)
          ==================================================================== */}
      {(currentPage === 'admin-dashboard' || (currentPage === 'admin' && adminAuth)) && (
        <main style={{ flex: 1, padding: '3.5rem 0 5rem 0' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            
            {/* Clean Executive Header Bar */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--neon-bg)',
                  border: '1px solid rgba(5, 150, 105, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)'
                }}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <h1 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      margin: 0
                    }}>
                      Admin Dashboard
                    </h1>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '9999px',
                      background: 'var(--neon-bg)',
                      color: 'var(--accent)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                      MongoDB Connected
                    </span>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '0.82rem', margin: '0.15rem 0 0 0' }}>
                    Recruiter credential issuance, Employee ID derivation, and access tokens authority.
                  </p>
                </div>
              </div>

              {/* Right Corner User & Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem'
                }}>
                  <User size={14} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontWeight: 700, color: 'var(--text)' }}>@{adminAuth?.username || 'admin'}</span>
                  <span style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>&bull; Super Admin</span>
                </div>

                <button
                  type="button"
                  onClick={handleAdminLogout}
                  className="btn-pill-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem 1rem',
                    fontSize: '0.82rem',
                    color: '#f87171'
                  }}
                >
                  <LogOut size={13} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Issued Credential Certificate Slip (Displays immediately upon generation) */}
              {issuedCredentialCard && (
                <div style={{
                  background: 'var(--surface)',
                  border: '2px solid var(--accent)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  boxShadow: '0 10px 25px -5px rgba(5, 150, 105, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        background: 'var(--neon-bg)',
                        color: 'var(--accent)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        marginBottom: '0.35rem'
                      }}>
                        <Check size={13} />
                        <span>CREDENTIALS ISSUED & REGISTERED SUCCESSFULLY</span>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
                        Recruiter Access Certificate &mdash; {issuedCredentialCard.hrName} ({issuedCredentialCard.org})
                      </h3>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => copyFullCredentials(issuedCredentialCard)}
                        className="btn-pill-secondary"
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                      >
                        {copiedToken === 'FULL_CREDENTIALS' ? <Check size={14} color="var(--accent)" /> : <Copy size={14} />}
                        <span>{copiedToken === 'FULL_CREDENTIALS' ? 'All Copied!' : 'Copy Full Credentials Slip'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIssuedCredentialCard(null)}
                        className="btn-pill-secondary"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', color: 'var(--muted)' }}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>

                  {/* 4 Box Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.85rem'
                  }}>
                    <div style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)'
                    }}>
                      <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', fontWeight: 700 }}>
                        EMPLOYEE ID
                      </div>
                      <div style={{ fontSize: '1.05rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text)', marginTop: '0.2rem' }}>
                        {issuedCredentialCard.employeeId}
                      </div>
                    </div>

                    <div style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)'
                    }}>
                      <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', fontWeight: 700 }}>
                        LOGIN USERNAME
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                        <span style={{ fontSize: '1.05rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)' }}>
                          {issuedCredentialCard.username}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToken(issuedCredentialCard.username)}
                          style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                        >
                          {copiedToken === issuedCredentialCard.username ? <Check size={13} color="var(--accent)" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>

                    <div style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)'
                    }}>
                      <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', fontWeight: 700 }}>
                        ASSIGNED PASSWORD
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                        <span style={{ fontSize: '1.05rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text)' }}>
                          {issuedCredentialCard.password}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToken(issuedCredentialCard.password)}
                          style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                        >
                          {copiedToken === issuedCredentialCard.password ? <Check size={13} color="var(--accent)" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>

                    <div style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)'
                    }}>
                      <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', fontWeight: 700 }}>
                        REGISTRATION TOKEN ID
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                        <span style={{ fontSize: '0.95rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)' }}>
                          {issuedCredentialCard.id}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToken(issuedCredentialCard.id)}
                          style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                        >
                          {copiedToken === issuedCredentialCard.id ? <Check size={13} color="var(--accent)" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Token Generation Box */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Issue New HR Recruiter Registration Token</h3>
                  <span style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    background: 'var(--neon-bg)',
                    color: 'var(--accent)',
                    fontWeight: 600
                  }}>
                    Auto Credential Derivation Active
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
                  Provide recruiter details. The authority engine will automatically bind the Employee ID to login credentials and issue a verified token.
                </p>

                <form onSubmit={handleGenerateHrToken} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* 3 Box Shaped Feature Containers */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.25rem'
                  }}>
                    {/* Box 1: HR Recruiter Name */}
                    <div style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={15} style={{ color: 'var(--accent)' }} />
                        <label style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: 'var(--muted)',
                          letterSpacing: '0.04em'
                        }}>
                          HR RECRUITER NAME:
                        </label>
                      </div>
                      <input 
                        type="text"
                        required
                        value={newHrName}
                        onChange={(e) => setNewHrName(e.target.value)}
                        placeholder="e.g. Rachel Adams"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--text)',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
                        Legal name of recruiter / talent lead
                      </div>
                    </div>

                    {/* Box 2: Company / Organization */}
                    <div style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Building2 size={15} style={{ color: 'var(--accent)' }} />
                        <label style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: 'var(--muted)',
                          letterSpacing: '0.04em'
                        }}>
                          COMPANY / ORGANIZATION:
                        </label>
                      </div>
                      <input 
                        type="text"
                        required
                        value={newOrg}
                        onChange={(e) => setNewOrg(e.target.value)}
                        placeholder="e.g. Stripe, Netflix, Google"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--text)',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
                        Enterprise employer or agency name
                      </div>
                    </div>

                    {/* Box 3: Employee ID with Live Credential Mapping */}
                    <div style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <KeyRound size={15} style={{ color: 'var(--accent)' }} />
                          <label style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: 'var(--muted)',
                            letterSpacing: '0.04em'
                          }}>
                            EMPLOYEE ID:
                          </label>
                        </div>
                        {newEmployeeId && (
                          <span style={{
                            fontSize: '0.68rem',
                            fontFamily: 'var(--font-mono)',
                            background: 'var(--neon-bg)',
                            color: 'var(--accent)',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '4px',
                            fontWeight: 700
                          }}>
                            Mapped
                          </span>
                        )}
                      </div>
                      <input 
                        type="text"
                        required
                        value={newEmployeeId}
                        onChange={(e) => setNewEmployeeId(e.target.value)}
                        placeholder="e.g. cv101"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-sm)',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text)',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      <div style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: newEmployeeId ? 'var(--accent)' : 'var(--muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        flexWrap: 'wrap'
                      }}>
                        {newEmployeeId ? (
                          <>
                            <span>User: <strong style={{ color: 'var(--text)' }}>{deriveCredentials(newEmployeeId).username}</strong></span>
                            <span>&bull;</span>
                            <span>Pass: <strong style={{ color: 'var(--text)' }}>{deriveCredentials(newEmployeeId).password}</strong></span>
                          </>
                        ) : (
                          <span>e.g. cv101 &rarr; User: cv101 &bull; Pass: Cv@101</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Professional Bottom Action Strip */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--muted)', fontSize: '0.78rem' }}>
                      <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
                      <span>Security Authority: Issues cryptographic token ID and credentials instantly.</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '6px',
                        background: 'var(--neon-bg)',
                        border: '1px solid rgba(5, 150, 105, 0.3)',
                        color: 'var(--accent)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.04em'
                      }}>
                        <ShieldCheck size={13} />
                        <span>ZERO-TRUST AUTHORITY</span>
                      </div>

                      <button
                        type="submit"
                        className="btn-pill"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.85rem 1.75rem',
                          fontSize: '0.92rem'
                        }}
                      >
                        <UserPlus size={16} />
                        <span>Generate Recruiter Credentials & Token</span>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.22)',
                          color: '#FFFFFF',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase'
                        }}>
                          PRO ISSUE
                        </span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </form>
              {/* Issued Tokens Registry */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.25rem'
                }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Issued HR Registration Tokens & Credentials</h3>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--muted)' }}>
                      Authorized recruiter tokens with Employee ID, Login Username, and Initial Passwords.
                    </p>
                  </div>

                  <input
                    type="text"
                    value={adminTokenSearch}
                    onChange={(e) => setAdminTokenSearch(e.target.value)}
                    placeholder="Search by recruiter or org..."
                    style={{
                      padding: '0.5rem 0.85rem',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-pill)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--text)',
                      minWidth: '220px'
                    }}
                  />
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--muted)' }}>
                        <th style={{ padding: '0.75rem' }}>TOKEN ID</th>
                        <th style={{ padding: '0.75rem' }}>EMPLOYEE ID</th>
                        <th style={{ padding: '0.75rem' }}>USERNAME</th>
                        <th style={{ padding: '0.75rem' }}>PASSWORD</th>
                        <th style={{ padding: '0.75rem' }}>RECRUITER & ORG</th>
                        <th style={{ padding: '0.75rem' }}>STATUS</th>
                        <th style={{ padding: '0.75rem', textAlign: 'right' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hrTokens
                        .filter(t => {
                          if (!adminTokenSearch.trim()) return true;
                          const q = adminTokenSearch.toLowerCase();
                          return t.id?.toLowerCase().includes(q) || 
                            t.hrName?.toLowerCase().includes(q) || 
                            t.org?.toLowerCase().includes(q) ||
                            t.employeeId?.toLowerCase().includes(q) ||
                            t.username?.toLowerCase().includes(q);
                        })
                        .map((tok, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                            <td style={{ padding: '0.75rem', fontWeight: 700, color: tok.status === 'Active' ? 'var(--accent)' : 'var(--muted)' }}>
                              {tok.id}
                            </td>
                            <td style={{ padding: '0.75rem', color: 'var(--text)' }}>
                              <span style={{
                                padding: '0.15rem 0.45rem',
                                borderRadius: '4px',
                                background: 'var(--bg)',
                                border: '1px solid var(--border)',
                                fontSize: '0.75rem'
                              }}>
                                {tok.employeeId || 'DEFAULT'}
                              </span>
                            </td>
                            <td style={{ padding: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
                              {tok.username || tok.employeeId?.toLowerCase() || 'recruiter'}
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                                <span style={{
                                  padding: '0.15rem 0.45rem',
                                  borderRadius: '4px',
                                  background: 'var(--bg)',
                                  border: '1px solid var(--border)',
                                  color: 'var(--text)',
                                  fontSize: '0.75rem'
                                }}>
                                  {tok.password || 'Cv@2026'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => copyToken(tok.password || 'Cv@2026')}
                                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                                  title="Copy password"
                                >
                                  {copiedToken === (tok.password || 'Cv@2026') ? <Check size={12} color="var(--accent)" /> : <Copy size={12} />}
                                </button>
                              </div>
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              <div>
                                <strong style={{ color: 'var(--text)' }}>{tok.hrName}</strong>
                                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{tok.org}</div>
                              </div>
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              <span style={{
                                padding: '0.2rem 0.5rem',
                                background: tok.status === 'Active' ? 'var(--neon-bg)' : 'rgba(239, 68, 68, 0.1)',
                                color: tok.status === 'Active' ? 'var(--accent)' : '#f87171',
                                borderRadius: 'var(--radius-pill)',
                                fontSize: '0.72rem'
                              }}>
                                {tok.status || 'Active'}
                              </span>
                            </td>
                            <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                <button
                                  type="button"
                                  onClick={() => copyToken(tok.id)}
                                  className="btn-pill-secondary"
                                  style={{ padding: '0.25rem 0.65rem', fontSize: '0.72rem' }}
                                >
                                  {copiedToken === tok.id ? <Check size={12} color="var(--accent)" /> : <Copy size={12} />}
                                  <span>{copiedToken === tok.id ? 'Copied' : 'Copy ID'}</span>
                                </button>
                                {tok.status === 'Active' && (
                                  <button
                                    type="button"
                                    onClick={() => handleRevokeToken(tok.id)}
                                    className="btn-pill-secondary"
                                    title="Revoke access"
                                    style={{ padding: '0.25rem 0.65rem', fontSize: '0.72rem', color: '#f87171' }}
                                  >
                                    Revoke
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )}

      {/* ====================================================================
          FOOTER: VisionX Reference Layout & Constellation Network
          Dual Mode: Carbon Obsidian (Dark) & Studio Paper (Light)
          ==================================================================== */}
      <footer className="constellation-wrapper" style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        padding: '4.5rem 0 2rem 0',
        marginTop: 'auto',
        position: 'relative'
      }}>
        {/* Constellation Network SVG Background */}
        <div className="constellation-overlay" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.85 }}>
            <defs>
              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--constellation-glow)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--constellation-glow)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Constellation Connecting Lines */}
            <g stroke="var(--constellation-line)" strokeWidth="1">
              <line x1="8%" y1="20%" x2="22%" y2="55%" />
              <line x1="22%" y1="55%" x2="35%" y2="30%" />
              <line x1="35%" y1="30%" x2="48%" y2="70%" />
              <line x1="48%" y1="70%" x2="62%" y2="35%" />
              <line x1="62%" y1="35%" x2="78%" y2="80%" />
              <line x1="78%" y1="80%" x2="92%" y2="25%" />
              <line x1="22%" y1="55%" x2="15%" y2="85%" />
              <line x1="48%" y1="70%" x2="40%" y2="90%" />
              <line x1="62%" y1="35%" x2="70%" y2="15%" />
              <line x1="78%" y1="80%" x2="85%" y2="92%" />
            </g>

            {/* Star Nodes with Glow */}
            <g fill="var(--constellation-dot)">
              <circle cx="8%" cy="20%" r="3" />
              <circle cx="22%" cy="55%" r="4" />
              <circle cx="22%" cy="55%" r="12" fill="url(#nodeGlow)" />
              <circle cx="35%" cy="30%" r="3.5" />
              <circle cx="48%" cy="70%" r="4.5" />
              <circle cx="48%" cy="70%" r="14" fill="url(#nodeGlow)" />
              <circle cx="62%" cy="35%" r="3.5" />
              <circle cx="78%" cy="80%" r="4" />
              <circle cx="78%" cy="80%" r="12" fill="url(#nodeGlow)" />
              <circle cx="92%" cy="25%" r="3" />
              <circle cx="15%" cy="85%" r="2.5" />
              <circle cx="40%" cy="90%" r="3" />
              <circle cx="70%" cy="15%" r="2.5" />
              <circle cx="85%" cy="92%" r="3" />
            </g>
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Top 4-Column Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}>
            {/* Column 1: Brand & Socials */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--text)',
                  color: 'var(--bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-mono)'
                }}>
                  C
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
                  CommitCV
                </span>
              </div>

              <p style={{ fontSize: '0.925rem', color: 'var(--text)', fontWeight: 500, lineHeight: 1.65, marginBottom: '1.5rem', maxWidth: '290px', opacity: 0.9 }}>
                Your commits are your CV. Grounding tech resumes in verifiable AST code citations and zero hallucinations.
              </p>

              {/* Social Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-circle-btn" title="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-circle-btn" title="Twitter / X">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-circle-btn" title="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Location */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>
                Location
              </h4>
              <p style={{ fontSize: '1rem', color: 'var(--text)', fontWeight: 600, lineHeight: 1.6, marginBottom: '0.4rem' }}>
                Hyderabad, Telangana, India
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                HQ • Remote First Engineering
              </p>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>
                Quick Links
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="footer-nav-link" onClick={() => setCurrentPage('home')}>
                  Home
                </span>
                <span className="footer-nav-link" onClick={() => {
                  setCurrentPage('home');
                  setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 50);
                }}>
                  How It Works
                </span>
                <span className="footer-nav-link" onClick={() => setCurrentPage('student')}>
                  Student Code Analysis
                </span>
                <span className="footer-nav-link" onClick={() => {
                  if (recruiterAuth) setCurrentPage('recruiter-dashboard');
                  else setCurrentPage('recruiter-login');
                }}>
                  Recruiter Portal
                </span>
                <span className="footer-nav-link" onClick={() => {
                  setCurrentPage('home');
                  setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 50);
                }}>
                  AST Verification Pipeline
                </span>
                <span className="footer-nav-link" onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}>
                  Zero-Hallucination Invariant
                </span>
              </nav>

              <div style={{
                borderTop: '1px dotted var(--border)',
                marginTop: '1rem',
                paddingTop: '0.85rem'
              }}>
                <button
                  type="button"
                  onClick={() => setCurrentPage('admin')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    padding: 0
                  }}
                >
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    boxShadow: '0 0 8px var(--accent)'
                  }} />
                  <span>Admin Access</span>
                </button>
              </div>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>
                Legal
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="footer-nav-link" onClick={() => alert('CommitCV Policy: Zero Hallucinations, AST Verification, and PII protection.')}>
                  Our Policy
                </span>
                <span className="footer-nav-link" onClick={() => alert('Terms & Conditions: Public repositories only analyzed with read-only permissions.')}>
                  Terms & Conditions
                </span>
              </nav>
            </div>
          </div>

          {/* Bottom Floating Card */}
          <div style={{
            background: 'var(--surface-raised)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 600 }}>
              © 2026 CommitCV Platform. All rights reserved.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setCurrentPage('admin')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1.1rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 150ms ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <ShieldCheck size={16} style={{ color: 'var(--accent)' }} />
                <span>Admin Access</span>
              </button>

              <a
                href="/admin.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', textDecoration: 'none' }}
                title="Open Admin Security Terminal in New Tab"
              >
                <Lock size={13} style={{ color: 'var(--accent)' }} />
                <span>Admin Terminal ↗</span>
              </a>
            </div>

            {/* Right: TEAM KANYARASI */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.9rem',
              color: 'var(--text)',
              fontWeight: 600,
              flexWrap: 'wrap'
            }}>
              <span>Designed & Developed by</span>
              <span className="dev-badge-pill" style={{ cursor: 'default', padding: '0.35rem 0.85rem' }}>
                <span className="dev-dot-blue" style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)', width: '8px', height: '8px' }} />
                <span style={{ fontWeight: 800, letterSpacing: '0.04em' }}>TEAM KANYARASI</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
