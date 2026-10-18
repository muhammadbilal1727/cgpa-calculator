/* =========================================================
   Translates the whole site into other languages.

     node tools/i18n.js extract   → writes i18n/en.json (every English string, numbered)
     node tools/i18n.js build     → writes <lang>/*.html and i18n/<lang>.js for every
                                    language that has an i18n/<lang>.json translation file

   How it works: each English page is opened in headless Chrome with JavaScript
   switched off (so we see the HTML exactly as written). Text blocks, button labels,
   placeholders, titles and meta tags are collected as "segments". A translation
   file maps segment ids to translated text; the build swaps them in, fixes links,
   adds hreflang tags and the language menu, and saves the page in /<lang>/.
   Calculator messages produced by script.js use t('English…') and are translated
   at run time from i18n/<lang>.js.

   Run `node tools/build-university-pages.js` first if index.html changed.
   Needs Google Chrome installed (CHROME env var to override the path).
   ========================================================= */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://cgpa-calculator-umber-two.vercel.app';
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PAGES = ['index.html', 'nust-cgpa-calculator.html', 'comsats-cgpa-calculator.html', 'vtu-cgpa-calculator.html',
  'about.html', 'privacy-policy.html', 'terms.html', 'contact.html'];
const NAV_PAGES = ['index.html', 'about.html', 'privacy-policy.html', 'terms.html', 'contact.html'];

// code, folder, html lang, hreflang, native name, short label, og:locale, right-to-left
const LANGS = [
  ['en', '', 'en', 'en', 'English', 'EN', 'en_US'],
  ['es', 'es', 'es', 'es', 'Español', 'ES', 'es_ES'],
  ['de', 'de', 'de', 'de', 'Deutsch', 'DE', 'de_DE'],
  ['hi', 'hi', 'hi', 'hi', 'हिन्दी', 'HI', 'hi_IN'],
  ['ur', 'ur', 'ur', 'ur', 'اردو', 'UR', 'ur_PK', true],
  ['zh', 'zh', 'zh-Hans', 'zh-Hans', '简体中文', 'ZH', 'zh_CN'],
  ['fr', 'fr', 'fr', 'fr', 'Français', 'FR', 'fr_FR'],
  ['ar', 'ar', 'ar', 'ar', 'العربية', 'AR', 'ar_AR', true],
  ['bn', 'bn', 'bn', 'bn', 'বাংলা', 'BN', 'bn_BD'],
  ['pt', 'pt', 'pt', 'pt', 'Português', 'PT', 'pt_BR'],
  ['ru', 'ru', 'ru', 'ru', 'Русский', 'RU', 'ru_RU'],
  ['id', 'id', 'id', 'id', 'Bahasa Indonesia', 'ID', 'id_ID'],
  ['ja', 'ja', 'ja', 'ja', '日本語', 'JA', 'ja_JP'],
  ['mr', 'mr', 'mr', 'mr', 'मराठी', 'MR', 'mr_IN'],
  ['te', 'te', 'te', 'te', 'తెలుగు', 'TE', 'te_IN']
].map(([code, dir, htmlLang, hreflang, name, short, locale, rtl]) => ({ code, dir, htmlLang, hreflang, name, short, locale, rtl: !!rtl }));

/* ---------- Chrome (DevTools protocol) ---------- */
async function openChrome() {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'cgpa-i18n-'));
  const port = 9400 + Math.floor(Math.random() * 400);
  const proc = spawn(CHROME, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank']);
  let target;
  for (let i = 0; i < 60 && !target; i++) {
    await new Promise(r => setTimeout(r, 200));
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t => t.type === 'page'); } catch (e) { /* not up yet */ }
  }
  if (!target) throw new Error('Could not start Chrome at ' + CHROME);
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));
  let seq = 0; const pending = new Map(); const waiters = [];
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    else waiters.slice().forEach(w => w(m));
  });
  const send = (method, params = {}) => new Promise(r => { const id = ++seq; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
  await send('Page.enable');
  await send('Emulation.setScriptExecutionDisabled', { value: true });
  return {
    async load(file) {
      const loaded = new Promise(r => { const w = m => { if (m.method === 'Page.loadEventFired') { waiters.splice(waiters.indexOf(w), 1); r(); } }; waiters.push(w); });
      await send('Page.navigate', { url: 'file:///' + path.join(ROOT, file).replace(/\\/g, '/').replace(/ /g, '%20') });
      await loaded;
    },
    async run(fn, arg) {
      const r = await send('Runtime.evaluate', { expression: `(${fn})(${JSON.stringify(arg)})`, returnByValue: true, awaitPromise: true });
      if (r.result.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text);
      return r.result.result.value;
    },
    close() { ws.close(); proc.kill(); setTimeout(() => { try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) { /* in use */ } }, 800); }
  };
}

