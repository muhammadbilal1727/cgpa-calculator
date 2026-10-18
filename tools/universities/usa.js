/* USA university pages for tools/build-university-pages.js (same fields as the entries in that file) */
const f2 = n => n.toFixed(2);

// "Units" wording for the credit columns, shared by MIT and Stanford
const UNITS = [
  ['<span>Subject (optional)</span><span>Credits</span>', '<span>Course (optional)</span><span>Units</span>'],
  ['<span>Semester</span><span>GPA / SGPA</span><span>Credit hours</span>', '<span>Term</span><span>GPA</span><span>Units</span>'],
  ['Add each subject with its credit hours and grade.', 'Add each course with its units and letter grade.'],
  ["Add each semester's GPA (SGPA) and its total credit hours.", "Add each term's GPA and its total graded units."],
  ['<label class="field-label" for="tDone">Credits completed</label>', '<label class="field-label" for="tDone">Units completed</label>'],
  ['<label class="field-label" for="tLeft">Credits remaining</label>', '<label class="field-label" for="tLeft">Units remaining</label>']
];

// Calculator messages that talk about units instead of credit hours (MIT and Stanford)
const UNITS_MSGS = {
  'GPA / SGPA': 'GPA',
  'CGPA {cgpa} on the {scale}': 'GPA {cgpa} on the {scale}',
  '1 subject · {credits} credit hours · {points} grade points': '1 course · {credits} units · {points} grade points',
  '{n} subjects · {credits} credit hours · {points} grade points': '{n} courses · {credits} units · {points} grade points',
  '1 semester · {credits} total credit hours': '1 term · {credits} total units',
  '{n} semesters · {credits} total credit hours': '{n} terms · {credits} total units',
  'Total credit hours: {credits}': 'Total units: {credits}',
  'You need an average GPA of at least {needed} over your remaining {left} credit hours to reach a {target} CGPA.': 'You need an average GPA of at least {needed} over your remaining {left} units to reach a {target} GPA.',
  'To reach a {target} CGPA (now {current}), I need an average GPA of {needed} over my remaining {left} credit hours.': 'To reach a {target} GPA (now {current}), I need an average GPA of {needed} over my remaining {left} units.',
  'Even with a perfect {max} in every remaining semester, the highest CGPA you can reach is {best}.': 'Even with a perfect {max} in every remaining term, the highest GPA you can reach is {best}.',
  'Please enter the total credit hours for this semester.': 'Please enter the total units for this term.',
  'Please enter the credit hours for this subject.': 'Please enter the units for this course.',
  'That looks too high. A semester usually has 12 to 24 credit hours.': 'That looks too high. Please check the units.',
  'That looks too high. Credit hours are usually between 1 and 6.': 'That looks too high. Please check the units.'
};

