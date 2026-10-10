# CommitCV — Design System & Engineering Rules

> **Core Philosophy**: *Your commits are your CV. Every claim comes with proof.*  
> This document defines the non-negotiable design, styling, and architectural rules for CommitCV. All contributors must follow these guidelines.

---

## 1. Anti-Generic Design Rules

1. **No Standard AI-Template Fonts**:
   - ❌ **Forbidden**: Inter, Roboto, Arial, Open Sans, Helvetica, or system-ui defaults.
   - ✅ **Required**: Use **Space Grotesk** for display/headings, **Plus Jakarta Sans** for body, and **JetBrains Mono** for code/metadata/labels.

2. **No Generic Color Schemes**:
   - ❌ **Forbidden**: Purple-to-blue gradients, generic Tailwind palettes (`bg-blue-600`, `text-indigo-500`), flat Bootstrap colors.
   - ✅ **Required**: Use the curated high-contrast architectural palette defined below via CSS variables.

3. **No Cliché Layouts**:
   - ❌ **Forbidden**: Centered hero with 3 floating cards, heavy blurred glassmorphism (`backdrop-blur` with 30px white glow), emoji icons for tech stacks.
   - ✅ **Required**: Editorial/architectural layout, numbered sections (`01`, `02`, `03`), hairline borders (`1px solid var(--border)`), precision verification badges.

4. **Confident, Direct Copy**:
   - ❌ **Forbidden**: "Welcome to CommitCV", "Revolutionize your hiring process", "The ultimate AI tool".
   - ✅ **Required**: Short, factual, and crisp: *"Every claim cites a file or commit, or it is dropped."*

---

## 2. Typography Specification

Load fonts via Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

| Role | Font Family | Weights | Letter Spacing | Line Height |
| :--- | :--- | :--- | :--- | :--- |
| **Display / H1 / H2** | `'Space Grotesk', sans-serif` | 600, 700 | `-0.035em` | `1.08` |
| **Section Titles / H3** | `'Space Grotesk', sans-serif` | 600 | `-0.02em` | `1.2` |
| **Body / Paragraphs** | `'Plus Jakarta Sans', sans-serif` | 400, 500 | `-0.01em` | `1.6` |
| **Code / Citations / Badges**| `'JetBrains Mono', monospace` | 400, 500, 600 | `+0.04em` | `1.4` (Uppercase for badges) |

### Fluid Type Scale (CSS clamp)
- **H1**: `clamp(2.75rem, 5vw + 1rem, 4.75rem)`
- **H2**: `clamp(2rem, 3.5vw + 0.5rem, 3.25rem)`
- **H3**: `clamp(1.25rem, 1.8vw + 0.2rem, 1.75rem)`
- **Body**: `clamp(0.95rem, 0.8vw + 0.2rem, 1.0625rem)`
- **Small / Badges / Code**: `clamp(0.75rem, 0.6vw + 0.2rem, 0.825rem)`

---

## 3. Color Tokens & Dual-Theme Variables

Never hardcode hex values in component inline styles or classes. Always use CSS variables:

```css
:root {
  /* LIGHT THEME (Studio Paper & Ink) */
  --bg: #F7F8FA;
  --surface: #FFFFFF;
  --surface-raised: #F0F2F5;
  --text: #0B0E14;
  --muted: #57606A;
  --border: #D0D7DE;
  --border-subtle: #E8ECF0;
  --accent: #0E7051;              /* Precision forest emerald */
  --accent-tint: #ECFDF5;
  
  /* Proof Status Tokens */
  --proof-verified: #0E7051;
  --proof-verified-bg: #ECFDF5;
  --proof-partial: #B45309;
  --proof-partial-bg: #FFFBEB;
  --proof-unsupported: #6E7781;
  --proof-unsupported-bg: #F6F8FA;
}

[data-theme="dark"] {
  /* DARK THEME (Carbon Obsidian & Luminescent Proof) */
  --bg: #090B0E;
  --surface: #11141A;
  --surface-raised: #181C24;
  --text: #F0F3F6;
  --muted: #8B949E;
  --border: #232936;
  --border-subtle: #191E28;
  --accent: #10B981;              /* Luminescent emerald */
  --accent-tint: rgba(16, 185, 129, 0.08);

  /* Proof Status Tokens */
  --proof-verified: #10B981;
  --proof-verified-bg: rgba(16, 185, 129, 0.12);
  --proof-partial: #F59E0B;
  --proof-partial-bg: rgba(245, 158, 11, 0.12);
  --proof-unsupported: #484F58;
  --proof-unsupported-bg: rgba(72, 79, 88, 0.15);
}
```

### Theme Toggle Requirements
- A visible Theme Toggle button must be present in the header.
- Respect `prefers-color-scheme` on first visit.
- Persist the selection to `localStorage.getItem('commitcv-theme')`.
- Smooth color transitions on theme toggle: `transition: background-color 200ms ease, color 200ms ease`.

---

## 4. Layout & Grid Standards

- **Max Content Width**: `1240px`
- **Side Padding**: `clamp(1.25rem, 4vw, 3rem)`
- **Section Vertical Padding**: `clamp(4.5rem, 8vw, 7.5rem)`
- **Section Numbering**: Sections must be numbered sequentially with an index prefix:
  - `01 / PARADIGM`
  - `02 / THE VERIFICATION PIPELINE`
  - `03 / STUDENT ARTIFACTS`
  - `04 / RECRUITER SHORTLIST`
  - `05 / FREQUENT QUESTIONS`
- **Micro-Elements**:
  - Text Marquee: `"NO CLAIM WITHOUT CITATION • EVERY BULLET VERIFIED • AST-GROUNDED PROOF • ZERO HALLUCINATIONS •"`
  - Stats Row: Bold mono figures (`100%`, `0 PII`, `< 500ms`) with small crisp labels.

---

## 5. Component Standards

### Buttons
- **Primary**: Solid contrast (`background: var(--text)`, `color: var(--bg)`), border radius `4px`, sharp and architectural.
- **Secondary / Ghost**: `1px solid var(--border)`, `background: transparent`, `color: var(--text)`.
- **Hover**: Subtle contrast shift within `150ms`. No bouncy comic effects.

### Proof Badges
Every skill label must use one of these three states with its corresponding token:
- **`[VERIFIED]`**: Found in code, unit tests, or build manifests (`--proof-verified`).
- **`[PARTIAL]`**: Mentioned only in README or commit messages (`--proof-partial`).
- **`[UNSUPPORTED]`**: No evidence found in public repos (`--proof-unsupported`).

### Cards & Rows
- Separated by crisp `1px solid var(--border)` hairlines.
- Border radius: `6px`.
- Avoid heavy blurry box shadows. Let structural borders and subtle tone shifts define elevation.

---

## 6. Engineering & Citation Rule
**Core System Invariant**: No LLM text reaches the user screen without a verified file or commit link. If the RAG engine cannot retrieve evidence above the similarity threshold, the UI strictly displays:
> *"No evidence found in public repositories."*
