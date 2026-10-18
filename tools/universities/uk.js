/* UK university pages for tools/build-university-pages.js (same fields as the entries in that file).
   UK degrees use marks out of 100 and degree classes instead of GPA, so these pages reword the calculator. */

// Calculator messages reworded for marks and degree classes
const UK_MSGS = {
  'Add your subjects to see your GPA.': 'Add your modules to see your average mark.',
  'Add your semesters to see your CGPA.': 'Add your years to see your degree mark.',
  'Fill in the four boxes above to see the GPA you need.': 'Fill in the four boxes above to see the mark you need.',
  'Fill in all four boxes to see the GPA you need.': 'Fill in all four boxes to see the mark you need.',
  'Enter your CGPA to see the percentage.': 'Enter your average mark to see your degree class.',
  'Fix the CGPA above to see the percentage.': 'Fix the mark above to see your degree class.',
  'Please enter the GPA for this semester.': 'Please enter the average mark for this year.',
  'Please enter the total credit hours for this semester.': 'Please enter the weight for this year.',
  'GPA / SGPA': 'Average mark',
  'Subject name (optional)': 'Module or paper (optional)',
  'e.g. Calculus': 'e.g. Algorithms',
  'GPA should be a number, like {x}.': 'The mark should be a number, like {x}.',
  'GPA can’t be negative.': 'A mark can’t be negative.',
  'GPA can’t be more than {max} on the {scale}.': 'A mark can’t be more than 100.',
  'CGPA can’t be negative.': 'A mark can’t be negative.',
  'On the {scale}, CGPA can’t be more than {max}. Try a different scale.': 'A mark can’t be more than 100.',
  'Please type your CGPA as a number, like {x}.': 'Please type your mark as a number, like {x}.',
  'Calculate your CGPA in the CGPA tab first 🙂': 'Work out your degree mark in the Degree tab first 🙂',
  'Add at least one complete subject first 🙂': 'Add at least one complete module first 🙂',
  'Add at least one complete semester first 🙂': 'Add at least one complete year first 🙂',
  'Semester {n}: GPA {gpa}, {credits} credits': 'Year {n}: average mark {gpa}, weight {credits}',
  'My semester GPA: {gpa} ({scale})': 'My average mark: {gpa} ({scale})',
  'My CGPA: {cgpa} ({scale})': 'My degree mark: {cgpa} ({scale})',
  'Total credit hours: {credits}': 'Total credits: {credits}',
  '1 subject · {credits} credits': '1 module · {credits} credits',
  '{n} subjects · {credits} credits': '{n} modules · {credits} credits',
  '1 semester · {credits} total credit hours': '1 year · total weight {credits}',
  '{n} semesters · {credits} total credit hours': '{n} years · total weight {credits}',
  'You need an average GPA of at least {needed} over your remaining {left} credit hours to reach a {target} CGPA.': 'You need an average mark of at least {needed} over your remaining {left} credits to reach {target}.',
  'Even with a perfect {max} in every remaining semester, the highest CGPA you can reach is {best}.': 'Even with 100 in every remaining module, the highest average you can reach is {best}.',
  'To reach a {target} CGPA (now {current}), I need an average GPA of {needed} over my remaining {left} credit hours.': 'To reach {target} (now {current}), I need an average mark of {needed} over my remaining {left} credits.',
  'To reach a {target} CGPA I would need {needed}, which is above the {max} maximum. The best I can reach is {best}.': 'To reach {target} I would need {needed}, which is above 100. The best I can reach is {best}.',
  'I have already secured a {target} CGPA.': 'I have already secured an average of {target}.',
  'Your CGPA will stay at or above {target} no matter what. Aim high anyway!': 'Your average will stay at or above {target} no matter what. Aim high anyway!'
};

// Shared calculator settings for marks out of 100 (the scale itself is added per university)
/* i18n */
const ukConfig = (key, storageKey, extra) => `{
      storageKey: '${storageKey}',
      creditLabel: 'Credits',
      creditExample: 15,
      maxCredit: 120,
      maxSemCredit: 240,
      maxTotalCredit: 720,
      periodLabel: 'Year {n}',
      msgs: ${JSON.stringify(UK_MSGS)},
      ${extra}
    }`;
/* /i18n */

