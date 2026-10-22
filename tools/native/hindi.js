/* University pages written natively in Hindi (built into /hi/ by tools/build-university-pages.js + tools/i18n.js).
   Same fields as the university entries in tools/build-university-pages.js. */

// Percentage tab for universities without an official formula: shows the marks band of the grade the CGPA reaches
const bandResult = (grades, unit) => `function (c) {
              var g = ${JSON.stringify(grades)};
              var v = Math.round(c * 100 + 1e-9) / 100;
              for (var i = 0; i < g.length; i++) {
                if (v >= g[i][1] && g[i][1] > 0) {
                  var top = i === 0 ? 100 : g[i - 1][2] - 1;
                  return { pct: g[i][2], text: g[i][2] + '–' + top + '%', work: '${unit} ' + v.toFixed(2) + ' ≥ ' + g[i][1] + ' (' + g[i][0] + '), यानी ' + g[i][2] + '–' + top + '% अंकों वाला ग्रेड' };
                }
              }
              return { pct: 0, text: '40% से कम', work: '${unit} ' + v.toFixed(2) + ' पास ग्रेड से कम है' };
            }`;

module.exports = {
  lang: 'hi',
  ui: {
    facts: '{short}: मुख्य बातें',
    faq: '{short} CGPA: अक्सर पूछे जाने वाले प्रश्न',
    checked: 'आख़िरी बार जाँचा गया: 22 अक्टूबर 2026। विश्वविद्यालय के नियम बदल सकते हैं, इसलिए अपना परिणाम हमेशा अपने विश्वविद्यालय के नवीनतम आधिकारिक नियमों से मिला लें। देखें: <a href="terms.html">उपयोग की शर्तें</a>।'
  },
  home: {
    heading: 'भारत',
    slugs: ['vtu-cgpa-calculator', 'aktu-cgpa-calculator', 'delhi-university-cgpa-calculator', 'mumbai-university-cgpa-calculator', 'rgpv-cgpa-calculator']
  },
  universities: [
    {
      slug: 'aktu-cgpa-calculator',
      short: 'AKTU',
      name: 'AKTU SGPA और CGPA कैलकुलेटर (B.Tech)',
      title: 'AKTU SGPA, CGPA कैलकुलेटर और CGPA से प्रतिशत (× 10)',
      desc: 'डॉ. ए.पी.जे. अब्दुल कलाम तकनीकी विश्वविद्यालय (AKTU) के 10-पॉइंट ग्रेड से SGPA और CGPA निकालें, और CGPA × 10 से प्रतिशत जानें।',
      lead: 'AKTU, लखनऊ की B.Tech ग्रेडिंग (A+ = 10, A = 9, B+ = 8 …) से अपना सेमेस्टर SGPA और कुल CGPA निकालें। अंक या ग्रेड लिखें, क्रेडिट डालें और प्रतिशत भी तुरंत देखें।',
      guideLink: 'AKTU की ग्रेडिंग कैसे काम करती है',
      card: '10-पॉइंट · E पास ग्रेड · प्रतिशत = CGPA × 10',
      scaleCard: {
        title: 'ग्रेडिंग प्रणाली: AKTU B.Tech (थ्योरी विषय)',
        text: 'हर विषय के 100 में से अंक लिखें या ग्रेड चुनें। ग्रेड पॉइंट AKTU B.Tech अध्यादेश (ऑर्डिनेंस) की थ्योरी तालिका से लिए गए हैं।'
      },
      config: `{
        storageKey: 'cgpa-aktu',
        scales: {
          aktu: {
            max: 10, label: 'AKTU 10-पॉइंट स्केल', region: 'AKTU लखनऊ · B.Tech थ्योरी विषय', example: '8.20',
            grades: [['A+', 10, 90], ['A', 9, 80], ['B+', 8, 70], ['B', 7, 60], ['C', 6, 50], ['D', 5, 45], ['E', 4, 40], ['F', 0, 0]]
          }
        },
        conversions: {
          aktu: {
            formula: 'प्रतिशत = CGPA × 10',
            expr: c => c + ' × 10',
            calc: c => c * 10,
            example: 8.2,
            note: 'AKTU अध्यादेश के अनुसार: CGPA × 10 = प्राप्त अंकों का प्रतिशत, जैसे 8.2 × 10 = 82.0%।',
            classify: p => p >= 75 ? 'CGPA 7.5+ : ऑनर्स सहित प्रथम श्रेणी (शर्तें लागू)' : p >= 65 ? 'CGPA 6.5+ : प्रथम श्रेणी' : 'द्वितीय श्रेणी'
          }
        }
      }`,
      modeSwitch: null,
      convScale: '',
      facts: [
        'थ्योरी में <strong>90 या अधिक</strong> अंक पर A+ यानी 10 ग्रेड पॉइंट।',
        'पास होने के लिए हर विषय में कम से कम <strong>E ग्रेड</strong> (40–44 अंक) चाहिए।',
        'सेमेस्टर का परिणाम तभी घोषित होता है जब <strong>SGPA कम से कम 5.0</strong> हो।',
        'प्रतिशत = <strong>CGPA × 10</strong>, जैसे 8.2 = 82%।'
      ],
      article: () => `
      <section id="how-it-works">
        <h2>AKTU में ग्रेडिंग कैसे होती है</h2>
        <p>डॉ. ए.पी.जे. अब्दुल कलाम तकनीकी विश्वविद्यालय (AKTU), लखनऊ, उत्तर प्रदेश के सैकड़ों इंजीनियरिंग कॉलेजों का संबद्ध विश्वविद्यालय है। B.Tech के अध्यादेश के अनुसार AKTU <strong>निरपेक्ष (absolute) ग्रेडिंग</strong> अपनाता है, यानी आपके अंक सीधे एक तय तालिका से ग्रेड में बदलते हैं। हर सेमेस्टर का परिणाम SGPA (सेमेस्टर ग्रेड पॉइंट एवरेज) के साथ आता है और CGPA (क्यूमुलेटिव ग्रेड पॉइंट एवरेज) हर सेमेस्टर अपडेट होता है।</p>
        <p>हर विषय के कुछ क्रेडिट होते हैं, जो उसके पढ़ाने के घंटों पर निर्भर करते हैं। जिस विषय के क्रेडिट ज़्यादा हैं, उसका ग्रेड आपके SGPA पर ज़्यादा असर डालता है। SGPA और CGPA दोनों दो दशमलव स्थान तक राउंड करके ट्रांसक्रिप्ट पर लिखे जाते हैं।</p>
      </section>

      <section id="grade-points">
        <h2>AKTU ग्रेड तालिका (थ्योरी विषय)</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col" class="num">अंक (%)</th><th scope="col">लेटर ग्रेड</th><th scope="col" class="num">ग्रेड पॉइंट</th><th scope="col">स्तर</th></tr></thead>
            <tbody>
              <tr><td class="num">90 – 100</td><td>A+</td><td class="num">10</td><td>उत्कृष्ट (Outstanding)</td></tr>
              <tr><td class="num">80 – 89</td><td>A</td><td class="num">9</td><td>बहुत उत्तम (Excellent)</td></tr>
              <tr><td class="num">70 – 79</td><td>B+</td><td class="num">8</td><td>बहुत अच्छा (Very Good)</td></tr>
              <tr><td class="num">60 – 69</td><td>B</td><td class="num">7</td><td>अच्छा (Good)</td></tr>
              <tr><td class="num">50 – 59</td><td>C</td><td class="num">6</td><td>औसत से ऊपर</td></tr>
              <tr><td class="num">45 – 49</td><td>D</td><td class="num">5</td><td>औसत</td></tr>
              <tr><td class="num">40 – 44</td><td>E</td><td class="num">4</td><td>कमज़ोर (पास)</td></tr>
              <tr><td class="num">0 – 39</td><td>F</td><td class="num">0</td><td>फेल</td></tr>
            </tbody>
          </table>
        </div>
        <p><strong>प्रैक्टिकल विषयों</strong> की तालिका अलग है: वहाँ ग्रेड A+ (90–100), A (80–89), B+ (70–79), B (60–69) और C (50–59) हैं, और 50 से कम अंक F है। यानी प्रैक्टिकल में पास होने के लिए कम से कम 50% अंक चाहिए। प्रैक्टिकल विषय के लिए कैलकुलेटर में सीधे उसका ग्रेड चुनें।</p>
      </section>

      <section id="example">
        <h2>AKTU SGPA और CGPA कैसे निकालें: उदाहरण</h2>
        <p class="formula-block">SGPA = Σ (क्रेडिट × ग्रेड पॉइंट) ÷ Σ क्रेडिट</p>
        <p>मान लीजिए किसी छात्र के तीसरे सेमेस्टर के ग्रेड ये हैं:</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">विषय</th><th scope="col" class="num">क्रेडिट</th><th scope="col">ग्रेड</th><th scope="col" class="num">ग्रेड पॉइंट</th><th scope="col" class="num">क्रेडिट × पॉइंट</th></tr></thead>
            <tbody>
              <tr><td>डेटा स्ट्रक्चर</td><td class="num">4</td><td>A</td><td class="num">9</td><td class="num">36</td></tr>
              <tr><td>मैथ्स-IV</td><td class="num">4</td><td>B+</td><td class="num">8</td><td class="num">32</td></tr>
              <tr><td>डिजिटल लॉजिक</td><td class="num">3</td><td>A+</td><td class="num">10</td><td class="num">30</td></tr>
              <tr><td>पायथन प्रोग्रामिंग</td><td class="num">3</td><td>B</td><td class="num">7</td><td class="num">21</td></tr>
              <tr><td>टेक्निकल कम्युनिकेशन</td><td class="num">2</td><td>C</td><td class="num">6</td><td class="num">12</td></tr>
              <tr><td>डेटा स्ट्रक्चर लैब</td><td class="num">2</td><td>A</td><td class="num">9</td><td class="num">18</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">कुल</th><td class="num">18</td><td></td><td></td><td class="num">149</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">SGPA = 149 ÷ 18 = 8.28</p>
        <p>CGPA सभी सेमेस्टर का क्रेडिट के हिसाब से औसत है: हर सेमेस्टर के SGPA को उस सेमेस्टर के कुल क्रेडिट से गुणा करें, सब जोड़ें और कुल क्रेडिट से भाग दें।</p>
        <p class="formula-block">CGPA = Σ (सेमेस्टर क्रेडिट × SGPA) ÷ Σ सेमेस्टर क्रेडिट</p>
        <p>F ग्रेड वाले विषय के 0 पॉइंट जुड़ते हैं लेकिन उसके क्रेडिट भाग में गिने जाते हैं, इसलिए F आपका SGPA काफ़ी गिरा देता है। F मिलने पर कैरी ओवर परीक्षा देनी होती है।</p>
      </section>

      <section id="percentage">
        <h2>AKTU CGPA से प्रतिशत और श्रेणी (डिविज़न)</h2>
        <p>AKTU अध्यादेश में CGPA को प्रतिशत में बदलने का सूत्र दिया गया है: <strong>CGPA × 10 = प्राप्त अंकों का प्रतिशत</strong>। उदाहरण: 8.2 × 10 = 82.0%। इंटरनेट पर (CGPA − 0.75) × 10 जैसा सूत्र भी मिलता है, पर वह इस अध्यादेश में नहीं है।</p>
        <p>डिविज़न आठवें (अंतिम) सेमेस्टर के बाद सभी सेमेस्टर के आधार पर दिया जाता है:</p>
        <ul>
          <li><strong>ऑनर्स सहित प्रथम श्रेणी:</strong> CGPA 7.5 या अधिक, और सभी विषय पहले प्रयास में तय समय (8 सेमेस्टर) में पास।</li>
          <li><strong>प्रथम श्रेणी:</strong> CGPA 6.5 या अधिक, सभी विषय अधिकतम अवधि में पास।</li>
          <li><strong>द्वितीय श्रेणी:</strong> डिग्री के योग्य बाकी सभी छात्र।</li>
        </ul>
        <p>इन शर्तों में बैच के अनुसार अतिरिक्त नियम (जैसे MOOCs क्रेडिट) हो सकते हैं, इसलिए <strong>अपने बैच का अध्यादेश ज़रूर जाँचें</strong>।</p>
      </section>`,
      sources: [
        ['AKTU B.Tech Ordinance (CBCS) – ग्रेडिंग, SGPA/CGPA, प्रतिशत और डिविज़न के नियम (AKTU से संबद्ध NIET द्वारा प्रकाशित प्रति)', 'https://www.niet.co.in/pdf/Ordinance/B.Tech.pdf'],
        ['AKTU अध्यादेश सूची (आधिकारिक)', 'https://aktu.ac.in/bachelors-ordinance.html']
      ],
      faq: [
        ['AKTU में CGPA को प्रतिशत में कैसे बदलें?', 'AKTU अध्यादेश के अनुसार CGPA को 10 से गुणा करें। जैसे CGPA 8.2 = 82.0%। (CGPA − 0.75) × 10 वाला सूत्र इस अध्यादेश में नहीं है।'],
        ['AKTU में पास होने के लिए कितने अंक चाहिए?', 'थ्योरी विषय में कम से कम E ग्रेड चाहिए, जो 40–44 अंक है। प्रैक्टिकल में कम से कम C ग्रेड (50–59 अंक) चाहिए। साथ ही सेमेस्टर का SGPA कम से कम 5.0 होना चाहिए।'],
        ['AKTU में A+ ग्रेड के कितने पॉइंट हैं?', 'A+ के 10 ग्रेड पॉइंट हैं और यह 90 से 100 अंकों पर मिलता है। A (80–89) के 9 और B+ (70–79) के 8 पॉइंट हैं।'],
        ['AKTU में प्रथम श्रेणी के लिए कितना CGPA चाहिए?', 'प्रथम श्रेणी के लिए CGPA कम से कम 6.5 चाहिए। CGPA 7.5 या अधिक और सभी विषय पहले प्रयास में पास हों तो ऑनर्स सहित प्रथम श्रेणी मिलती है। अपने बैच की शर्तें अध्यादेश में देखें।'],
        ['SGPA से CGPA कैसे निकालें?', 'हर सेमेस्टर के SGPA को उसके कुल क्रेडिट से गुणा करें, सबका योग करें और सभी सेमेस्टर के कुल क्रेडिट से भाग दें। अगर हर सेमेस्टर के क्रेडिट बराबर हों तो SGPA का साधारण औसत भी वही उत्तर देता है।']
      ]
    },

    {
      slug: 'delhi-university-cgpa-calculator',
      short: 'DU',
      name: 'दिल्ली विश्वविद्यालय (DU) SGPA और CGPA कैलकुलेटर',
      title: 'DU CGPA कैलकुलेटर – UGCF ग्रेड पॉइंट और CGPA से प्रतिशत',
      desc: 'दिल्ली विश्वविद्यालय के UGCF ग्रेड पॉइंट (O = 10, A+ = 9 …) से SGPA और CGPA निकालें। UGCF अधिसूचना के अनुसार प्रतिशत = CGPA × 10।',
      lead: 'दिल्ली विश्वविद्यालय के अंडरग्रेजुएट करिकुलम फ्रेमवर्क (UGCF) के लेटर ग्रेड और ग्रेड पॉइंट से अपना SGPA और CGPA निकालें, और DU की आधिकारिक अधिसूचना के अनुसार प्रतिशत भी देखें।',
      guideLink: 'DU की ग्रेडिंग कैसे काम करती है',
      card: 'UGCF · O = 10 · प्रतिशत = CGPA × 10',
      scaleCard: {
        title: 'ग्रेडिंग प्रणाली: दिल्ली विश्वविद्यालय, UGCF',
        text: 'अपनी मार्कशीट पर लिखा लेटर ग्रेड चुनें और विषय के क्रेडिट डालें। ग्रेड पॉइंट DU अध्यादेश की तालिका से हैं।'
      },
      config: `{
        storageKey: 'cgpa-du',
        scales: {
          du: {
            max: 10, label: 'DU 10-पॉइंट स्केल (UGCF)', subtitle: 'दिल्ली विश्वविद्यालय · UGCF · सबसे ऊँचा ग्रेड पॉइंट 10', example: '8.50', modes: ['grade'],
            grades: [['O', 10], ['A+', 9], ['A', 8], ['B+', 7], ['B', 6], ['C', 5], ['P', 4], ['F', 0]]
          }
        },
        conversions: {
          du: {
            formula: 'प्रतिशत = CGPA × 10',
            expr: c => c + ' × 10',
            calc: c => c * 10,
            example: 8.64,
            note: 'DU अधिसूचना (10 फ़रवरी 2023, UGCF): 2022-23 से उत्तीर्ण होने वाले छात्रों का अंतिम प्रतिशत = ग्रैंड CGPA × 10। पुराने CBCS बैच के लिए अपना नियम जाँचें।'
          }
        }
      }`,
      modeSwitch: '',
      convScale: '',
      facts: [
        'सबसे ऊँचा ग्रेड <strong>O (Outstanding) = 10</strong> पॉइंट, पास ग्रेड <strong>P = 4</strong>।',
        'F (फेल) और Ab (अनुपस्थित) दोनों के <strong>0 पॉइंट</strong> हैं।',
        'UGCF में प्रतिशत = <strong>ग्रैंड CGPA × 10</strong>।',
        'आम तौर पर एक सेमेस्टर में <strong>22 क्रेडिट</strong> होते हैं।'
      ],
      article: () => `
      <section id="how-it-works">
        <h2>दिल्ली विश्वविद्यालय में ग्रेडिंग कैसे होती है</h2>
        <p>दिल्ली विश्वविद्यालय ने 2022-23 सत्र से अंडरग्रेजुएट करिकुलम फ्रेमवर्क (UGCF 2022) लागू किया है, जो राष्ट्रीय शिक्षा नीति 2020 पर आधारित है। इसमें हर सेमेस्टर में अलग-अलग तरह के कोर्स होते हैं: डिसिप्लिन स्पेसिफ़िक कोर (DSC), जेनेरिक इलेक्टिव (GE), एबिलिटी एन्हांसमेंट कोर्स (AEC), स्किल एन्हांसमेंट कोर्स (SEC) और वैल्यू एडिशन कोर्स (VAC)। आम तौर पर DSC और GE 4-4 क्रेडिट के होते हैं, जबकि AEC, SEC और VAC 2-2 क्रेडिट के।</p>
        <p>हर कोर्स के परिणाम को एक लेटर ग्रेड मिलता है, और हर लेटर ग्रेड का एक तय ग्रेड पॉइंट होता है। इन्हीं से सेमेस्टर का SGPA और सभी सेमेस्टर का CGPA बनता है। अंतिम परिणाम में सभी सेमेस्टर का "ग्रैंड CGPA" लिखा जाता है।</p>
      </section>

      <section id="grade-points">
        <h2>DU लेटर ग्रेड और ग्रेड पॉइंट (UGCF)</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">लेटर ग्रेड</th><th scope="col">अर्थ</th><th scope="col" class="num">ग्रेड पॉइंट</th></tr></thead>
            <tbody>
              <tr><td>O</td><td>उत्कृष्ट (Outstanding)</td><td class="num">10</td></tr>
              <tr><td>A+</td><td>बहुत उत्तम (Excellent)</td><td class="num">9</td></tr>
              <tr><td>A</td><td>बहुत अच्छा (Very good)</td><td class="num">8</td></tr>
              <tr><td>B+</td><td>अच्छा (Good)</td><td class="num">7</td></tr>
              <tr><td>B</td><td>औसत से ऊपर</td><td class="num">6</td></tr>
              <tr><td>C</td><td>औसत</td><td class="num">5</td></tr>
              <tr><td>P</td><td>पास</td><td class="num">4</td></tr>
              <tr><td>F</td><td>फेल</td><td class="num">0</td></tr>
              <tr><td>Ab</td><td>अनुपस्थित</td><td class="num">0</td></tr>
            </tbody>
          </table>
        </div>
        <p>DU के अध्यादेश में यह तालिका केवल लेटर ग्रेड और ग्रेड पॉइंट देती है, अंकों की सीमा (जैसे "90 से ऊपर = O") नहीं। इसलिए यह कैलकुलेटर अंकों के बजाय सीधे ग्रेड पूछता है। अगर आपको अपने अंकों से ग्रेड निकालना है तो <strong>अपने कॉलेज या विभाग से अंकों की सीमा की पुष्टि करें</strong>।</p>
      </section>

      <section id="example">
        <h2>DU SGPA और CGPA कैसे निकालें: उदाहरण</h2>
        <p class="formula-block">SGPA = Σ (क्रेडिट × ग्रेड पॉइंट) ÷ Σ क्रेडिट</p>
        <p>मान लीजिए B.A. (Hons.) के पहले सेमेस्टर में 22 क्रेडिट हैं और ग्रेड ये हैं:</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">कोर्स</th><th scope="col" class="num">क्रेडिट</th><th scope="col">ग्रेड</th><th scope="col" class="num">क्रेडिट × पॉइंट</th></tr></thead>
            <tbody>
              <tr><td>DSC-1</td><td class="num">4</td><td>A+ (9)</td><td class="num">36</td></tr>
              <tr><td>DSC-2</td><td class="num">4</td><td>A (8)</td><td class="num">32</td></tr>
              <tr><td>DSC-3</td><td class="num">4</td><td>O (10)</td><td class="num">40</td></tr>
              <tr><td>GE-1</td><td class="num">4</td><td>B+ (7)</td><td class="num">28</td></tr>
              <tr><td>AEC</td><td class="num">2</td><td>A (8)</td><td class="num">16</td></tr>
              <tr><td>SEC</td><td class="num">2</td><td>O (10)</td><td class="num">20</td></tr>
              <tr><td>VAC</td><td class="num">2</td><td>A+ (9)</td><td class="num">18</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">कुल</th><td class="num">22</td><td></td><td class="num">190</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">SGPA = 190 ÷ 22 = 8.64</p>
        <p>CGPA निकालने के लिए हर सेमेस्टर के SGPA को उसके क्रेडिट से गुणा करें, सबका योग करें और कुल क्रेडिट से भाग दें। अगर हर सेमेस्टर में 22 क्रेडिट हों तो SGPA का साधारण औसत भी वही आएगा। कैलकुलेटर का CGPA टैब यह काम अपने आप करता है।</p>
      </section>

      <section id="percentage">
        <h2>DU CGPA से प्रतिशत</h2>
        <p>दिल्ली विश्वविद्यालय की 10 फ़रवरी 2023 की अधिसूचना (अध्यादेश VIII में जोड़, UGCF) कहती है कि 2022-23 से उत्तीर्ण होने वाले छात्रों का अंतिम प्रतिशत <strong>ग्रैंड CGPA × 10</strong> होगा। उदाहरण: CGPA 8.64 = 86.4%।</p>
        <p>आपने इंटरनेट पर <strong>CGPA × 9.5</strong> भी देखा होगा। यह पुराने CBCS दौर में इस्तेमाल होता था। अगर आप CBCS बैच के छात्र हैं, तो <strong>अपने बैच का नियम विश्वविद्यालय से जाँचें</strong>, क्योंकि यह कैलकुलेटर UGCF का × 10 सूत्र इस्तेमाल करता है।</p>
      </section>`,
      sources: [
        ['University of Delhi, Notification CNC-II/093/1(22)/2022-23 (10.02.2023): UGCF assessment, final percentage = Grand CGPA × 10', 'https://www.du.ac.in/uploads/new-web/21022023_Notification.pdf'],
        ['University of Delhi, Notification CNC-II/093/1/EC-1275/25/12 (31.07.2025): Table 1, Letter Grades and Grade Points', 'https://www.polscience.du.ac.in/userfiles/PDFs/2025/31072025-ugcf-Final_notification-polsc.pdf']
      ],
      faq: [
        ['DU में CGPA को प्रतिशत में कैसे बदलें?', 'UGCF के तहत 2022-23 से उत्तीर्ण छात्रों के लिए प्रतिशत = ग्रैंड CGPA × 10, जैसे 8.64 = 86.4%। पुराने CBCS बैच में × 9.5 इस्तेमाल होता था, इसलिए अपना बैच देखकर नियम जाँचें।'],
        ['DU में O ग्रेड के कितने पॉइंट हैं?', 'O (Outstanding) के 10, A+ के 9, A के 8, B+ के 7, B के 6, C के 5 और P (पास) के 4 पॉइंट हैं। F और Ab (अनुपस्थित) के 0 पॉइंट हैं।'],
        ['DU में कितने अंकों पर कौन सा ग्रेड मिलता है?', 'DU के अध्यादेश की तालिका में केवल ग्रेड और पॉइंट दिए गए हैं, अंकों की सीमा नहीं। इसलिए अंकों से ग्रेड जानने के लिए अपने कॉलेज या विभाग से पुष्टि करें।'],
        ['DU में SGPA कैसे निकालते हैं?', 'हर कोर्स के क्रेडिट को उसके ग्रेड पॉइंट से गुणा करें, सबका योग करें और सेमेस्टर के कुल क्रेडिट से भाग दें। जैसे 190 ÷ 22 = 8.64।'],
        ['क्या ग्रैंड CGPA और CGPA एक ही हैं?', 'ग्रैंड CGPA पूरे कोर्स के सभी सेमेस्टर का CGPA है, जो अंतिम परिणाम में लिखा जाता है। प्रतिशत इसी ग्रैंड CGPA से निकाला जाता है।']
      ]
    },

    {
      slug: 'mumbai-university-cgpa-calculator',
      short: 'MU',
      name: 'मुंबई विश्वविद्यालय (MU) SGPI और CGPI कैलकुलेटर',
      title: 'मुंबई विश्वविद्यालय CGPI कैलकुलेटर – NEP 2020 ग्रेड तालिका',
      desc: 'मुंबई विश्वविद्यालय के NEP 2020 ग्रेड (90+ पर O = 10, 80+ पर A+ = 9 …) से SGPI और CGPI निकालें। आधिकारिक रिज़ल्ट रजिस्टर की तालिका पर आधारित।',
      lead: 'मुंबई विश्वविद्यालय की NEP 2020 ग्रेडिंग से अपना SGPI (सेमेस्टर ग्रेड परफ़ॉर्मेंस इंडेक्स) और CGPI निकालें। अपने अंक या ग्रेड लिखें, क्रेडिट डालें और परिणाम तुरंत देखें।',
      guideLink: 'मुंबई विश्वविद्यालय की ग्रेडिंग कैसे काम करती है',
      card: 'NEP 2020 · 90+ पर O · SGPI = ΣCG ÷ ΣC',
      scaleCard: {
        title: 'ग्रेडिंग प्रणाली: मुंबई विश्वविद्यालय, NEP 2020',
        text: 'हर विषय के अंक प्रतिशत में लिखें या ग्रेड चुनें। तालिका मुंबई विश्वविद्यालय के NEP 2020 रिज़ल्ट रजिस्टर से ली गई है।'
      },
      config: `{
        storageKey: 'cgpa-mu',
        scales: {
          mu: {
            max: 10, label: 'मुंबई विश्वविद्यालय 10-पॉइंट स्केल (NEP 2020)', region: 'मुंबई विश्वविद्यालय · NEP 2020', example: '8.73',
            grades: [['O', 10, 90], ['A+', 9, 80], ['A', 8, 70], ['B+', 7, 60], ['B', 6, 55], ['C', 5, 50], ['D', 4, 40], ['F', 0, 0]]
          }
        },
        conversions: {
          mu: {
            formula: 'आपका CGPI → उस ग्रेड की अंक-सीमा',
            example: 8.73,
            note: 'हमें मुंबई विश्वविद्यालय का कोई मौजूदा आधिकारिक CGPI-से-प्रतिशत सूत्र नहीं मिला। यह टैब बताता है कि आपका CGPI किस ग्रेड तक पहुँचता है और उस ग्रेड की अंक-सीमा क्या है। फ़ॉर्म पर लिखने से पहले विश्वविद्यालय से पुष्टि करें।',
            result: ${bandResult([['O', 10, 90], ['A+', 9, 80], ['A', 8, 70], ['B+', 7, 60], ['B', 6, 55], ['C', 5, 50], ['D', 4, 40]], 'CGPI')}
          }
        }
      }`,
      modeSwitch: null,
      convScale: '',
      facts: [
        '<strong>90% या अधिक</strong> अंक पर O ग्रेड यानी 10 पॉइंट।',
        '<strong>40% से कम</strong> अंक F ग्रेड है, यानी 0 पॉइंट।',
        'MU में SGPA को <strong>SGPI</strong> और CGPA को <strong>CGPI</strong> कहते हैं।',
        'B ग्रेड की सीमा छोटी है: केवल <strong>55 से 59.99</strong>।'
      ],
      article: () => `
      <section id="how-it-works">
        <h2>मुंबई विश्वविद्यालय में ग्रेडिंग कैसे होती है</h2>
        <p>मुंबई विश्वविद्यालय (University of Mumbai) में अब ज़्यादातर पाठ्यक्रम राष्ट्रीय शिक्षा नीति (NEP 2020) के अनुसार चलते हैं। हर विषय के अंक एक तय 10-पॉइंट तालिका से लेटर ग्रेड और ग्रेड पॉइंट में बदले जाते हैं। विश्वविद्यालय अपने परिणाम में SGPA की जगह <strong>SGPI</strong> (सेमेस्टर ग्रेड परफ़ॉर्मेंस इंडेक्स) शब्द इस्तेमाल करता है, और पूरे कोर्स के औसत को <strong>CGPI</strong> कहता है। हिसाब वही है, केवल नाम अलग है।</p>
        <p>रिज़ल्ट रजिस्टर में हर विषय के सामने C (क्रेडिट), G (ग्रेड पॉइंट) और C × G लिखा होता है। नीचे ΣC (कुल क्रेडिट) और ΣCG (क्रेडिट × ग्रेड पॉइंट का योग) होता है, और <strong>SGPI = ΣCG ÷ ΣC</strong>।</p>
      </section>

      <section id="grade-points">
        <h2>मुंबई विश्वविद्यालय ग्रेड तालिका (NEP 2020)</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col" class="num">अंक (%)</th><th scope="col">ग्रेड</th><th scope="col" class="num">ग्रेड पॉइंट</th></tr></thead>
            <tbody>
              <tr><td class="num">90 या अधिक</td><td>O</td><td class="num">10</td></tr>
              <tr><td class="num">80 से 90 से कम</td><td>A+</td><td class="num">9</td></tr>
              <tr><td class="num">70 से 80 से कम</td><td>A</td><td class="num">8</td></tr>
              <tr><td class="num">60 से 70 से कम</td><td>B+</td><td class="num">7</td></tr>
              <tr><td class="num">55 से 60 से कम</td><td>B</td><td class="num">6</td></tr>
              <tr><td class="num">50 से 55 से कम</td><td>C</td><td class="num">5</td></tr>
              <tr><td class="num">40 से 50 से कम</td><td>D</td><td class="num">4</td></tr>
              <tr><td class="num">40 से कम</td><td>F</td><td class="num">0</td></tr>
            </tbody>
          </table>
        </div>
        <p>यह तालिका मुंबई विश्वविद्यालय के NEP 2020 रिज़ल्ट रजिस्टर (मई 2026 की परीक्षा) में छपी है। पुराने CBCS बैच में तालिका अलग थी, जैसे वहाँ O ग्रेड 80% पर मिलता था। अगर आप पुराने बैच के छात्र हैं तो <strong>अपनी मार्कशीट के पीछे छपी तालिका से मिलान करें</strong>।</p>
      </section>

      <section id="example">
        <h2>SGPI कैसे निकालें: रिज़ल्ट रजिस्टर से असली उदाहरण</h2>
        <p>यह उदाहरण मुंबई विश्वविद्यालय के M.Sc. (गणित) सेमेस्टर II (NEP 2020) के आधिकारिक रिज़ल्ट रजिस्टर की एक पंक्ति से लिया गया है:</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">विषय</th><th scope="col" class="num">अंक</th><th scope="col">ग्रेड</th><th scope="col" class="num">C</th><th scope="col" class="num">C × G</th></tr></thead>
            <tbody>
              <tr><td>Algebra II</td><td class="num">77</td><td>A (8)</td><td class="num">4</td><td class="num">32</td></tr>
              <tr><td>Topology</td><td class="num">85</td><td>A+ (9)</td><td class="num">4</td><td class="num">36</td></tr>
              <tr><td>Complex Analysis</td><td class="num">63</td><td>B+ (7)</td><td class="num">4</td><td class="num">28</td></tr>
              <tr><td>Numerical Analysis</td><td class="num">80</td><td>A+ (9)</td><td class="num">4</td><td class="num">36</td></tr>
              <tr><td>OJT / Field Project</td><td class="num">92</td><td>O (10)</td><td class="num">4</td><td class="num">40</td></tr>
              <tr><td>PDE (प्रैक्टिकल, 50 में से 47 = 94%)</td><td class="num">94</td><td>O (10)</td><td class="num">2</td><td class="num">20</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">कुल</th><td></td><td></td><td class="num">22</td><td class="num">192</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">SGPI = ΣCG ÷ ΣC = 192 ÷ 22 = 8.73</p>
        <p>CGPI सभी सेमेस्टर का क्रेडिट के हिसाब से औसत है: हर सेमेस्टर के SGPI को उसके क्रेडिट से गुणा करें, जोड़ें और कुल क्रेडिट से भाग दें। ध्यान दें: प्रैक्टिकल के अंक 50 में से हों तो पहले उन्हें प्रतिशत में बदलें (47 ÷ 50 × 100 = 94)।</p>
      </section>

      <section id="percentage">
        <h2>मुंबई विश्वविद्यालय CGPI से प्रतिशत</h2>
        <p>इंटरनेट पर मुंबई विश्वविद्यालय के लिए <strong>7.1 × CGPI + 11</strong> जैसा सूत्र बहुत दिखता है, लेकिन हमें यह किसी मौजूदा आधिकारिक परिपत्र (सर्कुलर) में नहीं मिला, और अलग-अलग वेबसाइटें अलग सूत्र बताती हैं। इसलिए यह कैलकुलेटर कोई अनुमानित प्रतिशत नहीं गढ़ता।</p>
        <p>प्रतिशत टैब केवल यह दिखाता है कि आपका CGPI किस ग्रेड तक पहुँचता है और उस ग्रेड की अंक-सीमा क्या है। जैसे CGPI 8.73 ग्रेड A (8) तक पहुँचता है, जिसकी सीमा 70–79% है। किसी फ़ॉर्म पर प्रतिशत लिखना हो तो <strong>मुंबई विश्वविद्यालय या अपने कॉलेज से आधिकारिक सूत्र की पुष्टि करें</strong>।</p>
      </section>`,
      sources: [
        ['University of Mumbai: Office Register, M.Sc. (Maths) Semester II (NEP 2020), May 2026 – ग्रेड तालिका और SGPI की परिभाषा', 'https://www.mumresults.in/F26/1111561%20Master%20of%20Science(Maths)%20(%20Semester%20-%20II)%20(%20NEP%202020%20).pdf']
      ],
      faq: [
        ['मुंबई विश्वविद्यालय में SGPI क्या है?', 'SGPI (सेमेस्टर ग्रेड परफ़ॉर्मेंस इंडेक्स) मुंबई विश्वविद्यालय में SGPA का नाम है। SGPI = ΣCG ÷ ΣC, यानी क्रेडिट × ग्रेड पॉइंट का योग ÷ कुल क्रेडिट।'],
        ['NEP 2020 में O ग्रेड कितने अंकों पर मिलता है?', 'NEP 2020 तालिका में 90% या अधिक अंकों पर O (10 पॉइंट) मिलता है। 80 से 90 से कम पर A+ (9) और 70 से 80 से कम पर A (8)।'],
        ['मुंबई विश्वविद्यालय में पास होने के लिए कितने अंक चाहिए?', 'NEP 2020 तालिका में 40% से कम अंक F है। 40 से 50 से कम अंकों पर D ग्रेड (4 पॉइंट) मिलता है।'],
        ['क्या 7.1 × CGPI + 11 आधिकारिक सूत्र है?', 'यह सूत्र इंटरनेट पर बहुत प्रचलित है, लेकिन हमें यह मुंबई विश्वविद्यालय के किसी मौजूदा आधिकारिक परिपत्र में नहीं मिला। प्रतिशत लिखने से पहले विश्वविद्यालय से पुष्टि करें।'],
        ['पुराने CBCS बैच की तालिका अलग क्यों है?', 'मुंबई विश्वविद्यालय ने अलग-अलग समय पर अलग तालिकाएँ इस्तेमाल की हैं। पुरानी CBCS तालिका में O ग्रेड 80% पर मिलता था। अपनी मार्कशीट पर छपी तालिका से मिलान करें।']
      ]
    },

    {
      slug: 'rgpv-cgpa-calculator',
      short: 'RGPV',
      name: 'RGPV SGPA और CGPA कैलकुलेटर (भोपाल)',
      title: 'RGPV CGPA कैलकुलेटर – ग्रेड पॉइंट और CGPA से प्रतिशत (× 10)',
      desc: 'राजीव गांधी प्रौद्योगिकी विश्वविद्यालय (RGPV) भोपाल के क्रेडिट आधारित ग्रेडिंग सिस्टम से SGPA, CGPA और प्रतिशत (CGPA × 10) निकालें।',
      lead: 'RGPV, भोपाल के क्रेडिट आधारित ग्रेडिंग सिस्टम (A+ = 10, A = 9, B+ = 8 …) से अपना SGPA और CGPA निकालें, और अध्यादेश के सूत्र से प्रतिशत व डिविज़न भी जानें।',
      guideLink: 'RGPV की ग्रेडिंग कैसे काम करती है',
      card: '91+ पर A+ · प्रतिशत = CGPA × 10',
      scaleCard: {
        title: 'ग्रेडिंग प्रणाली: RGPV क्रेडिट आधारित ग्रेडिंग सिस्टम',
        text: 'हर विषय के अंक प्रतिशत में लिखें या ग्रेड चुनें। ग्रेड पॉइंट RGPV अध्यादेश की तालिका से लिए गए हैं।'
      },
      config: `{
        storageKey: 'cgpa-rgpv',
        scales: {
          rgpv: {
            max: 10, label: 'RGPV 10-पॉइंट स्केल', region: 'RGPV भोपाल · क्रेडिट आधारित ग्रेडिंग', example: '8.24',
            grades: [['A+', 10, 91], ['A', 9, 81], ['B+', 8, 71], ['B', 7, 61], ['C+', 6, 51], ['C', 5, 41], ['D', 4, 40], ['F', 0, 0]]
          }
        },
        conversions: {
          rgpv: {
            formula: 'प्रतिशत = CGPA × 10',
            expr: c => c + ' × 10',
            calc: c => c * 10,
            example: 8.24,
            note: 'RGPV अध्यादेश के अनुसार: प्राप्त अंकों का प्रतिशत = CGPA × 10। अपनी ग्रेड शीट पर छपे निर्देश से भी मिलान करें।',
            classify: p => p >= 75 ? 'CGPA 7.5+ : ऑनर्स सहित प्रथम श्रेणी' : p >= 65 ? 'CGPA 6.5+ : प्रथम श्रेणी' : p >= 50 ? 'CGPA 5.0+ : द्वितीय श्रेणी' : 'CGPA 5.0 से कम'
          }
        }
      }`,
      modeSwitch: null,
      convScale: '',
      facts: [
        '<strong>91 से 100</strong> अंक पर A+ यानी 10 पॉइंट।',
        'केवल <strong>40 अंक</strong> पर D ग्रेड (4 पॉइंट) मिलता है, 40 से कम F।',
        'डिग्री के लिए कम से कम <strong>CGPA 5.0</strong> चाहिए।',
        'प्रतिशत = <strong>CGPA × 10</strong>।'
      ],
      article: () => `
      <section id="how-it-works">
        <h2>RGPV में ग्रेडिंग कैसे होती है</h2>
        <p>राजीव गांधी प्रौद्योगिकी विश्वविद्यालय (RGPV), भोपाल, मध्य प्रदेश का तकनीकी विश्वविद्यालय है। इसके अध्यादेश के अनुसार हर छात्र का मूल्यांकन लगातार होता है: ट्यूटोरियल, प्रैक्टिकल, होम असाइनमेंट, मिड-सेमेस्टर टेस्ट, क्विज़, सेमिनार और सेमेस्टर के अंत की परीक्षा, सब मिलकर अंतिम अंक बनते हैं। फिर ये अंक एक निरपेक्ष (absolute) तालिका से लेटर ग्रेड और ग्रेड पॉइंट में बदलते हैं।</p>
        <p>हर विषय के क्रेडिट उसके पढ़ाने के घंटों से तय होते हैं: हर हफ़्ते एक घंटे का लेक्चर, ट्यूटोरियल या प्रैक्टिकल एक क्रेडिट के बराबर है। सेमेस्टर का SGPA और पूरे कोर्स का CGPA इन्हीं क्रेडिट के हिसाब से निकलता है।</p>
      </section>

      <section id="grade-points">
        <h2>RGPV ग्रेड तालिका (क्रेडिट आधारित ग्रेडिंग सिस्टम)</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">ग्रेड</th><th scope="col" class="num">अंक (%)</th><th scope="col" class="num">ग्रेड पॉइंट</th><th scope="col">प्रदर्शन</th></tr></thead>
            <tbody>
              <tr><td>A+</td><td class="num">91 – 100</td><td class="num">10</td><td>उत्कृष्ट (Outstanding)</td></tr>
              <tr><td>A</td><td class="num">81 – 90</td><td class="num">9</td><td>बहुत उत्तम (Excellent)</td></tr>
              <tr><td>B+</td><td class="num">71 – 80</td><td class="num">8</td><td>बहुत अच्छा (Very Good)</td></tr>
              <tr><td>B</td><td class="num">61 – 70</td><td class="num">7</td><td>अच्छा (Good)</td></tr>
              <tr><td>C+</td><td class="num">51 – 60</td><td class="num">6</td><td>औसत (Average)</td></tr>
              <tr><td>C</td><td class="num">41 – 50</td><td class="num">5</td><td>संतोषजनक (Satisfactory)</td></tr>
              <tr><td>D</td><td class="num">केवल 40</td><td class="num">4</td><td>सीमांत (Marginal)</td></tr>
              <tr><td>F</td><td class="num">40 से कम</td><td class="num">0</td><td>फेल</td></tr>
            </tbody>
          </table>
        </div>
        <p>ध्यान दें कि RGPV की तालिका कई दूसरे विश्वविद्यालयों से अलग है: A+ के लिए 90 नहीं, <strong>91</strong> अंक चाहिए, और हर ग्रेड की सीमा 1 पर ख़त्म होती है (जैसे B+ = 71 से 80)। I (अपूर्ण) और W (वापसी) के भी 0 पॉइंट हैं।</p>
      </section>

      <section id="example">
        <h2>RGPV SGPA और CGPA कैसे निकालें: उदाहरण</h2>
        <p class="formula-block">SGPA = Σ (cᵢ × pᵢ) ÷ Σ cᵢ</p>
        <p>यहाँ cᵢ किसी विषय के क्रेडिट हैं और pᵢ उस विषय का ग्रेड पॉइंट। मान लीजिए एक सेमेस्टर ऐसा रहा:</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">विषय</th><th scope="col" class="num">क्रेडिट</th><th scope="col" class="num">अंक</th><th scope="col">ग्रेड</th><th scope="col" class="num">क्रेडिट × पॉइंट</th></tr></thead>
            <tbody>
              <tr><td>इंजीनियरिंग मैथ्स</td><td class="num">4</td><td class="num">84</td><td>A (9)</td><td class="num">36</td></tr>
              <tr><td>बेसिक इलेक्ट्रिकल</td><td class="num">4</td><td class="num">76</td><td>B+ (8)</td><td class="num">32</td></tr>
              <tr><td>इंजीनियरिंग ग्राफ़िक्स</td><td class="num">3</td><td class="num">93</td><td>A+ (10)</td><td class="num">30</td></tr>
              <tr><td>इंजीनियरिंग फ़िज़िक्स</td><td class="num">3</td><td class="num">66</td><td>B (7)</td><td class="num">21</td></tr>
              <tr><td>कम्युनिकेशन स्किल</td><td class="num">2</td><td class="num">55</td><td>C+ (6)</td><td class="num">12</td></tr>
              <tr><td>वर्कशॉप</td><td class="num">1</td><td class="num">88</td><td>A (9)</td><td class="num">9</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">कुल</th><td class="num">17</td><td></td><td></td><td class="num">140</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">SGPA = 140 ÷ 17 = 8.24</p>
        <p>CGPA = Σ (SGⱼ × NCⱼ) ÷ Σ NCⱼ, जहाँ SGⱼ किसी सेमेस्टर का SGPA है और NCⱼ उस सेमेस्टर के कुल क्रेडिट। यानी हर सेमेस्टर के SGPA को उसके क्रेडिट से गुणा करें, जोड़ें और कुल क्रेडिट से भाग दें।</p>
      </section>

      <section id="percentage">
        <h2>RGPV CGPA से प्रतिशत और डिविज़न</h2>
        <p>RGPV अध्यादेश के अनुसार: <strong>प्राप्त अंकों का प्रतिशत = CGPA × 10</strong>। उदाहरण: CGPA 8.24 = 82.4%। इंटरनेट पर (CGPA − 0.5) × 10 या CGPA × 9.5 जैसे सूत्र भी दिखते हैं, लेकिन वे इस अध्यादेश में नहीं हैं।</p>
        <ul>
          <li><strong>CGPA 7.5 या अधिक:</strong> ऑनर्स सहित प्रथम श्रेणी</li>
          <li><strong>CGPA 6.5 से 7.5 से कम:</strong> प्रथम श्रेणी</li>
          <li><strong>CGPA 5.0 से 6.5 से कम:</strong> द्वितीय श्रेणी</li>
        </ul>
        <p>डिग्री के लिए कम से कम CGPA 5.0 चाहिए, और किसी विषय में पास होने के लिए कम से कम D ग्रेड। ये नियम RGPV के उस अध्यादेश से हैं जिसमें क्रेडिट आधारित ग्रेडिंग सिस्टम दिया गया है (स्वीकृत 05/09/2011)। आपके B.Tech बैच का अध्यादेश थोड़ा अलग हो सकता है, इसलिए <strong>अपनी ग्रेड शीट और विश्वविद्यालय से पुष्टि करें</strong>।</p>
      </section>`,
      sources: [
        ['RGPV, Bhopal: Ordinance (approved 05/09/2011) – Credit Based Grading System, SGPA/CGPA, divisions and percentage conversion', 'https://www.rgpv.ac.in/campus/ord_ddipg1415.pdf'],
        ['RGPV अध्यादेश सूची (Ordinance No. 30: Credit Based Grading System)', 'https://www.rgpv.ac.in/aboutrgtu/frm_viewordinance.aspx']
      ],
      faq: [
        ['RGPV में CGPA को प्रतिशत में कैसे बदलें?', 'RGPV अध्यादेश के अनुसार प्रतिशत = CGPA × 10। जैसे CGPA 8.24 = 82.4%। अपनी ग्रेड शीट पर छपे निर्देश से भी मिलान करें।'],
        ['RGPV में A+ ग्रेड कितने अंकों पर मिलता है?', '91 से 100 अंकों पर A+ (10 पॉइंट) मिलता है। 81 से 90 पर A (9) और 71 से 80 पर B+ (8)।'],
        ['RGPV में पास होने के लिए कितने अंक चाहिए?', 'कम से कम 40 अंक, जिस पर D ग्रेड (4 पॉइंट) मिलता है। 40 से कम अंक F है। डिग्री के लिए CGPA कम से कम 5.0 होना चाहिए।'],
        ['RGPV में प्रथम श्रेणी के लिए कितना CGPA चाहिए?', 'CGPA 6.5 या अधिक पर प्रथम श्रेणी और 7.5 या अधिक पर ऑनर्स सहित प्रथम श्रेणी मिलती है। 5.0 से 6.5 से कम पर द्वितीय श्रेणी।'],
        ['RGPV का SGPA कैसे निकालें?', 'हर विषय के क्रेडिट को उसके ग्रेड पॉइंट से गुणा करें, सबका योग करें और कुल क्रेडिट से भाग दें। जैसे 140 ÷ 17 = 8.24।']
      ]
    }
  ]
};
