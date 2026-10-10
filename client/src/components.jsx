import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ExternalLink, 
  Sun, 
  Moon, 
  GitCommit, 
  FileCode2, 
  ShieldCheck, 
  Terminal, 
  Layers,
  ArrowRight,
  Search,
  Check,
  Copy
} from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('commitcv-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('commitcv-theme', theme);
  }, [theme]);

  const toggle = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={toggle}
      className="theme-toggle-btn"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      aria-label="Toggle visual theme"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.4rem 0.75rem',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--surface)',
        color: 'var(--text)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.04em',
        transition: 'all 150ms ease'
      }}
    >
      {theme === 'dark' ? (
        <>
          <Sun size={14} style={{ color: 'var(--accent)' }} />
          <span>LIGHT</span>
        </>
      ) : (
        <>
          <Moon size={14} style={{ color: 'var(--muted)' }} />
          <span>DARK</span>
        </>
      )}
    </button>
  );
}

/* ==========================================================================
   Button Component
   Variants: 'primary', 'secondary', 'accent', 'ghost', 'sm' | 'md' | 'lg'
   ========================================================================== */
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  className = '', 
  onClick, 
  disabled = false,
  type = 'button',
  style = {}
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: 600,
    letterSpacing: '0.02em',
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 150ms ease',
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  };

  const sizeStyles = {
    sm: { padding: '0.35rem 0.75rem', fontSize: '0.75rem' },
    md: { padding: '0.6rem 1.25rem', fontSize: '0.85rem' },
    lg: { padding: '0.85rem 1.75rem', fontSize: '0.95rem' }
  };

  const variantStyles = {
    primary: {
      background: 'var(--text)',
      color: 'var(--bg)',
      border: '1px solid var(--text)'
    },
    secondary: {
      background: 'var(--surface)',
      color: 'var(--text)',
      border: '1px solid var(--border)'
    },
    accent: {
      background: 'var(--accent)',
      color: '#FFFFFF',
      border: '1px solid var(--accent)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text)',
      border: '1px solid transparent'
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn ${className}`}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === 'secondary') {
          e.currentTarget.style.borderColor = 'var(--text)';
        } else if (variant === 'ghost') {
          e.currentTarget.style.backgroundColor = 'var(--surface-raised)';
        }
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        if (variant === 'secondary') {
          e.currentTarget.style.borderColor = 'var(--border)';
        } else if (variant === 'ghost') {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      {Icon && <Icon size={size === 'sm' ? 13 : 15} />}
      {children}
    </button>
  );
}

/* ==========================================================================
   ProofBadge Component
   Enforces: VERIFIED (emerald), PARTIAL (amber), UNSUPPORTED (neutral)
   ========================================================================== */
export function ProofBadge({ 
  status = 'VERIFIED', 
  label, 
  onClick, 
  clickable = true 
}) {
  const normalized = status.toUpperCase();

  const configs = {
    VERIFIED: {
      icon: CheckCircle2,
      color: 'var(--proof-verified)',
      bg: 'var(--proof-verified-bg)',
      text: 'VERIFIED'
    },
    PARTIAL: {
      icon: AlertCircle,
      color: 'var(--proof-partial)',
      bg: 'var(--proof-partial-bg)',
      text: 'PARTIAL'
    },
    UNSUPPORTED: {
      icon: HelpCircle,
      color: 'var(--proof-unsupported)',
      bg: 'var(--proof-unsupported-bg)',
      text: 'UNSUPPORTED'
    }
  };

  const current = configs[normalized] || configs.UNSUPPORTED;
  const IconComponent = current.icon;

  return (
    <span
      onClick={clickable ? onClick : undefined}
      role={clickable ? 'button' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.2rem 0.55rem',
        borderRadius: 'var(--radius-sm)',
        background: current.bg,
        color: current.color,
        border: `1px solid ${current.color}40`,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.04em',
        cursor: clickable ? 'pointer' : 'default',
        userSelect: 'none'
      }}
      title={`Proof status: ${current.text}`}
    >
      <IconComponent size={12} strokeWidth={2.5} />
      <span>{label || current.text}</span>
    </span>
  );
}

/* ==========================================================================
   ProofCitation Component
   Clickable file / commit citation with line numbers
   ========================================================================== */
export function ProofCitation({ 
  file, 
  commit, 
  lineRange, 
  repo,
  onClickCitation 
}) {
  return (
    <div
      onClick={onClickCitation}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.2rem 0.5rem',
        background: 'var(--surface-raised)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: 'var(--text)',
        cursor: 'pointer',
        transition: 'all 120ms ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
      title={`View verified AST proof in ${repo || 'repo'}`}
    >
      {commit ? <GitCommit size={11} style={{ color: 'var(--accent)' }} /> : <FileCode2 size={11} style={{ color: 'var(--accent)' }} />}
      <span style={{ fontWeight: 500, color: 'var(--text)' }}>
        {file || (commit ? `commit:${commit.substring(0, 7)}` : 'manifest')}
      </span>
      {lineRange && (
        <span style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>
          #{lineRange}
        </span>
      )}
      <ExternalLink size={10} style={{ color: 'var(--muted)', marginLeft: '2px' }} />
    </div>
  );
}

/* ==========================================================================
   Card Component
   Clean architectural box with hairline borders and index numbering
   ========================================================================== */
export function Card({ 
  children, 
  indexNumber, 
  title, 
  subtitle, 
  action, 
  className = '', 
  style = {} 
}) {
  return (
    <div
      className={`card ${className}`}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        ...style
      }}
    >
      {(indexNumber || title || action) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
          <div>
            {indexNumber && (
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.75rem', 
                color: 'var(--accent)', 
                fontWeight: 600,
                display: 'block',
                marginBottom: '0.2rem'
              }}>
                {indexNumber}
              </span>
            )}
            {title && (
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{ fontSize: '0.85rem', margin: '0.2rem 0 0 0', color: 'var(--muted)' }}>
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

/* ==========================================================================
   EvidenceInspector Modal
   Displays AST snippet, commit hash, file tree path, and citation proof
   ========================================================================== */
export function EvidenceInspector({ 
  evidence, 
  onClose 
}) {
  const [copied, setCopied] = useState(false);

  if (!evidence) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(evidence.snippet || evidence.file);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(9, 11, 14, 0.75)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem'
    }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        width: '100%',
        maxWidth: '720px',
        maxHeight: '85vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface-raised)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={16} style={{ color: 'var(--accent)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600 }}>
              VERIFIED AST PROOF ARTIFACT
            </span>
          </div>
          <button 
            onClick={onClose}
            style={{
              padding: '0.2rem 0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--muted)',
              cursor: 'pointer'
            }}
          >
            [ESC / CLOSE]
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <ProofBadge status={evidence.status || 'VERIFIED'} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.1rem' }}>
                {evidence.skill || evidence.title || 'Verified Skill Proof'}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
              {evidence.explanation || 'Direct AST ground truth match parsed from public repository source files.'}
            </p>
          </div>

          {/* Repo & File details */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem',
            padding: '0.75rem',
            background: 'var(--bg)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem'
          }}>
            <div>
              <span style={{ color: 'var(--muted)', display: 'block' }}>REPOSITORY:</span>
              <span style={{ fontWeight: 600 }}>{evidence.repo || 'github.com/developer/repo'}</span>
            </div>
            <div>
              <span style={{ color: 'var(--muted)', display: 'block' }}>FILE & LINE:</span>
              <span style={{ fontWeight: 600 }}>{evidence.file || 'server.js'}{evidence.lineRange ? `:${evidence.lineRange}` : ''}</span>
            </div>
            <div>
              <span style={{ color: 'var(--muted)', display: 'block' }}>COMMIT SHA:</span>
              <span style={{ fontWeight: 600 }}>{evidence.commit ? evidence.commit.substring(0, 10) : '3f8e12d90a'}</span>
            </div>
          </div>

          {/* Code snippet block */}
          {evidence.snippet && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)' }}>
                  GROUND TRUTH CODE SLICE:
                </span>
                <button
                  onClick={handleCopy}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text)',
                    padding: '0.2rem 0.4rem',
                    background: 'var(--surface-raised)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  {copied ? <Check size={11} color="var(--accent)" /> : <Copy size={11} />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
              <pre style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem',
                fontSize: '0.8rem',
                color: 'var(--text)',
                overflowX: 'auto',
                lineHeight: 1.5,
                fontFamily: 'var(--font-mono)'
              }}>
                <code>{evidence.snippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '0.75rem 1.25rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--surface)'
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)' }}>
            ● STRICT RAG INVARIANT: NO CITATION → NO CLAIM
          </span>
          <Button variant="secondary" size="sm" onClick={onClose}>
            CLOSE
          </Button>
        </div>
      </div>
    </div>
  );
}
