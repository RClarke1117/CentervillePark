import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: '/tmp/cwpd-video', size: { width: 1280, height: 720 } },
});
const page = await context.newPage();
const base = 'https://centerville-park.pages.dev';
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.mouse.wheel(0, 900);
await page.waitForTimeout(800);
await page.mouse.wheel(0, 1200);
await page.waitForTimeout(800);
await page.goto(base + '/parks/', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
const chip = page.getByRole('button', { name: 'Playground' });
if (await chip.count()) await chip.first().click();
await page.waitForTimeout(900);
await page.goto(base + '/parks/oak-grove/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.goto(base + '/fields/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await context.close();
await browser.close();
import fs from 'fs';
import path from 'path';
const files = fs.readdirSync('/tmp/cwpd-video').filter(f => f.endsWith('.webm'));
const src = path.join('/tmp/cwpd-video', files[0]);
fs.copyFileSync(src, '/opt/cursor/artifacts/walkthrough_home_parks_fields.webm');
console.log('video saved', src);
