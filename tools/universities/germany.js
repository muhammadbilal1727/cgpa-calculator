/* German university pages for tools/build-university-pages.js (same fields as the entries in that file).
   German grades run from 1.0 (best) to 4.0 (lowest pass), so these pages use a "lower is better" scale. */

const DE_MSGS = {
  'Add your subjects to see your GPA.': 'Add your modules to see your grade average.',
  'Add your semesters to see your CGPA.': 'Add your semesters to see your overall grade.',
  'Fill in the four boxes above to see the GPA you need.': 'Fill in the four boxes above to see the average you need.',
  'Fill in all four boxes to see the GPA you need.': 'Fill in all four boxes to see the average you need.',
  'Enter your CGPA to see the percentage.': 'Enter your grade from abroad to see the German equivalent.',
  'Fix the CGPA above to see the percentage.': 'Fix the grade above to see the result.',
  'Please enter the GPA for this semester.': 'Please enter the average grade for this semester.',
  'Please enter the credit hours for this subject.': 'Please enter the ECTS credits for this module.',
  'Please enter the total credit hours for this semester.': 'Please enter the ECTS credits for this semester.',
  'That looks too high. Credit hours are usually between 1 and 6.': 'That looks too high. Please check the ECTS credits.',
  'That looks too high. A semester usually has 12 to 24 credit hours.': 'That looks too high. A semester usually has about 30 ECTS credits.',
  'GPA / SGPA': 'Average',
  'Subject name (optional)': 'Module name (optional)',
  'e.g. Calculus': 'e.g. Analysis 1',
  'Grade points ({scale})': 'Grades ({scale})',
  'Please type your CGPA as a number, like {x}.': 'Please type your grade as a number, like {x}.',
  'CGPA can’t be negative.': 'A grade can’t be negative.',
  'On the {scale}, CGPA can’t be more than {max}. Try a different scale.': 'On the {scale}, a grade can’t be more than {max}. Try a different scale.',
  'Calculate your CGPA in the CGPA tab first 🙂': 'Work out your overall grade in the Overall tab first 🙂',
  'Add at least one complete subject first 🙂': 'Add at least one complete module first 🙂',
  'Semester {n}: GPA {gpa}, {credits} credits': 'Semester {n}: average {gpa}, {credits} ECTS',
  '{name}: {credits} credits, grade {grade} ({points})': '{name}: {credits} ECTS, grade {grade}',
  'My semester GPA: {gpa} ({scale})': 'My grade average: {gpa} ({scale})',
  'My CGPA: {cgpa} ({scale})': 'My overall grade: {cgpa} ({scale})',
  'Total credit hours: {credits}': 'Total ECTS credits: {credits}',
  '1 subject · {credits} credits': '1 module · {credits} ECTS',
  '{n} subjects · {credits} credits': '{n} modules · {credits} ECTS',
  '1 semester · {credits} total credit hours': '1 semester · {credits} ECTS',
  '{n} semesters · {credits} total credit hours': '{n} semesters · {credits} ECTS',
  'You need an average of {needed} or better over your remaining {left} credit hours to reach a {target} average.': 'You need an average of {needed} or better over your remaining {left} ECTS credits to reach a {target} average.',
  'To reach a {target} average (now {current}), I need an average of {needed} or better over my remaining {left} credit hours.': 'To reach a {target} average (now {current}), I need an average of {needed} or better over my remaining {left} ECTS credits.',
  'I have already secured a {target} CGPA.': 'I have already secured an average of {target}.'
};

// Grades a module can get (fail grades above 4.0 don't count towards the final grade)
const DE_GRADES = "[['1.0 sehr gut', 1], ['1.3 sehr gut', 1.3], ['1.7 gut', 1.7], ['2.0 gut', 2], ['2.3 gut', 2.3], ['2.7 befriedigend', 2.7], ['3.0 befriedigend', 3], ['3.3 befriedigend', 3.3], ['3.7 ausreichend', 3.7], ['4.0 ausreichend', 4]]";

