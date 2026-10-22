/* University pages written natively in German (built into /de/ by tools/build-university-pages.js + tools/i18n.js).
   Same fields as the university entries in tools/build-university-pages.js.
   German grades run from 1.0 (best) to 4.0 (lowest pass), so these pages use a "lower is better" scale. */

// Calculator messages reworded for German grades (English original → German text)
const DE_MSGS = {
  'Add your subjects to see your GPA.': 'Trage deine Module ein, um deinen Notendurchschnitt zu sehen.',
  'Add your semesters to see your CGPA.': 'Trage deine Semester ein, um deine Gesamtnote zu sehen.',
  'Fill in the four boxes above to see the GPA you need.': 'Fülle die vier Felder oben aus, um den nötigen Durchschnitt zu sehen.',
  'Fill in all four boxes to see the GPA you need.': 'Fülle alle vier Felder aus, um den nötigen Durchschnitt zu sehen.',
  'Enter your CGPA to see the percentage.': 'Gib deine ausländische Note ein, um die deutsche Note zu sehen.',
  'Fix the CGPA above to see the percentage.': 'Korrigiere die Note oben, um das Ergebnis zu sehen.',
  'Please enter the GPA for this semester.': 'Bitte gib den Notendurchschnitt dieses Semesters ein.',
  'Please enter the credit hours for this subject.': 'Bitte gib die ECTS-Punkte dieses Moduls ein.',
  'Please enter the total credit hours for this semester.': 'Bitte gib die ECTS-Punkte dieses Semesters ein.',
  'That looks too high. Credit hours are usually between 1 and 6.': 'Das ist ungewöhnlich hoch. Bitte prüfe die ECTS-Punkte.',
  'That looks too high. A semester usually has 12 to 24 credit hours.': 'Das ist ungewöhnlich hoch. Ein Semester hat meist etwa 30 ECTS-Punkte.',
  'GPA / SGPA': 'Durchschnitt',
  'Subject name (optional)': 'Modulname (optional)',
  'e.g. Calculus': 'z. B. Analysis 1',
  'Grade points ({scale})': 'Noten ({scale})',
  'Please type your CGPA as a number, like {x}.': 'Bitte gib deine Note als Zahl ein, z. B. {x}.',
  'CGPA can’t be negative.': 'Eine Note kann nicht negativ sein.',
  'On the {scale}, CGPA can’t be more than {max}. Try a different scale.': 'Auf der Skala „{scale}“ kann die Note nicht höher als {max} sein. Wähle eine andere Skala.',
  'Calculate your CGPA in the CGPA tab first 🙂': 'Berechne zuerst deine Gesamtnote im Tab „Gesamt“ 🙂',
  'Add at least one complete subject first 🙂': 'Trage zuerst mindestens ein vollständiges Modul ein 🙂',
  'Semester {n}: GPA {gpa}, {credits} credits': 'Semester {n}: Durchschnitt {gpa}, {credits} ECTS',
  '{name}: {credits} credits, grade {grade} ({points})': '{name}: {credits} ECTS, Note {grade}',
  'My semester GPA: {gpa} ({scale})': 'Mein Notendurchschnitt: {gpa} ({scale})',
  'My CGPA: {cgpa} ({scale})': 'Meine Gesamtnote: {cgpa} ({scale})',
  'Total credit hours: {credits}': 'ECTS insgesamt: {credits}',
  '1 subject · {credits} credits': '1 Modul · {credits} ECTS',
  '{n} subjects · {credits} credits': '{n} Module · {credits} ECTS',
  '1 semester · {credits} total credit hours': '1 Semester · {credits} ECTS',
  '{n} semesters · {credits} total credit hours': '{n} Semester · {credits} ECTS',
  'You need an average of {needed} or better over your remaining {left} credit hours to reach a {target} average.': 'Du brauchst in deinen restlichen {left} ECTS einen Durchschnitt von {needed} oder besser, um {target} zu erreichen.',
  'To reach a {target} average (now {current}), I need an average of {needed} or better over my remaining {left} credit hours.': 'Für einen Durchschnitt von {target} (jetzt {current}) brauche ich in meinen restlichen {left} ECTS {needed} oder besser.',
  'I have already secured a {target} CGPA.': 'Einen Durchschnitt von {target} habe ich schon sicher.',
  'Even with a perfect {max} in every remaining semester, the best average you can reach is {best}.': 'Selbst mit einer {max} in allen restlichen Modulen erreichst du höchstens einen Durchschnitt von {best}.',
  'Your average will stay at {target} or better no matter what. Aim high anyway!': 'Dein Durchschnitt bleibt auf jeden Fall bei {target} oder besser. Trotzdem: gib Gas!'
};

// Grades a module can get (fail grades above 4.0 don't count towards the final grade)
const DE_GRADES = "[['1.0 sehr gut', 1], ['1.3 sehr gut', 1.3], ['1.7 gut', 1.7], ['2.0 gut', 2], ['2.3 gut', 2.3], ['2.7 befriedigend', 2.7], ['3.0 befriedigend', 3], ['3.3 befriedigend', 3.3], ['3.7 ausreichend', 3.7], ['4.0 ausreichend', 4]]";
const DE_WORDS = "[[1.5, 'sehr gut'], [2.5, 'gut'], [3.5, 'befriedigend'], [4, 'ausreichend']]";
const DE_WORDS_TUM = "[[1.2, 'mit Auszeichnung'], [1.5, 'sehr gut'], [2.5, 'gut'], [3.5, 'befriedigend'], [4, 'ausreichend']]";

// Shared calculator settings; digits = decimals kept (cut off, not rounded) in averages
const deConfig = (storageKey, label, digits, words, extra) => `{
        storageKey: '${storageKey}',
        creditLabel: 'ECTS',
        semCreditLabel: 'ECTS',
        creditExample: 6,
        semCreditExample: 30,
        maxSemCredit: 90,
        maxTotalCredit: 400,
        periodLabel: 'Semester {n}',
        msgs: ${JSON.stringify(DE_MSGS)},
        ${extra || ''}
        scales: {
          de: {
            max: 4, min: 1, lowerIsBetter: true, label: '${label}', region: 'Deutsche Noten · 1.0 ist die beste Note', example: '1.7',
            modes: ['grade', 'points'], pointsLabel: 'Genaue Note (1.0–4.0)', digits: ${digits}, truncate: true, gradeDigits: 1,
            maxText: '(1.0 = beste Note)', noQualityPoints: true, subtitle: 'Deutsche Noten: 1.0 ist die beste, 4.0 die schlechteste bestandene Note',
            ratioPoints: [[1, 1], [1.5, 0.9], [2.5, 0.76], [3.5, 0.6], [4, 0.5]],
            words: ${words},
            grades: ${DE_GRADES}
          }
        },
        conversions: (function () {
          // Modifizierte bayerische Formel: x = 1 + 3 × (Nmax − Nd) ÷ (Nmax − Nmin)
          function bavarian(nmax, nmin, label, example) {
            return {
              max: nmax, label: label, example: example,
              formula: 'Deutsche Note = 1 + 3 × (beste Note − deine Note) ÷ (beste Note − schlechteste bestandene Note)',
              note: 'Modifizierte bayerische Formel (KMK-Empfehlung). Das Ergebnis wird nach der ersten Nachkommastelle abgeschnitten. Es ist nur ein Richtwert; die offizielle Umrechnung macht die Hochschule, bei der du dich bewirbst.',
              result: function (c) {
                if (c < nmin) return { pct: 0, ratio: 0, text: 'Nicht bestanden', work: c.toFixed(2) + ' liegt unter der schlechtesten bestandenen Note ' + nmin.toFixed(2) };
                var x = 1 + 3 * (nmax - c) / (nmax - nmin);
                var g = Math.floor(Math.max(1, x) * 10 + 1e-9) / 10;
                return { pct: (4 - g) / 3 * 100, ratio: 1 - (g - 1) / 6, text: g.toFixed(1),
                  work: '1 + 3 × (' + nmax + ' − ' + c.toFixed(2) + ') ÷ (' + nmax + ' − ' + nmin + ') = ' + x.toFixed(3) + ' → ' + g.toFixed(1),
                  sub: 'Deutsche Note (1.0 = beste, 4.0 = schlechteste bestandene Note)' };
              }
            };
          }
          return {
            b41: bavarian(4, 1, '4.0-Skala, bestanden ab 1.0', 3.2),
            b42: bavarian(4, 2, '4.0-Skala, bestanden ab 2.0', 3.2),
            b104: bavarian(10, 4, '10-Punkte-Skala, bestanden ab 4.0', 8),
            b10040: bavarian(100, 40, 'Prozent, bestanden ab 40 %', 75)
          };
        })()
      }`;

