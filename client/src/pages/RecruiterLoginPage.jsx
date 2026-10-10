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
    <main style={{ flex: 1, padding: '4.5rem 0 6.5rem 0' }}>
      <div className="container" style={{ maxWidth: '580px' }}>
        
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
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Fill Credentials &rarr;</span>
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
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Fill Credentials &rarr;</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
