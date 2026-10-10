import React from 'react';
import { Briefcase, Key, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Zap } from 'lucide-react';

export default function RecruiterLoginPage({
  recruiterIdInput,
  setRecruiterIdInput,
  recruiterPasswordInput,
  setRecruiterPasswordInput,
  hrTokenInput,
  setHrTokenInput,
  hrPasswordInput,
  setHrPasswordInput,
  showPassword,
  setShowPassword,
  loginError,
  setLoginError,
  handleRecruiterLogin
}) {
  return (
    <main style={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      minHeight: 'calc(100vh - 140px)', 
      padding: '3rem 1.5rem 1rem 1.5rem' 
    }}>
      {/* Center: Login Card Container */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <div className="container" style={{ maxWidth: '560px', width: '100%' }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            boxShadow: '0 24px 50px rgba(0,0,0,0.14)'
          }}>
            <div className="section-tag">
              <Briefcase size={12} />
              <span>RECRUITER AUTHENTICATION</span>
            </div>

            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
              Recruiter Portal Login
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
              Enter your issued Recruiter Login ID (or Registration Token) and Password to access candidate screening and JD matching.
            </p>

            <form onSubmit={handleRecruiterLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Recruiter ID Field */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 700 }}>
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
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 700 }}>
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

              <button type="submit" className="btn-pill" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
                <Zap size={16} />
                <span>Login to Recruiter Dashboard</span>
                <div className="btn-pill-arrow">
                  <ArrowRight size={14} />
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Floating Single-Line Footer Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 'auto',
        marginBottom: 0
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          padding: '0.85rem 2rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-pill)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          width: 'fit-content',
          maxWidth: '100%',
          flexWrap: 'wrap'
        }}>
          <span style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.88rem' }}>
            © 2026 CommitCV Platform. All rights reserved.
          </span>
          <span style={{ color: 'var(--border)', userSelect: 'none' }}>|</span>
          <span style={{ color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, fontSize: '0.88rem' }}>
            <span>Designed &amp; Developed by</span>
            <span className="dev-badge-pill" style={{ cursor: 'default' }}>
              <span className="dev-dot-emerald" />
              <span>TEAM KANYARASI</span>
            </span>
          </span>
        </div>
      </div>
    </main>
  );
}
