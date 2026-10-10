import React from 'react';
import { 
  Sparkles, 
  Terminal, 
  ArrowRight, 
  Laptop, 
  Briefcase, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  FileCode2,
  ShieldCheck,
  Check,
  X,
  FileText,
  UserCheck,
  Layers,
  Zap,
  Mail
} from 'lucide-react';

export default function StudentPage({
  githubInput,
  setGithubInput,
  analyzing,
  studentReport,
  handleAnalyzeUsername,
  setCurrentPage
}) {
  return (
    <main style={{ flex: 1 }}>
      
      {/* HERO SECTION */}
      <section className="section" style={{ paddingTop: '2.75rem', paddingBottom: '2.5rem' }}>
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="section-tag">
            <Sparkles size={13} />
            <span>CODE-GROUNDED RESUME ENGINE</span>
          </div>

          <h1 style={{ maxWidth: '980px', marginBottom: '1.5rem', lineHeight: 1.05, fontFamily: 'var(--font-heading)' }}>
            Your code is the resume. <br />
            <span style={{ color: 'var(--accent)' }}>Ground every claim in proof.</span>
          </h1>

          <p style={{ fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '680px', marginBottom: '2.5rem', color: 'var(--muted)' }}>
            Traditional resumes are filled with unverified buzzwords. CommitCV parses real GitHub code, commits, and manifest files to generate verifiable dossiers for students and exact JD matches for recruiters.
          </p>

          {/* Quick Input Form */}
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!githubInput.trim()) return;
            handleAnalyzeUsername(githubInput);
          }} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 0.5rem 0.5rem 1.5rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-pill)',
            width: '100%',
            maxWidth: '640px',
            marginBottom: '2rem',
            boxShadow: '0 12px 32px rgba(0,0,0,0.08)'
          }}>
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
                fontSize: '0.9rem',
                color: 'var(--text)'
              }}
            />
            <button 
              type="submit" 
              className="btn-pill"
              disabled={analyzing}
              style={{ padding: '0.45rem 0.5rem 0.45rem 1.25rem' }}
            >
              <span>{analyzing ? 'Scanning...' : 'Analyze Code'}</span>
              <div className="btn-pill-arrow">
                <ArrowRight size={14} />
              </div>
            </button>
          </form>

          {/* Preset Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', alignSelf: 'center' }}>Try demo profiles:</span>
            <button 
              type="button" 
              className="btn-pill-secondary" 
              style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}
              onClick={() => handleAnalyzeUsername('alex-chen')}
            >
              @alex-chen (Go/Cloud)
            </button>
            <button 
              type="button" 
              className="btn-pill-secondary" 
              style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}
              onClick={() => handleAnalyzeUsername('maya-patel')}
            >
              @maya-patel (React/TS)
            </button>
          </div>
        </div>
      </section>

      {/* STUDENT REPORT DOSSIER DISPLAY (If scanned) */}
      {studentReport && (
        <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Activity Overview Card */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
                  <img 
                    src={studentReport.avatar} 
                    alt={studentReport.name} 
                    style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid var(--accent)', objectFit: 'cover' }}
                  />
                  <div>
                    <h2 style={{ fontSize: '1.75rem', margin: 0, fontFamily: 'var(--font-heading)' }}>{studentReport.name}</h2>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', marginTop: '0.2rem' }}>
                      @{studentReport.username}
                    </div>
                  </div>

                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)' }}>ACTIVITY SCORE</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                      {studentReport.activity.score}/100
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
                  <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>CONSISTENCY STATUS</span>
                    <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.label}</span>
                  </div>
                  <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>ESTIMATED COMMITS</span>
                    <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.commitsLastYear} commits</span>
                  </div>
                  <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>PUBLIC REPOSITORIES</span>
                    <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.publicRepos} repos</span>
                  </div>
                  <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', display: 'block' }}>WEEKLY CADENCE</span>
                    <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{studentReport.activity.weeklyCadence}</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: 0 }}>
                  💡 <strong>Summary:</strong> {studentReport.activity.summary}
                </p>
              </div>

              {/* Verified Tech Stacks */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Verified Tech Stacks</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  {studentReport.techStacks.map((tech, idx) => (
                    <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.05rem' }}>{tech.name}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-pill)', background: 'var(--neon-bg)', color: 'var(--accent)' }}>
                          VERIFIED IN CODE
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted)', margin: '0.5rem 0' }}>
                        <span>{tech.type}</span>
                        <span>{tech.repos} Repositories</span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text)' }}>
                        Proficiency: <strong>{tech.level}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          SECTION 2: WHY TRADITIONAL SYSTEMS FAIL
          ==================================================================== */}
      <section id="why-commitcv" className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="section-tag">01 // THE PARADIGM SHIFT</div>
            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
              Why traditional hiring falls short
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--muted)', margin: '0 auto', maxWidth: '640px' }}>
              Skills are claimed on resumes, but rarely verified.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Card 1 */}
            <div style={{
              padding: '2rem',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#f87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AlertTriangle size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: 0, fontFamily: 'var(--font-heading)', lineHeight: 1.3 }}>
                Resumes can’t be trusted
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Anyone can list a skill. Recruiters have no quick way to check it.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{
              padding: '2rem',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.1)',
                color: '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileCode2 size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: 0, fontFamily: 'var(--font-heading)', lineHeight: 1.3 }}>
                GitHub is hard to read at scale
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Recruiters don’t have time to open dozens of profiles and read the code.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{
              padding: '2rem',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Terminal size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: 0, fontFamily: 'var(--font-heading)', lineHeight: 1.3 }}>
                AI scores come without proof
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Most tools give a number with no explanation, so nobody can trust it.
              </p>
            </div>

            {/* Card 4 */}
            <div style={{
              padding: '2rem',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(168, 85, 247, 0.1)',
                color: '#a855f7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Laptop size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: 0, fontFamily: 'var(--font-heading)', lineHeight: 1.3 }}>
                Students go unseen
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Good projects sit on GitHub while the resume stays weak, and talent gets missed.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: ADVANTAGES OF COMMITCV
          ==================================================================== */}
      <section id="advantages" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="section-tag">02 // CORE PROOF INVARIANTS</div>
            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
              Hire on proof, not claims
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--muted)', margin: '0 auto', maxWidth: '640px' }}>
              Every result is backed by real code.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Advantage 1 */}
            <div style={{
              padding: '1.75rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                <CheckCircle size={18} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>01 // PROOF FIRST</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: 0, fontFamily: 'var(--font-heading)' }}>Evidence-first analysis</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Our AI retrieves facts from the real repo before it says anything.
              </p>
            </div>

            {/* Advantage 2 */}
            <div style={{
              padding: '1.75rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                <CheckCircle size={18} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>02 // AST CITATION</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: 0, fontFamily: 'var(--font-heading)' }}>Every claim is cited</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Each strength links to the file or commit that proves it.
              </p>
            </div>

            {/* Advantage 3 */}
            <div style={{
              padding: '1.75rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                <CheckCircle size={18} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>03 // ZERO HALLUCINATION</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: 0, fontFamily: 'var(--font-heading)' }}>Honest by design</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                If there is no evidence, CommitCV says “No evidence found” instead of guessing.
              </p>
            </div>

            {/* Advantage 4 */}
            <div style={{
              padding: '1.75rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                <CheckCircle size={18} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>04 // SKILL TOKENS</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: 0, fontFamily: 'var(--font-heading)' }}>Verified skill labels</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Each skill is marked Verified, Partial or Unsupported.
              </p>
            </div>

            {/* Advantage 5 */}
            <div style={{
              padding: '1.75rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                <CheckCircle size={18} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>05 // STUDENT DOSSIER</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: 0, fontFamily: 'var(--font-heading)' }}>Ready resume in minutes</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Students get a resume built from their real projects.
              </p>
            </div>

            {/* Advantage 6 */}
            <div style={{
              padding: '1.75rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                <CheckCircle size={18} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>06 // RECRUITER RANKING</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: 0, fontFamily: 'var(--font-heading)' }}>Ranked shortlist for recruiters</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Candidates are ranked against the job description, with clear reasons.
              </p>
            </div>

            {/* Advantage 7 */}
            <div style={{
              padding: '1.75rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                <CheckCircle size={18} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>07 // UNBIASED INVARIANT</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: 0, fontFamily: 'var(--font-heading)' }}>Fair by design</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Scores are advisory, and name, photo and location are never used.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 4: HOW IT WORKS (STACKING CARDS)
          ==================================================================== */}
      <section id="how-it-works" className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="section-tag">03 // VERIFICATION PIPELINE</div>
            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
              From GitHub link to proof in three steps
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted)' }}>
              Card stack workflow for Students and Hiring Teams.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '840px', margin: '0 auto' }}>
            
            {/* Step 1 Card */}
            <div style={{
              position: 'sticky',
              top: '100px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.25rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.06)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 700 }}>
                  STEP 01
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)' }}>
                  INPUT INGESTION
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
                Step 1: Paste the GitHub link.
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <div style={{ background: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', display: 'block', fontWeight: 700, marginBottom: '0.2rem' }}>
                    FOR STUDENTS:
                  </span>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text)' }}>
                    Add your profile link.
                  </p>
                </div>

                <div style={{ background: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', display: 'block', fontWeight: 700, marginBottom: '0.2rem' }}>
                    FOR RECRUITERS:
                  </span>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text)' }}>
                    Add the job description and candidate links.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 Card */}
            <div style={{
              position: 'sticky',
              top: '130px',
              background: 'var(--bg)',
              border: '1px solid var(--accent)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.25rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 700 }}>
                  STEP 02
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)' }}>
                  AST CODE GROUNDING
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
                Step 2: AI reads the real code.
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <div style={{ background: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', display: 'block', fontWeight: 700, marginBottom: '0.2rem' }}>
                    FOR STUDENTS:
                  </span>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text)' }}>
                    It finds your strengths, roles and skill gaps.
                  </p>
                </div>

                <div style={{ background: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', display: 'block', fontWeight: 700, marginBottom: '0.2rem' }}>
                    FOR RECRUITERS:
                  </span>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text)' }}>
                    It matches each candidate to the job requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 Card */}
            <div style={{
              position: 'sticky',
              top: '160px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.25rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 700 }}>
                  STEP 03
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)' }}>
                  CITATION VERIFICATION
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
                Step 3: Get proof-backed results.
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <div style={{ background: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', display: 'block', fontWeight: 700, marginBottom: '0.2rem' }}>
                    FOR STUDENTS:
                  </span>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text)' }}>
                    Get a ready resume and a next project to build.
                  </p>
                </div>

                <div style={{ background: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', display: 'block', fontWeight: 700, marginBottom: '0.2rem' }}>
                    FOR RECRUITERS:
                  </span>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text)' }}>
                    Get a ranked shortlist and can ask questions about any candidate’s code.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5: CONTACT SECTION
          ==================================================================== */}
      <section id="contact" className="section">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="section-tag">04 // GET IN TOUCH</div>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
              Contact Team Kanyarasi
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
              Have questions about AST repository grounding or recruiter token integrations? Reach out to us.
            </p>
          </div>

          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem'
          }}>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for reaching out to Team Kanyarasi! We will get back to you shortly.');
            }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 700 }}>
                  YOUR NAME:
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter your name" 
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 700 }}>
                  EMAIL ADDRESS:
                </label>
                <input 
                  type="email" 
                  required 
                  placeholder="name@company.com" 
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 700 }}>
                  MESSAGE / INQUIRY:
                </label>
                <textarea 
                  rows={4} 
                  required 
                  placeholder="How can Team Kanyarasi assist you?" 
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn-pill" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                <Mail size={15} />
                <span>Send Message to Team Kanyarasi</span>
              </button>
            </form>
          </div>
        </div>
      </section>

    </main>
  );
}
