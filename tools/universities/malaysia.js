/* Malaysian university pages for tools/build-university-pages.js (same fields as the entries in that file) */

// The converter tab shows the degree award or academic standing instead of a percentage
const MY_MSGS = {
  'Enter your CGPA to see the percentage.': 'Enter your CGPA to see what it means for your degree.',
  'Fix the CGPA above to see the percentage.': 'Fix the CGPA above to see the result.'
};

const myLayout = (tab, heading, resultLabel, button) => [
  ['Percentage <small>Converter</small>', tab],
  ['<h2>CGPA to percentage</h2>', `<h2>${heading}</h2>`],
  ['Type your CGPA and choose its scale.', 'Type your CGPA (out of 4.00).'],
  ['<div class="result-label">Percentage</div>', `<div class="result-label">${resultLabel}</div>`],
  ['Convert this CGPA to % →', button]
];

module.exports = [
  {
    slug: 'um-cgpa-calculator',
    country: 'Malaysia',
    short: 'UM',
    name: 'UM (Universiti Malaya) CGPA & GPA Calculator',
    title: 'UM CGPA & GPA Calculator – Universiti Malaya Grading',
    desc: 'Universiti Malaya CGPA and GPA calculator with the official UM grading scheme (A+ and A = 4.0, A- = 3.7) and the 3.70 distinction rule.',
    lead: 'Calculate your Universiti Malaya GPA and CGPA with the official UM grading scheme, enter grades or marks, and check whether your CGPA reaches the 3.70 needed for honours with distinction.',
    guideLink: 'How UM grading works',
    card: 'A+ = A = 4.0 · distinction at 3.70',
    scaleCard: {
      title: 'Grading system: Universiti Malaya (bachelor’s degrees)',
      text: 'Pick your grade or type your marks. The grade points and mark ranges come from the UM grading scheme for bachelor’s degrees.'
    },
    config: `{
      storageKey: 'cgpa-um',
      msgs: ${JSON.stringify(MY_MSGS)},
      scales: {
        um: {
          max: 4, label: 'UM 4.0 scale', region: 'Universiti Malaya bachelor’s degrees', example: '3.45',
          grades: [['A+', 4, 90], ['A', 4, 80], ['A-', 3.7, 75], ['B+', 3.3, 70], ['B', 3, 65], ['B-', 2.7, 60],
            ['C+', 2.3, 55], ['C', 2, 50], ['C-', 1.7, 45], ['D+', 1.3, 40], ['D', 1, 35], ['F', 0, 0]]
        }
      },
      conversions: {
        um: {
          formula: 'Final CGPA → honours degree award',
          example: 3.72,
          note: 'From the UM rules for bachelor’s degrees: an honours degree needs a final CGPA of at least 2.00. Honours with distinction needs 3.70 or more, no F grade, no repeated failed or improvement course, and finishing within the prescribed period.',
          result: function (c) {
            var t = window.CGPA_T;
            var award = c >= 3.7 ? 'Pass with Honours (With Distinction), if you also meet the other conditions'
              : c >= 2 ? 'Honours degree' : 'Below the 2.00 needed for an honours degree';
            return { pct: c / 4 * 100, text: t(c >= 3.7 ? 'With Distinction' : c >= 2 ? 'Honours' : 'Below 2.00'),
              work: t('CGPA {cgpa} → {award}', { cgpa: c.toFixed(2), award: t(award) }) };
          }
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
    convScale: '',
    layoutReplace: myLayout('Degree <small>Award</small>', 'CGPA to degree award', 'Degree award', 'Check my degree award →'),
    facts: [
      'Both <strong>A+ (90–100)</strong> and <strong>A (80–89.99)</strong> are worth <strong>4.0</strong>.',
      '<strong>C (50%)</strong> is the lowest pass; C-, D+, D and F are fail grades.',
      'Honours with distinction needs a final CGPA of <strong>3.70</strong> and a clean record (no F, no repeats).'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How grading works at Universiti Malaya</h2>
        <p>Universiti Malaya (UM) grades every course with a letter grade linked to a mark range and a grade point. Your semester GPA and your CGPA are the usual credit-weighted averages: multiply each course's grade point by its credit hours, add them up and divide by the total credit hours.</p>
        <p>Two things make UM's scale different from many others. First, both A+ and A are worth 4.0, so marks above 80 all give the full 4.0. Second, the lowest passing grade is C (50%). C-, D+ and D still carry grade points, but they are fail grades.</p>
      </section>

      <section id="grade-points">
        <h2>UM grading scheme</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Marks</th><th scope="col">Grade</th><th scope="col" class="num">Grade point</th><th scope="col">Meaning</th></tr></thead>
            <tbody>
              <tr><td>90.00–100.00</td><td>A+</td><td class="num">4.0</td><td>High distinction</td></tr>
              <tr><td>80.00–89.99</td><td>A</td><td class="num">4.0</td><td>Distinction</td></tr>
              <tr><td>75.00–79.99</td><td>A-</td><td class="num">3.7</td><td>Distinction</td></tr>
              <tr><td>70.00–74.99</td><td>B+</td><td class="num">3.3</td><td>Good</td></tr>
              <tr><td>65.00–69.99</td><td>B</td><td class="num">3.0</td><td>Good</td></tr>
              <tr><td>60.00–64.99</td><td>B-</td><td class="num">2.7</td><td>Good</td></tr>
              <tr><td>55.00–59.99</td><td>C+</td><td class="num">2.3</td><td>Pass</td></tr>
              <tr><td>50.00–54.99</td><td>C</td><td class="num">2.0</td><td>Pass</td></tr>
              <tr><td>45.00–49.99</td><td>C-</td><td class="num">1.7</td><td>Fail</td></tr>
              <tr><td>40.00–44.99</td><td>D+</td><td class="num">1.3</td><td>Fail</td></tr>
              <tr><td>35.00–39.99</td><td>D</td><td class="num">1.0</td><td>Fail</td></tr>
              <tr><td>0.00–34.99</td><td>F</td><td class="num">0.0</td><td>Fail</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="example">
        <h2>How to calculate your UM GPA: worked example</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Course</th><th scope="col" class="num">Credits</th><th scope="col" class="num">Marks</th><th scope="col">Grade</th><th scope="col" class="num">Credits × points</th></tr></thead>
            <tbody>
              <tr><td>Principles of Accounting</td><td class="num">3</td><td class="num">82</td><td>A (4.0)</td><td class="num">12.0</td></tr>
              <tr><td>Microeconomics</td><td class="num">3</td><td class="num">71</td><td>B+ (3.3)</td><td class="num">9.9</td></tr>
              <tr><td>Business Statistics</td><td class="num">3</td><td class="num">66</td><td>B (3.0)</td><td class="num">9.0</td></tr>
              <tr><td>Commercial Law</td><td class="num">3</td><td class="num">77</td><td>A- (3.7)</td><td class="num">11.1</td></tr>
              <tr><td>Malay language course</td><td class="num">2</td><td class="num">58</td><td>C+ (2.3)</td><td class="num">4.6</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">14</td><td></td><td></td><td class="num">46.6</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">GPA = 46.6 ÷ 14 = 3.33</p>
      </section>

      <section id="degree">
        <h2>UM degree award: honours and distinction</h2>
        <p>UM confers an honours degree based on your final CGPA, and you need a final CGPA of at least 2.00 to qualify. You receive a <strong>Pass with Honours (With Distinction)</strong> if you:</p>
        <ul>
          <li>finish with a CGPA of <strong>3.70 or above</strong>;</li>
          <li>have never received an F for any course during your programme;</li>
          <li>have never repeated a failed course or taken a course again to improve its grade; and</li>
          <li>complete your programme within the minimum or prescribed period.</li>
        </ul>
        <p>So a 3.75 CGPA with a repeated course does not earn the distinction. UM does not publish a CGPA-to-percentage formula; if a form asks for one, attach your transcript.</p>
      </section>`,
    sources: [
      ['Universiti Malaya, Faculty of Business and Economics: BBA Handbook 2024/2025, Grading Scheme and Award of Degree (from the UM Rules and Regulations for Bachelor’s Degrees)', 'https://ebook.um.edu.my/fbe/BBA_Handbook_2024_2025/files/basic-html/page34.html']
    ],
    faq: [
      ['Is an A+ worth more than an A at UM?', 'No. Both A+ (90–100 marks) and A (80–89.99 marks) are worth 4.0 grade points at Universiti Malaya.'],
      ['What is the passing grade at Universiti Malaya?', 'C, which is 50.00–54.99 marks and 2.0 grade points. C-, D+, D and F are fail grades, even though C-, D+ and D carry some grade points.'],
      ['What CGPA do I need for honours with distinction at UM?', 'A final CGPA of 3.70 or above. You must also have no F grades, no repeated failed or improvement courses, and finish within the prescribed period.'],
      ['What is the minimum CGPA to graduate from UM?', 'You need a final CGPA of at least 2.00 to be awarded an honours degree.'],
      ['What grade is 75 marks at UM?', 'A- (75.00–79.99), worth 3.7 grade points and described as a distinction.'],
      ['How do I convert my UM CGPA to a percentage?', 'UM does not publish an official CGPA-to-percentage formula. If a form asks for a percentage, attach your official transcript, which shows your grades and the grading scheme.']
    ]
  },

  {
    slug: 'ukm-cgpa-calculator',
    country: 'Malaysia',
    short: 'UKM',
    name: 'UKM CGPA & GPA (PNG & PNGK) Calculator',
    title: 'UKM CGPA & GPA (PNGK) Calculator – Official UKM Grading',
    desc: 'UKM CGPA and GPA (PNG and PNGK) calculator with the official Universiti Kebangsaan Malaysia grading scale and the 3.67 Cemerlang degree class.',
    lead: 'Work out your UKM PNG (semester GPA) and PNGK (CGPA) with the official grading scale of Universiti Kebangsaan Malaysia, and see whether you reach the 3.67 needed for a degree with Cemerlang.',
    guideLink: 'How UKM grading works',
    card: 'PNG &amp; PNGK · Cemerlang at 3.67',
    scaleCard: {
      title: 'Grading system: UKM (bachelor’s degrees)',
      text: 'Pick your grade or type your marks. The scale applies to students admitted from the 2022/2023 academic session.'
    },
    config: `{
      storageKey: 'cgpa-ukm',
      msgs: ${JSON.stringify(MY_MSGS)},
      scales: {
        ukm: {
          max: 4, label: 'UKM 4.0 scale', region: 'UKM bachelor’s degrees · 2022/2023 intake onward', example: '3.45', truncate: true,
          grades: [['A', 4, 80], ['A-', 3.67, 75], ['B+', 3.33, 70], ['B', 3, 65], ['B-', 2.67, 60], ['C+', 2.33, 55],
            ['C', 2, 50], ['C-', 1.67, 45], ['D+', 1.33, 40], ['D', 1, 35], ['E', 0, 0]]
        }
      },
      conversions: {
        ukm: {
          formula: 'PNGK → class of degree',
          example: 3.7,
          note: 'From the UKM bachelor’s degree regulations: 3.67–4.00 is a degree with Honours (Cemerlang) and 2.00–3.66 a degree with Honours. You need a PNGK of at least 2.00 to graduate; programme rules can add further conditions.',
          result: function (c) {
            var t = window.CGPA_T;
            var v = Math.floor(c * 100 + 1e-9) / 100;
            var award = v >= 3.67 ? 'Bachelor’s degree with Honours (Cemerlang)' : v >= 2 ? 'Bachelor’s degree with Honours'
              : v >= 1 ? 'Conditional pass (Lulus Bersyarat): below the 2.00 needed to graduate' : 'Fail and dismissed (below 1.00)';
            return { pct: c / 4 * 100, text: t(v >= 3.67 ? 'Cemerlang' : v >= 2 ? 'Honours' : 'Below 2.00'),
              work: t('CGPA {cgpa} → {award}', { cgpa: v.toFixed(2), award: t(award) }) };
          }
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
    convScale: '',
    layoutReplace: [
      ...myLayout('Degree <small>Class</small>', 'PNGK to class of degree', 'Class of degree', 'Check my class of degree →'),
      ['<h2>Semester GPA</h2>', '<h2>Semester GPA (PNG)</h2>'],
      ['<h2>Overall CGPA</h2>', '<h2>Overall CGPA (PNGK)</h2>']
    ],
    facts: [
      '<strong>A (80–100)</strong> is the top grade at 4.00; there is no A+ at UKM.',
      'A PNGK of <strong>3.67–4.00</strong> gives a degree with Honours <strong>(Cemerlang)</strong>.',
      'If you repeat a course, <strong>only the latest grade</strong> counts in your PNGK.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>PNG and PNGK at UKM</h2>
        <p>Universiti Kebangsaan Malaysia (UKM) calls the semester GPA <strong>PNG</strong> (Purata Nilai Gred) and the CGPA <strong>PNGK</strong> (Purata Nilai Gred Kumulatif). Both are credit-weighted averages: multiply each course's grade value by its credit hours, add up the results and divide by the total credit hours you took.</p>
        <p>The worked example in the UKM regulations divides 77.98 by 27 and gives a PNGK of 2.88. Since 77.98 ÷ 27 is 2.888…, the result is cut after two decimals rather than rounded, and this calculator shows UKM results the same way.</p>
      </section>

      <section id="grade-points">
        <h2>UKM grading scale (2022/2023 intake onward)</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Grade</th><th scope="col" class="num">Marks</th><th scope="col" class="num">Grade value</th><th scope="col">Status</th></tr></thead>
            <tbody>
              <tr><td>A</td><td class="num">80–100</td><td class="num">4.00</td><td>Cemerlang (excellent)</td></tr>
              <tr><td>A-</td><td class="num">75–79</td><td class="num">3.67</td><td>Cemerlang (excellent)</td></tr>
              <tr><td>B+</td><td class="num">70–74</td><td class="num">3.33</td><td>Kepujian (credit)</td></tr>
              <tr><td>B</td><td class="num">65–69</td><td class="num">3.00</td><td>Kepujian (credit)</td></tr>
              <tr><td>B-</td><td class="num">60–64</td><td class="num">2.67</td><td>Lulus (pass)</td></tr>
              <tr><td>C+</td><td class="num">55–59</td><td class="num">2.33</td><td>Lulus (pass)</td></tr>
              <tr><td>C</td><td class="num">50–54</td><td class="num">2.00</td><td>Lulus (pass)</td></tr>
              <tr><td>C-</td><td class="num">45–49</td><td class="num">1.67</td><td>Gagal (fail)</td></tr>
              <tr><td>D+</td><td class="num">40–44</td><td class="num">1.33</td><td>Gagal (fail)</td></tr>
              <tr><td>D</td><td class="num">35–39</td><td class="num">1.00</td><td>Gagal (fail)</td></tr>
              <tr><td>E</td><td class="num">0–34</td><td class="num">0.00</td><td>Gagal (fail)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="example">
        <h2>Worked example from the UKM regulations</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Course</th><th scope="col">Grade</th><th scope="col" class="num">Grade value</th><th scope="col" class="num">Credits</th><th scope="col" class="num">Value × credits</th></tr></thead>
            <tbody>
              <tr><td>XA1013</td><td>A</td><td class="num">4.00</td><td class="num">3</td><td class="num">12.00</td></tr>
              <tr><td>XB1013</td><td>B+</td><td class="num">3.33</td><td class="num">3</td><td class="num">9.99</td></tr>
              <tr><td>XC1013</td><td>A-</td><td class="num">3.67</td><td class="num">3</td><td class="num">11.01</td></tr>
              <tr><td>XD1512</td><td>E</td><td class="num">0.00</td><td class="num">2</td><td class="num">0.00</td></tr>
              <tr><td>XE1512</td><td>D</td><td class="num">1.00</td><td class="num">2</td><td class="num">2.00</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td></td><td></td><td class="num">13</td><td class="num">35.00</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">PNG = 35.00 ÷ 13 = 2.69</p>
        <p>In semester 2 the same student earns 42.98 points over 14 credits, so the PNGK is (35.00 + 42.98) ÷ (13 + 14) = 77.98 ÷ 27 = <strong>2.88</strong>.</p>
      </section>

      <section id="degree">
        <h2>Class of degree and academic standing at UKM</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">PNGK</th><th scope="col">Result</th></tr></thead>
            <tbody>
              <tr><td>3.67 – 4.00</td><td>Bachelor’s degree with Honours (Cemerlang)</td></tr>
              <tr><td>2.00 – 3.66</td><td>Bachelor’s degree with Honours</td></tr>
              <tr><td>1.00 – below 2.00</td><td>Conditional pass (Lulus Bersyarat), not eligible to graduate</td></tr>
              <tr><td>Below 1.00</td><td>Fail and dismissed</td></tr>
            </tbody>
          </table>
        </div>
        <p>To graduate you also need at least 120 credits (or the total your programme sets), and your programme may add its own conditions. If you repeat a course, the PNGK uses only your latest grade for it.</p>
      </section>`,
    sources: [
      ['Universiti Kebangsaan Malaysia: Pekeliling Akademik Bil. 35/2024 (2 October 2024), Peraturan-Peraturan UKM (Pengajian Sarjana Muda) 2024, regulations 28, 36–38 and Jadual 3', 'https://ukm.my/akademik/wp-content/uploads/2024/10/PEKELILING-AKADEMIK-BIL.-35-2024.pdf']
    ],
    faq: [
      ['What are PNG and PNGK at UKM?', 'PNG (Purata Nilai Gred) is your semester GPA and PNGK (Purata Nilai Gred Kumulatif) is your CGPA across all semesters. Both are credit-weighted averages.'],
      ['What PNGK do I need for a Cemerlang degree at UKM?', 'A PNGK of 3.67 to 4.00 gives a Bachelor’s degree with Honours (Cemerlang). From 2.00 to 3.66 it is a Bachelor’s degree with Honours.'],
      ['Is there an A+ at UKM?', 'No. A (80–100 marks) is the top grade, worth 4.00. A- (75–79) is 3.67.'],
      ['What is the passing grade at UKM?', 'C (50–54 marks) is the lowest pass. C-, D+, D and E are fail grades.'],
      ['If I repeat a course at UKM, which grade counts?', 'Only the latest grade is used to calculate your PNGK.'],
      ['What happens if my PNGK is below 2.00?', 'From 1.00 to below 2.00 your status is Lulus Bersyarat (conditional pass) and you are not eligible to graduate. Below 1.00 the status is fail and dismissed.']
    ]
  },

  {
    slug: 'utm-cgpa-calculator',
    country: 'Malaysia',
    short: 'UTM',
    name: 'UTM CGPA & GPA (PNG & PNGK) Calculator',
    title: 'UTM CGPA & GPA Calculator – Universiti Teknologi Malaysia',
    desc: 'UTM CGPA and GPA (PNG and PNGK) calculator with the official Universiti Teknologi Malaysia grading table, academic standing and Dean’s award rules.',
    lead: 'Calculate your UTM PNG and PNGK with the official grading table of Universiti Teknologi Malaysia, and check your academic standing and the 3.67 needed for the Dean’s award.',
    guideLink: 'How UTM grading works',
    card: 'A+ to E · standing &amp; Dean’s award',
    scaleCard: {
      title: 'Grading system: UTM (bachelor’s degrees)',
      text: 'Pick your grade or type your marks. Grades, marks and grade values come from the UTM Academic Regulations for bachelor’s programmes.'
    },
    config: `{
      storageKey: 'cgpa-utm',
      msgs: ${JSON.stringify(MY_MSGS)},
      scales: {
        utm: {
          max: 4, label: 'UTM 4.0 scale', region: 'UTM bachelor’s degrees', example: '3.45',
          grades: [['A+', 4, 90], ['A', 4, 80], ['A-', 3.67, 75], ['B+', 3.33, 70], ['B', 3, 65], ['B-', 2.67, 60], ['C+', 2.33, 55],
            ['C', 2, 50], ['C-', 1.67, 45], ['D+', 1.33, 40], ['D', 1, 35], ['D-', 0.67, 30], ['E', 0, 0]]
        }
      },
      conversions: {
        utm: {
          formula: 'PNGK → academic standing',
          example: 3.7,
          note: 'From the UTM Academic Regulations: Good Standing (KB) needs a PNGK of 2.00 or more and is required to graduate. 1.70 to below 2.00 is Conditional Standing (KS); below 1.70 is Failed Standing (KG). Graduates with a PNGK of 3.67 or more receive the Dean’s Award medal.',
          result: function (c) {
            var t = window.CGPA_T;
            var s = c >= 3.67 ? 'Good Standing (KB), Dean’s Award medal level' : c >= 2 ? 'Good Standing (KB)'
              : c >= 1.7 ? 'Conditional Standing (KS)' : 'Failed Standing (KG), dismissed';
            return { pct: c / 4 * 100, text: t(c >= 2 ? 'Good Standing' : c >= 1.7 ? 'Conditional' : 'Failed Standing'),
              work: t('CGPA {cgpa} → {award}', { cgpa: c.toFixed(2), award: t(s) }) };
          }
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
    convScale: '',
    layoutReplace: [
      ...myLayout('Standing <small>Checker</small>', 'PNGK to academic standing', 'Academic standing', 'Check my academic standing →'),
      ['<h2>Semester GPA</h2>', '<h2>Semester GPA (PNG)</h2>'],
      ['<h2>Overall CGPA</h2>', '<h2>Overall CGPA (PNGK)</h2>']
    ],
    facts: [
      'Marks <strong>80 and above</strong> (A and A+) both give <strong>4.00</strong>.',
      'Generally <strong>D+ (40–44)</strong> is the minimum pass, but your faculty can set a higher one.',
      'Improving a grade (B- or lower, once, up to 15 credits): the <strong>better grade</strong> counts in your PNGK.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How grading works at UTM</h2>
        <p>Universiti Teknologi Malaysia (UTM) measures your results with two numbers: <strong>PNG</strong>, the grade point average for one semester, and <strong>PNGK</strong>, the cumulative average over all semesters. Each is the total grade value (grade value × credits) divided by the total credits counted.</p>
        <p class="formula-block">PNGK = total grade value of all semesters ÷ total credits counted in all semesters</p>
      </section>

      <section id="grade-points">
        <h2>UTM grading table</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col" class="num">Marks</th><th scope="col">Grade</th><th scope="col" class="num">Grade value</th></tr></thead>
            <tbody>
              <tr><td class="num">90–100</td><td>A+</td><td class="num">4.00</td></tr>
              <tr><td class="num">80–89</td><td>A</td><td class="num">4.00</td></tr>
              <tr><td class="num">75–79</td><td>A-</td><td class="num">3.67</td></tr>
              <tr><td class="num">70–74</td><td>B+</td><td class="num">3.33</td></tr>
              <tr><td class="num">65–69</td><td>B</td><td class="num">3.00</td></tr>
              <tr><td class="num">60–64</td><td>B-</td><td class="num">2.67</td></tr>
              <tr><td class="num">55–59</td><td>C+</td><td class="num">2.33</td></tr>
              <tr><td class="num">50–54</td><td>C</td><td class="num">2.00</td></tr>
              <tr><td class="num">45–49</td><td>C-</td><td class="num">1.67</td></tr>
              <tr><td class="num">40–44</td><td>D+</td><td class="num">1.33</td></tr>
              <tr><td class="num">35–39</td><td>D</td><td class="num">1.00</td></tr>
              <tr><td class="num">30–34</td><td>D-</td><td class="num">0.67</td></tr>
              <tr><td class="num">0–29</td><td>E</td><td class="num">0.00</td></tr>
            </tbody>
          </table>
        </div>
        <p>In general D+ is the minimum passing grade, but each faculty may set the passing grade for a course.</p>
      </section>

      <section id="example">
        <h2>Academic standing at UTM</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Status</th><th scope="col">PNGK</th></tr></thead>
            <tbody>
              <tr><td>Good Standing (KB)</td><td>2.00 or more</td></tr>
              <tr><td>Conditional Standing (KS)</td><td>1.70 to below 2.00</td></tr>
              <tr><td>Failed Standing (KG), dismissed</td><td>below 1.70</td></tr>
            </tbody>
          </table>
        </div>
        <p>You need Good Standing (KB) to be awarded your degree. A semester PNG of 3.67 or more (with at least 12 credits) earns a Dean’s List certificate, and graduating with a PNGK of 3.67 or more earns the Dean’s Award medal.</p>
      </section>

      <section id="repeat">
        <h2>Failed courses and grade improvement</h2>
        <p>If you fail a core or university course, you must take it again until you pass, and the PNGK then uses the credits and grade value of your latest attempt; the original attempt is removed. With your faculty's approval you can also improve a course you passed with B- or lower. You may do this once per course and for up to 15 credits during your studies, and the better of the two grades counts in your PNGK.</p>
      </section>`,
    sources: [
      ['Universiti Teknologi Malaysia: Peraturan Akademik Program Sarjana Muda, Edisi ke-16 (2023), Jadual 5, Perkara 18, 29–33', 'https://civil.utm.my/wp-content/uploads/2024/08/Peraturan-Akademik-Edisi-ke-16.pdf']
    ],
    faq: [
      ['Are A+ and A both 4.00 at UTM?', 'Yes. A+ (90–100 marks) and A (80–89) are both worth 4.00. A- (75–79) is 3.67.'],
      ['What is the passing grade at UTM?', 'In general D+ (40–44 marks) is the minimum pass, but your faculty can set a different passing grade for a course.'],
      ['What PNGK do I need to graduate from UTM?', 'You need Good Standing (KB), which means a PNGK of 2.00 or more.'],
      ['What is the Dean’s Award at UTM?', 'A semester PNG of 3.67 or more with at least 12 credits earns a Dean’s List certificate. Graduating with a PNGK of 3.67 or more earns the Dean’s Award medal.'],
      ['If I improve a grade at UTM, which one counts?', 'For courses passed with B- or lower, you may improve the grade once per course, up to 15 credits in total. The better of the original and new grade counts in your PNGK.'],
      ['What happens if my PNGK falls below 2.00?', 'From 1.70 to below 2.00 you are in Conditional Standing (KS). Below 1.70 you are in Failed Standing (KG) and dismissed.']
    ]
  }
];
