/* =========================================================
   Builds the university-specific calculator pages.

   Run from the project folder:   node tools/build-university-pages.js

   Each page reuses the calculator markup from index.html (between the
   <!-- mode-switch -->, <!-- conv-scale --> and <!-- side-tips --> markers),
   plugs in that university's official grading rules (window.CGPA_PAGE)
   and adds its own article and FAQ. Re-run after changing index.html.
   It also copies the German grade converter into cgpa-to-german-grade.html.
   ========================================================= */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://cgpa-calculator-umber-two.vercel.app';
const UPDATED = '18 October 2026';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const between = (text, start, end) => {
  const a = text.indexOf(start), b = text.indexOf(end, a);
  if (a < 0 || b < 0) throw new Error('Marker not found: ' + start + ' … ' + end);
  return text.slice(a, b);
};
const replaceBlock = (text, name, html) => {
  const re = new RegExp(`<!-- ${name} -->[\\s\\S]*?<!-- /${name} -->`);
  if (!re.test(text)) throw new Error('Marker not found: ' + name);
  return text.replace(re, html);
};
const f2 = n => n.toFixed(2);

/* ---------- Universities ----------
   config: JavaScript source for window.CGPA_PAGE (same format as SCALES/CONVERSIONS in script.js)
   grade rows: [grade, points, minimum marks %, lowest points when a letter covers a range] */
