const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message, err.stack));
  
  await page.goto('http://localhost:5001', {waitUntil: 'networkidle'});
  await new Promise(r => setTimeout(r, 3000));
  
  await page.screenshot({ path: 'current_error.png', fullPage: true });
  await browser.close();
  console.log('Screenshot saved to current_error.png');
})();
