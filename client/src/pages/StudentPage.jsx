import React from 'react';
import { 
  Sparkles, 
  Terminal, 
  ArrowRight, 
  Laptop, 
  CheckCircle, 
  FileCode2,
  GitCommit,
  Layers,
  Zap,
  TrendingUp,
  FileText,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

export default function StudentPage({
  githubInput,
  setGithubInput,
  analyzing,
  studentReport,
  handleAnalyzeUsername,
  setCurrentPage
}) {
  const [copiedLink, setCopiedLink] = React.useState(false);

  const copyShareLink = () => {
    const handle = studentReport ? studentReport.username : 'alex-chen';
    navigator.clipboard.writeText(`https://commitcv.com/student/${handle}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <main style={{ flex: 1 }}>
      
      {/* 1. STUDENT HERO & PROFILE SCANNER */}
      <section className="section" style={{ paddingTop: '1.25rem', paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ 
            maxWidth: '920px', 
            marginBottom: '1.25rem', 
            lineHeight: 1.05, 
            fontFamily: "'Space Grotesk', var(--font-heading), sans-serif",
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)'
          }}>
            Your commits are your CV. <br />
            <span style={{ color: 'var(--accent)' }}>Ground every claim in proof.</span>
          </h1>

          <p style={{ 
            fontSize: '1.15rem', 
            lineHeight: 1.6, 
            maxWidth: '680px', 
            marginBottom: '2.5rem', 
            color: 'var(--muted)' 
          }}>
            Traditional resumes rely on self-reported buzzwords. CommitCV ingests your public GitHub code, commits, and package manifests to build a proof-backed dossier with zero hallucinations.
          </p>

          {/* Quick GitHub Scan Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!githubInput.trim()) return;
              handleAnalyzeUsername(githubInput);
            }} 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.55rem 0.55rem 0.55rem 1.4rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-pill)',
              width: '100%',
              maxWidth: '620px',
              marginBottom: '1.5rem',
              boxShadow: '0 16px 40px rgba(0,0,0,0.1)'
            }}
          >
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
                fontSize: '0.925rem',
                color: 'var(--text)'
              }}
            />
            <button 
              type="submit" 
              className="btn-pill"
              disabled={analyzing}
              style={{ padding: '0.5rem 0.6rem 0.5rem 1.35rem', fontSize: '0.9rem' }}
            >
              <span>{analyzing ? 'Scanning Repos...' : 'Generate Dossier'}</span>
              <div className="btn-pill-arrow">
                <ArrowRight size={14} />
              </div>
            </button>
          </form>

        </div>
      </section>

      {/* 2. STUDENT REPORT DOSSIER DISPLAY (If scanned or active) */}
      {studentReport && (
        <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', paddingBottom: '6rem' }}>
          <div className="container">
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '1080px', margin: '0 auto' }}>
              
              {/* Profile Header Dossier Card */}
              <div style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', paddingBottom: '1.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                  <img 
                    src={studentReport.avatar} 
                    alt={studentReport.name} 
                    style={{ width: '84px', height: '84px', borderRadius: '50%', border: '3px solid var(--accent)', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <h2 style={{ fontSize: '2rem', margin: 0, fontFamily: "'Space Grotesk', var(--font-heading), sans-serif" }}>
                        {studentReport.name}
                      </h2>
                      <span className="section-tag" style={{ margin: 0, padding: '0.2rem 0.6rem', fontSize: '0.7rem' }}>
                        🔥 HIGHLY CONSISTENT
                      </span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent)', marginTop: '0.3rem', fontWeight: 600 }}>
                      @{studentReport.username} • GitHub Verified Profile
                    </div>
                  </div>

                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn-pill-secondary"
                      onClick={copyShareLink}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    >
                      {copiedLink ? <Check size={14} style={{ color: 'var(--accent)' }} /> : <Copy size={14} />}
                      <span>{copiedLink ? 'Link Copied!' : 'Share Dossier'}</span>
                    </button>
                    
                    <div style={{ textAlign: 'right', background: 'var(--surface)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 700 }}>ACTIVITY SCORE</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.25rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
                        {studentReport.activity.score}<span style={{ fontSize: '1.1rem', color: 'var(--muted)' }}>/100</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginTop: '1.75rem' }}>
                  <div style={{ background: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block', fontWeight: 700, marginBottom: '0.25rem' }}>CONSISTENCY STATUS</span>
                    <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.label}</span>
                  </div>
                  <div style={{ background: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block', fontWeight: 700, marginBottom: '0.25rem' }}>ESTIMATED COMMITS</span>
                    <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.commitsLastYear} commits / year</span>
                  </div>
                  <div style={{ background: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block', fontWeight: 700, marginBottom: '0.25rem' }}>PUBLIC REPOSITORIES</span>
                    <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.publicRepos} Repositories</span>
                  </div>
                  <div style={{ background: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block', fontWeight: 700, marginBottom: '0.25rem' }}>WEEKLY CADENCE</span>
                    <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.weeklyCadence}</span>
                  </div>
                </div>

                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem 1.25rem',
                  background: 'var(--neon-bg)',
                  border: '1px solid var(--accent)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem'
                }}>
                  <ShieldCheck size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <p style={{ fontSize: '0.925rem', color: 'var(--text)', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
                    <strong>AST Grounding Summary:</strong> {studentReport.activity.summary}
                  </p>
                </div>
              </div>

              {/* Verified Tech Stacks Section */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', margin: 0, fontFamily: "'Space Grotesk', var(--font-heading), sans-serif" }}>
                      Verified Tech Stacks & Skill Badges
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '0.25rem 0 0 0' }}>
                      Every badge is evaluated directly against AST code trees and repository manifests.
                    </p>
                  </div>
                  <span className="section-tag" style={{ margin: 0 }}>VERIFIED IN SOURCE CODE</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {studentReport.techStacks.map((tech, idx) => (
                    <div key={idx} style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", fontWeight: 700, fontSize: '1.15rem', color: 'var(--text)' }}>
                          {tech.name}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '0.25rem 0.6rem',
                          borderRadius: 'var(--radius-pill)',
                          background: 'var(--proof-verified-bg)',
                          color: 'var(--proof-verified)',
                          border: '1px solid var(--proof-verified)'
                        }}>
                          VERIFIED
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        <span>{tech.type}</span>
                        <span style={{ fontFamily: 'var(--font-mono)' }}>{tech.repos} Repos</span>
                      </div>

                      <div style={{
                        padding: '0.65rem 0.85rem',
                        background: 'var(--bg)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text)'
                      }}>
                        Level: <strong style={{ color: 'var(--accent)' }}>{tech.level}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Citation & Proof Stream */}
              {studentReport.citations && studentReport.citations.length > 0 && (
                <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
                  <div style={{ marginBottom: '1.75rem' }}>
                    <h3 style={{ fontSize: '1.5rem', margin: 0, fontFamily: "'Space Grotesk', var(--font-heading), sans-serif" }}>
                      AST Code Citations & Verifiable Claims
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '0.25rem 0 0 0' }}>
                      Concrete proof tokens extracted from public repository files.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {studentReport.citations.map((cite, idx) => (
                      <div key={idx} style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.85rem'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent)' }}>
                            CLAIM: {cite.claim}
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            padding: '0.2rem 0.6rem',
                            borderRadius: 'var(--radius-pill)',
                            background: 'var(--neon-bg)',
                            color: 'var(--accent)',
                            border: '1px solid var(--accent)'
                          }}>
                            {cite.repo}
                          </span>
                        </div>

                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.82rem',
                          background: 'var(--bg)',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border)',
                          color: 'var(--text)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <FileCode2 size={15} style={{ color: 'var(--accent)' }} />
                          <span>Citation: {cite.file}</span>
                          <span style={{ marginLeft: 'auto', color: 'var(--muted)', fontSize: '0.75rem' }}>
                            Commit: {cite.commit}
                          </span>
                        </div>

                        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                          {cite.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Next Projects */}
              {studentReport.recommendedRoles && (
                <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
                  <div style={{ marginBottom: '1.75rem' }}>
                    <h3 style={{ fontSize: '1.5rem', margin: 0, fontFamily: "'Space Grotesk', var(--font-heading), sans-serif" }}>
                      Recommended Target Roles & Next Projects
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '0.25rem 0 0 0' }}>
                      AI-recommended projects to build next to level up candidate match scores.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                    {studentReport.recommendedRoles.map((role, idx) => (
                      <div key={idx} style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h4 style={{ fontSize: '1.15rem', margin: 0, fontFamily: "'Space Grotesk', var(--font-heading), sans-serif" }}>
                            {role.role}
                          </h4>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)' }}>
                            {role.match}%
                          </span>
                        </div>

                        <div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                            MATCHING SKILLS:
                          </span>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {role.matchingSkills.map((s, i) => (
                              <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: 'var(--neon-bg)', color: 'var(--accent)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>
                                ✓ {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#f87171', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                            RECOMMENDED PROJECT TO BUILD NEXT:
                          </span>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {role.missingSkills.map((s, i) => (
                              <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>
                                + Add {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </section>
      )}

    </main>
  );
}
