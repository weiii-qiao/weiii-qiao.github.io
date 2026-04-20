# Ying Xiao Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-file homepage that faithfully renders the reconstructed page story as a warm editorial academic homepage with moderate image use, dual themes, accessible icon links, and a responsive news timeline.

**Architecture:** Implement the homepage as a standalone `index.html` with semantic HTML, inline CSS variables, and a minimal inline script for theme persistence. The page will use a dossier layout: a left identity rail and a right reading column, while preserving the About, Links, and News section order from the page story.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, local image asset (`assets/pageclaw/avatar.png`)

---

### Task 1: Create the page shell, theme tokens, and semantic structure

**Files:**
- Modify: `index.html`
- Reference: `page-story-ying-xiao.md`
- Reference: `docs/plans/ying-xiao-design.md`

- [ ] **Step 1: Write the base document scaffold**

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ying Xiao</title>
  </head>
  <body>
    <a class="skip-link" href="#content">Skip to content</a>
    <button class="theme-toggle" type="button" aria-label="Toggle color theme"></button>
    <main id="content" class="page-shell">
      <header class="masthead"></header>
      <section class="dossier-grid"></section>
    </main>
  </body>
</html>
```

- [ ] **Step 2: Add token-driven light/dark CSS variables**

```css
:root {
  --bg: #f5efe4;
  --paper: #fffaf2;
  --ink: #221e1a;
  --accent: #24557d;
}

html[data-theme="dark"] {
  --bg: #171412;
  --paper: #201c18;
  --ink: #f2eadc;
  --accent: #8db7da;
}
```

- [ ] **Step 3: Add theme bootstrap + persistence script**

```js
const storageKey = "ying-xiao-theme";
const savedTheme = localStorage.getItem(storageKey);
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
document.documentElement.dataset.theme = initialTheme;
```

- [ ] **Step 4: Verify the scaffold renders and the theme attribute changes**

Run: `python3 -m http.server 4173`
Expected: Home page loads from `http://localhost:4173` with no missing file errors, and toggling the theme button changes `data-theme` between `light` and `dark`.

- [ ] **Step 5: Commit**

```bash
git add index.html docs/plans/ying-xiao-impl.md docs/plans/ying-xiao-design.md page-story-ying-xiao.md assets/pageclaw/avatar.png
git commit -m "feat: scaffold ying xiao homepage shell"
```

### Task 2: Build the masthead, identity rail, and About section

**Files:**
- Modify: `index.html`
- Reference: `page-story-ying-xiao.md`

- [ ] **Step 1: Add the masthead and left-rail markup**

```html
<header class="masthead">
  <p class="eyebrow">Academic Page Story</p>
  <h1>Ying Xiao</h1>
  <p class="masthead-note">Trustworthy AI software and agents</p>
</header>

<div class="identity-rail">
  <figure class="portrait-card">
    <img src="assets/pageclaw/avatar.png" alt="Portrait of Ying Xiao" />
  </figure>
  <div class="link-dock" aria-label="Profile links"></div>
</div>
```

- [ ] **Step 2: Render the About section exactly once and keep the highlighted note inside it**

```html
<section class="panel about-panel" aria-labelledby="about-title">
  <p class="section-kicker">About</p>
  <h2 id="about-title">About Me</h2>
  <p>...</p>
  <p class="highlight-note">I am currently on the job market ...</p>
</section>
```

- [ ] **Step 3: Style the rail and About card according to the design doc**

```css
.portrait-card {
  transform: rotate(-2deg);
  border-radius: 28px;
  box-shadow: 0 18px 40px var(--shadow);
}

.highlight-note {
  background: linear-gradient(120deg, var(--highlight), rgba(233, 210, 122, 0.35));
  border-left: 4px solid color-mix(in srgb, var(--accent) 36%, var(--highlight));
}
```

- [ ] **Step 4: Verify text hierarchy and reading width**

Run: `python3 -m http.server 4173`
Expected: The masthead, portrait, and About section feel balanced at 375px and 1200px, with body text staying readable and no horizontal overflow.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add masthead and about dossier layout"
```

### Task 3: Implement the icon link dock and News timeline

**Files:**
- Modify: `index.html`
- Reference: `page-story-ying-xiao.md`

- [ ] **Step 1: Build the Links section as icon-based actions using inline SVG**

```html
<nav class="link-dock" aria-label="Profile links">
  <a href="#" aria-label="Email">...</a>
  <a href="#" aria-label="Google Scholar">...</a>
  <a href="#" aria-label="GitHub">...</a>
  <a href="#" aria-label="LinkedIn">...</a>
  <a href="#" aria-label="Rednote">...</a>
</nav>
```

- [ ] **Step 2: Build the News section as a timeline**

```html
<section class="panel news-panel" aria-labelledby="news-title">
  <p class="section-kicker">Updates</p>
  <h2 id="news-title">News</h2>
  <ol class="news-timeline">
    <li class="news-item">
      <time datetime="2025-12">Dec 2025</time>
      <div class="news-copy">...</div>
    </li>
  </ol>
</section>
```

- [ ] **Step 3: Add hover, focus, and active states for every link**

```css
.link-dock a:hover,
.link-dock a:focus-visible {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--accent) 42%, var(--line));
  box-shadow: 0 10px 24px var(--shadow);
}
```

- [ ] **Step 4: Verify keyboard navigation and screen-reader labels**

Run: `python3 -m http.server 4173`
Expected: Each icon link is focusable, shows a visible focus ring, and exposes a descriptive `aria-label`. Timeline dates align correctly on desktop and stack on mobile.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add accessible link dock and news timeline"
```

### Task 4: Add responsive behavior, motion, and final theme interactions

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add responsive grid breakpoints**

```css
@media (max-width: 900px) {
  .dossier-grid {
    grid-template-columns: 1fr;
  }

  .news-item {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Add reduced-motion handling and gentle entrance transitions**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Complete the theme toggle button logic**

```js
toggleButton.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(storageKey, nextTheme);
});
```

- [ ] **Step 4: Verify dual-theme parity**

Run: `python3 -m http.server 4173`
Expected: Both themes retain the same editorial atmosphere, links remain legible, and the highlighted About note still stands out without failing contrast.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: complete responsive theming and motion support"
```

### Task 5: Final polish and smoke checks

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Inspect for spacing, icon alignment, and section rhythm issues**

```text
Check the masthead baseline, portrait tilt, icon button alignment, highlighted note padding, and timeline divider spacing against the design document.
```

- [ ] **Step 2: Validate there is no horizontal scroll at key widths**

Run: `python3 -m http.server 4173`
Expected: No horizontal scroll at 375px, 768px, 1200px, or 1440px.

- [ ] **Step 3: Validate semantics and asset paths**

```text
Confirm that all local asset paths resolve relative to index.html, all section headings are sequential, and the portrait includes meaningful alt text.
```

- [ ] **Step 4: Save the final file set**

```bash
git add index.html assets/pageclaw/avatar.png
```

- [ ] **Step 5: Commit**

```bash
git commit -m "feat: ship pageclaw homepage for ying xiao"
```
