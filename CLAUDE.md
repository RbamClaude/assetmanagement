# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page static website for **Apex Asset Management**. No build tools, no package manager, no framework — pure HTML5, CSS3, and vanilla JavaScript. Open `index.html` directly in a browser to run it.

## Architecture

Three files, one concern each:

- **`index.html`** — All markup. Sections in order: `<nav>`, `#hero`, `#why-us`, `#testimonials`, `#contact`, `<footer>`. SVG icons are inline. FormSubmit.co handles the form POST (no backend).
- **`styles.css`** — All styles. CSS custom properties on `:root` are the single source of truth for colors, fonts, spacing, and shadows. Mobile-first with breakpoints at `768px` and `1024px`.
- **`script.js`** — Six self-contained functions each called once from a `DOMContentLoaded` listener: `initNav`, `initSmoothScroll`, `initScrollAnimations`, `initCounters`, `initTestimonialCarousel`, `initContactForm`.

## Key Design Decisions

**CSS variables** — Every color, font, and spacing token is a `--variable` on `:root`. Always edit tokens there rather than hardcoding values. Exception: the hero `background` gradient and `.hero::after` pseudo-element use hardcoded hex values that must be kept in sync with `--navy` / `--navy-mid`.

**Scroll animations** — Elements with `.animate` class start `opacity:0; transform:translateY(28px)`. `initScrollAnimations()` uses `IntersectionObserver` to add `.visible`, which transitions them in. Sibling `.animate` elements inside the same parent are staggered 80 ms apart.

**Counter animation** — `.stat-number` elements carry `data-target`, `data-prefix`, and `data-suffix` attributes. `animateCounter()` drives a `requestAnimationFrame` loop with an ease-out cubic curve over 1500 ms.

**Carousel** — Cards use `display:none` / `display:block` with a `cardFadeIn` CSS keyframe animation on the active card. Auto-rotation (`setInterval`, 5 s) pauses on hover and resets on any manual interaction.

**Form submission** — The form `action` POSTs to `https://formsubmit.co/your-email@example.com`. JavaScript intercepts `submit`, validates client-side, then calls `fetch` asynchronously so the page never reloads. The `_honey` input is a hidden honeypot field required by FormSubmit — do not remove it.

## FormSubmit Setup (required before going live)

1. Replace `your-email@example.com` in the `<form action>` attribute in `index.html`.
2. Update the `_next` hidden input to the actual published domain.
3. Submit the form once — FormSubmit sends a one-time activation email to that address; click the link in it.