const DE_MODE_SWITCH = `
            <div class="segmented" id="modeSwitch" role="radiogroup" aria-label="Wie möchtest du deine Ergebnisse eingeben?">
              <input type="radio" name="gpaMode" id="modeGrade" value="grade" checked>
              <label for="modeGrade">Note</label>
              <input type="radio" name="gpaMode" id="modePoints" value="points">
              <label for="modePoints">Genaue Note</label>
            </div>`;

const DE_CONV_SCALE = `
            <div class="field">
              <span class="field-label always" id="convScaleLabel">Notensystem im Ausland</span>
              <div class="segmented full conv-wrap" role="radiogroup" aria-labelledby="convScaleLabel">
                <input type="radio" name="convScale" id="convb41" value="b41" checked>
                <label for="convb41">4.0 · ab 1.0</label>
                <input type="radio" name="convScale" id="convb42" value="b42">
                <label for="convb42">4.0 · ab 2.0</label>
                <input type="radio" name="convScale" id="convb104" value="b104">
                <label for="convb104">10 · ab 4.0</label>
                <input type="radio" name="convScale" id="convb10040" value="b10040">
                <label for="convb10040">% · ab 40</label>
              </div>
            </div>`;

// The calculator markup comes from the English home page; these parts are reworded for German grades
const DE_LAYOUT = [
  ['GPA <small>One semester</small>', 'Schnitt <small>Module</small>'],
  ['CGPA <small>All semesters</small>', 'Gesamt <small>Alle Semester</small>'],
  ['Target <small>Plan ahead</small>', 'Ziel <small>Vorausplanen</small>'],
  ['Percentage <small>Converter</small>', 'Bayerische Formel <small>Umrechnung</small>'],
  ['<h2>Semester GPA</h2>', '<h2>Notendurchschnitt</h2>'],
  ['Add each subject with its credit hours and grade.', 'Trage jedes benotete Modul mit seinen ECTS-Punkten und seiner Note ein.'],
  ['<span>Subject (optional)</span><span>Credits</span>', '<span>Modul (optional)</span><span>ECTS</span>'],
  ['Your semester GPA', 'Dein Notendurchschnitt'],
  ['            Add subject\n', '            Modul hinzufügen\n'],
  ['Add this GPA to my CGPA →', 'Diesen Schnitt zur Gesamtnote hinzufügen →'],
  ['<h2>Overall CGPA</h2>', '<h2>Gesamtnote</h2>'],
  ["Add each semester's GPA (SGPA) and its total credit hours.", 'Trage für jedes Semester den Notendurchschnitt und die ECTS-Punkte ein.'],
  ['<span>Semester</span><span>GPA / SGPA</span><span>Credit hours</span>', '<span>Semester</span><span>Durchschnitt</span><span>ECTS</span>'],
  ['            Add semester\n', '            Semester hinzufügen\n'],
  ['<div class="result-label">Your CGPA</div>', '<div class="result-label">Deine Gesamtnote</div>'],
  ['<button type="button" id="sendToPct" class="btn btn-soft">', '<button type="button" id="sendToPct" class="btn btn-soft" hidden>'],
  ['<h2>Target CGPA</h2>', '<h2>Zielnote</h2>'],
  ['Find out what GPA you need in your coming semesters to reach your goal.', 'Finde heraus, welchen Durchschnitt du in deinen restlichen Modulen brauchst, um deine Zielnote zu erreichen.'],
  ['<label class="field-label" for="tCurrent">Current CGPA</label>', '<label class="field-label" for="tCurrent">Aktueller Durchschnitt</label>'],
  ['<label class="field-label" for="tDone">Credits completed</label>', '<label class="field-label" for="tDone">ECTS geschafft</label>'],
  ['<label class="field-label" for="tTarget">Target CGPA</label>', '<label class="field-label" for="tTarget">Zieldurchschnitt</label>'],
  ['<label class="field-label" for="tLeft">Credits remaining</label>', '<label class="field-label" for="tLeft">ECTS übrig</label>'],
  ['GPA you need each semester', 'Nötiger Durchschnitt ab jetzt'],
  ['<h2>CGPA to percentage</h2>', '<h2>Ausländische Note in deutsche Note</h2>'],
  ['Type your CGPA and choose its scale.', 'Gib deine Note aus dem Ausland ein (zum Beispiel deinen CGPA) und wähle das Notensystem.'],
  ['<label class="field-label always" for="convInput">Your CGPA</label>', '<label class="field-label always" for="convInput">Deine Note im Ausland</label>'],
  ['<div class="result-label">Percentage</div>', '<div class="result-label">Deutsche Note</div>'],
  ['<button type="button" id="useMyCgpa" class="btn btn-quiet btn-inline">', '<button type="button" id="useMyCgpa" class="btn btn-quiet btn-inline" hidden>'],
  ['<th scope="col" class="num">Points</th>', '<th scope="col" class="num">Wert</th>']
];

const deHowto = (rule) => [`
          <details class="howto">
            <summary>Wie wird der Notendurchschnitt berechnet?</summary>
            <p class="formula-line">Durchschnitt = (Σ ECTS × Note) ÷ (Σ ECTS)</p>
            <p class="muted small">Beispiel: ein Modul mit 6 ECTS und 1.3 und ein Modul mit 9 ECTS und 2.7 →
              (6×1.3 + 9×2.7) ÷ 15 = 32.1 ÷ 15 = 2.14. ${rule}</p>
          </details>`, null, `
          <details class="howto">
            <summary>Wie wird das berechnet?</summary>
            <p class="formula-line">Nötiger Durchschnitt = (Ziel × ECTS gesamt − aktueller Schnitt × geschaffte ECTS) ÷ restliche ECTS</p>
            <p class="muted small">Beispiel: Schnitt 2.4 nach 90 ECTS, Ziel 2.0, noch 90 ECTS →
              (2.0 × 180 − 2.4 × 90) ÷ 90 = <strong>1.60</strong> oder besser</p>
          </details>`];