/* i18n */
// scale names, plus 'Part {n}' (Heidelberg rows), listed here so tools/i18n.js picks them up for translation
const DE_SCALE_LABELS = ['TUM grading scale', 'LMU grading scale', 'Heidelberg grading scale', 'Part {n}'];
// Shared calculator settings; digits = decimals kept (cut, not rounded) in the final grade
const deConfig = (storageKey, label, digits, words, extra) => `{
      storageKey: '${storageKey}',
      creditLabel: 'ECTS',
      semCreditLabel: 'ECTS',
      creditExample: 6,
      semCreditExample: 30,
      maxSemCredit: 90,
      maxTotalCredit: 400,
      msgs: ${JSON.stringify(DE_MSGS)},
      ${extra || ''}
      scales: {
        de: {
          max: 4, min: 1, lowerIsBetter: true, label: '${label}', region: 'German grades · 1.0 is the best', example: '1.7',
          modes: ['grade', 'points'], pointsLabel: 'Exact grade (1.0–4.0)', digits: ${digits}, truncate: true, gradeDigits: 1,
          maxText: '(1.0 = best)', noQualityPoints: true, subtitle: 'German grades: 1.0 is the best, 4.0 the lowest pass',
          ratioPoints: [[1, 1], [1.5, 0.9], [2.5, 0.76], [3.5, 0.6], [4, 0.5]],
          words: ${words},
          grades: ${DE_GRADES}
        }
      },
      conversions: (function () {
        // Modified Bavarian formula: x = 1 + 3 × (Nmax − Nd) ÷ (Nmax − Nmin)
        function bavarian(nmax, nmin, label, example) {
          return {
            max: nmax, label: label, example: example,
            formula: 'German grade = 1 + 3 × (best grade − your grade) ÷ (best grade − lowest passing grade)',
            note: 'The modified Bavarian formula (KMK). TUM keeps one decimal and drops the rest without rounding. It gives a first idea only; the university you apply to makes the official conversion.',
            result: function (c) {
              var t = window.CGPA_T;
              if (c < nmin) return { pct: 0, ratio: 0, text: t('Not passed'),
                work: t('{grade} is below the lowest passing grade, {min}', { grade: c.toFixed(2), min: nmin.toFixed(2) }) };
              var x = 1 + 3 * (nmax - c) / (nmax - nmin);
              var g = Math.floor(Math.max(1, x) * 10 + 1e-9) / 10;
              return { pct: (4 - g) / 3 * 100, ratio: 1 - (g - 1) / 6, text: g.toFixed(1),
                work: '1 + 3 × (' + nmax + ' − ' + c.toFixed(2) + ') ÷ (' + nmax + ' − ' + nmin + ') = ' + x.toFixed(3) + ' → ' + g.toFixed(1),
                sub: t('German grade (1.0 = best, 4.0 = lowest pass)') };
            }
          };
        }
        return {
          b41: bavarian(4, 1, '4.0 scale, lowest pass 1.0', 3.2),
          b42: bavarian(4, 2, '4.0 scale, lowest pass 2.0', 3.2),
          b104: bavarian(10, 4, '10-point scale, lowest pass 4.0', 8),
          b10040: bavarian(100, 40, 'percentage, lowest pass 40%', 75)
        };
      })()
    }`;
/* /i18n */

const DE_WORDS_TUM = "[[1.2, 'mit Auszeichnung'], [1.5, 'sehr gut'], [2.5, 'gut'], [3.5, 'befriedigend'], [4, 'ausreichend']]";
const DE_WORDS = "[[1.5, 'sehr gut'], [2.5, 'gut'], [3.5, 'befriedigend'], [4, 'ausreichend']]";

const DE_MODE_SWITCH = `
            <div class="segmented" id="modeSwitch" role="radiogroup" aria-label="How do you want to enter results?">
              <input type="radio" name="gpaMode" id="modeGrade" value="grade" checked>
              <label for="modeGrade">Grade</label>
              <input type="radio" name="gpaMode" id="modePoints" value="points">
              <label for="modePoints">Exact grade</label>
            </div>`;

