/* =========================================================
   CGPA → German grade (modified Bavarian formula)
   Used by the "German Grade" tab on the home page and by cgpa-to-german-grade.html.
   Both pages share the same markup (ids starting with "de"); nothing is sent anywhere.
   ========================================================= */
(function () {
  'use strict';

  const input = document.getElementById('deGrade');
  if (!input) return;
  const maxIn = document.getElementById('deMax');
  const minIn = document.getElementById('deMin');
  const $ = id => document.getElementById(id);
  const STORAGE_KEY = 'cgpa-german-grade';

  /* Translations: translated pages load i18n/<lang>.js first (window.CGPA_I18N) */
  const I18N = window.CGPA_I18N || {};
  const t = (text, vars) => String(I18N[text] || text).replace(/\{(\w+)\}/g, (m, k) => (vars && k in vars ? vars[k] : m));

  // German grade bands, judged on the 1-decimal grade: [highest grade in the band, name]
  const BANDS = [[1.5, 'sehr gut (very good)'], [2.5, 'gut (good)'], [3.5, 'befriedigend (satisfactory)'], [4, 'ausreichend (sufficient)']];

  /* Returns a number, null for an empty box, or NaN for text that isn't a number */
  function parseNumber(text) {
    const s = String(text).trim().replace(',', '.');
    if (s === '') return null;
    if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) return NaN;
    return Number(s);
  }
  const clean = n => Number(n.toPrecision(12));
  const f2 = n => (Math.round(Number(clean(n) + 'e2')) / 100).toFixed(2);
  // uni-assist style: keep one decimal and cut the rest off, so 2.37 → 2.3
  const cut1 = n => (Math.floor(clean(n) * 10 + 1e-9) / 10).toFixed(1);
  const num = n => String(clean(n));

  /* The formula on its own, so it can be checked without a page: returns the grade or an error */
  function germanGrade(nd, nmax, nmin) {
    if ([nd, nmax, nmin].some(Number.isNaN)) return { error: 'number' };
    if (nmax !== null && nmin !== null && nmax <= nmin) return { error: 'range' };
    if (nd === null || nmax === null || nmin === null) return { empty: true };
    if (nd > nmax) return { error: 'above' };
    if (nd < 0) return { error: 'negative' };
    const raw = 1 + 3 * (nmax - nd) / (nmax - nmin);
    return { raw, grade: Math.max(1, raw), below: raw > 4 + 1e-9 };
  }
  window.CGPA_GERMAN_GRADE = germanGrade;

  function setMsg(el, text, kind) {
    el.textContent = text;
    el.className = 'row-msg' + (text ? ' is-' + kind : '');
  }

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ grade: input.value, max: maxIn.value, min: minIn.value })); } catch (e) { /* storage blocked: the converter still works */ }
  }

  function calc() {
    const nd = parseNumber(input.value), nmax = parseNumber(maxIn.value), nmin = parseNumber(minIn.value);
    const r = germanGrade(nd, nmax, nmin);
    let gradeMsg = '', scaleMsg = '';

    if (r.error === 'number') {
      if (Number.isNaN(nd)) gradeMsg = t('Please type your grade as a number, like 3.40.');
      if (Number.isNaN(nmax) || Number.isNaN(nmin)) scaleMsg = t('Nmax and Nmin should be numbers, like 4.0 and 2.0.');
    } else if (r.error === 'range') {
      scaleMsg = t('The maximum grade (Nmax) must be higher than the minimum passing grade (Nmin).');
    } else if (r.error === 'above') {
      gradeMsg = t('Your grade can’t be higher than the maximum grade ({max}).', { max: num(nmax) });
    } else if (r.error === 'negative') {
      gradeMsg = t('Your grade can’t be negative.');
    } else if (r.below) {
      gradeMsg = t('This is below the minimum passing grade ({min}).', { min: num(nmin) });
    }
    setMsg($('deGradeMsg'), gradeMsg, 'error');
    setMsg($('deScaleMsg'), scaleMsg, 'error');
    const invalid = (el, bad) => { if (bad) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid'); };
    invalid(input, gradeMsg);
    [maxIn, minIn].forEach(el => invalid(el, scaleMsg));
    input.placeholder = t('e.g. {x}', { x: nmax === 100 ? '75' : nmax === 5 ? '4.20' : '3.40' });

    // Light up the preset that matches the current Nmax / Nmin
    document.querySelectorAll('.js-de-preset').forEach(b => {
      b.setAttribute('aria-pressed', String(Number(b.dataset.max) === nmax && Number(b.dataset.min) === nmin));
    });

    const showMax = r.error || r.empty ? '' : num(nmax), showMin = r.error || r.empty ? '' : num(nmin);
    if (r.error || r.empty) {
      $('deValue').textContent = '—';
      $('deShort').textContent = '';
      $('deMeter').style.width = '0%';
      $('deBand').textContent = '';
      $('deSub').textContent = r.empty
        ? t('Enter your grade to see the German grade.')
        : t('Fix the boxes above to see the German grade.');
      $('deWork').textContent = r.empty ? t('Example: {work}', { work: '1 + 3 × (4 − 3.4) ÷ (4 − 2) = 1.90' }) : '';
      persist();
      return;
    }

    const shown = r.below ? f2(r.raw) : f2(r.grade);
    $('deValue').textContent = shown;
    $('deShort').textContent = r.below ? '' : t('→ {x} (1 decimal)', { x: cut1(r.grade) });
    $('deMeter').style.width = Math.max(0, Math.min(1, (4 - r.grade) / 3)) * 100 + '%';
    const oneDec = Number(cut1(r.grade));
    const band = BANDS.find(b => oneDec <= b[0] + 1e-9);
    $('deBand').textContent = r.below ? t('Below passing grade in the German system') : t(band[1]);
    $('deSub').textContent = t('Your grade {nd} on a scale from {nmin} (pass) to {nmax} (best)', { nd: num(nd), nmin: showMin, nmax: showMax });
    $('deWork').textContent = `1 + 3 × (${showMax} − ${num(nd)}) ÷ (${showMax} − ${showMin}) = 1 + 3 × ${num(nmax - nd)} ÷ ${num(nmax - nmin)} = ${f2(r.raw)}`;
    persist();
  }

  [input, maxIn, minIn].forEach(el => el.addEventListener('input', calc));
  document.querySelectorAll('.js-de-preset').forEach(b => b.addEventListener('click', function () {
    maxIn.value = b.dataset.max;
    minIn.value = b.dataset.min;
    calc();
  }));
  $('deClear').addEventListener('click', function () {
    input.value = '';
    maxIn.value = '4.0';
    minIn.value = '2.0';
    calc();
    input.focus();
  });
  // "Reset all" on the home page (script.js) clears this converter too
  document.addEventListener('cgpa:reset-all', function () {
    input.value = '';
    maxIn.value = '4.0';
    minIn.value = '2.0';
    calc();
  });

  /* ---------- Start up (restore saved numbers) ---------- */
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { saved = null; }
  if (saved && typeof saved === 'object') {
    if (typeof saved.grade === 'string') input.value = saved.grade;
    if (typeof saved.max === 'string' && saved.max.trim()) maxIn.value = saved.max;
    if (typeof saved.min === 'string' && saved.min.trim()) minIn.value = saved.min;
  }
  calc();
})();
