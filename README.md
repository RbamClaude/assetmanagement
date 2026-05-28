# Apex Asset Management

A single-page website for a sustainability-focused asset management firm — built with pure HTML5, CSS3, and vanilla JavaScript. No frameworks, no build tools.

**Live site:** [rbamclaude.github.io/assetmanagement](https://rbamclaude.github.io/assetmanagement/)

![Apex Asset Management screenshot](screenshot.png)

---

## Sections

| Section | ID |
|---|---|
| Sticky navigation with hamburger menu | `#nav` |
| Hero with animated number counters | `#hero` |
| Why Choose Us — 4 ESG-themed USP cards | `#why-us` |
| Client testimonials carousel | `#testimonials` |
| Enquiry form (FormSubmit.co) | `#contact` |
| Footer with social links | — |

## Running Locally

Open `index.html` directly in any modern browser — no server or install step required.

## Form Setup (FormSubmit.co)

The contact form is already configured. If you need to change the recipient:

1. Open `index.html` and update the email in the `<form action="https://formsubmit.co/YOUR-EMAIL">` attribute.
2. Submit the form once — FormSubmit sends a one-time activation email; click the link to activate.
3. The `_next` redirect is already set to the live GitHub Pages URL.

## Customisation

All design tokens are CSS custom properties on `:root` in `styles.css`.

| Token | Value | Usage |
|---|---|---|
| `--forest` | `#1B4D3E` | Primary dark green — nav, footer, headings |
| `--emerald` | `#2E7D52` | Mid green — buttons, accents, focus rings |
| `--leaf` | `#4CAF50` | Bright green — hover states |
| `--mint` | `#E8F5E9` | Pale green — section backgrounds |
| `--gold` | `#C9A84C` | Warm gold — premium micro-accents, stat numbers |
| `--font-heading` | Playfair Display | Headings |
| `--font-body` | Inter | Body / UI text |
| `--font-mono` | JetBrains Mono | Stat counters |

`--navy` is an alias for `--forest` so all internal references update automatically when `--forest` changes.

## Deployment

Deployed automatically to GitHub Pages on every push to `main`.

## Tech Stack

- HTML5 (semantic, ARIA-labelled)
- CSS3 (custom properties, IntersectionObserver animations, CSS Grid)
- Vanilla JavaScript (ES6+)
- [FormSubmit.co](https://formsubmit.co) for email form handling
- GitHub Pages for hosting
