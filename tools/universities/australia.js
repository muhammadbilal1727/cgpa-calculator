/* Australian university pages for tools/build-university-pages.js (same fields as the entries in that file) */

// Australian universities count "units" or "credit points" instead of credit hours
const AU_MSGS = {
  'Enter your CGPA to see the percentage.': 'Enter your GPA to see which grade level it matches.',
  'Fix the CGPA above to see the percentage.': 'Fix the GPA above to see the result.',
  'GPA / SGPA': 'GPA',
  'CGPA {cgpa} on the {scale}': 'GPA {cgpa} on the {scale}',
  'Total credit hours: {credits}': 'Total credit points: {credits}',
  '1 subject · {credits} credit hours · {points} grade points': '1 course · {credits} credit points · {points} grade points',
  '{n} subjects · {credits} credit hours · {points} grade points': '{n} courses · {credits} credit points · {points} grade points',
  '1 semester · {credits} total credit hours': '1 semester · {credits} total credit points',
  '{n} semesters · {credits} total credit hours': '{n} semesters · {credits} total credit points',
  'You need an average GPA of at least {needed} over your remaining {left} credit hours to reach a {target} CGPA.': 'You need an average GPA of at least {needed} over your remaining {left} credit points to reach a {target} GPA.',
  'To reach a {target} CGPA (now {current}), I need an average GPA of {needed} over my remaining {left} credit hours.': 'To reach a {target} GPA (now {current}), I need an average GPA of {needed} over my remaining {left} credit points.',
  'Please enter the credit hours for this subject.': 'Please enter the credit points for this course.',
  'Please enter the total credit hours for this semester.': 'Please enter the total credit points for this semester.',
  'That looks too high. Credit hours are usually between 1 and 6.': 'That looks too high. Please check the credit points.',
  'That looks too high. A semester usually has 12 to 24 credit hours.': 'That looks too high. Please check the credit points.'
};

// WAM (marks out of 100) wording for Melbourne
const WAM_MSGS = {
  'Add your subjects to see your GPA.': 'Add your subjects to see your WAM.',
  'Add your semesters to see your CGPA.': 'Add your semesters to see your overall WAM.',
  'Fill in the four boxes above to see the GPA you need.': 'Fill in the four boxes above to see the WAM you need.',
  'Fill in all four boxes to see the GPA you need.': 'Fill in all four boxes to see the WAM you need.',
  'Enter your CGPA to see the percentage.': 'Enter your WAM to see its grade band.',
  'Fix the CGPA above to see the percentage.': 'Fix the WAM above to see its grade band.',
  'Please enter the GPA for this semester.': 'Please enter the WAM for this semester.',
  'Please enter the credit hours for this subject.': 'Please enter the credit points for this subject.',
  'Please enter the total credit hours for this semester.': 'Please enter the credit points for this semester.',
  'That looks too high. Credit hours are usually between 1 and 6.': 'That looks too high. Please check the credit points.',
  'That looks too high. A semester usually has 12 to 24 credit hours.': 'That looks too high. Please check the credit points.',
  'GPA / SGPA': 'WAM',
  'GPA should be a number, like {x}.': 'The mark should be a number, like {x}.',
  'GPA can’t be negative.': 'A mark can’t be negative.',
  'GPA can’t be more than {max} on the {scale}.': 'A mark can’t be more than 100.',
  'CGPA can’t be negative.': 'A mark can’t be negative.',
  'On the {scale}, CGPA can’t be more than {max}. Try a different scale.': 'A mark can’t be more than 100.',
  'Please type your CGPA as a number, like {x}.': 'Please type your WAM as a number, like {x}.',
  'Calculate your CGPA in the CGPA tab first 🙂': 'Work out your overall WAM in the Overall tab first 🙂',
  'Semester {n}: GPA {gpa}, {credits} credits': 'Semester {n}: WAM {gpa}, {credits} credit points',
  'My semester GPA: {gpa} ({scale})': 'My semester WAM: {gpa} ({scale})',
  'My CGPA: {cgpa} ({scale})': 'My overall WAM: {cgpa} ({scale})',
  'Total credit hours: {credits}': 'Total credit points: {credits}',
  '1 subject · {credits} credits': '1 subject · {credits} credit points',
  '{n} subjects · {credits} credits': '{n} subjects · {credits} credit points',
  '1 semester · {credits} total credit hours': '1 semester · {credits} total credit points',
  '{n} semesters · {credits} total credit hours': '{n} semesters · {credits} total credit points',
  'You need an average GPA of at least {needed} over your remaining {left} credit hours to reach a {target} CGPA.': 'You need an average mark of at least {needed} over your remaining {left} credit points to reach a WAM of {target}.',
  'Even with a perfect {max} in every remaining semester, the highest CGPA you can reach is {best}.': 'Even with 100 in every remaining subject, the highest WAM you can reach is {best}.',
  'To reach a {target} CGPA (now {current}), I need an average GPA of {needed} over my remaining {left} credit hours.': 'To reach a WAM of {target} (now {current}), I need an average mark of {needed} over my remaining {left} credit points.',
  'To reach a {target} CGPA I would need {needed}, which is above the {max} maximum. The best I can reach is {best}.': 'To reach a WAM of {target} I would need {needed}, which is above 100. The best I can reach is {best}.',
  'I have already secured a {target} CGPA.': 'I have already secured a WAM of {target}.',
  'Your CGPA will stay at or above {target} no matter what. Aim high anyway!': 'Your WAM will stay at or above {target} no matter what. Aim high anyway!'
};

