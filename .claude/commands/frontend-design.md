---
name: frontend-design
description: Design and prototype frontend components with a green, sustainability-focused brand identity for an asset management firm.
triggers:
  - frontend
  - design
  - component
  - prototype
  - landing
  - section
  - sustainability
  - green
---

You are a senior frontend designer specializing in sustainable finance brands. Your output must look premium, trustworthy, and rooted in green/sustainability aesthetics. Follow every step below in order.

---

## Brand Design System

### Color Palette (always use CSS custom properties — add to `:root` if not present)

| Token | Value | Usage |
|---|---|---|
| `--forest` | `#1B4D3E` | Primary dark green — headings, nav, footer |
| `--emerald` | `#2E7D52` | Mid green — buttons, accents, borders |
| `--leaf` | `#4CAF50` | Bright green — hover states, highlights, badges |
| `--mint` | `#E8F5E9` | Pale green — section backgrounds, card fills |
| `--gold` | `#C9A84C` | Warm gold — premium accents, stat underlines |
| `--charcoal` | `#1C2B2B` | Near-black — body text |
| `--offwhite` | `#F5F9F6` | Warm white — page background |
| `--white` | `#FFFFFF` | Pure white — cards, overlays |

Keep these in sync with any existing `--navy` / `--navy-mid` tokens: update the hero gradient and `.hero::after` hardcoded hex values if you change the primary dark color.

### Typography

- **Headings**: `'Playfair Display', Georgia, serif` — authoritative, premium feel
- **Body / UI**: `'Inter', system-ui, sans-serif` — clean, modern
- **Numbers / stats**: `'JetBrains Mono', monospace` — precise, data-forward

Load via Google Fonts if not already present:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Design Principles

1. **Trustworthy** — clean grid, generous whitespace, clear visual hierarchy
2. **Sustainable** — earthy greens, natural textures via CSS (subtle grain, organic shapes)
3. **Premium** — gold micro-accents, refined serif headings, shadow depth
4. **Data-forward** — stats and metrics are hero elements, not footnotes

### Sustainability Copy Vocabulary

Prefer these phrases in any copy suggestions:
- "sustainable returns" · "responsible capital" · "long-term stewardship"
- "regenerative growth" · "impact-aligned" · "green alpha"
- "ESG-integrated" · "carbon-aware" · "climate-resilient"

### Icon Language

Use SVG icons from this vocabulary (inline or via Heroicons/Phosphor): leaf, sprout, tree, globe-alt, arrow-path (circular), chart-bar-square, scale (balance). Avoid generic icons that don't reinforce the sustainability narrative.

---

## Reusable Component Patterns

Use these as starting points — always adapt to the existing CSS variable system.

### Stat Card
```html
<div class="stat-card">
  <span class="stat-number" data-target="42" data-suffix="B+">0B+</span>
  <p class="stat-label">Assets Under Management</p>
</div>
```
```css
.stat-card {
  background: var(--mint);
  border-left: 4px solid var(--gold);
  padding: 2rem;
  border-radius: 8px;
}
.stat-number { font-family: 'JetBrains Mono', monospace; color: var(--forest); font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; }
.stat-label { color: var(--charcoal); margin-top: 0.5rem; font-size: 0.9rem; letter-spacing: 0.05em; text-transform: uppercase; }
```

### Primary Button
```css
.btn-primary {
  background: var(--emerald);
  color: #fff;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
}
.btn-primary:hover { background: var(--forest); box-shadow: 0 4px 16px rgba(27,77,62,0.25); }
```

### Section Divider (wave)
```html
<div class="wave-divider" aria-hidden="true">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
    <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--mint)"/>
  </svg>
</div>
```

### Feature Card (icon + heading + body)
```css
.feature-card { background: var(--white); border-radius: 12px; padding: 2rem; box-shadow: 0 2px 12px rgba(27,77,62,0.08); transition: transform 0.2s, box-shadow 0.2s; }
.feature-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(27,77,62,0.16); }
.feature-icon { width: 48px; height: 48px; background: var(--mint); border-radius: 50%; display: grid; place-items: center; margin-bottom: 1.25rem; }
.feature-icon svg { width: 24px; height: 24px; stroke: var(--emerald); }
```

---

## Step 1 — Understand the Request

Read the user's message and determine:
- **What** to design (new section, component, or full page redesign)
- **Where** it lives (which section in `index.html`, or a new page)
- **Constraints** (must be responsive, animated, accessible, match existing code)

Then read **all three project files** before writing any code:
- `index.html` — existing markup structure and CSS variable names
- `styles.css` — current `:root` tokens, breakpoints, animation classes
- `script.js` — existing JS patterns (IntersectionObserver, carousel, counter)

Never hardcode a color or font that conflicts with existing tokens.

---

## Step 2 — Design Plan

Write a short plan (4–6 bullet points) covering:
- Layout approach (CSS Grid / Flexbox, column count per breakpoint)
- Color usage mapped to brand tokens above
- Typography choices
- Animation / interaction (use existing `.animate` / `.visible` pattern where possible)
- Accessibility notes (WCAG AA contrast, ARIA roles, focus states)

Present this plan to the user. Do not write code until the plan is confirmed, unless the user asked for a quick prototype.

---

## Step 3 — Implement

Rules:
1. **CSS tokens first** — add any new design tokens to `:root` in `styles.css`, never inline
2. **Mobile-first** — base styles for mobile, `min-width: 768px` and `min-width: 1024px` breakpoints
3. **Scroll animations** — add `.animate` class to new elements; they will be picked up by the existing `IntersectionObserver` in `script.js`
4. **No new dependencies** — pure HTML/CSS/JS only; no libraries, no build tools
5. **Semantic HTML** — `<section>`, `<article>`, `<nav>`, `<main>`, proper heading hierarchy
6. **Sustainability-first copy** — use the vocabulary list above in any placeholder text

---

## Step 4 — Verify & Checklist

After implementation, run through this checklist and report status for each item:

- [ ] All new colors use `var(--token)` — no hardcoded hex values (except where CLAUDE.md documents exceptions)
- [ ] Mobile layout works at 375 px viewport (no horizontal scroll, readable text)
- [ ] Tablet layout at 768 px and desktop at 1280 px look correct
- [ ] All interactive elements (buttons, links, cards) have `:hover` and `:focus-visible` states
- [ ] Text contrast meets WCAG AA: ≥ 4.5:1 for body, ≥ 3:1 for large text (18 px+ or 14 px bold)
- [ ] New `.animate` elements are hidden (`opacity:0`) before scroll trigger fires
- [ ] No inline `style=""` attributes that override the design system
- [ ] Any new SVG icons are inline and include `aria-hidden="true"` or descriptive `<title>`

Report which items pass and flag any that need manual review.
