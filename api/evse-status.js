export default async function handler(req, res) {
  try {
    const evseId = String(req.query.evseId || "").toUpperCase().trim();

    if (!evseId) {
      return res.status(400).json({
        error: "Missing evseId"
      });
    }

    const hash = hashString(evseId);

    let status = "unknown";

    if (hash % 3 === 0) status = "free";
    if (hash % 3 === 1) status = "busy";
    if (hash % 3 === 2) status = "unknown";

    return res.status(200).json({
      evseId,
      status,
      provider: "EVSE Demo Backend",
      locationName: "Simulated Location",
      lastUpdated: new Date().toISOString(),
      message: "OK"
    });

  } catch (err) {
    return res.status(500).json({
      error: "Unexpected error",
      details: err.message
    });
  }
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}
