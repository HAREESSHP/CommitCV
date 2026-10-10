import React from 'react';
import { 
  Sparkles, 
  Terminal, 
  ArrowRight, 
  Laptop, 
  Briefcase,
  AlertTriangle, 
  CheckCircle, 
  FileCode2,
  Plus
} from 'lucide-react';

// Scroll-triggered Reveal Wrapper Component for Individual Cards
function RevealOnScroll({ children, className = '', style = {}, delay = '0s' }) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If card is already in upper viewport on mount, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${inView ? 'animate-fall-card' : ''}`}
      style={{
        opacity: inView ? undefined : 0,
        ...style,
        animationDelay: delay
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage({
  githubInput,
  setGithubInput,
  analyzing,
  handleAnalyzeUsername,
  setCurrentPage
}) {
  // Looping Typewriter Effect State
  const line1Full = "Your commits are your CV.";
  const line2Full = "Every claim comes with proof.";

  const [typed1, setTyped1] = React.useState("");
  const [typed2, setTyped2] = React.useState("");
  const [typingPhase, setTypingPhase] = React.useState(1); // 1: type 1, 2: type 2, 3: hold, 4: erase

  React.useEffect(() => {
    let timer;
    const typeSpeed = 50;
    const eraseSpeed = 25;

    if (typingPhase === 1) {
      if (typed1.length < line1Full.length) {
        timer = setTimeout(() => {
          setTyped1(line1Full.slice(0, typed1.length + 1));
        }, typeSpeed);
      } else {
        timer = setTimeout(() => setTypingPhase(2), 250);
      }
    } else if (typingPhase === 2) {
      if (typed2.length < line2Full.length) {
        timer = setTimeout(() => {
          setTyped2(line2Full.slice(0, typed2.length + 1));
        }, typeSpeed);
      } else {
        timer = setTimeout(() => setTypingPhase(3), 3200);
      }
    } else if (typingPhase === 3) {
      setTypingPhase(4);
    } else if (typingPhase === 4) {
      if (typed2.length > 0) {
        timer = setTimeout(() => {
          setTyped2(typed2.slice(0, -1));
        }, eraseSpeed);
      } else if (typed1.length > 0) {
        timer = setTimeout(() => {
          setTyped1(typed1.slice(0, -1));
        }, eraseSpeed);
      } else {
        timer = setTimeout(() => setTypingPhase(1), 400);
      }
    }

    return () => clearTimeout(timer);
  }, [typed1, typed2, typingPhase]);

  return (
    <main style={{ flex: 1 }}>
      
      {/* 1. HERO SECTION (Expanded scale, Typewriter Loop & Bottom-to-Top Animations) */}
      <section className="section" style={{ paddingTop: '5.5rem', paddingBottom: '5.5rem' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}>
            {/* Left Column: Brand Title, Teal Bar, Looping Typewriter & Action Input */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
              
              {/* Grand CommitCV Branding Title */}
              <h1 style={{ 
                fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", 
                fontSize: 'clamp(2.4rem, 7.5vw, 6.5rem)', 
                fontWeight: 800, 
                lineHeight: 0.92, 
                letterSpacing: '-0.04em', 
                margin: '0 0 1.5rem 0',
                color: 'var(--text)'
              }}>
                Commit<span style={{ color: 'var(--accent)' }}>CV</span>
              </h1>

              {/* Bold Teal Accent Horizontal Bar Line */}
              <div style={{
                width: '96px',
                height: '5px',
                backgroundColor: 'var(--accent)',
                borderRadius: '3px',
                marginBottom: '2.25rem'
              }} />

              {/* Typewriter Looping Taglines */}
              <div style={{ minHeight: '130px', marginBottom: '1.5rem' }}>
                <h2 style={{
                  fontFamily: "'Space Grotesk', var(--font-heading), sans-serif",
                  fontSize: 'clamp(1.2rem, 3.2vw, 2.5rem)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  margin: '0 0 0.5rem 0',
                  lineHeight: 1.2
                }}>
                  {typed1}
                  {typingPhase === 1 && <span className="typing-cursor" />}
                </h2>
                <h3 style={{
                  fontFamily: "'Space Grotesk', var(--font-heading), sans-serif",
                  fontSize: 'clamp(1.2rem, 3.2vw, 2.5rem)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  margin: 0,
                  lineHeight: 1.2
                }}>
                  {typed2.length <= 12 ? (
                    <span>{typed2}</span>
                  ) : (
                    <>
                      <span>Every claim </span>
                      <span style={{ color: 'var(--accent)' }}>{typed2.slice(12)}</span>
                    </>
                  )}
                  {(typingPhase === 2 || typingPhase === 3) && <span className="typing-cursor" />}
                </h3>
              </div>

              {/* Scaled Quick Repository Search Input (Bottom to Top Animation) */}
              <form 
                className="animate-slide-up-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!githubInput.trim()) return;
                  handleAnalyzeUsername(githubInput);
                  setCurrentPage('student');
                }} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
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
                <Terminal size={20} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                <input 
                  type="text"
                  placeholder="Paste GitHub handle or URL (e.g. gaearon, torvalds)"
                  value={githubInput}
                  onChange={(e) => setGithubInput(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    color: 'var(--text)'
                  }}
                />
                <button 
                  type="submit" 
                  className="btn-pill"
                  disabled={analyzing}
                  style={{ padding: '0.55rem 0.6rem 0.55rem 1.4rem', fontSize: '0.95rem' }}
                >
                  <span>{analyzing ? 'Scanning...' : 'Analyze Code'}</span>
                  <div className="btn-pill-arrow" style={{ width: '34px', height: '34px' }}>
                    <ArrowRight size={16} />
                  </div>
                </button>
              </form>

              {/* Role Action Shortcuts (Bottom to Top Animation) */}
              <div className="animate-slide-up-2" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-pill-secondary"
                  onClick={() => setCurrentPage('student')}
                  style={{ padding: '0.65rem 1.4rem', fontSize: '0.925rem' }}
                >
                  <Laptop size={16} style={{ color: 'var(--accent)' }} />
                  <span>I am a Student / Candidate</span>
                </button>
                <button
                  type="button"
                  className="btn-pill-secondary"
                  onClick={() => setCurrentPage('recruiter-login')}
                  style={{ padding: '0.65rem 1.4rem', fontSize: '0.925rem' }}
                >
                  <span>I am a Recruiter / Hiring Team</span>
                </button>
              </div>
            </div>

            {/* Right Column: High-Impact Developer Image (Bottom to Top Entrance Animation) */}
            <div className="animate-slide-up-photo" style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                boxShadow: '0 28px 60px -12px rgba(0,0,0,0.3)',
                position: 'relative'
              }}>
                <img 
                  src="/hero-developer.jpg" 
                  alt="CommitCV Developer Proof System" 
                  style={{ width: '100%', minHeight: '440px', display: 'block', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(7, 8, 10, 0.4) 0%, transparent 40%)',
                  pointerEvents: 'none'
                }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY TRADITIONAL SYSTEMS FAIL */}
      <section id="why-traditional" className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', paddingBottom: '9rem' }}>
        <div className="container">
          <RevealOnScroll delay="0s">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div className="section-tag">01 // THE PARADIGM SHIFT</div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.75rem)', fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", marginBottom: '0.65rem' }}>
                Why traditional hiring falls short
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--muted)', margin: '0 auto', maxWidth: '640px' }}>
                Skills are claimed on resumes, but rarely verified.
              </p>
            </div>
          </RevealOnScroll>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3.5rem',
            maxWidth: '860px',
            margin: '0 auto'
          }}>
            {/* Stacking Card 1 */}
            <div style={{
              position: 'sticky',
              top: '100px',
              zIndex: 1,
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.75rem 3rem',
              boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
              display: 'flex',
              gap: '1.75rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#f87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <AlertTriangle size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 700, marginBottom: '0.45rem', letterSpacing: '0.05em' }}>
                  PROBLEM 01 // UNVERIFIED CLAIMS
                </div>
                <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.75rem 0', fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", lineHeight: 1.25 }}>
                  Resumes can’t be trusted.
                </h3>
                <p style={{ fontSize: '1.025rem', color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                  Anyone can list React, Kubernetes, or Machine Learning on a PDF resume. Traditional hiring relies on self-reported assertions without immediate automated proof.
                </p>
                <div style={{
                  background: 'var(--surface)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                  gap: '0.75rem'
                }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#f87171', fontWeight: 700, display: 'block' }}>RECRUITER BOTTLENECK</span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text)' }}>Manual phone screens take weeks per role.</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#f87171', fontWeight: 700, display: 'block' }}>RESUME INFLATION</span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text)' }}>85% of applicants inflate skill proficiency.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stacking Card 2 */}
            <div style={{
              position: 'sticky',
              top: '130px',
              zIndex: 2,
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.75rem 3rem',
              boxShadow: '0 20px 48px rgba(0,0,0,0.15)',
              display: 'flex',
              gap: '1.75rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
                background: 'rgba(245, 158, 11, 0.1)',
                color: '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <FileCode2 size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 700, marginBottom: '0.45rem', letterSpacing: '0.05em' }}>
                  PROBLEM 02 // CODE OVERLOAD
                </div>
                <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.75rem 0', fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", lineHeight: 1.25 }}>
                  GitHub is hard to read at scale.
                </h3>
                <p style={{ fontSize: '1.025rem', color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                  Engineering managers and recruiters lack the bandwidth to manually clone, inspect AST trees, and audit commit logs for hundreds of applicants.
                </p>
                <div style={{
                  background: 'var(--surface)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                  gap: '0.75rem'
                }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#F59E0B', fontWeight: 700, display: 'block' }}>TIME DRAIN</span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text)' }}>30+ mins spent cloning source code manually.</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#F59E0B', fontWeight: 700, display: 'block' }}>SUPERFICIAL METRICS</span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text)' }}>Green contribution grids mask actual logic quality.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stacking Card 3 */}
            <div style={{
              position: 'sticky',
              top: '160px',
              zIndex: 3,
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.75rem 3rem',
              boxShadow: '0 24px 56px rgba(0,0,0,0.18)',
              display: 'flex',
              gap: '1.75rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Terminal size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 700, marginBottom: '0.45rem', letterSpacing: '0.05em' }}>
                  PROBLEM 03 // BLACK BOX METRICS
                </div>
                <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.75rem 0', fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", lineHeight: 1.25 }}>
                  AI scores come without proof.
                </h3>
                <p style={{ fontSize: '1.025rem', color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                  Black-box resume screeners assign arbitrary scores (e.g. 78/100) without linking to a single line of actual code or verifying repository claims.
                </p>
                <div style={{
                  background: 'var(--surface)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                  gap: '0.75rem'
                }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#3B82F6', fontWeight: 700, display: 'block' }}>HALLUCINATION RISK</span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text)' }}>Generic screeners guess skills with zero proof.</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#3B82F6', fontWeight: 700, display: 'block' }}>ZERO CITATION</span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text)' }}>Neither candidate nor hiring lead can audit the score.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stacking Card 4 */}
            <div style={{
              position: 'sticky',
              top: '190px',
              zIndex: 4,
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.75rem 3rem',
              boxShadow: '0 28px 64px rgba(0,0,0,0.22)',
              display: 'flex',
              gap: '1.75rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
                background: 'rgba(168, 85, 247, 0.1)',
                color: '#a855f7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Laptop size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 700, marginBottom: '0.45rem', letterSpacing: '0.05em' }}>
                  PROBLEM 04 // TALENT MISSED
                </div>
                <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.75rem 0', fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", lineHeight: 1.25 }}>
                  Students go unseen.
                </h3>
                <p style={{ fontSize: '1.025rem', color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                  Talented student developers build impressive full-stack systems and open-source contributions, but get filtered out by legacy ATS keywords.
                </p>
                <div style={{
                  background: 'var(--surface)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                  gap: '0.75rem'
                }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#a855f7', fontWeight: 700, display: 'block' }}>KEYWORD TRAP</span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text)' }}>Top coders are filtered out by resume parsers.</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#a855f7', fontWeight: 700, display: 'block' }}>HIDDEN PROOF</span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text)' }}>Production-grade GitHub repos sit unreviewed.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ADVANTAGES OF COMMITCV */}
      <section id="features" className="section">
        <div className="container">
          <RevealOnScroll delay="0s">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="section-tag">02 // CORE PROOF INVARIANTS</div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.75rem)', fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", marginBottom: '0.65rem' }}>
                Hire on proof, not claims
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--muted)', margin: '0 auto', maxWidth: '640px' }}>
                Every result is backed by real code.
              </p>
            </div>
          </RevealOnScroll>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem'
          }}>
            {/* Advantage 1 */}
            <RevealOnScroll delay="0s">
              <div style={{
                padding: '1.75rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                height: '100%'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                  <CheckCircle size={18} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>01 // PROOF FIRST</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', margin: 0, fontFamily: "'Space Grotesk', var(--font-heading), sans-serif" }}>Evidence-first analysis</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  Our AI retrieves facts from the real repo before it says anything.
                </p>
              </div>
            </RevealOnScroll>

            {/* Advantage 2 */}
            <RevealOnScroll delay="0.04s">
              <div style={{
                padding: '1.75rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                height: '100%'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                  <CheckCircle size={18} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>02 // AST CITATION</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', margin: 0, fontFamily: "'Space Grotesk', var(--font-heading), sans-serif" }}>Every claim is cited</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  Each strength links to the file or commit that proves it.
                </p>
              </div>
            </RevealOnScroll>

            {/* Advantage 3 */}
            <RevealOnScroll delay="0.08s">
              <div style={{
                padding: '1.75rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                height: '100%'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                  <CheckCircle size={18} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>03 // ZERO HALLUCINATION</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', margin: 0, fontFamily: "'Space Grotesk', var(--font-heading), sans-serif" }}>Honest by design</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  If there is no evidence, CommitCV says “No evidence found” instead of guessing.
                </p>
              </div>
            </RevealOnScroll>

            {/* Advantage 4 */}
            <RevealOnScroll delay="0.12s">
              <div style={{
                padding: '1.75rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                height: '100%'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                  <CheckCircle size={18} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>04 // SKILL TOKENS</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', margin: 0, fontFamily: "'Space Grotesk', var(--font-heading), sans-serif" }}>Verified skill labels</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  Each skill is marked Verified, Partial or Unsupported.
                </p>
              </div>
            </RevealOnScroll>

            {/* Advantage 5 */}
            <RevealOnScroll delay="0.16s">
              <div style={{
                padding: '1.75rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                height: '100%'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                  <CheckCircle size={18} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>05 // STUDENT DOSSIER</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', margin: 0, fontFamily: "'Space Grotesk', var(--font-heading), sans-serif" }}>Ready resume in minutes</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  Students get a resume built from their real projects.
                </p>
              </div>
            </RevealOnScroll>

            {/* Advantage 6 */}
            <RevealOnScroll delay="0.2s">
              <div style={{
                padding: '1.75rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                height: '100%'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                  <CheckCircle size={18} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>06 // RECRUITER RANKING</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', margin: 0, fontFamily: "'Space Grotesk', var(--font-heading), sans-serif" }}>Ranked shortlist for recruiters</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  Candidates are ranked against the job description, with clear reasons.
                </p>
              </div>
            </RevealOnScroll>

            {/* Advantage 7 - Full Width Container Featured Banner */}
            <div style={{ gridColumn: '1 / -1' }}>
              <RevealOnScroll delay="0.24s">
                <div style={{
                  padding: '2rem 2.25rem',
                  background: 'var(--neon-bg)',
                  border: '1px solid var(--accent)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                  marginTop: '0.5rem',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      color: '#000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <CheckCircle size={22} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 700, marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
                        07 // UNBIASED INVARIANT
                      </div>
                      <h3 style={{ fontSize: '1.4rem', margin: 0, fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", color: 'var(--text)' }}>
                        Fair by design
                      </h3>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.98rem', color: 'var(--text)', lineHeight: 1.6, margin: 0, maxWidth: '560px', fontWeight: 500 }}>
                    Scores are advisory, and candidate name, photo, and location are never used in evaluation algorithms.
                  </p>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (SIDE-BY-SIDE DUAL PIPELINE WITH CURVED CONNECTING LINE) */}
      <section id="how-it-works" className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', paddingBottom: '7rem', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative' }}>
          
          {/* Section Header */}
          <RevealOnScroll delay="0s">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div className="section-tag">03 // DUAL PIPELINE WORKFLOW</div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.75rem)', fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", marginBottom: '0.65rem' }}>
                From GitHub link to proof in three steps
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--muted)', margin: '0 auto', maxWidth: '640px' }}>
                Side-by-side workflow for Students and Hiring Teams connected by AST code verification.
              </p>
            </div>
          </RevealOnScroll>

          {/* Dual Column Header Labels */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2.5rem',
            marginBottom: '2.5rem',
            maxWidth: '1040px',
            margin: '0 auto 2.5rem auto'
          }}>
            {/* Student Column Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'var(--neon-bg)',
              border: '1px solid var(--accent)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.08)'
            }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Laptop size={20} />
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700, display: 'block' }}>FOR STUDENTS</span>
                <h4 style={{ fontSize: '1.15rem', margin: 0, fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", color: 'var(--text)' }}>
                  Build a Code-Proven Resume
                </h4>
              </div>
            </div>

            {/* Recruiter Column Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid #38BDF8',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              boxShadow: '0 8px 24px rgba(56, 189, 248, 0.08)'
            }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#38BDF8', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Briefcase size={20} />
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#38BDF8', fontWeight: 700, display: 'block' }}>FOR RECRUITERS</span>
                <h4 style={{ fontSize: '1.15rem', margin: 0, fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", color: 'var(--text)' }}>
                  Screen with AST-Verified Proof
                </h4>
              </div>
            </div>
          </div>

          {/* Pipeline Container with Center Curved Connecting SVG Line */}
          <div style={{ position: 'relative', maxWidth: '1040px', margin: '0 auto' }}>
            
            {/* Center Curved SVG Path connecting Step 1 to Step 2 to Step 3 */}
            <svg
              style={{
                position: 'absolute',
                top: '50px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: 'calc(100% - 100px)',
                pointerEvents: 'none',
                zIndex: 0
              }}
              viewBox="0 0 120 700"
              preserveAspectRatio="none"
            >
              <path
                d="M 60 0 C 110 110, 10 230, 60 350 C 110 470, 10 590, 60 700"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3.5"
                strokeDasharray="6 6"
                style={{ opacity: 0.5 }}
              />
            </svg>

            {/* STEP 1 ROW */}
            <div style={{ marginBottom: '3.5rem', position: 'relative', zIndex: 2 }}>
              {/* Step Node Badge */}
              <RevealOnScroll delay="0s">
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <span className="section-tag" style={{ background: 'var(--bg)', border: '1px solid var(--accent)', padding: '0.4rem 1.25rem', fontSize: '0.8rem', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                    STEP 01 // INPUT INGESTION
                  </span>
                </div>
              </RevealOnScroll>

              {/* Side-by-Side Step 1 Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
                {/* Student Card 1 */}
                <RevealOnScroll delay="0.1s">
                  <div style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.25rem',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
                    borderLeft: '4px solid var(--accent)',
                    height: '100%'
                  }}>
                    <h3 style={{ fontSize: '1.3rem', fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", marginBottom: '0.65rem' }}>
                      1. Paste your GitHub Profile
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                      Add your profile link. CommitCV instantly ingests your public repos, package manifests, and commit logs.
                    </p>
                  </div>
                </RevealOnScroll>

                {/* Recruiter Card 1 */}
                <RevealOnScroll delay="0.25s">
                  <div style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.25rem',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
                    borderLeft: '4px solid #38BDF8',
                    height: '100%'
                  }}>
                    <h3 style={{ fontSize: '1.3rem', fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", marginBottom: '0.65rem' }}>
                      1. Input Job Specs & Applicants
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                      Paste your target job requirements and applicant profile links for automated proof-backed screening.
                    </p>
                  </div>
                </RevealOnScroll>
              </div>
            </div>

            {/* STEP 2 ROW */}
            <div style={{ marginBottom: '3.5rem', position: 'relative', zIndex: 2 }}>
              {/* Step Node Badge */}
              <RevealOnScroll delay="0s">
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <span className="section-tag" style={{ background: 'var(--bg)', border: '1px solid var(--accent)', padding: '0.4rem 1.25rem', fontSize: '0.8rem', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                    STEP 02 // AST CODE GROUNDING
                  </span>
                </div>
              </RevealOnScroll>

              {/* Side-by-Side Step 2 Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
                {/* Student Card 2 */}
                <RevealOnScroll delay="0.1s">
                  <div style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.25rem',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
                    borderLeft: '4px solid var(--accent)',
                    height: '100%'
                  }}>
                    <h3 style={{ fontSize: '1.3rem', fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", marginBottom: '0.65rem' }}>
                      2. AI Reads the Real Code
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                      The AST engine grounds your technical strengths, extracts verified languages, and maps skill gaps against industry roles.
                    </p>
                  </div>
                </RevealOnScroll>

                {/* Recruiter Card 2 */}
                <RevealOnScroll delay="0.25s">
                  <div style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.25rem',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
                    borderLeft: '4px solid #38BDF8',
                    height: '100%'
                  }}>
                    <h3 style={{ fontSize: '1.3rem', fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", marginBottom: '0.65rem' }}>
                      2. Automated JD Match
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                      The RAG engine evaluates each candidate’s actual code files directly against your job description requirements.
                    </p>
                  </div>
                </RevealOnScroll>
              </div>
            </div>

            {/* STEP 3 ROW */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Step Node Badge */}
              <RevealOnScroll delay="0s">
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <span className="section-tag" style={{ background: 'var(--bg)', border: '1px solid var(--accent)', padding: '0.4rem 1.25rem', fontSize: '0.8rem', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                    STEP 03 // CITATION VERIFICATION
                  </span>
                </div>
              </RevealOnScroll>

              {/* Side-by-Side Step 3 Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
                {/* Student Card 3 */}
                <RevealOnScroll delay="0.1s">
                  <div style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.25rem',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
                    borderLeft: '4px solid var(--accent)',
                    height: '100%'
                  }}>
                    <h3 style={{ fontSize: '1.3rem', fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", marginBottom: '0.65rem' }}>
                      3. Get Proof-Backed Results
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                      Get a ready resume with clickable file citations and a recommended next project to build to upgrade your profile.
                    </p>
                  </div>
                </RevealOnScroll>

                {/* Recruiter Card 3 */}
                <RevealOnScroll delay="0.25s">
                  <div style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.25rem',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
                    borderLeft: '4px solid #38BDF8',
                    height: '100%'
                  }}>
                    <h3 style={{ fontSize: '1.3rem', fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", marginBottom: '0.65rem' }}>
                      3. Ranked Shortlist & Code Q&A
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                      Get a ranked candidate shortlist with proof tokens, plus the ability to ask natural language questions about any applicant’s repo.
                    </p>
                  </div>
                </RevealOnScroll>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS SECTION */}
      <FaqSection />

    </main>
  );
}

{/* FAQ Accordion Component */}
function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqData = [
    {
      q: "How does CommitCV verify developer skills without hallucinating?",
      a: "CommitCV uses an AST (Abstract Syntax Tree) and RAG (Retrieval-Augmented Generation) engine connected directly to real GitHub repositories, source code files, and package manifests (such as package.json or Dockerfile). If concrete proof is not found in public code, CommitCV explicitly states 'No evidence found in public repositories' instead of guessing."
    },
    {
      q: "What is the difference between Verified, Partial, and Unsupported skills?",
      a: "VERIFIED skills are found directly inside source code files, unit tests, or build configurations with clickable file citations. PARTIAL skills are cited from README files or commit descriptions. UNSUPPORTED skills indicate that no evidence was discovered in public repositories."
    },
    {
      q: "Is candidate personal information used during evaluation?",
      a: "No. CommitCV strictly enforces an Unbiased Invariant: candidate name, photo, age, gender, and location are never passed to evaluation algorithms. All candidate scoring is 100% code-driven and proof-backed."
    },
    {
      q: "How long does it take to generate a proof-backed dossier or rank candidates?",
      a: "Analysis takes under 30 seconds per profile. The AST engine ingests public commit logs, repo structures, and manifests instantly to produce a ready-to-share dossier with clickable file citations."
    },
    {
      q: "Can recruiters ask natural language questions about candidate repositories?",
      a: "Yes! Recruiters can query candidate repos with prompts like 'Has candidate built WebSocket servers in Node.js?' or 'Show proof of Docker usage,' and CommitCV returns direct lines of code and commit references answering the prompt."
    },
    {
      q: "Can students update their dossier as they push new commits?",
      a: "Yes. Re-analyzing a profile or connecting a GitHub handle immediately re-indexes new commits and pull requests, upgrading verified skill tokens automatically."
    }
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="section" style={{ borderTop: '1px solid var(--border)', paddingBottom: '7.5rem' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        
        {/* FAQ Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">04 // FREQUENTLY ASKED QUESTIONS</div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.75rem)', fontFamily: "'Space Grotesk', var(--font-heading), sans-serif", marginBottom: '0.65rem' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--muted)', margin: '0 auto', maxWidth: '600px' }}>
            Everything you need to know about code verification, skill citations, and proof-backed hiring.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <RevealOnScroll key={index} delay={`${(index % 3) * 0.1}s`}>
                <div style={{
                  background: 'var(--surface)',
                  border: isOpen ? '1px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  transition: 'all 250ms ease',
                  boxShadow: isOpen ? '0 12px 32px rgba(16, 185, 129, 0.08)' : '0 4px 16px rgba(0,0,0,0.04)'
                }}>
                  {/* Question Header Row */}
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    style={{
                      width: '100%',
                      padding: '1.5rem 1.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1.25rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: 'var(--text)'
                    }}
                  >
                    <span style={{
                      fontFamily: "'Space Grotesk', var(--font-heading), sans-serif",
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      lineHeight: 1.35
                    }}>
                      {item.q}
                    </span>

                    {/* Plus / Minus Action Button */}
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: isOpen ? 'var(--accent)' : 'var(--surface-raised)',
                      color: isOpen ? '#000000' : 'var(--text)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 200ms ease',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
                    }}>
                      <Plus size={20} />
                    </div>
                  </button>

                  {/* Expandable Answer Body */}
                  {isOpen && (
                    <div style={{
                      padding: '0 1.75rem 1.75rem 1.75rem',
                      color: 'var(--muted)',
                      fontSize: '0.98rem',
                      lineHeight: 1.65,
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '1.25rem'
                    }}>
                      {item.a}
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

      </div>
    </section>
  );
}
