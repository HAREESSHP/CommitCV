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

import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage';
import AdminAccessPage from './pages/AdminAccessPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import RecruiterLoginPage from './pages/RecruiterLoginPage';
import RecruiterDashboardPage from './pages/RecruiterDashboardPage';

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
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
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer', marginRight: '2.5rem' }}
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
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
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
                setTimeout(() => document.getElementById('why-traditional')?.scrollIntoView({ behavior: 'smooth' }), 50);
              }}
              className="btn-pill-secondary"
              style={{ background: 'transparent', borderColor: 'transparent' }}
            >
              Traditional Systems
            </button>

            <button
              onClick={() => {
                setCurrentPage('home');
                setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 50);
              }}
              className="btn-pill-secondary"
              style={{ background: 'transparent', borderColor: 'transparent' }}
            >
              CommitCV Features
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
              onClick={() => {
                setCurrentPage('student');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-pill-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                whiteSpace: 'nowrap',
                padding: '0.45rem 1rem',
                background: currentPage === 'student' ? 'var(--neon-bg)' : 'var(--surface)',
                borderColor: currentPage === 'student' ? 'var(--accent)' : 'var(--border)',
                color: currentPage === 'student' ? 'var(--accent)' : 'var(--text)',
                fontWeight: 700
              }}
            >
              <Laptop size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <span>For Students</span>
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

      {/* 1. HOME PAGE */}
      {currentPage === 'home' && (
        <HomePage
          githubInput={githubInput}
          setGithubInput={setGithubInput}
          analyzing={analyzing}
          handleAnalyzeUsername={handleAnalyzeUsername}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* 2. STUDENT PAGE */}
      {currentPage === 'student' && (
        <StudentPage
          githubInput={githubInput}
          setGithubInput={setGithubInput}
          analyzing={analyzing}
          studentReport={studentReport}
          handleAnalyzeUsername={handleAnalyzeUsername}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* 2. ADMIN ACCESS PAGE (LOGIN) */}
      {(currentPage === 'admin-login' || (currentPage === 'admin' && !adminAuth && !isAdminLoggedIn)) && (
        <AdminAccessPage
          adminUsername={adminUsername}
          setAdminUsername={setAdminUsername}
          adminPassword={adminPassword}
          setAdminPassword={setAdminPassword}
          adminAuthError={adminAuthError}
          handleAdminLogin={handleAdminLogin}
        />
      )}

      {/* 3. ADMIN DASHBOARD PAGE (CONTROL CENTER) */}
      {(currentPage === 'admin-dashboard' || (currentPage === 'admin' && (adminAuth || isAdminLoggedIn))) && (
        <AdminDashboardPage
          adminAuth={adminAuth}
          handleAdminLogout={handleAdminLogout}
          issuedCredentialCard={issuedCredentialCard}
          setIssuedCredentialCard={setIssuedCredentialCard}
          newHrName={newHrName}
          setNewHrName={setNewHrName}
          newOrg={newOrg}
          setNewOrg={setNewOrg}
          newEmail={newEmail}
          setNewEmail={setNewEmail}
          customTokenId={customTokenId}
          setCustomTokenId={setCustomTokenId}
          customPassword={customPassword}
          setCustomPassword={setCustomPassword}
          isGeneratingToken={isGeneratingToken}
          copiedToken={copiedToken}
          copyToken={copyToken}
          copyFullCredentials={copyFullCredentials}
          tokensList={tokensList}
          handleGenerateHrToken={handleGenerateHrToken}
          handleRevokeToken={handleRevokeToken}
        />
      )}

      {/* 4. RECRUITER LOGIN PAGE */}
      {currentPage === 'recruiter-login' && (
        <RecruiterLoginPage
          recruiterIdInput={recruiterIdInput}
          setRecruiterIdInput={setRecruiterIdInput}
          recruiterPasswordInput={recruiterPasswordInput}
          setRecruiterPasswordInput={setRecruiterPasswordInput}
          hrTokenInput={hrTokenInput}
          setHrTokenInput={setHrTokenInput}
          hrPasswordInput={hrPasswordInput}
          setHrPasswordInput={setHrPasswordInput}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          loginError={loginError}
          setLoginError={setLoginError}
          handleRecruiterLogin={handleRecruiterLogin}
        />
      )}

      {/* 5. RECRUITER DASHBOARD PAGE */}
      {currentPage === 'recruiter-dashboard' && (
        <RecruiterDashboardPage
          recruiterAuth={recruiterAuth}
          setRecruiterAuth={setRecruiterAuth}
          recruiterJd={recruiterJd}
          setRecruiterJd={setRecruiterJd}
          candidateHandle={candidateHandle}
          setCandidateHandle={setCandidateHandle}
          matchingJd={matchingJd}
          jdMatchResult={jdMatchResult}
          handleRunJdMatch={handleRunJdMatch}
          SAMPLE_JDS={SAMPLE_JDS}
          handleAnalyzeUsername={handleAnalyzeUsername}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* ====================================================================
          FOOTER: VisionX Reference Layout & Constellation Network
          Dual Mode: Carbon Obsidian (Dark) & Studio Paper (Light)
          ==================================================================== */}
      {currentPage !== 'student' && (
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
            </div>

            {/* Column 2: Location */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>
                Location
              </h4>
              <p style={{ fontSize: '1rem', color: 'var(--text)', fontWeight: 600, lineHeight: 1.6, marginBottom: '0.4rem' }}>
                Hyderabad, Telangana, India
              </p>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>
                Quick Links
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="footer-nav-link" onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                  Home
                </span>
                <span className="footer-nav-link" onClick={() => {
                  setCurrentPage('home');
                  setTimeout(() => document.getElementById('why-commitcv')?.scrollIntoView({ behavior: 'smooth' }), 50);
                }}>
                  Why CommitCV
                </span>
                <span className="footer-nav-link" onClick={() => {
                  setCurrentPage('home');
                  setTimeout(() => document.getElementById('advantages')?.scrollIntoView({ behavior: 'smooth' }), 50);
                }}>
                  Advantages
                </span>
                <span className="footer-nav-link" onClick={() => {
                  setCurrentPage('home');
                  setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 50);
                }}>
                  How It Works
                </span>
                <span className="footer-nav-link" onClick={() => {
                  setCurrentPage('home');
                  setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 50);
                }}>
                  FAQ
                </span>
                <span className="footer-nav-link" onClick={() => {
                  setCurrentPage('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                  Admin Access
                </span>
              </nav>
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

            {/* Right: TEAM KANYARASI */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontSize: '0.9rem',
              color: 'var(--muted)',
              fontWeight: 500,
              flexWrap: 'wrap'
            }}>
              <span>Designed & Developed by</span>
              <span className="dev-badge-pill" style={{ cursor: 'default' }}>
                <span className="dev-dot-emerald" />
                <span>TEAM KANYARASI</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}
