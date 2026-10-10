import React from 'react';
import { 
  ShieldCheck, 
  User, 
  LogOut, 
  Check, 
  Copy, 
  Building2, 
  FileText, 
  Key, 
  Lock, 
  Zap, 
  Layers,
  Award,
  Shield,
  Activity,
  UserCheck
} from 'lucide-react';

export default function AdminDashboardPage({
  adminAuth,
  handleAdminLogout,
  issuedCredentialCard,
  setIssuedCredentialCard,
  newHrName,
  setNewHrName,
  newOrg,
  setNewOrg,
  newEmail,
  setNewEmail,
  customTokenId,
  setCustomTokenId,
  customPassword,
  setCustomPassword,
  isGeneratingToken,
  copiedToken,
  copyToken,
  copyFullCredentials,
  tokensList,
  handleGenerateHrToken,
  handleRevokeToken,
  handleDeleteToken
}) {
  const list = Array.isArray(tokensList) ? tokensList : [];
  const activeTokensCount = list.filter(t => t && t.status === 'Active').length;
  const uniqueOrgsCount = new Set(list.map(t => t && t.org).filter(Boolean)).size;

  return (
    <main style={{ flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '2.5rem 0 1.5rem 0', background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="container" style={{ maxWidth: '1100px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Executive Administrative Header Bar */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.4rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.45rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                margin: 0
              }}>
                ADMIN CONTROL CENTER
              </h1>

              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.2rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--neon-bg)',
                color: 'var(--accent)',
                border: '1px solid var(--accent)',
                fontSize: '0.7rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.03em'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                MONGODB AUTHORITY CONNECTED
              </span>
            </div>

            <p style={{
              color: 'var(--muted)',
              fontSize: '0.85rem',
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontWeight: 500
            }}>
              Enterprise access governance, recruiter credential issuance, and Employee ID derivation authority.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.5rem 0.95rem',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem'
            }}>
              <span style={{ fontWeight: 700, color: 'var(--text)' }}>@{adminAuth?.username || 'commitcv@1'}</span>
              <span style={{ color: 'var(--border)' }}>|</span>
              <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.72rem' }}>SUPER ADMIN</span>
            </div>

            <button
              type="button"
              onClick={handleAdminLogout}
              className="btn-pill-secondary"
              style={{
                padding: '0.5rem 1.1rem',
                fontSize: '0.82rem',
                fontWeight: 600
              }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Executive Quick Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'var(--neon-bg)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UserCheck size={20} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>
                ACTIVE RECRUITERS
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)' }}>
                {activeTokensCount} Accounts
              </span>
            </div>
          </div>

          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'var(--neon-bg)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Building2 size={20} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>
                PARTNER ORGANIZATIONS
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)' }}>
                {uniqueOrgsCount} Companies
              </span>
            </div>
          </div>

          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'var(--neon-bg)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={20} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>
                AST CITATION ACCURACY
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>
                99.8% Grounded
              </span>
            </div>
          </div>

          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'var(--neon-bg)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Shield size={20} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>
                SECURITY PROTOCOL
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent)' }}>
                ENCRYPTED RAG-v2
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Issued Credential Certificate Slip */}
          {issuedCredentialCard && (
            <div style={{
              background: 'var(--surface)',
              border: '2px solid var(--accent)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              boxShadow: '0 12px 30px -5px rgba(5, 150, 105, 0.18)',
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
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
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
              <h3 style={{ margin: 0, fontSize: '1.3rem', fontFamily: 'var(--font-heading)' }}>Issue New HR Recruiter Credentials</h3>
              <span style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                background: 'var(--neon-bg)',
                color: 'var(--accent)',
                fontWeight: 700
              }}>
                Auto Rule: Emp ID 101 &rarr; ID: cv-101 | Pass: cv@101
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
              Enter HR recruiter details (Name, Company, Role, Emp ID). The system will automatically generate the corresponding Recruiter ID (`cv-101`) and Password (`cv@101`) for both uppercase and lowercase inputs.
            </p>

            <form onSubmit={handleGenerateHrToken} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* 4 Box Shaped Feature Containers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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
                      1. HR RECRUITER NAME:
                    </label>
                  </div>
                  <input 
                    type="text"
                    required
                    value={newHrName}
                    onChange={(e) => setNewHrName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
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
                </div>

                {/* Box 2: Company Name */}
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
                      2. COMPANY NAME:
                    </label>
                  </div>
                  <input 
                    type="text"
                    required
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    placeholder="e.g. Stripe, Google"
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
                </div>

                {/* Box 3: Role / Designation */}
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
                    <FileText size={15} style={{ color: 'var(--accent)' }} />
                    <label style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--muted)',
                      letterSpacing: '0.04em'
                    }}>
                      3. HR ROLE / DESIGNATION:
                    </label>
                  </div>
                  <input 
                    type="text"
                    required
                    value={newEmail || 'Senior Talent Recruiter'}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="e.g. Technical Recruiter"
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
                </div>

                {/* Box 4: Emp ID */}
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
                    <Key size={15} style={{ color: 'var(--accent)' }} />
                    <label style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--muted)',
                      letterSpacing: '0.04em'
                    }}>
                      4. EMP ID (e.g. 101 or 201):
                    </label>
                  </div>
                  <input 
                    type="text"
                    required
                    value={customTokenId}
                    onChange={(e) => setCustomTokenId(e.target.value)}
                    placeholder="e.g. 101 or 201 or CV-101"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Live Derived Credentials Preview Badge */}
              {customTokenId && (
                <div style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--accent)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={15} style={{ color: 'var(--accent)' }} />
                    <span>DERIVED CREDENTIALS:</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1.25rem' }}>
                    <span>Generated ID: <strong style={{ color: 'var(--accent)' }}>cv-{(customTokenId || '').toString().replace(/[^0-9a-zA-Z]/g, '').toLowerCase().replace(/^cv/, '') || '101'}</strong></span>
                    <span>Password: <strong style={{ color: 'var(--text)' }}>cv@{(customTokenId || '').toString().replace(/[^0-9a-zA-Z]/g, '').toLowerCase().replace(/^cv/, '') || '101'}</strong></span>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  className="btn-pill"
                  disabled={isGeneratingToken}
                  style={{ padding: '0.75rem 2rem' }}
                >
                  <Zap size={16} />
                  <span>{isGeneratingToken ? 'Generating...' : 'Generate HR Recruiter Credentials'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Tokens & Credentials Directory Table */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Issued Recruiter Credentials Directory</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: '0.2rem 0 0 0' }}>
                  List of all generated recruiter access tokens, employee IDs, and auth credentials.
                </p>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem'
              }}>
                <Layers size={13} style={{ color: 'var(--accent)' }} />
                <span>{list.length} Accounts Registered</span>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>
                    <th style={{ padding: '0.75rem' }}>EMPLOYEE ID</th>
                    <th style={{ padding: '0.75rem' }}>RECRUITER ID</th>
                    <th style={{ padding: '0.75rem' }}>LOGIN USERNAME</th>
                    <th style={{ padding: '0.75rem' }}>PASSWORD</th>
                    <th style={{ padding: '0.75rem' }}>HR NAME & ORG</th>
                    <th style={{ padding: '0.75rem' }}>STATUS</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {list.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--muted)', fontSize: '0.88rem' }}>
                        No HR recruiter accounts registered yet. Enter employee details in the form above to generate production credentials.
                      </td>
                    </tr>
                  ) : (
                    list.map((tok) => (
                      <tr key={tok.id || tok.recruiterId} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)' }}>
                          {tok.employeeId || 'CV-101'}
                        </td>
                        <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                          {tok.id || tok.recruiterId}
                        </td>
                        <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                          {tok.username || tok.hrName?.toLowerCase().replace(/\s+/g, '.') || 'recruiter'}
                        </td>
                        <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                            <span style={{
                              background: 'var(--bg)',
                              padding: '0.15rem 0.45rem',
                              borderRadius: '4px',
                              border: '1px solid var(--border)',
                              color: 'var(--text)',
                              fontSize: '0.75rem'
                            }}>
                              {tok.password || 'cv@101'}
                            </span>
                            <button
                              type="button"
                              onClick={() => copyToken(tok.password || 'cv@101')}
                              style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                              title="Copy password"
                            >
                              {copiedToken === (tok.password || 'cv@101') ? <Check size={12} color="var(--accent)" /> : <Copy size={12} />}
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
                              onClick={() => copyToken(tok.id || tok.recruiterId)}
                              className="btn-pill-secondary"
                              style={{ padding: '0.25rem 0.65rem', fontSize: '0.72rem' }}
                            >
                              {copiedToken === (tok.id || tok.recruiterId) ? <Check size={12} color="var(--accent)" /> : <Copy size={12} />}
                              <span>{copiedToken === (tok.id || tok.recruiterId) ? 'Copied' : 'Copy ID'}</span>
                            </button>
                            {tok.status === 'Active' && handleRevokeToken && (
                              <button
                                type="button"
                                onClick={() => handleRevokeToken(tok.id || tok.recruiterId)}
                                className="btn-pill-secondary"
                                title="Revoke access"
                                style={{ padding: '0.25rem 0.65rem', fontSize: '0.72rem', color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' }}
                              >
                                Revoke
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeleteToken && handleDeleteToken(tok.id || tok.recruiterId)}
                              className="btn-pill-secondary"
                              title="Delete HR Account permanently"
                              style={{ padding: '0.25rem 0.65rem', fontSize: '0.72rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.08)' }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
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
          paddingTop: '2.5rem',
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

      </div>
    </main>
  );
}
