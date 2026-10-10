import React from 'react';
import { LogOut, Terminal, ArrowRight, Check, FileText } from 'lucide-react';

export default function RecruiterDashboardPage({
  recruiterAuth,
  setRecruiterAuth,
  recruiterJd,
  setRecruiterJd,
  candidateHandle,
  setCandidateHandle,
  matchingJd,
  jdMatchResult,
  handleRunJdMatch,
  SAMPLE_JDS,
  handleAnalyzeUsername,
  setCurrentPage
}) {
  return (
    <main style={{ flex: 1, padding: '3rem 0 5rem 0' }}>
      <div className="container">
        
        {/* Header Info Bar */}
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
                [{recruiterAuth?.org || 'Enterprise Partner'}] &bull; {recruiterAuth?.recruiterId}
              </span>
            </div>
            <h1 style={{ fontSize: '1.8rem', margin: 0, fontFamily: 'var(--font-heading)' }}>
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
              <h3 style={{ fontSize: '1.4rem', margin: 0, fontFamily: 'var(--font-heading)' }}>
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
                        {sk}
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

                {/* Assessment Summary */}
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
  );
}
