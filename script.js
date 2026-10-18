/* =========================================================
   CGPA Calculator – all the logic
   ========================================================= */
(function () {
  'use strict';

  /* University pages set window.CGPA_PAGE (scales, conversions, storageKey) before this file loads */
  const PAGE = window.CGPA_PAGE || {};

  /* ---------- Grading scales: [grade, points, minimum marks %, lowest points if a range] ---------- */
  const SCALES = PAGE.scales || {
    '4': {
      max: 4, label: '4.0 scale', region: 'Pakistan / USA', example: '3.45',
      grades: [['A', 4, 85], ['A-', 3.67, 80], ['B+', 3.33, 75], ['B', 3, 71], ['B-', 2.67, 68],
        ['C+', 2.33, 64], ['C', 2, 61], ['C-', 1.67, 58], ['D+', 1.33, 54], ['D', 1, 50], ['F', 0, 0]]
    },
    '10': {
      max: 10, label: '10-point scale', region: 'India', example: '8.20',
      grades: [['O', 10, 90], ['A+', 9, 80], ['A', 8, 70], ['B+', 7, 60], ['B', 6, 50],
        ['C', 5, 45], ['P', 4, 40], ['F', 0, 0]]
    },
    '5': {
      max: 5, label: '5.0 scale', region: 'e.g. Nigeria', example: '4.10',
      grades: [['A', 5, 70], ['B', 4, 60], ['C', 3, 50], ['D', 2, 45], ['E', 1, 40], ['F', 0, 0]]
    }
  };
  Object.values(SCALES).forEach(function (s) {
    s.grades = s.grades.map(([grade, points, min, pmin]) => ({ grade, points, min, pmin }));
    s.modes = s.modes || ['grade', 'marks']; // grade = pick a letter, marks = type marks, points = type grade points
  });

  /* ---------- CGPA → percentage formulas ---------- */
  const CONVERSIONS = PAGE.conversions || {
    '4': {
      formula: 'Percentage = (CGPA ÷ 4) × 100',
      expr: c => `(${c} ÷ 4) × 100`,
      calc: c => (c / 4) * 100,
      example: 3.5,
      note: 'This is the most common method for the 4.0 scale. Some universities use their own formula, so check your transcript or university website.'
    },
    '10': {
      formula: 'Percentage = CGPA × 9.5',
      expr: c => `${c} × 9.5`,
      calc: c => c * 9.5,
      example: 8.5,
      note: 'This is the CBSE method used by most Indian boards and universities. Some universities use their own rule, for example VTU uses (CGPA − 0.75) × 10.'
    },
    '5': {
      formula: 'Percentage = (CGPA ÷ 5) × 100',
      expr: c => `(${c} ÷ 5) × 100`,
      calc: c => (c / 5) * 100,
      example: 4.2,
      note: 'A simple proportional conversion. Many universities on the 5.0 scale publish their own table, so check yours.'
    }
  };

  const TARGET_FIELDS = [
    { id: 'tCurrent', key: 'current', kind: 'gpa' },
    { id: 'tDone', key: 'done', kind: 'credits' },
    { id: 'tTarget', key: 'target', kind: 'gpa' },
    { id: 'tLeft', key: 'left', kind: 'credits' }
  ];

  const STORAGE_KEY = PAGE.storageKey || 'cgpa-calculator-data';
  const MODE_HEADINGS = { grade: 'Grade', marks: 'Marks (%)', points: 'Grade points' };

  const ICON_TRASH = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>';

  /* ---------- Small helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  // Rounds half up to 2 decimals. Plain toFixed() can round 78.565 down to 78.56,
  // because 78.565 is stored as 78.56499999… inside the computer.
  const round2 = n => {
    const clean = Number(n.toPrecision(12));
    return Math.abs(clean) < 1e-6 ? 0 : Math.round(Number(clean + 'e2')) / 100;
  };
  const f2 = n => round2(n).toFixed(2);
  const cleanNum = n => String(round2(n));
  /* Translations: translated pages load i18n/<lang>.js first, which sets
     window.CGPA_I18N = { 'English text with {placeholders}': 'translation' } */
  const I18N = window.CGPA_I18N || {};
  const t = (text, vars) => String(I18N[text] || text)
    .replace(/\{(\w+)\}/g, (m, k) => (vars && k in vars ? vars[k] : m));
  window.CGPA_T = t; // used by university configs at run time
  let uid = 0;

  function readStorage(key) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  }
  function writeStorage(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage blocked: the app still works */ }
  }

  /* Returns a number, null for an empty box, or NaN for text that isn't a number */
  function parseNumber(text) {
    const t = String(text).trim().replace(',', '.');
    if (t === '') return null;
    if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(t)) return NaN;
    return Number(t);
  }

  function setMsg(el, text, kind) {
    el.textContent = text;
    el.className = 'row-msg' + (text ? ' is-' + kind : '');
  }

  function cheer(ratio) {
    if (ratio >= 0.9) return t('Outstanding! You’re a star 🌟');
    if (ratio >= 0.8) return t('Excellent! 🎉');
    if (ratio >= 0.7) return t('Very good, keep it up 👏');
    if (ratio >= 0.6) return t('Good! You can push even higher 💪');
    if (ratio >= 0.5) return t('Keep going, you’re on track 📚');
    return t('Don’t give up. Every semester is a fresh start 🌱');
  }

  function skippedNote(n) {
    if (!n) return '';
    return n === 1
      ? t('1 row still needs a fix or more info, so it isn’t counted yet.')
      : t('{n} rows still need a fix or more info, so they aren’t counted yet.', { n });
  }

  /* Fills one result box (ids like gpaValue, gpaMax, gpaMeter …) */
  function setResult(prefix, r) {
    $('#' + prefix + 'Value').textContent = r.text || '—';
    const maxEl = $('#' + prefix + 'Max');
    if (maxEl && r.max !== undefined) maxEl.textContent = '/ ' + f2(r.max);
    const ratio = r.ratio == null ? 0 : Math.max(0, Math.min(1, r.ratio));
    $('#' + prefix + 'Meter').style.width = ratio * 100 + '%';
    $('#' + prefix + 'Cheer').textContent = r.cheer || '';
    $('#' + prefix + 'Sub').textContent = r.sub || '';
    const noteEl = $('#' + prefix + 'Note');
    if (noteEl) { noteEl.textContent = r.note || ''; noteEl.hidden = !r.note; }
  }

  let toastTimer;
  function toast(text) {
    const el = $('#toast');
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
  }

  /* ---------- App state ---------- */
  // Note: number-like keys ('2021', '2022') are always listed smallest first, so pages can name their default
  const FIRST_SCALE = SCALES[PAGE.defaultScale] ? PAGE.defaultScale : Object.keys(SCALES)[0];
  const state = {
    scale: FIRST_SCALE,
    mode: 'grade',
    convScale: FIRST_SCALE,
    tab: 'tab-gpa',
    results: { gpa: null, cgpa: null, target: null, pct: null }
  };
  let ready = false; // stops saving while the page is still being built

  const subjectList = $('#subjectList');
  const semesterList = $('#semesterList');
  const convInput = $('#convInput');
  const scaleSelect = $('#scaleSelect');

  /* ---------- Tabs ---------- */
  const tabs = $$('[role="tab"]');
  function activateTab(tab, focus) {
    tabs.forEach(function (t) {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
    state.tab = tab.id;
    persist();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', function (e) {
      let j = null;
      if (e.key === 'ArrowRight') j = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') j = 0;
      else if (e.key === 'End') j = tabs.length - 1;
      if (j !== null) { e.preventDefault(); activateTab(tabs[j], true); }
    });
  });
  const tabById = id => tabs.find(t => t.id === id);

  /* ---------- Grade table ---------- */
  function renderGradeTable() {
    const sc = SCALES[state.scale];
    $('#tableTitle').textContent = t('Grade points ({scale})', { scale: t(sc.label) });
    $('#tableSubtitle').textContent = t('{region} · highest grade point is {max}', { region: t(sc.region), max: f2(sc.max) });
    const showMarks = sc.grades.some(g => g.min != null); // relative grading has no fixed marks
    const marksCol = $('#marksCol');
    if (marksCol) marksCol.hidden = !showMarks;
    $('#gradeTableBody').innerHTML = sc.grades.map(function (g, i) {
      const top = i === 0 ? 100 : sc.grades[i - 1].min - 1;
      const pts = g.pmin != null ? `${f2(g.pmin)}–${f2(g.points)}` : f2(g.points);
      return `<tr><td><span class="grade-pill">${g.grade}</span></td><td class="num">${pts}</td>` +
        (showMarks ? `<td class="num">${g.min}–${top}</td>` : '') + '</tr>';
    }).join('');
  }

  function gradeFromMarks(marks, sc) {
    return sc.grades.find(g => marks >= g.min);
  }

  // Which letter a grade-point value belongs to (for scales where a letter covers a range)
  function gradeFromPoints(pts, sc) {
    return sc.grades.find(g => pts >= (g.pmin != null ? g.pmin : g.points) - 1e-9) || sc.grades[sc.grades.length - 1];
  }

  function fillGradeSelect(select) {
    const sc = SCALES[state.scale];
    const previous = select.value;
    select.innerHTML = '<option value="">' + t('Select') + '</option>' +
      sc.grades.map(g => `<option value="${g.grade}">${g.grade} (${f2(g.points)})</option>`).join('');
    select.value = previous; // falls back to "Select" if this grade doesn't exist on the new scale
  }

  /* ---------- Shared row helpers ---------- */
  function hasContent(data) {
    return Object.values(data || {}).some(v => String(v || '').trim() !== '');
  }

  function wireRow(row, list, recalc) {
    $('.remove-btn', row).addEventListener('click', function () {
      if (list.children.length <= 1) {
        $$('input, select', row).forEach(el => { el.value = ''; });
        delete row.dataset.touched;
      } else {
        row.remove();
      }
      recalc();
    });
    // Only nag about missing boxes after the student has left the row
    row.addEventListener('focusout', function (e) {
      if (!row.contains(e.relatedTarget)) { row.dataset.touched = '1'; recalc(); }
    });
  }

  /* =========================================================
     TAB 1 – Semester GPA
     ========================================================= */
  function addSubjectRow(data, focus) {
    const id = 'sub' + (++uid);
    const row = document.createElement('div');
    row.className = 'row subject-row';
    row.innerHTML = `
      <div class="field f-name">
        <label class="field-label" for="${id}-n">${t('Subject name (optional)')}</label>
        <input type="text" id="${id}-n" class="in-name" maxlength="60" autocomplete="off" placeholder="${t('e.g. Calculus')}">
      </div>
      <div class="field f-credit">
        <label class="field-label" for="${id}-c">${t('Credit hours')}</label>
        <input type="text" id="${id}-c" class="in-credit" inputmode="decimal" autocomplete="off" placeholder="${t('e.g. {x}', { x: 3 })}">
      </div>
      <div class="field f-grade">
        <label class="field-label lbl-grade" for="${id}-g">${t('Grade')}</label>
        <label class="field-label lbl-marks" for="${id}-m">${t('Marks (out of 100)')}</label>
        <label class="field-label lbl-points" for="${id}-p">${t('Grade points')}</label>
        <select id="${id}-g" class="in-grade"></select>
        <input type="text" id="${id}-m" class="in-marks" inputmode="decimal" autocomplete="off" placeholder="0 – 100">
        <input type="text" id="${id}-p" class="in-points" inputmode="decimal" autocomplete="off" placeholder="${t('e.g. {x}', { x: SCALES[state.scale].example })}">
      </div>
      <button type="button" class="remove-btn" aria-label="${t('Remove subject')}" title="${t('Remove')}">${ICON_TRASH}</button>
      <p class="row-msg"></p>`;

    const gradeIn = $('.in-grade', row);
    fillGradeSelect(gradeIn);
    if (data) {
      $('.in-name', row).value = String(data.name || '');
      $('.in-credit', row).value = String(data.credit || '');
      $('.in-marks', row).value = String(data.marks || '');
      $('.in-points', row).value = String(data.points || '');
      gradeIn.value = String(data.grade || '');
      if (hasContent(data)) row.dataset.touched = '1';
    }
    wireRow(row, subjectList, calcGPA);
    subjectList.appendChild(row);
    if (focus) $('.in-name', row).focus();
    return row;
  }

  function calcGPA() {
    const sc = SCALES[state.scale];
    const mode = state.mode;
    let credits = 0, points = 0, counted = 0, skipped = 0;
    const lines = [];

    $$('.subject-row', subjectList).forEach(function (row, i) {
      const nameIn = $('.in-name', row), creditIn = $('.in-credit', row);
      const gradeIn = $('.in-grade', row), marksIn = $('.in-marks', row), pointsIn = $('.in-points', row);
      const msg = $('.row-msg', row);
      const touched = row.dataset.touched === '1';
      [creditIn, gradeIn, marksIn, pointsIn].forEach(el => el.removeAttribute('aria-invalid'));

      const credit = parseNumber(creditIn.value);
      const marks = parseNumber(marksIn.value);
      const pts = parseNumber(pointsIn.value);
      const gradeEmpty = mode === 'marks' ? marks === null : mode === 'points' ? pts === null : gradeIn.value === '';
      if (credit === null && gradeEmpty) { setMsg(msg, ''); return; } // empty row: ignore

      let error = null, badField = null, grade = null, info = '';

      if (credit === null) {
        if (touched) { error = t('Please enter the credit hours for this subject.'); badField = creditIn; }
      } else if (Number.isNaN(credit)) {
        error = t('Credit hours should be a number, like 3 or 1.5.'); badField = creditIn;
      } else if (credit <= 0) {
        error = t('Credit hours must be more than 0.'); badField = creditIn;
      } else if (credit > 30) {
        error = t('That looks too high. Credit hours are usually between 1 and 6.'); badField = creditIn;
      }

      if (!error) {
        if (mode === 'points') {
          if (pts === null) {
            if (touched) { error = t('Please enter the grade points for this subject.'); badField = pointsIn; }
          } else if (Number.isNaN(pts)) {
            error = t('Grade points should be a number, like {x}.', { x: sc.example }); badField = pointsIn;
          } else if (pts < 0 || pts > sc.max) {
            error = t('Grade points should be between 0 and {max}.', { max: f2(sc.max) }); badField = pointsIn;
          } else {
            grade = { grade: gradeFromPoints(pts, sc).grade, points: pts };
            info = t('{points} points = grade {grade}', { points: f2(pts), grade: grade.grade });
          }
        } else if (mode === 'marks') {
          if (marks === null) {
            if (touched) { error = t('Please enter the marks you got (0 to 100).'); badField = marksIn; }
          } else if (Number.isNaN(marks)) {
            error = t('Marks should be a number, like 78.'); badField = marksIn;
          } else if (marks < 0 || marks > 100) {
            error = t('Marks should be between 0 and 100.'); badField = marksIn;
          } else {
            grade = gradeFromMarks(marks, sc);
            info = t('{marks} marks = grade {grade} ({points} points)', { marks: cleanNum(marks), grade: grade.grade, points: f2(grade.points) });
          }
        } else if (gradeIn.value === '') {
          if (touched) { error = t('Please choose a grade from the list.'); badField = gradeIn; }
        } else {
          grade = sc.grades.find(g => g.grade === gradeIn.value) || null;
        }
      }

      if (error) {
        badField.setAttribute('aria-invalid', 'true');
        setMsg(msg, error, 'error');
        skipped++;
        return;
      }
      setMsg(msg, info, 'info');
      if (credit === null || !grade) { skipped++; return; }

      credits += credit;
      points += credit * grade.points;
      counted++;
      lines.push(t('{name}: {credits} credits, grade {grade} ({points})', { name: nameIn.value.trim() || t('Subject {n}', { n: i + 1 }), credits: cleanNum(credit), grade: grade.grade, points: f2(grade.points) }));
    });

    if (counted === 0) {
      state.results.gpa = null;
      setResult('gpa', { max: sc.max, sub: t('Add your subjects to see your GPA.'), note: skippedNote(skipped) });
    } else {
      const gpa = points / credits;
      state.results.gpa = { value: gpa, credits, lines };
      setResult('gpa', {
        text: f2(gpa), max: sc.max, ratio: gpa / sc.max, cheer: cheer(gpa / sc.max),
        sub: t(counted === 1 ? '1 subject · {credits} credit hours · {points} grade points' : '{n} subjects · {credits} credit hours · {points} grade points', { n: counted, credits: cleanNum(credits), points: f2(points) }),
        note: skippedNote(skipped)
      });
    }
    persist();
  }

  function setMode(mode) {
    state.mode = mode;
    subjectList.className = 'row-list mode-' + mode;
    $('#gradeHead').textContent = t(MODE_HEADINGS[mode]);
    const radio = $(`input[name="gpaMode"][value="${mode}"]`);
    if (radio) radio.checked = true;
  }

  // Show only the entry modes the current scale allows (e.g. no marks for relative grading)
  function applyModes() {
    const modes = SCALES[state.scale].modes;
    const radios = $$('input[name="gpaMode"]');
    radios.forEach(function (r) {
      const allowed = modes.includes(r.value);
      r.disabled = !allowed;
      const label = $(`label[for="${r.id}"]`);
      if (label) label.hidden = !allowed;
    });
    const switcher = $('#modeSwitch');
    if (switcher) switcher.hidden = radios.filter(r => !r.disabled).length < 2;
    if (!modes.includes(state.mode)) setMode(modes[0]);
  }

  /* =========================================================
     TAB 2 – CGPA
     ========================================================= */
  function addSemesterRow(data, focus) {
    const id = 'sem' + (++uid);
    const row = document.createElement('div');
    row.className = 'row semester-row';
    row.innerHTML = `
      <div class="sem-label"><span class="sem-badge"></span><span class="sem-title"></span></div>
      <div class="field f-gpa">
        <label class="field-label" for="${id}-g">${t('GPA / SGPA')}</label>
        <input type="text" id="${id}-g" class="in-gpa" inputmode="decimal" autocomplete="off">
      </div>
      <div class="field f-credit">
        <label class="field-label" for="${id}-c">${t('Credit hours')}</label>
        <input type="text" id="${id}-c" class="in-credit" inputmode="decimal" autocomplete="off" placeholder="${t('e.g. {x}', { x: 18 })}">
      </div>
      <button type="button" class="remove-btn" title="${t('Remove')}">${ICON_TRASH}</button>
      <p class="row-msg"></p>`;

    $('.in-gpa', row).placeholder = t('e.g. {x}', { x: SCALES[state.scale].example });
    if (data) {
      $('.in-gpa', row).value = String(data.gpa || '');
      $('.in-credit', row).value = String(data.credit || '');
      if (hasContent(data)) row.dataset.touched = '1';
    }
    wireRow(row, semesterList, calcCGPA);
    semesterList.appendChild(row);
    renumberSemesters();
    if (focus) $('.in-gpa', row).focus();
    return row;
  }

  function renumberSemesters() {
    $$('.semester-row', semesterList).forEach(function (row, i) {
      $('.sem-badge', row).textContent = i + 1;
      $('.sem-title', row).textContent = t('Semester {n}', { n: i + 1 });
      $('.remove-btn', row).setAttribute('aria-label', t('Remove semester {n}', { n: i + 1 }));
    });
  }

  function calcCGPA() {
    renumberSemesters();
    const sc = SCALES[state.scale];
    let credits = 0, points = 0, counted = 0, skipped = 0;
    const lines = [];

    $$('.semester-row', semesterList).forEach(function (row, i) {
      const gpaIn = $('.in-gpa', row), creditIn = $('.in-credit', row), msg = $('.row-msg', row);
      const touched = row.dataset.touched === '1';
      gpaIn.removeAttribute('aria-invalid');
      creditIn.removeAttribute('aria-invalid');

      const gpa = parseNumber(gpaIn.value);
      const credit = parseNumber(creditIn.value);
      if (gpa === null && credit === null) { setMsg(msg, ''); return; }

      let error = null, badField = null;
      if (gpa === null) {
        if (touched) { error = t('Please enter the GPA for this semester.'); badField = gpaIn; }
      } else if (Number.isNaN(gpa)) {
        error = t('GPA should be a number, like {x}.', { x: sc.example }); badField = gpaIn;
      } else if (gpa < 0) {
        error = t('GPA can’t be negative.'); badField = gpaIn;
      } else if (gpa > sc.max) {
        error = t('GPA can’t be more than {max} on the {scale}.', { max: f2(sc.max), scale: t(sc.label) }) +
          (Object.keys(SCALES).length > 1 ? ' ' + t('Did you pick the right option at the top?') : '');
        badField = gpaIn;
      }
      if (!error) {
        if (credit === null) {
          if (touched) { error = t('Please enter the total credit hours for this semester.'); badField = creditIn; }
        } else if (Number.isNaN(credit)) {
          error = t('Credit hours should be a number, like 18.'); badField = creditIn;
        } else if (credit <= 0) {
          error = t('Credit hours must be more than 0.'); badField = creditIn;
        } else if (credit > 60) {
          error = t('That looks too high. A semester usually has 12 to 24 credit hours.'); badField = creditIn;
        }
      }

      if (error) {
        badField.setAttribute('aria-invalid', 'true');
        setMsg(msg, error, 'error');
        skipped++;
        return;
      }
      setMsg(msg, '');
      if (gpa === null || credit === null) { skipped++; return; }

      credits += credit;
      points += gpa * credit;
      counted++;
      lines.push(t('Semester {n}: GPA {gpa}, {credits} credits', { n: i + 1, gpa: f2(gpa), credits: cleanNum(credit) }));
    });

    if (counted === 0) {
      state.results.cgpa = null;
      setResult('cgpa', { max: sc.max, sub: t('Add your semesters to see your CGPA.'), note: skippedNote(skipped) });
    } else {
      const cgpa = points / credits;
      state.results.cgpa = { value: cgpa, credits, lines };
      setResult('cgpa', {
        text: f2(cgpa), max: sc.max, ratio: cgpa / sc.max, cheer: cheer(cgpa / sc.max),
        sub: t(counted === 1 ? '1 semester · {credits} total credit hours' : '{n} semesters · {credits} total credit hours', { n: counted, credits: cleanNum(credits) }),
        note: skippedNote(skipped)
      });
    }
    persist();
  }

  /* =========================================================
     TAB 3 – Target CGPA
     ========================================================= */
  function calcTarget() {
    const sc = SCALES[state.scale];
    const v = {};
    let complete = true, anyFilled = false;

    TARGET_FIELDS.forEach(function (f) {
      const input = $('#' + f.id);
      const n = parseNumber(input.value);
      let error = '';
      if (f.kind === 'gpa') input.placeholder = t('e.g. {x}', { x: sc.example });

      if (n === null) {
        complete = false;
      } else {
        anyFilled = true;
        if (Number.isNaN(n)) error = t('Please type a number, like {x}.', { x: f.kind === 'gpa' ? sc.example : 60 });
        else if (n < 0) error = t('This can’t be negative.');
        else if (f.kind === 'gpa' && n > sc.max) error = t('On the {scale} this can’t be more than {max}.', { scale: t(sc.label), max: f2(sc.max) });
        else if (f.kind === 'credits' && n > 500) error = t('That looks too high. Please check the credit hours.');
        else if (f.key === 'left' && n === 0) error = t('Remaining credits must be more than 0.');
      }
      if (error) { input.setAttribute('aria-invalid', 'true'); complete = false; } else input.removeAttribute('aria-invalid');
      setMsg($('#' + f.id + 'Msg'), error, 'error');
      v[f.key] = n;
    });

    if (!complete) {
      state.results.target = null;
      setResult('tgt', {
        max: sc.max,
        sub: anyFilled ? t('Fill in all four boxes to see the GPA you need.') : t('Fill in the four boxes above to see the GPA you need.')
      });
      persist();
      return;
    }

    const total = v.done + v.left;
    const needed = (v.target * total - v.current * v.done) / v.left;
    const neededUp = Math.ceil(needed * 100 - 1e-9) / 100; // round up so you never fall just short
    const best = (v.current * v.done + sc.max * v.left) / total;
    let r;

    if (needed > sc.max + 1e-9) {
      r = {
        text: f2(neededUp), ratio: 1,
        cheer: t('This target is out of reach for now 😕'),
        sub: t('Even with a perfect {max} in every remaining semester, the highest CGPA you can reach is {best}.', { max: f2(sc.max), best: f2(best) }),
        note: t('Try a slightly lower target, or check if you have more credits left.')
      };
      state.results.target = t('To reach a {target} CGPA I would need {needed}, which is above the {max} maximum. The best I can reach is {best}.', { target: f2(v.target), needed: f2(neededUp), max: f2(sc.max), best: f2(best) });
    } else if (needed <= 0) {
      r = {
        text: f2(0), ratio: 0,
        cheer: t('You’ve already secured it! 🎉'),
        sub: t('Your CGPA will stay at or above {target} no matter what. Aim high anyway!', { target: f2(v.target) })
      };
      state.results.target = t('I have already secured a {target} CGPA.', { target: f2(v.target) });
    } else {
      const ratio = needed / sc.max;
      r = {
        text: f2(neededUp), ratio,
        cheer: t(ratio > 0.9 ? 'Tough but possible. Time to go all in! 🔥'
          : ratio > 0.75 ? 'Challenging, but you can do it 💪'
          : ratio > 0.5 ? 'Very doable. Stay consistent 👍'
          : 'Easy target, you’ve got this 😎'),
        sub: t('You need an average GPA of at least {needed} over your remaining {left} credit hours to reach a {target} CGPA.', { needed: f2(neededUp), left: cleanNum(v.left), target: f2(v.target) })
      };
      state.results.target = t('To reach a {target} CGPA (now {current}), I need an average GPA of {needed} over my remaining {left} credit hours.', { target: f2(v.target), current: f2(v.current), needed: f2(neededUp), left: cleanNum(v.left) });
    }
    r.max = sc.max;
    setResult('tgt', r);
    persist();
  }

  /* =========================================================
     TAB 4 – CGPA to percentage
     ========================================================= */
  function setConvScale(scale) {
    state.convScale = scale;
    const radio = $('#conv' + scale);
    if (radio) radio.checked = true;
  }

  // A conversion is either a formula (calc + expr) or a custom rule (result)
  function convert(conv, c) {
    if (conv.result) return conv.result(c);
    const pct = conv.calc(c);
    return { pct, text: f2(pct) + '%', work: `${conv.expr(f2(c))} = ${f2(pct)}%` };
  }

  function calcPercent() {
    const s = state.convScale;
    const conv = CONVERSIONS[s];
    const max = SCALES[s].max;
    convInput.placeholder = t('e.g. {x}', { x: f2(conv.example) });
    $('#formulaMain').textContent = t(conv.formula);
    $('#formulaNote').textContent = t(conv.note);

    const c = parseNumber(convInput.value);
    let error = '';
    if (c !== null) {
      if (Number.isNaN(c)) error = t('Please type your CGPA as a number, like {x}.', { x: f2(conv.example) });
      else if (c < 0) error = t('CGPA can’t be negative.');
      else if (c > max) error = t('On the {scale}, CGPA can’t be more than {max}. Try a different scale.', { scale: t(SCALES[s].label), max: f2(max) });
    }
    setMsg($('#convMsg'), error, 'error');
    if (error) convInput.setAttribute('aria-invalid', 'true'); else convInput.removeAttribute('aria-invalid');

    if (c === null || error) {
      state.results.pct = null;
      $('#formulaWork').textContent = t('Example: {work}', { work: convert(conv, conv.example).work });
      setResult('pct', { sub: error ? t('Fix the CGPA above to see the percentage.') : t('Enter your CGPA to see the percentage.') });
    } else {
      const res = convert(conv, c);
      $('#formulaWork').textContent = res.work;
      state.results.pct = { cgpa: c, text: res.text, scale: s };
      const extra = conv.classify ? ' · ' + t(conv.classify(res.pct)) : '';
      setResult('pct', {
        text: res.text, ratio: res.pct / 100, cheer: cheer(res.pct / 100),
        sub: t('CGPA {cgpa} on the {scale}', { cgpa: f2(c), scale: t(SCALES[s].label) }) + extra
      });
    }
    persist();
  }

  /* ---------- Run everything ---------- */
  function calcAll() {
    calcGPA();
    calcCGPA();
    calcTarget();
    calcPercent();
  }

  function onScaleChange() {
    const sc = SCALES[state.scale];
    renderGradeTable();
    $$('.in-grade', subjectList).forEach(fillGradeSelect);
    $$('.in-gpa', semesterList).forEach(el => { el.placeholder = t('e.g. {x}', { x: sc.example }); });
    $$('.in-points', subjectList).forEach(el => { el.placeholder = t('e.g. {x}', { x: sc.example }); });
    applyModes();
    setConvScale(state.scale);
    calcAll();
  }

  /* ---------- Save in the browser ---------- */
  function persist() {
    if (!ready) return;
    writeStorage(STORAGE_KEY, {
      scale: state.scale,
      mode: state.mode,
      convScale: state.convScale,
      tab: state.tab,
      subjects: $$('.subject-row', subjectList).map(r => ({
        name: $('.in-name', r).value,
        credit: $('.in-credit', r).value,
        grade: $('.in-grade', r).value,
        marks: $('.in-marks', r).value,
        points: $('.in-points', r).value
      })),
      semesters: $$('.semester-row', semesterList).map(r => ({
        gpa: $('.in-gpa', r).value,
        credit: $('.in-credit', r).value
      })),
      target: TARGET_FIELDS.reduce((o, f) => { o[f.key] = $('#' + f.id).value; return o; }, {}),
      conv: convInput.value
    });
  }

  /* ---------- Copy result ---------- */
  function buildCopyText(which) {
    const r = state.results;
    const sc = SCALES[state.scale];
    const footer = '\n— ' + t('calculated with CGPA Calculator');
    if (which === 'gpa' && r.gpa) {
      return [t('My semester GPA: {gpa} / {max} ({scale})', { gpa: f2(r.gpa.value), max: f2(sc.max), scale: t(sc.label) }),
        t('Total credit hours: {credits}', { credits: cleanNum(r.gpa.credits) }), '', ...r.gpa.lines].join('\n') + footer;
    }
    if (which === 'cgpa' && r.cgpa) {
      return [t('My CGPA: {cgpa} / {max} ({scale})', { cgpa: f2(r.cgpa.value), max: f2(sc.max), scale: t(sc.label) }),
        t('Total credit hours: {credits}', { credits: cleanNum(r.cgpa.credits) }), '', ...r.cgpa.lines].join('\n') + footer;
    }
    if (which === 'target' && r.target) return r.target + footer;
    if (which === 'pct' && r.pct) {
      return `CGPA ${f2(r.pct.cgpa)} (${t(SCALES[r.pct.scale].label)}) = ${r.pct.text}\n` +
        t('Formula: {formula}', { formula: t(CONVERSIONS[r.pct.scale].formula) }) + footer;
    }
    return null;
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // Older browsers / opened from a file: fall back to the classic way
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      ta.remove();
      return ok;
    }
  }

  $$('.js-copy').forEach(function (btn) {
    btn.addEventListener('click', async function () {
      const text = buildCopyText(btn.dataset.copy);
      if (!text) { toast(t('Nothing to copy yet. Fill in the boxes first 🙂')); return; }
      toast(t(await copyText(text) ? 'Result copied! Paste it anywhere 📋' : 'Sorry, copying didn’t work in this browser.'));
    });
  });

  /* ---------- Print / PDF ---------- */
  $$('.js-print').forEach(btn => btn.addEventListener('click', () => window.print()));
  window.addEventListener('beforeprint', function () {
    $('#printDate').textContent = t('{scale} · printed on {date}', { scale: t(SCALES[state.scale].label), date: new Date().toLocaleDateString(document.documentElement.lang || undefined) });
  });

  /* ---------- Buttons ---------- */
  $('#addSubject').addEventListener('click', function () { addSubjectRow(null, true); calcGPA(); });
  $('#addSemester').addEventListener('click', function () { addSemesterRow(null, true); calcCGPA(); });

  subjectList.addEventListener('input', calcGPA);
  subjectList.addEventListener('change', calcGPA);
  semesterList.addEventListener('input', calcCGPA);
  TARGET_FIELDS.forEach(f => $('#' + f.id).addEventListener('input', calcTarget));
  convInput.addEventListener('input', calcPercent);

  scaleSelect.addEventListener('change', function () {
    state.scale = scaleSelect.value;
    onScaleChange();
    toast(t('Switched to the {scale}', { scale: t(SCALES[state.scale].label) }));
  });
  $$('input[name="gpaMode"]').forEach(r => r.addEventListener('change', function () { setMode(r.value); calcGPA(); }));
  $$('input[name="convScale"]').forEach(r => r.addEventListener('change', function () { setConvScale(r.value); calcPercent(); }));

  function resetSubjects() { subjectList.innerHTML = ''; for (let i = 0; i < 4; i++) addSubjectRow(); }
  function resetSemesters() { semesterList.innerHTML = ''; for (let i = 0; i < 2; i++) addSemesterRow(); }

  $('#resetGpa').addEventListener('click', function () {
    if (!confirm(t('Clear all subjects in the GPA tab?'))) return;
    resetSubjects(); calcGPA();
  });
  $('#resetCgpa').addEventListener('click', function () {
    if (!confirm(t('Clear all semesters in the CGPA tab?'))) return;
    resetSemesters(); calcCGPA();
  });
  $('#resetTarget').addEventListener('click', function () {
    TARGET_FIELDS.forEach(f => { $('#' + f.id).value = ''; });
    calcTarget();
  });
  $('#resetAll').addEventListener('click', function () {
    if (!confirm(t('Reset everything? This clears all subjects, semesters and numbers you entered.'))) return;
    resetSubjects();
    resetSemesters();
    TARGET_FIELDS.forEach(f => { $('#' + f.id).value = ''; });
    convInput.value = '';
    calcAll();
    toast(t('Everything has been reset ✨'));
  });

  // GPA tab → CGPA tab
  $('#sendToCgpa').addEventListener('click', function () {
    const g = state.results.gpa;
    if (!g) { toast(t('Add at least one complete subject first 🙂')); return; }
    const emptyRow = $$('.semester-row', semesterList)
      .find(r => !$('.in-gpa', r).value.trim() && !$('.in-credit', r).value.trim());
    const row = emptyRow || addSemesterRow();
    $('.in-gpa', row).value = f2(g.value);
    $('.in-credit', row).value = cleanNum(g.credits);
    calcCGPA();
    activateTab(tabById('tab-cgpa'));
    toast(t('Added as {semester} ✅', { semester: $('.sem-title', row).textContent }));
  });

  // CGPA tab → percentage tab
  $('#sendToPct').addEventListener('click', function () {
    const c = state.results.cgpa;
    if (!c) { toast(t('Add at least one complete semester first 🙂')); return; }
    convInput.value = f2(c.value);
    setConvScale(state.scale);
    calcPercent();
    activateTab(tabById('tab-pct'));
  });

  $('#useMyCgpa').addEventListener('click', function () {
    const c = state.results.cgpa || state.results.gpa;
    if (!c) { toast(t('Calculate your CGPA in the CGPA tab first 🙂')); return; }
    convInput.value = f2(c.value);
    setConvScale(state.scale);
    calcPercent();
  });

  $('#fillTarget').addEventListener('click', function () {
    const c = state.results.cgpa;
    if (!c) { toast(t('Calculate your CGPA in the CGPA tab first 🙂')); return; }
    $('#tCurrent').value = f2(c.value);
    $('#tDone').value = cleanNum(c.credits);
    calcTarget();
    $('#tTarget').focus();
  });

  /* ---------- Start up (restore saved data) ---------- */
  const saved = readStorage(STORAGE_KEY) || {};
  if (SCALES[saved.scale]) state.scale = saved.scale;
  scaleSelect.value = state.scale;
  setMode(SCALES[state.scale].modes.includes(saved.mode) ? saved.mode : SCALES[state.scale].modes[0]);
  applyModes();
  renderGradeTable();

  const savedSubjects = Array.isArray(saved.subjects) && saved.subjects.length ? saved.subjects : [{}, {}, {}, {}];
  savedSubjects.forEach(d => addSubjectRow(d));
  const savedSemesters = Array.isArray(saved.semesters) && saved.semesters.length ? saved.semesters : [{}, {}];
  savedSemesters.forEach(d => addSemesterRow(d));

  if (saved.target && typeof saved.target === 'object') {
    TARGET_FIELDS.forEach(f => { $('#' + f.id).value = String(saved.target[f.key] || ''); });
  }
  convInput.value = typeof saved.conv === 'string' ? saved.conv : '';
  setConvScale(CONVERSIONS[saved.convScale] ? saved.convScale : state.scale);

  activateTab(tabById(saved.tab) || tabs[0]);

  ready = true;
  calcAll();
})();
