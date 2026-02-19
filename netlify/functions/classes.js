export async function handler(event) {
  // only allow GET (called by our frontend)
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const res = await fetch("https://delta-pw.onrender.com/api/live1", {
      method: "POST",
      headers: {
        "Content-Type":    "application/json",
        "Accept":          "*/*",
        "Origin":          "https://deltastudy.site",
        "Referer":         "https://deltastudy.site/",
        "User-Agent":      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
        "DNT":             "1",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
      },
      body: JSON.stringify({ batchId: "69047c05fc3bb2dd64711bd8" }),
    });

    if (!res.ok) {
      return {
        statusCode: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ok: false, error: `DeltaStudy API returned ${res.status}` }),
      };
    }

    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ ok: true, data }),
    };

  } catch (e) {
    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: e.message }),
    };
  }
}
