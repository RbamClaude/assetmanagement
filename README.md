# Apex Asset Management

A modern, professional one-page website for an asset management firm — built with pure HTML5, CSS3, and vanilla JavaScript. No frameworks, no build tools.

**Live site:** [rbamclaude.github.io/assetmanagement](https://rbamclaude.github.io/assetmanagement/)

---

## Sections

| Section | ID |
|---|---|
| Sticky navigation with hamburger menu | `#nav` |
| Hero with animated number counters | `#hero` |
| Why Choose Us — 4 USP cards | `#why-us` |
| Client testimonials carousel | `#testimonials` |
| Enquiry form (FormSubmit.co) | `#contact` |
| Footer with social links | — |

## Running Locally

Open `index.html` directly in any modern browser — no server or install step required.

## Form Setup (FormSubmit.co)

Before the contact form can send emails:

1. Open `index.html` and replace `your-email@example.com` in the `<form action>` attribute with your real address.
2. Submit the form once — FormSubmit will send a one-time activation email; click the link to activate.
3. The `_next` redirect is already set to the live GitHub Pages URL.

## Customisation

All design tokens (colors, fonts, spacing) are CSS custom properties on `:root` in `styles.css` — edit there rather than hunting through individual rules.

| Token | Default |
|---|---|
| `--navy` | `#6b0f0f` (maroon primary) |
| `--gold` | `#d4a017` (accent) |
| `--font-heading` | Playfair Display |
| `--font-body` | Inter |

## Deployment

The site is deployed automatically to GitHub Pages via `.github/workflows/` on every push to `main`.

## Tech Stack

- HTML5 (semantic, ARIA-labelled)
- CSS3 (custom properties, IntersectionObserver animations, CSS Grid)
- Vanilla JavaScript (ES6+)
- [FormSubmit.co](https://formsubmit.co) for email form handling
- GitHub Pages for hosting
