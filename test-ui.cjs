const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => {
    // skip network errors about locales
    if (!msg.text().includes('locales')) {
      console.log('LOG:', msg.text());
    }
  });
  await page.goto('http://localhost:5001', {waitUntil: 'networkidle'});
  await new Promise(r => setTimeout(r, 2000));
  
  const debugData = await page.evaluate(() => {
    try {
      const c = document.getElementById('playground-canvas');
      const pg = window.playground || null;
      let uiLoaded = typeof window.todoMonsterData !== 'undefined';
      return { 
        canvas: { w: c.width, h: c.height, display: c.style.display },
        chars: pg ? pg.characters.length : 'no pg',
        ui: uiLoaded ? 'loaded' : 'not loaded',
        hasPlayerNode: !!document.querySelector('.monster-container')
      };
    } catch(e) {
      return { error: e.message };
    }
  });
  console.log('Final Verification Data:', debugData);
  await browser.close();
})();