/* ---------- Runs inside the page: find (and optionally replace) every translatable string ---------- */
function pageSegments(arg) {
  const BLOCK = new Set(['P', 'DIV', 'LI', 'UL', 'OL', 'H1', 'H2', 'H3', 'H4', 'TABLE', 'THEAD', 'TBODY', 'TFOOT', 'TR', 'TD', 'TH',
    'SECTION', 'ARTICLE', 'NAV', 'HEADER', 'FOOTER', 'MAIN', 'ASIDE', 'DETAILS', 'SUMMARY', 'LABEL', 'BUTTON', 'SELECT', 'OPTION', 'BODY']);
  const SKIP = new Set(['SCRIPT', 'STYLE', 'svg', 'SVG', 'NOSCRIPT', 'TEMPLATE', 'INPUT', 'TEXTAREA']);
  const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
  const norm = s => s.replace(/\s+/g, ' ').trim();
  const worth = s => /\p{L}/u.test(s) && !/^(?:[A-Z][+-]?|XF|O|S)$/.test(s); // skip numbers and lone grade letters
  const tr = arg && arg.tr; // { english: translation } when building
  const found = [];
  const take = (english, apply) => {
    if (!worth(english)) return;
    found.push(english);
    if (tr && tr[english] != null) apply(tr[english]);
  };

  // Head: <title> and meta descriptions/titles
  take(norm(document.title), v => { document.title = v; });
  document.querySelectorAll('meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[property="og:image:alt"], meta[name="twitter:title"], meta[name="twitter:description"], meta[name="twitter:image:alt"]')
    .forEach(m => take(norm(m.content), v => { m.content = v; }));

  (function walk(el) {
    if (SKIP.has(el.tagName) || el.hasAttribute('data-no-translate')) return;
    ATTRS.forEach(a => { if (el.hasAttribute(a)) take(norm(el.getAttribute(a)), v => el.setAttribute(a, v)); });
    const directText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    const hasBlock = [...el.querySelectorAll('*')].some(d => BLOCK.has(d.tagName));
    const hasWidgets = el.querySelector('svg, input, select, textarea, [data-no-translate]');
    if (directText && !hasBlock && !hasWidgets) {
      take(norm(el.innerHTML), v => { el.innerHTML = v; });
      el.querySelectorAll('*').forEach(d => ATTRS.forEach(a => { if (d.hasAttribute(a)) take(norm(d.getAttribute(a)), v => d.setAttribute(a, v)); }));
      return;
    }
    if (directText && hasWidgets) { // e.g. a button with an icon: translate its own text pieces only
      [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).forEach(n => {
        const lead = n.textContent.match(/^\s*/)[0], tail = n.textContent.match(/\s*$/)[0];
        take(norm(n.textContent), v => { n.textContent = lead + v + tail; });
      });
    }
    [...el.children].forEach(walk);
  })(document.body);

  // Structured data: app name/description/features and breadcrumb names (FAQ is rebuilt from the page)
  document.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
    const d = JSON.parse(s.textContent);
    const tx = (o, k) => { if (typeof o[k] === 'string') take(norm(o[k]), v => { o[k] = v; }); };
    if (d['@type'] === 'WebApplication') { tx(d, 'name'); tx(d, 'description'); (d.featureList || []).forEach((f, i, a) => tx(a, i)); }
    if (d['@type'] === 'BreadcrumbList') d.itemListElement.forEach(it => tx(it, 'name'));
    if (tr) s.textContent = '\n' + JSON.stringify(d, null, 2) + '\n  ';
  });
  return found;
}

