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
  handleRevokeToken
}) {
  const list = Array.isArray(tokensList) ? tokensList : [];
  const activeTokensCount = list.filter(t => t && t.status === 'Active').length;
  const uniqueOrgsCount = new Set(list.map(t => t && t.org).filter(Boolean)).size;

  return (
    <main style={{ flex: 1, padding: '3.5rem 0 5rem 0' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Executive Header Bar */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'var(--neon-bg)',
              border: '1px solid rgba(5, 150, 105, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)'
            }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h1 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  margin: 0
                }}>
                  Admin Control Center
                </h1>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  background: 'var(--neon-bg)',
                  color: 'var(--accent)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                  MongoDB Authority Connected
                </span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0.2rem 0 0 0' }}>
                Recruiter credential issuance, Employee ID derivation, and access tokens authority.
              </p>
            </div>
          </div>

          {/* Right Corner User & Sign Out */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.95rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem'
            }}>
              <User size={15} style={{ color: 'var(--accent)' }} />
              <span style={{ fontWeight: 700, color: 'var(--text)' }}>@{adminAuth?.username || 'commitcv@1'}</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>&bull; Super Admin</span>
            </div>

            <button
              type="button"
              onClick={handleAdminLogout}
              className="btn-pill-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1.1rem',
                fontSize: '0.85rem',
                color: '#f87171'
              }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
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
                  {list.map((tok) => (
                    <tr key={tok.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)' }}>
                        {tok.employeeId || 'EMP-7701'}
                      </td>
                      <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        {tok.id}
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
    </main>
  );
}
