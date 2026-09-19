/**
 * Proxies RecDesk FilterPrograms for one or more facility IDs.
 * RecDesk has no public URL for Location Filter, so park pages call this.
 */
export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const raw = url.searchParams.get("facilities") || "";
  const facilities = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^\d+$/.test(s));

  if (!facilities.length) {
    return Response.json(
      { error: "Missing facilities", programs: [], summary: null },
      { status: 400, headers: corsHeaders() },
    );
  }

  try {
    const warm = await fetch("https://cwpd.recdesk.com/Community/Program", {
      headers: { "User-Agent": "CWPD-ParkSite/1.0" },
    });
    const cookie = warm.headers.getSetCookie?.()
      ? warm.headers.getSetCookie().map((c) => c.split(";")[0]).join("; ")
      : cookieFromHeaders(warm.headers);

    const payload = {
      ProgramName: "",
      ProgramNameXS: "",
      DateRange: ["0"],
      "DateRange-selection": "",
      "DateRange-from": "",
      "DateRange-to": "",
      ProgramType: ["0"],
      Age: "",
      Facility: facilities,
      Days: ["0"],
      Pagination: {
        CurrentPageIndex: 1,
        PageSize: "50",
        LoadMore: false,
      },
    };

    const filtered = await fetch(
      "https://cwpd.recdesk.com/Community/Program/FilterPrograms",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "text/html, */*; q=0.01",
          "X-Requested-With": "XMLHttpRequest",
          Origin: "https://cwpd.recdesk.com",
          Referer: "https://cwpd.recdesk.com/Community/Program",
          "User-Agent": "CWPD-ParkSite/1.0",
          ...(cookie ? { Cookie: cookie } : {}),
        },
        body: JSON.stringify(payload),
      },
    );

    const html = await filtered.text();
    const programs = parsePrograms(html);
    const summaryMatch = html.match(
      /You are viewing\s+([^<]+)<\/strong>/i,
    );

    return Response.json(
      {
        facilities,
        summary: summaryMatch ? summaryMatch[1].trim() : null,
        programs,
        fetchedAt: new Date().toISOString(),
      },
      { headers: { ...corsHeaders(), "Cache-Control": "public, max-age=120" } },
    );
  } catch (err) {
    return Response.json(
      {
        error: "RecDesk unavailable",
        detail: String(err?.message || err),
        programs: [],
      },
      { status: 502, headers: corsHeaders() },
    );
  }
}

function cookieFromHeaders(headers) {
  const raw = headers.get("set-cookie");
  if (!raw) return "";
  // Single header fallback
  return raw
    .split(/,(?=[^;]+?=)/)
    .map((c) => c.split(";")[0].trim())
    .filter(Boolean)
    .join("; ");
}

function parsePrograms(html) {
  const programs = [];
  const seen = new Set();
  const re =
    /href="\/Community\/Program\/Detail\?programId=(\d+)"[^>]*>\s*([^<]+?)\s*</g;
  let m;
  while ((m = re.exec(html))) {
    const id = m[1];
    const title = decodeEntities(m[2]).replace(/\s+/g, " ").trim();
    if (!title || /^register/i.test(title) || seen.has(id)) continue;
    seen.add(id);

    // Slice a window after this match for meta
    const window = html.slice(m.index, m.index + 1800);
    const ages = (window.match(/Ages?:\s*([^<]+)/i) || [])[1];
    const dates = (window.match(/Dates?:\s*([^<]+)/i) || [])[1];
    const days = (window.match(/Days?:\s*([^<]+)/i) || [])[1];
    const category = (window.match(/<strong>([^<]+)<\/strong>/) || [])[1];

    programs.push({
      id,
      title,
      category: category && !/filtered results/i.test(category) ? decodeEntities(category).trim() : null,
      ages: ages ? decodeEntities(ages).trim() : null,
      dates: dates ? decodeEntities(dates).trim() : null,
      days: days ? decodeEntities(days).trim() : null,
      url: `https://cwpd.recdesk.com/Community/Program/Detail?programId=${id}`,
    });
  }
  return programs;
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders() });
}