/* ---------- Runs inside the page when building: links, language menu, hreflang, FAQ data ---------- */
function finishPage(o) {
  const html = document.documentElement;
  html.lang = o.htmlLang;
  if (o.rtl) html.dir = 'rtl'; else html.removeAttribute('dir');
  const head = document.head;

  if (o.prefix) { // pages inside /xx/: shared files live one folder up
    document.querySelectorAll('[href], [src]').forEach(el => {
      ['href', 'src'].forEach(a => {
        const v = el.getAttribute(a);
        if (!v || /^(?:[a-z]+:|#|\/|\.\.\/)/i.test(v) || /\.html(?:#|$)/.test(v)) return;
        el.setAttribute(a, '../' + v);
      });
    });
  }

  // Header: same as index.html on every page, with the current page highlighted
  if (o.header) {
    const old = document.querySelector('header.site-header');
    const tmp = document.createElement('div'); tmp.innerHTML = o.header;
    old.replaceWith(tmp.firstElementChild);
    document.querySelectorAll('#siteNav a').forEach(a => {
      if (a.getAttribute('href') === o.page) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  // Language menu
  const list = document.querySelector('.lang-list');
  if (list) {
    list.innerHTML = o.langs.map(l => `<a href="${l.href}" hreflang="${l.hreflang}" lang="${l.htmlLang}"${l.current ? ' aria-current="true"' : ''}>${l.name}</a>`).join('');
    document.querySelector('.lang-code').textContent = o.short;
  }

  // Canonical, og:url, og:locale and hreflang alternates
  head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(l => l.remove());
  const setLink = (rel, href) => { let l = head.querySelector(`link[rel="${rel}"]`); if (!l) { l = document.createElement('link'); l.rel = rel; head.appendChild(l); } l.href = href; };
  setLink('canonical', o.canonical);
  const canonical = head.querySelector('link[rel="canonical"]');
  o.langs.concat([{ hreflang: 'x-default', abs: o.xDefault }]).reverse().forEach(l => {
    const a = document.createElement('link'); a.rel = 'alternate'; a.hreflang = l.hreflang; a.href = l.abs;
    canonical.after(a); canonical.after(document.createTextNode('\n  '));
  });
  const og = head.querySelector('meta[property="og:url"]'); if (og) og.content = o.canonical;
  let loc = head.querySelector('meta[property="og:locale"]');
  if (!loc) {
    loc = document.createElement('meta'); loc.setAttribute('property', 'og:locale');
    const site = head.querySelector('meta[property="og:site_name"]');
    site.after(loc); site.after(document.createTextNode('\n  '));
  }
  loc.content = o.locale;
  head.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
    const d = JSON.parse(s.textContent);
    if (d.url) d.url = o.canonical;
    if (d['@id']) d['@id'] = o.canonical + '#app';
    if (d.inLanguage) d.inLanguage = o.htmlLang;
    if (d['@type'] === 'BreadcrumbList') { d.itemListElement[0].item = o.home; d.itemListElement[d.itemListElement.length - 1].item = o.canonical; }
    if (d['@type'] === 'FAQPage') {
      d.mainEntity = [...document.querySelectorAll('#faq details')].map(det => ({
        '@type': 'Question', name: det.querySelector('summary').textContent.trim(),
        acceptedAnswer: { '@type': 'Answer', text: det.querySelector('p').textContent.trim() }
      }));
    }
    s.textContent = '\n' + JSON.stringify(d, null, 2).replace(/^/gm, '  ') + '\n  ';
  });

  // Translated run-time messages load before the site scripts
  if (o.i18nScript && !document.querySelector('script[data-i18n]')) {
    const first = document.querySelector('script[src$="site.js"]');
    const s = document.createElement('script'); s.src = o.i18nScript; s.setAttribute('data-i18n', '');
    first.before(s); first.before(document.createTextNode('\n  '));
  }
  return '<!DOCTYPE html>\n' + document.documentElement.outerHTML + '\n';
}

/* ---------- Strings used by the calculator scripts ---------- */
function scriptStrings() {
  const out = new Set();
  const files = ['script.js', 'site.js', 'tools/build-university-pages.js'];
  const literal = /'((?:[^'\\\n]|\\.)*)'/g;
  for (const f of files) {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    if (f.endsWith('build-university-pages.js')) {
      // only the calculator config blocks of that file are used at run time
      for (const m of src.matchAll(/config: `([\s\S]*?)`,\n/g)) for (const l of m[1].matchAll(literal)) out.add(l[1]);
      continue;
    }
    for (const l of src.matchAll(literal)) out.add(l[1]);
  }
  return [...out].filter(s =>
    /\p{L}/u.test(s) && /[ ]|^(Grade|Select|Remove|Grade points)$/.test(s) &&
    !/^[.#\[<]|=|\$\{|\(\)|^(input|label|select|keydown|click|change|focusout|beforeprint)\b|\bdata-|aria-|role=|\.html|https?:|localStorage|^Requires JavaScript$/.test(s) &&
    !/^use strict$|\{placeholders\}|^ |^row[ -]|^\\/.test(s));
}

/* ---------- Commands ---------- */
async function extract() {
  const chrome = await openChrome();
  const segs = new Map();
  for (const p of PAGES) {
    await chrome.load(p);
    (await chrome.run(pageSegments, null)).forEach(s => { if (!segs.has(s)) segs.set(s, segs.size + 1); });
  }
  chrome.close();
  const js = scriptStrings().map(s => s.replace(/\\'/g, "'"));
  // Ids are permanent: strings already in en.json keep their id, new strings get the next free id,
  // so existing translation files never shift. Strings no longer used are dropped.
  const file = path.join(ROOT, 'i18n', 'en.json');
  const old = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { segments: {}, js: {} };
  const assign = (oldMap, prefix, strings) => {
    const byText = new Map(Object.entries(oldMap).map(([id, text]) => [text, id]));
    let next = Math.max(0, ...Object.keys(oldMap).map(id => Number(id.slice(1)))) + 1;
    const out = {};
    strings.forEach(s => { out[byText.get(s) || prefix + next++] = s; });
    return Object.fromEntries(Object.entries(out).sort((a, b) => Number(a[0].slice(1)) - Number(b[0].slice(1))));
  };
  const en = { segments: assign(old.segments, 's', [...segs.keys()]), js: assign(old.js, 'j', js) };
  const added = [...Object.keys(en.segments).filter(id => !old.segments[id]), ...Object.keys(en.js).filter(id => !old.js[id])];
  if (added.length) console.log('new strings to translate: ' + added.join(', '));
  fs.mkdirSync(path.join(ROOT, 'i18n'), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(en, null, 1));
  const words = [...Object.values(en.segments), ...Object.values(en.js)].join(' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`i18n/en.json: ${segs.size} page segments + ${js.length} script strings (${words} words)`);
}

async function build() {
  const en = JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', 'en.json'), 'utf8'));
  const available = LANGS.filter(l => l.code === 'en' || fs.existsSync(path.join(ROOT, 'i18n', l.code + '.json')));
  const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').replace(/\r\n/g, '\n');
  const header = index.slice(index.indexOf('<header class="site-header">'), index.indexOf('</header>') + '</header>'.length);
  const chrome = await openChrome();
  const urlOf = (l, p) => `${SITE}/${l.dir ? l.dir + '/' : ''}${p === 'index.html' ? '' : p}`;

  for (const lang of available) {
    let tr = null, missing = 0;
    if (lang.code !== 'en') {
      const file = JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', lang.code + '.json'), 'utf8'));
      tr = {};
      for (const [id, english] of Object.entries(en.segments)) {
        if (file.segments && file.segments[id] != null) tr[english] = file.segments[id]; else missing++;
      }
      const js = {};
      for (const [id, english] of Object.entries(en.js)) if (file.js && file.js[id] != null) js[english] = file.js[id]; else missing++;
      fs.writeFileSync(path.join(ROOT, 'i18n', lang.code + '.js'),
        '/* Generated by tools/i18n.js from i18n/' + lang.code + '.json */\nwindow.CGPA_I18N = ' + JSON.stringify(js, null, 1) + ';\n');
      fs.mkdirSync(path.join(ROOT, lang.dir), { recursive: true });
    }
    for (const p of PAGES) {
      await chrome.load(p);
      if (tr) await chrome.run(pageSegments, { tr });
      const html = await chrome.run(finishPage, {
        page: p, htmlLang: lang.htmlLang, rtl: lang.rtl, short: lang.short, locale: lang.locale,
        prefix: !!lang.dir, header: NAV_PAGES.includes(p) || PAGES.includes(p) ? header : null,
        canonical: urlOf(lang, p), xDefault: urlOf(LANGS[0], p), home: urlOf(lang, 'index.html'),
        i18nScript: tr ? `../i18n/${lang.code}.js` : null,
        langs: available.map(l => ({
          hreflang: l.hreflang, htmlLang: l.htmlLang, name: l.name, current: l.code === lang.code, abs: urlOf(l, p),
          href: (lang.dir ? (l.dir === lang.dir ? '' : '../' + (l.dir ? l.dir + '/' : '')) : (l.dir ? l.dir + '/' : '')) + p
        }))
      });
      fs.writeFileSync(path.join(ROOT, lang.dir, p), html);
    }
    console.log(`${lang.code}: ${PAGES.length} pages${missing ? ` (${missing} strings not translated yet, English kept)` : ''}`);
  }
  chrome.close();

  // Sitemap with every language version
  const urls = available.flatMap(l => PAGES.map(p => `  <url>\n    <loc>${urlOf(l, p)}</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n  </url>`));
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
  console.log(`sitemap.xml: ${urls.length} URLs`);
}

const cmd = process.argv[2];
(cmd === 'extract' ? extract() : cmd === 'build' ? build() : Promise.reject(new Error('Usage: node tools/i18n.js extract|build')))
  .then(() => setTimeout(() => process.exit(0), 1000))
  .catch(e => { console.error(e.message); process.exit(1); });