const POINTS_LAYOUT = (label) => [
  ['<span>Subject (optional)</span><span>Credits</span>', `<span>Course (optional)</span><span>${label}</span>`],
  ['<span>Semester</span><span>GPA / SGPA</span><span>Credit hours</span>', `<span>Semester</span><span>GPA</span><span>${label}</span>`],
  ['Add each subject with its credit hours and grade.', 'Add each course with its ' + label.toLowerCase() + ' and grade.'],
  ["Add each semester's GPA (SGPA) and its total credit hours.", "Add each semester's GPA and its total " + label.toLowerCase() + '.'],
  ['<label class="field-label" for="tDone">Credits completed</label>', `<label class="field-label" for="tDone">${label} completed</label>`],
  ['<label class="field-label" for="tLeft">Credits remaining</label>', `<label class="field-label" for="tLeft">${label} remaining</label>`],
  ['Percentage <small>Converter</small>', 'Grade level <small>Checker</small>'],
  ['<h2>CGPA to percentage</h2>', '<h2>GPA to grade level</h2>'],
  ['Type your CGPA and choose its scale.', 'Type your GPA to see which grade level it matches.'],
  ['<label class="field-label always" for="convInput">Your CGPA</label>', '<label class="field-label always" for="convInput">Your GPA</label>'],
  ['<div class="result-label">Percentage</div>', '<div class="result-label">Grade level</div>'],
  ['Convert this CGPA to % →', 'Check my grade level →'],
  ['Use my CGPA from the CGPA tab', 'Use my GPA from the CGPA tab']
];