module.exports = [
  {
    slug: 'harvard-cgpa-calculator',
    country: 'USA',
    short: 'Harvard',
    name: 'Harvard CGPA & GPA Calculator',
    title: 'Harvard CGPA & GPA Calculator – FAS 4.0 Scale',
    desc: 'Free Harvard CGPA and GPA calculator using the official Harvard FAS grade points (A = 4.00, A- = 3.67, B+ = 3.33). Plan your target GPA too.',
    lead: 'Work out your Harvard College GPA with the grade points the Faculty of Arts and Sciences (FAS) uses: A = 4.00, A- = 3.67, B+ = 3.33 and so on down to E = 0.',
    guideLink: 'How Harvard GPA works',
    card: 'FAS 4.0 scale · A = 4.00, A- = 3.67',
    scaleCard: {
      title: 'Grading system: Harvard FAS (Harvard College)',
      text: 'Choose the letter grade on your record for each course. Grade points come from the Harvard FAS grade point average rules.'
    },
    config: `{
      storageKey: 'cgpa-harvard',
      creditExample: 4,
      msgs: { 'CGPA {cgpa} on the {scale}': 'GPA {cgpa} on the {scale}' },
      scales: {
        harvard: {
          max: 4, label: 'Harvard 4.0 scale', region: 'Harvard FAS · letter-graded courses', example: '3.70', modes: ['grade'],
          grades: [['A', 4], ['A-', 3.67], ['B+', 3.33], ['B', 3], ['B-', 2.67], ['C+', 2.33], ['C', 2], ['C-', 1.67],
            ['D+', 1.33], ['D', 1], ['D-', 0.67], ['E', 0], ['UNS', 0]]
        }
      },
      conversions: {
        harvard: {
          formula: 'Percentage ≈ (GPA ÷ 4) × 100',
          expr: c => '(' + c + ' ÷ 4) × 100',
          calc: c => (c / 4) * 100,
          example: 3.7,
          note: 'Harvard does not publish a GPA-to-percentage formula. Use this simple proportion only when a form asks for a percentage, and say that it is an estimate.'
        }
      }
    }`,
    modeSwitch: '',
    convScale: '',
    facts: [
      'Harvard FAS uses a <strong>4.0 scale with plus and minus grades</strong>: A = 4.00, A- = 3.67, B+ = 3.33.',
      'There is <strong>no A+</strong>. The failing grade is <strong>E</strong>, worth 0, and UNS, ABS and EXLD also count as 0.',
      'Grades from other Harvard schools or MIT only enter your GPA if they are <strong>failing grades</strong>.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How the Harvard GPA works</h2>
        <p>The Faculty of Arts and Sciences (FAS), which runs Harvard College, turns every letter grade into points on a 4-point scale. Your grade point average is the average of the grades you received in letter-graded FAS courses taken for degree credit. Courses graded Satisfactory (SAT) don't add points, but an Unsatisfactory (UNS) counts as 0.</p>
        <p>Harvard instructors set grades for their own courses, so there is no university-wide table that turns a percentage into a letter. That's why this calculator asks for the letter grade on your record.</p>
      </section>

      <section id="grade-points">
        <h2>Harvard grade points table</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Grade</th><th scope="col" class="num">Grade points</th></tr></thead>
            <tbody>
              <tr><td>A</td><td class="num">4.00</td></tr>
              <tr><td>A-</td><td class="num">3.67</td></tr>
              <tr><td>B+</td><td class="num">3.33</td></tr>
              <tr><td>B</td><td class="num">3.00</td></tr>
              <tr><td>B-</td><td class="num">2.67</td></tr>
              <tr><td>C+</td><td class="num">2.33</td></tr>
              <tr><td>C</td><td class="num">2.00</td></tr>
              <tr><td>C-</td><td class="num">1.67</td></tr>
              <tr><td>D+</td><td class="num">1.33</td></tr>
              <tr><td>D</td><td class="num">1.00</td></tr>
              <tr><td>D-</td><td class="num">0.67</td></tr>
              <tr><td>E, ABS, UNS, EXLD</td><td class="num">0.00</td></tr>
            </tbody>
          </table>
        </div>
        <p>Grades from courses at other Harvard Faculties or at MIT are not used in your FAS grade point average unless they are failing grades. FAS has also announced that, from the 2027-28 academic year, an A may be given to at most 20 percent of the undergraduates in a course, plus four.</p>
      </section>

      <section id="example">
        <h2>How to calculate your Harvard GPA: worked example</h2>
        <p>Most Harvard College courses carry the same weight (4 credits), so the GPA is a straight average of your grade points. If every course has the same credits, you can type 4 for each one.</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Course</th><th scope="col" class="num">Credits</th><th scope="col">Grade</th><th scope="col" class="num">Credits × points</th></tr></thead>
            <tbody>
              <tr><td>Expository Writing</td><td class="num">4</td><td>A-</td><td class="num">14.68</td></tr>
              <tr><td>Linear Algebra</td><td class="num">4</td><td>B+</td><td class="num">13.32</td></tr>
              <tr><td>Introduction to Computer Science</td><td class="num">4</td><td>A</td><td class="num">16.00</td></tr>
              <tr><td>Economics</td><td class="num">4</td><td>B</td><td class="num">12.00</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">16</td><td></td><td class="num">56.00</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">GPA = 56.00 ÷ 16 = 3.50</p>
      </section>

      <section id="percentage">
        <h2>Harvard GPA to percentage</h2>
        <p>Harvard does not convert GPAs into percentages, and American transcripts don't show one. If an application form outside the US insists on a percentage, the usual estimate is (GPA ÷ 4) × 100, so a 3.50 becomes 87.5%. Write "approximately" next to it and attach your transcript, because the university doesn't confirm this number.</p>
      </section>`,
    sources: [
      ['Harvard FAS: Grade Point Averages (information for faculty)', 'https://infoforfaculty.fas.harvard.edu/grade-point-averages']
    ],
    faq: [
      ['What is an A- worth at Harvard?', 'An A- is worth 3.67 grade points. An A is 4.00, a B+ is 3.33, a B is 3.00 and a B- is 2.67.'],
      ['Does Harvard give A+ grades?', 'No. In the Harvard FAS grade point average, A (4.00) is the highest grade. The failing grade is E, which is worth 0.'],
      ['Do pass/fail (SAT/UNS) courses count in my Harvard GPA?', 'Satisfactory (SAT) courses do not add any points. An Unsatisfactory (UNS) counts as 0, like an E, so it lowers your GPA.'],
      ['Do cross-registered courses at MIT count in my Harvard GPA?', 'Grades from other Harvard Faculties or from MIT are not used in your FAS grade point average, unless the grade is a failing grade.'],
      ['How do I convert my Harvard GPA to a percentage?', 'Harvard does not publish a formula. If a form needs one, the usual estimate is (GPA ÷ 4) × 100, so 3.50 is about 87.5%. Mark it as an estimate.'],
      ['What credits should I enter for each Harvard course?', 'Most Harvard College courses are 4 credits. When every course has the same credits, the GPA is simply the average of your grade points, so you can enter 4 for each course.']
    ]
  },

  {
    slug: 'mit-cgpa-calculator',
    country: 'USA',
    short: 'MIT',
    name: 'MIT CGPA & GPA Calculator',
    title: 'MIT CGPA & GPA Calculator – 5.0 Scale to 4.0 Scale',
    desc: 'MIT CGPA and GPA calculator on the official MIT 5.0 scale (A = 5, B = 4, C = 3, D = 2). Weighted by units, rounded the MIT way, with a 4.0 converter.',
    lead: 'Calculate your MIT GPA on the official 5.0 scale (A = 5, B = 4, C = 3, D = 2, F = 0), weighted by units and rounded to one decimal place like the MIT Registrar does.',
    guideLink: 'How MIT GPA works',
    card: '5.0 scale · weighted by units',
    scaleCard: {
      title: 'Grading system: MIT (5.0 scale)',
      text: 'Choose the letter grade for each subject and enter its units. Only graded subjects count; P, S, I and other symbols are left out.'
    },
    config: `{
      storageKey: 'cgpa-mit',
      creditLabel: 'Units',
      semCreditLabel: 'Units',
      creditExample: 12,
      semCreditExample: 48,
      maxCredit: 60,
      maxSemCredit: 120,
      maxTotalCredit: 1000,
      msgs: Object.assign(${JSON.stringify(UNITS_MSGS)}, {
        'Enter your CGPA to see the percentage.': 'Enter your MIT GPA to see it on the 4.0 scale.',
        'Fix the CGPA above to see the percentage.': 'Fix the GPA above to see the result.'
      }),
      scales: {
        mit: {
          max: 5, label: 'MIT 5.0 scale', region: 'MIT · weighted by units', example: '4.6', modes: ['grade'], digits: 1,
          grades: [['A', 5], ['B', 4], ['C', 3], ['D', 2], ['F', 0], ['O', 0]]
        }
      },
      conversions: {
        mit: {
          formula: 'GPA on the 4.0 scale = MIT GPA − 1 (when you have no F or O grades)',
          example: 4.6,
          note: 'Each MIT letter is worth one point more than on the usual 4.0 scale (A = 5 instead of 4), so subtracting 1 gives the same grades on a 4.0 scale. MIT does not publish an official conversion. With F or O grades, add (failed units ÷ total units).',
          result: function (c) {
            var g = Math.max(0, c - 1);
            return { pct: g / 4 * 100, ratio: g / 4, text: g.toFixed(2) + ' / 4.00',
              work: c.toFixed(2) + ' − 1 = ' + g.toFixed(2) };
          }
        }
      }
    }`,
    modeSwitch: '',
    convScale: '',
    layoutReplace: [
      ...UNITS,
      ['Percentage <small>Converter</small>', '4.0 scale <small>Converter</small>'],
      ['<h2>CGPA to percentage</h2>', '<h2>MIT GPA on the 4.0 scale</h2>'],
      ['Type your CGPA and choose its scale.', 'Type your MIT GPA (out of 5.0).'],
      ['<label class="field-label always" for="convInput">Your CGPA</label>', '<label class="field-label always" for="convInput">Your MIT GPA</label>'],
      ['<div class="result-label">Percentage</div>', '<div class="result-label">On the 4.0 scale</div>'],
      ['Convert this CGPA to % →', 'Show it on the 4.0 scale →'],
      ['Use my CGPA from the CGPA tab', 'Use my GPA from the CGPA tab']
    ],
    howto: [`
          <details class="howto">
            <summary>How is the MIT GPA calculated?</summary>
            <p class="formula-line">GPA = (Σ units × grade weight) ÷ (Σ units)</p>
            <p class="muted small">Example: a 12-unit subject with an A (5) and a 12-unit subject with a B (4) →
              (12×5 + 12×4) ÷ 24 = 108 ÷ 24 = <strong>4.5</strong></p>
          </details>`, null, null],
    facts: [
      'MIT uses a <strong>5.0 scale</strong>: A = 5, B = 4, C = 3, D = 2, F = 0 and O = 0.',
      'The GPA is weighted by <strong>units</strong> and rounded to <strong>one decimal place</strong> (4.75 becomes 4.8).',
      'A repeated subject <strong>counts each time</strong> you take it.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How MIT calculates your GPA</h2>
        <p>MIT's grade point average is on a 5.0 scale, not the usual 4.0. The Registrar weights grades as A = 5, B = 4, C = 3, D = 2, F = 0 and O = 0. To find your GPA, multiply the units of each graded subject by its weight, add everything up and divide by your total graded units. MIT rounds the result to one decimal place: if the hundredths digit is 5 or more, the tenths digit goes up, so 4.75 becomes 4.8. This calculator shows your result the same way.</p>
        <p>Three MIT units are equal to one semester hour, so a typical 12-unit subject is like a 4-credit course elsewhere. Type the units shown for each subject.</p>
      </section>

      <section id="grade-points">
        <h2>What counts in your MIT GPA</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Grade</th><th scope="col" class="num">Weight</th></tr></thead>
            <tbody>
              <tr><td>A</td><td class="num">5</td></tr>
              <tr><td>B</td><td class="num">4</td></tr>
              <tr><td>C</td><td class="num">3</td></tr>
              <tr><td>D</td><td class="num">2</td></tr>
              <tr><td>F</td><td class="num">0</td></tr>
              <tr><td>O</td><td class="num">0</td></tr>
            </tbody>
          </table>
        </div>
        <p>These are left out of the calculation: subjects graded P, S, URN, SA or T; incomplete or unfinished subjects (I, OX, J, U); grades from Advanced Standing Exams; and ROTC subjects. Because P grades don't count, first-year students don't have a GPA until the spring term ends.</p>
        <p>If you repeat a subject, it counts in your GPA each time you take it. Your cumulative GPA appears on your transcript, while the term GPA is shown on your grade report.</p>
      </section>

      <section id="example">
        <h2>How to calculate your MIT GPA: worked example</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Subject</th><th scope="col" class="num">Units</th><th scope="col">Grade</th><th scope="col" class="num">Units × weight</th></tr></thead>
            <tbody>
              <tr><td>Calculus II</td><td class="num">12</td><td>A</td><td class="num">60</td></tr>
              <tr><td>Physics II</td><td class="num">12</td><td>B</td><td class="num">48</td></tr>
              <tr><td>Introduction to Programming</td><td class="num">12</td><td>A</td><td class="num">60</td></tr>
              <tr><td>Writing seminar</td><td class="num">12</td><td>B</td><td class="num">48</td></tr>
              <tr><td>Lab elective</td><td class="num">6</td><td>C</td><td class="num">18</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">54</td><td></td><td class="num">234</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">GPA = 234 ÷ 54 = 4.333… → 4.3</p>
      </section>

      <section id="percentage">
        <h2>MIT GPA on a 4.0 scale</h2>
        <p>Applications outside MIT often ask for a GPA "out of 4.0". MIT doesn't publish an official conversion, but the letters line up neatly: an A is 5 at MIT and 4 on the usual scale, a B is 4 instead of 3, and so on. As long as you have no F or O grades, your GPA on the 4.0 scale is simply your MIT GPA minus 1, so 4.6 becomes 3.6. If you do have F or O grades, add (failed units ÷ total graded units) to that number. The converter tab does the simple version for you.</p>
        <p>Multiplying by 0.8, a rule of thumb you may see online, gives a different answer (4.6 × 0.8 = 3.68), because it stretches the scale instead of shifting each letter.</p>
      </section>`,
    sources: [
      ['MIT Registrar: Calculating your GPA', 'https://registrar.mit.edu/classes-grades-evaluations/grades/calculating-gpa']
    ],
    faq: [
      ['Is MIT GPA out of 5 or 4?', 'Out of 5. MIT weights grades as A = 5, B = 4, C = 3, D = 2, F = 0 and O = 0, so a perfect MIT GPA is 5.0.'],
      ['How do I convert my MIT GPA to a 4.0 scale?', 'MIT has no official conversion. If you have no F or O grades, subtract 1, because each MIT letter is worth exactly one point more than on a 4.0 scale. So 4.6 at MIT is 3.6 out of 4.0.'],
      ['How does MIT round the GPA?', 'To one decimal place. If the hundredths digit is 5 or more, the tenths digit rounds up, so 4.75 becomes 4.8.'],
      ['Do P/NR first-year grades count in the MIT GPA?', 'No. P grades are not used in the GPA, so first-year students do not have a GPA until the spring term ends.'],
      ['Does a repeated subject count twice at MIT?', 'Yes. A repeated subject counts in your GPA each time you take it.'],
      ['What units should I enter?', 'Enter the units listed for each subject, for example 12 for a standard subject or 6 for a half-term subject. Three MIT units equal one semester hour.']
    ]
  },

  {
    slug: 'stanford-cgpa-calculator',
    country: 'USA',
    short: 'Stanford',
    name: 'Stanford CGPA & GPA Calculator',
    title: 'Stanford CGPA & GPA Calculator – 4.3 Scale (A+ = 4.3)',
    desc: 'Stanford CGPA and GPA calculator with the official 4.3 scale (A+ = 4.3, A = 4.0, A- = 3.7). Weighted by units, NP counted, plus target GPA.',
    lead: 'Calculate your Stanford GPA with the official 4.3 scale, where an A+ is worth 4.3. Grades are weighted by units, just like on your Stanford transcript.',
    guideLink: 'How Stanford GPA works',
    card: '4.3 scale · A+ = 4.3',
    scaleCard: {
      title: 'Grading system: Stanford (4.3 scale)',
      text: 'Choose the letter grade for each course and enter its units. CR, S, W and other symbols are not part of the GPA.'
    },
    config: `{
      storageKey: 'cgpa-stanford',
      creditLabel: 'Units',
      semCreditLabel: 'Units',
      creditExample: 4,
      semCreditExample: 15,
      msgs: ${JSON.stringify(UNITS_MSGS)},
      scales: {
        stanford: {
          max: 4.3, label: 'Stanford 4.3 scale', region: 'Stanford · weighted by units', example: '3.80', modes: ['grade'],
          grades: [['A+', 4.3], ['A', 4], ['A-', 3.7], ['B+', 3.3], ['B', 3], ['B-', 2.7], ['C+', 2.3], ['C', 2], ['C-', 1.7],
            ['D+', 1.3], ['D', 1], ['D-', 0.7], ['NP', 0]]
        }
      },
      conversions: {
        stanford: {
          formula: 'Percentage ≈ (GPA ÷ 4.3) × 100',
          expr: c => '(' + c + ' ÷ 4.3) × 100',
          calc: c => (c / 4.3) * 100,
          example: 3.8,
          note: 'Stanford does not publish a GPA-to-percentage formula. This simple proportion uses the 4.3 maximum; mark it as an estimate on any form.'
        }
      }
    }`,
    modeSwitch: '',
    convScale: '',
    layoutReplace: UNITS,
    facts: [
      'Stanford uses a <strong>4.3 scale</strong>: an <strong>A+ is worth 4.3</strong>, an A is 4.0 and an A- is 3.7.',
      'An <strong>NP counts as 0.0</strong> and its units stay in the total, so it pulls your GPA down.',
      'A temporary <strong>L grade counts as 2.0</strong> until the final grade is in.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How Stanford calculates your GPA</h2>
        <p>Stanford gives grade points only to letter grades, and it uses a 4.3 scale. Each course's grade points are multiplied by its units, so a 5-unit A is worth 20 grade points. Your GPA is the total of those grade points divided by the total units of all courses graded A+ through NP.</p>
        <p>No other grades or symbols are used in the GPA: +, CR, *, GNR, RP, N, N-, W, NC, S and I are all left out. An NP, on the other hand, is worth 0.0 and its units still count, so an A (4 units) and an NP (4 units) give a GPA of 2.0, not 4.0.</p>
      </section>

      <section id="grade-points">
        <h2>Stanford grade points table</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Grade</th><th scope="col" class="num">Grade points</th></tr></thead>
            <tbody>
              <tr><td>A+</td><td class="num">4.3</td></tr>
              <tr><td>A</td><td class="num">4.0</td></tr>
              <tr><td>A-</td><td class="num">3.7</td></tr>
              <tr><td>B+</td><td class="num">3.3</td></tr>
              <tr><td>B</td><td class="num">3.0</td></tr>
              <tr><td>B-</td><td class="num">2.7</td></tr>
              <tr><td>C+</td><td class="num">2.3</td></tr>
              <tr><td>C</td><td class="num">2.0</td></tr>
              <tr><td>C-</td><td class="num">1.7</td></tr>
              <tr><td>D+</td><td class="num">1.3</td></tr>
              <tr><td>D</td><td class="num">1.0</td></tr>
              <tr><td>D-</td><td class="num">0.7</td></tr>
              <tr><td>NP</td><td class="num">0.0</td></tr>
            </tbody>
          </table>
        </div>
        <p>A temporary L grade counts as 2.0 until the final grade is submitted. Courses with a GSB grading basis use their own values (for example H = 4.14).</p>
      </section>

      <section id="example">
        <h2>How to calculate your Stanford GPA: worked example</h2>
        <p>This is the example from Stanford's own guide:</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Grade</th><th scope="col" class="num">Units</th><th scope="col" class="num">Grade points</th><th scope="col" class="num">Units × points</th></tr></thead>
            <tbody>
              <tr><td>B-</td><td class="num">3</td><td class="num">2.7</td><td class="num">8.1</td></tr>
              <tr><td>A-</td><td class="num">4</td><td class="num">3.7</td><td class="num">14.8</td></tr>
              <tr><td>B+</td><td class="num">3</td><td class="num">3.3</td><td class="num">9.9</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">10</td><td></td><td class="num">32.8</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">GPA = 32.8 ÷ 10 = 3.28</p>
      </section>

      <section id="percentage">
        <h2>Can a Stanford GPA be above 4.0?</h2>
        <p>Yes. Because an A+ is worth 4.3, a student with many A+ grades can have a GPA above 4.0. If a form asks for a GPA "out of 4.0", give your GPA as it appears on your transcript and mention that Stanford uses a 4.3 scale. Stanford does not publish a percentage formula; the converter tab gives a simple estimate, (GPA ÷ 4.3) × 100.</p>
      </section>`,
    sources: [
      ['Stanford Student Services: How do I calculate my grade point average (GPA)?', 'https://studentservices.stanford.edu/my-academics/evaluations-exams-grades/grades/how-do-i-calculate-my-grade-point-average-gpa']
    ],
    faq: [
      ['Is an A+ worth 4.3 at Stanford?', 'Yes. Stanford uses a 4.3 scale: A+ = 4.3, A = 4.0, A- = 3.7, B+ = 3.3 and so on down to D- = 0.7 and NP = 0.0.'],
      ['Does an NP count in my Stanford GPA?', 'Yes. NP is worth 0.0 grade points and its units stay in the total, so it lowers your GPA. An A in 4 units plus an NP in 4 units gives 2.0.'],
      ['Do CR/NC courses count in the Stanford GPA?', 'No. CR, NC, S, W, I and the other symbols are not used in calculating the GPA.'],
      ['What is an L grade at Stanford?', 'An L is a temporary grade. It counts as 2.0 grade points until the final grade is submitted.'],
      ['Can my Stanford GPA be higher than 4.0?', 'Yes, because an A+ is worth 4.3. When a form asks for a GPA out of 4.0, give your transcript GPA and note that Stanford uses a 4.3 scale.'],
      ['How do I convert my Stanford GPA to a percentage?', 'Stanford has no official formula. A simple estimate is (GPA ÷ 4.3) × 100, so 3.80 is about 88.37%. Mark it as an estimate.']
    ]
  }
];
