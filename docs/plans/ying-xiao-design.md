# Ying Xiao Design Document

## Design Context

### Source
- Authoritative content source: `page-story-ying-xiao.md`
- Reference design: skipped, per the user's request to avoid existing design documents
- Provided image usage: moderate only; extracted as a single portrait asset rather than reused as a page mockup
- Assumed visual direction: warm editorial
- Assumed aesthetic selection: Field Notes Archive

### Users
Primary visitors are faculty, hiring committees, postdoctoral mentors, collaborators, and students who need a fast but credible read on Ying Xiao's research identity. They arrive looking for a trustworthy snapshot of research focus, institutional context, public updates, and contact pathways without wading through a dense CV-like interface.

### Brand Personality
Rigorous, humane, quietly confident.

The page should feel scholarly and current rather than corporate, flashy, or startup-polished. It should carry enough warmth to feel personal, while still presenting research achievements and job-market status with clarity and professional seriousness.

### Aesthetic Direction
The page should feel like an annotated research folio: parchment-leaning surfaces, precise typography, subtle ledger lines, and a restrained photographic presence. The look is editorial and tactile, but the structure remains digital-first and highly readable. Motion should be light and meaningful. Both light and dark themes should preserve the same archival atmosphere rather than switching into a generic dark UI.

### Design Principles
1. Story before spectacle: sections remain in their original narrative roles, and styling clarifies structure instead of inventing marketing copy.
2. Scholarship through typography: hierarchy comes from strong type pairing, spacing, and timeline treatment rather than oversized UI chrome.
3. Human presence as an accent: the portrait anchors identity, but the research story stays dominant.
4. Temporal information should look temporal: news is rendered as a timeline, not a plain paragraph list.
5. Warmth with discipline: every decorative move should support legibility, credibility, and theme parity.

## Design System

### UI-UX Pro Max Foundation
- Query used: `academic homepage ai researcher warm editorial analog notebook quiet confident`
- Base recommendations retained:
  - Academic/editorial typography rather than generic tech sans-serif
  - Minimal, high-contrast structure with strong whitespace
  - Full light/dark theme support through design tokens
  - Avoid excessive decoration, complex shadows, and novelty effects

### Override Notes
- `ui-ux-pro-max` suggested a louder minimal/editorial palette with pink accent. This was overridden because the page story reads as scholarly and trust-centered, not fashion-forward or campaign-like.
- `ui-ux-pro-max` suggested a hero-first landing page pattern. This was adapted into a dossier-style homepage so the About, Links, and News sections remain faithful to the page-story ordering.

### Palette
Light theme:
- `--bg`: `#f5efe4`
- `--bg-elevated`: `rgba(255, 251, 245, 0.82)`
- `--paper`: `#fffaf2`
- `--ink`: `#221e1a`
- `--ink-soft`: `#5c5146`
- `--line`: `rgba(83, 67, 47, 0.18)`
- `--accent`: `#24557d`
- `--accent-soft`: `rgba(36, 85, 125, 0.12)`
- `--highlight`: `#e9d27a`
- `--shadow`: `rgba(40, 29, 17, 0.10)`

Dark theme:
- `--bg`: `#171412`
- `--bg-elevated`: `rgba(31, 27, 24, 0.84)`
- `--paper`: `#201c18`
- `--ink`: `#f2eadc`
- `--ink-soft`: `#c8bca8`
- `--line`: `rgba(236, 220, 192, 0.12)`
- `--accent`: `#8db7da`
- `--accent-soft`: `rgba(141, 183, 218, 0.16)`
- `--highlight`: `#9e8140`
- `--shadow`: `rgba(0, 0, 0, 0.32)`

### Typography
- Display: `Cormorant Garamond`
- Body: `Crimson Pro`
- Meta labels / dates / UI microcopy: `IBM Plex Mono`

Type rules:
- Nameplate: 4.6rem desktop / 3rem mobile, weight 600, tight leading
- Section headings: 2rem desktop / 1.55rem mobile, weight 600
- Body text: 1.125rem desktop / 1rem mobile, line-height 1.72
- Meta labels: 0.72rem, uppercase, `0.22em` letter spacing

### Layout
- Overall structure: top masthead followed by a two-column dossier layout
- Left rail: portrait, profile metadata, icon links, theme toggle support area
- Right column: About section card followed by News timeline
- Mobile behavior: collapses into a single reading column, with links wrapped into a responsive dock and timeline dates stacked above entries

### Components
- Masthead with large typographic nameplate and quiet sublabel
- About card with highlighted job-market note kept inside the section
- Icon link dock using inline SVG and accessible labels
- News timeline with date rail and article body
- Theme toggle in top-right, persisted with `localStorage`

### Aesthetic Implementation

#### Layout structure
An asymmetric research dossier: a restrained masthead at the top, then a 12-column grid where the left rail behaves like pinned notebook ephemera and the right side carries the reading flow. The left rail may feel slightly object-like, but the primary reading path remains a conventional vertical narrative in the right column. On mobile, all pinned objects flatten into one column in source order.

#### Surface treatment
- Main panels use `background: var(--bg-elevated)` with a warm blur-backed paper feel
- Borders are hairline and visible: `1px solid var(--line)`
- Corners are softened but not pill-like: `border-radius: 28px`
- Shadows stay low and directional: `0 18px 40px var(--shadow)`
- The highlighted job-market note uses a flat paper-strip treatment, not a banner or badge

#### Typography expression
Display typography should feel literary and assured, with high contrast against the quiet body serif. Body copy stays book-like and comfortable for academic reading. Mono labels are used sparingly for dates, section overlines, and metadata, creating a subtle “lab notebook” counterpoint.

#### Decorative rules
- Allowed: ruled-paper grid, margin lines, taped-photo feeling, subtle gradient falloff, thin dividers
- Forbidden: glass blur cards, dashboard widgets, floating KPI counters, neon gradients, decorative 3D shadows
- Link icons should feel like research stationery, not app buttons

#### Spatial rhythm
Airy but not sparse. Use a 12px micro rhythm for inline spacing, a 24px component rhythm, a 40px section rhythm, and 72px page rhythm on desktop. Mobile compresses to 18px / 28px / 44px without losing separation between sections.

#### Signature CSS
- `background-image: linear-gradient(rgba(122, 102, 74, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(122, 102, 74, 0.08) 1px, transparent 1px);`
- `background-size: 32px 32px;`
- `letter-spacing: 0.22em; text-transform: uppercase;`
- `box-shadow: 0 18px 40px var(--shadow);`
- `transform: rotate(-2deg);`

### Anti-Patterns To Avoid
- Generic SaaS hero blocks
- Purple-on-white defaults
- Overuse of cards inside cards
- Moving the job-market statement out of the About section
- Treating the screenshot as a design to trace rather than an image source to reinterpret
