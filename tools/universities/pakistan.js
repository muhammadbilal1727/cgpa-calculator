/* More Pakistani university pages for tools/build-university-pages.js (same fields as the entries in that file) */

module.exports = [
  {
    slug: 'ghazi-university-cgpa-calculator',
    country: 'Pakistan',
    short: 'GU',
    name: 'Ghazi University (DG Khan) CGPA & GPA Calculator',
    title: 'Ghazi University CGPA & GPA Calculator – DG Khan',
    desc: 'Ghazi University Dera Ghazi Khan CGPA and GPA calculator using the official quality point table from the GU Statutes and Regulations 2021.',
    lead: 'Type your marks to work out your semester GPA and overall CGPA with the official Ghazi University quality point table, where your points rise with every extra mark.',
    guideLink: 'How Ghazi University grading works',
    card: 'Marks-based quality points · degree at 2.20',
    scaleCard: {
      title: 'Grading system: Ghazi University first-degree (BS) programmes',
      text: 'Type the marks you got in each course as a percentage. The quality points come from the Ghazi University Statutes and Regulations 2021.'
    },
    config: `{
      storageKey: 'cgpa-gudgk',
      scales: {
        gu: {
          max: 4, label: 'Ghazi University 4.0 scale', region: 'Ghazi University DG Khan · first-degree programmes', example: '3.56', modes: ['marks', 'points'],
          grades: [['A', 4, 80], ['B', 3.93, 65, 3], ['C', 2.93, 50, 2], ['D', 1.9, 40, 1], ['F', 0, 0]],
          marksToPoints: function (m) { return m >= 80 ? 4 : m >= 50 ? 2 + (m - 50) / 15 : m >= 40 ? 1 + (m - 40) / 10 : 0; }
        }
      },
      conversions: {
        gu: {
          formula: 'Average marks from the GU quality point table, read backwards',
          example: 3.56,
          note: 'The Ghazi University Statutes and Regulations 2021 do not give a CGPA-to-percentage formula. This tab reads the official quality point table backwards to show the average marks your CGPA stands for. If an employer or university asks for a percentage, check which method they accept.',
          result: function (c) {
            var t = window.CGPA_T; // translation helper from script.js
            var v = Math.round(c * 100 + 1e-9) / 100;
            if (v >= 4) return { pct: 80, text: t('80% or more'), work: t('CGPA 4.00 means an A in every course, which is 80% or more') };
            if (v >= 2) {
              var p = 50 + (v - 2) * 15;
              return { pct: p, text: p.toFixed(1) + '%', work: t('50 + ({cgpa} − 2) × 15 = {pct}%', { cgpa: v.toFixed(2), pct: p.toFixed(1) }) };
            }
            if (v >= 1) {
              var q = 40 + (v - 1) * 10;
              return { pct: q, text: q.toFixed(1) + '%', work: t('40 + ({cgpa} − 1) × 10 = {pct}%', { cgpa: v.toFixed(2), pct: q.toFixed(1) }) };
            }
            return { pct: 0, text: t('Below 40%'), work: t('CGPA {cgpa} is below 1.00, which means below 40%', { cgpa: v.toFixed(2) }) };
          }
        }
      }
    }`,
    modeSwitch: `
            <div class="segmented" id="modeSwitch" role="radiogroup" aria-label="How do you want to enter results?">
              <input type="radio" name="gpaMode" id="modeMarks" value="marks" checked>
              <label for="modeMarks">Marks</label>
              <input type="radio" name="gpaMode" id="modePoints" value="points">
              <label for="modePoints">Grade points</label>
            </div>`,
    convScale: '',
    facts: [
      'Your points rise with <strong>every extra mark</strong>: 65% is 3.00 and 70% is 3.33, even though both are a B.',
      'Pass marks are <strong>40%</strong> in each course. Below 40% is an F.',
      'You need a CGPA of at least <strong>2.20</strong> with no F grade to get your degree.',
      'Marks out of the course total? Turn them into a percentage first: 45 out of 60 is <strong>75%</strong>.'
    ],
    article: () => `
      <section id="how-it-works">
        <h2>How grading works at Ghazi University</h2>
        <p>Ghazi University uses absolute grading with four passing grades: A, B, C and D. F is the failing grade. The rules come from the <q>Ghazi University, Dera Ghazi Khan, Statutes and Regulations, 2021</q> for first-degree courses such as BS, B.Sc. (Hons) and BBA.</p>
        <p>Unlike universities where every B is worth the same, Ghazi University gives quality points mark by mark. Each credit hour of a course is worth 20 marks, so a 3-credit course is marked out of 60. The official quality point table then gives a slightly higher number of points for every extra mark you get, up to 80%. That is why this calculator asks for your marks instead of just your letter grade.</p>
      </section>

      <section id="grade-points">
        <h2>Ghazi University grade and quality point table</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Grade</th><th scope="col" class="num">Marks</th><th scope="col" class="num">Grade points per credit hour</th></tr></thead>
            <tbody>
              <tr><td>A</td><td class="num">80% – 100%</td><td class="num">4.00</td></tr>
              <tr><td>B</td><td class="num">65% – 79%</td><td class="num">3.00 – 3.93</td></tr>
              <tr><td>C</td><td class="num">50% – 64%</td><td class="num">2.00 – 2.93</td></tr>
              <tr><td>D</td><td class="num">40% – 49%</td><td class="num">1.00 – 1.90</td></tr>
              <tr><td>F</td><td class="num">Below 40%</td><td class="num">0.00</td></tr>
            </tbody>
          </table>
        </div>
        <p>Inside each grade the points follow the official table step by step:</p>
        <ul>
          <li><strong>40% to 50%:</strong> 1.00 point at 40%, plus 0.10 for every extra 1%. So 45% is 1.50.</li>
          <li><strong>50% to 80%:</strong> 2.00 points at 50%, plus 1/15 of a point for every extra 1%. So 55% is 2.33, 65% is 3.00 and 70% is 3.33.</li>
          <li><strong>80% and above:</strong> always 4.00.</li>
        </ul>
        <p>Your quality points for a course are its credit hours × these grade points. For example, 45 out of 60 in a 3-credit course is 75%, which gives 3.67 × 3 = 11.00 quality points, exactly as in the official table.</p>
      </section>

      <section id="example">
        <h2>How to calculate your Ghazi University GPA: worked example</h2>
        <p>This is the example given in the Statutes and Regulations 2021:</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Course</th><th scope="col" class="num">Credits</th><th scope="col" class="num">Marks</th><th scope="col">Grade</th><th scope="col" class="num">Quality points</th></tr></thead>
            <tbody>
              <tr><td>Course I</td><td class="num">2</td><td class="num">32 / 40 (80%)</td><td>A</td><td class="num">8.00</td></tr>
              <tr><td>Course II</td><td class="num">3</td><td class="num">45 / 60 (75%)</td><td>B</td><td class="num">11.00</td></tr>
              <tr><td>Course III</td><td class="num">3</td><td class="num">48 / 60 (80%)</td><td>A</td><td class="num">12.00</td></tr>
              <tr><td>Course IV</td><td class="num">3</td><td class="num">38 / 60 (63.3%)</td><td>C</td><td class="num">8.67</td></tr>
              <tr><td>Course V</td><td class="num">2</td><td class="num">28 / 40 (70%)</td><td>B</td><td class="num">6.67</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td class="num">13</td><td></td><td></td><td class="num">46.34</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">GPA = 46.34 ÷ 13 = 3.56</p>
        <p>Your CGPA works the same way across all semesters: add up the quality points of every semester and divide by the total credit hours. The CGPA tab does this from your semester GPAs.</p>
        <p><strong>Calculator tip:</strong> if your result card shows quality points instead of marks, switch to Grade points and type the quality points ÷ credit hours. For Course II above, that is 11.00 ÷ 3 = 3.67.</p>
      </section>

      <section id="minimum-cgpa">
        <h2>Good standing, probation and minimum CGPA</h2>
        <ul>
          <li><strong>First semester:</strong> you need a GPA of at least 1.00 to be promoted to the second semester.</li>
          <li><strong>Second semester onwards:</strong> if your CGPA falls below 1.50, you are dropped from the rolls of the university. You can be re-admitted once, in the first semester of the next session.</li>
          <li><strong>To get your degree</strong> you need a CGPA of at least 2.20 with no F grade.</li>
          <li><strong>CGPA between 1.90 and 2.20 after the 8th semester:</strong> if you have not repeated any course, you may repeat some of your lowest-grade courses once to reach 2.20.</li>
        </ul>
        <p>The Target tab shows the GPA you need in your remaining semesters to reach 2.20 or any other CGPA.</p>
      </section>

      <section id="repeat">
        <h2>Repeating a course and improving a D grade</h2>
        <ul>
          <li>If you get an F, you must repeat the course when it is offered again.</li>
          <li>If you get a D, you may repeat the course once to improve it. Courses passed with A, B or C cannot be repeated.</li>
          <li>You can repeat or improve at most six courses (18 credit hours) in your whole degree, and not more than one course per Fall or Spring semester.</li>
          <li>The improved grade replaces the F or D in your CGPA, but the old grade still appears on your transcript.</li>
        </ul>
        <p><strong>Calculator tip:</strong> for a repeated course, enter only your new, better marks.</p>
      </section>

      <section id="percentage">
        <h2>Ghazi University CGPA to percentage</h2>
        <p>The Statutes and Regulations 2021 do not include a formula for turning CGPA into a percentage. The Percentage tab reads the official quality point table backwards to show the average marks your CGPA stands for:</p>
        <ul>
          <li><strong>CGPA 2.00 to 3.99:</strong> percentage = 50 + (CGPA − 2) × 15. So 3.56 is about 73.4%.</li>
          <li><strong>CGPA 1.00 to 1.99:</strong> percentage = 40 + (CGPA − 1) × 10.</li>
          <li><strong>CGPA 4.00:</strong> 80% or more.</li>
        </ul>
        <p>Because this is not an official university formula, check which method an employer or university accepts before you use it on a form.</p>
      </section>`,
    sources: [
      ['Ghazi University, Dera Ghazi Khan, Statutes and Regulations 2021 relating to First-Degree Courses (sections 28 to 33)', 'https://www.gudgk.edu.pk/downloads/81/download/pdf']
    ],
    faq: [
      ['What are the grades and marks at Ghazi University?', 'A is 80% to 100%, B is 65% to 79%, C is 50% to 64% and D is 40% to 49%. Below 40% is an F, the failing grade.'],
      ['Why do two B grades give different grade points at Ghazi University?', 'Ghazi University gives quality points mark by mark. Inside the B range, 65% is 3.00 points and 79% is 3.93 points, so your exact marks matter, not just the letter.'],
      ['What CGPA do I need to get my degree from Ghazi University?', 'You need a CGPA of at least 2.20 with no F grade. If you finish the 8th semester with a CGPA from 1.90 to below 2.20 and have not repeated any course, you may repeat some low-grade courses once to reach 2.20.'],
      ['When are you dropped from Ghazi University for low CGPA?', 'From the second semester onwards, a CGPA below 1.50 means you are dropped from the rolls. In the first semester you need a GPA of at least 1.00 to be promoted.'],
      ['Can I improve a D grade at Ghazi University?', 'Yes. You can repeat a D-grade course once. The better grade is used in your CGPA, but the D still appears on your transcript. You can repeat or improve at most six courses (18 credit hours) in the whole degree.'],
      ['How do I convert my Ghazi University CGPA to a percentage?', 'There is no official formula in the Statutes and Regulations 2021. Reading the quality point table backwards, a CGPA from 2.00 to 3.99 equals 50 + (CGPA − 2) × 15, so 3.56 is about 73.4%. Check which method the employer or university accepts.'],
      ['My result shows marks out of 60, not a percentage. What do I enter?', 'Divide your marks by the course total and multiply by 100. Each credit hour is worth 20 marks, so 45 out of 60 in a 3-credit course is 75%.']
    ]
  }
];
