import React from 'react';
import { ShieldCheck, User, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminAccessPage({
  adminUsername,
  setAdminUsername,
  adminPassword,
  setAdminPassword,
  adminAuthError,
  handleAdminLogin
}) {
  return (
    <main style={{ flex: 1, padding: '4rem 0 6rem 0', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '520px', width: '100%' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            background: 'var(--neon-bg)',
            color: 'var(--accent)',
            fontSize: '0.75rem',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            marginBottom: '1rem',
            border: '1px solid rgba(5, 150, 105, 0.25)'
          }}>
            <ShieldCheck size={14} />
            <span>PRODUCTION SECURITY GATEWAY</span>
          </div>
          
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
            Admin Security Access
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: 0 }}>
            Super Admin credential check for issuing HR Tokens and managing Recruiter accounts.
          </p>
        </div>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          {adminAuthError && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#f87171',
              fontSize: '0.85rem',
              marginBottom: '1.5rem'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{adminAuthError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 700 }}>
                ADMIN USERNAME
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0 1rem',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)'
              }}>
                <User size={16} style={{ color: 'var(--muted)' }} />
                <input 
                  type="text"
                  placeholder="admin"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    color: 'var(--text)',
                    padding: '0.85rem 0'
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 700 }}>
                SECURITY MASTER PASSWORD
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0 1rem',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)'
              }}>
                <Lock size={16} style={{ color: 'var(--muted)' }} />
                <input 
                  type="password"
                  placeholder="••••••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    color: 'var(--text)',
                    padding: '0.85rem 0'
                  }}
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="btn-pill"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.75rem 1.5rem' }}
            >
              <span>Authenticate & Enter Dashboard</span>
              <div className="btn-pill-arrow">
                <ArrowRight size={14} />
              </div>
            </button>
          </form>

          <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
              Default Admin Credentials: <strong>admin</strong> / <strong>admin123</strong>
            </span>
          </div>
        </div>

      </div>
    </main>
  );
}
