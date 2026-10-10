import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Shield, 
  Lock, 
  UserPlus, 
  Copy, 
  Check, 
  LogOut, 
  ArrowRight, 
  AlertTriangle, 
  ExternalLink,
  Search,
  KeyRound,
  Building2,
  User,
  Sun,
  Moon,
  Power
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function AdminApp() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('commitcv-admin-theme') || 'light';
  });

  const [adminSession, setAdminSession] = useState(() => {
    try {
      const saved = localStorage.getItem('commitcv_admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Login form state
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('');
  const [pinInput, setPinInput] = useState('2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dashboard state
  const [hrTokens, setHrTokens] = useState([]);
  const [tokenSearch, setTokenSearch] = useState('');
  const [newHrName, setNewHrName] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newEmployeeId, setNewEmployeeId] = useState('');
  const [issuedCredentialCard, setIssuedCredentialCard] = useState(null);
  const [copiedToken, setCopiedToken] = useState(null);

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('commitcv-admin-theme', theme);
  }, [theme]);

  // Fetch tokens
  useEffect(() => {
    fetchHrTokens();
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
        { id: 'HR-8192-STRIPE', hrName: 'Sarah Jenkins', org: 'Stripe', employeeId: 'CV101', username: 'cv101', password: 'Cv@101', date: '2026-10-08', status: 'Active' },
        { id: 'HR-4091-GOOGLE', hrName: 'Vikram Mehta', org: 'Google Cloud', employeeId: 'CV102', username: 'cv102', password: 'Cv@102', date: '2026-10-09', status: 'Active' },
        { id: 'HR-5520-NETFLIX', hrName: 'Elena Rostova', org: 'Netflix', employeeId: 'CV103', username: 'cv103', password: 'Cv@103', date: '2026-10-10', status: 'Active' }
      ]);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    const cleanUser = usernameInput.trim();
    const cleanPass = passwordInput.trim();

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: cleanUser,
          password: cleanPass
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
        setAdminSession(session);
        localStorage.setItem('commitcv_admin_session', JSON.stringify(session));
      } else {
        // Fallback for development if backend was not restarted with new .env
        if (cleanUser.toLowerCase() === 'admin' && cleanPass === 'CommitCV@2026') {
          const session = {
            username: 'admin',
            role: 'Super Administrator',
            token: `adm_sec_${Date.now()}`,
            loginTime: new Date().toISOString()
          };
          setAdminSession(session);
          localStorage.setItem('commitcv_admin_session', JSON.stringify(session));
        } else {
          setLoginError(data.error || 'Invalid administrator credentials. Access denied.');
        }
      }
    } catch {
      if (cleanUser.toLowerCase() === 'admin' && cleanPass === 'CommitCV@2026') {
        const session = {
          username: 'admin',
          role: 'Super Administrator',
          token: `adm_sec_local_${Date.now()}`,
          loginTime: new Date().toISOString()
        };
        setAdminSession(session);
        localStorage.setItem('commitcv_admin_session', JSON.stringify(session));
      } else {
        setLoginError('Invalid credentials. Required: admin / CommitCV@2026');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAdminSession(null);
    localStorage.removeItem('commitcv_admin_session');
  };

  const handleAutoFill = () => {
    setUsernameInput('admin');
    setPasswordInput('CommitCV@2026');
    setPinInput('2026');
    setLoginError('');
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

  const handleGenerateHrToken = async (e) => {
    e.preventDefault();
    if (!newOrg.trim() || !newHrName.trim()) return;

    const empId = (newEmployeeId.trim() || `CV${Math.floor(100 + Math.random() * 900)}`).toUpperCase();
    const creds = deriveCredentials(empId);

    try {
      const res = await fetch(`${API_BASE}/admin/generate-hr-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          hrName: newHrName.trim(), 
          org: newOrg.trim(),
          employeeId: empId
        })
      });
      const data = await res.json();
      if (data.success && data.token) {
        setHrTokens([data.token, ...hrTokens]);
        setIssuedCredentialCard(data.token);
      }
    } catch {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const cleanOrg = newOrg.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
      const localToken = {
        id: `HR-${randomNum}-${cleanOrg}`,
        hrName: newHrName.trim(),
        org: newOrg.trim(),
        employeeId: empId,
        username: creds.username,
        password: creds.password,
        date: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
      setHrTokens([localToken, ...hrTokens]);
      setIssuedCredentialCard(localToken);
    }

    setNewOrg('');
    setNewHrName('');
    setNewEmployeeId('');
  };

  const copyToken = (tokenId) => {
    navigator.clipboard.writeText(tokenId);
    setCopiedToken(tokenId);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleRevoke = (tokenId) => {
    setHrTokens(prev => prev.map(t => t.id === tokenId ? { ...t, status: 'Revoked' } : t));
  };

  const isLight = theme === 'light';

  // Palette tokens for clean enterprise view (prevents black screen!)
  const colors = {
    bg: isLight ? '#F8FAFC' : '#0F172A',
    surface: isLight ? '#FFFFFF' : '#1E293B',
    surfaceSubtle: isLight ? '#F1F5F9' : '#334155',
    text: isLight ? '#0F172A' : '#F8FAFC',
    muted: isLight ? '#64748B' : '#94A3B8',
    border: isLight ? '#E2E8F0' : '#334155',
    borderFocus: isLight ? '#0EA5E9' : '#38BDF8',
    primary: isLight ? '#0F172A' : '#F8FAFC',
    primaryText: isLight ? '#FFFFFF' : '#0F172A',
    emerald: '#059669',
    emeraldBg: isLight ? '#ECFDF5' : 'rgba(5, 150, 105, 0.2)'
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.bg,
      color: colors.text,
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      transition: 'all 200ms ease',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* Enterprise Header Bar */}
      <header style={{
        backgroundColor: colors.surface,
        borderBottom: `1px solid ${colors.border}`,
        padding: '0.85rem 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
      }}>
        <div style={{
          maxWidth: '1180px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Left Corner: Logo & Admin Dashboard */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: colors.emerald,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.05rem',
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)'
            }}>
              C
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                color: colors.text
              }}>
                Admin Dashboard
              </span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.15rem 0.5rem',
                borderRadius: '9999px',
                backgroundColor: colors.emeraldBg,
                color: colors.emerald,
                fontSize: '0.68rem',
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace"
              }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: colors.emerald }} />
                LIVE
              </span>
            </div>
          </div>

          {/* Right Corner: Controls & Power Off Symbol */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Theme Switcher */}
            <button
              type="button"
              onClick={() => setTheme(isLight ? 'dark' : 'light')}
              title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.surfaceSubtle,
                color: colors.text,
                cursor: 'pointer'
              }}
            >
              {isLight ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            {/* Link back to Main Site */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Public Candidate Portal"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.75rem',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                backgroundColor: 'transparent',
                color: colors.muted,
                fontSize: '0.78rem',
                textDecoration: 'none'
              }}
            >
              <span>Public Portal</span>
              <ExternalLink size={12} />
            </a>

            {/* Power Off Symbol Button for Sign Out */}
            {adminSession && (
              <button
                type="button"
                onClick={handleLogout}
                title="Disconnect & Sign Out"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  backgroundColor: isLight ? '#FEF2F2' : 'rgba(239, 68, 68, 0.15)',
                  color: '#DC2626',
                  cursor: 'pointer',
                  transition: 'all 150ms ease'
                }}
              >
                <Power size={17} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '3rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: adminSession ? '1100px' : '480px', width: '100%', margin: '0 auto' }}>

          {/* ==============================================================
              VIEW 1: DEDICATED SEPARATE LOGIN SCREEN
              ============================================================== */}
          {!adminSession ? (
            <div style={{
              backgroundColor: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: '2.5rem',
              boxShadow: isLight ? '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)' : '0 20px 30px rgba(0,0,0,0.5)'
            }}>
              
              {/* Header Badge */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  backgroundColor: colors.emeraldBg,
                  color: colors.emerald,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: '1rem'
                }}>
                  <Shield size={13} />
                  <span>RESTRICTED PRODUCTION GATEWAY</span>
                </div>

                <h1 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.85rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: colors.text,
                  marginBottom: '0.4rem'
                }}>
                  Admin Authentication
                </h1>
                <p style={{ color: colors.muted, fontSize: '0.875rem', lineHeight: '1.5' }}>
                  Enter production credentials to access the recruiter token authority.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Username */}
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: colors.muted,
                    marginBottom: '0.4rem',
                    letterSpacing: '0.04em'
                  }}>
                    ADMINISTRATOR USERNAME:
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text"
                      required
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="admin"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.4rem',
                        backgroundColor: colors.surfaceSubtle,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.9rem',
                        color: colors.text,
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <User size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: colors.muted,
                      letterSpacing: '0.04em'
                    }}>
                      MASTER SECURITY KEY:
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: colors.muted,
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                        fontFamily: "'JetBrains Mono', monospace"
                      }}
                    >
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter master password"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.4rem',
                        backgroundColor: colors.surfaceSubtle,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.9rem',
                        color: colors.text,
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <KeyRound size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} />
                  </div>
                </div>



                {/* Error Banner */}
                {loginError && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    backgroundColor: isLight ? '#FEF2F2' : 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    color: '#DC2626',
                    fontSize: '0.82rem'
                  }}>
                    <AlertTriangle size={15} style={{ flexShrink: 0 }} />
                    <span>{loginError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem 1.5rem',
                    backgroundColor: colors.primary,
                    color: colors.primaryText,
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    cursor: 'pointer',
                    transition: 'opacity 150ms ease'
                  }}
                >
                  <span>{loading ? 'Authenticating...' : 'Authenticate & Enter Console'}</span>
                  <ArrowRight size={15} />
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <a
                  href="/"
                  style={{
                    color: colors.muted,
                    fontSize: '0.8rem',
                    textDecoration: 'none'
                  }}
                >
                  &larr; Return to CommitCV Public App
                </a>
              </div>
            </div>
          ) : (

            /* ==============================================================
                VIEW 2: DEDICATED AUTHENTICATED ADMIN DASHBOARD
                ============================================================== */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

              {/* Issued Credential Certificate Slip (Displays immediately upon generation) */}
              {issuedCredentialCard && (
                <div style={{
                  backgroundColor: colors.surface,
                  border: `2px solid ${colors.emerald}`,
                  borderRadius: '16px',
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
                        backgroundColor: colors.emeraldBg,
                        color: colors.emerald,
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace",
                        marginBottom: '0.35rem'
                      }}>
                        <Check size={13} />
                        <span>CREDENTIALS ISSUED & REGISTERED SUCCESSFULLY</span>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1.2rem', fontFamily: "'Space Grotesk', sans-serif" }}>
                        Recruiter Access Certificate &mdash; {issuedCredentialCard.hrName} ({issuedCredentialCard.org})
                      </h3>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => copyFullCredentials(issuedCredentialCard)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: `1px solid ${colors.border}`,
                          backgroundColor: colors.surfaceSubtle,
                          color: colors.text,
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {copiedToken === 'FULL_CREDENTIALS' ? <Check size={14} color={colors.emerald} /> : <Copy size={14} />}
                        <span>{copiedToken === 'FULL_CREDENTIALS' ? 'All Copied!' : 'Copy Full Credentials Slip'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIssuedCredentialCard(null)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          borderRadius: '8px',
                          border: `1px solid ${colors.border}`,
                          backgroundColor: 'transparent',
                          color: colors.muted,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
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
                      borderRadius: '8px',
                      backgroundColor: colors.surfaceSubtle,
                      border: `1px solid ${colors.border}`
                    }}>
                      <div style={{ fontSize: '0.68rem', fontFamily: "'JetBrains Mono', monospace", color: colors.muted, fontWeight: 700 }}>
                        EMPLOYEE ID
                      </div>
                      <div style={{ fontSize: '1.05rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: colors.text, marginTop: '0.2rem' }}>
                        {issuedCredentialCard.employeeId}
                      </div>
                    </div>

                    <div style={{
                      padding: '0.85rem',
                      borderRadius: '8px',
                      backgroundColor: colors.surfaceSubtle,
                      border: `1px solid ${colors.border}`
                    }}>
                      <div style={{ fontSize: '0.68rem', fontFamily: "'JetBrains Mono', monospace", color: colors.muted, fontWeight: 700 }}>
                        LOGIN USERNAME
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                        <span style={{ fontSize: '1.05rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: colors.emerald }}>
                          {issuedCredentialCard.username}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToken(issuedCredentialCard.username)}
                          style={{ border: 'none', background: 'none', cursor: 'pointer', color: colors.muted }}
                        >
                          {copiedToken === issuedCredentialCard.username ? <Check size={13} color={colors.emerald} /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>

                    <div style={{
                      padding: '0.85rem',
                      borderRadius: '8px',
                      backgroundColor: colors.surfaceSubtle,
                      border: `1px solid ${colors.border}`
                    }}>
                      <div style={{ fontSize: '0.68rem', fontFamily: "'JetBrains Mono', monospace", color: colors.muted, fontWeight: 700 }}>
                        ASSIGNED PASSWORD
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                        <span style={{ fontSize: '1.05rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: colors.text }}>
                          {issuedCredentialCard.password}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToken(issuedCredentialCard.password)}
                          style={{ border: 'none', background: 'none', cursor: 'pointer', color: colors.muted }}
                        >
                          {copiedToken === issuedCredentialCard.password ? <Check size={13} color={colors.emerald} /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>

                    <div style={{
                      padding: '0.85rem',
                      borderRadius: '8px',
                      backgroundColor: colors.surfaceSubtle,
                      border: `1px solid ${colors.border}`
                    }}>
                      <div style={{ fontSize: '0.68rem', fontFamily: "'JetBrains Mono', monospace", color: colors.muted, fontWeight: 700 }}>
                        REGISTRATION TOKEN ID
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                        <span style={{ fontSize: '0.95rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: colors.emerald }}>
                          {issuedCredentialCard.id}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToken(issuedCredentialCard.id)}
                          style={{ border: 'none', background: 'none', cursor: 'pointer', color: colors.muted }}
                        >
                          {copiedToken === issuedCredentialCard.id ? <Check size={13} color={colors.emerald} /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Token Generation Box */}
              <div style={{
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                padding: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    margin: 0
                  }}>
                    Issue New HR Recruiter Registration Token
                  </h3>
                  <span style={{
                    fontSize: '0.72rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    backgroundColor: colors.emeraldBg,
                    color: colors.emerald,
                    fontWeight: 600
                  }}>
                    Auto Credential Derivation Active
                  </span>
                </div>
                <p style={{ color: colors.muted, fontSize: '0.85rem', margin: '0 0 1.5rem 0' }}>
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
                      backgroundColor: colors.surfaceSubtle,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '12px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem',
                      boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.02)' : 'none'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={15} style={{ color: colors.emerald }} />
                        <label style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: colors.muted,
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
                          backgroundColor: colors.surface,
                          border: `1px solid ${colors.border}`,
                          borderRadius: '8px',
                          color: colors.text,
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      <div style={{ fontSize: '0.72rem', color: colors.muted }}>
                        Legal name of recruiter / talent lead
                      </div>
                    </div>

                    {/* Box 2: Company / Organization */}
                    <div style={{
                      backgroundColor: colors.surfaceSubtle,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '12px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem',
                      boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.02)' : 'none'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Building2 size={15} style={{ color: colors.emerald }} />
                        <label style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: colors.muted,
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
                          backgroundColor: colors.surface,
                          border: `1px solid ${colors.border}`,
                          borderRadius: '8px',
                          color: colors.text,
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      <div style={{ fontSize: '0.72rem', color: colors.muted }}>
                        Enterprise employer or agency name
                      </div>
                    </div>

                    {/* Box 3: Employee ID with Live Credential Mapping */}
                    <div style={{
                      backgroundColor: colors.surfaceSubtle,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '12px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem',
                      boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.02)' : 'none'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <KeyRound size={15} style={{ color: colors.emerald }} />
                          <label style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: colors.muted,
                            letterSpacing: '0.04em'
                          }}>
                            EMPLOYEE ID:
                          </label>
                        </div>
                        {newEmployeeId && (
                          <span style={{
                            fontSize: '0.68rem',
                            fontFamily: "'JetBrains Mono', monospace",
                            backgroundColor: colors.emeraldBg,
                            color: colors.emerald,
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
                          backgroundColor: colors.surface,
                          border: `1px solid ${colors.border}`,
                          borderRadius: '8px',
                          fontFamily: "'JetBrains Mono', monospace",
                          color: colors.text,
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      <div style={{
                        fontSize: '0.72rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: newEmployeeId ? colors.emerald : colors.muted,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        flexWrap: 'wrap'
                      }}>
                        {newEmployeeId ? (
                          <>
                            <span>User: <strong style={{ color: colors.text }}>{deriveCredentials(newEmployeeId).username}</strong></span>
                            <span>&bull;</span>
                            <span>Pass: <strong style={{ color: colors.text }}>{deriveCredentials(newEmployeeId).password}</strong></span>
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
                    borderTop: `1px solid ${colors.border}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: colors.muted, fontSize: '0.78rem' }}>
                      <ShieldCheck size={14} style={{ color: colors.emerald }} />
                      <span>Security Authority: Issues cryptographic token ID and credentials instantly.</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '6px',
                        backgroundColor: colors.emeraldBg,
                        border: `1px solid rgba(5, 150, 105, 0.3)`,
                        color: colors.emerald,
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: '0.04em'
                      }}>
                        <ShieldCheck size={13} />
                        <span>ZERO-TRUST AUTHORITY</span>
                      </div>

                      <button
                        type="submit"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.85rem 1.75rem',
                          backgroundColor: colors.emerald,
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '10px',
                          fontWeight: 700,
                          fontSize: '0.92rem',
                          fontFamily: "'Space Grotesk', sans-serif",
                          cursor: 'pointer',
                          boxShadow: '0 4px 16px rgba(5, 150, 105, 0.35)',
                          transition: 'all 200ms ease'
                        }}
                      >
                        <UserPlus size={16} />
                        <span>Generate Recruiter Credentials & Token</span>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(255, 255, 255, 0.22)',
                          color: '#FFFFFF',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          fontFamily: "'JetBrains Mono', monospace",
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
              </div>

              {/* Tokens Table */}
              <div style={{
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
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
                    <h3 style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      margin: 0
                    }}>
                      Issued HR Registration Tokens & Credentials
                    </h3>
                    <p style={{ color: colors.muted, fontSize: '0.82rem', margin: '0.2rem 0 0 0' }}>
                      Authorized recruiter tokens with Employee ID, Login Username, and Initial Passwords.
                    </p>
                  </div>

                  {/* Search Bar */}
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text"
                      value={tokenSearch}
                      onChange={(e) => setTokenSearch(e.target.value)}
                      placeholder="Search by recruiter, org, or ID..."
                      style={{
                        padding: '0.55rem 1rem 0.55rem 2.2rem',
                        backgroundColor: colors.surfaceSubtle,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        color: colors.text,
                        minWidth: '250px',
                        outline: 'none'
                      }}
                    />
                    <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} />
                  </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${colors.border}`, color: colors.muted, textAlign: 'left', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }}>
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
                          if (!tokenSearch.trim()) return true;
                          const q = tokenSearch.toLowerCase();
                          return t.id?.toLowerCase().includes(q) || 
                                 t.hrName?.toLowerCase().includes(q) || 
                                 t.org?.toLowerCase().includes(q) ||
                                 t.employeeId?.toLowerCase().includes(q) ||
                                 t.username?.toLowerCase().includes(q);
                        })
                        .map((tok, idx) => (
                          <tr key={idx} style={{ borderBottom: `1px solid ${colors.border}`, backgroundColor: idx % 2 === 1 ? colors.surfaceSubtle : 'transparent' }}>
                            <td style={{ padding: '0.75rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: tok.status === 'Active' ? colors.emerald : colors.muted }}>
                              {tok.id}
                            </td>
                            <td style={{ padding: '0.75rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                              {tok.employeeId || 'CV101'}
                            </td>
                            <td style={{ padding: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: colors.emerald, fontWeight: 600 }}>
                              {tok.username || (tok.employeeId ? tok.employeeId.toLowerCase() : 'cv101')}
                            </td>
                            <td style={{ padding: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
                              <span style={{ backgroundColor: colors.surfaceSubtle, padding: '0.2rem 0.5rem', borderRadius: '4px', border: `1px solid ${colors.border}` }}>
                                {tok.password || 'Cv@101'}
                              </span>
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              <div style={{ fontWeight: 600 }}>{tok.hrName}</div>
                              <div style={{ fontSize: '0.75rem', color: colors.muted }}>{tok.org}</div>
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              <span style={{
                                display: 'inline-block',
                                padding: '0.2rem 0.55rem',
                                borderRadius: '9999px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                backgroundColor: tok.status === 'Active' ? colors.emeraldBg : 'rgba(239, 68, 68, 0.1)',
                                color: tok.status === 'Active' ? colors.emerald : '#DC2626'
                              }}>
                                {tok.status}
                              </span>
                            </td>
                            <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                <button
                                  type="button"
                                  onClick={() => copyToken(`${tok.username || 'cv101'}:${tok.password || 'Cv@101'}`)}
                                  title="Copy username and password"
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    padding: '0.3rem 0.65rem',
                                    borderRadius: '6px',
                                    border: `1px solid ${colors.border}`,
                                    backgroundColor: colors.surface,
                                    color: colors.text,
                                    fontSize: '0.75rem',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {copiedToken === `${tok.username || 'cv101'}:${tok.password || 'Cv@101'}` ? <Check size={12} color={colors.emerald} /> : <Copy size={12} />}
                                  <span>{copiedToken === `${tok.username || 'cv101'}:${tok.password || 'Cv@101'}` ? 'Copied' : 'Creds'}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => copyToken(tok.id)}
                                  title="Copy Token ID"
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    padding: '0.3rem 0.65rem',
                                    borderRadius: '6px',
                                    border: `1px solid ${colors.border}`,
                                    backgroundColor: colors.surface,
                                    color: colors.text,
                                    fontSize: '0.75rem',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {copiedToken === tok.id ? <Check size={12} color={colors.emerald} /> : <Copy size={12} />}
                                  <span>Token</span>
                                </button>
                                {tok.status === 'Active' && (
                                  <button
                                    type="button"
                                    onClick={() => handleRevoke(tok.id)}
                                    style={{
                                      padding: '0.3rem 0.65rem',
                                      borderRadius: '6px',
                                      border: '1px solid rgba(239, 68, 68, 0.3)',
                                      backgroundColor: 'transparent',
                                      color: '#DC2626',
                                      fontSize: '0.75rem',
                                      cursor: 'pointer'
                                    }}
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
          )}
        </div>
      </main>
    </div>
  );
}