const DE_CONV_SCALE = `
            <div class="field">
              <span class="field-label always" id="convScaleLabel">Your grading scale abroad</span>
              <div class="segmented full conv-wrap" role="radiogroup" aria-labelledby="convScaleLabel">
                <input type="radio" name="convScale" id="convb41" value="b41" checked>
                <label for="convb41">4.0 · pass 1.0</label>
                <input type="radio" name="convScale" id="convb42" value="b42">
                <label for="convb42">4.0 · pass 2.0</label>
                <input type="radio" name="convScale" id="convb104" value="b104">
                <label for="convb104">10 · pass 4.0</label>
                <input type="radio" name="convScale" id="convb10040" value="b10040">
                <label for="convb10040">% · pass 40</label>
              </div>
            </div>`;

const DE_LAYOUT = [
  ['GPA <small>One semester</small>', 'Average <small>Modules</small>'],
  ['CGPA <small>All semesters</small>', 'Overall <small>All semesters</small>'],
  ['Percentage <small>Converter</small>', 'Bavarian formula <small>Converter</small>'],
  ['<h2>Semester GPA</h2>', '<h2>Grade average</h2>'],
  ['Add each subject with its credit hours and grade.', 'Add each graded module with its ECTS credits and grade.'],
  ['<span>Subject (optional)</span><span>Credits</span>', '<span>Module (optional)</span><span>ECTS</span>'],
  ['Your semester GPA', 'Your grade average'],
  ['            Add subject\n', '            Add module\n'],
  ['Add this GPA to my CGPA →', 'Add this average to my overall grade →'],
  ['<h2>Overall CGPA</h2>', '<h2>Overall grade</h2>'],
  ["Add each semester's GPA (SGPA) and its total credit hours.", "Add each semester's grade average and its ECTS credits."],
  ['<span>Semester</span><span>GPA / SGPA</span><span>Credit hours</span>', '<span>Semester</span><span>Average</span><span>ECTS</span>'],
  ['<div class="result-label">Your CGPA</div>', '<div class="result-label">Your overall grade</div>'],
  ['<button type="button" id="sendToPct" class="btn btn-soft">', '<button type="button" id="sendToPct" class="btn btn-soft" hidden>'],
  ['<h2>Target CGPA</h2>', '<h2>Target grade</h2>'],
  ['Find out what GPA you need in your coming semesters to reach your goal.', 'Find out which average you need in your remaining modules to reach your target grade.'],
  ['<label class="field-label" for="tCurrent">Current CGPA</label>', '<label class="field-label" for="tCurrent">Current average</label>'],
  ['<label class="field-label" for="tDone">Credits completed</label>', '<label class="field-label" for="tDone">ECTS completed</label>'],
  ['<label class="field-label" for="tTarget">Target CGPA</label>', '<label class="field-label" for="tTarget">Target average</label>'],
  ['<label class="field-label" for="tLeft">Credits remaining</label>', '<label class="field-label" for="tLeft">ECTS remaining</label>'],
  ['GPA you need each semester', 'Average you need from now on'],
  ['<h2>CGPA to percentage</h2>', '<h2>Foreign grade to German grade</h2>'],
  ['Type your CGPA and choose its scale.', 'Type your grade from abroad (for example your CGPA) and choose its grading scale.'],
  ['<label class="field-label always" for="convInput">Your CGPA</label>', '<label class="field-label always" for="convInput">Your grade abroad</label>'],
  ['<div class="result-label">Percentage</div>', '<div class="result-label">German grade</div>'],
  ['<button type="button" id="useMyCgpa" class="btn btn-quiet btn-inline">', '<button type="button" id="useMyCgpa" class="btn btn-quiet btn-inline" hidden>'],
  ['<th scope="col" class="num">Points</th>', '<th scope="col" class="num">Value</th>']
];

const deHowto = (rule) => [`
          <details class="howto">
            <summary>How is the grade average calculated?</summary>
            <p class="formula-line">Average = (Σ ECTS × grade) ÷ (Σ ECTS)</p>
            <p class="muted small">Example: a 6-ECTS module with 1.3 and a 9-ECTS module with 2.7 →
              (6×1.3 + 9×2.7) ÷ 15 = 32.1 ÷ 15 = 2.14. ${rule}</p>
          </details>`, null, `
          <details class="howto">
            <summary>How is this calculated?</summary>
            <p class="formula-line">Average needed = (Target × total ECTS − Current × completed ECTS) ÷ remaining ECTS</p>
            <p class="muted small">Example: an average of 2.4 after 90 ECTS, a target of 2.0 and 90 ECTS left →
              (2.0 × 180 − 2.4 × 90) ÷ 90 = <strong>1.60</strong> or better</p>
          </details>`];

