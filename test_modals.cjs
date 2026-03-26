const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate and wait for load
  await page.goto('http://localhost:5001', {waitUntil: 'networkidle'});
  await new Promise(r => setTimeout(r, 2000));
  
  // Switch to English
  await page.evaluate(() => {
    document.querySelector('.lang-btn[data-lang="en"]').click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Open Furniture
  await page.evaluate(() => {
    document.getElementById('backpack-btn').click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => {
    document.getElementById('tab-furniture').click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'test_furniture_en.png' });

  // Close modals
  await page.evaluate(() => {
    document.getElementById('overlay').click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Open Friends
  await page.evaluate(() => {
    document.getElementById('add-friend-btn').click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'test_friends_en.png' });
  
  await browser.close();
  console.log('Screenshots saved: test_furniture_en.png, test_friends_en.png');
})();
