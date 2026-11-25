// Vérifie la page dans un vrai navigateur : accessibilité (axe-core, WCAG 2.1 A et AA + bonnes pratiques),
// erreurs JavaScript, défilement horizontal, langue et liens dans les deux langues, thèmes clair et sombre, bureau et mobile.
// Usage : npm install --no-save playwright@1.56.0 axe-core@4.10.2 && npx playwright install chromium && node tools/check.js [dossier-captures]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const url = 'file://' + path.resolve(__dirname, '..', 'index.html');
const shots = process.argv[2];
const SITES = ['Observatories', 'SolarExplorers', 'EarthObservers'];
(async () => {
  const b = await chromium.launch(); let bad = 0;
  for (const [name, width, lang, scheme] of [
    ['en-desktop', 1280, 'en', 'light'], ['fr-desktop', 1280, 'fr', 'light'],
    ['en-dark', 1280, 'en', 'dark'], ['fr-dark', 1280, 'fr', 'dark'], ['fr-mobile', 375, 'fr', 'light'], ['en-mobile', 375, 'en', 'dark'],
  ]) {
    const ctx = await b.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(url + '#' + lang); await p.waitForTimeout(200);
    await p.addScriptTag({ content: AXE });
    const v = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] }))
      .violations.map(x => x.id + ' (' + x.nodes.map(n => n.target.join(' ')).join(', ') + ')'));
    const st = await p.evaluate(() => ({ lang: document.documentElement.lang, hs: document.documentElement.scrollWidth - innerWidth,
      links: [...document.querySelectorAll('.site h2 a')].map(a => a.href) }));
    const pb = [...v, ...errs];
    if (st.lang !== lang) pb.push('langue ' + st.lang);
    if (st.hs > 0) pb.push('défilement horizontal de ' + st.hs + ' px');
    SITES.forEach((s, i) => { if (st.links[i] !== 'https://rolgim.github.io/' + s + '/#' + lang + '-') pb.push('lien ' + st.links[i]); });
    console.log((pb.length ? 'ÉCHEC ' : 'ok    ') + name + (pb.length ? ' : ' + pb.join(' ; ') : ''));
    bad += pb.length;
    if (shots) { fs.mkdirSync(shots, { recursive: true }); await p.screenshot({ path: path.join(shots, name + '.png'), fullPage: true }); }
    await ctx.close();
  }
  // le bouton de langue bascule la page et mémorise le choix
  const ctx = await b.newContext(); const p = await ctx.newPage();
  await p.goto(url); await p.click('#b-lang');
  const after = await p.evaluate(() => [document.documentElement.lang, location.hash, localStorage.getItem('home-lang')]);
  if (after.join() !== 'fr,#fr,fr') { console.log('ÉCHEC bouton de langue : ' + after); bad++; } else console.log('ok    bouton de langue');
  await b.close(); process.exit(bad ? 1 : 0);
})();