const bavarianSection = (uni) => `
      <section id="bavarian">
        <h2>Abschluss aus dem Ausland? Die modifizierte bayerische Formel</h2>
        <p>Wer seinen Bachelor zum Beispiel in Pakistan, Indien oder Bangladesch gemacht hat, bekommt für die Bewerbung an der ${uni} eine umgerechnete deutsche Note. Deutsche Hochschulen verwenden dafür in der Regel die modifizierte bayerische Formel, die die Kultusministerkonferenz (KMK) empfiehlt:</p>
        <p class="formula-block">Deutsche Note = 1 + 3 × (Nmax − Nd) ÷ (Nmax − Nmin)</p>
        <p>Nmax ist die beste Note deines Systems, Nmin die schlechteste bestandene Note und Nd deine eigene Note. Ein CGPA von 3.20 auf einer 4.0-Skala, bei der man ab 2.0 besteht, ergibt 1 + 3 × (4 − 3.2) ÷ (4 − 2) = 2.2. Liegt die Bestehensgrenze bei 1.0, ergibt derselbe CGPA 1 + 3 × 0.8 ÷ 3 = 1.8. Die richtige Bestehensgrenze ist also entscheidend; prüfe dein Transcript oder deine Studienordnung. Der Tab „Bayerische Formel“ rechnet das für vier gängige Notensysteme aus.</p>
      </section>`;

const DE_FACTS_TITLE = '{short}: Das Wichtigste';

