const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => {
    console.log('LOG:', msg.text());
  });
  await page.goto('http://localhost:5001', {waitUntil: 'networkidle'});
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
  console.log('Browser check complete.');
})();
