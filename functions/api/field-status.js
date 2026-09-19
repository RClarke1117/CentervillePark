/**
 * Live athletic field status from cwpd.org (RainoutLine widget on /field_status/).
 * The "6:15 a.m." copy on the prototype was static mock data — this replaces it.
 */
export async function onRequestGet() {
  try {
    const res = await fetch("https://cwpd.org/field_status/", {
      headers: {
        "User-Agent": "CWPD-ParkSite/1.0",
        Accept: "text/html",
      },
    });
    const html = await res.text();
    const fields = [];
    const re =
      /<h4 class="location">([^<]+)<\/h4>\s*<p\s+class="status[^"]*">([^<]+)<\/p>\s*<p\s+class=updatedRecently>([^<]+)<\/p>/g;
    let m;
    while ((m = re.exec(html))) {
      const name = decode(m[1]).trim();
      const status = decode(m[2]).trim();
      const updated = decode(m[3]).trim().replace(/\.$/, "");
      const park = inferPark(name);
      fields.push({ name, park, status, updated });
    }

    return Response.json(
      {
        source: "https://cwpd.org/field_status/",
        provider: "RainoutLine",
        rainoutLine: "937-265-2001",
        subscribeUrl:
          "https://rainoutline.com/subscribe/notify/9372652001/0",
        fields,
        fetchedAt: new Date().toISOString(),
      },
      {
        headers: {
          ...corsHeaders(),
          "Cache-Control": "public, max-age=60",
        },
      },
    );
  } catch (err) {
    return Response.json(
      {
        error: "Field status unavailable",
        detail: String(err?.message || err),
        fields: [],
      },
      { status: 502, headers: corsHeaders() },
    );
  }
}

function inferPark(locationName) {
  const parks = [
    "Activity Center",
    "Forest Field",
    "Oak Grove",
    "Schoolhouse",
    "Yankee",
    "Iron Horse",
    "Robert F. Mays",
    "Oak Creek South",
    "Grant",
    "Bill Yeck",
  ];
  for (const p of parks) {
    if (locationName.startsWith(p)) return p;
  }
  return locationName.split(" Park")[0] || locationName;
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
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