module.exports = {
  lang: 'de',
  ui: {
    facts: DE_FACTS_TITLE,
    faq: '{short} Notenrechner: Häufige Fragen',
    checked: 'Zuletzt geprüft: 22. Oktober 2026. Prüfungsordnungen können sich ändern; gleiche dein Ergebnis immer mit der aktuellen Prüfungsordnung deines Studiengangs ab. Siehe auch unsere <a href="terms.html">Nutzungsbedingungen</a>.'
  },
  home: {
    heading: 'Deutschland',
    slugs: ['tum-cgpa-calculator', 'lmu-cgpa-calculator', 'heidelberg-cgpa-calculator', 'rwth-aachen-cgpa-calculator', 'kit-cgpa-calculator']
  },
  universities: [
    {
      slug: 'tum-cgpa-calculator',
      short: 'TUM',
      name: 'TUM Notenrechner: Notendurchschnitt und Gesamtnote',
      title: 'TUM Notenrechner – Notendurchschnitt nach APSO + bayerische Formel',
      desc: 'Berechne deinen Notendurchschnitt an der TU München nach ECTS gewichtet, mit einer Nachkommastelle ohne Rundung (APSO), und rechne ausländische Noten um.',
      lead: 'Berechne deinen Notendurchschnitt und deine Gesamtnote an der Technischen Universität München so, wie es die APSO vorschreibt: nach ECTS gewichtet und nach der ersten Nachkommastelle abgeschnitten. Dazu die bayerische Formel für Noten aus dem Ausland.',
      guideLink: 'So funktioniert die Notenberechnung an der TUM',
      card: '1 Nachkommastelle · Auszeichnung bis 1.2',
      scaleCard: {
        title: 'Notensystem: TUM (deutsche Noten 1.0 bis 4.0)',
        text: 'Wähle für jedes Modul die Note oder wechsle zu „Genaue Note“, um Modulnoten wie 1.5 einzutippen. Kleinere Zahlen sind besser.'
      },
      config: deConfig('cgpa-tum', 'Notenskala TUM', 1, DE_WORDS_TUM),
      modeSwitch: DE_MODE_SWITCH,
      convScale: DE_CONV_SCALE,
      layoutReplace: DE_LAYOUT,
      howto: deHowto('An der TUM bleibt eine Nachkommastelle ohne Rundung: <strong>2.1</strong>.'),
      facts: [
        'Deutsche Noten: <strong>1.0 ist die beste</strong>, <strong>4.0 die schlechteste bestandene Note</strong>; 4.3, 4.7 und 5.0 sind nicht bestanden.',
        'Die Gesamtnote ist nach <strong>ECTS-Punkten gewichtet</strong>, die Abschlussarbeit eingeschlossen.',
        'Eine Gesamtnote <strong>bis 1.2</strong> bedeutet <strong>„mit Auszeichnung bestanden“</strong>.',
        'Bei Durchschnitten zählt nur die <strong>erste Nachkommastelle</strong>: 2.19 wird zu 2.1.'
      ],
      article: () => `
      <section id="how-it-works">
        <h2>So funktioniert die Notengebung an der TUM</h2>
        <p>Die Allgemeine Prüfungs- und Studienordnung der Technischen Universität München (APSO) verwendet die übliche deutsche Notenskala von 1 bis 5. Prüferinnen und Prüfer können eine Note um 0.3 anheben oder absenken; die Werte 0.7 und 5.3 gibt es nicht. Möglich sind also 1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0, 4.3, 4.7 und 5.0. Alles schlechter als 4.0 ist nicht bestanden.</p>
        <p>Wenn mehrere Noten zu einem Durchschnitt zusammengefasst werden, zum Beispiel Teilprüfungen eines Moduls oder alle Module zur Gesamtnote, bleibt nach der APSO <strong>nur die erste Nachkommastelle stehen, alle weiteren werden ohne Rundung gestrichen</strong>. 2.14 und 2.19 werden also beide zu 2.1. Genau so zeigt dieser Rechner TUM-Durchschnitte an.</p>
      </section>

      <section id="grade-points">
        <h2>Die Gesamtnote an der TUM</h2>
        <p>Die Gesamtnote ist der gewichtete Durchschnitt aller Module einschließlich der Abschlussarbeit. Jedes Modul zählt mit seinen ECTS-Punkten. Die Fachprüfungs- und Studienordnung (FPSO) deines Studiengangs kann andere Gewichte festlegen oder zum Beispiel die Grundlagen- und Orientierungsprüfung herausnehmen, prüfe also auch deine FPSO. Module, die nur als Studienleistung ohne Note bestanden werden, zählen nicht.</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Gesamtnote</th><th scope="col">Gesamturteil</th></tr></thead>
            <tbody>
              <tr><td>bis 1.2</td><td>mit Auszeichnung bestanden</td></tr>
              <tr><td>1.3 – 1.5</td><td>sehr gut bestanden</td></tr>
              <tr><td>1.6 – 2.5</td><td>gut bestanden</td></tr>
              <tr><td>2.6 – 3.5</td><td>befriedigend bestanden</td></tr>
              <tr><td>3.6 – 4.0</td><td>bestanden</td></tr>
            </tbody>
          </table>
        </div>
        <p>Hast du mehr Wahlmodule bestanden als nötig, legst du gegenüber dem Prüfungsausschuss fest, welche zählen; sonst werden die besten Ergebnisse herangezogen. Manche FPSO erlauben außerdem, eine bestandene Modulprüfung einmal zur Notenverbesserung zu wiederholen; dann zählt das bessere Ergebnis.</p>
      </section>

      <section id="example">
        <h2>Beispielrechnung: Notendurchschnitt an der TUM</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Modul</th><th scope="col" class="num">ECTS</th><th scope="col" class="num">Note</th><th scope="col" class="num">ECTS × Note</th></tr></thead>
            <tbody>
              <tr><td>Analysis 1</td><td class="num">9</td><td class="num">2.3</td><td class="num">20.7</td></tr>
              <tr><td>Einführung in die Informatik</td><td class="num">6</td><td class="num">1.3</td><td class="num">7.8</td></tr>
              <tr><td>Diskrete Strukturen</td><td class="num">8</td><td class="num">1.7</td><td class="num">13.6</td></tr>
              <tr><td>Einführung in die Rechnerarchitektur</td><td class="num">8</td><td class="num">2.7</td><td class="num">21.6</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Summe</th><td class="num">31</td><td></td><td class="num">63.7</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">63.7 ÷ 31 = 2.054… → 2.0 (eine Nachkommastelle, ohne Rundung)</p>
        <p>Kaufmännisch gerundet wären es 2.1; an der TUM bleibt es dagegen bei 2.0, weil die weiteren Stellen einfach gestrichen werden. Gerade an den Grenzen 1.5, 2.5 und 3.5 entscheidet dieses Abschneiden über das Gesamturteil.</p>
      </section>
${bavarianSection('TUM')}`,
      sources: [
        ['TUM: Allgemeine Prüfungs- und Studienordnung (APSO) vom 18. März 2011, Lesefassung mit 4. Änderungssatzung vom 3. Juni 2020, §§ 16 und 17', 'https://portal.mytum.de/archiv/kompendium_rechtsangelegenheiten/apso/Lesb-F-APSO-vom-18-03-2011-mit-4-AeS-vom-03-06-20.pdf'],
        ['TUM: Notenumrechnung mit der Bayerischen Formel', 'https://www.tum.de/studium/bewerbung/infoportal-bewerbung/bayerische-formel']
      ],
      faq: [
        ['Ist 1.0 die beste Note an der TUM?', 'Ja. Deutsche Noten reichen von 1.0 (beste Note) bis 4.0 (schlechteste bestandene Note). 4.3, 4.7 und 5.0 bedeuten nicht bestanden.'],
        ['Wie wird die Gesamtnote an der TUM berechnet?', 'Als gewichteter Durchschnitt aller Module einschließlich der Abschlussarbeit, wobei jedes Modul mit seinen ECTS-Punkten zählt. Deine FPSO kann andere Gewichte festlegen.'],
        ['Rundet die TUM den Notendurchschnitt?', 'Nein. Nach der APSO bleibt nur die erste Nachkommastelle stehen, der Rest wird ohne Rundung gestrichen. 2.19 wird also zu 2.1.'],
        ['Ab welcher Note gibt es „mit Auszeichnung“ an der TUM?', 'Bei einer Gesamtnote bis 1.2. 1.3 bis 1.5 ist „sehr gut“, 1.6 bis 2.5 „gut“, 2.6 bis 3.5 „befriedigend“ und 3.6 bis 4.0 „bestanden“.'],
        ['Wie rechnet die TUM meinen CGPA aus dem Ausland um?', 'Mit der modifizierten bayerischen Formel: 1 + 3 × (beste Note − deine Note) ÷ (beste Note − schlechteste bestandene Note). Die TUM behält eine Nachkommastelle und rundet nicht.']
      ]
    },

    {
      slug: 'lmu-cgpa-calculator',
      short: 'LMU',
      name: 'LMU Notenrechner: Endnote mit zwei Nachkommastellen',
      title: 'LMU Notenrechner – Endnote nach ECTS gewichtet (2 Nachkommastellen)',
      desc: 'Berechne deine Endnote an der LMU München als ECTS-gewichteten Durchschnitt mit zwei Nachkommastellen ohne Rundung, wie es die Prüfungsordnung vorsieht.',
      lead: 'Berechne deine Endnote an der Ludwig-Maximilians-Universität München als nach ECTS gewichteten Durchschnitt. Anders als an vielen Hochschulen zählen an der LMU zwei Nachkommastellen, ebenfalls ohne Rundung.',
      guideLink: 'So funktioniert die Notenberechnung an der LMU',
      card: 'ECTS-gewichtet · 2 Nachkommastellen',
      scaleCard: {
        title: 'Notensystem: LMU München (deutsche Noten 1.0 bis 4.0)',
        text: 'Wähle für jedes Modul die Note oder wechsle zu „Genaue Note“, um eine Modulnote wie 1.85 einzutippen. Kleinere Zahlen sind besser.'
      },
      config: deConfig('cgpa-lmu', 'Notenskala LMU', 2, DE_WORDS),
      modeSwitch: DE_MODE_SWITCH,
      convScale: DE_CONV_SCALE,
      layoutReplace: DE_LAYOUT,
      howto: deHowto('An der LMU bleiben zwei Nachkommastellen ohne Rundung: <strong>2.14</strong>.'),
      facts: [
        'Mögliche Noten: 1.0, 1.3, 1.7 … 4.0 und 5.0; <strong>0.7, 4.3, 4.7 und 5.3 gibt es nicht</strong>.',
        'Die Endnote ist ein <strong>nach ECTS gewichteter Durchschnitt</strong> der Modulnoten.',
        'Es zählen <strong>zwei Nachkommastellen</strong> ohne Rundung: <strong>bis 1.50 ist „sehr gut“</strong>.',
        'Wer mehr als 180 ECTS hat, bekommt nur die <strong>erforderlichen 180 ECTS</strong> angerechnet.'
      ],
      article: () => `
      <section id="how-it-works">
        <h2>So funktioniert die Notengebung an der LMU</h2>
        <p>Die Ludwig-Maximilians-Universität München bewertet Prüfungen von 1 (sehr gut) bis 5 (nicht ausreichend). Durch Erhöhen oder Absenken um 0.3 entstehen Zwischenwerte, wobei 0.7, 4.3, 4.7 und 5.3 ausgeschlossen sind. Möglich sind also 1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0 und 5.0.</p>
        <p>Jeder LMU-Studiengang hat eine eigene Prüfungs- und Studienordnung (PStO). Die Regeln auf dieser Seite stammen aus der PStO für den Bachelor Volkswirtschaftslehre (2013); die meisten LMU-Studiengänge folgen demselben Muster, trotzdem solltest du die PStO deines eigenen Studiengangs prüfen.</p>
      </section>

      <section id="grade-points">
        <h2>Die Endnote an der LMU</h2>
        <p>Die Modulnoten werden zur Endnote zusammengefasst, als arithmetisches Mittel gewichtet nach ECTS-Punkten (oder nach den Gewichten im Anhang deiner PStO). <strong>Dabei werden nur die ersten beiden Nachkommastellen berücksichtigt, ohne Rundung</strong>: 1.519 wird zu 1.51. Wer mehr als die für den Bachelor nötigen 180 ECTS erwirbt, bekommt nur die 180 erforderlichen Punkte in die Endnote eingerechnet.</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Durchschnitt</th><th scope="col">Note</th></tr></thead>
            <tbody>
              <tr><td>bis 1.50</td><td>sehr gut</td></tr>
              <tr><td>1.51 – 2.50</td><td>gut</td></tr>
              <tr><td>2.51 – 3.50</td><td>befriedigend</td></tr>
              <tr><td>3.51 – 4.00</td><td>ausreichend</td></tr>
            </tbody>
          </table>
        </div>
        <p>Weil zwei Nachkommastellen zählen, ist ein Durchschnitt von 1.509 noch 1.50 und damit „sehr gut“, während 1.51 schon „gut“ ist. An einer Hochschule mit nur einer Nachkommastelle wäre beides 1.5.</p>
      </section>

      <section id="example">
        <h2>Beispielrechnung: Endnote an der LMU</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Modul</th><th scope="col" class="num">ECTS</th><th scope="col" class="num">Note</th><th scope="col" class="num">ECTS × Note</th></tr></thead>
            <tbody>
              <tr><td>Mikroökonomik</td><td class="num">9</td><td class="num">1.7</td><td class="num">15.3</td></tr>
              <tr><td>Mathematik für Ökonomen</td><td class="num">9</td><td class="num">2.3</td><td class="num">20.7</td></tr>
              <tr><td>Statistik</td><td class="num">6</td><td class="num">1.3</td><td class="num">7.8</td></tr>
              <tr><td>Buchführung</td><td class="num">6</td><td class="num">2.0</td><td class="num">12.0</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Summe</th><td class="num">30</td><td></td><td class="num">55.8</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">55.8 ÷ 30 = 1.86 → „gut“</p>
        <p>Tippe die Module im Tab „Schnitt“ ein; der Rechner zeigt das Ergebnis wie die LMU mit zwei Nachkommastellen ohne Rundung.</p>
      </section>
${bavarianSection('LMU')}`,
      sources: [
        ['LMU München: Prüfungs- und Studienordnung für den Bachelorstudiengang Volkswirtschaftslehre (2013), §§ 10 und 21', 'https://cms-cdn.lmu.de/media/50-zentren/isc-informations-und-servicecenter-wirtschaftswissenschaftliche-pruefungen/downloads/volkswirtschaftliche-studiengaenge/bachelor-vwl-psto-2013-pruefungs-und-studienordnung.pdf']
      ],
      faq: [
        ['Welche Noten gibt es an der LMU?', '1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0 und 5.0. Die Werte 0.7, 4.3, 4.7 und 5.3 sind ausgeschlossen. 5.0 bedeutet nicht bestanden.'],
        ['Wie wird die Endnote an der LMU berechnet?', 'Als arithmetisches Mittel der Modulnoten, gewichtet nach ECTS-Punkten oder nach den Gewichten deiner PStO. Es zählen nur die ersten beiden Nachkommastellen.'],
        ['Rundet die LMU die Endnote?', 'Nein. Nur die ersten beiden Nachkommastellen bleiben stehen, der Rest wird gestrichen. 1.519 wird also zu 1.51.'],
        ['Welcher Durchschnitt ist an der LMU „sehr gut“?', 'Bis einschließlich 1.50. 1.51 bis 2.50 ist „gut“, 2.51 bis 3.50 „befriedigend“ und 3.51 bis 4.00 „ausreichend“.'],
        ['Zählen alle meine ECTS in die LMU-Endnote?', 'Wer mehr als die für den Bachelor nötigen 180 ECTS erwirbt, bekommt laut PStO nur die 180 erforderlichen Punkte in die Endnote eingerechnet.']
      ]
    },

    {
      slug: 'heidelberg-cgpa-calculator',
      short: 'Heidelberg',
      name: 'Uni Heidelberg Notenrechner: Endnote 70 % Module + 30 % Abschlussarbeit',
      title: 'Uni Heidelberg Notenrechner – Endnote 70/30 (B.Sc. Informatik)',
      desc: 'Berechne deine Endnote an der Universität Heidelberg: Modulnoten nach Leistungspunkten gewichtet, 70 % Module und 30 % Bachelorarbeit, eine Nachkommastelle.',
      lead: 'Berechne deinen Notendurchschnitt an der Ruprecht-Karls-Universität Heidelberg nach Leistungspunkten (LP) und deine Bachelor-Endnote, die im Fach Informatik zu 70 % aus den Modulen und zu 30 % aus Bachelorarbeit und Kolloquium besteht.',
      guideLink: 'So funktioniert die Notenberechnung in Heidelberg',
      card: '70 % Module + 30 % Arbeit · 1 Nachkommastelle',
      scaleCard: {
        title: 'Notensystem: Universität Heidelberg (deutsche Noten)',
        text: 'Wähle für jedes Modul die Note oder wechsle zu „Genaue Note“, um eine Modulnote wie 1.5 einzutippen. Gewichte jedes Modul mit seinen Leistungspunkten (LP).'
      },
      config: deConfig('cgpa-heidelberg', 'Notenskala Heidelberg', 1, DE_WORDS, "periodLabel: 'Teil {n}', semCreditLabel: 'Gewicht', semCreditExample: 70,"),
      modeSwitch: DE_MODE_SWITCH,
      convScale: DE_CONV_SCALE,
      layoutReplace: [
        ...DE_LAYOUT.filter(([from]) => from !== "Add each semester's GPA (SGPA) and its total credit hours." && !from.startsWith('<span>Semester</span>')),
        ["Add each semester's GPA (SGPA) and its total credit hours.", 'Trage deinen Modulschnitt und die Note der Bachelorarbeit mit den Gewichten 70 und 30 ein (oder jedes Semester mit seinen LP).'],
        ['<span>Semester</span><span>GPA / SGPA</span><span>Credit hours</span>', '<span>Teil</span><span>Durchschnitt</span><span>Gewicht</span>']
      ],
      howto: [
        ...deHowto('In Heidelberg bleibt eine Nachkommastelle ohne Rundung: <strong>2.1</strong>.').slice(0, 1),
        `
          <details class="howto">
            <summary>Wie wird die Endnote berechnet?</summary>
            <p class="formula-line">Endnote = 70 % × Modulschnitt + 30 % × Bachelorarbeit und Kolloquium</p>
            <p class="muted small">Beispiel: Modulschnitt 1.9 (Gewicht 70) und Bachelorarbeit 1.3 (Gewicht 30) →
              (70×1.9 + 30×1.3) ÷ 100 = 1.72 → <strong>1.7</strong></p>
          </details>`,
        ...deHowto('').slice(2)
      ],
      facts: [
        'Im B.Sc. Informatik zählt die Endnote zu <strong>70 % aus den Modulen</strong> und zu <strong>30 % aus Bachelorarbeit und Kolloquium</strong>.',
        'Es zählt nur die <strong>erste Nachkommastelle</strong> ohne Rundung: 1.79 wird zu 1.7.',
        'Eine Endnote von genau <strong>1.0</strong> bringt das Prädikat <strong>„mit Auszeichnung“</strong>.',
        'Auf Antrag können bis zu <strong>zwei Pflichtmodule</strong> aus dem Modulschnitt herausgenommen werden.'
      ],
      article: () => `
      <section id="how-it-works">
        <h2>So funktioniert die Notengebung in Heidelberg</h2>
        <p>Die Ruprecht-Karls-Universität Heidelberg bewertet jede Prüfungsleistung von 1 (sehr gut) bis 5 (nicht ausreichend), mit Zwischenschritten von 0.3: 1.0, 1.3, 1.7, 2.0 und so weiter. Die Werte 0.7, 4.3, 4.7 und 5.3 werden nicht vergeben. Besteht ein Modul aus mehreren Teilen, ist die Modulnote der nach Leistungspunkten (LP) gewichtete Durchschnitt der Teilnoten, sofern das Modulhandbuch nichts anderes sagt.</p>
        <p>Für Modulnoten, Fachnoten und die Endnote gilt: <strong>Es zählt nur die erste Nachkommastelle, alle weiteren werden ohne Rundung gestrichen</strong>. 1.79 wird also zu 1.7.</p>
      </section>

      <section id="grade-points">
        <h2>Die Endnote im B.Sc. Informatik</h2>
        <p>Jeder Heidelberger Studiengang hat eine eigene Studien- und Prüfungsordnung. In der Prüfungsordnung für den Bachelor Informatik von 2015 (geändert 2021 und 2022) setzt sich die Endnote eines Ein-Fach-Bachelors aus zwei Teilen zusammen:</p>
        <ul>
          <li><strong>70 %</strong>: der nach LP gewichtete Durchschnitt deiner Modulnoten. Auf Antrag können bis zu zwei Pflichtmodule (nicht aber Bachelorarbeit oder Kolloquium) aus diesem Durchschnitt herausgenommen werden.</li>
          <li><strong>30 %</strong>: der nach LP gewichtete Durchschnitt aus Bachelorarbeit und Bachelorkolloquium.</li>
        </ul>
        <p>Bei einem 50-%-Fächerverbund mit Informatik als erstem Hauptfach zählen 35 % Informatik, 35 % das zweite Hauptfach und 30 % die Bachelorarbeit. Ein Gesamtdurchschnitt von genau 1.0 bringt das Prädikat „mit Auszeichnung“.</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Durchschnitt</th><th scope="col">Note</th></tr></thead>
            <tbody>
              <tr><td>bis 1.5</td><td>sehr gut</td></tr>
              <tr><td>1.6 – 2.5</td><td>gut</td></tr>
              <tr><td>2.6 – 3.5</td><td>befriedigend</td></tr>
              <tr><td>3.6 – 4.0</td><td>ausreichend</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="example">
        <h2>Beispielrechnung</h2>
        <p>Angenommen, dein nach LP gewichteter Modulschnitt liegt bei 1.94 (zählt als 1.9) und Bachelorarbeit und Kolloquium ergeben zusammen 1.3. Trage beides im Tab „Gesamt“ mit den Gewichten 70 und 30 ein:</p>
        <p class="formula-block">(70 × 1.9 + 30 × 1.3) ÷ 100 = 1.72 → 1.7, „gut“</p>
        <p>Berechne zuerst im Tab „Schnitt“ deinen Modulschnitt aus allen Modulnoten und Leistungspunkten. Danach machst du im Tab „Gesamt“ den 70/30-Schritt. Ohne die Abschnittsregel wäre die Endnote 1.72, an der Universität Heidelberg steht im Zeugnis 1.7.</p>
      </section>
${bavarianSection('Universität Heidelberg')}`,
      sources: [
        ['Universität Heidelberg: Prüfungsordnung für den Bachelorstudiengang Informatik vom 26. März 2015, geändert am 29. September 2021 und 5. Oktober 2022, §§ 13 und 14', 'https://mu.ifi.uni-heidelberg.de/c/image/f/default/pdfs/po_mhb_zula/BSc-PO-Informatik-aktuell.pdf']
      ],
      faq: [
        ['Wie wird die Endnote im Heidelberger B.Sc. Informatik berechnet?', '70 % kommen aus dem nach Leistungspunkten gewichteten Durchschnitt der Modulnoten und 30 % aus dem gewichteten Durchschnitt von Bachelorarbeit und Kolloquium.'],
        ['Rundet die Universität Heidelberg Noten?', 'Nein. Bei Modulnoten, Fachnoten und der Endnote zählt nur die erste Nachkommastelle, der Rest wird gestrichen. 1.79 wird also zu 1.7.'],
        ['Kann ich in Heidelberg Module aus der Note streichen?', 'Im B.Sc. Informatik kannst du beantragen, bis zu zwei Pflichtmodule aus dem Modulschnitt herauszunehmen. Bachelorarbeit und Kolloquium zählen immer.'],
        ['Ab wann gibt es „mit Auszeichnung“ in Heidelberg?', 'Im B.Sc. Informatik bei einem Gesamtdurchschnitt von genau 1.0.'],
        ['Welche Noten werden in Heidelberg vergeben?', '1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0 und 5.0. Die Werte 0.7, 4.3, 4.7 und 5.3 sind ausgeschlossen.']
      ]
    },

    {
      slug: 'rwth-aachen-cgpa-calculator',
      short: 'RWTH',
      name: 'RWTH Aachen Notenrechner: Gesamtnote nach ÜPO',
      title: 'RWTH Aachen Notenrechner – Gesamtnote nach CP gewichtet (ÜPO)',
      desc: 'Berechne deine Gesamtnote an der RWTH Aachen nach der Übergreifenden Prüfungsordnung: nach CP gewichtet, eine Nachkommastelle ohne Rundung, mit Notenstreichung.',
      lead: 'Berechne deine Gesamtnote an der RWTH Aachen so, wie es die Übergreifende Prüfungsordnung (ÜPO) vorschreibt: alle benoteten Module samt Bachelorarbeit nach Credit Points (CP) gewichtet und nach der ersten Nachkommastelle abgeschnitten.',
      guideLink: 'So funktioniert die Notenberechnung an der RWTH',
      card: 'CP-gewichtet · Streichung bis 30 CP',
      scaleCard: {
        title: 'Notensystem: RWTH Aachen (deutsche Noten 1.0 bis 4.0)',
        text: 'Wähle für jedes Modul die Note oder wechsle zu „Genaue Note“. Trage bei jedem Modul die Credit Points (CP) aus dem Modulhandbuch ein; die Bachelorarbeit gehört dazu.'
      },
      config: deConfig('cgpa-rwth', 'Notenskala RWTH', 1, DE_WORDS, "creditLabel: 'CP', semCreditLabel: 'CP',"),
      modeSwitch: DE_MODE_SWITCH,
      convScale: DE_CONV_SCALE,
      layoutReplace: DE_LAYOUT,
      howto: deHowto('An der RWTH bleibt eine Nachkommastelle ohne Rundung: <strong>2.1</strong>.'),
      facts: [
        'Die Gesamtnote ist nach <strong>Credit Points (CP) gewichtet</strong>, die Bachelorarbeit eingeschlossen.',
        'Es zählt nur die <strong>erste Nachkommastelle</strong>; eine Rundung erfolgt nicht.',
        'Wer in der Regelstudienzeit fertig wird, kann <strong>Modulnoten im Umfang von 5 bis 30 CP streichen</strong> lassen.',
        '<strong>„Mit Auszeichnung“</strong>: Bachelorarbeit 1.0 und Gesamtnote nicht schlechter als <strong>1.3</strong>.'
      ],
      article: () => `
      <section id="how-it-works">
        <h2>So funktioniert die Notengebung an der RWTH Aachen</h2>
        <p>An der RWTH Aachen gilt für alle Bachelor- und Masterstudiengänge (außer Lehramt) die Übergreifende Prüfungsordnung (ÜPO); jeder Studiengang hat dazu eine eigene studiengangspezifische Prüfungsordnung. Prüfungsleistungen werden von 1 (sehr gut) bis 5 (nicht ausreichend) bewertet. Durch Erhöhen oder Absenken um 0.3 entstehen Zwischenwerte; die Noten 0.7, 4.3, 4.7 und 5.3 sind ausgeschlossen. Möglich sind also 1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0 und 5.0.</p>
        <p>Ein Modul ist bestanden, wenn das gewichtete Mittel aller zugehörigen Teilprüfungen mindestens „ausreichend“ (4.0) ist. Für jedes bestandene Modul bekommst du die Credit Points laut Modulhandbuch; ein CP entspricht etwa 30 Stunden Arbeitsaufwand.</p>
      </section>

      <section id="grade-points">
        <h2>Die Gesamtnote nach § 10 ÜPO</h2>
        <p>Die Gesamtnote wird aus den Noten der Module einschließlich des Moduls „Bachelorarbeit“ gebildet, wobei jede Note mit ihren CP gewichtet wird. In der Regel gehen die CP aller benoteten Module ein, die für den Abschluss erforderlich sind. Die studiengangspezifische Prüfungsordnung darf die Bachelorarbeit und einzelne Modulbereiche anders gewichten, prüfe also auch die Ordnung deines Studiengangs. <strong>Bei der Bildung der Noten und der Gesamtnote wird nur die erste Dezimalstelle berücksichtigt; alle weiteren werden gestrichen, eine Rundung erfolgt nicht.</strong></p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Durchschnitt</th><th scope="col">Gesamtnote</th></tr></thead>
            <tbody>
              <tr><td>bis 1.5</td><td>sehr gut</td></tr>
              <tr><td>1.6 – 2.5</td><td>gut</td></tr>
              <tr><td>2.6 – 3.5</td><td>befriedigend</td></tr>
              <tr><td>3.6 – 4.0</td><td>ausreichend</td></tr>
            </tbody>
          </table>
        </div>
        <p>Statt „sehr gut“ gibt es das Gesamturteil <strong>„mit Auszeichnung“</strong>, wenn die Bachelor- bzw. Masterarbeit mit 1.0 bewertet wurde und die Gesamtnote nicht schlechter als 1.3 ist.</p>
      </section>

      <section id="streichung">
        <h2>Notenstreichung bei Abschluss in der Regelstudienzeit</h2>
        <p>Schließt du alle Modulprüfungen eines Bachelorstudiengangs innerhalb der Regelstudienzeit ab, sieht die ÜPO vor, dass die Prüfungsordnung deines Studiengangs die <strong>Streichung von gewichteten Modulnoten im Umfang von mindestens 5 und höchstens 30 CP</strong> erlaubt (im Master höchstens 15 CP, falls vorgesehen). Du teilst dem Zentralen Prüfungsamt innerhalb einer Woche nach dem letzten Ergebnis mit, welche Noten gestrichen werden sollen. Die Note der Bachelorarbeit kann nicht gestrichen werden. Gestrichene Module stehen im Zeugnis als „bestanden“.</p>
        <p><strong>Tipp für den Rechner:</strong> Lass die Module, die du streichen möchtest, im Tab „Schnitt“ einfach weg. So siehst du sofort, wie sich die Gesamtnote verbessert.</p>
      </section>

      <section id="example">
        <h2>Beispielrechnung: Gesamtnote an der RWTH</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Modul</th><th scope="col" class="num">CP</th><th scope="col" class="num">Note</th><th scope="col" class="num">CP × Note</th></tr></thead>
            <tbody>
              <tr><td>Höhere Mathematik</td><td class="num">10</td><td class="num">1.7</td><td class="num">17.0</td></tr>
              <tr><td>Technische Mechanik</td><td class="num">8</td><td class="num">2.3</td><td class="num">18.4</td></tr>
              <tr><td>Informatik im Maschinenbau</td><td class="num">6</td><td class="num">1.3</td><td class="num">7.8</td></tr>
              <tr><td>Werkstoffkunde</td><td class="num">7</td><td class="num">2.7</td><td class="num">18.9</td></tr>
              <tr><td>Bachelorarbeit</td><td class="num">12</td><td class="num">1.3</td><td class="num">15.6</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Summe</th><td class="num">43</td><td></td><td class="num">77.7</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">77.7 ÷ 43 = 1.806… → 1.8 (eine Nachkommastelle, ohne Rundung)</p>
        <p>Streichst du Werkstoffkunde (7 CP) im Rahmen der Notenstreichung, ergibt sich (77.7 − 18.9) ÷ 36 = 1.633… → 1.6. Die CP-Werte im Beispiel sind frei gewählt; nimm für deine Rechnung die CP aus dem Modulhandbuch deines Studiengangs.</p>
      </section>
${bavarianSection('RWTH Aachen')}`,
      sources: [
        ['RWTH Aachen: Übergreifende Prüfungsordnung (ÜPO) für alle Bachelor- und Masterstudiengänge vom 03.11.2014 in der Fassung der zwanzigsten Änderungsordnung, Amtliche Bekanntmachung 2026/067 vom 23.04.2026, § 10', 'https://www.rwth-aachen.de/global/show_document.asp?id=aaaaaaaadljpmrq']
      ],
      faq: [
        ['Wie wird die Gesamtnote an der RWTH berechnet?', 'Aus den Noten aller benoteten Module einschließlich der Bachelorarbeit, jeweils mit ihren Credit Points gewichtet. Die Prüfungsordnung deines Studiengangs kann einzelne Bereiche anders gewichten.'],
        ['Rundet die RWTH die Gesamtnote?', 'Nein. Nach § 10 ÜPO zählt nur die erste Nachkommastelle, alle weiteren werden gestrichen. 1.89 wird also zu 1.8.'],
        ['Kann ich an der RWTH schlechte Noten streichen?', 'Ja, wenn du alle Modulprüfungen in der Regelstudienzeit abschließt: Im Bachelor können Modulnoten im Umfang von 5 bis 30 CP gestrichen werden. Die Note der Bachelorarbeit kann nicht gestrichen werden.'],
        ['Wann gibt es an der RWTH „mit Auszeichnung“?', 'Wenn die Bachelor- oder Masterarbeit mit 1.0 bewertet wurde und die Gesamtnote nicht schlechter als 1.3 ist.'],
        ['Welche Noten gibt es an der RWTH Aachen?', '1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0 und 5.0. Die Werte 0.7, 4.3, 4.7 und 5.3 sind ausgeschlossen.']
      ]
    },

    {
      slug: 'kit-cgpa-calculator',
      short: 'KIT',
      name: 'KIT Notenrechner: Gesamtnote mit doppelt gewichteter Bachelorarbeit',
      title: 'KIT Notenrechner – Gesamtnote B.Sc. Informatik (SPO 2022)',
      desc: 'Berechne deine Gesamtnote am Karlsruher Institut für Technologie: nach LP gewichtet, Bachelorarbeit doppelt, eine Nachkommastelle ohne Rundung (SPO 2022).',
      lead: 'Berechne deine Gesamtnote am Karlsruher Institut für Technologie (KIT) nach der Studien- und Prüfungsordnung für den Bachelor Informatik von 2022: Fachnoten nach Leistungspunkten (LP) gewichtet, die Bachelorarbeit zählt doppelt, und es bleibt eine Nachkommastelle ohne Rundung.',
      guideLink: 'So funktioniert die Notenberechnung am KIT',
      card: 'Bachelorarbeit doppelt · 1 Nachkommastelle',
      scaleCard: {
        title: 'Notensystem: KIT (deutsche Noten 1.0 bis 4.0)',
        text: 'Wähle für jedes Modul oder Fach die Note oder wechsle zu „Genaue Note“, um eine Fachnote wie 1.9 einzutippen. Trage das Modul Bachelorarbeit mit doppelten LP ein (2 × 15 = 30).'
      },
      config: deConfig('cgpa-kit', 'Notenskala KIT', 1, DE_WORDS, "creditLabel: 'LP', semCreditLabel: 'LP', maxCredit: 90,"),
      modeSwitch: DE_MODE_SWITCH,
      convScale: DE_CONV_SCALE,
      layoutReplace: DE_LAYOUT,
      howto: deHowto('Am KIT bleibt eine Nachkommastelle ohne Rundung: <strong>2.1</strong>.'),
      facts: [
        'Die Gesamtnote ist ein <strong>nach LP gewichteter Durchschnitt</strong> der Fachnoten und des Moduls Bachelorarbeit.',
        'Das Modul Bachelorarbeit (15 LP) zählt mit <strong>doppeltem Gewicht</strong>.',
        'Bei allen Durchschnitten zählt nur die <strong>erste Nachkommastelle</strong> ohne Rundung.',
        '<strong>„Mit Auszeichnung“</strong>: Bachelorarbeit 1.0, Schnitt <strong>1.2 oder besser</strong>, höchstens neun Semester.'
      ],
      article: () => `
      <section id="how-it-works">
        <h2>So funktioniert die Notengebung am KIT</h2>
        <p>Nach § 7 der Studien- und Prüfungsordnung (SPO) des KIT für den Bachelorstudiengang Informatik vom 10. Mai 2022 sind zur differenzierten Bewertung nur folgende Noten zugelassen: 1.0 und 1.3 (sehr gut), 1.7, 2.0 und 2.3 (gut), 2.7, 3.0 und 3.3 (befriedigend), 3.7 und 4.0 (ausreichend) sowie 5.0 (nicht ausreichend). Die Noten 4.3 und 4.7 gibt es am KIT also nicht. Eine Prüfungsleistung ist bestanden, wenn die Note mindestens 4.0 ist; Studienleistungen werden nur mit „bestanden“ oder „nicht bestanden“ gewertet.</p>
        <p>Eine Modulnote ergibt sich, wenn das Modulhandbuch nichts anderes regelt, aus dem nach Leistungspunkten der Teilmodule gewichteten Durchschnitt. Die Module eines Faches gehen mit ihren LP in die Fachnote ein. <strong>Bei allen gewichteten Durchschnitten (Modulnoten, Fachnoten und Gesamtnote) wird nur die erste Dezimalstelle berücksichtigt; alle weiteren Stellen werden ohne Rundung gestrichen.</strong></p>
      </section>

      <section id="grade-points">
        <h2>Die Gesamtnote nach § 21 SPO</h2>
        <p>Die Gesamtnote der Bachelorprüfung ist ein mit Leistungspunkten gewichteter Durchschnitt der Fachnoten und des Moduls Bachelorarbeit. <strong>Die Note des Moduls Bachelorarbeit zählt dabei doppelt.</strong> Dem Modul Bachelorarbeit sind 15 LP zugeordnet; im Rechner trägst du es deshalb mit 30 LP ein.</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Durchschnitt</th><th scope="col">Note</th></tr></thead>
            <tbody>
              <tr><td>bis 1.5</td><td>sehr gut</td></tr>
              <tr><td>1.6 – 2.5</td><td>gut</td></tr>
              <tr><td>2.6 – 3.5</td><td>befriedigend</td></tr>
              <tr><td>3.6 – 4.0</td><td>ausreichend</td></tr>
            </tbody>
          </table>
        </div>
        <p>Das Prädikat <strong>„mit Auszeichnung“</strong> bekommst du, wenn die Bachelorarbeit mit 1.0 bewertet wurde, der Gesamtdurchschnitt 1.2 oder besser ist und du das Studium in höchstens neun Semestern abgeschlossen hast. Über Ausnahmen entscheidet der Prüfungsausschuss auf Antrag.</p>
      </section>

      <section id="example">
        <h2>Beispielrechnung: Gesamtnote am KIT</h2>
        <p>Angenommen, deine Fachnoten und deine Bachelorarbeit sehen so aus (die LP der Fächer sind hier vereinfacht; nimm deine eigenen Werte aus dem Transcript):</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">Fach / Modul</th><th scope="col" class="num">LP</th><th scope="col" class="num">Note</th><th scope="col" class="num">LP × Note</th></tr></thead>
            <tbody>
              <tr><td>Fach A</td><td class="num">60</td><td class="num">2.3</td><td class="num">138.0</td></tr>
              <tr><td>Fach B</td><td class="num">50</td><td class="num">1.9</td><td class="num">95.0</td></tr>
              <tr><td>Fach C</td><td class="num">40</td><td class="num">2.0</td><td class="num">80.0</td></tr>
              <tr><td>Bachelorarbeit (15 LP, doppelt)</td><td class="num">30</td><td class="num">1.3</td><td class="num">39.0</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">Summe</th><td class="num">180</td><td></td><td class="num">352.0</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">352.0 ÷ 180 = 1.955… → 1.9, „gut“</p>
        <p>Ohne die doppelte Gewichtung der Bachelorarbeit wäre es (138 + 95 + 80 + 19.5) ÷ 165 = 2.015… → 2.0. Eine gute Bachelorarbeit bringt am KIT also spürbar mehr. Trage im Tab „Schnitt“ die Fachnoten im Modus „Genaue Note“ ein und die Bachelorarbeit mit 30 LP.</p>
      </section>
${bavarianSection('KIT')}`,
      sources: [
        ['KIT: Studien- und Prüfungsordnung für den Bachelorstudiengang Informatik, Amtliche Bekanntmachung 2022 Nr. 34 vom 10. Mai 2022, §§ 7 und 21', 'https://www.sle.kit.edu/downloads/AmtlicheBekanntmachungen/2022_AB_034.pdf']
      ],
      faq: [
        ['Wie wird die Gesamtnote am KIT berechnet?', 'Als nach Leistungspunkten gewichteter Durchschnitt der Fachnoten und des Moduls Bachelorarbeit, wobei die Bachelorarbeit doppelt zählt (SPO Informatik 2022, § 21).'],
        ['Zählt die Bachelorarbeit am KIT doppelt?', 'Ja. Das Modul Bachelorarbeit hat 15 LP und geht mit doppeltem Gewicht in die Gesamtnote ein. Im Rechner trägst du es deshalb mit 30 LP ein.'],
        ['Rundet das KIT die Noten?', 'Nein. Bei Modulnoten, Fachnoten und der Gesamtnote zählt nur die erste Nachkommastelle, alle weiteren werden ohne Rundung gestrichen.'],
        ['Wann gibt es am KIT „mit Auszeichnung“?', 'Wenn die Bachelorarbeit mit 1.0 bewertet wurde, der Gesamtdurchschnitt 1.2 oder besser ist und das Studium in höchstens neun Semestern abgeschlossen wurde.'],
        ['Gibt es am KIT die Noten 4.3 und 4.7?', 'Nein. Zugelassen sind nur 1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0 und 5.0.']
      ]
    }
  ]
};
