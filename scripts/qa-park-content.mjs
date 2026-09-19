import { chromium } from "playwright";
import path from "path";

const out = "/opt/cursor/artifacts";
const base =
  process.env.QA_BASE ||
  "https://cursor-park-content-accuracy.centerville-park.pages.dev";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

await page.goto(base + "/parks/brittany-hills/", {
  waitUntil: "networkidle",
  timeout: 60000,
});
await page.waitForTimeout(1000);
await page.screenshot({
  path: path.join(out, "brittany-hills-hero.png"),
  fullPage: false,
});

// Scroll to Visit sidebar / amenities
await page.locator("text=Amenities at a glance").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({
  path: path.join(out, "brittany-hills-amenities-visit.png"),
  fullPage: false,
});

// Confirm Related parks gone
const related = await page.locator("text=Related parks").count();
console.log("related parks count:", related);

await page.goto(base + "/parks/oak-grove/", {
  waitUntil: "networkidle",
  timeout: 60000,
});
await page.waitForTimeout(800);
await page.locator("text=Visit").first().scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({
  path: path.join(out, "oak-grove-visit-rules.png"),
  fullPage: false,
});

await page.goto(base + "/parks/forest-field/", {
  waitUntil: "networkidle",
  timeout: 60000,
});
await page.waitForTimeout(800);
await page.locator("text=Amenities at a glance").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({
  path: path.join(out, "forest-field-amenities.png"),
  fullPage: false,
});

await browser.close();
console.log("done", base);
