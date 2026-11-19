// Only the About biography changes language; publication content remains unchanged.
const bioPanels = Array.from(document.querySelectorAll('.profile-bio'));
const bioLanguageButtons = Array.from(document.querySelectorAll('[data-bio-language]'));
function setBioLanguage(language) {
  const selectedLanguage = language === 'zh-CN' ? 'zh-CN' : 'en';
  bioPanels.forEach(panel => { panel.hidden = panel.lang !== selectedLanguage; });
  bioLanguageButtons.forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.bioLanguage === selectedLanguage));
  });
}
let savedBioLanguage = 'en';
try { savedBioLanguage = localStorage.getItem('profile-language') || 'en'; } catch { /* Language switching also works without storage. */ }
setBioLanguage(savedBioLanguage);
bioLanguageButtons.forEach(button => {
  button.addEventListener('click', () => {
    setBioLanguage(button.dataset.bioLanguage);
    try { localStorage.setItem('profile-language', button.dataset.bioLanguage); } catch { /* Keep the in-page selection. */ }
  });
});
document.querySelector('.bio-language-switch').hidden = false;

// Publication controls retain the template's filter and author-expansion behavior.
const rows = Array.from(document.querySelectorAll('tr[data-tags]'));
const filters = Array.from(document.querySelectorAll('.tag-btn'));
filters.forEach(button => {
  const count = rows.filter(row => button.dataset.tag === 'all' || row.dataset.tags.split(',').includes(button.dataset.tag)).length;
  const badge = document.createElement('span');
  badge.className = 'tag-count';
  badge.textContent = count;
  button.append(badge);
});

document.getElementById('tagFilter').addEventListener('click', event => {
  const button = event.target.closest('.tag-btn');
  if (!button) return;
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  rows.forEach(row => {
    row.style.display = button.dataset.tag === 'all' || row.dataset.tags.split(',').includes(button.dataset.tag) ? '' : 'none';
  });
  updateAuthorToggles();
});

const authorShells = Array.from(document.querySelectorAll('.publication-authors-shell'));
authorShells.forEach(shell => {
  const toggle = shell.querySelector('button');
  toggle.addEventListener('click', () => {
    const expanded = shell.classList.toggle('expanded');
    toggle.textContent = expanded ? '▼' : '▶';
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-label', expanded ? 'Collapse author list' : 'Expand author list');
    toggle.title = expanded ? 'Collapse author list' : 'Expand author list';
  });
});
function updateAuthorToggles() {
  authorShells.forEach(shell => {
    if (!shell.getClientRects().length) return;
    const authors = shell.querySelector('.publication-authors');
    const expanded = shell.classList.contains('expanded');
    shell.classList.remove('expanded');
    shell.querySelector('button').hidden = authors.scrollHeight <= authors.clientHeight + 1;
    shell.classList.toggle('expanded', expanded);
  });
}
let resizeFrame;
window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(updateAuthorToggles);
}, { passive: true });
document.fonts.ready.then(updateAuthorToggles);
updateAuthorToggles();

let toastTimer;
async function copyText(text, event) {
  let copied = false;
  try {
    await navigator.clipboard.writeText(text);
    copied = true;
  } catch {
    const field = document.createElement('textarea');
    field.value = text;
    field.style.cssText = 'position:fixed;left:-9999px;top:0';
    document.body.append(field);
    field.select();
    try { copied = document.execCommand('copy'); } catch { /* Show a useful fallback below. */ }
    field.remove();
    event.currentTarget?.focus();
  }
  const toast = document.getElementById('toast');
  toast.textContent = copied ? 'Copied to clipboard' : 'Could not copy. Please select and copy the text.';
  toast.style.setProperty('--toast-x', '50%');
  toast.style.setProperty('--toast-y', '100px');
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}
document.getElementById('email-copy').addEventListener('click', event => {
  event.preventDefault();
  copyText('qiaoweixidian@gmail.com', event);
});
const topButton = document.getElementById('backToTop');
function updateTopButton() { topButton.classList.toggle('visible', window.scrollY > 300); }
window.addEventListener('scroll', updateTopButton, { passive: true });
updateTopButton();
topButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
});

// Apply the initial filter after author controls have been initialized.
document.querySelector(".tag-btn.active").click();