module.exports = [
  {
    slug: 'uq-cgpa-calculator',
    country: 'Australia',
    short: 'UQ',
    name: 'UQ CGPA & GPA Calculator (7-Point Scale)',
    title: 'UQ CGPA & GPA Calculator – 7-Point Scale',
    desc: 'University of Queensland CGPA and GPA calculator on the official UQ 7-point scale (7 = High Distinction), weighted by unit value.',
    lead: 'Work out your University of Queensland GPA on the official 7-point scale, weighted by each course’s unit value, exactly as the UQ Assessment Procedure defines it.',
    guideLink: 'How the UQ GPA works',
    card: '7-point scale · 7 = High Distinction',
    scaleCard: {
      title: 'Grading system: UQ 7-point scale',
      text: 'Choose the grade of result (1 to 7) for each course and enter its unit value. Non-graded passes (P) are left out of the GPA.'
    },
    config: `{
      storageKey: 'cgpa-uq',
      creditLabel: 'Units',
      semCreditLabel: 'Units',
      creditExample: 2,
      semCreditExample: 8,
      msgs: Object.assign(${JSON.stringify(AU_MSGS)}, {
        '1 subject · {credits} credit hours · {points} grade points': '1 course · {credits} units · {points} grade points',
        '{n} subjects · {credits} credit hours · {points} grade points': '{n} courses · {credits} units · {points} grade points',
        '1 semester · {credits} total credit hours': '1 semester · {credits} total units',
        '{n} semesters · {credits} total credit hours': '{n} semesters · {credits} total units',
        'Total credit hours: {credits}': 'Total units: {credits}',
        'You need an average GPA of at least {needed} over your remaining {left} credit hours to reach a {target} CGPA.': 'You need an average GPA of at least {needed} over your remaining {left} units to reach a {target} GPA.',
        'To reach a {target} CGPA (now {current}), I need an average GPA of {needed} over my remaining {left} credit hours.': 'To reach a {target} GPA (now {current}), I need an average GPA of {needed} over my remaining {left} units.',
        'Please enter the credit points for this course.': 'Please enter the units for this course.'
      }),
      scales: {
        uq: {
          max: 7, min: 0, label: 'UQ 7-point scale', region: 'The University of Queensland', example: '5.50', modes: ['grade'], gradeDigits: 0,
          subtitle: 'Grades of result from 1 to 7',
          grades: [['7 High Distinction', 7], ['6 Distinction', 6], ['5 Credit', 5], ['4 Pass', 4], ['3 Marginal Fail', 3], ['2 Fail', 2], ['1 Low Fail', 1], ['N Non-graded fail', 2]]
        }
      },
      conversions: {
        uq: {
          formula: 'GPA → nearest UQ grade level',
          example: 5.6, max: 7, label: 'UQ 7-point scale',
          note: 'UQ does not publish a GPA-to-percentage formula, and grade cut-offs are set for each course. This shows which grades of result your GPA sits between.',
          result: function (c) {
            var t = window.CGPA_T;
            var names = ['', 'Low Fail', 'Fail', 'Marginal Fail', 'Pass', 'Credit', 'Distinction', 'High Distinction'];
            var lo = Math.max(1, Math.min(7, Math.floor(c + 1e-9))), hi = Math.min(7, lo + 1);
            var whole = Math.abs(c - Math.round(c)) < 1e-9 && c >= 1;
            return { pct: c / 7 * 100, ratio: c / 7,
              text: whole ? t(names[Math.round(c)]) : t('{a} to {b}', { a: lo, b: hi }),
              work: whole ? t('GPA {gpa} = grade {g} ({name})', { gpa: c.toFixed(2), g: Math.round(c), name: t(names[Math.round(c)]) })
                : t('GPA {gpa} is between grade {a} ({an}) and grade {b} ({bn})', { gpa: c.toFixed(2), a: lo, an: t(names[lo]), b: hi, bn: t(names[hi]) }) };
          }
        }
      }
    }`,
    modeSwitch: '',
    convScale: '',
    layoutReplace: POINTS_LAYOUT('Units'),
    howto: [`
          <details class="howto">
            <summary>How is the UQ GPA calculated?</summary>
            <p class="formula-line">GPA = Σ (G × P) ÷ Σ P</p>
            <p class="muted small">G is the grade of result (1 to 7) and P the unit value of the course. Example: a 2-unit course with a 6 and a 2-unit course with a 5 → (2×6 + 2×5) ÷ 4 = <strong>5.50</strong></p>
          </details>`, null, null],
    facts: [
      'UQ grades run from <strong>1 to 7</strong>: 7 High Distinction, 6 Distinction, 5 Credit, <strong>4 Pass</strong>.',
      'The GPA is weighted by each course’s <strong>unit value</strong> (most courses are 2 units).',
      'A non-graded pass (P) is <strong>left out</strong>; a non-graded fail (N) <strong>counts as 2</strong>.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How UQ calculates your GPA</h2>
        <p>The University of Queensland defines the GPA in its Assessment Procedure as the average of your grades of result, weighted by the unit value of each course:</p>
        <p class="formula-block">GPA = Σ (G × P) ÷ Σ P</p>
        <p>G is the grade of result in a course and P is the unit value of that course. If you are enrolled in a course but get no result, G is 0. Most UQ courses are worth 2 units, so a 2-unit 7 adds 14 to the top of the fraction and 2 to the bottom.</p>
      </section>

      <section id="grade-points">
        <h2>The UQ 7-point grading scale</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col" class="num">Grade</th><th scope="col">Name</th><th scope="col">Meaning</th></tr></thead>
            <tbody>
              <tr><td class="num">7</td><td>High Distinction</td><td>Exceptional achievement of the course learning outcomes</td></tr>
              <tr><td class="num">6</td><td>Distinction</td><td>Advanced achievement</td></tr>
              <tr><td class="num">5</td><td>Credit</td><td>Proficient achievement</td></tr>
              <tr><td class="num">4</td><td>Pass</td><td>Functional achievement</td></tr>
              <tr><td class="num">3</td><td>Marginal Fail</td><td>Developing achievement</td></tr>
              <tr><td class="num">2</td><td>Fail</td><td>Minimal evidence of achievement</td></tr>
              <tr><td class="num">1</td><td>Low Fail</td><td>Absence of evidence of achievement</td></tr>
            </tbody>
          </table>
        </div>
        <p>UQ doesn't set university-wide percentage cut-offs for these grades; each course profile explains how its grades are decided. A course with a non-graded pass (P) is excluded from the GPA, a non-graded fail (N) counts as a 2, and the grades G, M, K and X count as 0.</p>
      </section>

      <section id="example">
        <h2>How to calculate your UQ GPA: worked example</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Course</th><th scope="col" class="num">Units</th><th scope="col" class="num">Grade</th><th scope="col" class="num">Units × grade</th></tr></thead>
            <tbody>
              <tr><td>Calculus &amp; Linear Algebra</td><td class="num">2</td><td class="num">6</td><td class="num">12</td></tr>
              <tr><td>Introduction to Software Engineering</td><td class="num">2</td><td class="num">7</td><td class="num">14</td></tr>
              <tr><td>Introductory Statistics</td><td class="num">2</td><td class="num">5</td><td class="num">10</td></tr>
              <tr><td>Communication course</td><td class="num">2</td><td class="num">4</td><td class="num">8</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">8</td><td></td><td class="num">44</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">GPA = 44 ÷ 8 = 5.50</p>
      </section>

      <section id="percentage">
        <h2>UQ GPA and percentages</h2>
        <p>Because grades are decided course by course, there is no official way to turn a UQ GPA into a percentage. The converter tab tells you which grades of result your GPA sits between, for example 5.50 is between 5 (Credit) and 6 (Distinction). For applications that need a percentage, send your official transcript.</p>
      </section>`,
    sources: [
      ['The University of Queensland: Assessment Procedure (grading scale and Appendix 2, GPA)', 'https://policies.uq.edu.au/document/view-current.php?id=184'],
      ['The University of Queensland: Award of University Medals Procedure (GPA weighting)', 'https://policies.uq.edu.au/document/view-current.php?id=187']
    ],
    faq: [
      ['Is the UQ GPA out of 7?', 'Yes. UQ uses a 7-point scale: 7 High Distinction, 6 Distinction, 5 Credit, 4 Pass, 3 Marginal Fail, 2 Fail and 1 Low Fail.'],
      ['How is the UQ GPA calculated?', 'GPA = Σ (G × P) ÷ Σ P, where G is the grade of result in a course and P is its unit value. If you are enrolled but get no result, G is 0.'],
      ['Do pass/fail courses count in my UQ GPA?', 'A course with a non-graded pass (P) is excluded. A non-graded fail (N) is counted as a grade of 2.'],
      ['What percentage is a 7 at UQ?', 'UQ has no university-wide percentage cut-offs. Each course profile explains how grades are decided, so check the profile for your course.'],
      ['What is a good GPA at UQ?', 'A 7 is a High Distinction and a 6 a Distinction, so a GPA of 6 or more means your average result is at Distinction level. Requirements for honours, scholarships or postgraduate study are set by each program.'],
      ['What unit value should I enter?', 'Use the unit value shown for each course. Most UQ courses are 2 units.']
    ]
  },

  {
    slug: 'melbourne-cgpa-calculator',
    country: 'Australia',
    short: 'Melbourne',
    name: 'University of Melbourne CGPA & GPA (WAM) Calculator',
    title: 'Melbourne CGPA & GPA (WAM) Calculator – H1 to N Bands',
    desc: 'University of Melbourne CGPA and GPA calculator for your WAM (Weighted Average Mark), with credit-point weighting and the H1 to N grade bands.',
    lead: 'Work out your University of Melbourne WAM, the Weighted Average Mark that appears on your academic record, and see which grade band (H1 to N) it falls in.',
    guideLink: 'How the Melbourne WAM works',
    card: 'WAM · H1 = 80 and above',
    scaleCard: {
      title: 'Marking system: University of Melbourne (WAM)',
      text: 'Enter your final mark (out of 100) and the credit points for each subject. Subjects without a mark, such as pass/fail subjects, are left out.'
    },
    config: `{
      storageKey: 'cgpa-melbourne',
      creditLabel: 'Credit points',
      semCreditLabel: 'Credit points',
      creditExample: 12.5,
      semCreditExample: 50,
      maxCredit: 100,
      maxSemCredit: 200,
      maxTotalCredit: 800,
      msgs: ${JSON.stringify(WAM_MSGS)},
      scales: {
        melb: {
          max: 100, label: 'Melbourne marks', region: 'University of Melbourne coursework', example: '72', modes: ['points'],
          pointsLabel: 'Mark (out of 100)', maxText: '/ 100', gradeDigits: 0, noQualityPoints: true,
          ratioPoints: [[0, 0], [50, 0.6], [65, 0.75], [75, 0.85], [80, 0.9], [100, 1]],
          subtitle: 'Grade bands for coursework subjects',
          grades: [['H1', 100, null, 80], ['H2A', 79, null, 75], ['H2B', 74, null, 70], ['H3', 69, null, 65], ['P', 64, null, 50], ['N', 49, null, 0]]
        }
      },
      conversions: {
        melb: {
          formula: 'WAM → grade band (H1, H2A, H2B, H3, P, N)',
          example: 76.5, max: 100, label: 'Melbourne marks',
          note: 'The bands are the University of Melbourne coursework grading scheme. A WAM is an average, so the band shows the level of your average result, not a grade on your record.',
          result: function (c) {
            var t = window.CGPA_T;
            var b = c >= 80 ? 'H1' : c >= 75 ? 'H2A' : c >= 70 ? 'H2B' : c >= 65 ? 'H3' : c >= 50 ? 'P' : 'N';
            return { pct: c, ratio: Math.min(1, c / 85), text: b,
              work: t('WAM {mark} → {band} band', { mark: c.toFixed(2), band: b }),
              sub: t('WAM {mark} out of 100', { mark: c.toFixed(2) }) };
          }
        }
      }
    }`,
    modeSwitch: '',
    convScale: '',
    layoutReplace: [
      ['GPA <small>One semester</small>', 'WAM <small>One semester</small>'],
      ['CGPA <small>All semesters</small>', 'Overall <small>All semesters</small>'],
      ['Percentage <small>Converter</small>', 'Grade band <small>Checker</small>'],
      ['<h2>Semester GPA</h2>', '<h2>Semester WAM</h2>'],
      ['Add each subject with its credit hours and grade.', 'Add each subject with its credit points and final mark.'],
      ['<span>Subject (optional)</span><span>Credits</span>', '<span>Subject (optional)</span><span>Credit points</span>'],
      ['Your semester GPA', 'Your semester WAM'],
      ['Add this GPA to my CGPA →', 'Add this WAM to my overall WAM →'],
      ['<h2>Overall CGPA</h2>', '<h2>Overall WAM</h2>'],
      ["Add each semester's GPA (SGPA) and its total credit hours.", "Add each semester's WAM and the credit points it covers."],
      ['<span>Semester</span><span>GPA / SGPA</span><span>Credit hours</span>', '<span>Semester</span><span>WAM</span><span>Credit points</span>'],
      ['<div class="result-label">Your CGPA</div>', '<div class="result-label">Your overall WAM</div>'],
      ['Convert this CGPA to % →', 'Check my grade band →'],
      ['<h2>Target CGPA</h2>', '<h2>Target WAM</h2>'],
      ['Find out what GPA you need in your coming semesters to reach your goal.', 'Find out what average mark you need in your remaining subjects to reach your target WAM.'],
      ['<label class="field-label" for="tCurrent">Current CGPA</label>', '<label class="field-label" for="tCurrent">Current WAM</label>'],
      ['<label class="field-label" for="tDone">Credits completed</label>', '<label class="field-label" for="tDone">Credit points completed</label>'],
      ['<label class="field-label" for="tTarget">Target CGPA</label>', '<label class="field-label" for="tTarget">Target WAM</label>'],
      ['<label class="field-label" for="tLeft">Credits remaining</label>', '<label class="field-label" for="tLeft">Credit points remaining</label>'],
      ['GPA you need each semester', 'Average mark you need from now on'],
      ['<h2>CGPA to percentage</h2>', '<h2>WAM to grade band</h2>'],
      ['Type your CGPA and choose its scale.', 'Type your WAM out of 100.'],
      ['<label class="field-label always" for="convInput">Your CGPA</label>', '<label class="field-label always" for="convInput">Your WAM</label>'],
      ['<div class="result-label">Percentage</div>', '<div class="result-label">Grade band</div>'],
      ['Use my CGPA from the CGPA tab', 'Use my WAM from the Overall tab'],
      ['<th scope="col" class="num">Points</th>', '<th scope="col" class="num">Marks</th>']
    ],
    howto: [`
          <details class="howto">
            <summary>How is the WAM calculated?</summary>
            <p class="formula-line">WAM = Σ (mark × credit points) ÷ Σ credit points</p>
            <p class="muted small">Example: a 12.5-point subject with 78 and a 25-point subject with 70 → (12.5×78 + 25×70) ÷ 37.5 = 2725 ÷ 37.5 = <strong>72.67</strong></p>
          </details>`, `
          <details class="howto">
            <summary>How is the overall WAM calculated?</summary>
            <p class="formula-line">Overall WAM = Σ (semester WAM × credit points) ÷ Σ credit points</p>
            <p class="muted small">Example: 74 over 50 points and 70 over 50 points → (74×50 + 70×50) ÷ 100 = <strong>72.00</strong></p>
          </details>`, `
          <details class="howto">
            <summary>How is this calculated?</summary>
            <p class="formula-line">Mark needed = (Target × total points − Current × completed points) ÷ remaining points</p>
            <p class="muted small">Example: a WAM of 72 over 200 points, a target of 75 and 100 points left →
              (75 × 300 − 72 × 200) ÷ 100 = <strong>81</strong></p>
          </details>`],
    facts: [
      'Your WAM is the average of your marks <strong>weighted by credit points</strong>.',
      'Subjects with <strong>no mark</strong>, pass/fail subjects, withdrawals and credit from elsewhere are <strong>left out</strong>.',
      'Coursework bands: <strong>H1 80+</strong>, H2A 75–79, H2B 70–74, H3 65–69, P 50–64, N below 50.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How the University of Melbourne calculates your WAM</h2>
        <p>The Weighted Average Mark (WAM) is the average of your subject marks, weighted by the credit points of each subject. Multiply each mark by its credit points, add up the results and divide by the total credit points.</p>
        <p class="formula-block">WAM = Σ (mark × credit points) ÷ Σ credit points</p>
        <p>Some subjects are left out: those with no mark recorded, subjects assessed only on a pass/fail basis, subjects you withdrew from and credit granted from another institution. A subject only enters your WAM once its final result is confirmed.</p>
      </section>

      <section id="grade-points">
        <h2>Melbourne grade bands (coursework)</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Grade</th><th scope="col" class="num">Marks</th></tr></thead>
            <tbody>
              <tr><td>H1 (First Class Honours)</td><td class="num">80–100</td></tr>
              <tr><td>H2A (Second Class Honours, Division A)</td><td class="num">75–79</td></tr>
              <tr><td>H2B (Second Class Honours, Division B)</td><td class="num">70–74</td></tr>
              <tr><td>H3 (Third Class Honours)</td><td class="num">65–69</td></tr>
              <tr><td>P (Pass)</td><td class="num">50–64</td></tr>
              <tr><td>N (Fail)</td><td class="num">0–49</td></tr>
            </tbody>
          </table>
        </div>
        <p>The University introduced new interim grades and new grades for research Masters theses from 1 January 2025; check your academic record for the grades that apply to you.</p>
      </section>

      <section id="example">
        <h2>How to calculate your WAM: worked example</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Subject</th><th scope="col" class="num">Credit points</th><th scope="col" class="num">Mark</th><th scope="col" class="num">Points × mark</th></tr></thead>
            <tbody>
              <tr><td>Calculus 2</td><td class="num">12.5</td><td class="num">81</td><td class="num">1012.5</td></tr>
              <tr><td>Foundations of Computing</td><td class="num">12.5</td><td class="num">74</td><td class="num">925</td></tr>
              <tr><td>Principles of Finance</td><td class="num">12.5</td><td class="num">68</td><td class="num">850</td></tr>
              <tr><td>Breadth subject</td><td class="num">12.5</td><td class="num">77</td><td class="num">962.5</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">50</td><td></td><td class="num">3750</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">WAM = 3750 ÷ 50 = 75.00 → H2A band</p>
      </section>

      <section id="percentage">
        <h2>WAM and GPA</h2>
        <p>Your WAM is already a percentage-style number out of 100, so there's nothing to convert for most Australian applications. If an application abroad asks for a GPA, send your academic record and let the institution convert it with its own rules.</p>
      </section>`,
    sources: [
      ['The University of Melbourne: Weighted Average Mark (WAM)', 'https://students.unimelb.edu.au/course-admin/wam'],
      ['The University of Melbourne: Previous grading schemes', 'https://students.unimelb.edu.au/course-admin/results/previous-grading-schemes']
    ],
    faq: [
      ['What is a WAM at the University of Melbourne?', 'Your Weighted Average Mark: the average of your subject marks weighted by credit points. WAM = Σ (mark × credit points) ÷ Σ credit points.'],
      ['Which subjects are not included in my WAM?', 'Subjects with no mark recorded, pass/fail-only subjects, subjects you withdrew from and credit from another institution.'],
      ['What WAM is an H1 at Melbourne?', 'H1 is 80 to 100. H2A is 75–79, H2B 70–74, H3 65–69, P 50–64 and N (fail) below 50.'],
      ['When does a subject count towards my WAM?', 'Once its final result is confirmed. It then counts with its full credit-point weight.'],
      ['How many credit points is a Melbourne subject?', 'Most undergraduate subjects are 12.5 credit points. Enter the points shown for each subject in the Handbook.'],
      ['How do I convert my WAM to a GPA?', 'The University of Melbourne does not publish a WAM-to-GPA formula on this page. Send your academic record and let the receiving institution convert it.']
    ]
  },

  {
    slug: 'monash-cgpa-calculator',
    country: 'Australia',
    short: 'Monash',
    name: 'Monash CGPA & GPA Calculator (4.0 Scale)',
    title: 'Monash CGPA & GPA Calculator – HD 4.0, N 0.3',
    desc: 'Monash University CGPA and GPA calculator with the official Monash grade values (HD 4.0, D 3.0, C 2.0, P 1.0, NP 0.7, N 0.3), weighted by credit points.',
    lead: 'Calculate your Monash University GPA with the official grade values, from HD (4.0) down to N (0.3), weighted by credit points and shown to three decimal places like Monash does.',
    guideLink: 'How the Monash GPA works',
    card: '4.0 scale · fails still give 0.3',
    scaleCard: {
      title: 'Grading system: Monash University GPA',
      text: 'Choose the grade for each unit and enter its credit points (most units are 6). Grades such as SFR, NE, NAS and WI are left out.'
    },
    config: `{
      storageKey: 'cgpa-monash',
      creditLabel: 'Credit points',
      semCreditLabel: 'Credit points',
      creditExample: 6,
      semCreditExample: 24,
      maxCredit: 48,
      maxSemCredit: 96,
      msgs: ${JSON.stringify(AU_MSGS)},
      scales: {
        monash: {
          max: 4, label: 'Monash 4.0 scale', region: 'Monash University · weighted by credit points', example: '3.200', modes: ['grade'], digits: 3, gradeDigits: 1,
          grades: [['HD', 4], ['D', 3], ['C', 2], ['P', 1], ['NP', 0.7], ['N', 0.3], ['NH', 0.3], ['WN', 0]]
        }
      },
      conversions: {
        monash: {
          formula: 'GPA → nearest Monash grade level',
          example: 3.2, max: 4, label: 'Monash 4.0 scale',
          note: 'Monash does not publish a GPA-to-percentage formula. This shows which grades your GPA sits between: HD = 4.0, D = 3.0, C = 2.0, P = 1.0.',
          result: function (c) {
            var t = window.CGPA_T;
            var lv = [[4, 'HD (High Distinction)'], [3, 'D (Distinction)'], [2, 'C (Credit)'], [1, 'P (Pass)']];
            for (var i = 0; i < lv.length; i++) {
              if (Math.abs(c - lv[i][0]) < 1e-9) return { pct: c / 4 * 100, text: lv[i][1].split(' ')[0], work: t('GPA {gpa} = {name}', { gpa: c.toFixed(3), name: t(lv[i][1]) }) };
              if (c > lv[i][0]) return { pct: c / 4 * 100, text: lv[i][1].split(' ')[0] + '–' + lv[i - 1][1].split(' ')[0],
                work: t('GPA {gpa} is between {a} and {b}', { gpa: c.toFixed(3), a: t(lv[i][1]), b: t(lv[i - 1][1]) }) };
            }
            return { pct: 0, text: 'N', work: t('GPA {gpa} is below a pass', { gpa: c.toFixed(3) }) };
          }
        }
      }
    }`,
    modeSwitch: '',
    convScale: '',
    layoutReplace: POINTS_LAYOUT('Credit points'),
    facts: [
      'Grade values: <strong>HD 4.0</strong>, D 3.0, C 2.0, P 1.0, NP 0.7, and a fail (N or NH) still gives <strong>0.3</strong>.',
      'The GPA is weighted by <strong>credit points</strong> and calculated to <strong>three decimal places</strong>.',
      'A withdrawn fail (WN) is 0.0; SFR, NE, NAS, WI, PGO, NPGO and WNGO are left out.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How Monash calculates your GPA</h2>
        <p>Monash University gives every grade a value from 0.0 to 4.0. Your GPA is the sum of each grade value multiplied by the unit's credit points, divided by the total credit points, calculated to three decimal places.</p>
        <p class="formula-block">GPA = Σ (grade value × unit credit points) ÷ Σ unit credit points</p>
        <p>Monash calculates a GPA for your award course if you started it on or after semester one, 2008. Research master's and PhD courses don't have one. The calculator on the Monash website and this one give an indication only; your official GPA is in WES or the Student Portal.</p>
      </section>

      <section id="grade-points">
        <h2>Monash grade values</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Grade</th><th scope="col" class="num">Usual marks</th><th scope="col" class="num">Grade value</th></tr></thead>
            <tbody>
              <tr><td>HD (High Distinction)</td><td class="num">80–100</td><td class="num">4.0</td></tr>
              <tr><td>D (Distinction)</td><td class="num">70–79</td><td class="num">3.0</td></tr>
              <tr><td>C (Credit)</td><td class="num">60–69</td><td class="num">2.0</td></tr>
              <tr><td>P (Pass)</td><td class="num">50–59</td><td class="num">1.0</td></tr>
              <tr><td>NP (Near pass)</td><td class="num">—</td><td class="num">0.7</td></tr>
              <tr><td>N (Fail)</td><td class="num">0–49</td><td class="num">0.3</td></tr>
              <tr><td>NH (Hurdle fail)</td><td class="num">—</td><td class="num">0.3</td></tr>
              <tr><td>WN (Withdrawn fail)</td><td class="num">—</td><td class="num">0.0</td></tr>
            </tbody>
          </table>
        </div>
        <p>Notice that a fail is not worth zero at Monash: N and NH give 0.3. Only a withdrawn fail (WN) is 0.0. The grades SFR, NE, NAS, WI, PGO, NPGO and WNGO are excluded from the GPA altogether.</p>
      </section>

      <section id="example">
        <h2>How to calculate your Monash GPA: worked example</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Unit</th><th scope="col" class="num">Credit points</th><th scope="col">Grade</th><th scope="col" class="num">Points × value</th></tr></thead>
            <tbody>
              <tr><td>Introduction to Programming</td><td class="num">6</td><td>HD</td><td class="num">24.0</td></tr>
              <tr><td>Discrete Mathematics</td><td class="num">6</td><td>D</td><td class="num">18.0</td></tr>
              <tr><td>Computer Systems</td><td class="num">6</td><td>C</td><td class="num">12.0</td></tr>
              <tr><td>Elective</td><td class="num">6</td><td>N</td><td class="num">1.8</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">24</td><td></td><td class="num">55.8</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">GPA = 55.8 ÷ 24 = 2.325</p>
      </section>

      <section id="percentage">
        <h2>Monash GPA and percentages</h2>
        <p>Monash does not convert GPAs into percentages. The converter tab shows which grade levels your GPA sits between; for example 3.200 is between D (3.0) and HD (4.0). If an application needs a percentage, send your official academic transcript.</p>
      </section>`,
    sources: [
      ['Monash University: Grade point average (GPA)', 'https://www.monash.edu/students/admin/assessments/results/gpa'],
      ['Monash College: Results – reading your marks (Monash University grading bands)', 'https://www.monashcollege.edu.au/about-us/policies-procedures/assessment/results-reading-your-marks']
    ],
    faq: [
      ['Is the Monash GPA out of 4 or 7?', 'Out of 4. Monash grade values run from 0.0 to 4.0, with HD 4.0, D 3.0, C 2.0 and P 1.0.'],
      ['Does a fail count as zero at Monash?', 'No. A fail (N) and a hurdle fail (NH) are worth 0.3. Only a withdrawn fail (WN) is 0.0.'],
      ['How many decimal places does Monash use for GPA?', 'Monash calculates the GPA to three decimal places, for example 2.325.'],
      ['Which grades are left out of the Monash GPA?', 'SFR, NE, NAS, WI, PGO, NPGO and WNGO are excluded from the calculation.'],
      ['What marks give an HD at Monash?', 'An HD is usually 80–100. D is 70–79, C 60–69 and P 50–59.'],
      ['Where can I see my official Monash GPA?', 'In WES or the Student Portal. Calculators, including the one on the Monash website, only give an indication. If you think your GPA is wrong, contact Monash Connect.']
    ]
  }
];
