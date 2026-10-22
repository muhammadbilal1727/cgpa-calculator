/* University pages written natively in Urdu (built into /ur/ by tools/build-university-pages.js + tools/i18n.js).
   Same fields as the university entries in tools/build-university-pages.js. */

module.exports = {
  lang: 'ur',
  ui: {
    facts: '{short}: اہم باتیں',
    faq: '{short} CGPA: اکثر پوچھے جانے والے سوالات',
    checked: 'آخری بار جانچا گیا: 22 اکتوبر 2026۔ یونیورسٹی کے قواعد بدل سکتے ہیں، اس لیے اپنا نتیجہ ہمیشہ اپنی یونیورسٹی کے تازہ ترین سرکاری قواعد سے ملا لیں۔ مزید دیکھیں: <a href="terms.html">شرائطِ استعمال</a>۔'
  },
  // Cards on /ur/index.html, in this order
  home: {
    heading: 'پاکستان',
    slugs: ['ghazi-university-cgpa-calculator', 'nust-cgpa-calculator', 'comsats-cgpa-calculator', 'punjab-university-cgpa-calculator', 'bzu-cgpa-calculator']
  },
  universities: [
    {
      slug: 'punjab-university-cgpa-calculator',
      short: 'PU',
      name: 'پنجاب یونیورسٹی (لاہور) CGPA اور GPA کیلکولیٹر',
      title: 'پنجاب یونیورسٹی CGPA کیلکولیٹر – سرکاری گریڈنگ ٹیبل',
      desc: 'پنجاب یونیورسٹی لاہور کے سمسٹر قواعد کے سرکاری گریڈنگ ٹیبل کے مطابق اپنا GPA اور CGPA نکالیں: 85 فیصد پر A یعنی 4.00، اور 50 فیصد سے کم F۔',
      lead: 'پنجاب یونیورسٹی کے سمسٹر قواعد میں دیے گئے سرکاری ٹیبل (A = 4.00، A- = 3.70، B+ = 3.30 وغیرہ) سے اپنے سمسٹر کا GPA اور مجموعی CGPA معلوم کریں۔ اپنے نمبر یا لیٹر گریڈ لکھیں اور کریڈٹ آورز کے حساب سے نتیجہ فوراً دیکھیں۔',
      guideLink: 'پنجاب یونیورسٹی کی گریڈنگ کیسے کام کرتی ہے',
      card: '85% پر A · نمبروں کی کسر پورا نمبر',
      scaleCard: {
        title: 'گریڈنگ سسٹم: پنجاب یونیورسٹی، سمسٹر سسٹم (انڈرگریجویٹ)',
        text: 'ہر مضمون کے نمبر فیصد میں لکھیں یا لیٹر گریڈ چنیں۔ گریڈ پوائنٹس پنجاب یونیورسٹی کے سمسٹر قواعد سے لیے گئے ہیں۔'
      },
      config: `{
        storageKey: 'cgpa-pu-lahore',
        scales: {
          pu: {
            max: 4, label: 'پنجاب یونیورسٹی 4.00 اسکیل', region: 'پنجاب یونیورسٹی لاہور · سمسٹر سسٹم', example: '3.30', roundUpMarks: true,
            grades: [['A', 4, 85], ['A-', 3.7, 80], ['B+', 3.3, 75], ['B', 3, 70], ['B-', 2.7, 65], ['C+', 2.3, 61], ['C', 2, 58], ['C-', 1.7, 55], ['D', 1, 50], ['F', 0, 0]]
          }
        },
        conversions: {
          pu: {
            formula: 'فیصد ≈ (CGPA ÷ 4) × 100',
            expr: c => '(' + c + ' ÷ 4) × 100',
            calc: c => (c / 4) * 100,
            example: 3.3,
            note: 'یہ عام طریقہ ہے، پنجاب یونیورسٹی کا سرکاری فارمولا نہیں۔ یونیورسٹی کے قواعد کے مطابق ٹرانسکرپٹ پر CGPA کے ساتھ مجموعی فیصد بھی لکھا جاتا ہے، اس لیے وہی فیصد استعمال کریں اور اپنی یونیورسٹی سے تصدیق کریں۔'
          }
        }
      }`,
      modeSwitch: null,
      convScale: '',
      facts: [
        '<strong>85% یا اس سے زیادہ</strong> نمبر پر A ملتا ہے جس کے 4.00 گریڈ پوائنٹس ہیں۔',
        '<strong>50% سے کم</strong> نمبر F ہے، یعنی صفر گریڈ پوائنٹ۔',
        'نمبروں میں کسر <strong>پورا ایک نمبر</strong> گنی جاتی ہے: 64.1 یا 64.9 دونوں 65 بنتے ہیں۔',
        'بی ایس یا ایسوسی ایٹ ڈگری کے لیے کم از کم <strong>2.00 CGPA</strong> ضروری ہے۔'
      ],
      article: () => `
      <section id="how-it-works">
        <h2>پنجاب یونیورسٹی میں گریڈنگ کیسے ہوتی ہے</h2>
        <p>پنجاب یونیورسٹی لاہور کے بی ایس (چار سالہ) اور ایسوسی ایٹ ڈگری (دو سالہ) پروگرام سمسٹر سسٹم پر چلتے ہیں۔ ہر مضمون (کورس) کے کچھ کریڈٹ آورز ہوتے ہیں، عام طور پر 2 سے 4، اور ہر مضمون کا نتیجہ سو میں سے نمبروں کی صورت میں بنتا ہے۔ ان نمبروں میں مڈٹرم، اسائنمنٹس اور فائنل امتحان کے نمبر شامل ہوتے ہیں۔ پھر یہ نمبر ایک مقررہ ٹیبل کے ذریعے لیٹر گریڈ اور گریڈ پوائنٹس میں بدلے جاتے ہیں۔ زیادہ سے زیادہ GPA اور CGPA 4.00 ہو سکتا ہے، بالکل اسی طرح جیسے ایچ ای سی کے تحت پاکستان کی زیادہ تر جامعات میں ہوتا ہے۔</p>
        <p>قواعد کے مطابق لیٹر گریڈ صرف ہر مضمون کے نتیجے کے لیے استعمال ہوتا ہے، سمسٹر کے GPA یا مجموعی CGPA کے لیے نہیں۔ یعنی آپ کے ٹرانسکرپٹ پر ہر کورس کے سامنے گریڈ لکھا ہوگا، لیکن سمسٹر کے آخر میں صرف عدد (مثلاً 3.27) آئے گا۔</p>
        <p>ایک اہم بات جو اکثر طلبہ نہیں جانتے: اگر کسی مضمون میں آپ کے نمبر کسر میں ہوں تو وہ کسر پورا ایک نمبر گنی جاتی ہے۔ قواعد کی اپنی مثال میں 71.4 نمبر 72 بن جاتے ہیں، جو B گریڈ اور 3.00 پوائنٹس ہیں۔ اسی طرح 64.1 کو 65 گنا جائے گا اور گریڈ C+ کے بجائے B- ملے گا۔ اوپر والا کیلکولیٹر بھی یہی اصول خود لگاتا ہے۔</p>
      </section>

      <section id="grade-points">
        <h2>پنجاب یونیورسٹی کا گریڈنگ ٹیبل</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col" class="num">نمبر (فیصد)</th><th scope="col">لیٹر گریڈ</th><th scope="col" class="num">گریڈ پوائنٹس</th></tr></thead>
            <tbody>
              <tr><td class="num">85 اور زیادہ</td><td>A</td><td class="num">4.00</td></tr>
              <tr><td class="num">80 – 84</td><td>A-</td><td class="num">3.70</td></tr>
              <tr><td class="num">75 – 79</td><td>B+</td><td class="num">3.30</td></tr>
              <tr><td class="num">70 – 74</td><td>B</td><td class="num">3.00</td></tr>
              <tr><td class="num">65 – 69</td><td>B-</td><td class="num">2.70</td></tr>
              <tr><td class="num">61 – 64</td><td>C+</td><td class="num">2.30</td></tr>
              <tr><td class="num">58 – 60</td><td>C</td><td class="num">2.00</td></tr>
              <tr><td class="num">55 – 57</td><td>C-</td><td class="num">1.70</td></tr>
              <tr><td class="num">50 – 54</td><td>D</td><td class="num">1.00</td></tr>
              <tr><td class="num">50 سے کم یا غیر حاضر</td><td>F</td><td class="num">0.00</td></tr>
            </tbody>
          </table>
        </div>
        <p>غور کریں کہ یہ ٹیبل ایچ ای سی کے عام ٹیبل سے تھوڑا مختلف ہے۔ یہاں A- کے 3.70 اور B+ کے 3.30 پوائنٹس ہیں (3.67 اور 3.33 نہیں)، B کی حد 70 سے شروع ہوتی ہے، اور D+ کا کوئی گریڈ نہیں: 50 سے 54 نمبر سیدھا D یعنی 1.00 ہے۔ اس لیے کسی دوسری یونیورسٹی کا کیلکولیٹر استعمال کرنے سے آپ کا GPA تھوڑا غلط آ سکتا ہے۔</p>
      </section>

      <section id="example">
        <h2>GPA اور CGPA کیسے نکالیں: مثال کے ساتھ</h2>
        <p>سمسٹر کا GPA نکالنے کے لیے ہر مضمون کے گریڈ پوائنٹس کو اس کے کریڈٹ آورز سے ضرب دیں، سب کو جمع کریں اور کل کریڈٹ آورز سے تقسیم کر دیں:</p>
        <p class="formula-block">GPA = Σ (کریڈٹ آورز × گریڈ پوائنٹس) ÷ Σ کریڈٹ آورز</p>
        <p>فرض کریں سارہ نے پہلے سمسٹر میں یہ نمبر لیے:</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">مضمون</th><th scope="col" class="num">کریڈٹ آورز</th><th scope="col" class="num">نمبر</th><th scope="col">گریڈ</th><th scope="col" class="num">کریڈٹ × پوائنٹس</th></tr></thead>
            <tbody>
              <tr><td>کیلکولس</td><td class="num">3</td><td class="num">86</td><td>A (4.00)</td><td class="num">12.00</td></tr>
              <tr><td>فزکس</td><td class="num">3</td><td class="num">78</td><td>B+ (3.30)</td><td class="num">9.90</td></tr>
              <tr><td>پروگرامنگ</td><td class="num">3</td><td class="num">72</td><td>B (3.00)</td><td class="num">9.00</td></tr>
              <tr><td>اسلامیات</td><td class="num">2</td><td class="num">63</td><td>C+ (2.30)</td><td class="num">4.60</td></tr>
              <tr><td>انگلش</td><td class="num">3</td><td class="num">66</td><td>B- (2.70)</td><td class="num">8.10</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">کل</th><td class="num">14</td><td></td><td></td><td class="num">43.60</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">GPA = 43.60 ÷ 14 = 3.11</p>
        <p>دوسرے سمسٹر میں سارہ کے 16 کریڈٹ آورز ہیں اور GPA 3.40 آتا ہے، یعنی 3.40 × 16 = 54.40 پوائنٹس۔ CGPA تمام کورسز کی کریڈٹ کے حساب سے اوسط ہے:</p>
        <p class="formula-block">CGPA = (43.60 + 54.40) ÷ (14 + 16) = 98.00 ÷ 30 = 3.27</p>
        <p>اگر آپ دونوں سمسٹرز کے GPA کی سادہ اوسط لیں تو (3.11 + 3.40) ÷ 2 = 3.26 آئے گا، جو درست نہیں، کیونکہ زیادہ کریڈٹ والا سمسٹر زیادہ وزن رکھتا ہے۔ F والا مضمون صفر پوائنٹس کے ساتھ حساب میں شامل ہوتا ہے، یعنی اس کے کریڈٹ آورز تقسیم میں گنے جاتے ہیں۔ کیلکولیٹر کا CGPA ٹیب یہ سب خود کر دیتا ہے۔</p>
      </section>

      <section id="promotion">
        <h2>پروموشن، پروبیشن اور کم از کم CGPA</h2>
        <ul>
          <li><strong>پہلا سمسٹر:</strong> GPA 2.00 یا زیادہ ہو تو اگلے سمسٹر میں پروموشن۔ 1.50 سے 2.00 کے درمیان ہو تو پروبیشن پر پروموشن۔ 1.50 سے کم ہو تو نام خارج۔</li>
          <li><strong>دوسرے سمسٹر سے آگے:</strong> CGPA 2.00 یا زیادہ ہو تو پروموشن، 1.70 سے 2.00 کے درمیان ہو تو پروبیشن، اور 1.70 سے کم ہو تو نام خارج۔</li>
          <li><strong>پروبیشن</strong> پورے پروگرام میں دو بار تک مل سکتی ہے۔</li>
          <li><strong>ڈگری کے لیے</strong> (بی ایس یا ایسوسی ایٹ ڈگری) کم از کم CGPA 2.00 ضروری ہے۔</li>
          <li><strong>F اور D گریڈ</strong> والے مضامین دوبارہ رجسٹر کر کے بہتر گریڈ کے لیے پڑھے جا سکتے ہیں۔</li>
        </ul>
        <p>اگر آپ کا CGPA 2.00 سے نیچے ہے تو کیلکولیٹر کا ٹارگٹ ٹیب بتاتا ہے کہ اگلے سمسٹرز میں کتنا GPA چاہیے۔</p>
      </section>

      <section id="percentage">
        <h2>پنجاب یونیورسٹی CGPA سے فیصد</h2>
        <p>سمسٹر قواعد کے مطابق ٹرانسکرپٹ کے سامنے والے حصے پر GPA/CGPA کے ساتھ حاصل کردہ CGPA کے مقابلے میں مجموعی فیصد بھی لکھا جاتا ہے، لیکن قواعد میں اس کا فارمولا نہیں دیا گیا۔ اس لیے کسی فارم پر فیصد لکھنا ہو تو اپنے ٹرانسکرپٹ والا فیصد ہی لکھیں۔</p>
        <p>اگر ٹرانسکرپٹ ابھی نہیں ملا تو اندازے کے لیے عام طریقہ (CGPA ÷ 4) × 100 ہے، مثلاً 3.27 کا تقریباً 81.75%۔ فیصد والا ٹیب یہی دکھاتا ہے، لیکن یہ سرکاری فارمولا نہیں، اس لیے <strong>اپنی یونیورسٹی سے تصدیق ضرور کریں</strong>۔</p>
      </section>`,
      sources: [
        ['University of the Punjab: Semester Rules & Regulations for Undergraduate Studies (grading, GPA/CGPA، پروموشن)', 'https://pu.edu.pk/puac/download/Semester_Rules.pdf']
      ],
      faq: [
        ['پنجاب یونیورسٹی میں A گریڈ کتنے نمبروں پر ملتا ہے؟', '85 فیصد یا اس سے زیادہ نمبروں پر A ملتا ہے جس کے 4.00 گریڈ پوائنٹس ہیں۔ 80 سے 84 پر A- (3.70) اور 75 سے 79 پر B+ (3.30) ملتا ہے۔'],
        ['پنجاب یونیورسٹی میں پاس ہونے کے لیے کتنے نمبر چاہئیں؟', 'کسی مضمون میں کم از کم 50 فیصد نمبر چاہئیں، جو D گریڈ (1.00) ہے۔ 50 سے کم نمبر یا غیر حاضری F ہے۔ ڈگری کے لیے کم از کم 2.00 CGPA بھی ضروری ہے۔'],
        ['اگر میرے نمبر 64.5 ہوں تو کون سا گریڈ ملے گا؟', 'پنجاب یونیورسٹی کے قواعد میں کسر کو پورا ایک نمبر گنا جاتا ہے، اس لیے 64.5 کو 65 گنا جائے گا اور B- (2.70) ملے گا۔ کیلکولیٹر یہ خود کر دیتا ہے۔'],
        ['پنجاب یونیورسٹی میں CGPA کیسے نکالا جاتا ہے؟', 'تمام مضامین کے (کریڈٹ آورز × گریڈ پوائنٹس) جمع کر کے کل کریڈٹ آورز سے تقسیم کریں۔ یہ کریڈٹ کے حساب سے اوسط ہے، اس لیے سمسٹرز کے GPA کی سادہ اوسط لینا درست نہیں جب کریڈٹ آورز برابر نہ ہوں۔'],
        ['پنجاب یونیورسٹی کا CGPA فیصد میں کیسے بدلیں؟', 'قواعد کے مطابق ٹرانسکرپٹ پر CGPA کے ساتھ مجموعی فیصد لکھا جاتا ہے، لیکن فارمولا قواعد میں نہیں دیا گیا۔ وہی فیصد استعمال کریں۔ اندازے کے لیے (CGPA ÷ 4) × 100 عام طریقہ ہے، مگر اس کی تصدیق یونیورسٹی سے کریں۔']
      ]
    },

    {
      slug: 'bzu-cgpa-calculator',
      short: 'BZU',
      name: 'بہاءالدین زکریا یونیورسٹی (BZU ملتان) CGPA اور GPA کیلکولیٹر',
      title: 'BZU ملتان CGPA کیلکولیٹر – نمبروں سے GPA (ریڈی ریکنر ٹیبل)',
      desc: 'بہاءالدین زکریا یونیورسٹی ملتان کے ریڈی ریکنر ٹیبل سے نمبروں کے حساب سے GPA اور CGPA نکالیں: 50 نمبر پر 2.0 اور 80 یا زیادہ پر 4.0۔',
      lead: 'BZU ملتان میں ہر اضافی نمبر کے ساتھ گریڈ پوائنٹس بڑھتے ہیں: 50 نمبر پر 2.0، 65 پر 3.0 اور 80 یا زیادہ پر 4.0۔ اپنے نمبر لکھیں اور یونیورسٹی کے ریڈی ریکنر ٹیبل کے مطابق اپنا GPA اور CGPA فوراً دیکھیں۔',
      guideLink: 'BZU کی گریڈنگ کیسے کام کرتی ہے',
      card: 'نمبر کے حساب سے پوائنٹس · 50% پر پاس',
      scaleCard: {
        title: 'گریڈنگ سسٹم: بہاءالدین زکریا یونیورسٹی ملتان',
        text: 'ہر مضمون کے سو میں سے نمبر لکھیں۔ گریڈ پوائنٹس BZU کے ریڈی ریکنر ٹیبل سے آتے ہیں جو ایک اعشاریہ تک ہوتے ہیں۔'
      },
      config: `{
        storageKey: 'cgpa-bzu',
        scales: {
          bzu: {
            max: 4, label: 'BZU 4.0 اسکیل', region: 'بہاءالدین زکریا یونیورسٹی ملتان · ریڈی ریکنر ٹیبل', example: '3.40', modes: ['marks', 'points'],
            grades: [['A', 4, 80], ['B', 3.9, 65, 3], ['C', 2.9, 50, 2], ['F', 0, 0]],
            marksToPoints: function (m) { return m >= 80 ? 4 : m >= 50 ? Math.round((m - 20) / 15 * 10 + 1e-9) / 10 : 0; }
          }
        },
        conversions: {
          bzu: {
            formula: 'ریڈی ریکنر ٹیبل الٹا پڑھ کر اوسط نمبر',
            example: 3.4,
            note: 'BZU کا CGPA سے فیصد کا کوئی سرکاری فارمولا ہمیں نہیں ملا۔ یہ ٹیب ریڈی ریکنر ٹیبل کو الٹا پڑھ کر بتاتا ہے کہ آپ کا CGPA تقریباً کتنے اوسط نمبروں کے برابر ہے۔ فارم پر لکھنے سے پہلے یونیورسٹی سے تصدیق کریں۔',
            result: function (c) {
              var v = Math.round(c * 100 + 1e-9) / 100;
              if (v >= 4) return { pct: 80, text: '80% یا زیادہ', work: 'CGPA 4.00 کا مطلب ہر مضمون میں 80% یا زیادہ نمبر' };
              if (v >= 2) { var p = 15 * v + 20; return { pct: p, text: p.toFixed(1) + '%', work: '15 × ' + v.toFixed(2) + ' + 20 = ' + p.toFixed(1) + '%' }; }
              return { pct: 0, text: '50% سے کم', work: 'CGPA ' + v.toFixed(2) + ' کا مطلب 50% سے کم نمبر، یعنی F' };
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
        'ہر کورس میں پاس ہونے کے لیے <strong>50% نمبر</strong> چاہئیں، جس پر 2.0 گریڈ پوائنٹس (C) ملتے ہیں۔',
        'ہر اضافی نمبر پر پوائنٹس بڑھتے ہیں: <strong>65 = 3.0</strong> اور <strong>80 یا زیادہ = 4.0</strong>۔',
        'گریڈ صرف تین ہیں: <strong>A</strong> (80+)، <strong>B</strong> (65–79) اور <strong>C</strong> (50–64)۔',
        'BBA کے لیے آٹھویں سمسٹر کے آخر میں کم از کم <strong>2.2 CGPA</strong> چاہیے۔'
      ],
      article: () => `
      <section id="how-it-works">
        <h2>BZU ملتان میں گریڈنگ کیسے ہوتی ہے</h2>
        <p>بہاءالدین زکریا یونیورسٹی ملتان میں ہر کورس سو نمبروں کا ہوتا ہے۔ ان میں مڈٹرم اور فائنل امتحان کے ساتھ اسائنمنٹس، کوئز، پریزنٹیشن اور پراجیکٹ کے نمبر شامل ہوتے ہیں، اور ہر استاد سمسٹر کے شروع میں بتاتا ہے کہ کس چیز کا کتنا وزن ہے۔ انڈرگریجویٹ اور گریجویٹ دونوں کورسز میں پاس ہونے کے لیے پچاس فیصد نمبر ضروری ہیں۔</p>
        <p>BZU کا سب سے خاص پہلو اس کا ریڈی ریکنر ٹیبل ہے۔ یہاں ہر B گریڈ کے برابر پوائنٹس نہیں ہوتے، بلکہ ہر اضافی نمبر کے ساتھ گریڈ پوائنٹس تھوڑے بڑھتے ہیں۔ 65 نمبر پر 3.0 پوائنٹس ہیں اور 79 پر 3.9، حالانکہ دونوں B ہیں۔ اسی لیے یہ کیلکولیٹر آپ سے لیٹر گریڈ کے بجائے نمبر پوچھتا ہے۔</p>
      </section>

      <section id="grade-points">
        <h2>BZU ریڈی ریکنر ٹیبل</h2>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">گریڈ</th><th scope="col" class="num">نمبر</th><th scope="col" class="num">گریڈ پوائنٹس (GPA)</th></tr></thead>
            <tbody>
              <tr><td>A</td><td class="num">80 – 100</td><td class="num">4.0</td></tr>
              <tr><td>B</td><td class="num">65 – 79</td><td class="num">3.0 – 3.9</td></tr>
              <tr><td>C</td><td class="num">50 – 64</td><td class="num">2.0 – 2.9</td></tr>
              <tr><td>F</td><td class="num">50 سے کم</td><td class="num">0</td></tr>
            </tbody>
          </table>
        </div>
        <p>50 سے 80 نمبروں کے درمیان ٹیبل کے پوائنٹس ایک اعشاریہ تک ہیں، مثلاً:</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col" class="num">نمبر</th><th scope="col" class="num">پوائنٹس</th><th scope="col" class="num">نمبر</th><th scope="col" class="num">پوائنٹس</th><th scope="col" class="num">نمبر</th><th scope="col" class="num">پوائنٹس</th></tr></thead>
            <tbody>
              <tr><td class="num">50</td><td class="num">2.0</td><td class="num">60</td><td class="num">2.7</td><td class="num">70</td><td class="num">3.3</td></tr>
              <tr><td class="num">53</td><td class="num">2.2</td><td class="num">63</td><td class="num">2.9</td><td class="num">72</td><td class="num">3.5</td></tr>
              <tr><td class="num">55</td><td class="num">2.3</td><td class="num">65</td><td class="num">3.0</td><td class="num">75</td><td class="num">3.7</td></tr>
              <tr><td class="num">57</td><td class="num">2.5</td><td class="num">68</td><td class="num">3.2</td><td class="num">78</td><td class="num">3.9</td></tr>
            </tbody>
          </table>
        </div>
        <p>اگر غور کریں تو پورا ٹیبل ایک سادہ اصول پر چلتا ہے: <strong>پوائنٹس = (نمبر − 20) ÷ 15</strong>، ایک اعشاریہ تک۔ مثلاً 71 نمبر: (71 − 20) ÷ 15 = 3.4۔ کیلکولیٹر یہی حساب لگاتا ہے اور اس کے نتائج ٹیبل کی ہر لائن سے ملتے ہیں۔</p>
      </section>

      <section id="example">
        <h2>BZU کا GPA اور CGPA کیسے نکالیں: مثال</h2>
        <p class="formula-block">GPA = Σ (کریڈٹ آورز × گریڈ پوائنٹس) ÷ Σ کریڈٹ آورز</p>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th scope="col">مضمون</th><th scope="col" class="num">کریڈٹ</th><th scope="col" class="num">نمبر</th><th scope="col" class="num">پوائنٹس</th><th scope="col" class="num">کریڈٹ × پوائنٹس</th></tr></thead>
            <tbody>
              <tr><td>اکنامکس</td><td class="num">3</td><td class="num">82</td><td class="num">4.0</td><td class="num">12.0</td></tr>
              <tr><td>اکاؤنٹنگ</td><td class="num">3</td><td class="num">71</td><td class="num">3.4</td><td class="num">10.2</td></tr>
              <tr><td>بزنس میتھ</td><td class="num">3</td><td class="num">66</td><td class="num">3.1</td><td class="num">9.3</td></tr>
              <tr><td>مطالعہ پاکستان</td><td class="num">2</td><td class="num">58</td><td class="num">2.5</td><td class="num">5.0</td></tr>
              <tr><td>انگلش</td><td class="num">3</td><td class="num">75</td><td class="num">3.7</td><td class="num">11.1</td></tr>
            </tbody>
            <tfoot><tr><th scope="row">کل</th><td class="num">14</td><td></td><td></td><td class="num">47.6</td></tr></tfoot>
          </table>
        </div>
        <p class="formula-block">GPA = 47.6 ÷ 14 = 3.40</p>
        <p>CGPA بھی اسی طرح بنتا ہے: تمام سمسٹرز کے (کریڈٹ × پوائنٹس) جمع کر کے کل کریڈٹ آورز سے تقسیم کریں۔ کیلکولیٹر کے CGPA ٹیب میں ہر سمسٹر کا GPA اور کریڈٹ آورز لکھیں تو یہ کام خود ہو جاتا ہے۔</p>
        <p><strong>کیلکولیٹر کا مشورہ:</strong> اگر آپ کے رزلٹ کارڈ پر نمبر کے بجائے پوائنٹس لکھے ہیں تو "Grade points" موڈ چنیں اور وہی پوائنٹس لکھ دیں۔</p>
      </section>

      <section id="rules">
        <h2>پروموشن اور ڈگری کے لیے کم از کم CGPA</h2>
        <ul>
          <li>ہر کورس پاس کرنے کے لیے کم از کم <strong>50%</strong> نمبر (C گریڈ) چاہئیں، اور اگلے سمسٹر میں پروموشن کے لیے بھی یہی کم از کم معیار ہے۔</li>
          <li><strong>BBA:</strong> ہر سمسٹر میں مجموعی GPA کم از کم 2.0 رکھنا اور آٹھویں سمسٹر کے آخر میں کم از کم 2.2 CGPA حاصل کرنا ضروری ہے۔</li>
          <li><strong>MBA:</strong> ہر سمسٹر میں 2.0 اور چوتھے سمسٹر کے آخر میں کم از کم 2.2 CGPA۔</li>
          <li>کمپری ہینسو امتحان صرف پاس یا فیل ہوتا ہے، اس کے نمبر یا گریڈ نہیں ہوتے۔</li>
        </ul>
        <p>یہ قواعد BZU کے انسٹی ٹیوٹ آف مینجمنٹ سائنسز کی اسٹوڈنٹ ہینڈ بک 2023-24 سے لیے گئے ہیں۔ دوسرے شعبوں کے قواعد کچھ مختلف ہو سکتے ہیں، اس لیے <strong>اپنے شعبے سے تصدیق کریں</strong>۔</p>
      </section>

      <section id="percentage">
        <h2>BZU CGPA سے فیصد</h2>
        <p>ہمیں BZU کا CGPA سے فیصد نکالنے کا کوئی سرکاری فارمولا نہیں ملا۔ فیصد والا ٹیب ریڈی ریکنر ٹیبل کو الٹا پڑھتا ہے: <strong>فیصد ≈ 15 × CGPA + 20</strong>۔ مثلاً CGPA 3.40 تقریباً 71% اوسط نمبروں کے برابر ہے۔ یہ صرف اندازہ ہے، سرکاری فارمولا نہیں، اس لیے <strong>اپنی یونیورسٹی سے تصدیق کریں</strong>۔</p>
      </section>`,
      sources: [
        ['Bahauddin Zakariya University, Institute of Management Sciences: Students Handbook 2023-2024 (Grading Scheme، Ready Reckoner Table)', 'https://bzu.edu.pk/assets/imsdocs/IMS-Students-Handbook-2023-2024.pdf']
      ],
      faq: [
        ['BZU میں 70 نمبروں کا GPA کتنا ہے؟', 'BZU کے ریڈی ریکنر ٹیبل کے مطابق 70 نمبر پر 3.3 گریڈ پوائنٹس ملتے ہیں، جو B گریڈ ہے۔ 65 پر 3.0 اور 80 یا زیادہ پر 4.0 ملتے ہیں۔'],
        ['BZU میں پاسنگ مارکس کتنے ہیں؟', 'انڈرگریجویٹ اور گریجویٹ دونوں کورسز میں پاس ہونے کے لیے 50 فیصد نمبر چاہئیں۔ 50 نمبر پر 2.0 پوائنٹس (C گریڈ) ملتے ہیں اور اس سے کم F ہے۔'],
        ['ایک ہی B گریڈ پر GPA مختلف کیوں ہے؟', 'BZU میں پوائنٹس نمبر کے حساب سے بڑھتے ہیں۔ B گریڈ 65 سے 79 نمبر تک ہے، جس میں پوائنٹس 3.0 سے 3.9 تک جاتے ہیں۔ اس لیے صرف گریڈ نہیں بلکہ اصل نمبر اہم ہیں۔'],
        ['BZU میں ڈگری کے لیے کتنا CGPA چاہیے؟', 'BBA کے لیے آٹھویں سمسٹر کے آخر میں کم از کم 2.2 CGPA اور ہر سمسٹر میں کم از کم 2.0 مجموعی GPA چاہیے۔ دوسرے پروگراموں کے لیے اپنے شعبے کے قواعد دیکھیں۔'],
        ['BZU کا CGPA فیصد میں کیسے بدلیں؟', 'سرکاری فارمولا ہمیں نہیں ملا۔ ریڈی ریکنر ٹیبل الٹا پڑھنے سے فیصد تقریباً 15 × CGPA + 20 بنتا ہے، یعنی 3.40 تقریباً 71%۔ فارم پر لکھنے سے پہلے یونیورسٹی سے تصدیق کریں۔']
      ]
    }
  ]
};
