# Journey's End Funeral Home — website

## Project status: ✅ Completed

This is the final, production-ready build of the Journey's End Funeral Home
website. It has been through a full functional, mobile, desktop, accessibility,
SEO, and content audit — see the closed PRs on this repository for the detailed
history. Approved and ready for deployment/handover to the client.

Final commit: `4879b7b` — "Move Google Reviews below Team section; remove policy
call-out text".

Static site. No build step, no dependencies, no framework.

## Structure

```
index.html    Markup, SEO meta, JSON-LD
styles.css    All styles
main.js       Mobile menu, scroll reveal, floating WhatsApp button
assets/       Images referenced by index.html (see below)
```

## Deploying on Vercel

1. Push this folder to a GitHub repository (as the repo root, not nested).
2. In Vercel: New Project → import the repository.
3. Framework preset: **Other** (no build command, no output directory needed).
4. Deploy.

Because this is plain HTML/CSS/JS with no build tooling, Vercel will serve it as static
files with no configuration required.

## Before going live — replace the placeholder domain

`index.html` currently references `https://journeysendfuneralhome.co.za/` in:

- the `<link rel="canonical">` tag
- `og:image` and other Open Graph tags
- the `FuneralHome` JSON-LD block (`url` and `image` fields)

Once the real production domain is known (the Vercel domain, or a connected custom
domain), search and replace that placeholder throughout `index.html`.

## Assets actually used by the page

| File | Used for |
|---|---|
| `assets/logo-hero.png` / `.webp` (+ `-sm` variants) | Hero logo, responsive `srcset` |
| `assets/logo.png` | Footer mark, JSON-LD `image` |
| `assets/logo-sm.png` | Apple touch icon |
| `assets/favicon.png` | Browser favicon |
| `assets/team.jpg` / `assets/team-sm.jpg` | Team section photo, responsive `srcset` |
| `assets/og.jpg` | Open Graph share image |

The header wordmark ("Journey's End") is styled text, not an image. Floral/botanical
details are inline SVG in `index.html`, styled from `styles.css` — no separate image
files.

## Fonts

EB Garamond and Inter load from Google Fonts via `<link>` tags in `index.html`. This
requires an internet connection at runtime (same as most production sites) — nothing
here depends on this build environment.

## Editing content

- Contact details, hours, and address: search `index.html` for the `Contact` section
  and the JSON-LD block near the top (keep both in sync).
- WhatsApp number: `27813251340` appears throughout `index.html` in `wa.me` links —
  search and replace if it changes.
- There is no contact form — enquiries go through the `tel:`/`wa.me` links and the
  floating WhatsApp button (`main.js`), by design.
