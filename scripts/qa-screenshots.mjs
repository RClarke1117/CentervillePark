import { chromium } from 'playwright';
import path from 'path';

const out = '/opt/cursor/artifacts';
const base = 'https://centerville-park.pages.dev';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

await page.goto(base + '/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1200);
await page.screenshot({ path: path.join(out, '01_home_hero.png'), fullPage: false });

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(800);
await page.locator('text=Give the backyard a future').scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(out, '02_home_foundation.png'), fullPage: false });

await page.goto(base + '/parks/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(800);
// click Hiking trails chip
const chip = page.getByRole('button', { name: 'Hiking trails' });
if (await chip.count()) await chip.first().click();
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(out, '03_park_finder_filtered.png'), fullPage: false });

await page.goto(base + '/parks/oak-grove/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(800);
await page.screenshot({ path: path.join(out, '04_park_oak_grove.png'), fullPage: false });

await page.goto(base + '/fields/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(800);
await page.screenshot({ path: path.join(out, '05_field_status.png'), fullPage: false });

await context.close();

const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const mpage = await mobile.newPage();
await mpage.goto(base + '/', { waitUntil: 'networkidle', timeout: 60000 });
await mpage.waitForTimeout(1200);
await mpage.screenshot({ path: path.join(out, '06_mobile_home.png'), fullPage: false });
await mpage.goto(base + '/parks/', { waitUntil: 'networkidle', timeout: 60000 });
await mpage.waitForTimeout(800);
await mpage.screenshot({ path: path.join(out, '07_mobile_parks.png'), fullPage: false });

await browser.close();
console.log('done');