const UNIVERSITIES = [
  // Ghazi University first: the site owner asked for it at the top of the list
  ...require('./universities/pakistan.js'),

  {
    slug: 'nust-cgpa-calculator',
    country: 'Pakistan',
    short: 'NUST',
    name: 'NUST CGPA & GPA Calculator',
    title: 'NUST CGPA & GPA Calculator – Official Grade Points',
    desc: 'Free NUST CGPA and GPA calculator using the official grade points from the NUST Undergraduate Student Handbook. Includes minimum CGPA and repeat rules.',
    lead: 'Work out your semester GPA and overall CGPA with the official NUST undergraduate grade points (A = 4.00, B+ = 3.50, B = 3.00 and so on).',
    guideLink: 'How NUST grading works',
    card: 'Relative grading · A = 4.00, B+ = 3.50',
    scaleCard: {
      title: 'Grading system: NUST undergraduate',
      text: 'NUST uses relative grading, so enter the letter grade shown on your result. Grade points come from the NUST Undergraduate Student Handbook.'
    },
    config: `{
      storageKey: 'cgpa-nust',
      scales: {
        nust: {
          max: 4, label: 'NUST 4.0 scale', region: 'NUST undergraduate · relative grading', example: '3.50', modes: ['grade'],
          grades: [['A', 4], ['B+', 3.5], ['B', 3], ['C+', 2.5], ['C', 2], ['D+', 1.5], ['D', 1], ['F', 0], ['XF', 0]]
        }
      },
      conversions: {
        nust: {
          formula: 'Percentage ≈ (CGPA ÷ 4) × 100',
          expr: c => '(' + c + ' ÷ 4) × 100',
          calc: c => (c / 4) * 100,
          example: 3.4,
          note: 'The NUST Undergraduate Student Handbook does not give a CGPA-to-percentage formula. This simple method is widely used, but check which method the employer or university you are applying to accepts.'
        }
      }
    }`,
    modeSwitch: '',
    convScale: '',
    facts: [
      'NUST uses <strong>relative grading</strong>: your grade depends on your class, not on fixed marks.',
      'A minimum CGPA of <strong>2.00</strong> is needed to graduate (<strong>2.50</strong> for BBA and some BS programmes).',
      'If you repeat a course, only the <strong>better grade</strong> counts in your CGPA.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How grading works at NUST</h2>
        <p>NUST uses relative grading on a 4.00 scale. In the words of the NUST Undergraduate Student Handbook, <q>The University follows a relative grading system on a scale of 1.00 to 4.00 points.</q> Your letter grade depends on how you performed compared with your class, not on a fixed percentage. An 82% could be an A in a tough paper and a B+ in an easier one.</p>
        <p>Because of this, there is no reliable way to turn NUST marks straight into a grade, so this calculator asks for the letter grade on your result. Once you have your letters, the GPA maths is fixed and simple.</p>
        <h3>Courses with theory and lab</h3>
        <p>For a course with both theory and lab credits, NUST first combines the two percentages, weighted by credits, and then grades the course as a whole. The handbook's own example is Physics with 3 theory credits at 70% and 1 lab credit at 90%, which gives (70 × 3 + 90 × 1) ÷ 4 = 75%. You get one grade for all 4 credits, so enter it in the calculator as one 4-credit subject.</p>
      </section>

      <section id="grade-points">
        <h2>NUST grade points table</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Grade</th><th scope="col" class="num">Grade points</th><th scope="col">Notes</th></tr></thead>
            <tbody>
              <tr><td>A</td><td class="num">4.00</td><td>Highest grade</td></tr>
              <tr><td>B+</td><td class="num">3.50</td><td></td></tr>
              <tr><td>B</td><td class="num">3.00</td><td></td></tr>
              <tr><td>C+</td><td class="num">2.50</td><td></td></tr>
              <tr><td>C</td><td class="num">2.00</td><td></td></tr>
              <tr><td>D+</td><td class="num">1.50</td><td>Undergraduate only</td></tr>
              <tr><td>D</td><td class="num">1.00</td><td>Undergraduate only; the lowest grade that earns course credits</td></tr>
              <tr><td>F</td><td class="num">0.00</td><td>Fail</td></tr>
              <tr><td>XF</td><td class="num">0.00</td><td>F because of a shortage of attendance</td></tr>
            </tbody>
          </table>
        </div>
        <p>I (incomplete), W (dropped), Q (qualified) and T (transfer) carry no grade points. Notice that NUST has no A+ and no minus grades: B+ and C+ sit half a point above B and C.</p>
      </section>

      <section id="example">
        <h2>How to calculate your NUST GPA: worked example</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Course</th><th scope="col" class="num">Credits</th><th scope="col">Grade</th><th scope="col" class="num">Points</th><th scope="col" class="num">Credits × points</th></tr></thead>
            <tbody>
              <tr><td>Multivariable Calculus</td><td class="num">3</td><td>B+</td><td class="num">3.50</td><td class="num">10.50</td></tr>
              <tr><td>Applied Physics (3+1)</td><td class="num">4</td><td>B</td><td class="num">3.00</td><td class="num">12.00</td></tr>
              <tr><td>Fundamentals of Programming (3+1)</td><td class="num">4</td><td>A</td><td class="num">4.00</td><td class="num">16.00</td></tr>
              <tr><td>Functional English</td><td class="num">3</td><td>C+</td><td class="num">2.50</td><td class="num">7.50</td></tr>
              <tr><td>Islamic Studies</td><td class="num">2</td><td>A</td><td class="num">4.00</td><td class="num">8.00</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">16</td><td></td><td></td><td class="num">54.00</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">GPA = 54.00 ÷ 16 = 3.375 ≈ 3.38</p>
        <p>Your CGPA works the same way across all semesters: add up the credits × points for every course you have taken and divide by your total credit hours. The CGPA tab does this from your semester GPAs.</p>
      </section>

      <section id="minimum-cgpa">
        <h2>Minimum CGPA and academic deficiency at NUST</h2>
        <ul>
          <li><strong>To graduate</strong> you need a minimum CGPA of 2.00, or 2.50 for BBA, BS Economics, BS Public Administration, BS Mass Communication, BS Accounting &amp; Finance and BS Psychology.</li>
          <li><strong>BE and BS students</strong> also need at least a C in their final-year (design) project, where applicable.</li>
          <li><strong>You are academically deficient</strong> if you get an F or XF in any course, a semester GPA below 2.00, a CGPA below 2.00, an I (incomplete) grade, or less than a C in your final-year project.</li>
        </ul>
        <p>If your CGPA has dropped below 2.00, the Target tab shows the GPA you need in your remaining semesters to get back above it.</p>
      </section>

      <section id="repeat">
        <h2>Repeating a course to improve your CGPA</h2>
        <p>When you repeat a course, your transcript shows both the old and the new grade, but only the better grade is used to compute your CGPA. Repeating needs permission from your HoD, and grades earned by repeating don't count towards top academic honours and awards, except the Rector's Gold Medal. If you fail a course again after repeating it, it still counts as one F.</p>
        <p><strong>Calculator tip:</strong> for a repeated course, enter only the better grade.</p>
      </section>

      <section id="percentage">
        <h2>NUST CGPA to percentage</h2>
        <p>The NUST Undergraduate Student Handbook does not include an official formula for converting CGPA into a percentage. When a percentage is needed, many people use (CGPA ÷ 4) × 100, so 3.40 becomes 85%. Employers and universities sometimes use their own rules, so check what the organisation you're applying to accepts. The Percentage tab uses this simple method.</p>
      </section>`,
    sources: [
      ['NUST Undergraduate Student Handbook (28 August 2024 edition)', 'https://seecs.nust.edu.pk/wp-content/uploads/2024/09/28-Aug-2024-Undergraduate-Handbook.pdf']
    ],
    faq: [
      ['Does NUST use relative or absolute grading?', 'NUST uses relative grading on a 4.00 scale, so your grade depends on your performance compared with your class rather than on a fixed percentage. That is why there is no fixed marks-to-grade table for NUST.'],
      ['What are the grade points for each grade at NUST?', 'A is 4.00, B+ is 3.50, B is 3.00, C+ is 2.50, C is 2.00, D+ is 1.50 and D is 1.00. F and XF (F because of a shortage of attendance) are 0.00. D+ and D are used for undergraduate students only.'],
      ['Is there an A+ or A- grade at NUST?', 'No. A (4.00) is the highest grade and there are no minus grades. B+ and C+ sit half a point above B and C.'],
      ['What CGPA do I need to graduate from NUST?', 'A minimum CGPA of 2.00, or 2.50 for BBA, BS Economics, BS Public Administration, BS Mass Communication, BS Accounting & Finance and BS Psychology. BE and BS students also need at least a C in their final-year project where applicable.'],
      ['If I repeat a course at NUST, which grade counts?', 'Your transcript shows both grades, but only the better grade is used in your CGPA. Grades earned by repeating do not count towards top academic awards, except the Rector’s Gold Medal.'],
      ['How do I convert my NUST CGPA to a percentage?', 'The NUST undergraduate handbook does not give an official formula. The common method is (CGPA ÷ 4) × 100, so 3.40 becomes 85%, but check what the employer or university you are applying to accepts.'],
      ['How do I enter a course that has a lab?', 'Enter it as one subject with its total credit hours, for example 4 for a 3+1 course. NUST combines the theory and lab marks into one grade for the whole course.']
    ]
  },

  {
    slug: 'comsats-cgpa-calculator',
    country: 'Pakistan',
    short: 'CUI',
    name: 'COMSATS CGPA & GPA Calculator',
    title: 'COMSATS CGPA & GPA Calculator + CGPA to Percentage',
    desc: 'COMSATS (CUI) CGPA and GPA calculator with the HEC grading criteria used from Fall 2021, plus the official COMSATS CGPA to percentage rule.',
    lead: 'Calculate your GPA and CGPA with the HEC grading criteria COMSATS University Islamabad uses for students admitted from Fall 2021, and convert CGPA to percentage the official COMSATS way.',
    guideLink: 'How COMSATS grading works',
    card: 'HEC criteria (Fall 2021+) · official % rule',
    scaleCard: {
      title: 'Grading system: COMSATS (Fall 2021 onwards)',
      text: 'Each COMSATS grade covers a range of grade points, so enter the grade points shown for each course on your result.'
    },
    config: `{
      storageKey: 'cgpa-comsats',
      scales: {
        cui: {
          max: 4, label: 'COMSATS 4.0 scale', region: 'HEC grading criteria · Fall 2021 admissions onward', example: '3.45', modes: ['points'],
          grades: [['A', 4, 85, 3.67], ['A-', 3.66, 80, 3.34], ['B+', 3.33, 75, 3.01], ['B', 3, 71, 2.67], ['B-', 2.66, 68, 2.34],
            ['C+', 2.33, 64, 2.01], ['C', 2, 61, 1.67], ['C-', 1.66, 58, 1.31], ['D+', 1.3, 54, 1.01], ['D', 1, 50, 0.1], ['F', 0, 0]]
        }
      },
      conversions: {
        cui: {
          formula: 'Your CGPA band → the lowest percentage of that band',
          example: 3,
          note: 'Official COMSATS rule (notification of 7 December 2020): a CGPA is given the minimum percentage of its band, so 3.00 = 71%. It applies to students admitted from Fall 2021.',
          result: function (c) {
            var t = window.CGPA_T; // translation helper from script.js
            var bands = [[3.67, 85, 'A'], [3.34, 80, 'A-'], [3.01, 75, 'B+'], [2.67, 71, 'B'], [2.34, 68, 'B-'],
              [2.01, 64, 'C+'], [1.67, 61, 'C'], [1.31, 58, 'C-'], [1.01, 54, 'D+'], [0.1, 50, 'D']];
            var v = Math.round(c * 100 + 1e-9) / 100;
            for (var i = 0; i < bands.length; i++) {
              if (v >= bands[i][0]) {
                var top = i === 0 ? 4 : bands[i - 1][0] - 0.01;
                return { pct: bands[i][1], text: bands[i][1] + '%',
                  work: t('CGPA {cgpa} is in the {grade} band ({from}–{to}) → {pct}%', { cgpa: v.toFixed(2), grade: bands[i][2], from: bands[i][0].toFixed(2), to: top.toFixed(2), pct: bands[i][1] }) };
              }
            }
            return { pct: 0, text: t('Below 50%'), work: t('CGPA {cgpa} is in the F band → below 50%', { cgpa: v.toFixed(2) }) };
          }
        }
      }
    }`,
    modeSwitch: '',
    convScale: '',
    facts: [
      'Each COMSATS grade covers a <strong>range of grade points</strong>, so enter the exact points from your result.',
      'Official CGPA to percentage: take the <strong>lowest %</strong> of your CGPA’s band (3.00 = 71%).',
      'These rules apply to students <strong>admitted from Fall 2021</strong>.'
    ],
    article: (cfg) => `
      <section id="how-it-works">
        <h2>COMSATS grading at a glance</h2>
        <p>COMSATS University Islamabad (CUI) adopted the HEC grading criteria for all its undergraduate and graduate programmes, for students admitted from Fall 2021. The CUI Academic Council approved this at its 31st meeting on 8 October 2020, and the Registrar announced it in a notification dated 7 December 2020.</p>
        <p>Under this system each letter grade covers a <em>range</em> of grade points. An A-, for example, can be anywhere from 3.34 to 3.66, depending on your marks. That is why this calculator asks for the grade points shown for each course, instead of just the letter.</p>
      </section>

      <section id="grade-points">
        <h2>COMSATS grading table (Fall 2021 onwards)</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Grade</th><th scope="col" class="num">Grade points</th><th scope="col" class="num">Marks %</th></tr></thead>
            <tbody>
${cfg.scales.cui.grades.map((g, i, all) => `              <tr><td>${g[0]}</td><td class="num">${g[3] != null ? f2(g[3]) + '–' + f2(g[1]) : f2(g[1])}</td><td class="num">${i === 0 ? g[2] + ' and above' : i === all.length - 1 ? 'Below 50' : g[2] + '–' + (all[i - 1][2] - 1)}</td></tr>`).join('\n')}
            </tbody>
          </table>
        </div>
        <p>Anything below 50% is an F with 0.00 grade points.</p>
      </section>

      <section id="example">
        <h2>How to calculate your COMSATS GPA: worked example</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Course</th><th scope="col" class="num">Credits</th><th scope="col" class="num">Grade points</th><th scope="col">Grade</th><th scope="col" class="num">Credits × points</th></tr></thead>
            <tbody>
              <tr><td>Data Structures</td><td class="num">4</td><td class="num">3.60</td><td>A-</td><td class="num">14.40</td></tr>
              <tr><td>Linear Algebra</td><td class="num">3</td><td class="num">3.20</td><td>B+</td><td class="num">9.60</td></tr>
              <tr><td>Technical &amp; Business Writing</td><td class="num">3</td><td class="num">3.90</td><td>A</td><td class="num">11.70</td></tr>
              <tr><td>Digital Logic Design</td><td class="num">3</td><td class="num">2.80</td><td>B</td><td class="num">8.40</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">13</td><td></td><td></td><td class="num">44.10</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">GPA = 44.10 ÷ 13 = 3.392 ≈ 3.39</p>
        <p>If you only know the letter grade for a course, the table above shows the range of points it can have. Your exact points will be somewhere inside that range.</p>
      </section>

      <section id="percentage">
        <h2>COMSATS CGPA to percentage: the official rule</h2>
        <p>COMSATS does not use (CGPA ÷ 4) × 100. Its notification says: <q>A student getting any CGPA will be given the minimum of the corresponding percentage… For example, if a student gets a CGPA of 3.00, the percentage associated will be 71%.</q></p>
        <p>In plain words, find the band your CGPA falls in. Your percentage is the lowest percentage of that band.</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">CGPA</th><th scope="col" class="num">Percentage</th></tr></thead>
            <tbody>
              <tr><td>3.67 – 4.00</td><td class="num">85%</td></tr>
              <tr><td>3.34 – 3.66</td><td class="num">80%</td></tr>
              <tr><td>3.01 – 3.33</td><td class="num">75%</td></tr>
              <tr><td>2.67 – 3.00</td><td class="num">71%</td></tr>
              <tr><td>2.34 – 2.66</td><td class="num">68%</td></tr>
              <tr><td>2.01 – 2.33</td><td class="num">64%</td></tr>
              <tr><td>1.67 – 2.00</td><td class="num">61%</td></tr>
              <tr><td>1.31 – 1.66</td><td class="num">58%</td></tr>
              <tr><td>1.01 – 1.30</td><td class="num">54%</td></tr>
              <tr><td>0.10 – 1.00</td><td class="num">50%</td></tr>
            </tbody>
          </table>
        </div>
        <p>For example, a CGPA of 3.39 is in the A- band (3.34–3.66), so it counts as <strong>80%</strong>. The simple formula would give 84.75%, almost 5 points higher, which could cause problems if an employer checks with the university.</p>
      </section>

      <section id="before-2021">
        <h2>Admitted before Fall 2021?</h2>
        <p>The notification covers students admitted from Fall 2021. If you joined COMSATS earlier, your transcript may follow the older COMSATS grading scheme. The GPA and CGPA maths (a credit-weighted average) is the same, but the grade bands and the percentage rule may be different, so check your transcript or ask your campus examination office.</p>
      </section>`,
    sources: [
      ['COMSATS University Islamabad notification No. CUI-Reg/Notif-/20/2322/2798 (7 December 2020)', 'https://ww2.comsats.edu.pk/qec/downloads/Notification%202322%20HEC%20Grading%20Criteria.pdf']
    ],
    faq: [
      ['Why does COMSATS give a range of grade points for each grade?', 'Since Fall 2021, COMSATS follows the HEC grading criteria, where each letter grade covers a range of grade points. Your exact points depend on your marks, so two students with an A- can have different grade points.'],
      ['How do I convert my COMSATS CGPA to a percentage?', 'Find the band your CGPA falls in and take the lowest percentage of that band. For example, 3.40 is in the A- band (3.34 to 3.66), so it equals 80%. The Percentage tab does this for you.'],
      ['What percentage is a 3.00 CGPA at COMSATS?', 'It is 71%. This exact example is given in the COMSATS notification: a 3.00 CGPA falls in the B band (2.67 to 3.00), whose lowest percentage is 71%.'],
      ['Can I use CGPA × 25 or (CGPA ÷ 4) × 100 for COMSATS?', 'Not for students admitted from Fall 2021. Those formulas usually give a higher number than the official COMSATS rule, which uses the lowest percentage of the band your CGPA falls in.'],
      ['What are the passing marks at COMSATS?', 'In the Fall 2021 grading table, 50% to 53% is a D, and anything below 50% is an F with 0.00 grade points.'],
      ['Can I use this calculator if I was admitted before Fall 2021?', 'The GPA and CGPA maths is the same for everyone, so you can still enter your grade points. But the grade bands and the percentage rule on this page apply to Fall 2021 admissions onward, so check your transcript if you joined earlier.']
    ]
  },

  {
    slug: 'vtu-cgpa-calculator',
    country: 'India',
    short: 'VTU',
    name: 'VTU CGPA & GPA (SGPA) Calculator',
    title: 'VTU CGPA & GPA (SGPA) Calculator – 2022 & 2021 Scheme',
    desc: 'VTU CGPA and SGPA calculator for the 2022 and 2021 schemes. Uses official VTU grade points and converts CGPA to percentage with the right formula.',
    lead: 'Calculate your VTU SGPA and CGPA, and convert CGPA to percentage, with the official rules from the VTU regulations for the 2022 and 2021 schemes.',
    guideLink: 'How VTU grading works',
    card: '2022 &amp; 2021 schemes · CGPA to %',
    scaleCard: {
      title: 'Your VTU scheme',
      text: 'Students admitted in 2022-23 or later follow the 2022 scheme. The grade letters and the percentage formula change with the scheme.',
      options: [['2022', '2022 scheme (admitted 2022-23 onwards)'], ['2021', '2021 scheme (admitted 2021-22)']]
    },
    config: `{
      storageKey: 'cgpa-vtu',
      defaultScale: '2022',
      scales: {
        '2022': {
          max: 10, label: 'VTU 2022 scheme', region: 'Admitted 2022-23 onwards · absolute grading', example: '8.20',
          grades: [['O', 10, 90], ['A+', 9, 80], ['A', 8, 70], ['B+', 7, 60], ['B', 6, 55], ['C', 5, 50], ['P', 4, 40], ['F', 0, 0]]
        },
        '2021': {
          max: 10, label: 'VTU 2021 scheme', region: 'Admitted 2021-22 · absolute grading', example: '8.20',
          grades: [['S', 10, 90], ['A', 9, 80], ['B', 8, 70], ['C', 7, 60], ['D', 6, 45], ['E', 4, 35], ['F', 0, 0]]
        }
      },
      conversions: {
        '2022': {
          formula: 'Percentage = CGPA × 10',
          expr: c => c + ' × 10',
          calc: c => c * 10,
          example: 8.2,
          note: 'From VTU Regulations 2022 (clause 22OB 6.7), for students admitted from 2022-23.',
          classify: p => p >= 70 ? 'First Class with Distinction' : p >= 60 ? 'First Class' : p >= 50 ? 'Second Class' : p >= 40 ? 'Pass Class' : 'Below pass class'
        },
        '2021': {
          formula: 'Percentage = (CGPA − 0.75) × 10',
          expr: c => '(' + c + ' − 0.75) × 10',
          calc: c => Math.max(0, (c - 0.75) * 10),
          example: 8.2,
          note: 'From the VTU 2021-22 regulations (the 2015 CBCS regulations use the same formula). Students on the 2022 scheme use CGPA × 10 instead.'
        }
      }
    }`,
    modeSwitch: `
            <div class="segmented" id="modeSwitch" role="radiogroup" aria-label="How do you want to enter results?">
              <input type="radio" name="gpaMode" id="modeGrade" value="grade" checked>
              <label for="modeGrade">Grade</label>
              <input type="radio" name="gpaMode" id="modeMarks" value="marks">
              <label for="modeMarks">Marks</label>
            </div>`,
    convScale: `
            <div class="field">
              <span class="field-label always" id="convScaleLabel">Scheme</span>
              <div class="segmented full" role="radiogroup" aria-labelledby="convScaleLabel">
                <input type="radio" name="convScale" id="conv2022" value="2022" checked>
                <label for="conv2022">2022 scheme</label>
                <input type="radio" name="convScale" id="conv2021" value="2021">
                <label for="conv2021">2021 &amp; 2015</label>
              </div>
            </div>`,
    facts: [
      'VTU uses <strong>absolute grading</strong>: your CIE + SEE percentage decides your grade.',
      '2022 scheme: <strong>Percentage = CGPA × 10</strong>. 2021 scheme: <strong>(CGPA − 0.75) × 10</strong>.',
      'SGPA and CGPA are <strong>rounded to 2 decimal places</strong>.'
    ],
    article: (cfg) => {
      const meaning22 = ['Outstanding', 'Excellent', 'Very Good', 'Good', 'Above Average', 'Average', 'Pass', 'Fail'];
      const meaning21 = ['Outstanding', 'Excellent', 'Very Good', 'Good', 'Above Average', 'Average', 'Fail'];
      const table = (grades, meanings) => grades.map((g, i) => `              <tr><td>${g[0]}</td><td>${meanings[i]}</td><td class="num">${g[1]}</td><td class="num">${g[2]}–${i === 0 ? 100 : grades[i - 1][2] - 1}</td></tr>`).join('\n');
      return `
      <section id="scheme">
        <h2>Which VTU scheme are you in?</h2>
        <p>VTU updates its regulations from time to time. The Regulations 2022 apply to students admitted from the 2022-23 academic year onwards, while the 2021 regulations took effect from 2021-22. Choose your scheme at the top of the calculator, because the grade letters and the CGPA-to-percentage formula are different.</p>
      </section>

      <section id="grade-points">
        <h2>VTU grading system: 2022 scheme</h2>
        <p>VTU uses absolute grading. Your marks in CIE (continuous internal evaluation) and SEE (semester end examination) are added and turned into a percentage, and that percentage decides your grade (clause 22OB 6.1).</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Grade</th><th scope="col">Meaning</th><th scope="col" class="num">Grade points</th><th scope="col" class="num">Marks %</th></tr></thead>
            <tbody>
${table(cfg.scales['2022'].grades, meaning22)}
            </tbody>
          </table>
        </div>
        <h3>2021 scheme</h3>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Grade</th><th scope="col">Meaning</th><th scope="col" class="num">Grade points</th><th scope="col" class="num">Marks %</th></tr></thead>
            <tbody>
${table(cfg.scales['2021'].grades, meaning21)}
            </tbody>
          </table>
        </div>
      </section>

      <section id="example">
        <h2>How VTU calculates SGPA and CGPA</h2>
        <p class="formula-block">SGPA = Σ (Ci × Gi) ÷ Σ Ci &nbsp;&nbsp; CGPA = Σ (Ci × Si) ÷ Σ Ci</p>
        <p>Ci is a course's credits and Gi its grade point. For CGPA, Si is each semester's SGPA and Ci that semester's total credits. Both are rounded to 2 decimal places (clause 22OB 6.6). Here is a 2022-scheme example:</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Course</th><th scope="col" class="num">Credits</th><th scope="col" class="num">Marks</th><th scope="col">Grade</th><th scope="col" class="num">Credits × points</th></tr></thead>
            <tbody>
              <tr><td>Mathematics</td><td class="num">4</td><td class="num">86</td><td>A+ (9)</td><td class="num">36</td></tr>
              <tr><td>Physics</td><td class="num">4</td><td class="num">74</td><td>A (8)</td><td class="num">32</td></tr>
              <tr><td>C Programming</td><td class="num">3</td><td class="num">91</td><td>O (10)</td><td class="num">30</td></tr>
              <tr><td>Basic Electronics</td><td class="num">3</td><td class="num">58</td><td>B (6)</td><td class="num">18</td></tr>
              <tr><td>Communicative English</td><td class="num">1</td><td class="num">66</td><td>B+ (7)</td><td class="num">7</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">15</td><td></td><td></td><td class="num">123</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">SGPA = 123 ÷ 15 = 8.20</p>
      </section>

      <section id="percentage">
        <h2>VTU CGPA to percentage</h2>
        <p><strong>2022 scheme:</strong> Percentage = CGPA × 10, so a CGPA of 8.20 becomes <strong>82%</strong> (clause 22OB 6.7). The regulation says this formula may be used for employment and higher studies.</p>
        <p><strong>2021 scheme and the 2015 CBCS scheme:</strong> Percentage = (CGPA − 0.75) × 10, so the same 8.20 becomes <strong>74.5%</strong>. That is why you will find two different VTU formulas online: each is correct for its own scheme. If you are on the 2017 or 2018 scheme, check the formula printed in your regulations or on your grade card.</p>
        <h3>Class equivalence (2022 scheme)</h3>
        <ul>
          <li><strong>First Class with Distinction:</strong> 70% or more, a CGPA of 7.00 and above</li>
          <li><strong>First Class:</strong> 60% to below 70%, a CGPA from 6.00 to 6.99</li>
          <li><strong>Second Class:</strong> 50% to below 60%, a CGPA from 5.00 to 5.99</li>
          <li><strong>Pass Class:</strong> 40% to 50%, a CGPA from 4.00 to 4.99</li>
        </ul>
      </section>

      <section id="passing">
        <h2>VTU passing marks (2022 scheme)</h2>
        <ul>
          <li>CIE is worth up to 50 marks, and you need at least 40% of the CIE maximum to be allowed to sit the SEE.</li>
          <li>In the SEE, also worth up to 50 marks, you need at least 35% of the maximum.</li>
          <li>Overall you need at least 40% in the course, which is a P grade.</li>
          <li>To pass the whole programme, you need a P grade or better in every registered course.</li>
        </ul>
      </section>`;
    },
    sources: [
      ['VTU (Award of Bachelor of Engineering/Technology Degree) Regulations 2022, clauses 1.4 and 22OB 6.1–6.8 (the copy on the VTU website is marked "Draft copy")', 'https://vtu.ac.in/wp-content/uploads/2023/04/BE-BTech-Regulations-2022-05.04.2023.pdf'],
      ['VTU B.E./B.Tech. Regulations, effective from the academic year 2021-22 (clause 21OB 11.2 and CGPA conversion)', 'https://vtu.ac.in/wp-content/uploads/2021/12/Final-Draft-copy-Regulation-BE-BTech.pdf'],
      ['VTU CBCS Regulations 2015-16 (CGPA conversion)', 'https://vtu.ac.in/wp-content/uploads/2019/12/becbcs2015-16.pdf']
    ],
    faq: [
      ['How do I convert VTU CGPA to percentage?', 'For the 2022 scheme, multiply your CGPA by 10, so 8.20 becomes 82%. For the 2021 scheme and the older 2015 CBCS scheme, use (CGPA − 0.75) × 10, so 8.20 becomes 74.5%.'],
      ['Why do some websites say to subtract 0.75 from VTU CGPA?', 'Older VTU regulations, including the 2015 CBCS and 2021-22 regulations, used (CGPA − 0.75) × 10. The 2022 regulations changed it to CGPA × 10. Each formula is correct for its own scheme.'],
      ['What CGPA do I need for First Class with Distinction in VTU?', 'Under the 2022 scheme, First Class with Distinction needs 70% or more, which means a CGPA of at least 7.00. First Class is 60% to below 70%, which is a CGPA from 6.00 to 6.99.'],
      ['What are the passing marks in the VTU 2022 scheme?', 'You need at least 40% of the CIE marks to sit the SEE, at least 35% of the SEE marks, and at least 40% overall in the course, which is a P grade.'],
      ['Is VTU grading relative or absolute?', 'Absolute. Your CIE and SEE marks are added and turned into a percentage, and fixed ranges decide your grade, for example 90 to 100 for an O in the 2022 scheme.'],
      ['How is CGPA calculated from SGPA in VTU?', 'Multiply each semester’s SGPA by that semester’s total credits, add the results and divide by the total credits of all semesters. SGPA and CGPA are rounded to 2 decimal places.']
    ]
  },

  // More universities live in tools/universities/<country>.js
  ...['usa', 'uk', 'malaysia', 'australia', 'germany'].flatMap(c => require('./universities/' + c + '.js'))
];

// Order of the country groups on the home page
const COUNTRIES = ['Pakistan', 'India', 'USA', 'UK', 'Malaysia', 'Australia', 'Germany'];
const COUNTRY_NAMES = { Pakistan: 'Pakistan', India: 'India', USA: 'United States', UK: 'United Kingdom', Malaysia: 'Malaysia', Australia: 'Australia', Germany: 'Germany' };

/* ---------- Build ---------- */
const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').replace(/\r\n/g, '\n');
const header = between(index, '  <!-- ================= Header', '  <main class="container">').replace(' aria-current="page"', '');
const footer = between(index, '  <!-- ================= Footer', '  <div id="toast"');
const layoutTemplate = between(index, '    <div class="layout">', '    <!-- ================= University calculators');
const themeScript = between(index, '  <script>\n    /* Apply the saved', '</head>');

const card = (u, indent) => `
${indent}<a class="card uni-card" href="${u.slug}.html">
${indent}  <span class="uni-badge">${u.short}</span>
${indent}  <span class="uni-name">${esc(u.name)}</span>
${indent}  <span class="muted small">${u.card}</span>
${indent}</a>`;

// Same-country calculators first, then the general calculator and the full list on the home page
function otherCalculators(current) {
  return UNIVERSITIES.filter(u => u.slug !== current.slug && u.country === current.country).map(u => card(u, '        ')).join('') + `
        <a class="card uni-card" href="index.html">
          <span class="uni-badge">ALL</span>
          <span class="uni-name">General CGPA Calculator</span>
          <span class="muted small">4.0, 5.0 and 10-point scales</span>
        </a>
        <a class="card uni-card" href="index.html#universities">
          <span class="uni-badge">${UNIVERSITIES.length}</span>
          <span class="uni-name">All university calculators</span>
          <span class="muted small">Pakistan, India, USA, UK, Malaysia, Australia and Germany</span>
        </a>`;
}

// The home page lists every university calculator, grouped by country
function writeHomeCards() {
  const file = path.join(ROOT, 'index.html');
  const groups = COUNTRIES.map(c => {
    const list = UNIVERSITIES.filter(u => u.country === c);
    if (!list.length) return '';
    return `
      <h3 class="uni-country">${COUNTRY_NAMES[c]}</h3>
      <div class="uni-grid">${list.map(u => card(u, '        ')).join('')}
      </div>`;
  }).join('');
  const html = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const out = replaceBlock(html, 'uni-cards', `<!-- uni-cards -->${groups}
      <!-- /uni-cards -->`);
  fs.writeFileSync(file, out);
  console.log('updated index.html university cards:', UNIVERSITIES.length);
}

function build(u) {
  const cfg = new Function('return ' + u.config)();
  const url = `${SITE}/${u.slug}.html`;
  const sc = u.scaleCard;
  const select = sc.options
    ? `<select id="scaleSelect" class="scale-select">${sc.options.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join('')}</select>`
    : `<select id="scaleSelect" hidden aria-hidden="true" tabindex="-1"><option value="${Object.keys(cfg.scales)[0]}">${esc(u.short)}</option></select>`;
  const titleTag = sc.options ? `<label id="scaleLabel" for="scaleSelect" class="scale-title">${esc(sc.title)}</label>` : `<p id="scaleLabel" class="scale-title">${esc(sc.title)}</p>`;

  // The German Grade tab belongs to the home page only
  let layout = layoutTemplate.replace(/<!-- german-(tab|panel) -->[\s\S]*?<!-- \/german-\1 -->\n/g, '');
  layout = replaceBlock(layout, 'mode-switch', u.modeSwitch);
  layout = replaceBlock(layout, 'conv-scale', u.convScale);
  layout = replaceBlock(layout, 'side-tips', `
        <section class="card tips">
          <h2 class="side-title">${esc(u.short)} quick facts</h2>
          <ul>
${u.facts.map(f => `            <li>${f}</li>`).join('\n')}
          </ul>
        </section>`);
  // Page-specific wording for systems that aren't GPA based (marks, German grades, degree classes …)
  (u.layoutReplace || []).forEach(([from, to]) => {
    if (!layout.includes(from)) throw new Error(`${u.slug}: text to replace not found: ${from}`);
    layout = layout.split(from).join(to);
  });
  if (u.howto) { // [GPA tab, CGPA tab, Target tab] "How is it calculated?" boxes; null keeps the default
    let i = 0;
    layout = layout.replace(/<details class="howto">[\s\S]*?<\/details>/g, m => { const h = u.howto[i++]; return h ? h.trim() : m; });
  }

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'WebApplication', '@id': url + '#app', name: u.name, url,
      image: `${SITE}/og-image.jpg`, description: u.desc, applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any', browserRequirements: 'Requires JavaScript', inLanguage: 'en', isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: u.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'CGPA Calculator', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: u.name, item: url }
      ]
    }
  ].map(o => `  <script type="application/ld+json">\n${JSON.stringify(o, null, 2).replace(/^/gm, '  ')}\n  </script>`).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Built by tools/build-university-pages.js – edit that file, not this one -->
  <title>${esc(u.title)}</title>
  <meta name="description" content="${esc(u.desc)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#f4f6fb">
  <link rel="canonical" href="${url}">

  <link rel="icon" href="favicon.ico" sizes="48x48">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="CGPA Calculator">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(u.name)}">
  <meta property="og:description" content="${esc(u.desc)}">
  <meta property="og:image" content="${SITE}/og-image.jpg">
  <meta property="og:image:alt" content="CGPA Calculator: a result card showing a CGPA of 3.37 out of 4.00">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(u.name)}">
  <meta name="twitter:description" content="${esc(u.desc)}">
  <meta name="twitter:image" content="${SITE}/og-image.jpg">
${ld}
  <link rel="stylesheet" href="style.css">
${themeScript}</head>
<body>

${header}  <main class="container">

    <section class="hero">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">CGPA Calculator</a><span aria-hidden="true"> › </span><span aria-current="page">${esc(u.short)}</span></nav>
      <h1>${esc(u.name)}</h1>
      <p>${esc(u.lead)}
        <a href="#guide" class="hero-link">${esc(u.guideLink)} ↓</a></p>
    </section>

    <section class="card scale-card" id="calculator" aria-labelledby="scaleLabel">
      <div class="scale-text">
        ${titleTag}
        <p class="muted small">${esc(sc.text)}</p>
      </div>
      ${select}
      <button type="button" id="resetAll" class="btn btn-outline danger-hover">Reset all</button>
    </section>
    <p class="print-only" id="printDate"></p>

${layout}
    <article class="guide" id="guide">
${u.article(cfg)}

      <section id="faq" class="faq">
        <h2>${esc(u.short)} CGPA calculator FAQs</h2>
${u.faq.map(([q, a]) => `
        <details>
          <summary><h3>${esc(q)}</h3></summary>
          <p>${esc(a)}</p>
        </details>`).join('')}
      </section>

      <section id="sources">
        <h2>Sources</h2>
        <ul class="source-note">
${u.sources.map(([label, href]) => `          <li><a href="${href}">${esc(label)}</a></li>`).join('\n')}
        </ul>
        <p class="source-note">Last checked: ${UPDATED}. University rules can change, so always confirm your results with your own university's latest official rules. See our <a href="terms.html">Terms of Use</a>.</p>
      </section>
    </article>

    <section class="uni-section" aria-labelledby="uniTitle">
      <h2 id="uniTitle">More CGPA &amp; GPA calculators</h2>
      <div class="uni-grid">${otherCalculators(u)}
      </div>
    </section>
    <p class="back-top"><a href="#calculator">↑ Back to the calculator</a></p>
  </main>

${footer}  <div id="toast" class="toast" role="status" aria-live="polite"></div>

  <script>window.CGPA_PAGE = ${u.config.replace(/\n    /g, '\n  ')};</script>
  <script src="site.js"></script>
  <script src="script.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(ROOT, u.slug + '.html'), html);
  console.log('wrote', u.slug + '.html', '| title', u.title.length, '| desc', u.desc.length);
}

// cgpa-to-german-grade.html uses the same converter markup as the German Grade tab (logic in german-grade.js)
function syncGermanPage() {
  const file = path.join(ROOT, 'cgpa-to-german-grade.html');
  const block = index.match(/<!-- german-converter -->[\s\S]*?<!-- \/german-converter -->/)[0];
  // a function, so "$" in the markup is not treated as a replacement pattern
  const html = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n')
    .replace(/<!-- german-converter -->[\s\S]*?<!-- \/german-converter -->/, () => block);
  fs.writeFileSync(file, html);
  console.log('updated cgpa-to-german-grade.html converter');
}

UNIVERSITIES.forEach(build);
writeHomeCards();
syncGermanPage();