// Page wording: marks, years and degree classes instead of GPA, semesters and percentages
const ukLayout = (yearText, weightHead) => [
  ['GPA <small>One semester</small>', 'Average <small>Modules</small>'],
  ['CGPA <small>All semesters</small>', 'Degree <small>All years</small>'],
  ['Percentage <small>Converter</small>', 'Class <small>Checker</small>'],
  ['<h2>Semester GPA</h2>', '<h2>Average mark</h2>'],
  ['Add each subject with its credit hours and grade.', 'Add each module with its credits and its mark out of 100.'],
  ['<span>Subject (optional)</span><span>Credits</span>', '<span>Module (optional)</span><span>Credits</span>'],
  ['Your semester GPA', 'Your average mark'],
  ['Add this GPA to my CGPA →', 'Add this average to my degree mark →'],
  ['<h2>Overall CGPA</h2>', '<h2>Degree mark</h2>'],
  ["Add each semester's GPA (SGPA) and its total credit hours.", yearText],
  ['<span>Semester</span><span>GPA / SGPA</span><span>Credit hours</span>', `<span>Year</span><span>Average mark</span><span>${weightHead}</span>`],
  ['            Add semester\n', '            Add year\n'],
  ['            Add subject\n', '            Add module\n'],
  ['<div class="result-label">Your CGPA</div>', '<div class="result-label">Your degree mark</div>'],
  ['Convert this CGPA to % →', 'Check my degree class →'],
  ['<h2>Target CGPA</h2>', '<h2>Target degree mark</h2>'],
  ['Find out what GPA you need in your coming semesters to reach your goal.', 'Find out what average mark you need in your remaining modules to reach the class you want.'],
  ['<label class="field-label" for="tCurrent">Current CGPA</label>', '<label class="field-label" for="tCurrent">Current average mark</label>'],
  ['<label class="field-label" for="tTarget">Target CGPA</label>', '<label class="field-label" for="tTarget">Target mark (70 = First)</label>'],
  ['GPA you need each semester', 'Average mark you need from now on'],
  ['<h2>CGPA to percentage</h2>', '<h2>Degree class from your mark</h2>'],
  ['Type your CGPA and choose its scale.', 'Type your final average mark out of 100.'],
  ['<label class="field-label always" for="convInput">Your CGPA</label>', '<label class="field-label always" for="convInput">Your average mark</label>'],
  ['<div class="result-label">Percentage</div>', '<div class="result-label">Degree class</div>'],
  ['Use my CGPA from the CGPA tab', 'Use my mark from the Degree tab'],
  ['<th scope="col" class="num">Points</th>', '<th scope="col" class="num">Marks</th>']
];

const ukHowto = (gpaExample, degreeFormula, degreeExample) => [`
          <details class="howto">
            <summary>How is the average mark calculated?</summary>
            <p class="formula-line">Average = (Σ credits × mark) ÷ (Σ credits)</p>
            <p class="muted small">${gpaExample}</p>
          </details>`, `
          <details class="howto">
            <summary>How is the degree mark calculated?</summary>
            <p class="formula-line">${degreeFormula}</p>
            <p class="muted small">${degreeExample}</p>
          </details>`, `
          <details class="howto">
            <summary>How is this calculated?</summary>
            <p class="formula-line">Mark needed = (Target × total credits − Current × completed credits) ÷ remaining credits</p>
            <p class="muted small">Example: an average of 64 over 120 credits so far, a target of 70 and 120 credits left →
              (70 × 240 − 64 × 120) ÷ 120 = <strong>76</strong></p>
          </details>`];

// Meter and friendly messages: a First (70+) is an outstanding result in the UK
const UK_RATIO = '[[0, 0], [40, 0.55], [50, 0.65], [60, 0.78], [70, 0.9], [100, 1]]';

