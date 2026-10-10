import React, { useState } from 'react';
import { ShieldCheck, User, Lock, AlertCircle, ArrowRight, Eye, EyeOff, Zap } from 'lucide-react';

export default function AdminAccessPage({
  adminUsername,
  setAdminUsername,
  adminPassword,
  setAdminPassword,
  adminAuthError,
  handleAdminLogin
}) {
  const [showPass, setShowPass] = useState(false);

  return (
    <main style={{ flex: 1, padding: '2.5rem 0 5.5rem 0', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '560px', width: '100%' }}>
        
        {/* Dedicated Admin Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ 
            fontSize: '1.95rem', 
            marginBottom: '0.45rem', 
            fontFamily: 'var(--font-heading)', 
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap'
          }}>
            System Administrator Access
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.94rem', margin: 0, lineHeight: 1.55 }}>
            Restricted access gate for issuing HR Recruiter IDs, credentials, and partner authority tokens.
          </p>
        </div>

        {/* Exclusive Admin Login Box */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          boxShadow: '0 24px 50px rgba(0,0,0,0.14)'
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

          <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
            
            {/* Admin ID Field */}
            <div>
              <label style={{ 
                display: 'block', 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.75rem', 
                color: 'var(--muted)', 
                marginBottom: '0.45rem', 
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}>
                ADMIN ID:
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0 1rem',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-pill)'
              }}>
                <User size={16} style={{ color: 'var(--accent)' }} />
                <input 
                  type="text"
                  placeholder="Enter Admin ID"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.92rem',
                    color: 'var(--text)',
                    padding: '0.85rem 0',
                    fontWeight: 600
                  }}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label style={{ 
                display: 'block', 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.75rem', 
                color: 'var(--muted)', 
                marginBottom: '0.45rem', 
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}>
                PASSWORD:
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0 1rem',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-pill)'
              }}>
                <Lock size={16} style={{ color: 'var(--muted)' }} />
                <input 
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.92rem',
                    color: 'var(--text)',
                    padding: '0.85rem 0',
                    fontWeight: 600
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0 }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="btn-pill"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.85rem 1.5rem' }}
            >
              <Zap size={16} />
              <span>Login to Admin Dashboard</span>
              <div className="btn-pill-arrow">
                <ArrowRight size={14} />
              </div>
            </button>
          </form>

        </div>

      </div>
    </main>
  );
}
