/* =========================================================
   Shared by every page: light/dark mode, mobile menu, footer year
   ========================================================= */
(function () {
  'use strict';

  const THEME_KEY = 'cgpa-theme';
  const root = document.documentElement;
  const I18N = window.CGPA_I18N || {}; // set by i18n/<lang>.js on translated pages
  const t = text => I18N[text] || text;

  /* ---------- Theme ---------- */
  const themeBtn = document.getElementById('themeToggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeBtn.setAttribute('aria-label', t(theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'));
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#0d1020' : '#f4f6fb');
  }
  themeBtn.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage blocked: theme just isn't remembered */ }
  });
  applyTheme(root.getAttribute('data-theme') || 'light');

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', t(open ? 'Close menu' : 'Open menu'));
  }
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
  });

  /* ---------- Language menu: close when tapping elsewhere ---------- */
  const langMenu = document.getElementById('langMenu');
  if (langMenu) {
    document.addEventListener('click', e => { if (langMenu.open && !langMenu.contains(e.target)) langMenu.open = false; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && langMenu.open) langMenu.open = false; });
  }

  /* ---------- Contact email: put together here so spam bots can't read it from the page source ---------- */
  const mail = document.querySelector('.contact-email[data-user]');
  if (mail) {
    const addr = mail.dataset.user + '@' + mail.dataset.domain;
    mail.href = 'mailto:' + addr;
    mail.textContent = addr;
  }

  /* ---------- Footer year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
