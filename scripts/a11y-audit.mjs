import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";
import path from "path";

const base = process.env.QA_BASE || "http://127.0.0.1:4173";
const outDir = "/opt/cursor/artifacts";
const pages = [
  "/",
  "/parks/",
  "/parks/brittany-hills/",
  "/parks/oak-grove/",
  "/programs/",
  "/events/",
  "/fields/",
  "/shelters/",
  "/accessibility/",
  "/contact/",
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
});

const summary = [];

for (const route of pages) {
  const page = await context.newPage();
  const url = base + route;
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(600);

  const full = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  // District-controlled surface: exclude third-party RecDesk iframes / Google chrome
  const owned = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .exclude("iframe")
    .exclude("#google_translate_element")
    .exclude(".goog-te-banner-frame")
    .analyze();

  const mapViolations = (results) =>
    results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      helpUrl: v.helpUrl,
      nodes: v.nodes.length,
      samples: v.nodes.slice(0, 3).map((n) => ({
        target: n.target,
        failureSummary: n.failureSummary,
      })),
    }));

  const row = {
    route,
    url,
    full: {
      passes: full.passes.length,
      violations: full.violations.length,
      violationDetails: mapViolations(full),
    },
    districtControlled: {
      passes: owned.passes.length,
      violations: owned.violations.length,
      violationDetails: mapViolations(owned),
    },
  };
  summary.push(row);
  console.log(
    `${route}: district=${row.districtControlled.violations} full=${row.full.violations}`,
  );
  await page.close();
}

await browser.close();

const report = {
  generatedAt: new Date().toISOString(),
  standard: "WCAG 2.1 Level A + AA (axe-core tags wcag2a, wcag2aa, wcag21a, wcag21aa)",
  base,
  notes: [
    "districtControlled excludes third-party RecDesk iframes and Google Translate chrome.",
    "full includes cross-origin iframe content when axe can access it (RecDesk vendor UI).",
  ],
  summary,
};

fs.writeFileSync(
  path.join(outDir, "wcag21-aa-axe-report.json"),
  JSON.stringify(report, null, 2),
);

const lines = [
  "# WCAG 2.1 AA axe-core audit",
  "",
  `Base: ${base}`,
  `Generated: ${report.generatedAt}`,
  "",
  "Standard tags: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`",
  "",
  "| Page | District-controlled violations | Full page (incl. RecDesk iframe) | District passes |",
  "| --- | ---: | ---: | ---: |",
];
for (const row of summary) {
  lines.push(
    `| ${row.route} | ${row.districtControlled.violations} | ${row.full.violations} | ${row.districtControlled.passes} |`,
  );
}
lines.push("");

const ownedTotal = summary.reduce(
  (n, r) => n + r.districtControlled.violations,
  0,
);
const fullTotal = summary.reduce((n, r) => n + r.full.violations, 0);

if (ownedTotal === 0) {
  lines.push(
    "**District-controlled UI: 0 WCAG 2.1 A/AA violations** across audited pages.",
  );
} else {
  lines.push("## District-controlled violations");
  for (const row of summary) {
    for (const v of row.districtControlled.violationDetails) {
      lines.push(`- **${v.id}** (${v.impact}) on ${row.route}: ${v.help}`);
    }
  }
}

lines.push("");
lines.push(
  `Full-page scan (including RecDesk embeds): ${fullTotal} violation rule hits — documented as third-party limitations on /accessibility/.`,
);

fs.writeFileSync(
  path.join(outDir, "wcag21-aa-axe-summary.md"),
  lines.join("\n"),
);
console.log(lines.join("\n"));
process.exit(ownedTotal > 0 ? 1 : 0);
