import React, { useState } from 'react';

const ROLE_PRESETS = {
  'Full-Stack MERN Developer': `We are seeking a Senior Full-Stack Engineer proficient in React, Node.js, Express, MongoDB, REST APIs, and state management. The ideal candidate must have proven experience building production web applications, database schema modeling, async error handling, and responsive UI components.`,
  'Senior Backend Engineer (Go/Distributed)': `Looking for a Backend Systems Engineer proficient in Golang, gRPC, microservices architecture, Docker, PostgreSQL, and Redis caching. Must have code proof of concurrency handling, clean package layout, and automated unit testing.`,
  'Frontend Architect (React/TypeScript)': `Seeking a Senior Frontend Architect proficient in React, TypeScript, Next.js, performance optimization, state management, micro-frontends, accessibility (a11y), and design systems. Candidates must demonstrate modular component architecture and automated UI test suites.`,
  'Cloud Native Infra Lead (DevOps/K8s)': `Seeking a DevOps Infrastructure Lead with experience in Kubernetes, Docker, Terraform, GitHub Actions CI/CD pipelines, AWS/GCP cloud services, and Prometheus monitoring.`,
  'AI / ML Systems Engineer (Python/RAG)': `Looking for an AI Engineer proficient in Python, PyTorch/TensorFlow, RAG architecture, vector embeddings, LLM integration, and containerized model deployment.`,
  'Python Backend & API Specialist (FastAPI)': `Seeking a Python Backend Specialist proficient in FastAPI, Django, PostgreSQL, Celery async task queues, Redis caching, Docker containerization, and REST/GraphQL API design.`,
  'Data Engineer & Pipeline Lead (Spark/Airflow)': `Seeking a Data Engineer proficient in Python, SQL, Apache Spark, Airflow DAG orchestration, Snowflake/BigQuery data warehousing, ETL pipeline automation, and data validation frameworks.`,
  'Cybersecurity & AppSec Specialist (OAuth/JWT)': `Looking for an Application Security Specialist with experience in OAuth2/JWT security patterns, SAST/DAST code vulnerability scanning, penetration testing, CORS configuration, and zero-trust backend architecture.`,
  'Mobile Application Engineer (React Native)': `Seeking a Senior Mobile Engineer skilled in React Native or Flutter, iOS/Android native bridges, offline storage sync, Push Notifications, and App Store automated CI/CD deployments.`,
  'Custom Role / Other': ``
};

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
  handleAnalyzeUsername,
  setCurrentPage
}) {
  const [roleTitle, setRoleTitle] = useState('Full-Stack MERN Developer');
  const [shortlisted, setShortlisted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Unlinked: Only updates role title state, does NOT overwrite recruiterJd
  const handleRoleChange = (selected) => {
    setRoleTitle(selected);
  };

  // Optional template loader if recruiter explicitly wants to load starting template
  const handleLoadSampleTemplate = () => {
    if (ROLE_PRESETS[roleTitle]) {
      setRecruiterJd(ROLE_PRESETS[roleTitle]);
    }
  };

  const cleanHandleDisplay = (input) => {
    let handle = (input || 'HAREESSHP').trim();
    if (handle.includes('github.com/')) {
      handle = handle.split('github.com/')[1].replace(/\/$/, '').split('/')[0];
    }
    return handle.replace(/^@/, '');
  };

  const handleCopySummary = () => {
    if (!jdMatchResult) return;
    const activeHandle = cleanHandleDisplay(candidateHandle);
    const summaryText = `CommitCV Candidate Evaluation Report:
Role: ${roleTitle}
Candidate: @${activeHandle}
Match Score: ${jdMatchResult.matchScore}% (${jdMatchResult.verdict})
Verified Code Proof Skills: ${jdMatchResult.matchedSkills.join(', ')}
Missing Skills: ${jdMatchResult.missingSkills.join(', ')}
Summary: ${jdMatchResult.assessmentSummary}
Evaluated by: ${recruiterAuth?.org || 'Recruiter Portal'} [ID: ${recruiterAuth?.recruiterId || 'CV-101'}]`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <main style={{ flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '2.5rem 1.5rem 1.5rem 1.5rem', background: 'var(--bg)', color: 'var(--text)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Executive Professional Header */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
        }}>
          <div>
            <div style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.75rem', 
              color: 'var(--accent)', 
              fontWeight: 700, 
              letterSpacing: '0.05em', 
              marginBottom: '0.35rem' 
            }}>
              RECRUITER SCREENING PORTAL &bull; {recruiterAuth?.org || 'Stripe Enterprise'} [{recruiterAuth?.recruiterId || 'REC-8192-STRIPE'}]
            </div>
            <h1 style={{ fontSize: '1.75rem', margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Candidate Evaluation &amp; Code Screening
            </h1>
          </div>

          <button
            type="button"
            className="btn-pill-secondary"
            onClick={() => {
              setRecruiterAuth(null);
              setCurrentPage('home');
            }}
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.88rem' }}
          >
            Sign Out
          </button>
        </div>

        {/* Single-Column Stacked Screening Workspace (Inputs on Top, Response Below) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '860px', margin: '0 auto' }}>
          
          {/* LEFT COLUMN: Clean Labeled Form (Role -> Description -> URL/Username) */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            boxShadow: '0 12px 36px rgba(0,0,0,0.05)'
          }}>
            
            {/* 1. Labeled Role Selection Input */}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                1. TARGET ROLE / POSITION TITLE:
              </label>
              
              <select
                value={roleTitle}
                onChange={(e) => handleRoleChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {Object.keys(ROLE_PRESETS).map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* 2. Job Description Below Role */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '0.04em' }}>
                  2. JOB DESCRIPTION (CUSTOM REQUIREMENTS):
                </label>
                {ROLE_PRESETS[roleTitle] && (
                  <button
                    type="button"
                    onClick={handleLoadSampleTemplate}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent)',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      padding: 0
                    }}
                  >
                    Load Sample Template
                  </button>
                )}
              </div>
              <textarea
                rows={8}
                value={recruiterJd}
                onChange={(e) => setRecruiterJd(e.target.value)}
                placeholder="Paste or type any custom job description requirements (e.g. React, Node.js, Express, Go, Python, Docker...)"
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--text)',
                  lineHeight: 1.55,
                  resize: 'vertical',
                  outline: 'none'
                }}
              />
            </div>

            {/* 3. Username / Profile URL Option Below Job Description */}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                3. CANDIDATE GITHUB USERNAME OR PROFILE URL:
              </label>
              <input 
                type="text"
                placeholder="e.g. HAREESSHP or https://github.com/HAREESSHP"
                value={candidateHandle}
                onChange={(e) => setCandidateHandle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88rem',
                  color: 'var(--text)',
                  outline: 'none'
                }}
              />
            </div>

            {/* Screening Action Button */}
            <button 
              type="button"
              className="btn-pill"
              disabled={matchingJd || !candidateHandle.trim()}
              onClick={() => {
                setShortlisted(false);
                handleRunJdMatch();
              }}
              style={{ marginTop: '0.5rem', padding: '0.8rem 1.4rem', justifyContent: 'center' }}
            >
              <span>{matchingJd ? 'Screening Code Base...' : 'Run Candidate Code Audit'}</span>
            </button>
          </div>

          {/* BOTTOM SECTION: Clean Executive Screening Insights Response (Positioned Directly Below Inputs) */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            boxShadow: '0 12px 36px rgba(0,0,0,0.05)'
          }}>
            <div>
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.75rem', 
                color: 'var(--muted)', 
                fontWeight: 700, 
                letterSpacing: '0.05em', 
                marginBottom: '0.35rem' 
              }}>
                SCREENING EVALUATION REPORT
              </div>
              <h2 style={{ fontSize: '1.35rem', margin: 0, fontFamily: 'var(--font-heading)' }}>
                Candidate Fit &amp; Code Evidence
              </h2>
            </div>

            {jdMatchResult ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Candidate Overview Card */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>
                      @{cleanHandleDisplay(candidateHandle)}
                    </div>
                    <a 
                      href={`https://github.com/${cleanHandleDisplay(candidateHandle)}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '0.8rem', color: 'var(--accent)', textDecoration: 'none' }}
                    >
                      github.com/{cleanHandleDisplay(candidateHandle)}
                    </a>
                  </div>

                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--neon-bg)',
                    color: 'var(--accent)',
                    border: '1px solid var(--border)',
                    fontWeight: 700
                  }}>
                    CODE PROVEN
                  </span>
                </div>

                {/* Score Card */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.4rem 1.75rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--accent)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 700, display: 'block' }}>
                      JD COMPLIANCE SCORE
                    </span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)', marginTop: '0.25rem' }}>
                      {jdMatchResult.verdict}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.75rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
                      {jdMatchResult.matchScore}%
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Verified Code Proof</span>
                  </div>
                </div>

                {/* 1. Skill Badges Audit (VERIFIED, PARTIAL, UNSUPPORTED) */}
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 700, display: 'block', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
                    1. JOB REQUIREMENT SKILL AUDIT (VERIFIED / PARTIAL / UNSUPPORTED):
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    {(jdMatchResult.skillBadges && jdMatchResult.skillBadges.length > 0 ? jdMatchResult.skillBadges : jdMatchResult.matchedSkills.map(s => ({ skill: s, proofState: 'VERIFIED', citationFile: 'package.json:L24' }))).map((b, bIdx) => {
                      const state = b.proofState || 'UNSUPPORTED';
                      const isVerified = state === 'VERIFIED';
                      const isPartial = state === 'PARTIAL';
                      const badgeBg = isVerified ? 'var(--neon-bg)' : isPartial ? 'rgba(245, 158, 11, 0.1)' : 'var(--proof-unsupported-bg)';
                      const badgeColor = isVerified ? 'var(--accent)' : isPartial ? '#f59e0b' : 'var(--proof-unsupported)';
                      const badgeBorder = isVerified ? 'var(--accent)' : isPartial ? '#f59e0b' : 'var(--border)';

                      return (
                        <div key={bIdx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.65rem 0.85rem',
                          background: 'var(--bg)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.82rem'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <span style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.7rem',
                              padding: '0.15rem 0.5rem',
                              borderRadius: 'var(--radius-pill)',
                              background: badgeBg,
                              color: badgeColor,
                              border: `1px solid ${badgeBorder}`,
                              fontWeight: 700
                            }}>
                              [{state}]
                            </span>
                            <span style={{ fontWeight: 600, color: 'var(--text)' }}>{b.skill}</span>
                          </div>

                          {b.citationFile && b.citationFile !== 'N/A' && (
                            <a
                              href={b.fileUrl || `https://github.com/${cleanHandleDisplay(candidateHandle)}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', textDecoration: 'none' }}
                            >
                              {b.citationFile} ↗
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Evidence-Linked Strengths */}
                {jdMatchResult.evidenceStrengths && jdMatchResult.evidenceStrengths.length > 0 && (
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 700, display: 'block', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
                      2. EVIDENCE-LINKED CODE STRENGTHS (REPOSITORIES & FILES):
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {jdMatchResult.evidenceStrengths.map((ev, eIdx) => (
                        <div key={eIdx} style={{
                          padding: '0.85rem 1rem',
                          background: 'var(--bg)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.85rem'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                            <span style={{ fontWeight: 700, color: 'var(--text)' }}>{ev.claim}</span>
                            <a 
                              href={ev.fileUrl || `https://github.com/${cleanHandleDisplay(candidateHandle)}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', textDecoration: 'none' }}
                            >
                              {ev.repoName}/{ev.citationFile} ↗
                            </a>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.45, fontFamily: 'var(--font-mono)' }}>
                            "{ev.snippet}"
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Top Relevant Projects */}
                {jdMatchResult.topRelevantProjects && jdMatchResult.topRelevantProjects.length > 0 && (
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 700, display: 'block', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
                      3. TOP RELEVANT PROJECTS & JOB RELEVANCE:
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {jdMatchResult.topRelevantProjects.map((proj, pIdx) => (
                        <div key={pIdx} style={{
                          padding: '1rem 1.15rem',
                          background: 'var(--bg)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-md)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)' }}>{proj.name}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>
                              {proj.language} • {proj.stars} ★ • {proj.forks} forks
                            </span>
                          </div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text)', marginBottom: '0.45rem', lineHeight: 1.5 }}>
                            {proj.aiSummary}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                            Job Relevance: {proj.jobRelevance}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Commit and Activity Overview */}
                {jdMatchResult.activityOverview && (
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 700, display: 'block', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
                      4. COMMIT & ACTIVITY TELEMETRY OVERVIEW:
                    </span>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                      gap: '0.75rem',
                      padding: '1rem 1.15rem',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>CADENCE LABEL</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{jdMatchResult.activityOverview.consistencyLabel || 'Active Contributor'}</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>ANNUAL COMMITS</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{jdMatchResult.activityOverview.commitsLastYear || 0} commits</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>PUBLIC REPOS</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{jdMatchResult.activityOverview.publicRepos || 0} codebases</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>ACTIVE STREAK</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{jdMatchResult.activityOverview.streakDays || 0} days</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Neutral Gaps and Risk Audit */}
                {jdMatchResult.neutralGaps && jdMatchResult.neutralGaps.length > 0 && (
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 700, display: 'block', marginBottom: '0.65rem', letterSpacing: '0.04em' }}>
                      5. NEUTRAL TECHNICAL GAPS & RISK AUDIT:
                    </span>
                    <div style={{
                      padding: '1rem 1.15rem',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.45rem'
                    }}>
                      {jdMatchResult.neutralGaps.map((gap, gIdx) => (
                        <div key={gIdx} style={{ fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.5 }}>
                          • {gap}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Assessment Summary Box */}
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 700, display: 'block', marginBottom: '0.45rem' }}>
                    RECRUITER ASSESSMENT SUMMARY:
                  </span>
                  <div style={{
                    padding: '1.15rem 1.25rem',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    color: 'var(--text)'
                  }}>
                    {jdMatchResult.assessmentSummary}
                  </div>
                </div>

              </div>
            ) : (
              <div style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                color: 'var(--muted)',
                background: 'var(--bg)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)'
              }}>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.4rem 0', color: 'var(--text)', fontFamily: 'var(--font-heading)' }}>
                  Awaiting Evaluation
                </h3>
                <p style={{ margin: 0, fontSize: '0.88rem', maxWidth: '340px', lineHeight: 1.5, margin: '0 auto' }}>
                  Select a role title, enter the job description and candidate GitHub username/URL above, then click <strong>"Run Candidate Code Audit"</strong>.
                </p>
              </div>
            )}
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