module.exports = [
  {
    slug: 'oxford-cgpa-calculator',
    country: 'UK',
    short: 'Oxford',
    name: 'Oxford CGPA & GPA Calculator',
    title: 'Oxford CGPA & GPA Calculator – USM Marks & Degree Class',
    desc: 'Oxford CGPA and GPA calculator for University Standardised Marks (USMs): work out your weighted average mark and see your degree class.',
    lead: 'Oxford marks every paper with a University Standardised Mark (USM) out of 100. Work out your weighted average USM and see which degree class it points to.',
    guideLink: 'How Oxford classification works',
    card: 'USMs out of 100 · First = 70+',
    scaleCard: {
      title: 'Marking system: Oxford USMs (0–100)',
      text: 'Enter the USM for each paper and the weight your examination conventions give it. Equal weights are fine if your papers count the same.'
    },
    config: ukConfig('oxford', 'cgpa-oxford', `
      creditLabel: 'Weight',
      creditExample: 14,
      scales: {
        oxford: {
          max: 100, label: 'Oxford USM scale', region: 'University Standardised Marks', example: '68', modes: ['points'],
          pointsLabel: 'USM (out of 100)', maxText: '/ 100', gradeDigits: 0, noQualityPoints: true, ratioPoints: ${UK_RATIO},
          subtitle: 'Each paper gets a USM from 0 to 100',
          grades: [['First Class', 100, null, 70], ['2:1', 69, null, 60], ['2:2', 59, null, 50], ['Third Class', 49, null, 40], ['Pass', 39, null, 30], ['Fail', 29, null, 0]]
        }
      },
      conversions: {
        oxford: {
          formula: 'Average USM, rounded to the nearest whole number (halves round up) → degree class',
          example: 69.5, max: 100, label: 'Oxford USM scale',
          note: 'This follows the Computer Science examination conventions: the average USM is rounded to the nearest integer before classifying. Your course’s own conventions may add further rules, for example about the number of papers in each class.',
          result: function (c) {
            var t = window.CGPA_T;
            var r = Math.floor(c + 0.5 + 1e-9);
            var cls = r >= 70 ? 'First Class' : r >= 60 ? 'Upper Second (2:1)' : r >= 50 ? 'Lower Second (2:2)' : r >= 40 ? 'Third Class' : r >= 30 ? 'Pass' : 'Fail';
            return { pct: c, ratio: Math.min(1, r / 78), text: t(cls),
              work: t('Average {mark} → rounded to {round} → {cls}', { mark: c.toFixed(2), round: r, cls: t(cls) }),
              sub: t('Average mark {mark} out of 100', { mark: c.toFixed(2) }) };
          }
        }
      }`),
    modeSwitch: '',
    convScale: '',
    layoutReplace: [
      ...ukLayout("Add each year's or part's average USM and its weight.", 'Weight'),
      ['<span>Module (optional)</span><span>Credits</span>', '<span>Paper (optional)</span><span>Weight</span>']
    ],
    howto: ukHowto(
      'Example: a core paper with weight 10 and USM 72, and an option with weight 14 and USM 65 → (10×72 + 14×65) ÷ 24 = 1630 ÷ 24 = <strong>67.92</strong>',
      'Degree mark = (Σ average × weight) ÷ (Σ weights)',
      'Example: Part A average 66 with weight 18 and Part B average 71 with weight 82 → (66×18 + 71×82) ÷ 100 = <strong>70.10</strong>'),
    facts: [
      'Every paper gets a <strong>USM out of 100</strong>: <strong>70+ is First Class</strong>, 60–69 a 2:1 and 50–59 a 2:2.',
      'Your class comes from a <strong>weighted average</strong> set by your course’s <strong>examination conventions</strong>.',
      'In the Computer Science conventions the average USM is <strong>rounded to the nearest whole number</strong>, halves up.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How Oxford marks and classifies degrees</h2>
        <p>Oxford examiners report each paper on a 0–100 scale called the University Standardised Mark (USM). The bands are the same across subjects: 70–100 is First Class, 60–69 Upper Second, 50–59 Lower Second, 40–49 Third, 30–39 Pass and 0–29 Fail.</p>
        <p>How the USMs are combined is set by each course's <em>examination conventions</em>, published every year by the department. Most courses use a weighted average, but the weights, the papers that count and any extra rules (for example a minimum number of papers in the First Class band) differ from course to course. Always check the conventions for your course and year.</p>
      </section>

      <section id="grade-points">
        <h2>Oxford USM bands</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">USM</th><th scope="col">Class</th></tr></thead>
            <tbody>
              <tr><td>70–100</td><td>First Class</td></tr>
              <tr><td>60–69</td><td>Upper Second (2:1)</td></tr>
              <tr><td>50–59</td><td>Lower Second (2:2)</td></tr>
              <tr><td>40–49</td><td>Third Class</td></tr>
              <tr><td>30–39</td><td>Pass</td></tr>
              <tr><td>0–29</td><td>Fail</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="example">
        <h2>Example: Computer Science weights</h2>
        <p>The Computer Science conventions give each paper a weight: 10 for each core course, 14 for each option and 42 for the Part B project, a total of 222. The weighted average is every USM multiplied by its weight, added up and divided by 222. That works out at about 18% for second-year exams and 82% for third-year exams. The average USM is then rounded to the nearest integer, with exact halves rounded up, so 69.5 becomes 70.</p>
        <p>To use the calculator, enter each paper's USM and its weight in the Average tab. If all your papers count the same, give every paper a weight of 1.</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Paper</th><th scope="col" class="num">Weight</th><th scope="col" class="num">USM</th><th scope="col" class="num">Weight × USM</th></tr></thead>
            <tbody>
              <tr><td>Core paper 1</td><td class="num">10</td><td class="num">72</td><td class="num">720</td></tr>
              <tr><td>Core paper 2</td><td class="num">10</td><td class="num">66</td><td class="num">660</td></tr>
              <tr><td>Option 1</td><td class="num">14</td><td class="num">70</td><td class="num">980</td></tr>
              <tr><td>Option 2</td><td class="num">14</td><td class="num">68</td><td class="num">952</td></tr>
              <tr><td>Project</td><td class="num">42</td><td class="num">73</td><td class="num">3066</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">90</td><td></td><td class="num">6378</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">Average USM = 6378 ÷ 90 = 70.87 → 71, First Class</p>
      </section>

      <section id="gpa">
        <h2>Oxford marks and GPA</h2>
        <p>Oxford doesn't calculate a GPA, and its transcripts show USMs and your class. If a university or employer abroad asks for a GPA, send your transcript and let them convert it, or use the conversion table they publish. There is no official Oxford formula for turning USMs into a 4.0 GPA.</p>
      </section>`,
    sources: [
      ['University of Oxford, Department of Computer Science: Examination Conventions, Parts A and B (2020)', 'https://www.cs.ox.ac.uk/files/11322/Conventions%20Parts%20A%20and%20B%202020.pdf']
    ],
    faq: [
      ['What USM do I need for a First at Oxford?', 'A USM of 70 or more is in the First Class band. Whether you get a First overall depends on your course’s examination conventions, which say how your paper marks are combined.'],
      ['What is a USM?', 'A University Standardised Mark, the 0–100 mark Oxford examiners give each paper. 70–100 is First Class, 60–69 Upper Second, 50–59 Lower Second, 40–49 Third, 30–39 Pass and below 30 Fail.'],
      ['Does Oxford round the average USM?', 'In the Computer Science conventions, the average USM is rounded to the nearest integer, with exact halves rounded up, so 69.5 becomes 70. Check the rounding rule in your own course’s conventions.'],
      ['Do first-year exams count towards an Oxford degree class?', 'For most courses, the class is based on the later exams (for example Parts A and B in Computer Science, about 18% and 82%). Your examination conventions list exactly which papers count.'],
      ['How do I convert Oxford marks to a GPA?', 'Oxford has no official USM-to-GPA formula. Send your transcript and let the university or employer convert it with their own table.'],
      ['What weights should I enter in the calculator?', 'Use the weights from your examination conventions, for example 10 for each core paper, 14 for each option and 42 for the project in Computer Science. If your papers count equally, enter 1 for each.']
    ]
  },

  {
    slug: 'edinburgh-cgpa-calculator',
    country: 'UK',
    short: 'Edinburgh',
    name: 'Edinburgh CGPA & GPA Calculator',
    title: 'Edinburgh CGPA & GPA Calculator – Honours Classification',
    desc: 'University of Edinburgh CGPA and GPA calculator: credit-weighted Honours average, Common Marking Scheme grades A1 to H and your degree class.',
    lead: 'Work out your credit-weighted Honours average with the University of Edinburgh Common Marking Scheme, and see which degree class and grade band it falls in.',
    guideLink: 'How Edinburgh classification works',
    card: 'Common Marking Scheme · Honours years',
    scaleCard: {
      title: 'Marking system: Edinburgh Common Marking Scheme',
      text: 'Enter the final mark (out of 100) and the credits of each Honours course. The degree class comes from the credit-weighted mean of these marks.'
    },
    config: ukConfig('edinburgh', 'cgpa-edinburgh', `
      semCreditLabel: 'Credits',
      semCreditExample: 120,
      creditExample: 20,
      periodStart: 3,
      scales: {
        edinburgh: {
          max: 100, label: 'Edinburgh Common Marking Scheme', region: 'Undergraduate Honours (CMS1)', example: '64', modes: ['points'],
          pointsLabel: 'Mark (out of 100)', maxText: '/ 100', gradeDigits: 0, noQualityPoints: true, ratioPoints: ${UK_RATIO},
          subtitle: 'Undergraduate Common Marking Scheme (CMS1)',
          grades: [['A1', 100, null, 90], ['A2', 89, null, 80], ['A3', 79, null, 70], ['B', 69, null, 60], ['C', 59, null, 50],
            ['D', 49, null, 40], ['E', 39, null, 30], ['F', 29, null, 20], ['G', 19, null, 10], ['H', 9, null, 0]]
        }
      },
      conversions: {
        edinburgh: {
          formula: 'Credit-weighted mean of Honours course marks (not rounded) → Honours class',
          example: 68.4, max: 100, label: 'Edinburgh Common Marking Scheme',
          note: 'Under the Taught Assessment Regulations the overall mean is not rounded. Marks from 2 percentage points below a class boundary up to the boundary (for example 68.00–69.99) are borderline, and the Board of Examiners must consider them.',
          result: function (c) {
            var t = window.CGPA_T;
            var cls = c >= 70 ? 'First Class' : c >= 60 ? 'Upper Second (2:1)' : c >= 50 ? 'Lower Second (2:2)' : c >= 40 ? 'Third Class' : 'Fail';
            var next = c >= 70 ? null : c >= 60 ? 70 : c >= 50 ? 60 : c >= 40 ? 50 : 40;
            var border = next !== null && c >= next - 2;
            return { pct: c, ratio: Math.min(1, c / 78), text: t(cls),
              work: border ? t('{mark} is borderline: within 2 points of {next}, so the Board of Examiners must consider it', { mark: c.toFixed(2), next: next })
                : t('Mean {mark} → {cls}', { mark: c.toFixed(2), cls: t(cls) }),
              sub: t('Average mark {mark} out of 100', { mark: c.toFixed(2) }) };
          }
        }
      }`),
    modeSwitch: '',
    convScale: '',
    layoutReplace: ukLayout("Add each Honours year's average mark and its credits (usually 120).", 'Credits'),
    howto: ukHowto(
      'Example: a 20-credit course with 68 and a 40-credit dissertation with 72 → (20×68 + 40×72) ÷ 60 = 4240 ÷ 60 = <strong>70.67</strong>',
      'Degree mark = (Σ year average × year credits) ÷ (Σ credits)',
      'Example: Junior Honours 65 over 120 credits and Senior Honours 71 over 120 credits → (65×120 + 71×120) ÷ 240 = <strong>68.00</strong>'),
    facts: [
      'Most degrees are classified on the <strong>3rd and 4th (Honours) years</strong>; years 1 and 2 don’t count.',
      'Courses are weighted by <strong>credits</strong>, and the overall mean is <strong>not rounded</strong>.',
      'A mark within <strong>2 points below a boundary</strong> (e.g. 68.00–69.99) is <strong>borderline</strong> and must be considered.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How Edinburgh classifies Honours degrees</h2>
        <p>The University of Edinburgh classifies most undergraduate Honours degrees on the average mark of all courses taken in the third and fourth years, the Honours years, weighted by each course's credits. Every 10 credits count the same, so a 40-credit dissertation weighs four times as much as a 10-credit course. The first two years don't count towards your class, so you can take a broad range of courses there without it affecting your degree result.</p>
        <p>There are exceptions. BSc Honours degrees in the School of Biological Sciences, the Deanery of Biomedical Sciences and Chemistry weight Senior to Junior Honours 2:1. Integrated Masters degrees use their three Honours years weighted 20, 40 and 40. For degrees with optional study abroad in third year, only the final year counts.</p>
      </section>

      <section id="grade-points">
        <h2>Edinburgh Common Marking Scheme (undergraduate)</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Mark %</th><th scope="col">Grade</th><th scope="col">Honours class</th><th scope="col">Description</th></tr></thead>
            <tbody>
              <tr><td>90–100</td><td>A1</td><td>1st</td><td>Excellent</td></tr>
              <tr><td>80–89</td><td>A2</td><td>1st</td><td>Excellent</td></tr>
              <tr><td>70–79</td><td>A3</td><td>1st</td><td>Excellent</td></tr>
              <tr><td>60–69</td><td>B</td><td>2.1</td><td>Very good</td></tr>
              <tr><td>50–59</td><td>C</td><td>2.2</td><td>Good</td></tr>
              <tr><td>40–49</td><td>D</td><td>3rd</td><td>Pass</td></tr>
              <tr><td>30–39</td><td>E</td><td>Fail</td><td>Marginal fail</td></tr>
              <tr><td>20–29</td><td>F</td><td>Fail</td><td>Clear fail</td></tr>
              <tr><td>10–19</td><td>G</td><td>Fail</td><td>Bad fail</td></tr>
              <tr><td>0–9</td><td>H</td><td>Fail</td><td>Bad fail</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="example">
        <h2>Rounding and borderlines</h2>
        <p>Each final course mark is rounded to a whole number before it is released: 59.50 becomes 60 and 59.49 becomes 59. Those rounded course marks are used to work out your overall mean, and the overall mean itself is <strong>not</strong> rounded. So a mean of 69.90 is not a First on its own.</p>
        <p>However, the regulations define borderline marks as those from two percentage points below a class boundary up to the boundary, for example 68.00% to 69.99% for a First or 58.00% to 59.99% for a 2:1. The Board of Examiners must consider every borderline student, using factors it has published in advance, such as better performance in higher-level courses.</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Honours course</th><th scope="col" class="num">Credits</th><th scope="col" class="num">Mark</th><th scope="col" class="num">Credits × mark</th></tr></thead>
            <tbody>
              <tr><td>Junior Honours courses</td><td class="num">120</td><td class="num">66</td><td class="num">7920</td></tr>
              <tr><td>Senior Honours courses</td><td class="num">80</td><td class="num">70</td><td class="num">5600</td></tr>
              <tr><td>Dissertation</td><td class="num">40</td><td class="num">73</td><td class="num">2920</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">240</td><td></td><td class="num">16440</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">Mean = 16440 ÷ 240 = 68.50 → 2:1, borderline for a First</p>
      </section>

      <section id="gpa">
        <h2>Edinburgh marks and GPA</h2>
        <p>Edinburgh doesn't use a GPA. If you apply abroad, send your transcript with your marks and class; the receiving university or employer will convert them with its own rules.</p>
      </section>`,
    sources: [
      ['University of Edinburgh: Taught Assessment Regulations 2024/25 (regulations 44, 55 and 63)', 'https://registryservices.ed.ac.uk/sites/default/files/2025-09/2024/25%20Taught%20Assessment%20Regulations.pdf'],
      ['University of Edinburgh: Common Marking Schemes', 'https://www.ed.ac.uk/timetabling-examinations/exams/regulations/common-marking-scheme'],
      ['University of Edinburgh Academic Services: Degree classification', 'https://registryservices.ed.ac.uk/academic-services/staff/assessment/degree-classification']
    ],
    faq: [
      ['Which years count towards an Edinburgh Honours degree?', 'For most degrees, the third and fourth years (the Honours years). Courses are weighted by credits. Some programmes differ, for example Integrated Masters weight their three Honours years 20, 40 and 40.'],
      ['What mark is a First at Edinburgh?', 'An overall mean of 70 or more. Grades A1 (90–100), A2 (80–89) and A3 (70–79) are all in the First Class band.'],
      ['Does Edinburgh round the final average?', 'No. Course marks are rounded to whole numbers before they are released, but the overall mean used for your class is not rounded.'],
      ['What is a borderline mark at Edinburgh?', 'A mark from two percentage points below a class boundary up to the boundary, such as 68.00% to 69.99% for a First. The Board of Examiners must consider these cases.'],
      ['What does a B grade mean at Edinburgh?', 'A B is a mark of 60–69, described as very good, and is in the Upper Second (2:1) band.'],
      ['Does Edinburgh have a GPA?', 'No. Edinburgh uses marks out of 100 and Honours classes. A university or employer abroad will convert your transcript with its own rules.']
    ]
  },

  {
    slug: 'kcl-cgpa-calculator',
    country: 'UK',
    short: 'KCL',
    name: "King's College London CGPA & GPA Calculator",
    title: "KCL CGPA & GPA Calculator – King's 0:2:3 Classification",
    desc: "King's College London CGPA and GPA calculator: module averages, the official 0:2:3 year weighting, rounding to a whole mark and your degree class.",
    lead: "Work out your King's College London classification score with the official award algorithm: marks weighted by credits and by year (0:2:3 for a three-year degree), then rounded to a whole number.",
    guideLink: "How King's classification works",
    card: '0:2:3 year weighting · rounded score',
    scaleCard: {
      title: "Marking system: King's College London (0–100)",
      text: 'Enter each module mark (rounded to a whole number) with its credits. Then combine your year averages with the weights 2 and 3.'
    },
    config: ukConfig('kcl', 'cgpa-kcl', `
      semCreditLabel: 'Weight',
      semCreditExample: 3,
      periodStart: 2,
      scales: {
        kcl: {
          max: 100, label: 'King’s marks', region: 'Undergraduate degrees', example: '65', modes: ['points'],
          pointsLabel: 'Mark (out of 100)', maxText: '/ 100', gradeDigits: 0, noQualityPoints: true, ratioPoints: ${UK_RATIO},
          subtitle: 'Classification bands for honours degrees',
          grades: [['First Class', 100, null, 70], ['2:1', 69, null, 60], ['2:2', 59, null, 50], ['Third Class', 49, null, 40], ['Fail', 39, null, 0]]
        }
      },
      conversions: {
        kcl: {
          formula: 'Classification score rounded to a whole number (0.5 rounds up) → degree class',
          example: 69.5, max: 100, label: 'King’s marks',
          note: 'King’s rounds the final classification score to the nearest whole number before classifying, so 69.5 becomes 70, a First. The regulations say boundaries cannot be lowered.',
          result: function (c) {
            var t = window.CGPA_T;
            var r = Math.floor(c + 0.5 + 1e-9);
            var cls = r >= 70 ? 'First-Class Honours' : r >= 60 ? 'Upper Second-Class Honours (2:1)' : r >= 50 ? 'Lower Second-Class Honours (2:2)' : r >= 40 ? 'Third-Class Honours' : 'Academic Fail';
            return { pct: c, ratio: Math.min(1, r / 78), text: t(cls),
              work: t('Average {mark} → rounded to {round} → {cls}', { mark: c.toFixed(2), round: r, cls: t(cls) }),
              sub: t('Average mark {mark} out of 100', { mark: c.toFixed(2) }) };
          }
        }
      }`),
    modeSwitch: '',
    convScale: '',
    layoutReplace: ukLayout('Add your Year 2 and Year 3 average marks with the weights 2 and 3. Year 1 has a weight of 0, so leave it out.', 'Weight'),
    howto: ukHowto(
      'Example: a 15-credit module with 64 and a 30-credit module with 70 → (15×64 + 30×70) ÷ 45 = 3060 ÷ 45 = <strong>68.00</strong>',
      'Score = Σ (mark × credits × year weight) ÷ Σ (credits × year weight)',
      'Example: Year 2 average 64 (weight 2) and Year 3 average 70 (weight 3) → (64×2 + 70×3) ÷ 5 = 338 ÷ 5 = <strong>67.60</strong>'),
    facts: [
      "Three-year degrees use a <strong>0:2:3</strong> year weighting: Year 1 doesn't count, Year 3 counts most.",
      'Module marks and the final score are <strong>rounded to whole numbers</strong> (0.5 rounds up).',
      'Classes: <strong>70+ First</strong>, 60–69 2:1, 50–59 2:2, 40–49 Third. Boundaries are never lowered.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>The King's award algorithm</h2>
        <p>King's College London calculates a classification score for bachelor's and integrated master's degrees with one formula: every module mark is multiplied by its credits and by the weight of the year it was taken in, the results are added up and divided by the sum of credits × weights.</p>
        <p class="formula-block">Score = Σ (mark × credits × year weight) ÷ Σ (credits × year weight)</p>
        <p>For a three-year honours degree (BA, BSc, BEng, LLB, BMus) the weighting is <strong>0:2:3</strong>: Year 1 marks have a weight of 0, Year 2 marks 2 and Year 3 marks 3. Four-year honours degrees with a year abroad or in industry use 0:2:0:3, and integrated master's degrees use 0:2:3:4. Marks from a semester abroad are weighted 0; only marks from modules taken at King's are included.</p>
      </section>

      <section id="grade-points">
        <h2>King's classification bands</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Score</th><th scope="col">Class</th></tr></thead>
            <tbody>
              <tr><td>70–100</td><td>First-Class Honours</td></tr>
              <tr><td>60–69</td><td>Upper Second-Class Honours (2:1)</td></tr>
              <tr><td>50–59</td><td>Lower Second-Class Honours (2:2)</td></tr>
              <tr><td>40–49</td><td>Third-Class Honours</td></tr>
              <tr><td>0–39</td><td>Academic Fail</td></tr>
            </tbody>
          </table>
        </div>
        <p>Module marks are rounded up (0.5 or more) or down (below 0.5) to the nearest whole number. The final classification score is rounded the same way before the class is decided, so 69.5 becomes 70. The regulations are explicit that boundaries cannot be lowered and no exceptions are made. You need an overall score of at least 40 for an undergraduate degree.</p>
      </section>

      <section id="example">
        <h2>Worked example (three-year degree)</h2>
        <p>If each year has 120 credits, you can work with year averages: work out each year's credit-weighted average in the Average tab, then put Year 2 and Year 3 in the Degree tab with weights 2 and 3.</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Year</th><th scope="col" class="num">Average</th><th scope="col" class="num">Weight</th><th scope="col" class="num">Average × weight</th></tr></thead>
            <tbody>
              <tr><td>Year 1</td><td class="num">58.00</td><td class="num">0</td><td class="num">0</td></tr>
              <tr><td>Year 2</td><td class="num">66.50</td><td class="num">2</td><td class="num">133.00</td></tr>
              <tr><td>Year 3</td><td class="num">71.00</td><td class="num">3</td><td class="num">213.00</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td></td><td class="num">5</td><td class="num">346.00</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">Score = 346.00 ÷ 5 = 69.20 → 69, Upper Second (2:1)</p>
        <p>With a Year 3 average of 71.50 instead, the score would be 69.50, which rounds to 70: a First.</p>
      </section>

      <section id="gpa">
        <h2>King's marks and GPA</h2>
        <p>King's doesn't calculate a GPA. If you apply abroad, send your transcript with your marks and class, and the receiving institution will convert it with its own rules.</p>
      </section>`,
    sources: [
      ["King's College London Academic Regulations 2023/24 (Award: regulations 5.44, 5.48 and 5.66)", 'https://www.kcl.ac.uk/assets/arqs/academic-manual/archive/kcl-academic-regulations-2023-24.pdf']
    ],
    faq: [
      ["Does first year count at King's College London?", 'For a three-year honours degree, no: the weighting is 0:2:3, so Year 1 marks have a weight of 0. You still need to pass Year 1 to progress.'],
      ["What is the King's year weighting?", 'Three-year honours degrees use 0:2:3. Four-year degrees with a year abroad or in industry use 0:2:0:3, and integrated master’s degrees use 0:2:3:4.'],
      ["Does King's round the final mark?", 'Yes. The final classification score is rounded to the nearest whole number before the class is decided, with 0.5 rounding up. So 69.5 becomes 70, a First.'],
      ["Is there a borderline zone at King's?", 'The regulations say boundaries cannot be lowered and no exceptions are made. The only adjustment is the rounding of the final score to a whole number.'],
      ["What mark do I need for a 2:1 at King's?", 'A classification score of 60 to 69 after rounding, which means 59.5 or more before rounding.'],
      ["Does a semester abroad count at King's?", 'Marks from a semester abroad are given a weight of 0. Only marks from modules taken at King’s count towards your classification.']
    ]
  }
];