const bavarianSection = (uni) => `
      <section id="bavarian">
        <h2>Converting your CGPA from abroad: the Bavarian formula</h2>
        <p>If you studied outside Germany, for example in Pakistan or India, ${uni} and most German universities convert your grade with the modified Bavarian formula recommended by the Kultusministerkonferenz (KMK):</p>
        <p class="formula-block">German grade = 1 + 3 × (Nmax − Nd) ÷ (Nmax − Nmin)</p>
        <p>Nmax is the best grade in your system, Nmin the lowest passing grade and Nd your own grade. For a CGPA of 3.20 on a 4.0 scale where the lowest pass is 2.0: 1 + 3 × (4 − 3.2) ÷ (4 − 2) = 2.2. If the lowest pass in your system is 1.0, the same CGPA gives 1 + 3 × 0.8 ÷ 3 = 1.8. That is why it matters which lowest passing grade you use: check your transcript or degree regulations. The Bavarian formula tab does this for four common scales.</p>
      </section>`;

module.exports = [
  {
    slug: 'tum-cgpa-calculator',
    country: 'Germany',
    short: 'TUM',
    name: 'TUM CGPA & GPA (Notendurchschnitt) Calculator',
    title: 'TUM CGPA & GPA Calculator + Bavarian Formula',
    desc: 'TUM CGPA and GPA calculator: ECTS-weighted grade average (Notendurchschnitt) with the TUM rounding rule, plus the Bavarian formula for grades from abroad.',
    lead: 'Work out your Technical University of Munich grade average, weighted by ECTS credits as the TUM APSO sets out, and convert a CGPA from abroad into a German grade with the Bavarian formula.',
    guideLink: 'How TUM grading works',
    card: '1.0 best · ECTS weighted · Bavarian formula',
    scaleCard: {
      title: 'Grading system: TUM (German grades 1.0 to 4.0)',
      text: 'Choose the grade for each module, or switch to “Exact grade” to type module grades such as 1.5. Lower numbers are better.'
    },
    config: deConfig('cgpa-tum', DE_SCALE_LABELS[0], 1, DE_WORDS_TUM),
    modeSwitch: DE_MODE_SWITCH,
    convScale: DE_CONV_SCALE,
    layoutReplace: DE_LAYOUT,
    howto: deHowto('TUM keeps one decimal without rounding: <strong>2.1</strong>.'),
    facts: [
      'German grades: <strong>1.0 is the best</strong>, <strong>4.0 the lowest pass</strong>; 4.3, 4.7 and 5.0 are fails.',
      'Your overall grade (Gesamtnote) is weighted by <strong>ECTS credits</strong>, including the thesis module.',
      'An overall grade <strong>up to 1.2</strong> means <strong>“mit Auszeichnung bestanden”</strong> (passed with distinction).'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How grading works at TUM</h2>
        <p>The General Academic and Examination Regulations of the Technical University of Munich (APSO) use the German scale from 1 to 5. Examiners can raise or lower a grade by 0.3, but 0.7 and 5.3 are not allowed, so the possible grades are 1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0, 4.3, 4.7 and 5.0. Anything worse than 4.0 is a fail.</p>
        <p>When several grades are averaged, for example module part exams, TUM keeps <strong>one decimal place and drops the rest without rounding</strong>: 2.14 and 2.19 both become 2.1. This calculator shows TUM averages the same way.</p>
      </section>

      <section id="grade-points">
        <h2>TUM overall grade (Gesamtnote)</h2>
        <p>Your overall grade is the weighted average of all your modules, including the thesis (Abschlussarbeit). Each module counts according to its credits. Your programme's own regulations (FPSO) can set different weights or leave out the first study phase, so check your FPSO too. Modules where you only completed coursework without a grade don't count.</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Overall grade</th><th scope="col">Result</th></tr></thead>
            <tbody>
              <tr><td>up to 1.2</td><td>mit Auszeichnung bestanden (passed with distinction)</td></tr>
              <tr><td>1.3 – 1.5</td><td>sehr gut bestanden (very good)</td></tr>
              <tr><td>1.6 – 2.5</td><td>gut bestanden (good)</td></tr>
              <tr><td>2.6 – 3.5</td><td>befriedigend bestanden (satisfactory)</td></tr>
              <tr><td>3.6 – 4.0</td><td>bestanden (passed)</td></tr>
            </tbody>
          </table>
        </div>
        <p>If you passed more elective modules than you need, you tell the examination board which ones count; otherwise the best results are used. An FPSO can also let you repeat a passed module exam once to improve the grade, with the better result counting.</p>
      </section>

      <section id="example">
        <h2>How to calculate your TUM grade average: worked example</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Module</th><th scope="col" class="num">ECTS</th><th scope="col" class="num">Grade</th><th scope="col" class="num">ECTS × grade</th></tr></thead>
            <tbody>
              <tr><td>Analysis 1</td><td class="num">9</td><td class="num">2.3</td><td class="num">20.7</td></tr>
              <tr><td>Introduction to Informatics</td><td class="num">6</td><td class="num">1.3</td><td class="num">7.8</td></tr>
              <tr><td>Discrete Structures</td><td class="num">8</td><td class="num">1.7</td><td class="num">13.6</td></tr>
              <tr><td>Computer Organization</td><td class="num">8</td><td class="num">2.7</td><td class="num">21.6</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">31</td><td></td><td class="num">63.7</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">63.7 ÷ 31 = 2.054… → 2.0 (one decimal, no rounding)</p>
      </section>
${bavarianSection('TUM')}`,
    sources: [
      ['TUM: Allgemeine Prüfungs- und Studienordnung (APSO) of 18 March 2011, readable version with the 4th amendment of 3 June 2020, §§ 16 and 17', 'https://portal.mytum.de/archiv/kompendium_rechtsangelegenheiten/apso/Lesb-F-APSO-vom-18-03-2011-mit-4-AeS-vom-03-06-20.pdf'],
      ['TUM: Notenumrechnung mit der Bayerischen Formel (grade conversion)', 'https://www.tum.de/studium/bewerbung/infoportal-bewerbung/bayerische-formel']
    ],
    faq: [
      ['Is 1.0 the best grade at TUM?', 'Yes. German grades run from 1.0 (best) to 4.0 (lowest pass). 4.3, 4.7 and 5.0 are fail grades.'],
      ['How is the TUM overall grade (Gesamtnote) calculated?', 'As the weighted average of all modules, including the thesis, with each module weighted by its credits. Your FPSO can set different weights.'],
      ['Does TUM round the grade average?', 'When grades are averaged, the APSO keeps one decimal place and drops the rest without rounding, so 2.19 becomes 2.1.'],
      ['What grade do I need for “mit Auszeichnung” at TUM?', 'An overall grade of 1.2 or better. 1.3 to 1.5 is “sehr gut”, 1.6 to 2.5 “gut”, 2.6 to 3.5 “befriedigend” and 3.6 to 4.0 “bestanden”.'],
      ['How does TUM convert my CGPA from Pakistan or India?', 'With the modified Bavarian formula: 1 + 3 × (best grade − your grade) ÷ (best grade − lowest passing grade). TUM keeps one decimal and does not round to the usual grade steps.'],
      ['Can I improve a passed module grade at TUM?', 'Only if your programme’s FPSO allows it. Where it does, you can repeat a passed module exam once and the better result counts.']
    ]
  },

  {
    slug: 'lmu-cgpa-calculator',
    country: 'Germany',
    short: 'LMU',
    name: 'LMU Munich CGPA & GPA (Endnote) Calculator',
    title: 'LMU CGPA & GPA Calculator – ECTS-Weighted Final Grade',
    desc: 'LMU Munich CGPA and GPA calculator: ECTS-weighted final grade (Endnote) with two decimals and no rounding, grade bands and the Bavarian formula.',
    lead: 'Calculate your LMU Munich final grade (Endnote) as an ECTS-weighted average with two decimal places and no rounding, the way LMU examination regulations describe it.',
    guideLink: 'How LMU grading works',
    card: 'ECTS weighted · 2 decimals, no rounding',
    scaleCard: {
      title: 'Grading system: LMU Munich (German grades 1.0 to 4.0)',
      text: 'Choose the grade for each module, or switch to “Exact grade” to type a module grade such as 1.85. Lower numbers are better.'
    },
    config: deConfig('cgpa-lmu', DE_SCALE_LABELS[1], 2, DE_WORDS),
    modeSwitch: DE_MODE_SWITCH,
    convScale: DE_CONV_SCALE,
    layoutReplace: DE_LAYOUT,
    howto: deHowto('LMU keeps two decimals without rounding: <strong>2.14</strong>.'),
    facts: [
      'LMU grades: 1.0, 1.3, 1.7 … 4.0 and 5.0; <strong>0.7, 4.3, 4.7 and 5.3 are not used</strong>.',
      'The final grade (Endnote) is an <strong>ECTS-weighted average</strong> of your module grades.',
      'Only the <strong>first two decimals</strong> count, without rounding: <strong>up to 1.50 is “sehr gut”</strong>.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How grading works at LMU Munich</h2>
        <p>Ludwig-Maximilians-Universität München (LMU) grades exams from 1 (sehr gut) to 5 (nicht ausreichend). Grades can be raised or lowered by 0.3 to give intermediate values, but 0.7, 4.3, 4.7 and 5.3 are excluded. So the possible grades are 1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0 and 5.0.</p>
        <p>Each LMU programme has its own examination and study regulations (Prüfungs- und Studienordnung, PStO). The rules below come from the Bachelor's PStO in Economics (Volkswirtschaftslehre, 2013), and most LMU programmes follow the same pattern, but always check the PStO for your own programme.</p>
      </section>

      <section id="grade-points">
        <h2>The LMU final grade (Endnote)</h2>
        <p>Your module grades are combined into the final grade as an arithmetic mean weighted by ECTS credits (or by the weights listed in your PStO's annex). <strong>Only the first two decimal places are kept, without rounding</strong>, so 1.519 becomes 1.51. If you earn more than the 180 ECTS a bachelor's needs, only the 180 required credits count.</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Average</th><th scope="col">Grade</th></tr></thead>
            <tbody>
              <tr><td>up to 1.50</td><td>sehr gut (very good)</td></tr>
              <tr><td>1.51 – 2.50</td><td>gut (good)</td></tr>
              <tr><td>2.51 – 3.50</td><td>befriedigend (satisfactory)</td></tr>
              <tr><td>3.51 – 4.00</td><td>ausreichend (sufficient)</td></tr>
            </tbody>
          </table>
        </div>
        <p>Because two decimals are kept, an average of 1.509 counts as 1.50 and is still “sehr gut”, while 1.51 is “gut”.</p>
      </section>

      <section id="example">
        <h2>How to calculate your LMU grade: worked example</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Module</th><th scope="col" class="num">ECTS</th><th scope="col" class="num">Grade</th><th scope="col" class="num">ECTS × grade</th></tr></thead>
            <tbody>
              <tr><td>Microeconomics</td><td class="num">9</td><td class="num">1.7</td><td class="num">15.3</td></tr>
              <tr><td>Mathematics for Economists</td><td class="num">9</td><td class="num">2.3</td><td class="num">20.7</td></tr>
              <tr><td>Statistics</td><td class="num">6</td><td class="num">1.3</td><td class="num">7.8</td></tr>
              <tr><td>Accounting</td><td class="num">6</td><td class="num">2.0</td><td class="num">12.0</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">30</td><td></td><td class="num">55.8</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">55.8 ÷ 30 = 1.86 → “gut”</p>
      </section>
${bavarianSection('LMU')}`,
    sources: [
      ['LMU München: Prüfungs- und Studienordnung for the Bachelor’s programme Volkswirtschaftslehre (2013), §§ 10 and 21', 'https://cms-cdn.lmu.de/media/50-zentren/isc-informations-und-servicecenter-wirtschaftswissenschaftliche-pruefungen/downloads/volkswirtschaftliche-studiengaenge/bachelor-vwl-psto-2013-pruefungs-und-studienordnung.pdf']
    ],
    faq: [
      ['Which grades can I get at LMU?', '1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0 and 5.0. The values 0.7, 4.3, 4.7 and 5.3 are excluded. 5.0 is a fail.'],
      ['How is the LMU final grade calculated?', 'As the arithmetic mean of your module grades, weighted by ECTS credits or by the weights in your PStO. Only the first two decimals count.'],
      ['Does LMU round the final grade?', 'No. Only the first two decimal places are kept and the rest are dropped, so 1.519 becomes 1.51.'],
      ['What average is “sehr gut” at LMU?', 'Up to and including 1.50. 1.51 to 2.50 is “gut”, 2.51 to 3.50 “befriedigend” and 3.51 to 4.00 “ausreichend”.'],
      ['Do all my credits count in the LMU final grade?', 'If you earn more than the 180 ECTS a bachelor’s needs, only the 180 required credits count in the final grade, according to the PStO.'],
      ['How does LMU convert grades from abroad?', 'German universities normally use the modified Bavarian formula: 1 + 3 × (best grade − your grade) ÷ (best grade − lowest passing grade). The Bavarian formula tab gives you an estimate.']
    ]
  },

  {
    slug: 'heidelberg-cgpa-calculator',
    country: 'Germany',
    short: 'Heidelberg',
    name: 'Heidelberg University CGPA & GPA Calculator',
    title: 'Heidelberg CGPA & GPA Calculator – 70/30 Final Grade',
    desc: 'Heidelberg University CGPA and GPA calculator: credit-weighted module grades, the 70% modules + 30% thesis final grade, one decimal without rounding.',
    lead: 'Work out your Heidelberg University grade average, weighted by credit points (LP), and your final bachelor’s grade, where in Computer Science the modules count 70% and the thesis 30%.',
    guideLink: 'How Heidelberg grading works',
    card: '70% modules + 30% thesis · 1 decimal',
    scaleCard: {
      title: 'Grading system: Heidelberg University (German grades)',
      text: 'Choose the grade for each module, or switch to “Exact grade” to type a module grade such as 1.5. Weight each module by its credit points (LP).'
    },
    config: deConfig('cgpa-heidelberg', DE_SCALE_LABELS[2], 1, DE_WORDS, "periodLabel: '" + DE_SCALE_LABELS[3] + "', semCreditLabel: 'Weight', semCreditExample: 70,"),
    modeSwitch: DE_MODE_SWITCH,
    convScale: DE_CONV_SCALE,
    layoutReplace: [
      ...DE_LAYOUT,
      ["Add each semester's grade average and its ECTS credits.", 'Add your module average and your thesis grade, weighted 70 and 30 (or each semester with its credits).'],
      ['<span>Semester</span><span>Average</span><span>ECTS</span>', '<span>Part</span><span>Average</span><span>Weight</span>']
    ],
    howto: [
      ...deHowto('Heidelberg keeps one decimal without rounding: <strong>2.1</strong>.').slice(0, 1),
      `
          <details class="howto">
            <summary>How is the final grade calculated?</summary>
            <p class="formula-line">Final grade = 70% × module average + 30% × thesis and colloquium</p>
            <p class="muted small">Example: module average 1.9 (weight 70) and thesis 1.3 (weight 30) →
              (70×1.9 + 30×1.3) ÷ 100 = 1.72 → <strong>1.7</strong></p>
          </details>`,
      ...deHowto('').slice(2)
    ],
    facts: [
      'In the Computer Science BSc the final grade is <strong>70% modules + 30% thesis and colloquium</strong>.',
      'Only the <strong>first decimal</strong> counts, without rounding; a <strong>1.0</strong> earns <strong>“mit Auszeichnung”</strong>.',
      'On request, up to <strong>two compulsory modules</strong> can be left out of the module average.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How grading works at Heidelberg University</h2>
        <p>Heidelberg University (Ruprecht-Karls-Universität Heidelberg) grades each piece of work from 1 (sehr gut) to 5 (nicht ausreichend), with intermediate steps of 0.3: 1.0, 1.3, 1.7, 2.0 and so on. The grades 0.7, 4.3, 4.7 and 5.3 are not used. A module made of several parts gets the average of its part grades, weighted by credit points (Leistungspunkte, LP), unless the module handbook says otherwise.</p>
        <p>For module grades, subject grades and the final grade, <strong>only the first decimal place counts and the rest is dropped without rounding</strong>: 1.79 becomes 1.7.</p>
      </section>

      <section id="grade-points">
        <h2>Final grade in the Heidelberg Computer Science BSc</h2>
        <p>Each Heidelberg programme has its own Studien- und Prüfungsordnung. In the BSc Computer Science (Informatik) regulations of 2015, amended in 2021 and 2022, the final grade for a single-subject degree is made of two parts:</p>
        <ul>
          <li><strong>70%</strong>: the credit-weighted average of your module grades. On request, up to two compulsory modules (but not the thesis or colloquium) can be left out of this average.</li>
          <li><strong>30%</strong>: the credit-weighted average of the bachelor's thesis and the bachelor's colloquium.</li>
        </ul>
        <p>For a 50% subject combination with Computer Science as the first major, the final grade is 35% Computer Science, 35% the second major and 30% the thesis. A final average of exactly 1.0 earns the distinction “mit Auszeichnung”.</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Average</th><th scope="col">Grade</th></tr></thead>
            <tbody>
              <tr><td>up to 1.5</td><td>sehr gut (very good)</td></tr>
              <tr><td>1.6 – 2.5</td><td>gut (good)</td></tr>
              <tr><td>2.6 – 3.5</td><td>befriedigend (satisfactory)</td></tr>
              <tr><td>3.6 – 4.0</td><td>ausreichend (sufficient)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="example">
        <h2>Worked example</h2>
        <p>Suppose your credit-weighted module average is 1.94 (which counts as 1.9) and your thesis and colloquium average 1.3. Put both in the Overall tab with the weights 70 and 30:</p>
        <p class="formula-block">(70 × 1.9 + 30 × 1.3) ÷ 100 = 1.72 → 1.7, “gut”</p>
        <p>Use the Average tab first to work out your module average from your module grades and credit points. Then use the Overall tab for the 70/30 step.</p>
      </section>
${bavarianSection('Heidelberg University')}`,
    sources: [
      ['Heidelberg University: Studien- und Prüfungsordnung for the Bachelor’s programme Informatik of 26 March 2015, amended 29 September 2021 and 5 October 2022, §§ 13 and 14', 'https://mu.ifi.uni-heidelberg.de/c/image/f/default/pdfs/po_mhb_zula/BSc-PO-Informatik-aktuell.pdf']
    ],
    faq: [
      ['How is the Heidelberg Computer Science final grade calculated?', '70% comes from the credit-weighted average of your module grades and 30% from the credit-weighted average of the bachelor’s thesis and colloquium.'],
      ['Does Heidelberg round grades?', 'No. For module grades, subject grades and the final grade only the first decimal counts and the rest is dropped, so 1.79 becomes 1.7.'],
      ['Can I leave modules out of my Heidelberg grade?', 'In the Computer Science BSc you can ask for up to two compulsory modules to be left out of the module average. The thesis and colloquium always count.'],
      ['What grade is “mit Auszeichnung” at Heidelberg?', 'In the Computer Science BSc, a final average of 1.0 earns the distinction “mit Auszeichnung”.'],
      ['Which grades are used at Heidelberg?', '1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0 and 5.0. The values 0.7, 4.3, 4.7 and 5.3 are excluded.'],
      ['How do I convert my CGPA from abroad for Heidelberg?', 'German universities normally use the modified Bavarian formula: 1 + 3 × (best grade − your grade) ÷ (best grade − lowest passing grade). Use the Bavarian formula tab for an estimate and check the university’s admission rules.']
    ]
  }
];
